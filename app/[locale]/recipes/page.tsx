import { recipes } from "@/lib/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function RecipesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <section className="rounded-[40px] bg-[#7a4e25] p-8 text-[#fff5e3] sm:p-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#f0d08d]">
          {safeLocale === "es" ? "Recetas" : "Recipes"}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-tight">
          {safeLocale === "es"
            ? "Ideas para que el frasco no viva solo en el refri"
            : "Serving ideas so the jar does more than sit in the fridge"}
        </h1>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {recipes[safeLocale].map((recipe) => (
          <article
            key={recipe.slug}
            className="rounded-[34px] border border-[#21402d]/10 bg-white/80 p-6"
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#21402d]">
              {recipe.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#516154]">{recipe.blurb}</p>
            <ol className="mt-5 space-y-3 text-sm leading-7 text-[#36513f]">
              {recipe.steps.map((step, index) => (
                <li key={step}>
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#21402d] text-xs font-semibold text-[#f7f0df]">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}
