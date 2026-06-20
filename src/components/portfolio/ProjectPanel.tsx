"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/data/portfolio";
import MascotaSaludo from "@/components/ui/MascotaSaludo";
import ProjectBackground from "./ProjectBackgrounds";

interface ProjectPanelProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export default function ProjectPanel({
  project,
  index,
  onOpenModal,
}: ProjectPanelProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="portfolio-panel relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-bg-dark z-10 transform-gpu">
      {/* CORRECCIÓN VITAL: bg-bg-dark y transform-gpu evitan el bug de GSAP */}

      {/* Gestor del Fondo de React Bits */}
      <ProjectBackground
        type={project.bgType || "none"}
        color={project.bgColor}
      />

      {/* --- DIFUMINADO DE BORDES (FEATHERING) --- */}
      {/* Suavizado del borde superior */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-bg-dark via-bg-dark/80 to-transparent pointer-events-none z-10" />

      {/* Suavizado del borde inferior */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent pointer-events-none z-10" />
      {/* ---------------------------------------- */}

      {/* Contenido */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20 py-24 md:py-0">
        <div
          className={`relative group ${index % 2 !== 0 ? "md:order-2" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 
              CONTENEDOR DE LA MASCOTA RESPONSIVE 
              - Celular (default): w-32 h-32, bottom -30px
              - Tablet (md): w-48 h-48, bottom -50px
              - Laptop (lg): w-56 h-56, bottom -60px
          */}
          <div className="absolute bottom-[-20px] md:bottom-[-20px] lg:bottom-[-35px] left-1/2 -translate-x-1/2 z-30 w-32 h-32 md:w-35 md:h-35 lg:w-56 lg:h-56 pointer-events-none flex items-end justify-center">
            <MascotaSaludo active={isHovered} />
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:border-primary/40 group-hover:shadow-[0_0_40px_rgba(57,255,20,0.15)] bg-black">
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent opacity-80" />
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <span className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] block">
              {project.category}
            </span>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-lg">
                {project.title}
              </h2>
              {project.status === "development" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 border border-amber-400/30 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-amber-300">
                    En Desarrollo
                  </span>
                </span>
              )}
            </div>
          </div>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light max-w-xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 bg-black/40 border border-white/10 text-[10px] font-bold text-white/80 rounded-full uppercase tracking-widest backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-6 pb-12 md:pb-0 flex items-center gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white hover:bg-primary hover:text-bg-dark hover:border-primary transition-all hover:scale-110 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>
              </a>
            )}
            <button
              onClick={() => onOpenModal(project)}
              className="cta-button group relative overflow-hidden px-8 py-4 bg-primary text-bg-dark font-black rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-3 w-fit shadow-[0_0_20px_rgba(57,255,20,0.2)]"
            >
              <span>Explorar Caso</span>
              <span className="group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
