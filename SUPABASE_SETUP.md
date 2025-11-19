# 🚀 SETUP SUPABASE - ATENACHAT

Este guia irá conectar o AtenaChat ao Supabase em **5 minutos**.

---

## 📋 **PRÉ-REQUISITOS**

1. Conta no Supabase (gratuita): https://supabase.com
2. Projeto criado no Supabase

---

## 🔧 **PASSO 1: EXECUTAR MIGRAÇÃO NO SUPABASE**

### **1.1 - Acessar SQL Editor:**
1. Entre no seu projeto Supabase
2. Vá em **SQL Editor** (no menu lateral)
3. Clique em **"New Query"**

### **1.2 - Copiar e Executar o Schema:**
1. Abra o arquivo: `supabase/migrations/001_initial_schema.sql`
2. **Copie TODO o conteúdo**
3. Cole no SQL Editor do Supabase
4. Clique em **"Run"** (ou Ctrl/Cmd + Enter)

✅ **Resultado Esperado:**
```
Success. No rows returned
```

### **1.3 - Verificar Tabelas Criadas:**
1. Vá em **Table Editor** (menu lateral)
2. Você deve ver as tabelas:
   - ✅ `clinics`
   - ✅ `users`
   - ✅ `leads` ← **TABELA PRINCIPAL**
   - ✅ `custom_columns`
   - ✅ `lead_history`

---

## 🔑 **PASSO 2: OBTER CREDENCIAIS**

### **2.1 - Copiar API Keys:**
1. Vá em **Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://xyzabc123.supabase.co`)
   - **anon public key** (começa com `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### **2.2 - Criar arquivo `.env.local`:**
Crie na raiz do projeto (`/Users/guilhermefonseca/ECO-ATENA/.env.local`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ID da clínica de exemplo (criada automaticamente)
NEXT_PUBLIC_DEFAULT_CLINIC_ID=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
```

⚠️ **IMPORTANTE:** Substitua pelos valores reais do seu projeto!

---

## 📊 **PASSO 3: VERIFICAR DADOS DE EXEMPLO**

O schema já inseriu dados de teste automaticamente!

### **3.1 - Verificar no Table Editor:**
1. Abra a tabela `leads`
2. Você deve ver **6 leads de exemplo**:
   - Mariana Santos (Novos Leads)
   - João Silva (Em Conversa)
   - Ana Clara (Agendada - Confirmada)
   - Mariana C. (Agendada - Confirmada)
   - Pedro H. (Agendado - Pendente) ← **Teste botão "Confirmar?"**
   - Felipe Neto (Em Tratamento)

### **3.2 - Testar Views:**
Execute no SQL Editor:

```sql
-- Ver agendamentos da semana
SELECT * FROM v_agenda_week;

-- Ver métricas do dashboard
SELECT * FROM v_dashboard_metrics;
```

---

## 🔐 **PASSO 4: CONFIGURAR RLS (Row Level Security)**

**✅ Já está configurado!** O RLS foi criado automaticamente.

### **Para testar:**
```sql
-- Ver políticas ativas
SELECT * FROM pg_policies WHERE tablename = 'leads';
```

### **Como funciona:**
- Cada usuário só vê dados da **própria clínica**
- Filtro automático por `clinic_id`
- Proteção contra acesso indevido

---

## 🧪 **PASSO 5: TESTAR FUNCTIONS**

### **5.1 - Testar mover lead entre stages:**
```sql
-- Mover "João Silva" para "Agendados"
SELECT move_lead_to_stage(
  p_lead_id := (SELECT id FROM leads WHERE name = 'João Silva'),
  p_new_stage := 'agendados',
  p_scheduled_date := '2025-11-20',
  p_scheduled_time := '15:00'
);

-- Resultado esperado:
-- {"success": true, "lead_id": "...", "from_stage": "conversa", "to_stage": "agendados"}
```

### **5.2 - Testar confirmar agendamento:**
```sql
-- Confirmar "Pedro H." (que está pendente)
SELECT confirm_appointment(
  p_lead_id := (SELECT id FROM leads WHERE name = 'Pedro H.')
);

-- Resultado esperado:
-- {"success": true, "lead_id": "...", "status": "confirmado"}
```

### **5.3 - Verificar histórico:**
```sql
SELECT * FROM lead_history ORDER BY created_at DESC LIMIT 10;
```

---

## ⚡ **PASSO 6: HABILITAR REALTIME**

### **6.1 - Ativar Realtime na tabela `leads`:**
1. Vá em **Database** → **Replication**
2. Encontre a tabela `leads`
3. Clique para **habilitar replicação**
4. Selecione eventos: `INSERT`, `UPDATE`, `DELETE`
5. Salvar

✅ **Agora as mudanças aparecerão em tempo real no dashboard!**

---

## 📱 **PASSO 7: CONECTAR NO CÓDIGO REACT**

### **7.1 - Instalar dependências:**
```bash
npm install @supabase/supabase-js
```

### **7.2 - Criar cliente Supabase:**
Crie `src/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### **7.3 - Exemplo de uso no CRM:**
```javascript
import { supabase } from '@/lib/supabase';

// Buscar leads
const { data: leads } = await supabase
  .from('leads')
  .select('*')
  .eq('clinic_id', clinicId)
  .order('created_at', { ascending: false });

// Mover lead (com validação)
const { data } = await supabase.rpc('move_lead_to_stage', {
  p_lead_id: leadId,
  p_new_stage: 'agendados',
  p_scheduled_date: '2025-11-20',
  p_scheduled_time: '15:00'
});

// Confirmar agendamento
const { data } = await supabase.rpc('confirm_appointment', {
  p_lead_id: leadId
});

// Realtime subscription
const subscription = supabase
  .channel('leads-changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'leads',
    filter: `clinic_id=eq.${clinicId}`
  }, (payload) => {
    console.log('Lead atualizado:', payload);
    // Atualizar estado local
  })
  .subscribe();
