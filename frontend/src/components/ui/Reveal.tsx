// src/components/ui/Reveal.tsx
"use client";

import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in milliseconds, for staggering neighbours. */
  delay?: number;
  className?: string;
}

/* Fades and slides its content in once it enters the screen.
   Shows instantly when the user prefers reduced motion. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  return (
    <div
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}