import Link from "next/link";
import type Stripe from "stripe";

import { ClearCartOnMount } from "@/components/clear-cart-on-mount";
import { getStripe } from "@/lib/stripe/server";
import { isLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type ConfirmationState = "paid" | "processing" | "missing";

function fmt(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "narrowSymbol",
  }).format(cents / 100);
}

async function retrieveSession(
  sessionId: string | null
): Promise<Stripe.Checkout.Session | null> {
  if (!sessionId) {
    return null;
  }

  try {
    return await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  const { session_id: sessionId } = await searchParams;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";
  const session = await retrieveSession(sessionId || null);

  const state: ConfirmationState = !sessionId
    ? "missing"
    : !session
      ? "processing"
      : session.payment_status === "paid"
        ? "paid"
        : "processing";

  const copy =
    safeLocale === "es"
      ? {
          title: "Pago recibido",
          body: "Tu pedido ya quedó registrado y comenzaremos a prepararlo pronto.",
          processingTitle: "Registrando tu pedido…",
          processingBody:
            "Stripe nos redirigió correctamente. En cuanto se confirme el pago, tu pedido aparecerá como pagado.",
          missingTitle: "No encontramos tu pedido",
          missingBody:
            "No pudimos relacionar esta vista con un checkout específico. Regresa a la tienda si necesitas iniciar de nuevo.",
          backToShop: "Volver a la tienda",
          orderRef: "Referencia de pedido",
          summary: "Productos",
          subtotal: "Subtotal",
          shipping: "Envío",
          free: "Gratis",
          total: "Total",
          shipsTo: "Dirección de envío",
          contact: "Contacto",
        }
      : {
          title: "Payment received",
          body: "Your order is registered and we'll start preparing it shortly.",
          processingTitle: "Registering your order…",
          processingBody:
            "Stripe redirected you correctly. As soon as the payment is confirmed, your order will show as paid.",
          missingTitle: "Order not found",
          missingBody:
            "We could not match this page to a specific checkout. Head back to the shop if you need to start again.",
          backToShop: "Back to shop",
          orderRef: "Order reference",
          summary: "Products",
          subtotal: "Subtotal",
          shipping: "Shipping",
          free: "Free",
          total: "Total",
          shipsTo: "Shipping address",
          contact: "Contact",
        };

  const isPaid = state === "paid";
  const title = isPaid ? copy.title : state === "processing" ? copy.processingTitle : copy.missingTitle;
  const body = isPaid ? copy.body : state === "processing" ? copy.processingBody : copy.missingBody;

  const showSummary = Boolean(session);
  const currency = session?.currency || "mxn";
  const shortId = session ? session.id.replace(/^cs_(test_|live_)?/, "").slice(0, 8).toUpperCase() : undefined;

  const lineItems = session?.line_items?.data ?? [];
  const subtotalAmount = session?.amount_subtotal ?? 0;
  const shippingAmount = session?.shipping_cost?.amount_total ?? 0;
  const totalAmount = session?.amount_total ?? subtotalAmount + shippingAmount;

  const shippingDetails = session?.collected_information?.shipping_details;
  const shippingAddress = shippingDetails?.address || session?.customer_details?.address || null;
  const shippingName = shippingDetails?.name || session?.customer_details?.name || null;
  const customerEmail = session?.customer_details?.email || null;
  const shippingPhone = session?.customer_details?.phone || null;

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      {isPaid ? <ClearCartOnMount /> : null}

      {/* Status card */}
      <section className="rounded-[40px] border border-[var(--brand-olive)]/10 bg-[var(--surface)] p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">
          Checkout con Stripe
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--brand-olive)] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--brand-copy-muted)]">{body}</p>

        {shortId && (
          <div className="mt-5 inline-block rounded-2xl bg-[var(--surface-muted)] px-4 py-2">
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--brand-earth)]">
              {copy.orderRef}:{" "}
            </span>
            <span className="font-mono text-sm font-bold text-[var(--brand-olive)]">#{shortId}</span>
          </div>
        )}

        {/* Order items */}
        {showSummary && (
          <div className="mt-8 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-olive)]">
              {copy.summary}
            </p>
            <div className="space-y-2">
              {lineItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-[20px] border border-[var(--brand-olive)]/8 bg-white px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-[var(--brand-olive)]">{item.description}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--brand-earth)]">
                      ×{item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-[var(--brand-olive)]">
                    {fmt(item.amount_total, currency)}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between border-t border-[var(--brand-olive)]/10 pt-3">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--brand-earth)]">
                {copy.subtotal}
              </span>
              <span className="font-bold text-[var(--brand-olive)]">
                {fmt(subtotalAmount, currency)}
              </span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--brand-earth)]">
                {copy.shipping}
              </span>
              <span className="font-bold text-[var(--brand-olive)]">
                {shippingAmount === 0 ? copy.free : fmt(shippingAmount, currency)}
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between border-t border-[var(--brand-olive)]/10 pt-3">
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--brand-olive)]">
                {copy.total}
              </span>
              <span className="text-lg font-bold text-[var(--brand-olive)]">
                {fmt(totalAmount, currency)}
              </span>
            </div>
          </div>
        )}

        {/* Shipping + Contact */}
        {showSummary && (shippingAddress || customerEmail || shippingPhone) && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {shippingAddress && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-olive)]">
                  {copy.shipsTo}
                </p>
                <address className="not-italic space-y-0.5 text-sm text-[var(--brand-copy-muted)]">
                  {shippingName && (
                    <p className="font-semibold text-[var(--brand-olive)]">{shippingName}</p>
                  )}
                  {shippingAddress.line1 && <p>{shippingAddress.line1}</p>}
                  {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
                  {(shippingAddress.city || shippingAddress.state || shippingAddress.postal_code) && (
                    <p>
                      {[shippingAddress.city, shippingAddress.state, shippingAddress.postal_code]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}
                  {shippingAddress.country && <p>{shippingAddress.country}</p>}
                </address>
              </div>
            )}

            {(customerEmail || shippingPhone) && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-olive)]">
                  {copy.contact}
                </p>
                <div className="space-y-1 text-sm text-[var(--brand-copy-muted)]">
                  {customerEmail && <p>{customerEmail}</p>}
                  {shippingPhone && <p>{shippingPhone}</p>}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <Link
            href={`/${safeLocale}/shop`}
            className="inline-block rounded-full bg-[var(--brand-olive)] px-6 py-3 text-sm font-semibold text-[var(--brand-cream)] transition hover:bg-[var(--brand-sage)]"
          >
            {copy.backToShop}
          </Link>
        </div>
      </section>
    </div>
  );
}
