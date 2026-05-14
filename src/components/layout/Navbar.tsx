"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const showAnim = useRef<gsap.core.Tween | null>(null);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/servicios", label: "Servicios" },
    { href: "/portfolio", label: "Portafolio" },
    { href: "/contact", label: "Contacto" },
  ];

  useEffect(() => {
    // Registramos el plugin dentro del useEffect para evitar errores de SSR
    gsap.registerPlugin(ScrollTrigger);

    // Creamos la animación de "aparición"
    showAnim.current = gsap
      .from(navRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.3,
        ease: "power2.out",
      })
      .progress(1);

    // ScrollTrigger para detectar dirección
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // Si scrolleamos hacia abajo, escondemos. Hacia arriba, mostramos.
        if (self.direction === -1) {
          showAnim.current?.play();
        } else {
          showAnim.current?.reverse();
        }

        // Controlamos el estado estético (fondo oscuro/transparente)
        setIsScrolled(self.scroll() > 50);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-bg-dark/95 backdrop-blur-md py-3 border-b border-border-dark"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="relative w-40 h-10 md:w-48 md:h-12 transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src="/icons/Logowebjunto.svg"
              alt="Estudio Camaleón"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 120px, 192px"
            />
          </Link>

          <div className="ms-auto flex items-center gap-3 md:gap-4">
            <div className="hidden md:flex items-center gap-6 lg:gap-8 pe-2">
              {navLinks.map((link) => (
                link.label !== "Contacto" ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[11px] font-bold hover:text-primary transition-colors uppercase tracking-[0.2em]"
                  >
                    {link.label}
                  </Link>
                ) : null
              ))}
            </div>

            <Link
              href="/contact"
              className="hidden md:inline-flex px-4 md:px-6 py-2.5 rounded-full bg-primary text-bg-dark font-bold text-[11px] uppercase tracking-wider hover:scale-105 transition-all active:scale-95 shadow-lg shadow-primary/10"
            >
              Contacto
            </Link>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-border-dark bg-surface-dark text-white hover:border-primary/50 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 mx-3 sm:mx-6 max-w-[740px] rounded-[1.75rem] border border-border-dark bg-bg-darker p-4 sm:p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] relative z-50">
            <div className="grid gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-[14px] font-bold uppercase tracking-[0.18em] transition-all ${
                    link.label === "Contacto"
                      ? "border-primary/30 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/15"
                      : "border-border-dark bg-surface-dark/80 text-white/80 hover:text-primary hover:border-primary/40"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs opacity-70">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
