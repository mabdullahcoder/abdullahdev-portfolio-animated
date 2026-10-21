import { ArrowUp, Asterisk, Download, Lock, WifiOff } from "lucide-react";
import { AppWindow, Callout } from "./primitives";

const MODELS = [
  { name: "Llama 3.1 8B", size: "4.7 GB" },
  { name: "Qwen 2.5 7B", size: "4.4 GB", active: true },
  { name: "Mistral 7B", size: "4.1 GB" },
  { name: "Gemma 2 9B", size: "5.4 GB" },
];

const PLAN = [
  ["Day 1", "Old Town walk and Town Hall Square"],
  ["Day 2", "Kadriorg Park and the Kumu museum"],
  ["Day 3", "Telliskivi Creative City and Kalamaja"],
];

export default function LocalMindVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070a14]">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_100%,#2f6bff_0%,#1c3fae_30%,transparent_65%),radial-gradient(50%_40%_at_0%_0%,rgba(90,130,255,0.55),transparent_70%)]" />

      <AppWindow title="LocalMind" className="inset-[8%_5%_-4%_5%]">
        <div className="grid h-full grid-cols-[0.4fr_1fr]">
          <aside className="flex flex-col border-r border-white/[0.06] bg-[#111318] p-[1.6cqw]">
            <div className="flex items-center gap-[0.8cqw] text-[1.45cqw] font-semibold text-white">
              <span className="flex h-[2.4cqw] w-[2.4cqw] items-center justify-center rounded-[0.6cqw] bg-white">
                <Asterisk aria-hidden className="h-[1.6cqw] w-[1.6cqw] text-[#0b0d12]" strokeWidth={3} />
              </span>
              Models
            </div>
            <ul className="mt-[1.6cqw] space-y-[0.5cqw]">
              {MODELS.map((m) => (
                <li
                  key={m.name}
                  className={`rounded-[0.8cqw] px-[1cqw] py-[0.85cqw] ${m.active ? "bg-[#4f8cff]/15 ring-1 ring-[#4f8cff]/40" : ""}`}
                >
                  <p className={`truncate text-[1.25cqw] font-semibold ${m.active ? "text-white" : "text-white/70"}`}>{m.name}</p>
                  <p className="text-[1cqw] text-white/35">{m.size} · on disk</p>
                </li>
              ))}
            </ul>
            <div className="mt-[1.6cqw] rounded-[0.9cqw] bg-white/[0.05] p-[1.2cqw] ring-1 ring-white/[0.06]">
              <p className="flex items-center gap-[0.5cqw] text-[1.1cqw] font-semibold text-white">
                <Download aria-hidden className="h-[1.3cqw] w-[1.3cqw] text-[#4f8cff]" /> DeepSeek R1 8B
              </p>
              <div className="mt-[0.8cqw] h-[0.6cqw] overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[68%] rounded-full bg-[linear-gradient(90deg,#4f8cff,#9ec2ff)]" />
              </div>
              <p className="mt-[0.5cqw] text-[0.95cqw] text-white/40">68% · 3.1 of 4.9 GB</p>
            </div>
          </aside>

          <section className="flex flex-col p-[2cqw]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-[1.3cqw]">
              <span className="text-[1.6cqw] font-semibold text-white">Qwen 2.5 7B</span>
              <span className="flex gap-[0.6cqw] text-[1cqw] font-semibold">
                <span className="rounded-full bg-[#3fd36f]/15 px-[0.9cqw] py-[0.35cqw] text-[#6ee79a]">Local</span>
                <span className="flex items-center gap-[0.35cqw] rounded-full bg-white/[0.08] px-[0.9cqw] py-[0.35cqw] text-white/70">
                  <WifiOff aria-hidden className="h-[1.05cqw] w-[1.05cqw]" /> Offline
                </span>
              </span>
            </div>

            <p className="ml-auto mt-[1.8cqw] max-w-[72%] rounded-[1.2cqw] rounded-br-[0.3cqw] bg-[#4f8cff] px-[1.4cqw] py-[0.9cqw] text-[1.25cqw] text-white">
              Plan a 3-day trip to Tallinn
            </p>
            <div className="mt-[1.4cqw] max-w-[90%] rounded-[1.2cqw] rounded-bl-[0.3cqw] bg-white/[0.05] p-[1.4cqw] text-[1.2cqw] leading-[1.55] text-white/75 ring-1 ring-white/[0.06]">
              {PLAN.map(([day, text]) => (
                <p key={day}>
                  <span className="font-semibold text-white">{day}</span> — {text}
                </p>
              ))}
              <p className="mt-[0.7cqw] font-mono text-[0.95cqw] text-white/35">42 tok/s · on-device</p>
            </div>
            <p className="ml-auto mt-[1.4cqw] max-w-[72%] rounded-[1.2cqw] rounded-br-[0.3cqw] bg-[#4f8cff] px-[1.4cqw] py-[0.9cqw] text-[1.25cqw] text-white">
              Make day 2 more relaxed
            </p>
            <span className="mt-[1.4cqw] flex w-fit gap-[0.5cqw] rounded-full bg-white/[0.05] px-[1.3cqw] py-[1cqw] ring-1 ring-white/[0.06]">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="h-[0.8cqw] w-[0.8cqw] rounded-full bg-white/50" style={{ opacity: 1 - dot * 0.25 }} />
              ))}
            </span>

            <div className="mb-[5cqw] mt-auto flex items-center gap-[0.6cqw] rounded-[1.1cqw] bg-white/[0.05] py-[0.7cqw] pl-[1.4cqw] pr-[0.7cqw] text-[1.2cqw] text-white/35 ring-1 ring-white/10">
              Message Qwen 2.5…
              <span className="ml-auto flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-[0.7cqw] bg-[#4f8cff]">
                <ArrowUp aria-hidden className="h-[1.4cqw] w-[1.4cqw] text-white" strokeWidth={3} />
              </span>
            </div>
          </section>
        </div>
      </AppWindow>

      <Callout tone="dark" shape="chip" className="bottom-[7%] left-[3%] flex items-center gap-[0.9cqw]">
        <span className="flex h-[2.8cqw] w-[2.8cqw] items-center justify-center rounded-full bg-[#4f8cff]">
          <Lock aria-hidden className="h-[1.4cqw] w-[1.4cqw] text-white" strokeWidth={2.5} />
        </span>
        <div>
          <p className="text-[1.2cqw] font-bold">100% offline</p>
          <p className="text-[0.95cqw] text-white/55">No data leaves your machine</p>
        </div>
      </Callout>
    </div>
  );
}
