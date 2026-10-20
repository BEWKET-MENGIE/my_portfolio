// src/components/experience/Experience.tsx
// SINGLE-FILE VERSION: data, pop-up and cards all live in this one file,
// so there is nothing else to import. Replace your Experience.tsx with this.
"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Code2,
  Cog,
  ExternalLink,
  GraduationCap,
  MapPin,
  Users,
  X,
} from "lucide-react";

/* ===============================================================
   1. DATA (edit your experiences here)
=============================================================== */

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  project?: string;
  team?: string;
  /** Optional: shows a "View project" button in the pop-up. */
  link?: string;
  current?: boolean;
};

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full-Stack Developer & Senior Undergraduate",
    company: "University Software Engineering Program",
    period: "2022 - Present (Expected Graduation 2026)",
    type: "Academic & Leadership",
    location: "Campus / Remote",
    description:
      "Advancing through a rigorous 4th-year Software Engineering curriculum, balancing advanced computer science theory with end-to-end production-grade software development, system analysis, and team architecture design.",
    highlights: [
      "Serving as lead developer for major 4th-year capstone and graduation software engineering projects.",
      "Architecting scalable full-stack applications integrating modern frontend frameworks with robust microservices and relational databases.",
      "Applying advanced software engineering patterns, object-oriented design, test-driven development, and clean architecture principles.",
      "Collaborating closely with multidisciplinary student engineering teams using Agile/Scrum methodologies, Git workflows, and CI/CD pipelines.",
    ],
    skills: [
      "Software Architecture",
      "System Design",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Algorithms",
      "Agile / Scrum",
    ],
    project: "Final Year Capstone Project",
    team: "Lead Student Architect",
    current: true,
  },
  {
    id: "exp-2",
    role: "Full-Stack Developer",
    company: "Freelance / Project-Based",
    period: "2025 - Present",
    type: "Freelance",
    location: "Remote",
    description:
      "Developing modern full-stack web applications for real-world business and academic requirements, covering the complete development lifecycle from requirements analysis and system design to implementation, testing, and deployment.",
    highlights: [
      "Built responsive and accessible interfaces using Next.js, React, TypeScript, and Tailwind CSS.",
      "Developed RESTful backend APIs and business logic using NestJS and Node.js.",
      "Designed relational databases using PostgreSQL and Prisma ORM.",
      "Implemented authentication, authorization, validation, and role-based access control.",
      "Applied reusable architecture and component-based development to improve maintainability.",
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    project: "Full-Stack Web Applications",
    team: "Independent",
    current: true,
  },
  {
    id: "exp-3",
    role: "Full-Stack Developer",
    company: "Management System Projects",
    period: "2024 - 2025",
    type: "Project-Based",
    location: "Remote",
    description:
      "Designed and developed management systems as practical software engineering projects, applying real-world development practices across frontend, backend, database, authentication, and system architecture.",
    highlights: [
      "Developed responsive dashboards and management interfaces with reusable React and Next.js components.",
      "Created backend APIs for users, authentication, records, and business workflows.",
      "Designed normalized database schemas and relationships for structured application data.",
      "Implemented form validation, error handling, and role-based application workflows.",
      "Used Git and GitHub for source control, version management, and project organization.",
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MySQL",
      "Git",
      "GitHub",
    ],
    project: "Management System Applications",
    team: "Individual / Academic",
  },
  {
    id: "exp-4",
    role: "Frontend Developer",
    company: "Personal & Open Source Projects",
    period: "2023 - 2024",
    type: "Development",
    location: "Remote",
    description:
      "Focused on building modern, responsive, and user-friendly web interfaces while developing a strong foundation in frontend engineering, UI implementation, and reusable component architecture.",
    highlights: [
      "Converted design concepts and UI requirements into responsive React interfaces.",
      "Created reusable components to improve consistency and development speed.",
      "Implemented responsive layouts for desktop, tablet, and mobile devices.",
      "Improved interface usability through clear navigation and consistent visual patterns.",
      "Used Git and GitHub to manage source code and development history.",
    ],
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Git",
      "GitHub",
    ],
    project: "Frontend Applications",
    team: "Individual",
  },
];

/* ===============================================================
   2. POP-UP SHELL (native <dialog>)
=============================================================== */

