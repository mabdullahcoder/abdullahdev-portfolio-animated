"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const listeners = new Set();

/** Current theme, read from <html data-theme> (set before paint by the inline script in layout.js). */
function readTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribe(listener) {
  listeners.add(listener);

  // Keep other open tabs in sync.
  const onStorage = (event) => {
    if (event.key === STORAGE_KEY && (event.newValue === "light" || event.newValue === "dark")) {
      document.documentElement.setAttribute("data-theme", event.newValue);
      listener();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Applies and persists a theme, notifying subscribers synchronously. */
export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

/** "dark" | "light". Server render and hydration use the dark default, then sync to the real value. */
export function useTheme() {
  return useSyncExternalStore(subscribe, readTheme, () => "dark");
}
