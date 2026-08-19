import type { Metadata } from "next";
import { Check, Clock, ArrowUpRight } from "lucide-react";
import { WorldFrame } from "@/components/chrome/WorldFrame";
import { BookingForm } from "@/components/music/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { bookingServices, studioProcess } from "@/content/music";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Booking",
  description: `Book ${site.name} for music production, mixing and mastering, film scoring or session work. Tell me about the project and I will reply within two working days.`,
  alternates: { canonical: "/booking" },
  openGraph: {
    title: `Booking — ${site.name}`,
    description:
      "Production, mixing, scoring and session work. Open for commissions.",
  },
};

export default function BookingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Music production, mixing, mastering and scoring",
    provider: { "@type": "Person", name: site.name, email: site.email },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Music production services",
      itemListElement: bookingServices.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.summary },
      })),
    },
  };

  return (
    <WorldFrame world="music">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden pt-40 pb-20 md:pt-52">
        <div className="vignette absolute inset-0" />
        <div className="shell relative">
          <Reveal className="flex items-center gap-4">
            <span className="eyebrow eyebrow-accent">Bookings</span>
            <span className="h-px w-10 bg-[var(--accent)] opacity-40" />
            <span className="eyebrow flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              Open for commissions
            </span>
          </Reveal>

          <h1 className="display mt-7 max-w-[15ch] text-[length:var(--text-5xl)] leading-[0.9]">
            <RevealText text="Tell me what you're" />{" "}
            <span className="italic text-gradient-accent">
              <RevealText text="chasing." delay={0.3} />
            </span>
          </h1>

          <Reveal delay={2}>
            <p className="mt-8 max-w-[54ch] text-[length:var(--text-lg)] leading-relaxed text-[var(--color-bone-dim)]">
              Production, mixing, scoring and session work — for artists, labels,
              filmmakers and brands. Send me the project and I will tell you plainly
              whether I am the right person for it, what it would take, and what it
              would cost.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-[length:var(--text-xs)] text-[var(--color-muted)]">
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-[var(--accent)]" />
                Replies within 2 working days
              </span>
              <span className="flex items-center gap-2">
                <Check size={13} className="text-[var(--accent)]" />
                Remote and in-room
              </span>
              <span className="flex items-center gap-2">
                <Check size={13} className="text-[var(--accent)]" />
                Stems and session files always yours
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Services ---- */}
      <section id="services" className="shell scroll-mt-24 pt-16 md:pt-24">
        <SectionHeading
          index="01"
          eyebrow="Services"
          title="What I take on"
          lede="Four ways in. If your project sits between them, describe it in the form and we will work out the shape together."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {bookingServices.map((service, i) => (
            <Reveal key={service.id} delay={i}>
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-colors duration-500 md:p-10",
                  service.featured
                    ? "border-[var(--accent)]/35 bg-gradient-to-b from-[rgb(233_185_73_/_0.06)] to-transparent"
                    : "border-[var(--color-line-soft)] hover:border-[var(--color-line)]",
                )}
              >
                {service.featured && (
                  <span className="absolute right-8 top-8 rounded-full border border-[var(--accent)]/40 px-3 py-1 text-[length:var(--text-micro)] uppercase tracking-[0.18em] text-[var(--accent)]">
                    Most booked
                  </span>
                )}

                <h3 className="display text-[length:var(--text-2xl)] transition-colors group-hover:text-[var(--accent)]">
                  {service.title}
                </h3>

                <p className="mt-4 max-w-[42ch] text-[length:var(--text-base)] leading-relaxed text-[var(--color-bone-dim)]">
                  {service.summary}
                </p>

                <ul className="mt-7 flex flex-col gap-2.5">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[length:var(--text-sm)] text-[var(--color-muted)]"
                    >
                      <Check
                        size={14}
                        className="mt-1 shrink-0 text-[var(--accent)] opacity-80"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <dl className="mt-auto flex flex-wrap gap-x-10 gap-y-3 border-t border-[var(--color-line-soft)] pt-6 [margin-block-start:2rem]">
                  <div>
                    <dt className="eyebrow mb-1">From</dt>
                    <dd className="text-[length:var(--text-base)] text-[var(--color-bone)]">
                      {service.from}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">Turnaround</dt>
                    <dd className="text-[length:var(--text-base)] text-[var(--color-bone)]">
                      {service.turnaround}
                    </dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Process strip ---- */}
      <section className="shell pt-28 md:pt-40">
        <div className="grid gap-8 md:grid-cols-3">
          {studioProcess.map((step, i) => (
            <Reveal key={step.step} delay={i}>
              <div className="flex flex-col gap-3 border-t border-[var(--color-line)] pt-6">
                <span className="display text-[length:var(--text-4xl)] leading-none text-[var(--accent)] opacity-30">
                  {step.step}
                </span>
                <h3 className="display text-[length:var(--text-xl)]">{step.title}</h3>
                <p className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- The form ---- */}
      <section id="enquiry" className="scroll-mt-24 pt-28 md:pt-40">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                index="02"
                eyebrow="Enquiry"
                title="Start the conversation"
                lede="The more you tell me, the more useful my first reply is. Rough answers are better than blank fields."
              />

              <Reveal delay={2} className="mt-10">
                <div className="flex flex-col gap-5 border-t border-[var(--color-line-soft)] pt-7">
                  <div>
                    <span className="eyebrow">Prefer email?</span>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-2 flex items-center gap-2 text-[length:var(--text-lg)] text-[var(--color-bone)] transition-colors hover:text-[var(--accent)]"
                    >
                      {site.email}
                      <ArrowUpRight size={16} className="text-[var(--accent)]" />
                    </a>
                  </div>
                  <div>
                    <span className="eyebrow">Based in</span>
                    <p className="mt-2 text-[length:var(--text-base)] text-[var(--color-bone-dim)]">
                      {site.location} · {site.timezone}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={1}>
              <BookingForm />
            </Reveal>
          </div>
        </div>
      </section>
    </WorldFrame>
  );
}
