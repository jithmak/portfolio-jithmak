import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site, worlds, type World } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Footer({ world }: { world: World }) {
  const other = world === "music" ? worlds.data : worlds.music;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-[var(--color-line-soft)] pt-20 pb-10">
      <div className="shell">
        {/* Big cross-world CTA */}
        <Reveal>
          <Link
            href={other.href}
            className="group block border-b border-[var(--color-line-soft)] pb-16"
          >
            <span className="eyebrow">Also / {other.index}</span>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-[length:var(--text-5xl)] transition-colors duration-500 group-hover:text-[var(--accent)]">
                {other.label}
              </h2>
              <span className="flex items-center gap-3 pb-3 text-[length:var(--text-sm)] text-[var(--color-muted)]">
                {other.line}
                <ArrowUpRight
                  size={20}
                  className="text-[var(--accent)] transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Details */}
        <div className="grid gap-12 pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="display text-[length:var(--text-2xl)]">
              {site.wordmark}
            </span>
            <p className="max-w-[38ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
              {site.tagline}. Based in {site.location} — working {site.timezone} and
              wherever the project is.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow">Elsewhere</span>
            <ul className="flex flex-col gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[length:var(--text-sm)] text-[var(--color-bone-dim)] transition-colors hover:text-[var(--accent)]"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="eyebrow">Direct</span>
            <a
              href={`mailto:${site.email}`}
              className="text-[length:var(--text-sm)] text-[var(--color-bone-dim)] transition-colors hover:text-[var(--accent)]"
            >
              {site.email}
            </a>
            <Link
              href="/booking"
              className="text-[length:var(--text-sm)] text-[var(--color-bone-dim)] transition-colors hover:text-[var(--accent)]"
            >
              Book a project
            </Link>
            <Link
              href="/about"
              className="text-[length:var(--text-sm)] text-[var(--color-bone-dim)] transition-colors hover:text-[var(--accent)]"
            >
              About
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--color-line-soft)] pt-7 text-[length:var(--text-xs)] text-[var(--color-faint)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span className="font-mono tracking-wider">
            {site.location} · {site.timezone}
          </span>
        </div>
      </div>
    </footer>
  );
}
