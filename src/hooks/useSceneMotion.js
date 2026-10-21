"use client";

import { useTransform } from "framer-motion";
import { useExperience } from "@/components/experience/ExperienceContext";
import { blurFilter, easeOutCubic, lerp, progressIn } from "@/lib/math";

/** Shortcut for a motion value derived from the shared scroll position. */
export function useProgressTransform(transformer) {
  const { progress } = useExperience();
  return useTransform(progress, transformer);
}

/** "visible" while the scroll position is inside [start, end], otherwise "hidden". */
export function useVisibility(start, end) {
  return useProgressTransform((u) => (u >= start && u <= end ? "visible" : "hidden"));
}

/** "auto" while the scroll position is inside [start, end], so only the live scene is clickable. */
export function usePointerEvents(start, end) {
  return useProgressTransform((u) => (u >= start && u <= end ? "auto" : "none"));
}

/**
 * Fly-through camera move: the scene grows in from the distance on `enter`
 * and rushes past the viewer on `exit`.
 */
export function useZoomThrough({ enter, exit, enterFrom = 0.45, exitTo = 6 }) {
  const scale = useProgressTransform((u) => {
    if (enter && u < enter[1]) {
      return lerp(enterFrom, 1, easeOutCubic(progressIn(u, enter[0], enter[1])));
    }
    if (exit && u > exit[0]) {
      return Math.pow(exitTo, Math.pow(progressIn(u, exit[0], exit[1]), 1.6));
    }
    return 1;
  });

  const opacity = useProgressTransform((u) => {
    let value = 1;
    if (enter) value *= easeOutCubic(progressIn(u, enter[0], lerp(enter[0], enter[1], 0.75)));
    if (exit) value *= 1 - Math.pow(progressIn(u, lerp(exit[0], exit[1], 0.3), exit[1]), 1.1);
    return value;
  });

  const visibility = useVisibility(enter ? enter[0] : -Infinity, exit ? exit[1] : Infinity);

  return { scale, opacity, visibility };
}

/** Soft fade + blur in/out used by flat (non-zooming) scenes. */
export function useFadeBlur({ enter, exit, enterY = 0, exitY = 0, maxBlur = 8 }) {
  const opacity = useProgressTransform((u) => {
    let value = 1;
    if (enter) value *= progressIn(u, enter[0], enter[1]);
    if (exit) value *= 1 - progressIn(u, exit[0], exit[1]);
    return value;
  });

  const filter = useProgressTransform((u) => {
    let amount = 0;
    if (enter) amount += 1 - progressIn(u, enter[0], enter[1]);
    if (exit) amount += progressIn(u, exit[0], exit[1]);
    return blurFilter(Math.min(1, amount) * maxBlur);
  });

  const y = useProgressTransform((u) => {
    if (enter && u < enter[1]) return `${(1 - easeOutCubic(progressIn(u, enter[0], enter[1]))) * enterY}svh`;
    if (exit && u > exit[0]) return `${progressIn(u, exit[0], exit[1]) * exitY}svh`;
    return "0svh";
  });

  const visibility = useVisibility(enter ? enter[0] : -Infinity, exit ? exit[1] : Infinity);

  return { opacity, filter, y, visibility };
}
