"use server";

import { Resend } from "resend";

// Inicializamos Resend de forma segura en el servidor
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReviewEmail(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const projectDescription = formData.get("projectDescription") as string;
  const stars = formData.get("stars") as string;

  // 1. Validación estricta en el servidor
  if (!fullName || !projectDescription || !stars) {
    return {
      success: false,
      error: "Faltan campos obligatorios en el servidor.",
    };
  }

  try {
    // 2. Envío de correo mediante Resend usando tu dominio verificado
    const { data, error } = await resend.emails.send({
      from: "Estudio Camaleón Web <onboarding@resend.dev>",
      to: "estudiocamaleontuc@gmail.com",
      subject: "✨ Nueva Reseña Recibida - Estudio Camaleón",
      html: `
        <div style="font-family: 'Montserrat', 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #0d1410; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto;">
          
          <!-- Contenedor Principal (Tarjeta Premium) -->
          <div style="background-color: #131f18; border: 1px solid #2a372f; padding: 40px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            
            <!-- Encabezado / Badge -->
            <div style="text-align: center; margin-bottom: 32px;">
              <span style="background-color: rgba(46, 204, 112, 0.1); color: #2ecc70; padding: 8px 18px; border-radius: 9999px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(46, 204, 112, 0.2);">
                MUTACIÓN COMPLETA • RESEÑA
              </span>
              <h1 style="color: #ffffff; margin-top: 20px; margin-bottom: 8px; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">
                ¡Nuevo Feedback Recibido!
              </h1>
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                Un cliente ha compartido su experiencia desde la plataforma web.
              </p>
            </div>
            
            <!-- Bloque de Información del Cliente -->
            <div style="background-color: #16221b; padding: 24px; border-radius: 16px; border: 1px solid #2a372f; margin-bottom: 24px;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #94a3b8;">
                <strong style="color: #ffffff; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Cliente:</strong><br/>
                <span style="color: #ffffff; font-size: 16px; font-weight: 700;">${fullName}</span>
              </p>
              
              <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                <strong style="color: #ffffff; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em;">Calificación:</strong><br/>
                <span style="color: #2ecc70; font-size: 20px; letter-spacing: 2px;">
                  ${"★".repeat(Number(stars))}${"☆".repeat(5 - Number(stars))}
                </span> 
                <span style="color: #ffffff; font-weight: bold; font-size: 14px; margin-left: 6px;">(${stars}/5)</span>
              </p>
            </div>

            <!-- Bloque de la Reseña -->
            <div style="background-color: #0d1410; padding: 24px; border-radius: 16px; border: 1px solid #2a372f; border-left: 4px solid #2ecc70;">
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #2ecc70; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                La Experiencia:
              </p>
              <p style="font-style: italic; margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6; font-weight: 500;">
                "${projectDescription}"
              </p>
            </div>

            <!-- Footer Corporativo -->
            <div style="text-align: center; margin-top: 35px; border-top: 1px solid #2a372f; padding-top: 24px;">
              <p style="font-size: 12px; color: #94a3b8; margin: 0; font-weight: 600;">
                © 2026 <span style="color: #2ecc70;">Estudio Camaleón</span>. Built with excellence.
              </p>
            </div>

          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error devuelto por Resend:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Error crítico en Server Action (sendReviewEmail):", err);
    return {
      success: false,
      error: "Error interno del servidor al procesar el correo.",
    };
  }
}
