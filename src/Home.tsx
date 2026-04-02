import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ChevronDown, 
  ArrowRight, 
  Zap,
  CheckCircle2,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('PT');
  const [comoFuncionaMenuOpen, setComoFuncionaMenuOpen] = useState(false);

  const logoUrl = "https://byubtnmhdncvpzeemsak.supabase.co/storage/v1/object/public/varcom/a774a575-9060-4f10-bd9f-852be63b56ff/73269.png";

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5s para Landing Page é ideal
    return () => clearTimeout(timer);
  }, []);

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang);
    setLangMenuOpen(false);
  };

  // --- SPLASH SCREEN ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center selection:bg-indigo-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center">
          <img 
            src={logoUrl} 
            alt="Carregando Freelaav..." 
            className="h-16 w-auto object-contain animate-pulse"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans text-zinc-900 flex flex-col selection:bg-indigo-200">
      
      {/* --- NAVBAR --- */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center">
              <a href="#">
                <img 
                  src={logoUrl} 
                  alt="Freelaav Logo" 
                  className="h-9 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <div 
                className="relative group h-full flex items-center"
                onMouseEnter={() => setComoFuncionaMenuOpen(true)}
                onMouseLeave={() => setComoFuncionaMenuOpen(false)}
              >
                <button className="flex items-center gap-1.5 text-zinc-600 hover:text-indigo-600 font-medium transition-colors py-2">
                  Como Funciona
                  <ChevronDown size={14} className={`transition-transform ${comoFuncionaMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {comoFuncionaMenuOpen && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-white/70 backdrop-blur-xl border border-zinc-200/50 rounded-2xl shadow-xl z-50 overflow-hidden py-2 animate-fade-in-up">
                    <a href="#explorar-areas" className="block px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-indigo-500/10 hover:text-indigo-600 transition-colors">
                      Explorar Todas Áreas
                    </a>
                    <a href="#porque-freelaav" className="block px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-indigo-500/10 hover:text-indigo-600 transition-colors">
                      Por que a Freelaav?
                    </a>
                  </div>
                )}
              </div>
              <a href="#talentos" className="text-zinc-600 hover:text-indigo-600 font-medium transition-colors">Talentos</a>
              <a href="#empresas" className="text-zinc-600 hover:text-indigo-600 font-medium transition-colors">Para Empresas</a>
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-6">
              
              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 text-zinc-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  <Globe size={18} />
                  <span>{currentLang}</span>
                  <ChevronDown size={14} className={`transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {langMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white/70 backdrop-blur-xl border border-zinc-200/50 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
                    {['PT', 'EN', 'ES'].map((lang) => (
                      <button 
                        key={lang}
                        onClick={() => changeLanguage(lang)}
                        className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-zinc-500/10 transition-colors ${currentLang === lang ? 'text-indigo-600' : 'text-zinc-700'}`}
                      >
                        {lang === 'PT' ? 'Português' : lang === 'EN' ? 'English' : 'Español'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-zinc-200"></div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/dashboard')} className="text-zinc-700 font-semibold hover:text-indigo-600 transition-colors px-2">
                  Entrar
                </button>
                <button className="bg-zinc-900 text-white font-bold px-6 py-2.5 rounded-full hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Cadastrar
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-zinc-600 p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-zinc-100 px-4 pt-2 pb-6 space-y-4 shadow-xl">
            <div className="py-2">
              <p className="text-zinc-800 font-medium mb-3">Como Funciona</p>
              <div className="pl-4 space-y-3 border-l-2 border-zinc-100">
                <a href="#explorar-areas" className="block text-zinc-600 font-medium text-sm">Explorar Todas Áreas</a>
                <a href="#porque-freelaav" className="block text-zinc-600 font-medium text-sm">Por que a Freelaav?</a>
              </div>
            </div>
            <a href="#talentos" className="block text-zinc-600 font-medium py-2">Talentos</a>
            <a href="#empresas" className="block text-zinc-600 font-medium py-2">Para Empresas</a>
            <div className="border-t border-zinc-100 py-4 flex flex-col gap-3">
              <button onClick={() => navigate('/dashboard')} className="w-full text-left text-zinc-700 font-semibold py-2">Entrar</button>
              <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl">Cadastrar</button>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION (Estilo Vagas.com) --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-zinc-900 min-h-[75vh] flex items-center">
        {/* Imagem de Fundo (Backstage AV) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: "url('https://byubtnmhdncvpzeemsak.supabase.co/storage/v1/object/public/varcom/a774a575-9060-4f10-bd9f-852be63b56ff/Freelaavhero.jpg')" }}
        ></div>
        
        {/* Overlay gradiente escuro para garantir leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/70 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10 lg:mt-0">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              A plataforma de talentos mais rápida do mercado.
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-zinc-300 font-medium leading-relaxed max-w-2xl">
              Contratante, acelere sua produção e monte uma equipe em tempo recorde.<br className="hidden md:block"/>
              Talento, entre no ritmo e avance sua carreira sem perder um segundo.
            </p>
          </div>
        </div>
      </section>

      {/* --- BARRA DE DESTAQUE (Estilo CTA Vagas.com) --- */}
      <div className="bg-indigo-600 w-full relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-6 w-full">
            <div className="font-black text-2xl text-white leading-none tracking-tighter hidden sm:block opacity-80">
              FL<br/>AV
            </div>
            <p className="text-indigo-100 text-sm md:text-base font-medium">
              <strong className="text-white">Freelaav Match / Você se Vê:</strong> Nossa IA especializada em turbinar seu perfil. Em breve na versão com a experiência completa, mas você já pode experimentar agora.
            </p>
          </div>
          <button className="whitespace-nowrap bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
            Quero testar <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* --- BENEFITS SPLIT (A mais rápida para...) --- */}
      <section className="py-16 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Para Empresas */}
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Zap className="text-indigo-600" fill="currentColor" size={24} /> A mais rápida para contratar
              </h3>
              <ul className="space-y-4 text-sm text-zinc-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></div>
                  <p><strong>Vaga Inteligente:</strong> mais de 50% dos projetos recebem os talentos ideais AV e tech em menos de 24h.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></div>
                  <p><strong>Gestão Centralizada:</strong> agende, acompanhe o portfólio e contrate especialistas na plataforma.</p>
                </li>
              </ul>
            </div>

            {/* Para Talentos */}
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Zap className="text-indigo-600" fill="currentColor" size={24} /> A mais rápida para ser contratado
              </h3>
              <ul className="space-y-4 text-sm text-zinc-600">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></div>
                  <p><strong>Destaque imediato:</strong> projetos que dão *match* perfeito com suas skills são enviados diretamente a você.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></div>
                  <p><strong>Segurança Total:</strong> foque na sua entrega criativa. Nós cuidamos para que o pagamento chegue até você.</p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA BOTTOM --- */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-indigo-600/5" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.2 }}></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-6">Pronto para transformar sua ideia em realidade?</h2>
          <p className="text-xl text-zinc-600 mb-10">Junte-se a milhares de empresas e freelancers na plataforma que mais cresce no Brasil.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-zinc-900 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-zinc-800 transition-colors">
              Criar Conta Grátis
            </button>
            <p className="text-sm text-zinc-500 font-medium sm:ml-4 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-500" /> Sem taxa de adesão
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#F5F5F7] border-t border-zinc-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            <div className="col-span-1 md:col-span-1">
              <img 
                src={logoUrl} 
                alt="Freelaav Logo" 
                className="h-10 w-auto object-contain mb-6"
              />
              <p className="text-zinc-500 text-sm leading-relaxed">
                Conectando o talento criativo e tecnológico do Brasil com as melhores oportunidades do mercado global.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 mb-4">Plataforma</h4>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Encontrar Freelancers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Encontrar Projetos</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Preços e Taxas</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Freelaav Pro</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 mb-4">Empresa</h4>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Imprensa</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-zinc-900 mb-4">Suporte</h4>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contato</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-zinc-200/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} Freelaav. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
              <span className="flex items-center gap-2"><Globe size={16}/> PT-BR</span>
              <span className="flex items-center gap-2"><ShieldCheck size={16}/> Pagamento 100% Seguro</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
