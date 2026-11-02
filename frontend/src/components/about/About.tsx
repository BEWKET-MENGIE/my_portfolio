// src/components/about/About.tsx
import AboutContent from "./AboutContent";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-label"
      className="relative overflow-hidden bg-white px-5 py-12 text-neutral-900
        transition-colors duration-300 sm:px-8 md:py-16 lg:px-16
        dark:bg-[#050816] dark:text-white"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-60 top-1/4 h-80 w-96
          rounded-full bg-emerald-500/10 blur-[140px] dark:bg-emerald-500/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96
          rounded-full bg-emerald-500/10 blur-[140px] dark:bg-emerald-500/[0.04]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section label: centered */}
        <div className="mb-10 flex justify-center md:mb-12">
          <p
            id="about-label"
            className="flex items-center gap-3 text-base font-bold uppercase
              tracking-[0.2em] text-emerald-700 md:text-xl dark:text-emerald-400"
          >
            About Me
            
          </p>
        </div>

        {/* Modular content */}
        <div>
          <AboutContent />
        </div>
      </div>
    </section>
  );
}