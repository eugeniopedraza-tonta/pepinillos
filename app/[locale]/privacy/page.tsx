import { isLocale, type Locale } from "@/lib/i18n";

const copy = {
  es: {
    title: "Privacidad",
    body: "Esta página queda lista para la política formal de privacidad. En producción debe cubrir analítica, pixeles publicitarios, contacto por WhatsApp y procesamiento de pago vía Stripe."
  },
  en: {
    title: "Privacy",
    body: "This page is ready for the formal privacy policy. In production it should cover analytics, ad pixels, WhatsApp contact, and Stripe payment processing."
  }
} as const;

export default async function PrivacyPage({
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
