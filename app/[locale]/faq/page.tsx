import { faqs } from "@/lib/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function FaqPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <section className="rounded-[40px] border border-[#21402d]/10 bg-white/80 p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#7a4e25]">FAQ</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[#21402d]">
          {safeLocale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
        </h1>
      </section>

      <div className="mt-8 space-y-4">
        {faqs[safeLocale].map((item) => (
          <article
            key={item.question}
            className="rounded-[30px] border border-[#21402d]/10 bg-[#f8f3e6] p-6"
          >
            <h2 className="font-semibold text-[#21402d]">{item.question}</h2>
            <p className="mt-3 text-sm leading-7 text-[#516154]">{item.answer}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
