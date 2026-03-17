import Link from "next/link";

import { CartButton } from "@/components/cart-button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import type { Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  announcement: string;
  nav: ReadonlyArray<{ href: string; label: string }>;
};

export function SiteHeader({ locale, announcement, nav }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--brand-olive)]/10 bg-[color:var(--brand-cream)]/85 backdrop-blur-xl">
      <div className="border-b border-[var(--brand-olive)]/8 bg-[var(--brand-olive)] px-6 py-2 text-center text-xs uppercase tracking-[0.22em] text-[var(--brand-brass)]">
        {announcement}
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-olive)] text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-cream)]">
            Hbt
          </span>
          <div>
            <p className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-[0.02em] text-[var(--brand-olive)]">
              Herbet
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--brand-earth)]">
              pickled pantry
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="text-sm font-semibold text-[var(--brand-olive)] transition hover:text-[var(--brand-earth)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
