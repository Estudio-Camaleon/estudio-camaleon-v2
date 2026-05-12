"use client";

import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Carlos Rodríguez",

    content:
      "La capacidad de adaptación del equipo de Estudio Camaleón es increíble. Transformaron nuestra idea compleja en una plataforma fluida y escalable.",
    stars: 5,
  },
  {
    name: "Ana Martínez",
    content:
      "Buscábamos algo disruptivo y lo logramos. El diseño UI/UX superó nuestras expectativas y la integración de la pasarela de pagos es impecable.",
    stars: 5,
  },
  {
    name: "Juan Pérez",
    content:
      "Su enfoque en el desarrollo Full-Stack nos permitió centralizar procesos que antes tomaban días en solo minutos. Profesionales de primer nivel.",
    stars: 5,
  },
  {
    name: "Lucía Fernández",
    content:
      "El soporte post-lanzamiento y la atención al detalle en cada animación hacen que Estudio Camaleón sea nuestro partner tecnológico definitivo.",
    stars: 5,
  },
];

const Testimony = () => {
  return (
    <section
      id="testimonios"
      className="relative py-24 bg-bg-dark overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Encabezado de Sección */}
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            Feedback
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Lo que dicen nuestros{" "}
            <span className="text-primary italic">aliados</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Grid de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm"
            >
              {/* Icono de Comilla Flotante */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-bg-dark border border-white/10 rounded-full flex items-center justify-center text-primary shadow-xl group-hover:scale-110 transition-transform">
                <FaQuoteLeft className="w-4 h-4" />
              </div>

              {/* Estrellas */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, i) => (
                  <FaStar key={i} className="text-primary w-3 h-3" />
                ))}
              </div>

              {/* Contenido */}
              <p className="text-text-secondary leading-relaxed mb-6 italic">
                "{t.content}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-green-900 flex items-center justify-center text-black font-bold text-lg shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm lg:text-base">
                    {t.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de Call to Action sutil */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 border border-primary/20 text-center">
          <p className="text-white/80 text-lg">
            ¿Listo para que tu proyecto sea nuestro próximo caso de éxito?
          </p>
          <button className="mt-4 text-primary font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
            Hablemos ahora —&gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
