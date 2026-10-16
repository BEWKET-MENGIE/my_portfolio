// src/components/hero/Hero.tsx
"use client";

import HeroImage from "@/components/hero/HeroImage";
import HeroContent from "@/components/hero/HeroContent";
import SocialLinks from "@/components/hero/SocialLinks";

export default function Hero() {
  return (
    <section
      id="home"
      // `isolate z-[1]` gives the hero its own stacking context above any
      // global page background layer. `bg-[#100c09]` matches the orbit scene,
      // so if the scene ever fails to render you see brown, not the page color.
      className="relative isolate z-1 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#100c09] px-5 sm:px-8 md:px-12 lg:px-24"
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






