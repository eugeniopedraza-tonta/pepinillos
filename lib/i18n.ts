export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

export function languageName(locale: Locale) {
  return locale === "es" ? "Español" : "English";
}

export function storefrontLanguage(locale: Locale) {
  return locale === "es" ? "ES" : "EN";
}
