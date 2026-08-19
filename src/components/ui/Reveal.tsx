"use client";

import { motion, useInView, type Variants } from "motion/react";
import { Fragment, useRef, type ReactNode, type ElementType } from "react";
import { fadeUp, VIEWPORT } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplied by ~70ms. */
  delay?: number;
  variants?: Variants;
  as?: ElementType;
  id?: string;
}

/** Scroll-triggered reveal. Fires once, respects reduced motion via CSS. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
  id,
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      custom={delay}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Masked, word-by-word headline reveal. Splitting on words (not characters)
 * keeps screen readers and text selection intact.
 *
 * The observer watches the WRAPPER, never the words themselves. Each word
 * starts translated 110% down — entirely outside its overflow-hidden mask —
 * and IntersectionObserver intersects a target with its ancestors' clip
 * rects, so an element hidden that way reports an empty rect and is never
 * "in view". Observing the word would mean it could never trigger its own
 * reveal. The wrapper is always laid out, so it always fires.
 */
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
          >
            <motion.span
              className={`inline-block ${wordClassName ?? ""}`}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : { y: "110%" }}
              transition={{
                duration: 1.05,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.05,
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* A real space text node between the masks: it keeps textContent
              readable ("Case studies", not "Casestudies") for screen readers
              and copy-paste, and lets long headlines wrap between words. A
              space inside the mask would be collapsed by the inline-block. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
