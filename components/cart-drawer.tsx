"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useCart } from "@/components/cart-provider";
import type { Locale } from "@/lib/i18n";

export function CartDrawer({ locale }: { locale: Locale }) {
  const { items, cartOpen, setCartOpen, removeItem, updateQuantity, subtotal, whatsappCheckoutUrl } =
    useCart();
  const [checkoutError] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const copy =
    locale === "es"
      ? {
          title: "Tu pedido",
          cart: "Carrito",
          empty: "Tu carrito está vacío. Agrega productos para continuar.",
          subtotal: "Subtotal",
          stripeCta: "Pagar con Stripe",
          stripeLoading: "Abriendo checkout...",
          whatsappCta: "Enviar por WhatsApp",
          remove: "Eliminar producto",
          decrement: "Reducir cantidad",
          increment: "Aumentar cantidad",
          error: "No pudimos iniciar Stripe Checkout."
        }
      : {
          title: "Your order",
          cart: "Cart",
          empty: "Your cart is empty. Add products to continue.",
          subtotal: "Subtotal",
          stripeCta: "Pay with Stripe",
          stripeLoading: "Opening checkout...",
          whatsappCta: "Send via WhatsApp",
          remove: "Remove product",
          decrement: "Decrease quantity",
          increment: "Increase quantity",
          error: "We could not start Stripe Checkout."
        };

  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale === "es" ? "es-MX" : "en-US", {
        style: "currency",
        currency: items[0]?.currencyCode || "MXN",
      }).format(subtotal),
    [items, locale, subtotal]
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition ${cartOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!cartOpen}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#102013]/45 transition duration-300 ${cartOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-[0_20px_60px_rgba(9,18,12,0.35)] transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--brand-olive)]/8 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">{copy.title}</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--brand-olive)]">
              {copy.cart}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brand-olive)]/15 text-[var(--brand-olive)] transition-colors duration-150 hover:bg-[var(--surface)]"
            onClick={() => setCartOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="mt-8 rounded-[28px] border border-dashed border-[var(--brand-olive)]/20 bg-[var(--surface)] p-8 text-center">
              <p className="text-sm leading-7 text-[var(--brand-copy-muted)]">
                {copy.empty}
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: 24, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.28, ease: [0.25, 0, 0, 1] }}
                  className="mb-3 rounded-[24px] border border-[var(--brand-olive)]/10 bg-[var(--surface)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-[var(--brand-olive)]">{item.title}</h3>
                      <p className="mt-0.5 text-xs text-[var(--brand-copy-muted)]">{item.size}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={copy.remove}
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 rounded-full p-1.5 text-[var(--brand-earth)]/60 transition-colors duration-150 hover:bg-[var(--surface-muted)] hover:text-[var(--brand-earth)]"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Quantity stepper */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center overflow-hidden rounded-full border border-[var(--brand-olive)]/12 bg-white">
                      <button
                        type="button"
                        aria-label={copy.decrement}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center text-[var(--brand-olive)] transition-colors duration-150 hover:bg-[var(--surface)] hover:cursor-pointer"
                      >
                        <svg width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden="true">
                          <path d="M1 1h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </button>

                      <div className="relative flex w-7 items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={item.quantity}
                            className="text-xs font-bold tabular-nums text-[var(--brand-olive)]"
                            initial={reduced ? false : { y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={reduced ? undefined : { y: -8, opacity: 0 }}
                            transition={{ duration: 0.14, ease: [0.25, 0, 0, 1] }}
                          >
                            {item.quantity}
                          </motion.span>
                        </AnimatePresence>
                      </div>

                      <button
                        type="button"
                        aria-label={copy.increment}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center text-[var(--brand-olive)] transition-colors duration-150 hover:bg-[var(--surface)] hover:cursor-pointer"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-[var(--brand-olive)]">
                      {new Intl.NumberFormat("es-MX", {
                        style: "currency",
                        currency: item.currencyCode,
                      }).format(Number(item.priceAmount) * item.quantity)}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--brand-olive)]/8 px-6 py-5">
          <div className="rounded-[24px] bg-[var(--brand-olive)] p-5 text-[var(--brand-cream)]">
            <div className="flex items-center justify-between text-sm uppercase tracking-[0.18em]">
              <span>{copy.subtotal}</span>
              <span>{money}</span>
            </div>
            {/* 
            <button
              type="button"
              onClick={handleStripeCheckout}
              disabled={items.length === 0 || isPending}
              className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                items.length === 0 || isPending
                  ? "cursor-not-allowed bg-white/20 text-white/55"
                  : "bg-[var(--brand-brass)] text-[var(--brand-olive)] hover:-translate-y-0.5 hover:opacity-90"
              }`}
            >
              {isPending ? copy.stripeLoading : copy.stripeCta}
            </button>
            */}
            <a
              href={items.length === 0 ? "#" : whatsappCheckoutUrl}
              target="_blank"
              rel="noreferrer"
              className={`mt-3 inline-flex w-full items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                items.length === 0
                  ? "pointer-events-none border-white/15 text-white/45"
                  : "border-white/20 text-white hover:border-white/35 hover:bg-white/8"
              }`}
            >
              {copy.whatsappCta}
            </a>
            {checkoutError ? (
              <p className="mt-3 text-sm leading-6 text-[var(--brand-brass)]">{checkoutError}</p>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
