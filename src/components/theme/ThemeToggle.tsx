"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = (resolvedTheme ?? "dark") === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full border
        border-neutral-300 bg-white/70 text-neutral-700 backdrop-blur-md
        transition-colors hover:border-emerald-500 hover:text-emerald-600
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
        dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-300
        dark:hover:text-emerald-400"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}