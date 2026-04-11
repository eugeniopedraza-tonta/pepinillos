import type { Metadata } from "next";
import localFont from "next/font/local";
import { Figtree } from "next/font/google";

import { AnalyticsScripts } from "@/components/analytics-scripts";
import { CartProvider } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const bauerBodoni = localFont({
  src: "./fonts/BauerBodoniCondensedBold.ttf",
  variable: "--font-bodoni",
  display: "swap",
  weight: "700",
});

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
    <html lang="en" className={cn("font-sans", figtree.variable, bauerBodoni.variable)}>
      <body>
        <CartProvider>
          {children}
          <AnalyticsScripts />
        </CartProvider>
      </body>
    </html>
  );
}