interface ModalProps {
  /** Called after the closing animation finishes. Unmount the modal here. */
  onClose: () => void;
  /** id of the element inside that names the dialog (for screen readers). */
  labelledBy: string;
  /** Receives `close`, which plays the exit animation and then calls onClose. */
  children: (api: { close: () => void }) => ReactNode;
}

const EXIT_MS = 250;

/* A pop-up built on the browser's own <dialog>. For free it gives us:
   focus kept inside, the page behind made inert, and Esc to close.
   On top of that this adds: enter/exit animation, no page scroll behind,
   click-on-backdrop to close, and focus returned to the button that opened it. */
function Modal({ onClose, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => setShown(true)); // start enter animation

    return () => {
      cancelAnimationFrame(frame);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  const close = () => {
    if (closeTimer.current) return; // already closing

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }

    setShown(false); // play the exit animation, then unmount
    closeTimer.current = setTimeout(onClose, EXIT_MS);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      // Esc: run our animated close instead of the instant native one.
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      // A click on the dark backdrop lands on the <dialog> itself.
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className={`m-auto max-h-[88vh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden
        rounded-3xl border border-neutral-200 bg-white p-0 text-neutral-900
        shadow-2xl transition-all duration-300 ease-out
        open:flex open:flex-col
        backdrop:bg-black/60 backdrop:backdrop-blur-sm
        backdrop:transition-opacity backdrop:duration-300
        motion-reduce:transition-none motion-reduce:backdrop:transition-none
        dark:border-white/10 dark:bg-[#070b1d] dark:text-white
        ${
          shown
            ? "translate-y-0 scale-100 opacity-100 backdrop:opacity-100"
            : "translate-y-4 scale-95 opacity-0 backdrop:opacity-0"
        }`}
    >
      {children({ close })}
    </dialog>
  );
}

/* ===============================================================
   3. DETAILS POP-UP
=============================================================== */

interface ExperienceModalProps {
  item: ExperienceItem;
  onClose: () => void;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
      {children}
    </h3>
  );
}

