export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  shopifyStoreDomain:
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    "",
  publicShopifyStoreDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "",
  shopifyStorefrontToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  whatsappNumber: "8126264511",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/herbertsmx",
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/herbet",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || ""
};

export function hasShopifyConfig() {
  return Boolean(env.shopifyStoreDomain && env.shopifyStorefrontToken);
}
