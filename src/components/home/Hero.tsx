"use client";

import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video de fondo con overlay para legibilidad */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/videos/Herocamaleon.webm"
        />
        <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-[2px]"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="section-badge mb-6">
          Desarrollo de Software de Alto Nivel
        </span>

        <h1 className="title-main text-5xl md:text-7xl mb-8 leading-tight">
          Construimos productos digitales{" "}
          <span className="text-primary">robustos y escalables</span>
        </h1>

        <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Especializados en desarrollo web moderno, diseño gráfico y soluciones
          personalizadas para llevar tu negocio al siguiente nivel.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="cta-button">Iniciar Proyecto</button>
          <button className="px-8 py-3.5 rounded-xl font-bold border border-border-dark text-white hover:bg-surface-dark transition-all">
            Ver Portafolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
