// src/components/about/AboutContent.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Eye, X } from "lucide-react";
import { PROFILE } from "@/data/profile";
import AboutStats from "./AboutStats";

const buttonBase =
  "group inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-xs " +
  "font-bold uppercase tracking-[0.15em] transition-all duration-300 " +
  "hover:-translate-y-0.5 motion-reduce:transition-none " +
  "motion-reduce:hover:translate-y-0 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-emerald-400";

export default function AboutContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Left: portrait */}
        <figure
          className="group relative m-0 overflow-hidden rounded-3xl border
            border-neutral-200 bg-neutral-200 shadow-sm
            dark:border-white/10 dark:bg-neutral-900/50 dark:shadow-none"
        >
          <div className="relative aspect-4/5 w-full lg:aspect-auto lg:h-full lg:min-h-[28rem]">
            <Image
              src={PROFILE.image}
              alt={`Portrait of ${PROFILE.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top transition-transform duration-700
                group-hover:scale-105 motion-reduce:transition-none"
            />

            {/* Bottom fade so the caption stays readable */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3
                bg-gradient-to-t from-black/80 to-transparent"
            />
          </div>

          <figcaption
            className="absolute bottom-4 left-4 rounded-full border border-white/20
              bg-black/40 px-4 py-2 font-mono text-xs uppercase tracking-widest
              text-white backdrop-blur-md"
          >
            {PROFILE.role}
          </figcaption>
        </figure>

        {/* Right: text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
            I build digital experiences that turn{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              ideas into impact.
            </span>
          </h2>

          <div className="mt-8 space-y-5 border-l-4 border-emerald-500 pl-4 md:pl-6">
            <p className="text-base leading-[1.8] text-neutral-600 md:text-lg dark:text-neutral-300">
              I&rsquo;m{" "}
              <span className="font-semibold text-neutral-900 dark:text-white">
                {PROFILE.name}
              </span>
              , a student at{" "}
              <span className="font-semibold text-neutral-900 dark:text-white">
                {PROFILE.education}
              </span>{" "}
              and a{" "}
              <span className="font-medium text-emerald-700 dark:text-emerald-400">
                {PROFILE.role}
              </span>{" "}
              who enjoys solving complex problems through thoughtful design,
              clean code, and modern engineering practices. From polished
              frontend experiences to robust backend systems, I build software
              with a focus on performance, scalability, usability, and
              maintainability.
            </p>

            <p className="max-w-2xl text-base leading-[1.8] text-neutral-600 md:text-lg dark:text-neutral-300">
              I believe great software begins with understanding the
              problem&mdash;not just writing the code. That&rsquo;s why I
              approach each project from requirements analysis to architecture,
              implementation, testing, deployment, and continuous improvement.
            </p>
          </div>

          <AboutStats />

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/about"
              className={`${buttonBase} bg-emerald-500 text-black hover:bg-emerald-400`}
            >
              More About Me
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className={`${buttonBase} border border-neutral-300 text-neutral-800
                hover:border-emerald-500 hover:text-emerald-700
                dark:border-neutral-700 dark:text-white dark:hover:text-emerald-300`}
            >
              Preview CV
              <Eye className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href={PROFILE.cv}
              download
              className={`${buttonBase} border border-neutral-300 text-neutral-800
                hover:border-emerald-500 hover:text-emerald-700
                dark:border-neutral-700 dark:text-white dark:hover:text-emerald-300`}
            >
              Download CV
              <Download
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      {/* CV Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative h-[85vh] w-full max-w-4xl rounded-2xl bg-neutral-900 p-4 shadow-2xl border border-white/10">
            <div className="mb-3 flex items-center justify-between px-2">
              <h3 className="font-mono text-sm uppercase text-white">
                Curriculum Vitae Preview
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE.cv}
                  download
                  className="flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="rounded-full p-1 text-neutral-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <iframe
              src={PROFILE.cv}
              className="h-[calc(100%-2.5rem)] w-full rounded-xl border-none bg-white"
              title="CV Preview"
            />
          </div>
        </div>
      )}
    </>
  );
}
