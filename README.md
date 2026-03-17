# Herbet Storefront

Headless bilingual storefront for Herbet, built with Next.js App Router for Vercel and wired to Shopify as the commerce backend.

## Stack

- Next.js App Router
- Vercel-friendly deployment setup
- Shopify Storefront API with local fallback catalog
- Locale-prefixed routing for Spanish and English
- Client-side cart with Shopify checkout fallback to WhatsApp

## Environment

Copy `.env.example` to `.env.local` and fill in the Shopify and marketing values:

```bash
cp .env.example .env.local
```

Key variables:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`

If Shopify credentials are missing, the storefront still runs using the fallback product catalog in `lib/data/site.ts`.

## Development

```bash
npm run dev
```

## Checks

```bash
npm run lint
npm run typecheck
npm run build:webpack
```

`npm run build` uses the default Next.js build path. In the current sandbox, `build:webpack` is the stable verification command.

## Routes

- `/{locale}`
- `/{locale}/shop`
- `/{locale}/products/[handle]`
- `/{locale}/about`
- `/{locale}/recipes`
- `/{locale}/faq`
- `/{locale}/contact`
- `/{locale}/shipping`
- `/{locale}/returns`
- `/{locale}/privacy`
- `/{locale}/terms`

## Notes

- `app/page.tsx` redirects to `/es`.
- `proxy.ts` enforces locale-prefixed navigation.
- `app/api/newsletter/route.ts` is a lightweight stub ready to connect to Shopify Email, Klaviyo, or another provider.
