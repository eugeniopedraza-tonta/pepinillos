import { env } from "@/lib/env";
import type { FaqItem, Product, Recipe } from "@/lib/shopify/types";
import type { Locale } from "@/lib/i18n";

export const siteName = "Herbet";

export const fallbackProducts: Record<Locale, Product[]> = {
  es: [
    {
      id: "heritage-spear",
      handle: "pepino-clasico",
      title: "Pepino clásico en salmuera",
      description:
        "La receta familiar: crujiente, ajo suave, eneldo fresco y un golpe limpio de vinagre.",
      price: { amount: "149.00", currencyCode: "MXN" },
      tags: ["Familiar", "Más vendido"],
      accent: "from-[#5f6b3f] to-[#b89d5a]",
      badge: "Más vendido",
      size: "580 g",
      flavorNotes: ["Crujiente", "Ajo suave", "Eneldo fresco"],
      variantId: ""
    },
    {
      id: "fire-brine",
      handle: "pepino-con-chile",
      title: "Pepino con chile y mostaza",
      description:
        "Un lote con carácter para botanear: notas especiadas, semilla de mostaza y picor amable.",
      price: { amount: "165.00", currencyCode: "MXN" },
      tags: ["Picante", "Edición cocina"],
      accent: "from-[#516237] to-[#c5b06d]",
      badge: "Picante",
      size: "580 g",
      flavorNotes: ["Mostaza", "Picor suave", "Final cálido"],
      variantId: ""
    },
    {
      id: "garden-bundle",
      handle: "trio-degustacion",
      title: "Trío degustación de la casa",
      description:
        "Tres frascos pensados para regalar, compartir y descubrir qué versión se acaba primero.",
      price: { amount: "429.00", currencyCode: "MXN" },
      tags: ["Bundle", "Regalo"],
      accent: "from-[#3f5640] to-[#d1bc82]",
      badge: "Bundle",
      size: "3 x 370 g",
      flavorNotes: ["Ideal para regalo", "Variedad", "Mesa compartida"],
      variantId: ""
    }
  ],
  en: [
    {
      id: "heritage-spear",
      handle: "classic-brine-pickles",
      title: "Classic brine pickles",
      description:
        "The family recipe: crisp texture, mellow garlic, fresh dill, and a clean vinegar finish.",
      price: { amount: "149.00", currencyCode: "MXN" },
      tags: ["Family recipe", "Best seller"],
      accent: "from-[#5f6b3f] to-[#b89d5a]",
      badge: "Best seller",
      size: "580 g",
      flavorNotes: ["Crunchy", "Mellow garlic", "Fresh dill"],
      variantId: ""
    },
    {
      id: "fire-brine",
      handle: "mustard-chili-pickles",
      title: "Mustard and chili pickles",
      description:
        "A livelier batch for snack boards: mustard seed, warm spice, and a friendly heat.",
      price: { amount: "165.00", currencyCode: "MXN" },
      tags: ["Spicy", "Kitchen batch"],
      accent: "from-[#516237] to-[#c5b06d]",
      badge: "Spicy",
      size: "580 g",
      flavorNotes: ["Mustard seed", "Gentle heat", "Warm finish"],
      variantId: ""
    },
    {
      id: "garden-bundle",
      handle: "house-tasting-trio",
      title: "House tasting trio",
      description:
        "Three jars built for gifting, sharing, and finding out which batch disappears first.",
      price: { amount: "429.00", currencyCode: "MXN" },
      tags: ["Bundle", "Giftable"],
      accent: "from-[#3f5640] to-[#d1bc82]",
      badge: "Bundle",
      size: "3 x 370 g",
      flavorNotes: ["Giftable", "Variety", "Built for sharing"],
      variantId: ""
    }
  ]
};

export const recipes: Record<Locale, Recipe[]> = {
  es: [
    {
      slug: "tostada-de-pollo",
      title: "Tostada de pollo con pepinillos",
      blurb: "La acidez corta la cremosidad y levanta una tostada casera en cinco minutos.",
      steps: [
        "Unta frijoles o mayonesa de chipotle en una tostada.",
        "Agrega pollo deshebrado, pepinillos rebanados y cebolla morada.",
        "Termina con cilantro y unas gotas de salmuera."
      ]
    },
    {
      slug: "tabla-botanera",
      title: "Tabla botanera de la casa",
      blurb: "Charcutería sencilla con el frasco como centro de la mesa.",
      steps: [
        "Sirve quesos suaves, jamón serrano y pan tostado.",
        "Coloca pepinillos enteros y rebanados en un tazón frío.",
        "Agrega mostaza, aceitunas y almendras tostadas."
      ]
    }
  ],
  en: [
    {
      slug: "chicken-tostada",
      title: "Chicken tostada with pickles",
      blurb: "Bright acidity cuts through rich toppings and upgrades a quick tostada.",
      steps: [
        "Spread beans or chipotle mayo over a crisp tostada.",
        "Top with shredded chicken, sliced pickles, and red onion.",
        "Finish with cilantro and a few drops of brine."
      ]
    },
    {
      slug: "snack-board",
      title: "House snack board",
      blurb: "An easy grazing board with the jar right at the center of the table.",
      steps: [
        "Serve mild cheeses, cured ham, and toasted bread.",
        "Plate whole and sliced pickles in a chilled bowl.",
        "Add mustard, olives, and toasted almonds."
      ]
    }
  ]
};

