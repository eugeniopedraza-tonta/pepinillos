import { env } from "@/lib/env";
import type { FaqItem, Product, Recipe } from "@/lib/shopify/types";
import type { Locale } from "@/lib/i18n";

export const siteName = "Herbert's";

// Shared placeholder data for products pending full info
const PLACEHOLDER_INGREDIENTS_ES = ["Pepino", "Vinagre", "Azúcar", "Sal", "Especias", "Agua"];
const PLACEHOLDER_INGREDIENTS_EN = ["Cucumber", "Vinegar", "Sugar", "Salt", "Spices", "Water"];
const PLACEHOLDER_USAGE_ES = "Perfectos para acompañar y realzar hamburguesas, hot dogs, tortas y sándwiches o disfrútalos por sí solos como una botana para una experiencia especial.";
const PLACEHOLDER_USAGE_EN = "Perfect for topping and enhancing burgers, hot dogs, sandwiches and tortas, or enjoy them on their own as a special snack.";
const PLACEHOLDER_SERVING_ES = "100 ml";
const PLACEHOLDER_SERVING_EN = "100 ml";

const NUTRITION_FACTS = {
  servingSize: "100 ml",
  energyKcalPerServing: 36,
  energyKcalPerPackage: 170,
  protein: 0.6,
  totalFat: 0.1,
  saturatedFat: 0.0,
  transFat: 0,
  carbohydrates: 8.2,
  sugars: 7.2,
  addedSugars: 6.8,
  fiber: 1.7,
  sodium: 34,
};

