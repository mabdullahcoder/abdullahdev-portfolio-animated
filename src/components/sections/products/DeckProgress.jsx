"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { TIMELINE } from "@/lib/timeline";
import { useExperience } from "@/components/experience/ExperienceContext";

const { first, step } = TIMELINE.products;

/**
 * Segmented deck progress: past products stay lit, the live one widens and fills as its
 * card rises into place, and every segment jumps to its product.
 */
export default function DeckProgress({ index, accent, fill }) {
  const { scrollToUnit } = useExperience();

  return (
    <ol aria-label="Jump to project" className="flex flex-1 items-center gap-[3px]">
      {PRODUCTS.map((product, i) => {
        const isActive = i === index;

        return (
          <li key={product.id} className={`min-w-0 ${isActive ? "flex-[2.6]" : "flex-1"}`}>
            <button
              type="button"
              onClick={() => scrollToUnit(first + i * step)}
              aria-current={isActive ? "step" : undefined}
              className="group/seg relative block w-full cursor-pointer py-[10px]"
            >
              <span
                className={`relative block h-[3px] rounded-full transition-colors duration-300 ${
                  i < index ? "bg-ink/40 group-hover/seg:bg-ink/70" : "bg-ink/10 group-hover/seg:bg-ink/30"
                }`}
              >
                {isActive && (
                  <motion.span
                    style={{
                      scaleX: fill,
                      background: `linear-gradient(90deg, ${accent}80, ${accent})`,
                      boxShadow: `0 0 12px ${accent}`,
                    }}
                    className="absolute inset-0 origin-left rounded-full"
                  />
                )}
              </span>
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border border-ink/10 bg-card/90 px-[0.7em] py-[0.4em] font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] text-ink/80 opacity-0 transition-[opacity,transform] duration-200 group-hover/seg:translate-y-0 group-hover/seg:opacity-100 group-focus-visible/seg:translate-y-0 group-focus-visible/seg:opacity-100">
                {product.name}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
