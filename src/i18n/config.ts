export const locales = {
  en: {
    label: "English",
  },
  fr: {
    label: "Français",
  },
};

export type Locale = keyof typeof locales;

export const defaultLocale = "fr" satisfies Locale;

export const localeCodes = Object.keys(locales) as Locale[];
