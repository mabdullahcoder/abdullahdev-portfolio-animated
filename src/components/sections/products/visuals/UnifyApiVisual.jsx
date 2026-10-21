import { Search } from "lucide-react";
import { AppWindow } from "./primitives";

const K = "text-[#c792ea]";
const S = "text-[#c3e88d]";
const F = "text-[#82aaff]";
const P = "text-white/80";

const CODE = [
  [[K, "import"], [P, " OpenAI "], [K, "from"], [S, ' "openai"'], [P, ";"]],
  [],
  [[K, "const"], [P, " api = "], [K, "new"], [F, " OpenAI"], [P, "({ baseURL: UNIFY_URL });"]],
  [],
  [[K, "const"], [P, " res = "], [K, "await"], [P, " api.chat."], [F, "completions"], [P, ".create({"]],
  [[P, "  model: "], [S, '"claude-3-5-sonnet"'], [P, ","]],
  [[P, "  messages: [{ role: "], [S, '"user"'], [P, ", content: "], [S, '"Hi!"'], [P, " }],"]],
  [[P, "});"]],
];

const MODELS = [
  { name: "gpt-4o", vendor: "OpenAI", kind: "Chat", ms: "320 ms", color: "#10a37f" },
  { name: "claude-3-5-sonnet", vendor: "Anthropic", kind: "Chat", ms: "410 ms", color: "#d97757", active: true },
  { name: "gemini-1.5-pro", vendor: "Google", kind: "Chat", ms: "380 ms", color: "#4285f4" },
  { name: "llama-3.1-405b", vendor: "Meta", kind: "Chat", ms: "520 ms", color: "#0668e1" },
  { name: "flux-pro", vendor: "BFL", kind: "Image", ms: "2.1 s", color: "#f5b84a" },
  { name: "text-embedding-3", vendor: "OpenAI", kind: "Embed", ms: "90 ms", color: "#10a37f" },
];

const BARS = [38, 52, 45, 70, 58, 84, 66, 92, 74, 88, 80, 96];

export default function UnifyApiVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0b12]">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_10%,rgba(139,123,255,0.45),transparent_70%),radial-gradient(50%_50%_at_0%_100%,rgba(79,195,247,0.25),transparent_70%)]" />

      <AppWindow title="Unify API — Playground" className="left-[5%] top-[7%] h-[86%] w-[90%]">
        <div className="grid h-full grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col border-r border-white/[0.06] bg-[#0f1118] p-[1.6cqw]">
            <div className="flex gap-[0.5cqw] text-[1cqw] font-medium">
              <span className="rounded-[0.6cqw] px-[0.9cqw] py-[0.4cqw] text-white/45">Python</span>
              <span className="rounded-[0.6cqw] bg-white/10 px-[0.9cqw] py-[0.4cqw] text-white">Node.js</span>
              <span className="rounded-[0.6cqw] px-[0.9cqw] py-[0.4cqw] text-white/45">cURL</span>
            </div>
            <pre className="mt-[1.4cqw] font-mono text-[1.02cqw] leading-[1.75]">
              {CODE.map((tokens, i) => (
                <div key={i} className="flex gap-[1.2cqw]">
                  <span className="w-[1.4cqw] shrink-0 text-right text-white/20">{i + 1}</span>
                  <span className="whitespace-pre">
                    {tokens.map(([cls, text], j) => (
                      <span key={j} className={cls}>
                        {text}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </pre>
            <div className="mt-auto rounded-[1cqw] bg-black/40 p-[1.2cqw] ring-1 ring-white/[0.06]">
              <div className="flex items-center gap-[0.6cqw] text-[0.95cqw] font-semibold">
                <span className="h-[0.8cqw] w-[0.8cqw] rounded-full bg-[#3fd36f]" />
                <span className="text-[#3fd36f]">200 OK</span>
                <span className="text-white/35">· 412 ms · 38 tokens</span>
              </div>
              <p className="mt-[0.6cqw] font-mono text-[0.95cqw] text-white/70">
                {"{ "}
                <span className="text-[#82aaff]">&quot;content&quot;</span>: <span className={S}>&quot;Hello! How can I help?&quot;</span>
                {" }"}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-[1.6cqw]">
            <div className="flex items-center justify-between">
              <span className="text-[1.5cqw] font-semibold text-white">Models</span>
              <span className="rounded-full bg-[#8b7bff]/20 px-[0.9cqw] py-[0.35cqw] text-[0.95cqw] font-bold text-[#b9b0ff]">10+</span>
            </div>
            <div className="mt-[1cqw] flex items-center gap-[0.6cqw] rounded-[0.8cqw] bg-white/[0.05] px-[1cqw] py-[0.6cqw] text-[1cqw] text-white/40 ring-1 ring-white/[0.06]">
              <Search aria-hidden className="h-[1cqw] w-[1cqw]" /> Search models
            </div>
            <ul className="mt-[1cqw] space-y-[0.45cqw]">
              {MODELS.map((m) => (
                <li
                  key={m.name}
                  className={`flex items-center gap-[0.8cqw] rounded-[0.7cqw] px-[0.9cqw] py-[0.65cqw] ${m.active ? "bg-[#8b7bff]/15 ring-1 ring-[#8b7bff]/40" : ""}`}
                >
                  <span className="h-[1.3cqw] w-[1.3cqw] shrink-0 rounded-[0.35cqw]" style={{ background: m.color }} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-[1cqw] text-white">{m.name}</p>
                    <p className="text-[0.85cqw] text-white/40">
                      {m.vendor} · {m.kind}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[0.9cqw] text-white/50">{m.ms}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-[1cqw]">
              <p className="text-[0.95cqw] text-white/45">Requests · last 7 days</p>
              <div className="mt-[0.7cqw] flex h-[6cqw] items-end gap-[0.45cqw]">
                {BARS.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-[0.3cqw] bg-[linear-gradient(180deg,#b07bff,#6d7dff)]"
                    style={{ height: `${h}%`, opacity: 0.45 + h / 180 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}
