"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FiMail, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isPortfolioPage = pathname === "/portfolio";

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    if (pathname === "/") {
      if (id === "proyectos") return;
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-50 bg-bg-dark border-t border-border-dark pt-16 pb-8">
      <div className="absolute inset-0 bg-bg-dark -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="relative w-48 h-12">
              <Image
                src="/icons/Logowebjunto.svg"
                alt="Estudio Camaleón Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-text-secondary leading-relaxed">
              Soluciones escalables que se adaptan a tu negocio.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/estudiocamaleon.tuc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-all hover:scale-110"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Navegación
            </h4>
            <ul className="space-y-4 text-text-secondary">
              {["Servicios", "Portafolio", "Proceso", "Contacto"].map(
                (item) => {
                  const id = item.toLowerCase();
                  const isPortfolio = id === "portafolio";
                  return (
                    <li key={item}>
                      <Link
                        href={isPortfolio ? "/portfolio" : `/#${id}`}
                        onClick={(e) => handleNavClick(e, id)}
                        className="hover:text-primary transition-colors inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Capacidades
            </h4>
            <ul className="space-y-4 text-text-secondary">
              <li>Desarrollo Full-Stack</li>
              <li>Diseño UI/UX</li>
              <li>Integración de APIs</li>
              <li>Sistemas de Gestión</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
              Contacto
            </h4>
            <ul className="space-y-4 text-text-secondary">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary text-xl shrink-0 mt-1" />
                <span>Tucumán, Argentina</span>
              </li>
              <li className="flex items-center gap-3 group">
                <FiMail className="text-primary text-xl shrink-0" />
                <a
                  href="mailto:estudiocamaleontuc@gmail.com"
                  className="group-hover:text-white transition-colors"
                >
                  estudiocamaleontuc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <FaWhatsapp className="text-primary text-xl shrink-0" />
                <a
                  href="https://wa.me/5493813583226"
                  target="_blank"
                  className="group-hover:text-white transition-colors"
                >
                  +54 9 381 358-3226
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-dark/50 text-center">
          <p className="text-text-secondary/50 text-xs">
            © {currentYear} Estudio Camaleón. Todos los derechos reservados.
          </p>
        </div>
      </div>

      <a
        href="https://wa.me/5493813583226"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-[100] bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-all"
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
      </a>
    </footer>
  );
};

export default Footer;
