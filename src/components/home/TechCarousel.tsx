"use client";

import React from "react";

const techs = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "MongoDB",
  "Node.js",
  "Framer Motion",
];

const TechCarousel = () => {
  // Duplicamos el array para que el scroll infinito no deje espacios
  const list = [...techs, ...techs];

  return (
    <section className="py-12 bg-bg-dark border-y border-border-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h3 className="text-center text-text-secondary text-sm font-bold uppercase tracking-widest">
          Stack Tecnológico
        </h3>
      </div>

      <div className="flex overflow-hidden">
        <div className="flex gap-16 animate-scroll whitespace-nowrap px-8">
          {list.map((tech, index) => (
            <div
              key={index}
              className="text-2xl md:text-3xl font-extrabold text-white/20 hover:text-primary transition-colors cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechCarousel;
