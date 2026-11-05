"use client";

import { useSyncExternalStore } from "react";

const TOKEN_KEY = "portfolio-admin-token";
const CHANGE_EVENT = "portfolio-admin-session-change";

export function getAdminToken() {
  return window.sessionStorage.getItem(TOKEN_KEY);
}

function subscribeToAdminToken(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getServerAdminToken() {
  return undefined;
}

export function useAdminToken() {
  return useSyncExternalStore(
    subscribeToAdminToken,
    getAdminToken,
    getServerAdminToken,
  );
}

export function saveAdminToken(token: string) {
  window.sessionStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearAdminToken() {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
