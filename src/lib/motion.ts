import type { Variants } from "motion/react";

/**
 * Shared motion vocabulary. Every reveal on the site pulls from here so the
 * whole page moves with one rhythm instead of a dozen competing easings.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;

/** Default viewport config: fire once, slightly before the element is centred. */
export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO, delay: (i as number) * 0.07 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: EASE_OUT_EXPO, delay: (i as number) * 0.07 },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: (i as number) * 0.07 },
  }),
};

/** Parent that releases children one after another. */
export const stackParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/** Word-by-word headline reveal, masked by an overflow-hidden parent. */
export const wordRise: Variants = {
  hidden: { y: "110%" },
  show: (i = 0) => ({
    y: "0%",
    transition: { duration: 1.05, ease: EASE_OUT_EXPO, delay: 0.08 + (i as number) * 0.055 },
  }),
};

/** Left-to-right rule that draws itself in. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.3, ease: EASE_OUT_EXPO } },
};
