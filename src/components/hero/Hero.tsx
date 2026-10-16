// src/components/hero/Hero.tsx
"use client";

import HeroImage from "@/components/hero/HeroImage";
import HeroContent from "@/components/hero/HeroContent";
import SocialLinks from "@/components/hero/SocialLinks";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate z-1 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--dark)] px-5 sm:px-8 md:px-12 lg:px-24 transition-colors duration-300"
    >
      {/* Animated orbital background */}
      <HeroImage />

      {/* Social media links */}
      <SocialLinks />

      {/* Hero content */}
      <HeroContent />
    </section>
  );
}
