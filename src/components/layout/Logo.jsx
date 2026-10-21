/**
 * Wordmark: slanted "AD" monogram + heavy uppercase name.
 * The monogram matches the favicon (app/icon.svg): the A's right leg doubles as the D's stem.
 */
export default function Logo({ name, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-[0.35em] font-sans font-extrabold uppercase leading-none tracking-[-0.01em] ${className}`}>
      <svg viewBox="-3.6 0 27.1 20" aria-hidden className="h-[0.95em] w-auto" fill="currentColor">
        <g transform="skewX(-10)">
          <path d="M0 20 7 0h4.2l-7 20Z" />
          <path d="M4 12h7v3.5H4Z" />
          <path fillRule="evenodd" d="M10 0h5a10 10 0 0 1 0 20h-5ZM14.5 4.4v11.2h.5a5.6 5.6 0 0 0 0-11.2Z" />
        </g>
      </svg>
      {name}
    </span>
  );
}
