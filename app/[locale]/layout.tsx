import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CartDrawer } from "@/components/cart-drawer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { siteCopy, siteName } from "@/lib/data/site";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: `${siteName} | ${locale === "es" ? "Productos gourmet" : "Gourmet products"}`,
    description:
      locale === "es"
        ? "Sitio bilingüe en Next.js y Vercel para Herbert's, una marca de productos gourmet con checkout en Stripe."
        : "Bilingual Next.js and Vercel storefront for Herbert's, a gourmet pickle brand with Stripe checkout."
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = siteCopy[locale as Locale];

  return (
    <div lang={locale} className="min-h-screen bg-white text-[var(--brand-olive)]">
      <SiteHeader locale={locale} nav={copy.nav} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
      <CartDrawer locale={locale as Locale} />
      <WhatsAppFloat />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
