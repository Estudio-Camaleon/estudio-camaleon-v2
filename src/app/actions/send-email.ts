"use server";

import { Resend } from "resend";
import { WelcomeEmail } from "@/components/email/WelcomeEmail";

export async function sendEmail(
  formData: FormData,
): Promise<{ success: true } | { success: false; error: any }> {
  const apiKey = process.env.RESEND_API_KEY;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const recipient = process.env.CONTACT_EMAIL || "estudiocamaleontuc@gmail.com";
  const from =
    process.env.SEND_FROM_EMAIL || "Estudio Camaleón <estudiocamaleontuc@gmail.com>";

  if (!apiKey) {
    const error = new Error("RESEND_API_KEY no está definida en el entorno.");
    console.error(error);
    return { success: false, error };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: recipient,
      subject: `Nueva consulta: ${name}`,
      react: WelcomeEmail({ name, email, message }),
    });
    return { success: true };
  } catch (error) {
    console.error("sendEmail error:", error);
    return { success: false, error };
  }
}
