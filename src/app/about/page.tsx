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
import SkillMeter from "@/components/about/SkillMeter";
import { PROFILE } from "@/data/profile";

export const metadata: Metadata = {
  title: `About | ${PROFILE.name}`,
  description: `${PROFILE.name} is a Software Engineering student and Full Stack Developer. Learn about my skills, principles, current focus and journey.`,
};

/* ---------------------------------------------------------------
   CONTENT (edit the wording and numbers here)
---------------------------------------------------------------- */
const ROLE = "Full Stack Developer";
const AVAILABILITY = "Open to internships & roles";
const CV_URL = "/cv.pdf"; // file in the public folder
const FOCUS_IMAGE = "/logo.jpg"; // file in the public folder: your logo or photo

/* Skill percentages are PLACEHOLDERS. Set each number (0 to 100) to an
   honest estimate of how comfortable you are with that tool. */
const skillGroups = [
  {
    title: "Frontend",
    icon: Monitor,
    skills: [
      { name: "HTML & CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 75 },
      { name: "NestJS", level: 65 },
      { name: "REST APIs", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "Prisma", level: 65 },
    ],
  },
  {
    title: "Tools & workflow",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Figma", level: 70 },
      { name: "Testing", level: 65 },
      { name: "Debugging", level: 75 },
      { name: "Docker", level: 55 },
      { name: "Deployment", level: 65 },
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

// Same order and wording as your file. The first item is highlighted.
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

/* ---------------------------------------------------------------
   Shared styles. Fonts fall back to the normal fonts if Syne or
   DM Mono are not loaded.
---------------------------------------------------------------- */
const display = "font-['Syne',sans-serif]";
const mono = "font-['DM_Mono',ui-monospace,monospace]";

const sectionTitle = `${display} text-4xl font-bold tracking-[-0.03em] text-(--text) sm:text-5xl`;

const gradientText =
  "bg-linear-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent";

const cardClass =
  "rounded-3xl border border-(--border) bg-white/[0.025]";

const primaryButton =
  `group inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 px-7 py-4 ${mono} ` +
  "text-xs font-bold uppercase tracking-[0.13em] text-white shadow-lg " +
  "transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 " +
  "hover:shadow-orange-500/30 motion-reduce:transition-none " +
  "motion-reduce:hover:translate-y-0 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-orange-400";

const secondaryButton =
  `group inline-flex items-center justify-center gap-3 rounded-full border-2 border-blue-600 bg-blue-900/40 px-7 py-4 ${mono} ` +
  "text-xs font-bold uppercase tracking-[0.13em] text-white " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 " +
  "hover:bg-orange-500 motion-reduce:transition-none " +
  "motion-reduce:hover:translate-y-0 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-orange-400";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-(--blue) text-(--text)">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-(--amber) opacity-[0.05] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-(--amber) opacity-[0.04] blur-[150px]"
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
                className={`${display} ${gradientText} text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.03em]`}
              >
                About Me
              </h1>
              <p className="mt-5 text-base text-(--text-muted) sm:text-lg">
                Software Engineering student &amp; {ROLE}
              </p>
            </header>
          </Reveal>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Portrait */}
            <Reveal delay={100} className="mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-blue-500 opacity-[0.08] blur-2xl"
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

                  <figcaption className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
                    </span>
                    {AVAILABILITY}
                  </figcaption>
                </figure>
              </div>
            </Reveal>

            {/* Intro copy */}
            <Reveal delay={200} className="flex flex-col justify-center">
              <h2
                className={`${display} text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-(--text)`}
              >
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
                  projects end-to-end &mdash; from polished frontend experiences
                  to robust backend systems &mdash; with a focus on performance,
                  scalability, usability, and long-term maintainability.
                </p>
                <p>
                  I believe great software begins with understanding the
                  problem&mdash;not just writing the code. That&rsquo;s why I
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
            SKILLS BY PERCENT
        ================================================= */}
        <section aria-labelledby="skills-heading" className="mt-24 md:mt-32">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="skills-heading" className={sectionTitle}>
                Technical <span className={gradientText}>skills.</span>
              </h2>
              <p className="mt-5 leading-8 text-(--text-muted)">
                How comfortable I feel with the tools I use most, and I&rsquo;m
                still improving every one of them.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {skillGroups.map(({ title, icon: Icon, skills }, groupIndex) => (
              <Reveal key={title} delay={groupIndex * 120} className="h-full">
                <div className={`${cardClass} h-full p-6 md:p-8`}>
                  <div className="mb-8 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className={`${display} text-xl font-bold text-(--text)`}>
                      {title}
                    </h3>
                  </div>

                  <ul className="space-y-5">
                    {skills.map((skill, index) => (
                      <li key={skill.name}>
                        <SkillMeter
                          name={skill.name}
                          level={skill.level}
                          delay={index * 90}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-6 text-(--text-muted)">
            Percentages are my own estimates of confidence and experience, not a
            formal test.
          </p>
        </section>

        {/* =================================================
            PRINCIPLES
        ================================================= */}
        <section aria-labelledby="principles-heading" className="mt-24 md:mt-32">
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
              <Reveal key={title} delay={(index % 3) * 100}>
                <div
                  className={`${cardClass} group h-full p-7 transition-all duration-300 hover:border-(--accent)/30 hover:bg-white/[0.04]`}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-(--accent)/10">
                    <Icon
                      className="h-5 w-5 text-(--text-muted) transition-colors group-hover:text-(--accent)"
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
                className={`${mono} mb-4 flex items-center justify-center gap-4 text-[0.7rem] uppercase tracking-[0.2em] text-orange-500`}
              >
                <span aria-hidden="true" className="h-px w-8 bg-orange-500 md:w-12" />
                <span>Journey</span>
                <span aria-hidden="true" className="h-px w-8 bg-orange-500 md:w-12" />
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
                  {/* Vertical line: runs from this icon's centre to the next one's.
                      It is positioned on the <li> (not inside Reveal), so it sits
                      exactly under the icon centre (left 19px + half of 2px = 20px). */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[19px] top-5 h-full w-0.5 rounded-full bg-blue-500/30"
                    />
                  )}

                  {/* Icon marker: centred ON the line (40px wide, so centre = 20px).
                      Also kept outside Reveal: Reveal uses a transform, which would
                      otherwise move this absolute icon away from the line. */}
                  <span className="absolute left-0 top-0 h-10 w-10">
                    {isFirst && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-ping rounded-full bg-orange-500/50 motion-reduce:animate-none"
                      />
                    )}
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-(--blue)">
                      <span
                        className={`flex h-full w-full items-center justify-center rounded-full border-4 border-(--blue) text-white transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none ${
                          isFirst ? "bg-orange-500" : "bg-blue-500"
                        }`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                    </span>
                  </span>

                  {/* Text */}
                  <Reveal delay={index * 80}>
                    <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none">
                      <p
                        className={`${mono} text-xs font-medium uppercase tracking-[0.15em] text-blue-500`}
                      >
                        {year}
                      </p>
                      <h3
                        className={`${display} text-2xl font-bold text-(--text) transition-colors duration-300 group-hover:text-orange-500`}
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
        <section aria-labelledby="cta-heading" className="mt-24 md:mt-32">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
            

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                >
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