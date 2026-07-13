import { env } from "@/lib/env";
import type { FaqItem, Product, Recipe } from "@/lib/catalog/types";
import type { Locale } from "@/lib/i18n";

export const siteName = "Herbert's";

// Shared placeholder data for products pending full info
const PLACEHOLDER_INGREDIENTS_ES = ["Pepino", "Vinagre", "Azúcar", "Sal", "Especias", "Agua"];
const PLACEHOLDER_USAGE_ES = "Perfectos para acompañar y realzar hamburguesas, hot dogs, tortas y sándwiches o disfrútalos por sí solos como una botana para una experiencia especial.";
const PLACEHOLDER_SERVING_ES = "100 ml";

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

export const catalogProducts: Record<Locale, Product[]> = {
  es: [
    {
      id: "pepinillos-dulces",
      handle: "pepinillos-dulces",
      title: "Pepinillos Dulces",
      image: { url: "/pepinillos_tradicional.png", altText: "Pepinillos Dulces", width: 200, height: 100 },
      description:
        "El inconfundible sabor de Herbert's, elaborado con el corazón del pepino, cuidadosamente seleccionado y equilibrado con especias y un toque dulce que lo hace simplemente irresistible.",
      price: { amount: "250.00", currencyCode: "MXN" },
      tags: ["Dulce", "Más vendido"],
      accent: "from-[#4a5e2f] to-[#b89d5a]",
      badge: "Más vendido",
      size: "473 g",   
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
      title: "Relish de Pepino Original",
      image: { url: "/pepinillos_tradicional.png", altText: "Relish de Pepino Original", width: 200, height: 100 },
      description:
        "El clásico relish de pepino Herbert's: finamente picado, con el balance perfecto entre dulce y ácido para elevar cualquier platillo.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Clásico", "Relish"],
      accent: "from-[#3f6040] to-[#c5b06d]",
      badge: "Clásico",
      size: "277 g",
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
    },
    {
      id: "relish-pepino-jalapeno",
      handle: "relish-pepino-jalapeno",
      title: "Relish de Pepino con Jalapeño",
      image: { url: "/pepinillo_jala.png", altText: "Relish de Pepino con Jalapeño", width: 400, height: 100 },
      description:
        "La combinación perfecta del pepino con el toque picante del jalapeño. Para quienes buscan un poco más de carácter en cada bocado.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Picante", "Relish"],
      accent: "from-[#5a3a20] to-[#b85a3a]",
      badge: "Dulce y Picante",
      size: "277 g",
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
    },
    {
      id: "relish-jalapeno",
      handle: "relish-jalapeno",
      title: "Relish de Jalapeño con Cebolla",
      image: { url: "/jalapeno_cebolla.png", altText: "Relish de Jalapeño", width: 560, height: 400 },
      description:
        "Intenso, picante y lleno de sabor. El relish de jalapeño puro para los que no le tienen miedo al calor.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Muy picante", "Relish"],
      accent: "from-[#6b2a1a] to-[#c4612a]",
      badge: "Picante",
      size: "277 g",
      variantId: "",

      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
    },
    {
      id: "relish-cebolla",
      handle: "relish-cebolla",
      title: "Relish de Cebolla Dulce",
      image: { url: "/cebolla_dulce.png", altText: "Relish de Cebolla", width: 400, height: 100 },
      description:
        "Suave, dulce y con profundidad. El relish de cebolla Herbert's transforma cualquier platillo sencillo en algo memorable.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Suave", "Relish"],
      accent: "from-[#5a3f6b] to-[#b89d5a]",
      badge: "Suave y Dulce",
      size: "277 g",
      variantId: "",

      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
    },
    {
      id: "relish-pimientos",
      handle: "relish-pimientos",
      title: "Relish de Pimientos con Jalapeños",
      image: { url: "/pimientos_jala.png", altText: "Relish de Pimientos con Jalapeños", width: 400, height: 100 },
      description:
        "Pimientos picantes y con sabor. El relish de pimientos Herbert's transforma cualquier platillo sencillo en algo memorable.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Picante", "Relish"],
      accent: "from-[#5a3f6b] to-[#b89d5a]",
      badge: "Exquisito",
      size: "277 g",
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
    },
  ]
};

