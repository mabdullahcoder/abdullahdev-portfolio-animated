"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MASTER_VOLUME = 0.05;
const FADE_SECONDS = 1.2;

/** Builds a low, slowly breathing space drone with the Web Audio API. */
function createDrone(context) {
  const master = context.createGain();
  master.gain.value = 0;

  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 420;
  filter.Q.value = 0.8;

  const lfo = context.createOscillator();
  const lfoDepth = context.createGain();
  lfo.frequency.value = 0.06;
  lfoDepth.gain.value = 180;
  lfo.connect(lfoDepth).connect(filter.frequency);

  const voices = [
    { type: "sine", frequency: 55, gain: 0.9 },
    { type: "triangle", frequency: 82.6, gain: 0.35 },
    { type: "sine", frequency: 110.4, gain: 0.25 },
  ].map(({ type, frequency, gain }) => {
    const oscillator = context.createOscillator();
    const voiceGain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    voiceGain.gain.value = gain;
    oscillator.connect(voiceGain).connect(filter);
    return oscillator;
  });

  filter.connect(master).connect(context.destination);
  [lfo, ...voices].forEach((node) => node.start());

  return master;
}

/** Toggleable ambient soundtrack, off by default (browsers require a user gesture). */
export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const contextRef = useRef(null);
  const masterRef = useRef(null);

  const toggle = useCallback(() => setEnabled((value) => !value), []);

  useEffect(() => {
    const AudioContextClass = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
    if (!AudioContextClass) return;

    if (enabled && !contextRef.current) {
      contextRef.current = new AudioContextClass();
      masterRef.current = createDrone(contextRef.current);
    }

    const context = contextRef.current;
    const master = masterRef.current;
    if (!context || !master) return;

    const now = context.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);

    if (enabled) {
      context.resume();
      master.gain.linearRampToValueAtTime(MASTER_VOLUME, now + FADE_SECONDS);
    } else {
      master.gain.linearRampToValueAtTime(0, now + FADE_SECONDS * 0.6);
    }
  }, [enabled]);

  useEffect(() => () => contextRef.current?.close(), []);

  return { enabled, toggle };
}
