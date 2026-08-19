"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site, worlds } from "@/content/site";
import { WaveField } from "./WaveField";
import { PlotField } from "./PlotField";
import { cn } from "@/lib/utils";

type Side = "music" | "data" | null;

const EASE = [0.16, 1, 0.3, 1] as const;

export function Gate() {
  const [hover, setHover] = useState<Side>(null);
  const reduced = useReducedMotion();

  // Desktop panel weights — hovering one side lets it take the room.
  const flexFor = (side: "music" | "data") => {
    if (reduced || hover === null) return 1;
    return hover === side ? 1.36 : 0.64;
  };

  return (
    <div
      data-world={hover ?? undefined}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-ink)]"
    >
      {/* Top bar */}
      <div className="relative z-30 shell flex items-center justify-between py-6 sm:py-8">
        <span className="display text-[length:var(--text-xl)] tracking-tight">
          {site.wordmark}
        </span>
        <div className="flex items-center gap-5">
          <Link
            href="/about"
            className="text-[length:var(--text-sm)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-bone)]"
          >
            About
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="hidden text-[length:var(--text-sm)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-bone)] sm:inline"
          >
            {site.email}
          </a>
        </div>
      </div>

      {/* ---- The two doors ---- */}
      <div className="relative z-20 flex flex-1 flex-col md:flex-row">
        <Panel
          side="music"
          hover={hover}
          setHover={setHover}
          flex={flexFor("music")}
          reduced={Boolean(reduced)}
        />

        {/* Divider — the seam between the two lives */}
        <div className="relative hidden w-px shrink-0 md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-line)] to-transparent" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-24 w-px -translate-x-1/2 -translate-y-1/2"
            animate={{
              background:
                hover === "music"
                  ? "linear-gradient(to bottom, transparent, #e9b949, transparent)"
                  : hover === "data"
                    ? "linear-gradient(to bottom, transparent, #45e0d4, transparent)"
                    : "linear-gradient(to bottom, transparent, #55555f, transparent)",
            }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <Panel
          side="data"
          hover={hover}
          setHover={setHover}
          flex={flexFor("data")}
          reduced={Boolean(reduced)}
        />
      </div>

      {/* ---- Wordmark ----
          Sits in the upper band, not dead centre: the panel headings are
          bottom-aligned, and a centred mega-wordmark lands right on top of
          them. Up here it fills the empty head of the page instead. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-[58%] items-center justify-center md:flex">
        <motion.h1
          className="display select-none text-center text-[length:var(--text-6xl)] leading-none tracking-[-0.04em] text-[var(--color-bone)]"
          style={{ mixBlendMode: "overlay" }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: hover ? 0.16 : 0.85, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          {site.wordmark}
        </motion.h1>
      </div>

      {/* ---- Bottom rail ---- */}
      <div className="relative z-30 shell pb-7 pt-4">
        <div className="rule-fade mb-6" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <motion.p
            className="max-w-[52ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
          >
            {site.intro}
          </motion.p>
          <motion.span
            className="eyebrow shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
          >
            {site.location} — Choose a door
          </motion.span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Panel({
  side,
  hover,
  setHover,
  flex,
  reduced,
}: {
  side: "music" | "data";
  hover: Side;
  setHover: (s: Side) => void;
  flex: number;
  reduced: boolean;
}) {
  const world = worlds[side];
  const active = hover === side;
  const dimmed = hover !== null && !active;
  const isMusic = side === "music";
  const accent = isMusic ? "#e9b949" : "#45e0d4";

  return (
    <motion.div
      data-world={side}
      className="group relative flex min-h-[42svh] flex-1 items-end overflow-hidden md:min-h-0"
      animate={{ flexGrow: flex }}
      transition={{ duration: 0.9, ease: EASE }}
      onMouseEnter={() => setHover(side)}
      onMouseLeave={() => setHover(null)}
      onFocusCapture={() => setHover(side)}
      onBlurCapture={() => setHover(null)}
    >
      {/* Texture layer */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: active ? 1 : dimmed ? 0.22 : 0.6 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {isMusic ? (
          <WaveField color={accent} className="absolute inset-0 h-full w-full" />
        ) : (
          <>
            <div className="absolute inset-0 bg-grid-fine opacity-70" />
            <PlotField color={accent} className="absolute inset-0 h-full w-full" />
          </>
        )}
      </motion.div>

      {/* Accent wash from the bottom */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 100%, ${accent}22, transparent 70%)`,
        }}
      />

      {/* Darkening scrim keeps text legible over the texture */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/55 to-transparent" />

      {/* Content */}
      <Link
        href={world.href}
        className="relative z-10 flex w-full flex-col gap-4 px-[var(--spacing-gutter)] pb-12 pt-24 md:pb-20"
        aria-label={`Enter ${world.label}`}
      >
        <div className="flex items-center gap-3">
          <span className="eyebrow tabular" style={{ color: accent }}>
            {world.index}
          </span>
          <span className="h-px w-7" style={{ background: accent, opacity: 0.5 }} />
          <span className="eyebrow">{world.role}</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <motion.h2
            className={cn(
              "display text-[length:var(--text-5xl)] leading-[0.9]",
            )}
            animate={{ color: active ? accent : "#f5f3ef" }}
            transition={{ duration: 0.5 }}
          >
            {world.label}
          </motion.h2>
          <motion.span
            className="inline-flex items-center gap-2 text-[length:var(--text-sm)]"
            animate={{ opacity: active ? 1 : 0.45, x: active ? 0 : -8 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ color: accent }}
          >
            Enter
            <ArrowUpRight size={16} />
          </motion.span>
        </div>

        <motion.p
          className="max-w-[34ch] text-[length:var(--text-base)] text-[var(--color-bone-dim)]"
          animate={{ opacity: dimmed ? 0.4 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {world.line}
        </motion.p>

        {/* Underline that draws on hover */}
        <div className="relative mt-2 h-px w-full bg-[var(--color-line-soft)]">
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ background: accent }}
            animate={{ width: active ? "100%" : "0%" }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
