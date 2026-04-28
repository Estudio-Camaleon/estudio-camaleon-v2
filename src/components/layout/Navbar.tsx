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

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-dark/90 backdrop-blur-md py-4 border-b border-border-dark' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="relative w-32 h-10">
          <Image 
            src="/icons/LogoWeb.svg" 
            alt="Estudio Camaleón" 
            fill
            className="object-contain"
          />
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Servicios', 'Portafolio', 'Proceso', 'Contacto'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
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