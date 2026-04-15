import { env } from "@/lib/env";
import type { FaqItem, Product, Recipe } from "@/lib/catalog/types";
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

export const catalogProducts: Record<Locale, Product[]> = {
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
      description:
        "El clásico relish de pepino Herbert's: finamente picado, con el balance perfecto entre dulce y ácido para elevar cualquier platillo.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Clásico", "Relish"],
      accent: "from-[#3f6040] to-[#c5b06d]",
      badge: "Clásico",
      size: "277 ml (9.38 oz)",
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
      description:
        "La combinación perfecta del pepino con el toque picante del jalapeño. Para quienes buscan un poco más de carácter en cada bocado.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Picante", "Relish"],
      accent: "from-[#5a3a20] to-[#b85a3a]",
      badge: "Dulce y Picante",
      size: "277 ml (9.38 oz)",
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
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
      badge: "Picante",
      size: "277 ml (9.38 oz)",
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
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
      badge: "Suave y Dulce",
      size: "277 ml (9.38 oz)",
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
    },
    {
      id: "relish-pimientos",
      handle: "relish-pimientos",
      title: "Relish de Pimientos",
      description:
        "Pimientos picantes y con sabor. El relish de pimientos Herbert's transforma cualquier platillo sencillo en algo memorable.",
      price: { amount: "200.00", currencyCode: "MXN" },
      tags: ["Picante", "Relish"],
      accent: "from-[#5a3f6b] to-[#b89d5a]",
      badge: "Exquisito",
      size: "277 ml (9.38 oz)",

      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_ES,
      usage: PLACEHOLDER_USAGE_ES,
      servingSize: PLACEHOLDER_SERVING_ES,
      allergens: "",
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
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
      allergens: "",
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
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
      allergens: "",
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
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
      allergens: "",
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
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
      allergens: "",
    },
    {
      id: "relish-pimientos",
      handle: "pepper-relish",
      title: "Pepper Relish",
      description:
        "Spicy peppers packed with flavor. Herbert's pepper relish turns any simple dish into something memorable.",
      price: { amount: "149.00", currencyCode: "MXN" },
      tags: ["Spicy", "Relish"],
      accent: "from-[#5a3f6b] to-[#b89d5a]",
      badge: "Spicy",
      size: "277 ml (9.38 oz)",
      variantId: "",
      ingredients: PLACEHOLDER_INGREDIENTS_EN,
      usage: PLACEHOLDER_USAGE_EN,
      servingSize: PLACEHOLDER_SERVING_EN,
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
  ],
  en: [
    {
      slug: "herberts-burger",
      title: "Herbert's Burger",
      blurb: "Sweet pickles and pepper relish that turn any burger into something you'll actually remember.",
      steps: [
        "Build your burger with beef, melted cheese, and caramelized onion.",
        "Layer three or four sweet pickle slices directly on the cheese.",
        "Spoon a generous amount of pepper relish over the patty.",
        "Close, press, and eat immediately."
      ]
    },
    {
      slug: "classic-hot-dog",
      title: "Classic hot dog",
      blurb: "Sausage, relish, and pickles — the timeless formula with ingredients that actually pull their weight.",
      steps: [
        "Grill the sausage on a flat pan until golden on both sides.",
        "Open the bun and spread yellow mustard on both sides.",
        "Add pepper relish as the base and sliced pickles on top.",
        "Finish with raw onion and a line of ketchup."
      ]
    },
    {
      slug: "deli-sandwich",
      title: "Deli-style sandwich",
      blurb: "Ham, cheese, and dill pickles — the three things that make a sandwich complete.",
      steps: [
        "Toast the bread in a pan or toaster.",
        "Spread mayo on both slices.",
        "Layer ham, manchego or Swiss cheese, and sliced dill pickles.",
        "Close, cut in half, and serve with extra pickles on the side."
      ]
    },
    {
      slug: "chile-pickle-snack",
      title: "Chile & pickle snack",
      blurb: "The fastest thing in the book: straight from the jar with chili powder, lime, and salt.",
      steps: [
        "Pull whole pickles from the jar and place on a plate.",
        "Dust generously with chili powder.",
        "Squeeze half a lime over the top.",
        "Serve with celery sticks or on its own as an afternoon snack."
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
      quote: "No sabia que los pepinillos dulces eran tan buenos, ahora son mis favoritos.",
      author: "La Pedra"
    },
    {
      quote: "Algo nuevo y delicioso que se disfruta tanto solo como acompañando.",
      author: "El Rafa"
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
        "Next.js y Vercel se encargan de la experiencia. Stripe Checkout y un catálogo local sostienen el flujo comercial sin cargar la operación con más complejidad de la necesaria."
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
        "Next.js and Vercel handle the brand experience. Stripe Checkout and a local catalog keep the launch focused without overbuilding the commerce stack."
    }
  ]
};

export const siteCopy = {
  es: {
    localeLabel: "ES / EN",
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
  },
  en: {
    localeLabel: "EN / ES",
    nav: [
      { href: "#historia", label: "Our Story" },
      { href: "#productos", label: "Products", highlight: true },
      { href: "/recipes", label: "Recipes" },
      { href: "#contacto", label: "Contact" },
      { href: "#tiendas", label: "Find Us At" },
    ],
    announcement: "Shipping across Mexico with direct WhatsApp support.",
    hero: {
      eyebrow: "Family recipe, jar by jar",
      title: "Herbert's: gourmet pickles with classic labeling and a table built for sharing.",
      body:
        "A Vercel-first storefront for a classic gourmet pickle brand: small batches, bright flavor, and a Stripe-powered checkout built to convert cleanly.",
      primaryCta: "Shop Herbert's",
      secondaryCta: "Read the story"
    },
    featuredTitle: "The Herbert's essentials",
    storyTitle: "From family recipe notebook to a brand worth craving",
    storyBody:
      "The concept blends kitchen heritage, warm design, and a tight product catalog so the store can sell with clarity instead of noise.",
    socialTitle: "Channels built for selling and conversation",
    socialBody:
      "Instagram and Facebook drive discovery, WhatsApp keeps the brand close, and Stripe Checkout handles the primary purchase flow.",
    contactTitle: "Let’s talk orders, wholesale, or collaborations",
    contactBody: "The store needs to sell, but the brand also needs a direct voice."
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
