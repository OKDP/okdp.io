import en from "./en.json";
import fr from "./fr.json";
import type { Locale } from "./config";

export type HomeTranslations = typeof en;

export const translations = {
  en,
  fr,
} satisfies Record<Locale, HomeTranslations>;

export function getTranslations(locale: Locale): HomeTranslations {
  return translations[locale];
}
