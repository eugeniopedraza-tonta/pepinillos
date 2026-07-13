import Link from "next/link";

import { defaultLocale } from "@/lib/i18n";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-[var(--brand-olive)]">
      <span className="logo-herberts font-[family-name:var(--font-bodoni)] text-5xl leading-none">
        {"HERBERT'S"}
      </span>
      <p className="mt-2 text-xs uppercase tracking-[0.28em] text-[var(--brand-brass)]">
        Error 404
      </p>

      <h1 className="mt-8 font-[family-name:var(--font-display)] text-5xl text-[#21402d]">
        Página no encontrada
      </h1>
      <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#516154]">
        La dirección que ingresaste no existe.
      </p>

      <Link
        href={`/${defaultLocale}`}
        className="mt-8 rounded-full bg-[var(--brand-brass)] px-6 py-2.5 text-sm font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:-translate-y-px hover:opacity-90"
      >
        Inicio
      </Link>
    </div>
  );
}
