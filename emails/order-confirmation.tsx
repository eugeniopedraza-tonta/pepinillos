import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

// ── Types ─────────────────────────────────────────────────────────

export type OrderConfirmationEmailProps = {
  locale: "es" | "en";
  customerName: string | null;
  customerEmail: string;
  orderId: string;
  items: {
    title: string;
    quantity: number;
    unitAmount: number;
    currency: string;
  }[];
  subtotalAmount: number;
  currency: string;
  shippingAddress: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
  } | null;
  shippingName: string | null;
  shippingPhone: string | null;
};

// ── Helpers ───────────────────────────────────────────────────────

function fmt(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "narrowSymbol",
  }).format(cents / 100);
}

// ── Copy ──────────────────────────────────────────────────────────

const copy = {
  es: {
    preview: "Tu pedido ha sido confirmado",
    greeting: (name: string | null) => `Hola${name ? `, ${name}` : ""}`,
    headline: "¡Tu pedido está confirmado!",
    body: "Gracias por tu compra. Hemos recibido tu pedido y comenzaremos a prepararlo.",
    orderRef: "Referencia de pedido",
    products: "Productos",
    qty: "Cant.",
    unitPrice: "Precio unit.",
    total: "Total",
    subtotal: "Subtotal",
    shipsTo: "Dirección de envío",
    contact: "Contacto",
    footer: "Herbert's · Hecho en México · Productos Gourmet",
  },
  en: {
    preview: "Your order has been confirmed",
    greeting: (name: string | null) => `Hi${name ? `, ${name}` : ""}`,
    headline: "Your order is confirmed!",
    body: "Thank you for your purchase. We have received your order and will start preparing it.",
    orderRef: "Order reference",
    products: "Products",
    qty: "Qty",
    unitPrice: "Unit price",
    total: "Total",
    subtotal: "Subtotal",
    shipsTo: "Shipping address",
    contact: "Contact",
    footer: "Herbert's · Made in Mexico · Gourmet Products",
  },
} as const;

// ── Component ─────────────────────────────────────────────────────

