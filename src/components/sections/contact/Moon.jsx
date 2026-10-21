"use client";

import { motion, useTransform } from "framer-motion";

/**
 * Photographic moon (NASA LRO public-domain imagery) with limb shading.
 * `glow` (0..1) blows the disc out to white, as it does while rising into view.
 */
export default function Moon({ top, glow }) {
  const boxShadow = useTransform(
    glow,
    (g) => `0 0 ${40 + g * 140}px ${g * 40}px rgba(255,255,255,${(0.06 + g * 0.5).toFixed(3)})`,
  );

  return (
    <motion.div
      style={{ top }}
      className="pointer-events-none absolute left-1/2 aspect-square w-[min(max(66vw,58svh),135svh)] -translate-x-1/2"
    >
      <motion.div style={{ boxShadow }} className="relative h-full w-full rounded-full">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative, sized by CSS */}
        <img
          src="/images/moon.webp"
          alt=""
          draggable={false}
          className="h-full w-full select-none rounded-full object-cover [filter:grayscale(1)_contrast(1.08)_brightness(0.92)]"
        />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_38%,transparent_52%,rgba(0,0,0,0.35)_78%,rgba(0,0,0,0.75)_100%)]" />
        <motion.div style={{ opacity: glow }} className="absolute inset-0 rounded-full bg-white" />
      </motion.div>
    </motion.div>
  );
}
