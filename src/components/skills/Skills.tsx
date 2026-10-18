// src/components/skills/Skills.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";
import SkillCategory, { type SkillCategoryData } from "./SkillCategory";

const categories: SkillCategoryData[] = [
  {
    title: "Frontend Development",
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
    title: "Backend & APIs",
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
    title: "DevOps & Tools",
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
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll reveal (instant when the user prefers reduced motion) */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const reveal = (delay: string) =>
    `transition-all duration-1000 motion-reduce:transition-none ${delay} ${
      visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`;

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden bg-neutral-100 px-5 py-12
        text-neutral-900 transition-colors duration-300
        md:px-10 md:py-16 dark:bg-[#04091a] dark:text-white"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-200 w-200
          -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--accent)/6
          blur-[180px] dark:bg-(--accent)/4"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80
          rounded-full bg-emerald-500/5 blur-[150px] dark:bg-emerald-500/3"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section header: centered */}
        <div className={`mb-10 text-center md:mb-12 ${reveal("delay-0")}`}>
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border
              border-(--accent)/30 bg-(--accent)/5 px-4 py-2 backdrop-blur-md"
          >
            <Code2
              className="h-4 w-4 text-cyan-700 dark:text-(--accent-light)"
              aria-hidden="true"
            />
            <span
              className="text-xs font-bold uppercase tracking-[0.18em]
                text-cyan-700 dark:text-(--accent-light)"
            >
              Expertise &amp; Toolkit
            </span>
          </div>

          <h2
            id="skills-heading"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            Tech Stack{" "}
            <span className="text-cyan-700 dark:text-(--accent-light)">
              &amp; Skills
            </span>
          </h2>
        </div>

        {/* Category cards */}
        <div
          className={`grid grid-cols-1 gap-8 lg:grid-cols-3 ${reveal("delay-200")}`}
        >
          {categories.map((category) => (
            <SkillCategory key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
