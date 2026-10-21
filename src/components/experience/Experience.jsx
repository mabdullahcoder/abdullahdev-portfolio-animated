"use client";

import { useCallback, useMemo, useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { STATS } from "@/data/content";
import { TIMELINE, TOTAL_UNITS } from "@/lib/timeline";
import Starfield from "@/components/background/Starfield";
import ChapterNav from "@/components/layout/ChapterNav";
import Header from "@/components/layout/Header";
import ContactScene from "@/components/sections/contact/ContactScene";
import HeroScene from "@/components/sections/HeroScene";
import MissionScene from "@/components/sections/MissionScene";
import EssentialScene from "@/components/sections/numbers/EssentialScene";
import StatScene from "@/components/sections/numbers/StatScene";
import PressScene from "@/components/sections/press/PressScene";
import ProductsScene from "@/components/sections/products/ProductsScene";
import { ExperienceProvider } from "./ExperienceContext";

/**
 * Scroll-driven single-page journey. A tall track provides the scroll distance while a
 * sticky full-screen stage renders every scene from one smoothed progress value.
 * `projectShots` maps project ids to screenshot paths found on the server (see lib/projectShots).
 */
export default function Experience({ projectShots = {} }) {
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const units = useTransform(scrollYProgress, (p) => p * TOTAL_UNITS);
  const progress = useSpring(units, { stiffness: 110, damping: 26, mass: 0.55, restDelta: 0.0005 });

  const scrollToUnit = useCallback((unit) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: track.offsetTop + (unit / TOTAL_UNITS) * scrollable, behavior: "smooth" });
  }, []);

  const context = useMemo(() => ({ progress, scrollToUnit }), [progress, scrollToUnit]);

  return (
    <ExperienceProvider value={context}>
      <main ref={trackRef} className="relative" style={{ height: `${(TOTAL_UNITS + 1) * 100}dvh` }}>
        <div className="sticky top-0 h-dvh w-full overflow-hidden bg-space">
          <Starfield />

          <HeroScene />
          <MissionScene />
          <StatScene {...TIMELINE.users} {...STATS.users} />
          <StatScene {...TIMELINE.mau} {...STATS.mau} />
          <EssentialScene />
          <ProductsScene shots={projectShots} />
          <PressScene />
          <ContactScene />

          <Header />
          <ChapterNav />
        </div>
      </main>
    </ExperienceProvider>
  );
}
