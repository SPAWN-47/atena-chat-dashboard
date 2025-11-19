-- =====================================================
-- ATENACHAT - SCHEMA INICIAL
-- Sistema de CRM + Agenda para Clínicas Odontológicas
-- =====================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. TABELA: CLINICS (Clínicas)
-- =====================================================
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  cnpj TEXT,
  phone TEXT,
  email TEXT,

  -- Configurações
  business_hours JSONB DEFAULT '{"start": "08:00", "end": "18:00"}',
  working_days JSONB DEFAULT '["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]',

  -- Plano e limite
  plan TEXT DEFAULT 'starter', -- starter, pro, enterprise
  max_leads INTEGER DEFAULT 50,

  -- Metadados
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. TABELA: USERS (Usuários da clínica)
-- =====================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,

  -- Auth (integração com Supabase Auth)
  auth_id UUID UNIQUE, -- Referência ao auth.users

  -- Dados pessoais
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user', -- admin, user, dentist

  -- Metadados
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. TABELA: LEADS (CRM + Agenda em UMA tabela)
-- =====================================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,

  -- Dados do Lead
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  source TEXT, -- INSTAGRAM, WHATSAPP, SITE, INDICAÇÃO, RETORNO

  -- Procedimento e Valor
  procedure TEXT,
  estimated_value DECIMAL(10,2),

  -- FUNIL CRM (Stage)
  stage TEXT NOT NULL DEFAULT 'novos',
  -- Valores possíveis: novos, conversa, agendados, tratamento, fechados, perdidos

  -- AGENDAMENTO (quando stage = 'agendados')
  scheduled_date DATE,
  scheduled_time TEXT, -- Ex: "09:00", "14:30"
  appointment_status TEXT, -- pendente, confirmado, cancelado, no_show

  -- Anotações
  notes TEXT,

  -- Tracking
  last_contact_date TIMESTAMPTZ,
  assigned_to UUID REFERENCES users(id), -- Responsável pelo lead

  -- Metadados
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. TABELA: CUSTOM_COLUMNS (Colunas personalizadas do CRM)
-- =====================================================
CREATE TABLE custom_columns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  color TEXT DEFAULT 'slate',
  position INTEGER DEFAULT 999,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. TABELA: LEAD_HISTORY (Histórico de movimentações)
-- =====================================================
CREATE TABLE lead_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  action TEXT NOT NULL, -- moved, created, updated, confirmed
  from_stage TEXT,
  to_stage TEXT,

  changed_by UUID REFERENCES users(id),
  metadata JSONB, -- Dados extras (ex: valor alterado, etc)

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Busca rápida de leads por clínica e stage
CREATE INDEX idx_leads_clinic_stage ON leads(clinic_id, stage);

-- Busca rápida na agenda (por data e hora)
CREATE INDEX idx_leads_schedule ON leads(clinic_id, scheduled_date, scheduled_time)
WHERE stage = 'agendados' AND scheduled_date IS NOT NULL;

-- Busca rápida por telefone (para evitar duplicatas)
CREATE INDEX idx_leads_phone ON leads(clinic_id, phone)
WHERE phone IS NOT NULL;

-- Histórico de leads
CREATE INDEX idx_lead_history_lead ON lead_history(lead_id, created_at DESC);

-- =====================================================
-- VIEWS OTIMIZADAS
-- =====================================================

-- View: Agenda da Semana (próximos 90 dias)
CREATE OR REPLACE VIEW v_agenda_week AS
SELECT
  l.id,
  l.clinic_id,
  l.name as paciente,
  l.phone,
  l.procedure as procedimento,
  l.estimated_value,
  l.scheduled_date as data,
  l.scheduled_time as hora,
  l.appointment_status as status,
  l.notes,
  l.source,
  u.name as responsavel
FROM leads l
LEFT JOIN users u ON l.assigned_to = u.id
WHERE l.stage = 'agendados'
  AND l.scheduled_date IS NOT NULL
  AND l.scheduled_date BETWEEN
    CURRENT_DATE - INTERVAL '7 days'
    AND CURRENT_DATE + INTERVAL '90 days'
ORDER BY l.scheduled_date, l.scheduled_time;

