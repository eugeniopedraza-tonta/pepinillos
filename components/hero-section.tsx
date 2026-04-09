"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

type HeroSectionProps = {
  locale: string;
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  storyCards: ReactNode;
};

const ease = [0.25, 0, 0, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease, delay },
  };
}

export function HeroSection({
  locale,
  eyebrow,
  title,
  body,
  primaryCta,
  secondaryCta,
  storyCards,
}: HeroSectionProps) {
  const reduced = useReducedMotion();
  const shopHref = `/${locale}/shop`;
  const aboutHref = `/${locale}/about`;

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      {/* Hero card */}
      <div className="rounded-[40px] bg-[var(--brand-olive)] px-7 py-10 text-[var(--brand-cream)] shadow-[0_20px_70px_rgba(25,45,32,0.25)] sm:px-10 sm:py-14">
        <motion.p
          {...(reduced ? {} : fadeUp(0))}
          className="text-xs uppercase tracking-[0.28em] text-[var(--brand-brass)]"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          {...(reduced ? {} : fadeUp(0.1))}
          className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.96] sm:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          {...(reduced ? {} : fadeUp(0.2))}
          className="mt-6 max-w-xl text-base leading-8 text-[#d7d1c4] sm:text-lg"
        >
          {body}
        </motion.p>
        <motion.div
          {...(reduced ? {} : fadeUp(0.3))}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            href={shopHref}
            className="inline-flex items-center rounded-full bg-[var(--brand-brass)] px-6 py-3 text-sm font-semibold text-[var(--brand-olive)] transition hover:-translate-y-0.5"
          >
            {primaryCta}
          </Link>
          <Link
            href={aboutHref}
            className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[var(--brand-cream)] transition hover:border-white/30"
          >
            {secondaryCta}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          {...(reduced ? {} : fadeUp(0.45))}
          className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--brand-brass)]/60"
        >
          <motion.span
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          <span>{locale === "es" ? "Explorar" : "Explore"}</span>
        </motion.div>
      </div>

      {/* Story cards */}
      <motion.div
        className="flex justify-center items-center h-full"
        {...(reduced ? {} : {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, ease, delay: 0.2 },
        })}
      >
        <div className="overflow-hidden border-b border-[var(--brand-olive)]/10 rounded-4xl" style={{ backgroundColor: "var(--card)" }}>
          <Image src={"/pepinillos-acostados.png"} alt="Pepinillos acostados" width={400} height={400} className="mx-auto h-auto object-cover" />
        </div>
      </motion.div>
    </section>
  );
}
