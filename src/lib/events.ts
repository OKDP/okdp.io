import { getCollection } from "astro:content";
import type { Locale } from "@/i18n/config";
import type {
  EventDate,
  LocalizedEvent,
  LocalizedEvents,
  LocalizedField,
} from "@/types/events";

function getLocalizedField(
  field: LocalizedField | undefined,
  locale: Locale,
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[locale] || field.en || "";
}

function getISODate(date: EventDate): string {
  if (typeof date === "string") return date;
  if (!date.end) return date.start;
  if (date.start.slice(0, 7) === date.end.slice(0, 7)) {
    return `${date.start} → ${date.end.slice(8)}`;
  }
  return `${date.start} → ${date.end}`;
}

function getSortDate(date: EventDate): Date {
  return new Date(typeof date === "string" ? date : date.start);
}

function isPast(date: EventDate, now: Date): boolean {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const comparisonDate = new Date(
    typeof date === "string" ? date : date.end || date.start,
  );
  return comparisonDate < today;
}

export async function getLocalizedEvents(
  locale: Locale,
  now = new Date(),
): Promise<LocalizedEvents> {
  const entries = await getCollection("events");
  const localized = entries.map(({ data: event }) => ({
    date: event.date,
    dateISO: getISODate(event.date),
    title: getLocalizedField(event.title, locale),
    description: getLocalizedField(event.description, locale) || null,
    location: getLocalizedField(event.location, locale) || null,
    source: event.source || null,
    year: getSortDate(event.date).getFullYear(),
    isPast: isPast(event.date, now),
  }));

  const upcoming = localized
    .filter((event) => !event.isPast)
    .sort(
      (a, b) => getSortDate(a.date).getTime() - getSortDate(b.date).getTime(),
    );
  const past = localized
    .filter((event) => event.isPast)
    .sort(
      (a, b) => getSortDate(b.date).getTime() - getSortDate(a.date).getTime(),
    );

  const groups = new Map<number, LocalizedEvent[]>();
  for (const event of past) {
    const item = {
      dateISO: event.dateISO,
      title: event.title,
      description: event.description,
      location: event.location,
      source: event.source,
    };
    const group = groups.get(event.year) || [];
    group.push(item);
    groups.set(event.year, group);
  }

  return {
    upcoming: upcoming.map(
      ({ dateISO, title, description, location, source }) => ({
        dateISO,
        title,
        description,
        location,
        source,
      }),
    ),
    past: past.map(({ dateISO, title, description, location, source }) => ({
      dateISO,
      title,
      description,
      location,
      source,
    })),
    pastGrouped: Array.from(groups.entries())
      .sort(([a], [b]) => b - a)
      .map(([year, items]) => ({ year, items })),
  };
}
