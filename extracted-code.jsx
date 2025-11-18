import React, { useState, useEffect, useRef } from 'react';
import {<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">  </span>Grid, MessageSquare, Users, AlertTriangle, Settings, Shield, FileText, LogOut, X, Menu,
<span class="Apple-converted-space">  </span>Target, User, Calendar as CalendarIcon, TrendingUp, DollarSign, List, Search, ChevronRight, Phone, Clock, Mail,
<span class="Apple-converted-space">  </span>CheckCircle, XCircle, MoreVertical, Filter, Stethoscope, RefreshCcw, Kanban, MessageCircle,<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">  </span>Plus, Trash2, Save, X as CloseIcon, Edit3, FileUp, FileDown, ChevronLeft, UserPlus, BadgeCheck,<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">  </span>Copy, Check, MessageSquareDashed, Map, ArrowRight, Info, Camera, BookOpen, PhoneCall, GraduationCap,<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">  </span>Lightbulb, BarChart3, Zap, HelpCircle, Gem, UserCheck, Share2, Repeat, Send, Brain, UploadCloud, Sliders, Minus, Maximize2, FileCheck, AlertCircle, Bell, Power, Book, Link, Globe, Lock
} from 'lucide-react';

// ==========================================
// 1. HELPER COMPONENTS (Base Blocks)
// ==========================================

const DashboardStatCard = ({ title, value, icon: Icon, bgColor, textColor, iconBgColor }) =&gt; (
<span class="Apple-converted-space">  </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow"&gt;
<span class="Apple-converted-space">    </span>&lt;div&gt;
<span class="Apple-converted-space">      </span>&lt;p className="text-slate-500 text-sm font-medium mb-1"&gt;{title}&lt;/p&gt;
<span class="Apple-converted-space">      </span>&lt;h3 className="text-3xl font-bold text-slate-900"&gt;{value}&lt;/h3&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;div className={`p-3 rounded-lg ${iconBgColor}`}&gt;
<span class="Apple-converted-space">      </span>&lt;Icon size={24} className={textColor} /&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">  </span>&lt;/div&gt;
);

const AreaChartComparison = () =&gt; (
<span class="Apple-converted-space">  </span>&lt;div className="relative h-64 w-full mt-4"&gt;
<span class="Apple-converted-space">    </span>&lt;div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 py-1"&gt;
<span class="Apple-converted-space">      </span>&lt;span&gt;24-&lt;/span&gt;&lt;span&gt;18-&lt;/span&gt;&lt;span&gt;12-&lt;/span&gt;&lt;span&gt;6-&lt;/span&gt;&lt;span&gt;0-&lt;/span&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between"&gt;
<span class="Apple-converted-space">      </span>{[...Array(5)].map((_, i) =&gt; &lt;div key={i} className="h-px bg-slate-100 w-full" /&gt;)}
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;svg className="absolute left-8 right-0 top-0 w-[calc(100%-32px)] h-full" viewBox="0 0 100 100" preserveAspectRatio="none"&gt;
<span class="Apple-converted-space">      </span>&lt;path d="M0,70 L14,60 L28,50 L42,30 L56,20 L70,30 L84,50 L100,65 V100 H0 Z" fill="rgba(99, 102, 241, 0.2)" stroke="rgb(99, 102, 241)" strokeWidth="1"/&gt;
<span class="Apple-converted-space">      </span>&lt;path d="M0,80 L14,75 L28,65 L42,45 L56,35 L70,45 L84,60 L100,75 V100 H0 Z" fill="rgba(52, 211, 153, 0.2)" stroke="rgb(52, 211, 153)" strokeWidth="1"/&gt;
<span class="Apple-converted-space">    </span>&lt;/svg&gt;
<span class="Apple-converted-space">    </span>&lt;div className="absolute bottom-0 left-8 right-0 h-4 flex justify-between items-center text-xs text-slate-400"&gt;
<span class="Apple-converted-space">      </span>&lt;span&gt;Seg&lt;/span&gt;&lt;span&gt;Ter&lt;/span&gt;&lt;span&gt;Qua&lt;/span&gt;&lt;span&gt;Qui&lt;/span&gt;&lt;span&gt;Sex&lt;/span&gt;&lt;span&gt;Sáb&lt;/span&gt;&lt;span&gt;Dom&lt;/span&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">  </span>&lt;/div&gt;
);

// ==========================================
// 2. SHARED MODALS &amp; CARDS
// ==========================================

