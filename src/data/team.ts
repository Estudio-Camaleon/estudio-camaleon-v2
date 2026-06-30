export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  image: string;
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export const teamData: TeamMember[] = [
  {
    name: "Facundo Vera",
    role: "Programador Full-Stack - SEO",
    specialty: "Frontend UI/UX",
    image: "/images/team/Facundo.webp",
    links: {
      github: "https://github.com/LynxWiLd",
      linkedin: "https://www.linkedin.com/in/vera-facundo/",
      email: "facundovera647@gmail.com",
    },
  },
  {
    name: "Nicolás Moya",
    role: "Programador Full-Stack",
    specialty: "Backend",
    image: "/images/team/Nicolas.webp",
    links: {
      github: "https://github.com/Niconeta",
      linkedin: "https://www.linkedin.com/in/nicol%C3%A1smoya7991/",
      email: "moyanico044@gmail.com",
    },
  },
  {
    name: "Maximiliano Figueroa",
    role: "Diseñador Multimedial",
    specialty: "Soluciones visuales y entornos digitales.",
    image: "/images/team/Maxi.webp",
    links: {
      linkedin:
        "https://www.linkedin.com/in/luis-maximiliano-figueroa-a6a6792b4/",
      email: "luismaximilianof@gmail.com",
    },
  },
  {
    name: "Darío Atencio",
    role: "Community Manager - Scrum",
    specialty: "Estrategia y Marketing.",
    image: "/images/team/Dario.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/darioate13/",
      email: "darioatencio23@gmail.com",
    },
  },
];
