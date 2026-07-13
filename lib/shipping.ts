import type Stripe from "stripe";

import { toMinorUnitAmount } from "@/lib/checkout";

type CheckoutSessionCreateParams = NonNullable<
  Parameters<Stripe["checkout"]["sessions"]["create"]>[0]
>;
type ShippingOption = NonNullable<
  CheckoutSessionCreateParams["shipping_options"]
>[number];

// Montos en unidades mayores (pesos). Edita aquí para ajustar precios/umbral.
export const STANDARD_SHIPPING_MAJOR = 130;
export const EXPRESS_SHIPPING_MAJOR = 180;
export const FREE_SHIPPING_THRESHOLD_MAJOR = 500;

/**
 * Construye las opciones de envío para Stripe Checkout a partir del subtotal
 * del carrito. Cuando el subtotal alcanza el umbral de envío gratis, el envío
 * estándar pasa a $0; el envío express se mantiene como mejora de pago.
 */
export function buildShippingOptions(
  subtotalAmount: number,
  currency: string
): ShippingOption[] {
  const threshold = toMinorUnitAmount(
    String(FREE_SHIPPING_THRESHOLD_MAJOR),
    currency
  );
  const qualifiesForFreeShipping = subtotalAmount >= threshold;
  const stripeCurrency = currency.toLowerCase();

  const standardAmount = qualifiesForFreeShipping
    ? 0
    : toMinorUnitAmount(String(STANDARD_SHIPPING_MAJOR), currency);
  const expressAmount = toMinorUnitAmount(String(EXPRESS_SHIPPING_MAJOR), currency);

  return [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: standardAmount, currency: stripeCurrency },
        display_name: qualifiesForFreeShipping
          ? "Envío estándar (gratis)"
          : "Envío estándar",
        delivery_estimate: {
          minimum: { unit: "business_day", value: 1 },
          maximum: { unit: "business_day", value: 5 }
        }
      }
    },
    {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: { amount: expressAmount, currency: stripeCurrency },
        display_name: "Envío express",
        delivery_estimate: {
          minimum: { unit: "business_day", value: 1 },
          maximum: { unit: "business_day", value: 2 }
        }
      }
    }
  ];
}
