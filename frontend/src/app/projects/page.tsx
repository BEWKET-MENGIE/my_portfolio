// src/app/projects/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import AllProjects from "@/components/projects/AllProjects";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A full list of projects built by Bewket Mengie.",
  alternates: { canonical: "/projects" },
};

const count = projects.length;

export default function ProjectsPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-white px-5 pb-20 pt-28
        text-neutral-900 transition-colors duration-300 sm:px-8 md:pt-32 lg:px-16
        dark:bg-[#050816] dark:text-white"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96
          rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/[0.07]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
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

        {/* Header: centered */}
        <header className="mx-auto mt-8 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            All projects.
          </h1>

          <p
            className="mt-6 inline-flex items-center gap-2 rounded-full border
              border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs
              font-semibold text-emerald-700 dark:text-emerald-300"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            {count} {count === 1 ? "project" : "projects"}
          </p>
        </header>

        {/* Filter + grid */}
        <div className="mt-12">
          <AllProjects />
        </div>

        {/* Closing call to action */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full
              bg-emerald-500 px-6 py-3 text-sm font-bold text-black
              transition-colors hover:bg-emerald-400
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-emerald-400"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
