import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar as CalendarIcon, 
  Bell, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  FileText, 
  Star,
  Briefcase,
  Map as MapIcon,
  SlidersHorizontal,
  Lightbulb,
  X,
  Eye,
  EyeOff,
  Wallet,
  ArrowUpRight,
  ArrowRight,
  LayoutDashboard,
  Menu
} from 'lucide-react';

// --- MOCK DATA ---
const recommendedJobs = [
  { id: 1, title: 'Desenvolvedor React Sênior', company: 'TechNova', location: 'São Paulo, SP (Híbrido)', distance: '5km', price: 'R$ 8.000 - R$ 10.000', match: '98%' },
  { id: 2, title: 'UX/UI Designer para App', company: 'FoodFast', location: 'Remoto', distance: '-', price: 'R$ 4.500 (Projeto)', match: '92%' },
  { id: 3, title: 'Especialista em SEO', company: 'Marketing Pro', location: 'Rio de Janeiro, RJ', distance: '12km', price: 'R$ 3.000/mês', match: '85%' },
];

export default function Dashboard() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [searchRadius, setSearchRadius] = useState(15);
  const [showBalance, setShowBalance] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Novo estado para controlar a tela de carregamento
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para simular o carregamento de 8 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000); // 8000 milissegundos = 8 segundos

    // Limpeza do timer
    return () => clearTimeout(timer);
  }, []);

  // --- SPLASH SCREEN (TELA DE CARREGAMENTO) ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center selection:bg-indigo-100 relative overflow-hidden">
        {/* Efeito de luz ao fundo (Fintech Vibe) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo pulsante */}
          <img 
            src="https://byubtnmhdncvpzeemsak.supabase.co/storage/v1/object/public/varcom/a774a575-9060-4f10-bd9f-852be63b56ff/73269.png" 
            alt="Carregando Freelaav..." 
            className="h-16 w-auto object-contain animate-pulse"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-zinc-900 flex selection:bg-indigo-100">
      
      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-20 flex items-center px-6 border-b border-zinc-100">
            <img 
              src="https://byubtnmhdncvpzeemsak.supabase.co/storage/v1/object/public/varcom/a774a575-9060-4f10-bd9f-852be63b56ff/73269.png" 
              alt="Freelaav Logo" 
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-2xl transition-all">
              <LayoutDashboard size={20} />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-indigo-600 hover:bg-zinc-50 font-medium rounded-2xl transition-all">
              <Briefcase size={20} />
              Vagas
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-indigo-600 hover:bg-zinc-50 font-medium rounded-2xl transition-all">
              <CalendarIcon size={20} />
              Agenda
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-indigo-600 hover:bg-zinc-50 font-medium rounded-2xl transition-all">
              <FileText size={20} />
              Contratos
            </a>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-zinc-100">
            <button className="flex w-full items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-600 hover:bg-red-50 font-medium rounded-2xl transition-all">
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}`}>
        
        {/* --- BANNER DE DICAS --- */}
        {showBanner && (
          <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
              <Lightbulb size={20} className="text-indigo-200" />
              <p className="text-sm font-medium">
                <strong>Dica Freelaav:</strong> Mantenha sua agenda atualizada. Contratantes buscam freelancers disponíveis hoje!
              </p>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-indigo-200 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
              <X size={20} />
            </button>
          </div>
        )}

        {/* --- HEADER --- */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 -ml-2 text-zinc-500 hover:text-indigo-600 lg:hidden"
              >
                <Menu size={24} />
              </button>

              <div className="flex-1 flex justify-end items-center gap-5">
                <button className="p-2 text-zinc-400 hover:text-indigo-600 bg-zinc-100/50 hover:bg-zinc-100 rounded-full transition-all relative">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="relative">
                  <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-3 focus:outline-none group bg-white border border-zinc-200 p-1.5 pr-4 rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    <img 
                      src="https://i.pravatar.cc/150?img=11" 
                      alt="Alex Silva" 
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-bold text-zinc-800 leading-tight group-hover:text-indigo-600 transition-colors">Alex Silva</p>
                    </div>
                    <ChevronDown size={16} className="text-zinc-400 group-hover:text-indigo-600 transition-colors ml-1" />
                  </button>

                  {/* Profile Dropdown Widget */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white border border-zinc-100 rounded-3xl shadow-xl z-50 overflow-hidden transform opacity-100 scale-100 transition-all">
                      <div className="px-5 py-4 bg-zinc-50/50 border-b border-zinc-100">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Conta Freelaav</p>
                        <p className="text-sm font-bold text-zinc-900 mt-1 truncate">alex.silva@freelaav.com</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-2xl hover:text-indigo-600 transition-colors">
                          <User size={18} /> Meu Perfil
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-2xl hover:text-indigo-600 transition-colors">
                          <Settings size={18} /> Configurações
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-2xl hover:text-indigo-600 transition-colors">
                          <FileText size={18} /> Portfólio
                        </a>
                      </div>
                      <div className="p-2 border-t border-zinc-100">
                        <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-2xl transition-colors">
                          <LogOut size={18} /> Sair do App
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- MAIN DASHBOARD CONTENT --- */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Welcome & Wallet Fintech Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Olá, Alex!</h1>
              <p className="text-zinc-500 mt-2 text-lg">Seu perfil está em alta. Você tem <strong className="text-indigo-600">3 novas propostas</strong> para analisar.</p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="flex items-center gap-2 px-7 py-3.5 bg-zinc-900 text-white font-semibold rounded-full hover:bg-zinc-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 transform">
                  <Search size={20} />
                  Explorar Vagas
                </button>
                <button className="flex items-center gap-2 px-7 py-3.5 bg-white border border-zinc-200 text-zinc-700 font-semibold rounded-full hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md">
                  <CalendarIcon size={20} />
                  Ver Agenda
                </button>
              </div>
            </div>

            {/* Fintech Wallet Widget */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden flex flex-col justify-between h-56">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <p className="text-indigo-100 text-sm font-medium flex items-center gap-2">
                    Saldo Disponível
                    <button onClick={() => setShowBalance(!showBalance)} className="hover:text-white transition-colors p-1">
                      {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </p>
                  <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm">
                    <Wallet size={20} className="text-indigo-50" />
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mt-1 tracking-tight">
                  {showBalance ? 'R$ 12.450,00' : '••••••••'}
                </h2>
              </div>

              <div className="relative z-10 flex items-end justify-between border-t border-indigo-500/50 pt-4 mt-4">
                <div>
                  <p className="text-indigo-200 text-xs font-medium">A Receber (Próx. 30 dias)</p>
                  <p className="text-lg font-semibold mt-0.5 flex items-center gap-1 text-emerald-300">
                    <ArrowUpRight size={18} /> {showBalance ? 'R$ 4.500,00' : '••••••••'}
                  </p>
                </div>
                <button className="bg-white text-indigo-700 text-sm font-bold px-5 py-2 rounded-full hover:bg-zinc-50 transition-colors shadow-sm">
                  Sacar
                </button>
              </div>
            </div>

          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN - Map & Jobs */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Map Job Search Widget */}
              <section className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-6 sm:p-8 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                      <MapIcon className="text-indigo-600" /> Vagas Próximas
                    </h2>
                    <p className="text-sm text-zinc-500 mt-1">Navegue pelo mapa para achar jobs locais.</p>
                  </div>
                  <button className="p-2.5 bg-zinc-50 rounded-full text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                    <SlidersHorizontal size={20} />
                  </button>
                </div>

                {/* Fake Map Container */}
                <div className="relative w-full h-72 bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
                  
                  {/* Pins */}
                  <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                    <div className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md mb-1 animate-bounce">R$ 8k</div>
                    <MapPin className="text-indigo-600 w-8 h-8 drop-shadow-md" fill="currentColor" />
                  </div>
                  
                  <MapPin className="absolute top-1/2 left-2/3 text-zinc-400 w-6 h-6 opacity-70" />
                  <MapPin className="absolute bottom-1/3 left-1/4 text-zinc-400 w-6 h-6 opacity-70" />

                  <div className="absolute inset-0 flex items-center justify-center bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <button className="bg-zinc-900 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-xl hover:scale-105 transform">
                      <Search size={18} /> Abrir Mapa Interativo
                    </button>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="mt-5 flex flex-col sm:flex-row items-center gap-4 bg-zinc-50 p-2 pl-4 rounded-full border border-zinc-200">
                  <div className="flex-1 w-full relative flex items-center">
                    <MapPin className="text-zinc-400 mr-2" size={18} />
                    <input 
                      type="text" 
                      defaultValue="São Paulo, Centro"
                      className="w-full bg-transparent text-sm font-medium focus:outline-none text-zinc-800"
                    />
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto bg-white px-4 py-2 rounded-full border border-zinc-200 shadow-sm">
                    <span className="text-xs font-bold text-zinc-500 whitespace-nowrap uppercase tracking-wider">Raio: {searchRadius}km</span>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={searchRadius}
                      onChange={(e) => setSearchRadius(Number(e.target.value))}
                      className="w-24 h-1.5 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              </section>

              {/* Recommended Jobs */}
              <section className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <Star className="text-amber-500" fill="currentColor" /> Match Perfeito
                  </h2>
                  <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                    Ver todas <ArrowRight size={16} />
                  </a>
                </div>

                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="bg-zinc-50 border border-zinc-100 p-5 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row justify-between gap-5">
                      <div>
                        <h3 className="text-lg font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                        <p className="text-sm font-medium text-zinc-500 mt-0.5">{job.company}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 bg-white border border-zinc-200 px-3 py-1.5 rounded-full shadow-sm">
                            <MapPin size={14} className="text-zinc-400" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full shadow-sm">
                            <Briefcase size={14} className="text-emerald-500" /> {job.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between min-w-[120px]">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-700 bg-indigo-100 px-3 py-1.5 rounded-full">
                          Match {job.match}
                        </div>
                        <button className="mt-4 sm:mt-0 w-full sm:w-auto bg-white border-2 border-zinc-200 text-zinc-700 hover:bg-zinc-900 hover:border-zinc-900 hover:text-white px-5 py-2 rounded-full text-sm font-bold transition-all">
                          Detalhes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN - Calendar & Stats */}
            <div className="space-y-8">
              
              {/* Availability Calendar Widget */}
              <section className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-xl font-bold text-zinc-900 mb-1 flex items-center gap-2">
                  <CalendarIcon className="text-indigo-600" /> Minha Agenda
                </h2>
                <p className="text-sm text-zinc-500 mb-6">Deixe as empresas saberem quando você pode começar.</p>

                {/* iOS Style Calendar Mockup */}
                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 shadow-inner">
                  <div className="flex justify-between items-center mb-4 px-2">
                    <span className="font-extrabold text-base text-zinc-800">Julho 2026</span>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 shadow-sm">&lt;</button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 shadow-sm">&gt;</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 text-center text-xs font-bold text-zinc-400 mb-2">
                    <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
                  </div>
                  <div className="grid grid-cols-7 text-center text-sm gap-y-2">
                    <div className="py-1.5 text-zinc-300">28</div>
                    <div className="py-1.5 text-zinc-300">29</div>
                    <div className="py-1.5 text-zinc-300">30</div>
                    {[...Array(31)].map((_, i) => {
                      const day = i + 1;
                      let style = "py-1.5 font-medium text-zinc-700 hover:bg-white hover:shadow-sm rounded-full cursor-pointer transition-all mx-1";
                      
                      if (day === 15 || day === 16) style = "py-1.5 font-bold text-red-600 bg-red-100 rounded-full mx-1 shadow-sm"; // Busy
                      if (day === 20 || day === 21) style = "py-1.5 font-bold text-emerald-600 bg-emerald-100 rounded-full mx-1 shadow-sm"; // Available
                      if (day === 10) style = "py-1.5 font-bold text-white bg-indigo-600 rounded-full mx-1 shadow-md"; // Today

                      return <div key={day} className={style}>{day}</div>
                    })}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 px-2">
                  <div className="flex items-center gap-3 text-sm font-medium text-zinc-600">
                    <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full shadow-sm"></div> Dias Livres
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-zinc-600">
                    <div className="w-3.5 h-3.5 bg-red-400 rounded-full shadow-sm"></div> Em Projeto
                  </div>
                </div>

                <button className="w-full mt-6 bg-zinc-100 text-zinc-800 border border-zinc-200 py-3 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors">
                  Gerenciar Datas
                </button>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
