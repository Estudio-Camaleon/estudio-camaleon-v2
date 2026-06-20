export interface Project {
  title: string;
  description: string;
  category: string;
  techStack: string[];
  img: string;
  imgLaptop: string;
  imgMobile: string;
  link: string;
  repo?: string;
  status: "completed" | "development";
  // Propiedades para el control de fondos dinámicos
  bgType: "aurora" | "none";
  bgColor: string;
}

export const portfolioData: Project[] = [
  {
    title: "NEO — Plataforma Gastronómica",
    description:
      "SaaS multi-tenant para restaurantes. Menú digital, pedidos en tiempo real, radar de pedidos, Mercado Pago y panel admin.",
    category: "SaaS / Gastronomía",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Supabase",
      "Zustand",
      "Mercado Pago",
      "Zod",
      "Vitest",
      "semantic-release",
    ],
    img: "/images/proyectos/covers/Neo_portada.webp",
    imgLaptop:
      "/images/proyectos/preview/neo/desktop/neo-gastronomia-deskopt.png",
    imgMobile: "/images/proyectos/preview/neo/mobile/neo-gastronomia-movil.png",
    link: "",
    repo: "https://github.com/Estudio-Camaleon/Neo-Gastronomia",
    status: "development",
    bgType: "aurora",
    bgColor: "#10B981",
  },
  {
    title: "Mundo Anime Tucumán",
    description:
      "Web del evento geek Mundo Anime Tucumán. Muestra info del evento, artistas, actividades, galería y panel admin CRUD.",
    category: "Web App / Eventos",
    techStack: [
      "React 19",
      "Vite 8",
      "Bootstrap 5",
      "Tailwind CSS 4",
      "Framer Motion",
      "Express 5",
      "MongoDB/Mongoose",
      "JWT",
      "Cloudinary",
      "Vercel Blob",
    ],
    img: "/images/proyectos/covers/MundoAnimeTucumanPortada.webp",
    imgLaptop:
      "/images/proyectos/preview/mundoanime/desktop/DesktopMundoAnime.png",
    imgMobile:
      "/images/proyectos/preview/mundoanime/mobile/MobileMundoAnime.png",
    link: "https://mundoanimeok.com.ar",
    repo: "https://github.com/Estudio-Camaleon/MAT-frontend",
    status: "completed",
    bgType: "aurora",
    bgColor: "#a09d96",
  },
  {
    title: "Estudio Camaleón",
    description:
      "Sitio web/marketing de un estudio de desarrollo de software. Muestra servicios, portafolio, equipo y testimonios.",
    category: "Corporate / Portfolio",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Framer Motion",
      "GSAP",
      "Three.js",
      "Swiper",
      "Resend",
      "semantic-release",
    ],
    img: "/images/proyectos/covers/EstudioCamaleonPortada.webp",
    imgLaptop:
      "/images/proyectos/preview/estudiocamaleon/desktop/DesktopEstudioCamaleon.png",
    imgMobile:
      "/images/proyectos/preview/estudiocamaleon/mobile/MobileEstudioCamaleon.png",
    link: "https://estudiocamaleontuc.com",
    repo: "https://github.com/Estudio-Camaleon/estudio-camaleon-v2",
    status: "completed",
    bgType: "aurora",
    bgColor: "#39FF14",
  },
  {
    title: "LynxBio",
    description:
      "Link-in-Bio SaaS tipo Linktree. Los usuarios crean una página personalizada con sus enlaces, con dashboard drag-and-drop.",
    category: "SaaS / Link-in-Bio",
    techStack: [
      "React 19",
      "Vite 8",
      "Bootstrap 5",
      "Express 5",
      "MongoDB/Mongoose",
      "JWT",
      "Cloudinary",
      "react-beautiful-dnd",
    ],
    img: "/images/proyectos/covers/LynxbioPortada.webp",
    imgLaptop: "/images/proyectos/preview/lynxbio/desktop/DesktopLynxBio.png",
    imgMobile: "/images/proyectos/preview/lynxbio/mobile/MobileLynxBio.png",
    link: "",
    repo: "https://github.com/LynxWiLd/Frontend-LynxBio",
    status: "development",
    bgType: "aurora",
    bgColor: "#3B82F6",
  },
  {
    title: "Upiti",
    description:
      "E-commerce con dark UI. Vendedores publican productos, compradores navegan y compran, reseñas, autenticación con email.",
    category: "E-commerce",
    techStack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS v4",
      "Supabase (Auth + DB + Storage)",
      "Framer Motion",
      "Embla Carousel",
      "Nodemailer",
      "Zod",
      "semantic-release",
    ],
    img: "/images/proyectos/covers/Portada_Upiti_portfolio.webp",
    imgLaptop: "/images/proyectos/preview/upiti/desktop/DesktopUpiti.png",
    imgMobile: "/images/proyectos/preview/upiti/mobile/MobileUpiti.png",
    link: "",
    repo: "https://github.com/Estudio-Camaleon/tienda-upiti",
    status: "completed",
    bgType: "aurora",
    bgColor: "#ec335b",
  },
  {
    title: "Mandarina Store Tuc",
    description:
      "E-commerce de stickers, agendas y planners (Tucumán, Argentina). Carrito con checkout por WhatsApp y panel admin.",
    category: "E-commerce",
    techStack: [
      "React 18",
      "TypeScript",
      "Vite 6",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Material UI 7",
      "Supabase",
      "Recharts",
      "semantic-release",
    ],
    img: "/images/proyectos/covers/Mandarina_portada_portfolio.webp",
    imgLaptop: "",
    imgMobile: "",
    link: "",
    repo: "https://github.com/Estudio-Camaleon/mandarinastoretuc",
    status: "development",
    bgType: "aurora",
    bgColor: "#f59e0b",
  },
];
