// src/components/hero/HeroContent.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";

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

/* "Scroll" label + mouse pill. Used on desktop (end of the divider line)
   and on mobile (pinned to the bottom center). */
function ScrollIndicator({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll to about section"
      className={`group flex flex-col items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) ${className}`}
    >
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-(--accent-light)/70 transition-colors duration-300 group-hover:text-(--accent-light)">
        Scroll
      </span>
      <div className="flex h-11 w-6 justify-center rounded-full border border-(--accent)/30 bg-(--dark)/50 pt-2 backdrop-blur-md transition-all duration-300 group-hover:border-(--accent) group-hover:bg-(--accent)/10 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        <span className="h-2.5 w-1 animate-bounce rounded-full bg-(--accent) motion-reduce:animate-none" />
      </div>
    </button>
  );
}

export default function HeroContent() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const reduceMotion = useReducedMotionPreference();

  // Typing effect
  useEffect(() => {
    if (reduceMotion) {
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
    // self-stretch: this block is as tall as the hero.
    // No bottom padding here on purpose: the divider runs all the way down and
    // the scroll button sits flush with the bottom edge of the hero.
    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-14 self-stretch pt-28 md:flex-row md:items-center md:gap-10 lg:gap-14">
      {/* LEFT COLUMN (left of the divider): typing text, then the button with
          the social links directly underneath it. */}
      <div className="flex flex-1 flex-col justify-center">
        {/* The gap is the space between the typing line and the button.
            It matches the right column (name -> steps). */}
        <div className="flex flex-col gap-20 md:gap-36 md:pb-24 lg:gap-44">
          <div className="flex min-h-12 items-center gap-3">
            <p className="font-mono text-[0.95rem] uppercase tracking-[0.18em] text-(--accent-light) drop-shadow-[0_0_10px_rgba(6,182,212,0.35)] sm:text-base">
              {/* Screen readers get the full list once; the typing is visual only. */}
              <span className="sr-only">{phrases.join(", ")}</span>
              <span aria-hidden="true" className="inline-block min-w-[26ch]">
                {reduceMotion ? phrases[0] : displayText}
                <span
                  className={`ml-1 inline-block h-[1em] w-0.5 bg-(--accent) align-middle ${
                    reduceMotion ? "" : "animate-pulse"
                  }`}
                />
              </span>
            </p>
          </div>

          {/* Button + social links, stacked. gap-6 is the space between them. */}
          <div className="flex flex-col items-start gap-6">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="group inline-flex items-center gap-2 rounded-[80px] border border-(--accent)/40 bg-(--accent)/10 px-6 py-3.5 text-sm font-bold text-(--accent-light) transition-all duration-300 hover:-translate-y-1 hover:bg-(--accent) hover:text-black hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              View My Work
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </button>

            <SocialLinks />
          </div>
        </div>
      </div>

      {/* VERTICAL DIVIDER (desktop): one straight line from the top, through
          the icon, down to the scroll button at the very bottom of the hero. */}
      <div className="relative mx-auto hidden w-12 flex-col items-center self-stretch md:flex">
        <span
          aria-hidden="true"
          className="min-h-16 w-px flex-1 bg-linear-to-b from-transparent via-(--accent)/50 to-(--accent)"
        />
        <span
          aria-hidden="true"
          className="relative z-10 my-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--accent)/30 bg-(--accent)/10 text-(--accent-light) shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-md"
        >
          <Code2 size={20} />
        </span>
        <span
          aria-hidden="true"
          className="min-h-16 w-px flex-1 bg-linear-to-b from-(--accent) to-(--accent)/40"
        />

        {/* mb-0: the pill touches the bottom edge of the hero.
            If you want a little air later, change mb-0 to mb-3. */}
        <ScrollIndicator onClick={() => scrollToSection("about")} className="mb-0 mt-3" />
      </div>

      {/* RIGHT COLUMN: name, then development process.
          gap-20 (mobile) -> md:gap-36 -> lg:gap-44 sets the space between them. */}
      <div className="flex flex-[1.5] flex-col justify-center gap-20 pb-28 md:gap-36 md:pb-24 lg:gap-44">
        <h1 className="text-[clamp(3rem,7vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.055em] text-white drop-shadow-[0_0_25px_rgba(0,0,0,0.35)]">
          Hello, I&apos;m
          <br />
          <span className="text-(--accent-light)">Bewket Mengie.</span>
        </h1>

        <ol
          aria-label="Development process"
          className="flex flex-wrap items-center gap-x-3 gap-y-5"
        >
          {processSteps.map((step, index) => (
            <li key={step} className="flex items-center gap-x-3">
              <span
                className={`text-[0.99rem] uppercase tracking-widest transition-all duration-500 motion-reduce:transition-none ${
                  index === currentStep
                    ? "scale-110 font-bold text-(--accent-light) drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]"
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
                      ? "text-(--accent)"
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

      {/* MOBILE scroll button: the divider is hidden on phones, so pin it to the bottom center */}
      <ScrollIndicator
        onClick={() => scrollToSection("about")}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 md:hidden"
      />
    </div>
  );
}