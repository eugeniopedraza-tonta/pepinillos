import { fallbackProducts } from "@/lib/data/site";
import { storefrontLanguage, type Locale } from "@/lib/i18n";
import { shopifyFetch } from "@/lib/shopify/client";
import { PRODUCT_QUERY, PRODUCTS_QUERY } from "@/lib/shopify/queries";
import type { Product } from "@/lib/shopify/types";

type ProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  featuredImage?: {
    url?: string;
    altText?: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    nodes: Array<{ id: string }>;
  };
};

type ProductsResponse = {
  products: {
    nodes: ProductNode[];
  };
};

type ProductResponse = {
  product: ProductNode | null;
};

const accents = [
  "from-[#6f8a2a] to-[#d6b86c]",
  "from-[#8b3a2a] to-[#d8a45f]",
  "from-[#315951] to-[#e4cc8c]",
  "from-[#455f29] to-[#f0dca2]"
];

function mapNode(node: ProductNode, index: number): Product {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    tags: node.tags,
    image: node.featuredImage
      ? { url: node.featuredImage.url, altText: node.featuredImage.altText }
      : undefined,
    price: node.priceRange.minVariantPrice,
    variantId: node.variants.nodes[0]?.id,
    accent: accents[index % accents.length],
    badge: node.tags[0] || "Seasonal",
    size: node.tags.find((tag) => /\bg\b/i.test(tag)) || "Jar",
    flavorNotes: node.tags.slice(0, 3)
  };
}

export async function getProducts(locale: Locale): Promise<Product[]> {
  try {
    const data = await shopifyFetch<ProductsResponse>({
      query: PRODUCTS_QUERY,
      variables: {
        country: "MX",
        language: storefrontLanguage(locale)
      }
    });

    if (!data?.products.nodes.length) {
      return fallbackProducts[locale];
    }

    return data.products.nodes.map(mapNode);
  } catch {
    return fallbackProducts[locale];
  }
}

export async function getProduct(handle: string, locale: Locale): Promise<Product | null> {
  try {
    const data = await shopifyFetch<ProductResponse>({
      query: PRODUCT_QUERY,
      variables: {
        handle,
        country: "MX",
        language: storefrontLanguage(locale)
      }
    });

    if (!data?.product) {
      return fallbackProducts[locale].find((product) => product.handle === handle) || null;
    }

    return mapNode(data.product, 0);
  } catch {
    return fallbackProducts[locale].find((product) => product.handle === handle) || null;
  }
}
