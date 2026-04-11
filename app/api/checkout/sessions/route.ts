import { NextResponse } from "next/server";

import {
  CheckoutValidationError,
  getCheckoutLocale,
  prepareCheckoutCart,
  type CheckoutRequestItem
} from "@/lib/checkout";
import { env } from "@/lib/env";
import { createPendingOrder, attachStripeSessionToOrder } from "@/lib/orders";
import { ensureStripeMappings, getStripe } from "@/lib/stripe/server";

export const runtime = "nodejs";

type CheckoutRequestBody = {
  items?: CheckoutRequestItem[];
  locale?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const locale = getCheckoutLocale(body.locale);
    const cart = prepareCheckoutCart(body.items || [], locale);
    const mappings = await ensureStripeMappings(cart.items.map((item) => item.product.id));
    const order = await createPendingOrder(cart, mappings);

    const stripe = getStripe();
    const successUrl = new URL(`/${locale}/checkout/success`, env.siteUrl);
    const cancelUrl = new URL(`/${locale}/checkout/cancel`, env.siteUrl);

    successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");

    const session = await stripe.checkout.sessions.create({
      line_items: cart.items.map((item) => {
        const mapping = mappings.get(item.product.id);

        if (!mapping) {
          throw new Error(`Missing Stripe price mapping for ${item.product.id}`);
        }

        return {
          price: mapping.stripePriceId,
          quantity: item.quantity
        };
      }),
      mode: "payment",
      locale,
      customer_creation: "always",
      phone_number_collection: {
        enabled: true
      },
      shipping_address_collection: {
        allowed_countries: ["MX"]
      },
      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
        locale
      },
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString()
    });

    if (!session.url) {
      throw new Error("Stripe Checkout did not return a redirect URL.");
    }

    await attachStripeSessionToOrder(order.id, session.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof CheckoutValidationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const message = error instanceof Error ? error.message : "Unable to create Checkout Session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
