// src/components/experience/ExperienceModal.tsx
"use client";

import { useId, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Users,
  X,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import type { ExperienceItem } from "@/data/experience";

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

export default function ExperienceModal({ item, onClose }: ExperienceModalProps) {
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