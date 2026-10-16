import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AllProjects from "@/components/projects/AllProjects";

export const metadata: Metadata = {
  title: "All Projects | Bewket Mengie",
  description: "A full list of projects built by Bewket Mengie.",
};

export default function ProjectsPage() {
  return (
    <main
      className="min-h-screen bg-white px-5 pb-24 pt-32 text-neutral-900
        sm:px-8 md:pt-36 lg:px-16 dark:bg-[#050816] dark:text-white"
    >
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium
            text-neutral-600 transition-colors hover:text-emerald-600
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-emerald-400 dark:text-neutral-400
            dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
            Portfolio
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            All projects.
          </h1>
          <p className="mt-5 text-sm leading-7 text-neutral-600 sm:text-base dark:text-neutral-400">
            Everything I&apos;ve built, from web apps to open-source tools.
            Filter by category to find what you&apos;re looking for.
          </p>
        </header>

        <div className="mt-12">
          <AllProjects />
        </div>
      </div>
    </main>
  );
}