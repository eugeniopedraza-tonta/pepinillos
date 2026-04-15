import { beforeEach, describe, expect, it, vi } from "vitest";

const constructEvent = vi.fn();
const markOrderFromCheckoutSession = vi.fn();
const processedStripeEventCreate = vi.fn();
const prismaTransaction = vi.fn();
const sendOrderConfirmationEmail = vi.fn().mockResolvedValue(undefined);

vi.mock("@/lib/stripe/server", () => ({
  getStripe: () => ({
    webhooks: {
      constructEvent
    }
  }),
  getStripeWebhookSigningSecret: () => "whsec_test"
}));

vi.mock("@/lib/orders", () => ({
  markOrderFromCheckoutSession
}));

vi.mock("@/lib/email", () => ({
  sendOrderConfirmationEmail
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    $transaction: prismaTransaction,
    order: {
      findUnique: vi.fn().mockResolvedValue(null)
    }
  }
}));

describe("POST /api/stripe/webhooks", () => {
  beforeEach(() => {
    vi.resetModules();
    constructEvent.mockReset();
    markOrderFromCheckoutSession.mockReset();
    processedStripeEventCreate.mockReset();
    prismaTransaction.mockReset();

    prismaTransaction.mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) =>
      callback({
        processedStripeEvent: {
          create: processedStripeEventCreate
        }
      })
    );
  });

  it("records a checkout.session.completed event once", async () => {
    const session = {
      id: "cs_test_123",
      metadata: { orderId: "order_123" },
      payment_status: "paid"
    };
    constructEvent.mockReturnValue({
      id: "evt_123",
      type: "checkout.session.completed",
      data: {
        object: session
      }
    });
    processedStripeEventCreate.mockResolvedValue(undefined);

    const { POST } = await import("@/app/api/stripe/webhooks/route");

    const response = await POST(
      new Request("http://localhost/api/stripe/webhooks", {
        method: "POST",
        headers: {
          "stripe-signature": "sig_test"
        },
        body: "payload"
      })
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ received: true });
    expect(processedStripeEventCreate).toHaveBeenCalledWith({
      data: {
        stripeEventId: "evt_123",
        type: "checkout.session.completed"
      }
    });
    expect(markOrderFromCheckoutSession).toHaveBeenCalledWith(
      session,
      expect.objectContaining({
        processedStripeEvent: {
          create: processedStripeEventCreate
        }
      })
    );
  });

  it("treats duplicate webhook deliveries as idempotent", async () => {
    constructEvent.mockReturnValue({
      id: "evt_duplicate",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_duplicate",
          metadata: { orderId: "order_123" },
          payment_status: "paid"
        }
      }
    });
    processedStripeEventCreate.mockRejectedValue({ code: "P2002" });

    const { POST } = await import("@/app/api/stripe/webhooks/route");

    const response = await POST(
      new Request("http://localhost/api/stripe/webhooks", {
        method: "POST",
        headers: {
          "stripe-signature": "sig_test"
        },
        body: "payload"
      })
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ received: true, duplicate: true });
    expect(markOrderFromCheckoutSession).not.toHaveBeenCalled();
  });
});
