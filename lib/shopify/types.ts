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
