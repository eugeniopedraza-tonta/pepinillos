import Link from "next/link";

import { ClearCartOnMount } from "@/components/clear-cart-on-mount";
import { fromMinorUnitAmount } from "@/lib/checkout";
import { formatMoney } from "@/lib/data/site";
import { getCheckoutConfirmation } from "@/lib/orders";
import { isLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

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
          body: "Tu pedido ya quedó registrado y comenzaremos a prepararlo.",
          processingTitle: "Tu pedido ya está registrado",
          processingBody:
            "Tu pedido ya está registrado y comenzaremos a prepararlo. Revisa tu correo electrónico para más detalles.",
          missingTitle: "Falta el identificador de la sesión",
          missingBody:
            "No pudimos relacionar esta vista con un checkout específico. Regresa a la tienda si necesitas iniciar de nuevo.",
          backToShop: "Volver a la tienda",
          summary: "Resumen del pedido"
        }
      : {
          title: "Payment received",
          body: "Your order is in and we can start preparing it.",
          processingTitle: "We are confirming your payment",
          processingBody:
            "Stripe redirected you correctly. As soon as the webhook lands, this order will show as paid.",
          missingTitle: "Missing Checkout Session ID",
          missingBody:
            "We could not match this page to a specific checkout. Head back to the shop if you need to start again.",
          backToShop: "Back to shop",
          summary: "Order summary"
        };

  const title =
    result.state === "paid"
      ? copy.title
      : result.state === "processing"
        ? copy.processingTitle
        : copy.missingTitle;

  const body =
    result.state === "paid"
      ? copy.body
      : result.state === "processing"
        ? copy.processingBody
        : copy.missingBody;

  const orderTotal =
    result.order &&
    formatMoney(
      fromMinorUnitAmount(result.order.subtotalAmount, result.order.currency),
      result.order.currency,
      safeLocale
    );

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      {result.state === "paid" ? <ClearCartOnMount /> : null}
      <section className="rounded-[40px] border border-[var(--brand-olive)]/10 bg-[var(--surface)] p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">
          Checkout con Stripe
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[var(--brand-olive)]">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--brand-copy-muted)]">{body}</p>

        {result.order ? (
          <div className="mt-8 rounded-[28px] border border-[var(--brand-olive)]/10 bg-[var(--surface-muted)] p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-earth)]">
                {copy.summary}
              </p>
              <p className="text-sm font-semibold text-[var(--brand-olive)]">{orderTotal}</p>
            </div>
            <div className="mt-4 space-y-3">
              {result.order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-[20px] bg-white px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-[var(--brand-olive)]">{item.titleSnapshot}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--brand-earth)]">
                      x{item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--brand-olive)]">
                    {formatMoney(
                      fromMinorUnitAmount(item.unitAmount * item.quantity, item.currency),
                      item.currency,
                      safeLocale
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${safeLocale}/shop`}
            className="rounded-full bg-[var(--brand-olive)] px-5 py-3 text-sm font-semibold text-[var(--brand-cream)] transition hover:bg-[var(--brand-sage)]"
          >
            {copy.backToShop}
          </Link>
        </div>
      </section>
    </div>
  );
}
