/* ============================================================================
   MUSIC WORLD — releases, video, studio services, press.
   ✏️  EDIT ME.

   HOW TO GET THE IDs YOU NEED
   ---------------------------------------------------------------------------
   Spotify   Open the album/track/playlist → Share → Copy link.
             https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy
                                      ^type   ^^^^^^^^^^^^^^^^^^^^ spotifyId
   Apple     Open the album in music.apple.com → copy the whole URL into
             `appleUrl`. Leave null to hide the Apple button.
   YouTube   https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  youtubeId
   Artwork   Drop a square JPG in /public/covers/ and point `cover` at it,
             e.g. "/covers/nightdrive.jpg". Leave null for the generated
             gradient sleeve (which honestly looks pretty good).
   ========================================================================= */

export type SpotifyKind = "album" | "track" | "playlist" | "artist";

export interface Release {
  slug: string;
  title: string;
  /** "EP" | "Single" | "Album" | "Score" | "Remix" — free text. */
  kind: string;
  /** ISO date, used for sorting + display. */
  released: string;
  role: string;
  /** 1–2 sentences of liner notes. */
  note: string;
  spotifyId: string | null;
  spotifyKind: SpotifyKind;
  appleUrl: string | null;
  youtubeId: string | null;
  cover: string | null;
  /** Two hex colours for the generated sleeve when `cover` is null. */
  hues: [string, string];
  featured?: boolean;
}

/** TODO: replace all of these with your real catalogue. */
export const releases: Release[] = [
  {
    slug: "nightdrive",
    title: "Nightdrive",
    kind: "EP",
    released: "2025-04-18",
    role: "Written, produced & mixed",
    note: "Four tracks written between 2am and sunrise. Analogue synths, brushed drums and a lot of tape hiss left deliberately in the mix.",
    spotifyId: null, // e.g. "4aawyAB9vmqN3uQ7FjRGTy"
    spotifyKind: "album",
    appleUrl: null,
    youtubeId: null,
    cover: null,
    hues: ["#e9b949", "#7c2d3a"],
    featured: true,
  },
  {
    slug: "monsoon-letters",
    title: "Monsoon Letters",
    kind: "Single",
    released: "2024-11-02",
    role: "Producer · Arranger",
    note: "Sinhala vocal over a half-time break. Strings recorded in one room, one afternoon, one take.",
    spotifyId: null,
    spotifyKind: "track",
    appleUrl: null,
    youtubeId: null,
    cover: null,
    hues: ["#ff6b35", "#2b1a3d"],
  },
  {
    slug: "static-bloom",
    title: "Static Bloom",
    kind: "Album",
    released: "2024-06-21",
    role: "Composer · Mix Engineer",
    note: "A long-form record about signal degradation — every sound on it was resampled at least three times before it made the master.",
    spotifyId: null,
    spotifyKind: "album",
    appleUrl: null,
    youtubeId: null,
    cover: null,
    hues: ["#b8862b", "#0d0d11"],
  },
  {
    slug: "harbour-lights",
    title: "Harbour Lights",
    kind: "Score",
    released: "2023-09-14",
    role: "Original score",
    note: "Twenty-two cues for an independent short. Solo cello, prepared piano and field recordings from the Colombo port.",
    spotifyId: null,
    spotifyKind: "album",
    appleUrl: null,
    youtubeId: null,
    cover: null,
    hues: ["#4a6fa5", "#141018"],
  },
  {
    slug: "gold-teeth",
    title: "Gold Teeth",
    kind: "Remix",
    released: "2023-02-08",
    role: "Remix · Additional production",
    note: "Took the original down to just the vocal and rebuilt everything underneath it at 140bpm.",
    spotifyId: null,
    spotifyKind: "track",
    appleUrl: null,
    youtubeId: null,
    cover: null,
    hues: ["#e9b949", "#1a1a21"],
  },
  {
    slug: "room-tone",
    title: "Room Tone",
    kind: "Single",
    released: "2022-08-30",
    role: "Written & produced",
    note: "Built entirely from the noise floor of an empty studio at night. The first thing I released under my own name.",
    spotifyId: null,
    spotifyKind: "track",
    appleUrl: null,
    youtubeId: null,
    cover: null,
    hues: ["#6b7280", "#0a0a0d"],
  },
];

/**
 * Optional: your Spotify *artist* ID powers the big "follow" embed in the
 * Listen section. Find it in your artist page URL:
 *   https://open.spotify.com/artist/XXXXXXXXXXXXXXXXXXXXXX
 * TODO: paste yours, or leave null to hide that block.
 */
export const spotifyArtistId: string | null = null;

/** TODO: your Apple Music artist page. Leave null to hide. */
export const appleArtistUrl: string | null = null;

/* ---------------------------------------------------------------------------
   VIDEO
   ------------------------------------------------------------------------ */
export interface VideoItem {
  id: string;
  title: string;
  /** "Music Video" | "Live Session" | "Studio Diary" | "Visualiser" */
  kind: string;
  year: string;
  /** YouTube video ID. TODO: replace every one of these. */
  youtubeId: string | null;
  /** Optional runtime label, purely cosmetic. */
  runtime?: string;
  hues: [string, string];
  featured?: boolean;
}

