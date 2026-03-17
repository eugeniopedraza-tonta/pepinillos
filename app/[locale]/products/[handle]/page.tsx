import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { JarArtwork } from "@/components/jar-artwork";
import { formatMoney } from "@/lib/data/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { getProduct } from "@/lib/shopify";

export default async function ProductPage({
  params
}: {
  params: Promise<{ locale: string; handle: string }>;
}) {
  const { locale, handle } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";
  const product = await getProduct(handle, safeLocale);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <JarArtwork accent={product.accent} badge={product.badge} />

        <section className="rounded-[40px] border border-[#21402d]/10 bg-white/80 p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#7a4e25]">{product.size}</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-tight text-[#21402d]">
            {product.title}
          </h1>
          <p className="mt-4 text-lg font-semibold text-[#21402d]">
            {formatMoney(product.price.amount, product.price.currencyCode, safeLocale)}
          </p>
          <p className="mt-6 text-sm leading-8 text-[#516154]">{product.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {product.flavorNotes.map((note) => (
              <span
                key={note}
                className="rounded-full border border-[#21402d]/10 bg-[#f8f3e6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#46604d]"
              >
                {note}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <AddToCartButton
              id={product.id}
              handle={product.handle}
              title={product.title}
              priceAmount={product.price.amount}
              currencyCode={product.price.currencyCode}
              variantId={product.variantId}
              size={product.size}
            />
            <p className="text-sm leading-7 text-[#516154]">
              {safeLocale === "es"
                ? "Checkout seguro en Shopify cuando se conecten las credenciales; mientras tanto, el flujo de carrito cae a WhatsApp."
                : "Secure Shopify checkout is ready once credentials are connected; until then, the cart falls back to WhatsApp."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
