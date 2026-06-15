"use client";

import { useOptimistic, useTransition, useState } from "react";
import { updateStock } from "./actions";

export function StockRow({
  productId,
  title,
  size,
  quantity,
}: {
  productId: string;
  title: string;
  size: string;
  quantity: number;
}) {
  const [, startTransition] = useTransition();
  const [optimisticQty, setOptimisticQty] = useOptimistic(quantity);
  const [inputValue, setInputValue] = useState(String(quantity));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleBlur() {
    const parsed = parseInt(inputValue, 10);
    const safe = Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
    setInputValue(String(safe));
    if (safe === optimisticQty) return;
    startTransition(async () => {
      setOptimisticQty(safe);
      await updateStock(productId, safe);
    });
  }

  const outOfStock = optimisticQty === 0;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#21402d]/10 bg-white px-6 py-4">
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-[#21402d]">{title}</span>
        <span className="text-xs text-[#516154]">{size}</span>
      </div>
      <div className="flex items-center gap-3">
        {outOfStock ? (
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
            Agotado
          </span>
        ) : (
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            {optimisticQty} en stock
          </span>
        )}
        <input
          type="number"
          min="0"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-20 rounded-xl border border-[#21402d]/15 bg-[#f8f3e6] px-3 py-1.5 text-center text-sm text-[#21402d] outline-none focus:border-[#21402d]/40 focus:ring-2 focus:ring-[#21402d]/10"
        />
      </div>
    </div>
  );
}
