import { ArrowUp, Check, ChevronDown, Mic, Sparkles } from "lucide-react";
import { Callout, PhoneFrame, StatusBar } from "./primitives";

const MODELS = [
  { name: "GPT-4o", vendor: "OpenAI", color: "#10a37f", active: true },
  { name: "Claude 3.5 Sonnet", vendor: "Anthropic", color: "#d97757" },
  { name: "Gemini 1.5 Pro", vendor: "Google", color: "#4285f4" },
  { name: "DeepSeek V3", vendor: "DeepSeek", color: "#4d6bfe" },
  { name: "Llama 3.1 405B", vendor: "Meta", color: "#0668e1" },
];

function ModelPicker() {
  return (
    <>
      <StatusBar />
      <div className="px-[8%] pt-[10%]">
        <p className="text-[1.9cqw] font-bold tracking-[-0.02em] text-[#11131a]">Choose a model</p>
        <p className="mt-[0.3cqw] text-[0.95cqw] text-[#8a90a3]">5 models, one chat</p>
        <ul className="mt-[7%] space-y-[0.7cqw]">
          {MODELS.map((m) => (
            <li
              key={m.name}
              className={`flex items-center gap-[0.9cqw] rounded-[0.9cqw] px-[1cqw] py-[0.85cqw] ${m.active ? "bg-[#eef0ff] ring-1 ring-[#6b7bff]/50" : "bg-[#f4f5f9]"}`}
            >
              <span className="h-[1.9cqw] w-[1.9cqw] shrink-0 rounded-[0.55cqw]" style={{ background: m.color }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[1.05cqw] font-semibold text-[#11131a]">{m.name}</p>
                <p className="text-[0.85cqw] text-[#8a90a3]">{m.vendor}</p>
              </div>
              {m.active && (
                <span className="flex h-[1.5cqw] w-[1.5cqw] items-center justify-center rounded-full bg-[#6b7bff]">
                  <Check aria-hidden className="h-[1cqw] w-[1cqw] text-white" strokeWidth={3.5} />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function ChatThread() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="flex flex-1 flex-col px-[7%] pb-[7%] pt-[8%]">
        <span className="mx-auto flex items-center gap-[0.4cqw] rounded-full bg-[#f1f2f7] px-[1cqw] py-[0.45cqw] text-[1cqw] font-semibold text-[#11131a]">
          <span className="h-[1cqw] w-[1cqw] rounded-[0.3cqw] bg-[#10a37f]" /> GPT-4o
          <ChevronDown aria-hidden className="h-[1cqw] w-[1cqw] text-[#8a90a3]" />
        </span>
        <p className="ml-auto mt-[8%] max-w-[80%] rounded-[1.1cqw] rounded-br-[0.3cqw] bg-[#6b7bff] px-[1.2cqw] py-[0.8cqw] text-[1.05cqw] text-white">
          Draw a cozy cabin at sunset
        </p>
        <div className="mt-[6%] max-w-[88%] rounded-[1.1cqw] rounded-bl-[0.3cqw] bg-[#f1f2f7] p-[0.8cqw]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[0.8cqw] bg-[linear-gradient(180deg,#ffb36b_0%,#f0745a_42%,#7b3f8f_75%,#2a1f4f_100%)]">
            <span className="absolute left-1/2 top-[30%] h-[22%] w-[22%] -translate-x-1/2 rounded-full bg-[#ffe3a8] opacity-90 blur-[0.3cqw]" />
            <span className="absolute inset-x-0 bottom-0 h-[38%] bg-[#1d1630] [clip-path:polygon(0_60%,22%_20%,40%_55%,62%_10%,82%_45%,100%_25%,100%_100%,0_100%)]" />
            <span className="absolute bottom-[14%] left-[38%] h-[22%] w-[24%] bg-[#3a2a1f] [clip-path:polygon(50%_0,100%_40%,100%_100%,0_100%,0_40%)]" />
            <span className="absolute bottom-[20%] left-[47%] h-[5%] w-[5%] rounded-[1px] bg-[#ffcf6b] shadow-[0_0_1cqw_#ffcf6b]" />
          </div>
          <p className="mt-[0.7cqw] text-[1cqw] text-[#30364a]">Here&apos;s your cabin. Want a night version?</p>
        </div>
        <div className="mt-auto flex items-center gap-[0.6cqw] rounded-full bg-[#f1f2f7] py-[0.45cqw] pl-[1.2cqw] pr-[0.45cqw] text-[1cqw] text-[#8a90a3] ring-1 ring-black/5">
          Ask anything…
          <Mic aria-hidden className="ml-auto h-[1.2cqw] w-[1.2cqw]" />
          <span className="flex h-[2.2cqw] w-[2.2cqw] items-center justify-center rounded-full bg-[#6b7bff]">
            <ArrowUp aria-hidden className="h-[1.2cqw] w-[1.2cqw] text-white" strokeWidth={3} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PolychatVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#b9c4fb]">
      <div className="absolute inset-0 bg-[conic-gradient(from_120deg_at_30%_40%,#e6eaff,#9daaf5,#d7dcff,#7f90ef,#c9d0ff,#e6eaff)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,transparent_40%,rgba(80,95,220,0.35)_100%)]" />
      <div className="absolute left-[55%] top-[45%] h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-[5cqw]" />

      <PhoneFrame
        bezel="light"
        className="left-[9%] top-[15%] h-[78%] rotate-[-8deg]"
        screenClassName="bg-white"
        style={{ boxShadow: "-1cqw 3cqw 7cqw -2cqw rgba(40,50,140,0.45)" }}
      >
        <ModelPicker />
      </PhoneFrame>
      <PhoneFrame
        bezel="light"
        className="left-[47%] top-[7%] h-[86%] rotate-[5deg]"
        screenClassName="bg-white"
        style={{ boxShadow: "-2cqw 4cqw 8cqw -2cqw rgba(40,50,140,0.55)" }}
      >
        <ChatThread />
      </PhoneFrame>

      <Callout shape="chip" className="bottom-[8%] left-[33%] flex items-center gap-[0.8cqw]">
        <Sparkles aria-hidden className="h-[1.5cqw] w-[1.5cqw] text-[#6b7bff]" />
        <span className="text-[1.1cqw] font-semibold">Streaming replies</span>
      </Callout>
    </div>
  );
}
