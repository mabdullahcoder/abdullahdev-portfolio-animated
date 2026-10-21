import { Heart, Play, WandSparkles } from "lucide-react";
import { Callout, PhoneFrame, StatusBar } from "./primitives";

const EFFECTS = [
  { label: "Anime", from: "#3dd6ff", to: "#7c5cff" },
  { label: "Clay", from: "#ffb03a", to: "#e2477a" },
  { label: "Neon", from: "#ff5fa2", to: "#3a1f6b" },
  { label: "Retro", from: "#f5d76e", to: "#c0602b" },
  { label: "Comic", from: "#44e08f", to: "#127a6a" },
  { label: "Dream", from: "#b07bff", to: "#ff7a45" },
];

export default function MorphVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(90%_80%_at_40%_40%,#3fe08f_0%,#13a463_45%,#06512f_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_85%_15%,rgba(255,255,255,0.25),transparent_70%)]" />

      <PhoneFrame className="left-[33%] top-[7%] h-[100%]" screenClassName="bg-[#0f1115]">
        <StatusBar tone="light" />
        <div className="px-[7%] pt-[8%]">
          <div className="flex items-center justify-between">
            <span className="text-[1.9cqw] font-bold tracking-[-0.03em] text-white">morph</span>
            <span className="rounded-full bg-[linear-gradient(90deg,#3fe08f,#c8f23f)] px-[0.8cqw] py-[0.25cqw] text-[0.85cqw] font-bold text-[#06210f]">PRO</span>
          </div>
          <div className="relative mt-[6%] aspect-[4/4.4] overflow-hidden rounded-[1.2cqw] bg-[linear-gradient(160deg,#ff9a3c_0%,#ff4f7a_55%,#7a2cff_100%)]">
            <span className="absolute bottom-[-14%] left-[18%] aspect-square w-[64%] rounded-full bg-[radial-gradient(circle_at_50%_35%,#ffd2a8_0%,#e07a3f_45%,#5c2210_100%)]" />
            <span className="absolute left-[7%] top-[7%] rounded-full bg-black/35 px-[0.9cqw] py-[0.35cqw] text-[0.85cqw] font-semibold text-white backdrop-blur-sm">
              AI Effects
            </span>
            <span className="absolute bottom-[7%] left-[7%] text-[1.4cqw] font-bold leading-tight text-white drop-shadow">
              Anime
              <br />
              portrait
            </span>
          </div>
          <div className="mt-[6%] grid grid-cols-3 gap-[0.8cqw]">
            {EFFECTS.map(({ label, from, to }) => (
              <span
                key={label}
                className="relative flex aspect-[3/4] items-end overflow-hidden rounded-[0.8cqw] p-[0.5cqw]"
                style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}
              >
                <span className="text-[0.85cqw] font-semibold text-white drop-shadow">{label}</span>
              </span>
            ))}
          </div>
          <span className="mt-[6%] flex items-center justify-center gap-[0.5cqw] rounded-full bg-white py-[0.9cqw] text-[1.1cqw] font-bold text-[#0f1115]">
            <WandSparkles aria-hidden className="h-[1.2cqw] w-[1.2cqw]" /> Generate
          </span>
        </div>
      </PhoneFrame>

      <Callout shape="pill" className="left-[6%] top-[16%] flex items-center gap-[0.6cqw]">
        <Play aria-hidden className="h-[1.2cqw] w-[1.2cqw] fill-current text-[#0f5132]" />
        <span className="text-[1.2cqw] font-bold text-[#0f5132]">Export to Reels</span>
      </Callout>
      <span className="absolute right-[12%] top-[13%] flex aspect-square w-[10%] items-center justify-center rounded-[28%] bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285aeb_90%)] shadow-[0_2cqw_4cqw_-1cqw_rgba(0,0,0,0.4)]">
        <span className="aspect-square w-[50%] rounded-[30%] border-[0.35cqw] border-white" />
      </span>
      <span className="absolute right-[8%] top-[44%] aspect-square w-[12%] rounded-full bg-[radial-gradient(circle_at_50%_35%,#ffe1b8,#f08a4b_60%,#7a3415)] shadow-[0_2cqw_4cqw_-1cqw_rgba(0,0,0,0.4)] ring-[0.4cqw] ring-white/90" />
      <span className="absolute bottom-[16%] right-[14%] flex aspect-square w-[9%] items-center justify-center rounded-full bg-[#2f6bff] shadow-[0_2cqw_4cqw_-1cqw_rgba(0,0,0,0.4)]">
        <Heart aria-hidden className="h-[45%] w-[45%] fill-white text-white" />
      </span>
      <Callout className="bottom-[14%] left-[5%] w-[24%]">
        <p className="text-[0.95cqw] text-[#5b6175]">Rendering</p>
        <p className="text-[1.3cqw] font-bold">Clay portrait</p>
        <div className="mt-[0.7cqw] h-[0.6cqw] overflow-hidden rounded-full bg-[#e6e8f0]">
          <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#13a463,#c8f23f)]" />
        </div>
      </Callout>
    </div>
  );
}
