// src/components/hero/Hero.tsx
"use client";

import HeroImage from "@/components/hero/HeroImage";
import HeroContent from "@/components/hero/HeroContent";

// SocialLinks is rendered inside HeroContent now (bottom left of the divider).
export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate z-1 flex min-h-screen w-full items-center justify-center overflow-hidden bg-(--dark) px-5 transition-colors duration-300 sm:px-8 md:px-12 lg:px-24"
    >
      {/* Animated orbital background */}
      <HeroImage />

      {/* Hero content (includes the social links) */}
      <HeroContent />
    </section>
  );
}