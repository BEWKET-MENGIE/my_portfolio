"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Gauge,
  GraduationCap,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Download,
  Code,
  Laptop,
  Rocket,
  Briefcase,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/lib/constants";
import { PROFILE } from "@/data/profile";

const principles = [
  {
    title: "Clarity first",
    description:
      "I start from the problem, not the code. A clear model of what needs to happen leads to simpler, more maintainable software.",
    icon: Target,
  },
  {
    title: "Built to scale",
    description:
      "Architecture decisions are made with growth in mind — from a weekend project to a system handling real traffic.",
    icon: Layers,
  },
  {
    title: "Reliability matters",
    description:
      "Tests, error handling, and sensible defaults aren't an afterthought. Software should behave predictably, even when things go wrong.",
    icon: ShieldCheck,
  },
  {
    title: "Performance-minded",
    description:
      "Fast load times and smooth interactions aren't optional polish — they're part of what makes software genuinely usable.",
    icon: Gauge,
  },
  {
    title: "People-first design",
    description:
      "Behind every interface is someone trying to get something done. I design and build with their experience as the priority.",
    icon: Users,
  },
  {
    title: "Always learning",
    description:
      "The tools change constantly. I stay curious, experiment often, and treat every project as a chance to get better.",
    icon: Sparkles,
  },
];

const timeline = [
  {
    year: "2024 — Expected 2027",
    title: "B.Sc. in Software Engineering",
    description:
      "Currently in my fourth year, studying software engineering while building projects alongside coursework — from foundational computer science to full-stack application development.",
    icon: GraduationCap,
  },
  {
    year: "2025 — Now",
    title: "Full Stack Developer & Personal Projects",
    description:
      "Designing and building complete products end-to-end — frontend, backend, infrastructure, and everything in between — outside of my coursework.",
    icon: Laptop,
  },
  {
    year: "2025 — Now",
    title: "Frontend-focused development",
    description:
      "Built and shipped several production interfaces with React and Next.js, with a growing focus on backend systems and APIs.",
    icon: Code,
  },
  {
    year: "2026",
    title: "Started building",
    description:
      "Wrote my first real applications, got hooked on turning ideas into working software, and never really stopped.",
    icon: Rocket,
  },
];

