"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Layered travelling sine waves — the music world's texture.
 * Canvas rather than SVG so we can run three phase-shifted layers at 60fps
 * without touching the DOM. Pauses when off-screen or reduced-motion.
 */
export function WaveField({
  color = "#e9b949",
  intensity = 1,
  className,
}: {
  color?: string;
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const layers = [
      { amp: 0.16, freq: 1.1, speed: 0.006, alpha: 0.5, lw: 1.4 },
      { amp: 0.1, freq: 1.9, speed: -0.009, alpha: 0.3, lw: 1 },
      { amp: 0.22, freq: 0.6, speed: 0.004, alpha: 0.18, lw: 2.2 },
      { amp: 0.06, freq: 3.2, speed: 0.013, alpha: 0.14, lw: 0.8 },
    ];

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      const mid = height / 2;

      for (const layer of layers) {
        ctx.beginPath();
        ctx.lineWidth = layer.lw;
        ctx.strokeStyle = color;
        ctx.globalAlpha = layer.alpha * intensity;

        for (let x = 0; x <= width; x += 2) {
          const nx = x / width;
          // Envelope tapers the wave toward both edges so it never hard-cuts.
          const envelope = Math.sin(nx * Math.PI);
          const y =
            mid +
            Math.sin(nx * Math.PI * 2 * layer.freq + t * layer.speed * 60) *
              height *
              layer.amp *
              envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      t += 1;
      if (running) raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw();
      running = false;
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Stop burning frames when the tab is hidden.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [color, intensity, reduced]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
