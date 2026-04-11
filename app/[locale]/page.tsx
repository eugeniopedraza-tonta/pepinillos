import Link from "next/link";

import { AnimateIn } from "@/components/animate-in";
import { HeroSection } from "@/components/hero-section";
import { FeaturedProductCard } from "@/components/featured-product-card";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/catalog";
import {
  buildWhatsAppUrl,
  recipes,
  siteCopy,
  testimonials
} from "@/lib/data/site";
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
      <AnimateIn className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">
              {safeLocale === "es" ? "Productos destacados" : "Featured products"}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold text-[var(--brand-olive)]">
              {copy.featuredTitle}
            </h2>
          </div>
          <Link href={`/${safeLocale}/shop`} className="text-sm font-semibold text-[var(--brand-olive)] hover:text-[var(--brand-earth)] transition-colors">
            {safeLocale === "es" ? "Ver catálogo completo →" : "View full catalog →"}
          </Link>
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

      {/* Story + Recipes */}
      <div className="mt-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <AnimateIn>
          <div className="h-full rounded-[40px] border border-[var(--brand-olive)]/8 bg-[var(--surface-muted)] p-8 sm:p-10
            shadow-[0_2px_4px_rgba(33,64,45,0.04),0_12px_36px_rgba(33,64,45,0.09),0_40px_80px_rgba(33,64,45,0.06)]">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[var(--brand-brass)]/30" />
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--brand-earth)]">
                {safeLocale === "es" ? "Nuestra historia" : "Our story"}
              </p>
              <span className="h-px flex-1 bg-[var(--brand-brass)]/30" />
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-snug text-[var(--brand-olive)]">
              {copy.storyTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--brand-sage)]">{copy.storyBody}</p>
            <div className="mt-6 space-y-4 border-t border-[var(--brand-olive)]/10 pt-6 text-sm leading-7 text-[var(--brand-copy-muted)]">
              <p>
                {safeLocale === "es"
                  ? "Cada frasco lleva la receta de siempre: crujiente, ajo suave, eneldo fresco y un golpe limpio de vinagre que hace que cualquier mesa mejore."
                  : "Every jar carries the same family recipe: crunchy texture, mellow garlic, fresh dill, and a clean vinegar finish that makes any table better."}
              </p>
              <p>
                {safeLocale === "es"
                  ? "Lotes pequeños, ingredientes cuidados y una identidad visual que hace que regalar un frasco tenga sentido."
                  : "Small batches, carefully sourced ingredients, and a visual identity that makes gifting a jar feel intentional."}
              </p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1} className="grid gap-5 sm:grid-cols-2">
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
        </AnimateIn>
      </div>
    </div>
  );
}

{/*
        <AnimateIn className="mt-20 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          className="rounded-[40px] bg-[var(--brand-earth)] p-8 sm:p-10 text-[#fff5e3]
            shadow-[0_4px_8px_rgba(100,55,15,0.12),0_20px_48px_rgba(100,55,15,0.2),0_40px_80px_rgba(100,55,15,0.14)]"
          style={{ backgroundImage: "radial-gradient(ellipse at 80% 20%, rgba(184,154,74,0.12) 0%, transparent 60%)" }}
        >
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--brand-brass)]">{copy.socialTitle}</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight">
            {safeLocale === "es"
              ? "Síguenos y conversa con nosotros"
              : "Follow us and start a conversation"}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#f1e5d2]/90">{copy.socialBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl("Hola, quiero saber más sobre sus pepinillos.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--brand-brass)] px-5 py-3 text-sm font-semibold text-[var(--brand-olive)]
                shadow-[0_4px_12px_rgba(184,154,74,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(184,154,74,0.5)]"
            >
              WhatsApp
            </a>
            <Link
              href={`/${safeLocale}/contact`}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition-all hover:border-white/40 hover:bg-white/10"
            >
              {safeLocale === "es" ? "Contacto" : "Contact"}
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          {testimonials[safeLocale].map((testimonial) => (
            <blockquote
              key={testimonial.author}
              className="group rounded-[34px] border border-[var(--brand-olive)]/8 bg-[var(--surface-muted)] p-7
                shadow-[0_2px_4px_rgba(33,64,45,0.04),0_8px_24px_rgba(33,64,45,0.07)]
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(33,64,45,0.06),0_16px_44px_rgba(33,64,45,0.11)]"
            >
              <span className="block select-none font-[family-name:var(--font-display)] text-5xl leading-none text-[var(--brand-brass)]/30 -mb-3">
                &ldquo;
              </span>
              <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-[var(--brand-olive)]">
                {testimonial.quote}
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--brand-brass)]/40" />
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">
                  {testimonial.author}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </AnimateIn> 
      */}
