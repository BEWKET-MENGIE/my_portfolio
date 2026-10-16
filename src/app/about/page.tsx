import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Bewket Mengie",
  description: "More about Bewket Mengie, Full Stack Developer.",
};

/* EDIT THIS CONTENT: replace the placeholder wording with your own. */
const story = [
  "I'm a full stack developer who enjoys turning ideas into fast, reliable and well-designed web products.",
  "I care about clean code, clear communication and building things that are easy for people to use and easy for teams to maintain.",
  "Outside of client work, I contribute to open source and keep learning new tools and techniques.",
];

const focusAreas = [
  {
    title: "Frontend",
    text: "Responsive, accessible interfaces built with React, Next.js and Tailwind CSS.",
  },
  {
    title: "Backend",
    text: "APIs and services with Node.js and Python, designed for reliability.",
  },
  {
    title: "Delivery",
    text: "Testing, Docker and deployment so projects ship smoothly and stay stable.",
  },
];

const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Vue.js",
  "Docker",
];

const cardClass =
  "rounded-2xl border border-neutral-200 bg-neutral-50 p-6 " +
  "dark:border-white/10 dark:bg-white/[0.02]";

export default function AboutPage() {
  return (
    <main
      className="min-h-screen bg-white px-5 pb-24 pt-32 text-neutral-900
        sm:px-8 md:pt-36 lg:px-16 dark:bg-[#050816] dark:text-white"
    >
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 text-sm font-medium
            text-neutral-600 transition-colors hover:text-emerald-600
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-emerald-400 dark:text-neutral-400
            dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        {/* Intro */}
        <header className="mt-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
            About me
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I&apos;m Bewket Mengie.
          </h1>
        </header>

        {/* Story */}
        <section aria-labelledby="story-heading" className="mt-10">
          <h2 id="story-heading" className="sr-only">
            My story
          </h2>
          <div className="space-y-5 text-base leading-8 text-neutral-600 dark:text-neutral-400">
            {story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Focus areas */}
        <section aria-labelledby="focus-heading" className="mt-16">
          <h2 id="focus-heading" className="text-2xl font-bold tracking-tight">
            What I do
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {focusAreas.map((area) => (
              <div key={area.title} className={cardClass}>
                <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  {area.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section aria-labelledby="tools-heading" className="mt-16">
          <h2 id="tools-heading" className="text-2xl font-bold tracking-tight">
            Tools I work with
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-neutral-200 bg-neutral-50
                  px-3.5 py-1.5 text-sm text-neutral-700
                  dark:border-white/10 dark:bg-white/4 dark:text-neutral-300"
              >
                {tool}
              </li>
            ))}
          </ul>
        </section>

        {/* Call to action */}
        <section
          aria-labelledby="cta-heading"
          className="mt-20 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center"
        >
          <h2 id="cta-heading" className="text-2xl font-bold tracking-tight">
            Let&apos;s work together
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">
            Have a project or opportunity in mind? I&apos;d love to hear about it.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500
                px-6 py-3 text-sm font-bold text-black transition-colors
                hover:bg-emerald-400 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border
                border-neutral-300 px-6 py-3 text-sm font-semibold
                text-neutral-700 transition-colors hover:border-emerald-500
                hover:text-emerald-600 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-emerald-400
                dark:border-white/15 dark:text-neutral-300
                dark:hover:text-emerald-400"
            >
              View my projects
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}