-- View: Métricas do Dashboard
CREATE OR REPLACE VIEW v_dashboard_metrics AS
SELECT
  clinic_id,

  -- Total de leads
  COUNT(*) as total_leads,

  -- Por stage
  COUNT(*) FILTER (WHERE stage = 'novos') as novos_leads,
  COUNT(*) FILTER (WHERE stage = 'conversa') as em_conversa,
  COUNT(*) FILTER (WHERE stage = 'agendados') as agendados,
  COUNT(*) FILTER (WHERE stage = 'tratamento') as em_tratamento,
  COUNT(*) FILTER (WHERE stage = 'fechados') as fechados,

  -- Taxa de conversão
  ROUND(
    (COUNT(*) FILTER (WHERE stage = 'fechados')::DECIMAL /
    NULLIF(COUNT(*) FILTER (WHERE stage IN ('novos', 'conversa', 'agendados', 'fechados')), 0) * 100),
    2
  ) as taxa_conversao,

  -- Valor total em potencial
  SUM(estimated_value) FILTER (WHERE stage IN ('conversa', 'agendados', 'tratamento')) as valor_potencial,

  -- Agendamentos confirmados vs pendentes
  COUNT(*) FILTER (WHERE stage = 'agendados' AND appointment_status = 'confirmado') as agendamentos_confirmados,
  COUNT(*) FILTER (WHERE stage = 'agendados' AND appointment_status = 'pendente') as agendamentos_pendentes,

  -- Leads este mês
  COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)) as leads_mes_atual

FROM leads
GROUP BY clinic_id;

-- =====================================================
-- FUNCTIONS (Lógica de Negócio no Banco)
-- =====================================================

-- Function: Mover lead entre stages com validação
CREATE OR REPLACE FUNCTION move_lead_to_stage(
  p_lead_id UUID,
  p_new_stage TEXT,
  p_scheduled_date DATE DEFAULT NULL,
  p_scheduled_time TEXT DEFAULT NULL,
  p_user_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  v_old_stage TEXT;
  v_conflict_count INT;
  v_clinic_id UUID;
BEGIN
  -- Buscar stage atual e clinic_id
  SELECT stage, clinic_id INTO v_old_stage, v_clinic_id
  FROM leads
  WHERE id = p_lead_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Lead não encontrado'
    );
  END IF;

  -- VALIDAÇÃO: Se movendo para "agendados", exige data/hora
  IF p_new_stage = 'agendados' THEN
    IF p_scheduled_date IS NULL OR p_scheduled_time IS NULL THEN
      RETURN jsonb_build_object(
        'success', false,
        'error', 'Agendamentos requerem data e horário'
      );
    END IF;

    -- Verificar conflito de horário
    SELECT COUNT(*) INTO v_conflict_count
    FROM leads
    WHERE clinic_id = v_clinic_id
      AND scheduled_date = p_scheduled_date
      AND scheduled_time = p_scheduled_time
      AND stage = 'agendados'
      AND id != p_lead_id;

    IF v_conflict_count > 0 THEN
      RETURN jsonb_build_object(
        'success', false,
        'error', 'Horário já ocupado'
      );
    END IF;
  END IF;

  -- Atualizar lead
  UPDATE leads
  SET
    stage = p_new_stage,
    scheduled_date = CASE
      WHEN p_new_stage = 'agendados' THEN p_scheduled_date
      WHEN p_new_stage != 'agendados' THEN NULL
      ELSE scheduled_date
    END,
    scheduled_time = CASE
      WHEN p_new_stage = 'agendados' THEN p_scheduled_time
      WHEN p_new_stage != 'agendados' THEN NULL
      ELSE scheduled_time
    END,
    appointment_status = CASE
      WHEN p_new_stage = 'agendados' THEN COALESCE(appointment_status, 'pendente')
      ELSE NULL
    END,
    updated_at = NOW()
  WHERE id = p_lead_id;

  -- Registrar no histórico
  INSERT INTO lead_history (lead_id, action, from_stage, to_stage, changed_by)
  VALUES (p_lead_id, 'moved', v_old_stage, p_new_stage, p_user_id);

  RETURN jsonb_build_object(
    'success', true,
    'lead_id', p_lead_id,
    'from_stage', v_old_stage,
    'to_stage', p_new_stage
  );
