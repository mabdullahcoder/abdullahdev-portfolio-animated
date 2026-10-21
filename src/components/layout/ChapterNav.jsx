"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent } from "framer-motion";
import { CHAPTERS } from "@/data/chapters";
import { GUTTER_INSET } from "@/lib/ui";
import { useExperience } from "@/components/experience/ExperienceContext";

const pad = (n) => String(n).padStart(2, "0");

function chapterAt(u) {
  let index = 0;
  CHAPTERS.forEach((chapter, i) => {
    if (u >= chapter.from) index = i;
  });
  return index;
}

/** Phones: the current chapter name, tappable progress segments and a counter. */
function CompactNav({ active, onSelect }) {
  return (
    <div className="flex items-center gap-3 sm:hidden">
      <div className="relative h-[1.1rem] min-w-[6.5rem] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={CHAPTERS[active].id}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 font-mono text-[0.8rem] font-bold uppercase leading-[1.1rem] tracking-[0.08em] text-ink"
          >
            {CHAPTERS[active].label}
          </motion.span>
        </AnimatePresence>
      </div>

      <ol className="flex flex-1 items-center gap-1">
        {CHAPTERS.map((chapter, index) => (
          <li key={chapter.id} className={`transition-[flex-grow] duration-500 ${index === active ? "flex-[2.5]" : "flex-1"}`}>
            <button
              type="button"
              onClick={() => onSelect(chapter.anchor)}
              aria-label={`Go to ${chapter.label}`}
              aria-current={index === active ? "step" : undefined}
              className="block w-full py-3"
            >
              <span
                className={`block h-[3px] rounded-full transition-colors duration-500 ${
                  index === active ? "bg-ink" : index < active ? "bg-ink/45" : "bg-ink/15"
                }`}
              />
            </button>
          </li>
        ))}
      </ol>

      <span className="font-mono text-[0.7rem] font-bold tabular-nums tracking-[0.06em] text-ink/50">
        <span className="text-ink">{pad(active + 1)}</span>/{pad(CHAPTERS.length)}
      </span>
    </div>
  );
}

/** ≥640px: evenly spaced chapter labels joined by hairlines; the current one grows. */
function TimelineNav({ active, onSelect }) {
  return (
    <div className="hidden grid-cols-[repeat(5,minmax(0,1fr))_auto] items-center sm:grid">
      {CHAPTERS.map((chapter, index) => {
        const isActive = index === active;
        const isLast = index === CHAPTERS.length - 1;

        return (
          <div key={chapter.id} className="flex min-w-0 items-center">
            <button
              type="button"
              onClick={() => onSelect(chapter.anchor)}
              aria-current={isActive ? "step" : undefined}
              className={`shrink-0 font-mono font-bold uppercase leading-none tracking-[0.06em] transition-[font-size,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-100 ${
                isActive
                  ? "text-[clamp(0.95rem,2.5vw,2.5rem)] text-ink opacity-100"
                  : "text-[clamp(0.6rem,1.12vw,1.15rem)] text-ink opacity-75"
              }`}
            >
              {chapter.label}
            </button>
            {!isLast && <span aria-hidden className="mx-[clamp(0.5rem,0.9vw,1rem)] h-px min-w-0 flex-1 bg-ink/25" />}
          </div>
        );
      })}
    </div>
  );
}

/** Bottom chapter navigation, driven by the scroll position. */
export default function ChapterNav() {
  const { progress, scrollToUnit } = useExperience();
  const [active, setActive] = useState(() => chapterAt(progress.get()));

  useMotionValueEvent(progress, "change", (u) => setActive(chapterAt(u)));

  return (
    <nav
      aria-label="Chapters"
      className={`absolute bottom-[var(--edge-b)] z-40 ${GUTTER_INSET}`}
    >
      <CompactNav active={active} onSelect={scrollToUnit} />
      <TimelineNav active={active} onSelect={scrollToUnit} />
    </nav>
  );
}
