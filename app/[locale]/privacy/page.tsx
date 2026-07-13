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
  `Herbert's ("el Responsable"), marca de productos gourmet con operación en Monterrey, Nuevo León, México, ` +
  `es responsable del tratamiento y protección de sus datos personales. En cumplimiento de la Ley Federal de ` +
  `Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del ` +
  `Aviso de Privacidad, ponemos a su disposición el presente Aviso de Privacidad Integral.`;

const sections: Section[] = [
  {
    heading: "1. Identidad y domicilio del Responsable",
    paragraphs: [
      "El Responsable de recabar y tratar sus datos personales es Herbert's, con operación comercial en Monterrey, Nuevo León, México.",
      `Para cualquier asunto relacionado con este Aviso de Privacidad puede contactarnos en el correo ${CONTACT_EMAIL}, por WhatsApp al ${whatsappDisplay}, o a través de nuestro sitio https://www.herberts.mx.`
    ]
  },
  {
    heading: "2. Datos personales que recabamos",
    paragraphs: [
      "Para las finalidades descritas en este Aviso podemos recabar las siguientes categorías de datos personales:"
    ],
    bullets: [
      {
        term: "Datos de identificación y contacto",
        text: "nombre, correo electrónico y número de teléfono."
      },
      {
        term: "Datos de envío",
        text: "nombre del destinatario, teléfono y dirección completa de entrega, necesarios para procesar y enviar su pedido."
      },
      {
        term: "Datos de pago",
        text: "los datos de su tarjeta y facturación se capturan y procesan directamente por nuestro procesador de pagos (Stripe) y no son almacenados en nuestros servidores. Únicamente conservamos identificadores de la transacción (por ejemplo, identificador de cliente y de intención de pago de Stripe) para efectos de conciliación y soporte."
      },
      {
        term: "Datos del pedido",
        text: "productos adquiridos, cantidades, monto y fecha de la compra."
      },
      {
        term: "Datos de navegación",
        text: "información recabada de forma automática mediante cookies y tecnologías de rastreo, como dirección IP, tipo de dispositivo y navegador, páginas visitadas e interacción con el sitio (ver sección de Cookies)."
      }
    ]
  },
  {
    heading: "3. Datos personales sensibles",
    paragraphs: [
      "No recabamos datos personales sensibles (aquellos que puedan revelar aspectos como origen racial o étnico, estado de salud, creencias religiosas, opiniones políticas o preferencia sexual)."
    ]
  },
  {
    heading: "4. Finalidades del tratamiento",
    paragraphs: [
      "Finalidades primarias (necesarias para la relación con usted):"
    ],
    bullets: [
      { text: "Procesar, gestionar y dar seguimiento a sus pedidos de compra." },
      { text: "Procesar el pago de sus compras a través de nuestro procesador de pagos." },
      { text: "Coordinar y realizar el envío y la entrega de los productos." },
      { text: "Enviar correos transaccionales (confirmación de pedido, estatus y comprobantes)." },
      { text: "Brindar atención y soporte al cliente, incluyendo la comunicación por WhatsApp." },
      { text: "Atender solicitudes, aclaraciones, quejas y el ejercicio de derechos ARCO." },
      { text: "Cumplir con obligaciones legales, fiscales y contables aplicables." }
    ]
  },
  {
    heading: "5. Finalidades secundarias",
    paragraphs: [
      "De manera adicional, y siempre que usted no manifieste su oposición, podemos tratar sus datos para las siguientes finalidades que no son necesarias para la relación comercial:"
    ],
    bullets: [
      { text: "Envío de comunicaciones comerciales, novedades, promociones y boletín (newsletter)." },
      { text: "Elaboración de estadísticas, análisis de uso y mejora de nuestros productos y sitio web." },
      { text: "Publicidad y mercadotecnia personalizada en plataformas de terceros (por ejemplo, Meta y Google)." }
    ]
  },
  {
    heading: "6. Mecanismos para negar el consentimiento a finalidades secundarias",
    paragraphs: [
      `Usted puede oponerse en cualquier momento al tratamiento de sus datos para las finalidades secundarias enviando su solicitud al correo ${CONTACT_EMAIL}. La negativa para estas finalidades no será motivo para negarle los productos o servicios que solicita.`
    ]
  },
  {
    heading: "7. Transferencias y encargados del tratamiento",
    paragraphs: [
      "Para cumplir con las finalidades descritas, compartimos ciertos datos con proveedores que actúan como encargados o, en su caso, como destinatarios de transferencias. Algunos de estos proveedores se ubican fuera de México (principalmente en Estados Unidos):"
    ],
    bullets: [
      {
        term: "Stripe",
        text: "procesamiento de pagos y datos de tarjeta/facturación."
      },
      {
        term: "Resend",
        text: "envío de correos electrónicos transaccionales y de notificación."
      },
      {
        term: "Google (Google Analytics / Google Ads)",
        text: "análisis de tráfico y, en su caso, publicidad, mediante cookies."
      },
      {
        term: "Meta (Facebook Pixel)",
        text: "medición de conversiones y publicidad dirigida en las plataformas de Meta."
      },
      {
        term: "Vercel",
        text: "alojamiento (hosting) del sitio y analítica de tráfico sin cookies (Vercel Analytics)."
      }
    ]
  },
  {
    heading: "8. Uso de cookies y tecnologías de rastreo",
    paragraphs: [
      "Nuestro sitio utiliza cookies y tecnologías similares para su funcionamiento, para recordar sus preferencias, medir el tráfico y mostrar publicidad relevante. Entre ellas usamos Google Analytics y el Pixel de Meta (cookies de terceros), así como Vercel Analytics, que no utiliza cookies.",
      "Usted puede deshabilitar o eliminar las cookies desde la configuración de su navegador. Tenga en cuenta que al hacerlo algunas funciones del sitio podrían no operar correctamente."
    ]
  },
  {
    heading: "9. Derechos ARCO y revocación del consentimiento",
    paragraphs: [
      "Usted tiene derecho a Acceder a sus datos personales, Rectificarlos cuando sean inexactos, Cancelarlos cuando considere que no se requieren para las finalidades señaladas, y Oponerse a su tratamiento (derechos ARCO). Asimismo, puede revocar el consentimiento que nos haya otorgado.",
      `Para ejercer cualquiera de estos derechos, envíe su solicitud al correo ${CONTACT_EMAIL}, incluyendo: (i) su nombre y medio para recibir la respuesta; (ii) copia de una identificación que acredite su identidad; (iii) la descripción clara de los datos y del derecho que desea ejercer.`,
      "Daremos respuesta a su solicitud en los plazos que establece la LFPDPPP."
    ]
  },
  {
    heading: "10. Medios para limitar el uso o divulgación de sus datos",
    paragraphs: [
      `Además de los mecanismos anteriores, puede solicitar que sus datos se limiten para fines publicitarios escribiendo a ${CONTACT_EMAIL}.`
    ]
  },
  {
    heading: "11. Medidas de seguridad y conservación",
    paragraphs: [
      "Implementamos medidas de seguridad administrativas, técnicas y físicas razonables para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso, acceso o tratamiento no autorizado.",
      "Conservamos sus datos únicamente durante el tiempo necesario para cumplir con las finalidades descritas y con las obligaciones legales, fiscales y contables aplicables."
    ]
  },
  {
    heading: "12. Cambios al Aviso de Privacidad",
    paragraphs: [
      `Este Aviso de Privacidad puede modificarse en cualquier momento para atender novedades legislativas, políticas internas o nuevos requerimientos. Cualquier cambio se publicará en esta misma página (${siteDomain}/privacy).`
    ]
  },
  {
    heading: "13. Consentimiento",
    paragraphs: [
      "Al proporcionarnos sus datos personales y utilizar nuestro sitio y servicios, usted manifiesta haber leído, entendido y aceptado los términos del presente Aviso de Privacidad."
    ]
  }
];

const copy = {
  es: {
    title: "Aviso de Privacidad",
    updatedLabel: "Última actualización",
    updated: LAST_UPDATED,
    intro,
    sections
  }
} as const satisfies Record<Locale, unknown>;

export default async function PrivacyPage({
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
