import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "narrowSymbol",
  }).format(cents / 100);
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: "bg-emerald-100 text-emerald-800",
    pending: "bg-yellow-100 text-yellow-800",
    canceled: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    paid: "Pagado",
    pending: "Pendiente",
    canceled: "Cancelado",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? "bg-gray-100 text-gray-700"}`}>
      {labels[status] ?? status}
    </span>
  );
}

function FulfillmentBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    unfulfilled: "bg-orange-100 text-orange-800",
    shipped: "bg-blue-100 text-blue-800",
  };
  const labels: Record<string, string> = {
    unfulfilled: "Sin enviar",
    shipped: "Enviado",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? "bg-gray-100 text-gray-700"}`}>
      {labels[status] ?? status}
    </span>
  );
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-['Big_Caslon','Baskerville','Palatino_Linotype',serif] text-3xl font-bold text-[var(--brand-olive)]">
          Pedidos
        </h1>
        <p className="mt-1 text-sm text-[var(--brand-copy-muted)]">
          {orders.length} pedido{orders.length !== 1 ? "s" : ""} en total
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-[20px] border border-[var(--brand-olive)]/10 bg-white p-12 text-center text-sm text-[var(--brand-copy-muted)]">
          No hay pedidos todavía.
        </div>
      ) : (
        <div className="overflow-hidden rounded-[20px] border border-[var(--brand-olive)]/10 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--brand-olive)]/10 bg-[var(--surface-muted)]">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-copy-muted)]">ID</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-copy-muted)]">Cliente</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-copy-muted)]">Total</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-copy-muted)]">Pago</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-copy-muted)]">Envío</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-copy-muted)]">Fecha</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--brand-olive)]/6">
              {orders.map((order) => (
                <tr key={order.id} className="transition hover:bg-[var(--surface-muted)]/50">
                  <td className="px-5 py-4 font-mono text-xs text-[var(--brand-copy-muted)]">
                    {order.id.slice(0, 8)}…
                  </td>
                  <td className="px-5 py-4 text-[var(--brand-olive)]">
                    {order.customerEmail ?? <span className="text-[var(--brand-copy-muted)]">—</span>}
                  </td>
                  <td className="px-5 py-4 font-semibold text-[var(--brand-olive)]">
                    {formatAmount(order.subtotalAmount, order.currency)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-4">
                    <FulfillmentBadge status={order.fulfillmentStatus} />
                  </td>
                  <td className="px-5 py-4 text-[var(--brand-copy-muted)]">
                    {new Date(order.createdAt).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-semibold text-[var(--brand-olive)] hover:text-[var(--brand-brass)] transition-colors"
                    >
                      Ver →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
