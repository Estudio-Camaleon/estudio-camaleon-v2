"use server";

import { readFile } from "fs/promises";
import path from "path";
import { Resend } from "resend";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // Sincronizado a 5MB con el formulario cliente
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

const INQUIRY_IMAGE_CONTENT_ID = "inquiry-hero-image";
const INQUIRY_LOGO_CONTENT_ID = "inquiry-logo";

// Diccionarios de mapeo estético para la lectura clara de datos del Briefing
const PROJECT_TYPES: Record<string, string> = {
  landing_express: "Landing Page Express (Económica/Rápida)",
  web_high_end: "Web High-End Personalizada",
  ecommerce: "E-commerce / Tienda Online",
  saas: "SaaS / Plataforma Digital",
  mobile: "App Mobile (iOS / Android)",
};

const BUDGET_RANGES: Record<string, string> = {
  rango_bajo: "Menos de $1,000 USD",
  rango_medio: "$1,000 - $2,500 USD",
  rango_alto: "$2,500 - $5,000 USD",
  rango_premium: "$5,000 USD o más",
};

const DELIVERY_DEADLINES: Record<string, string> = {
  urgente: "Urgente (Menos de 3 semanas)",
  mes_aprox: "Aproximadamente 1 mes",
  estandar: "De 1 a 3 meses (Recomendado)",
  flexible: "Flexible / Sin prisa",
};

const CODEBASE_STATES: Record<string, string> = {
  desde_cero: "No, necesitamos arrancar de cero",
  solo_diseno: "Sí, tenemos el diseño (Figma / Adobe XD)",
  codigo_existente: "Sí, tenemos una base de código / MVP funcional",
};

const DOMAIN_STATES: Record<string, string> = {
  si_registrado: "Sí, ya lo tengo comprado y registrado",
  no_necesito: "No, necesito asesoramiento / gestión",
};

const ACQUISITION_CHANNELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  google: "Búsqueda en Google",
  recomendacion: "Recomendación / Boca en boca",
  otro: "Otro medio",
};

function getInquiryEmailImagePath() {
  return path.join(
    process.cwd(),
    "public",
    "images",
    "mascota",
    "ChatGPT_Image_8_may_2026_05_16_34_p.m..png",
  );
}

function getInquiryEmailLogoPath() {
  return path.join(process.cwd(), "public", "icons", "Logowebjunto.svg");
}

async function getInquiryEmailImageAttachment() {
  const imagePath = getInquiryEmailImagePath();
  const bytes = await readFile(imagePath);

  return {
    filename: "ChatGPT_Image_8_may_2026_05_16_34_p.m..png",
    content: bytes,
    contentType: "image/png",
    contentId: INQUIRY_IMAGE_CONTENT_ID,
  };
}

async function getInquiryEmailLogoAttachment() {
  const logoPath = getInquiryEmailLogoPath();
  const bytes = await readFile(logoPath);

  return {
    filename: "Logowebjunto.svg",
    content: bytes,
    contentType: "image/svg+xml",
    contentId: INQUIRY_LOGO_CONTENT_ID,
  };
}

