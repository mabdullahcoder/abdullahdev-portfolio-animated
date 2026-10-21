"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const TILT_DEG = 7;
const SPRING = { stiffness: 160, damping: 18, mass: 0.5 };

/** Wraps a product mockup with a glossy edge, a cursor-following glare and a gentle 3D tilt. */
export default function ProductVisualFrame({ children }) {
  const reduceMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(30);
  const glare = useMotionValue(0);

  const rotateX = useSpring(tiltX, SPRING);
  const rotateY = useSpring(tiltY, SPRING);
  const glareOpacity = useSpring(glare, SPRING);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 55%)`;

  const onPointerMove = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    tiltY.set((px - 0.5) * TILT_DEG);
    tiltX.set(-(py - 0.5) * TILT_DEG);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glare.set(1);
  };

  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    glare.set(0);
  };

  return (
    <div
      className="h-full w-full rounded-[inherit] [perspective:1400px]"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full overflow-hidden rounded-[inherit]">
        {children}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,transparent_28%,transparent_72%,rgba(0,0,0,0.18)_100%)]" />
        <motion.div
          style={{ background: glareBackground, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.35)]" />
      </motion.div>
    </div>
  );
}
