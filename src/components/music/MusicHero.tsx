"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { statement } from "@/content/music";
import { WaveField } from "@/components/gate/WaveField";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * The music world's opening statement. Big editorial type, a live waveform
 * behind it, and gentle parallax so the layers separate as you scroll.
 */
export function MusicHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yType = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const yWave = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const line1 = "Sound".split("");

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-36"
    >
      {/* Waveform layer */}
      <motion.div className="absolute inset-0" style={{ y: yWave, opacity: fade }}>
        <WaveField color="#e9b949" intensity={0.9} className="h-full w-full" />
        <div className="vignette absolute inset-0" />
      </motion.div>

      {/* Vertical scrim so the type always wins */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-[var(--color-ink)]/70" />

      <motion.div className="shell relative z-10" style={{ y: yType }}>
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
        >
          <span className="eyebrow eyebrow-accent">01 / Musician</span>
          <span className="h-px w-10 bg-[var(--accent)] opacity-40" />
          <span className="eyebrow">Producer · Composer · Mix Engineer</span>
        </motion.div>

        {/* Character-by-character display line */}
        <h1 className="display mt-7 text-[length:var(--text-6xl)] leading-[0.86] tracking-[-0.035em]">
          <span className="sr-only">Sound first — {statement.lead}</span>
          <span aria-hidden className="block overflow-hidden">
            {line1.map((c, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1.1,
                  ease: EASE_OUT_EXPO,
                  delay: 0.28 + i * 0.045,
                }}
              >
                {c}
              </motion.span>
            ))}
            <motion.span
              className="ml-[0.12em] inline-block italic text-gradient-accent"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.55 }}
            >
              first
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <motion.p
            className="max-w-[46ch] text-[length:var(--text-xl)] leading-snug text-[var(--color-bone-dim)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.75 }}
          >
            {statement.lead}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.9 }}
          >
            <MagneticLink href="#releases" variant="solid">
              Hear the work
            </MagneticLink>
            <MagneticLink
              href="/booking"
              variant="outline"
              icon={<ArrowUpRight size={15} />}
            >
              Book a project
            </MagneticLink>
          </motion.div>
        </div>

        {/* Base rail */}
        <motion.div
          className="mt-16 flex items-center justify-between border-t border-[var(--color-line-soft)] pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Link
            href="#releases"
            className="group flex items-center gap-3 text-[length:var(--text-xs)] text-[var(--color-muted)] transition-colors hover:text-[var(--accent)]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-line)] transition-colors group-hover:border-[var(--accent)]">
              <ArrowDown size={14} className="animate-bounce" />
            </span>
            Scroll
          </Link>
          <span className="eyebrow hidden sm:block">
            {site.location} — Available for commissions
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
