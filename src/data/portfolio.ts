export interface Project {
  img: string;
  title: string;
  category: string;
  description: string;
  techStack: (
    | "nextjs"
    | "react"
    | "typescript"
    | "tailwind"
    | "supabase"
    | "mongodb"
    | "node"
    | "framer"
  )[];
  link?: string;
}

export const portfolioData: Project[] = [
  
];
