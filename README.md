# Herbert's Storefront

Headless bilingual storefront for Herbert's, built with Next.js App Router for Vercel and wired to Stripe Checkout plus a local catalog.

## Stack

- Next.js App Router
- Stripe Checkout for one-time payments
- Prisma with SQLite for Stripe mappings and order persistence
- Vercel-friendly deployment setup
- Local product catalog in `lib/data/site.ts`
- Locale-prefixed routing for Spanish and English
- Client-side cart with Stripe Checkout and WhatsApp fallback

## Environment

Copy `.env.example` to `.env.local` and fill in the Stripe and marketing values:

```bash
cp .env.example .env.local
```

Key variables:

- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`

Stripe keys come from the Stripe Dashboard. For local SQLite development, use a database URL like `file:./dev.db`.

## Development

```bash
pnpm dev
```

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build:webpack
```

`pnpm build` uses the default Next.js build path. In the current sandbox, `build:webpack` is the stable verification command.

## Database and webhooks

```bash
pnpm db:generate
pnpm db:migrate
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

Use `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, and `STRIPE_WEBHOOK_SECRET` from your Stripe Dashboard and Stripe CLI session.

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
- `app/api/newsletter/route.ts` is a lightweight stub ready to connect to Klaviyo or another provider.
