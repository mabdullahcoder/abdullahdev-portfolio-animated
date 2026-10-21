"use client";

import { motion } from "framer-motion";

/** Full-viewport layer that scales around the screen centre (the "camera" axis). */
export default function ZoomLayer({ style, className = "", children }) {
  return (
    <motion.div style={style} className={`absolute inset-0 origin-center ${className}`}>
      {children}
    </motion.div>
  );
}
