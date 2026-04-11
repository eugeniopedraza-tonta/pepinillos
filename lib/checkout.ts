import { getProductById } from "@/lib/catalog";
import type { Product } from "@/lib/catalog/types";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

export type CheckoutRequestItem = {
  productId: string;
  quantity: number;
};

export type PreparedCheckoutItem = {
  product: Product;
  quantity: number;
  unitAmount: number;
  subtotalAmount: number;
};

export type PreparedCheckoutCart = {
  items: PreparedCheckoutItem[];
  currency: string;
  locale: Locale;
  subtotalAmount: number;
};

const ZERO_DECIMAL_CURRENCIES = new Set([
  "BIF",
  "CLP",
  "DJF",
  "GNF",
  "JPY",
  "KMF",
  "KRW",
  "MGA",
  "PYG",
  "RWF",
  "UGX",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF"
]);

export class CheckoutValidationError extends Error {
  status = 400;
}

export function getCheckoutLocale(input: unknown): Locale {
  return typeof input === "string" && isLocale(input) ? input : defaultLocale;
}

export function toMinorUnitAmount(amount: string, currencyCode: string) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    throw new CheckoutValidationError(`Invalid amount: ${amount}`);
  }

  const factor = ZERO_DECIMAL_CURRENCIES.has(currencyCode.toUpperCase()) ? 1 : 100;

  return Math.round(numericAmount * factor);
}

export function fromMinorUnitAmount(amount: number, currencyCode: string) {
  const factor = ZERO_DECIMAL_CURRENCIES.has(currencyCode.toUpperCase()) ? 1 : 100;

  return (amount / factor).toFixed(factor === 1 ? 0 : 2);
}

export function prepareCheckoutCart(
  items: CheckoutRequestItem[],
  locale: Locale
): PreparedCheckoutCart {
  if (!Array.isArray(items) || items.length === 0) {
    throw new CheckoutValidationError("Cart is empty.");
  }

  const consolidated = new Map<string, number>();

  for (const item of items) {
    if (
      !item ||
      typeof item.productId !== "string" ||
      !item.productId.trim() ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      throw new CheckoutValidationError("Cart items must include a valid productId and quantity.");
    }

    consolidated.set(item.productId, (consolidated.get(item.productId) || 0) + item.quantity);
  }

  const preparedItems = Array.from(consolidated.entries()).map(([productId, quantity]) => {
    const product = getProductById(productId, locale);

    if (!product) {
      throw new CheckoutValidationError(`Unknown product: ${productId}`);
    }

    const unitAmount = toMinorUnitAmount(product.price.amount, product.price.currencyCode);

    return {
      product,
      quantity,
      unitAmount,
      subtotalAmount: unitAmount * quantity
    };
  });

  const currency = preparedItems[0]?.product.price.currencyCode;

  if (!currency) {
    throw new CheckoutValidationError("Cart currency is unavailable.");
  }

  for (const item of preparedItems) {
    if (item.product.price.currencyCode !== currency) {
      throw new CheckoutValidationError("All cart items must share the same currency.");
    }
  }

  return {
    items: preparedItems,
    currency,
    locale,
    subtotalAmount: preparedItems.reduce(
      (runningTotal, item) => runningTotal + item.subtotalAmount,
      0
    )
  };
}