export const recipes: Record<Locale, Recipe[]> = {
  es: [
    {
      slug: "hamburguesa-herberts",
      title: "Hamburguesa Herbert's",
      blurb: "Pepinillos dulces y relish de pimientos que convierten cualquier hamburguesa en algo que no olvidas.",
      steps: [
        "Arma tu hamburguesa con carne, queso derretido y cebolla caramelizada.",
        "Coloca tres o cuatro rebanadas de pepinillos dulces sobre el queso.",
        "Añade una cucharada generosa de relish de pimientos encima de la carne.",
        "Cierra, presiona y come de inmediato."
      ]
    },
    {
      slug: "hot-dog-de-feria",
      title: "Hot dog alemán",
      blurb: "Salchicha, relish y pepinillos: la fórmula de siempre con ingredientes que sí valen la pena.",
      steps: [
        "Calienta la salchicha a la plancha hasta que dore por ambos lados.",
        "Abre el pan y unta mostaza amarilla en ambas caras.",
        "Agrega relish de pimientos como base y pepinillos rebanados encima.",
        "Termina con cebolla cruda y una línea de kétchup."
      ]
    },
    {
      slug: "sandwich-clasico",
      title: "Sándwich de temporada",
      blurb: "Jamón, queso y pepinillos: el trío que hace que un sándwich no necesite nada más.",
      steps: [
        "Tuesta el pan en comal o tostador.",
        "Unta mayonesa en ambas rebanadas.",
        "Rellena con jamón, queso manchego y pepinillos dill rebanados.",
        "Cierra, parte a la mitad y sirve con más pepinillos al lado."
      ]
    },
    {
      slug: "pepinillos-enchilados",
      title: "Pepinillos enchilados",
      blurb: "El snack más rápido del recetario: sacan del frasco directo al plato con chile en polvo.",
      steps: [
        "Saca pepinillos enteros del frasco y colócalos en un plato.",
        "Espolvorea chile en polvo al gusto — generoso.",
        "Exprime medio limón encima.",
        "Sirve con palitos de apio o solo, como botanita de la tarde."
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
  ]
};

export const testimonials: Record<Locale, Array<{ quote: string; author: string }>> = {
  es: [
    {
      quote: "No sabia que los pepinillos dulces eran tan buenos, ahora son mis favoritos.",
      author: "La Pedra"
    },
    {
      quote: "Algo nuevo y delicioso que se disfruta tanto solo como acompañando.",
      author: "El Rafa"
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
        "Next.js y Vercel se encargan de la experiencia. Stripe Checkout y un catálogo local sostienen el flujo comercial sin cargar la operación con más complejidad de la necesaria."
    }
  ]
};

export const siteCopy = {
  es: {
    localeLabel: "ES",
    nav: [
      { href: "#historia", label: "Nuestra Historia" },
      { href: "#productos", label: "Productos", highlight: true },
      { href: "/recipes", label: "Recetas" },
      { href: "#contacto", label: "Contacto" },
      { href: "#tiendas", label: "Encuéntranos En" },
    ],
    announcement: "Envíos en México y atención directa por Whatsapp.",
    hero: {
      eyebrow: "Receta familiar, frasco por frasco",
      title: "Herbert's: Productos Gourmet con etiqueta clásica y una mesa lista para compartir.",
      body:
        "Una tienda Vercel-first para una marca con look clásico y gourmet: frascos artesanales, sabor brillante y un checkout con Stripe listo para vender desde el carrito.",
      primaryCta: "Comprar frascos",
      secondaryCta: "Conocer la historia"
    },
    featuredTitle: "Los esenciales de Herbert's",
    storyTitle: "Del recetario familiar a una marca que se antoja",
    storyBody:
      "La propuesta mezcla herencia de cocina, diseño cálido y un catálogo corto para vender mejor: menos ruido, más identidad y más razones para volver.",
    socialTitle: "Canales para vender y conversar",
    socialBody:
      "Instagram y Facebook para descubrimiento, WhatsApp para cercanía y Stripe Checkout como el cierre de compra principal.",
    contactTitle: "Hablemos de pedidos, mayoreo o colaboraciones",
    contactBody: ""
  }
} as const;

export function formatMoney(amount: string, currencyCode: string, _locale?: Locale) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(Number(amount));
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${env.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
