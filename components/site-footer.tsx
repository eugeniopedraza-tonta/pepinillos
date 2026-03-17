import Link from "next/link";

import { NewsletterForm } from "@/components/newsletter-form";
import { env } from "@/lib/env";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-24 border-t border-[var(--brand-olive)]/10 bg-[var(--brand-olive)] text-[var(--brand-cream)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--brand-brass)]">
            Built for storytelling and checkout
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight">
            Herbet should feel deliberate, herb-forward, and premium before it ever asks for a sale.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#d8d1c4]">
            Shopify handles products and checkout. Next.js and Vercel handle the brand experience.
            WhatsApp keeps the conversation human.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <a href={env.instagramUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2">
              Instagram
            </a>
            <a href={env.facebookUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2">
              Facebook
            </a>
            <a href={`https://wa.me/${env.whatsappNumber}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-[36px] bg-[var(--brand-cream)] p-6 text-[var(--brand-olive)]">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">Shopify Email ready</p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl">
            Keep the launch audience warm
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-copy-muted)]">
            Capture interest for launches, recipe drops, and new bundles.
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-5 text-xs uppercase tracking-[0.18em] text-[#d5d0c4]">
        <div className="flex flex-wrap gap-4">
          <Link href={`/${locale}/shipping`}>Shipping</Link>
          <Link href={`/${locale}/returns`}>Returns</Link>
          <Link href={`/${locale}/privacy`}>Privacy</Link>
          <Link href={`/${locale}/terms`}>Terms</Link>
        </div>
        <p>Herbet · Mexico-first launch</p>
      </div>
    </footer>
  );
}
