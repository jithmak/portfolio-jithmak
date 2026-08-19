"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { releases } from "@/content/music";
import { Sleeve } from "./Sleeve";
import { StreamEmbed } from "./StreamEmbed";
import { formatMonthYear, pad } from "@/lib/utils";
import { VIEWPORT, EASE_OUT_EXPO } from "@/lib/motion";

/**
 * The catalogue as an expanding editorial index rather than a card grid.
 * A list reads like liner notes; a grid reads like a shop. Each row opens
 * in place to reveal artwork, notes and the streaming player.
 */
export function Discography() {
  const [open, setOpen] = useState<string | null>(releases[0]?.slug ?? null);

  return (
    <div className="border-t border-[var(--color-line-soft)]">
      {releases.map((release, i) => {
        const isOpen = open === release.slug;
        return (
          <motion.article
            key={release.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.05 }}
            className="border-b border-[var(--color-line-soft)]"
          >
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : release.slug)}
                aria-expanded={isOpen}
                aria-controls={`release-${release.slug}`}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-7 text-left sm:grid-cols-[auto_1.6fr_1fr_auto_auto] sm:gap-x-8"
              >
                <span className="eyebrow tabular text-[var(--color-faint)] transition-colors group-hover:text-[var(--accent)]">
                  {pad(i + 1)}
                </span>

                <span className="display text-[length:var(--text-2xl)] leading-tight transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {release.title}
                </span>

                <span className="col-start-2 row-start-2 text-[length:var(--text-xs)] text-[var(--color-muted)] sm:col-start-3 sm:row-start-1">
                  {release.role}
                </span>

                <span className="hidden text-[length:var(--text-xs)] text-[var(--color-faint)] sm:block">
                  <span className="rounded-full border border-[var(--color-line)] px-3 py-1">
                    {release.kind}
                  </span>
                </span>

                <span className="flex items-center gap-4 justify-self-end">
                  <span className="tabular hidden text-[length:var(--text-xs)] text-[var(--color-faint)] md:inline">
                    {formatMonthYear(release.released)}
                  </span>
                  <motion.span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-bone-dim)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  >
                    <Plus size={15} />
                  </motion.span>
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`release-${release.slug}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-12 md:grid-cols-[minmax(0,260px)_1fr] md:gap-12">
                    <div className="max-w-[260px]">
                      <div className="overflow-hidden rounded-xl border border-[var(--color-line-soft)] shadow-2xl shadow-black/50">
                        <Sleeve
                          title={release.title}
                          cover={release.cover}
                          hues={release.hues}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <p className="max-w-[56ch] text-[length:var(--text-lg)] leading-relaxed text-[var(--color-bone-dim)]">
                        {release.note}
                      </p>

                      <dl className="flex flex-wrap gap-x-10 gap-y-3 text-[length:var(--text-xs)]">
                        <div>
                          <dt className="eyebrow mb-1">Released</dt>
                          <dd className="tabular text-[var(--color-bone-dim)]">
                            {formatMonthYear(release.released)}
                          </dd>
                        </div>
                        <div>
                          <dt className="eyebrow mb-1">Format</dt>
                          <dd className="text-[var(--color-bone-dim)]">{release.kind}</dd>
                        </div>
                        <div>
                          <dt className="eyebrow mb-1">Credit</dt>
                          <dd className="text-[var(--color-bone-dim)]">{release.role}</dd>
                        </div>
                      </dl>

                      <StreamEmbed release={release} className="mt-1 max-w-xl" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
