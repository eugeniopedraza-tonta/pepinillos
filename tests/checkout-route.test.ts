import { beforeEach, describe, expect, it, vi } from "vitest";

const createPendingOrder = vi.fn();
const attachStripeSessionToOrder = vi.fn();
const ensureStripeMappings = vi.fn();
const createCheckoutSession = vi.fn();

vi.mock("@/lib/orders", () => ({
  createPendingOrder,
  attachStripeSessionToOrder
}));

vi.mock("@/lib/stripe/server", () => ({
  ensureStripeMappings,
  getStripe: () => ({
    checkout: {
      sessions: {
        create: createCheckoutSession
      }
    }
  })
}));

describe("POST /api/checkout/sessions", () => {
  beforeEach(() => {
    vi.resetModules();
    createPendingOrder.mockReset();
    attachStripeSessionToOrder.mockReset();
    ensureStripeMappings.mockReset();
    createCheckoutSession.mockReset();

    createPendingOrder.mockResolvedValue({
      id: "order_123",
      stripeCheckoutSessionId: null
    });
    ensureStripeMappings.mockResolvedValue(
      new Map([
        [
          "pepinillos-dulces",
          {
            stripePriceId: "price_123"
          }
        ]
      ])
    );
    createCheckoutSession.mockResolvedValue({
      id: "cs_test_123",
      url: "https://checkout.stripe.com/pay/cs_test_123"
    });
  });

  it("creates a Checkout Session for a valid cart", async () => {
    const { POST } = await import("@/app/api/checkout/sessions/route");

    const response = await POST(
      new Request("http://localhost/api/checkout/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          locale: "es",
          items: [{ productId: "pepinillos-dulces", quantity: 1 }]
        })
      })
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      url: "https://checkout.stripe.com/pay/cs_test_123"
    });
    expect(createPendingOrder).toHaveBeenCalled();
    expect(createCheckoutSession).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        metadata: {
          orderId: "order_123",
          locale: "es"
        },
        line_items: [{ price: "price_123", quantity: 1 }]
      })
    );
    expect(attachStripeSessionToOrder).toHaveBeenCalledWith("order_123", "cs_test_123");
  });

  it("rejects unknown product IDs", async () => {
    const { POST } = await import("@/app/api/checkout/sessions/route");

    const response = await POST(
      new Request("http://localhost/api/checkout/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          locale: "es",
          items: [{ productId: "does-not-exist", quantity: 1 }]
        })
      })
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Unknown product: does-not-exist"
    });
  });

  it("rejects zero quantities", async () => {
    const { POST } = await import("@/app/api/checkout/sessions/route");

    const response = await POST(
      new Request("http://localhost/api/checkout/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          locale: "es",
          items: [{ productId: "pepinillos-dulces", quantity: 0 }]
        })
      })
    );

    expect(response.status).toBe(400);
  });

  it("rejects empty carts", async () => {
    const { POST } = await import("@/app/api/checkout/sessions/route");

    const response = await POST(
      new Request("http://localhost/api/checkout/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          locale: "es",
          items: []
        })
      })
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Cart is empty."
    });
  });
});
