// src/components/skills/TechDiamond.tsx
"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaVuejs,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaCode,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiGithubactions,
  SiMysql,
} from "react-icons/si";

export type TechItem = {
  name: string;
};

type TechInfo = {
  icon: ReactNode;
  /** Brand color, used in dark mode.[cite: 9] */
  color: string;
  /** Darker color for light mode (white and yellow logos vanish on white).[cite: 9] */
  lightColor?: string;
};

const DARK_ICON_ON_LIGHT = "#171717";
const DARKER_YELLOW = "#CA8A04";

const techIcons: Record<string, TechInfo> = {
  React: { icon: <FaReact />, color: "#61DAFB", lightColor: "#0891B2" },
  "Next.js": {
    icon: <SiNextdotjs />,
    color: "#FFFFFF",
    lightColor: DARK_ICON_ON_LIGHT,
  },
  TypeScript: { icon: <SiTypescript />, color: "#3178C6" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "Vue.js": { icon: <FaVuejs />, color: "#4FC08D" },
  "Node.js": { icon: <FaNodeJs />, color: "#339933" },
  Express: {
    icon: <SiExpress />,
    color: "#FFFFFF",
    lightColor: DARK_ICON_ON_LIGHT,
  },
  FastAPI: { icon: <SiFastapi />, color: "#009688" },
  PostgreSQL: { icon: <SiPostgresql />, color: "#4169E1" },
  MySQL: { icon: <SiMysql />, color: "#4479A1" },
  MongoDB: { icon: <SiMongodb />, color: "#47A248" },
  AWS: { icon: <FaAws />, color: "#FF9900" },
  Docker: { icon: <FaDocker />, color: "#2496ED" },
  "CI/CD": { icon: <SiGithubactions />, color: "#2088FF" },
  Git: { icon: <FaGitAlt />, color: "#F05032" },
  GitHub: {
    icon: <FaGithub />,
    color: "#FFFFFF",
    lightColor: DARK_ICON_ON_LIGHT,
  },
  HTML5: { icon: <FaHtml5 />, color: "#E34F26" },
  CSS3: { icon: <FaCss3Alt />, color: "#1572B6" },
  JavaScript: { icon: <FaJs />, color: "#F7DF1E", lightColor: DARKER_YELLOW },
};

// Shown for any skill name that has no icon yet, so it never disappears silently.[cite: 9]
const fallbackIcon: TechInfo = { icon: <FaCode />, color: "#A3A3A3" };

export default function TechDiamond({
  tech,
  index,
}: {
  tech: TechItem;
  index: number;
}) {
  const info = techIcons[tech.name] ?? fallbackIcon;

  // Neighbors sit slightly higher / lower for a gentle zig-zag.[cite: 9]
  const offset = index % 2 === 0 ? "-translate-y-2" : "translate-y-2";

  const iconColors = {
    "--icon-light": info.lightColor ?? info.color,
    "--icon-dark": info.color,
  } as CSSProperties;

  return (
    <div
      className={`group/tech relative flex h-28 w-28 items-center justify-center md:h-32 md:w-32 ${offset}`}
    >
      {/* Diamond: starts at 45deg and spins a full turn (to 405deg) on hover.[cite: 9] */}
      <div
        className="relative flex h-20 w-20 rotate-45 items-center justify-center rounded-2xl
          border border-neutral-200 bg-neutral-100 shadow-sm
          transition-all duration-700 ease-in-out
          group-hover/tech:rotate-[405deg] group-hover/tech:border-(--accent)/50
          group-hover/tech:bg-(--accent)/10 group-hover/tech:shadow-md
          motion-reduce:transition-none motion-reduce:group-hover/tech:rotate-45
          md:h-24 md:w-24
          dark:border-neutral-800 dark:bg-white/3"
      >
        {/* Content: counter-rotated so it sits upright on the diamond[cite: 9] */}
        <div className="flex -rotate-45 flex-col items-center justify-center gap-1 text-center">
          <span
            aria-hidden="true"
            className="text-xl leading-none text-(--icon-light) md:text-2xl dark:text-(--icon-dark)"
            style={iconColors}
          >
            {info.icon}
          </span>

          <span className="max-w-16 rotate-12 font-mono text-[11px] font-semibold leading-tight tracking-tight text-neutral-800 md:text-xs dark:text-neutral-200">
            {tech.name}
          </span>
        </div>
      </div>
    </div>
  );
}