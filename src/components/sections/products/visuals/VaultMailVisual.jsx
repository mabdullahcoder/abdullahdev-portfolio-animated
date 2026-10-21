import { EyeOff, Lock, Paperclip, Search } from "lucide-react";
import { Callout, PhoneFrame, StatusBar } from "./primitives";

const MAILS = [
  { from: "Lena Park", time: "9:41", subject: "Q3 roadmap review", preview: "Here's the deck for tomorrow's sync…", color: "#ff8a5b", unread: true, lock: true },
  { from: "GitHub", time: "9:12", subject: "New sign-in to your account", preview: "We noticed a new sign-in from Tallinn…", color: "#24292f", unread: true },
  { from: "Figma", time: "Yesterday", subject: "3 comments on Onboarding v2", preview: "Marco: love the new empty states…", color: "#a259ff", clip: true },
  { from: "Stripe", time: "Yesterday", subject: "Your receipt #2041-7781", preview: "Payment to Vault Labs was successful", color: "#635bff", lock: true },
  { from: "Product Hunt", time: "Mon", subject: "You're featured today", preview: "Congrats! Your launch is live on the…", color: "#da552f" },
];

export default function VaultMailVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#7d98e8_0%,#4f72db_45%,#2346b8_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_80%_8%,rgba(255,255,255,0.5),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-[linear-gradient(0deg,rgba(10,22,90,0.55),transparent)]" />

      <PhoneFrame
        className="left-[7%] top-[7%] h-[104%] rotate-[-6deg]"
        screenClassName="bg-[#f7f8fb]"
        style={{ boxShadow: "3cqw 4cqw 9cqw -2cqw rgba(8,18,70,0.7)" }}
      >
        <StatusBar />
        <div className="px-[7%] pt-[9%]">
          <div className="flex items-center justify-between">
            <span className="text-[2.3cqw] font-bold tracking-[-0.02em] text-[#11131a]">Inbox</span>
            <span className="h-[2.4cqw] w-[2.4cqw] rounded-full bg-[linear-gradient(140deg,#7d98e8,#2346b8)]" />
          </div>
          <div className="mt-[5%] flex items-center gap-[0.6cqw] rounded-[0.9cqw] bg-[#eceef4] px-[1cqw] py-[0.7cqw] text-[1cqw] text-[#8a90a3]">
            <Search aria-hidden className="h-[1cqw] w-[1cqw]" /> Search mail
          </div>
          <div className="mt-[5%] flex gap-[0.5cqw] text-[0.95cqw] font-semibold">
            <span className="rounded-full bg-[#11131a] px-[1cqw] py-[0.45cqw] text-white">Primary</span>
            <span className="rounded-full bg-[#e6e8f0] px-[1cqw] py-[0.45cqw] text-[#5b6175]">Aliases</span>
            <span className="rounded-full bg-[#e6e8f0] px-[1cqw] py-[0.45cqw] text-[#5b6175]">Spam</span>
          </div>
          <ul className="mt-[5%] divide-y divide-black/5">
            {MAILS.map((mail) => (
              <li key={mail.from} className="flex gap-[1cqw] py-[1cqw]">
                <span
                  className="flex h-[2.6cqw] w-[2.6cqw] shrink-0 items-center justify-center rounded-full text-[1.05cqw] font-bold text-white"
                  style={{ background: mail.color }}
                >
                  {mail.from[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-[0.4cqw] text-[1.1cqw]">
                    <span className={`truncate ${mail.unread ? "font-bold text-[#11131a]" : "font-semibold text-[#2c3142]"}`}>{mail.from}</span>
                    {mail.lock && <Lock aria-hidden className="h-[0.9cqw] w-[0.9cqw] shrink-0 text-[#21a35a]" />}
                    {mail.clip && <Paperclip aria-hidden className="h-[0.9cqw] w-[0.9cqw] shrink-0 text-[#8a90a3]" />}
                    <span className="ml-auto shrink-0 text-[0.9cqw] text-[#8a90a3]">{mail.time}</span>
                  </div>
                  <p className="truncate text-[1cqw] font-medium text-[#2c3142]">{mail.subject}</p>
                  <p className="truncate text-[0.95cqw] text-[#8a90a3]">{mail.preview}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PhoneFrame>

      <Callout className="right-[6%] top-[13%] w-[40%]">
        <div className="flex items-center gap-[1cqw]">
          <span className="flex h-[3cqw] w-[3cqw] items-center justify-center rounded-full bg-[#21c26a]">
            <Lock aria-hidden className="h-[1.5cqw] w-[1.5cqw] text-white" strokeWidth={2.5} />
          </span>
          <div>
            <p className="text-[1.3cqw] font-bold">End-to-end encrypted</p>
            <p className="text-[1cqw] text-[#5b6175]">Only you can read your mail</p>
          </div>
        </div>
      </Callout>

      <Callout className="right-[11%] top-[42%] w-[38%]">
        <div className="flex items-center gap-[0.6cqw] text-[1.15cqw] font-bold">
          <EyeOff aria-hidden className="h-[1.3cqw] w-[1.3cqw] text-[#2346b8]" /> Masked alias
        </div>
        <p className="mt-[0.6cqw] text-[1cqw] text-[#5b6175]">New alias created for</p>
        <div className="mt-[0.8cqw] flex items-center justify-between rounded-[0.8cqw] bg-[#eef1fb] px-[1cqw] py-[0.7cqw] text-[1.05cqw] font-semibold text-[#2346b8]">
          shopping
          <span className="flex items-center gap-[0.4cqw] text-[0.9cqw] text-[#21a35a]">
            <span className="h-[0.7cqw] w-[0.7cqw] rounded-full bg-[#21c26a]" /> Active
          </span>
        </div>
      </Callout>

      <Callout className="bottom-[9%] right-[5%] w-[30%]">
        <p className="text-[1cqw] text-[#5b6175]">Storage</p>
        <p className="text-[1.6cqw] font-bold tracking-[-0.02em]">Unlimited</p>
        <div className="mt-[0.8cqw] h-[0.6cqw] overflow-hidden rounded-full bg-[#e6e8f0]">
          <div className="h-full w-[28%] rounded-full bg-[linear-gradient(90deg,#4f72db,#21c26a)]" />
        </div>
      </Callout>
    </div>
  );
}
