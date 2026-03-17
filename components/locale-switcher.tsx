"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { languageName, otherLocale, type Locale } from "@/lib/i18n";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nextLocale = otherLocale(locale);
  const nextPath = pathname.replace(`/${locale}`, `/${nextLocale}`) || `/${nextLocale}`;

  return (
    <Link
      href={nextPath}
      className="inline-flex items-center rounded-full border border-[var(--brand-olive)]/15 px-4 py-2 text-sm font-semibold text-[var(--brand-olive)] transition hover:bg-white/70"
    >
      {languageName(nextLocale)}
    </Link>
  );
}
