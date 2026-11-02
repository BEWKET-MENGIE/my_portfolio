// src/components/skills/TechDiamond.tsx

import type { CSSProperties } from "react";
import {
  Box,
  Braces,
  Cloud,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Server,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type TechItem = {
  name: string;
};

type TechInfo = {
  Icon: LucideIcon;
  /** Icon color in dark mode. */
  color: string;
  /** Darker color for light mode when the default is hard to see on white. */
  lightColor?: string;
};

const DARK_ICON_ON_LIGHT = "#171717";
const DARKER_YELLOW = "#CA8A04";

const techIcons: Record<string, TechInfo> = {
  React: { Icon: Code2, color: "#61DAFB", lightColor: "#0891B2" },
  "Next.js": {
    Icon: Globe,
    color: "#FFFFFF",
    lightColor: DARK_ICON_ON_LIGHT,
  },
  TypeScript: { Icon: FileCode2, color: "#3178C6" },
  "Tailwind CSS": { Icon: Palette, color: "#06B6D4" },
  "Vue.js": { Icon: Layers, color: "#4FC08D" },
  "Node.js": { Icon: Server, color: "#339933" },
  Express: {
    Icon: Server,
    color: "#FFFFFF",
    lightColor: DARK_ICON_ON_LIGHT,
  },
  FastAPI: { Icon: Zap, color: "#009688" },
  PostgreSQL: { Icon: Database, color: "#4169E1" },
  MySQL: { Icon: Database, color: "#4479A1" },
  MongoDB: { Icon: Database, color: "#47A248" },
  AWS: { Icon: Cloud, color: "#FF9900" },
  Docker: { Icon: Box, color: "#2496ED" },
  "CI/CD": { Icon: GitBranch, color: "#2088FF" },
  Git: { Icon: GitBranch, color: "#F05032" },
  GitHub: {
    Icon: Code2,
    color: "#FFFFFF",
    lightColor: DARK_ICON_ON_LIGHT,
  },
  HTML5: { Icon: Code2, color: "#E34F26" },
  CSS3: { Icon: Palette, color: "#1572B6" },
  JavaScript: { Icon: Braces, color: "#F7DF1E", lightColor: DARKER_YELLOW },
};

const fallbackIcon: TechInfo = { Icon: Code2, color: "#A3A3A3" };

export default function TechDiamond({
  tech,
  index,
}: {
  tech: TechItem;
  index: number;
}) {
  const info = techIcons[tech.name] ?? fallbackIcon;
  const Icon = info.Icon;

  // Neighbors sit slightly higher or lower for a gentle zig-zag.
  const offset = index % 2 === 0 ? "-translate-y-2" : "translate-y-2";

  const iconColors = {
    "--icon-light": info.lightColor ?? info.color,
    "--icon-dark": info.color,
  } as CSSProperties;

  return (
    <div
      className={`group/tech relative flex h-28 w-28 items-center justify-center md:h-32 md:w-32 ${offset}`}
    >
      {/* Starts at 45deg and spins a full turn on hover. */}
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
        {/* Counter-rotate the icon and label so they stay upright. */}
        <div className="flex -rotate-45 flex-col items-center justify-center gap-1 text-center">
          <span
            aria-hidden="true"
            className="text-xl leading-none text-(--icon-light) md:text-2xl dark:text-(--icon-dark)"
            style={iconColors}
          >
            <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
          </span>

          <span className="max-w-16 rotate-12 font-mono text-[11px] font-semibold leading-tight tracking-tight text-neutral-800 md:text-xs dark:text-neutral-200">
            {tech.name}
          </span>
        </div>
      </div>
    </div>
  );
}