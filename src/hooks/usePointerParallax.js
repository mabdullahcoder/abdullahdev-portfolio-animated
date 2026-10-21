"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const SPRING = { stiffness: 60, damping: 18, mass: 0.6 };

/**
 * Normalised (-1..1) mouse position, spring-smoothed. Stays at rest for touch input
 * and when the user prefers reduced motion.
 */
export function usePointerParallax() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reduceMotion]);

  return { x, y };
}
