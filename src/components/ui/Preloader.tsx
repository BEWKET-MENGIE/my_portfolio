// src/components/ui/Preloader.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ---------------------------------------------------------------
   SETTINGS
---------------------------------------------------------------- */
// Use the SAME image as your navbar avatar. To get the exact path: open
// src/components/navbar/Navbar.tsx, find the <Image ... src="..." /> next to
// "Bewket Mengie", and copy that src here. (Files live in the public folder,
// so "/images/me.jpg" means public/images/me.jpg.)
const LOGO_SRC = "/log.jpg";
const NAME = "Bewket Mengie";
const INITIALS = "BM"; // shown only if the logo image fails to load

const MIN_MS = 1200; // show the loader at least this long (measured from page open)
const MAX_MS = 5000; // never wait longer than this, even if the page is slow
const FADE_MS = 500; // length of the fade-out

export default function Preloader() {
  // Starts true on the server too, so the loader covers the page from the
  // very first paint (no flash of the unfinished site).
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    let finished = false;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;

    // Stop the page scrolling behind the loader.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      if (finished) return;
      finished = true;

      // performance.now() counts from when the page started opening, so a slow
      // load does not get an extra wait on top.
      const wait = Math.max(0, MIN_MS - performance.now());

      hideTimer = setTimeout(() => {
        setLeaving(true); // start the fade-out
        removeTimer = setTimeout(() => {
          setVisible(false); // then remove it from the page
          document.body.style.overflow = previousOverflow;
        }, FADE_MS);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const failSafe = setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(failSafe);
      if (hideTimer) clearTimeout(hideTimer);
      if (removeTimer) clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="site-preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center
        bg-white text-neutral-900 transition-opacity ease-out
        motion-reduce:transition-none dark:bg-[#050816] dark:text-white
        ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      {/* If JavaScript is off, never trap visitors behind the loader. */}
      <noscript>
        <style>{"#site-preloader{display:none!important}"}</style>
      </noscript>

      {/* Soft glow behind the logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 rounded-full
          bg-(--accent,#06b6d4)/15 blur-3xl"
      />

      {/* Logo + spinning rings */}
      <div className="relative flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
        {/* Outer ring: spins clockwise */}
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-4
            border-neutral-200 border-t-(--accent,#06b6d4)
            motion-reduce:animate-none dark:border-white/10"
        />

        {/* Inner ring: spins the other way, slower */}
        <span
          aria-hidden="true"
          className="absolute inset-3 animate-[spin_2.4s_linear_infinite_reverse]
            rounded-full border-2 border-transparent border-b-orange-500
            border-l-orange-500/40 motion-reduce:animate-none"
        />

        {/* Logo photo */}
        <div
          className="relative h-24 w-24 overflow-hidden rounded-full border
            border-neutral-200 bg-neutral-100 shadow-lg sm:h-28 sm:w-28
            dark:border-white/10 dark:bg-neutral-900"
        >
          {logoFailed ? (
            <span
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center text-2xl font-bold"
            >
              {INITIALS}
            </span>
          ) : (
            <Image
              src={LOGO_SRC}
              alt=""
              fill
              priority
              sizes="112px"
              className="object-cover"
              onError={() => setLogoFailed(true)}
            />
          )}
        </div>
      </div>

      <p className="mt-8 text-lg font-bold tracking-tight">{NAME}</p>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Loading portfolio
        <span aria-hidden="true" className="ml-0.5 inline-flex w-4 justify-start">
          <span className="animate-pulse motion-reduce:animate-none">...</span>
        </span>
      </p>
    </div>
  );
}