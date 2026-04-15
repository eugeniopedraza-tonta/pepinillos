import type { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { sendOrderConfirmationEmail } from "@/lib/email";
import { markOrderFromCheckoutSession } from "@/lib/orders";
import { prisma } from "@/lib/prisma";
import { getStripe, getStripeWebhookSigningSecret } from "@/lib/stripe/server";

export const runtime = "nodejs";

type WebhookTransactionClient = Pick<PrismaClient, "order" | "processedStripeEvent">;

function isUniqueConstraintError(error: unknown) {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
  );
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  try {
    const payload = await request.text();
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      getStripeWebhookSigningSecret()
    );

    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ received: true, ignored: true });
    }

    const order = await prisma.$transaction(async (tx: WebhookTransactionClient) => {
      await tx.processedStripeEvent.create({
        data: {
          stripeEventId: event.id,
          type: event.type
        }
      });

      return markOrderFromCheckoutSession(event.data.object, tx);
    });

    // Send order confirmation email (non-blocking — don't fail the webhook if email errors)
    const fullOrder = await prisma.order.findUnique({
      where: { id: (order as { id: string }).id },
      include: { items: true },
    });

    if (fullOrder?.customerEmail && fullOrder.status === "paid") {
      let shippingAddress = null;
      if (fullOrder.shippingAddressJson) {
        try { shippingAddress = JSON.parse(fullOrder.shippingAddressJson); } catch { /* ignore */ }
      }

      sendOrderConfirmationEmail({
        locale: (fullOrder.locale === "en" ? "en" : "es"),
        customerName: fullOrder.shippingName,
        customerEmail: fullOrder.customerEmail,
        orderId: fullOrder.id,
        items: fullOrder.items.map((item) => ({
          title: item.titleSnapshot,
          quantity: item.quantity,
          unitAmount: item.unitAmount,
          currency: item.currency,
        })),
        subtotalAmount: fullOrder.subtotalAmount,
        currency: fullOrder.currency,
        shippingAddress,
        shippingName: fullOrder.shippingName,
        shippingPhone: fullOrder.shippingPhone,
      }).catch((err) => console.error("[email] order confirmation failed:", err));
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    const message =
      error instanceof Error ? error.message : "Unable to process Stripe webhook.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
