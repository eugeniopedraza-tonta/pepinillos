"use client";

import { useMemo } from "react";

import { useCart } from "@/components/cart-provider";

export function CartDrawer() {
  const { items, cartOpen, setCartOpen, removeItem, subtotal, checkoutUrl, canCheckoutWithShopify } =
    useCart();

  const money = useMemo(
    () =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: items[0]?.currencyCode || "MXN"
      }).format(subtotal),
    [items, subtotal]
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition ${cartOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!cartOpen}
    >
      <div
        className={`absolute inset-0 bg-[#102013]/45 transition ${cartOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-[var(--brand-cream)] p-6 shadow-[0_20px_60px_rgba(9,18,12,0.35)] transition duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">Tu mesa</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--brand-olive)]">
              Cart
            </h2>
          </div>
          <button
            type="button"
            className="rounded-full border border-[var(--brand-olive)]/15 px-3 py-2 text-sm font-semibold text-[var(--brand-olive)]"
            onClick={() => setCartOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[var(--brand-olive)]/20 bg-white/70 p-6 text-sm leading-7 text-[var(--brand-copy-muted)]">
              Your jar shelf is empty. Add a few products and the checkout will route to Shopify or WhatsApp depending on configuration.
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="rounded-[28px] border border-[var(--brand-olive)]/12 bg-white/80 p-4 shadow-[0_12px_30px_rgba(45,53,33,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-[var(--brand-olive)]">{item.title}</h3>
                    <p className="mt-1 text-sm text-[var(--brand-copy-muted)]">
                      {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[var(--brand-earth)]"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-8 rounded-[28px] bg-[var(--brand-olive)] p-5 text-[var(--brand-cream)]">
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.18em]">
            <span>Subtotal</span>
            <span>{money}</span>
          </div>
          <a
            href={items.length === 0 ? "#" : checkoutUrl}
            target={canCheckoutWithShopify ? "_self" : "_blank"}
            rel="noreferrer"
            className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
              items.length === 0
                ? "pointer-events-none bg-white/20 text-white/55"
                : "bg-[var(--brand-brass)] text-[var(--brand-olive)] hover:-translate-y-0.5"
            }`}
          >
            {canCheckoutWithShopify ? "Go to secure checkout" : "Finish by WhatsApp"}
          </a>
        </div>
      </aside>
    </div>
  );
}
