"use client";
import Link from "next/link";

import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { NewsletterForm } from "@/components/newsletter-form";
import { env } from "@/lib/env";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// Add retailer / press / partner logos here.
// src   → filename inside /public
// w / h → rendered pixel dimensions (adjust per logo)
// ─────────────────────────────────────────────────────────────────
const marqueeLogos: { src: string; w: number; h: number }[] = [
  { src: "vigar.png", w: 150, h: 40 },
  { src: "vigar.png", w: 150, h: 40 },
  { src: "vigar.png", w: 150, h: 40 },
  { src: "vigar.png", w: 150, h: 40 },
];

const proximamenteLogos: { src: string; w: number; h: number }[] = [
  { src: "cocinapractica.png", w: 200, h: 40 },
  { src: "mode-super.webp", w: 200, h: 60 },
  { src: "super-roma.png", w: 350, h: 80 },
];

const footerCopy = {
  es: {
    marqueeLabel: "Disponible en",
    tagline: "Productos Gourmet",
    headline: "Una historia familiar hecha frasco. Una marca hecha para compartir.",
    description:
      "Herbert's nace de una cocina real con ingredientes cuidados, lotes pequeños y el sabor de siempre. Cada frasco lleva algo de historia.",
    newsletterKicker: "Novedades y lanzamientos",
    newsletterTitle: "Primero en enterarte",
    newsletterBody:
      "Recibe noticias de nuevos productos, recetas y dónde encontrarnos antes que nadie.",
    links: [
      { href: "/shipping", label: "Envíos" },
      { href: "/returns", label: "Devoluciones" },
      { href: "/privacy", label: "Privacidad" },
      { href: "/terms", label: "Términos" },
    ],
    legal: "Herbert's · Hecho en México",
  },
  en: {
    marqueeLabel: "Available at",
    tagline: "Gourmet Products",
    headline: "A family recipe made jar by jar. A brand built for sharing.",
    description:
      "Herbert's comes from a real kitchen — careful ingredients, small batches, and a flavor that doesn't need to be invented. Every jar carries a piece of the story.",
    newsletterKicker: "News and launches",
    newsletterTitle: "Hear it first",
    newsletterBody:
      "Get updates on new products, recipes, and where to find us before anyone else.",
    links: [
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
    legal: "Herbert's · Made in Mexico",
  },
} as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = footerCopy[locale];
  const reducedMotion = useReducedMotion();
  return (
    <footer className="mt-24 border-t border-[var(--brand-olive)]/10 bg-[var(--brand-olive)] text-[var(--brand-cream)]">

      {/* Marquee strip — shown only when logos array is populated */}
      {marqueeLogos.length > 0 && (
        <div className="border-b border-white/10 py-5">
          <div className="mx-auto mb-4 px-6">
            <p className="flex justify-center gap-2 text-xl font-bold uppercase tracking-[0.26em] text-[var(--brand-cream)]">
              {copy.marqueeLabel}
            </p>
          </div>
          <Marquee pauseOnHover className="[--duration:20s]">
            {marqueeLogos.map((logo, index) => (
              <Image
                key={logo.src + index}
                src={`/${logo.src}`}
                alt={logo.src.replace(/\.[^.]+$/, "")}
                width={logo.w}
                height={logo.h}
                className="object-contain px-8 opacity-70 transition-opacity hover:opacity-100"
              />
            ))}
          </Marquee>
        </div>
      )}

      {marqueeLogos.length > 0 && (
        <div className="border-b border-white/10 py-5">
          <div className="mx-auto mb-4 px-6">
            <p className="flex justify-center gap-2 text-xl font-bold uppercase tracking-[0.26em] text-[var(--brand-cream)]">
              PRÓXIMAMENTE EN
            </p>
          </div>
          <Marquee pauseOnHover className="[--duration:20s]" reverse>
            {proximamenteLogos.map((logo, index) => (
              <Image
                key={logo.src + index}
                src={`/${logo.src}`}
                alt={logo.src.replace(/\.[^.]+$/, "")}
                width={logo.w}
                height={logo.h}
                className="object-contain px-8 opacity-70 transition-opacity hover:opacity-100"
              />
            ))}
          </Marquee>
        </div>
      )}

      {/* Main content */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Brand column */}
        <div>
          <div className="flex flex-col">
            <span className="logo-herberts font-[family-name:var(--font-bodoni)] text-5xl leading-none text-center">
              {"HERBERT'S"}
            </span>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--brand-brass)] text-center">
              {copy.tagline}
            </p>
          </div>

          <h2 className="mt-6 font-[family-name:var(--font-display)] text-3xl leading-tight">
            {copy.headline}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#d8d1c4]">
            {copy.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={reducedMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0, 0, 1], delay: 0.15 }}
          >
            <span className="badge-shimmer inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-olive)]">
              <a href={env.instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
            </span>
            <span className="badge-shimmer inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-olive)]">
              <a href={env.facebookUrl} target="_blank" rel="noreferrer">
              Facebook
            </a>
            </span>
            <span className="badge-shimmer inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-olive)]">
            <a href={`https://wa.me/${env.whatsappNumber}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            </span>
          </motion.div>
          </div>
        </div>

        {/* Newsletter column */}
        <div className="rounded-[36px] bg-[var(--brand-cream)] p-6 text-[var(--brand-olive)]">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-earth)]">
            {copy.newsletterKicker}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl">
            {copy.newsletterTitle}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--brand-copy-muted)]">
            {copy.newsletterBody}
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs uppercase tracking-[0.18em] text-[#d5d0c4]">
        <Separator />
        <div className="flex flex-wrap gap-4">
          {copy.links.map((link) => (
            <Link key={link.href} href={`/${locale}${link.href}`}
              className="transition hover:text-[var(--brand-brass)]">
              {link.label}
            </Link>
          ))}
        </div>
        <p>{copy.legal}</p>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs uppercase tracking-[0.18em] text-[#d5d0c4]">
        <p className="flex justify-start text-xs text-[#d5d0c4]">© 2026 Herbert&apos;s. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
