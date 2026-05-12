"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { portfolioData, Project } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectModal from "@/components/portfolio/ProjectModal";
import ProjectPanel from "@/components/portfolio/ProjectPanel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasProjects = portfolioData && portfolioData.length > 0;

  useEffect(() => {
    if (!hasProjects) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".portfolio-panel");

      panels.forEach((panel, i) => {
        const isLast = i === panels.length - 1;

        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: !isLast, // El último panel no se ancla para permitir que el Footer suba
          pinSpacing: false,
          scrub: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [hasProjects]);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <main
      ref={containerRef}
      className="bg-bg-dark min-h-screen relative overflow-x-hidden"
    >
      <Navbar />

      {/* Video de fondo para el Hero */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/videos/Portafolio.webm"
        />
        <div className="absolute inset-0 bg-bg-dark/60 backdrop-blur-[4px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 h-[100dvh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <span className="section-badge animate-fade-in mb-6">
          Casos de Éxito
        </span>
        <h1 className="title-main text-5xl md:text-7xl lg:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary/80 font-black tracking-tighter">
          Nuestro Impacto <br className="hidden md:block" /> Digital
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-light">
          {hasProjects
            ? "Desliza para explorar nuestras soluciones de ingeniería de software."
            : "Estamos preparando nuevos lanzamientos para ti."}
        </p>

        {hasProjects && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-70">
            <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-primary">
              Scroll
            </span>
          </div>
        )}
      </section>

      {/* Renderizado de los Paneles */}
      <div className="relative z-10">
        {hasProjects ? (
          portfolioData.map((project, index) => (
            <ProjectPanel
              key={`${project.title}-${index}`}
              project={project}
              index={index}
              onOpenModal={handleOpenModal}
            />
          ))
        ) : (
          <div className="h-[40vh] flex items-center justify-center text-white">
            <p className="bg-surface-dark px-8 py-4 rounded-2xl border border-white/5 shadow-2xl">
              Próximamente más proyectos...
            </p>
          </div>
        )}
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />

      <Footer />
    </main>
  );
}
