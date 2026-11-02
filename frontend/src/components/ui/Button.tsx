// src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] active:scale-[0.98]";

  const variants = {
    primary:
      "bg-(--accent) text-[var(--dark)] shadow-lg shadow-[var(--accent)]/20 hover:-translate-y-0.5 hover:bg-[var(--accent-light)] hover:shadow-xl hover:shadow-[var(--accent)]/30",
    outline:
      "border border-[var(--accent)]/40 bg-(--accent)/10 text-(--accent-light) hover:-translate-y-0.5 hover:bg-(--accent)/20 hover:border-[var(--accent)]",
    ghost:
      "text-[var(--text-muted)] hover:text-(--accent-light) hover:bg-white/[0.04]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
