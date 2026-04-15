import { Resend } from "resend";
import type { OrderConfirmationEmailProps } from "@/emails/order-confirmation";

let resendClient: Resend | undefined;

function getResend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set.");
    resendClient = new Resend(key);
  }
  return resendClient;
}

function fmt(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "narrowSymbol",
  }).format(cents / 100);
}

function buildHtml(props: OrderConfirmationEmailProps): string {
  const {
    customerName,
    customerEmail,
    orderId,
    items,
    subtotalAmount,
    currency,
    shippingAddress,
    shippingName,
    shippingPhone,
  } = props;

  const shortId = orderId.slice(0, 8).toUpperCase();

  const itemRows = items
    .map(
      (item) => `
            <tr>
              <td style="text-align:left;padding:10px 6px;color:#333D0D;font-size:13px;line-height:1.5;">${item.title}</td>
              <td style="text-align:center;padding:10px 6px;color:#333D0D;font-size:13px;">${item.quantity}</td>
              <td style="text-align:right;padding:10px 6px;color:#333D0D;font-size:13px;">${fmt(item.unitAmount, item.currency)}</td>
              <td style="text-align:right;padding:10px 6px;color:#333D0D;font-size:13px;font-weight:600;">${fmt(item.unitAmount * item.quantity, item.currency)}</td>
            </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tu pedido está confirmado</title>
  </head>
  <body style="margin:0;padding:32px 0;background-color:#f5f2ea;font-family:Georgia,'Times New Roman',serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f2ea;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;">

            <!-- HEADER -->
            <tr>
              <td style="background-color:#333D0D;padding:28px 40px;text-align:center;">
                <p style="color:#f2eedf;font-size:26px;font-weight:700;letter-spacing:0.12em;margin:0;line-height:1.2;">HERBERT'S</p>
                <p style="color:#b89a4a;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;margin:4px 0 0;">Productos Gourmet</p>
              </td>
            </tr>

            <!-- HERO -->
            <tr>
              <td style="padding:36px 40px 28px;">
                <h1 style="color:#333D0D;font-size:26px;font-weight:700;margin:0 0 16px;line-height:1.3;">¡Tu pedido está confirmado!</h1>
                <p style="color:#333D0D;font-size:16px;margin:0 0 8px;">Hola, <strong>${customerName ?? "cliente"}</strong>,</p>
                <p style="color:#6b7c62;font-size:14px;line-height:1.7;margin:0 0 16px;">Gracias por tu compra. Hemos recibido tu pedido y comenzaremos a prepararlo.</p>
                <p style="background-color:#f2eedf;border-radius:8px;color:#333D0D;display:inline-block;font-size:13px;padding:8px 16px;margin:0;">
                  Referencia de pedido: <strong>#${shortId}</strong>
                </p>
              </td>
            </tr>

            <!-- DIVIDER -->
            <tr>
              <td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e8e4d8;margin:0;" /></td>
            </tr>

            <!-- PRODUCTS TABLE -->
            <tr>
              <td style="padding:28px 40px;">
                <p style="color:#333D0D;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 16px;">Productos</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <thead>
                    <tr style="background-color:#f2eedf;">
                      <th style="text-align:left;padding:8px 6px;color:#6b7c62;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;width:50%;">Producto</th>
                      <th style="text-align:center;padding:8px 6px;color:#6b7c62;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;width:15%;">Cant.</th>
                      <th style="text-align:right;padding:8px 6px;color:#6b7c62;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;width:17%;">Precio unit.</th>
                      <th style="text-align:right;padding:8px 6px;color:#6b7c62;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;width:18%;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemRows}
                  </tbody>
                  <tfoot>
                    <tr style="border-top:1px solid #e8e4d8;">
                      <td colspan="2" style="padding:12px 6px 0;"></td>
                      <td style="text-align:right;padding:12px 6px 0;color:#6b7c62;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">Subtotal</td>
                      <td style="text-align:right;padding:12px 4px 0;color:#333D0D;font-size:15px;font-weight:700;">${fmt(subtotalAmount, currency)}</td>
                    </tr>
                  </tfoot>
                </table>
              </td>
            </tr>

            <!-- DIVIDER -->
            <tr>
              <td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e8e4d8;margin:0;" /></td>
            </tr>

            <!-- SHIPPING + CONTACT -->
            <tr>
              <td style="padding:28px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width:50%;vertical-align:top;padding-right:16px;">
                      <p style="color:#333D0D;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 16px;">Dirección de envío</p>
                      ${shippingName ? `<p style="color:#6b7c62;font-size:13px;line-height:1.6;margin:2px 0;"><strong style="color:#333D0D;">${shippingName}</strong></p>` : ""}
                      ${shippingAddress?.line1 ? `<p style="color:#6b7c62;font-size:13px;line-height:1.6;margin:2px 0;">${shippingAddress.line1}</p>` : ""}
                      ${shippingAddress?.line2 ? `<p style="color:#6b7c62;font-size:13px;line-height:1.6;margin:2px 0;">${shippingAddress.line2}</p>` : ""}
                      ${shippingAddress?.city || shippingAddress?.state || shippingAddress?.postal_code ? `<p style="color:#6b7c62;font-size:13px;line-height:1.6;margin:2px 0;">${[shippingAddress?.city, shippingAddress?.state, shippingAddress?.postal_code].filter(Boolean).join(", ")}</p>` : ""}
                      ${shippingAddress?.country ? `<p style="color:#6b7c62;font-size:13px;line-height:1.6;margin:2px 0;">${shippingAddress.country}</p>` : ""}
                    </td>
                    <td style="width:50%;vertical-align:top;">
                      <p style="color:#333D0D;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 16px;">Contacto</p>
                      <p style="color:#6b7c62;font-size:13px;line-height:1.6;margin:2px 0;">${customerEmail}</p>
                      ${shippingPhone ? `<p style="color:#6b7c62;font-size:13px;line-height:1.6;margin:2px 0;">${shippingPhone}</p>` : ""}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- DIVIDER -->
            <tr>
              <td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e8e4d8;margin:0;" /></td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color:#f2eedf;padding:20px 40px;text-align:center;">
                <p style="color:#6b7c62;font-size:11px;letter-spacing:0.12em;margin:4px 0;">Herbert's · Hecho en México · Productos Gourmet</p>
                <p style="color:#6b7c62;font-size:11px;letter-spacing:0.12em;margin:4px 0;">© ${new Date().getFullYear()} Herbert's</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendOrderConfirmationEmail(
  props: OrderConfirmationEmailProps
) {
  const subject =
    props.locale === "es"
      ? `Pedido confirmado #${props.orderId.slice(0, 8).toUpperCase()} – Herbert's`
      : `Order confirmed #${props.orderId.slice(0, 8).toUpperCase()} – Herbert's`;

  const html = buildHtml(props);
  const resend = getResend();

  return resend.emails.send({
    from: "Herbert's <pedidos@herberts.mx>",
    to: props.customerEmail,
    subject,
    html,
  });
}
