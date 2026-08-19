"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site, nav as navMap, worlds, type World } from "@/content/site";
import { cn } from "@/lib/utils";

export function Nav({ world }: { world: World }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = navMap[world];
  const other = world === "music" ? worlds.data : worlds.music;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-[var(--color-line-soft)] bg-[var(--color-ink)]/80 backdrop-blur-xl py-3"
            : "py-5 sm:py-7",
        )}
      >
        <div className="shell flex items-center justify-between gap-6">
          {/* Wordmark → back to the gate */}
          <Link
            href="/"
            className="group flex items-baseline gap-2.5"
            aria-label={`${site.wordmark} — back to home`}
          >
            <span className="display text-[length:var(--text-xl)] tracking-tight">
              {site.wordmark}
            </span>
            <span className="eyebrow hidden text-[var(--accent)] sm:inline">
              {worlds[world].label}
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-9 md:flex" aria-label="Section">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-[length:var(--text-sm)] text-[var(--color-bone-dim)] transition-colors hover:text-[var(--color-bone)]"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Cross-world switch */}
            <Link
              href={other.href}
              className="group hidden items-center gap-2 rounded-full border border-[var(--color-line)] px-4 py-2 text-[length:var(--text-xs)] text-[var(--color-bone-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:inline-flex"
            >
              <span className="opacity-60">Switch to</span>
              <span className="font-medium">{other.label}</span>
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-bone)] transition-colors hover:border-[var(--accent)] md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] bg-[var(--color-ink)] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full flex-col">
              <div className="shell flex items-center justify-between py-5">
                <span className="display text-[length:var(--text-xl)]">
                  {site.wordmark}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-line)]"
                  aria-label="Close menu"
                >
                  <X size={17} />
                </button>
              </div>

              <nav className="shell flex flex-1 flex-col justify-center gap-2">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display block border-b border-[var(--color-line-soft)] py-5 text-[length:var(--text-3xl)]"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="shell pb-10">
                <Link
                  href={other.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-full border border-[var(--color-line)] px-6 py-4"
                >
                  <span className="text-[length:var(--text-sm)]">
                    <span className="opacity-60">Switch to </span>
                    {other.label}
                  </span>
                  <ArrowUpRight size={16} className="text-[var(--accent)]" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
