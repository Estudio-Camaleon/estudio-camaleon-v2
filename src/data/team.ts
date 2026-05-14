export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  image: string;
  links: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const teamData: TeamMember[] = [
  {
    name: "Facundo Vera",
    role: "Junior Full-Stack Developer",
    specialty: "Next.js & Server Actions",
    image: "/images/team/Facundo.webp",
    links: {
      github: "https://github.com/LynxWiLd",
      linkedin: "https://www.linkedin.com/in/vera-facundo/",
      instagram: "https://www.instagram.com/facundovera647",
    },
  },
  {
    name: "Nicolás Moya",
    role: "Junior Full-Stack Developer",
    specialty: "Frontend Animations & GSAP",
    image: "/images/team/Nicolas.webp",
    links: {
      github: "https://github.com/Niconeta",
      linkedin: "https://www.linkedin.com/in/nicol%C3%A1smoya7991/",
      instagram: "https://www.instagram.com/nicolasmoya._",
    },
  },
  {
    name: "Maximiliano Figueroa",
    role: "Designer",
    specialty: "UI/UX & 3D Cards Design",
    image: "/images/team/Maxi.webp",
    links: {
      linkedin:
        "https://www.linkedin.com/in/luis-maximiliano-figueroa-a6a6792b4/",
      instagram: "https://www.instagram.com/maxi_1197_",
    },
  },
  {
    name: "Darío Atencio",
    role: "Scrum & Product Marketing",
    specialty: "Agile Methodologies & Strategy",
    image: "/images/team/Dario.webp",
    links: {
      linkedin: "https://www.linkedin.com/in/darioate13/",
      instagram: "https://www.instagram.com/darioate13",
    },
  },
];
