// src/components/projects/ProjectCard.tsx
"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight, ExternalLink } from "lucide-react";

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
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border
          bg-white/2 backdrop-blur-sm
          transition-[transform,border-color,box-shadow] duration-300 ease-out
          will-change-transform hover:border-(--accent)/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
          motion-reduce:transition-none
          ${
            project.featured
              ? "border-(--accent)/40"
              : "border-neutral-800"
          }`}
      >
        {/* Cursor glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0
            transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-linear(circle at var(--mx, 50%) var(--my, 50%), rgba(6,182,212,0.12), transparent 60%)",
          }}
        />

        {/* Visual banner */}
        <div
          className={`relative h-40 overflow-hidden bg-linear-to-br sm:h-44 ${project.linear}`}
        >
          {project.featured && (
            <span
              className="absolute left-4 top-4 z-10 rounded-full border
                border-(--accent)/40 bg-black/40 px-3 py-1 font-mono
                text-[0.6rem] uppercase tracking-[0.12em] text-(--accent-light)
                backdrop-blur-md"
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
            className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t
              from-black/60 to-transparent"
          />
        </div>

        {/* Content */}
        <div className="relative z-30 flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <span
              className="font-mono text-[0.65rem] uppercase tracking-[0.16em]
                text-(--accent-light)"
            >
              {project.category}
            </span>
            <span className="font-mono text-[0.65rem] text-neutral-500">
              PROJECT / {number}
            </span>
          </div>

          <h3
            className="mt-2 text-xl font-bold tracking-tight text-white
              transition-colors duration-300 group-hover:text-(--accent-light)"
          >
            {project.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-neutral-300 sm:text-sm">
            {project.description}
          </p>

          {/* Tags using Badge Component */}
          <ul
            aria-label={`Technologies used in ${project.title}`}
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge>{tag}</Badge>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div
            className="mt-auto pt-6 flex items-center justify-between border-t
              border-neutral-800"
          >
            {hasDemo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 rounded-full
                  border border-neutral-700 px-4 py-1.5 text-[0.7rem] font-semibold
                  uppercase tracking-widest text-neutral-300 no-underline
                  transition-all duration-300
                  hover:border-(--accent) hover:bg-(--accent)/10 hover:text-(--accent-light)
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-(--accent)"
              >
                Live
                <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                <span className="sr-only">demo of {project.title}</span>
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center rounded-full
                  border border-dashed border-neutral-700 px-4 py-1.5 text-[0.7rem]
                  font-semibold uppercase tracking-widest text-neutral-500"
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
              className="flex h-9 w-9 items-center justify-center rounded-full
                border border-neutral-700 text-neutral-300
                transition-all duration-300
                hover:border-(--accent) hover:bg-(--accent)/10 hover:text-(--accent-light)
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-(--accent)"
            >
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  active ? "rotate-90" : "group-hover:translate-x-0.5"
                }`}
              />
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
                className="rounded-xl border border-neutral-800 bg-white/1 p-4
                  backdrop-blur-sm"
              >
                <p
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.12em]
                    text-(--accent-light)"
                >
                  Project focus
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-300">
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
            bg-(--accent) transition-transform duration-500
            group-hover:scale-x-100"
        />
      </article>
    </div>
  );
}
