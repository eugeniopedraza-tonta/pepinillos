import type Stripe from "stripe";
import { Prisma, type PrismaClient } from "@prisma/client";

import type { PreparedCheckoutCart } from "@/lib/checkout";
import { prisma } from "@/lib/prisma";

type ProductMapping = {
  stripePriceId: string;
};

type ProductMappings = Map<string, ProductMapping>;

type OrderStore = {
  create(args: Prisma.OrderCreateArgs): Promise<{
    id: string;
    stripeCheckoutSessionId: string | null;
  }>;
  update(args: Prisma.OrderUpdateArgs): Promise<unknown>;
  findFirst(args: Prisma.OrderFindFirstArgs): Promise<{
    id: string;
    status: string;
    stripeCheckoutSessionId: string | null;
    paidAt: Date | null;
  } | null>;
};

export async function createPendingOrder(
  cart: PreparedCheckoutCart,
  mappings: ProductMappings,
  db: Pick<PrismaClient, "order"> = prisma
) {
  return db.order.create({
    data: {
      status: "pending",
      locale: cart.locale,
      currency: cart.currency,
      subtotalAmount: cart.subtotalAmount,
      items: {
        create: cart.items.map((item) => {
          const mapping = mappings.get(item.product.id);

          if (!mapping) {
            throw new Error(`Missing Stripe mapping for product ${item.product.id}`);
          }

          return {
            productKey: item.product.id,
            titleSnapshot: item.product.title,
            unitAmount: item.unitAmount,
            quantity: item.quantity,
            currency: cart.currency,
            stripePriceId: mapping.stripePriceId
          };
        })
      }
    },
    select: {
      id: true,
      stripeCheckoutSessionId: true
    }
  });
}

export async function attachStripeSessionToOrder(
  orderId: string,
  sessionId: string,
  db: Pick<PrismaClient, "order"> = prisma
) {
  return db.order.update({
    where: { id: orderId },
    data: {
      stripeCheckoutSessionId: sessionId
    }
  });
}

function getStripeObjectId(value: string | { id: string } | null | undefined) {
  return typeof value === "string" ? value : value?.id || null;
}

function serializeShippingAddress(session: Stripe.Checkout.Session) {
  const address =
    session.collected_information?.shipping_details?.address || session.customer_details?.address;

  return address ? JSON.stringify(address) : null;
}

export async function markOrderFromCheckoutSessionWithDependencies({
  session,
  orderStore
}: {
  session: Stripe.Checkout.Session;
  orderStore: OrderStore;
}) {
  const order = await orderStore.findFirst({
    where: {
      OR: [
        session.metadata?.orderId ? { id: session.metadata.orderId } : undefined,
        { stripeCheckoutSessionId: session.id }
      ].filter(Boolean) as Prisma.OrderWhereInput[]
    }
  });

  if (!order) {
    throw new Error(`No local order found for Checkout Session ${session.id}`);
  }

  const shippingName =
    session.collected_information?.shipping_details?.name || session.customer_details?.name;

  return orderStore.update({
    where: { id: order.id },
    data: {
      status: session.payment_status === "paid" ? "paid" : "pending",
      stripeCheckoutSessionId: session.id,
      stripeCustomerId: getStripeObjectId(session.customer),
      stripePaymentIntentId: getStripeObjectId(session.payment_intent),
      customerEmail: session.customer_details?.email || session.customer_email || null,
      shippingName,
      shippingPhone: session.customer_details?.phone || null,
      shippingAddressJson: serializeShippingAddress(session),
      paidAt: session.payment_status === "paid" ? new Date() : order.paidAt
    }
  });
}

export async function markOrderFromCheckoutSession(
  session: Stripe.Checkout.Session,
  db: Pick<PrismaClient, "order"> = prisma
) {
  return markOrderFromCheckoutSessionWithDependencies({
    session,
    orderStore: db.order
  });
}

export async function getCheckoutConfirmation(sessionId: string | null) {
  if (!sessionId) {
    return {
      state: "missing" as const,
      order: null
    };
  }

  const order = await prisma.order.findFirst({
    where: {
      stripeCheckoutSessionId: sessionId
    },
    include: {
      items: true
    }
  });

  if (!order) {
    return {
      state: "processing" as const,
      order: null
    };
  }

  return {
    state: order.status === "paid" ? ("paid" as const) : ("processing" as const),
    order
  };
}
