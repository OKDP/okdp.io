# Managing Events

Events displayed on the homepage are stored in `src/data/events.yaml` and loaded as the Astro `events` content collection.

## Add or Update an Event

Edit `src/data/events.yaml`. Each event must have a unique `id`:

```yaml
- id: okdp-devoxx-paris-2026
  date: "2026-04-22"
  title:
    fr: "Présentation d'OKDP à Devoxx Paris"
    en: "OKDP presentation at Devoxx Paris"
  location: "Palais des Congrès, Paris"
  source: "/presentations/devoxx-paris-2026.pdf"
```

Use a date range for an event lasting more than one day:

```yaml
- id: osxp-2025
  date:
    start: "2025-12-10"
    end: "2025-12-11"
  title: "OSXP (Open Source eXPérience)"
```

Always quote date values in YAML so they remain strings.

## Available Fields

| Field         | Required | Description                                        |
| ------------- | -------- | -------------------------------------------------- |
| `id`          | Yes      | Unique identifier for the event.                   |
| `date`        | Yes      | A `YYYY-MM-DD` string or a `{ start, end }` range. |
| `title`       | Yes      | A string or a localized `fr`/`en` object.          |
| `description` | No       | Additional information, optionally localized.      |
| `location`    | No       | Event location, optionally localized.              |
| `source`      | No       | Link to the slides or another event resource.      |

A localized field falls back to English when the current locale is not available. A plain string is used for every locale.

## Developers

The collection schema in `src/content.config.ts` validates the YAML data during the Astro build. The event processing in `src/lib/events.ts` then:

- Selects the text for the current locale;
- Formats event dates and date ranges;
- Separates upcoming and past events;
- Sorts events chronologically;
- Groups past events by year.

The components in `src/components/home/` render the result. Normal event updates only require editing `src/data/events.yaml`; the TypeScript files usually do not need to be changed.

Shared event types are defined in `src/types/events.ts`.
