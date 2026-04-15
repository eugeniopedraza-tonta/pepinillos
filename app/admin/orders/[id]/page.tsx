import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { markAsShipped } from "./actions";

function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "narrowSymbol",
  }).format(cents / 100);
}

type ShippingAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  let shippingAddress: ShippingAddress | null = null;
  if (order.shippingAddressJson) {
    try {
      shippingAddress = JSON.parse(order.shippingAddressJson) as ShippingAddress;
    } catch {
      // malformed JSON — skip
    }
  }

  const isShipped = order.fulfillmentStatus === "shipped";

  return (
    <div className="space-y-8">
      {/* Back + title */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="text-sm font-semibold text-[var(--brand-copy-muted)] hover:text-[var(--brand-olive)] transition-colors"
        >
          ← Pedidos
        </Link>
        <span className="text-[var(--brand-copy-muted)]">/</span>
        <span className="font-mono text-sm text-[var(--brand-olive)]">{order.id.slice(0, 8)}…</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Order items */}
          <section className="overflow-hidden rounded-[20px] border border-[var(--brand-olive)]/10 bg-white shadow-sm">
            <div className="border-b border-[var(--brand-olive)]/10 px-6 py-4">
              <h2 className="font-semibold text-[var(--brand-olive)]">Productos</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--surface-muted)]">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-copy-muted)]">Producto</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-copy-muted)]">Cant.</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-copy-muted)]">Precio unit.</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-copy-muted)]">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--brand-olive)]/6">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-[var(--brand-olive)]">{item.titleSnapshot}</td>
                    <td className="px-6 py-4 text-right text-[var(--brand-copy-muted)]">{item.quantity}</td>
                    <td className="px-6 py-4 text-right text-[var(--brand-copy-muted)]">
                      {formatAmount(item.unitAmount, item.currency)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-[var(--brand-olive)]">
                      {formatAmount(item.unitAmount * item.quantity, item.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[var(--brand-olive)]/10 bg-[var(--surface-muted)]">
                  <td colSpan={3} className="px-6 py-4 text-right text-sm font-semibold text-[var(--brand-olive)]">
                    Total
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-[var(--brand-olive)]">
                    {formatAmount(order.subtotalAmount, order.currency)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>

          {/* Stripe IDs */}
          <section className="rounded-[20px] border border-[var(--brand-olive)]/10 bg-white shadow-sm px-6 py-5 space-y-3">
            <h2 className="font-semibold text-[var(--brand-olive)]">Referencias Stripe</h2>
            {[
              { label: "Checkout Session", value: order.stripeCheckoutSessionId },
              { label: "Payment Intent", value: order.stripePaymentIntentId },
              { label: "Customer ID", value: order.stripeCustomerId },
            ].map(({ label, value }) =>
              value ? (
                <div key={label} className="flex items-start gap-3 text-sm">
                  <span className="min-w-[130px] text-[var(--brand-copy-muted)]">{label}</span>
                  <span className="font-mono text-xs text-[var(--brand-olive)] break-all">{value}</span>
                </div>
              ) : null
            )}
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Fulfillment action */}
          <section className="rounded-[20px] border border-[var(--brand-olive)]/10 bg-white shadow-sm px-6 py-5">
            <h2 className="font-semibold text-[var(--brand-olive)] mb-4">Envío</h2>
            {isShipped ? (
              <div className="space-y-2 text-sm">
                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                  Enviado
                </span>
                {order.shippedAt && (
                  <p className="text-[var(--brand-copy-muted)]">
                    {new Date(order.shippedAt).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await markAsShipped(id);
                }}
              >
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[var(--brand-olive)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-cream)] transition hover:opacity-90"
                >
                  Marcar como enviado
                </button>
              </form>
            )}
          </section>

          {/* Customer info */}
          <section className="rounded-[20px] border border-[var(--brand-olive)]/10 bg-white shadow-sm px-6 py-5 space-y-3">
            <h2 className="font-semibold text-[var(--brand-olive)]">Cliente</h2>
            <div className="space-y-1.5 text-sm text-[var(--brand-copy-muted)]">
              {order.shippingName && <p className="font-medium text-[var(--brand-olive)]">{order.shippingName}</p>}
              {order.customerEmail && <p>{order.customerEmail}</p>}
              {order.shippingPhone && <p>{order.shippingPhone}</p>}
            </div>
          </section>

          {/* Shipping address */}
          {shippingAddress && (
            <section className="rounded-[20px] border border-[var(--brand-olive)]/10 bg-white shadow-sm px-6 py-5">
              <h2 className="font-semibold text-[var(--brand-olive)] mb-3">Dirección de envío</h2>
              <address className="not-italic space-y-0.5 text-sm text-[var(--brand-copy-muted)]">
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
            </section>
          )}

          {/* Order metadata */}
          <section className="rounded-[20px] border border-[var(--brand-olive)]/10 bg-white shadow-sm px-6 py-5 space-y-2">
            <h2 className="font-semibold text-[var(--brand-olive)] mb-3">Detalles del pedido</h2>
            {[
              {
                label: "Estado de pago",
                value: order.status === "paid" ? "Pagado" : order.status === "canceled" ? "Cancelado" : "Pendiente",
              },
              {
                label: "Creado",
                value: new Date(order.createdAt).toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
              },
              order.paidAt
                ? {
                    label: "Pagado",
                    value: new Date(order.paidAt).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                  }
                : null,
              { label: "Idioma", value: order.locale.toUpperCase() },
            ]
              .filter(Boolean)
              .map((item) => (
                <div key={item!.label} className="flex justify-between text-sm">
                  <span className="text-[var(--brand-copy-muted)]">{item!.label}</span>
                  <span className="font-medium text-[var(--brand-olive)]">{item!.value}</span>
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
