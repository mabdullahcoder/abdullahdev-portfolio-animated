"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GUTTER_INSET, STAGE_Y } from "@/lib/ui";
import { useProductMotion } from "@/hooks/useProductMotion";
import DeckProgress from "./DeckProgress";
import ProductLogo from "./ProductLogo";
import ProductVisualFrame from "./ProductVisualFrame";
import ProjectShot from "./ProjectShot";
import { PRODUCT_VISUALS } from "./visuals";

const pad = (n) => String(n).padStart(2, "0");

/**
 * One card in the stacked product deck: story on the left, project media on the right.
 * Shows the real screenshot (`shot`) when one exists, otherwise the illustrative mockup.
 */
export default function ProductCard({ product, index, count, shot }) {
  const { card, dim, mediaY, arrival } = useProductMotion(index, count);
  const Visual = PRODUCT_VISUALS[product.visual];
  const { accent } = product;

  return (
    <motion.article
      aria-label={product.name}
      style={{ ...card, transformOrigin: "50% 0%" }}
      className={`absolute ${STAGE_Y} ${GUTTER_INSET}`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[var(--card-radius)] border border-ink/10 bg-card shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] light:shadow-[0_40px_100px_-40px_rgba(20,30,70,0.35)] lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] short:grid short:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Ambient brand light, sheen and top edge highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(70% 90% at 82% 50%, ${accent}38, transparent 70%), radial-gradient(45% 70% at 0% 100%, ${accent}24, transparent 70%)`,
          }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_35%)]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]"
        />

        {/* Product scene — on phones/tablets it takes whatever height the story leaves, so there's no dead gap */}
        <div className="relative order-first m-[var(--card-pad)] min-h-[28%] flex-1 overflow-hidden rounded-[calc(var(--card-radius)-var(--card-pad))] lg:order-last lg:min-h-0 short:order-last short:min-h-0">
          <ProductVisualFrame>
            <motion.div aria-hidden style={{ y: mediaY }} className="@container absolute inset-0">
              {shot ? <ProjectShot project={product} src={shot} /> : <Visual />}
            </motion.div>
          </ProductVisualFrame>
        </div>

        {/* Story */}
        <div className="relative flex shrink-0 flex-col px-[clamp(1.25rem,4vw,2.5rem)] pb-[clamp(1.25rem,4vw,2.5rem)] pt-[clamp(0.625rem,2vw,1.5rem)] lg:min-h-0 lg:p-[clamp(1.5rem,3.1vw,3.5rem)] short:p-4">
          <header className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-[clamp(0.6rem,1vw,1.1rem)]">
              <span className="text-[clamp(1.7rem,7vw,2.6rem)] lg:text-[clamp(1.6rem,2.5vw,2.9rem)] short:text-[1.4rem]">
                <ProductLogo id={product.logo} />
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-[clamp(1.05rem,4.4vw,1.5rem)] font-semibold leading-none tracking-[-0.02em] lg:text-[clamp(1.05rem,1.6vw,1.9rem)] short:text-[0.95rem]">
                  {product.name}
                </h3>
                <p className="mt-[0.5em] truncate font-mono text-[clamp(0.55rem,2.4vw,0.75rem)] font-bold uppercase tracking-[0.1em] text-ink/45 lg:text-[clamp(0.55rem,0.7vw,0.8rem)]">
                  {product.tags.join(" · ")}
                </p>
              </div>
            </div>
            <span className="shrink-0 font-mono text-[clamp(0.6rem,2.4vw,0.8rem)] font-bold tracking-[0.1em] text-ink/35 lg:text-[clamp(0.6rem,0.8vw,0.9rem)]">
              {pad(index + 1)}
            </span>
          </header>

          <div className="mt-[var(--space-caption)] lg:mt-auto lg:pt-[var(--space-caption)] short:mt-auto">
            <h4 className="text-balance bg-[linear-gradient(180deg,var(--ink)_30%,color-mix(in_srgb,var(--ink)_62%,transparent))] bg-clip-text text-[clamp(1.45rem,6.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-transparent lg:text-[clamp(1.6rem,min(2.95vw,5.2svh),3.6rem)] short:text-[1.15rem]">
              {product.headline.join(" ")}
            </h4>
            <p className="mt-[clamp(0.6rem,1.8svh,1.2rem)] line-clamp-3 max-w-[56ch] text-[clamp(0.8rem,3.4vw,1.05rem)] leading-[1.55] text-ink/60 lg:line-clamp-5 lg:text-[clamp(0.8rem,min(1.05vw,1.9svh),1.15rem)] short:line-clamp-2 short:text-[0.75rem]">
              {product.description}
            </p>
          </div>

          <footer className="mt-[clamp(1rem,3.5svh,2.25rem)] flex items-center gap-[clamp(0.9rem,1.6vw,1.75rem)] short:mt-3">
            <motion.a
              href={product.url}
              target={product.url.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex shrink-0 items-center gap-[0.75em] rounded-full bg-ink py-[0.35em] pl-[1.2em] pr-[0.35em] text-[clamp(0.8rem,3.4vw,0.95rem)] font-semibold text-space lg:text-[clamp(0.75rem,0.95vw,1.05rem)] short:text-[0.75rem]"
            >
              View project
              <span className="flex h-[2.1em] w-[2.1em] items-center justify-center rounded-full bg-space text-ink transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight aria-hidden className="h-[1.05em] w-[1.05em]" strokeWidth={2.25} />
              </span>
            </motion.a>

            <div className="flex min-w-0 flex-1 items-center gap-[clamp(0.6rem,1vw,1rem)]">
              <DeckProgress index={index} accent={accent} fill={arrival} />
              <span className="shrink-0 font-mono tabular-nums text-[clamp(0.6rem,2.4vw,0.8rem)] font-bold tracking-[0.08em] text-ink/45 lg:text-[clamp(0.55rem,0.75vw,0.85rem)]">
                <span className="text-ink">{pad(index + 1)}</span>/{pad(count)}
              </span>
            </div>
          </footer>
        </div>

        {/* Dims the card as the next one stacks over it */}
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-10 bg-space" />
      </div>
    </motion.article>
  );
}
