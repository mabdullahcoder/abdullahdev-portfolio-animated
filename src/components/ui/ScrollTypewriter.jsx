"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef } from "react";
import { useMotionValueEvent } from "framer-motion";
import { useExperience } from "@/components/experience/ExperienceContext";
import { clamp, progressIn } from "@/lib/math";

/** Number of characters over which the leading edge fades from invisible to white. */
const FADE_CHARS = 7;

/** Splits text into words of indexed characters; each space also takes one beat of the reveal. */
function splitText(text) {
  const words = [];
  let index = 0;
  for (const word of text.split(" ")) {
    const chars = [];
    for (const char of word) {
      chars.push({ char, index });
      index += 1;
    }
    index += 1;
    words.push({ key: index, chars });
  }
  return { words, total: index };
}

/**
 * Reveals text character by character as the scroll position moves through `range`.
 * Opacity is written straight to the DOM so scrolling never re-renders React.
 */
export default function ScrollTypewriter({ text, range, className = "" }) {
  const { progress } = useExperience();
  const charRefs = useRef([]);

  const { words, total } = useMemo(() => splitText(text), [text]);

  const paint = useCallback(
    (u) => {
      const revealed = progressIn(u, range[0], range[1]) * (total + FADE_CHARS);
      charRefs.current.forEach((node, index) => {
        if (node) node.style.opacity = clamp((revealed - index) / FADE_CHARS).toFixed(3);
      });
    },
    [range, total],
  );

  useMotionValueEvent(progress, "change", paint);
  useEffect(() => paint(progress.get()), [paint, progress]);

  return (
    <p className={className} aria-label={text}>
      {words.map(({ key, chars }, wordIndex) => (
        <Fragment key={key}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {chars.map(({ char, index }) => (
              <span key={index} ref={(node) => (charRefs.current[index] = node)} style={{ opacity: 0 }}>
                {char}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}
