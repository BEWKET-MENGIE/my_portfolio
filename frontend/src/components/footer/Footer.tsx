// src/components/footer/Footer.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Mail } from "lucide-react";
import footerIcon from "@/app/icon.jpg";
import { siteConfig } from "@/lib/site";
import SocialLinks from "@/components/seo/SocialLinks";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const year = 2026;

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      className="relative bg-(--dark-2) border-t border-(--border) transition-colors duration-300"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* BRANDING / LOGO */}
          <Link
            href="/#home"
            className="group flex items-center gap-3.5 self-center lg:self-auto"
            aria-label="Bewket Mengie Home"
          >
            
     
          </Link>

          {/* NAVIGATION LINKS */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href.startsWith("/") ? item.href : `/${item.href}`}
                    className="
                      group relative
                      text-base
                      font-semibold
                      tracking-wide
                      text-(--text-muted)
                      transition-colors
                      duration-300
                      hover:text-(--accent)
                      focus-visible:text-(--accent)
                      focus-visible:outline-none
                    "
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        -bottom-1.5
                        left-0
                        h-px
                        w-0
                        bg-(--accent)
                        transition-all
                        duration-300
                        group-hover:w-full
                        group-focus-visible:w-full
                      "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* SOCIAL & EMAIL LINKS */}
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email me"
              title={siteConfig.email}
              className="
                group
                relative
                flex h-9 w-9
                items-center justify-center
                overflow-hidden
                rounded-lg
                border border-(--border)
                bg-white/5
                backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-(--accent)
                hover:bg-(--accent)/10
              "
            >
              <Mail
                aria-hidden="true"
                className="relative z-10 h-4 w-4 text-(--text-muted) transition-all duration-300 group-hover:scale-110 group-hover:text-(--accent)"
              />
            </a>
            <SocialLinks variant="footer" />
          </div>
        </div>

        {/* BOTTOM ROW - CENTERED */}
        <div className="mt-10 flex flex-col items-center justify-center border-t border-(--border)/40 pt-6 text-center">
          <p className="font-mono text-xs tracking-[0.08em] text-(--text-dim)">
            © {year} Bewket Mengie. All rights reserved.
          </p>
        </div>
      </div>

      {/* BACK TO TOP BUTTON */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        className={`
          fixed
          bottom-6
          right-6
          z-50
          group flex h-12 w-12
          items-center justify-center
          rounded-full
          border border-cyan-300/30
          bg-slate-950/80
          text-cyan-300
          backdrop-blur-md
          shadow-lg
          shadow-cyan-500/20
          transition-all duration-300
          hover:-translate-y-1 hover:border-cyan-300/70
          hover:bg-cyan-400 hover:text-slate-950
          hover:shadow-xl hover:shadow-cyan-500/30
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-300
          focus-visible:ring-offset-2
          focus-visible:ring-offset-(--dark)
          motion-reduce:transition-none
          md:bottom-8
          md:right-8
          ${
            showBackToTop
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-5 scale-90 opacity-0"
          }
        `}
      >
        <span
          aria-hidden="true"
          className="absolute inset-1 rounded-full border border-cyan-200/20 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-100/40"
        />
        <ArrowUp
          aria-hidden="true"
          className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
        />
      </button>
    </footer>
  );
}