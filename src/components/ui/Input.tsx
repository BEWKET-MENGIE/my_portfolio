// src/components/ui/Input.tsx
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-12 w-full rounded-xl border border-neutral-800 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-500 backdrop-blur-sm transition-all duration-300 focus:border-[var(--accent)] focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";