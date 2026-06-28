import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section 
        id="inicio" 
        className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
      >
        {/* Animated Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>

        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[15s] hover:scale-105"
          style={{
            backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url('/hero.png')",
            backgroundAttachment: 'fixed'
          }}
        ></div>

        <div className="relative z-10 max-w-5xl animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 mb-8 border border-amber-500/30 rounded-full bg-amber-500/5 backdrop-blur-sm">
            <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.3em]">Exclusividad & Modernidad</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none">
            Espacios que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Transforman</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Alquila aulas equipadas con tecnología de vanguardia para formaciones, talleres o reuniones corporativas de alto nivel.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/aulas" className="btn-premium text-lg px-12 py-5 shadow-2xl shadow-amber-500/20">
              Explorar Espacios
            </Link>
            <Link href="/contacto" className="group text-white font-bold flex items-center gap-2 hover:text-amber-500 transition-colors">
              Hablemos de tu proyecto <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>


      {/* Main Features */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-white">
              Soluciones para el <span className="text-amber-500 underline decoration-slate-800 underline-offset-8">Futuro</span>
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed font-light">
              No solo alquilamos espacio. Creamos el entorno perfecto para que tu talento, equipo o alumnos alcancen su máximo potencial.
            </p>
          </div>
          <Link href="/servicios" className="text-amber-500 font-bold border-b border-amber-500/30 pb-2 hover:border-amber-500 transition-all">
            Ver todos los servicios
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              icon: '🏫', 
              title: 'Alquiler de Aulas', 
              desc: 'Espacios de 25m² y 30m² con mobiliario ergonómico y acústica tratada.', 
              href: '/aulas',
              bg: 'bg-amber-500/5'
            },
            { 
              icon: '🛠️', 
              title: 'Servicios Digitales', 
              desc: 'Consultoría técnica, implementación de MS365 y soluciones Cloud a medida.', 
              href: '/servicios',
              bg: 'bg-blue-500/5'
            },
            { 
              icon: '🎓', 
              title: 'Formación IT', 
              desc: 'Programas especializados en IA, desarrollo web y herramientas de productividad.', 
              href: '/formacion',
              bg: 'bg-purple-500/5'
            }
          ].map((item) => (
            <div key={item.title} className={`group ${item.bg} p-12 rounded-[3rem] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-4 flex flex-col`}>
              <div className="text-7xl mb-10 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
              <h3 className="text-3xl font-black mb-6 text-white">{item.title}</h3>
              <p className="text-slate-400 mb-10 leading-relaxed font-light text-lg">
                {item.desc}
              </p>
              <Link 
                href={item.href} 
                className="mt-auto group/btn flex items-center gap-3 text-white font-bold"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-amber-500 group-hover/btn:border-amber-500 transition-all">
                   <span className="group-hover/btn:text-slate-950 transition-colors">→</span>
                </div>
                <span>Descubrir</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-950/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-950 mb-10 tracking-tighter leading-none relative z-10">
            ¿Listo para llevar tu <br className="hidden md:block" /> formación al siguiente nivel?
          </h2>
          <p className="text-slate-900/70 text-xl md:text-2xl mb-14 max-w-2xl mx-auto font-medium relative z-10">
            Reserva tu aula hoy mismo o solicita presupuesto personalizado para servicios de consultoría.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link href="/contacto" className="bg-slate-950 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-900 transition-all shadow-xl">
              Solicitar Presupuesto
            </Link>
            <Link href="/aulas" className="bg-white/20 backdrop-blur-md text-slate-950 px-12 py-5 rounded-full font-black text-lg hover:bg-white/30 transition-all">
              Ver Disponibilidad
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

