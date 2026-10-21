"use client";

import { motion } from "framer-motion";
import { STATS } from "@/data/content";
import { TIMELINE } from "@/lib/timeline";
import { GUTTER_PAD } from "@/lib/ui";
import { useFadeBlur, useZoomThrough } from "@/hooks/useSceneMotion";
import MonoCaption from "@/components/ui/MonoCaption";
import ZoomLayer from "@/components/ui/ZoomLayer";
import PartnersFrame from "./PartnersFrame";

/** "Specialized in full-stack & AI development" + tech stack frame; drifts up and dissolves into the projects. */
export default function EssentialScene() {
  const { enter, exit } = TIMELINE.essential;
  const zoom = useZoomThrough({ enter });
  const fade = useFadeBlur({ exit, exitY: -9, maxBlur: 7 });
  const { eyebrow, value, caption } = STATS.essential;

  return (
    <ZoomLayer style={{ ...zoom, visibility: fade.visibility }}>
      <motion.div
        style={{ opacity: fade.opacity, filter: fade.filter, y: fade.y }}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-[var(--space-block)] pb-[4svh] text-center short:gap-4 short:pb-0 short:pt-[8svh] ${GUTTER_PAD}`}
      >
        <div className="flex flex-col items-center">
          <MonoCaption className="mb-[var(--space-caption)]">{eyebrow}</MonoCaption>
          <h2 className="text-[clamp(2.4rem,6.5vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.03em] short:text-[2.1rem]">
            {value.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <MonoCaption parts={caption} className="mt-[var(--space-caption)]" />
        </div>
        <PartnersFrame />
      </motion.div>
    </ZoomLayer>
  );
}
