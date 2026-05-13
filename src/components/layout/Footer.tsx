"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import {
  FiMail,
  FiMapPin,
  FiCode,
  FiLayout,
  FiLayers,
  FiCpu,
  FiArrowRight,
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    if (pathname === "/") {
      if (id === "proyectos") return;
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-50 bg-bg-dark border-t border-border-dark pt-20 pb-10 overflow-hidden">
      {/* Capa de fondo base */}
      <div className="absolute inset-0 bg-bg-dark -z-10" />

      {/* --- EFECTOS HALFTONE Y GLOW --- */}

      {/* Esquina Inferior Izquierda */}
      <div
        className="absolute bottom-0 left-0 w-64 h-64 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-primary, #39FF14) 1px, transparent 0)`,
          backgroundSize: "12px 12px",
          maskImage:
            "radial-gradient(circle at bottom left, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at bottom left, black, transparent 70%)",
        }}
      />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_12px_#39FF14] animate-pulse pointer-events-none" />

      {/* Esquina Inferior Derecha */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-primary, #39FF14) 1px, transparent 0)`,
          backgroundSize: "12px 12px",
          maskImage:
            "radial-gradient(circle at bottom right, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at bottom right, black, transparent 70%)",
        }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_12px_#39FF14] animate-pulse pointer-events-none" />

      {/* ----------------------------- */}

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-pretty">
          {/* Columna 1: Branding y Redes */}
          <div className="flex flex-col gap-6">
            <div className="relative w-56 h-14">
              <Image
                src="/icons/Logowebjunto.svg"
                alt="Estudio Camaleón Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-text-secondary leading-relaxed text-sm lg:text-base pr-4">
              Creamos experiencias digitales de alto impacto. Soluciones
              escalables que se adaptan a la evolución de tu negocio.
            </p>
            <div className="flex gap-5">
              <a
                href="https://www.instagram.com/estudiocamaleon.tuc/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 text-white hover:text-primary hover:bg-white/10 transition-all hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/camale%C3%B3n-programaci%C3%B3n-y-dise%C3%B1o"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 text-white hover:text-primary hover:bg-white/10 transition-all hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Estudio-Camaleon"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 text-white hover:text-primary hover:bg-white/10 transition-all hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs border-b border-primary/30 pb-2 inline-block">
              Navegación
            </h4>
            <ul className="space-y-4 text-text-secondary">
              {["Portafolio", "Proceso", "Contacto", "Equipo"].map((item) => {
                const id = item.toLowerCase();
                const isExternal = id === "portafolio" || id === "equipo";
                const href =
                  id === "portafolio"
                    ? "/portfolio"
                    : id === "equipo"
                      ? "/team"
                      : `/#${id}`;

                return (
                  <li key={item} className="group flex items-center gap-2">
                    <FiArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                    <Link
                      href={href}
                      className="hover:text-white transition-colors text-sm lg:text-base font-medium"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Columna 3: Servicios con Iconos */}
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs border-b border-primary/30 pb-2 inline-block">
              Servicios
            </h4>
            <ul className="space-y-5 text-text-secondary">
              <li className="flex items-center gap-3 text-sm lg:text-base group cursor-default">
                <FiCode className="text-primary group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  Desarrollo Full-Stack
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm lg:text-base group cursor-default">
                <FiLayout className="text-primary group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  Diseño UI/UX
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm lg:text-base group cursor-default">
                <FiCpu className="text-primary group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  Integración de APIs
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm lg:text-base group cursor-default">
                <FiLayers className="text-primary group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  Sistemas de Gestión
                </span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-[0.2em] text-xs border-b border-primary/30 pb-2 inline-block">
              Contacto
            </h4>
            <ul className="space-y-5 text-text-secondary">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary text-xl shrink-0" />
                <span className="text-sm lg:text-base font-medium">
                  Tucumán, Argentina
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <FiMail className="text-primary text-xl shrink-0 group-hover:rotate-12 transition-transform" />
                <a
                  href="mailto:estudiocamaleontuc@gmail.com"
                  className="group-hover:text-white transition-colors text-sm lg:text-base break-all"
                >
                  estudiocamaleontuc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <FaWhatsapp className="text-primary text-xl shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="https://wa.me/5493813583226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:text-white transition-colors text-sm lg:text-base"
                >
                  +54 9 381 358-3226
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-dark/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary/50 text-[10px] uppercase tracking-widest">
            © {currentYear} Estudio Camaleón. Built with excellence.
          </p>
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-border-dark to-transparent mx-4 hidden lg:block" />
          <p className="text-text-secondary/50 text-[10px] uppercase tracking-widest">
            Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5493813583226"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-[100] bg-[#25D366] p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-all active:scale-95"
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
      </a>
    </footer>
  );
};

export default Footer;