export async function sendEmail(
  formData: FormData,
): Promise<{ success: true } | { success: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  // Detectar el tipo de formulario entrante
  const isProfessionalForm = formData.has("fullName");

  const recipient =
    process.env.CONTACT_EMAIL?.trim() || "estudiocamaleontuc@gmail.com";
  const configuredFrom = process.env.SEND_FROM_EMAIL?.trim();
  const from =
    !configuredFrom || configuredFrom.toLowerCase().endsWith("@gmail.com")
      ? "onboarding@resend.dev"
      : configuredFrom;

  if (!apiKey) {
    const errorMessage =
      "RESEND_API_KEY no está definida en las variables de entorno del servidor.";
    console.error(errorMessage);
    return { success: false, error: errorMessage };
  }

  try {
    const resend = new Resend(apiKey);
    let html: string;
    let subject: string;
    let email: string;

    const attachments: Array<{
      filename: string;
      content: Buffer;
      contentType?: string;
      contentId?: string;
    }> = [];

    // Procesamiento y validación binaria de adjuntos múltiples
    const files = formData
      .getAll("files")
      .filter((value) => value instanceof File);

    for (const value of files) {
      const file = value as File;

      if (file.size === 0) continue;

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return {
          success: false,
          error: `El archivo adjunto "${file.name}" excede la cuota máxima permitida de 5MB.`,
        };
      }

      if (file.type && !ALLOWED_FILE_TYPES.has(file.type)) {
        return {
          success: false,
          error: `Extensión o formato de archivo no permitido: ${file.name}.`,
        };
      }

      const bytes = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(bytes),
      });
    }

    if (isProfessionalForm) {
      // 💼 DETECTADO: FORMULARIO PROFESIONAL COMPLETO (Briefing de Alto Impacto)
      const fullName = String(formData.get("fullName") || "").trim();
      email = String(formData.get("email") || "").trim();
      const phoneRegion = String(formData.get("phoneRegion") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const company = String(formData.get("company") || "").trim();
      const projectTypeRaw = String(formData.get("projectType") || "").trim();
      const estimatedBudgetRaw = String(
        formData.get("estimatedBudget") || "",
      ).trim();
      const deliveryDeadlineRaw = String(
        formData.get("deliveryDeadline") || "",
      ).trim();
      const hasCodeBaseRaw = String(formData.get("hasCodeBase") || "").trim();
      const hasDomainRaw = String(formData.get("hasDomain") || "").trim();
      const projectDescription = String(
        formData.get("projectDescription") || "",
      ).trim();
      const howDidYouKnowUsRaw = String(
        formData.get("howDidYouKnowUs") || "",
      ).trim();

      if (!fullName || !email || !projectDescription || !projectTypeRaw) {
        return {
          success: false,
          error:
            "Validación de servidor rechazada: Faltan estructurar campos requeridos obligatorios.",
        };
      }

      // Convertir valores crudos a texto amigable para la lectura del equipo humano
      const projectType = PROJECT_TYPES[projectTypeRaw] || projectTypeRaw;
      const estimatedBudget =
        BUDGET_RANGES[estimatedBudgetRaw] || estimatedBudgetRaw;
      const deliveryDeadline =
        DELIVERY_DEADLINES[deliveryDeadlineRaw] || deliveryDeadlineRaw;
      const hasCodeBase = CODEBASE_STATES[hasCodeBaseRaw] || hasCodeBaseRaw;
      const hasDomain = DOMAIN_STATES[hasDomainRaw] || hasDomainRaw;
      const howDidYouKnowUs =
        ACQUISITION_CHANNELS[howDidYouKnowUsRaw] || howDidYouKnowUsRaw;

      // Adjuntar la iconografía y assets fijos incrustados
      attachments.push(await getInquiryEmailImageAttachment());
      attachments.push(await getInquiryEmailLogoAttachment());

      subject = `💼 Nuevo Briefing de Proyecto: ${fullName} (${company || "Particular"})`;

      html = `
        <div style="font-family: 'Montserrat', 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #0d1410; color: #ffffff; padding: 30px; max-width: 650px; margin: 0 auto;">
          <div style="background-color: #131f18; border: 1px solid #2a372f; padding: 35px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            
            <!-- Branding Header -->
            <div style="text-align: center; margin-bottom: 24px;">
              <img src="cid:${INQUIRY_LOGO_CONTENT_ID}" alt="Estudio Camaleón" style="max-height: 45px; width: auto;" />
            </div>

            <!-- Mascota / Banner Integrado -->
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="cid:${INQUIRY_IMAGE_CONTENT_ID}" alt="Briefing Camaleón" style="width: 100%; max-width: 440px; height: auto; border-radius: 16px; border: 1px solid #2a372f;" />
            </div>

            <div style="text-align: center; margin-bottom: 28px;">
              <span style="background-color: rgba(46, 204, 112, 0.1); color: #2ecc70; padding: 6px 16px; border-radius: 9999px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(46, 204, 112, 0.2);">
                MUTACIÓN EN MARCHA • BRIEFING DE NEGOCIO
              </span>
              <h2 style="color: #ffffff; margin-top: 15px; margin-bottom: 5px; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">
                ¡Ficha de Requerimientos Recibida!
              </h2>
            </div>

            <!-- Estructura de Datos Técnicos y Financieros -->
            <div style="background-color: #16221b; padding: 24px; border-radius: 16px; border: 1px solid #2a372f; margin-bottom: 24px; font-size: 14px; line-height: 1.6;">
              <h4 style="margin: 0 0 15px 0; color: #2ecc70; font-size: 12px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid #2a372f; padding-bottom: 6px;">
                Información de contacto y alcance
              </h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; width: 40%; font-weight: 700; font-size: 11px; text-transform: uppercase;">Líder de Proyecto:</td>
                  <td style="padding: 6px 0; color: #ffffff; font-weight: bold;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-weight: 700; font-size: 11px; text-transform: uppercase;">Email:</td>
                  <td style="padding: 6px 0; color: #2ecc70; font-weight: bold;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-weight: 700; font-size: 11px; text-transform: uppercase;">WhatsApp:</td>
                  <td style="padding: 6px 0; color: #ffffff;">${phoneRegion} ${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-weight: 700; font-size: 11px; text-transform: uppercase;">Compañía / Marca:</td>
                  <td style="padding: 6px 0; color: #ffffff;">${company || "Particular / Startup independiente"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-weight: 700; font-size: 11px; text-transform: uppercase;">Servicio Solicitado:</td>
                  <td style="padding: 6px 0; color: #2ecc70; font-weight: bold;">${projectType}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-weight: 700; font-size: 11px; text-transform: uppercase;">Inversión Estimada:</td>
                  <td style="padding: 6px 0; color: #ffffff; font-weight: bold; background-color: rgba(46, 204, 112, 0.05); padding-left: 6px; border-radius: 4px;">${estimatedBudget}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-weight: 700; font-size: 11px; text-transform: uppercase;">Plazo Deseado:</td>
                  <td style="padding: 6px 0; color: #ffffff;">${deliveryDeadline}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-weight: 700; font-size: 11px; text-transform: uppercase;">¿Tiene Código/Diseño?:</td>
                  <td style="padding: 6px 0; color: #ffffff;">${hasCodeBase}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8; font-weight: 700; font-size: 11px; text-transform: uppercase;">¿Disponibilidad Dominio?:</td>
                  <td style="padding: 6px 0; color: #ffffff;">${hasDomain}</td>
                </tr>
              </table>
            </div>

            <!-- Descripción Operativa -->
            <div style="background-color: #0d1410; padding: 24px; border-radius: 16px; border: 1px solid #2a372f; border-left: 4px solid #2ecc70; margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #2ecc70; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                Visión del Proyecto y Objetivos:
              </p>
              <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                ${projectDescription}
              </p>
            </div>

            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 24px 0 0 0;">
              Canal de Adquisición: <span style="color: #ffffff; font-weight: bold;">${howDidYouKnowUs}</span>
            </p>

            <!-- Adjuntos Notificación -->
            ${
              attachments.length > 2
                ? `
              <div style="margin-top: 20px; padding: 12px; background-color: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed #2a372f; text-align: center; font-size: 12px; color: #94a3b8;">
                📎 Este correo contiene <strong>${attachments.length - 2}</strong> archivo(s) de referencia adjunto(s).
              </div>
            `
                : ""
            }

            <!-- Footer Corporativo -->
            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #2a372f; padding-top: 24px;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0; font-weight: 600;">
                © 2026 <span style="color: #2ecc70;">Estudio Camaleón</span>. Panel de Automatización Core.
              </p>
            </div>
          </div>
        </div>
      `;
    } else {
      // 💬 DETECTADO: FORMULARIO SIMPLE / CONSULTA TRADICIONAL (Legacy / Rápido)
      const name = String(formData.get("name") || "").trim();
      email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !message) {
        return {
          success: false,
          error:
            "Faltan parámetros básicos de procesamiento obligatorio en el formulario abreviado.",
        };
      }

      subject = `💬 Nueva consulta rápida de: ${name}`;

      html = `
        <div style="font-family: 'Montserrat', 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #0d1410; color: #ffffff; padding: 30px; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #131f18; border: 1px solid #2a372f; padding: 35px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            
            <div style="text-align: center; margin-bottom: 28px;">
              <span style="background-color: rgba(46, 204, 112, 0.1); color: #2ecc70; padding: 6px 16px; border-radius: 9999px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(46, 204, 112, 0.2);">
                CONTACTO RAPIDO
              </span>
              <h2 style="color: #ffffff; margin-top: 15px; margin-bottom: 5px; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">
                Nueva Consulta Entrante
              </h2>
            </div>

            <div style="background-color: #16221b; padding: 20px; border-radius: 16px; border: 1px solid #2a372f; margin-bottom: 24px; font-size: 14px;">
              <p style="margin: 0 0 8px 0; color: #94a3b8;"><strong style="color: #ffffff; font-size: 11px; text-transform: uppercase;">Nombre:</strong> ${name}</p>
              <p style="margin: 0; color: #94a3b8;"><strong style="color: #2ecc70; font-size: 11px; text-transform: uppercase;">Responder a:</strong> <span style="color: #2ecc70; font-weight: bold;">${email}</span></p>
            </div>

            <div style="background-color: #0d1410; padding: 24px; border-radius: 16px; border: 1px solid #2a372f; border-left: 4px solid #2ecc70;">
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #2ecc70; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                Mensaje del usuario:
              </p>
              <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; font-style: italic;">
                "${message}"
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #2a372f; padding-top: 24px;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0; font-weight: 600;">
                © 2026 <span style="color: #2ecc70;">Estudio Camaleón</span>. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      `;
    }

    // 🚀 Ejecución centralizada y blindada del mail a través del SDK de Resend
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
    console.error("sendEmail error crítico:", unknownError);
    return { success: false, error: errorMessage };
  }
}
