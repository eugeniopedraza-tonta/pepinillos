"use client";

import { useState } from "react";

import { useCart } from "@/components/cart-provider";

type AddToCartButtonProps = {
  id: string;
  handle: string;
  title: string;
  priceAmount: string;
  currencyCode: string;
  variantId?: string;
  size: string;
};

export function AddToCartButton(props: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          id: props.id,
          handle: props.handle,
          title: props.title,
          priceAmount: props.priceAmount,
          currencyCode: props.currencyCode,
          variantId: props.variantId,
          size: props.size
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
      className="inline-flex items-center justify-center rounded-full bg-[var(--brand-olive)] px-5 py-3 text-sm font-semibold text-[var(--brand-cream)] transition hover:-translate-y-0.5"
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
