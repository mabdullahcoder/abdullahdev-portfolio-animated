import { Asterisk, AtSign, FileSignature, Hexagon, MessageCircle, Sparkle } from "lucide-react";

const tile = "flex aspect-square h-[1.25em] shrink-0 items-center justify-center";

/** App icon shown next to each product name. */
export default function ProductLogo({ id }) {
  switch (id) {
    case "lumen":
      return (
        <span className={`${tile} overflow-hidden rounded-[28%] bg-white light:ring-1 light:ring-black/10`}>
          <svg viewBox="0 0 20 20" aria-hidden className="h-full w-full">
            <path d="M5 15.5c2.5-1 6.4-3.6 9.6-10.5.4 4.6-1 9.4-4.6 11.2-1.8.9-3.6.6-5-.7Z" fill="#0b0d12" />
          </svg>
        </span>
      );
    case "vault-mail":
      return (
        <span className={`${tile} rounded-full bg-[#21c26a] p-[0.22em]`}>
          <AtSign aria-hidden className="h-full w-full text-white" strokeWidth={3} />
        </span>
      );
    case "unify-api":
      return (
        <span className={`${tile} p-[0.04em]`}>
          <Hexagon aria-hidden className="h-full w-full fill-ink text-ink" />
        </span>
      );
    case "taskpilot":
      return (
        <span className={`${tile} p-[0.04em]`}>
          <Sparkle aria-hidden className="h-full w-full fill-[#c8f23f] text-[#c8f23f]" />
        </span>
      );
    case "polychat":
      return (
        <span className={`${tile} rounded-[28%] bg-white p-[0.25em] light:ring-1 light:ring-black/10`}>
          <MessageCircle aria-hidden className="h-full w-full fill-[#5b6cff] text-[#5b6cff]" />
        </span>
      );
    case "morph":
      return <span className={`${tile} rounded-full border-[0.28em] border-[#25d07a] bg-transparent`} />;
    case "signchain":
      return (
        <span className={`${tile} rounded-[28%] bg-[linear-gradient(140deg,#2ad4ff,#2f5fd6)] p-[0.22em]`}>
          <FileSignature aria-hidden className="h-full w-full text-white" strokeWidth={2.4} />
        </span>
      );
    case "localmind":
      return (
        <span className={`${tile} rounded-[28%] bg-white p-[0.17em] light:ring-1 light:ring-black/10`}>
          <Asterisk aria-hidden className="h-full w-full text-[#0b0d12]" strokeWidth={3} />
        </span>
      );
    default:
      return null;
  }
}
