"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * A soft accent-tinted follower behind the native cursor. Deliberately does
 * NOT hide the system cursor — that trades accessibility for novelty.
 * Disabled entirely on touch devices and under reduced-motion.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setHot(Boolean(el?.closest("a, button, [data-cursor='hot'], input, textarea, select")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-screen"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="rounded-full"
        animate={{
          width: hot ? 46 : 20,
          height: hot ? 46 : 20,
          opacity: hot ? 0.5 : 0.28,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgb(var(--accent-rgb) / 0.9), rgb(var(--accent-rgb) / 0) 68%)",
        }}
      />
    </motion.div>
  );
}
