// src/components/projects/ProjectCard.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

// Inline GitHub icon (newer lucide-react versions no longer include brand icons)
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  visible: boolean;
  active: boolean;
  setActive: () => void;
}

export default function ProjectCard({
  project,
  index,
  visible,
  active,
  setActive,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  // The only external link on a project is its GitHub repository.
  const hasGithub = Boolean(project.github) && project.github !== "#";
  const inProgress = project.status === "in-progress";
  const detailsId = `project-${project.id}-details`;
  // Numbered by position, so the page always reads 01, 02, 03...
  const number = String(index + 1).padStart(2, "0");

  /* Subtle 3D tilt + cursor glow (mouse only, wide screens, no reduced motion) */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const canTilt = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    if (!canTilt.matches) return;

    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        card.style.transform = `perspective(1200px) rotateX(${(py - 0.5) * -4}deg) rotateY(${(px - 0.5) * 4}deg) translateY(-3px)`;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(frame);
      card.style.transform = "";
    };

    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerleave", handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    // Outer layer: scroll reveal only (with the staggered delay), so the delay
    // never slows the tilt on the inner <article>.
    <div
      className={`h-full transition-[opacity,translate] duration-700 ease-out
        motion-reduce:transition-none
        ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      <article
        ref={cardRef}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border
          bg-white shadow-sm backdrop-blur-sm
          transition-[transform,border-color,box-shadow] duration-300 ease-out
          will-change-transform hover:border-(--accent)/50
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          motion-reduce:transition-none
          dark:bg-white/2 dark:shadow-none dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
          ${
            project.featured
              ? "border-(--accent)/40"
              : "border-neutral-200 dark:border-neutral-800"
          }`}
      >
        {/* Cursor glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0
            transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(6,182,212,0.12), transparent 60%)",
          }}
        />

        {/* Banner: gradient base, screenshot on top when there is one */}
        <div className={`relative h-40 overflow-hidden bg-linear-to-br sm:h-44 ${project.linear}`}>
          {project.image && (
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500
                group-hover:scale-105 motion-reduce:transition-none"
            />
          )}

          {project.featured && (
            <span
              className="absolute left-4 top-4 z-10 rounded-full border
                border-(--accent)/40 bg-black/60 px-3 py-1 font-mono text-[0.65rem]
                uppercase tracking-[0.12em] text-(--accent-light) backdrop-blur-md"
            >
              Featured
            </span>
          )}

          {inProgress && (
            <span
              className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5
                rounded-full border border-amber-400/40 bg-black/60 px-3 py-1
                font-mono text-[0.65rem] uppercase tracking-[0.12em] text-amber-300
                backdrop-blur-md"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400
                  motion-reduce:animate-none"
              />
              In Progress
            </span>
          )}

          <span
            aria-hidden="true"
            className="absolute -bottom-3 right-4 z-10 select-none text-7xl
              font-bold leading-none tracking-tighter text-white/20 drop-shadow-md"
          >
            {number}
          </span>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-10 h-16 bg-linear-to-t
              from-black/70 to-transparent"
          />
        </div>

        {/* Content */}
        <div className="relative z-30 flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <span
              className="font-mono text-[0.7rem] uppercase tracking-[0.16em]
                text-cyan-700 dark:text-(--accent-light)"
            >
              {project.category}
            </span>
            <span className="font-mono text-[0.7rem] text-neutral-500">PROJECT / {number}</span>
          </div>

          <h3
            className="mt-2 text-xl font-bold tracking-tight text-neutral-900
              transition-colors duration-300 group-hover:text-cyan-700
              dark:text-white dark:group-hover:text-(--accent-light)"
          >
            {project.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {project.description}
          </p>

          {/* Tech stack */}
          <ul
            aria-label={`Technologies used in ${project.title}`}
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-neutral-200 bg-neutral-100 px-2.5 py-1
                  text-xs text-neutral-700 dark:border-white/10 dark:bg-white/[0.04]
                  dark:text-neutral-300"
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* Actions: GitHub link + expand button */}
          <div
            className="mt-auto flex items-center justify-between border-t
              border-neutral-200 pt-6 dark:border-neutral-800"
          >
            {hasGithub ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 rounded-full border
                  border-neutral-300 px-4 py-1.5 text-xs font-semibold uppercase
                  tracking-widest text-neutral-700 no-underline
                  transition-all duration-300
                  hover:border-(--accent) hover:bg-(--accent)/10 hover:text-cyan-700
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-(--accent)
                  dark:border-neutral-700 dark:text-neutral-300
                  dark:hover:text-(--accent-light)"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                Code
                <ExternalLink
                  aria-hidden="true"
                  className="h-3 w-3 transition-transform duration-300
                    group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
                <span className="sr-only">GitHub repository of {project.title}</span>
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center rounded-full border
                  border-dashed border-neutral-300 px-4 py-1.5 text-xs font-semibold
                  uppercase tracking-widest text-neutral-500 dark:border-neutral-700"
              >
                Coming soon
              </span>
            )}

            <button
              type="button"
              onClick={setActive}
              aria-expanded={active}
              aria-controls={detailsId}
              aria-label={`${active ? "Hide" : "Show"} details for ${project.title}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border
                border-neutral-300 text-neutral-600 transition-all duration-300
                hover:border-(--accent) hover:bg-(--accent)/10 hover:text-cyan-700
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-(--accent) dark:border-neutral-700
                dark:text-neutral-300 dark:hover:text-(--accent-light)"
            >
              <ChevronRight
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-300 ${
                  active ? "rotate-90" : "group-hover:translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Expandable details. `inert` keeps hidden content out of the tab order. */}
          <div
            id={detailsId}
            inert={!active}
            className={`grid transition-[grid-template-rows,opacity,margin]
              duration-500 motion-reduce:transition-none ${
                active ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
          >
            <div className="overflow-hidden">
              <div
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4
                  backdrop-blur-sm dark:border-neutral-800 dark:bg-white/[0.02]"
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.12em]
                    text-cyan-700 dark:text-(--accent-light)"
                >
                  {inProgress ? "Current status" : "Project focus"}
                </p>
                <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                  {inProgress
                    ? "This project is still being built. Features are being added and the code will be published on GitHub soon."
                    : "Architecture, user experience, performance and maintainable code were key considerations throughout this project."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0
            bg-(--accent) transition-transform duration-500
            group-hover:scale-x-100"
        />
      </article>
    </div>
  );
}