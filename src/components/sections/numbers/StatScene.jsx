"use client";

import { GUTTER_PAD } from "@/lib/ui";
import { useZoomThrough } from "@/hooks/useSceneMotion";
import MonoCaption from "@/components/ui/MonoCaption";
import ZoomLayer from "@/components/ui/ZoomLayer";

/** A single headline number that flies in from deep space and rushes past on exit. */
export default function StatScene({ enter, exit, eyebrow, value, caption }) {
  const style = useZoomThrough({ enter, exit });

  return (
    <ZoomLayer style={style} className="flex items-center justify-center">
      <div className={`flex flex-col items-center text-center ${GUTTER_PAD}`}>
        {eyebrow && <MonoCaption className="mb-[var(--space-caption)]">{eyebrow}</MonoCaption>}
        <h2 className="text-[clamp(2.4rem,6.5vw,7.5rem)] font-medium leading-[1.02] tracking-[-0.03em]">{value}</h2>
        {caption && <MonoCaption parts={caption} className="mt-[var(--space-caption)]" />}
      </div>
    </ZoomLayer>
  );
}
