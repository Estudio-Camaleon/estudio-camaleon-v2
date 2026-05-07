"use client";

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import {
  SiFramer,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

const techMeta = {
  nextjs: { Icon: SiNextdotjs, label: 'Next.js', className: 'text-white' },
  react: { Icon: SiReact, label: 'React', className: 'text-[#61DAFB]' },
  typescript: { Icon: SiTypescript, label: 'TypeScript', className: 'text-[#3178C6]' },
  tailwind: { Icon: SiTailwindcss, label: 'Tailwind CSS', className: 'text-[#06B6D4]' },
  supabase: { Icon: SiSupabase, label: 'Supabase', className: 'text-[#3ECF8E]' },
  mongodb: { Icon: SiMongodb, label: 'MongoDB', className: 'text-[#47A248]' },
  node: { Icon: SiNodedotjs, label: 'Node.js', className: 'text-[#5FA04E]' },
  framer: { Icon: SiFramer, label: 'Framer Motion', className: 'text-white' },
} as const;

const Portfolio = () => {
  return (
    <section id="portafolio" className="py-24 bg-bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-badge">Portafolio</span>
          <h2 className="title-main text-4xl md:text-5xl mb-6">Proyectos Destacados</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.map((project) => (
            <div 
              key={project.title}
              className="group bg-surface-dark p-8 rounded-2xl border border-border-dark hover:border-primary transition-all duration-300"
            >
              <div className="text-primary text-sm font-bold mb-4 uppercase tracking-widest">
                {project.category}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((techKey) => {
                  const tech = techMeta[techKey];

                  return (
                    <div
                      key={`${project.title}-${techKey}`}
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border-dark bg-bg-darker"
                      title={tech.label}
                      aria-label={tech.label}
                    >
                      <tech.Icon className={`w-4 h-4 ${tech.className}`} aria-hidden="true" />
                      <span className="text-xs text-text-secondary">{tech.label}</span>
                    </div>
                  );
                })}
              </div>

              <a 
                href={project.link} 
                className="inline-flex items-center text-white font-bold hover:text-primary transition-colors"
              >
                Ver más <span className="ml-2">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;