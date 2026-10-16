"use client";

import React from "react";
import TechDiamond from "./TechDiamond";

type TechItem = {
  name: string;
};

type CategoryProps = {
  category: {
    id: string;
    number: string;
    title: string;
    description: string;
    items: TechItem[];
  };
};

export default function SkillCategory({ category }: CategoryProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border,rgba(255,255,255,0.1))] bg-[var(--dark)] p-6 md:p-8 shadow-xl backdrop-blur-md">
      {/* Top accent line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--border,rgba(255,255,255,0.2))] to-transparent" />

      {/* Category number */}
      <span className="absolute right-6 top-6 font-mono text-sm tracking-widest text-neutral-500">
        {category.number}
      </span>

      {/* Category heading & description */}
      <div className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
          {category.id}
        </p>

        <h3 className="text-3xl font-bold tracking-tight text-[var(--accent,var(--purple))]">
          {category.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-neutral-400">
          {category.description}
        </p>
      </div>

      {/* Technology Diamond Grid */}
      <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3">
        {category.items.map((tech, index) => (
          <TechDiamond key={tech.name} tech={tech} index={index} />
        ))}
      </div>
    </div>
  );
}