"use client";

import { useEffect, useRef, useState } from "react";
import SkillCategory from "./SkillCategory";

const categories = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Development",
    description:
      "Crafting intuitive, responsive, and performant user interfaces with modern web standards.",
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
    description:
      "Designing scalable server-side architectures, secure databases, and fast endpoints.",
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
    description:
      "Automating workflows, containerizing applications, and deploying robust cloud infrastructure.",
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
      className="relative min-h-screen overflow-hidden bg-(--dark) px-4 py-24 text-(--text) md:px-8 md:py-32"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.03] blur-[180px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-red-500/[0.02] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-emerald-500/[0.02] blur-[150px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section header: centered */}
        <div className={`mb-16 text-center md:mb-20 ${reveal("delay-0")}`}>
          <h2
            id="skills-heading"
            className="text-3xl font-extrabold tracking-tight text-(--text) sm:text-4xl"
          >
            Tech Stack / Skills
          </h2>
        </div>

        {/* Category cards */}
        <div
          className={`grid grid-cols-1 gap-10 lg:grid-cols-3 ${reveal("delay-200")}`}
        >
          {categories.map((category) => (
            <SkillCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}