export function OrderConfirmationEmail({
  locale = "es",
  customerName,
  orderId,
  items,
  subtotalAmount,
  currency,
  shippingAddress,
  shippingName,
  shippingPhone,
  customerEmail,
}: OrderConfirmationEmailProps) {
  const c = copy[locale];
  const shortId = orderId.slice(0, 8).toUpperCase();

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{c.preview} #{shortId}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>

          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.brandName}>{"HERBERT'S"}</Text>
            <Text style={styles.brandTagline}>Productos Gourmet</Text>
          </Section>

          {/* Hero */}
          <Section style={styles.hero}>
            <Heading style={styles.headline}>{c.headline}</Heading>
            <Text style={styles.greeting}>{c.greeting(customerName)},</Text>
            <Text style={styles.bodyText}>{c.body}</Text>
            <Text style={styles.orderRef}>
              {c.orderRef}: <strong>#{shortId}</strong>
            </Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Order items */}
          <Section style={styles.section}>
            <Text style={styles.sectionTitle}>{c.products}</Text>

            {/* Table header */}
            <Row style={styles.tableHeader}>
              <Column style={{ ...styles.col, width: "50%" }}>
                <Text style={styles.tableHeaderText}>Producto</Text>
              </Column>
              <Column style={{ ...styles.colCenter, width: "15%" }}>
                <Text style={styles.tableHeaderText}>{c.qty}</Text>
              </Column>
              <Column style={{ ...styles.colRight, width: "17%" }}>
                <Text style={styles.tableHeaderText}>{c.unitPrice}</Text>
              </Column>
              <Column style={{ ...styles.colRight, width: "18%" }}>
                <Text style={styles.tableHeaderText}>{c.total}</Text>
              </Column>
            </Row>

            {/* Items */}
            {items.map((item, i) => (
              <Row
                key={i}
                style={i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
              >
                <Column style={{ ...styles.col, width: "50%" }}>
                  <Text style={styles.tableCell}>{item.title}</Text>
                </Column>
                <Column style={{ ...styles.colCenter, width: "15%" }}>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                </Column>
                <Column style={{ ...styles.colRight, width: "17%" }}>
                  <Text style={styles.tableCell}>
                    {fmt(item.unitAmount, item.currency)}
                  </Text>
                </Column>
                <Column style={{ ...styles.colRight, width: "18%" }}>
                  <Text style={{ ...styles.tableCell, fontWeight: "600" }}>
                    {fmt(item.unitAmount * item.quantity, item.currency)}
                  </Text>
                </Column>
              </Row>
            ))}

            {/* Subtotal row */}
            <Row style={styles.subtotalRow}>
              <Column style={{ width: "65%" }} />
              <Column style={{ width: "17%" }}>
                <Text style={styles.subtotalLabel}>{c.subtotal}</Text>
              </Column>
              <Column style={{ width: "18%" }}>
                <Text style={styles.subtotalValue}>
                  {fmt(subtotalAmount, currency)}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={styles.divider} />

          {/* Shipping + contact — side by side on wider clients */}
          <Section style={styles.section}>
            <Row>
              {shippingAddress && (
                <Column style={{ width: "50%", paddingRight: "16px", verticalAlign: "top" }}>
                  <Text style={styles.sectionTitle}>{c.shipsTo}</Text>
                  {shippingName && (
                    <Text style={styles.addressLine}><strong>{shippingName}</strong></Text>
                  )}
                  {shippingAddress.line1 && (
                    <Text style={styles.addressLine}>{shippingAddress.line1}</Text>
                  )}
                  {shippingAddress.line2 && (
                    <Text style={styles.addressLine}>{shippingAddress.line2}</Text>
                  )}
                  {(shippingAddress.city || shippingAddress.state || shippingAddress.postal_code) && (
                    <Text style={styles.addressLine}>
                      {[shippingAddress.city, shippingAddress.state, shippingAddress.postal_code]
                        .filter(Boolean)
                        .join(", ")}
                    </Text>
                  )}
                  {shippingAddress.country && (
                    <Text style={styles.addressLine}>{shippingAddress.country}</Text>
                  )}
                </Column>
              )}

              <Column style={{ width: "50%", verticalAlign: "top" }}>
                <Text style={styles.sectionTitle}>{c.contact}</Text>
                <Text style={styles.addressLine}>{customerEmail}</Text>
                {shippingPhone && (
                  <Text style={styles.addressLine}>{shippingPhone}</Text>
                )}
              </Column>
            </Row>
          </Section>

          <Hr style={styles.divider} />

          {/* Footer */}
          <Section style={styles.footerSection}>
            <Text style={styles.footerText}>{c.footer}</Text>
            <Text style={styles.footerText}>© {new Date().getFullYear()} Herbert&apos;s</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

export default OrderConfirmationEmail;

// ── Styles ────────────────────────────────────────────────────────

const OLIVE = "#333D0D";
const BRASS = "#b89a4a";
const CREAM = "#f2eedf";
const MUTED = "#6b7c62";

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f5f2ea",
    fontFamily: "Georgia, 'Times New Roman', serif",
    margin: 0,
    padding: "32px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    maxWidth: "600px",
    margin: "0 auto",
    overflow: "hidden",
  },
  header: {
    backgroundColor: OLIVE,
    padding: "28px 40px",
    textAlign: "center",
  },
  brandName: {
    color: CREAM,
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    margin: 0,
    lineHeight: "1.2",
  },
  brandTagline: {
    color: BRASS,
    fontSize: "11px",
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    margin: "4px 0 0",
  },
  hero: {
    padding: "36px 40px 28px",
  },
  headline: {
    color: OLIVE,
    fontSize: "26px",
    fontWeight: "700",
    margin: "0 0 16px",
    lineHeight: "1.3",
  },
  greeting: {
    color: OLIVE,
    fontSize: "16px",
    margin: "0 0 8px",
  },
  bodyText: {
    color: MUTED,
    fontSize: "14px",
    lineHeight: "1.7",
    margin: "0 0 16px",
  },
  orderRef: {
    backgroundColor: CREAM,
    borderRadius: "8px",
    color: OLIVE,
    display: "inline-block",
    fontSize: "13px",
    padding: "8px 16px",
    margin: 0,
  },
  divider: {
    borderColor: "#e8e4d8",
    margin: "0 40px",
  },
  section: {
    padding: "28px 40px",
  },
  sectionTitle: {
    color: OLIVE,
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    margin: "0 0 16px",
  },
  tableHeader: {
    backgroundColor: CREAM,
    borderRadius: "6px",
  },
  tableHeaderText: {
    color: MUTED,
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    margin: "8px 6px",
  },
  tableRowEven: {
    backgroundColor: "#ffffff",
  },
  tableRowOdd: {
    backgroundColor: "#faf9f5",
  },
  tableCell: {
    color: OLIVE,
    fontSize: "13px",
    lineHeight: "1.5",
    margin: "10px 6px",
  },
  col: {
    textAlign: "left",
    paddingLeft: "4px",
  },
  colCenter: {
    textAlign: "center",
  },
  colRight: {
    textAlign: "right",
    paddingRight: "4px",
  },
  subtotalRow: {
    borderTop: `1px solid #e8e4d8`,
    marginTop: "4px",
  },
  subtotalLabel: {
    color: MUTED,
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    margin: "12px 6px 0",
    textAlign: "right",
  },
  subtotalValue: {
    color: OLIVE,
    fontSize: "15px",
    fontWeight: "700",
    margin: "12px 4px 0",
    textAlign: "right",
  },
  addressLine: {
    color: MUTED,
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "2px 0",
  },
  footerSection: {
    backgroundColor: CREAM,
    padding: "20px 40px",
    textAlign: "center",
  },
  footerText: {
    color: MUTED,
    fontSize: "11px",
    letterSpacing: "0.12em",
    margin: "4px 0",
  },
};
