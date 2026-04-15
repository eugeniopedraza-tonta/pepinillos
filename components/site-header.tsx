"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { CartButton } from "@/components/cart-button";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import type { Locale } from "@/lib/i18n";

type NavItem = { href: string; label: string; highlight?: boolean };

type SiteHeaderProps = {
  locale: Locale;
  nav: ReadonlyArray<NavItem>;
};

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const shopHref = `/${locale}/shop`;
  const ctaLabel = "Comprar ahora";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--brand-olive)]/10 bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-white/85 backdrop-blur-xl"
      )}
    >
      {/* Announcement bar */}
      <div className="bg-[var(--brand-olive)] px-6 py-2 text-center text-xs uppercase tracking-[0.22em] text-[var(--brand-brass)]">
        <p className="mb-2">Envíos en México y atención directa por Whatsapp.</p>
        <a
          href={`https://wa.me/52${env.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer font-bold"
        >
          +52 {env.whatsappNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Logo + Cart row */}
        <div className="flex items-center justify-between gap-4 py-4 lg:py-5">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="logo-herberts font-[family-name:var(--font-bodoni)] text-4xl leading-none lg:text-5xl">
                {"HERBERT'S"}
              </span>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--brand-brass)]">
                Productos Gourmet
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:bg-[var(--surface-muted)] hover:text-[var(--brand-earth)]"
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

          {/* Cart — always visible */}
          <CartButton />
        </div>

        {/* Mobile nav row — hidden on desktop */}
        <nav className="flex flex-wrap items-center gap-1 pb-3 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:bg-[var(--surface-muted)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={shopHref}
            className="ml-1 shrink-0 rounded-full bg-[var(--brand-brass)] px-4 py-1.5 text-xs font-semibold text-[var(--brand-olive)] transition-all duration-200 hover:opacity-90"
          >
            {ctaLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
