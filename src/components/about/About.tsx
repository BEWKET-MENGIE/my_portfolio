// src/components/about/About.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import AboutContent from "./AboutContent";

export default function About() {
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
      { threshold: 0.15 },
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
      id="about"
      aria-labelledby="about-label"
      className="relative overflow-hidden bg-white px-5 py-12 text-neutral-900
        transition-colors duration-300 sm:px-8 md:py-16 lg:px-16
        dark:bg-[#050816] dark:text-white"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-60 top-1/4 h-80 w-96
          rounded-full bg-emerald-500/10 blur-[140px] dark:bg-emerald-500/[0.05]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96
          rounded-full bg-emerald-500/10 blur-[140px] dark:bg-emerald-500/[0.04]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section label: centered */}
        <div className={`mb-10 flex justify-center md:mb-12 ${reveal("delay-0")}`}>
          <p
            id="about-label"
            className="flex items-center gap-3 text-base font-bold uppercase
              tracking-[0.2em] text-emerald-700 md:text-xl dark:text-emerald-400"
          >
            About Me
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-emerald-500"
            />
          </p>
        </div>

        {/* Modular content */}
        <div className={reveal("delay-200")}>
          <AboutContent />
        </div>
      </div>
    </section>
  );
}