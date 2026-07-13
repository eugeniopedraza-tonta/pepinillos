export const locales = ["es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : defaultLocale;
}

export function languageName(locale: Locale) {
  return locale === "es" ? "Español" : locale;
}

export function storefrontLanguage(locale: Locale) {
  return locale === "es" ? "ES" : locale;
}
