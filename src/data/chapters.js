import { TIMELINE, TOTAL_UNITS } from "@/lib/timeline";

/**
 * Bottom timeline navigation.
 * `from`   – scroll unit at which the chapter becomes the highlighted one.
 * `anchor` – scroll unit the page travels to when the label is clicked.
 */
export const CHAPTERS = [
  { id: "about", label: "About", from: 0, anchor: 0 },
  { id: "numbers", label: "Numbers", from: 0.3, anchor: TIMELINE.users.enter[1] + 0.2 },
  { id: "stack", label: "Stack", from: 5.3, anchor: TIMELINE.essential.logos[1] + 0.1 },
  { id: "projects", label: "Projects", from: 7.6, anchor: TIMELINE.products.first },
  { id: "reviews", label: "Reviews", from: 15.3, anchor: TIMELINE.press.cards[1] + 0.15 },
  { id: "contact", label: "Contact", from: 17.35, anchor: TOTAL_UNITS },
];
