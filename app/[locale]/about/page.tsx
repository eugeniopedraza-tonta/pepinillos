import { siteCopy, storyCards } from "@/lib/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";
  const copy = siteCopy[safeLocale];

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_1fr]">
      <section className="rounded-[40px] bg-[#21402d] p-8 text-[#f7f0df] sm:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#f0d08d]">
          {safeLocale === "es" ? "Nuestra historia" : "Our story"}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-tight">
          {copy.storyTitle}
        </h1>
        <p className="mt-6 text-base leading-8 text-[#d9d1c3]">{copy.storyBody}</p>
      </section>

      <div className="grid gap-5">
        {storyCards[safeLocale].map((card) => (
          <article
            key={card.title}
            className="rounded-[34px] border border-[#21402d]/10 bg-white/80 p-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-[#7a4e25]">{card.kicker}</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[#21402d]">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#516154]">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
