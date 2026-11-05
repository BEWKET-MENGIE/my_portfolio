"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useHydrated } from "@/lib/useHydrated";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const isThemeReady = useHydrated();

  const isHomePage = pathname === "/";

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
    if (!isHomePage) return;

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
    if (isHomePage && item.href.startsWith("#")) {
      setActiveId(item.href.replace("#", ""));
    }
    closeMenu();
  };

  const isActive = (item: NavItem) =>
    isHomePage && activeId === item.href.replace("#", "");

  const getItemHref = (item: NavItem) =>
    item.href.startsWith("/") || isHomePage ? item.href : `/${item.href}`;

  /* Correctly toggle theme using next-themes setTheme */
  const toggleTheme = () => {
    if (!isThemeReady) return;
    const currentTheme = resolvedTheme || theme || "dark";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const isDark =
    !isThemeReady || (resolvedTheme || theme || "dark") === "dark";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:bg-[rgba(4,10,20,0.88)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* LOGO */}
            <Link
              href={isHomePage ? "#home" : "/#home"}
              onClick={closeMenu}
              className="group flex items-center gap-4"
              aria-label="Bewket Mengie Home"
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 transition-all duration-300 group-hover:border-(--accent) group-hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.2)] sm:h-12 sm:w-12">
                <Image
                  src="/logo.jpg"
                  alt="Bewket Mengie"
                  fill
                  sizes="48px"
                  className="rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>

              <div className="hidden min-[340px]:block">
                <div className="font-modern text-[13px] font-extrabold tracking-[-0.02em] text-neutral-900 transition-colors duration-300 group-hover:text-(--accent-dark) dark:text-white dark:group-hover:text-(--accent-light) sm:text-[18px]">
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
                    href={getItemHref(item)}
                    onClick={() => handleNavigation(item)}
                    className={`group relative flex items-center gap-1.5 px-4 py-2.5 font-modern text-[14.5px] font-bold tracking-wide transition-all duration-300 ${
                      active
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-600 hover:text-neutral-900 dark:text-white/55 dark:hover:text-white"
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
                disabled={!isThemeReady}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-700 backdrop-blur-md transition-all duration-300 hover:border-cyan-600 hover:text-cyan-700 dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* MOBILE CONTROLS */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />

              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-700 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.035] dark:text-white"
              >
                {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
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
        className={`fixed top-20 right-0 z-50 h-[calc(100dvh-5rem)] w-full max-w-sm border-l border-neutral-200 bg-white/97 text-neutral-900 shadow-[-20px_0_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-white/8 dark:bg-[#050a12]/97 dark:text-white dark:shadow-[-20px_0_60px_rgba(0,0,0,0.35)] lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 py-7">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-modern text-[12px] font-bold uppercase tracking-[0.22em] text-(--accent-light)">
                Navigation
              </p>
              <p className="mt-1 font-modern text-sm text-neutral-500 dark:text-white/40">Explore my portfolio</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-(--accent)" />
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => {
              const active = isActive(item);

              return (
                <Link
                  key={item.label}
                  href={getItemHref(item)}
                  onClick={() => handleNavigation(item)}
                  className={`group flex items-center justify-between rounded-2xl border px-4 py-4 transition-all duration-300 ${
                    active
                      ? "border-cyan-600/25 bg-cyan-500/10 text-neutral-900 dark:text-white"
                      : "border-transparent bg-neutral-100 text-neutral-700 hover:border-neutral-300 hover:text-neutral-900 dark:bg-white/2.5 dark:text-white/65 dark:hover:border-white/8 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-5 font-modern text-xs font-semibold tracking-wider text-neutral-400 dark:text-white/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-modern text-base font-semibold">{item.label}</span>
                  </div>
                  <ArrowUpRight size={17} />
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}