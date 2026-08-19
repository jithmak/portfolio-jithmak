"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A slow-drifting scatter with a fitted trend line — the data world's texture.
 * Points are seeded deterministically so server and client agree and the
 * layout never flickers on hydration.
 */
export function PlotField({
  color = "#45e0d4",
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

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let t = 0;
    let running = true;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Deterministic PRNG — same cloud every load.
    let seed = 20240917;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const COUNT = 46;
    const pts = Array.from({ length: COUNT }, (_, i) => {
      const nx = i / (COUNT - 1);
      // Underlying positive relationship plus scatter.
      const base = 0.78 - nx * 0.52;
      return {
        nx,
        ny: base + (rand() - 0.5) * 0.3,
        r: 1.3 + rand() * 2.4,
        phase: rand() * Math.PI * 2,
        drift: 0.004 + rand() * 0.01,
      };
    });

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      const pad = width * 0.08;
      const w = width - pad * 2;
      const h = height - pad * 2;

      // Trend line
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.35 * intensity;
      ctx.lineWidth = 1.2;
      for (let i = 0; i <= 60; i++) {
        const nx = i / 60;
        const ny = 0.78 - nx * 0.52 + Math.sin(t * 0.01 + nx * 3) * 0.015;
        const x = pad + nx * w;
        const y = pad + ny * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Points
      for (const p of pts) {
        const bob = Math.sin(t * p.drift + p.phase) * 0.018;
        const x = pad + p.nx * w;
        const y = pad + (p.ny + bob) * h;
        ctx.beginPath();
        ctx.globalAlpha = (0.22 + Math.sin(t * p.drift + p.phase) * 0.12) * intensity;
        ctx.fillStyle = color;
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      t += 1;
      if (running) raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw();
      running = false;
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

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
