export interface Project {
  title: string;
  description: string;
  category: string;
  techStack: string[];
  img: string;
  imgLaptop: string;
  imgMobile: string;
  link: string;
}

export const portfolioData: Project[] = [
  {
    title: "Mundo Anime Tucumán",
    description:
      "Plataforma integral para la gestión de eventos y comunidad anime, con sistema de inscripciones y catálogo dinámico.",
    category: "Web App / Community",
    techStack: ["React 19", "Vite", "Tailwind", "GSAP"],
    img: "/images/proyectos/aledo.png",
    imgLaptop: "/images/proyectos/aledo.png",
    imgMobile: "/images/proyectos/mundo-anime-mobile.webp",
    link: "https://mundoanimetucuman.com.ar",
  },
  {
    title: "Estudio Camaleón Web",
    description:
      "Nuestra propia plataforma de soluciones digitales con enfoque en diseño visual y optimización de rendimiento.",
    category: "Corporate / Portfolio",
    techStack: ["Next.js 15", "TypeScript", "Framer Motion"],
    img: "/images/proyectos/estudio-main.webp",
    imgLaptop: "/images/proyectos/estudio-laptop.webp",
    imgMobile: "/images/proyectos/estudio-mobile.webp",
    link: "https://estudiocamaleon.com",
  },
  // Agrega aquí el resto de tus proyectos siguiendo esta estructura
];
