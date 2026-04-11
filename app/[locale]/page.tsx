import Link from "next/link";

import { AboutBento } from "@/components/about-bento";
import { AnimateIn } from "@/components/animate-in";
import { HeroSection } from "@/components/hero-section";
import { ProductCard } from "@/components/product-card";
import {
  buildWhatsAppUrl,
  recipes,
  siteCopy,
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
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--brand-olive)]">
              {copy.featuredTitle}
            </h2>
          </div>
          <Link href={`/${safeLocale}/shop`} className="text-sm font-semibold text-[var(--brand-olive)] hover:text-[var(--brand-earth)] transition-colors">
            {safeLocale === "es" ? "Ver catálogo completo →" : "View full catalog →"}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={safeLocale} />
          ))}
        </div>
      </AnimateIn>

      {/* Story + Recipes */}
      <div className="mt-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <AnimateIn>
          <div className="rounded-[38px] border border-[var(--brand-olive)]/10 bg-[var(--surface-muted)] p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">{copy.storyTitle}</p>
            <p className="mt-4 text-lg leading-8 text-[var(--brand-sage)]">{copy.storyBody}</p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--brand-copy-muted)]">
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
              className="rounded-[34px] bg-[var(--surface)] p-6 shadow-[0_14px_35px_rgba(33,64,45,0.08)]"
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
                className="mt-5 inline-flex text-sm font-semibold text-[var(--brand-olive)] hover:text-[var(--brand-earth)] transition-colors"
              >
                {safeLocale === "es" ? "Ver recetas →" : "See recipes →"}
              </Link>
            </article>
          ))}
        </AnimateIn>
      </div>

      {/* Social + Testimonials */}
      <AnimateIn className="mt-20 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[38px] bg-[var(--brand-earth)] p-8 text-[#fff5e3]">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-brass)]">{copy.socialTitle}</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl">
            {safeLocale === "es"
              ? "Síguenos y conversa con nosotros"
              : "Follow us and start a conversation"}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#f1e5d2]">{copy.socialBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl("Hola, quiero saber más sobre sus pepinillos.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--brand-brass)] px-5 py-3 text-sm font-semibold text-[var(--brand-olive)] transition hover:-translate-y-0.5"
            >
              WhatsApp
            </a>
            <Link
              href={`/${safeLocale}/contact`}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition hover:border-white/30"
            >
              {safeLocale === "es" ? "Contacto" : "Contact"}
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {testimonials[safeLocale].map((testimonial) => (
            <blockquote
              key={testimonial.author}
              className="rounded-[32px] border border-[var(--brand-olive)]/10 bg-[var(--surface-muted)] p-6"
            >
              <p className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[var(--brand-olive)]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--brand-earth)]">
                {testimonial.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </AnimateIn>
    </div>
  );
}
