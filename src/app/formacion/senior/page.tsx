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
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[#2d1b4e] mb-4 max-w-4xl mx-auto">
            Tecnología útil para tu día a día
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-[#2d1b4e]/80 mb-12">
            Formación tecnológica e IA para personas sénior
          </h2>

          {/* Illustration Section */}
          <div className="w-full flex justify-center mt-2 mb-4 md:mt-4 md:mb-6">
            <Image 
              src="/hands_laptop.png" 
              alt="Ilustración tecnología senior" 
              width={550}
              height={350}
              className="w-[320px] sm:w-[400px] md:w-[550px] h-auto object-contain"
              priority
            />
          </div>

          <div className="flex flex-col items-center">
            <Link href="/contacto" className="inline-block bg-[#2d1b4e] text-white px-10 py-4 md:py-5 rounded-[2rem] font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
              Pide Información
            </Link>
            <p className="text-sm text-center text-slate-500 font-medium mt-4">o llama al <span className="font-bold text-[#2d1b4e]">689 46 78 52</span></p>
          </div>
        </div>

        {/* PeakMindz Style Layout */}
        <div className="w-full mb-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            
            {/* Left Column: 60% */}
            <div className="w-full lg:w-[60%] flex flex-col gap-6">
              
              {/* Card 1: Tecnología Útil */}
              <div className="bg-[#EAEFEA] rounded-[2.5rem] p-8 md:p-10 flex flex-col h-full hover:-translate-y-1 transition-transform shadow-sm">
                <div className="bg-white/50 text-[#2d1b4e] text-xs font-bold px-4 py-2 rounded-full w-max mb-6">
                  Para el día a día
                </div>
                <h3 className="text-3xl font-bold leading-tight mb-4">Tecnología Útil</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Aprende WhatsApp, banca digital, videollamadas, viajes online y seguridad digital con confianza.</p>
              </div>

              {/* Card 2: IA Práctica */}
              <div className="bg-[#F2EAFA] rounded-[2.5rem] p-8 md:p-10 flex flex-col h-full hover:-translate-y-1 transition-transform shadow-sm">
                <div className="bg-white/50 text-[#2d1b4e] text-xs font-bold px-4 py-2 rounded-full w-max mb-6">
                  Innovación
                </div>
                <h3 className="text-3xl font-bold leading-tight mb-4">IA Práctica<br/>para tu vida</h3>
                <p className="text-slate-600 leading-relaxed text-lg">Descubre cómo la inteligencia artificial puede ayudarte a organizar tareas, resolver dudas y ahorrar tiempo.</p>
              </div>

            </div>

            {/* Right Column: 40% Collage */}
            <div className="w-full lg:w-[40%] relative min-h-[450px] lg:min-h-0 bg-transparent flex items-center justify-center">
              <div className="relative w-full h-full max-w-[450px] aspect-[4/5] lg:aspect-auto lg:absolute lg:inset-0">
                {/* Photo 1 (Top Left) */}
                <div className="absolute top-[5%] left-[5%] w-[55%] aspect-square rounded-[2rem] overflow-hidden shadow-lg border-[6px] border-[#FCF9F2] z-20 hover:scale-105 transition-transform duration-300">
                  <Image src="/senior_mobile_v2.png" alt="Persona usando móvil" fill className="object-cover" />
                </div>
                {/* Photo 2 (Bottom Left) */}
                <div className="absolute bottom-[5%] left-[0%] w-[50%] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg border-[6px] border-[#FCF9F2] z-10 hover:scale-105 transition-transform duration-300">
                  <Image src="/senior_couple_v2.png" alt="Pareja con portátil" fill className="object-cover" />
                </div>
                {/* Photo 3 (Right) */}
                <div className="absolute top-[20%] right-[5%] w-[55%] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl border-[6px] border-[#FCF9F2] z-30 hover:scale-105 transition-transform duration-300">
                  <Image src="/senior_group_v2.png" alt="Grupo en clase" fill className="object-cover" />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Card: Diseño Creativo */}
          {/* Bottom Card: Diseño Creativo */}
          <div className="bg-[#FFF4E5] rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:-translate-y-1 transition-transform shadow-sm w-full mb-8 relative">
            <div className="max-w-2xl relative z-10">
              <div className="bg-white/50 text-[#2d1b4e] text-xs font-bold px-4 py-2 rounded-full w-max mb-6">
                Creatividad
              </div>
              <h3 className="text-3xl font-bold leading-tight mb-4">Diseño Creativo<br/>con Canva + 3D</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Crea diseños increíbles, invitaciones y proyectos únicos. Aprende Canva paso a paso y descubre la impresión 3D para dar forma a tus ideas.</p>
            </div>
            
            <div className="w-full md:w-[280px] h-[180px] md:h-[220px] flex justify-center md:justify-end relative z-10 shrink-0 mt-6 md:mt-0">
              <Image 
                src="/hands_laptop_typing.png" 
                alt="Ilustración Diseño Creativo" 
                width={320} 
                height={240} 
                className="w-[240px] md:w-[340px] h-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-sm absolute right-1/2 translate-x-1/2 md:translate-x-0 md:-right-16 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Section Footer: Practical Data */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/80 w-full shadow-sm flex items-center justify-center">
            <div className="flex flex-col sm:flex-row gap-6 md:gap-16 items-center">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#2d1b4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <span className="text-[#2d1b4e] font-medium text-base">Máx. 6 alumnos</span>
              </div>
              <div className="w-px h-6 bg-[#2d1b4e]/10 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#2d1b4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-[#2d1b4e] font-medium text-base">1,5 h semanal</span>
              </div>
              <div className="w-px h-6 bg-[#2d1b4e]/10 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#2d1b4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                <span className="text-[#2d1b4e] font-medium text-base">Todos los niveles</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
