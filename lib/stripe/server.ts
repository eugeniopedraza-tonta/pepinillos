import Stripe from "stripe";

import { getProductById } from "@/lib/catalog";
import { toMinorUnitAmount } from "@/lib/checkout";
import { defaultLocale } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { getStripeSecretKey, getStripeWebhookSecret } from "@/lib/server-env";

type ProductStripeMappingRecord = {
  productKey: string;
  stripeProductId: string;
  stripePriceId: string;
  currency: string;
  unitAmount: number;
};

type ProductStripeMappingStore = {
  findUnique(args: {
    where: { productKey: string };
  }): Promise<ProductStripeMappingRecord | null>;
  create(args: { data: ProductStripeMappingRecord }): Promise<ProductStripeMappingRecord>;
};

type StripeProductCreator = {
  products: {
    create(input: {
      name: string;
      default_price_data: {
        currency: string;
        unit_amount: number;
      };
      metadata?: Record<string, string>;
    }): Promise<{
      id: string;
      default_price?: string | { id: string } | null;
    }>;
  };
};

let stripeClient: Stripe | undefined;

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(getStripeSecretKey());
  }

  return stripeClient;
}

export function getStripeWebhookSigningSecret() {
  return getStripeWebhookSecret();
}

export async function ensureProductStripeMappingWithDependencies({
  productKey,
  store,
  stripe
}: {
  productKey: string;
  store: ProductStripeMappingStore;
  stripe: StripeProductCreator;
}) {
  const existing = await store.findUnique({
    where: { productKey }
  });

  if (existing) {
    return existing;
  }

  const product = getProductById(productKey, defaultLocale);

  if (!product) {
    throw new Error(`Cannot create Stripe mapping for unknown product: ${productKey}`);
  }

  const createdProduct = await stripe.products.create({
    name: product.title,
    default_price_data: {
      currency: product.price.currencyCode.toLowerCase(),
      unit_amount: toMinorUnitAmount(product.price.amount, product.price.currencyCode)
    },
    metadata: {
      productKey: product.id
    }
  });

  const stripePriceId =
    typeof createdProduct.default_price === "string"
      ? createdProduct.default_price
      : createdProduct.default_price?.id;

  if (!stripePriceId) {
    throw new Error(`Stripe did not return a default price for product ${productKey}.`);
  }

  return store.create({
    data: {
      productKey: product.id,
      stripeProductId: createdProduct.id,
      stripePriceId,
      currency: product.price.currencyCode,
      unitAmount: toMinorUnitAmount(product.price.amount, product.price.currencyCode)
    }
  });
}

export async function ensureProductStripeMapping(productKey: string) {
  return ensureProductStripeMappingWithDependencies({
    productKey,
    store: prisma.productStripeMapping,
    stripe: getStripe()
  });
}

export async function ensureStripeMappings(productKeys: string[]) {
  const mappings = await Promise.all(
    productKeys.map(async (productKey) => [
      productKey,
      await ensureProductStripeMapping(productKey)
    ] as const)
  );

  return new Map(mappings);
}
