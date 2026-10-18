// src/components/skills/SkillCategory.tsx
"use client";

import TechDiamond, { type TechItem } from "./TechDiamond";

export type SkillCategoryData = {
  id: string;
  number: string;
  title: string;
  description: string;
  items: TechItem[];
};

export default function SkillCategory({
  category,
}: {
  category: SkillCategoryData;
}) {
  const titleId = `skill-${category.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="relative overflow-hidden rounded-3xl border border-neutral-200
        bg-white p-6 shadow-sm backdrop-blur-md transition-all duration-300
        hover:border-(--accent)/40 hover:shadow-md md:p-8
        dark:border-neutral-800 dark:bg-white/2 dark:shadow-2xl
        dark:hover:bg-white/4"
    >
      {/* Top accent line */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-full bg-linear-to-r
          from-transparent via-(--accent)/50 to-transparent"
      />

      {/* Category number */}
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 font-mono text-sm tracking-widest
          text-neutral-400 dark:text-neutral-500"
      >
        {category.number}
      </span>

      {/* Heading & description */}
      <div className="mb-8">
      
        <h3
          id={titleId}
          className="text-2xl font-bold tracking-tight text-neutral-900
            sm:text-3xl dark:text-white"
        >
          {category.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {category.description}
        </p>
      </div>

      {/* Technologies */}
      <ul
        aria-label={`${category.title} technologies`}
        className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3"
      >
        {category.items.map((tech, index) => (
          <li key={tech.name}>
            <TechDiamond tech={tech} index={index} />
          </li>
        ))}
      </ul>
    </article>
  );
}