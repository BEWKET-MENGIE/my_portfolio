// src/app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  Download,
  Gauge,
  GraduationCap,
  Laptop,
  Layers,
  Monitor,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { PROFILE } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: `${PROFILE.name} is a Software Engineering student and Full Stack Developer. Learn about my skills, principles, current focus and journey.`,
  alternates: { canonical: "/about" },
};

/* ---------------------------------------------------------------
   CONTENT (edit the wording here)
---------------------------------------------------------------- */

const CV_URL = "/cv.pdf"; // file in the public folder
const FOCUS_IMAGE = "/logo.jpg"; // file in the public folder: your logo or photo

const skillGroups = [
  {
    title: "Frontend",
    icon: Monitor,
    skills: [
      "HTML & CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      "Node.js",
      "NestJS",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "Prisma",
    ],
  },
  {
    title: "Tools & workflow",
    icon: Wrench,
    skills: [
      "Git & GitHub",
      "Figma",
      "Testing",
      "Debugging",
      "Docker",
      "Deployment",
    ],
  },
];

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
      "Architecture decisions are made with growth in mind, from a weekend project to a system handling real traffic.",
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
      "Fast load times and smooth interactions aren't optional polish. They're part of what makes software genuinely usable.",
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

// The first item is highlighted (accent color, pulsing).
const timeline = [
  {
    year: "2024 - Expected 2027",
    title: "B.Sc. in Software Engineering",
    description:
      "Currently in my fourth year, studying software engineering while building projects alongside coursework, from foundational computer science to full-stack application development.",
    icon: GraduationCap,
  },
  {
    year: "2025 - Now",
    title: "Full Stack Developer & Personal Projects",
    description:
      "Designing and building complete products end-to-end (frontend, backend, infrastructure and everything in between) outside of my coursework.",
    icon: Laptop,
  },
  {
    year: "2025 - Now",
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

/* ---------------------------------------------------------------
   Shared styles. Colors match the Hero: --dark, --accent,
   --accent-light and --text-muted.
---------------------------------------------------------------- */
const display = "font-display";
const mono = "font-mono";

const sectionTitle = `${display} text-4xl font-bold tracking-[-0.03em] text-(--text) sm:text-5xl`;

const gradientText =
  "bg-linear-to-r from-(--accent-light) to-blue-500 bg-clip-text text-transparent";

const cardClass = "rounded-3xl border border-(--border) bg-white/[0.025]";

const principleCardClass =
  `${cardClass} group relative h-full p-7 ` +
  "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform " +
  "hover:z-10 hover:scale-105 hover:border-(--accent)/40 hover:bg-white/[0.05] " +
  "hover:shadow-2xl hover:shadow-black/30 " +
  "motion-reduce:transition-colors motion-reduce:hover:scale-100";

const primaryButton =
  `group inline-flex items-center justify-center gap-3 rounded-full bg-(--accent) px-7 py-4 ${mono} ` +
  "text-xs font-bold uppercase tracking-[0.13em] text-black " +
  "shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 " +
  "hover:-translate-y-1 hover:bg-(--accent-light) hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-light) " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const secondaryButton =
  `group inline-flex items-center justify-center gap-3 rounded-full border border-(--accent)/40 bg-(--accent)/10 px-7 py-4 ${mono} ` +
  "text-xs font-bold uppercase tracking-[0.13em] text-(--accent-light) " +
  "transition-all duration-300 hover:-translate-y-1 hover:bg-(--accent) hover:text-black " +
  "hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-(--dark) text-(--text)">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-(--accent) opacity-[0.06] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-500 opacity-[0.05] blur-[150px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-8 md:pt-36 lg:px-10">
        {/* =================================================
            INTRO
        ================================================= */}
        <section aria-labelledby="about-heading">
          <Reveal>
            <header className="mx-auto max-w-3xl text-center">
              <h1
                id="about-heading"
                className={`${display} ${gradientText} p-1 text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em]`}
              >
                About Me
              </h1>
            </header>
          </Reveal>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Portrait */}
            <Reveal
              delay={100}
              className="mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-(--accent) opacity-[0.08] blur-2xl"
                />

                <figure className="group relative m-0 aspect-4/5 w-full overflow-hidden rounded-3xl border border-(--border) bg-white/5 shadow-2xl">
                  <Image
                    src={PROFILE.image}
                    alt={`Portrait of ${PROFILE.name}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/30 to-transparent"
                  />
                </figure>
              </div>
            </Reveal>

            {/* Intro copy */}
            <Reveal delay={200} className="flex flex-col justify-center">
              <h2
                className={`${display} text-[clamp(2rem,2vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-(--text)`}
              >
                I build digital experiences that turn{" "}
                <span className="text-(--accent-light) underline decoration-(--accent)/30 underline-offset-8">
                  ideas into impact.
                </span>
              </h2>

              <div className="mt-8 space-y-5 text-base leading-[1.8] text-(--text-muted) md:text-lg">
                <p>
                  I&rsquo;m {PROFILE.name}, a fourth-year Software Engineering
                  student and Full Stack Developer who enjoys solving complex
                  problems through thoughtful design, clean code, and modern
                  engineering practices. Alongside my coursework, I build real
                  projects end-to-end, from polished frontend experiences to
                  robust backend systems, with a focus on performance,
                  scalability, usability, and long-term maintainability.
                </p>
                <p>
                  I believe great software begins with understanding the
                  problem, not just writing the code. That&rsquo;s why I
                  approach each project from requirements to architecture,
                  implementation, testing, deployment, and continuous
                  improvement.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link href="/#contact" className={primaryButton}>
                  Get in touch
                  <ArrowRight
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>

                <a href={CV_URL} download className={secondaryButton}>
                  Download CV
                  <Download
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =================================================
            SKILLS (no percentages)
        ================================================= */}
        <section aria-labelledby="skills-heading" className="mt-24 md:mt-32">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="skills-heading" className={sectionTitle}>
                Technical <span className={gradientText}>skills.</span>
              </h2>
              <p className="mt-5 leading-8 text-(--text-muted)">
                The tools I use most to design, build and ship projects, and I
                am still improving every one of them.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {skillGroups.map(({ title, icon: Icon, skills }, groupIndex) => (
              <Reveal key={title} delay={groupIndex * 120} className="h-full">
                <div className={`${cardClass} h-full p-6 md:p-8`}>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--accent)/10 text-(--accent-light)">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className={`${display} text-xl font-bold text-(--text)`}>
                      {title}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap gap-2.5">
                    {skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-(--accent)/30 bg-(--accent)/10 px-4 py-2 text-sm font-medium text-(--accent-light) transition-colors duration-300 hover:border-(--accent) hover:bg-(--accent) hover:text-black motion-reduce:transition-none"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =================================================
            PRINCIPLES
        ================================================= */}
        <section
          aria-labelledby="principles-heading"
          className="mt-24 md:mt-32"
        >
          <Reveal>
            <h2
              id="principles-heading"
              className={`${sectionTitle} mx-auto max-w-3xl text-center`}
            >
              Principles that guide every project.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }, index) => (
              <Reveal key={title} delay={(index % 3) * 100} className="h-full">
                <div className={principleCardClass}>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-(--accent)/10 motion-reduce:group-hover:scale-100">
                    <Icon
                      className="h-5 w-5 text-(--text-muted) transition-colors group-hover:text-(--accent-light)"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className={`${display} mb-3 text-xl font-bold text-(--text)`}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-(--text-muted)">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =================================================
            CURRENT FOCUS
        ================================================= */}
        <section aria-labelledby="focus-heading" className="mt-24 md:mt-32">
          <Reveal>
            <div className="rounded-[2rem] border border-(--border) bg-linear-to-br from-white/[0.04] to-transparent p-8 sm:p-12 lg:p-16">
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
                {/* Circular logo / image */}
                <div className="shrink-0">
                  <div className="relative h-32 w-32 rounded-full border-2 border-(--accent)/40 bg-(--accent)/10 p-2 shadow-xl sm:h-40 sm:w-40">
                    <div className="relative h-full w-full overflow-hidden rounded-full">
                      <Image
                        src={FOCUS_IMAGE}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h2 id="focus-heading" className={sectionTitle}>
                    What I&rsquo;m focused on.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-(--text-muted) sm:text-lg">
                    Balancing my final year of coursework with hands-on
                    projects: deepening my backend and systems-design skills,
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
            JOURNEY
        ================================================= */}
        <section
          id="journey"
          aria-labelledby="journey-heading"
          className="mt-24 md:mt-32"
        >
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div
                className={`${mono} mb-4 flex items-center justify-center gap-4 text-[0.7rem] uppercase tracking-[0.2em] text-(--accent-light)`}
              >
                <span
                  aria-hidden="true"
                  className="h-px w-15 bg-(--accent) md:w-18"
                />
                <span>Journey</span>
                <span
                  aria-hidden="true"
                  className="h-px w-15 bg-(--accent) md:w-18"
                />
              </div>
              <h2 id="journey-heading" className={sectionTitle}>
                How I got <span className={gradientText}>here.</span>
              </h2>
            </div>
          </Reveal>

          <ol className="mx-auto mt-14 max-w-3xl">
            {timeline.map(({ year, title, description, icon: Icon }, index) => {
              const isFirst = index === 0;
              const isLast = index === timeline.length - 1;

              return (
                <li
                  key={`${title}-${index}`}
                  className="group relative pb-14 pl-16 last:pb-0 md:pl-20"
                >
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[19px] top-5 h-full w-0.5 rounded-full bg-(--accent)/30"
                    />
                  )}

                  <span className="absolute left-0 top-0 h-10 w-10">
                    {isFirst && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-ping rounded-full bg-(--accent)/50 motion-reduce:animate-none"
                      />
                    )}
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-(--dark)">
                      <span
                        className={`flex h-full w-full items-center justify-center rounded-full border-4 border-(--dark) transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none ${
                          isFirst
                            ? "bg-(--accent) text-black"
                            : "bg-(--accent)/25 text-(--accent-light)"
                        }`}
                      >
                        <Icon
                          className="h-4 w-4"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </span>

                  <Reveal delay={index * 80}>
                    <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none">
                      <p
                        className={`${mono} text-xs font-medium uppercase tracking-[0.15em] text-(--accent-light)`}
                      >
                        {year}
                      </p>
                      <h3
                        className={`${display} text-2xl font-bold text-(--text) transition-colors duration-300 group-hover:text-(--accent-light)`}
                      >
                        {title}
                      </h3>
                      <p className="max-w-2xl text-base leading-relaxed text-(--text-muted)">
                        {description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </section>

        {/* =================================================
            CALL TO ACTION
        ================================================= */}
        <section aria-label="Contact and projects" className="mt-24 md:mt-32">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/#contact" className={primaryButton}>
                  Contact Me
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link href="/projects" className={secondaryButton}>
                  View my projects
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}