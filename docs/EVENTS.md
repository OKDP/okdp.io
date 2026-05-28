# Events System

## Overview

Events are automatically parsed from `src/events.yaml`, localized (EN/FR), and rendered in templates via the `{{> events }}` partial.

## Event Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `date` | String or Object | ✅ | Single: `"YYYY-MM-DD"`<br>Range: `{ start: "...", end: "..." }` |
| `title` | String or i18n | ✅ | Event name |
| `description` | String or i18n | | Additional details |
| `location` | String or i18n | | Event location |
| `url` | String | | Event website link |
| `source` | String | | Presentation/slides PDF path |

### i18n Format

```yaml
# Localized (recommended)
title:
  en: "English Title"
  fr: "Titre Français"

# OR simple fallback (same for all locales)
location: "Paris, France"
```

**Fallback:** Missing locale defaults to English.

## Examples

```yaml
# Single date
- date: "2026-04-22"
  title:
    en: OKDP at Devoxx Paris
    fr: OKDP à Devoxx Paris
  location: Palais des Congrès, Paris

# Date range
- date:
    start: "2025-12-10"
    end: "2025-12-11"
  title: OSXP (Open Source eXPérience)

# With link
- date: "2026-02-03"
  title: Cloud Native Days
  source: /presentations/slides.pdf
```

## Date Formatting

Dates are auto-formatted per locale:

| Input | EN | FR |
|-------|----|----|
| `"2026-02-03"` | February 3, 2026 | 3 février 2026 |
| `{ start: "2025-12-10", end: "2025-12-11" }` | December 10 → 11, 2025 | 10 → 11 décembre 2025 |

## Important Notes

**Always quote dates** in YAML:

```yaml
date: "2026-02-03"  # Correct
date: 2026-02-03    # Wrong
```
