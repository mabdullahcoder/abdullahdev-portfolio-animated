"use client";

import { flushSync } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { setTheme, useTheme } from "@/hooks/useTheme";
import { PILL } from "@/lib/ui";

const REVEAL_MS = 700;

/** Dark/light switch. The new theme spreads out from the button as a growing circle. */
export default function ThemeToggle() {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const isLight = theme === "light";

  const toggle = (event) => {
    const next = isLight ? "dark" : "light";
    const apply = () => flushSync(() => setTheme(next));

    if (reduceMotion || typeof document.startViewTransition !== "function") {
      apply();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: REVEAL_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      aria-pressed={isLight}
      whileTap={{ scale: 0.95 }}
      className={`${PILL} max-sm:w-[2.6em] max-sm:px-0`}
    >
      <span aria-hidden className="relative h-[1.15em] w-[1.15em]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={theme}
            initial={{ rotate: -90, scale: 0.3, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {isLight ? <Sun className="h-full w-full" strokeWidth={2.5} /> : <Moon className="h-full w-full" strokeWidth={2.5} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="hidden sm:inline">{isLight ? "Light" : "Dark"}</span>
    </motion.button>
  );
}
