// src/components/about/AboutStats.tsx
"use client";

import React, { useEffect, useState } from "react";
import { PRINCIPLES } from "@/data/profile";

export default function AboutStats() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Detect the OS "reduce motion" setting.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setReduceMotion(event.matches);

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Highlight one principle at a time (skipped with reduced motion).
  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRINCIPLES.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="mt-10">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
        What I care about
      </p>

      <ul
        aria-label="Principles I work by"
        className="flex flex-wrap items-center gap-x-2 gap-y-3"
      >
        {PRINCIPLES.map((principle, index) => {
          const active = !reduceMotion && index === activeIndex;

          return (
            <React.Fragment key={principle}>
              <li
                className={`rounded-md border px-3.5 py-1 font-mono text-xs uppercase
                  tracking-wider transition-all duration-500
                  motion-reduce:transition-none ${
                    active
                      ? "border-emerald-500/40 bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-300"
                      : "border-transparent text-neutral-500 dark:text-neutral-400"
                  }`}
              >
                {principle}
              </li>

              {index < PRINCIPLES.length - 1 && (
                <li
                  aria-hidden="true"
                  className="text-xs font-semibold text-emerald-600/70 dark:text-emerald-400/70"
                >
                  →
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}