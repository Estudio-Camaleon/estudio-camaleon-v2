"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // fallback: scroll to top if id not found
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-dark/90 backdrop-blur-md py-4 border-b border-border-dark' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo (usar Logowebjunto como en el footer) */}
        <a href="#" onClick={handleLogoClick} className="relative w-40 h-12 md:w-48 md:h-14">
          <Image
            src="/icons/Logowebjunto.svg"
            alt="Estudio Camaleón"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 120px, 192px"
          />
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Servicios', 'Portafolio', 'Proceso', 'Contacto'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="text-sm font-bold text-white hover:text-primary transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contacto" className="px-5 py-2 rounded-lg bg-primary text-dark font-bold text-sm hover:scale-105 transition-transform">
          Consultar
        </a>
      </div>
    </nav>
  );
};

export default Navbar;