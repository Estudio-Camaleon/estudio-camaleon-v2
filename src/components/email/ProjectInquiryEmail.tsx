interface EmailData {
  fullName?: string;
  email?: string;
  phoneRegion?: string;
  phone?: string;
  company?: string;
  projectType?: string;
  hasCodeBase?: string;
  projectDescription?: string;
  howDidYouKnowUs?: string;
}

function escapeHtml(value: string | undefined) {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const ProjectInquiryEmail = (data: EmailData) => {
  const {
    fullName = "",
    email = "",
    phoneRegion = "",
    phone = "",
    company = "",
    projectType = "",
    hasCodeBase = "",
    projectDescription = "",
    howDidYouKnowUs = "",
  } = data;

  const safeData = {
    fullName: escapeHtml(fullName),
    email: escapeHtml(email),
    phoneRegion: escapeHtml(phoneRegion),
    phone: escapeHtml(phone),
    company: escapeHtml(company),
    projectType: escapeHtml(projectType),
    hasCodeBase: escapeHtml(hasCodeBase),
    projectDescription: escapeHtml(projectDescription),
    howDidYouKnowUs: escapeHtml(howDidYouKnowUs),
  };

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nueva solicitud de proyecto</title>
      </head>
      <body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Roboto,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg, #10b981 0%, #059669 100%);padding:32px 24px;text-align:center;">
                    <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">
                      Nueva Solicitud de Proyecto
                    </h1>
                    <p style="margin:8px 0 0 0;font-size:14px;color:#d1fae5;">
                      Estudio Camaleon
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:32px 24px;">
                    
                    <!-- Información de contacto -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="font-size:16px;font-weight:700;color:#111827;margin-bottom:16px;display:block;">
                          📋 Información de Contacto
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:14px;color:#4b5563;padding:8px 0;">
                          <strong>Nombre:</strong> ${safeData.fullName}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:14px;color:#4b5563;padding:8px 0;">
                          <strong>Email:</strong> <a href="mailto:${safeData.email}" style="color:#10b981;text-decoration:none;">${safeData.email}</a>
                        </td>
                      </tr>
                      ${
                        safeData.phone
                          ? `<tr>
                        <td style="font-size:14px;color:#4b5563;padding:8px 0;">
                          <strong>Teléfono:</strong> ${safeData.phoneRegion} ${safeData.phone}
                        </td>
                      </tr>`
                          : ""
                      }
                      ${
                        safeData.company
                          ? `<tr>
                        <td style="font-size:14px;color:#4b5563;padding:8px 0;">
                          <strong>Empresa:</strong> ${safeData.company}
                        </td>
                      </tr>`
                          : ""
                      }
                    </table>

                    <!-- Detalles del Proyecto -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;border-top:1px solid #e5e7eb;padding-top:24px;">
                      <tr>
                        <td style="font-size:16px;font-weight:700;color:#111827;margin-bottom:16px;display:block;">
                          🎯 Detalles del Proyecto
                        </td>
                      </tr>
                      ${
                        safeData.projectType
                          ? `<tr>
                        <td style="font-size:14px;color:#4b5563;padding:8px 0;">
                          <strong>Tipo de Proyecto:</strong> ${safeData.projectType}
                        </td>
                      </tr>`
                          : ""
                      }
                      ${
                        safeData.hasCodeBase
                          ? `<tr>
                        <td style="font-size:14px;color:#4b5563;padding:8px 0;">
                          <strong>Estado Actual:</strong> ${safeData.hasCodeBase}
                        </td>
                      </tr>`
                          : ""
                      }
                    </table>

                    <!-- Descripción del Proyecto -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;border-top:1px solid #e5e7eb;padding-top:24px;">
                      <tr>
                        <td style="font-size:16px;font-weight:700;color:#111827;margin-bottom:12px;display:block;">
                          📝 Descripción del Proyecto
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:14px;color:#111827;background:#f9fafb;border-left:4px solid #10b981;border-radius:8px;padding:16px;white-space:pre-wrap;line-height:1.6;">
                          ${safeData.projectDescription}
                        </td>
                      </tr>
                    </table>

                    <!-- Información adicional -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e5e7eb;padding-top:24px;">
                      <tr>
                        <td style="font-size:14px;color:#4b5563;padding:8px 0;">
                          <strong>¿Cómo nos conociste?</strong> ${safeData.howDidYouKnowUs || "No especificado"}
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#6b7280;">
                      Este es un mensaje automático de tu sitio web.<br>
                      <strong>Responde a este email directamente para contactar al cliente.</strong>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
