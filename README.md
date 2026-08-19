# Jithma — Musician & Data Analyst

A dual-identity portfolio. One site, two personalities: a warm, artistic music
world for records, video and production bookings, and a cool, precise data world
for analytics case studies.

**→ [CONTENT.md](./CONTENT.md) is the editing guide.** Everything you'll want to
change lives in three content files; you never need to open a component.

---

## The idea

The whole design system hangs off a single `data-world` attribute. A section
marked `data-world="music"` inherits the warm amber palette; `data-world="data"`
inherits cool cyan. Every component is written once and takes on the personality
of whatever world it sits in — so the two halves feel genuinely different while
sharing one skeleton, one type scale and one motion vocabulary.

```
/                     Split-screen gate — pick a world (live canvas waveform vs. scatter plot)
/music                Discography, video wall, artist statement, press
/booking              Service packages + validated enquiry form
/data                 Impact counters, case-study grid, capabilities, stack
/data/[slug]          Full case study: problem / approach / impact, charts
/about                The seam between the two identities
```

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** with a custom token layer
- **Motion** for animation, **lucide-react** for icons
- **Statically exported** — no server, deploys anywhere

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → ./out
npm run typecheck
```

## Project layout

```
src/
├── app/                    routes, metadata, sitemap, robots
├── components/
│   ├── chrome/             nav, footer, cursor, scroll progress, world frame
│   ├── gate/               landing gate + its two canvas backgrounds
│   ├── music/              sleeves, discography, video gallery, booking form
│   ├── data/               charts, case cards, chart palette
│   └── ui/                 reveals, magnetic buttons, marquee, counters
├── content/                ← the three files you edit
└── lib/                    utils + shared motion vocabulary
```

## Decisions worth knowing about

**Streaming embeds load on demand.** Spotify and Apple Music players are heavy
third-party frames that set cookies before anyone presses play. Six of them on
page load would cost more than the rest of the site combined, so the iframe is
only created once a visitor asks for it. YouTube works the same way and uses
`youtube-nocookie`.

**The booking form can't silently fail.** The site is static, so the form posts
to a configurable third-party endpoint. With no endpoint set it opens the
visitor's mail client with every field pre-filled; if a configured endpoint
errors, it falls back to the same route and says so. An enquiry is never
dropped.

**Chart colours are validated, not chosen by eye.** The brand's bright cyan and
violet are only ΔE 5.5 apart under deuteranopia — as a categorical pair they're
invisible to a red-green colourblind reader. Charts therefore use darker steps
that pass a colour-vision, contrast and lightness check, with the reasoning
recorded in `src/components/data/palette.ts`. Every chart also carries a legend,
direct labels and a table view, so identity never rests on colour alone.

**No chart library.** The line, area and bar charts are hand-built SVG: crosshair
tooltips, table view, 2px surface rings on overlapping markers, 4px rounded bar
ends. Zero bundle cost.

**Accessibility.** Skip link, visible focus rings, real heading hierarchy,
`aria-expanded` on every disclosure, keyboard-dismissable video lightbox, and
alternate text/table access for all chart data. Reduced motion resolves
animations instantly rather than removing them, so nothing becomes invisible.

## Before launch

Set `url`, `email` and `socials` in `src/content/site.ts`, and pick a form
endpoint. See [CONTENT.md](./CONTENT.md#1-before-you-launch--the-must-dos).
