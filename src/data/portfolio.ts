export interface Project {
  title: string;
  description: string;
  category: string;
  techStack: string[];
  img: string;
  imgLaptop: string;
  imgMobile: string;
  link: string;
  // Propiedades para el control de fondos dinámicos
  bgType: "aurora" | "none";
  bgColor: string;
}

export const portfolioData: Project[] = [
  {
    title: "Neo",
    description:
      "Nuestra propia plataforma de soluciones digitales con enfoque en diseño visual y optimización de rendimiento.",
    category: "Corporate / Portfolio",
    techStack: ["Next.js 15", "TypeScript", "Framer Motion"],
    img: "/images/proyectos/Neo_portada.webp",
    imgLaptop: "",
    imgMobile: "",
    link: "",
    bgType: "aurora",
    bgColor: "#10B981", // Verde Esmeralda (Estilo Neo)
  },
  {
    title: "Mundo Anime Tucumán",
    description:
      "Plataforma integral para la gestión de eventos y comunidad anime, con sistema de inscripciones y catálogo dinámico.",
    category: "Web App / Community",
    techStack: ["React 19", "Vite", "Tailwind", "GSAP"],
    img: "/images/proyectos/MundoAnimeTucumanPortada.webp",
    imgLaptop: "",
    imgMobile: "",
    link: "https://mundoanimeok.com.ar",
    bgType: "aurora",
    bgColor: "#a09d96", // Violeta (Estilo Anime)
  },
  {
    title: "Estudio Camaleón",
    description:
      "Nuestra propia plataforma de soluciones digitales con enfoque en diseño visual y optimización de rendimiento.",
    category: "Corporate / Portfolio",
    techStack: ["Next.js 15", "TypeScript", "Framer Motion"],
    img: "/images/proyectos/EstudioCamaleonPortada.webp",
    imgLaptop: "",
    imgMobile: "",
    link: "https://estudiocamaleontuc.com",
    bgType: "aurora",
    bgColor: "#39FF14", // Verde Neón (Identidad Camaleón)
  },
  {
    title: "LynxWild",
    description:
      "Nuestra propia plataforma de soluciones digitales con enfoque en diseño visual y optimización de rendimiento.",
    category: "Corporate / Portfolio",
    techStack: ["Next.js 15", "TypeScript", "Framer Motion"],
    img: "/images/proyectos/LynxbioPortada.webp",
    imgLaptop: "",
    imgMobile: "",
    link: "",
    bgType: "aurora",
    bgColor: "#3B82F6", // Azul Brillante (Estilo Lynx)
  },
];
