"use client";

import React, { useEffect, useRef } from "react";
import { Project } from "@/types";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* 3D Mouse Tilt Effect */
  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;

    if (!card || !glow) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 768) return;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      const rotateX = y * -5;
      const rotateY = x * 5;

      card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-4px)
      `;

      const glowX = ((event.clientX - rect.left) / rect.width) * 100;
      const glowY = ((event.clientY - rect.top) / rect.height) * 100;

      glow.style.background = `
        radial-gradient(
          circle at ${glowX}% ${glowY}%,
          rgba(201,168,76,0.13),
          transparent 55%
        )
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
      `;
      glow.style.background = "transparent";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        bg-white/[1.5
        transition-all
        duration-700
        ${project.featured ? "border-(--border-bright,rgba(255,255,255,0.2)) shadow-xl shadow-black/30" : "border-(--border,rgba(255,255,255,0.1))"}
        ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
      `}
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Mouse Glow Overlay */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Project Visual Header Banner */}
      <div className={`relative h-56 overflow-hidden bg-linear-to-br ${project.gradient} md:h-64`}>
        {project.featured && (
          <span className="absolute left-5 top-5 rounded-full border border-(--gold,rgba(201,168,76,0.4))] bg-black/30 px-3 py-1 font-['DM_Mono'] text-[0.5rem] uppercase tracking-[0.12em] text-(--gold)] backdrop-blur-sm">
            Featured
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-30 p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span className="font-['DM_Mono'] text-[0.58rem] uppercase tracking-[0.16em] text-[var(--gold)]">
            {project.category}
          </span>
          <span className="font-['DM_Mono'] text-[0.55rem] text-neutral-500">
            PROJECT / {String(project.id).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-3 font-['Syne'] text-2xl font-bold tracking-tight text-(--text) transition-colors duration-300 group-hover:text-(--accent)">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-neutral-400">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-(--border,rgba(255,255,255,0.1)) px-2.5 py-1 font-['DM_Mono'] text-[0.5rem] uppercase tracking-[0.08em] text-neutral-400 transition-all duration-300 group-hover:border-(--border-bright,rgba(255,255,255,0.2))] group-hover:text-(--text)"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="mt-7 flex items-center justify-between border-t border-[var(--border,rgba(255,255,255,0.1))] pt-5">
          <div className="flex gap-2">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                if (project.demo === "#") {
                  event.preventDefault();
                }
              }}
              className="group/link inline-flex items-center gap-2 rounded-full border border-(--border,rgba(255,255,255,0.1)) px-3.5 py-2 text-[0.52rem] uppercase tracking-widest text-neutral-400 no-underline transition-all duration-300 hover:border-(--accent)] hover:text-(--accent)"
            >
              Live
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <button
            type="button"
            onClick={setActive}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border,rgba(255,255,255,0.1))] text-neutral-400 transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            aria-label={`Explore ${project.title}`}
          >
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${active ? "rotate-90" : "group-hover:translate-x-0.5"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Expanded Project Info Accordion */}
        <div
          className={`grid transition-all duration-500 ${
            active ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border border-(--border,rgba(255,255,255,0.1))] bg-white/2 p-4 rounded-xl">
              <p className="text-[0.55rem] uppercase tracking-[0.12em] text-(--gold)">
                Project Focus
              </p>
              <p className="mt-2 text-xs leading-6 text-neutral-400">
                Architecture, user experience, performance and maintainable code were key considerations throughout this project.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-(--accent) transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}