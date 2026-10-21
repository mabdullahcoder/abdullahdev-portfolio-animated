"use client";

import { motion } from "framer-motion";
import { BRAND } from "@/data/content";
import { GUTTER_PAD } from "@/lib/ui";
import { useExperience } from "@/components/experience/ExperienceContext";
import Logo from "./Logo";
import SoundToggle from "./SoundToggle";
import ThemeToggle from "./ThemeToggle";

/** One row at every size: sound · logo · theme, centred on a shared line and inset by the page gutter. */
export default function Header() {
  const { scrollToUnit } = useExperience();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`pointer-events-none absolute inset-x-0 top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center gap-3 pt-[var(--edge-t)] ${GUTTER_PAD}`}
    >
      <div className="pointer-events-auto flex justify-self-start">
        <SoundToggle />
      </div>
      <button
        type="button"
        onClick={() => scrollToUnit(0)}
        aria-label={`${BRAND.name} — back to top`}
        className="pointer-events-auto flex justify-self-center text-ink transition-opacity hover:opacity-75"
      >
        <Logo name={BRAND.name} className="whitespace-nowrap text-[clamp(0.85rem,4.2vw,1.05rem)] sm:text-[clamp(1rem,1.8vw,1.85rem)]" />
      </button>
      <div className="pointer-events-auto flex justify-self-end">
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
