"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolioData, Project } from "@/data/portfolio";
import ProjectModal from "@/components/portfolio/ProjectModal";
import Link from "next/link";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // LIMITACIÓN: Cambiamos de 6 a 3 para mantener la Home compacta y llamativa
  const featuredProjects = portfolioData.slice(0, 3);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section
      id="portfolio"
      className="py-24 bg-bg-dark relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="section-badge mb-4">Portafolio</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Proyectos que impulsan <br />
              <span className="text-gradient">negocios reales.</span>
            </h2>
            <div className="w-20 h-1 bg-primary mt-6 rounded-full" />
          </div>

          <Link
            href="/portfolio"
            className="cta-button group flex items-center gap-2"
          >
            Ver todo el trabajo
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Grid de Proyectos - Ahora solo mostrará 3 en una fila limpia */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              onClick={() => handleOpenModal(project)}
              className="group relative bg-surface-dark rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer transition-all duration-500 hover:border-primary/40 hover:-translate-y-3 shadow-2xl"
            >
              {/* Contenedor de Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-80" />

                {/* Badge de Categoría Flotante */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-bg-dark/80 backdrop-blur-md border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-primary font-bold">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-2 mb-6">
                  {project.description}
                </p>

                {/* Tech Stack simplificado */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] bg-white/5 border border-white/5 px-3 py-1 rounded-full text-white/40 uppercase font-medium"
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

      {/* Modal para ver detalles */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />

      {/* Brillo decorativo lateral */}
      <div className="absolute -right-24 top-1/3 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}
