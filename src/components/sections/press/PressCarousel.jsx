"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PRESS } from "@/data/press";
import PressCard from "./PressCard";

/** Phone layout: a snapping, swipeable row of testimonial cards with a position indicator. */
export default function PressCarousel({ pointer }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const cardAt = (index) => trackRef.current?.children[index];

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    [...track.children].forEach((child, index) => {
      const distance = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  };

  const goTo = (index) => {
    const track = trackRef.current;
    const card = cardAt(index);
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-[var(--space-tile)] overflow-x-auto overscroll-x-contain px-[calc((100%-min(80vw,21rem))/2)] py-3 short:px-[calc((100%-min(42vw,21rem))/2)]"
      >
        {PRESS.map((item, index) => (
          <PressCard key={item.id} item={item} index={index} count={PRESS.length} pointer={pointer} variant="carousel" />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 short:mt-1">
        <ol className="flex items-center gap-1.5" aria-label="Testimonials">
          {PRESS.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show card ${index + 1} of ${PRESS.length}`}
                aria-current={index === active ? "true" : undefined}
                className="flex h-6 items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${index === active ? "w-5 bg-ink" : "w-1.5 bg-ink/25"}`}
                />
              </button>
            </li>
          ))}
        </ol>
        <span className="flex items-center gap-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/45">
          Swipe <ArrowRight aria-hidden className="h-3 w-3" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}
