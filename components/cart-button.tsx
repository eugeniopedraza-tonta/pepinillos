"use client";

import { useCart } from "@/components/cart-provider";

export function CartButton() {
  const { itemCount, setCartOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      className="inline-flex items-center gap-3 rounded-full border border-[var(--brand-olive)]/20 bg-white/85 px-4 py-2 text-sm font-semibold text-[var(--brand-olive)] shadow-[0_8px_30px_rgba(45,53,33,0.08)] transition hover:-translate-y-0.5"
    >
      <span>Cart</span>
      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--brand-olive)] px-2 text-xs text-[var(--brand-cream)]">
        {itemCount}
      </span>
    </button>
  );
}
