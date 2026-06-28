import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "AulaPremium",
  description: "Alquiler de aulas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-slate-950 text-white selection:bg-amber-500 selection:text-slate-950">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-slate-950 border-t border-white/5 pt-32 pb-16 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
              <div className="col-span-1 md:col-span-2">
                <Link href="/" className="group flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl">A</div>
                  <span className="text-2xl font-bold text-white tracking-tighter">AULAPREMIUM</span>
                </Link>
                <p className="text-slate-400 max-w-sm mb-10 text-lg leading-relaxed font-light">
                  Ofrecemos los mejores espacios y servicios digitales para que tu talento y negocio crezcan sin límites.
                </p>
                <div className="flex gap-4">
                  {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                    <a key={social} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all group">
                      <span className="sr-only">{social}</span>
                      <div className="text-sm font-bold group-hover:scale-110 transition-transform">{social[0]}</div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Explorar</h4>
                <ul className="space-y-4 text-slate-400 text-sm font-medium">
                  <li><Link href="/aulas" className="hover:text-amber-500 transition-colors">Nuestras Aulas</Link></li>
                  <li><Link href="/servicios" className="hover:text-amber-500 transition-colors">Servicios Digitales</Link></li>
                  <li><Link href="/formacion" className="hover:text-amber-500 transition-colors">Formación IT</Link></li>
                  <li><Link href="/contacto" className="hover:text-amber-500 transition-colors">Contacto</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Soporte</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500">📍</span> 
                    <span>Calle Principal 123, <br />28001 Madrid, España</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-500">📞</span> 
                    <span>+34 912 345 678</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-500">✉️</span> 
                    <span>info@aulapremium.es</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-xs tracking-widest uppercase">
              <p>&copy; 2026 AulaPremium. Engineered for Excellence.</p>
              <div className="flex gap-10">
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Términos</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}


