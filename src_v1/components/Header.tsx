'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Aulas', href: '/aulas' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Formación', href: '/formacion' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-slate-950/90 backdrop-blur-xl py-4 border-b border-slate-800/50' : 'bg-transparent py-8'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl group-hover:rotate-12 transition-transform">A</div>
          <span className="text-2xl font-bold text-white tracking-tighter">AULAPREMIUM</span>
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className={`relative text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-amber-500 ${
                    isActive ? 'text-amber-500' : 'text-slate-400'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-amber-500 rounded-full"></span>
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <Link 
              href="/admin" 
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${
                pathname === '/admin' 
                  ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                  : 'border-slate-700 text-white hover:border-amber-500'
              }`}
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-[100]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-slate-950/98 z-[90] md:hidden flex flex-col justify-center items-center transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          <ul className="flex flex-col items-center gap-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className={`text-4xl font-black transition-all ${
                      isActive ? 'text-amber-500 scale-110' : 'text-slate-500 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            <li className="mt-4">
              <Link 
                href="/admin" 
                className="text-2xl font-bold text-amber-500 border-b-2 border-amber-500/20 pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Panel de Administración
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}



