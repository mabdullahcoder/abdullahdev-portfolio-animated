"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/data/content";
import { TIMELINE } from "@/lib/timeline";
import { easeInOutCubic, easeOutCubic, lerp, progressIn } from "@/lib/math";
import { GUTTER_PAD } from "@/lib/ui";
import { usePointerEvents, useProgressTransform, useVisibility } from "@/hooks/useSceneMotion";
import Moon from "./Moon";

/** Capped by height as well as width, so on wide, short screens the title can't push the CTA into the moon. */
const TITLE_CLASS =
  "text-[clamp(2.3rem,min(4.9vw,9svh),5.75rem)] font-medium leading-[1.04] tracking-[-0.03em] short:text-[1.9rem]";

/** Settled positions (svh): the title centre and the moon's top edge, leaving clear space for the CTA between them. */
const SETTLED_TITLE_TOP = 23;
const SETTLED_MOON_TOP = 57;

/** Finale: the moon rises over the horizon, then settles as the call to action appears. */
export default function ContactScene() {
  const { rise, settle } = TIMELINE.contact;
  const riseT = (u) => easeOutCubic(progressIn(u, rise[0], rise[1]));
  const settleT = (u) => easeInOutCubic(progressIn(u, settle[0], settle[1]));

  const visibility = useVisibility(rise[0], Infinity);
  const pointerEvents = usePointerEvents(settle[0] + 0.2, Infinity);

  const moonTop = useProgressTransform((u) => `${lerp(lerp(108, 40, riseT(u)), SETTLED_MOON_TOP, settleT(u))}svh`);
  const glow = useProgressTransform((u) => 1 - progressIn(u, rise[0] + 0.45, rise[1] - 0.05));

  const titleTop = useProgressTransform((u) => `${lerp(lerp(55, 47, riseT(u)), SETTLED_TITLE_TOP, settleT(u))}svh`);
  const titleOpacity = useProgressTransform((u) => progressIn(u, rise[0], rise[0] + 0.4));

  const ctaOpacity = useProgressTransform((u) => progressIn(u, settle[0] + 0.25, settle[1]));
  const ctaY = useProgressTransform((u) => `${(1 - easeOutCubic(progressIn(u, settle[0] + 0.25, settle[1]))) * 3}svh`);

  const titleLines = CONTACT.title.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));

  return (
    <motion.section aria-label="Contact" style={{ visibility, pointerEvents }} className="absolute inset-0">
      {/* Title rises behind the moon, as in the original sequence */}
      <motion.div
        style={{ top: titleTop, opacity: titleOpacity }}
        className={`absolute inset-x-0 -translate-y-1/2 text-center ${GUTTER_PAD}`}
      >
        <h2 className={TITLE_CLASS}>{titleLines}</h2>
      </motion.div>

      <Moon top={moonTop} glow={glow} />

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[34svh] bg-[linear-gradient(0deg,color-mix(in_srgb,var(--space)_92%,transparent)_0%,color-mix(in_srgb,var(--space)_45%,transparent)_45%,transparent_100%)]" />

      {/*
        Call to action, above the moon. An invisible copy of the title gives this layer the same
        height and centre as the title, so the button always hangs exactly one block-gap below it.
      */}
      <motion.div style={{ top: titleTop }} className={`absolute inset-x-0 -translate-y-1/2 text-center ${GUTTER_PAD}`}>
        <div aria-hidden className={`invisible ${TITLE_CLASS}`}>
          {titleLines}
        </div>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-x-0 top-full mt-[var(--space-block)] flex flex-col items-center gap-[var(--space-caption)] short:mt-[var(--space-caption)]"
        >
          <motion.a
            href={`mailto:${CONTACT.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-[0.45em] rounded-full bg-ink px-[clamp(1.4rem,2.6vw,2.8rem)] py-[clamp(0.8rem,2.5svh,1.5rem)] text-[clamp(0.9rem,1.35vw,1.45rem)] leading-none text-space/60 shadow-[0_0_40px_rgba(255,255,255,0.18)] transition-colors hover:text-space light:shadow-[0_12px_40px_-12px_rgba(20,30,70,0.45)]"
          >
            {CONTACT.cta}
            <ArrowRight aria-hidden className="h-[1em] w-[1em] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
          </motion.a>
          <p className="pl-[0.12em] font-mono text-[clamp(0.625rem,0.7vw,0.8rem)] font-bold uppercase tracking-[0.12em] text-ink/80 [text-shadow:0_1px_10px_var(--space)]">
            {CONTACT.email}
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
