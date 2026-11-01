// src/components/ui/Textarea.tsx
import React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex min-h-[140px] w-full rounded-xl border border-neutral-800 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-500 backdrop-blur-sm transition-all duration-300 focus:border-[var(--accent)] focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";