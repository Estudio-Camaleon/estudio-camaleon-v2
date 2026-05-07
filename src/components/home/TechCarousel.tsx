import React from "react";
import {
  SiDocker,
  SiFigma,
  SiFramer,
  SiGit,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const techs = [
  { name: "Next.js", Icon: SiNextdotjs, className: "text-white" },
  { name: "React", Icon: SiReact, className: "text-[#61DAFB]" },
  { name: "TypeScript", Icon: SiTypescript, className: "text-[#3178C6]" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, className: "text-[#06B6D4]" },
  { name: "Supabase", Icon: SiSupabase, className: "text-[#3ECF8E]" },
  { name: "MongoDB", Icon: SiMongodb, className: "text-[#47A248]" },
  { name: "Node.js", Icon: SiNodedotjs, className: "text-[#5FA04E]" },
  { name: "Framer Motion", Icon: SiFramer, className: "text-white" },
  { name: "PostgreSQL", Icon: SiPostgresql, className: "text-[#4169E1]" },
  { name: "Docker", Icon: SiDocker, className: "text-[#2496ED]" },
  { name: "Git", Icon: SiGit, className: "text-[#F05032]" },
  { name: "Figma", Icon: SiFigma, className: "text-[#F24E1E]" },
  { name: "Vercel", Icon: SiVercel, className: "text-white" },
];

const TechCarousel = () => {
  // Doble repeticion: una secuencia principal y su copia para loop infinito.
  const list = [...techs, ...techs];

  return (
    <section className="py-12 bg-bg-dark border-y border-border-dark overflow-x-hidden overflow-y-visible">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h3 className="text-center text-text-secondary text-sm font-bold uppercase tracking-widest">
          Stack Tecnológico
        </h3>
      </div>

      <div className="flex overflow-x-hidden overflow-y-visible py-2 md:py-3">
        <div className="flex w-max gap-10 md:gap-24 animate-tech-scroll whitespace-nowrap px-6 md:px-8 items-center">
          {list.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center justify-center cursor-default shrink-0"
              aria-label={tech.name}
              title={tech.name}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 p-0.5 flex items-center justify-center opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-110">
                <tech.Icon className={`w-full h-full ${tech.className}`} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechCarousel;
