// src/data/templatesData.ts

export interface Template {
  id: number;
  title: string;
  tag: string;
  image: string;
  demoUrl?: string;
  description: string;
  features: string[];
}

export const templatesData: Template[] = [
  {
    id: 1,
    title: "Plantilla 01 — Corporativa & Servicios",
    tag: "Alta Conversión",
    image: "/images/templates/template-01.png",
    demoUrl: "https://example-templates-02.netlify.app/",
    description:
      "Estructura limpia y corporativa con secciones enfocadas en transmitir autoridad, optimizar embudos de captura y presentar servicios de manera minimalista.",
    features: ["Hero con Video/Glow", "Grid de Beneficios", "Sección de Pasos"],
  },
  {
    id: 2,
    title: "Plantilla 02 — E-Commerce Express",
    tag: "Ventas Rápidas",
    image: "/images/templates/template-02.png",
    demoUrl: "https://example-templates-03.netlify.app/",
    description:
      "Catálogo ágil diseñado para destacar productos estrella, integrar botones de acción directos a WhatsApp y maximizar la tasa de conversión móvil.",
    features: ["Checkout Directo", "Galería Interactiva", "Filtros Rápidos"],
  },
  {
    id: 3,
    title: "Plantilla 03 — Portfolio Creativo",
    tag: "Diseño Premium",
    image: "/images/templates/template-03.png",
    demoUrl: "https://example-templates-04.netlify.app/",
    description:
      "Layout de alto impacto visual y tipográfico, ideal para agencias, profesionales independientes o creadores que buscan un portafolio asimétrico elegante.",
    features: ["Inversión de Grids", "Fondo Dinámico", "Soporte de Video"],
  },
];