END;
$$;

-- Function: Confirmar agendamento
CREATE OR REPLACE FUNCTION confirm_appointment(
  p_lead_id UUID,
  p_user_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
BEGIN
  -- Atualizar status
  UPDATE leads
  SET
    appointment_status = 'confirmado',
    updated_at = NOW()
  WHERE id = p_lead_id
    AND stage = 'agendados';

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Agendamento não encontrado'
    );
  END IF;

  -- Registrar no histórico
  INSERT INTO lead_history (lead_id, action, changed_by, metadata)
  VALUES (
    p_lead_id,
    'confirmed',
    p_user_id,
    jsonb_build_object('confirmed_at', NOW())
  );

  RETURN jsonb_build_object(
    'success', true,
    'lead_id', p_lead_id,
    'status', 'confirmado'
  );
END;
$$;

-- Function: Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_clinics_updated_at BEFORE UPDATE ON clinics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_history ENABLE ROW LEVEL SECURITY;

-- Política: Usuários só veem dados da própria clínica
CREATE POLICY "Users can view their clinic data" ON clinics
  FOR SELECT
  USING (
    id IN (
      SELECT clinic_id FROM users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can view clinic users" ON users
  FOR SELECT
  USING (
    clinic_id IN (
      SELECT clinic_id FROM users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can view clinic leads" ON leads
  FOR ALL
  USING (
    clinic_id IN (
      SELECT clinic_id FROM users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage custom columns" ON custom_columns
  FOR ALL
  USING (
    clinic_id IN (
      SELECT clinic_id FROM users WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can view lead history" ON lead_history
  FOR SELECT
  USING (
    lead_id IN (
      SELECT id FROM leads WHERE clinic_id IN (
        SELECT clinic_id FROM users WHERE auth_id = auth.uid()
      )
    )
  );

-- =====================================================
-- DADOS INICIAIS (SEED)
-- =====================================================

-- Inserir clínica de exemplo
INSERT INTO clinics (id, name, email, phone, plan)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Clínica Modelo - Dr. Silva',
  'contato@clinicamodelo.com.br',
  '11999999999',
  'pro'
);

-- Inserir usuário de exemplo
INSERT INTO users (clinic_id, name, email, role)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Dr. Silva',
  'dr.silva@clinicamodelo.com.br',
  'admin'
);

-- Inserir leads de exemplo
INSERT INTO leads (clinic_id, name, phone, source, procedure, estimated_value, stage, scheduled_date, scheduled_time, appointment_status)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Mariana Santos', '11987654321', 'INSTAGRAM', 'Avaliação', NULL, 'novos', NULL, NULL, NULL),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'João Silva', '11976543210', 'SITE', 'Implante', 5000, 'conversa', NULL, NULL, NULL),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ana Clara', '11965432109', 'WHATSAPP', 'Avaliação', NULL, 'agendados', '2025-11-18', '09:00', 'confirmado'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Mariana C.', '11954321098', 'RETORNO', 'Limpeza', 300, 'agendados', '2025-11-19', '10:00', 'confirmado'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Pedro H.', '11943210987', 'INDICAÇÃO', 'Manutenção', NULL, 'agendados', '2025-11-17', '14:00', 'pendente'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Felipe Neto', '11932109876', 'INDICAÇÃO', 'Ortodontia', 12000, 'tratamento', NULL, NULL, NULL);

-- =====================================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- =====================================================

COMMENT ON TABLE leads IS 'Tabela principal que unifica CRM e Agenda - fonte única de verdade';
COMMENT ON COLUMN leads.stage IS 'Coluna do funil: novos, conversa, agendados, tratamento, fechados, perdidos';
COMMENT ON COLUMN leads.appointment_status IS 'Status do agendamento quando stage=agendados: pendente, confirmado, cancelado, no_show';
COMMENT ON FUNCTION move_lead_to_stage IS 'Move lead entre stages com validações (horário único, campos obrigatórios)';
COMMENT ON FUNCTION confirm_appointment IS 'Confirma agendamento pendente (botão Confirmar? da Agenda)';
