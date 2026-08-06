import type { Locale } from "@/i18n/config";

export type LocalizedField = string | Partial<Record<Locale, string>>;

export interface DateRange {
  start: string;
  end?: string;
}

export type EventDate = string | DateRange;

export interface LocalizedEvent {
  dateISO: string;
  title: string;
  description: string | null;
  location: string | null;
  source: string | null;
}

export interface LocalizedEvents {
  upcoming: LocalizedEvent[];
  past: LocalizedEvent[];
  pastGrouped: Array<{ year: number; items: LocalizedEvent[] }>;
}
