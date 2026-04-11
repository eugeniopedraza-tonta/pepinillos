import { AnimateIn } from "@/components/animate-in";
import { FeaturedProductCard } from "@/components/featured-product-card";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/catalog";
import { siteCopy } from "@/lib/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function ShopPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";
  const products = await getProducts(safeLocale);
  const copy = siteCopy[safeLocale];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <AnimateIn>
        <section className="rounded-[40px] border border-[#21402d]/10 bg-[var(--surface)] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#7a4e25]">
            Catálogo
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-bold text-[#21402d]">
            {copy.featuredTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#516154]">
            Catálogo compacto pensado para un lanzamiento claro: frascos individuales, bundles y productos fáciles de contar en redes.
          </p>
        </section>
      </AnimateIn>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) =>
          i === 0 ? (
            <FeaturedProductCard key={product.id} product={product} locale={safeLocale} />
          ) : (
            <ProductCard key={product.id} product={product} locale={safeLocale} index={i} />
          )
        )}
      </section>
    </div>
  );
}
