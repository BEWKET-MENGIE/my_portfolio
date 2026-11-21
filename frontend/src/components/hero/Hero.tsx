// src/components/hero/Hero.tsx
"use client";

import HeroContent from "@/components/hero/HeroContent";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate z-1 flex min-h-screen min-h-[100svh] w-full items-center justify-center overflow-hidden bg-(--dark) px-5 transition-colors duration-300 sm:px-8 md:px-12 lg:px-24"
    >
      <HeroContent />
    </section>
  );
}
