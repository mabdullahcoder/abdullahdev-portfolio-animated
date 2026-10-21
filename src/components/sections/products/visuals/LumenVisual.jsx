import { ArrowUp, Lock, Plus, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Line, PhoneFrame, StatusBar } from "./primitives";

const icon = "h-[1.2cqw] w-[1.2cqw] shrink-0";

function LumenGlyph({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className}>
      <rect width="20" height="20" rx="5.5" fill="#0b0d12" />
      <path d="M5 15.5c2.5-1 6.4-3.6 9.6-10.5.4 4.6-1 9.4-4.6 11.2-1.8.9-3.6.6-5-.7Z" fill="#fff" />
    </svg>
  );
}

export default function LumenVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(120%_100%_at_100%_0%,#4d7bff_0%,#1c2f8f_38%,#080c26_78%)]">
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_10%_100%,rgba(120,150,255,0.35),transparent_70%)]" />

      <div className="absolute left-[6%] top-[10%] flex aspect-[16/11] w-[76%] flex-col overflow-hidden rounded-[1.4cqw] bg-white shadow-[0_3cqw_8cqw_-2cqw_rgba(5,10,40,0.7)] ring-1 ring-white/30">
        <div className="flex items-end gap-[1.2cqw] bg-[#eef1f7] px-[1.6cqw] pt-[1.1cqw]">
          <span className="mb-[1cqw] flex gap-[0.6cqw]">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="h-[0.9cqw] w-[0.9cqw] rounded-full" style={{ background: c }} />
            ))}
          </span>
          <span className="flex items-center gap-[0.6cqw] rounded-t-[0.8cqw] bg-white px-[1.4cqw] py-[0.8cqw] text-[1.1cqw] font-medium text-[#1b2030]">
            <LumenGlyph className="h-[1.3cqw] w-[1.3cqw]" /> New tab
          </span>
          <span className="pb-[0.8cqw] text-[1.1cqw] text-[#6b7285]">Research notes</span>
          <Plus aria-hidden className={`${icon} mb-[0.8cqw] text-[#6b7285]`} />
        </div>
        <div className="flex items-center gap-[1cqw] border-b border-black/5 px-[1.6cqw] py-[0.9cqw]">
          <div className="flex flex-1 items-center gap-[0.8cqw] rounded-full bg-[#f1f3f8] px-[1.4cqw] py-[0.75cqw] text-[1.1cqw] text-[#6b7285]">
            <Lock aria-hidden className={icon} /> Ask Lumen about this page
          </div>
          <span className="flex items-center gap-[0.5cqw] rounded-full bg-[#e8efff] px-[1.2cqw] py-[0.7cqw] text-[1cqw] font-semibold text-[#2b5cff]">
            <ShieldCheck aria-hidden className={icon} /> Private
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1.3fr_1fr]">
          <div className="p-[2cqw]">
            <p className="text-[0.9cqw] font-semibold tracking-[0.12em] text-[#2b5cff]">TECH · 6 MIN READ</p>
            <p className="mt-[0.6cqw] text-[2cqw] font-bold leading-[1.1] tracking-[-0.02em] text-[#11131a]">
              The quiet revolution of on-device AI
            </p>
            <div className="mt-[1.4cqw] aspect-[16/8] overflow-hidden rounded-[0.8cqw] bg-[radial-gradient(60%_80%_at_70%_40%,#c9d6ff_0%,#4d6bff_30%,#0a1030_75%)]" />
            <div className="mt-[1.4cqw] space-y-[0.7cqw]">
              {[96, 88, 92, 60].map((w) => (
                <Line key={w} className="h-[0.55cqw] bg-[#11131a]/15" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>

          <div className="flex flex-col border-l border-black/5 bg-[#f7f8fc] p-[1.5cqw]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-[0.5cqw] text-[1.2cqw] font-semibold text-[#11131a]">
                <Sparkles aria-hidden className={`${icon} text-[#2b5cff]`} /> Lumen AI
              </span>
              <span className="rounded-full bg-[#11131a] px-[0.9cqw] py-[0.4cqw] text-[0.85cqw] font-semibold text-white">Beta</span>
            </div>
            <p className="ml-auto mt-[1.4cqw] rounded-[1cqw] rounded-br-[0.3cqw] bg-[#2b5cff] px-[1.1cqw] py-[0.7cqw] text-[1.05cqw] text-white">
              Summarize this page
            </p>
            <div className="mt-[1cqw] rounded-[1cqw] rounded-bl-[0.3cqw] bg-white p-[1.1cqw] text-[1cqw] leading-[1.45] text-[#30364a] ring-1 ring-black/5">
              <p className="font-semibold text-[#11131a]">Key points</p>
              <p>• Summary in one click</p>
              <p>• Highlights saved to your list</p>
              <p>• Works on any article</p>
            </div>
            <div className="mt-auto flex items-center gap-[0.6cqw] rounded-full bg-white py-[0.5cqw] pl-[1.1cqw] pr-[0.5cqw] text-[1cqw] text-[#8a90a3] ring-1 ring-black/5">
              Ask a follow-up…
              <span className="ml-auto flex h-[1.9cqw] w-[1.9cqw] items-center justify-center rounded-full bg-[#2b5cff]">
                <ArrowUp aria-hidden className="h-[1.1cqw] w-[1.1cqw] text-white" strokeWidth={3} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <PhoneFrame className="right-[5%] top-[27%] h-[72%]" screenClassName="bg-[#0d0f16]">
        <StatusBar tone="light" />
        <div className="px-[8%] pt-[12%]">
          <LumenGlyph className="mx-auto h-[3.4cqw] w-[3.4cqw] [&_rect]:fill-white [&_path]:fill-[#0b0d12]" />
          <div className="mt-[9%] flex items-center gap-[0.6cqw] rounded-full bg-white/10 px-[1.1cqw] py-[0.8cqw] text-[0.95cqw] text-white/60">
            <Search aria-hidden className="h-[1cqw] w-[1cqw]" /> Search privately
          </div>
          <div className="mt-[9%] flex items-center justify-between rounded-[1cqw] bg-white/[0.06] px-[1.1cqw] py-[0.9cqw]">
            <span className="text-[0.95cqw] font-medium text-white">Private mode</span>
            <span className="relative h-[1.4cqw] w-[2.5cqw] rounded-full bg-[#2b5cff]">
              <span className="absolute right-[0.2cqw] top-[0.2cqw] h-[1cqw] w-[1cqw] rounded-full bg-white" />
            </span>
          </div>
          <div className="mt-[10%] grid grid-cols-3 gap-[1.2cqw]">
            {["#ff5a5f", "#2fb36b", "#e7e7ea", "#7c5cff", "#f5b84a", "#3dbbff"].map((c) => (
              <span key={c} className="aspect-square rounded-[30%]" style={{ background: c }} />
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
