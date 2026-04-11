"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useCart } from "@/components/cart-provider";

type AddToCartButtonProps = {
  id: string;
  handle: string;
  title: string;
  priceAmount: string;
  currencyCode: string;
  variantId?: string;
  size: string;
  color?: string;
};

export function AddToCartButton(props: AddToCartButtonProps) {
  const { addItem, updateQuantity, items } = useCart();
  const reduced = useReducedMotion();

  const cartItem = items.find((item) => item.id === props.id);
  const quantity = cartItem?.quantity ?? 0;
  const inCart = quantity > 0;

  function handleAdd() {
    addItem({
      id: props.id,
      handle: props.handle,
      title: props.title,
      priceAmount: props.priceAmount,
      currencyCode: props.currencyCode,
      variantId: props.variantId,
      size: props.size,
    });
  }

  function handleDecrement() {
    updateQuantity(props.id, quantity - 1);
  }

  function handleIncrement() {
    updateQuantity(props.id, quantity + 1);
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!inCart ? (
        <motion.button
          key="add"
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand-brass)] px-5 py-3 text-sm font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:cursor-pointer"
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.18, ease: [0.25, 0, 0, 1] }}
        >
          Añadir al carrito
        </motion.button>
      ) : (
        <motion.div
          key="stepper"
          className="inline-flex items-center overflow-hidden rounded-full bg-[var(--brand-brass)] shadow-[0_4px_16px_rgba(33,64,45,0.18)]"
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.18, ease: [0.25, 0, 0, 1] }}
        >
          {/* Decrement */}
          <button
            type="button"
            aria-label="Reducir cantidad"
            onClick={handleDecrement}
            className="flex h-11 w-11 items-center justify-center text-[var(--brand-cream)] transition-colors duration-150 hover:bg-white/10 active:bg-white/20 hover:cursor-pointer border-r border-[var(--brand-olive)]/10"
          >
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" aria-hidden="true">
              <path d="M1 1h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* Quantity display */}
          <div className="relative flex w-8 items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={quantity}
                className="text-sm font-bold tabular-nums text-[var(--brand-cream)]"
                initial={reduced ? false : { y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduced ? undefined : { y: -10, opacity: 0 }}
                transition={{ duration: 0.16, ease: [0.25, 0, 0, 1] }}
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Increment */}
          <button
            type="button"
            aria-label="Aumentar cantidad"
            onClick={handleIncrement}
            className="flex h-11 w-11 items-center justify-center text-[var(--brand-cream)] transition-colors duration-150 hover:bg-white/10 active:bg-white/20 hover:cursor-pointer border-l border-[var(--brand-olive)]/10"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
