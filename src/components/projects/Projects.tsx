"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const ALL_PROJECTS_HREF = "/projects";

// The home page only shows the first four. The rest live on /projects.
const MAX_PROJECTS = 4;
const shownProjects = projects.slice(0, MAX_PROJECTS);

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);

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

  const reveal = (delay = "0ms") => ({
    className: `transition-all duration-1000 motion-reduce:transition-none ${
      visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`,
    style: { transitionDelay: visible ? delay : "0ms" },
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-white px-5 py-12 text-neutral-900
        transition-colors duration-300 md:px-10 md:py-16 lg:px-16
        dark:bg-[#050816] dark:text-white"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-80 w-80
          rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/[0.07]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header: centered */}
        <div
          className={`mx-auto max-w-2xl text-center ${reveal().className}`}
          style={reveal().style}
        >
          <h2
            id="projects-heading"
            className="text-3xl font-extrabold leading-tight tracking-tight
              sm:text-4xl lg:text-5xl"
          >
            Things I&apos;ve built.
          </h2>
        </div>

        {/* Project grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {shownProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              visible={visible}
              active={activeProject === project.id}
              setActive={() =>
                setActiveProject(
                  activeProject === project.id ? null : project.id,
                )
              }
            />
          ))}
        </div>

        {/* View all projects */}
        <div
          className={`mt-12 flex justify-center ${reveal("400ms").className}`}
          style={reveal("400ms").style}
        >
          <Link
            href={ALL_PROJECTS_HREF}
            className="group inline-flex items-center gap-3 rounded-full border
              border-emerald-500/60 px-6 py-2.5 text-xs font-semibold uppercase
              tracking-[0.13em] text-emerald-700 no-underline
              transition-colors duration-300
              hover:bg-emerald-500 hover:text-black
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-emerald-400
              dark:text-emerald-400 dark:hover:text-black"
          >
            <span>View All Projects</span>
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}