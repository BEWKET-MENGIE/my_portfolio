// src/components/experience/Experience.tsx
"use client";

import React from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Code2,
  ExternalLink,
  MapPin,
  Users,
  GraduationCap,
  Cog,
} from "lucide-react";

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
  link?: string;
  current?: boolean;
};

const experienceData: ExperienceItem[] = [
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

const workTypeStyles: Record<string, string> = {
  "Academic & Leadership": "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Freelance: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  "Project-Based": "border-blue-400/20 bg-blue-400/10 text-blue-300",
  Development: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  Internship: "border-violet-400/20 bg-violet-400/10 text-violet-300",
  Remote: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden py-20 md:py-28 bg-[var(--background)]"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2">
            <GraduationCap className="h-5 w-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
              Academic &amp; Professional Journey
            </span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Experience <span className="text-amber-300">&amp; Growth</span>
          </h2>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-40" />
              <Cog className="relative h-4 w-4 text-amber-400" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-purple-200">
              Open to graduate engineering roles, internships &amp; remote opportunities
            </span>
          </div>
        </div>

        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {experienceData.map((item, index) => (
            <article
              key={item.id}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-gray-800 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-white/[0.04] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-8"
            >
              {/* Animated top border */}
              <div className="absolute left-0 right-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
              
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-white/5 px-3 py-1.5 text-xs font-semibold text-amber-200">
                    <CalendarDays className="h-3.5 w-3.5 text-amber-400" />
                    {item.period}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    {item.location}
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          workTypeStyles[item.type] ??
                          "border-gray-800 bg-white/5 text-gray-300"
                        }`}
                      >
                        {item.type}
                      </span>
                      {item.current && (
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-semibold text-emerald-300">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-200 sm:text-3xl">
                      {item.role}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                      <BriefcaseBusiness className="h-4 w-4 text-amber-400" />
                      <span>{item.company}</span>
                    </div>
                  </div>

                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-800 bg-white/5 text-emerald-400 sm:flex">
                    {index === 0 ? (
                      <GraduationCap className="h-6 w-6" />
                    ) : (
                      <Code2 className="h-6 w-6" />
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-6 text-sm leading-relaxed text-gray-300 sm:text-[15px]">
                  {item.description}
                </p>

                {/* PROJECT / TEAM INFO */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {item.project && (
                    <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4">
                      <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                        Context / Focus
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {item.project}
                      </div>
                    </div>
                  )}

                  {item.team && (
                    <div className="rounded-xl border border-gray-800 bg-white/[0.02] p-4">
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gray-400">
                        <Users className="h-4 w-4" />
                        Role Context
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {item.team}
                      </div>
                    </div>
                  )}
                </div>

                {/* KEY ACHIEVEMENTS */}
                <div className="mt-7">
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-gray-300">
                    Key Achievements &amp; Responsibilities
                  </h4>
                  <ul className="space-y-3">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-gray-200"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* TECHNOLOGIES & LINK */}
              <div className="mt-7 border-t border-gray-800 pt-6">
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                  Core Skills &amp; Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-gray-800 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-amber-200 transition-all duration-300 hover:border-amber-500/40 hover:bg-amber-500/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {item.link && (
                  <div className="mt-6">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 transition-colors hover:text-amber-400"
                    >
                      View Project
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>

              <ArrowUpRight className="pointer-events-none absolute bottom-6 right-6 h-5 w-5 text-gray-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber-400/80" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}