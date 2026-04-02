import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Mail, 
  Lock, 
  Phone, 
  UserCircle, 
  Globe, 
  Plus, 
  X, 
  MapPin, 
  Linkedin, 
  Link as LinkIcon, 
  Camera, 
  ShieldCheck,
  Zap,
  Star,
  Instagram,
  MessageSquare,
  Globe2,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EVENT_DEPARTMENTS } from './constants/eventRoles';
import { BRAZIL_STATES } from './constants/brazilStates';
import SupportChatbot from './components/SupportChatbot';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';

type UserType = 'professional' | 'company' | null;

interface Language {
  language: string;
  level: string;
}

interface FormData {
  // Common
  name: string;
  email: string;
  whatsapp: string;
  document: string;
  
  // Professional specific
  department: string;
  mainRole: string;
  secondarySkills: string[];
  languages: Language[];
  bio: string;
  state: string;
  city: string;
  travelAvailability: boolean;
  linkedin: string;
  instagram: string;
  portfolio: string;
  profilePhoto: string | null;

  // Company specific
  companyName: string;
  industry: string;
  website: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  whatsapp: '',
  document: '',
  department: '',
  mainRole: '',
  secondarySkills: [],
  languages: [{ language: '', level: '' }],
  bio: '',
  state: '',
  city: '',
  travelAvailability: false,
  linkedin: '',
  instagram: '',
  portfolio: '',
  profilePhoto: null,
  companyName: '',
  industry: '',
  website: ''
};

