// src/data/services.ts

export type IconName =
  | "landing"
  | "management"
  | "institutional"
  | "multipage"
  | "ecommerce"
  | "custom";

export interface Service {
  title: string;
  description: string;
  icon: IconName;
}

export const servicesData: Service[] = [
  {
    title: "Landing Page",
    description:
      "Páginas de alto impacto pensadas para convertir visitas en consultas y ventas.",
    icon: "landing",
  },
  {
    title: "Sistemas de Gestión",
    description:
      "Plataformas internas para organizar operaciones, procesos y datos de tu negocio.",
    icon: "management",
  },
  {
    title: "Web Institucional",
    description:
      "Sitios elegantes para presentar tu marca, servicios, trayectoria y medios de contacto.",
    icon: "institutional",
  },
  {
    title: "Web Multipágina",
    description:
      "Estructuras completas para proyectos que necesitan varias secciones o áreas de contenido.",
    icon: "multipage",
  },
  {
    title: "Ecommerce",
    description:
      "Tiendas online preparadas para mostrar productos, vender y gestionar pedidos.",
    icon: "ecommerce",
  },
  {
    title: "Proyectos Personalizados",
    description:
      "Desarrollos a medida según la necesidad concreta de tu marca, equipo o negocio.",
    icon: "custom",
  },
];