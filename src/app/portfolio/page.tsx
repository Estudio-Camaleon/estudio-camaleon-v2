"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo inicializamos GSAP si hay proyectos para pinear
    if (portfolioData.length === 0) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".portfolio-panel");

      panels.forEach((panel, i) => {
        const isLast = i === panels.length - 1;

        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: !isLast,
          pinSpacing: false,
          scrub: 1,
          end: () => `+=${window.innerHeight * 2}`,
          invalidateOnRefresh: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-bg-dark min-h-screen">
      <Navbar />

      {/* Video de Fondo Fijo */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/videos/Portafolio.webm"
        />
        <div className="absolute inset-0 bg-bg-dark/90 backdrop-blur-[2px]"></div>
      </div>

      <main ref={containerRef} className="relative z-10">
        {/* HERO SECTION */}
        <section className="portfolio-panel relative min-h-screen flex items-center justify-center pt-20">
          <div className="text-center container mx-auto px-6">
            <span className="section-badge mb-4">Casos de Éxito</span>
            <h1 className="title-main text-5xl md:text-8xl mt-4 mb-6">
              Nuestro <span className="text-primary">Impacto</span> Digital
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed mb-12">
              {portfolioData.length > 0
                ? "Desliza para explorar nuestras soluciones de ingeniería de software."
                : "Estamos preparando una selección de nuestros mejores trabajos."}
            </p>

            {portfolioData.length > 0 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
                <span className="text-primary/50 text-[10px] uppercase tracking-[0.2em]">
                  Scroll
                </span>
                <span className="text-primary text-3xl">↓</span>
              </div>
            )}
          </div>
        </section>

        {/* PANELES DE PROYECTOS O MENSAJE VACÍO */}
        {portfolioData.length === 0 ? (
          <section className="h-[60vh] flex items-center justify-center">
            <div className="text-center p-12 rounded-3xl bg-surface-dark/50 border border-border-dark backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-2">
                Próximamente
              </h3>
              <p className="text-text-secondary">
                Estamos actualizando nuestro portafolio con nuevos proyectos.
              </p>
            </div>
          </section>
        ) : (
          portfolioData.map((project, index) => (
            <section
              key={project.title}
              className="portfolio-panel relative h-screen w-full flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-bg-dark border-t border-border-dark/50 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"></div>
              <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
                <div
                  className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="w-full md:w-1/2 group">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                      <Image
                        src={project.img}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase mb-6 tracking-tighter">
                      {project.category}
                    </div>
                    <h2 className="title-main text-4xl md:text-6xl mb-6 text-white tracking-tight leading-none">
                      {project.title}
                    </h2>
                    <p className="text-text-secondary text-lg mb-8 leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-surface-dark border border-white/5 text-[10px] font-bold text-white/60 rounded-md uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        )}
      </main>

      <div className="relative z-50 bg-bg-dark">
        <Footer />
      </div>
    </div>
  );
}
