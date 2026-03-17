import { isLocale, type Locale } from "@/lib/i18n";

const copy = {
  es: {
    title: "Envíos",
    body: "La operación inicial está pensada para México. Conviene configurar zonas y tarifas sencillas en Shopify primero, y luego complejizar según demanda real."
  },
  en: {
    title: "Shipping",
    body: "The first operational setup is designed for Mexico. Keep zones and rates simple in Shopify first, then expand complexity based on real demand."
  }
} as const;

export default async function ShippingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <article className="rounded-[40px] border border-[#21402d]/10 bg-white/80 p-8 sm:p-10">
        <h1 className="font-[family-name:var(--font-display)] text-5xl text-[#21402d]">
          {copy[safeLocale].title}
        </h1>
        <p className="mt-5 text-sm leading-8 text-[#516154]">{copy[safeLocale].body}</p>
      </article>
    </div>
  );
}
