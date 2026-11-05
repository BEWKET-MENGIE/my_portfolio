"use client";

import { useSyncExternalStore } from "react";

export type AnalyticsConsent = "allowed" | "denied" | null | undefined;

const CONSENT_KEY = "portfolio-analytics-consent";
const CHANGE_EVENT = "portfolio-analytics-consent-change";

function getConsent(): Exclude<AnalyticsConsent, undefined> {
  const consent = window.localStorage.getItem(CONSENT_KEY);
  return consent === "allowed" || consent === "denied" ? consent : null;
}

function subscribeToConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getServerConsent() {
  return undefined;
}

export function useAnalyticsConsent() {
  return useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);
}

export function saveAnalyticsConsent(consent: "allowed" | "denied") {
  window.localStorage.setItem(CONSENT_KEY, consent);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
