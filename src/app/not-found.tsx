import Link from "next/link";
import { site, worlds } from "@/content/site";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="display mt-5 text-[length:var(--text-5xl)] leading-none">
        Nothing here.
      </h1>
      <p className="mt-6 max-w-[42ch] text-[length:var(--text-base)] text-[var(--color-muted)]">
        That page does not exist — or it moved. Both halves of the site are still
        where you left them.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {Object.values(worlds).map((w) => (
          <Link
            key={w.id}
            href={w.href}
            data-world={w.id}
            className="rounded-full border border-[var(--color-line)] px-6 py-3 text-[length:var(--text-sm)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {w.label}
          </Link>
        ))}
        <Link
          href="/"
          className="rounded-full px-6 py-3 text-[length:var(--text-sm)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-bone)]"
        >
          Back to start
        </Link>
      </div>

      <span className="mt-16 text-[length:var(--text-xs)] text-[var(--color-faint)]">
        {site.name} — {site.tagline}
      </span>
    </div>
  );
}
