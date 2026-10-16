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
      className="relative min-h-screen overflow-hidden bg-(--dark) px-6 py-24 text-(--text) md:px-16 md:py-32"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-60 top-1/4 h-80 w-96 rounded-full bg-(--accent) opacity-[0.05] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-(--accent) opacity-[0.04] blur-[140px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section label: centered at the top */}
        <div className={`mb-10 flex justify-center md:mb-14 ${reveal("delay-0")}`}>
          <p
            id="about-label"
            className="flex items-center gap-3 text-[0.99rem] font-bold uppercase tracking-[0.2em] text-(--accent) md:text-[1.3rem]"
          >
            About Me
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