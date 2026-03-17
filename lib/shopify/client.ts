import { env, hasShopifyConfig } from "@/lib/env";

type ShopifyFetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
};

export async function shopifyFetch<T>({
  query,
  variables
}: ShopifyFetchOptions): Promise<T | null> {
  if (!hasShopifyConfig()) {
    return null;
  }

  const response = await fetch(`https://${env.shopifyStoreDomain}/api/2025-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": env.shopifyStorefrontToken
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed with ${response.status}`);
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(", "));
  }

  return payload.data ?? null;
}
