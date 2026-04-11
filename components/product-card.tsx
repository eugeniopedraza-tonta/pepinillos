"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatMoney } from "@/lib/data/site";
import type { Locale } from "@/lib/i18n";
import type { Product } from "@/lib/shopify/types";

export function ProductCard({
  product,
  locale,
  index = 0,
}: {
  product: Product;
  locale: Locale;
  index?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="flex flex-col overflow-hidden rounded-[36px] border border-[var(--brand-olive)]/10 bg-[var(--surface)] shadow-[0_18px_40px_rgba(45,53,33,0.08)]"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={reduced ? {} : { y: -6, boxShadow: "0 28px_56px_rgba(45,53,33,0.14)" }}
      transition={{ duration: 0.5, ease: [0.25, 0, 0, 1], delay: index * 0.09 }}
    >
      <div className="overflow-hidden border-b border-[var(--brand-olive)]/10 bg-[var(--brand-olive)]">
        <motion.div
          whileHover={reduced ? {} : { scale: 1.08, rotate: -10 }}
          transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
        >
          <Image
            src={"/pepinillos.png"}
            alt="Pepinillos"
            width={200}
            height={100}
            className="mx-auto h-auto bg-transparent object-cover"
          />
        </motion.div>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-6">
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
        <div className="mt-auto flex flex-wrap items-center gap-3">
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
            className="inline-flex items-center rounded-full border border-[var(--brand-olive)]/15 px-5 py-3 text-sm font-semibold text-[var(--brand-olive)] transition-colors duration-200 hover:bg-[var(--surface-muted)]"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
