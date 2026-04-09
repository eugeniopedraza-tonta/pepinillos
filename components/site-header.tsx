"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { CartButton } from "@/components/cart-button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type NavItem = { href: string; label: string; highlight?: boolean };

type SiteHeaderProps = {
  locale: Locale;
  announcement: string;
  nav: ReadonlyArray<NavItem>;
};

export function SiteHeader({ locale, announcement, nav }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const shopHref = `/${locale}/shop`;
  const ctaLabel = locale === "es" ? "Comprar ahora" : "Shop now";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--brand-olive)]/10 bg-[color:var(--brand-cream)]/90 shadow-sm backdrop-blur-xl"
          : "bg-[color:var(--brand-cream)]/85 backdrop-blur-xl"
      )}
    >
      {/* Announcement bar */}
      <div className="bg-[var(--brand-olive)] px-6 py-2 text-center text-xs uppercase tracking-[0.22em] text-[var(--brand-brass)]">
        {announcement}
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--brand-brass)]/40 bg-[var(--brand-olive)] text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-cream)]">
            HS
          </span>
          <div>
            <p className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-[0.03em] text-[var(--brand-olive)]">
              {"HERBERT'S"}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--brand-earth)]">
              pepinillos gourmet
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                item.highlight
                  ? "font-bold text-[var(--brand-olive)] hover:bg-[var(--surface-muted)] hover:text-[var(--brand-earth)]"
                  : "text-[var(--brand-olive)] hover:bg-[var(--surface-muted)] hover:text-[var(--brand-earth)]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={shopHref}
            className="ml-2 rounded-full bg-[var(--brand-brass)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:-translate-y-px hover:opacity-90"
          >
            {ctaLabel}
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LocaleSwitcher locale={locale} />
          </div>
          <CartButton />

          {/* Hamburger — mobile only */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Abrir menú"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-olive)]/20 text-[var(--brand-olive)] transition-colors hover:bg-[var(--surface-muted)] lg:hidden"
              >
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" aria-hidden="true">
                  <path
                    d="M0 1h18M0 6.5h18M0 12h18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 border-l border-[var(--brand-olive)]/10 bg-[var(--brand-cream)] px-8 pt-12"
            >
              <Link
                href={`/${locale}`}
                onClick={() => setOpen(false)}
                className="mb-10 flex items-center gap-3"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-olive)] text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-cream)]">
                  HS
                </span>
                <span className="font-[family-name:var(--font-display)] text-2xl text-[var(--brand-olive)]">
                  {"HERBERT'S"}
                </span>
              </Link>

              <nav className="flex flex-col gap-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-full px-4 py-2.5 text-base font-semibold transition-colors",
                      item.highlight
                        ? "font-bold text-[var(--brand-olive)] hover:bg-[var(--surface-muted)]"
                        : "text-[var(--brand-olive)] hover:bg-[var(--surface-muted)]"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="my-2 border-t border-[var(--brand-olive)]/10" />

                <Link
                  href={shopHref}
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[var(--brand-olive)] px-5 py-3 text-center text-sm font-semibold text-[var(--brand-cream)] transition-all hover:bg-[var(--brand-sage)]"
                >
                  {ctaLabel}
                </Link>

                <div className="mt-2">
                  <LocaleSwitcher locale={locale} />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
