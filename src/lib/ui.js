/**
 * Shared class recipes, so repeated UI is identical wherever it appears.
 * Values come from the layout tokens in app/globals.css.
 */

/** Header pill buttons (sound, theme): same height, type and surface. */
export const PILL =
  "inline-flex h-[2.6em] items-center justify-center gap-[0.6em] rounded-full bg-ink/[0.13] px-[1.1em] font-mono text-[clamp(0.625rem,1.05vw,1.05rem)] font-bold uppercase leading-none tracking-[0.04em] text-ink/85 backdrop-blur-sm transition-colors hover:bg-ink/20";

/** Vertical band that scene content occupies between the header and the chapter nav. */
export const STAGE_Y =
  "top-[12svh] bottom-[9svh] sm:top-[14svh] lg:top-[16svh] lg:bottom-[14svh] short:top-[17svh] short:bottom-[15svh]";

/** Left/right page margins, as absolute insets or as padding. */
export const GUTTER_INSET = "left-[var(--gutter-l)] right-[var(--gutter-r)]";
export const GUTTER_PAD = "pl-[var(--gutter-l)] pr-[var(--gutter-r)]";
