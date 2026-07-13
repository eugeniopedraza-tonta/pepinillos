import Stripe from "stripe";

import { getStripeSecretKey, getStripeWebhookSecret } from "@/lib/server-env";

let stripeClient: Stripe | undefined;

export function getStripe() {
  if (!stripeClient) {
    stripeClient = new Stripe(getStripeSecretKey());
  }

  return stripeClient;
}

export function getStripeWebhookSigningSecret() {
  return getStripeWebhookSecret();
}
