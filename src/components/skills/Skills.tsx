"use client";

import React from "react";
import SkillCategory from "./SkillCategory";

const categories = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Development",
    description: "Crafting intuitive, responsive, and performant user interfaces with modern web standards.",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript" },
      { name: "Vue.js" },
      { name: "Jest / RTL" },
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend & APIs",
    description: "Designing scalable server-side architectures, secure databases, and fast endpoints.",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Python" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "GraphQL" },
    ],
  },
  {
    id: "devops",
    number: "03",
    title: "DevOps & Tools",
    description: "Automating workflows, containerizing applications, and deploying robust cloud infrastructure.",
    items: [
      { name: "Docker" },
      { name: "AWS" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "CI/CD" },
      { name: "Kubernetes" },
      { name: "Terraform" },
      { name: "Linux / Bash" },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden bg-[var(--dark)] px-4 py-24 md:px-8 md:py-32 text-[var(--text)]"
    >
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.03] blur-[180px]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-red-500/[0.02] blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-emerald-500/[0.02] blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Expertise & Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
            Tech Stack / Skills
          </h2>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {categories.map((category) => (
            <SkillCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}