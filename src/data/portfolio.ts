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
    title: "Neo",
    description:
      "Nuestra propia plataforma de soluciones digitales con enfoque en diseño visual y optimización de rendimiento.",
    category: "Corporate / Portfolio",
    techStack: ["Next.js 15", "TypeScript", "Framer Motion"],
    img: "/images/proyectos/Neo_portada.webp",
    imgLaptop: "/images/proyectos/estudio-laptop.webp",
    imgMobile: "/images/proyectos/estudio-mobile.webp",
    link: "https://estudiocamaleon.com",
  },
  {
    title: "Mundo Anime Tucumán",
    description:
      "Plataforma integral para la gestión de eventos y comunidad anime, con sistema de inscripciones y catálogo dinámico.",
    category: "Web App / Community",
    techStack: ["React 19", "Vite", "Tailwind", "GSAP"],
    img: "/images/proyectos/MundoAnimeTucumanPortada.png",
    imgLaptop: "",
    imgMobile: "",
    link: "mundoanimeok.com.ar",
  },
  {
    title: "Estudio Camaleón",
    description:
      "Nuestra propia plataforma de soluciones digitales con enfoque en diseño visual y optimización de rendimiento.",
    category: "Corporate / Portfolio",
    techStack: ["Next.js 15", "TypeScript", "Framer Motion"],
    img: "/images/proyectos/EstudioCamaleonPortada.png",
    imgLaptop: "/images/proyectos/estudio-laptop.webp",
    imgMobile: "/images/proyectos/estudio-mobile.webp",
    link: "https://estudiocamaleon.com",
  },
  {
    title: "LynxWild",
    description:
      "Nuestra propia plataforma de soluciones digitales con enfoque en diseño visual y optimización de rendimiento.",
    category: "Corporate / Portfolio",
    techStack: ["Next.js 15", "TypeScript", "Framer Motion"],
    img: "/images/proyectos/LynxbioPortada.png",
    imgLaptop: "/images/proyectos/estudio-laptop.webp",
    imgMobile: "/images/proyectos/estudio-mobile.webp",
    link: "https://estudiocamaleon.com",
  },
];
