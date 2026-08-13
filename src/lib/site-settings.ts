export const ANNOUNCEMENT_KEY = "announcement";

export const DEFAULT_ANNOUNCEMENT = "Authentic. Curated. Timeless.";

export const ANNOUNCEMENT_MAX_LENGTH = 160;

export function clampAnnouncement(value: string) {
  return value.trim().slice(0, ANNOUNCEMENT_MAX_LENGTH);
}
