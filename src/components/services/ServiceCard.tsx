"use client";

import Image from "next/image";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
}

export default function ServiceCard({
  service,
  index,
  isVisible,
}: ServiceCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border
        transition-[transform,opacity,border-color,background-color,box-shadow]
        duration-700 ease-out motion-reduce:transition-none
        hover:border-emerald-500/50 hover:shadow-lg dark:hover:shadow-none
        ${
          service.featured
            ? "border-emerald-500/40 bg-white shadow-sm dark:border-emerald-500/30 dark:bg-white/[0.035] dark:shadow-none"
            : "border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/1.5 dark:shadow-none"
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

      {/* Content */}
      <div className="relative p-6 md:p-7">
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

        {/* Technologies */}
        <ul
          aria-label={`Technologies for ${service.title}`}
          className="mt-5 flex flex-wrap gap-2"
        >
          {service.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-neutral-200 bg-neutral-100
                px-2.5 py-1 text-xs text-neutral-700
                dark:border-white/10 dark:bg-white/4 dark:text-neutral-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Decorative arrow */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 right-5 flex h-8 w-8
            items-center justify-center rounded-full border
            border-neutral-300 text-emerald-600 opacity-0
            transition-all duration-300 group-hover:translate-x-1
            group-hover:border-emerald-500/60 group-hover:opacity-100
            dark:border-white/15 dark:text-emerald-400"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
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
        </div>
      </div>
    </article>
  );
}