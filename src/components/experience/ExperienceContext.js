"use client";

import { createContext, useContext } from "react";

/**
 * Shares the smoothed scroll position (in timeline units) and a helper to jump to a unit.
 * @type {React.Context<{ progress: import("framer-motion").MotionValue<number>, scrollToUnit: (unit: number) => void } | null>}
 */
const ExperienceContext = createContext(null);

export const ExperienceProvider = ExperienceContext.Provider;

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used inside <Experience>");
  }
  return context;
}