function ExperienceModal({ item, onClose }: ExperienceModalProps) {
  const titleId = useId();

  return (
    <Modal onClose={onClose} labelledBy={titleId}>
      {({ close }) => (
        <>
          {/* Header */}
          <div className="relative shrink-0 border-b border-neutral-200 p-6 pr-16 sm:p-8 sm:pr-20 dark:border-white/10">
            <button
              type="button"
              onClick={close}
              aria-label="Close details"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center
                rounded-full border border-neutral-200 text-neutral-600
                transition-colors hover:border-emerald-500 hover:text-emerald-600
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-emerald-400 dark:border-white/15
                dark:text-neutral-300 dark:hover:text-emerald-400"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                {item.type}
              </span>
              {item.current && (
                <span className="rounded-full border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  Current
                </span>
              )}
            </div>

            <h2
              id={titleId}
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {item.role}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">
              <BriefcaseBusiness
                className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              {item.company}
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                {item.period}
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                {item.location}
              </li>
            </ul>
          </div>

          {/* Scrollable body */}
          <div className="min-h-0 flex-1 space-y-8 overflow-y-auto p-6 sm:p-8">
            <section>
              <SectionTitle>Overview</SectionTitle>
              <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300">
                {item.description}
              </p>
            </section>

            {(item.project || item.team) && (
              <section>
                <div className="grid gap-3 sm:grid-cols-2">
                  {item.project && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Context / Focus
                      </p>
                      <p className="text-sm font-semibold">{item.project}</p>
                    </div>
                  )}
                  {item.team && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                      <p className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        <Users className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        Role context
                      </p>
                      <p className="text-sm font-semibold">{item.team}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            <section>
              <SectionTitle>Key achievements &amp; responsibilities</SectionTitle>
              <ul className="space-y-3">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionTitle>Skills &amp; technologies</SectionTitle>
              <ul className="flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs text-neutral-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-neutral-200 p-4 sm:flex-row sm:justify-end sm:px-8 dark:border-white/10">
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold
                text-neutral-700 transition-colors hover:border-emerald-500
                hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-emerald-400 dark:border-white/15 dark:text-neutral-300
                dark:hover:text-emerald-400"
            >
              Close
            </button>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border
                  border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700
                  transition-colors hover:border-emerald-500 hover:text-emerald-600
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-emerald-400 dark:border-white/15
                  dark:text-neutral-300 dark:hover:text-emerald-400"
              >
                View project
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}

            <Link
              href="/#contact"
              onClick={close}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500
                px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-emerald-400
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </>
      )}
    </Modal>
  );
}

/* ===============================================================
   4. THE SECTION (compact cards)
=============================================================== */

const MAX_SKILLS_ON_CARD = 4;

// Badge colors for each work type (light and dark mode).
const workTypeStyles: Record<string, string> = {
  "Academic & Leadership":
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Freelance:
    "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  "Project-Based":
    "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Development:
    "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300",
  Internship:
    "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300",
};

const defaultTypeStyle =
  "border-neutral-300 bg-neutral-100 text-neutral-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300";

export default function Experience() {
  // The experience whose details pop-up is open (null = closed).
  const [selected, setSelected] = useState<ExperienceItem | null>(null);

  return (
    <div>
      {/* Availability note */}
      <div className="mb-8 flex justify-center">
        <p
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20
            bg-emerald-500/5 px-4 py-2 text-xs font-medium text-emerald-800
            sm:text-sm dark:text-emerald-200"
        >
          <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-30 motion-reduce:animate-none" />
            <Cog className="relative h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </span>
          Open to graduate engineering roles, internships &amp; remote opportunities
        </p>
      </div>

      {/* Compact cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {experienceData.map((item) => {
          const Icon = item.type === "Academic & Leadership" ? GraduationCap : Code2;
          const visibleSkills = item.skills.slice(0, MAX_SKILLS_ON_CARD);
          const hiddenCount = item.skills.length - visibleSkills.length;

          return (
            <article
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border
                border-neutral-200 bg-white p-5 shadow-sm
                transition-all duration-300 hover:-translate-y-0.5
                hover:border-emerald-500/50 hover:shadow-lg
                motion-reduce:transition-none motion-reduce:hover:translate-y-0
                has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-400
                dark:border-white/10 dark:bg-white/[0.02] dark:shadow-none
                dark:hover:shadow-none sm:p-6"
            >
              {/* Animated top line */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0
                  bg-emerald-500 transition-transform duration-500 group-hover:scale-x-100"
              />

              {/* Badges + icon */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      workTypeStyles[item.type] ?? defaultTypeStyle
                    }`}
                  >
                    {item.type}
                  </span>
                  {item.current && (
                    <span className="rounded-full border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      Current
                    </span>
                  )}
                </div>

                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                    bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
              </div>

              {/* Role + company */}
              <h3
                className="mt-4 line-clamp-2 text-lg font-bold leading-snug tracking-tight
                  text-neutral-900 transition-colors duration-300
                  group-hover:text-emerald-600 dark:text-white
                  dark:group-hover:text-emerald-300"
              >
                {item.role}
              </h3>

              <p className="mt-1.5 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                <BriefcaseBusiness
                  className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <span className="truncate">{item.company}</span>
              </p>

              <p
                className="mt-1.5 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400"
                title={item.period}
              >
                <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{item.period}</span>
              </p>

              {/* Short summary: two lines only. The full text is in the pop-up. */}
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>

              {/* Top skills + open button */}
              <div className="mt-4 flex items-end justify-between gap-3">
                <ul
                  aria-label={`Main skills for ${item.role}`}
                  className="flex flex-wrap gap-1.5"
                >
                  {visibleSkills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5
                        text-xs text-neutral-700 dark:border-white/10
                        dark:bg-white/[0.04] dark:text-neutral-300"
                    >
                      {skill}
                    </li>
                  ))}
                  {hiddenCount > 0 && (
                    <li className="rounded-md px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      +{hiddenCount} more
                    </li>
                  )}
                </ul>

                {/* A real button. Its ::after stretches over the whole card, so a
                    click anywhere opens the pop-up while keyboard users get one
                    labelled control. (No transform on the button itself, or the
                    stretch would break.) */}
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  aria-haspopup="dialog"
                  aria-label={`View details for ${item.role}, ${item.company}`}
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center
                    rounded-full border border-neutral-300 text-emerald-600
                    transition-colors duration-300
                    after:absolute after:inset-0 after:z-20
                    group-hover:border-emerald-500 group-hover:bg-emerald-500
                    group-hover:text-black focus-visible:outline-none
                    dark:border-white/15 dark:text-emerald-400
                    dark:group-hover:text-black"
                >
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300
                      group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Details pop-up (mounted only while an experience is selected) */}
      {selected && (
        <ExperienceModal
          key={selected.id}
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}