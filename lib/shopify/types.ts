export type Money = {
  amount: string;
  currencyCode: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: Money;
  tags: string[];
  image?: {
    url?: string;
    altText?: string | null;
  };
  variantId?: string;
  accent: string;
  badge: string;
  size: string;
  flavorNotes: string[];
  // Extended product details
  ingredients?: string[];
  usage?: string;
  servingSize?: string;
  allergens?: string;
  nutritionFacts?: {
    servingSize: string;
    energyKcalPerServing: number;
    energyKcalPerPackage: number;
    protein: number;
    totalFat: number;
    saturatedFat: number;
    transFat: number;
    carbohydrates: number;
    sugars: number;
    addedSugars: number;
    fiber: number;
    sodium: number; // mg
  };
};

export type Recipe = {
  slug: string;
  title: string;
  blurb: string;
  steps: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};