export const videos: VideoItem[] = [
  {
    id: "nightdrive-mv",
    title: "Nightdrive",
    kind: "Music Video",
    year: "2025",
    youtubeId: null, // e.g. "dQw4w9WgXcQ"
    runtime: "3:48",
    hues: ["#e9b949", "#7c2d3a"],
    featured: true,
  },
  {
    id: "monsoon-live",
    title: "Monsoon Letters — Live at the Warehouse",
    kind: "Live Session",
    year: "2024",
    youtubeId: null,
    runtime: "5:12",
    hues: ["#ff6b35", "#241428"],
  },
  {
    id: "static-bloom-doc",
    title: "Making of Static Bloom",
    kind: "Studio Diary",
    year: "2024",
    youtubeId: null,
    runtime: "11:02",
    hues: ["#b8862b", "#101014"],
  },
  {
    id: "harbour-visual",
    title: "Harbour Lights — Visualiser",
    kind: "Visualiser",
    year: "2023",
    youtubeId: null,
    runtime: "2:31",
    hues: ["#4a6fa5", "#0d1218"],
  },
];

/* ---------------------------------------------------------------------------
   STUDIO — the artist statement + how you work
   ------------------------------------------------------------------------ */
export const statement = {
  /** TODO: rewrite in your own voice. This is the emotional centre of the page. */
  lead: "I make records that sound like the room they were made in.",
  body: [
    "I started producing because I wanted to hear what was in my head played back to me. Fifteen years later that has not really changed — the gear got better, the ears got sharper, but the job is still translation.",
    "Most of what I do is subtraction. A mix is finished when there is nothing left to remove without the song falling over. I work fast on ideas and slow on decisions, and I would rather send you one honest version than five safe ones.",
    "I work in Sinhala and English, in rooms and remotely, on records that need building from nothing and on records that just need someone to finally finish them.",
  ],
} as const;

export const studioProcess = [
  {
    step: "01",
    title: "Listen",
    body: "A call, your references, whatever demos exist — even a voice note. I need to hear what you are chasing before I touch anything.",
  },
  {
    step: "02",
    title: "Build",
    body: "Arrangement, sound design, session players where the song needs them. You get versions as they happen, not a silence followed by a reveal.",
  },
  {
    step: "03",
    title: "Finish",
    body: "Mix, revisions, and a master that holds up on phone speakers and in a car. Stems and session files are yours at the end.",
  },
] as const;

/* ---------------------------------------------------------------------------
   BOOKING — services and packages
   ------------------------------------------------------------------------ */
export interface BookingService {
  id: string;
  title: string;
  summary: string;
  /** Displayed as-is. TODO: set real numbers, or use "On request". */
  from: string;
  turnaround: string;
  includes: string[];
  featured?: boolean;
}

export const bookingServices: BookingService[] = [
  {
    id: "production",
    title: "Full Production",
    summary:
      "From demo or blank page to finished master. Arrangement, sound design, session musicians, mix and master.",
    from: "On request",
    turnaround: "3–6 weeks",
    includes: [
      "Pre-production call & reference session",
      "Full arrangement and sound design",
      "Session players where the song calls for them",
      "Mix, master and radio/streaming-ready deliverables",
      "Stems and session files on delivery",
    ],
    featured: true,
  },
  {
    id: "mixing",
    title: "Mixing & Mastering",
    summary:
      "You have the parts, I make them a record. Balance, depth, and a master that survives every playback system.",
    from: "On request",
    turnaround: "5–10 days",
    includes: [
      "Full mix from your stems",
      "Two rounds of revisions included",
      "Streaming-normalised and DR-preserved masters",
      "Instrumental, TV and a cappella versions",
    ],
  },
  {
    id: "score",
    title: "Score & Sound Design",
    summary:
      "Original music for film, documentary, games and brand work. Cue-by-cue, to picture, to deadline.",
    from: "On request",
    turnaround: "Project-based",
    includes: [
      "Spotting session and cue sheet",
      "Original themes and full cue set",
      "Sound design and foley where required",
      "Licensed, cleared and delivered to spec",
    ],
  },
  {
    id: "session",
    title: "Session & Topline",
    summary:
      "Remote session work — keys, guitar, programming, or a topline and vocal arrangement for a track that is nearly there.",
    from: "On request",
    turnaround: "48–72 hours",
    includes: [
      "Multiple takes and comped performance",
      "Dry and processed versions",
      "Full buyout, no hidden splits",
    ],
  },
];

/** Project types offered in the booking form's dropdown. */
export const projectTypes = [
  "Full production",
  "Mixing & mastering",
  "Film / documentary score",
  "Session playing or topline",
  "Live performance",
  "Something else",
] as const;

export const budgetBands = [
  "Under $500",
  "$500 – $2,000",
  "$2,000 – $5,000",
  "$5,000 +",
  "Not sure yet",
] as const;

/* ---------------------------------------------------------------------------
   PRESS / CREDITS — social proof strip
   ------------------------------------------------------------------------ */
/** TODO: replace with real quotes, or delete the array to hide the section. */
export const press = [
  {
    quote:
      "Jithma builds records with an unusual amount of restraint — every sound on the record is there because it had to be.",
    source: "Independent Music Review",
    year: "2025",
  },
  {
    quote:
      "The score does the thing good scores do: you stop noticing it, and then you cannot imagine the film without it.",
    source: "Short Film Festival Jury Note",
    year: "2023",
  },
] as const;

/** Logos/credits marquee. TODO: your real credits. */
export const credits = [
  "Nightdrive EP",
  "Monsoon Letters",
  "Static Bloom LP",
  "Harbour Lights OST",
  "Warehouse Sessions",
  "Colombo Fringe",
  "Gold Teeth (Remix)",
  "Room Tone",
] as const;
