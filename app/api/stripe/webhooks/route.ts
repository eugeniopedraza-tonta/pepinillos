import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { sendOrderConfirmationEmail } from "@/lib/email";
import { getStripe, getStripeWebhookSigningSecret } from "@/lib/stripe/server";

export const runtime = "nodejs";

function orderRefFromSession(session: Stripe.Checkout.Session) {
  return session.id.replace(/^cs_(test_|live_)?/, "");
}

async function sendConfirmationForSession(
  stripe: Stripe,
  session: Stripe.Checkout.Session
) {
  const customerEmail =
    session.customer_details?.email || session.customer_email || null;

  if (!customerEmail) {
    return;
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100
  });
  const currency = session.currency || "mxn";
  const shippingDetails = session.collected_information?.shipping_details;
  const shippingAddress =
    shippingDetails?.address || session.customer_details?.address || null;

  await sendOrderConfirmationEmail({
    locale: session.metadata?.locale === "en" ? "en" : "es",
    customerName: session.customer_details?.name || null,
    customerEmail,
    orderId: orderRefFromSession(session),
    items: lineItems.data.map((item) => ({
      title: item.description || "",
      quantity: item.quantity || 1,
      unitAmount: item.price?.unit_amount || 0,
      currency: item.price?.currency || currency
    })),
    subtotalAmount: session.amount_subtotal || 0,
    shippingAmount: session.shipping_cost?.amount_total || 0,
    totalAmount: session.amount_total ?? null,
    currency,
    shippingAddress,
    shippingName: shippingDetails?.name || session.customer_details?.name || null,
    shippingPhone: session.customer_details?.phone || null
  });
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

    const session = event.data.object as Stripe.Checkout.Session;

    // Send confirmation email (non-blocking — don't fail the webhook if email errors)
    if (session.payment_status === "paid") {
      await sendConfirmationForSession(stripe, session).catch((err) =>
        console.error("[email] order confirmation failed:", err)
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process Stripe webhook.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
