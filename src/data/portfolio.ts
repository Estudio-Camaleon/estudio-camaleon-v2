export interface Project {
  title: string;
  description: string;
  category: string;
  techStack: string[];
  img: string;
  imgLaptop: string;
  imgMobile: string;
  link: string;
  status: "completed" | "development";
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
    img: "/images/proyectos/covers/Neo_portada.webp",
    imgLaptop: "/images/proyectos/preview/neo/desktop/neo-gastronomia-deskopt.png",
    imgMobile: "/images/proyectos/preview/neo/mobile/neo-gastronomia-movil.png",
    link: "",
    status: "development",
    bgType: "aurora",
    bgColor: "#10B981", // Verde Esmeralda (Estilo Neo)
  },
  {
    title: "Mundo Anime Tucumán",
    description:
      "Plataforma integral para la gestión de eventos y comunidad anime, con sistema de inscripciones y catálogo dinámico.",
    category: "Web App / Community",
    techStack: ["React 19", "Vite", "Tailwind", "GSAP"],
    img: "/images/proyectos/covers/MundoAnimeTucumanPortada.webp",
    imgLaptop: "/images/proyectos/preview/mundoanime/desktop/DesktopMundoAnime.png",
    imgMobile: "/images/proyectos/preview/mundoanime/mobile/MobileMundoAnime.png",
    link: "https://mundoanimeok.com.ar",
    status: "completed",
    bgType: "aurora",
    bgColor: "#a09d96", // Violeta (Estilo Anime)
  },
  {
    title: "Estudio Camaleón",
    description:
      "Nuestra propia plataforma de soluciones digitales con enfoque en diseño visual y optimización de rendimiento.",
    category: "Corporate / Portfolio",
    techStack: ["Next.js 15", "TypeScript", "Framer Motion"],
    img: "/images/proyectos/covers/EstudioCamaleonPortada.webp",
    imgLaptop: "/images/proyectos/preview/estudiocamaleon/desktop/DesktopEstudioCamaleon.png",
    imgMobile: "/images/proyectos/preview/estudiocamaleon/mobile/MobileEstudioCamaleon.png",
    link: "https://estudiocamaleontuc.com",
    status: "completed",
    bgType: "aurora",
    bgColor: "#39FF14", // Verde Neón (Identidad Camaleón)
  },
  {
    title: "LynxWild",
    description:
      "Nuestra propia plataforma de soluciones digitales con enfoque en diseño visual y optimización de rendimiento.",
    category: "Corporate / Portfolio",
    techStack: ["Next.js 15", "TypeScript", "Framer Motion"],
    img: "/images/proyectos/covers/LynxbioPortada.webp",
    imgLaptop: "/images/proyectos/preview/lynxbio/desktop/DesktopLynxBio.png",
    imgMobile: "/images/proyectos/preview/lynxbio/mobile/MobileLynxBio.png",
    link: "",
    status: "development",
    bgType: "aurora",
    bgColor: "#3B82F6", // Azul Brillante (Estilo Lynx)
  },
];
