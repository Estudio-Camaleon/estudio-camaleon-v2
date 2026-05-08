"use server";

import { Resend } from "resend";
import { render } from "@react-email/render";
import { WelcomeEmail } from "@/components/email/WelcomeEmail";

export async function sendEmail(
  formData: FormData,
): Promise<{ success: true } | { success: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const recipient =
    process.env.CONTACT_EMAIL?.trim() || "estudiocamaleontuc@gmail.com";
  const configuredFrom = process.env.SEND_FROM_EMAIL?.trim();
  const from =
    !configuredFrom || configuredFrom.toLowerCase().endsWith("@gmail.com")
      ? "onboarding@resend.dev"
      : configuredFrom;

  if (!apiKey) {
    const errorMessage = "RESEND_API_KEY no está definida en el entorno.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  if (!name || !email || !message) {
    return {
      success: false,
      error: "Faltan datos obligatorios: nombre, email o mensaje.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const html = await render(WelcomeEmail({ name, email, message }));

    await resend.emails.send({
      from,
      to: recipient,
      replyTo: email,
      subject: `Nueva consulta: ${name}`,
      html,
    });
    return { success: true };
  } catch (unknownError) {
    const errorMessage =
      unknownError instanceof Error
        ? unknownError.message
        : String(unknownError);
    console.error("sendEmail error:", unknownError);
    return { success: false, error: errorMessage };
  }
}
