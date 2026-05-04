"use server";

import { Resend } from "resend";
import { render } from "@react-email/render";
import { WelcomeEmail } from "@/components/email/WelcomeEmail";

export async function sendEmail(
  formData: FormData,
): Promise<{ success: true } | { success: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const recipient = process.env.CONTACT_EMAIL || "estudiocamaleontuc@gmail.com";
  const from = process.env.SEND_FROM_EMAIL || "estudiocamaleontuc@gmail.com";

  if (!apiKey) {
    const errorMessage = "RESEND_API_KEY no está definida en el entorno.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  try {
    const resend = new Resend(apiKey);
    const html = await render(WelcomeEmail({ name, email, message }));

    await resend.emails.send({
      from,
      to: recipient,
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
