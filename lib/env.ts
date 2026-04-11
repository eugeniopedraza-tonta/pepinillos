export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8126264511",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/herbertsmx",
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/herbet",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || ""
};
