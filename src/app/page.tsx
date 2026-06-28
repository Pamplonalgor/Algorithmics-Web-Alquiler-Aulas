import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-[#0A0E17] min-h-screen relative overflow-hidden">
      {/* Abstract Fluid Mesh Gradients / Aurora Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-cobalt/30 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-purple/30 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '3s'}}></div>

      {/* Hero Section */}
      <section 
        id="inicio" 
        className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto relative z-10 items-center">
          
          {/* Left Text Content */}
          <div className="animate-fade-in-up text-left mt-20 lg:mt-0">
            <div className="inline-flex items-center px-6 py-2 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
              <span className="text-slate-300 text-sm font-medium uppercase tracking-widest">IA & Consultoría</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#f8fafc] mb-6 tracking-normal leading-[1.25]">
              Formamos talento.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cobalt to-brand-purple">Transformamos empresas.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-lg font-light">
              Soluciones premium de inteligencia artificial y consultoría tecnológica diseñadas para llevar tu negocio al siguiente nivel operativo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-md border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Impulsar mi empresa
              </Link>
              <Link href="/servicios" className="inline-flex items-center justify-center px-8 py-4 text-slate-300 font-medium hover:text-white transition-colors group">
                Conocer más <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Elements: Concentric fluid rings */}
          <div className="hidden lg:flex justify-center items-center relative h-[600px] w-full">
            <div className="absolute inset-0 bg-brand-cobalt/5 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-[350px] h-[350px] border border-brand-cobalt/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute w-[250px] h-[250px] border border-brand-purple/30 rounded-full backdrop-blur-sm animate-[spin_10s_linear_infinite] flex items-center justify-center bg-brand-midnight/40"></div>
            
            {/* Logo Estático Centrado con Estrella Animada */}
            <div className="absolute w-32 h-32 flex items-center justify-center z-20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 15 85 85" className="w-full h-full text-white overflow-visible">
                <path d="M 30 80 A 8 8 0 0 0 45 86 L 57.8 54 L 69 54 L 69 50 L 59.4 50 L 65 36 C 67 31 72 26 78 25 C 68 15 56 15 50 30 Z" fill="currentColor" />
                <path className="estrella-ia" d="M 83 37 Q 83 52 93 52 Q 83 52 83 67 Q 83 52 73 52 Q 83 52 83 37 Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-12 hidden md:flex items-center gap-4 opacity-40">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white">Scroll</span>
          <div className="w-12 h-[1px] bg-gradient-to-r from-white to-transparent"></div>
        </div>
      </section>


      {/* Main Features */}
      <section className="max-w-7xl mx-auto px-6 py-40 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-medium mb-8 tracking-normal text-white">
              Soluciones para el <span className="text-brand-cyan underline decoration-brand-purple/50 underline-offset-8">Futuro</span>
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed font-light">
              No solo ofrecemos espacios. Diseñamos el ecosistema tecnológico idóneo para que tu equipo y tus alumnos alcancen metas extraordinarias.
            </p>
          </div>
          <Link href="/servicios" className="text-brand-cyan font-bold border-b border-brand-cyan/30 pb-2 hover:border-brand-cyan transition-all">
            Ver todos los servicios
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              icon: (
                <svg className="w-16 h-16 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ), 
              title: 'Alquiler de Aulas', 
              desc: 'Espacios modernos de 25m² y 30m² con conectividad de alta velocidad y acústica optimizada.', 
              href: '/aulas',
              bg: 'bg-brand-purple/5 border-brand-purple/10 hover:border-brand-purple/35'
            },
            { 
              icon: (
                <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ), 
              title: 'Servicios Digitales', 
              desc: 'Consultoría e infraestructura Cloud, implementaciones en Microsoft 365 y automatizaciones.', 
              href: '/servicios',
              bg: 'bg-white/5 border-white/10 hover:border-white/20'
            },
            { 
              icon: (
                <svg className="w-16 h-16 text-brand-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ), 
              title: 'Formación IT', 
              desc: 'Programas de capacitación técnica especializada en desarrollo, cloud computing e inteligencia artificial.', 
              href: '/formacion',
              bg: 'bg-brand-cobalt/5 border-brand-cobalt/10 hover:border-brand-cobalt/35'
            }
          ].map((item) => (
            <div key={item.title} className={`group ${item.bg} p-12 rounded-[3rem] border transition-all duration-500 hover:-translate-y-4 flex flex-col backdrop-blur-md`}>
              <div className="mb-10 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
              <h3 className="text-3xl font-semibold mb-6 text-white">{item.title}</h3>
              <p className="text-slate-400 mb-10 leading-relaxed font-light text-lg">
                {item.desc}
              </p>
              <Link 
                href={item.href} 
                className="mt-auto group/btn flex items-center gap-3 text-white font-bold"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-gradient-to-r group-hover/btn:from-brand-cobalt group-hover/btn:to-brand-purple group-hover/btn:border-transparent transition-all">
                   <span className="text-white">→</span>
                </div>
                <span>Descubrir</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-40 relative z-10">
        <div className="bg-gradient-to-br from-brand-cobalt to-brand-purple rounded-[3rem] md:rounded-[4rem] px-6 py-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-brand-cobalt/20 border border-white/10">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          {/* Decorative Spark */}
          <svg className="absolute top-8 left-8 w-12 h-12 text-white/10" viewBox="20 15 85 85" fill="currentColor">
            <path d="M 83 37 Q 83 52 93 52 Q 83 52 83 67 Q 83 52 73 52 Q 83 52 83 37 Z" />
          </svg>

          <h2 className="text-4xl md:text-7xl font-medium text-white mb-8 md:mb-10 tracking-normal leading-[1.15] md:leading-none relative z-10">
            ¿Listo para dar el <br className="hidden md:block" /> salto tecnológico?
          </h2>
          <p className="text-slate-200/80 text-lg md:text-2xl mb-12 md:mb-14 max-w-2xl mx-auto font-light relative z-10">
            Reserva tu aula hoy mismo o solicita una consultoría personalizada para desarrollar tus proyectos digitales.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link href="/contacto" className="bg-brand-midnight text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl">
              Solicitar Presupuesto
            </Link>
            <Link href="/aulas" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-12 py-5 rounded-full font-bold text-lg transition-all">
              Ver Disponibilidad
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