export const fallbackProducts: Record<Locale, Product[]> = {
  es: [
    {
      id: "pepinillos-dulces",
      handle: "pepinillos-dulces",
      title: "Pepinillos Dulces",
      description:
        "El inconfundible sabor de Herbert's, elaborado con el corazón del pepino, cuidadosamente seleccionado y equilibrado con especias y un toque dulce que lo hace simplemente irresistible.",
      price: { amount: "250.00", currencyCode: "MXN" },
      tags: ["Dulce", "Más vendido"],
      accent: "from-[#4a5e2f] to-[#b89d5a]",
      badge: "Más vendido",
      size: "473 ml (16 oz)",
      flavorNotes: ["Dulce", "Crujiente", "Especiado"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
    {
      id: "relish-pepino-original",
      handle: "relish-pepino-original",
      title: "Relish Pepino Original",
      description:
        "El clásico relish de pepino Herbert's: finamente picado, con el balance perfecto entre dulce y ácido para elevar cualquier platillo.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Clásico", "Relish"],
      accent: "from-[#3f6040] to-[#c5b06d]",
      badge: "Clásico",
      size: "277 ml (9.38 oz)",
      flavorNotes: ["Dulce", "Ácido", "Fresco"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
    {
      id: "relish-pepino-jalapeno",
      handle: "relish-pepino-jalapeno",
      title: "Relish Pepino con Jalapeño",
      description:
        "La combinación perfecta del pepino con el toque picante del jalapeño. Para quienes buscan un poco más de carácter en cada bocado.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Picante", "Relish"],
      accent: "from-[#5a3a20] to-[#b85a3a]",
      badge: "Picante",
      size: "277 ml (9.38 oz)",
      flavorNotes: ["Picante", "Fresco", "Especiado"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
    {
      id: "relish-jalapeno",
      handle: "relish-jalapeno",
      title: "Relish de Jalapeño",
      description:
        "Intenso, picante y lleno de sabor. El relish de jalapeño puro para los que no le tienen miedo al calor.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Muy picante", "Relish"],
      accent: "from-[#6b2a1a] to-[#c4612a]",
      badge: "Muy picante",
      size: "277 ml (9.38 oz)",
      flavorNotes: ["Muy picante", "Ahumado", "Intenso"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
    {
      id: "relish-cebolla",
      handle: "relish-cebolla",
      title: "Relish de Cebolla",
      description:
        "Suave, dulce y con profundidad. El relish de cebolla Herbert's transforma cualquier platillo sencillo en algo memorable.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Suave", "Relish"],
      accent: "from-[#5a3f6b] to-[#b89d5a]",
      badge: "Suave",
      size: "277 ml (9.38 oz)",
      flavorNotes: ["Dulce", "Suave", "Aromático"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
  ],
  en: [
    {
      id: "pepinillos-dulces",
      handle: "sweet-pickles",
      title: "Sweet Pickles",
      description:
        "The unmistakable Herbert's flavor — made from the heart of the cucumber, carefully selected and balanced with spices and a sweet touch that makes it simply irresistible.",
      price: { amount: "149.00", currencyCode: "MXN" },
      tags: ["Sweet", "Best seller"],
      accent: "from-[#4a5e2f] to-[#b89d5a]",
      badge: "Best seller",
      size: "473 ml (16 oz)",
      flavorNotes: ["Sweet", "Crunchy", "Spiced"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
    {
      id: "relish-pepino-original",
      handle: "original-cucumber-relish",
      title: "Original Cucumber Relish",
      description:
        "The classic Herbert's cucumber relish: finely chopped, with the perfect balance of sweet and tangy to elevate any dish.",
      price: { amount: "149.00", currencyCode: "MXN" },
      tags: ["Classic", "Relish"],
      accent: "from-[#3f6040] to-[#c5b06d]",
      badge: "Classic",
      size: "473 ml (16 oz)",
      flavorNotes: ["Sweet", "Tangy", "Fresh"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
    {
      id: "relish-pepino-jalapeno",
      handle: "cucumber-jalapeno-relish",
      title: "Cucumber Jalapeño Relish",
      description:
        "The perfect pairing of cucumber with a jalapeño kick. For those who want a little more character in every bite.",
      price: { amount: "149.00", currencyCode: "MXN" },
      tags: ["Spicy", "Relish"],
      accent: "from-[#5a3a20] to-[#b85a3a]",
      badge: "Spicy",
      size: "473 ml (16 oz)",
      flavorNotes: ["Spicy", "Fresh", "Bold"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
    {
      id: "relish-jalapeno",
      handle: "jalapeno-relish",
      title: "Jalapeño Relish",
      description:
        "Intense, spicy, and full of flavor. Pure jalapeño relish for those who aren't afraid of the heat.",
      price: { amount: "149.00", currencyCode: "MXN" },
      tags: ["Very spicy", "Relish"],
      accent: "from-[#6b2a1a] to-[#c4612a]",
      badge: "Very spicy",
      size: "473 ml (16 oz)",
      flavorNotes: ["Very spicy", "Smoky", "Intense"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
    {
      id: "relish-cebolla",
      handle: "onion-relish",
      title: "Onion Relish",
      description:
        "Mild, sweet, and deeply flavorful. Herbert's onion relish turns any simple dish into something memorable.",
      price: { amount: "149.00", currencyCode: "MXN" },
      tags: ["Mild", "Relish"],
      accent: "from-[#5a3f6b] to-[#b89d5a]",
      badge: "Mild",
      size: "473 ml (16 oz)",
      flavorNotes: ["Sweet", "Mild", "Aromatic"],
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
      allergens: "",
      nutritionFacts: NUTRITION_FACTS,
    },
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
      { href: "#historia", label: "Nuestra Historia" },
      { href: "/shop", label: "Productos", highlight: true },
      { href: "/recipes", label: "Recetas" },
      { href: "/contact", label: "Contacto" },
    ],
    announcement: "Envíos en México y atención directa por WhatsApp.",
    hero: {
      eyebrow: "Receta familiar, frasco por frasco",
      title: "Herbert's: Productos Gourmet con etiqueta clásica y una mesa lista para compartir.",
      body:
        "Una tienda Vercel-first para una marca con look clásico y gourmet: frascos artesanales, sabor brillante y un checkout preparado para crecer con Shopify.",
      primaryCta: "Comprar frascos",
      secondaryCta: "Conocer la historia"
    },
    featuredTitle: "Los esenciales de Herbert's",
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
      { href: "/shop", label: "Products", highlight: true },
      { href: "/recipes", label: "Recipes" },
      { href: "/contact", label: "Contact" },
      { href: "#historia", label: "Our Story" },
    ],
    announcement: "Shipping across Mexico with direct WhatsApp support.",
    hero: {
      eyebrow: "Family recipe, jar by jar",
      title: "Herbert's: gourmet pickles with classic labeling and a table built for sharing.",
      body:
        "A Vercel-first storefront for a classic gourmet pickle brand: small batches, bright flavor, and a Shopify-backed checkout ready to scale.",
      primaryCta: "Shop Herbert's",
      secondaryCta: "Read the story"
    },
    featuredTitle: "The Herbert's essentials",
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
