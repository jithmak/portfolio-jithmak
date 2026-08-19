import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. The track is duplicated and translated -50%,
 * so the loop is seamless with no JS measuring.
 */
export function Marquee({
  items,
  duration = 40,
  className,
  separator = "✦",
  reverse = false,
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  separator?: string;
  reverse?: boolean;
}) {
  const track = [...items, ...items];
  return (
    <div className={cn("marquee-mask overflow-hidden", className)} aria-hidden>
      <div
        className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="text-[length:var(--text-lg)] text-[var(--color-faint)]">
              {item}
            </span>
            <span className="text-[var(--accent)] opacity-50 text-[length:var(--text-xs)]">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
