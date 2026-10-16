"use client";

import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaAws,
  FaVuejs,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJest,
  SiExpress,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiLinux,
  SiMysql,
} from "react-icons/si";

type TechItem = {
  name: string;
};

type TechInfo = {
  icon: React.ReactNode;
  color: string;
};

const techIcons: Record<string, TechInfo> = {
  React: { icon: <FaReact />, color: "#61DAFB" },
  "Next.js": { icon: <SiNextdotjs />, color: "#FFFFFF" },
  TypeScript: { icon: <SiTypescript />, color: "#3178C6" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "Vue.js": { icon: <FaVuejs />, color: "#4FC08D" },
  "Jest / RTL": { icon: <SiJest />, color: "#C21325" },
  "Node.js": { icon: <FaNodeJs />, color: "#339933" },
  Express: { icon: <SiExpress />, color: "#FFFFFF" },
  Python: { icon: <FaPython />, color: "#3776AB" },
  FastAPI: { icon: <SiFastapi />, color: "#009688" },
  PostgreSQL: { icon: <SiPostgresql />, color: "#4169E1" },
  MySQL: { icon: <SiMysql />, color: "#4479A1" },
  MongoDB: { icon: <SiMongodb />, color: "#47A248" },
  GraphQL: { icon: <SiGraphql />, color: "#E10098" },
  AWS: { icon: <FaAws />, color: "#FF9900" },
  Docker: { icon: <FaDocker />, color: "#2496ED" },
  Kubernetes: { icon: <SiKubernetes />, color: "#326CE5" },
  "CI/CD": { icon: <SiGithubactions />, color: "#2088FF" },
  Terraform: { icon: <SiTerraform />, color: "#7B42BC" },
  "Linux / Bash": { icon: <SiLinux />, color: "#FCC624" },
  Git: { icon: <FaGitAlt />, color: "#F05032" },
  GitHub: { icon: <FaGithub />, color: "#FFFFFF" },
  HTML5: { icon: <FaHtml5 />, color: "#E34F26" },
  CSS3: { icon: <FaCss3Alt />, color: "#1572B6" },
  JavaScript: { icon: <FaJs />, color: "#F7DF1E" },
};

export default function TechDiamond({ tech, index }: { tech: TechItem; index: number }) {
  const techInfo = techIcons[tech.name];

  if (!techInfo) {
    return null;
  }

  const verticalOffset = index % 2 === 0 ? "-5px" : "5px";

  return (
    <div
      className="group/tech relative flex h-28 w-28 items-center justify-center md:h-32 md:w-32"
      style={{ transform: `translateY(${verticalOffset})` }}
    >
      <div className="absolute inset-2 flex rotate-45 flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border,rgba(255,255,255,0.1))] bg-white/5 p-2 transition-transform duration-700 ease-in-out group-hover/tech:rotate-[405deg] motion-reduce:transition-none">
        <div
          className="flex h-9 w-9 items-center justify-center text-2xl leading-none md:h-10 md:w-10"
          style={{ color: techInfo.color }}
          title={`${tech.name} logo`}
        >
          {techInfo.icon}
        </div>

        <span className="max-w-16 text-center font-mono text-[0.7rem] font-medium leading-tight text-[var(--text)] md:text-[0.55rem]">
          {tech.name}
        </span>
      </div>
    </div>
  );
}