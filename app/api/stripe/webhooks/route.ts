import type { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

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

    await prisma.$transaction(async (tx: WebhookTransactionClient) => {
      await tx.processedStripeEvent.create({
        data: {
          stripeEventId: event.id,
          type: event.type
        }
      });

      await markOrderFromCheckoutSession(event.data.object, tx);
    });

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
