import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { WorldFrame } from "@/components/chrome/WorldFrame";
import { Chart } from "@/components/data/Chart";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { site } from "@/content/site";
import { caseStudies } from "@/content/data";
import { pad } from "@/lib/utils";

/** Static export needs every slug up front. */
export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: "Not found" };
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/data/${study.slug}` },
    openGraph: {
      title: `${study.title} — ${site.name}`,
      description: study.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  const study = caseStudies[index];
  if (!study) notFound();

  const next = caseStudies[(index + 1) % caseStudies.length];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    author: { "@type": "Person", name: site.name },
    datePublished: study.year,
    about: study.domain,
  };

  const sections = [
    { key: "problem", label: "The problem", body: study.problem },
    { key: "approach", label: "The approach", body: study.approach },
    { key: "impact", label: "What changed", body: study.impact },
  ] as const;

  return (
    <WorldFrame world="data">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ---- Header ---- */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-48">
        <div className="vignette absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="shell relative">
          <Reveal>
            <Link
              href="/data#work"
              className="group inline-flex items-center gap-2 text-[length:var(--text-xs)] text-[var(--color-muted)] transition-colors hover:text-[var(--accent)]"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              All case studies
            </Link>
          </Reveal>

          <Reveal delay={1} className="mt-9 flex flex-wrap items-center gap-3">
            <span className="eyebrow eyebrow-accent tabular">{pad(index + 1)}</span>
            <span className="h-px w-7 bg-[var(--accent)] opacity-40" />
            <span className="eyebrow">{study.domain}</span>
            <span className="eyebrow">· {study.client}</span>
            <span className="eyebrow tabular">· {study.year}</span>
          </Reveal>

          <h1 className="display mt-6 max-w-[20ch] text-[length:var(--text-5xl)] leading-[0.92]">
            <RevealText text={study.title} />
          </h1>

          <Reveal delay={2}>
            <p className="mt-8 max-w-[58ch] text-[length:var(--text-xl)] leading-snug text-[var(--color-bone-dim)]">
              {study.summary}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Metrics ---- */}
      <section className="shell">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line-soft)] bg-[var(--color-line-soft)] sm:grid-cols-3">
          {study.metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i}
              className="flex flex-col gap-2 bg-[#0d0d11] p-7 md:p-8"
            >
              <span className="display text-[length:var(--text-4xl)] leading-none text-[var(--accent)]">
                {m.value}
              </span>
              <span className="text-[length:var(--text-sm)] text-[var(--color-bone)]">
                {m.label}
              </span>
              {m.note && (
                <span className="text-[length:var(--text-xs)] text-[var(--color-faint)]">
                  {m.note}
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Chart ---- */}
      {study.chart && (
        <section className="shell pt-20 md:pt-28">
          <Reveal>
            <div className="rounded-2xl border border-[var(--color-line-soft)] bg-[#131318] p-7 md:p-10">
              <Chart chart={study.chart} />
            </div>
          </Reveal>
        </section>
      )}

      {/* ---- Narrative ---- */}
      <section className="pt-24 md:pt-32">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[220px_1fr] lg:gap-20">
            {/* Sticky meta rail */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <Reveal className="flex flex-col gap-7">
                <div>
                  <span className="eyebrow">Client</span>
                  <p className="mt-1.5 text-[length:var(--text-sm)] text-[var(--color-bone-dim)]">
                    {study.client}
                  </p>
                </div>
                <div>
                  <span className="eyebrow">Year</span>
                  <p className="tabular mt-1.5 text-[length:var(--text-sm)] text-[var(--color-bone-dim)]">
                    {study.year}
                  </p>
                </div>
                <div>
                  <span className="eyebrow">Tools</span>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {study.tools.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[var(--color-line-soft)] px-3 py-1 text-[length:var(--text-micro)] text-[var(--color-muted)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                {study.links && study.links.length > 0 && (
                  <div>
                    <span className="eyebrow">Links</span>
                    <ul className="mt-2.5 flex flex-col gap-1.5">
                      {study.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[length:var(--text-sm)] text-[var(--accent)]"
                          >
                            {l.label}
                            <ArrowUpRight size={12} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            </aside>

            {/* Body */}
            <div className="flex flex-col gap-16">
              {sections.map((section, si) => (
                <div key={section.key}>
                  <Reveal className="flex items-center gap-4">
                    <span className="eyebrow eyebrow-accent tabular">
                      {pad(si + 1)}
                    </span>
                    <span className="h-px w-7 bg-[var(--accent)] opacity-40" />
                    <h2 className="eyebrow">{section.label}</h2>
                  </Reveal>
                  <div className="mt-6 flex flex-col gap-5">
                    {section.body.map((para, i) => (
                      <Reveal key={i} delay={i}>
                        <p className="max-w-[64ch] text-[length:var(--text-lg)] leading-relaxed text-[var(--color-bone-dim)]">
                          {para}
                        </p>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}

              <Reveal>
                <div className="flex flex-wrap gap-3 border-t border-[var(--color-line-soft)] pt-10">
                  <MagneticLink
                    href={`mailto:${site.email}`}
                    variant="solid"
                    icon={<Mail size={15} />}
                  >
                    Discuss a similar project
                  </MagneticLink>
                  <MagneticLink href="/data#work" variant="outline">
                    Back to all work
                  </MagneticLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Next ---- */}
      <section className="shell pt-28 md:pt-40">
        <Reveal>
          <Link
            href={`/data/${next.slug}`}
            className="group block rounded-2xl border border-[var(--color-line-soft)] p-10 transition-colors duration-500 hover:border-[var(--accent)] md:p-14"
          >
            <span className="eyebrow">Next case study</span>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
              <h2 className="display max-w-[20ch] text-[length:var(--text-3xl)] leading-tight transition-colors duration-500 group-hover:text-[var(--accent)]">
                {next.title}
              </h2>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[var(--color-line)] text-[var(--accent)] transition-all duration-500 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--color-ink)]">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
    </WorldFrame>
  );
}
