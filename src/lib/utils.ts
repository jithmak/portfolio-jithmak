import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional classes, de-duplicating conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 1 -> "01". Used for the editorial index numbers throughout the site. */
export function pad(n: number, width = 2) {
  return String(n).padStart(width, "0");
}

/** Stagger helper so lists animate in with a consistent rhythm. */
export function stagger(index: number, step = 0.06, base = 0) {
  return base + index * step;
}

/** "2024-03-12" -> "Mar 2024" (locale-stable, safe for static export). */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export function formatMonthYear(iso: string) {
  const [y, m] = iso.split("-");
  const mi = Number(m) - 1;
  return `${MONTHS[mi] ?? ""} ${y}`.trim();
}

export function formatYear(iso: string) {
  return iso.slice(0, 4);
}
