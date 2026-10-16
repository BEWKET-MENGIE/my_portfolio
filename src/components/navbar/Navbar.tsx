"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggle from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiSun, FiMoon, FiArrowUpRight } from "react-icons/fi";
import { useTheme } from "next-themes";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const isHomePage = pathname === "/";

  // Prevent hydration mismatch for theme-dependent icons
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Scroll detection */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* Detect active section */
  useEffect(() => {
    if (!isHomePage) {
      setActiveId("");
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveId(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHomePage]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigation = (item: NavItem) => {
    setActiveId(item.href.replace("#", ""));
    closeMenu();
  };

  const isActive = (item: NavItem) => activeId === item.href.replace("#", "");

  /* Correctly toggle theme using next-themes setTheme */
  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[rgba(4,10,20,0.88)] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* LOGO */}
            <Link
              href="#home"
              onClick={closeMenu}
              className="group flex items-center gap-4"
              aria-label="Bewket Mengie Home"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 transition-all duration-300 group-hover:border-(--accent) group-hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.2)]">
                <Image
                  src="/logo.jpg"
                  alt="Bewket Mengie"
                  fill
                  sizes="48px"
                  className="rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>

              <div className="hidden sm:block">
                <div className="font-modern text-[18px] font-extrabold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-(--accent-light)">
                  Bewket Mengie
                </div>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
              {navItems.map((item) => {
                const active = isActive(item);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => handleNavigation(item)}
                    className={`group relative flex items-center gap-1.5 px-4 py-2.5 font-modern text-[14.5px] font-bold tracking-wide transition-all duration-300 ${
                      active ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    <span className="relative z-20">{item.label}</span>
                    <span
                      className={`pointer-events-none absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-(--accent) transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                        active ? "scale-x-100" : ""
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* DESKTOP THEME TOGGLE */}
            <div className="hidden lg:flex items-center gap-7">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/2.5 text-white/60 backdrop-blur-md transition-all duration-300 hover:border-(--accent)] hover:text-(--accent-light)]"
              >
                {mounted && isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>

            {/* MOBILE CONTROLS */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.035] text-white/65 backdrop-blur-md"
              >
                {mounted && isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
              </button>

              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.035] text-white backdrop-blur-md"
              >
                {isMenuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY & DRAWER */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <aside
        className={`fixed top-20 right-0 z-50 h-[calc(100vh-80px)] w-full max-w-120px] border-l border-white/8 bg-[#050a12]/97 shadow-[-20px_0_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 py-7">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-modern text-[12px] font-bold uppercase tracking-[0.22em] text-(--accent-light)">
                Navigation
              </p>
              <p className="mt-1 font-modern text-sm text-white/40">Explore my portfolio</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-(--accent)" />
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => {
              const active = isActive(item);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavigation(item)}
                  className={`group flex items-center justify-between rounded-2xl border px-4 py-4 transition-all duration-300 ${
                    active
                      ? "border-[rgba(var(--accent-rgb),0.25)] bg-[rgba(var(--accent-rgb),0.07)] text-white"
                      : "border-transparent bg-white/2.5 text-white/65 hover:border-white/8 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-5 font-modern text-xs font-semibold tracking-wider text-white/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-modern text-base font-semibold">{item.label}</span>
                  </div>
                  <FiArrowUpRight size={17} />
                  <ThemeToggle />
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}