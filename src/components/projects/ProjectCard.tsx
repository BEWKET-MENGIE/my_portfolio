"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/types";

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

  const hasDemo = Boolean(project.demo) && project.demo !== "#";
  const detailsId = `project-${project.id}-details`;
  const number = String(project.id).padStart(2, "0");

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
    <div
      className={`h-full transition-[opacity,translate] duration-700 ease-out
        motion-reduce:transition-none
        ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      <article
        ref={cardRef}
        className={`group relative flex h-full flex-col overflow-hidden rounded-xl border
          bg-white shadow-sm
          transition-[transform,border-color,box-shadow] duration-200 ease-out
          will-change-transform hover:border-emerald-500/50 hover:shadow-lg
          motion-reduce:transition-none
          dark:bg-white/[0.02] dark:shadow-none dark:hover:shadow-none
          ${
            project.featured
              ? "border-emerald-500/40 dark:border-emerald-500/30"
              : "border-neutral-200 dark:border-white/10"
          }`}
      >
        {/* Cursor glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0
            transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(16,185,129,0.1), transparent 60%)",
          }}
        />

        {/* Visual banner - Decreased height */}
        <div
          className={`relative h-40 overflow-hidden bg-gradient-to-br sm:h-44 ${project.gradient}`}
        >
          {project.featured && (
            <span
              className="absolute left-4 top-4 z-10 rounded-full border
                border-emerald-400/40 bg-black/30 px-2.5 py-0.5 font-mono
                text-[0.6rem] uppercase tracking-[0.12em] text-emerald-300
                backdrop-blur-sm"
            >
              Featured
            </span>
          )}

          <span
            aria-hidden="true"
            className="absolute -bottom-3 right-4 select-none text-7xl
              font-bold leading-none tracking-tighter text-white/10"
          >
            {number}
          </span>

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t
              from-black/40 to-transparent"
          />
        </div>

        {/* Content - Decreased padding and spacing */}
        <div className="relative z-30 flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-4">
            <span
              className="font-mono text-[0.65rem] uppercase tracking-[0.16em]
                text-emerald-600 dark:text-emerald-400"
            >
              {project.category}
            </span>
            <span className="font-mono text-[0.65rem] text-neutral-500">
              PROJECT / {number}
            </span>
          </div>

          <h3
            className="mt-2 text-xl font-bold tracking-tight text-neutral-900
              transition-colors duration-300 group-hover:text-emerald-600
              dark:text-white dark:group-hover:text-emerald-300"
          >
            {project.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-neutral-600 sm:text-sm dark:text-neutral-400">
            {project.description}
          </p>

          {/* Tags */}
          <ul
            aria-label={`Technologies used in ${project.title}`}
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-neutral-200 bg-neutral-50
                  px-2 py-0.5 font-mono text-[0.6rem] uppercase
                  tracking-[0.08em] text-neutral-600 transition-colors
                  duration-300 group-hover:border-emerald-500/40
                  dark:border-white/10 dark:bg-transparent
                  dark:text-neutral-400 dark:group-hover:text-neutral-200"
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div
            className="mt-auto pt-5 flex items-center justify-between border-t
              border-neutral-200 dark:border-white/10"
          >
            {hasDemo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 rounded-full
                  border border-neutral-300 px-3.5 py-1.5 text-[0.7rem] font-semibold
                  uppercase tracking-widest text-neutral-700 no-underline
                  transition-colors duration-300
                  hover:border-emerald-500 hover:text-emerald-600
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-emerald-400
                  dark:border-white/10 dark:text-neutral-400
                  dark:hover:text-emerald-400"
              >
                Live
                <svg
                  aria-hidden="true"
                  className="h-3 w-3 transition-transform duration-300
                    group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span className="sr-only">demo of {project.title}</span>
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center rounded-full
                  border border-dashed border-neutral-300 px-3.5 py-1.5 text-[0.7rem]
                  font-semibold uppercase tracking-widest text-neutral-400
                  dark:border-white/10 dark:text-neutral-500"
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
              className="flex h-8 w-8 items-center justify-center rounded-full
                border border-neutral-300 text-neutral-600
                transition-colors duration-300
                hover:border-emerald-500 hover:text-emerald-600
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-emerald-400
                dark:border-white/10 dark:text-neutral-400
                dark:hover:text-emerald-400"
            >
              <svg
                aria-hidden="true"
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  active ? "rotate-90" : "group-hover:translate-x-0.5"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M9 18l6-6-6-6"
                />
              </svg>
            </button>
          </div>

          {/* Expandable details */}
          <div
            id={detailsId}
            inert={!active}
            className={`grid transition-[grid-template-rows,opacity,margin]
              duration-500 motion-reduce:transition-none ${
                active
                  ? "mt-4 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
          >
            <div className="overflow-hidden">
              <div
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-3.5
                  dark:border-white/10 dark:bg-white/[0.02]"
              >
                <p
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.12em]
                    text-emerald-600 dark:text-emerald-400"
                >
                  Project focus
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                  Architecture, user experience, performance and maintainable
                  code were key considerations throughout this project.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0
            bg-emerald-500 transition-transform duration-500
            group-hover:scale-x-100"
        />
      </article>
    </div>
  );
}