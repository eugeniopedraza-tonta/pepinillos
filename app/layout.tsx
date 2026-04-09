import type { Metadata } from "next";

import { AnalyticsScripts } from "@/components/analytics-scripts";
import { CartProvider } from "@/components/cart-provider";

import "./globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Herbert's",
  description:
    "Herbert's a Premium Pickle Brand with a focus on quality and flavor."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body>
        <CartProvider>
          {children}
          <AnalyticsScripts />
        </CartProvider>
      </body>
    </html>
  );
}
