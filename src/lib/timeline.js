import { progressIn, smoothstep } from "./math";

/**
 * Scroll choreography for the whole experience.
 * All values are expressed in "units", where 1 unit = one viewport height of scroll.
 */
export const TIMELINE = {
  hero: { exit: [0.1, 0.9] },
  mission: { enter: [0.45, 0.85], type: [0.6, 2.35], exit: [2.15, 2.95] },
  users: { enter: [2.5, 3.0], exit: [3.75, 4.45] },
  mau: { enter: [4.0, 4.5], exit: [5.25, 5.95] },
  essential: { enter: [5.5, 6.0], frame: [6.0, 6.55], logos: [6.3, 6.85], exit: [7.35, 7.8] },
  products: { enter: [7.45, 7.95], first: 7.95, step: 1, exit: [15.2, 15.65] },
  press: { title: [15.25, 15.7], cards: [15.45, 16.45], exit: [17.05, 17.45] },
  contact: { rise: [17.45, 18.75], settle: [18.75, 19.35] },
};

export const TOTAL_UNITS = 19.5;

/** Zoom-through transitions that light up the hyperspace star streaks. */
const WARP_WINDOWS = [
  TIMELINE.hero.exit,
  TIMELINE.mission.exit,
  TIMELINE.users.exit,
  TIMELINE.mau.exit,
];

/**
 * Accumulated "distance travelled" through warp windows at scroll position `u`.
 * Each window contributes one unit, eased so streaks peak mid-transition.
 */
export function warpDistance(u) {
  return WARP_WINDOWS.reduce((total, [start, end]) => total + smoothstep(progressIn(u, start, end)), 0);
}
