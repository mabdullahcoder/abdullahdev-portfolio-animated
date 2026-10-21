"use client";

import { motion } from "framer-motion";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import { PILL } from "@/lib/ui";

export default function SoundToggle() {
  const { enabled, toggle } = useAmbientSound();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      whileTap={{ scale: 0.95 }}
      className={PILL}
    >
      Sound: {enabled ? "On" : "Off"}
    </motion.button>
  );
}
