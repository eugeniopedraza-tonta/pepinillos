import { describe, expect, it, vi } from "vitest";

import { ensureProductStripeMappingWithDependencies } from "@/lib/stripe/server";

describe("ensureProductStripeMappingWithDependencies", () => {
  it("reuses an existing Stripe mapping", async () => {
    const existing = {
      productKey: "pepinillos-dulces",
      stripeProductId: "prod_existing",
      stripePriceId: "price_existing",
      currency: "MXN",
      unitAmount: 25000
    };
    const findUnique = vi.fn().mockResolvedValue(existing);
    const create = vi.fn();
    const stripeCreate = vi.fn();

    const result = await ensureProductStripeMappingWithDependencies({
      productKey: "pepinillos-dulces",
      store: { findUnique, create },
      stripe: { products: { create: stripeCreate } }
    });

    expect(result).toEqual(existing);
    expect(create).not.toHaveBeenCalled();
    expect(stripeCreate).not.toHaveBeenCalled();
  });

  it("creates a Stripe product and price for first-time mappings", async () => {
    const findUnique = vi.fn().mockResolvedValue(null);
    const createdMapping = {
      productKey: "pepinillos-dulces",
      stripeProductId: "prod_created",
      stripePriceId: "price_created",
      currency: "MXN",
      unitAmount: 25000
    };
    const create = vi.fn().mockResolvedValue(createdMapping);
    const stripeCreate = vi.fn().mockResolvedValue({
      id: "prod_created",
      default_price: "price_created"
    });

    const result = await ensureProductStripeMappingWithDependencies({
      productKey: "pepinillos-dulces",
      store: { findUnique, create },
      stripe: { products: { create: stripeCreate } }
    });

    expect(stripeCreate).toHaveBeenCalledWith({
      name: "Pepinillos Dulces",
      default_price_data: {
        currency: "mxn",
        unit_amount: 25000
      },
      metadata: {
        productKey: "pepinillos-dulces"
      }
    });
    expect(create).toHaveBeenCalledWith({
      data: createdMapping
    });
    expect(result).toEqual(createdMapping);
  });
});
