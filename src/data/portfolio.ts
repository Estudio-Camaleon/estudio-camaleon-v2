// src/data/portfolio.ts

export interface Project {
  title: string;
  category: string;
  description: string;
  link?: string;
}

export const portfolioData: Project[] = [
  { 
    title: "LynxBarber", 
    category: "Web App", 
    description: "Sistema de reservas profesional con Next.js 15 y MongoDB.",
    link: "#" 
  },
  { 
    title: "Gimnasio Pro", 
    category: "Dashboard", 
    description: "Gestión administrativa con CRUD completo y analíticas.",
    link: "#" 
  },
  { 
    title: "Mundo Anime", 
    category: "Eventos", 
    description: "Plataforma de gestión de invitados y visualización de datos.",
    link: "#" 
  },
];