"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseForestAudioOptions {
  volume?: number;
}

/**
 * Consent-gated, default-silent procedural WebAudio canopy soundscape.
 * Never autoplays before user gesture; cleans up AudioContext on unmount.
 */
export function useForestAudio({ volume = 0.14 }: UseForestAudioOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const stop = useCallback(() => {
    try {
      oscsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore already stopped
        }
      });
      oscsRef.current = [];
      if (lfoRef.current) {
        try {
          lfoRef.current.stop();
          lfoRef.current.disconnect();
        } catch {
          // ignore
        }
        lfoRef.current = null;
      }
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
      }
      gainRef.current = null;
    } finally {
      setIsPlaying(false);
    }
  }, []);

  const start = useCallback(() => {
    if (typeof window === "undefined") return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    stop();

    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(
      Math.max(0.01, volume),
      ctx.currentTime + 1.2
    );

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(420, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Warm pentatonic forest drone chord (D3, A3, E4, F#4)
    const freqs = [146.83, 220.0, 329.63, 369.99];
    const created: OscillatorNode[] = [];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(idx === 0 ? 0.32 : 0.16, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      created.push(osc);
    });

    // Gentle breathing LFO on filter cutoff
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    lfoGain.gain.setValueAtTime(140, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    ctxRef.current = ctx;
    gainRef.current = masterGain;
    oscsRef.current = created;
    lfoRef.current = lfo;
    setIsPlaying(true);
  }, [stop, volume]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }, [isPlaying, start, stop]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { isPlaying, toggle, stop };
}
