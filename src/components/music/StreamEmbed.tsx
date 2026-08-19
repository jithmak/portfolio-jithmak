"use client";

import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import type { Release } from "@/content/music";
import { cn } from "@/lib/utils";

/**
 * Spotify / Apple Music player.
 *
 * The iframe is only mounted after the visitor asks for it. Streaming embeds
 * are heavy third-party frames — loading six of them on page load would cost
 * more than the rest of the site combined, and they set cookies before anyone
 * has pressed play. This keeps the page fast and the default private.
 */
export function StreamEmbed({
  release,
  className,
}: {
  release: Release;
  className?: string;
}) {
  const [active, setActive] = useState<"spotify" | "apple" | null>(null);

  const hasSpotify = Boolean(release.spotifyId);
  const hasApple = Boolean(release.appleUrl);

  if (!hasSpotify && !hasApple) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-dashed border-[var(--color-line)] px-5 py-4 text-[length:var(--text-xs)] text-[var(--color-faint)]",
          className,
        )}
      >
        <Play size={14} className="shrink-0 opacity-50" />
        <span>
          Streaming link coming soon — add a{" "}
          <code className="font-mono text-[var(--accent)]">spotifyId</code> in{" "}
          <code className="font-mono">src/content/music.ts</code> to embed the player.
        </span>
      </div>
    );
  }

  if (active === "spotify" && release.spotifyId) {
    return (
      <iframe
        title={`${release.title} on Spotify`}
        src={`https://open.spotify.com/embed/${release.spotifyKind}/${release.spotifyId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className={cn("w-full rounded-xl", className)}
      />
    );
  }

  if (active === "apple" && release.appleUrl) {
    return (
      <iframe
        title={`${release.title} on Apple Music`}
        src={release.appleUrl.replace("music.apple.com", "embed.music.apple.com")}
        height="175"
        frameBorder="0"
        loading="lazy"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        allow="autoplay *; encrypted-media *; clipboard-write"
        className={cn("w-full rounded-xl bg-transparent", className)}
      />
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {hasSpotify && (
        <button
          onClick={() => setActive("spotify")}
          className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-[length:var(--text-xs)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--accent)] text-[var(--color-ink)] transition-transform duration-300 group-hover:scale-110">
            <Play size={10} fill="currentColor" />
          </span>
          Play on Spotify
        </button>
      )}
      {hasApple && (
        <button
          onClick={() => setActive("apple")}
          className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-[length:var(--text-xs)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--accent)] text-[var(--color-ink)] transition-transform duration-300 group-hover:scale-110">
            <Play size={10} fill="currentColor" />
          </span>
          Apple Music
        </button>
      )}
      {release.youtubeId && (
        <a
          href={`https://www.youtube.com/watch?v=${release.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-[length:var(--text-xs)] text-[var(--color-bone-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          YouTube
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}
