// src/components/services/ServiceCard.tsx
"use client";

import Image from "next/image";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
  /** Called when the visitor opens this service's details pop-up. */
  onOpen: () => void;
}

export default function ServiceCard({
  service,
  index,
  isVisible,
  onOpen,
}: ServiceCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border
        transition-[transform,opacity,border-color,background-color,box-shadow]
        duration-700 ease-out motion-reduce:transition-none
        hover:border-emerald-500/50 hover:shadow-lg dark:hover:shadow-none
        has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-400
        ${
          service.featured
            ? "border-emerald-500/40 bg-white shadow-sm dark:border-emerald-500/30 dark:bg-white/[0.035] dark:shadow-none"
            : "border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.015] dark:shadow-none"
        }
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0 motion-reduce:translate-y-0"
        }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
      }}
    >
      {/* Animated accent */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 h-0.5 w-full origin-left
          scale-x-0 bg-emerald-500 transition-transform duration-500
          group-hover:scale-x-100"
      />

      {/* Image: wrapper needs a real height because <Image fill> is absolute */}
      <div className="relative aspect-16/7 w-full overflow-hidden bg-neutral-200 dark:bg-neutral-900">
        <Image
          src={service.image}
          alt={`${service.title} service`}
          fill
          priority={index < 3}
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover transition-transform duration-700
            group-hover:scale-105 motion-reduce:transition-none"
        />

        {/* Fade to the card color: white in light mode, deep navy in dark mode */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-white via-white/10
            to-transparent dark:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-linear-to-t from-[#030719]
            via-black/10 to-transparent dark:block"
        />
      </div>

      {/* Content (not positioned, so the button's overlay can cover the whole card) */}
      <div className="p-6 md:p-7">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]
            text-emerald-600 dark:text-emerald-400"
        >
          {service.category}
        </p>

        <h3
          className="text-xl font-bold tracking-tight text-neutral-900
            transition-colors group-hover:text-emerald-600 md:text-2xl
            dark:text-white dark:group-hover:text-emerald-300"
        >
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
          {service.desc}
        </p>

        {/* Technologies + open button on the same row */}
        <div className="mt-5 flex items-end justify-between gap-4">
          <ul
            aria-label={`Technologies for ${service.title}`}
            className="flex flex-wrap gap-2"
          >
            {service.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-neutral-200 bg-neutral-100
                  px-2.5 py-1 text-xs text-neutral-700
                  dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300"
              >
                {tech}
              </li>
            ))}
          </ul>

          
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            aria-label={`Learn more about ${service.title}`}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center
              rounded-full border border-neutral-300 text-emerald-600
              transition-colors duration-300
              after:absolute after:inset-0 after:z-20
              group-hover:border-emerald-500 group-hover:bg-emerald-500
              group-hover:text-black
              focus-visible:outline-none
              dark:border-white/15 dark:text-emerald-400
              dark:group-hover:text-black"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300
                group-hover:translate-x-0.5 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}