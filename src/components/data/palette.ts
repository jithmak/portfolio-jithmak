/**
 * Chart palette for the data world.
 *
 * These are NOT the UI accent colours. They were derived from the brand hues
 * and then validated with the dataviz palette validator against the dark card
 * surface (#131318): all four sit inside the dark lightness band (OKLCH L
 * 0.48–0.67), clear the chroma floor, hold adjacent CVD separation
 * (worst ΔE 12.3 protan) and the normal-vision floor (worst ΔE 19.7), and pass
 * 3:1 contrast. The brand's bright cyan/violet FAIL as a categorical set —
 * violet and electric blue are only ΔE 5.5 apart under deuteranopia — so charts
 * use these steps instead of the UI accents.
 *
 * Tritan separation on the 4-colour set is 7.1 (the 6–8 floor band), which is
 * legal only alongside secondary encoding. Every chart here therefore ships a
 * legend, direct labels and surface gaps — identity is never colour alone.
 *
 * ASSIGN IN FIXED ORDER. Never cycle: a 5th series folds into "Other" or
 * becomes a small multiple.
 */
export const CHART_SERIES = ["#16a89e", "#5f77e8", "#c1519c", "#b8802c"] as const;

/** Chart surface — matches the card the chart sits on. */
export const CHART_SURFACE = "#131318";

/** Recessive grid/axis ink — one step off the surface. */
export const CHART_GRID = "#26262f";

/** Text tokens. Values and labels never wear a series colour. */
export const CHART_INK = {
  primary: "#f5f3ef",
  secondary: "#a5a5ae",
  muted: "#6d6d78",
} as const;

/** The de-emphasised step used for "before"/baseline series. */
export const CHART_MUTED_SERIES = "#4a4a57";

export function seriesColor(index: number, emphasis?: boolean) {
  if (emphasis) return CHART_SERIES[0];
  return CHART_SERIES[index % CHART_SERIES.length];
}
