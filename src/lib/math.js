export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const lerp = (from, to, t) => from + (to - from) * t;

/** Normalised 0..1 position of `value` inside [start, end]. */
export const progressIn = (value, start, end) => clamp((value - start) / (end - start));

export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export const easeInCubic = (t) => t * t * t;

export const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const smoothstep = (t) => t * t * (3 - 2 * t);

/** Returns a CSS blur filter, or "none" when the blur is negligible. */
export const blurFilter = (px) => (px > 0.05 ? `blur(${px.toFixed(2)}px)` : "none");
