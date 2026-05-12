"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { portfolioData, Project } from "@/data/portfolio";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MascotaSaludo from "@/components/ui/MascotaSaludo";
import ProjectModal from "@/components/portfolio/ProjectModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- SUB-COMPONENTE: PREVISUALIZACIÓN CON HOVER ---
function ProjectPreview({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group ${index % 2 !== 0 ? "md:order-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 z-30 w-48 h-48 pointer-events-none flex items-end justify-center">
        <MascotaSaludo active={isHovered} />
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-primary/5">
        <Image
          src={project.img}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 to-transparent" />
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasProjects = portfolioData && portfolioData.length > 0;

  useEffect(() => {
    if (!hasProjects) return;

    const ctx = gsap.context(() => {
      // CORRECCIÓN: Tipamos el array de elementos aquí para que el forEach no falle
      const panels = gsap.utils.toArray<HTMLElement>(".portfolio-panel");

      panels.forEach((panel, i) => {
        const isLast = i === panels.length - 1;

        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: !isLast,
          pinSpacing: false,
          scrub: 1,
          end: () => `+=${window.innerHeight * 1.5}`,
          invalidateOnRefresh: true,
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

      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/videos/Portafolio.webm"
        />
        <div className="absolute inset-0 bg-bg-dark/40 backdrop-blur-[2px]" />
      </div>

      <section className="relative z-10 h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <span className="section-badge animate-fade-in">Casos de Éxito</span>
        <h1 className="title-main text-5xl md:text-7xl mb-4 text-white">
          Nuestro Impacto Digital
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          {hasProjects
            ? "Desliza para explorar nuestras soluciones de ingeniería de software."
            : "Estamos preparando nuevos lanzamientos para ti."}
        </p>

        {hasProjects && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
              Scroll
            </span>
            <span className="text-2xl text-primary">↓</span>
          </div>
        )}
      </section>

      <div className="relative z-10">
        {hasProjects ? (
          portfolioData.map((project, index) => (
            <section
              key={`${project.title}-${index}`}
              className="portfolio-panel relative h-screen w-full flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-bg-dark shadow-[0_-30px_60px_rgba(0,0,0,0.8)] border-t border-white/5" />

              <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20">
                <ProjectPreview project={project} index={index} />

                <div className="flex flex-col space-y-6">
                  <div>
                    <span className="text-primary font-bold text-sm uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-text-secondary text-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-surface-dark border border-white/5 text-[10px] font-bold text-white/60 rounded uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="cta-button inline-block text-center min-w-[200px]"
                    >
                      Ver Proyecto →
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div className="h-[40vh] flex items-center justify-center text-white">
            <p className="bg-surface-dark px-8 py-4 rounded-2xl border border-white/5">
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
