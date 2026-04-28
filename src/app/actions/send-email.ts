"use server";

import { Resend } from "resend";
import { WelcomeEmail } from "@/components/email/WelcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    await resend.emails.send({
      from: "Estudio Camaleón <contacto@estudiocamaleon.ar>", // Requiere dominio verificado
      to: "estudiocamaleontuc@gmail.com",
      subject: `Nueva consulta: ${name}`,
      react: WelcomeEmail({ name, email, message }), // ¡Aquí usamos el diseño!
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
