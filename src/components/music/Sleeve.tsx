import { cn } from "@/lib/utils";

/**
 * Album artwork. Uses the real cover when one is supplied, and otherwise
 * generates a sleeve from the release's two hues — so the grid never has a
 * hole in it while artwork is still being sourced.
 */
export function Sleeve({
  title,
  cover,
  hues,
  className,
  eager = false,
}: {
  title: string;
  cover: string | null;
  hues: [string, string];
  className?: string;
  eager?: boolean;
}) {
  if (cover) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={cover}
        alt={`${title} cover art`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("aspect-square w-full object-cover", className)}
      />
    );
  }

  const [a, b] = hues;
  const id = title.replace(/\W+/g, "-").toLowerCase();

  return (
    <div
      className={cn("relative aspect-square w-full overflow-hidden", className)}
      role="img"
      aria-label={`${title} — placeholder cover art`}
    >
      <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={a} />
            <stop offset="100%" stopColor={b} />
          </linearGradient>
          <radialGradient id={`r-${id}`} cx="30%" cy="22%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id={`n-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        <rect width="400" height="400" fill={`url(#g-${id})`} />
        <rect width="400" height="400" fill={`url(#r-${id})`} />

        {/* Concentric grooves — a sleeve that reads as a record */}
        {[...Array(9)].map((_, i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={40 + i * 19}
            fill="none"
            stroke="#000"
            strokeOpacity={0.07 + i * 0.008}
            strokeWidth="1"
          />
        ))}
        <circle cx="200" cy="200" r="15" fill="#08080b" fillOpacity="0.55" />
        <circle cx="200" cy="200" r="4" fill={a} fillOpacity="0.9" />

        <rect
          width="400"
          height="400"
          filter={`url(#n-${id})`}
          opacity="0.11"
          style={{ mixBlendMode: "overlay" }}
        />
      </svg>
    </div>
  );
}
