"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeFromPathname } from "@/lib/i18n";

const copy = {
  es: {
    eyebrow: "Algo salió mal",
    title: "Ocurrió un error",
    body: "Tuvimos un problema al cargar esta página. Puedes intentarlo de nuevo o volver al inicio.",
    retry: "Intentar de nuevo",
    home: "Volver al inicio"
  },
  en: {
    eyebrow: "Something went wrong",
    title: "An error occurred",
    body: "We had trouble loading this page. You can try again or head back home.",
    retry: "Try again",
    home: "Back to home"
  }
} as const;

export default function LocaleError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname ?? "");
  const t = copy[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="rounded-[40px] border border-[#21402d]/10 bg-[var(--surface)] p-8 text-center sm:p-12">
        <p className="text-xs uppercase tracking-[0.24em] text-[#7a4e25]">{t.eyebrow}</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl leading-tight text-[#21402d]">
          {t.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#516154]">{t.body}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[var(--brand-brass)] px-6 py-2.5 text-sm font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:-translate-y-px hover:opacity-90"
          >
            {t.retry}
          </button>
          <Link
            href={`/${locale}`}
            className="rounded-full border border-[#21402d]/20 px-6 py-2.5 text-sm font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:bg-[var(--surface-muted)]"
          >
            {t.home}
          </Link>
        </div>
      </section>
    </div>
  );
}
