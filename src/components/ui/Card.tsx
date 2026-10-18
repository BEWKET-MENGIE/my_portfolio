// src/components/ui/Card.tsx
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-neutral-800 bg-white/2 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-(--accent)]/40  hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-8 ${className}`}
      {...props}
    >
      {/* Top animated linear line */}
      <div className="absolute left-0 right-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-transparent via-(--accent) to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      {children}
    </div>
  );
}
