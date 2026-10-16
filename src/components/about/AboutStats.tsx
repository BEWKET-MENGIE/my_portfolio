"use client";

import React, { useEffect, useState } from "react";

const principles = [
  "Performance",
  "Security",
  "Scalability",
  "Accessibility",
  "Reliability",
  "Maintainability",
];

export default function AboutStats() {
  const [activePrinciple, setActivePrinciple] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePrinciple((prev) => (prev + 1) % principles.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-10">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold">
        What I care about
      </p>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {principles.map((principle, index) => (
          <React.Fragment key={principle}>
            <span
              className={`px-3.5 py-1 text-xs uppercase tracking-wider font-mono transition-all duration-500 rounded-md ${
                index === activePrinciple
                  ? "font-bold text-pink-400 bg-pink-500/10 border border-pink-500/30 shadow-[0_0_10px_rgba(244,114,182,0.3)]"
                  : "text-neutral-400 "
              }`}
            >
              {principle}
            </span>

            {index < principles.length - 1 && (
              <span className="text-xs text-orange-400 font-semibold">
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}