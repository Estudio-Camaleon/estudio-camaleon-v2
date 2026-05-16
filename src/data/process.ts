// src/data/process.ts
import React from "react";
import { FiTarget, FiRepeat, FiZap } from "react-icons/fi";

export interface ScrumStep {
  number: string;
  title: string;
  icon: React.ElementType; // Cambiamos a ElementType para manejar el componente del icono
  description: string;
  color: string;
}

export const scrumSteps: ScrumStep[] = [
  {
    number: "01",
    title: "Product Backlog",
    icon: FiTarget,
    description:
      "Definimos la visión total. Listamos cada funcionalidad y necesidad, priorizando lo que genera más valor inmediato para tu negocio.",
    color: "from-blue-500/20 to-primary/20",
  },
  {
    number: "02",
    title: "Sprints de 2 Semanas",
    icon: FiRepeat,
    description:
      "Dividimos el proyecto en ciclos cortos. No esperamos meses: cada 14 días recibes avances funcionales que puedes probar.",
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    number: "03",
    title: "Review & Feedback",
    icon: FiZap,
    description:
      "Al final de cada sprint, revisamos juntos. Esto nos permite pivotar rápido, ajustar detalles y asegurar que el producto sea perfecto.",
    color: "from-emerald-500/20 to-primary/20",
  },
];
