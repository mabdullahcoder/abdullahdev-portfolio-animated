"use client";

import { motion } from "framer-motion";
import { PARTNERS } from "@/data/partners";
import { TIMELINE } from "@/lib/timeline";
import { easeInOutCubic, lerp, progressIn } from "@/lib/math";
import { useProgressTransform } from "@/hooks/useSceneMotion";
import PartnerMark from "./PartnerMark";

const Dot = ({ className, small = false }) => (
  <span
    aria-hidden
    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ${small ? "h-1 w-1" : "h-[7px] w-[7px]"} ${className}`}
  />
);

/** Selection-style frame that stretches open and reveals a drifting strip of technology marks. */
export default function PartnersFrame() {
  const { frame, logos } = TIMELINE.essential;

  const width = useProgressTransform((u) => `${lerp(34, 100, easeInOutCubic(progressIn(u, frame[0], frame[1])))}%`);
  const frameOpacity = useProgressTransform((u) => progressIn(u, frame[0] - 0.1, frame[0] + 0.15));
  const contentOpacity = useProgressTransform((u) => progressIn(u, logos[0], logos[1]));

  return (
    <div className="flex w-full justify-center md:w-[52vw]">
      <motion.div
        style={{ width, opacity: frameOpacity }}
        className="relative h-[clamp(84px,17svh,180px)] border border-ink/45"
      >
        <Dot className="left-0 top-0" />
        <Dot className="left-full top-0" />
        <Dot className="left-0 top-full" />
        <Dot className="left-full top-full" />
        <Dot small className="left-[88%] top-0" />
        <Dot small className="left-[33%] top-full" />

        <motion.div style={{ opacity: contentOpacity }} className="absolute inset-0 flex flex-col overflow-hidden">
          <p className="pl-[0.2em] pt-[clamp(0.6rem,2.2svh,1.4rem)] text-center font-mono text-[clamp(0.55rem,0.78vw,0.85rem)] font-bold uppercase tracking-[0.2em] text-ink/55">
            My tech stack:
          </p>
          <div className="flex flex-1 items-center overflow-hidden">
            <motion.ul
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 32, ease: "linear", repeat: Infinity }}
              className="flex w-max shrink-0 items-center text-[clamp(0.65rem,1.3vw,1.4rem)]"
            >
              {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                <li
                  key={`${partner.id}-${index}`}
                  aria-hidden={index >= PARTNERS.length}
                  className="shrink-0 px-[clamp(0.9rem,2.1vw,2.4rem)] opacity-90 transition-opacity hover:opacity-100"
                >
                  <PartnerMark partner={partner} />
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