export default function Register() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [step, setStep] = useState(0); 
  const [userType, setUserType] = useState<UserType>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [newSkill, setNewSkill] = useState('');
  const [score, setScore] = useState(0);
  const [cities, setCities] = useState<{id: number, nome: string}[]>([]);

  // IBGE API for cities
  useEffect(() => {
    if (formData.state) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.state}/municipios`)
        .then(res => res.json())
        .then(data => setCities(data))
        .catch(err => console.error("Erro ao buscar cidades:", err));
    } else {
      setCities([]);
    }
  }, [formData.state]);

  // Profile Score Calculation
  useEffect(() => {
    if (userType !== 'professional') return;
    let s = 0;
    // Step 1: 20%
    if (formData.name && formData.email && formData.whatsapp && formData.document) s += 20;
    // Step 2: 30% (Role) + 15% (Languages)
    if (formData.department && formData.mainRole) s += 30;
    if (formData.languages.length > 0 && formData.languages[0].language) s += 15;
    // Step 3: 15% (Bio)
    if (formData.bio.length > 30) s += 15;
    // Step 4: 10% (Location) + 10% (Links)
    if (formData.state && formData.city) s += 10;
    if (formData.linkedin || formData.instagram || formData.portfolio) s += 10;
    setScore(s);
  }, [formData, userType]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const addLanguage = () => {
    setFormData({ ...formData, languages: [...formData.languages, { language: '', level: '' }] });
  };

  const removeLanguage = (index: number) => {
    const newLangs = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: newLangs });
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const newLangs = [...formData.languages];
    newLangs[index][field] = value;
    setFormData({ ...formData, languages: newLangs });
  };

  const addSkill = () => {
    if (newSkill && !formData.secondarySkills.includes(newSkill) && formData.secondarySkills.length < 10) {
      setFormData({ ...formData, secondarySkills: [...formData.secondarySkills, newSkill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, secondarySkills: formData.secondarySkills.filter(s => s !== skill) });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profilePhoto: URL.createObjectURL(e.target.files[0]) });
    }
  };

  // --- COMPONENTS ---

  const ProgressBar = () => (
    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full mb-10 overflow-hidden">
      <div 
        className="bg-zinc-900 dark:bg-zinc-100 h-full transition-all duration-700 ease-in-out"
        style={{ width: `${(step / 4) * 100}%` }}
      ></div>
    </div>
  );

  const ProfileScore = () => {
    let status = { label: 'Incompleto', color: 'text-zinc-400', bg: 'bg-zinc-50 dark:bg-zinc-900', border: 'border-zinc-200 dark:border-zinc-800', icon: <X size={14}/> };
    if (score > 40 && score <= 75) status = { label: 'Bom', color: 'text-blue-500', bg: 'bg-blue-50/30 dark:bg-blue-900/10', border: 'border-blue-100 dark:border-blue-900/30', icon: <Zap size={14}/> };
    if (score > 75) status = { label: 'Excelente', color: 'text-zinc-900 dark:text-zinc-100', bg: 'bg-zinc-50 dark:bg-zinc-900', border: 'border-zinc-900/10 dark:border-zinc-100/10', icon: <CheckCircle2 size={14}/> };

    return (
      <div className={`p-6 rounded-2xl border ${status.border} ${status.bg} transition-all duration-500`}>
        <div className="flex justify-between items-center mb-4">
          <h4 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${status.color}`}>
            {status.icon} Saúde do Cadastro: {score}%
          </h4>
          <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-md border ${status.border} bg-white dark:bg-zinc-800 ${status.color}`}>
            {status.label}
          </span>
        </div>
        <div className="w-full bg-zinc-200/50 dark:bg-zinc-700 h-1 rounded-full overflow-hidden mb-3">
          <div className={`h-full transition-all duration-1000 ease-out ${score > 75 ? 'bg-zinc-900 dark:bg-zinc-100' : score > 40 ? 'bg-blue-400' : 'bg-zinc-300'}`} style={{ width: `${score}%` }}></div>
        </div>
        <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
          {score <= 40 && "Complete seu perfil para ser visto por grandes produtoras."}
          {score > 40 && score <= 75 && "Seu perfil está ficando ótimo! Adicione redes sociais para mais credibilidade."}
          {score > 75 && "Parabéns! Perfil profissional completo e pronto para o mercado."}
        </p>
      </div>
    );
  };

  // Step 0: Selection
  if (step === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-6 transition-colors duration-500">
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>
        
        <div className="max-w-3xl w-full animate-in fade-in duration-700">
          <div className="text-center mb-16">
            <img src="https://byubtnmhdncvpzeemsak.supabase.co/storage/v1/object/public/varcom/a774a575-9060-4f10-bd9f-852be63b56ff/73269.png" alt="Logo" className="h-8 mx-auto mb-10 dark:invert opacity-90" />
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">Como você quer usar a Freelaav?</h1>
            <p className="text-zinc-400 dark:text-zinc-500 text-sm font-medium">Selecione seu perfil para uma experiência personalizada.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => { setUserType('professional'); setStep(1); }} className="group relative bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-900/10 dark:hover:border-zinc-100/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 text-left">
              <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-8 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-500">
                <User size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Sou um Profissional</h3>
              <p className="text-zinc-400 text-[13px] leading-relaxed font-medium">Encontre jobs, gerencie sua agenda e receba pagamentos seguros.</p>
              <div className="mt-8 flex items-center gap-2 text-zinc-900 dark:text-zinc-100 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Começar Onboarding <ArrowRight size={14} />
              </div>
            </button>

            <button onClick={() => { setUserType('company'); setStep(1); }} className="group relative bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-900/10 dark:hover:border-zinc-100/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 text-left">
              <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-8 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-zinc-900 transition-all duration-500">
                <Briefcase size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Sou uma Empresa</h3>
              <p className="text-zinc-400 text-[13px] leading-relaxed font-medium">Contrate talentos, gerencie produtoras e acelere seus projetos.</p>
              <div className="mt-8 flex items-center gap-2 text-zinc-900 dark:text-zinc-100 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Começar Onboarding <ArrowRight size={14} />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 py-16 px-6 transition-colors duration-500">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <button onClick={handleBack} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-[13px] font-bold transition-all">
            <ArrowLeft size={16} strokeWidth={2.5} /> Voltar
          </button>
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-10 sm:p-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <ProgressBar />
          
          <div key={step} className="animate-in fade-in slide-in-from-right-4 duration-500">
            {userType === 'professional' ? (
              <>
                {step === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Identificação</h2>
                      <p className="text-zinc-400 text-[13px] mt-1 font-medium">Seus dados básicos de acesso.</p>
                    </div>
                    <div className="grid gap-4">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100" size={16} />
                        <input type="text" placeholder="Nome Completo" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 pl-11 text-[14px] dark:text-zinc-100 focus:outline-none focus:border-zinc-900/20 dark:focus:border-zinc-100/20 transition-all font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100" size={16} />
                        <input type="email" placeholder="E-mail" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 pl-11 text-[14px] dark:text-zinc-100 focus:outline-none focus:border-zinc-900/20 dark:focus:border-zinc-100/20 transition-all font-medium" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100" size={16} />
                          <input type="password" placeholder="Senha" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 pl-11 text-[14px] dark:text-zinc-100 focus:outline-none transition-all font-medium" />
                        </div>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100" size={16} />
                          <input type="text" placeholder="WhatsApp" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 pl-11 text-[14px] dark:text-zinc-100 focus:outline-none transition-all font-medium" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                        </div>
                      </div>
                      <div className="relative group">
                        <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100" size={16} />
                        <input type="text" placeholder="CPF ou CNPJ" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 pl-11 text-[14px] dark:text-zinc-100 focus:outline-none transition-all font-medium" value={formData.document} onChange={e => setFormData({...formData, document: e.target.value})} />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Competências</h2>
                      <p className="text-zinc-400 text-[13px] mt-1 font-medium">Sua especialidade e idiomas.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="grid gap-4">
                        <div>
                          <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2.5 block">Departamento</label>
                          <select className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 px-4 text-[14px] dark:text-zinc-100 focus:outline-none appearance-none font-medium" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value, mainRole: ''})}>
                            <option value="">Selecione</option>
                            {Object.keys(EVENT_DEPARTMENTS).map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        {formData.department && (
                          <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2.5 block">Função Principal</label>
                            <select className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 px-4 text-[14px] dark:text-zinc-100 focus:outline-none appearance-none font-medium" value={formData.mainRole} onChange={e => setFormData({...formData, mainRole: e.target.value})}>
                              <option value="">Selecione a função</option>
                              {EVENT_DEPARTMENTS[formData.department].map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2.5 block">Atividades Secundárias</label>
                        <div className="flex gap-2 mb-4">
                          <input type="text" placeholder="Adicionar tag..." className="flex-1 bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 px-4 text-[14px] dark:text-zinc-100 focus:outline-none font-medium" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyPress={e => e.key === 'Enter' && addSkill()} />
                          <button onClick={addSkill} className="bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white px-5 rounded-xl transition-all"><Plus size={18} /></button>
                        </div>
                        <div className="flex flex-wrap gap-2 min-h-[40px]">
                          {formData.secondarySkills.map(skill => (
                            <span key={skill} className="bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-700 px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-2">
                              {skill} <X size={12} className="cursor-pointer opacity-40 hover:opacity-100" onClick={() => removeSkill(skill)} />
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-2xl border border-zinc-100/50 dark:border-zinc-800/50">
                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Globe size={14}/> Idiomas Falados</label>
                        <div className="space-y-4">
                          {formData.languages.map((lang, idx) => (
                            <div key={idx} className="flex gap-3 animate-in fade-in slide-in-from-top-1">
                              <select className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl px-3 text-[13px] dark:text-zinc-100 font-bold focus:outline-none" value={lang.language} onChange={e => updateLanguage(idx, 'language', e.target.value)}>
                                <option value="">Idioma</option>
                                <option value="Português">Português</option>
                                <option value="Inglês">Inglês</option>
                                <option value="Espanhol">Espanhol</option>
                                <option value="Francês">Francês</option>
                                <option value="Alemão">Alemão</option>
                              </select>
                              <select className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl px-3 text-[13px] dark:text-zinc-100 font-bold focus:outline-none" value={lang.level} onChange={e => updateLanguage(idx, 'level', e.target.value)}>
                                <option value="">Nível</option>
                                <option value="Básico">Básico</option>
                                <option value="Intermediário">Intermediário</option>
                                <option value="Avançado">Avançado</option>
                                <option value="Fluente">Fluente</option>
                                <option value="Nativo">Nativo</option>
                              </select>
                              {formData.languages.length > 1 && (
                                <button onClick={() => removeLanguage(idx)} className="p-3 text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                              )}
                            </div>
                          ))}
                          <button onClick={addLanguage} className="w-full py-3 mt-2 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl text-zinc-400 text-[12px] font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
                            <Plus size={14}/> Adicionar outro idioma
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Star size={28} strokeWidth={1.5} />
                      </div>
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Queremos te conhecer</h2>
                      <p className="text-zinc-400 text-[13px] mt-2 font-medium">Conte um pouco sobre sua trajetória profissional.</p>
                    </div>
                    <textarea 
                      className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-[1.5rem] p-6 h-64 text-[14px] dark:text-zinc-100 placeholder:text-zinc-300 focus:outline-none focus:border-zinc-900/20 dark:focus:border-zinc-100/20 transition-all font-medium resize-none leading-relaxed"
                      placeholder="Sinta-se à vontade para contar suas principais experiências, eventos que já participou e o que te motiva no trabalho..."
                      value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})}
                    ></textarea>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Presença e Logística</h2>
                      <p className="text-zinc-400 text-[13px] mt-1 font-medium">Onde você está e como te encontramos.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 px-4 text-[14px] dark:text-zinc-100 focus:outline-none font-medium appearance-none" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value, city: ''})}>
                          <option value="">Estado</option>
                          {BRAZIL_STATES.map(s => <option key={s.sigla} value={s.sigla}>{s.nome}</option>)}
                        </select>
                        <select className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 px-4 text-[14px] dark:text-zinc-100 focus:outline-none font-medium appearance-none" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} disabled={!formData.state}>
                          <option value="">Município</option>
                          {cities.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-5 bg-zinc-50/30 dark:bg-zinc-800/20 rounded-2xl border border-zinc-100/50 dark:border-zinc-800/50">
                        <div>
                          <p className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100">Disponibilidade para viagens</p>
                          <p className="text-[12px] text-zinc-400 font-medium">Aceita jobs fora da sua cidade.</p>
                        </div>
                        <button onClick={() => setFormData({...formData, travelAvailability: !formData.travelAvailability})} className={`w-11 h-6 rounded-full p-1 transition-all duration-300 ${formData.travelAvailability ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
                          <div className={`bg-white dark:bg-zinc-900 w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${formData.travelAvailability ? 'translate-x-5' : ''}`}></div>
                        </button>
                      </div>

                      <div className="grid gap-4">
                        <div className="relative group">
                          <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100" size={16} />
                          <input type="text" placeholder="LinkedIn URL" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 pl-11 text-[14px] dark:text-zinc-100 focus:outline-none font-medium" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
                        </div>
                        <div className="relative group">
                          <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100" size={16} />
                          <input type="text" placeholder="Instagram" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 pl-11 text-[14px] dark:text-zinc-100 focus:outline-none font-medium" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} />
                        </div>
                        <div className="relative group">
                          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100" size={16} />
                          <input type="text" placeholder="Portfólio" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 pl-11 text-[14px] dark:text-zinc-100 focus:outline-none font-medium" value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} />
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-4 py-4">
                        <div className="relative group">
                          <div className="w-24 h-24 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-dashed border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden group-hover:border-zinc-900/20">
                            {formData.profilePhoto ? <img src={formData.profilePhoto} alt="Preview" className="w-full h-full object-cover" /> : <Camera size={24} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" strokeWidth={1.5} />}
                          </div>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                        </div>
                        <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Foto de Perfil</p>
                      </div>
                      <ProfileScore />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                {/* COMPANY STEPS (Simplified) */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Dados Corporativos</h2>
                      <p className="text-zinc-400 text-[13px] mt-1 font-medium">Informações fundamentais da empresa.</p>
                    </div>
                    <div className="grid gap-4">
                      <input type="text" placeholder="Nome da Empresa / Produtora" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 px-5 text-[14px] dark:text-zinc-100 focus:outline-none font-medium" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
                      <input type="text" placeholder="Setor de Atuação" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 px-5 text-[14px] dark:text-zinc-100 focus:outline-none font-medium" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="E-mail" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 px-5 text-[14px] dark:text-zinc-100 focus:outline-none font-medium" />
                        <input type="text" placeholder="CNPJ" className="w-full bg-zinc-50/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-xl py-3.5 px-5 text-[14px] dark:text-zinc-100 focus:outline-none font-medium" />
                      </div>
                    </div>
                  </div>
                )}
                {step >= 2 && (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl flex items-center justify-center mx-auto border border-zinc-100 dark:border-zinc-800"><ShieldCheck size={28} strokeWidth={1.5} /></div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Quase lá!</h2>
                    <p className="text-zinc-400 dark:text-zinc-500 text-[13px] font-medium leading-relaxed">Validando dados para garantir a segurança da rede Freelaav.</p>
                    <button onClick={() => navigate('/dashboard')} className="bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white text-[13px] font-bold px-8 py-3.5 rounded-full w-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all">Ir para o Dashboard</button>
                  </div>
                )}
              </div>
            )}

            <div className="mt-12 flex gap-3">
              {(userType === 'professional' && step < 4) || (userType === 'company' && step < 2) ? (
                <button onClick={handleNext} className="flex-1 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white text-[13px] font-bold py-4 rounded-xl hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 transition-all">Próxima Etapa <ArrowRight size={16} /></button>
              ) : (
                <button onClick={() => navigate('/dashboard')} className="flex-1 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white text-[13px] font-bold py-4 rounded-xl hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 transition-all">
                  {score > 75 ? <Star fill="currentColor" size={16} className="text-yellow-400" /> : <CheckCircle2 size={16} />}
                  Concluir Cadastro
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-center mt-10 text-zinc-300 dark:text-zinc-700 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
          <div className="w-8 h-[1px] bg-zinc-100 dark:bg-zinc-800"></div>
          Freelaav Security 
          <div className="w-8 h-[1px] bg-zinc-100 dark:bg-zinc-800"></div>
        </p>
      </div>

      {/* Floating Support Chatbot */}
      <SupportChatbot />
    </div>
  );
}
