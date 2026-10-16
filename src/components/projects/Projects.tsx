"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] || "en";

  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll Reveal Intersection Observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-(--dark,#09090b) px-5 py-24 md:px-10 md:py-32 lg:px-16 text-(--text)"
    >
      {/* Background Radiance Effects */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(ellipse_55%_45%_at_70%_55%,rgba(201,168,76,0.055),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={`max-w-4xl transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="font-['Syne'] text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-(--text)">
            Things I&apos;ve built.
          </h2>
        </div>

        {/* Project Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              visible={visible}
              active={activeProject === project.id}
              setActive={() =>
                setActiveProject(
                  activeProject === project.id ? null : project.id
                )
              }
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div
          className={`mt-12 flex justify-center transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          <Link
            href={`/${lang}/projects`}
            className="group inline-flex items-center gap-3 border border-(--border-bright,rgba(255,255,255,0.2)) px-7 py-3 font-['DM_Mono'] text-[0.65rem] uppercase tracking-[0.13em] text-(--accent) no-underline transition-all duration-300 hover:bg-(--accent) hover:text-(--dark)"
          >
            <span>View All Projects</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}