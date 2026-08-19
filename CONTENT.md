# Editing your site

Everything you will ever need to change lives in **three files**. You do not
need to touch a component to update the site.

```
src/content/site.ts    ← name, bio, email, socials, form endpoint
src/content/music.ts   ← releases, Spotify/Apple, YouTube, services, press
src/content/data.ts    ← case studies, metrics, charts, tools, CV
```

Change a file, save, and the whole site updates. Every placeholder is marked
`TODO` — search the project for `TODO:` to find all of them at once.

---

## 1. Before you launch — the must-dos

| Where | What to change |
|---|---|
| `site.ts` | `name`, `email`, `location`, `intro` |
| `site.ts` | `url` → your real domain (used by SEO tags + sitemap) |
| `site.ts` | `socials` → your real profiles, delete the ones you don't use |
| `site.ts` | `formEndpoint` → see [Making the booking form send email](#3-making-the-booking-form-send-email) |
| `music.ts` | At least one real release with a `spotifyId` |
| `data.ts` | At least two real case studies |

Until you set `url`, link previews on WhatsApp/LinkedIn/Twitter will point at
the placeholder domain.

---

## 2. Music

### Adding a release

Open `src/content/music.ts` and add an entry to `releases`:

```ts
{
  slug: "my-new-single",           // must be unique, lowercase, no spaces
  title: "My New Single",
  kind: "Single",                  // Single | EP | Album | Score | Remix — free text
  released: "2026-02-14",          // YYYY-MM-DD, used for sorting and display
  role: "Written & produced",
  note: "One or two sentences of liner notes.",
  spotifyId: "4aawyAB9vmqN3uQ7FjRGTy",
  spotifyKind: "track",            // album | track | playlist
  appleUrl: "https://music.apple.com/…",
  youtubeId: "dQw4w9WgXcQ",
  cover: "/covers/my-new-single.jpg",
  hues: ["#e9b949", "#7c2d3a"],    // only used when cover is null
  featured: true,                  // optional
}
```

**Where the IDs come from**

- **Spotify** — open the album/track in Spotify → Share → Copy link.
  `https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy`
  The bit after `/album/` is your `spotifyId`; `album` is your `spotifyKind`.
- **Apple Music** — open the album on `music.apple.com` and paste the whole URL
  into `appleUrl`. The site converts it to an embed automatically.
  Set it to `null` to hide the Apple button.
- **YouTube** — `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `youtubeId` is
  `dQw4w9WgXcQ`.

**Artwork** — drop a square JPG (1000×1000 or larger) into `public/covers/` and
point `cover` at `/covers/filename.jpg`. Leave `cover: null` and the site
generates a record sleeve from your two `hues` — the grid never has a hole in it
while you're still sourcing artwork.

**Follow buttons** — set `spotifyArtistId` and `appleArtistUrl` near the bottom
of `music.ts` to turn on the "Listen everywhere" block and the big Spotify
artist embed. Leave them `null` to hide that whole section.

### Adding a video

Add to the `videos` array. Set `featured: true` to make one span the full width.
Until you set a `youtubeId`, the card shows a generated still and a note telling
you which file to edit.

### Changing your services and prices

`bookingServices` in `music.ts`. Each entry has `from`, `turnaround` and an
`includes` list. `from: "On request"` is the default — replace with real numbers
whenever you're ready. `featured: true` adds the "Most booked" badge.

The dropdown options in the booking form come from `projectTypes` and
`budgetBands` in the same file.

---

## 3. Making the booking form send email

The site is a static export — there is no server — so the form posts to a
third-party endpoint. **Out of the box it already works**: with
`formEndpoint: null`, submitting opens the visitor's mail client with every
field pre-filled and addressed to you. Nothing is lost.

To receive submissions as normal emails instead:

1. Sign up for a free form service:
   - [Formspree](https://formspree.io) — gives you `https://formspree.io/f/xxxxxxx`
   - [Web3Forms](https://web3forms.com) — gives you `https://api.web3forms.com/submit`
   - [Getform](https://getform.io)
2. Paste the URL into `formEndpoint` in `src/content/site.ts`:

```ts
formEndpoint: "https://formspree.io/f/xxxxxxx",
```

That's it. If the request ever fails, the form automatically falls back to the
mailto route and tells the visitor — an enquiry can't be silently dropped.

The form already includes a hidden honeypot field that catches most bots.

---

## 4. Data

### Adding a case study

Add an entry to `caseStudies` in `src/content/data.ts`. Each one automatically
gets its own page at `/data/<slug>/` — no routing to set up.

Structure your writing as:

- **`summary`** — one line, lead with the *outcome*, not the job title.
  "Cut 90-day default surprises by 38%…" beats "Worked on risk modelling."
- **`problem`** — the problem as it was actually stated to you, 2–4 short paragraphs.
- **`approach`** — what you did and *why that choice*, not a tool list.
- **`impact`** — what changed. Include the honest limits; it reads as more
  credible, not less.
- **`metrics`** — 2–4 headline numbers. Three fits the layout best.

### Adding a chart

Set the `chart` field. No chart library involved — it's hand-built SVG, so it
costs nothing in bundle size:

```ts
chart: {
  type: "line",                    // line | area | bar
  label: "Default rate by quarter",
  unit: "%",                       // optional suffix
  labels: ["Q1", "Q2", "Q3", "Q4"],
  series: [
    { name: "Before", values: [4.2, 4.4, 4.1, 4.5] },
    { name: "After",  values: [4.2, 3.9, 3.3, 2.9], emphasis: true },
  ],
}
```

`emphasis: true` gives that series the lead colour; everything else follows in
fixed order. Set `chart: null` to omit it.

**About the chart colours** — they're in `src/components/data/palette.ts` and
they are deliberately *not* the bright cyan/violet used elsewhere on the site.
Those two are only ΔE 5.5 apart under deuteranopia, meaning a red-green
colourblind reader cannot tell two series apart. The chart palette uses darker
steps that pass a colour-vision-deficiency check, a contrast check and a
lightness band. **If you change these values, the charts may stop being readable
for colourblind visitors.** Every chart also ships a legend, direct labels and a
table view, so identity is never carried by colour alone.

There's no pie or donut option on purpose — they're unreliable for comparing
close values, and every part-to-whole story here reads better as a bar.

### Other data content

- `impactStats` — the four counters near the top of `/data`
- `toolGroups` — your stack, grouped
- `capabilities` — what you're hired to do
- `resumeUrl` — drop a PDF at `public/jithma-cv.pdf` and set this to
  `"/jithma-cv.pdf"` to turn on the CV download button. `null` hides it.

---

## 5. Running and deploying

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes a static site to ./out
npm run typecheck  # catches content mistakes before they ship
```

`npm run build` produces a plain folder of HTML/CSS/JS in `out/`. It works on
any host.

**Vercel** — import the repo, accept the defaults, done.
**Netlify** — build command `npm run build`, publish directory `out`.
**Cloudflare Pages** — same as Netlify.
**GitHub Pages** — push `out/` to a `gh-pages` branch.

If you later want a real backend (a database, server-side form handling), remove
the `output: "export"` line from `next.config.ts` and deploy to Vercel instead.

---

## 6. Changing the look

- **Colours, type scale, spacing** — `src/app/globals.css`, top of the file.
  The music world's accents live under `[data-world="music"]` and the data
  world's under `[data-world="data"]`. Change those two blocks and both
  personalities change; no component hard-codes a colour.
- **Fonts** — `src/app/layout.tsx`. Currently Instrument Serif (display),
  Inter (UI) and JetBrains Mono (labels/numbers).
- **Motion** — `src/lib/motion.ts` holds the shared easings and durations, so
  the whole site moves with one rhythm.

Everything respects `prefers-reduced-motion`: if a visitor has reduced motion
turned on, animations resolve instantly instead of being removed, so nothing
becomes invisible.
