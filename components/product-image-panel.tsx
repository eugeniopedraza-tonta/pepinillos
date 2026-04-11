"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  title: string;
  badge: string;
  imageUrl?: string;
};

export function ProductImagePanel({ title, badge, imageUrl }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-[40px] bg-[var(--brand-olive)] p-10 h-full shadow-[0_24px_64px_rgba(33,64,45,0.22)]"
      initial={reduced ? false : { opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
    >
      {/* Animated border glow */}
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[40px]"
          animate={{
            boxShadow: [
              "0 0 0 2px rgba(184,154,74,0), 0 0 0 0px rgba(184,154,74,0)",
              "0 0 0 2px rgba(184,154,74,0.5), 0 0 36px 6px rgba(184,154,74,0.15)",
              "0 0 0 2px rgba(184,154,74,0), 0 0 0 0px rgba(184,154,74,0)",
            ],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
      )}

      {/* Decorative concentric rings */}
      {!reduced && (
        <>
          <motion.div
            className="absolute h-52 w-52 rounded-full border border-[var(--brand-brass)]/12"
            animate={{ scale: [1, 1.09, 1], opacity: [0.5, 0.18, 0.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-80 w-80 rounded-full border border-[var(--brand-brass)]/8"
            animate={{ scale: [1, 1.07, 1], opacity: [0.35, 0.1, 0.35] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          />
          <motion.div
            className="absolute h-[26rem] w-[26rem] rounded-full border border-[var(--brand-brass)]/5"
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.06, 0.2] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          />
        </>
      )}

      {/* Badge — top left */}
      <div className="absolute top-6 left-6 z-20">
        <span className="badge-shimmer inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-olive)]">
          ★ {badge}
        </span>
      </div>

      {/* Product image */}
      <motion.div
        className="relative z-10"
        whileHover={reduced ? {} : { scale: 1.07, rotate: -8 }}
        transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
      >
        <Image
          src={imageUrl ?? "/pepinillos.png"}
          alt={title}
          width={320}
          height={320}
          className="mx-auto h-auto w-full max-w-[280px] drop-shadow-2xl"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
