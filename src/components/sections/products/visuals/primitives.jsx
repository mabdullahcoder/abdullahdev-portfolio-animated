/**
 * Shared building blocks for the product mockups. Visuals render inside an `@container`,
 * so sizes use `cqw` (1% of the media panel width) and stay proportional at any viewport.
 */

const BEZELS = {
  dark: "bg-[#0b0c10] ring-white/25",
  light: "bg-white ring-black/10",
};

export function PhoneFrame({ className = "", screenClassName = "", bezel = "dark", style, children }) {
  return (
    <div
      style={style}
      className={`absolute aspect-[9/19] rounded-[14%/6.6%] p-[2.4%] shadow-[0_3cqw_8cqw_-2cqw_rgba(0,0,0,0.6)] ring-1 ${BEZELS[bezel]} ${className}`}
    >
      <div className={`relative h-full w-full overflow-hidden rounded-[12%/5.6%] ${screenClassName}`}>
        <span className="absolute left-1/2 top-[1.8%] z-10 h-[2.6%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ tone = "dark" }) {
  return (
    <div
      className={`flex items-center justify-between px-[9%] pt-[5%] text-[1.05cqw] font-semibold ${tone === "dark" ? "text-[#11131a]" : "text-white"}`}
    >
      <span>9:41</span>
      <span className="flex items-center gap-[0.3cqw]">
        <span className="h-[0.7cqw] w-[1.1cqw] rounded-[0.2cqw] bg-current opacity-80" />
        <span className="h-[0.7cqw] w-[1.6cqw] rounded-[0.25cqw] border border-current" />
      </span>
    </div>
  );
}

const WINDOW_TONES = {
  dark: { surface: "bg-[#14161c] ring-white/10", bar: "bg-[#191b22] border-white/[0.06]", title: "text-white/55" },
  light: { surface: "bg-white ring-black/10", bar: "bg-[#f3f4f8] border-black/[0.06]", title: "text-black/45" },
};

export function AppWindow({ className = "", tone = "dark", title, children }) {
  const t = WINDOW_TONES[tone];
  return (
    <div
      className={`absolute flex flex-col overflow-hidden rounded-[1.4cqw] shadow-[0_3cqw_9cqw_-2cqw_rgba(0,0,0,0.7)] ring-1 ${t.surface} ${className}`}
    >
      <div className={`relative flex h-[3.4cqw] shrink-0 items-center gap-[0.7cqw] border-b px-[1.5cqw] ${t.bar}`}>
        <span className="h-[0.95cqw] w-[0.95cqw] rounded-full bg-[#ff5f57]" />
        <span className="h-[0.95cqw] w-[0.95cqw] rounded-full bg-[#febc2e]" />
        <span className="h-[0.95cqw] w-[0.95cqw] rounded-full bg-[#28c840]" />
        {title && (
          <span className={`absolute inset-x-0 text-center text-[1.1cqw] font-medium ${t.title}`}>{title}</span>
        )}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

/** A skeleton text line for long-form copy that would be unreadable at mockup scale anyway. */
export function Line({ className = "", style }) {
  return <span style={style} className={`block rounded-full ${className}`} />;
}

/** iOS-style switch. */
export function Toggle({ on, accent = "#3fd36f" }) {
  return (
    <span
      className="relative inline-block h-[1.7cqw] w-[3cqw] shrink-0 rounded-full transition-colors"
      style={{ background: on ? accent : "rgba(255,255,255,0.15)" }}
    >
      <span
        className="absolute top-[0.2cqw] h-[1.3cqw] w-[1.3cqw] rounded-full bg-white shadow"
        style={{ left: on ? "1.5cqw" : "0.2cqw" }}
      />
    </span>
  );
}

const CALLOUT_SHAPES = {
  card: "rounded-[1.4cqw] p-[1.5cqw]",
  chip: "rounded-[1.2cqw] p-[1.1cqw]",
  pill: "rounded-full px-[1.3cqw] py-[0.8cqw]",
};

/** Frosted floating callout used around devices. */
export function Callout({ className = "", children, tone = "light", shape = "card" }) {
  const surface =
    tone === "light"
      ? "bg-white/90 text-[#11131a] ring-black/5 shadow-[0_2cqw_6cqw_-1.5cqw_rgba(10,20,60,0.45)]"
      : "bg-[#15171d]/85 text-white ring-white/10 shadow-[0_2cqw_6cqw_-1.5cqw_rgba(0,0,0,0.7)]";
  return (
    <div className={`absolute ring-1 backdrop-blur-md ${CALLOUT_SHAPES[shape]} ${surface} ${className}`}>{children}</div>
  );
}
