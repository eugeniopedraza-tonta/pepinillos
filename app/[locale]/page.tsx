import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProductCard } from "@/components/featured-product-card";
import { ProductCard } from "@/components/product-card";
import { AboutBento } from "@/components/about-bento";
import { ContactForm } from "@/components/contact-form";
import { getProducts } from "@/lib/catalog";
import { buildWhatsAppUrl, recipes, siteCopy } from "@/lib/data/site";
import { env } from "@/lib/env";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";
  const copy = siteCopy[safeLocale];
  const products = await getProducts(safeLocale);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Hero */}
      <HeroSection locale={safeLocale} />

      {/* Featured products */}
      <AnimateIn id="productos" className="mt-20 scroll-mt-52">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">
              {safeLocale === "es" ? "Productos destacados" : "Featured products"}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--brand-olive)]">
              {copy.featuredTitle}
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) =>
            i === 0 ? (
              <FeaturedProductCard key={product.id} product={product} locale={safeLocale} />
            ) : (
              <ProductCard key={product.id} product={product} locale={safeLocale} index={i} />
            )
          )}
        </div>
      </AnimateIn>

      {/* Recetas */}
      <AnimateIn className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">
              {safeLocale === "es" ? "Inspiración en la mesa" : "Serving ideas"}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--brand-olive)]">
              {safeLocale === "es" ? "Recetas" : "Recipes"}
            </h2>
          </div>
          <Link
            href={`/${safeLocale}/recipes`}
            className="text-sm font-semibold text-[var(--brand-olive)] hover:text-[var(--brand-earth)] transition-colors"
          >
            {safeLocale === "es" ? "Ver todas las recetas →" : "View all recipes →"}
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recipes[safeLocale].map((recipe) => (
            <article
              key={recipe.slug}
              className="group flex flex-col rounded-[36px] border border-[var(--brand-olive)]/7 bg-[var(--surface)] p-7
                shadow-[0_2px_4px_rgba(33,64,45,0.04),0_8px_24px_rgba(33,64,45,0.08)]
                transition-all duration-300
                hover:-translate-y-1.5 hover:shadow-[0_4px_8px_rgba(33,64,45,0.06),0_20px_52px_rgba(33,64,45,0.13)]"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-[var(--brand-earth)]">
                {safeLocale === "es" ? "Uso en mesa" : "Serving idea"}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-tight text-[var(--brand-olive)]">
                {recipe.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-[var(--brand-copy-muted)]">{recipe.blurb}</p>
              <div className="mt-5 border-t border-[var(--brand-olive)]/10 pt-4">
                <Link
                  href={`/${safeLocale}/recipes`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-olive)] transition-all hover:text-[var(--brand-earth)] group-hover:gap-2"
                >
                  {safeLocale === "es" ? "Ver recetas" : "See recipes"}
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </AnimateIn>

      {/* Contacto */}
      <section id="contacto" className="mt-24 scroll-mt-52">
        <AnimateIn>
          <div className="rounded-[40px] bg-[#21402d] p-8 text-[#f7f0df] sm:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#f0d08d]">
              {safeLocale === "es" ? "Contacto" : "Contact"}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
              {copy.contactTitle}
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#d7d1c4]">{copy.contactBody}</p>
            <div className="mt-8">
              <ContactForm
                locale={safeLocale}
                whatsappUrl={buildWhatsAppUrl("Hola, quiero información sobre pedidos o mayoreo.")}
                instagramUrl={env.instagramUrl}
              />
            </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
