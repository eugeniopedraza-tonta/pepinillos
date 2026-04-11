import Link from "next/link";

import { isLocale, type Locale } from "@/lib/i18n";

export default async function CheckoutCancelPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";
  const copy =
    safeLocale === "es"
      ? {
          title: "Checkout cancelado",
          body:
            "Tu carrito sigue intacto. Puedes volver a intentarlo con Stripe o enviarnos el pedido por WhatsApp.",
          primary: "Volver al catálogo"
        }
      : {
          title: "Checkout canceled",
          body:
            "Your cart is still intact. You can try Stripe again or send the order through WhatsApp.",
          primary: "Back to catalog"
        };

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <section className="rounded-[40px] border border-[var(--brand-olive)]/10 bg-[var(--surface)] p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">
          Stripe Checkout
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-[var(--brand-olive)]">
          {copy.title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--brand-copy-muted)]">{copy.body}</p>
        <div className="mt-8">
          <Link
            href={`/${safeLocale}/shop`}
            className="rounded-full bg-[var(--brand-olive)] px-5 py-3 text-sm font-semibold text-[var(--brand-cream)] transition hover:bg-[var(--brand-sage)]"
          >
            {copy.primary}
          </Link>
        </div>
      </section>
    </div>
  );
}
