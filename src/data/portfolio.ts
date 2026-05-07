// src/data/portfolio.ts

export interface Project {
  title: string;
  category: string;
  description: string;
  techStack: ("nextjs" | "react" | "typescript" | "tailwind" | "supabase" | "mongodb" | "node" | "framer")[];
  link?: string;
}

export const portfolioData: Project[] = [
  { 
    title: "LynxBarber", 
    category: "Web App", 
    description: "Sistema de reservas profesional con Next.js 15 y MongoDB.",
    techStack: ["nextjs", "react", "typescript", "tailwind", "mongodb"],
    link: "#" 
  },
  { 
    title: "Gimnasio Pro", 
    category: "Dashboard", 
    description: "Gestión administrativa con CRUD completo y analíticas.",
    techStack: ["nextjs", "react", "typescript", "tailwind", "supabase"],
    link: "#" 
  },
  { 
    title: "Mundo Anime", 
    category: "Eventos", 
    description: "Plataforma de gestión de invitados y visualización de datos.",
    techStack: ["node", "mongodb", "react", "framer"],
    link: "#" 
  },
];