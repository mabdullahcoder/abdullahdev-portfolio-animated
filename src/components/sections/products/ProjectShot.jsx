import Image from "next/image";
import { AppWindow, PhoneFrame } from "./visuals/primitives";

/** Rendered width hints for next/image: the media panel is ~45% of the viewport on desktop. */
const SIZES = {
  browser: "(min-width: 1024px) 45vw, 92vw",
  phone: "(min-width: 1024px) 18vw, 40vw",
  full: "(min-width: 1024px) 50vw, 92vw",
};

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/**
 * A real project screenshot framed for its platform, on the project's accent backdrop:
 * `browser` (web and desktop apps), `phone` (mobile apps) or `full` (artwork that fills the panel).
 * Must render inside an `@container` (sizes use cqw, like the mockups).
 */
export default function ProjectShot({ project, src }) {
  const frame = project.shot ?? "browser";
  const alt = `${project.name} — screenshot`;
  const image = (
    <Image src={src} alt={alt} fill sizes={SIZES[frame]} className="object-cover object-top" />
  );

  if (frame === "full") {
    return <div className="absolute inset-0">{image}</div>;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(90% 80% at 70% 0%, ${project.accent}66, transparent 70%), radial-gradient(70% 70% at 0% 100%, ${project.accent}33, transparent 70%), #0b0d14`,
      }}
    >
      {frame === "phone" ? (
        <PhoneFrame className="left-1/2 top-[8%] h-[104%] -translate-x-1/2" screenClassName="bg-[#0b0d14]">
          {image}
        </PhoneFrame>
      ) : (
        // 88cqw wide; height = 16:10 content (55cqw) + the 3.4cqw title bar, so a 16:10 capture shows uncropped.
        <AppWindow
          title={hostname(project.url) ?? project.name}
          className="left-[6cqw] top-1/2 h-[58.4cqw] w-[88cqw] -translate-y-1/2"
        >
          {image}
        </AppWindow>
      )}
    </div>
  );
}
