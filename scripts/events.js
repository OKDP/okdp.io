const yaml = require('js-yaml');
const fs = require('fs');

/**
 * Get a localized field value with fallback support
 * @param {string|object} field - The field to localize (can be string or object with locale keys)
 * @param {string} locale - Target locale (e.g., 'en', 'fr')
 * @param {string} fallbackLocale - Fallback locale if target not found
 * @returns {string} Localized value
 */
function getLocalizedField(field, locale, fallbackLocale = 'en') {
  if (!field) return '';
  if (typeof field === 'string') return field; // Direct string fallback
  return field[locale] || field[fallbackLocale] || '';
}

/**
 * Get compact ISO date string for display
 * @param {string|object} dateInfo - Date or date range
 * @returns {string} Compact ISO representation
 */
function getISODate(dateInfo) {
  if (typeof dateInfo === 'string') {
    return dateInfo;
  }

  if (dateInfo && typeof dateInfo === 'object' && dateInfo.start) {
    if (!dateInfo.end) return dateInfo.start;

    // Same month: 2026-06-11 → 12
    if (dateInfo.start.slice(0, 7) === dateInfo.end.slice(0, 7)) {
      return `${dateInfo.start} → ${dateInfo.end.slice(8)}`;
    }

    // Different month/year: 2026-06-11 → 2026-06-12
    return `${dateInfo.start} → ${dateInfo.end}`;
  }

  return '';
}

/**
 * Check if an event is in the past
 * @param {object} event - Event object
 * @returns {boolean} True if event has passed
 */
function isPastEvent(event) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let compareDate;
  if (typeof event.date === 'string') {
    compareDate = new Date(event.date);
  } else if (event.date && event.date.end) {
    compareDate = new Date(event.date.end);
  } else if (event.date && event.date.start) {
    compareDate = new Date(event.date.start);
  } else {
    return false;
  }

  return compareDate < today;
}

/**
 * Get sort date for an event
 * @param {object} event - Event object
 * @returns {Date} Date to use for sorting
 */
function getEventSortDate(event) {
  if (typeof event.date === 'string') {
    return new Date(event.date);
  }
  if (event.date && event.date.start) {
    return new Date(event.date.start);
  }
  return new Date(0);
}

/**
 * Localize events array for a specific language and separate into upcoming/past
 * @param {Array} events - Array of event objects
 * @param {string} locale - Target locale
 * @returns {Object} Object with upcoming, past, and pastGrouped arrays
 */
function localizeEvents(events, locale) {
  if (!events || !Array.isArray(events)) {
    return { upcoming: [], past: [], pastGrouped: [] };
  }

  const localized = events.map(event => ({
    id: event.id,
    date: event.date,
    dateISO: getISODate(event.date),
    source: event.source || null,
    title: getLocalizedField(event.title, locale),
    description: getLocalizedField(event.description, locale) || null,
    location: getLocalizedField(event.location, locale) || null,
    isPast: isPastEvent(event),
    year: getEventSortDate(event).getFullYear(),
  }));

  // Separate and sort
  const upcoming = localized
    .filter(e => !e.isPast)
    .sort((a, b) => getEventSortDate(a) - getEventSortDate(b));

  const past = localized
    .filter(e => e.isPast)
    .sort((a, b) => getEventSortDate(b) - getEventSortDate(a));

  // Group past events by year
  const pastByYear = new Map();
  for (const event of past) {
    const year = event.year;
    if (!pastByYear.has(year)) {
      pastByYear.set(year, []);
    }
    pastByYear.get(year).push(event);
  }

  const pastGrouped = Array.from(pastByYear.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }));

  return { upcoming, past, pastGrouped };
}

/**
 * Validate events data structure
 * @param {Array} events - Array of event objects
 * @param {Array} supportedLocales - Array of supported locale codes
 */
function validateEvents(events, supportedLocales = ['en', 'fr']) {
  if (!events || !Array.isArray(events)) {
    console.warn('⚠️  No events array found');
    return;
  }

  const errors = [];
  const warnings = [];

  events.forEach((event, index) => {
    // Required fields
    if (!event.title) {
      errors.push(`Event ${event.id || index} missing required field: title`);
    }
    if (!event.date) {
      errors.push(`Event ${event.id || index} missing required field: date`);
    }

    // Date validation
    if (event.date && typeof event.date === 'object') {
      if (!event.date.start) {
        errors.push(`Event ${event.id || index} has date range but missing 'start'`);
      }
      if (!event.date.end) {
        errors.push(`Event ${event.id || index} has date range but missing 'end'`);
      }

      if (event.date.start && event.date.end) {
        const start = new Date(event.date.start);
        const end = new Date(event.date.end);
        if (start > end) {
          errors.push(`Event ${event.id || index} has end date before start date`);
        }
      }
    }

    // Translation validation
    ['title', 'description', 'location'].forEach(field => {
      if (event[field] && typeof event[field] === 'object') {
        supportedLocales.forEach(locale => {
          if (!event[field][locale]) {
            warnings.push(`Event ${event.id || index} missing ${locale} translation for: ${field}`);
          }
        });
      }
    });
  });

  if (warnings.length > 0) {
    console.warn('⚠️  Event warnings:');
    warnings.forEach(w => console.warn(`   ${w}`));
  }

  if (errors.length > 0) {
    console.error('❌ Event validation failed:');
    errors.forEach(e => console.error(`   ${e}`));
    throw new Error('Event validation failed');
  }

  console.log(`✅ Validated ${events.length} event(s)`);
}

/**
 * Load and parse events from YAML file
 * @param {string} eventsPath - Path to events YAML file
 * @returns {Array} Array of event objects
 */
function loadEvents(eventsPath) {
  try {
    if (!fs.existsSync(eventsPath)) {
      console.warn(`⚠️  Events file not found at ${eventsPath}`);
      return [];
    }

    const fileContent = fs.readFileSync(eventsPath, 'utf8');
    const data = yaml.load(fileContent);

    if (!data || !data.events) {
      console.warn('⚠️  No events found in YAML file');
      return [];
    }

    validateEvents(data.events);

    return data.events;
  } catch (error) {
    console.error(`❌ Error loading events: ${error.message}`);
    return [];
  }
}

module.exports = {
  loadEvents,
  localizeEvents,
};
