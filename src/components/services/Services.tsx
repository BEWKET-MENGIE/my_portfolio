"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import ServiceCard from "./ServiceCard";
import { services } from "@/data/services";
import Experience from "@/components/experience/Experience";

type ActiveTab = "services" | "experience";

const tabs: { id: ActiveTab; label: string }[] = [
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("services");
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Record<ActiveTab, HTMLButtonElement | null>>({
    services: null,
    experience: null,
  });

  /* Scroll reveal (instant when the user prefers reduced motion) */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Arrow keys / Home / End move between tabs (WAI-ARIA tabs pattern).
  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex].id;
    setActiveTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-neutral-50 px-5 py-24
        text-neutral-900 transition-colors duration-300
        sm:px-8 md:py-32 lg:px-16
        dark:bg-[#030719] dark:text-white"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20
          h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl
          dark:bg-emerald-500/[0.07]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header: title centered, tabs centered below it */}
        <div
          className={`mb-12 flex flex-col items-center gap-8 text-center
            md:mb-14 transition-all duration-700
            motion-reduce:transform-none motion-reduce:transition-none
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
        >
          <div className="max-w-4xl">
            <h2
              id="services-heading"
              className="text-4xl font-extrabold leading-tight
                tracking-tight sm:text-5xl lg:text-6xl"
            >
              {activeTab === "services"
                ? "What can I help you with?"
                : "My Professional Journey"}
            </h2>

            {/* Only render the subtitle when it has text, so there's no empty gap */}
            {activeTab === "experience" && (
              <p
                className="mx-auto mt-5 max-w-2xl text-sm leading-7
                  text-neutral-600 sm:text-base dark:text-neutral-400"
              >
                Explore my professional experience, responsibilities, and
                technical growth.
              </p>
            )}
          </div>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Portfolio content"
            className="flex w-fit shrink-0 rounded-full border
              border-neutral-200 bg-white p-1.5 shadow-sm
              dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-none"
          >
            {tabs.map((tab, index) => {
              const selected = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  id={`${tab.id}-tab`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${tab.id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold
                    transition-colors duration-300
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-emerald-400
                    ${
                      selected
                        ? "bg-emerald-500 text-black"
                        : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services panel */}
        <div
          id="services-panel"
          role="tabpanel"
          aria-labelledby="services-tab"
          hidden={activeTab !== "services"}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isVisible={isVisible && activeTab === "services"}
              />
            ))}
          </div>
        </div>

        {/* Experience panel */}
        <div
          id="experience-panel"
          role="tabpanel"
          aria-labelledby="experience-tab"
          hidden={activeTab !== "experience"}
        >
          <Experience />
        </div>
      </div>
    </section>
  );
}