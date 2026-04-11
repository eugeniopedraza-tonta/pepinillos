import { catalogProducts } from "@/lib/data/site";
import { defaultLocale, type Locale } from "@/lib/i18n";

import type { Product } from "./types";

export function getProducts(locale: Locale): Product[] {
  return catalogProducts[locale];
}

export function getProduct(handle: string, locale: Locale): Product | null {
  return catalogProducts[locale].find((product) => product.handle === handle) || null;
}

export function getProductById(id: string, locale: Locale = defaultLocale): Product | null {
  return (
    catalogProducts[locale].find((product) => product.id === id) ||
    catalogProducts[defaultLocale].find((product) => product.id === id) ||
    null
  );
}
