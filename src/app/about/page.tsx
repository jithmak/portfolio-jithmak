import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { site, worlds } from "@/content/site";
import { statement } from "@/content/music";
import { toolGroups } from "@/content/data";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.tagline} based in ${site.location}. ${site.intro}`,
  alternates: { canonical: "/about" },
};

/**
 * The one page that belongs to neither world. It stays on the neutral palette
 * and hands the visitor off to whichever side they came for.
 */
export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <ScrollProgress />

      {/* Minimal chrome — this page is the seam, so it gets no world nav */}
      <header className="fixed inset-x-0 top-0 z-50 py-6">
        <div className="shell flex items-center justify-between">
          <Link href="/" className="display text-[length:var(--text-xl)]">
            {site.wordmark}
          </Link>
          <nav className="flex items-center gap-6" aria-label="Worlds">
            {Object.values(worlds).map((w) => (
              <Link
                key={w.id}
                href={w.href}
                className="text-[length:var(--text-sm)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-bone)]"
              >
                {w.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        {/* ---- Intro ---- */}
        <section className="shell pt-40 md:pt-52">
          <Reveal className="flex items-center gap-4">
            <span className="eyebrow">About</span>
            <span className="h-px w-10 bg-[var(--color-line)]" />
            <span className="eyebrow">{site.tagline}</span>
          </Reveal>

          <h1 className="display mt-7 max-w-[18ch] text-[length:var(--text-5xl)] leading-[0.92]">
            <RevealText text={site.name} />
          </h1>

          <Reveal delay={2}>
            <p className="mt-9 max-w-[62ch] text-[length:var(--text-xl)] leading-snug text-[var(--color-bone-dim)]">
              {site.intro}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-[length:var(--text-sm)] text-[var(--color-muted)]">
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                {site.location}
              </span>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 transition-colors hover:text-[var(--color-bone)]"
              >
                <Mail size={14} />
                {site.email}
              </a>
            </div>
          </Reveal>
        </section>

        {/* ---- The two halves ---- */}
        <section className="shell pt-28 md:pt-40">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Music */}
            <Reveal data-world="music">
              <Link
                href="/music"
                data-world="music"
                className="group flex h-full flex-col gap-6 rounded-2xl border border-[var(--color-line-soft)] p-9 transition-colors duration-500 hover:border-[var(--accent)] md:p-11"
              >
                <div className="flex items-center gap-3">
                  <span className="eyebrow eyebrow-accent tabular">01</span>
                  <span className="h-px w-6 bg-[var(--accent)] opacity-40" />
                  <span className="eyebrow">{worlds.music.role}</span>
                </div>
                <h2 className="display text-[length:var(--text-3xl)] transition-colors duration-500 group-hover:text-[var(--accent)]">
                  {worlds.music.label}
                </h2>
                <p className="max-w-[42ch] text-[length:var(--text-base)] leading-relaxed text-[var(--color-bone-dim)]">
                  {statement.lead} I produce, mix and score — for artists, labels and
                  film — and I take on a small number of commissions at a time so each
                  one gets the attention it needs.
                </p>
                <span className="mt-auto flex items-center gap-2 text-[length:var(--text-sm)] text-[var(--accent)]">
                  Enter the music world
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </Link>
            </Reveal>

            {/* Data */}
            <Reveal delay={1}>
              <Link
                href="/data"
                data-world="data"
                className="group flex h-full flex-col gap-6 rounded-2xl border border-[var(--color-line-soft)] p-9 transition-colors duration-500 hover:border-[var(--accent)] md:p-11"
              >
                <div className="flex items-center gap-3">
                  <span className="eyebrow eyebrow-accent tabular">02</span>
                  <span className="h-px w-6 bg-[var(--accent)] opacity-40" />
                  <span className="eyebrow">{worlds.data.role}</span>
                </div>
                <h2 className="display text-[length:var(--text-3xl)] transition-colors duration-500 group-hover:text-[var(--accent)]">
                  {worlds.data.label}
                </h2>
                <p className="max-w-[42ch] text-[length:var(--text-base)] leading-relaxed text-[var(--color-bone-dim)]">
                  I build models, pipelines and dashboards in financial services and
                  product — risk scoring, operations analysis, retention and
                  attribution. The finding is only half the job; landing it is the
                  other half.
                </p>
                <span className="mt-auto flex items-center gap-2 text-[length:var(--text-sm)] text-[var(--accent)]">
                  Enter the data world
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ---- Why both ---- */}
        <section className="shell pt-28 md:pt-40">
          <div className="grid gap-12 md:grid-cols-[220px_1fr] md:gap-20">
            <Reveal>
              <span className="eyebrow">Why both</span>
            </Reveal>
            <div className="flex flex-col gap-6">
              <Reveal>
                <p className="max-w-[62ch] text-[length:var(--text-2xl)] leading-snug text-[var(--color-bone)]">
                  People ask how the two fit together. They are the same habit
                  pointed at different material.
                </p>
              </Reveal>
              <Reveal delay={1}>
                <p className="max-w-[64ch] text-[length:var(--text-lg)] leading-relaxed text-[var(--color-muted)]">
                  A mix and a model are both exercises in deciding what to leave out.
                  Both start with more material than the result can carry, both fail
                  the same way — too much going on, nothing clearly heard — and both
                  are finished when removing one more thing would break them.
                </p>
              </Reveal>
              <Reveal delay={2}>
                <p className="max-w-[64ch] text-[length:var(--text-lg)] leading-relaxed text-[var(--color-muted)]">
                  Working in both keeps each one honest. The studio taught me that
                  taste is a decision you have to defend; the analysis taught me that
                  a strong opinion should survive contact with the numbers. I would
                  not be as good at either alone.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Skills strip ---- */}
        <section className="shell pt-28 md:pt-40">
          <div className="grid gap-12 md:grid-cols-[220px_1fr] md:gap-20">
            <Reveal>
              <span className="eyebrow">Toolkit</span>
            </Reveal>
            <div className="flex flex-col">
              {toolGroups.map((group, i) => (
                <Reveal
                  key={group.group}
                  delay={i}
                  className="flex flex-col gap-3 border-t border-[var(--color-line-soft)] py-6 last:border-b sm:flex-row sm:gap-8"
                >
                  <span className="eyebrow shrink-0 sm:w-40 sm:pt-1">
                    {group.group}
                  </span>
                  <p className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-bone-dim)]">
                    {group.items.join(" · ")}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Contact ---- */}
        <section id="contact" className="shell scroll-mt-24 pt-28 md:pt-40">
          <Reveal>
            <div className="rounded-2xl border border-[var(--color-line)] p-10 md:p-16">
              <span className="eyebrow">Contact</span>
              <h2 className="display mt-4 max-w-[16ch] text-[length:var(--text-4xl)] leading-[0.95]">
                Whichever half you came for.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[length:var(--text-base)] text-[var(--color-muted)]">
                Music commissions, analytics work, or something that needs both —
                the same inbox reaches me.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <MagneticLink
                  href={`mailto:${site.email}`}
                  variant="solid"
                  icon={<Mail size={15} />}
                >
                  {site.email}
                </MagneticLink>
                <MagneticLink
                  href="/booking"
                  variant="outline"
                  icon={<ArrowUpRight size={15} />}
                >
                  Book music production
                </MagneticLink>
              </div>

              <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--color-line-soft)] pt-8">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-[length:var(--text-sm)] text-[var(--color-bone-dim)] transition-colors hover:text-[var(--color-bone)]"
                    >
                      {s.label}
                      <span className="text-[var(--color-faint)]">{s.handle}</span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="shell mt-28 border-t border-[var(--color-line-soft)] py-8">
        <div className="flex flex-col gap-3 text-[length:var(--text-xs)] text-[var(--color-faint)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <Link href="/" className="transition-colors hover:text-[var(--color-bone)]">
            Back to start
          </Link>
        </div>
      </footer>
    </div>
  );
}
