// src/components/footer/Footer.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaArrowUp,
} from "react-icons/fa";
import { Mail } from "lucide-react";

type SocialLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
};

const CONTACT_EMAIL = "mengiebewket@gmail.com";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/BEWKET-MENGIE",
    icon: FaGithub,
    color: "#ffffff",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedin,
    color: "#0A66C2",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bewket.sr",
    icon: FaInstagram,
    color: "#E4405F",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebook,
    color: "#1877F2",
  },
  {
    label: "Telegram",
    href: "https://t.me/BEWKET1500671",
    icon: FaTelegram,
    color: "#26A5E4",
  },
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());

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
    <footer id="footer" className="relative bg-[var(--dark-2)] border-t border-[var(--border)] transition-colors duration-300">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          
          {/* BRANDING / LOGO */}
          <a
            href="#home"
            className="group flex items-center gap-3.5 self-center lg:self-auto"
            aria-label="Bewket Mengie Home"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)]/20 via-blue-500/10 to-transparent border border-[var(--accent)]/30 backdrop-blur-md transition-all duration-300 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] group-hover:scale-105">
              <span className="font-extrabold text-lg text-[var(--accent-light)] tracking-tight">
                B
              </span>
            </div>
            <div className="text-left">
              <div className="font-modern text-base font-bold text-white transition-colors duration-300 group-hover:text-[var(--accent-light)]">
                Bewket Mengie
              </div>
              <p className="text-[0.7rem] uppercase tracking-wider text-[var(--text-muted)]">
                Full Stack Developer
              </p>
            </div>
          </a>

          {/* NAVIGATION LINKS */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="
                      group relative
                      text-sm
                      font-bold
                      tracking-wide
                      text-[var(--text-muted)]
                      transition-colors
                      duration-300
                      hover:text-[var(--accent)]
                      focus-visible:text-[var(--accent)]
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
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* SOCIAL & EMAIL LINKS */}
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email me"
              title={CONTACT_EMAIL}
              className="
                group
                relative
                flex h-9 w-9
                items-center justify-center
                overflow-hidden
                rounded-lg
                border border-[var(--border)]
                bg-white/5
                backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[var(--accent)]
                hover:bg-[var(--accent)]/10
              "
            >
              <Mail
                aria-hidden="true"
                className="relative z-10 h-4 w-4 text-[var(--text-muted)] transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--accent)]"
              />
            </a>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${social.label}`}
                  className="
                    group
                    relative
                    flex h-9 w-9
                    items-center justify-center
                    overflow-hidden
                    rounded-lg
                    border border-[var(--border)]
                    bg-white/5
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-[var(--border-bright)]
                    hover:bg-white/[0.08]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--accent)]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[var(--dark-2)]
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute inset-0
                      opacity-0
                      blur-lg
                      transition-opacity duration-300
                      group-hover:opacity-100
                    "
                    style={{
                      backgroundColor: `${social.color}20`,
                    }}
                  />
                  <Icon
                    aria-hidden="true"
                    className="
                      relative z-10
                      h-4 w-4
                      transition-all duration-300
                      group-hover:scale-110
                    "
                    style={{
                      color: social.color,
                    }}
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs tracking-[0.08em] text-[var(--text-dim)]">
            © {year} <span className="text-[var(--accent-light)] font-semibold">Bewket Mengie</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-dim)]">
            <span>Designed</span>
            <span aria-hidden="true" className="text-[var(--accent)]">
              ✦
            </span>
            <span>Developed</span>
            <span aria-hidden="true" className="text-[var(--accent)]">
              ✦
            </span>
            <span>With passion</span>
          </div>
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
          flex h-12 w-12
          items-center justify-center
          rounded-xl
          border border-[var(--accent)]
          bg-[var(--accent)]
          text-[var(--dark)]
          shadow-lg
          shadow-[var(--accent)]/20
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-[var(--accent)]/30
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--accent)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--dark)]
          md:bottom-8
          md:right-8
          ${
            showBackToTop
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-5 scale-90 opacity-0"
          }
        `}
      >
        <FaArrowUp
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 text-(--dark)"
        />
      </button>
    </footer>
  );
}