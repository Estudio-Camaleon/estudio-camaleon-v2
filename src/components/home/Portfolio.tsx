"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolioData, Project } from "@/data/portfolio";
import ProjectModal from "@/components/portfolio/ProjectModal";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Limitamos a los primeros 6 para la Home si tienes muchos
  const featuredProjects = portfolioData.slice(0, 6);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      id="portfolio"
      className="py-20 bg-bg-dark relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado - Sin cambios visuales */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="section-badge mb-4">Portafolio</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Proyectos que impulsan <br />
              <span className="text-gradient">negocios reales.</span>
            </h2>
          </div>
          <a href="/portfolio" className="cta-button">
            Ver todo el trabajo
          </a>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleOpenModal(project)}
              className="group relative bg-surface-dark rounded-3xl overflow-hidden border border-white/5 cursor-pointer transition-all duration-500 hover:border-primary/30 hover:translate-y-[-8px]"
            >
              {/* Contenedor de Imagen */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack simplificado para la Home */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] bg-white/5 px-2 py-1 rounded text-white/50 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL INTEGRADO: Mismo que en la página de Portafolio */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />

      {/* Decoración de fondo opcional */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
