import { Activity, Bot, CalendarDays, Globe, Mail, Newspaper, Plus, Send, Settings, Sparkle, Zap } from "lucide-react";
import { AppWindow, Toggle } from "./primitives";

const NAV = [
  { label: "Agents", Icon: Bot },
  { label: "Skills", Icon: Zap, active: true },
  { label: "Runs", Icon: Activity },
  { label: "Settings", Icon: Settings },
];

const SKILLS = [
  { title: "Inbox triage", desc: "Labels mail and drafts replies", Icon: Mail, color: "#ea4335", on: true },
  { title: "Calendar assistant", desc: "Books meetings straight from chat", Icon: CalendarDays, color: "#4285f4", on: true },
  { title: "Telegram bridge", desc: "Talk to your agent from anywhere", Icon: Send, color: "#29a9eb", on: true },
  { title: "Web research", desc: "Turns sources into tidy notes", Icon: Globe, color: "#a855f7", on: false },
  { title: "Daily digest", desc: "Morning briefing every day at 8:00", Icon: Newspaper, color: "#f59e0b", on: true },
];

export default function TaskpilotVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1fae55]">
      <div className="absolute -inset-[20%] bg-[conic-gradient(from_200deg_at_40%_60%,#0e7a3c,#c9f04a,#27c763,#0b6b35,#9be35a,#18a04d,#0e7a3c)] blur-[1cqw]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.14)_0px,rgba(255,255,255,0.14)_2px,transparent_2px,transparent_14px)] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(35deg,rgba(0,60,20,0.25)_0px,rgba(0,60,20,0.25)_3px,transparent_3px,transparent_22px)]" />

      <AppWindow title="Taskpilot" className="inset-[9%_6%_-4%_6%]">
        <div className="grid h-full grid-cols-[0.34fr_1fr]">
          <aside className="flex flex-col border-r border-white/[0.06] bg-[#111318] p-[1.4cqw]">
            <div className="flex items-center gap-[0.6cqw] text-[1.2cqw] font-semibold text-white">
              <Sparkle aria-hidden className="h-[1.5cqw] w-[1.5cqw] fill-[#c8f23f] text-[#c8f23f]" /> Taskpilot
            </div>
            <nav className="mt-[2cqw] space-y-[0.4cqw]">
              {NAV.map(({ label, Icon, active }) => (
                <span
                  key={label}
                  className={`flex items-center gap-[0.7cqw] rounded-[0.7cqw] px-[0.9cqw] py-[0.65cqw] text-[1.05cqw] ${active ? "bg-white/[0.08] font-semibold text-white" : "text-white/45"}`}
                >
                  <Icon aria-hidden className="h-[1.2cqw] w-[1.2cqw]" /> {label}
                </span>
              ))}
            </nav>
            <div className="mt-auto rounded-[0.8cqw] bg-[#c8f23f]/10 p-[1cqw] ring-1 ring-[#c8f23f]/25">
              <p className="flex items-center gap-[0.5cqw] text-[0.95cqw] font-semibold text-[#d9f77a]">
                <span className="h-[0.7cqw] w-[0.7cqw] rounded-full bg-[#c8f23f] shadow-[0_0_1cqw_#c8f23f]" /> Running locally
              </p>
              <p className="mt-[0.3cqw] text-[0.85cqw] text-white/45">Your data stays on this Mac</p>
            </div>
          </aside>

          <section className="p-[2cqw]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[0.8cqw]">
                <span className="text-[2cqw] font-semibold tracking-[-0.02em] text-white">Skills</span>
                <span className="rounded-full bg-white/[0.08] px-[0.8cqw] py-[0.3cqw] text-[0.9cqw] font-semibold text-white/70">4 active</span>
              </div>
              <span className="flex items-center gap-[0.4cqw] rounded-full bg-[#c8f23f] px-[1.1cqw] py-[0.55cqw] text-[1cqw] font-semibold text-[#10200a]">
                <Plus aria-hidden className="h-[1.1cqw] w-[1.1cqw]" strokeWidth={3} /> New skill
              </span>
            </div>
            <ul className="mt-[1.6cqw] space-y-[0.8cqw]">
              {SKILLS.map(({ title, desc, Icon, color, on }) => (
                <li
                  key={title}
                  className="flex items-center gap-[1.1cqw] rounded-[1cqw] bg-white/[0.035] px-[1.2cqw] py-[1cqw] ring-1 ring-white/[0.05]"
                >
                  <span
                    className="flex h-[2.8cqw] w-[2.8cqw] shrink-0 items-center justify-center rounded-[0.8cqw]"
                    style={{ background: `${color}26`, color }}
                  >
                    <Icon aria-hidden className="h-[1.4cqw] w-[1.4cqw]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[1.15cqw] font-semibold text-white">{title}</p>
                    <p className="truncate text-[0.95cqw] text-white/45">{desc}</p>
                  </div>
                  <Toggle on={on} accent="#3fd36f" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </AppWindow>
    </div>
  );
}
