"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";
import type { Locale } from "@/lib/i18n";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type Props = {
  locale: Locale;
  whatsappUrl: string;
  instagramUrl: string;
};

const copy = {
  es: {
    name: "Nombre",
    email: "Correo electrónico",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tu pedido, mayoreo o colaboración…",
    submit: "Enviar mensaje",
    submitting: "Enviando…",
    success: "¡Mensaje enviado! Te responderemos pronto.",
  },
  en: {
    name: "Name",
    email: "Email address",
    message: "Message",
    messagePlaceholder: "Tell us about your order, wholesale inquiry, or collaboration…",
    submit: "Send message",
    submitting: "Sending…",
    success: "Message sent! We'll get back to you soon.",
  },
} as const;

const initial: ContactState = { status: "idle" };

const btnVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: [0.25, 0, 0, 1] },
  }),
};

export function ContactForm({ locale, whatsappUrl, instagramUrl }: Props) {
  const c = copy[locale];
  const [state, action, pending] = useActionState(sendContactEmail, initial);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-[0.18em] text-[#d7d1c4]">{c.name}</label>
          <input
            name="name"
            type="text"
            required
            className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-[#f2eedf] placeholder-white/30 outline-none transition focus:border-[#f0d08d]/60 focus:ring-1 focus:ring-[#f0d08d]/30"
            placeholder="Herbert"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-[0.18em] text-[#d7d1c4]">{c.email}</label>
          <input
            name="email"
            type="email"
            required
            className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-[#f2eedf] placeholder-white/30 outline-none transition focus:border-[#f0d08d]/60 focus:ring-1 focus:ring-[#f0d08d]/30"
            placeholder="hola@ejemplo.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-[0.18em] text-[#d7d1c4]">{c.message}</label>
        <textarea
          name="message"
          required
          rows={4}
          className="resize-none rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-[#f2eedf] placeholder-white/30 outline-none transition focus:border-[#f0d08d]/60 focus:ring-1 focus:ring-[#f0d08d]/30"
          placeholder={c.messagePlaceholder}
        />
      </div>

      {state.status === "error" && state.message && (
        <p className="text-xs text-[#f0d08d]">{state.message}</p>
      )}

      {state.status === "success" ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/10 px-5 py-4 text-sm font-medium text-[#f2eedf]"
        >
          {c.success}
        </motion.p>
      ) : (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {/* WhatsApp */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            custom={0}
            variants={btnVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.04, opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ once: true }}
            className="cursor-pointer rounded-full bg-[#f0d08d] px-5 py-3 text-sm font-semibold text-[#1a2a1a]"
          >
            WhatsApp
          </motion.a>

          {/* Instagram */}
          <motion.a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            custom={1}
            variants={btnVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.04, opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ once: true }}
            className="cursor-pointer rounded-full bg-[#f0d08d] px-5 py-3 text-sm font-semibold text-[#1a2a1a]"
          >
            Instagram
          </motion.a>

          {/* Submit — badge shimmer gradient */}
          <motion.button
            type="submit"
            disabled={pending}
            custom={2}
            initial="hidden"
            whileInView="visible"
            whileHover={pending ? {} : { scale: 1.04 }}
            whileTap={pending ? {} : { scale: 0.97 }}
            viewport={{ once: true }}
            className="badge-shimmer flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[var(--brand-olive)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? c.submitting : c.submit}
            <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} className="size-4" />
          </motion.button>
        </div>
      )}
    </form>
  );
}
