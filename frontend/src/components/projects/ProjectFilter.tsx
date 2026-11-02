// src/components/projects/ProjectFilter.tsx
"use client";

interface ProjectFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function ProjectFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProjectFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="mb-10 flex flex-wrap justify-center gap-2"
    >
      {categories.map((category) => {
        const selected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelectCategory(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium
              transition-colors duration-300
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-(--accent)
              ${
                selected
                  ? "border-(--accent) bg-(--accent) text-black"
                  : "border-neutral-200 bg-neutral-100 text-neutral-600 hover:border-(--accent)/50 hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-400 dark:hover:text-white"
              }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}