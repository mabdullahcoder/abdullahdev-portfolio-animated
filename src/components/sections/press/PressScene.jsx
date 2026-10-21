"use client";

import { motion } from "framer-motion";
import { PRESS } from "@/data/press";
import { PRESS_TITLE } from "@/data/content";
import { TIMELINE } from "@/lib/timeline";
import { blurFilter, progressIn } from "@/lib/math";
import { GUTTER_PAD, STAGE_Y } from "@/lib/ui";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { usePointerEvents, useProgressTransform, useVisibility } from "@/hooks/useSceneMotion";
import PressCard from "./PressCard";
import PressCarousel from "./PressCarousel";

const TITLE_TYPE = "text-center font-medium leading-[1.04] tracking-[-0.03em]";
/** Tablet grid: four cards above the title, three below (the last one centred). */
const GRID_SPLIT = 4;
const GRID = "grid w-full max-w-[48rem] grid-cols-2 gap-[var(--space-tile)]";

/**
 * Exactly one layout is shown per viewport (see the .press-* classes in globals.css):
 * floating cards around the title, a 2-column grid on tall tablets, or a swipe row.
 */
export default function PressScene() {
  const { title, cards, exit } = TIMELINE.press;
  const pointer = usePointerParallax();

  const visibility = useVisibility(title[0], exit[1]);
  const pointerEvents = usePointerEvents(cards[0], exit[0]);

  const titleIn = (u) => progressIn(u, title[0], title[1]);
  const titleOpacity = useProgressTransform(titleIn);
  const titleScale = useProgressTransform((u) => 0.94 + 0.06 * titleIn(u));
  const titleFilter = useProgressTransform((u) => blurFilter((1 - titleIn(u)) * 8));
  const titleStyle = { opacity: titleOpacity, scale: titleScale, filter: titleFilter };

  const exitT = (u) => progressIn(u, exit[0], exit[1]);
  const sceneOpacity = useProgressTransform((u) => 1 - exitT(u));
  const sceneScale = useProgressTransform((u) => 1 + 0.06 * exitT(u));
  const sceneFilter = useProgressTransform((u) => blurFilter(exitT(u) * 8));

  const card = (item, index, variant, className) => (
    <PressCard
      key={item.id}
      item={item}
      index={index}
      count={PRESS.length}
      pointer={pointer}
      variant={variant}
      className={className}
    />
  );

  return (
    <motion.section
      aria-label="Testimonials"
      style={{ visibility, pointerEvents, opacity: sceneOpacity, scale: sceneScale, filter: sceneFilter }}
      className="absolute inset-0"
    >
      {/* Desktop: cards float around a centred title */}
      <div className="press-float absolute inset-0">
        <motion.h2
          style={titleStyle}
          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 text-[clamp(2rem,min(4.2vw,7.5svh),4.9rem)] ${TITLE_TYPE}`}
        >
          {PRESS_TITLE.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h2>
        {PRESS.map((item, index) => card(item, index, "floating"))}
      </div>

      {/* Tall tablets: title between two card grids */}
      <div
        className={`press-grid absolute inset-x-0 flex-col items-center justify-center gap-[var(--space-caption)] ${STAGE_Y} ${GUTTER_PAD}`}
      >
        <div className={GRID}>{PRESS.slice(0, GRID_SPLIT).map((item, index) => card(item, index, "grid"))}</div>
        <motion.h2 style={titleStyle} className={`py-[var(--space-caption)] text-[clamp(2rem,5vw,2.75rem)] ${TITLE_TYPE}`}>
          {PRESS_TITLE.join(" ")}
        </motion.h2>
        <div className={GRID}>
          {PRESS.slice(GRID_SPLIT).map((item, i) => {
            const index = GRID_SPLIT + i;
            const isLoneLast = index === PRESS.length - 1 && (PRESS.length - GRID_SPLIT) % 2 === 1;
            return card(
              item,
              index,
              "grid",
              isLoneLast ? "col-span-2 mx-auto w-[calc((100%-var(--space-tile))/2)]" : "",
            );
          })}
        </div>
      </div>

      {/* Phones and short screens: title above a swipe row */}
      <div
        className={`press-carousel absolute inset-x-0 flex-col items-center justify-center gap-[var(--space-block)] short:gap-[var(--space-caption)] ${STAGE_Y}`}
      >
        <motion.h2
          style={titleStyle}
          className={`text-[clamp(2.1rem,10vw,2.75rem)] short:text-[1.7rem] ${TITLE_TYPE} ${GUTTER_PAD}`}
        >
          {PRESS_TITLE.map((line) => (
            <span key={line} className="block short:inline">
              {line}{" "}
            </span>
          ))}
        </motion.h2>
        <PressCarousel pointer={pointer} />
      </div>
    </motion.section>
  );
}
