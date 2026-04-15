import Link from "next/link";

import { ClearCartOnMount } from "@/components/clear-cart-on-mount";
import { fromMinorUnitAmount } from "@/lib/checkout";
import { formatMoney } from "@/lib/data/site";
import { getCheckoutConfirmation } from "@/lib/orders";
import { isLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type ShippingAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};

function fmt(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "narrowSymbol",
  }).format(cents / 100);
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
  const result = await getCheckoutConfirmation(sessionId || null);

  const copy =
    safeLocale === "es"
      ? {
          title: "Pago recibido",
          body: "Tu pedido ya quedó registrado y comenzaremos a prepararlo pronto.",
          processingTitle: "Registrando tu pedido…",
          processingBody:
            "Stripe nos redirigió correctamente. En cuanto llegue la confirmación, tu pedido aparecerá como pagado.",
          missingTitle: "No encontramos tu pedido",
          missingBody:
            "No pudimos relacionar esta vista con un checkout específico. Regresa a la tienda si necesitas iniciar de nuevo.",
          backToShop: "Volver a la tienda",
          orderRef: "Referencia de pedido",
          summary: "Productos",
          subtotal: "Subtotal",
          shipsTo: "Dirección de envío",
          contact: "Contacto",
          email: "Correo",
          phone: "Teléfono",
        }
      : {
          title: "Payment received",
          body: "Your order is registered and we'll start preparing it shortly.",
          processingTitle: "Registering your order…",
          processingBody:
            "Stripe redirected you correctly. As soon as the webhook lands, your order will show as paid.",
          missingTitle: "Order not found",
          missingBody:
            "We could not match this page to a specific checkout. Head back to the shop if you need to start again.",
          backToShop: "Back to shop",
          orderRef: "Order reference",
          summary: "Products",
          subtotal: "Subtotal",
          shipsTo: "Shipping address",
          contact: "Contact",
          email: "Email",
          phone: "Phone",
        };

  const isPaid = result.state === "paid";
  const title = isPaid ? copy.title : result.state === "processing" ? copy.processingTitle : copy.missingTitle;
  const body = isPaid ? copy.body : result.state === "processing" ? copy.processingBody : copy.missingBody;

  const order = result.order;
  const shortId = order?.id.slice(0, 8).toUpperCase();

  let shippingAddress: ShippingAddress | null = null;
  if (order?.shippingAddressJson) {
    try {
      shippingAddress = JSON.parse(order.shippingAddressJson) as ShippingAddress;
    } catch {
      // malformed — skip
    }
  }

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
        {order && (
          <div className="mt-8 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-olive)]">
              {copy.summary}
            </p>
            <div className="space-y-2">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-[20px] border border-[var(--brand-olive)]/8 bg-white px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-[var(--brand-olive)]">{item.titleSnapshot}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--brand-earth)]">
                      ×{item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-[var(--brand-olive)]">
                    {fmt(item.unitAmount * item.quantity, item.currency)}
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
                {fmt(order.subtotalAmount, order.currency)}
              </span>
            </div>
          </div>
        )}

        {/* Shipping + Contact */}
        {order && (shippingAddress || order.customerEmail || order.shippingPhone) && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {shippingAddress && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-olive)]">
                  {copy.shipsTo}
                </p>
                <address className="not-italic space-y-0.5 text-sm text-[var(--brand-copy-muted)]">
                  {order.shippingName && (
                    <p className="font-semibold text-[var(--brand-olive)]">{order.shippingName}</p>
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

            {(order.customerEmail || order.shippingPhone) && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-olive)]">
                  {copy.contact}
                </p>
                <div className="space-y-1 text-sm text-[var(--brand-copy-muted)]">
                  {order.customerEmail && <p>{order.customerEmail}</p>}
                  {order.shippingPhone && <p>{order.shippingPhone}</p>}
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
