// src/components/services/ServiceModal.tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { Service } from "@/types";

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

const EXIT_MS = 250;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
      {children}
    </h3>
  );
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shown, setShown] = useState(false);
  const titleId = useId();

  /* Open with the browser's built-in modal dialog. It gives us, for free:
     focus kept inside, Esc to close, and the page behind made inert. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden"; // stop the page scrolling behind
    const frame = requestAnimationFrame(() => setShown(true)); // trigger the enter animation

    return () => {
      cancelAnimationFrame(frame);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus(); // return focus to the card that opened the modal
    };
  }, []);

  const requestClose = () => {
    if (closeTimer.current) return; // already closing

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }

    setShown(false); // play the exit animation, then unmount
    closeTimer.current = setTimeout(onClose, EXIT_MS);
  };

  const overview = service.longDescription ?? service.desc;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // Esc: run our animated close instead of the instant native one.
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      // A click on the dark backdrop lands on the <dialog> itself.
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
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
      {/* Banner */}
      <div className="relative h-40 shrink-0 bg-neutral-200 sm:h-48 dark:bg-neutral-900">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"
        />

        <button
          type="button"
          onClick={requestClose}
          aria-label="Close details"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center
            rounded-full border border-white/20 bg-black/40 text-white
            backdrop-blur-md transition-colors hover:bg-black/60
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-emerald-400"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            {service.category}
          </p>
          <h2
            id={titleId}
            className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {service.title}
          </h2>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="min-h-0 flex-1 space-y-8 overflow-y-auto p-6 sm:p-8">
        <section>
          <SectionTitle>Overview</SectionTitle>
          <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300">
            {overview}
          </p>
        </section>

        {service.features && service.features.length > 0 && (
          <section>
            <SectionTitle>What you get</SectionTitle>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center
                      rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  >
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        {service.process && service.process.length > 0 && (
          <section>
            <SectionTitle>How it works</SectionTitle>
            <ol className="space-y-4">
              {service.process.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                      bg-emerald-500 text-sm font-bold text-black"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section>
          <SectionTitle>Technologies</SectionTitle>
          <ul className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-neutral-200 bg-neutral-100 px-3 py-1.5
                  text-xs text-neutral-700 dark:border-white/10 dark:bg-white/[0.04]
                  dark:text-neutral-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer actions */}
      <div
        className="flex shrink-0 flex-col-reverse gap-3 border-t border-neutral-200 p-4
          sm:flex-row sm:justify-end sm:px-8 dark:border-white/10"
      >
        <button
          type="button"
          onClick={requestClose}
          className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold
            text-neutral-700 transition-colors hover:border-emerald-500
            hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-emerald-400 dark:border-white/15 dark:text-neutral-300
            dark:hover:text-emerald-400"
        >
          Close
        </button>

        <Link
          href="/#contact"
          onClick={requestClose}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500
            px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-emerald-400
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          Start a project
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </dialog>
  );
}