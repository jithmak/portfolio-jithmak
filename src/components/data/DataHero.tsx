"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { site } from "@/content/site";
import { resumeUrl } from "@/content/data";
import { PlotField } from "@/components/gate/PlotField";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * The data world's opening. Same skeleton as the music hero — same rhythm,
 * same type scale — but the texture is a plotted scatter and the voice is
 * precise rather than atmospheric.
 */
export function DataHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yType = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const yPlot = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-36"
    >
      <motion.div className="absolute inset-0" style={{ y: yPlot, opacity: fade }}>
        <div className="bg-grid absolute inset-0" />
        <PlotField color="#45e0d4" intensity={0.85} className="h-full w-full" />
        <div className="vignette absolute inset-0" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/45 to-[var(--color-ink)]/70" />

      <motion.div className="shell relative z-10" style={{ y: yType }}>
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
        >
          <span className="eyebrow eyebrow-accent">02 / Data Analyst</span>
          <span className="h-px w-10 bg-[var(--accent)] opacity-40" />
          <span className="eyebrow">Analytics · Modelling · Visualisation</span>
        </motion.div>

        <h1 className="display mt-7 max-w-[16ch] text-[length:var(--text-6xl)] leading-[0.88] tracking-[-0.03em]">
          <span className="sr-only">
            Evidence over instinct — analysis people actually act on.
          </span>
          <span aria-hidden className="block">
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.3 }}
              >
                Evidence
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block italic text-gradient-accent"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.42 }}
              >
                over instinct
              </motion.span>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <motion.p
            className="max-w-[50ch] text-[length:var(--text-xl)] leading-snug text-[var(--color-bone-dim)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.7 }}
          >
            I build the models, pipelines and dashboards that turn a question into a
            decision someone is willing to sign off on.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.85 }}
          >
            <MagneticLink href="#work" variant="solid">
              See the work
            </MagneticLink>
            {resumeUrl ? (
              <MagneticLink
                href={resumeUrl}
                variant="outline"
                icon={<Download size={15} />}
              >
                Download CV
              </MagneticLink>
            ) : (
              <MagneticLink
                href={`mailto:${site.email}`}
                variant="outline"
                icon={<ArrowUpRight size={15} />}
              >
                Get in touch
              </MagneticLink>
            )}
          </motion.div>
        </div>

        <motion.div
          className="mt-16 flex items-center justify-between border-t border-[var(--color-line-soft)] pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
        >
          <Link
            href="#work"
            className="group flex items-center gap-3 text-[length:var(--text-xs)] text-[var(--color-muted)] transition-colors hover:text-[var(--accent)]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-line)] transition-colors group-hover:border-[var(--accent)]">
              <ArrowDown size={14} className="animate-bounce" />
            </span>
            Scroll
          </Link>
          <span className="eyebrow hidden sm:block">
            {site.location} — Open to roles & consulting
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
