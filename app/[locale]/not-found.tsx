"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeFromPathname } from "@/lib/i18n";

const copy = {
  es: {
    eyebrow: "Error 404",
    title: "Página no encontrada",
    body: "Lo sentimos, no pudimos encontrar la página que buscas. Quizá se movió o el enlace ya no existe.",
    home: "Volver al inicio",
    shop: "Ir a la tienda"
  },
  en: {
    eyebrow: "Error 404",
    title: "Page not found",
    body: "Sorry, we couldn't find the page you're looking for. It may have moved or the link no longer exists.",
    home: "Back to home",
    shop: "Go to shop"
  }
} as const;

export default function LocaleNotFound() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname ?? "");
  const t = copy[locale];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="rounded-[40px] border border-[#21402d]/10 bg-[var(--surface)] p-8 text-center sm:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-[#7a4e25]">{t.eyebrow}</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl leading-tight text-[#21402d]">
          {t.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#516154]">{t.body}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-full bg-[var(--brand-brass)] px-6 py-2.5 text-sm font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:-translate-y-px hover:opacity-90"
          >
            {t.home}
          </Link>
          <Link
            href={`/${locale}/shop`}
            className="rounded-full border border-[#21402d]/20 px-6 py-2.5 text-sm font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:bg-[var(--surface-muted)]"
          >
            {t.shop}
          </Link>
        </div>
      </section>
    </div>
  );
}
