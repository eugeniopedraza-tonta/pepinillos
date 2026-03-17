import { NewsletterForm } from "@/components/newsletter-form";
import { buildWhatsAppUrl, siteCopy } from "@/lib/data/site";
import { env } from "@/lib/env";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";
  const copy = siteCopy[safeLocale];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_1fr]">
      <section className="rounded-[40px] bg-[#21402d] p-8 text-[#f7f0df] sm:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#f0d08d]">
          {safeLocale === "es" ? "Contacto" : "Contact"}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-tight">
          {copy.contactTitle}
        </h1>
        <p className="mt-5 text-sm leading-8 text-[#d7d1c4]">{copy.contactBody}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={buildWhatsAppUrl("Hola, quiero información sobre pedidos o mayoreo.")}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#f0d08d] px-5 py-3 text-sm font-semibold text-[#1a2a1a]"
          >
            WhatsApp
          </a>
          <a
            href={env.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold"
          >
            Instagram
          </a>
        </div>
      </section>

      <section className="rounded-[40px] border border-[#21402d]/10 bg-white/80 p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#7a4e25]">
          {safeLocale === "es" ? "Newsletter" : "Newsletter"}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[#21402d]">
          {safeLocale === "es"
            ? "Captura interés para lanzamientos y recetas"
            : "Capture interest for launches and recipe drops"}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#516154]">
          {safeLocale === "es"
            ? "Este endpoint es ligero por ahora y queda listo para conectarse a Shopify Email, Klaviyo o el proveedor que decidan."
            : "This is a lightweight endpoint for now and can later connect to Shopify Email, Klaviyo, or your preferred provider."}
        </p>
        <div className="mt-6">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
