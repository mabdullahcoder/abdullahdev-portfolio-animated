"use client";

import { motion, useTransform } from "framer-motion";
import { ArrowUpRight, MessageSquareQuote, Star } from "lucide-react";
import { TIMELINE } from "@/lib/timeline";
import { blurFilter, easeOutCubic, progressIn } from "@/lib/math";
import { useProgressTransform } from "@/hooks/useSceneMotion";

const APPEAR_SPAN = 0.4;
/** Maximum parallax travel in px for a card at depth 1. */
const PARALLAX_PX = 16;

const AVATAR_GRADIENTS = [
  "linear-gradient(140deg,#7b8cff,#3b4fd8)",
  "linear-gradient(140deg,#c8f23f,#21a35a)",
  "linear-gradient(140deg,#5fd4ff,#2f5fd6)",
  "linear-gradient(140deg,#ffb36b,#e2477a)",
  "linear-gradient(140deg,#b07bff,#5b2fd6)",
  "linear-gradient(140deg,#4fe0b0,#127a6a)",
  "linear-gradient(140deg,#ffd25a,#e07a1f)",
];

const SOURCES = {
  testimonial: { label: "Testimonial", Icon: MessageSquareQuote },
  review: { label: "Client review", Icon: Star },
};

/** Placement, type scale and quote length per layout. */
const VARIANTS = {
  floating: {
    wrapper: "absolute left-[var(--x)] top-[var(--y)] w-[18.5%]",
    // Sized exactly as on a 16:9 screen; on wider/shorter windows the height term (0.95vw × 16/9)
    // takes over, so the whole arrangement scales down instead of colliding. Very short windows
    // also show one line less per quote.
    size: "p-[1.1em] text-[clamp(0.7rem,min(0.95vw,1.69svh),1.05rem)]",
    body: "line-clamp-4 min-h-[5em] [@media(max-height:699.98px)]:line-clamp-3 [@media(max-height:699.98px)]:min-h-[3.75em]",
  },
  grid: {
    wrapper: "min-w-0",
    size: "p-[1em] text-[0.8rem] md:text-[0.85rem]",
    body: "line-clamp-3 min-h-[3.75em]",
  },
  carousel: {
    wrapper: "w-[min(80vw,21rem)] shrink-0 snap-center short:w-[min(42vw,21rem)]",
    size: "p-[1.1em] text-[0.875rem] short:text-[0.8rem]",
    body: "line-clamp-4 min-h-[5em] short:line-clamp-3 short:min-h-[3.75em]",
  },
};

function initials(name) {
  const words = name.trim().split(/\s+/);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : name.replace(/^0x/i, "").slice(0, 2);
  return letters.toUpperCase();
}

/**
 * Frosted-glass testimonial card that resolves out of blur at its turn in the sequence.
 * `floating` cards are placed around the title and drift with the pointer; `grid` cards
 * fill the tablet grid; `carousel` cards sit in the swipe row.
 */
export default function PressCard({ item, index, count, pointer, variant = "floating", className = "" }) {
  const { cards } = TIMELINE.press;
  const start = cards[0] + ((cards[1] - cards[0] - APPEAR_SPAN) * index) / Math.max(1, count - 1);
  const appear = (u) => easeOutCubic(progressIn(u, start, start + APPEAR_SPAN));

  const opacity = useProgressTransform(appear);
  const scale = useProgressTransform((u) => 0.9 + 0.1 * appear(u));
  const filter = useProgressTransform((u) => blurFilter((1 - appear(u)) * 12));

  const driftX = useTransform(pointer.x, (v) => v * item.depth * -PARALLAX_PX);
  const driftY = useTransform(pointer.y, (v) => v * item.depth * -PARALLAX_PX * 0.7);

  const { label, Icon } = SOURCES[item.source] ?? SOURCES.testimonial;
  const styles = VARIANTS[variant];
  const isFloating = variant === "floating";

  return (
    <motion.div
      style={
        isFloating
          ? {
              x: driftX,
              y: driftY,
              zIndex: Math.round(item.depth * 10),
              "--x": `${item.position.x}%`,
              "--y": `${item.position.y}%`,
            }
          : undefined
      }
      className={`${styles.wrapper} ${className}`}
    >
      <motion.article
        style={{ opacity, scale, filter }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className={`group relative flex flex-col rounded-[clamp(10px,1vw,16px)] border border-white/[0.12] bg-[linear-gradient(180deg,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0.05)_100%)] backdrop-blur-xl transition-[border-color,background-color] duration-300 focus-within:border-white/40 hover:border-white/30 light:border-black/[0.06] light:bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.78)_100%)] light:focus-within:border-black/30 light:hover:border-black/15 ${styles.size}`}
      >
        <header className="flex items-center gap-[0.7em]">
          <span
            aria-hidden
            className="flex h-[2.5em] w-[2.5em] shrink-0 items-center justify-center rounded-full text-[0.8em] font-bold text-white ring-1 ring-white/20"
            style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
          >
            {initials(item.author)}
          </span>
          <div className="min-w-0 leading-tight">
            <h3 className="truncate font-semibold text-ink">{item.author}</h3>
            <p className="truncate text-[0.88em] text-ink/50">{item.role}</p>
          </div>
        </header>

        <p className={`mt-[0.85em] leading-[1.25] tracking-[-0.005em] text-ink/85 ${styles.body}`}>
          {item.lead && <strong className="font-semibold text-ink">{item.lead} </strong>}
          {item.body}
        </p>

        <footer className="mt-[0.9em] flex items-center justify-between gap-2 border-t border-ink/10 pt-[0.8em] font-mono text-[0.68em] font-bold uppercase tracking-[0.06em]">
          <span className="flex min-w-0 items-center gap-[0.5em] text-ink/40">
            <Icon aria-hidden className="h-[1.3em] w-[1.3em] shrink-0" strokeWidth={2} />
            <span className="truncate">{label}</span>
          </span>
          <a
            href={item.url}
            aria-label={`Read more from ${item.author}`}
            className="flex shrink-0 items-center gap-[0.3em] text-ink/80 transition-colors after:absolute after:inset-0 group-hover:text-ink"
          >
            Read more
            <ArrowUpRight
              aria-hidden
              className="h-[1.3em] w-[1.3em] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.25}
            />
          </a>
        </footer>
      </motion.article>
    </motion.div>
  );
}
