import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WorldFrame } from "@/components/chrome/WorldFrame";
import { MusicHero } from "@/components/music/MusicHero";
import { Discography } from "@/components/music/Discography";
import { VideoGallery } from "@/components/music/VideoGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { site } from "@/content/site";
import {
  statement,
  studioProcess,
  credits,
  press,
  spotifyArtistId,
  appleArtistUrl,
  releases,
} from "@/content/music";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Records, scores and sound design by " +
    site.name +
    ". Listen on Spotify and Apple Music, watch sessions and videos, and book production work.",
  alternates: { canonical: "/music" },
  openGraph: {
    title: `Music — ${site.name}`,
    description: "Records, scores and sound design. Listen, watch, and book.",
  },
};

export default function MusicPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: site.name,
    url: `${site.url}/music`,
    genre: ["Electronic", "Alternative", "Score"],
    description: statement.lead,
    album: releases.map((r) => ({
      "@type": "MusicAlbum",
      name: r.title,
      datePublished: r.released,
    })),
  };

  return (
    <WorldFrame world="music">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <MusicHero />

      {/* ---- Credits marquee ---- */}
      <section className="border-y border-[var(--color-line-soft)] py-6">
        <Marquee items={credits} duration={52} />
      </section>

      {/* ---- Releases ---- */}
      <section id="releases" className="shell scroll-mt-24 pt-28 md:pt-36">
        <SectionHeading
          index="01"
          eyebrow="Discography"
          title="The catalogue"
          lede="Everything released under my own name, plus the records I built for other people. Open any row to read the notes and play it."
        />
        <div className="mt-14">
          <Discography />
        </div>

        {(spotifyArtistId || appleArtistUrl) && (
          <Reveal className="mt-14">
            <div className="card-hairline flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="eyebrow eyebrow-accent">Listen everywhere</span>
                <h3 className="display mt-2 text-[length:var(--text-2xl)]">
                  Follow the catalogue
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {spotifyArtistId && (
                  <MagneticLink
                    href={`https://open.spotify.com/artist/${spotifyArtistId}`}
                    variant="solid"
                    icon={<ArrowUpRight size={15} />}
                  >
                    Spotify
                  </MagneticLink>
                )}
                {appleArtistUrl && (
                  <MagneticLink
                    href={appleArtistUrl}
                    variant="outline"
                    icon={<ArrowUpRight size={15} />}
                  >
                    Apple Music
                  </MagneticLink>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {spotifyArtistId && (
          <Reveal className="mt-6">
            <iframe
              title={`${site.name} on Spotify`}
              src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              frameBorder="0"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full rounded-xl"
            />
          </Reveal>
        )}
      </section>

      {/* ---- Video ---- */}
      <section id="video" className="shell scroll-mt-24 pt-32 md:pt-44">
        <SectionHeading
          index="02"
          eyebrow="Moving image"
          title="Video & live sessions"
          lede="Music videos, one-take live sessions and studio diaries. Nothing loads until you press play."
        />
        <div className="mt-14">
          <VideoGallery />
        </div>
      </section>

      {/* ---- Studio / statement ---- */}
      <section id="studio" className="scroll-mt-24 pt-32 md:pt-44">
        <div className="shell">
          <SectionHeading index="03" eyebrow="The studio" title="How I work" />

          <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_0.9fr]">
            <div className="flex flex-col gap-6">
              {statement.body.map((para, i) => (
                <Reveal key={i} delay={i}>
                  <p className="max-w-[62ch] text-[length:var(--text-lg)] leading-relaxed text-[var(--color-bone-dim)]">
                    {para}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={3} className="mt-4">
                <MagneticLink
                  href="/booking"
                  variant="solid"
                  icon={<ArrowUpRight size={15} />}
                >
                  Start a project
                </MagneticLink>
              </Reveal>
            </div>

            <div className="flex flex-col">
              {studioProcess.map((step, i) => (
                <Reveal
                  key={step.step}
                  delay={i}
                  className="border-t border-[var(--color-line-soft)] py-7 last:border-b"
                >
                  <div className="flex gap-6">
                    <span className="eyebrow eyebrow-accent tabular pt-1">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="display text-[length:var(--text-xl)]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Press ---- */}
      {press.length > 0 && (
        <section className="shell pt-32 md:pt-44">
          <div className="grid gap-10 md:grid-cols-2">
            {press.map((p, i) => (
              <Reveal key={p.source} delay={i}>
                <figure className="card-hairline flex h-full flex-col justify-between gap-7 p-8">
                  <blockquote className="display text-[length:var(--text-xl)] leading-snug text-[var(--color-bone)]">
                    <span className="text-[var(--accent)]">&ldquo;</span>
                    {p.quote}
                    <span className="text-[var(--accent)]">&rdquo;</span>
                  </blockquote>
                  <figcaption className="flex items-center gap-3 text-[length:var(--text-xs)] text-[var(--color-muted)]">
                    <span className="h-px w-6 bg-[var(--accent)] opacity-50" />
                    {p.source}
                    <span className="tabular text-[var(--color-faint)]">{p.year}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---- Booking CTA ---- */}
      <section className="shell pt-32 md:pt-44">
        <Reveal>
          <Link
            href="/booking"
            className="group relative block overflow-hidden rounded-2xl border border-[var(--color-line)] p-10 md:p-16"
          >
            <div className="vignette absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow eyebrow-accent">Bookings open</span>
                <h2 className="display mt-4 max-w-[16ch] text-[length:var(--text-4xl)] leading-[0.95]">
                  Let&rsquo;s make the record you keep describing.
                </h2>
                <p className="mt-5 max-w-[46ch] text-[length:var(--text-base)] text-[var(--color-muted)]">
                  Production, mixing, scoring and session work. Tell me what you are
                  chasing and I will tell you honestly whether I am the right person
                  for it.
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-3 text-[length:var(--text-sm)] text-[var(--accent)]">
                Open booking
                <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--accent)] transition-all duration-500 group-hover:bg-[var(--accent)] group-hover:text-[var(--color-ink)]">
                  <ArrowUpRight
                    size={20}
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
    </WorldFrame>
  );
}
