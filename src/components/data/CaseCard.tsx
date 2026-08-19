import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/data";
import { Chart } from "./Chart";
import { cn, pad } from "@/lib/utils";

/**
 * A case study on the index. Leads with the outcome, not the job title —
 * the summary line is the headline and the chart is the evidence.
 */
export function CaseCard({
  study,
  index,
  className,
}: {
  study: CaseStudy;
  index: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line-soft)] bg-[#0d0d11] transition-colors duration-500 hover:border-[var(--color-line)]",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-6 p-8 md:p-10">
        <div className="flex items-center gap-3">
          <span className="eyebrow eyebrow-accent tabular">{pad(index + 1)}</span>
          <span className="h-px w-6 bg-[var(--accent)] opacity-40" />
          <span className="eyebrow">{study.domain}</span>
          <span className="tabular ml-auto text-[length:var(--text-micro)] text-[var(--color-faint)]">
            {study.year}
          </span>
        </div>

        <div>
          <h3 className="display text-[length:var(--text-2xl)] leading-tight transition-colors duration-300 group-hover:text-[var(--accent)]">
            <Link href={`/data/${study.slug}`} className="before:absolute before:inset-0">
              {study.title}
            </Link>
          </h3>
          <p className="mt-1.5 text-[length:var(--text-xs)] text-[var(--color-faint)]">
            {study.client}
          </p>
        </div>

        <p className="max-w-[52ch] text-[length:var(--text-base)] leading-relaxed text-[var(--color-bone-dim)]">
          {study.summary}
        </p>

        {/* Metrics row */}
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          {study.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                {/* Proportional figures — this is a display-size number */}
                <span className="display block text-[length:var(--text-2xl)] leading-none text-[var(--color-bone)]">
                  {m.value}
                </span>
                <span className="mt-1.5 block text-[length:var(--text-micro)] uppercase tracking-[0.14em] text-[var(--color-faint)]">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {study.tools.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--color-line-soft)] px-3 py-1 text-[length:var(--text-micro)] text-[var(--color-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        <span className="flex items-center gap-2 text-[length:var(--text-sm)] text-[var(--accent)]">
          Read the case study
          <ArrowUpRight
            size={15}
            className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </span>
      </div>

      {/* Evidence strip. The chart is decorative on the card — the detail page
          carries the full interactive version with its table view. */}
      {study.chart && (
        <div className="border-t border-[var(--color-line-soft)] bg-[#131318] px-8 py-7 md:px-10">
          <Chart chart={study.chart} compact decorative />
        </div>
      )}
    </article>
  );
}
