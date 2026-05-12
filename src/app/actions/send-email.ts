"use server";

import { Resend } from "resend";
import { WelcomeEmail } from "@/components/email/WelcomeEmail";
import { ProjectInquiryEmail } from "@/components/email/ProjectInquiryEmail";

const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
]);

interface EmailData {
  // Simple contact form
  name?: string;
  email?: string;
  message?: string;
  
  // Professional contact form
  fullName?: string;
  phoneRegion?: string;
  phone?: string;
  company?: string;
  projectType?: string;
  hasCodeBase?: string;
  projectDescription?: string;
  howDidYouKnowUs?: string;
}

export async function sendEmail(
  formData: FormData,
): Promise<{ success: true } | { success: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  
  // Detectar qué tipo de formulario es
  const isProfessionalForm = formData.has("fullName");
  
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

  try {
    const resend = new Resend(apiKey);
    let html: string;
    let subject: string;
    let email: string;
    const attachments: Array<{ filename: string; content: Buffer }> = [];

    const files = formData.getAll("files").filter((value) => value instanceof File);

    for (const value of files) {
      const file = value as File;

      if (file.size === 0) {
        continue;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return {
          success: false,
          error: `El archivo \"${file.name}\" supera el límite de 4MB.`,
        };
      }

      if (file.type && !ALLOWED_FILE_TYPES.has(file.type)) {
        return {
          success: false,
          error: `Tipo de archivo no permitido: ${file.name}.`,
        };
      }

      const bytes = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(bytes),
      });
    }

    if (isProfessionalForm) {
      // Formulario profesional
      const fullName = String(formData.get("fullName") || "").trim();
      email = String(formData.get("email") || "").trim();
      const phoneRegion = String(formData.get("phoneRegion") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const company = String(formData.get("company") || "").trim();
      const projectType = String(formData.get("projectType") || "").trim();
      const hasCodeBase = String(formData.get("hasCodeBase") || "").trim();
      const projectDescription = String(formData.get("projectDescription") || "").trim();
      const howDidYouKnowUs = String(formData.get("howDidYouKnowUs") || "").trim();

      if (!fullName || !email || !projectDescription) {
        return {
          success: false,
          error: "Faltan datos obligatorios: nombre, email o descripción del proyecto.",
        };
      }

      const emailData: EmailData = {
        fullName,
        email,
        phoneRegion,
        phone,
        company,
        projectType,
        hasCodeBase,
        projectDescription,
        howDidYouKnowUs,
      };

      html = ProjectInquiryEmail(emailData);
      subject = `Nueva solicitud de proyecto: ${fullName}`;
    } else {
      // Formulario simple (legacy)
      const name = String(formData.get("name") || "").trim();
      email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !message) {
        return {
          success: false,
          error: "Faltan datos obligatorios: nombre, email o mensaje.",
        };
      }

      html = WelcomeEmail({ name, email, message });
      subject = `Nueva consulta: ${name}`;
    }

    await resend.emails.send({
      from,
      to: recipient,
      replyTo: email,
      subject,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
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
