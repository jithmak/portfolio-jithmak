/* ============================================================================
   DATA WORLD — case studies, impact metrics, tooling.
   ✏️  EDIT ME.

   Each case study renders a full detail page at /data/<slug>/.
   The `chart` block drives a hand-built SVG chart on the card and detail page —
   no chart library, no bundle cost. Pick a `type` and supply `series`.
   ========================================================================= */

export type ChartType = "line" | "bar" | "area" | "donut";

export interface CaseChart {
  type: ChartType;
  label: string;
  /** Y-axis unit suffix shown in the tooltip/labels, e.g. "%", "k", " hrs". */
  unit?: string;
  /** X-axis tick labels. Length should match the longest series. */
  labels: string[];
  series: { name: string; values: number[]; emphasis?: boolean }[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** Client or context. Use "Personal project" if it isn't client work. */
  client: string;
  /** Short domain tag shown on the card. */
  domain: string;
  year: string;
  /** One line that appears on the card. Lead with the outcome. */
  summary: string;
  /** The three-part story. Keep each to 2–4 short paragraphs. */
  problem: string[];
  approach: string[];
  impact: string[];
  /** Headline numbers. 2–4 reads best. */
  metrics: { value: string; label: string; note?: string }[];
  tools: string[];
  chart: CaseChart | null;
  /** Optional external links — dashboard, repo, write-up. */
  links?: { label: string; href: string }[];
  featured?: boolean;
  hues: [string, string];
}

/** TODO: replace every entry below with your real work. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "credit-risk-early-warning",
    title: "Early-Warning System for Credit Risk",
    client: "Financial Services",
    domain: "Risk Analytics",
    year: "2025",
    summary:
      "Cut 90-day default surprises by 38% by scoring behavioural signals months before a payment was ever missed.",
    problem: [
      "The portfolio review process was entirely backward-looking. A customer became a risk case the month they missed a payment — by which point recovery options were narrow and expensive.",
      "Analysts were working from a monthly batch report with no way to rank who to call first, so outreach was effectively random across a book of tens of thousands of accounts.",
    ],
    approach: [
      "Rebuilt the account-level feature store from transaction, tenure and contact history — 60+ behavioural features computed on a rolling window rather than a month-end snapshot.",
      "Trained a gradient-boosted classifier on 90-day forward default, tuned for recall in the top two deciles because the business cost of a missed case dwarfs the cost of a wasted call.",
      "Shipped the output as a ranked daily worklist inside the tool the collections team already used, rather than as another dashboard nobody would open.",
    ],
    impact: [
      "Default cases that arrived without warning fell 38% year on year. The top decile of the score captured just over half of all eventual defaults.",
      "Collections contact became prioritised instead of alphabetical, and the team reallocated roughly 20 hours a week from list-building to actual customer conversations.",
    ],
    metrics: [
      { value: "38%", label: "Fewer surprise defaults", note: "Year on year" },
      { value: "0.87", label: "Model AUC", note: "Out-of-time validation" },
      { value: "20 hrs", label: "Analyst time returned", note: "Per week" },
    ],
    tools: ["Python", "scikit-learn", "XGBoost", "SQL", "Airflow", "Power BI"],
    chart: {
      type: "line",
      label: "Surprise default rate by quarter",
      unit: "%",
      labels: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2"],
      series: [
        { name: "Before", values: [4.2, 4.4, 4.1, 4.5, 4.3, 4.4] },
        { name: "After rollout", values: [4.2, 3.9, 3.3, 2.9, 2.7, 2.7], emphasis: true },
      ],
    },
    featured: true,
    hues: ["#45e0d4", "#0f2b2e"],
  },
  {
    slug: "branch-network-optimisation",
    title: "Branch Network Performance Model",
    client: "Retail Operations",
    domain: "Operations Analytics",
    year: "2024",
    summary:
      "Found 12 underperforming locations whose problem was catchment overlap, not staffing — and saved the cost of a planned hiring round.",
    problem: [
      "Underperforming branches were being diagnosed by gut feel, and the standing assumption was always understaffing. A headcount increase was already budgeted.",
      "Nobody had ever modelled how much of each branch's catchment was being cannibalised by its own neighbours.",
    ],
    approach: [
      "Built a catchment model from customer postcode data, weighting each branch by travel time rather than straight-line distance.",
      "Ran a regression of branch revenue on catchment population, overlap share, staffing and footfall to separate the effects that were being conflated.",
      "Produced a per-branch scorecard that stated plainly which of the four levers actually constrained that specific location.",
    ],
    impact: [
      "Overlap, not staffing, explained the majority of variance in the underperforming set. The blanket hiring round was replaced with targeted changes at nine sites.",
      "Two locations were relocated rather than closed, retaining their customer base at a fraction of the projected cost.",
    ],
    metrics: [
      { value: "12", label: "Branches re-diagnosed" },
      { value: "R² 0.74", label: "Model fit", note: "Revenue variance explained" },
      { value: "9", label: "Sites re-planned", note: "Instead of blanket hiring" },
    ],
    tools: ["Python", "GeoPandas", "PostgreSQL", "statsmodels", "Tableau"],
    chart: {
      type: "bar",
      label: "Variance in branch revenue explained by factor",
      unit: "%",
      labels: ["Catchment overlap", "Population", "Footfall", "Staffing", "Other"],
      series: [
        { name: "Share of variance", values: [41, 22, 14, 9, 14], emphasis: true },
      ],
    },
    hues: ["#5b8cff", "#131a33"],
  },
  {
    slug: "churn-cohort-engine",
    title: "Subscription Churn Cohort Engine",
    client: "Personal project",
    domain: "Product Analytics",
    year: "2024",
    summary:
      "An open cohort-analysis pipeline that turns a raw events table into retention curves and survival estimates in one command.",
    problem: [
      "Every churn analysis I ran started the same way: a week of reshaping an events table into cohorts before a single insight appeared.",
      "The reshaping was identical every time, and it was where the bugs lived — off-by-one month boundaries, silently dropped reactivations, timezone drift.",
    ],
    approach: [
      "Wrote a single declarative spec — event table, user key, timestamp, revenue column — that generates cohort matrices, retention curves and Kaplan–Meier survival estimates.",
      "Added property-based tests around the boundary cases that historically broke: reactivation, partial months, and users who churn and return more than once.",
      "Packaged the output as both a dataframe and a static HTML report so it can be handed to someone non-technical unchanged.",
    ],
    impact: [
      "The setup phase of a churn analysis went from about a week to under an hour, and the boundary bugs stopped recurring because they became test cases.",
      "Now the default starting point for any retention question I get asked.",
    ],
    metrics: [
      { value: "~1 hr", label: "Setup time", note: "Down from ~1 week" },
      { value: "100%", label: "Boundary cases covered", note: "Property-based tests" },
      { value: "3", label: "Output formats", note: "Dataframe, HTML, CSV" },
    ],
    tools: ["Python", "pandas", "lifelines", "pytest", "Jinja2"],
    chart: {
      type: "area",
      label: "Retention by monthly cohort",
      unit: "%",
      labels: ["M0", "M1", "M2", "M3", "M4", "M5", "M6"],
      series: [
        { name: "2023 cohorts", values: [100, 68, 54, 46, 41, 38, 36] },
        { name: "2024 cohorts", values: [100, 76, 64, 58, 54, 51, 49], emphasis: true },
      ],
    },
    hues: ["#8b5cf6", "#1a1330"],
  },
  {
    slug: "campaign-attribution",
    title: "Multi-Touch Campaign Attribution",
    client: "Marketing",
    domain: "Growth Analytics",
    year: "2023",
    summary:
      "Replaced last-click reporting with a Markov-chain model and reallocated a third of spend toward channels that were quietly doing the work.",
    problem: [
      "Budget was allocated on last-click, which credited the final touchpoint with the entire conversion and made upper-funnel channels look like pure cost.",
      "Two channels were repeatedly proposed for cuts despite appearing early in most converting journeys.",
    ],
    approach: [
      "Reconstructed full customer journeys from the event stream, stitching sessions across devices where a login was present.",
      "Built a Markov-chain removal-effect model to measure each channel's actual contribution, and validated it against a holdout period with geo splits.",
      "Presented the two models side by side rather than replacing the old one outright — the argument landed better than the number would have alone.",
    ],
    impact: [
      "Roughly a third of spend moved toward channels last-click had been systematically undervaluing. Blended acquisition cost fell 24% over the following two quarters.",
      "Attribution stopped being a monthly argument and became a shared reference point.",
    ],
    metrics: [
      { value: "24%", label: "Lower blended CAC", note: "Two quarters post-change" },
      { value: "31%", label: "Spend reallocated" },
      { value: "2", label: "Channels saved from cuts" },
    ],
    tools: ["Python", "BigQuery", "dbt", "ChannelAttribution", "Looker"],
    chart: {
      type: "bar",
      label: "Credited conversions by attribution model",
      labels: ["Paid Search", "Paid Social", "Organic", "Email", "Referral"],
      series: [
        { name: "Last click", values: [420, 180, 240, 310, 90] },
        { name: "Markov chain", values: [310, 295, 330, 240, 165], emphasis: true },
      ],
    },
    hues: ["#45e0d4", "#12262b"],
  },
];

/* ---------------------------------------------------------------------------
   HEADLINE IMPACT — the counter row near the top of /data
   ------------------------------------------------------------------------ */
/** TODO: your real career-level numbers. */
export const impactStats = [
  { value: 40, suffix: "+", label: "Dashboards shipped", sub: "Across risk, ops and growth" },
  { value: 6, suffix: " yrs", label: "In analytics", sub: "Financial services & product" },
  { value: 12, suffix: "M+", label: "Rows modelled", sub: "Daily pipelines in production" },
  { value: 24, suffix: "%", label: "Median cost saving", sub: "On projects with a measured baseline" },
];

/* ---------------------------------------------------------------------------
   TOOLING
   ------------------------------------------------------------------------ */
export const toolGroups = [
  {
    group: "Languages",
    items: ["Python", "SQL", "R", "DAX", "TypeScript"],
  },
  {
    group: "Modelling & Analysis",
    items: ["pandas", "scikit-learn", "XGBoost", "statsmodels", "lifelines", "PyMC"],
  },
  {
    group: "Data Platform",
    items: ["PostgreSQL", "BigQuery", "dbt", "Airflow", "Snowflake", "Spark"],
  },
  {
    group: "Visualisation",
    items: ["Power BI", "Tableau", "Looker", "Plotly", "D3"],
  },
] as const;

/* ---------------------------------------------------------------------------
   CAPABILITIES — what you actually do for people
   ------------------------------------------------------------------------ */
export const capabilities = [
  {
    title: "Decision modelling",
    body: "Forecasts, risk scores and scenario models built to be argued with — assumptions visible, sensitivity stated, not a black box.",
  },
  {
    title: "Pipelines that hold",
    body: "Tested, scheduled, monitored data flows. If a number changes overnight, you find out before the meeting does.",
  },
  {
    title: "Analysis people act on",
    body: "The finding is only half the job. The other half is landing it in a form the person who owns the decision can actually use.",
  },
  {
    title: "Visual clarity",
    body: "Dashboards and reports with a point of view. Fewer charts, better chosen, honestly scaled.",
  },
] as const;

/**
 * Optional CV file. Drop a PDF at /public/jithma-cv.pdf and set the path here
 * to turn on the download button. Leave null to hide it.
 */
export const resumeUrl: string | null = null;