export const faqs: Record<Locale, FaqItem[]> = {
  es: [
    {
      question: "¿Hacen envíos en todo México?",
      answer:
        "Sí. La tienda está pensada para envíos nacionales en México y se puede ampliar por zonas conforme crece la operación."
    },
    {
      question: "¿Qué hace especial la receta?",
      answer:
        "Cada frasco parte de una receta familiar con equilibrio entre salmuera limpia, especias suaves y textura crujiente."
    },
    {
      question: "¿Puedo pedir por WhatsApp?",
      answer:
        "Sí. WhatsApp funciona como canal directo para dudas, pedidos especiales y seguimiento de mayoreo."
    }
  ],
  en: [
    {
      question: "Do you ship across Mexico?",
      answer:
        "Yes. The first release is designed for domestic Mexico shipping and can expand by region as operations grow."
    },
    {
      question: "What makes the recipe special?",
      answer:
        "Every jar starts from a family recipe built around clean brine, gentle spice, and a crisp bite."
    },
    {
      question: "Can I order through WhatsApp?",
      answer:
        "Yes. WhatsApp is the direct line for questions, special orders, and wholesale conversations."
    }
  ]
};

export const testimonials: Record<Locale, Array<{ quote: string; author: string }>> = {
  es: [
    {
      quote: "Se sienten limpios, elegantes y muy bien pensados para regalar.",
      author: "Clientes de Monterrey"
    },
    {
      quote: "El crunch y la salmuera hacen que cualquier sándwich suba de nivel.",
      author: "Mercados pop-up"
    }
  ],
  en: [
    {
      quote: "They feel clean, elegant, and genuinely gift-ready.",
      author: "Monterrey customers"
    },
    {
      quote: "The crunch and the brine instantly improve a sandwich or board.",
      author: "Pop-up market buyers"
    }
  ]
};

export const storyCards: Record<
  Locale,
  Array<{ kicker: string; title: string; body: string }>
> = {
  es: [
    {
      kicker: "Origen",
      title: "Una receta que ya tenía quién la defendiera",
      body:
        "La marca parte de una receta familiar que no necesita inventarse un relato: ya lo trae en la cocina, en la mesa y en la manera de compartirla."
    },
    {
      kicker: "Operación",
      title: "Lanzamiento ligero, estructura seria",
      body:
        "Next.js y Vercel se encargan de la experiencia. Shopify sostiene catálogo, carrito y checkout para no complicar la operación desde el día uno."
    }
  ],
  en: [
    {
      kicker: "Origin",
      title: "A recipe that already had someone to stand behind it",
      body:
        "The brand starts from a real family recipe, so the story does not need to be manufactured. It already exists in the kitchen and at the table."
    },
    {
      kicker: "Operations",
      title: "Lean launch, serious foundation",
      body:
        "Next.js and Vercel handle the brand experience. Shopify holds the catalog, cart, and checkout so the business can launch without operational overreach."
    }
  ]
};

export const siteCopy = {
  es: {
    localeLabel: "ES / EN",
    nav: [
      { href: "/shop", label: "Tienda" },
      { href: "/about", label: "Nuestra historia" },
      { href: "/recipes", label: "Recetas" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contacto" }
    ],
    announcement: "Envíos en México y atención directa por WhatsApp.",
    hero: {
      eyebrow: "Receta familiar, frasco por frasco",
      title: "Herbet: sabor brillante, etiqueta limpia y una mesa lista para compartir.",
      body:
        "Una tienda Vercel-first para una marca que se siente más botánica y cuidada: lotes pequeños, sabor brillante y un checkout preparado para crecer con Shopify.",
      primaryCta: "Comprar frascos",
      secondaryCta: "Conocer la historia"
    },
    featuredTitle: "Los esenciales de Herbet",
    storyTitle: "Del recetario familiar a una marca que se antoja",
    storyBody:
      "La propuesta mezcla herencia de cocina, diseño cálido y un catálogo corto para vender mejor: menos ruido, más identidad y más razones para volver.",
    socialTitle: "Canales para vender y conversar",
    socialBody:
      "Instagram y Facebook para descubrimiento, WhatsApp para cercanía y Shopify como centro operativo de producto, pedidos y campañas.",
    contactTitle: "Hablemos de pedidos, mayoreo o colaboraciones",
    contactBody: "La tienda vende, pero la marca también tiene que conversar."
  },
  en: {
    localeLabel: "EN / ES",
    nav: [
      { href: "/shop", label: "Shop" },
      { href: "/about", label: "Our story" },
      { href: "/recipes", label: "Recipes" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" }
    ],
    announcement: "Shipping across Mexico with direct WhatsApp support.",
    hero: {
      eyebrow: "Family recipe, jar by jar",
      title: "Herbet: bright pickles, cleaner design, and a table built for sharing.",
      body:
        "A Vercel-first storefront for a more herb-forward, premium pantry brand: small batches, bright flavor, and a Shopify-backed checkout ready to scale.",
      primaryCta: "Shop Herbet",
      secondaryCta: "Read the story"
    },
    featuredTitle: "The Herbet essentials",
    storyTitle: "From family recipe notebook to a brand worth craving",
    storyBody:
      "The concept blends kitchen heritage, warm design, and a tight product catalog so the store can sell with clarity instead of noise.",
    socialTitle: "Channels built for selling and conversation",
    socialBody:
      "Instagram and Facebook drive discovery, WhatsApp keeps the brand close, and Shopify stays at the center of products, orders, and campaigns.",
    contactTitle: "Let’s talk orders, wholesale, or collaborations",
    contactBody: "The store needs to sell, but the brand also needs a direct voice."
  }
} as const;

export function formatMoney(amount: string, currencyCode: string, locale: Locale) {
  return new Intl.NumberFormat(locale === "es" ? "es-MX" : "en-US", {
    style: "currency",
    currency: currencyCode
  }).format(Number(amount));
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${env.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
