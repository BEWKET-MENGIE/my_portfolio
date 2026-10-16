"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";

const processSteps = [
  "Understand",
  "Analyze",
  "Design",
  "Build",
  "Test",
  "Deploy",
  "Maintain",
  "Iterate",
  "Improve",
];

const phrases = [
  "Software Engineer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Problem Solver",
  "Open Source Contributor",
];

export default function HeroContent() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Detect the OS "reduce motion" setting.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setReduceMotion(event.matches);

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Typing effect
  useEffect(() => {
    // With reduced motion, show a static phrase instead of typing.
    if (reduceMotion) {
      setDisplayText(phrases[0]);
      return;
    }

    const currentPhrase = phrases[loopNum % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText === currentPhrase) {
        timeout = setTimeout(() => setIsDeleting(true), 1800);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 90);
      }
    } else if (displayText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      }, 500);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, 45);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, loopNum, reduceMotion]);

  // Development process highlight
  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processSteps.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 pt-24 md:flex-row md:items-center md:gap-16">
      {/* LEFT COLUMN: Typing text & CTA */}
      <div className="flex flex-1 flex-col justify-center gap-7 self-stretch pb-12 md:pb-0">
        <div className="flex min-h-12 items-center gap-3">
          <p className="font-mono text-[0.95rem] uppercase tracking-[0.18em] text-(--purple) drop-shadow-[0_0_10px_rgba(192,132,252,0.35)] sm:text-base">
            {/* Screen readers get the full list once; the typing is visual only. */}
            <span className="sr-only">{phrases.join(", ")}</span>
            <span aria-hidden="true" className="inline-block min-w-[26ch]">
              {displayText}
              <span
                className={`ml-1 inline-block h-[1em] w-0.5 bg-(--purple) align-middle ${
                  reduceMotion ? "" : "animate-pulse"
                }`}
              />
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="group inline-flex items-center gap-2 rounded-[80px] border border-emerald-500/40 bg-emerald-600/20 px-6 py-3.5 text-sm font-bold text-(--yellow) transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600/30 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            View My Work
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </button>
        </div>
      </div>

      {/* VERTICAL DIVIDER & SCROLL BUTTON */}
      <div className="relative mx-auto flex w-10 flex-col items-center self-stretch">
        <span className="min-h-[80px] w-px flex-1 bg-linear-to-b from-transparent via-emerald-500/50 to-emerald-500" />
        <span className="relative z-10 my-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] backdrop-blur-md">
          <Code2 size={20} />
        </span>
        <span className="min-h-[80px] w-px flex-1 bg-linear-to-b from-emerald-500 via-emerald-500/50 to-transparent" />

        <button
          type="button"
          onClick={() => scrollToSection("about")}
          aria-label="Scroll to about section"
          className="group mt-4 flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-emerald-400/60 transition-colors duration-300 group-hover:text-emerald-400">
            Scroll
          </span>
          <div className="flex h-11 w-6 justify-center rounded-full border border-emerald-500/30 bg-(--dark)/50 pt-2 backdrop-blur-md transition-all duration-300 group-hover:border-emerald-400 group-hover:bg-emerald-500/5 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="h-2.5 w-1 animate-bounce rounded-full bg-emerald-400 motion-reduce:animate-none" />
          </div>
        </button>
      </div>

      {/* RIGHT COLUMN: Name & development process */}
      <div className="flex flex-[1.5] flex-col justify-center gap-15 self-stretch pb-20 md:pb-0">
        <h1 className="text-[clamp(3rem,7vw,4rem)] font-bold leading-[0.95] tracking-[-0.055em] text-(--text) drop-shadow-[0_0_25px_rgba(0,0,0,0.35)]">
          Hello, I&apos;m
          <br />
          <span className="text-(--purple)">Bewket Mengie.</span>
        </h1>

        <div className="mt-6 md:mt-12">
          <ol
            aria-label="Development process"
            className="flex flex-wrap items-center gap-x-3 gap-y-5"
          >
            {processSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-x-3">
                <span
                  className={`text-[0.99rem] uppercase tracking-widest transition-all duration-500 motion-reduce:transition-none ${
                    index === currentStep
                      ? "scale-110 font-bold text-(--green) drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                      : "text-(--text-muted) opacity-80"
                  }`}
                >
                  {step}
                </span>
                {index < processSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`text-base transition-colors duration-500 ${
                      index < currentStep
                        ? "text-emerald-400"
                        : "text-(--text-muted) opacity-30"
                    }`}
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}