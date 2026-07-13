"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Todos los campos son obligatorios." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "El correo electrónico no es válido." };
  }

  try {
    await resend.emails.send({
      from: "Herbert's Web <pedidos@herberts.mx>",
      to: "pedidos@herberts.mx",
      replyTo: email,
      subject: `Mensaje de contacto de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });

    return { status: "success" };
  } catch {
    return { status: "error", message: "No pudimos enviar tu mensaje. Inténtalo de nuevo." };
  }
}
