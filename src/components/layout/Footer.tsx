import React from "react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark border-t border-border-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contenido Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo y Descripción */}
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
              Desarrollo de software personalizado. Soluciones escalables que se
              adaptan a tu negocio.
            </p>
            <a
              href="https://www.instagram.com/estudiocamaleon.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              <span className="sr-only">Instagram</span>
              {/* Aquí puedes usar un icono de lucide-react o un SVG inline */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.272 2.695.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.778-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>

          {/* Enlaces de Navegación */}
          <div>
            <h4 className="font-bold text-white mb-6">Navegación</h4>
            <ul className="space-y-4 text-text-secondary">
              {["Servicios", "Proyectos", "Proceso", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capacidades */}
          <div>
            <h4 className="font-bold text-white mb-6">Capacidades</h4>
            <ul className="space-y-4 text-text-secondary">
              <li>Desarrollo Full-Stack</li>
              <li>Diseño UI/UX</li>
              <li>Integración de APIs</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-white mb-6">Contacto</h4>
            <ul className="space-y-4 text-text-secondary">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
                Tucumán, Argentina
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
                estudiocamaleontuc@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border-dark text-center">
          <p className="text-text-tertiary text-sm">
            © {currentYear} Estudio Camaleón. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
