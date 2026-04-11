import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { AnimateIn } from "@/components/animate-in";
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

        <AnimateIn>
        <section className="rounded-[40px] border border-[#21402d]/10 bg-[var(--surface)] p-8 sm:p-10">
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

          {product.nutritionFacts && (
            <div className="mt-8 rounded-2xl border border-[#21402d]/10 bg-[#f8f3e6] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#21402d]">
                Información Nutrimental
              </p>
              <p className="mt-1 text-xs text-[#516154]">
                Porción: {product.nutritionFacts.servingSize} · Contenido neto: 473 ml
              </p>

              <div className="mt-3 border-t border-[#21402d]/10 pt-3 text-xs">
                <div className="flex justify-between font-semibold text-[#21402d]">
                  <span>Energía por envase</span>
                  <span>{product.nutritionFacts.energyKcalPerPackage} kcal</span>
                </div>
                <div className="mt-1 flex justify-between font-semibold text-[#21402d]">
                  <span>Energía por {product.nutritionFacts.servingSize}</span>
                  <span>{product.nutritionFacts.energyKcalPerServing} kcal</span>
                </div>
              </div>

              <div className="mt-2 border-t border-[#21402d]/20 pt-2 space-y-1 text-xs text-[#516154]">
                <div className="flex justify-between">
                  <span>Proteínas</span>
                  <span>{product.nutritionFacts.protein} g</span>
                </div>
                <div className="flex justify-between">
                  <span>Grasas Totales</span>
                  <span>{product.nutritionFacts.totalFat} g</span>
                </div>
                <div className="flex justify-between pl-3">
                  <span>Grasa Saturada</span>
                  <span>{product.nutritionFacts.saturatedFat} g</span>
                </div>
                <div className="flex justify-between pl-3 font-semibold text-[#21402d]">
                  <span>Grasa Trans</span>
                  <span>{product.nutritionFacts.transFat} mg</span>
                </div>
                <div className="flex justify-between">
                  <span>Hidratos de Carbono Disponibles</span>
                  <span>{product.nutritionFacts.carbohydrates} g</span>
                </div>
                <div className="flex justify-between pl-3">
                  <span>Azúcares</span>
                  <span>{product.nutritionFacts.sugars} g</span>
                </div>
                <div className="flex justify-between pl-3 font-semibold text-[#21402d]">
                  <span>Azúcares Añadidos</span>
                  <span>{product.nutritionFacts.addedSugars} g</span>
                </div>
                <div className="flex justify-between">
                  <span>Fibra Dietética</span>
                  <span>{product.nutritionFacts.fiber} g</span>
                </div>
                <div className="flex justify-between font-semibold text-[#21402d]">
                  <span>Sodio</span>
                  <span>{product.nutritionFacts.sodium} mg</span>
                </div>
              </div>
            </div>
          )}

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
              Checkout seguro en Shopify cuando se conecten las credenciales; mientras tanto, el flujo de carrito cae a WhatsApp.
            </p>
          </div>
        </section>
        </AnimateIn>
      </div>
    </div>
  );
}
