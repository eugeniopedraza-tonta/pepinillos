import { describe, expect, it } from "vitest";

import {
  CheckoutValidationError,
  prepareCheckoutCart,
  toMinorUnitAmount
} from "@/lib/checkout";

describe("prepareCheckoutCart", () => {
  it("builds a mixed cart subtotal from the local catalog", () => {
    const cart = prepareCheckoutCart(
      [
        { productId: "pepinillos-dulces", quantity: 1 },
        { productId: "relish-cebolla", quantity: 2 }
      ],
      "es"
    );

    expect(cart.currency).toBe("MXN");
    expect(cart.items).toHaveLength(2);
    expect(cart.subtotalAmount).toBe(65000);
  });

  it("rejects empty carts", () => {
    expect(() => prepareCheckoutCart([], "es")).toThrow(CheckoutValidationError);
  });

  it("rejects invalid quantities", () => {
    expect(() =>
      prepareCheckoutCart([{ productId: "pepinillos-dulces", quantity: 0 }], "es")
    ).toThrow("productId and quantity");
  });

  it("rejects unknown products", () => {
    expect(() =>
      prepareCheckoutCart([{ productId: "unknown-product", quantity: 1 }], "es")
    ).toThrow("Unknown product");
  });
});

describe("toMinorUnitAmount", () => {
  it("converts MXN amounts to minor units", () => {
    expect(toMinorUnitAmount("250.00", "MXN")).toBe(25000);
  });
});
