import type { ReactNode } from "react";
import { Reveal, RevealText } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

/** The repeating section header used across both worlds. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
      style={centered ? undefined : undefined}
    >
      <Reveal className={cn("flex items-center gap-4", centered && "justify-center")}>
        {index && (
          <span className="eyebrow eyebrow-accent tabular">{index}</span>
        )}
        <span className="h-px w-8 bg-[var(--accent)] opacity-40" aria-hidden />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>

      <h2 className="display text-[length:var(--text-4xl)] max-w-[20ch]">
        <RevealText text={title} />
      </h2>

      {lede && (
        <Reveal delay={1}>
          <p
            className={cn(
              "text-[length:var(--text-lg)] leading-relaxed text-[var(--color-bone-dim)] max-w-[54ch]",
              centered && "mx-auto",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
