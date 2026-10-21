import { BadgeCheck, Eye, FileText, Link2, PenLine } from "lucide-react";
import { AppWindow, Callout, Line } from "./primitives";

const PAPERS = [
  { left: "3%", top: "6%", width: "22%", rotate: -18 },
  { left: "76%", top: "2%", width: "20%", rotate: 14 },
  { left: "82%", top: "66%", width: "18%", rotate: -10 },
  { left: "-2%", top: "70%", width: "20%", rotate: 22 },
];

const TRAIL = [
  { label: "Document created", time: "10:02", Icon: FileText },
  { label: "Viewed by Mark R.", time: "10:15", Icon: Eye },
  { label: "Signed by Anna K.", time: "10:21", Icon: PenLine },
  { label: "Anchored on-chain", time: "10:22", Icon: Link2, done: true },
];

export default function SignChainVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(160deg,#5a86f0_0%,#2f5fd6_55%,#1d43b0_100%)]">
      {PAPERS.map((paper, i) => (
        <span
          key={i}
          className="absolute aspect-[3/4] rounded-[0.4cqw] bg-white/85 shadow-[0_1.5cqw_4cqw_rgba(10,30,100,0.35)]"
          style={{ left: paper.left, top: paper.top, width: paper.width, transform: `rotate(${paper.rotate}deg)` }}
        />
      ))}

      <AppWindow tone="light" title="Partnership_Agreement.pdf" className="inset-[10%_8%_-4%_8%]">
        <div className="grid h-full grid-cols-[1.55fr_1fr]">
          <div className="bg-[#f5f7fb] p-[2.2cqw]">
            <div className="h-full rounded-[0.6cqw] bg-white p-[2cqw] shadow-[0_0.5cqw_2cqw_rgba(20,40,100,0.08)]">
              <p className="text-[1.45cqw] font-bold tracking-[0.12em] text-[#11131a]">PARTNERSHIP AGREEMENT</p>
              <p className="mt-[0.4cqw] text-[0.9cqw] text-[#8a90a3]">Effective October 21, 2026</p>
              <div className="mt-[1.6cqw] space-y-[0.7cqw]">
                {[98, 92, 96, 70, 94, 88, 60].map((w, i) => (
                  <Line key={i} className="h-[0.5cqw] bg-[#11131a]/12" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="mt-[2cqw] grid grid-cols-2 gap-[1.2cqw]">
                <div className="rounded-[0.8cqw] border border-[#21c26a]/40 bg-[#21c26a]/[0.06] p-[1cqw]">
                  <p className="text-[0.85cqw] text-[#8a90a3]">Party A</p>
                  <svg viewBox="0 0 80 24" aria-hidden className="mt-[0.3cqw] h-[2.4cqw] w-full text-[#1d43b0]">
                    <path d="M2 18c8-14 14-14 12 0s10-16 16-6 8 6 14-4 10 8 16 2 10-6 18-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="flex items-center gap-[0.3cqw] text-[0.9cqw] font-semibold text-[#159447]">
                    <BadgeCheck aria-hidden className="h-[1cqw] w-[1cqw]" /> Signed
                  </p>
                </div>
                <div className="rounded-[0.8cqw] border border-dashed border-[#2f5fd6]/50 p-[1cqw]">
                  <p className="text-[0.85cqw] text-[#8a90a3]">Party B</p>
                  <p className="mt-[1.1cqw] text-[0.95cqw] font-semibold text-[#2f5fd6]">Sign here</p>
                  <p className="text-[0.85cqw] text-[#8a90a3]">Awaiting signature</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="border-l border-black/5 p-[1.8cqw]">
            <p className="text-[1.3cqw] font-semibold text-[#11131a]">Audit trail</p>
            <ol className="relative mt-[1.6cqw] space-y-[1.6cqw] before:absolute before:bottom-[1cqw] before:left-[1.1cqw] before:top-[1cqw] before:w-px before:bg-black/10">
              {TRAIL.map(({ label, time, Icon, done }) => (
                <li key={label} className="relative flex items-start gap-[1cqw]">
                  <span
                    className={`flex h-[2.2cqw] w-[2.2cqw] shrink-0 items-center justify-center rounded-full ring-[0.3cqw] ring-white ${done ? "bg-[#21c26a] text-white" : "bg-[#eef1fb] text-[#2f5fd6]"}`}
                  >
                    <Icon aria-hidden className="h-[1.1cqw] w-[1.1cqw]" />
                  </span>
                  <div>
                    <p className="text-[1.02cqw] font-semibold text-[#11131a]">{label}</p>
                    <p className="text-[0.88cqw] text-[#8a90a3]">Today · {time}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-[2cqw] rounded-[0.8cqw] bg-[#f5f7fb] p-[1cqw]">
              <p className="text-[0.85cqw] text-[#8a90a3]">Transaction</p>
              <p className="font-mono text-[0.95cqw] text-[#11131a]">0x8f3a…c21e</p>
            </div>
          </aside>
        </div>
      </AppWindow>

      <Callout shape="chip" className="left-[4%] top-[58%] flex items-center gap-[0.7cqw]">
        <BadgeCheck aria-hidden className="h-[1.6cqw] w-[1.6cqw] text-[#21c26a]" />
        <div>
          <p className="text-[1.1cqw] font-bold">Verified on-chain</p>
          <p className="text-[0.9cqw] text-[#5b6175]">Tamper-proof record</p>
        </div>
      </Callout>
    </div>
  );
}
