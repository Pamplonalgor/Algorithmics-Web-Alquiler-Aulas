"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';

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
      isScrolled ? 'bg-slate-950/85 backdrop-blur-xl py-4 border-b border-slate-800/40' : 'bg-transparent py-8'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className={`relative text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-cobalt rounded-full"></span>
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <Link 
              href="/admin" 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
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
        <div className={`fixed inset-0 bg-[#07020d]/98 z-[90] md:hidden flex flex-col justify-center items-center transition-all duration-500 ${
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
                      isActive ? 'text-brand-magenta scale-110' : 'text-slate-500 hover:text-white'
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
                className="text-2xl font-bold text-brand-magenta border-b-2 border-brand-purple/20 pb-2"
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



