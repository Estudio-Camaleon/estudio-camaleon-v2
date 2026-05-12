"use client";

import Link from "next/link";
import Image from "next/image";
import { Monitor, Smartphone, Rocket } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-dark">
      {/* Video de fondo con overlay optimizado */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
          src="/videos/Herocamaleon.webm"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/90 to-bg-dark/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LADO IZQUIERDO: TEXTO Y ACCIONES */}
          <div className="flex flex-col space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            <div>
              <span className="section-badge inline-flex items-center gap-2 mb-6">
                <Rocket className="w-3 h-3 text-primary" />
                Desarrollo de Software de Alto Nivel
              </span>
              <h1 className="title-main text-5xl md:text-7xl lg:text-8xl mb-6 leading-[1.05] tracking-tighter text-white font-black">
                Construimos productos <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                  digitales robustos
                </span>
              </h1>
              <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Especializados en desarrollo web moderno, diseño estratégico y
                soluciones escalables para llevar tu visión al siguiente nivel.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="cta-button px-10 py-4 bg-primary text-bg-dark font-black rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(57,255,20,0.2)] active:scale-95 text-center"
              >
                Iniciar Proyecto
              </Link>
              <Link
                href="/portfolio"
                className="px-10 py-4 rounded-full font-bold border border-white/10 text-white hover:bg-white/5 transition-all text-center backdrop-blur-sm active:scale-95"
              >
                Ver Portafolio
              </Link>
            </div>
          </div>

          {/* LADO DERECHO: DISPOSITIVOS (MOCKUPS) */}
          <div className="relative flex items-center justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-200">
            {/* Laptop Mockup */}
            <div className="relative w-full max-w-[550px] z-20 group">
              <div className="relative aspect-[16/10] bg-black rounded-t-2xl border-[8px] border-[#222] overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/images/proyectos/Neo_portada.webp"
                  alt="Desktop Preview"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="h-4 w-full bg-[#1a1a1a] rounded-b-2xl border-t border-white/5 shadow-xl"></div>

              {/* Floating Icon Decor */}
              <div className="absolute -top-6 -right-6 p-4 bg-surface-dark border border-white/10 rounded-2xl shadow-2xl hidden md:block animate-bounce-slow">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Smartphone Mockup (Superpuesto) */}
            <div className="absolute -bottom-10 -left-4 md:-left-10 lg:left-0 z-30 w-[140px] md:w-[180px] group hidden sm:block">
              <div className="relative h-[280px] md:h-[360px] w-full bg-black rounded-[2.5rem] border-[8px] border-[#222] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
                <Image
                  src="/images/proyectos/MundoAnimeTucumanPortada.png"
                  alt="Mobile Preview"
                  fill
                  className="object-cover object-top"
                />
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#222] rounded-b-xl"></div>
              </div>

              {/* Floating Icon Decor */}
              <div className="absolute -bottom-4 -right-4 p-3 bg-surface-dark border border-white/10 rounded-xl shadow-2xl animate-pulse">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
            </div>

            {/* Decoración de fondo (Brillo neón) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll inferior */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20">
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
