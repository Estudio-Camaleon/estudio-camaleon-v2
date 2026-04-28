// src/data/services.ts

export type IconName = "code" | "design_services" | "api";

export interface Service {
  title: string;
  description: string;
  icon: IconName;
}

export const servicesData: Service[] = [
  {
    title: "Desarrollo Web",
    description: "Aplicaciones escalables con Next.js, React y bases de datos optimizadas.",
    icon: "code",
  },
  {
    title: "UI/UX Design",
    description: "Diseño de interfaces intuitivas enfocadas en la experiencia de usuario y marca.",
    icon: "design_services",
  },
  {
    title: "Integraciones API",
    description: "Conexión eficiente con servicios externos, pagos y automatización de procesos.",
    icon: "api",
  },
];