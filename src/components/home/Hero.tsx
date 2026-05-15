"use client";

import Link from "next/link";
import Image from "next/image";
import { Zap, Code2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark py-12 sm:py-16 md:py-20 lg:py-0">
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
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 py-12 sm:py-16 md:py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* LADO IZQUIERDO: TEXTO Y ACCIONES */}
          <div className="flex flex-col space-y-6 sm:space-y-7 md:space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000 order-2 lg:order-1">
            <div>
              <h1 className="title-main text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-5 md:mb-6 leading-[1.2] sm:leading-[1.15] md:leading-[1.1] tracking-tight text-white font-black">
                Transformamos <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-primary">
                  tu visión digital en realidad
                </span>
              </h1>

              <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light px-2 sm:px-0">
                Diseñamos y desarrollamos soluciones web de clase mundial.
                Combinamos estrategia, diseño excepcional y código escalable
                para crear productos que generan impacto real en tu negocio.
              </p>
            </div>

            {/* Stats o valores */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 py-4 sm:py-6 md:py-8">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                  10+
                </div>
                <p className="text-xs sm:text-xs md:text-sm text-text-secondary font-medium">
                  Proyectos
                </p>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                  100%
                </div>
                <p className="text-xs sm:text-xs md:text-sm text-text-secondary font-medium">
                  Satisfacción
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 md:pt-6">
              <Link
                href="/contact"
                className="cta-button px-6 sm:px-8 py-3 sm:py-4 bg-primary text-bg-dark font-black text-sm sm:text-base rounded-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(46,204,112,0.3)] active:scale-95 text-center inline-flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <Zap className="w-4 h-4 flex-shrink-0 group-hover:rotate-12 transition-transform" />
                Iniciar
                <span>Proyecto</span>
              </Link>
              <Link
                href="/portfolio"
                className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-lg font-bold border border-primary/30 text-white hover:border-primary/60 hover:bg-primary/5 transition-all text-center backdrop-blur-sm active:scale-95 inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Code2 className="w-4 h-4 flex-shrink-0" />
                Ver
                <span className="hidden sm:inline">Portafolio</span>
              </Link>
            </div>
          </div>

          {/* LADO DERECHO: IMAGEN / MOCKUPS CON EFECTOS */}
          <div className="relative flex items-center justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-200 order-1 lg:order-2 h-64 sm:h-80 md:h-96 lg:h-auto">
            {/* Resplandor de fondo mejorado */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] sm:w-[130%] lg:w-[140%] h-[120%] sm:h-[130%] lg:h-[140%] bg-gradient-to-r from-primary/15 to-emerald-400/10 rounded-full blur-[100px] sm:blur-[120px] lg:blur-[140px] -z-10 animate-pulse"></div>

            <div className="relative w-full h-full max-w-none">
              <Image
                src="/images/hero/Mockup_hero.png"
                alt="Proyectos Estudio Camaleón"
                width={1200}
                height={800}
                priority
                className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(46,204,112,0.1)] sm:drop-shadow-[0_20px_40px_rgba(46,204,112,0.12)] md:drop-shadow-[0_25px_50px_rgba(46,204,112,0.15)] lg:drop-shadow-[0_25px_60px_rgba(46,204,112,0.15)] lg:scale-125 origin-center lg:origin-right transition-transform duration-500 hover:drop-shadow-[0_20px_50px_rgba(46,204,112,0.2)] sm:hover:drop-shadow-[0_25px_60px_rgba(46,204,112,0.22)] lg:hover:drop-shadow-[0_30px_70px_rgba(46,204,112,0.25)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
