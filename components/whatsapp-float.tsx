import { buildWhatsAppUrl } from "@/lib/data/site";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl("Hola, quiero hacer una pregunta sobre sus productos.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center rounded-full bg-[#1c8c4b] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(28,140,75,0.35)] transition hover:-translate-y-0.5"
    >
      WhatsApp
    </a>
  );
}
