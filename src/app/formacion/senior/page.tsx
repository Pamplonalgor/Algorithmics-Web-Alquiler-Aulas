import Link from 'next/link';
import Image from 'next/image';

export default function SeniorTrainingPage() {
  return (
    <main className="min-h-screen bg-[#FCF9F2] text-[#2d1b4e] pt-32 pb-24 px-6 overflow-hidden relative">
      {/* Dark gradient at the very top so the global white header remains visible */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#07020d]/80 to-transparent pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Header Section (Centered) */}
        <div className="text-center space-y-6 mb-16">
          <Link href="/formacion" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#2d1b4e] transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            ← Volver a Formación
          </Link>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-[#2d1b4e]">
            Descubre.<br/>Conecta.<br/>Avanza.
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
            A tu ritmo, con confianza, <span className="font-semibold text-[#2d1b4e]">para tu día a día.</span><br/>
            Un espacio donde descubrir la tecnología de forma práctica y con un ambiente cercano. ¡Nunca es tarde para aprender!
          </p>

          <div className="pt-4 flex flex-col items-center">
            <Link href="/contacto" className="inline-block bg-[#2d1b4e] text-white px-10 py-4 md:py-5 rounded-[2rem] font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
              Pide Información
            </Link>
            <p className="text-sm text-center text-slate-500 font-medium mt-4">o llama al <span className="font-bold text-[#2d1b4e]">689 46 78 52</span></p>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="w-full text-center mb-12 flex flex-col items-center">
          <div className="relative w-48 h-48 md:w-56 md:h-56 mb-2">
            <Image 
              src="/hands_brain.png" 
              alt="Ilustración mente y manos" 
              fill
              className="object-contain mix-blend-multiply opacity-90"
            />
          </div>
          <p className="text-[#2d1b4e] italic font-serif text-xl mb-2">Aprende, Crea y Disfruta</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d1b4e]">Programas pensados para ti</h2>
        </div>

        {/* Top Cards: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
          {/* Card 1: Tecnología */}
          <div className="bg-[#EAEFEA] rounded-[2.5rem] p-10 flex flex-col h-full hover:-translate-y-1 transition-transform shadow-sm">
            <div className="bg-white/50 text-[#2d1b4e] text-xs font-bold px-4 py-2 rounded-full inline-flex w-max mb-6">
              Para el día a día
            </div>
            <h3 className="text-3xl font-bold leading-tight mb-4">Tecnología<br/>Útil</h3>
            <p className="text-slate-600 mb-8 flex-grow leading-relaxed">Domina WhatsApp, Google Workspace, Viajes, Banca digital y Seguridad digital. Conecta, organízate y gana autonomía.</p>
            
            <div className="bg-[#D3E4D6] rounded-[2rem] p-8 mt-auto flex items-center justify-center aspect-square shadow-inner">
              <svg className="w-24 h-24 text-[#2A755F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Card 2: IA Práctica */}
          <div className="bg-[#F2EAFA] rounded-[2.5rem] p-10 flex flex-col h-full hover:-translate-y-1 transition-transform shadow-sm">
            <div className="bg-white/50 text-[#2d1b4e] text-xs font-bold px-4 py-2 rounded-full inline-flex w-max mb-6">
              Innovación
            </div>
            <h3 className="text-3xl font-bold leading-tight mb-4">IA Práctica<br/>para tu vida</h3>
            <p className="text-slate-600 mb-8 flex-grow leading-relaxed">Descubre cómo la inteligencia artificial puede ayudarte cada día a organizar tareas, resumir textos, y resolver dudas.</p>
            
            <div className="bg-[#E4D1F0] rounded-[2rem] p-8 mt-auto flex items-center justify-center aspect-square shadow-inner">
              <svg className="w-24 h-24 text-[#8B3A89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Card: Horizontal with Image */}
        <div className="bg-[#FFF4E5] rounded-[2rem] p-6 md:p-8 w-full flex flex-col md:flex-row gap-8 items-center shadow-sm hover:-translate-y-1 transition-transform">
          {/* Image Left */}
          <div className="w-full md:w-1/3 relative aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-sm border-4 border-white">
            <Image 
              src="/two_seniors_learning.png" 
              alt="Seniors aprendiendo tecnología" 
              fill
              className="object-cover"
            />
          </div>
          
          {/* Content Center */}
          <div className="w-full md:w-1/3 flex flex-col justify-center text-center md:text-left">
            <div className="bg-white/50 text-[#2d1b4e] text-xs font-bold px-3 py-1.5 rounded-full inline-flex w-max mb-4 mx-auto md:mx-0">
              Creatividad
            </div>
            <h3 className="text-2xl font-bold leading-tight mb-3">Diseño Creativo<br/>con Canva + 3D</h3>
            <p className="text-slate-600 leading-relaxed text-base">Crea diseños increíbles, invitaciones y proyectos únicos. Desde Canva desde cero hasta impresión 3D para dar forma a tus ideas.</p>
          </div>

          {/* Tags Right */}
          <div className="w-full md:w-1/3 flex flex-col justify-center gap-2">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center font-medium text-sm text-[#2d1b4e]">
              Max. 6 alumnos
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center font-medium text-sm text-[#2d1b4e]">
              1.5h semanal
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center font-medium text-sm text-[#2d1b4e]">
              Ambiente cercano
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center font-medium text-sm text-[#2d1b4e]">
              Todos los niveles
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
