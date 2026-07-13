import { AnimateIn } from "@/components/animate-in";
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
      <AnimateIn>
        <section className="rounded-[40px] bg-[#21402d] p-8 text-[#f7f0df] sm:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#f0d08d]">Contacto</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-tight">
            {copy.contactTitle}
          </h1>
          <p className="mt-5 text-sm leading-8 text-[#d7d1c4]">{copy.contactBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl("Hola, quiero información sobre pedidos o mayoreo.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#f0d08d] px-5 py-3 text-sm font-semibold text-[#1a2a1a] transition-opacity duration-200 hover:opacity-85"
            >
              WhatsApp
            </a>
            <a
              href={env.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition-colors duration-200 hover:border-white/30"
            >
              Instagram
            </a>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <section className="rounded-[40px] border border-[#21402d]/10 bg-[var(--surface)] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#7a4e25]">Newsletter</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[#21402d]">
            Captura interés para lanzamientos y recetas
          </h2>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </section>
      </AnimateIn>
    </div>
  );
}
