import { AboutBento } from "@/components/about-bento";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";

  return <AboutBento locale={safeLocale} />;
}
