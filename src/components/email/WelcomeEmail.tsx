interface EmailProps {
  name: string;
  email: string;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const WelcomeEmail = ({ name, email, message }: EmailProps) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nueva consulta</title>
      </head>
      <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
                <tr>
                  <td style="font-size:28px;line-height:1.3;font-weight:700;color:#111827;padding-bottom:12px;">
                    Nueva consulta en Estudio Camaleon
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px;color:#4b5563;padding-bottom:16px;">
                    Has recibido una nueva solicitud desde el formulario web.
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px;color:#111827;padding-bottom:6px;">
                    <strong>Nombre:</strong> ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px;color:#111827;padding-bottom:16px;">
                    <strong>Email:</strong> ${safeEmail}
                  </td>
                </tr>
                <tr>
                  <td style="font-size:15px;color:#111827;background:#f9fafb;border-left:4px solid #10b981;border-radius:8px;padding:14px 16px;white-space:pre-wrap;">
                    ${safeMessage}
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
