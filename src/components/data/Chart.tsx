"use client";

import { useId, useMemo, useRef, useState } from "react";
import type { CaseChart } from "@/content/data";
import {
  CHART_GRID,
  CHART_INK,
  CHART_SERIES,
  CHART_SURFACE,
} from "./palette";

/* ---------------------------------------------------------------------------
   Geometry. A fixed viewBox keeps the maths simple; the SVG scales to its
   container with preserveAspectRatio, and pointer positions are mapped back
   into viewBox space from the bounding rect.
   ------------------------------------------------------------------------ */
const VB_W = 760;

/**
 * Compact charts sit on the case-study cards with no axis labels, so they
 * neither need the gutters those labels live in nor the full height — the
 * full-size geometry there left a band of dead space where the x-axis would
 * have been.
 */
function geometry(compact: boolean) {
  const height = compact ? 190 : 330;
  const pad = compact
    ? { top: 14, right: 16, bottom: 14, left: 16 }
    : { top: 26, right: 74, bottom: 44, left: 52 };
  return {
    height,
    pad,
    plotW: VB_W - pad.left - pad.right,
    plotH: height - pad.top - pad.bottom,
  };
}

const MAX_BAR = 24; // never fill the band — leftover is air
const GAP = 2; // the surface gap between adjacent bars

/** Round an axis maximum up to a clean number. */
function niceMax(value: number) {
  if (value <= 0) return 1;
  const exp = Math.floor(Math.log10(value));
  const mag = Math.pow(10, exp);
  const norm = value / mag;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return step * mag;
}

