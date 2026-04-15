import { Resend } from "resend";
import { render } from "@react-email/render";
import { OrderConfirmationEmail } from "@/emails/order-confirmation";
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

export async function sendOrderConfirmationEmail(
  props: OrderConfirmationEmailProps
) {
  const subject =
    props.locale === "es"
      ? `Pedido confirmado #${props.orderId.slice(0, 8).toUpperCase()} – Herbert's`
      : `Order confirmed #${props.orderId.slice(0, 8).toUpperCase()} – Herbert's`;

  const html = await render(OrderConfirmationEmail(props));

  const resend = getResend();

  return resend.emails.send({
    from: "Herbert's <onboarding@resend.dev>",
    to: "eugeniopedraza@live.com.mx",
    subject,
    html,
  });
}
