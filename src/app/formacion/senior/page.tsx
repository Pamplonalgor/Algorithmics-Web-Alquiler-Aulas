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
          
          <h2 className="text-2xl md:text-3xl font-medium text-[#2d1b4e]/80 mb-6">
            Formación tecnológica e IA para personas sénior
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto px-4 md:px-0 mb-8">
            Móvil, WhatsApp, Internet, IA y herramientas digitales explicadas paso a paso.
          </p>

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

        {/* Horizontal Cards */}
        <div className="flex flex-col gap-6 w-full mb-8">
          
          {/* Card 1: Tecnología (Image Left) */}
          <div className="bg-[#EAEFEA] rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-stretch hover:-translate-y-1 transition-transform shadow-sm gap-8">
            <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-0 rounded-[2rem] overflow-hidden">
              <Image src="/senior_mobile.png" alt="Persona sénior usando dispositivo móvil" fill className="object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center py-4 md:py-8 pr-4">
              <div className="bg-white/50 text-[#2d1b4e] text-xs font-bold px-4 py-2 rounded-full inline-flex w-max mb-6">
                Para el día a día
              </div>
              <h3 className="text-3xl font-bold leading-tight mb-4">Tecnología Útil</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Aprende WhatsApp, videollamadas, banca digital, viajes y trámites online con confianza.</p>
            </div>
          </div>

          {/* Card 2: IA Práctica (Image Right) */}
          <div className="bg-[#F2EAFA] rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row-reverse items-stretch hover:-translate-y-1 transition-transform shadow-sm gap-8">
            <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-0 rounded-[2rem] overflow-hidden">
              <Image src="/senior_man_laptop.png" alt="Hombre sénior usando ordenador portátil" fill className="object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center py-4 md:py-8 md:pl-8">
              <div className="bg-white/50 text-[#2d1b4e] text-xs font-bold px-4 py-2 rounded-full inline-flex w-max mb-6">
                Innovación
              </div>
              <h3 className="text-3xl font-bold leading-tight mb-4">IA Práctica<br/>para tu vida</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Descubre cómo la inteligencia artificial puede ayudarte a organizar tareas, resolver dudas y ahorrar tiempo.</p>
            </div>
          </div>

          {/* Card 3: Diseño Creativo (Image Left) */}
          <div className="bg-[#FFF4E5] rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-stretch hover:-translate-y-1 transition-transform shadow-sm gap-8">
            <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-0 rounded-[2rem] overflow-hidden">
              <Image src="/two_seniors_learning.png" alt="Seniors aprendiendo diseño" fill className="object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center py-4 md:py-8 pr-4">
              <div className="bg-white/50 text-[#2d1b4e] text-xs font-bold px-4 py-2 rounded-full inline-flex w-max mb-6">
                Creatividad
              </div>
              <h3 className="text-3xl font-bold leading-tight mb-4">Diseño Creativo<br/>con Canva + 3D</h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">Crea diseños increíbles, invitaciones y proyectos únicos. Desde Canva desde cero hasta impresión 3D para dar forma a tus ideas.</p>
              
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-3 py-1.5 rounded-xl shadow-sm text-xs font-medium text-[#2d1b4e]">Max. 6 alumnos</span>
                <span className="bg-white px-3 py-1.5 rounded-xl shadow-sm text-xs font-medium text-[#2d1b4e]">1.5h semanal</span>
                <span className="bg-white px-3 py-1.5 rounded-xl shadow-sm text-xs font-medium text-[#2d1b4e]">Todos niveles</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