function fmt(n: number) {
  if (Math.abs(n) >= 1000) return n.toLocaleString("en-US");
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

interface ChartProps {
  chart: CaseChart;
  /** Compact mode drops axis labels — used on the case-study cards. */
  compact?: boolean;
  /**
   * Decorative charts sit inside a link (the case-study card) where the whole
   * surface is one click target. They drop every interactive affordance —
   * no table toggle, no hover, no focusable children — and are hidden from
   * assistive tech, because the card's own text already carries the numbers
   * and the detail page has the real, interactive chart.
   */
  decorative?: boolean;
  className?: string;
}

export function Chart({
  chart,
  compact = false,
  decorative = false,
  className,
}: ChartProps) {
  const uid = useId().replace(/[:]/g, "");
  const { height: VB_H, pad: PAD, plotW: PLOT_W, plotH: PLOT_H } = geometry(compact);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  const multi = chart.series.length > 1;

  // Emphasis series always takes slot 0; everything else follows in fixed order.
  const colors = useMemo(() => {
    let next = chart.series.some((s) => s.emphasis) ? 1 : 0;
    return chart.series.map((s) => {
      if (s.emphasis) return CHART_SERIES[0];
      const c = CHART_SERIES[next % CHART_SERIES.length];
      next += 1;
      return c;
    });
  }, [chart.series]);

  const max = useMemo(() => {
    const all = chart.series.flatMap((s) => s.values);
    return niceMax(Math.max(...all, 0) * 1.08);
  }, [chart.series]);

  const n = chart.labels.length;
  const x = (i: number) => PAD.left + (n <= 1 ? PLOT_W / 2 : (i / (n - 1)) * PLOT_W);
  const y = (v: number) => PAD.top + PLOT_H - (v / max) * PLOT_H;

  const ticks = useMemo(() => {
    const count = 4;
    return Array.from({ length: count + 1 }, (_, i) => (max / count) * i);
  }, [max]);

  /* --- pointer → nearest index ------------------------------------------ */
  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * VB_W;
    if (chart.type === "bar") {
      const band = PLOT_W / n;
      const idx = Math.floor((vx - PAD.left) / band);
      setHover(idx >= 0 && idx < n ? idx : null);
      return;
    }
    const ratio = (vx - PAD.left) / PLOT_W;
    const idx = Math.round(ratio * (n - 1));
    setHover(idx >= 0 && idx < n ? idx : null);
  }

  const unit = chart.unit ?? "";

  return (
    <figure className={className} aria-hidden={decorative || undefined}>
      {/* Title — for a single series this names what is plotted, so no legend box */}
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <span className="text-[length:var(--text-sm)] text-[var(--color-bone-dim)]">
          {chart.label}
        </span>
        {!decorative && (
          <button
            onClick={() => setShowTable((s) => !s)}
            aria-expanded={showTable}
            className="text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-[var(--color-faint)] underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
          >
            {showTable ? "Hide table" : "View as table"}
          </button>
        )}
      </figcaption>

      {/* Legend — always present for two or more series */}
      {multi && (
        <ul className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          {chart.series.map((s, i) => (
            <li
              key={s.name}
              className="flex items-center gap-2 text-[length:var(--text-xs)] text-[var(--color-bone-dim)]"
            >
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: colors[i] }}
              />
              {s.name}
            </li>
          ))}
        </ul>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full touch-none"
        role={decorative ? undefined : "img"}
        aria-label={
          decorative
            ? undefined
            : `${chart.label}. ${chart.series
                .map(
                  (s) =>
                    `${s.name}: ${s.values
                      .map((v, i) => `${chart.labels[i]} ${fmt(v)}${unit}`)
                      .join(", ")}`,
                )
                .join(". ")}`
        }
        onPointerMove={decorative ? undefined : onMove}
        onPointerLeave={decorative ? undefined : () => setHover(null)}
      >
        <defs>
          {colors.map((c, i) => (
            <linearGradient key={i} id={`area-${uid}-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c} stopOpacity="0.18" />
              <stop offset="100%" stopColor={c} stopOpacity="0.02" />
            </linearGradient>
          ))}
        </defs>

        {/* --- gridlines: hairline, solid, recessive --- */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={PAD.left}
              x2={PAD.left + PLOT_W}
              y1={y(t)}
              y2={y(t)}
              stroke={CHART_GRID}
              strokeWidth="1"
            />
            {!compact && (
              <text
                x={PAD.left - 12}
                y={y(t) + 4}
                textAnchor="end"
                fontSize="12"
                fill={CHART_INK.muted}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {fmt(t)}
                {unit}
              </text>
            )}
          </g>
        ))}

        {/* --- x labels --- */}
        {!compact &&
          chart.labels.map((label, i) => {
            const cx =
              chart.type === "bar"
                ? PAD.left + (PLOT_W / n) * (i + 0.5)
                : x(i);
            return (
              <text
                key={label + i}
                x={cx}
                y={VB_H - PAD.bottom + 24}
                textAnchor="middle"
                fontSize="12"
                fill={CHART_INK.muted}
              >
                {label}
              </text>
            );
          })}

        {/* --- marks --- */}
        {chart.type === "bar"
          ? renderBars()
          : chart.series.map((s, si) => renderPath(s, si))}

        {/* --- hover layer --- */}
        {hover !== null && renderHover()}
      </svg>

      {/* --- table view: identity and values never gated behind hover --- */}
      {showTable && !decorative && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[length:var(--text-xs)]">
            <caption className="sr-only">{chart.label}</caption>
            <thead>
              <tr className="border-b border-[var(--color-line)]">
                <th scope="col" className="py-2 pr-4 font-normal text-[var(--color-muted)]">
                  Series
                </th>
                {chart.labels.map((l) => (
                  <th
                    key={l}
                    scope="col"
                    className="tabular py-2 pr-4 text-right font-normal text-[var(--color-muted)]"
                  >
                    {l}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.series.map((s, i) => (
                <tr key={s.name} className="border-b border-[var(--color-line-soft)]">
                  <th
                    scope="row"
                    className="flex items-center gap-2 py-2.5 pr-4 font-normal text-[var(--color-bone-dim)]"
                  >
                    <span
                      aria-hidden
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: colors[i] }}
                    />
                    {s.name}
                  </th>
                  {s.values.map((v, j) => (
                    <td
                      key={j}
                      className="tabular py-2.5 pr-4 text-right text-[var(--color-bone-dim)]"
                    >
                      {fmt(v)}
                      {unit}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );

  /* ---------------------------------------------------------------------- */

  function renderPath(
    s: CaseChart["series"][number],
    si: number,
  ) {
    const color = colors[si];
    const pts = s.values.map((v, i) => [x(i), y(v)] as const);
    const d = pts.map(([px, py], i) => `${i === 0 ? "M" : "L"}${px},${py}`).join(" ");
    const last = pts[pts.length - 1];

    return (
      <g key={s.name}>
        {chart.type === "area" && (
          <path
            d={`${d} L${last[0]},${PAD.top + PLOT_H} L${pts[0][0]},${PAD.top + PLOT_H} Z`}
            fill={`url(#area-${uid}-${si})`}
          />
        )}

        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* End marker — 2px surface ring so it stays legible over other lines */}
        <circle
          cx={last[0]}
          cy={last[1]}
          r="4.5"
          fill={color}
          stroke={CHART_SURFACE}
          strokeWidth="2"
        />

        {/* Direct end-label — selective, only the final value */}
        {!compact && (
          <text
            x={last[0] + 12}
            y={last[1] + 4}
            fontSize="12"
            fill={CHART_INK.secondary}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {fmt(s.values[s.values.length - 1])}
            {unit}
          </text>
        )}
      </g>
    );
  }

  function renderBars() {
    const band = PLOT_W / n;
    const count = chart.series.length;
    const slot = (band - GAP * (count + 1)) / count;
    const barW = Math.min(MAX_BAR, Math.max(4, slot));
    const groupW = barW * count + GAP * (count - 1);

    return chart.series.map((s, si) => (
      <g key={s.name}>
        {s.values.map((v, i) => {
          const groupLeft = PAD.left + band * i + (band - groupW) / 2;
          const bx = groupLeft + si * (barW + GAP);
          const by = y(v);
          const h = PAD.top + PLOT_H - by;
          const r = Math.min(4, barW / 2, h);
          // 4px rounded data-end, square at the baseline
          const d = `M${bx},${by + h} L${bx},${by + r} Q${bx},${by} ${bx + r},${by} L${bx + barW - r},${by} Q${bx + barW},${by} ${bx + barW},${by + r} L${bx + barW},${by + h} Z`;
          return (
            <path
              key={i}
              d={d}
              fill={colors[si]}
              opacity={hover === null || hover === i ? 1 : 0.4}
              style={{ transition: "opacity 180ms" }}
            />
          );
        })}
      </g>
    ));
  }

  function renderHover() {
    const i = hover as number;
    const isBar = chart.type === "bar";
    const cx = isBar ? PAD.left + (PLOT_W / n) * (i + 0.5) : x(i);

    // Keep the tooltip inside the plot.
    const boxW = 150;
    const boxH = 34 + chart.series.length * 19;
    const bx = Math.min(Math.max(cx - boxW / 2, 6), VB_W - boxW - 6);
    const by = 10;

    return (
      <g pointerEvents="none">
        {!isBar && (
          <line
            x1={cx}
            x2={cx}
            y1={PAD.top}
            y2={PAD.top + PLOT_H}
            stroke={CHART_GRID}
            strokeWidth="1"
          />
        )}

        {!isBar &&
          chart.series.map((s, si) => (
            <circle
              key={s.name}
              cx={cx}
              cy={y(s.values[i] ?? 0)}
              r="4.5"
              fill={colors[si]}
              stroke={CHART_SURFACE}
              strokeWidth="2"
            />
          ))}

        <g transform={`translate(${bx}, ${by})`}>
          <rect
            width={boxW}
            height={boxH}
            rx="8"
            fill="#0b0b0e"
            stroke={CHART_GRID}
            strokeWidth="1"
          />
          <text x="12" y="20" fontSize="11" fill={CHART_INK.muted}>
            {chart.labels[i]}
          </text>
          {chart.series.map((s, si) => (
            <g key={s.name} transform={`translate(12, ${36 + si * 19})`}>
              <circle cx="4" cy="-4" r="4" fill={colors[si]} />
              <text x="15" y="0" fontSize="12" fill={CHART_INK.secondary}>
                {s.name}
              </text>
              <text
                x={boxW - 24}
                y="0"
                fontSize="12"
                textAnchor="end"
                fill={CHART_INK.primary}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {fmt(s.values[i] ?? 0)}
                {unit}
              </text>
            </g>
          ))}
        </g>
      </g>
    );
  }
}
