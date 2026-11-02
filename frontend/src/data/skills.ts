import { SkillCategory } from "@/types";

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React / Next.js", category: "frontend" },
      { name: "TypeScript", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "HTML5 / CSS3", category: "frontend" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js / Express", category: "backend" },
      { name: "PostgreSQL", category: "backend" },
      { name: "Prisma ORM", category: "backend" },
      { name: "REST & GraphQL APIs", category: "backend" },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git / GitHub", category: "tools" },
      { name: "Docker", category: "tools" },
      { name: "Vercel / Netlify", category: "tools" },
      { name: "VS Code", category: "tools" },
    ],
  },
];