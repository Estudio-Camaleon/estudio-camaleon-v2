// src/data/process.ts

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processData: ProcessStep[] = [
  { 
    number: "01", 
    title: "Análisis Técnico", 
    description: "Evaluación de requerimientos, arquitectura y definición del stack tecnológico óptimo." 
  },
  { 
    number: "02", 
    title: "Diseño de Solución", 
    description: "Creación de arquitectura escalable, diseño de APIs y prototipado de interfaces." 
  },
  { 
    number: "03", 
    title: "Implementación", 
    description: "Desarrollo ágil con CI/CD, testing automatizado y revisiones de código continuas." 
  },
];