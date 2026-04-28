"use client";

import { servicesData } from "@/data/services"; // Importamos los datos

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-bg-darker">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-badge">Servicios</span>
          <h2 className="title-main text-4xl md:text-5xl mb-6">
            Soluciones para tu negocio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.title}
              className="bg-surface-dark p-8 rounded-2xl border border-border-dark hover:border-primary transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-xl mb-6 text-primary group-hover:bg-primary group-hover:text-dark transition-all duration-300">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                  {service.icon}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {service.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;