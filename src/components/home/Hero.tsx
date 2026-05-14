"use client";

import Link from "next/link";
import Image from "next/image";
import { Rocket, Zap, Code2 } from "lucide-react";

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

      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-1 h-1 bg-primary rounded-full opacity-40"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-primary/60 rounded-full opacity-30"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-primary/40 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-primary rounded-full opacity-35"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LADO IZQUIERDO: TEXTO Y ACCIONES */}
          <div className="flex flex-col space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            <div>
              <h1 className="title-main text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] tracking-tight text-white font-black">
                Transformamos <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-primary">
                  tu visión digital
                </span>
                <br />
                en realidad
              </h1>
              
              <p className="text-text-secondary text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                Diseñamos y desarrollamos soluciones web de clase mundial. Combinamos 
                estrategia, diseño excepcional y código escalable para crear productos 
                que generan impacto real en tu negocio.
              </p>
            </div>

            {/* Stats o valores */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">50+</div>
                <p className="text-xs text-text-secondary font-medium">Proyectos Exitosos</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">15+</div>
                <p className="text-xs text-text-secondary font-medium">Años Experiencia</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">100%</div>
                <p className="text-xs text-text-secondary font-medium">Satisfacción</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="/contact"
                className="cta-button px-8 py-4 bg-primary text-bg-dark font-black rounded-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(46,204,112,0.3)] active:scale-95 text-center inline-flex items-center justify-center gap-2 group"
              >
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Iniciar Proyecto
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 rounded-lg font-bold border border-primary/30 text-white hover:border-primary/60 hover:bg-primary/5 transition-all text-center backdrop-blur-sm active:scale-95 inline-flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                Ver Portafolio
              </Link>
            </div>
          </div>

          {/* LADO DERECHO: IMAGEN / MOCKUPS CON EFECTOS */}
          <div className="relative flex items-center justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-200">
            {/* Resplandor de fondo mejorado */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-r from-primary/15 to-emerald-400/10 rounded-full blur-[140px] -z-10 animate-pulse"></div>
            
            {/* Borde decorativo sutil */}
            <div className="absolute inset-0 rounded-2xl border border-primary/10 -z-10"></div>

            <div className="relative w-full max-w-none">
              <Image
                src="/images/hero/Mockup_hero.png"
                alt="Proyectos Estudio Camaleón"
                width={1200}
                height={800}
                priority
                /* CLAVE: 
         - lg:scale-125: Aumenta el tamaño un 25% por encima de su contenedor en pantallas grandes.
         - w-full h-auto: Asegura que use todo el espacio disponible.
         - drop-shadow: Lo mantenemos para el look premium.
      */
                className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(46,204,112,0.15)] lg:scale-125 origin-center lg:origin-right transition-transform duration-500 hover:drop-shadow-[0_30px_70px_rgba(46,204,112,0.25)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll mejorado */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        <div className="text-xs text-text-secondary font-light">Desplázate</div>
      </div>
    </section>
  );
};

export default Hero;
