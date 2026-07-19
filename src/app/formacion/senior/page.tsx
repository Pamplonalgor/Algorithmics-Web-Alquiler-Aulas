import Link from 'next/link';

export default function SeniorTrainingPage() {
  return (
    <main className="min-h-screen bg-[#07020d] text-white pt-32 pb-20 px-6 overflow-hidden relative">
      {/* Decorative Warm Orbs */}
      <div className="absolute top-[0%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center lg:items-start relative z-10">
        
        {/* Left Side: Copy & CTA */}
        <div className="lg:w-1/3 space-y-8 sticky top-32">
          <Link href="/formacion" className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
            ← Volver a Formación
          </Link>
          
          <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
            Aprende.<br/>Crea.<br/>Disfruta.
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            A tu ritmo, con confianza, <span className="font-semibold text-white">para tu día a día.</span><br/><br/>
            Un espacio donde descubrir la tecnología de forma práctica, en grupos muy reducidos y con un ambiente cercano. ¡Nunca es tarde para aprender!
          </p>

          <div className="pt-8 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400">Plazas Limitadas</h3>
            <a href="mailto:pamplona@algoacademy.es" className="block w-full bg-white text-slate-900 text-center py-5 rounded-[2rem] font-black text-lg hover:bg-slate-200 transition-all shadow-xl hover:-translate-y-1">
              Pide Información
            </a>
            <p className="text-sm text-center text-slate-500 font-medium">o llama al <span className="font-bold text-slate-300">689 46 78 52</span></p>
          </div>
        </div>

        {/* Right Side: Cards */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Tecnología */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 flex flex-col h-full hover:border-white/20 transition-all group shadow-2xl">
            <div className="bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full inline-flex w-max mb-6">
              Para el día a día
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-4">Tecnología<br/>Útil</h2>
            <p className="text-slate-400 mb-8 flex-grow leading-relaxed">Domina WhatsApp, Google Workspace, Viajes, Banca digital y Seguridad digital. Conecta, organízate y gana autonomía.</p>
            
            <div className="bg-[#BCE4D8] rounded-[2rem] p-8 mt-auto flex items-center justify-center aspect-square group-hover:scale-[1.02] transition-transform shadow-inner">
              <svg className="w-24 h-24 text-[#2A755F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Card 2: IA Práctica */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 flex flex-col h-full hover:border-white/20 transition-all group shadow-2xl">
            <div className="bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full inline-flex w-max mb-6">
              Innovación
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-4">IA Práctica<br/>para tu vida</h2>
            <p className="text-slate-400 mb-8 flex-grow leading-relaxed">Descubre cómo la inteligencia artificial puede ayudarte cada día a organizar tareas, resumir textos, y resolver dudas.</p>
            
            <div className="bg-[#E4BCE3] rounded-[2rem] p-8 mt-auto flex items-center justify-center aspect-square group-hover:scale-[1.02] transition-transform shadow-inner">
              <svg className="w-24 h-24 text-[#8B3A89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>

          {/* Card 3: Canva + 3D */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 flex flex-col h-full hover:border-white/20 transition-all group shadow-2xl md:col-span-2">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-full inline-flex w-max mb-6">
                  Creatividad
                </div>
                <h2 className="text-4xl font-bold leading-tight mb-4">Diseño Creativo<br/>con Canva + 3D</h2>
                <p className="text-slate-400 mb-8 leading-relaxed text-lg">Crea diseños increíbles, invitaciones y proyectos únicos. Desde Canva desde cero hasta impresión 3D para dar forma a tus ideas.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                    <span className="text-orange-400 text-xl">👥</span>
                    <span className="text-sm font-medium text-slate-300">Max. 6 alumnos</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                    <span className="text-orange-400 text-xl">⏱️</span>
                    <span className="text-sm font-medium text-slate-300">1.5h semanal</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                    <span className="text-orange-400 text-xl">🤝</span>
                    <span className="text-sm font-medium text-slate-300">Ambiente cercano</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                    <span className="text-orange-400 text-xl">🌟</span>
                    <span className="text-sm font-medium text-slate-300">Todos los niveles</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/5 bg-[#F5D8B8] rounded-[2.5rem] p-8 flex items-center justify-center aspect-square group-hover:scale-[1.02] transition-transform shadow-inner">
                <svg className="w-32 h-32 text-[#B86B1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
