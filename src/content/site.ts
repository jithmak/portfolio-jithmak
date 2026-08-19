/* ============================================================================
   SITE — shared identity, contact and navigation.
   ✏️  EDIT ME. Everything marked TODO is placeholder copy.
   ========================================================================= */

export const site = {
  /** TODO: your full name as you want it printed. */
  name: "Jithma Kalhara",
  /** Short wordmark used in the nav and the landing gate. */
  wordmark: "JITHMA",
  /** Appears in <title> and OG tags. */
  tagline: "Musician & Data Analyst",
  /** TODO: swap for your own one-liner. Used in meta description + gate. */
  intro:
    "Two disciplines, one instinct for pattern. I produce records and I read data — both are the practice of finding the signal underneath the noise.",

  /** TODO: set this to your real deployed domain before launch. */
  url: "https://jithma.dev",

  /** TODO: real contact details. */
  email: "hello@jithma.dev",
  location: "Colombo, Sri Lanka",
  timezone: "GMT+5:30",

  /**
   * Booking / contact form endpoint.
   * The site is statically exported, so there is no server to post to.
   * Create a free form endpoint and paste the URL here:
   *   • Formspree   → https://formspree.io      (https://formspree.io/f/xxxxxxx)
   *   • Web3Forms   → https://web3forms.com     (https://api.web3forms.com/submit)
   *   • Getform     → https://getform.io
   * Leave as null and the form gracefully falls back to opening the user's
   * mail client with everything pre-filled — no data is ever lost.
   */
  formEndpoint: null as string | null,

  /** TODO: your real profiles. Remove any you do not use. */
  socials: [
    { label: "Instagram", handle: "@jithma", href: "https://instagram.com/" },
    { label: "YouTube", handle: "@jithma", href: "https://youtube.com/" },
    { label: "Spotify", handle: "Jithma", href: "https://open.spotify.com/" },
    { label: "LinkedIn", handle: "in/jithma", href: "https://linkedin.com/in/" },
    { label: "GitHub", handle: "@jithmak", href: "https://github.com/jithmak" },
  ],
} as const;

export type World = "music" | "data";

export const worlds = {
  music: {
    id: "music" as const,
    label: "Musician",
    href: "/music",
    role: "Producer · Composer · Mix Engineer",
    line: "Records, scores and sound design.",
    index: "01",
  },
  data: {
    id: "data" as const,
    label: "Data Analyst",
    href: "/data",
    role: "Analytics · Modelling · Visualisation",
    line: "Decisions built on evidence.",
    index: "02",
  },
} as const;

/** Nav shown inside each world. */
export const nav = {
  music: [
    { label: "Releases", href: "/music#releases" },
    { label: "Video", href: "/music#video" },
    { label: "Studio", href: "/music#studio" },
    { label: "Booking", href: "/booking" },
  ],
  data: [
    { label: "Work", href: "/data#work" },
    { label: "Impact", href: "/data#impact" },
    { label: "Stack", href: "/data#stack" },
    { label: "Contact", href: "/about#contact" },
  ],
} as const;
