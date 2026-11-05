"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Code2,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { experienceData } from "@/data/experience";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

type Item = (typeof experienceData)[number];

const display = "font-[family-name:var(--font-display,inherit)]";
const mono = "font-[family-name:var(--font-mono,monospace)]";

const typeIcons: Record<string, typeof GraduationCap> = {
  Education: GraduationCap,
  "Project work": Code2,
  "In progress": Sparkles,
};

const VISIBLE_HIGHLIGHTS = 3;

/* -------------------------------------------------------------------------- */
/*  Reveal helper                                                             */
/* -------------------------------------------------------------------------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        } else {
          setShown(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Timeline card                                                             */
/* -------------------------------------------------------------------------- */

function TimelineCard({ item }: { item: Item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const extra = item.highlights.length - VISIBLE_HIGHLIGHTS;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className="group/card relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#0b111a]/90 p-5 shadow-[0_1.2rem_3rem_rgba(0,0,0,0.25)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#65e3cf]/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8"
    >
      <div className="relative">
        <header className="flex flex-col items-start justify-between gap-3 sm:flex-row">
          <div className="min-w-0">
            <span
              className={`${mono} text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#65e3cf]`}
            >
              {item.type}
            </span>
            <h3
              className={`${display} mt-2 text-[length:clamp(1.25rem,2.4vw,1.7rem)] font-bold leading-tight tracking-tight text-white`}
            >
              {item.role || item.company}
            </h3>
            {item.role && item.company && (
              <p className="mt-2.5 flex items-center gap-2 text-sm text-slate-300">
                <BriefcaseBusiness
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-slate-400"
                />
                {item.company}
              </p>
            )}
          </div>

          {item.current && (
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#65e3cf]/20 bg-[#65e3cf]/5 px-3 py-1.5 text-[0.68rem] font-semibold text-[#a9f1e4]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#65e3cf] opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-[#65e3cf]" />
              </span>
              In progress
            </span>
          )}
        </header>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden="true" className="size-3.5" />
            {item.period}
          </span>
          {item.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-3.5" />
              {item.location}
            </span>
          )}
        </div>

        <p className="mt-5 text-[0.92rem] leading-8 text-slate-200">
          {item.description}
        </p>

        {item.project && (
          <div className="mt-5 border-l-2 border-[#65e3cf]/60 py-0.5 pl-4">
            <span
              className={`${mono} text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-slate-400`}
            >
              Focus
            </span>
            <p className="mt-1 text-sm font-semibold leading-7 text-white">
              {item.project}
            </p>
          </div>
        )}

        {item.highlights.length > 0 && (
          <section className="mt-7">
            <h4
              className={`${mono} mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-slate-400`}
            >
              Selected highlights
            </h4>
            <ul className="grid gap-3">
              {item.highlights.map((highlight, i) => (
                <li
                  key={highlight}
                  className={`${
                    i >= VISIBLE_HIGHLIGHTS && !open ? "hidden" : "grid"
                  } grid-cols-[1rem_minmax(0,1fr)] items-start gap-2.5 text-sm leading-7 text-slate-200`}
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1.5 size-4 text-[#65e3cf]"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            {extra > 0 && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md text-xs font-semibold text-[#65e3cf] transition hover:text-[#a0f4e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#65e3cf]"
              >
                {open ? "Show less" : `Show ${extra} more`}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </section>
        )}

        {item.skills.length > 0 && (
          <section className="mt-7">
            <h4
              className={`${mono} mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-slate-400`}
            >
              Tools &amp; technologies
            </h4>
            <ul className="flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[0.7rem] text-slate-200 transition hover:border-[#65e3cf]/40 hover:text-white"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {item.projectsHref && (
          <Link
            href={item.projectsHref}
            className="group/link mt-7 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-[#65e3cf] transition hover:text-[#a0f4e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#65e3cf]"
          >
            Explore related projects
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
            />
          </Link>
        )}
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page Component                                                            */
/* -------------------------------------------------------------------------- */

export default function Experience({
  as: Heading = "h1",
}: {
  as?: "h1" | "h2";
}) {
  // Split items evenly or place the last item explicitly on the right column
  const midPoint = Math.ceil(experienceData.length / 2);
  const leftItems = experienceData.slice(0, midPoint);
  const rightItems = experienceData.slice(midPoint);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative isolate min-h-screen  px-4 pb-28 pt-20 text-[#f3f6fa] sm:px-6 sm:pt-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Top Centered Title */}
        <div className="mb-20 text-center">
          <Heading
            id="experience-heading"
            className={`${display} text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl`}
          >
            Experience
          </Heading>
        </div>

        {/* Two Column Tracks */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left Column */}
          <div>
            <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12">
              {leftItems.map((item) => {
                const Icon = typeIcons[item.type] ?? Code2;
                return (
                  <div key={item.id} className="relative">
                    {/* Timeline Node Marker */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex size-8 items-center justify-center rounded-full border border-[#65e3cf]/40 bg-[#0a111a] text-[#65e3cf] shadow-[0_0_0_4px_#070b13]"
                    >
                      <Icon className="size-4" />
                    </div>

                    <Reveal>
                      <TimelineCard item={item} />
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (Includes the final/bottom card) */}
          <div>
            <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12">
              {rightItems.map((item) => {
                const Icon = typeIcons[item.type] ?? Code2;
                return (
                  <div key={item.id} className="relative">
                    {/* Timeline Node Marker */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex size-8 items-center justify-center rounded-full border border-[#65e3cf]/40 bg-[#0a111a] text-[#65e3cf] shadow-[0_0_0_4px_#070b13]"
                    >
                      <Icon className="size-4" />
                    </div>

                    <Reveal>
                      <TimelineCard item={item} />
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}