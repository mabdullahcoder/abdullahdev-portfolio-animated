"use client";

import { MISSION } from "@/data/content";
import { TIMELINE } from "@/lib/timeline";
import { GUTTER_INSET } from "@/lib/ui";
import { useZoomThrough } from "@/hooks/useSceneMotion";
import ScrollTypewriter from "@/components/ui/ScrollTypewriter";
import ZoomLayer from "@/components/ui/ZoomLayer";

export default function MissionScene() {
  const style = useZoomThrough({ ...TIMELINE.mission, enterFrom: 0.94 });

  return (
    <ZoomLayer style={style}>
      <div className={`absolute top-[30svh] md:left-[12.5vw] md:right-[11vw] md:top-[36svh] ${GUTTER_INSET}`}>
        <ScrollTypewriter
          text={MISSION}
          range={TIMELINE.mission.type}
          className="text-[clamp(1.35rem,2.6vw,3rem)] font-semibold leading-[1.22] tracking-[-0.012em]"
        />
      </div>
    </ZoomLayer>
  );
}
