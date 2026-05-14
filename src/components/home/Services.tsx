"use client";

import { servicesData } from "@/data/services"; // Importamos los datos
import Link from "next/link";
import {
  FiGrid,
  FiGlobe,
  FiLayout,
  FiLayers,
  FiMonitor,
  FiShoppingCart,
} from "react-icons/fi";

const serviceIcons = {
  landing: FiLayout,
  management: FiGrid,
  institutional: FiGlobe,
  multipage: FiLayers,
  ecommerce: FiShoppingCart,
  custom: FiMonitor,
} as const;

type ServicesProps = {
  showCtas?: boolean;
};

const Services = ({ showCtas = true }: ServicesProps) => {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden py-20 sm:py-24 md:py-32 bg-bg-darker"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(46,204,112,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(46,204,112,0.08),_transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] items-start mb-14 sm:mb-16 lg:mb-20">
          <div className="max-w-3xl">
            <span className="section-badge">Servicios</span>
            <h2 className="title-main text-4xl sm:text-5xl lg:text-6xl max-w-3xl leading-[0.95] mb-6">
              Soluciones digitales con foco en conversión y claridad.
            </h2>
            <p className="text-text-secondary max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed">
              Diseñamos y desarrollamos piezas concretas para vender mejor,
              ordenar procesos y presentar tu marca con una presencia sólida.
            </p>

            {showCtas && (
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link
                  href="/contact"
                  className="cta-button text-center w-full sm:w-auto"
                >
                  Solicitar presupuesto
                </Link>
                <Link
                  href="/portfolio"
                  className="px-8 py-3.5 rounded-xl border border-border-dark bg-white/5 text-white font-bold hover:border-primary hover:text-primary transition-all text-center w-full sm:w-auto"
                >
                  Ver portafolio
                </Link>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {[
              { value: "06", label: "servicios principales" },
              { value: "100%", label: "a medida" },
              { value: "UX", label: "enfoque en claridad" },
              { value: "SEO", label: "base lista para crecer" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-border-dark bg-surface-dark/70 p-5 sm:p-6 md:p-7 backdrop-blur-sm min-h-[132px] flex flex-col justify-between"
              >
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {item.value}
                </div>
                <p className="mt-2 text-[11px] sm:text-sm text-text-secondary uppercase tracking-[0.18em] leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {servicesData.map((service, index) => {
            const Icon = serviceIcons[service.icon];

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-[1.75rem] border border-border-dark bg-[linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.02))] p-6 sm:p-8 min-h-[260px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/60"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark transition-all duration-300 shrink-0">
                      <Icon className="text-2xl sm:text-3xl" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.35em] text-text-secondary pt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-4 text-white tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>

                  <div className="mt-7 pt-5 border-t border-border-dark/70 flex items-center justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-bold">
                      Desarrollo estratégico
                    </span>
                    <span className="text-text-secondary text-sm">+</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;