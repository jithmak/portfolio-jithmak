"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { videos, type VideoItem } from "@/content/music";
import { VIEWPORT, EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Video wall with a modal player.
 *
 * Thumbnails come from YouTube's static image CDN and the player iframe is
 * only created once a video is opened — so the page never ships four
 * autoplaying third-party frames.
 */
export function VideoGallery() {
  const [active, setActive] = useState<VideoItem | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: i * 0.07 }}
            className={cn(video.featured && "sm:col-span-2")}
          >
            <VideoCard video={video} onOpen={() => setActive(video)} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && <Lightbox video={active} onClose={close} />}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function VideoCard({
  video,
  onOpen,
}: {
  video: VideoItem;
  onOpen: () => void;
}) {
  const hasVideo = Boolean(video.youtubeId);
  const thumb = video.youtubeId
    ? `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`
    : null;

  const Wrapper = hasVideo ? "button" : "div";

  return (
    <Wrapper
      {...(hasVideo ? { onClick: onOpen, "aria-label": `Play ${video.title}` } : {})}
      className={cn(
        "group relative block w-full overflow-hidden rounded-xl border border-[var(--color-line-soft)] text-left",
        hasVideo && "cursor-pointer",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          video.featured ? "aspect-[16/8]" : "aspect-video",
        )}
      >
        {thumb ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumb}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
        ) : (
          /* No ID yet — a generated still that still looks intentional */
          <div
            className="h-full w-full transition-transform duration-[900ms] group-hover:scale-[1.04]"
            style={{
              background: `linear-gradient(135deg, ${video.hues[0]}33, ${video.hues[1]})`,
            }}
          >
            <div className="bg-grid-fine h-full w-full opacity-40" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent opacity-90" />

        {/* Play affordance */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            className={cn(
              "relative grid h-16 w-16 place-items-center rounded-full backdrop-blur-md transition-all duration-500",
              hasVideo
                ? "border border-white/25 bg-black/35 group-hover:scale-110 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]"
                : "border border-white/12 bg-black/30",
            )}
          >
            {hasVideo && (
              <span className="animate-pulse-ring absolute inset-0 rounded-full border border-[var(--accent)]" />
            )}
            <Play
              size={19}
              fill="currentColor"
              className={cn(
                "translate-x-[1px] transition-colors duration-500",
                hasVideo
                  ? "text-white group-hover:text-[var(--color-ink)]"
                  : "text-white/40",
              )}
            />
          </div>
        </div>

        {video.runtime && (
          <span className="tabular absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[length:var(--text-micro)] text-white/85 backdrop-blur-sm">
            {video.runtime}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-4 p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="eyebrow eyebrow-accent">{video.kind}</span>
            <span className="tabular text-[length:var(--text-micro)] text-[var(--color-faint)]">
              {video.year}
            </span>
          </div>
          <h3 className="display mt-2 truncate text-[length:var(--text-xl)] transition-colors group-hover:text-[var(--accent)]">
            {video.title}
          </h3>
        </div>
      </div>

      {!hasVideo && (
        <p className="px-5 pb-4 text-[length:var(--text-micro)] text-[var(--color-faint)]">
          Add a <code className="font-mono text-[var(--accent)]">youtubeId</code> in
          src/content/music.ts to make this playable.
        </p>
      )}
    </Wrapper>
  );
}

/* -------------------------------------------------------------------------- */

function Lightbox({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/92 p-4 backdrop-blur-lg sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <motion.div
        className="w-full max-w-5xl"
        initial={{ scale: 0.95, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 8 }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-6">
          <div>
            <span className="eyebrow eyebrow-accent">{video.kind}</span>
            <h3 className="display mt-1.5 text-[length:var(--text-2xl)]">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            autoFocus
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="Close video"
          >
            <X size={18} />
          </button>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
