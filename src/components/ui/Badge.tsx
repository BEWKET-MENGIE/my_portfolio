// src/components/ui/Badge.tsx
import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border border-neutral-800 bg-white/3 px-3 py-1.5 text-xs font-medium text-(--accent-light) transition-all duration-300 hover:border-[var(--accent)]/40 hover:bg-(--accent)/10 ${className}`}
    >
      {children}
    </span>
  );
}
