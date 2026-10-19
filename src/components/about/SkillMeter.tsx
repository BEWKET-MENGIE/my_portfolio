// src/components/about/SkillMeter.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface SkillMeterProps {
  name: string;
  /** Percentage from 0 to 100. */
  level: number;
  /** Delay in milliseconds before the bar starts filling (for staggering). */
  delay?: number;
}

const DURATION_MS = 1200;

/* One skill row: name, animated percent, and a progress bar.
   The bar fills and the number counts up the first time it scrolls into view.
   With reduced motion, the final value is shown immediately. */
export default function SkillMeter({ name, level, delay = 0 }: SkillMeterProps) {
  const safeLevel = Math.max(0, Math.min(100, Math.round(level)));

  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(0);

  // Start when the row enters the screen.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setValue(safeLevel);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(row);
    return () => observer.disconnect();
  }, [safeLevel]);

  // Animate 0 -> level. One value drives both the bar width and the number.
  useEffect(() => {
    if (!active) return;

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      setValue(Math.round(safeLevel * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [active, safeLevel, delay]);

  return (
    <div ref={rowRef}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-(--text)">
          {name}
        </span>
        {/* aria-hidden: screen readers get the final value from the progressbar below */}
        <span
          aria-hidden="true"
          className="font-mono text-sm font-semibold tabular-nums text-orange-500"
        >
          {value}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeLevel}
        aria-valuetext={`${safeLevel} percent`}
        className="h-2.5 w-full overflow-hidden rounded-full bg-(--text)/10"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-blue-500 to-orange-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}