const LeadModal = ({ lead, onClose, onSave }) =&gt; {
<span class="Apple-converted-space">    </span>const isNew = !lead.id;
<span class="Apple-converted-space">    </span>const [formData, setFormData] = useState(lead || { name: '', source: 'Manual', time: 'Agora', procedure: '', value: '' });

<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 backdrop-blur-sm c-fade-in"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="w-full md:w-[500px] h-full bg-white shadow-2xl p-0 flex flex-col c-slide-in-right"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50"&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;&lt;h2 className="text-xl font-bold text-slate-900"&gt;{isNew ? 'Novo Lead' : 'Detalhes do Lead'}&lt;/h2&gt;&lt;p className="text-xs text-slate-500"&gt;ID: {isNew ? 'Novo' : Math.random().toString(36).substr(2, 9).toUpperCase()}&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"&gt;&lt;CloseIcon size={20}/&gt;&lt;/button&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="flex-1 overflow-y-auto p-6 space-y-6"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100"&gt;
<span class="Apple-converted-space">                         </span>&lt;div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl"&gt;{formData.name ? formData.name.charAt(0) : &lt;User size={20}/&gt;}&lt;/div&gt;
<span class="Apple-converted-space">                         </span>&lt;div className="w-full"&gt;
<span class="Apple-converted-space">                             </span>{isNew ? &lt;input type="text" placeholder="Nome do Paciente" className="bg-white border border-blue-200 rounded px-2 py-1 w-full font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400" value={formData.name} onChange={e =&gt; setFormData({...formData, name: e.target.value})} autoFocus /&gt; : &lt;h3 className="font-bold text-lg text-slate-800"&gt;{formData.name}&lt;/h3&gt;}
<span class="Apple-converted-space">                             </span>&lt;div className="flex items-center gap-2 text-sm text-slate-600 mt-1"&gt;&lt;span className="px-2 py-0.5 bg-white rounded text-xs font-medium border border-blue-100"&gt;{formData.source}&lt;/span&gt;&lt;span&gt;• {formData.time}&lt;/span&gt;&lt;/div&gt;
<span class="Apple-converted-space">                         </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="space-y-4"&gt;
<span class="Apple-converted-space">                        </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Procedimento&lt;/label&gt;&lt;div className="relative"&gt;&lt;Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /&gt;&lt;input type="text" placeholder="Ex: Implante..." defaultValue={formData.procedure} onChange={e =&gt; setFormData({...formData, procedure: e.target.value})} className="w-full pl-10 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700" /&gt;&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="grid grid-cols-2 gap-4"&gt;
<span class="Apple-converted-space">                             </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Valor (R$)&lt;/label&gt;&lt;div className="relative"&gt;&lt;DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /&gt;&lt;input type="text" placeholder="0,00" defaultValue={formData.value} onChange={e =&gt; setFormData({...formData, value: e.target.value})} className="w-full pl-10 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700" /&gt;&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">                             </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Agendamento&lt;/label&gt;&lt;div className="relative"&gt;&lt;CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /&gt;&lt;input type="date" className="w-full pl-10 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700" /&gt;&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Anotações&lt;/label&gt;&lt;textarea rows={4} placeholder="Detalhes..." className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 resize-none"&gt;&lt;/textarea&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3"&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={onClose} className="px-6 py-2 text-slate-600 hover:bg-slate-200 rounded-lg font-medium"&gt;Cancelar&lt;/button&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={() =&gt; { onSave(formData); onClose(); }} className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-bold flex items-center gap-2 shadow-sm"&gt;&lt;Save size={18} /&gt; {isNew ? 'Criar Lead' : 'Salvar'}&lt;/button&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

const KanbanCard = ({ data, onClick }) =&gt; (
<span class="Apple-converted-space">    </span>&lt;div onClick={onClick} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md cursor-pointer transition-all group relative hover:border-blue-300"&gt;
<span class="Apple-converted-space">        </span>&lt;div className="flex justify-between items-start mb-2"&gt;
<span class="Apple-converted-space">            </span>&lt;span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full uppercase tracking-wide"&gt;{data.source}&lt;/span&gt;
<span class="Apple-converted-space">            </span>&lt;div className="p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"&gt;&lt;MoreVertical size={16} /&gt;&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;h4 className="font-bold text-slate-800 mb-1"&gt;{data.name}&lt;/h4&gt;
<span class="Apple-converted-space">        </span>&lt;p className="text-xs text-slate-500 flex items-center gap-1 mb-3"&gt;&lt;Clock size={12} /&gt; {data.time}&lt;/p&gt;
<span class="Apple-converted-space">        </span>{(data.value || data.procedure) &amp;&amp; (
<span class="Apple-converted-space">             </span>&lt;div className="mb-3 bg-slate-50 p-2 rounded border border-slate-100"&gt;
<span class="Apple-converted-space">                </span>{data.procedure &amp;&amp; &lt;div className="text-xs font-medium text-slate-700 flex items-center gap-1"&gt;&lt;Stethoscope size={10}/&gt; {data.procedure}&lt;/div&gt;}
<span class="Apple-converted-space">                </span>{data.value &amp;&amp; &lt;div className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1"&gt;&lt;DollarSign size={10}/&gt; R$ {data.value}&lt;/div&gt;}
<span class="Apple-converted-space">             </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>)}
<span class="Apple-converted-space">        </span>&lt;div className="flex gap-2 mt-2 border-t border-slate-50 pt-3" onClick={(e) =&gt; e.stopPropagation()}&gt;
<span class="Apple-converted-space">            </span>&lt;button className="flex-1 py-1.5 bg-green-50 text-green-600 rounded text-xs font-bold flex items-center justify-center gap-1 hover:bg-green-100 transition-colors"&gt;&lt;MessageCircle size={14} /&gt; WhatsApp&lt;/button&gt;
<span class="Apple-converted-space">            </span>&lt;button className="p-1.5 bg-slate-50 text-slate-600 rounded hover:bg-slate-100 transition-colors"&gt;&lt;Phone size={14} /&gt;&lt;/button&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
);

const KanbanColumn = ({ title, count, color, onDelete, children }) =&gt; {
<span class="Apple-converted-space">    </span>const colorClasses = { blue: 'bg-blue-50 text-blue-700 border-blue-100', amber: 'bg-amber-50 text-amber-700 border-amber-100', green: 'bg-emerald-50 text-emerald-700 border-emerald-100', purple: 'bg-purple-50 text-purple-700 border-purple-100', rose: 'bg-rose-50 text-rose-700 border-rose-100', slate: 'bg-slate-100 text-slate-700 border-slate-200' };
<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="flex-shrink-0 w-80 flex flex-col h-full group/col"&gt;
<span class="Apple-converted-space">            </span>&lt;div className={`flex items-center justify-between p-3 rounded-lg border mb-4 ${colorClasses[color] || colorClasses.slate}`}&gt;
<span class="Apple-converted-space">                </span>&lt;div className="flex items-center gap-2"&gt;&lt;span className="font-bold text-sm"&gt;{title}&lt;/span&gt;&lt;span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm"&gt;{count}&lt;/span&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;button onClick={onDelete} className="opacity-0 group-hover/col:opacity-100 text-slate-400 hover:text-red-500 transition-opacity p-1"&gt;&lt;Trash2 size={14} /&gt;&lt;/button&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar pb-4"&gt;{children}&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

const AppointmentModal = ({ appointment, onClose, onSave }) =&gt; {
<span class="Apple-converted-space">    </span>const isNew = !appointment.id;
<span class="Apple-converted-space">    </span>const [formData, setFormData] = useState(appointment || { name: '', type: '', date: new Date().toISOString().split('T')[0], time: '08:00', status: 'confirmed' });
<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm c-fade-in p-4"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden c-scale-in"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50"&gt;
<span class="Apple-converted-space">                    </span>&lt;h3 className="text-lg font-bold text-slate-800"&gt;{isNew ? 'Novo Agendamento' : 'Editar Agendamento'}&lt;/h3&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={onClose} className="text-slate-400 hover:text-slate-600"&gt;&lt;CloseIcon size={20}/&gt;&lt;/button&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="p-6 space-y-4"&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Nome do Paciente&lt;/label&gt;&lt;input type="text" value={formData.name} onChange={e =&gt; setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Maria Silva" /&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Tipo de Procedimento&lt;/label&gt;&lt;input type="text" value={formData.type} onChange={e =&gt; setFormData({...formData, type: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ex: Avaliação" /&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="grid grid-cols-2 gap-4"&gt;
<span class="Apple-converted-space">                         </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Data&lt;/label&gt;&lt;input type="date" value={formData.date} onChange={e =&gt; setFormData({...formData, date: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" /&gt;&lt;/div&gt;
<span class="Apple-converted-space">                         </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Hora&lt;/label&gt;&lt;select value={formData.time} onChange={e =&gt; setFormData({...formData, time: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"&gt;{["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(h =&gt; (&lt;option key={h} value={h}&gt;{h}&lt;/option&gt;))}&lt;/select&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>{!isNew &amp;&amp; (&lt;div className="flex items-center gap-2 pt-2"&gt;&lt;span className="text-sm font-medium text-slate-700"&gt;Status:&lt;/span&gt;&lt;select value={formData.status} onChange={e =&gt; setFormData({...formData, status: e.target.value})} className="text-sm bg-slate-50 border border-slate-200 rounded px-2 py-1"&gt;&lt;option value="confirmed"&gt;Confirmado&lt;/option&gt;&lt;option value="pending"&gt;Pendente&lt;/option&gt;&lt;/select&gt;&lt;/div&gt;)}
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2"&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium text-sm"&gt;Cancelar&lt;/button&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={() =&gt; onSave(formData)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-sm shadow-sm"&gt;Salvar&lt;/button&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

const AddScriptModal = ({ onClose, onSave }) =&gt; {
<span class="Apple-converted-space">    </span>const [newScript, setNewScript] = useState({ title: '', category: 'Vendas', text: '' });
<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm c-fade-in p-4"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden c-scale-in"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="p-6 border-b border-slate-100 flex justify-between items-center"&gt;
<span class="Apple-converted-space">                    </span>&lt;h3 className="text-lg font-bold text-slate-800"&gt;Novo Modelo&lt;/h3&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={onClose}&gt;&lt;CloseIcon size={20} className="text-slate-400 hover:text-slate-600"/&gt;&lt;/button&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="p-6 space-y-4"&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Título&lt;/label&gt;&lt;input type="text" className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newScript.title} onChange={e =&gt; setNewScript({...newScript, title: e.target.value})} /&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Categoria&lt;/label&gt;&lt;select className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" value={newScript.category} onChange={e =&gt; setNewScript({...newScript, category: e.target.value})}&gt;{['Reativação', 'Confirmação', 'Vendas', 'Pós-Venda', 'Aniversário', 'Cobrança', 'Outros'].map(c =&gt; (&lt;option key={c} value={c}&gt;{c}&lt;/option&gt;))}&lt;/select&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;&lt;label className="block text-sm font-medium text-slate-700 mb-1"&gt;Mensagem&lt;/label&gt;&lt;textarea rows={5} className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" value={newScript.text} onChange={e =&gt; setNewScript({...newScript, text: e.target.value})}&gt;&lt;/textarea&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2"&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium text-sm"&gt;Cancelar&lt;/button&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={() =&gt; onSave(newScript)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-sm"&gt;Salvar Modelo&lt;/button&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

const ScriptCard = ({ title, category, text, onDelete }) =&gt; {
<span class="Apple-converted-space">    </span>const [copied, setCopied] = useState(false);
<span class="Apple-converted-space">    </span>const handleCopy = () =&gt; {
<span class="Apple-converted-space">        </span>const textarea = document.createElement('textarea');
<span class="Apple-converted-space">        </span>textarea.value = text;
<span class="Apple-converted-space">        </span>document.body.appendChild(textarea);
<span class="Apple-converted-space">        </span>textarea.select();
<span class="Apple-converted-space">        </span>try {
<span class="Apple-converted-space">            </span>document.execCommand('copy');
<span class="Apple-converted-space">            </span>setCopied(true);
<span class="Apple-converted-space">            </span>setTimeout(() =&gt; setCopied(false), 2000);
<span class="Apple-converted-space">        </span>} catch (err) {
<span class="Apple-converted-space">            </span>console.error('Erro', err);
<span class="Apple-converted-space">        </span>}
<span class="Apple-converted-space">        </span>document.body.removeChild(textarea);
<span class="Apple-converted-space">    </span>};
<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col h-full group relative c-fade-in"&gt;
<span class="Apple-converted-space">            </span>{onDelete &amp;&amp; (&lt;button onClick={onDelete} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"&gt;&lt;Trash2 size={16} /&gt;&lt;/button&gt;)}
<span class="Apple-converted-space">            </span>&lt;div className="flex justify-between items-start mb-4"&gt;&lt;div&gt;&lt;span className="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600 mb-2"&gt;{category}&lt;/span&gt;&lt;h3 className="font-bold text-slate-800 text-lg pr-8 leading-tight"&gt;{title}&lt;/h3&gt;&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-600 italic mb-4 whitespace-pre-wrap leading-relaxed"&gt;"{text}"&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;button onClick={handleCopy} className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${copied ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}&gt;{copied ? &lt;&gt;&lt;Check size={18} /&gt; Copiado!&lt;/&gt; : &lt;&gt;&lt;Copy size={18} /&gt; Copiar Script&lt;/&gt;}&lt;/button&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

const PlaybookCard = ({ title, description, icon: Icon, colorClass, onClick }) =&gt; (
<span class="Apple-converted-space">    </span>&lt;div onClick={onClick} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg cursor-pointer transition-all group"&gt;
<span class="Apple-converted-space">        </span>&lt;div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClass} transition-transform group-hover:scale-110`}&gt;&lt;Icon size={24} /&gt;&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors"&gt;{title}&lt;/h3&gt;
<span class="Apple-converted-space">        </span>&lt;p className="text-slate-500 text-sm leading-relaxed"&gt;{description}&lt;/p&gt;
<span class="Apple-converted-space">        </span>&lt;div className="mt-4 flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"&gt;Ver Jornada &lt;ArrowRight size={16} className="ml-2" /&gt;&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
);

const FollowUpStep = ({ day, title, desc, script, isActive, onClick }) =&gt; {
<span class="Apple-converted-space">    </span>const [copied, setCopied] = useState(false);

<span class="Apple-converted-space">    </span>const handleCopy = (e) =&gt; {
<span class="Apple-converted-space">        </span>e.stopPropagation();
<span class="Apple-converted-space">        </span>const textarea = document.createElement('textarea');
<span class="Apple-converted-space">        </span>textarea.value = script;
<span class="Apple-converted-space">        </span>document.body.appendChild(textarea);
<span class="Apple-converted-space">        </span>textarea.select();
<span class="Apple-converted-space">        </span>try {
<span class="Apple-converted-space">            </span>document.execCommand('copy');
<span class="Apple-converted-space">            </span>setCopied(true);
<span class="Apple-converted-space">            </span>setTimeout(() =&gt; setCopied(false), 2000);
<span class="Apple-converted-space">        </span>} catch (err) {
<span class="Apple-converted-space">            </span>console.error('Erro', err);
<span class="Apple-converted-space">        </span>}
<span class="Apple-converted-space">        </span>document.body.removeChild(textarea);
<span class="Apple-converted-space">    </span>};

<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div onClick={onClick} className={`cursor-pointer transition-all duration-300 relative pl-8 pb-8 border-l-2 ${isActive ? 'border-blue-600' : 'border-slate-200'}`}&gt;
<span class="Apple-converted-space">            </span>&lt;div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${isActive ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`}&gt;&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className={`p-5 rounded-xl border transition-all ${isActive ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'}`}&gt;
<span class="Apple-converted-space">                </span>&lt;div className="flex justify-between items-center mb-2"&gt;&lt;span className={`text-xs font-bold px-2 py-1 rounded ${isActive ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 text-slate-500'}`}&gt;{day}&lt;/span&gt;&lt;ChevronRight size={16} className={`text-slate-400 transition-transform ${isActive ? 'rotate-90' : ''}`}/&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;h4 className={`font-bold text-lg mb-1 ${isActive ? 'text-blue-900' : 'text-slate-700'}`}&gt;{title}&lt;/h4&gt;
<span class="Apple-converted-space">                </span>&lt;p className="text-sm text-slate-500 mb-4"&gt;{desc}&lt;/p&gt;
<span class="Apple-converted-space">                </span>{isActive &amp;&amp; (
<span class="Apple-converted-space">                    </span>&lt;div className="mt-4 c-scale-in"&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="bg-white p-4 rounded-lg border border-blue-100 text-slate-600 italic text-sm mb-3 shadow-inner"&gt;"{script}"&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;button<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">                            </span>className={`w-full py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${copied ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">                            </span>onClick={handleCopy}
<span class="Apple-converted-space">                        </span>&gt;
<span class="Apple-converted-space">                            </span>{copied ? &lt;&gt;&lt;Check size={16} /&gt; Copiado!&lt;/&gt; : &lt;&gt;&lt;Copy size={16} /&gt; Copiar Modelo&lt;/&gt;}
<span class="Apple-converted-space">                        </span>&lt;/button&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>)}
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

// ==========================================
// 3. TUTORIAL COMPONENTS
// ==========================================

const CRMTutorial = ({ onBack }) =&gt; (
<span class="Apple-converted-space">    </span>&lt;div className="space-y-6 c-fade-in"&gt;
<span class="Apple-converted-space">        </span>&lt;button onClick={onBack} className="flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-4 font-medium"&gt;
<span class="Apple-converted-space">            </span>&lt;ChevronLeft size={20} /&gt; Voltar para a Central
<span class="Apple-converted-space">        </span>&lt;/button&gt;
<span class="Apple-converted-space">        </span>
<span class="Apple-converted-space">        </span>&lt;div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="bg-gradient-to-r from-blue-600 to-blue-500 p-10 text-white"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"&gt;
<span class="Apple-converted-space">                    </span>&lt;Kanban size={32} className="text-white" /&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;h1 className="text-3xl font-bold mb-4"&gt;Dominando o CRM de Vendas&lt;/h1&gt;
<span class="Apple-converted-space">                </span>&lt;p className="text-blue-100 text-lg max-w-2xl"&gt;O CRM (Customer Relationship Management) é o coração da sua operação comercial. Visualize exatamente em que etapa cada paciente está.&lt;/p&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;

<span class="Apple-converted-space">            </span>&lt;div className="p-10 space-y-12"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="flex gap-6"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0"&gt;1&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;
<span class="Apple-converted-space">                        </span>&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;O Conceito de Funil (Kanban)&lt;/h3&gt;
<span class="Apple-converted-space">                        </span>&lt;p className="text-slate-600 leading-relaxed mb-4"&gt;Organizamos seus pacientes em colunas visuais. Mova o paciente da esquerda (Novo) para a direita (Fechado).&lt;/p&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
);

const AgendaTutorial = ({ onBack }) =&gt; (
<span class="Apple-converted-space">    </span>&lt;div className="space-y-6 c-fade-in"&gt;
<span class="Apple-converted-space">         </span>&lt;button onClick={onBack} className="flex items-center text-slate-500 hover:text-green-600 transition-colors mb-4 font-medium"&gt;
<span class="Apple-converted-space">            </span>&lt;ChevronLeft size={20} /&gt; Voltar para a Central
<span class="Apple-converted-space">        </span>&lt;/button&gt;
<span class="Apple-converted-space">        </span>&lt;div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="bg-gradient-to-r from-green-600 to-green-500 p-10 text-white"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"&gt;&lt;CalendarIcon size={32} className="text-white" /&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;h1 className="text-3xl font-bold mb-4"&gt;Dominando a Agenda Inteligente&lt;/h1&gt;
<span class="Apple-converted-space">                </span>&lt;p className="text-green-100 text-lg max-w-2xl"&gt;Sua agenda centralizada: consultas, retornos e bloqueios, sincronizada com o CRM.&lt;/p&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="p-10 space-y-12"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="flex gap-6"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl shrink-0"&gt;1&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;Visualização Semanal&lt;/h3&gt;&lt;p className="text-slate-600 leading-relaxed"&gt;Navegue facilmente entre as semanas. O dia atual é destacado em azul claro.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
);

const AITutorial = ({ onBack }) =&gt; (
<span class="Apple-converted-space">    </span>&lt;div className="space-y-6 c-fade-in"&gt;
<span class="Apple-converted-space">         </span>&lt;button onClick={onBack} className="flex items-center text-slate-500 hover:text-purple-600 transition-colors mb-4 font-medium"&gt;&lt;ChevronLeft size={20} /&gt; Voltar para a Central&lt;/button&gt;
<span class="Apple-converted-space">         </span>&lt;div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="bg-gradient-to-r from-purple-600 to-purple-500 p-10 text-white"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"&gt;&lt;Brain size={32} className="text-white" /&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;h1 className="text-3xl font-bold mb-4"&gt;Atualizando a Base de Conhecimento&lt;/h1&gt;
<span class="Apple-converted-space">                </span>&lt;p className="text-purple-100 text-lg max-w-2xl"&gt;Atenção: Esta área NÃO serve para "treinar" a IA do zero. Ela já é inteligente. Aqui você apenas mantém a clínica atualizada.&lt;/p&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="p-10 space-y-12"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="flex gap-6"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl shrink-0"&gt;1&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;O que é a "Base de Conhecimento"?&lt;/h3&gt;&lt;p className="text-slate-600 leading-relaxed"&gt;É a biblioteca onde a Atena busca respostas, como preços e manuais.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">         </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
);

const ScriptsTutorial = ({ onBack }) =&gt; (
<span class="Apple-converted-space">    </span>&lt;div className="space-y-6 c-fade-in"&gt;
<span class="Apple-converted-space">         </span>&lt;button onClick={onBack} className="flex items-center text-slate-500 hover:text-amber-600 transition-colors mb-4 font-medium"&gt;&lt;ChevronLeft size={20} /&gt; Voltar para a Central&lt;/button&gt;
<span class="Apple-converted-space">         </span>&lt;div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="bg-gradient-to-r from-amber-600 to-amber-500 p-10 text-white"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"&gt;&lt;MessageSquareDashed size={32} className="text-white" /&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;h1 className="text-3xl font-bold mb-4"&gt;Dominando Scripts &amp; Playbooks&lt;/h1&gt;
<span class="Apple-converted-space">                </span>&lt;p className="text-amber-100 text-lg max-w-2xl"&gt;Use nossa biblioteca de alta conversão para padronizar o atendimento.&lt;/p&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="p-10 space-y-12"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="flex gap-6"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl shrink-0"&gt;1&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;A Biblioteca de Scripts&lt;/h3&gt;&lt;p className="text-slate-600 leading-relaxed"&gt;Mensagens prontas para cada situação: cobrar, confirmar, reativar.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">         </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
);

const FollowUpJourney = () =&gt; {
<span class="Apple-converted-space">    </span>const [activeStep, setActiveStep] = useState(0);
<span class="Apple-converted-space">    </span>const [selectedPlaybook, setSelectedPlaybook] = useState(null);<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">    </span>const playbooks = [
<span class="Apple-converted-space">        </span>{<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">            </span>id: 'standard', title: "Jornada Padrão (WhatsApp)", description: "A régua clássica e eficiente.", icon: MessageCircle, colorClass: "bg-blue-100 text-blue-600",<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">            </span>steps: [
<span class="Apple-converted-space">                </span>{ day: "D1 - 24h", title: "Primeiro Contato", desc: "Acolhimento imediato.", script: "Olá [Nome]! Vi seu interesse em [Procedimento]. Vamos agendar uma avaliação gratuita para quinta-feira?" },
<span class="Apple-converted-space">                </span>{ day: "D2", title: "Toque Pessoal (Áudio)", desc: "Humanização.", script: "(Áudio) Oi [Nome], esqueci de comentar um detalhe importante sobre o [Procedimento]..." },
<span class="Apple-converted-space">                </span>{ day: "D3", title: "Quebra de Objeção", desc: "Dúvidas?", script: "Oi [Nome], tudo bem? Muitas pessoas acham que [Procedimento] dói, mas a técnica mudou. Ficou alguma dúvida?" },
<span class="Apple-converted-space">                </span>{ day: "D5", title: "Prova Social", desc: "Mostrar resultados.", script: "Veja o que a Claudia achou do tratamento conosco! (Enviar foto/print)" },
<span class="Apple-converted-space">                </span>{ day: "D7", title: "Benefício Foco", desc: "Focar no ganho.", script: "Imagine seu sorriso novo nas fotos de fim de ano..." },
<span class="Apple-converted-space">                </span>{ day: "D15", title: "Escassez", desc: "Última chance do mês.", script: "Estou fechando a agenda do Dr. Silva. Tenho apenas 2 horários. Quer reservar um?" },
<span class="Apple-converted-space">                </span>{ day: "D45", title: "Breakup", desc: "Encerrar ciclo.", script: "Vou encerrar seu atendimento por aqui para não incomodar. Se mudar de ideia, estou à disposição." }
<span class="Apple-converted-space">            </span>]<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">        </span>},
<span class="Apple-converted-space">        </span>{<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">            </span>id: 'phone', title: "Follow-up Telefônico", description: "Maior taxa de contato.", icon: PhoneCall, colorClass: "bg-green-100 text-green-600",<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">            </span>steps: [
<span class="Apple-converted-space">                </span>{ day: "D0", title: "Ligação Imediata", desc: "Ligar em 10min.", script: "(Ligação) Olá [Nome], vi seu cadastro e o Dr. Silva tem um horário..." },
<span class="Apple-converted-space">                </span>{ day: "D1", title: "Tentativa 2", desc: "Horário alternativo.", script: "(Ligação) Oi [Nome], tentei falar mais cedo. Qual o melhor horário?" },
<span class="Apple-converted-space">                </span>{ day: "D3", title: "Ligação Gestor", desc: "Autoridade.", script: "(Ligação) Aqui é o gerente da clínica, vi que você não conseguiu agendar..." },
<span class="Apple-converted-space">                </span>{ day: "D7", title: "Apoio WhatsApp", desc: "Mandar msg se não atender.", script: "Tentei te ligar agora. Podemos falar por aqui?" }
<span class="Apple-converted-space">            </span>]<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">        </span>},
<span class="Apple-converted-space">        </span>{<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">            </span>id: 'social', title: "Prova Social (Visual)", description: "Foco em enviar fotos de Antes e Depois.", icon: Camera, colorClass: "bg-purple-100 text-purple-600",<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">            </span>steps: [
<span class="Apple-converted-space">                </span>{ day: "D1", title: "Envio de Caso", desc: "Resultados.", script: "Olha esse resultado incrível de ontem! (Foto)" },
<span class="Apple-converted-space">                </span>{ day: "D3", title: "Bastidores", desc: "Mostrar a clínica.", script: "Um tour rápido pela nossa sala de esterilização para você ver nossa segurança. (Vídeo)" },
<span class="Apple-converted-space">                </span>{ day: "D7", title: "Depoimento", desc: "Vídeo de paciente.", script: "Dá uma olhada no que a Dona Maria falou depois do implante dela." }
<span class="Apple-converted-space">            </span>]<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">        </span>},
<span class="Apple-converted-space">        </span>{<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">            </span>id: 'lost', title: "Recuperação de Sumidos", description: "Para leads frios.", icon: RefreshCcw, colorClass: "bg-amber-100 text-amber-600",<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">            </span>steps: [
<span class="Apple-converted-space">                </span>{ day: "D30", title: "Oferta Especial", desc: "Reativar contato.", script: "Olá [Nome], sumiu! Conseguimos uma condição especial de parcelamento..." },
<span class="Apple-converted-space">                </span>{ day: "D60", title: "Novidade", desc: "Novo tratamento.", script: "Chegou uma tecnologia nova aqui na clínica que lembrei de você..." },
<span class="Apple-converted-space">                </span>{ day: "D90", title: "Check-up", desc: "Saúde.", script: "Já faz 3 meses que conversamos. Que tal agendar um check-up preventivo?" }
<span class="Apple-converted-space">            </span>]<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">        </span>}
<span class="Apple-converted-space">    </span>];
<span class="Apple-converted-space">    </span>if (!selectedPlaybook) {
<span class="Apple-converted-space">        </span>return (
<span class="Apple-converted-space">            </span>&lt;div className="c-fade-in"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="mb-6"&gt;&lt;h2 className="text-xl font-bold text-slate-800"&gt;Escolha uma Estratégia&lt;/h2&gt;&lt;p className="text-slate-500"&gt;Selecione qual tipo de régua de follow-up você quer aplicar hoje.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="grid grid-cols-1 md:grid-cols-2 gap-6"&gt;{playbooks.map(pb =&gt; (&lt;PlaybookCard key={pb.id} title={pb.title} description={pb.description} icon={pb.icon} colorClass={pb.colorClass} onClick={() =&gt; setSelectedPlaybook(pb)}/&gt;))}&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>);
<span class="Apple-converted-space">    </span>}
<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="grid grid-cols-1 lg:grid-cols-3 gap-8 c-fade-in"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="lg:col-span-1 h-fit sticky top-6"&gt;&lt;button onClick={() =&gt; setSelectedPlaybook(null)} className="mb-4 flex items-center text-slate-500 hover:text-blue-600 font-medium transition-colors"&gt;&lt;ChevronLeft size={18} /&gt; Voltar&lt;/button&gt;&lt;div className={`rounded-xl p-8 text-white shadow-lg ${selectedPlaybook.id === 'phone' ? 'bg-green-600' : selectedPlaybook.id === 'social' ? 'bg-purple-600' : selectedPlaybook.id === 'lost' ? 'bg-amber-500' : 'bg-blue-600'}`}&gt;&lt;h2 className="text-2xl font-bold mb-4"&gt;{selectedPlaybook.title}&lt;/h2&gt;&lt;p className="text-white/90 mb-6"&gt;{selectedPlaybook.description}&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="lg:col-span-2"&gt;&lt;div className="max-w-2xl"&gt;{selectedPlaybook.steps.map((step, index) =&gt; (&lt;FollowUpStep key={index} {...step} isActive={activeStep === index} onClick={() =&gt; setActiveStep(index === activeStep ? null : index)}/&gt;))}&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

const FollowUpAcademy = () =&gt; {
<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="c-fade-in space-y-8"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="relative z-10 max-w-2xl"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="inline-flex items-center gap-2 bg-blue-800/50 px-3 py-1 rounded-full text-sm font-medium mb-4 border border-blue-500/30 text-blue-100"&gt;&lt;GraduationCap size={16} /&gt; Atena Academy&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight"&gt;Por que você está perdendo dinheiro todos os dias?&lt;/h1&gt;
<span class="Apple-converted-space">                    </span>&lt;p className="text-blue-100 text-lg leading-relaxed mb-6"&gt;A maioria das clínicas acredita que se o paciente não fechou na hora, ele não quer. Isso é um mito. Descubra o poder invisível do Follow-up.&lt;/p&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -mr-16 -mt-16 blur-3xl"&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="absolute bottom-0 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"&gt;&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="grid grid-cols-1 md:grid-cols-3 gap-6"&gt;
<span class="Apple-converted-space">                </span>{/* ... Academy Cards ... */}
<span class="Apple-converted-space">                </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"&gt;&lt;div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4"&gt;&lt;AlertTriangle size={24} className="text-rose-600" /&gt;&lt;/div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;A Regra dos 80%&lt;/h3&gt;&lt;p className="text-slate-600 text-sm leading-relaxed"&gt;Estudos mostram que &lt;strong className="text-rose-600"&gt;80% das vendas&lt;/strong&gt; acontecem entre o 5º e o 12º contato. Se você desiste no primeiro "vácuo", está deixando a maior parte do faturamento na mesa.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"&gt;&lt;div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4"&gt;&lt;Zap size={24} className="text-yellow-600" /&gt;&lt;/div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;Speed to Lead&lt;/h3&gt;&lt;p className="text-slate-600 text-sm leading-relaxed"&gt;Responder em até &lt;strong className="text-yellow-600"&gt;5 minutos&lt;/strong&gt; aumenta a chance de conversão em 9x.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"&gt;&lt;div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4"&gt;&lt;Lightbulb size={24} className="text-amber-600" /&gt;&lt;/div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;Não é ser "Chato"&lt;/h3&gt;&lt;p className="text-slate-600 text-sm leading-relaxed"&gt;Follow-up não é incomodar, é &lt;strong className="text-amber-600"&gt;prestar serviço&lt;/strong&gt;. As pessoas são ocupadas e esquecem.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                 </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"&gt;&lt;div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4"&gt;&lt;HelpCircle size={24} className="text-indigo-600" /&gt;&lt;/div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;Objeção é Interesse&lt;/h3&gt;&lt;p className="text-slate-600 text-sm leading-relaxed"&gt;Quem diz "está caro" ou "vou ver" está, na verdade, interessado. Quem não quer, apenas ignora. &lt;strong className="text-indigo-600"&gt;Objeção é um pedido&lt;/strong&gt; por mais informações e valor.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                 </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"&gt;&lt;div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4"&gt;&lt;BarChart3 size={24} className="text-emerald-600" /&gt;&lt;/div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;Custo Zero&lt;/h3&gt;&lt;p className="text-slate-600 text-sm leading-relaxed"&gt;Recuperar um lead antigo custa &lt;strong className="text-emerald-600"&gt;5x menos&lt;/strong&gt; do que atrair um novo com anúncios. Sua lista de contatos "mortos" é uma mina de ouro inexplorada.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                 </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"&gt;&lt;div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4"&gt;&lt;Gem size={24} className="text-pink-600" /&gt;&lt;/div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;O Poder do LTV&lt;/h3&gt;&lt;p className="text-slate-600 text-sm leading-relaxed"&gt;Não olhe apenas para a primeira consulta. Um paciente fiel volta por anos e indica família e amigos. O &lt;strong className="text-pink-600"&gt;Lifetime Value&lt;/strong&gt; é onde está o lucro real da clínica.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                 </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"&gt;&lt;div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4"&gt;&lt;UserCheck size={24} className="text-teal-600" /&gt;&lt;/div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;Humanização&lt;/h3&gt;&lt;p className="text-slate-600 text-sm leading-relaxed"&gt;Ninguém gosta de falar com robôs genéricos. Use o nome do paciente, cite o procedimento específico. &lt;strong className="text-teal-600"&gt;Personalização&lt;/strong&gt; gera conexão e confiança imediatas.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                 </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"&gt;&lt;div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4"&gt;&lt;Share2 size={24} className="text-orange-600" /&gt;&lt;/div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;Omnichannel&lt;/h3&gt;&lt;p className="text-slate-600 text-sm leading-relaxed"&gt;Se o cliente não responde no WhatsApp, ligue. Se não atender, mande um áudio. Esteja onde ele está. &lt;strong className="text-orange-600"&gt;Diversificar canais&lt;/strong&gt; aumenta sua taxa de contato drasticamente.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                 </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all"&gt;&lt;div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4"&gt;&lt;Repeat size={24} className="text-cyan-600" /&gt;&lt;/div&gt;&lt;h3 className="text-xl font-bold text-slate-800 mb-2"&gt;Acompanhamento Eterno&lt;/h3&gt;&lt;p className="text-slate-600 text-sm leading-relaxed"&gt;A venda não acaba no pagamento. O pós-venda é o pré-venda da próxima consulta. Manter contato constante garante que seu paciente &lt;strong className="text-cyan-600"&gt;nunca esqueça de você&lt;/strong&gt;.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

const HelpCenter = () =&gt; {
<span class="Apple-converted-space">    </span>const [selectedTopic, setSelectedTopic] = useState(null);

<span class="Apple-converted-space">    </span>if (selectedTopic === 'crm') return &lt;CRMTutorial onBack={() =&gt; setSelectedTopic(null)} /&gt;;
<span class="Apple-converted-space">    </span>if (selectedTopic === 'agenda') return &lt;AgendaTutorial onBack={() =&gt; setSelectedTopic(null)} /&gt;;
<span class="Apple-converted-space">    </span>if (selectedTopic === 'ai-config') return &lt;AITutorial onBack={() =&gt; setSelectedTopic(null)} /&gt;;
<span class="Apple-converted-space">    </span>if (selectedTopic === 'scripts') return &lt;ScriptsTutorial onBack={() =&gt; setSelectedTopic(null)} /&gt;;

<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="space-y-8 c-fade-in pb-20 md:pb-0"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600"&gt;&lt;BookOpen size={32}/&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;h1 className="text-3xl font-bold text-slate-900 mb-2"&gt;Central de Ajuda&lt;/h1&gt;
<span class="Apple-converted-space">                </span>&lt;p className="text-slate-600 max-w-2xl mx-auto"&gt;Tudo o que você precisa saber para dominar o AtenaChat e transformar sua clínica.&lt;/p&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;

<span class="Apple-converted-space">            </span>&lt;div className="grid grid-cols-1 md:grid-cols-2 gap-6"&gt;
<span class="Apple-converted-space">                </span>&lt;div<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">                    </span>onClick={() =&gt; setSelectedTopic('crm')}
<span class="Apple-converted-space">                    </span>className="bg-white p-6 rounded-xl border border-slate-100 hover:border-blue-200 transition-all group cursor-pointer"
<span class="Apple-converted-space">                </span>&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="flex items-start gap-4"&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"&gt;&lt;Kanban size={24}/&gt;&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;div&gt;
<span class="Apple-converted-space">                            </span>&lt;h3 className="font-bold text-slate-800 text-lg mb-2"&gt;Como usar o CRM&lt;/h3&gt;
<span class="Apple-converted-space">                            </span>&lt;p className="text-slate-500 text-sm mb-4"&gt;Aprenda a mover os cards, criar novas colunas e gerenciar o status dos seus pacientes.&lt;/p&gt;
<span class="Apple-converted-space">                            </span>&lt;span className="text-blue-600 text-sm font-bold flex items-center gap-1"&gt;Ler tutorial &lt;ArrowRight size={14}/&gt;&lt;/span&gt;
<span class="Apple-converted-space">                        </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;

<span class="Apple-converted-space">                </span>&lt;div<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">                    </span>onClick={() =&gt; setSelectedTopic('ai-config')}
<span class="Apple-converted-space">                    </span>className="bg-white p-6 rounded-xl border border-slate-100 hover:border-purple-200 transition-all group cursor-pointer"
<span class="Apple-converted-space">                </span>&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="flex items-start gap-4"&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="p-3 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors"&gt;&lt;Brain size={24}/&gt;&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;div&gt;
<span class="Apple-converted-space">                            </span>&lt;h3 className="font-bold text-slate-800 text-lg mb-2"&gt;Atualizando a Base de Conhecimento&lt;/h3&gt;
<span class="Apple-converted-space">                            </span>&lt;p className="text-slate-500 text-sm mb-4"&gt;Como notificar a IA sobre mudanças de preços, horários e novos procedimentos.&lt;/p&gt;
<span class="Apple-converted-space">                            </span>&lt;span className="text-purple-600 text-sm font-bold flex items-center gap-1"&gt;Ler tutorial &lt;ArrowRight size={14}/&gt;&lt;/span&gt;
<span class="Apple-converted-space">                        </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;

<span class="Apple-converted-space">                </span>&lt;div<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">                    </span>onClick={() =&gt; setSelectedTopic('agenda')}
<span class="Apple-converted-space">                    </span>className="bg-white p-6 rounded-xl border border-slate-100 hover:border-green-200 transition-all group cursor-pointer"
<span class="Apple-converted-space">                </span>&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="flex items-start gap-4"&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="p-3 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors"&gt;&lt;CalendarIcon size={24}/&gt;&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;div&gt;
<span class="Apple-converted-space">                            </span>&lt;h3 className="font-bold text-slate-800 text-lg mb-2"&gt;Agenda Inteligente&lt;/h3&gt;
<span class="Apple-converted-space">                            </span>&lt;p className="text-slate-500 text-sm mb-4"&gt;Como visualizar seus agendamentos, confirmar horários e bloquear datas.&lt;/p&gt;
<span class="Apple-converted-space">                            </span>&lt;span className="text-green-600 text-sm font-bold flex items-center gap-1"&gt;Ler tutorial &lt;ArrowRight size={14}/&gt;&lt;/span&gt;
<span class="Apple-converted-space">                        </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;

<span class="Apple-converted-space">                </span>&lt;div<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">                    </span>onClick={() =&gt; setSelectedTopic('scripts')}
<span class="Apple-converted-space">                    </span>className="bg-white p-6 rounded-xl border border-slate-100 hover:border-amber-200 transition-all group cursor-pointer"
<span class="Apple-converted-space">                </span>&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="flex items-start gap-4"&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="p-3 bg-amber-50 rounded-lg text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors"&gt;&lt;MessageSquareDashed size={24}/&gt;&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;div&gt;
<span class="Apple-converted-space">                            </span>&lt;h3 className="font-bold text-slate-800 text-lg mb-2"&gt;Scripts &amp; Playbooks&lt;/h3&gt;
<span class="Apple-converted-space">                            </span>&lt;p className="text-slate-500 text-sm mb-4"&gt;Descubra como copiar nossos modelos de alta conversão e aplicar na sua rotina.&lt;/p&gt;
<span class="Apple-converted-space">                            </span>&lt;span className="text-amber-600 text-sm font-bold flex items-center gap-1"&gt;Ler tutorial &lt;ArrowRight size={14}/&gt;&lt;/span&gt;
<span class="Apple-converted-space">                        </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;

<span class="Apple-converted-space">            </span>&lt;div className="bg-blue-50 rounded-xl p-6 border border-blue-100 flex items-center justify-between"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="flex items-center gap-4"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="bg-white p-3 rounded-full text-blue-600"&gt;&lt;PhoneCall size={24}/&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div&gt;
<span class="Apple-converted-space">                        </span>&lt;h4 className="font-bold text-slate-800"&gt;Precisa de ajuda humana?&lt;/h4&gt;
<span class="Apple-converted-space">                        </span>&lt;p className="text-sm text-slate-600"&gt;Nosso suporte funciona de Seg a Sex, das 09h às 18h.&lt;/p&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700"&gt;Falar no WhatsApp&lt;/button&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};


// ==========================================
// 4. MAIN PAGES (Layout Composition)
// ==========================================

const Overview = () =&gt; (
<span class="Apple-converted-space">  </span>&lt;div className="space-y-6 c-fade-in pb-20 md:pb-0"&gt;
<span class="Apple-converted-space">    </span>&lt;div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"&gt;
<span class="Apple-converted-space">      </span>&lt;div&gt;&lt;h1 className="text-3xl font-bold text-slate-900"&gt;Visão Geral&lt;/h1&gt;&lt;p className="text-slate-500 mt-1"&gt;Análise de desempenho da clínica&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">      </span>&lt;div className="flex gap-2 bg-slate-100 p-1 rounded-lg self-start md:self-auto"&gt;&lt;button className="px-4 py-2 text-slate-600 rounded-md text-sm hover:bg-white hover:shadow-sm transition-all"&gt;Hoje&lt;/button&gt;&lt;button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm shadow-sm transition-all"&gt;Semana&lt;/button&gt;&lt;button className="px-4 py-2 text-slate-600 rounded-md text-sm hover:bg-white hover:shadow-sm transition-all"&gt;Mês&lt;/button&gt;&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"&gt;
<span class="Apple-converted-space">      </span>&lt;DashboardStatCard title="Leads Totais" value="108" icon={MessageSquare} iconBgColor="bg-blue-50" textColor="text-blue-600" /&gt;
<span class="Apple-converted-space">      </span>&lt;DashboardStatCard title="Novos Pacientes" value="42" icon={Users} iconBgColor="bg-blue-50" textColor="text-blue-600" /&gt;
<span class="Apple-converted-space">      </span>&lt;DashboardStatCard title="Agendamentos IA" value="80" icon={Stethoscope} iconBgColor="bg-green-50" textColor="text-green-600" /&gt;<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">      </span>&lt;DashboardStatCard title="Taxa de Conversão" value="17%" icon={TrendingUp} iconBgColor="bg-green-50" textColor="text-green-600" /&gt;
<span class="Apple-converted-space">      </span>&lt;DashboardStatCard title="Resgatados" value="15" icon={RefreshCcw} iconBgColor="bg-amber-50" textColor="text-amber-600" /&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"&gt;
<span class="Apple-converted-space">      </span>&lt;div className="flex justify-between items-center mb-6"&gt;&lt;div&gt;&lt;h3 className="font-bold text-slate-800"&gt;Novos Contatos vs Agendamentos&lt;/h3&gt;&lt;p className="text-slate-500 text-sm"&gt;Comparativo semanal&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">      </span>&lt;AreaChartComparison /&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">  </span>&lt;/div&gt;
);

const CRM = () =&gt; {
<span class="Apple-converted-space">  </span>const [columns, setColumns] = useState([{ id: 'c1', title: 'Novos Leads', color: 'blue', cards: [{ id: '1', name: 'Mariana Santos', source: 'Instagram', time: '10 min' }, { id: '2', name: 'João Silva', source: 'Site', time: '45 min' }, { id: '3', name: 'Pedro Costa', source: 'Indicação', time: '2h' }] }, { id: 'c2', title: 'Em Conversa', color: 'amber', cards: [{ id: '4', name: 'Ana Clara', source: 'WhatsApp', time: 'Aguardando resposta', procedure: 'Clareamento' }, { id: '5', name: 'Roberto Dias', source: 'Instagram', time: 'Em atendimento' }] }, { id: 'c3', title: 'Agendados', color: 'green', cards: [{ id: '6', name: 'Júlia Mota', source: 'Retorno', time: 'Amanhã, 14:00', value: '300', procedure: 'Limpeza' }, { id: '7', name: 'Marcos V.', source: 'Site', time: 'Sexta, 09:00', procedure: 'Avaliação' }] }, { id: 'c4', title: 'Tratamento', color: 'purple', cards: [{ id: '8', name: 'Felipe Neto', source: 'Indicação', time: 'Invisalign', value: '12.000', procedure: 'Ortodontia' }] }, { id: 'c5', title: 'Recuperação', color: 'rose', cards: [{ id: '9', name: 'Tiago Leifert', source: 'Instagram', time: 'Não compareceu' }] }, { id: 'c6', title: 'Fechados', color: 'slate', cards: [{ id: '10', name: 'Sandra Bull', source: 'Google', time: 'Concluído', value: '5.000', procedure: 'Implante' }] }]);
<span class="Apple-converted-space">  </span>const [selectedLead, setSelectedLead] = useState(null);
<span class="Apple-converted-space">  </span>const addColumn = () =&gt; { const title = prompt("Nome da nova coluna:"); if (title) { setColumns([...columns, { id: Date.now().toString(), title, color: 'slate', cards: [] }]); } };
<span class="Apple-converted-space">  </span>const removeColumn = (id) =&gt; { if (window.confirm("Tem certeza que deseja remover esta coluna?")) { setColumns(columns.filter(c =&gt; c.id !== id)); } };
<span class="Apple-converted-space">  </span>const openNewLeadModal = () =&gt; { setSelectedLead({}); };
<span class="Apple-converted-space">  </span>const handleSaveLead = (leadData) =&gt; { if (leadData.id) { const newColumns = columns.map(col =&gt; ({ ...col, cards: col.cards.map(card =&gt; card.id === leadData.id ? { ...card, ...leadData } : card) })); setColumns(newColumns); } else { const newCard = { ...leadData, id: Date.now().toString() }; const newColumns = [...columns]; if (newColumns.length &gt; 0) { newColumns[0].cards = [newCard, ...newColumns[0].cards]; setColumns(newColumns); } } };
<span class="Apple-converted-space">  </span>return (
<span class="Apple-converted-space">      </span>&lt;&gt;
<span class="Apple-converted-space">        </span>&lt;div className="h-[calc(100vh-6rem)] flex flex-col c-fade-in relative"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 flex-shrink-0"&gt;
<span class="Apple-converted-space">            </span>&lt;div&gt;&lt;h1 className="text-3xl font-bold text-slate-900"&gt;CRM de Vendas&lt;/h1&gt;&lt;p className="text-slate-600"&gt;Gerencie seu funil de pacientes de forma visual.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="flex gap-2 flex-wrap"&gt;&lt;button className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium flex items-center gap-2"&gt;&lt;FileUp size={16} /&gt; &lt;span className="hidden xl:inline"&gt;Importar&lt;/span&gt;&lt;/button&gt;&lt;button className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium flex items-center gap-2"&gt;&lt;FileDown size={16} /&gt; &lt;span className="hidden xl:inline"&gt;Exportar&lt;/span&gt;&lt;/button&gt;&lt;div className="w-px h-8 bg-slate-200 mx-1 hidden md:block"&gt;&lt;/div&gt;&lt;button onClick={addColumn} className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium flex items-center gap-2"&gt;&lt;Plus size={16} /&gt; &lt;span className="hidden md:inline"&gt;Coluna&lt;/span&gt;&lt;/button&gt;&lt;button onClick={openNewLeadModal} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm text-sm font-bold flex items-center gap-2"&gt;&lt;Users size={16} /&gt; &lt;span className="hidden md:inline"&gt;Novo Lead&lt;/span&gt;&lt;span className="md:hidden"&gt;Add&lt;/span&gt;&lt;/button&gt;&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="flex-1 overflow-x-auto"&gt;&lt;div className="flex gap-6 h-full min-w-max pb-2 px-1"&gt;{columns.map(col =&gt; (&lt;KanbanColumn key={col.id} title={col.title} count={col.cards.length} color={col.color} onDelete={() =&gt; removeColumn(col.id)}&gt;{col.cards.map(card =&gt; (&lt;KanbanCard key={card.id} data={card} onClick={() =&gt; setSelectedLead(card)} /&gt;))}&lt;/KanbanColumn&gt;))}&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>{selectedLead &amp;&amp; &lt;LeadModal lead={selectedLead} onClose={() =&gt; setSelectedLead(null)} onSave={handleSaveLead} /&gt;}
<span class="Apple-converted-space">      </span>&lt;/&gt;
<span class="Apple-converted-space">  </span>);
};

const Agenda = () =&gt; {
<span class="Apple-converted-space">    </span>const hours = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
<span class="Apple-converted-space">    </span>const [referenceDate, setReferenceDate] = useState(new Date());
<span class="Apple-converted-space">    </span>const [weekDays, setWeekDays] = useState([]);
<span class="Apple-converted-space">    </span>const getMonday = (d) =&gt; { d = new Date(d); const day = d.getDay(); const diff = d.getDate() - day + (day === 0 ? -6 : 1); return new Date(d.setDate(diff)); }
<span class="Apple-converted-space">    </span>useEffect(() =&gt; { const startOfWeek = getMonday(referenceDate); const days = []; for (let i = 0; i &lt; 5; i++) { const d = new Date(startOfWeek); d.setDate(startOfWeek.getDate() + i); days.push({ dayName: d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''), dayNumber: d.getDate(), fullDate: d.toISOString().split('T')[0] }); } setWeekDays(days); }, [referenceDate]);
<span class="Apple-converted-space">    </span>const handlePrevWeek = () =&gt; { const newDate = new Date(referenceDate); newDate.setDate(newDate.getDate() - 7); setReferenceDate(newDate); };
<span class="Apple-converted-space">    </span>const handleNextWeek = () =&gt; { const newDate = new Date(referenceDate); newDate.setDate(newDate.getDate() + 7); setReferenceDate(newDate); };
<span class="Apple-converted-space">    </span>const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
<span class="Apple-converted-space">    </span>const getMonthLabel = () =&gt; { if(weekDays.length === 0) return ""; const firstDay = new Date(weekDays[0].fullDate); const lastDay = new Date(weekDays[4].fullDate); if(firstDay.getMonth() === lastDay.getMonth()) { return `${monthNames[firstDay.getMonth()]} ${firstDay.getFullYear()}`; } return `${monthNames[firstDay.getMonth()]} - ${monthNames[lastDay.getMonth()]} ${lastDay.getFullYear()}`; }
<span class="Apple-converted-space">    </span>const dateRangeText = weekDays.length &gt; 0 ? `${weekDays[0].dayNumber} - ${weekDays[4].dayNumber} ${getMonthLabel()}` : 'Carregando...';
<span class="Apple-converted-space">    </span>const [appointments, setAppointments] = useState([ { id: 1, date: new Date().toISOString().split('T')[0], time: "09:00", name: "Ana Clara", type: "Avaliação", status: "confirmed" }, { id: 2, date: new Date().toISOString().split('T')[0], time: "14:00", name: "Pedro H.", type: "Manutenção", status: "pending" }, { id: 3, date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], time: "10:00", name: "Mariana C.", type: "Limpeza", status: "confirmed" } ]);
<span class="Apple-converted-space">    </span>const [editingAppt, setEditingAppt] = useState(null);
<span class="Apple-converted-space">    </span>const getAppt = (dateStr, time) =&gt; appointments.find(a =&gt; a.date === dateStr &amp;&amp; a.time === time);
<span class="Apple-converted-space">    </span>const handleSaveAppt = (apptData) =&gt; { if (apptData.id) { setAppointments(appointments.map(a =&gt; a.id === apptData.id ? apptData : a)); } else { setAppointments([...appointments, { ...apptData, id: Date.now() }]); } setEditingAppt(null); };
<span class="Apple-converted-space">    </span>const confirmAppt = (e, id) =&gt; { e.stopPropagation(); setAppointments(appointments.map(a =&gt; a.id === id ? { ...a, status: 'confirmed' } : a)); };
<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;&gt;
<span class="Apple-converted-space">        </span>&lt;div className="space-y-6 c-fade-in pb-20 md:pb-0"&gt;&lt;div className="flex flex-col md:flex-row justify-between items-center gap-4"&gt;&lt;div&gt;&lt;h1 className="text-3xl font-bold text-slate-900"&gt;Agenda&lt;/h1&gt;&lt;p className="text-slate-600"&gt;Visualize e gerencie seus agendamentos.&lt;/p&gt;&lt;/div&gt;&lt;div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm"&gt;&lt;button onClick={handlePrevWeek} className="p-2 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"&gt;&lt;ChevronLeft size={20}/&gt;&lt;/button&gt;&lt;span className="px-4 font-bold text-slate-700 text-sm min-w-[180px] text-center capitalize"&gt;{dateRangeText}&lt;/span&gt;&lt;button onClick={handleNextWeek} className="p-2 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"&gt;&lt;ChevronRight size={20}/&gt;&lt;/button&gt;&lt;/div&gt;&lt;/div&gt;&lt;div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"&gt;&lt;div className="grid grid-cols-6 border-b border-slate-100"&gt;&lt;div className="p-4 border-r border-slate-100 bg-slate-50 text-center text-xs font-bold text-slate-400 flex items-center justify-center"&gt;HORA&lt;/div&gt;{weekDays.map((d, i) =&gt; (&lt;div key={i} className={`p-4 text-center border-r border-slate-100 last:border-r-0 ${i === 0 ? 'bg-blue-50/30' : ''}`}&gt;&lt;div className={`text-xs font-bold uppercase mb-1 ${i === 0 ? 'text-blue-600' : 'text-slate-400'}`}&gt;{d.dayName}&lt;/div&gt;&lt;div className={`text-xl font-bold ${i === 0 ? 'text-blue-700' : 'text-slate-700'}`}&gt;{d.dayNumber}&lt;/div&gt;&lt;/div&gt;))}&lt;/div&gt;&lt;div className="divide-y divide-slate-100"&gt;{hours.map((hour) =&gt; (&lt;div key={hour} className="grid grid-cols-6 h-24"&gt;&lt;div className="p-2 border-r border-slate-100 text-xs font-medium text-slate-400 flex items-start justify-center pt-3 bg-slate-50/50"&gt;{hour}&lt;/div&gt;{weekDays.map((d, i) =&gt; { const appt = getAppt(d.fullDate, hour); return (&lt;div key={i} className="border-r border-slate-100 last:border-r-0 p-1 relative group transition-colors hover:bg-slate-50"&gt;{appt ? (&lt;div onClick={() =&gt; setEditingAppt(appt)} className={`w-full h-full rounded-lg p-2 text-xs flex flex-col justify-between border cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-md ${appt.status === 'confirmed' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}&gt;&lt;div className="font-bold truncate"&gt;{appt.name}&lt;/div&gt;&lt;div&gt;&lt;div className="opacity-80 truncate"&gt;{appt.type}&lt;/div&gt;{appt.status === 'pending' &amp;&amp; (&lt;button onClick={(e) =&gt; confirmAppt(e, appt.id)} className="mt-1 text-[10px] bg-white/50 px-1 rounded inline-block font-bold hover:bg-white hover:text-emerald-600 transition-colors"&gt;Confirmar?&lt;/button&gt;)}&lt;/div&gt;&lt;/div&gt;) : (&lt;div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100"&gt;&lt;button onClick={() =&gt; setEditingAppt({ date: d.fullDate, time: hour, status: 'pending', name: '', type: '' })} className="p-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"&gt;&lt;Plus size={14} /&gt;&lt;/button&gt;&lt;/div&gt;)}&lt;/div&gt;); })}&lt;/div&gt;))}&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">        </span>{editingAppt &amp;&amp; &lt;AppointmentModal appointment={editingAppt} onClose={() =&gt; setEditingAppt(null)} onSave={handleSaveAppt} /&gt;}
<span class="Apple-converted-space">        </span>&lt;/&gt;
<span class="Apple-converted-space">    </span>);
};

const ScriptsLibrary = () =&gt; {
<span class="Apple-converted-space">    </span>const [viewMode, setViewMode] = useState('library');
<span class="Apple-converted-space">    </span>const [filter, setFilter] = useState('Todos');
<span class="Apple-converted-space">    </span>const [searchTerm, setSearchTerm] = useState('');
<span class="Apple-converted-space">    </span>const [isModalOpen, setIsModalOpen] = useState(false);
<span class="Apple-converted-space">    </span>const [scripts, setScripts] = useState([
<span class="Apple-converted-space">        </span>{ id: 1, category: 'Reativação', title: 'Sumido (Soft)', text: "Oi [Nome], sumiu! Tudo bem? 😊 Faz tempo que não te vemos. Como está esse sorriso?" },
<span class="Apple-converted-space">        </span>{ id: 2, category: 'Reativação', title: 'Saúde (Autoridade)', text: "Olá [Nome], o Dr. Silva pediu para te lembrar que a prevenção evita tratamentos caros no futuro. Vamos agendar seu check-up?" },
<span class="Apple-converted-space">        </span>{ id: 3, category: 'Reativação', title: 'Promo (Oferta)', text: "Oi [Nome]! Semana do Cliente Sumido: limpeza com 20% OFF só para quem não vem há 6 meses. Vamos aproveitar?" },
<span class="Apple-converted-space">        </span>{ id: 4, category: 'Reativação', title: 'Urgência (Escassez)', text: "[Nome], estamos fechando a agenda do mês e notei que seu retorno está atrasado. Tenho apenas 2 horários. Quer um?" },
<span class="Apple-converted-space">        </span>{ id: 5, category: 'Reativação', title: 'Curiosidade', text: "Você sabia que a maioria dos problemas dentários são silenciosos? Não deixe para sentir dor. Agende agora." },
<span class="Apple-converted-space">        </span>{ id: 26, category: 'Reativação', title: 'Reativação Anual', text: "Oi [Nome], faz um ano que cuidamos do seu sorriso! ✨ Como o tempo passa rápido. Que tal agendar aquele check-up anual preventivo?" },
<span class="Apple-converted-space">        </span>
<span class="Apple-converted-space">        </span>{ id: 6, category: 'Confirmação', title: 'Padrão', text: "Olá [Nome], confirmando sua consulta amanhã às [Hora]. Responda Sim para confirmar." },
<span class="Apple-converted-space">        </span>{ id: 7, category: 'Confirmação', title: 'Valorização', text: "Tudo pronto para sua transformação amanhã, [Nome]! O Dr. Silva está te aguardando às [Hora]. Confirma?" },
<span class="Apple-converted-space">        </span>{ id: 8, category: 'Confirmação', title: 'Perda', text: "Oi [Nome], a procura está alta! Se não confirmar até as 14h, precisarei liberar seu horário. Pode confirmar?" },
<span class="Apple-converted-space">        </span>{ id: 9, category: 'Confirmação', title: 'Logística', text: "Lembrete: Amanhã às [Hora]. Temos estacionamento no local. Confirma sua presença?" },
<span class="Apple-converted-space">        </span>{ id: 10, category: 'Confirmação', title: 'Empatia', text: "Sabemos que imprevistos acontecem. Se não puder vir amanhã às [Hora], me avise agora para reagendarmos sem taxa." },

<span class="Apple-converted-space">        </span>{ id: 11, category: 'Vendas', title: 'Invisalign (Desejo)', text: "Imagine alinhar seus dentes sem ninguém perceber? O Invisalign faz isso. Agende uma simulação hoje." },
<span class="Apple-converted-space">        </span>{ id: 12, category: 'Vendas', title: 'Implante (Segurança)', text: "Volte a sorrir com segurança. Nossos implantes têm garantia vitalícia. Quer saber como funciona?" },
<span class="Apple-converted-space">        </span>{ id: 13, category: 'Vendas', title: 'Clareamento (Vaidade)', text: "Seu sorriso pode ser até 3 tons mais branco em 1 hora. Temos uma vaga para Laser hoje. Bora?" },
<span class="Apple-converted-space">        </span>{ id: 14, category: 'Vendas', title: 'Harmonização (Tendência)', text: "O segredo das celebridades agora aqui na clínica. Botox day nesta sexta. Quer garantir sua vaga?" },
<span class="Apple-converted-space">        </span>{ id: 15, category: 'Vendas', title: 'Check-up (Prevenção)', text: "Não espere doer! Um check-up hoje economiza milhares de reais amanhã. Vamos agendar?" },
<span class="Apple-converted-space">        </span>{ id: 27, category: 'Vendas', title: 'Fechamento de Mês', text: "[Nome], meu gerente liberou 3 vagas com condição de Black Friday para fechar a meta. Consigo isentar a documentação se fecharmos até sexta." },

<span class="Apple-converted-space">        </span>{ id: 16, category: 'Cobrança', title: 'Esquecimento (Suave)', text: "Oi [Nome], acho que o boleto de hoje passou batido rs. Segue a 2ª via para facilitar!" },
<span class="Apple-converted-space">        </span>{ id: 17, category: 'Cobrança', title: 'Ajuda', text: "Olá [Nome], vimos que o pagamento está pendente. Teve algum problema com o banco? Posso ajudar?" },
<span class="Apple-converted-space">        </span>{ id: 18, category: 'Cobrança', title: 'Negociação', text: "Oi [Nome], para evitar juros, que tal regularizarmos sua pendência hoje com um desconto nos encargos?" },
<span class="Apple-converted-space">        </span>{ id: 19, category: 'Cobrança', title: 'Alerta', text: "Consta uma pendência no sistema. Regularize hoje para manter seu cadastro ativo para próximas consultas." },
<span class="Apple-converted-space">        </span>{ id: 20, category: 'Cobrança', title: 'Final', text: "Olá [Nome], precisamos resolver sua pendência financeira para dar continuidade ao tratamento. Aguardo seu retorno." },
<span class="Apple-converted-space">        </span>{ id: 28, category: 'Cobrança', title: 'Boleto em Aberto', text: "Olá [Nome], tudo bem? O sistema acusou que o boleto do dia 10 ainda está em aberto. Acredito que tenha sido apenas esquecimento. Segue a segunda via atualizada!" },

<span class="Apple-converted-space">        </span>{ id: 21, category: 'Pós-Venda', title: 'Cuidado', text: "E aí [Nome], como passou a noite após a extração? Alguma dor? Estou por aqui." },
<span class="Apple-converted-space">        </span>{ id: 22, category: 'Pós-Venda', title: 'NPS', text: "De 0 a 10, quanto você indicaria a Clínica Vida? Sua opinião ajuda a gente a melhorar!" },
<span class="Apple-converted-space">        </span>{ id: 23, category: 'Pós-Venda', title: 'Indicação', text: "Gostou do resultado? Indique um amigo e ganhe um kit de clareamento caseiro se ele fechar tratamento!" },
<span class="Apple-converted-space">        </span>{ id: 24, category: 'Pós-Venda', title: 'Google', text: "Oi [Nome], poderia nos dar 5 estrelas no Google? Ajuda muito! Segue o link..." },
<span class="Apple-converted-space">        </span>{ id: 25, category: 'Pós-Venda', title: 'Lembrete Retorno', text: "O tempo voa! Já faz 4 meses do seu implante. Vamos marcar a revisão de garantia?" },
<span class="Apple-converted-space">        </span>{ id: 29, category: 'Pós-Venda', title: 'Pesquisa de Satisfação', text: "Oi [Nome]! O Dr. Silva pediu para eu te perguntar pessoalmente: o que achou do atendimento ontem? Sua opinião é muito importante para nós. ⭐" },
<span class="Apple-converted-space">    </span>]);
<span class="Apple-converted-space">    </span>
<span class="Apple-converted-space">    </span>const handleAddScript = (data) =&gt; { if(!data.title) return; setScripts([{id: Date.now(), ...data}, ...scripts]); setIsModalOpen(false); }
<span class="Apple-converted-space">    </span>const handleDeleteScript = (id) =&gt; { if(window.confirm("Excluir?")) setScripts(scripts.filter(s =&gt; s.id !== id)); }
<span class="Apple-converted-space">    </span>const filtered = scripts.filter(s =&gt; (filter === 'Todos' || s.category === filter) &amp;&amp; s.title.toLowerCase().includes(searchTerm.toLowerCase()));

<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="space-y-6 c-fade-in pb-20 md:pb-0"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="flex flex-col md:flex-row justify-between items-start gap-4"&gt;
<span class="Apple-converted-space">                </span>&lt;div&gt;&lt;h1 className="text-3xl font-bold text-slate-900"&gt;Scripts &amp; Playbook&lt;/h1&gt;&lt;p className="text-slate-600"&gt;Biblioteca estratégica.&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="bg-slate-100 p-1 rounded-lg flex gap-1"&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={() =&gt; setViewMode('library')} className={`px-3 py-2 rounded-md text-sm font-medium ${viewMode === 'library' ? 'bg-white shadow' : ''}`}&gt;Biblioteca&lt;/button&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={() =&gt; setViewMode('journey')} className={`px-3 py-2 rounded-md text-sm font-medium ${viewMode === 'journey' ? 'bg-white shadow' : ''}`}&gt;Estratégias&lt;/button&gt;
<span class="Apple-converted-space">                    </span>&lt;button onClick={() =&gt; setViewMode('academy')} className={`px-3 py-2 rounded-md text-sm font-bold ${viewMode === 'academy' ? 'bg-white shadow text-rose-600' : ''}`}&gt;Academy&lt;/button&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>{viewMode === 'library' &amp;&amp; (
<span class="Apple-converted-space">                </span>&lt;&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="flex flex-col md:flex-row justify-between gap-4"&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar flex-1"&gt;{['Todos', 'Reativação', 'Vendas', 'Cobrança', 'Pós-Venda', 'Aniversário'].map(cat =&gt; (&lt;button key={cat} onClick={() =&gt; setFilter(cat)} className={`px-4 py-2 rounded-full text-sm ${filter === cat ? 'bg-blue-600 text-white' : 'bg-white border'}`}&gt;{cat}&lt;/button&gt;))}&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="flex gap-2"&gt;&lt;input type="text" placeholder="Buscar..." className="p-2 border rounded" onChange={e =&gt; setSearchTerm(e.target.value)}/&gt;&lt;button onClick={() =&gt; setIsModalOpen(true)} className="p-2 bg-blue-600 text-white rounded"&gt;&lt;Plus size={20}/&gt;&lt;/button&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;{filtered.map(s =&gt; &lt;ScriptCard key={s.id} {...s} onDelete={() =&gt; handleDeleteScript(s.id)} /&gt;)}&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/&gt;
<span class="Apple-converted-space">            </span>)}
<span class="Apple-converted-space">            </span>{viewMode === 'journey' &amp;&amp; &lt;FollowUpJourney /&gt;}
<span class="Apple-converted-space">            </span>{viewMode === 'academy' &amp;&amp; &lt;FollowUpAcademy /&gt;}
<span class="Apple-converted-space">            </span>{isModalOpen &amp;&amp; &lt;AddScriptModal onClose={() =&gt; setIsModalOpen(false)} onSave={handleAddScript} /&gt;}
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

const Patients = () =&gt; (
<span class="Apple-converted-space">  </span>&lt;div className="space-y-6 c-fade-in"&gt;
<span class="Apple-converted-space">    </span>&lt;div className="flex justify-between items-center"&gt;&lt;h1 className="text-3xl font-bold text-slate-900"&gt;Pacientes&lt;/h1&gt;&lt;button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-md transition-all hover:shadow-lg"&gt;&lt;Users size={18} /&gt; Novo Paciente&lt;/button&gt;&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"&gt;
<span class="Apple-converted-space">      </span>&lt;div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4"&gt;&lt;div className="relative flex-1"&gt;&lt;Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} /&gt;&lt;input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500" /&gt;&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">      </span>&lt;div className="overflow-x-auto"&gt;&lt;table className="w-full text-left text-sm text-slate-600"&gt;&lt;thead className="bg-slate-50 text-slate-700 font-medium"&gt;&lt;tr&gt;&lt;th className="px-6 py-4"&gt;Paciente&lt;/th&gt;&lt;th className="px-6 py-4"&gt;Contato&lt;/th&gt;&lt;th className="px-6 py-4"&gt;Status&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;&lt;tbody className="divide-y divide-slate-100"&gt;{[{name:"Fernanda Lima", phone:"(11) 9999-9999", status:"Ativo"}].map((p,i) =&gt; (&lt;tr key={i}&gt;&lt;td className="px-6 py-4"&gt;{p.name}&lt;/td&gt;&lt;td className="px-6 py-4"&gt;{p.phone}&lt;/td&gt;&lt;td className="px-6 py-4"&gt;{p.status}&lt;/td&gt;&lt;/tr&gt;))}&lt;/tbody&gt;&lt;/table&gt;&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">  </span>&lt;/div&gt;
);

// --- AI Configuration (Clean &amp; Simple) ---
const AIConfiguration = () =&gt; {
<span class="Apple-converted-space">    </span>const [botName, setBotName] = useState("Atena");
<span class="Apple-converted-space">    </span>const [commStyle, setCommStyle] = useState(50);
<span class="Apple-converted-space">    </span>const [files, setFiles] = useState([{ id: 1, name: "Tabela_Precos_2025.pdf", size: "450kb", date: "2 dias atrás" }]);
<span class="Apple-converted-space">    </span>const [updates, setUpdates] = useState("");
<span class="Apple-converted-space">    </span>const [address, setAddress] = useState("Av. Paulista, 1000");
<span class="Apple-converted-space">    </span>
<span class="Apple-converted-space">    </span>const handleFileUpload = () =&gt; {
<span class="Apple-converted-space">        </span>setFiles([...files, { id: Date.now(), name: "Novo_Documento.pdf", size: "800kb", date: "Agora" }]);
<span class="Apple-converted-space">    </span>};

<span class="Apple-converted-space">    </span>return (
<span class="Apple-converted-space">        </span>&lt;div className="space-y-6 c-fade-in pb-20 md:pb-0 relative"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="flex flex-col md:flex-row justify-between items-end gap-4"&gt;
<span class="Apple-converted-space">                </span>&lt;div&gt;
<span class="Apple-converted-space">                    </span>&lt;h1 className="text-3xl font-bold text-slate-900"&gt;Base de Conhecimento&lt;/h1&gt;
<span class="Apple-converted-space">                    </span>&lt;p className="text-slate-600"&gt;Mantenha a IA atualizada sobre sua clínica.&lt;/p&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;button className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold shadow-md hover:bg-green-700 transition-colors flex items-center gap-2"&gt;
<span class="Apple-converted-space">                    </span>&lt;Save size={18} /&gt; Salvar Atualizações
<span class="Apple-converted-space">                </span>&lt;/button&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;

<span class="Apple-converted-space">            </span>&lt;div className="grid grid-cols-1 lg:grid-cols-3 gap-8"&gt;
<span class="Apple-converted-space">                </span>{/* Left: Updates &amp; Config */}
<span class="Apple-converted-space">                </span>&lt;div className="lg:col-span-2 space-y-6"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"&gt;
<span class="Apple-converted-space">                        </span>&lt;h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"&gt;&lt;Zap size={20} className="text-yellow-500"/&gt; Novidades Rápidas&lt;/h3&gt;
<span class="Apple-converted-space">                        </span>&lt;p className="text-xs text-slate-500 mb-2"&gt;Escreva avisos temporários (ex: Feriados, Mudança de equipe).&lt;/p&gt;
<span class="Apple-converted-space">                        </span>&lt;textarea<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">                            </span>rows={3}<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">                            </span>className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">                            </span>placeholder="Ex: Nesta sexta-feira não abriremos devido ao feriado..."
<span class="Apple-converted-space">                            </span>value={updates}
<span class="Apple-converted-space">                            </span>onChange={(e) =&gt; setUpdates(e.target.value)}
<span class="Apple-converted-space">                        </span>&gt;&lt;/textarea&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;

<span class="Apple-converted-space">                    </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"&gt;
<span class="Apple-converted-space">                        </span>&lt;h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"&gt;&lt;FileText size={20} className="text-blue-600"/&gt; Documentos Oficiais&lt;/h3&gt;
<span class="Apple-converted-space">                        </span>&lt;div onClick={handleFileUpload} className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-blue-50 cursor-pointer transition-colors mb-4"&gt;
<span class="Apple-converted-space">                            </span>&lt;UploadCloud size={24} className="text-slate-400 mb-2"/&gt;
<span class="Apple-converted-space">                            </span>&lt;p className="text-sm font-medium text-slate-700"&gt;Clique para adicionar PDF ou DOCX&lt;/p&gt;
<span class="Apple-converted-space">                        </span>&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="space-y-2"&gt;
<span class="Apple-converted-space">                            </span>{files.map(f =&gt; (
<span class="Apple-converted-space">                                </span>&lt;div key={f.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"&gt;
<span class="Apple-converted-space">                                    </span>&lt;div className="flex items-center gap-3"&gt;
<span class="Apple-converted-space">                                        </span>&lt;FileCheck size={18} className="text-emerald-500"/&gt;
<span class="Apple-converted-space">                                        </span>&lt;div&gt;&lt;p className="text-sm font-medium text-slate-700"&gt;{f.name}&lt;/p&gt;&lt;p className="text-[10px] text-slate-400"&gt;{f.size} • {f.date}&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                                    </span>&lt;button onClick={() =&gt; setFiles(files.filter(x =&gt; x.id !== f.id))} className="text-slate-400 hover:text-red-500"&gt;&lt;Trash2 size={16}/&gt;&lt;/button&gt;
<span class="Apple-converted-space">                                </span>&lt;/div&gt;
<span class="Apple-converted-space">                            </span>))}
<span class="Apple-converted-space">                        </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;

<span class="Apple-converted-space">                </span>{/* Right: Identity */}
<span class="Apple-converted-space">                </span>&lt;div className="lg:col-span-1 space-y-6"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"&gt;
<span class="Apple-converted-space">                        </span>&lt;h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"&gt;&lt;UserCheck size={20} className="text-purple-600"/&gt; Identidade da IA&lt;/h3&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="space-y-4"&gt;
<span class="Apple-converted-space">                            </span>&lt;div&gt;
<span class="Apple-converted-space">                                </span>&lt;label className="block text-xs font-bold text-slate-500 uppercase mb-1"&gt;Nome&lt;/label&gt;
<span class="Apple-converted-space">                                </span>&lt;input type="text" value={botName} onChange={(e) =&gt; setBotName(e.target.value)} className="w-full p-2 border rounded-lg text-sm" /&gt;
<span class="Apple-converted-space">                            </span>&lt;/div&gt;
<span class="Apple-converted-space">                            </span>&lt;div&gt;
<span class="Apple-converted-space">                                </span>&lt;label className="block text-xs font-bold text-slate-500 uppercase mb-2"&gt;Tom de Voz&lt;/label&gt;
<span class="Apple-converted-space">                                </span>&lt;input type="range" className="w-full accent-purple-600" value={commStyle} onChange={(e) =&gt; setCommStyle(e.target.value)} /&gt;
<span class="Apple-converted-space">                                </span>&lt;div className="flex justify-between text-[10px] text-slate-400 mt-1"&gt;&lt;span&gt;Sério&lt;/span&gt;&lt;span&gt;Descolado&lt;/span&gt;&lt;/div&gt;
<span class="Apple-converted-space">                            </span>&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;

<span class="Apple-converted-space">                    </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"&gt;
<span class="Apple-converted-space">                        </span>&lt;h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"&gt;&lt;Map size={20} className="text-red-500"/&gt; Dados Básicos&lt;/h3&gt;
<span class="Apple-converted-space">                        </span>&lt;div className="space-y-3"&gt;
<span class="Apple-converted-space">                            </span>&lt;div&gt;
<span class="Apple-converted-space">                                </span>&lt;label className="block text-xs font-bold text-slate-500 uppercase mb-1"&gt;Endereço&lt;/label&gt;
<span class="Apple-converted-space">                                </span>&lt;input type="text" value={address} onChange={(e) =&gt; setAddress(e.target.value)} className="w-full p-2 border rounded-lg text-sm" /&gt;
<span class="Apple-converted-space">                            </span>&lt;/div&gt;
<span class="Apple-converted-space">                            </span>&lt;div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700 flex gap-2"&gt;
<span class="Apple-converted-space">                                </span>&lt;Info size={16} className="shrink-0"/&gt;
<span class="Apple-converted-space">                                </span>A IA usa esses dados para responder perguntas frequentes.
<span class="Apple-converted-space">                            </span>&lt;/div&gt;
<span class="Apple-converted-space">                        </span>&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>);
};

const MyClinic = () =&gt; {
<span class="Apple-converted-space">  </span>const [activeTab, setActiveTab] = useState('general');<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">  </span>return (
<span class="Apple-converted-space">    </span>&lt;div className="space-y-6 c-fade-in pb-20 md:pb-0"&gt;
<span class="Apple-converted-space">        </span>&lt;h1 className="text-3xl font-bold text-slate-900"&gt;Minha Clínica&lt;/h1&gt;
<span class="Apple-converted-space">        </span>&lt;div className="grid grid-cols-1 lg:grid-cols-3 gap-8"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="lg:col-span-1 space-y-6"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center"&gt;&lt;div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 text-2xl font-bold"&gt;CD&lt;/div&gt;&lt;h2 className="text-xl font-bold text-slate-900"&gt;Clínica Dental Vida&lt;/h2&gt;&lt;p className="text-slate-500 text-sm"&gt;Dr. Silva &amp; Associados&lt;/p&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"&gt;&lt;h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"&gt;&lt;Shield size={18} className="text-blue-600" /&gt; Plano Atual&lt;/h3&gt;&lt;p className="text-xs text-slate-500 mb-4"&gt;750/1000 conversas&lt;/p&gt;&lt;button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium transition-colors"&gt;Gerenciar Assinatura&lt;/button&gt;&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden self-start"&gt;
<span class="Apple-converted-space">                </span>&lt;div className="flex border-b border-slate-100"&gt;&lt;button onClick={() =&gt; setActiveTab('general')} className={`flex-1 py-4 text-sm font-medium text-center ${activeTab === 'general' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500'}`}&gt;Dados da Clínica&lt;/button&gt;&lt;button onClick={() =&gt; setActiveTab('team')} className={`flex-1 py-4 text-sm font-medium text-center ${activeTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500'}`}&gt;Gestão de Equipe&lt;/button&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;div className="p-8"&gt;{activeTab === 'general' ? &lt;GeneralSettingsForm /&gt; : &lt;TeamManagement /&gt;}&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">  </span>);
};

// --- 4. MAIN LAYOUT ---

const menuItems = [
<span class="Apple-converted-space">  </span>{ id: 'dashboard', label: 'Dashboard', icon: Grid, component: Overview },
<span class="Apple-converted-space">  </span>{ id: 'crm', label: 'CRM', icon: Kanban, component: CRM },
<span class="Apple-converted-space">  </span>{ id: 'agenda', label: 'Agenda', icon: CalendarIcon, component: Agenda },
<span class="Apple-converted-space">  </span>{ id: 'scripts', label: 'Scripts', icon: MessageSquareDashed, component: ScriptsLibrary },
<span class="Apple-converted-space">  </span>{ id: 'patients', label: 'Pacientes', icon: Users, component: Patients },
<span class="Apple-converted-space">  </span>{ id: 'ai-config', label: 'Base de Conhecimento', icon: Brain, component: AIConfiguration },
<span class="Apple-converted-space">  </span>{ id: 'help', label: 'Ajuda &amp; Tutoriais', icon: Book, component: HelpCenter },
<span class="Apple-converted-space">  </span>{ id: 'my-clinic', label: 'Minha Clínica', icon: Settings, component: MyClinic },
];

export default function DashboardLayout() {
<span class="Apple-converted-space">  </span>const [isSidebarOpen, setIsSidebarOpen] = useState(true);<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">  </span>const [activeItem, setActiveItem] = useState('dashboard');<span class="Apple-converted-space"> </span>
<span class="Apple-converted-space">  </span>const isAdmin = false;<span class="Apple-converted-space"> </span>

<span class="Apple-converted-space">  </span>const ActiveComponent = menuItems.find(item =&gt; item.id === activeItem)?.component || Overview;

<span class="Apple-converted-space">  </span>return (
<span class="Apple-converted-space">    </span>&lt;div className="flex h-screen bg-slate-50 font-sans overflow-hidden"&gt;
<span class="Apple-converted-space">      </span>{/* CSS Styles Injected here to fix Tailwind ReferenceError */}
<span class="Apple-converted-space">      </span>&lt;style&gt;{`
<span class="Apple-converted-space">        </span>@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
<span class="Apple-converted-space">        </span>@keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
<span class="Apple-converted-space">        </span>@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
<span class="Apple-converted-space">        </span>.c-fade-in { animation: fadeIn 0.3s ease-out; }
<span class="Apple-converted-space">        </span>.c-scale-in { animation: scaleIn 0.2s ease-out; }
<span class="Apple-converted-space">        </span>.c-slide-in-right { animation: slideInRight 0.3s ease-out; }
<span class="Apple-converted-space">        </span>.custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
<span class="Apple-converted-space">        </span>.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
<span class="Apple-converted-space">        </span>.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 3px; }
<span class="Apple-converted-space">      </span>`}&lt;/style&gt;
<span class="Apple-converted-space">      </span>{isSidebarOpen &amp;&amp; &lt;div className="fixed inset-0 bg-black/20 z-20 md:hidden" onClick={() =&gt; setIsSidebarOpen(false)}/&gt;}
<span class="Apple-converted-space">      </span>&lt;aside className={`bg-white border-r border-slate-200 shadow-xl md:shadow-none fixed md:relative z-30 h-full flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20 overflow-hidden'}`}&gt;
<span class="Apple-converted-space">        </span>&lt;div className="h-20 flex items-center justify-between px-4 border-b border-slate-100"&gt;
<span class="Apple-converted-space">            </span>&lt;div className="flex items-center gap-3"&gt;&lt;div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold"&gt;A&lt;/div&gt;&lt;span className={`font-bold text-slate-900 ${!isSidebarOpen &amp;&amp; 'hidden'}`}&gt;AtenaChat&lt;/span&gt;&lt;/div&gt;
<span class="Apple-converted-space">            </span>&lt;button onClick={() =&gt; setIsSidebarOpen(!isSidebarOpen)} className="hidden md:block text-slate-400"&gt;&lt;ChevronLeft/&gt;&lt;/button&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar"&gt;{menuItems.map(item =&gt; (&lt;button key={item.id} onClick={() =&gt; setActiveItem(item.id)} className={`flex items-center w-full p-3 rounded-xl text-sm font-medium transition-all ${activeItem === item.id ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`} title={!isSidebarOpen ? item.label : ''}&gt;&lt;item.icon size={22} /&gt;&lt;span className={`ml-3 ${!isSidebarOpen &amp;&amp; 'hidden'}`}&gt;{item.label}&lt;/span&gt;&lt;/button&gt;))}&lt;/nav&gt;
<span class="Apple-converted-space">        </span>&lt;div className="p-4 border-t border-slate-100 bg-slate-50/50 mt-auto"&gt;
<span class="Apple-converted-space">            </span>{isSidebarOpen &amp;&amp; (
<span class="Apple-converted-space">                </span>&lt;div className="flex items-center gap-3 mb-3 transition-all"&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="w-9 h-9 rounded-full bg-white border border-slate-200 p-0.5 shrink-0"&gt;&lt;img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrSilva" alt="User" className="w-full h-full rounded-full bg-slate-100" /&gt;&lt;/div&gt;
<span class="Apple-converted-space">                    </span>&lt;div className="overflow-hidden"&gt;&lt;div className="font-bold text-sm text-slate-800 whitespace-nowrap"&gt;Dr. Silva&lt;/div&gt;&lt;div className="text-xs text-slate-500 flex items-center gap-1"&gt;&lt;span className="w-2 h-2 bg-emerald-500 rounded-full"&gt;&lt;/span&gt; Online&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">                </span>&lt;/div&gt;
<span class="Apple-converted-space">            </span>)}
<span class="Apple-converted-space">            </span>&lt;button className={`flex items-center w-full p-2 rounded-lg text-sm font-medium transition-colors ${isSidebarOpen ? 'text-rose-600 hover:bg-rose-50 justify-start' : 'text-slate-400 hover:bg-slate-100 hover:text-rose-500 justify-center'}`} title="Sair"&gt;&lt;LogOut size={20} strokeWidth={2} className={isSidebarOpen ? "mr-2" : ""} /&gt;{isSidebarOpen &amp;&amp; &lt;span&gt;Sair&lt;/span&gt;}&lt;/button&gt;
<span class="Apple-converted-space">        </span>&lt;/div&gt;
<span class="Apple-converted-space">      </span>&lt;/aside&gt;
<span class="Apple-converted-space">      </span>&lt;div className="flex-1 flex flex-col h-full overflow-hidden relative"&gt;
<span class="Apple-converted-space">        </span>&lt;header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between"&gt;
<span class="Apple-converted-space">           </span>&lt;div className="flex items-center gap-3"&gt;&lt;button onClick={() =&gt; setIsSidebarOpen(true)}&gt;&lt;Menu size={24}/&gt;&lt;/button&gt;&lt;span className="font-bold text-slate-900"&gt;AtenaChat.ai&lt;/span&gt;&lt;/div&gt;
<span class="Apple-converted-space">           </span>&lt;div className="flex items-center gap-3"&gt;&lt;Bell size={20} className="text-slate-500"/&gt;&lt;div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden"&gt;&lt;img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DrSilva" alt="User" /&gt;&lt;/div&gt;&lt;/div&gt;
<span class="Apple-converted-space">        </span>&lt;/header&gt;
<span class="Apple-converted-space">        </span>&lt;main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8 scroll-smooth"&gt;&lt;div className="max-w-6xl mx-auto h-full"&gt;&lt;ActiveComponent /&gt;&lt;/div&gt;&lt;/main&gt;
<span class="Apple-converted-space">      </span>&lt;/div&gt;
<span class="Apple-converted-space">    </span>&lt;/div&gt;
<span class="Apple-converted-space">  </span>);
}