export default function AboutPage() {
  return (
    <main className=" min-h-screen overflow-hidden bg-(--blue)">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-(--amber) opacity-[0.05] blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-(--amber) opacity-[0.04] blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-36 md:px-10 md:pt-44">
        {/* =================================================
            HERO / INTRO
        ================================================= */}
        <section
          id="about"
          className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-8 md:py-32"
        >
          <Reveal width="100%">
            <header className="mb-12 md:mb-16">
              <h1 className="font-['Syne'] text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em] text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-orange-500">
                About Me
              </h1>
            </header>
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            {/* Left Side: Portrait Image */}
            <Reveal width="100%">
              <div className="relative w-full max-w-md mx-auto lg:max-w-none">
                <div className="pointer-events-none absolute -inset-4 rounded-4xl bg-blue-500 opacity-[0.08] blur-2xl" />

                <div className="group relative aspect-4/5 w-full overflow-hidden rounded-3xl border `border-(--border)` bg-white/5 shadow-2xl">
                  <Image
                    src={PROFILE.image}
                    alt={PROFILE.name}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                    <span className="text-[0.85rem] uppercase tracking-wider text-white">
                      {PROFILE.availability}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Side: Intro Copy */}
            <Reveal width="100%">
              <div className="flex flex-col justify-center pt-2 lg:pt-0">
                <h2 className="font-['Syne'] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-(--text)">
                  I build digital experiences that turn{" "}
                  <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">
                    ideas into impact.
                  </span>
                </h2>

                <div className="mt-8 space-y-5 text-base leading-[1.8] text-(--text-muted) md:text-lg">
                  <p>
                    I&rsquo;m {PROFILE.name}, a fourth-year Software Engineering
                    student and Full Stack Developer who enjoys solving complex
                    problems through thoughtful design, clean code, and modern
                    engineering practices. Alongside my coursework, I build real
                    projects end-to-end &mdash; from polished frontend
                    experiences to robust backend systems &mdash; with a focus
                    on performance, scalability, usability, and long-term
                    maintainability.
                  </p>
                  <p>
                    I believe great software begins with understanding the
                    problem&mdash;not just writing the code. That&rsquo;s why I
                    approach each project from requirements to architecture,
                    implementation, testing, deployment, and continuous
                    improvement.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href={`mailto:${PROFILE.email}`}
                    className="group inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 font-['DM_Mono'] text-[0.75rem] font-bold uppercase tracking-[0.13em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:shadow-orange-500/30"
                  >
                    Get in touch
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <a
                    href={PROFILE.cvUrl}
                    download
                    className="group inline-flex items-center gap-3 rounded-full bg-blue-900/40 border-2 border-blue-600 px-7 py-4 font-['DM_Mono'] text-[0.75rem] font-bold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:bg-orange-500"
                  >
                    Download CV
                    <Download className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =================================================
            PRINCIPLES
        ================================================= */}
        <section className="mt-32">
          <Reveal width="100%">
            <div className="mb-12 max-w-3xl">
              <h2 className="mt-5 font-['Syne'] text-4xl font-bold tracking-[-0.03em] text-(--text) sm:text-5xl">
                Principles that guide every project.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <Reveal key={principle.title} width="100%" delay={index * 0.1}>
                  <div className="group h-full rounded-3xl border border-(--border) bg-white/2.5 p-7 transition-all duration-300 hover:border-(--accent)/30 hover:bg-white/4">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-(--accent)/10">
                      <Icon className="h-5 w-5 text-(--text-muted) transition-colors group-hover:text-(--accent)" />
                    </div>
                    <h3 className="mb-3 font-['Syne'] text-xl font-bold text-(--text)">
                      {principle.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-(--text-muted)">
                      {principle.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* =================================================
            CURRENT FOCUS
        ================================================= */}
        <section className="mt-32">
          <Reveal width="100%">
            <div className="rounded-4xl border border-(--border)] bg-linear-to-br from-white/4 to-transparent p-8 sm:p-12 lg:p-16">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Left Side: Circular Logo/Image with Border */}
                <div className="shrink-0">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-(--accent)]/40 bg-(--accent)/10 p-2 shadow-xl sm:h-40 sm:w-40">
                    <div className="absolute inset-0 rounded-full bg-[radial-linear(circle_at_center,rgba(var(--accent-rgb),0.15)_0%,transparent_70%)]" />
                    <Image
                      src="/logo.jpg" // Change this to your logo or profile path if needed
                      alt="Logo / Profile"
                      width={120}
                      height={120}
                      className="h-full w-full rounded-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Right Side: Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="mt-3 font-['Syne'] text-3xl font-bold tracking-[-0.03em] text-(--text) sm:text-4xl lg:text-5xl">
                    What I&rsquo;m focused on.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-(--text-muted)] sm:text-lg">
                    Balancing my final year of coursework with hands-on projects
                    &mdash; deepening my backend and systems-design skills,
                    exploring infrastructure and DevOps practices, and actively
                    looking for an internship or junior role where I can keep
                    growing as an engineer.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* =================================================
            TIMELINE
        ================================================= */}
        <section
          id="journey"
          className="relative mx-auto mt-32 w-full max-w-7xl px-4 md:px-8"
        >
          <Reveal width="100%">
            <div className="mb-16 max-w-3xl">
              <div className="mb-4 flex items-center gap-4 font-['DM_Mono'] text-[0.65rem] uppercase tracking-[0.2em] text-orange-500 md:text-[0.7rem]">
                <span className="h-px w-8 bg-orange-500 md:w-12" />
                <span>Journey</span>
              </div>
              <h2 className="font-['Syne'] text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.03em] text-(--text)">
                How I got{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-orange-500">
                  here.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="relative max-w-4xl">
            <div className="absolute bottom-0 left-[17px] top-3 w-1.5 rounded-full bg-blue-500/20" />

            <div className="space-y-16">
              {timeline.map((item, index) => {
                const Icon = item.icon || Briefcase;

                return (
                  <Reveal key={item.title} width="100%" delay={index * 0.15}>
                    <div className="group relative pl-20 md:pl-24">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-(--dark) z-10">
                        <div
                          className={`relative flex h-full w-full items-center justify-center rounded-full border-4 border-(--dark) transition-all duration-300 group-hover:scale-110 ${
                            index === 0
                              ? "bg-orange-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          <Icon className="h-6 w-6" strokeWidth={2} />

                          {index === 0 && (
                            <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-orange-500 opacity-50 duration-1000" />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2">
                        <p className="font-['DM_Mono'] text-[0.75rem] font-medium uppercase tracking-[0.15em] text-blue-500">
                          {item.year}
                        </p>
                        <h3 className="font-['Syne'] text-2xl font-bold text-(--text) transition-colors duration-300 group-hover:text-orange-500">
                          {item.title}
                        </h3>
                        <p className="max-w-2xl text-base leading-relaxed text-(--text-muted)">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =================================================
            CTA
        ================================================= */}
        <section className="mt-32 pb-4 text-center" id="contact">
          <Reveal width="100%">
            <div className="mx-auto max-w-3xl">
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`mailto:${PROFILE.email}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03]"
                >
                  Contact Me
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
