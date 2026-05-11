"use client";

import React from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import {
  SiFramer,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const techMeta = {
  nextjs: { Icon: SiNextdotjs, label: "Next.js", className: "text-white" },
  react: { Icon: SiReact, label: "React", className: "text-[#61DAFB]" },
  typescript: {
    Icon: SiTypescript,
    label: "TypeScript",
    className: "text-[#3178C6]",
  },
  tailwind: {
    Icon: SiTailwindcss,
    label: "Tailwind CSS",
    className: "text-[#06B6D4]",
  },
  supabase: {
    Icon: SiSupabase,
    label: "Supabase",
    className: "text-[#3ECF8E]",
  },
  mongodb: { Icon: SiMongodb, label: "MongoDB", className: "text-[#47A248]" },
  node: { Icon: SiNodedotjs, label: "Node.js", className: "text-[#5FA04E]" },
  framer: { Icon: SiFramer, label: "Framer Motion", className: "text-white" },
} as const;

const Portfolio = () => {
  const previewProjects = portfolioData.slice(0, 3);
  const hasProjects = portfolioData.length > 0;

  return (
    <section
      id="portafolio"
      className="py-24 bg-bg-dark border-t border-border-dark/30"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="section-badge">Trabajos Recientes</span>
            <h2 className="title-main text-4xl md:text-5xl mt-4">
              Proyectos <span className="text-primary">Destacados</span>
            </h2>
          </div>

          {hasProjects && (
            <Link
              href="/portfolio"
              className="hidden md:inline-flex items-center gap-2 text-primary font-bold hover:text-white transition-colors group"
            >
              Explorar portafolio completo
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          )}
        </div>

        {!hasProjects ? (
          <div className="text-center py-20 bg-surface-dark/30 rounded-3xl border border-border-dark border-dashed">
            <p className="text-text-secondary text-lg mb-6">
              Nuestra galería de proyectos se está actualizando.
            </p>
            <Link
              href="/#contacto"
              className="text-primary font-bold hover:underline"
            >
              ¡Sé nuestro próximo caso de éxito!
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {previewProjects.map((project) => (
                <div
                  key={project.title}
                  className="group bg-surface-dark p-8 rounded-2xl border border-border-dark hover:border-primary transition-all duration-300 flex flex-col h-full"
                >
                  <div className="text-primary text-sm font-bold mb-4 uppercase tracking-widest">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((techKey) => {
                      const tech = techMeta[techKey];
                      return (
                        <div
                          key={`${project.title}-${techKey}`}
                          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border-dark bg-bg-darker"
                          title={tech.label}
                        >
                          <tech.Icon
                            className={`w-3.5 h-3.5 ${tech.className}`}
                          />
                          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-tighter">
                            {tech.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center md:hidden">
              <Link
                href="/portfolio"
                className="cta-button inline-block w-full text-center"
              >
                Ver todos los proyectos
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
