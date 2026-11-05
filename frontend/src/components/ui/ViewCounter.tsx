"use client";

import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  saveAnalyticsConsent,
  useAnalyticsConsent,
} from "@/lib/analyticsConsent";

type PublicStats = { totalViews: number; uniqueVisitors: number };

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export default function ViewCounter() {
  const pathname = usePathname();
  const [stats, setStats] = useState<PublicStats | null>(null);
  const consent = useAnalyticsConsent();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    void fetch(`${apiUrl}/analytics/public`, { cache: "no-store" })
      .then(async (response) => {
        if (response.ok) setStats((await response.json()) as PublicStats);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!pathname || pathname === "/admin" || pathname.startsWith("/admin/"))
      return;
    if (consent !== "allowed" || lastTrackedPath.current === pathname) return;

    lastTrackedPath.current = pathname;

    try {
      let visitorId = window.localStorage.getItem("portfolio-visitor-id");
      if (!visitorId) {
        visitorId = window.crypto.randomUUID();
        window.localStorage.setItem("portfolio-visitor-id", visitorId);
      }

      void fetch(`${apiUrl}/analytics/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          page: pathname,
          referrer: document.referrer || undefined,
        }),
      })
        .then(async (response) => {
          if (response.ok) setStats((await response.json()) as PublicStats);
        })
        .catch(() => undefined);
    } catch {
      lastTrackedPath.current = null;
    }
  }, [consent, pathname]);

  function chooseConsent(choice: "allowed" | "denied") {
    saveAnalyticsConsent(choice);
  }

  return (
    <>
      <div
        aria-label={
          stats
            ? `${stats.totalViews.toLocaleString()} views and ${stats.uniqueVisitors.toLocaleString()} visitors`
            : "Portfolio analytics loading"
        }
        className="fixed right-4 top-24 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[#07111f]/90 text-sm font-semibold text-white shadow-lg backdrop-blur-md sm:right-6"
        title="Portfolio views and visitors"
      >
        <Eye aria-hidden="true" className="h-5 w-5 text-emerald-400" />
        <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#07111f] bg-emerald-400 px-1 text-[10px] font-bold leading-none text-[#07111f]">
          <span aria-live="polite">
            {stats ? stats.totalViews.toLocaleString() : "—"}
          </span>
        </span>
      </div>
      {consent === null && (
        <aside className="fixed bottom-4 left-4 right-4 z-50 ml-auto max-w-md border border-white/15 bg-[#07111f] p-4 text-sm text-white shadow-xl sm:left-auto">
          <p>
            Allow anonymous portfolio analytics? A random browser ID and pages
            visited are stored to count visits.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => chooseConsent("allowed")}
              className="bg-emerald-400 px-3 py-2 font-semibold text-black"
            >
              Allow
            </button>
            <button
              onClick={() => chooseConsent("denied")}
              className="border border-white/25 px-3 py-2"
            >
              Decline
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
