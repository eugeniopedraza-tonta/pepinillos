"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { AddToCartButton } from "@/components/add-to-cart-button";
import type { Product } from "@/lib/catalog/types";
import { formatMoney } from "@/lib/data/site";
import type { Locale } from "@/lib/i18n";

export function FeaturedProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="relative col-span-full overflow-hidden rounded-[40px] bg-[var(--brand-olive)] shadow-[0_24px_64px_rgba(33,64,45,0.22)] sm:col-span-2"
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={reduced ? {} : { y: -5, transition: { duration: 0.3, ease: [0.25, 0, 0, 1] } }}
      transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
    >
      {/* Animated border glow */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[40px]"
          style={{ boxShadow: "0 0 0 2px rgba(184,154,74,0)" }}
          animate={{
            boxShadow: [
              "0 0 0 2px rgba(184,154,74,0), 0 0 0 0px rgba(184,154,74,0)",
              "0 0 0 2px rgba(184,154,74,0.55), 0 0 32px 4px rgba(184,154,74,0.18)",
              "0 0 0 2px rgba(184,154,74,0), 0 0 0 0px rgba(184,154,74,0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
        />
      )}

      <div className="flex flex-col md:flex-row">
        {/* Image panel */}
        <div className="relative flex items-center justify-center overflow-hidden border-b border-[var(--brand-brass)]/15 bg-[var(--brand-olive)] p-10 md:w-[42%] md:border-b-0 md:border-r">
          {/* Decorative rings */}
          {!reduced && (
            <>
              <motion.div
                className="absolute h-48 w-48 rounded-full border border-[var(--brand-brass)]/10"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute h-72 w-72 rounded-full border border-[var(--brand-brass)]/6"
                animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.08, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              />
            </>
          )}
          <motion.div
            className="relative z-10"
            whileHover={reduced ? {} : { scale: 1.07, rotate: -10 }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
          >
            <Image
              src="/pepinillos.png"
              alt={product.title}
              width={300}
              height={300}
              className="mx-auto h-auto w-full max-w-[260px] drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Content panel */}
        <div className="flex flex-1 flex-col p-8 md:p-10 lg:p-12 gap-6">
          {/* Badge row */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1], delay: 0.15 }}
          >
            <span className="badge-shimmer inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-olive)]">
              ★ {product.badge}
            </span>
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--brand-brass)]/60">
              {product.size}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--brand-cream)] sm:text-5xl"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1], delay: 0.22 }}
          >
            {product.title}
          </motion.h2>

          {/* Price */}
          <motion.p
            className="mt-3 text-xl font-semibold text-[var(--brand-brass)]"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1], delay: 0.29 }}
          >
            {formatMoney(product.price.amount, product.price.currencyCode, locale)}
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-4 max-w-md text-sm leading-7 text-[var(--brand-cream)]/70"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1], delay: 0.34 }}
          >
            {product.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-auto flex flex-wrap items-center gap-3 pt-7"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1], delay: 0.46 }}
          >
            <AddToCartButton
              id={product.id}
              handle={product.handle}
              title={product.title}
              priceAmount={product.price.amount}
              currencyCode={product.price.currencyCode}
              size={product.size}
            />
            <Link
              href={`/${locale}/products/${product.handle}`}
              className="inline-flex items-center rounded-full border border-[var(--brand-brass)]/30 px-5 py-3 text-sm font-semibold text-[var(--brand-cream)] transition-colors duration-200 hover:border-[var(--brand-brass)]/60 hover:bg-[var(--brand-brass)]/10"
            >
              Ver detalles
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
