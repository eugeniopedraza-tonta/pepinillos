import type { Metadata } from "next";

import { AnalyticsScripts } from "@/components/analytics-scripts";
import { CartProvider } from "@/components/cart-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Herbert's",
  description:
    "A bilingual Vercel-first storefront for Herbert's, a premium gourmet pickle brand powered by Next.js and Shopify."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <AnalyticsScripts />
        </CartProvider>
      </body>
    </html>
  );
}
