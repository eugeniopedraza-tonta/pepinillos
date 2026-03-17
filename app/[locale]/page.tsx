import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import {
  buildWhatsAppUrl,
  recipes,
  siteCopy,
  storyCards,
  testimonials
} from "@/lib/data/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { getProducts } from "@/lib/shopify";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";
  const copy = siteCopy[safeLocale];
  const products = await getProducts(safeLocale);
  const featured = products.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="rounded-[40px] bg-[var(--brand-olive)] px-7 py-10 text-[var(--brand-cream)] shadow-[0_20px_70px_rgba(25,45,32,0.25)] sm:px-10 sm:py-14">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--brand-brass)]">
            {copy.hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.96] sm:text-6xl">
            {copy.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#d7d1c4] sm:text-lg">
            {copy.hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${safeLocale}/shop`}
              className="inline-flex items-center rounded-full bg-[var(--brand-brass)] px-6 py-3 text-sm font-semibold text-[var(--brand-olive)] transition hover:-translate-y-0.5"
            >
              {copy.hero.primaryCta}
            </Link>
            <Link
              href={`/${safeLocale}/about`}
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[var(--brand-cream)]"
            >
              {copy.hero.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {storyCards[safeLocale].map((card) => (
            <article
              key={card.title}
              className="rounded-[34px] border border-[var(--brand-olive)]/10 bg-white/80 p-6 shadow-[0_14px_35px_rgba(45,53,33,0.08)]"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">{card.kicker}</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--brand-olive)]">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-copy-muted)]">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">Featured products</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--brand-olive)]">
              {copy.featuredTitle}
            </h2>
          </div>
          <Link href={`/${safeLocale}/shop`} className="text-sm font-semibold text-[var(--brand-olive)]">
            {safeLocale === "es" ? "Ver catálogo completo" : "View full catalog"}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} locale={safeLocale} />
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[38px] border border-[var(--brand-olive)]/10 bg-[var(--surface-muted)] p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">{copy.storyTitle}</p>
          <p className="mt-4 text-lg leading-8 text-[var(--brand-sage)]">{copy.storyBody}</p>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--brand-copy-muted)]">
            <p>
              {safeLocale === "es"
                ? "El sitio está pensado para vivir en Vercel con Next.js, pero con Shopify como motor comercial: inventario, checkout seguro, descuentos y catálogo."
                : "The site is designed to live on Vercel with Next.js while Shopify remains the commerce engine for inventory, secure checkout, discounts, and catalog data."}
            </p>
            <p>
              {safeLocale === "es"
                ? "Eso deja espacio para una identidad visual fuerte, páginas editoriales y una tienda más flexible que un theme tradicional."
                : "That leaves room for a stronger visual identity, editorial pages, and a more flexible storefront than a standard theme."}
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {recipes[safeLocale].map((recipe) => (
            <article
              key={recipe.slug}
              className="rounded-[34px] bg-white/80 p-6 shadow-[0_14px_35px_rgba(33,64,45,0.08)]"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">
                {safeLocale === "es" ? "Uso en mesa" : "Serving idea"}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--brand-olive)]">
                {recipe.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-copy-muted)]">{recipe.blurb}</p>
              <Link
                href={`/${safeLocale}/recipes`}
                className="mt-5 inline-flex text-sm font-semibold text-[var(--brand-olive)]"
              >
                {safeLocale === "es" ? "Ver recetas" : "See recipes"}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[38px] bg-[var(--brand-earth)] p-8 text-[#fff5e3]">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-brass)]">{copy.socialTitle}</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl">
            {safeLocale === "es"
              ? "Marca, comunidad y venta en un solo flujo"
              : "Brand, community, and sales in one loop"}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#f1e5d2]">{copy.socialBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl("Hola, quiero saber más sobre sus pepinillos.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--brand-brass)] px-5 py-3 text-sm font-semibold text-[var(--brand-olive)]"
            >
              WhatsApp
            </a>
            <Link
              href={`/${safeLocale}/contact`}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold"
            >
              {safeLocale === "es" ? "Contacto" : "Contact"}
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {testimonials[safeLocale].map((testimonial) => (
            <blockquote
              key={testimonial.author}
              className="rounded-[32px] border border-[var(--brand-olive)]/10 bg-white/80 p-6"
            >
              <p className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[var(--brand-olive)]">
                “{testimonial.quote}”
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--brand-earth)]">
                {testimonial.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
