"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import { env } from "@/lib/env";
import { buildWhatsAppUrl } from "@/lib/data/site";

type CartItem = {
  id: string;
  handle: string;
  title: string;
  priceAmount: string;
  currencyCode: string;
  variantId?: string;
  quantity: number;
  size: string;
};

type CartContextValue = {
  items: CartItem[];
  cartOpen: boolean;
  itemCount: number;
  subtotal: number;
  checkoutUrl: string;
  canCheckoutWithShopify: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setCartOpen: (value: boolean) => void;
};

const CART_KEY = "pepinillos-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

function buildCheckoutUrl(items: CartItem[]) {
  const hasShopifyCart =
    Boolean(env.publicShopifyStoreDomain) &&
    items.every((item) => Boolean(item.variantId));

  if (hasShopifyCart) {
    const cartPath = items
      .map((item) => `${item.variantId}:${item.quantity}`)
      .join(",");
    return `https://${env.publicShopifyStoreDomain}/cart/${cartPath}`;
  }

  const summary = items
    .map((item) => `- ${item.title} x${item.quantity}`)
    .join("\n");
  return buildWhatsAppUrl(
    `Hola, quiero pedir lo siguiente:\n${summary}\n\n¿Me ayudan con el siguiente paso?`
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CART_KEY);
    const frame = window.requestAnimationFrame(() => {
      if (stored) {
        setItems(JSON.parse(stored) as CartItem[]);
      }
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + Number(item.priceAmount) * item.quantity,
      0
    );

    return {
      items,
      cartOpen,
      itemCount,
      subtotal,
      checkoutUrl: buildCheckoutUrl(items),
      canCheckoutWithShopify:
        Boolean(env.publicShopifyStoreDomain) &&
        items.length > 0 &&
        items.every((item) => Boolean(item.variantId)),
      addItem: (incoming) => {
        setItems((current) => {
          const match = current.find((item) => item.id === incoming.id);
          if (match) {
            return current.map((item) =>
              item.id === incoming.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          return [...current, { ...incoming, quantity: 1 }];
        });
        setCartOpen(true);
      },
      removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
      updateQuantity: (id, quantity) =>
        setItems((current) =>
          quantity <= 0
            ? current.filter((item) => item.id !== id)
            : current.map((item) => (item.id === id ? { ...item, quantity } : item))
        ),
      setCartOpen
    };
  }, [cartOpen, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
