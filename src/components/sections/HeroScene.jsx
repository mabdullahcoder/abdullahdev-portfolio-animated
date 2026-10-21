"use client";

import { motion } from "framer-motion";
import { HERO } from "@/data/content";
import { TIMELINE } from "@/lib/timeline";
import { GUTTER_PAD } from "@/lib/ui";
import { useZoomThrough } from "@/hooks/useSceneMotion";
import ZoomLayer from "@/components/ui/ZoomLayer";

const ease = [0.22, 1, 0.36, 1];

export default function HeroScene() {
  const style = useZoomThrough({ exit: TIMELINE.hero.exit, exitTo: 7 });

  return (
    <ZoomLayer style={style} className="flex items-center justify-center">
      <div className={`flex -translate-y-[2svh] flex-col items-center text-center ${GUTTER_PAD}`}>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease }}
          className="text-[clamp(2.6rem,7.6vw,9rem)] font-medium leading-[1.02] tracking-[-0.035em]"
        >
          {HERO.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.35 }}
          className="mt-[var(--space-caption)] max-w-[40ch] font-mono text-[clamp(0.625rem,1.1vw,1.2rem)] font-bold uppercase leading-snug tracking-[0.04em] text-ink/90 sm:max-w-none"
        >
          {HERO.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-[var(--space-block)] pl-[0.75em] font-mono text-[clamp(0.6rem,0.9vw,1rem)] uppercase tracking-[0.75em] text-ink/55"
        >
          {HERO.hint}
        </motion.p>
      </div>
    </ZoomLayer>
  );
}
