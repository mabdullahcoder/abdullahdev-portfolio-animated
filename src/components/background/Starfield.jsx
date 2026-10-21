"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useExperience } from "@/components/experience/ExperienceContext";
import { useTheme } from "@/hooks/useTheme";
import { clamp } from "@/lib/math";
import { warpDistance } from "@/lib/timeline";

/** How far (in normalised depth) the stars travel during one warp transition. */
const WARP_DEPTH = 1.7;
/** Streak length multiplier relative to the distance travelled in a frame. */
const STREAK = 2.4;
const NEAR = 0.035;

/** White stars on the night sky; soft ink specks on the light theme. */
const STAR_INK = {
  dark: { rgb: "255,255,255", strength: 1 },
  light: { rgb: "30,36,60", strength: 0.55 },
};

function createStar(z) {
  const bright = Math.random() < 0.07;
  return {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z,
    size: bright ? 1.25 + Math.random() * 0.5 : 0.45 + Math.random() * 0.6,
    phase: Math.random() * Math.PI * 2,
    twinkle: 0.4 + Math.random() * 1.4,
  };
}

/**
 * Full-screen canvas starfield. Stars idle with a faint twinkle and rush past as
 * hyperspace streaks while the scroll position moves through a warp window.
 */
export default function Starfield() {
  const canvasRef = useRef(null);
  const { progress } = useExperience();
  const reduceMotion = useReducedMotion();
  const theme = useTheme();
  const inkRef = useRef(STAR_INK.dark);

  useLayoutEffect(() => {
    inkRef.current = STAR_INK[theme];
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let stars = [];
    let frameId = 0;
    let lastWarp = warpDistance(progress.get());

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(clamp((width * height) / 2400, 160, 720));
      stars = Array.from({ length: count }, () => createStar(NEAR + Math.random() * (1 - NEAR)));
    };

    const project = (star, z) => ({
      x: width / 2 + (star.x * width * 0.5) / z,
      y: height / 2 + (star.y * height * 0.5) / z,
    });

    const render = (time) => {
      const warp = warpDistance(progress.get());
      const delta = reduceMotion ? 0 : (warp - lastWarp) * WARP_DEPTH;
      lastWarp = warp;
      const streaking = Math.abs(delta) > 0.0006;
      const { rgb, strength } = inkRef.current;

      context.clearRect(0, 0, width, height);
      context.lineCap = "round";

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        star.z -= delta;

        if (star.z < NEAR) {
          stars[i] = createStar(1);
          continue;
        }
        if (star.z > 1) {
          stars[i] = createStar(NEAR + Math.random() * 0.25);
          continue;
        }

        const head = project(star, star.z);
        if (head.x < -50 || head.x > width + 50 || head.y < -50 || head.y > height + 50) continue;

        const depth = 1 - star.z;
        const twinkle = 0.72 + 0.28 * Math.sin(time * 0.001 * star.twinkle + star.phase);
        const alpha = clamp((0.22 + depth * 0.85) * twinkle, 0, 1) * strength;
        const radius = star.size * (0.7 + depth * 1.4);

        if (streaking) {
          const tail = project(star, clamp(star.z + delta * STREAK, NEAR, 1.4));
          context.strokeStyle = `rgba(${rgb},${alpha})`;
          context.lineWidth = Math.max(0.6, radius * 0.9);
          context.beginPath();
          context.moveTo(tail.x, tail.y);
          context.lineTo(head.x, head.y);
          context.stroke();
        } else {
          context.fillStyle = `rgba(${rgb},${alpha})`;
          context.beginPath();
          context.arc(head.x, head.y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }

      frameId = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [progress, reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
