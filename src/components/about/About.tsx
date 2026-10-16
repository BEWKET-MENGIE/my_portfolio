"use client";

import React, { useEffect, useRef, useState } from "react";
import AboutContent from "./AboutContent";

export default function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* -----------------------------------------
     Scroll reveal observer
  ----------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
      }
    );

    const current = sectionRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  /* -----------------------------------------
     Reveal helper
  ----------------------------------------- */
  const reveal = (delay: string) =>
    `transition-all duration-1000 ${delay} ${
      visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen overflow-hidden px-6 py-24 md:px-16 md:py-32 bg-(--dark) text-(--text)"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-60 top-1/4 h-80 w-96 rounded-full bg-(--accent) opacity-[0.05] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-(--accent) opacity-[0.04] blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section label */}
        <div className={reveal("delay-0")}>
          <p className="mb-5 flex items-center gap-3 text-[0.99rem] font-bold uppercase tracking-[0.2em] md:text-[1.3rem] text-(--accent)">
            <span className="h-2 w-2 rounded-full bg-(--accent)" />
            About Me
          </p>
        </div>

        {/* Modular Content */}
        <div className={reveal("delay-200")}>
          <AboutContent />
        </div>
      </div>
    </section>
  );
}