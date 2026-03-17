import Link from "next/link";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { JarArtwork } from "@/components/jar-artwork";
import { formatMoney } from "@/lib/data/site";
import type { Locale } from "@/lib/i18n";
import type { Product } from "@/lib/shopify/types";

export function ProductCard({
  product,
  locale
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <article className="overflow-hidden rounded-[36px] border border-[var(--brand-olive)]/10 bg-white/80 shadow-[0_18px_40px_rgba(45,53,33,0.08)]">
      <JarArtwork accent={product.accent} badge={product.badge} />
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">{product.size}</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[var(--brand-olive)]">
              {product.title}
            </h3>
          </div>
          <p className="text-sm font-semibold text-[var(--brand-olive)]">
            {formatMoney(product.price.amount, product.price.currencyCode, locale)}
          </p>
        </div>
        <p className="text-sm leading-7 text-[var(--brand-copy-muted)]">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          {product.flavorNotes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-[var(--brand-olive)]/10 bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-sage)]"
            >
              {note}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <AddToCartButton
            id={product.id}
            handle={product.handle}
            title={product.title}
            priceAmount={product.price.amount}
            currencyCode={product.price.currencyCode}
            variantId={product.variantId}
            size={product.size}
          />
          <Link
            href={`/${locale}/products/${product.handle}`}
            className="inline-flex items-center rounded-full border border-[var(--brand-olive)]/15 px-5 py-3 text-sm font-semibold text-[var(--brand-olive)]"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
