import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

const routes = [
  "",
  "/shop",
  "/about",
  "/recipes",
  "/faq",
  "/contact",
  "/shipping",
  "/returns",
  "/privacy",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ["es", "en"].flatMap((locale) =>
    routes.map((route) => ({
      url: `${env.siteUrl}/${locale}${route}`,
      lastModified: new Date()
    }))
  );
}
