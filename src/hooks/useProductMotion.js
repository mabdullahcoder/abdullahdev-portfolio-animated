"use client";

import { TIMELINE } from "@/lib/timeline";
import { blurFilter, clamp, easeOutCubic, progressIn } from "@/lib/math";
import { useProgressTransform } from "./useSceneMotion";

const { enter, exit, first, step } = TIMELINE.products;

/** How far (vh) a card sitting under the live one is pushed up, so its top edge peeks out. */
const PEEK_VH = 5;
const RECEDE_SCALE = 0.07;

/**
 * Scroll-driven motion for one card in the stacked product deck.
 * `p` is the card's offset from centre stage: -1 = waiting below, 0 = live, 1 = buried under the next card.
 * The first card fades in from the previous scene and the last one dissolves into the next.
 */
export function useProductMotion(index, count) {
  const isFirst = index === 0;
  const isLast = index === count - 1;
  const center = first + index * step;
  const offset = (u) => (u - center) / step;

  const enterT = (u) => easeOutCubic(progressIn(u, enter[0], enter[1]));
  const exitT = (u) => progressIn(u, exit[0], exit[1]);

  const visibleFrom = isFirst ? enter[0] : center - step;
  const visibleTo = isLast ? exit[1] : center + step * 1.3;

  const y = useProgressTransform((u) => {
    const p = offset(u);
    if (p < 0) return isFirst ? `${(1 - enterT(u)) * 6}svh` : `${clamp(-p) * 105}svh`;
    return isLast ? `${-exitT(u) * 4}svh` : `${-clamp(p) * PEEK_VH}svh`;
  });

  const scale = useProgressTransform((u) => {
    const p = offset(u);
    if (p < 0) return isFirst ? 0.94 + 0.06 * enterT(u) : 1;
    return isLast ? 1 - 0.04 * exitT(u) : 1 - RECEDE_SCALE * clamp(p);
  });

  const opacity = useProgressTransform((u) => {
    const p = offset(u);
    if (p < 0) return isFirst ? enterT(u) : 1;
    return isLast ? 1 - exitT(u) : 1 - progressIn(p, 0.85, 1.25);
  });

  const filter = useProgressTransform((u) => {
    if (isFirst && u < center) return blurFilter((1 - enterT(u)) * 8);
    if (isLast && u > center) return blurFilter(exitT(u) * 8);
    return "none";
  });

  /** Darkens a card as it gets buried under the next one. */
  const dim = useProgressTransform((u) => {
    const p = offset(u);
    return p > 0 && !isLast ? clamp(p) * 0.7 : 0;
  });

  /** Media lags slightly behind its card while sliding in, for a touch of depth. */
  const mediaY = useProgressTransform((u) => {
    const p = offset(u);
    return p < 0 && !isFirst ? `${clamp(-p) * 12}%` : "0%";
  });

  /** 0 → 1 as the card rises into place; fills its segment in the deck progress bar. */
  const arrival = useProgressTransform((u) => (isFirst ? enterT(u) : clamp(1 + offset(u))));

  const visibility = useProgressTransform((u) => (u >= visibleFrom && u <= visibleTo ? "visible" : "hidden"));
  const pointerEvents = useProgressTransform((u) => (Math.abs(offset(u)) < 0.45 ? "auto" : "none"));

  return {
    card: { y, scale, opacity, filter, visibility, pointerEvents, zIndex: index },
    dim,
    mediaY,
    arrival,
  };
}
