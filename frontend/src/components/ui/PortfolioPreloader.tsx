"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PROFILE } from "@/data/profile";

const MINIMUM_DISPLAY_TIME = 1400;
const MAXIMUM_DISPLAY_TIME = 6000;
const EXIT_ANIMATION_TIME = 450;

export default function PortfolioPreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let minimumTimeElapsed = false;
    let pageLoaded = document.readyState === "complete";
    let hasStartedExit = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    const finishLoading = () => {
      if (!minimumTimeElapsed || !pageLoaded || hasStartedExit) return;

      hasStartedExit = true;
      setIsExiting(true);
      exitTimer = setTimeout(() => setIsVisible(false), EXIT_ANIMATION_TIME);
    };

    const handlePageLoad = () => {
      pageLoaded = true;
      finishLoading();
    };

    const minimumTimer = setTimeout(() => {
      minimumTimeElapsed = true;
      finishLoading();
    }, MINIMUM_DISPLAY_TIME);

    const maximumTimer = setTimeout(() => {
      minimumTimeElapsed = true;
      pageLoaded = true;
      finishLoading();
    }, MAXIMUM_DISPLAY_TIME);

    if (!pageLoaded) {
      window.addEventListener("load", handlePageLoad, { once: true });
    }

    return () => {
      clearTimeout(minimumTimer);
      clearTimeout(maximumTimer);
      if (exitTimer) clearTimeout(exitTimer);
      window.removeEventListener("load", handlePageLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="portfolio-loader"
      data-exiting={isExiting}
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      <div aria-hidden="true" className="portfolio-loader__grid" />
      <div className="portfolio-loader__content">
        <div className="portfolio-loader__visual">
          <div className="portfolio-loader__orbit portfolio-loader__orbit--outer">
            <span className="portfolio-loader__satellite portfolio-loader__satellite--cyan" />
          </div>
          <div className="portfolio-loader__orbit portfolio-loader__orbit--inner">
            <span className="portfolio-loader__satellite portfolio-loader__satellite--gold" />
          </div>
          <div className="portfolio-loader__portrait-frame">
            <Image
              src={PROFILE.image}
              alt=""
              width={320}
              height={320}
              priority
              sizes="(max-width: 640px) 9rem, 11rem"
              className="portfolio-loader__portrait"
            />
          </div>
        </div>

        <p className="portfolio-loader__eyebrow">WELCOME TO</p>
        <p className="portfolio-loader__name">{PROFILE.name}</p>
        <p className="portfolio-loader__role">{PROFILE.role}</p>
        <div className="portfolio-loader__progress" aria-hidden="true">
          <span />
        </div>
        <p className="portfolio-loader__message">Preparing your experience</p>
      </div>
    </div>
  );
}
