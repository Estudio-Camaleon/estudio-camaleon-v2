"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const showAnim = useRef<gsap.core.Tween | null>(null);

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

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-bg-dark/95 backdrop-blur-md py-3 border-b border-border-dark"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
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

        <div className="ms-auto flex items-center gap-3 md:gap-8">
          <div className="hidden md:flex items-center gap-8 pe-2">
            <Link
              href="/portfolio"
              className="text-[11px] font-bold hover:text-primary transition-colors uppercase tracking-[0.2em]"
            >
              Servicios
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 pe-2">
            <Link
              href="/portfolio"
              className="text-[11px] font-bold hover:text-primary transition-colors uppercase tracking-[0.2em]"
            >
              Portafolio
            </Link>
          </div>

          <Link
            href="/contact"
            className="px-4 md:px-6 py-2.5 rounded-full bg-primary text-bg-dark font-bold text-[11px] uppercase tracking-wider hover:scale-105 transition-all active:scale-95 shadow-lg shadow-primary/10"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
