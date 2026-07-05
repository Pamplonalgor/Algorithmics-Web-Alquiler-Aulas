import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Adimentek | Formación y Soluciones IT",
  description: "Alquiler de aulas premium y consultoría de soluciones IT de vanguardia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-[#0A0E17] text-white selection:bg-brand-cobalt selection:text-white">
        <Header />
        <main className="flex-grow relative overflow-hidden">
          {/* Focos de luz difuminada para añadir volumen al fondo */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cobalt/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          {children}
        </main>
        <footer className="bg-black/20 backdrop-blur-md border-t border-white/5 pt-32 pb-16 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-cobalt/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
              <div className="col-span-1 md:col-span-2">
                <Logo className="mb-8" />
                <p className="text-slate-400 max-w-sm mb-10 text-lg leading-relaxed font-light">
                  Ofrecemos los mejores espacios y soluciones digitales para que tu talento y negocio crezcan sin límites.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Explorar</h4>
                <ul className="space-y-4 text-slate-400 text-sm font-medium">
                  <li><Link href="/aulas" className="hover:text-brand-magenta transition-colors">Nuestras Aulas</Link></li>
                  <li><Link href="/servicios" className="hover:text-brand-magenta transition-colors">Servicios Digitales</Link></li>
                  <li><Link href="/formacion" className="hover:text-brand-magenta transition-colors">Formación IT</Link></li>
                  <li><Link href="/contacto" className="hover:text-brand-magenta transition-colors">Contacto</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Soporte</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Av. Juan Pablo II, 5, y 7<br />31006 Pamplona, Navarra</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-brand-cyan flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>689 46 78 52</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-brand-cyan flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>pamplona@algoacademy.es</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 mb-12 bg-white p-6 rounded-2xl flex justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <img 
                src="/footer-kit-digital.png" 
                alt="Kit Digital" 
                className="w-full max-w-5xl h-auto object-contain max-h-40 mix-blend-multiply" 
              />
            </div>
            
            <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-xs tracking-widest uppercase">
              <p>&copy; {new Date().getFullYear()} Adimentek. Engineered for Excellence.</p>
              <div className="flex flex-wrap gap-6 md:gap-10">
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Términos</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
                <Link href="/admin" className="hover:text-white transition-colors opacity-40 hover:opacity-100">Admin</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}


