"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { usePathname } from "next/navigation";
import AboutStats from "./AboutStats";

export default function AboutContent() {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] || "en";

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] ">
      {/* Left: Portrait panel */}
      <div className="relative">
        <div className="group relative h-full overflow-hidden   border-(--border,rgba(255,255,255,0.1)) bg-neutral-900/50">
          <div className="relative aspect-4/5 w-full lg:aspect-auto lg:h-full lg:min-h-160px">
            <Image
              src="/images/about/about.jpg"
              alt="Bewket Mengie"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 to-transparent" />
          </div>

          {/* Glass role chip */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2   px-3.5 py-2 ">
            <span className="font-mono text-[0.99rem] uppercase tracking-widest text-white">
              Full Stack Developer
            </span>
          </div>
        </div>
      </div>

      {/* Right: About text */}
      <div className="relative overflow-hidden     from-white/[0.07] via-white/3 to-transparent p-6 backdrop-blur-sm md:p-10">
        {/* Soft accent glow, top-right */}

        <div className="relative">
          {/* Headline */}
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-(--text)">
            I build digital experiences that turn{" "}
            <span className="text-(--accent,var(--purple))">ideas into impact.</span>
          </h2>

          {/* Story block */}
          <div className="mt-8 space-y-5 border-l-4 border-(--green,var(--accent)) pl-4 md:pl-6">
            <p className="text-base leading-[1.8] text-neutral-300 md:text-lg">
              I&rsquo;m{" "}
              <span className="font-semibold text-white">
                Bewket Mengie
              </span>
              , a{" "}
              <span className="text-(--accent,var(--purple))] font-medium">Full Stack Developer</span>{" "}
              who enjoys solving complex problems through thoughtful design, clean code, and modern engineering practices. From polished frontend experiences to robust backend systems, I build software with a focus on performance, scalability, usability, and maintainability.
            </p>

            <p className="max-w-2xl text-base leading-[1.8] text-neutral-300 md:text-lg">
              I believe great software begins with understanding the problem&mdash;not just writing the code. That&rsquo;s why I approach each project from requirements analysis to architecture, implementation, testing, deployment, and continuous improvement.
            </p>
          </div>

          {/* Principles Component */}
          <AboutStats />

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/${lang}/about`}
              className="group inline-flex items-center gap-3 rounded-full border border-neutral-700 bg-neutral-900/60 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-500/10"
            >
              More About Me
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="/cv.pdf"
              download
              className="group inline-flex items-center gap-3 rounded-full border border-neutral-700 bg-neutral-900/60 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-500/10"
            >
              Download CV
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}