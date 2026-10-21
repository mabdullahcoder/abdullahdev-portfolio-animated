/**
 * Small uppercase monospace caption. `parts` lets a word be set wide-tracked
 * (e.g. "OF OUR PRODUCTS W O R L D W I D E").
 * Letter-spacing also trails the last glyph, so when the caption ends wide-tracked an equal
 * indent is added on the left to keep it optically centred.
 */
export default function MonoCaption({ parts, children, className = "" }) {
  const endsWide = parts?.[parts.length - 1]?.wide;

  return (
    <p
      className={`font-mono text-[clamp(0.625rem,1.1vw,1.2rem)] font-bold uppercase leading-snug tracking-[0.04em] text-ink/90 ${endsWide ? "pl-[0.46em]" : ""} ${className}`}
    >
      {parts
        ? parts.map((part, index) => (
            <span key={part.text}>
              {index > 0 && " "}
              <span className={part.wide ? "tracking-[0.46em]" : undefined}>{part.text}</span>
            </span>
          ))
        : children}
    </p>
  );
}
