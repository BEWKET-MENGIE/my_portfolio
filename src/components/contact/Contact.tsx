"use client";

import { useEffect, useRef, useState } from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll reveal (instant when the user prefers reduced motion) */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const reveal = (delay = "0ms") => ({
    className: `transition-all duration-1000 motion-reduce:transition-none ${
      visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`,
    style: { transitionDelay: visible ? delay : "0ms" },
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-neutral-50 px-5 py-12 text-neutral-900
        transition-colors duration-300 sm:px-8 md:py-16 lg:px-16
        dark:bg-[#030719] dark:text-white"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-80 w-80
          rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/[0.07]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header: centered */}
        <div
          className={`mx-auto max-w-2xl text-center ${reveal().className}`}
          style={reveal().style}
        >
          <h2
            id="contact-heading"
            className="text-3xl font-extrabold leading-tight tracking-tight
              sm:text-4xl lg:text-5xl"
          >
            Get in touch.
          </h2>
        </div>

        {/* Info + form */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
          <div
            className={`lg:col-span-2 ${reveal("150ms").className}`}
            style={reveal("150ms").style}
          >
            <ContactInfo />
          </div>

          <div
            className={`lg:col-span-3 ${reveal("300ms").className}`}
            style={reveal("300ms").style}
          >
            <div
              className="rounded-2xl border border-neutral-200 bg-white p-6
                shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.02]
                dark:shadow-none"
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
