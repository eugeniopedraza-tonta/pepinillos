import { isLocale, type Locale } from "@/lib/i18n";
import { env } from "@/lib/env";

const LAST_UPDATED = "13 de julio de 2026";
const CONTACT_EMAIL = "contacto@herberts.mx";

const siteDomain = env.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
const whatsappDisplay = `+52 ${env.whatsappNumber.replace(
  /(\d{2})(\d{4})(\d{4})/,
  "$1 $2 $3"
)}`;

type Section = {
  heading: string;
  paragraphs?: string[];
  bullets?: { term?: string; text: string }[];
};

const intro =
  `Los presentes Términos y Condiciones ("Términos") regulan el uso del sitio ${siteDomain} y la compra de ` +
  `productos de Herbert's (Productos Gourmet). Al navegar en el sitio o realizar un pedido, usted acepta estos ` +
  `Términos en su totalidad. Si no está de acuerdo, le pedimos que se abstenga de usar el sitio o realizar compras.`;

const sections: Section[] = [
  {
    heading: "1. Identidad del vendedor",
    paragraphs: [
      `Herbert's (Productos Gourmet) opera desde Monterrey, Nuevo León, México. Para cualquier duda o aclaración puede contactarnos en ${CONTACT_EMAIL} o por WhatsApp al ${whatsappDisplay}.`
    ]
  },
  {
    heading: "2. Productos y naturaleza alimenticia",
    paragraphs: [
      "Comercializamos productos alimenticios gourmet elaborados en lotes pequeños. Al tratarse de alimentos, sus características (color, textura, sabor y presentación) pueden variar ligeramente entre lotes.",
      "Es responsabilidad del cliente revisar la información de ingredientes y posibles alérgenos antes de consumir el producto, así como conservarlo conforme a las indicaciones de la etiqueta."
    ]
  },
  {
    heading: "3. Precios y disponibilidad",
    bullets: [
      { text: "Todos los precios están expresados en pesos mexicanos (MXN)." },
      {
        term: "Envío no incluido",
        text: "el precio de los productos no incluye el costo de envío, el cual se coordina por separado (ver sección de Envíos)."
      },
      { text: "Los productos están sujetos a disponibilidad de inventario y se elaboran bajo pedido." },
      { text: "Nos reservamos el derecho de modificar precios, presentaciones y disponibilidad en cualquier momento y sin previo aviso." },
      { text: "En caso de un error evidente de precio o descripción, podremos cancelar el pedido afectado y reembolsar el monto correspondiente." }
    ]
  },
  {
    heading: "4. Pedidos y pagos",
    paragraphs: [
      "El pago se procesa de forma segura a través de nuestro procesador de pagos Stripe. Herbert's no almacena los datos completos de su tarjeta.",
      "Un pedido se considera confirmado únicamente cuando el pago ha sido aprobado. Nos reservamos el derecho de rechazar o cancelar pedidos por sospecha de fraude, error de información o falta de disponibilidad; en tal caso se reembolsará cualquier cargo realizado."
    ]
  },
  {
    heading: "5. Envíos y entregas",
    bullets: [
      {
        term: "Cobertura",
        text: "actualmente realizamos envíos únicamente dentro de Monterrey, Nuevo León, México."
      },
      { text: "Los envíos se realizan bajo pedido y se coordinan directamente con el cliente a través de WhatsApp." },
      { text: "El costo de envío no está incluido en el precio de los productos y se acuerda al coordinar la entrega." },
      { text: "Los tiempos de entrega son estimados y pueden variar por causas ajenas a nosotros (clima, tráfico, disponibilidad del cliente)." },
      { text: "Es responsabilidad del cliente proporcionar una dirección y datos de contacto correctos y completos." }
    ]
  },
  {
    heading: "6. Devoluciones y cancelaciones",
    paragraphs: [
      "Por tratarse de productos alimenticios perecederos, no se aceptan devoluciones y todas las transacciones son finales.",
      `Si su pedido llega dañado o presenta un error atribuible a nosotros, contáctenos dentro de las 24 horas siguientes a la entrega en ${CONTACT_EMAIL} o por WhatsApp al ${whatsappDisplay}, adjuntando evidencia (fotografías). Evaluaremos cada caso para ofrecer una reposición o solución adecuada.`
    ]
  },
  {
    heading: "7. Uso del sitio",
    bullets: [
      { text: "El usuario se compromete a usar el sitio de forma lícita y a no realizar actividades que puedan dañar, deshabilitar o sobrecargar la plataforma." },
      { text: "No está permitido intentar acceder sin autorización a áreas restringidas, sistemas o datos del sitio." },
      { text: "La información publicada en el sitio tiene fines informativos y comerciales y puede actualizarse en cualquier momento." }
    ]
  },
  {
    heading: "8. Propiedad intelectual",
    paragraphs: [
      "La marca Herbert's, su logotipo, textos, imágenes, diseños y demás contenidos del sitio son propiedad de Herbert's o de sus titulares y están protegidos por la legislación aplicable. Queda prohibida su reproducción, distribución o uso sin autorización previa por escrito."
    ]
  },
  {
    heading: "9. Comunicaciones por WhatsApp y redes",
    paragraphs: [
      "Parte de la atención, coordinación de envíos y comunicación con clientes se realiza a través de WhatsApp y redes sociales. El uso de estos canales se rige también por los términos y políticas de dichas plataformas de terceros."
    ]
  },
  {
    heading: "10. Privacidad",
    paragraphs: [
      `El tratamiento de sus datos personales se rige por nuestro Aviso de Privacidad, disponible en ${siteDomain}/privacy.`
    ]
  },
  {
    heading: "11. Limitación de responsabilidad",
    paragraphs: [
      "En la medida permitida por la ley, Herbert's no será responsable por daños indirectos o incidentales derivados del uso del sitio o del consumo inadecuado de los productos cuando no se sigan las indicaciones de conservación y consumo de la etiqueta.",
      "No garantizamos que el sitio esté libre de interrupciones o errores en todo momento."
    ]
  },
  {
    heading: "12. Modificaciones a los Términos",
    paragraphs: [
      `Podemos modificar estos Términos en cualquier momento. La versión vigente será siempre la publicada en ${siteDomain}/terms, y aplicará a los pedidos realizados a partir de su publicación.`
    ]
  },
  {
    heading: "13. Legislación aplicable y jurisdicción",
    paragraphs: [
      "Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Para la interpretación y cumplimiento, las partes se someten a la jurisdicción de los tribunales competentes en Monterrey, Nuevo León, renunciando a cualquier otro fuero que pudiera corresponderles."
    ]
  }
];

const copy = {
  es: {
    title: "Términos y Condiciones",
    updatedLabel: "Última actualización",
    updated: LAST_UPDATED,
    intro,
    sections
  }
} as const satisfies Record<Locale, unknown>;

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "es";
  const t = copy[safeLocale];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <article className="rounded-[40px] border border-[#21402d]/10 bg-white/80 p-8 sm:p-10">
        <h1 className="font-[family-name:var(--font-display)] text-5xl text-[#21402d]">
          {t.title}
        </h1>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#8a9488]">
          {t.updatedLabel}: {t.updated}
        </p>
        <p className="mt-6 text-sm leading-8 text-[#516154]">{t.intro}</p>

        <div className="mt-8 space-y-8">
          {t.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#21402d]">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph, index) => (
                <p
                  key={index}
                  className="mt-3 text-sm leading-8 text-[#516154]"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 space-y-2 text-sm leading-8 text-[#516154]">
                  {section.bullets.map((bullet, index) => (
                    <li key={index} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#21402d]/40"
                      />
                      <span>
                        {bullet.term ? (
                          <strong className="font-semibold text-[#21402d]">
                            {bullet.term}:
                          </strong>
                        ) : null}{" "}
                        {bullet.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