```

---

## 🎯 **ESTRUTURA DO BANCO (RESUMO)**

```
┌─────────────┐
│   CLINICS   │  ← Clínicas (multi-tenant)
└──────┬──────┘
       │
       ├──→ ┌─────────────┐
       │    │    USERS    │  ← Usuários da clínica
       │    └─────────────┘
       │
       ├──→ ┌─────────────┐
       │    │    LEADS    │  ← CRM + AGENDA (fonte única)
       │    └──────┬──────┘
       │           │
       │           ├──→ stage: novos, conversa, agendados...
       │           ├──→ scheduled_date, scheduled_time
       │           └──→ appointment_status: pendente, confirmado
       │
       ├──→ ┌─────────────────┐
       │    │ CUSTOM_COLUMNS  │  ← Colunas customizadas
       │    └─────────────────┘
       │
       └──→ ┌─────────────────┐
            │  LEAD_HISTORY   │  ← Auditoria de mudanças
            └─────────────────┘
```

---

## ✅ **CHECKLIST FINAL**

- [ ] Schema executado no Supabase
- [ ] 5 tabelas criadas
- [ ] Dados de exemplo inseridos
- [ ] Arquivo `.env.local` criado
- [ ] API Keys configuradas
- [ ] Realtime habilitado na tabela `leads`
- [ ] Functions testadas (`move_lead_to_stage`, `confirm_appointment`)
- [ ] Views funcionando (`v_agenda_week`, `v_dashboard_metrics`)

---

## 🆘 **TROUBLESHOOTING**

### **Erro: "relation already exists"**
- **Solução:** Deletar as tabelas antigas e executar o schema novamente

### **Erro: RLS impedindo acesso**
- **Solução temporária para dev:** Desabilitar RLS nas tabelas:
  ```sql
  ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
  ```

### **Realtime não funciona:**
- Verificar se a replicação está ativada em Database → Replication
- Verificar se o canal está com o nome correto

---

## 📞 **PRÓXIMOS PASSOS**

Agora que o backend está pronto, você pode:

1. ✅ Integrar o código React com Supabase
2. ✅ Substituir `useState` por queries Supabase
3. ✅ Implementar Realtime no CRM e Agenda
4. ✅ Adicionar autenticação (Supabase Auth)

**Quer que eu implemente a integração React agora?** 🚀
