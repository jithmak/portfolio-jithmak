import type { Metadata } from "next";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { WorldFrame } from "@/components/chrome/WorldFrame";
import { DataHero } from "@/components/data/DataHero";
import { CaseCard } from "@/components/data/CaseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { site } from "@/content/site";
import {
  caseStudies,
  impactStats,
  toolGroups,
  capabilities,
  resumeUrl,
} from "@/content/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Data",
  description: `Analytics and data science work by ${site.name} — risk modelling, operations analysis, product retention and attribution. Case studies with measured outcomes.`,
  alternates: { canonical: "/data" },
  openGraph: {
    title: `Data — ${site.name}`,
    description:
      "Case studies in risk, operations, product and growth analytics — with the numbers.",
  },
};

export default function DataPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: site.name,
      jobTitle: "Data Analyst",
      knowsAbout: toolGroups.flatMap((g) => g.items),
      email: `mailto:${site.email}`,
    },
  };

  return (
    <WorldFrame world="data">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <DataHero />

      {/* ---- Impact counters ---- */}
      <section id="impact" className="shell scroll-mt-24 pt-24 md:pt-32">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line-soft)] bg-[var(--color-line-soft)] sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i}
              className="flex flex-col gap-2 bg-[#0d0d11] p-7 md:p-8"
            >
              {/* Proportional figures — a display-size number, not a column */}
              <span className="display text-[length:var(--text-4xl)] leading-none text-[var(--accent)]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[length:var(--text-sm)] text-[var(--color-bone)]">
                {stat.label}
              </span>
              <span className="text-[length:var(--text-xs)] leading-relaxed text-[var(--color-faint)]">
                {stat.sub}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Work ---- */}
      <section id="work" className="shell scroll-mt-24 pt-28 md:pt-40">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="Case studies"
          lede="Four projects, each with the problem as it was actually stated, what I did about it, and what changed afterwards — including where the honest answer is 'less than we hoped'."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study, i) => (
            <Reveal
              key={study.slug}
              delay={i % 2}
              className={cn(study.featured && "lg:col-span-2")}
            >
              <CaseCard study={study} index={i} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Capabilities ---- */}
      <section className="shell pt-32 md:pt-44">
        <SectionHeading
          index="02"
          eyebrow="Capability"
          title="What I'm hired to do"
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line-soft)] bg-[var(--color-line-soft)] sm:grid-cols-2">
          {capabilities.map((cap, i) => (
            <Reveal
              key={cap.title}
              delay={i}
              className="flex flex-col gap-3 bg-[#0d0d11] p-8 md:p-10"
            >
              <h3 className="display text-[length:var(--text-xl)]">{cap.title}</h3>
              <p className="max-w-[46ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                {cap.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Stack ---- */}
      <section id="stack" className="shell scroll-mt-24 pt-32 md:pt-44">
        <SectionHeading index="03" eyebrow="Toolkit" title="The stack" />

        <div className="mt-14 flex flex-col">
          {toolGroups.map((group, i) => (
            <Reveal
              key={group.group}
              delay={i}
              className="grid gap-4 border-t border-[var(--color-line-soft)] py-7 last:border-b md:grid-cols-[220px_1fr] md:gap-10"
            >
              <span className="eyebrow pt-1">{group.group}</span>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[var(--color-line)] px-4 py-1.5 text-[length:var(--text-xs)] text-[var(--color-bone-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="shell pt-32 md:pt-44">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] p-10 md:p-16">
            <div className="vignette absolute inset-0" />
            <div className="bg-grid-fine absolute inset-0 opacity-60" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow eyebrow-accent">Open to work</span>
                <h2 className="display mt-4 max-w-[18ch] text-[length:var(--text-4xl)] leading-[0.95]">
                  Have a question your data should already be answering?
                </h2>
                <p className="mt-5 max-w-[48ch] text-[length:var(--text-base)] text-[var(--color-muted)]">
                  Available for analytics roles, consulting engagements and
                  short-term modelling work. Send me the question — I will tell you
                  what it would take to answer it properly.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <MagneticLink
                  href={`mailto:${site.email}`}
                  variant="solid"
                  icon={<Mail size={15} />}
                >
                  Email me
                </MagneticLink>
                {resumeUrl && (
                  <MagneticLink
                    href={resumeUrl}
                    variant="outline"
                    icon={<Download size={15} />}
                  >
                    CV
                  </MagneticLink>
                )}
                <MagneticLink
                  href="/about"
                  variant="outline"
                  icon={<ArrowUpRight size={15} />}
                >
                  About
                </MagneticLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </WorldFrame>
  );
}
