/**
 * E-posta API: isteğe bağlı uzak backend (GitHub Pages) ve sunucu tarafı SMTP sırları.
 */

export function useServerSmtpSecrets(): boolean {
  const v = import.meta.env.VITE_SMTP_SECRET_FROM_SERVER;
  return v === 'true' || v === '1';
}

export function getEmailApiUrl(): string {
  const base = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
  return base ? `${base}/api/sendReport` : '/api/sendReport';
}

export type SmtpPayload = {
  host?: string;
  port?: string;
  user?: string;
  pass?: string;
  fromEmail?: string;
  toEmail?: string;
};

export function smtpSettingsForApi(settings: SmtpPayload): Required<SmtpPayload> {
  const host = String(settings.host || '').trim();
  const port = String(settings.port || '587').trim();
  const user = String(settings.user || '').trim();
  const pass = String(settings.pass || '').trim();
  const fromEmail = String(settings.fromEmail || '').trim();
  const toEmail = String(settings.toEmail || '').trim();
  if (!useServerSmtpSecrets()) {
    return { host, port, user, pass, fromEmail, toEmail };
  }
  return {
    host: host || 'smtp-relay.brevo.com',
    port: port || '587',
    user,
    pass: '',
    fromEmail,
    toEmail,
  };
}

export function canSendEmail(settings: SmtpPayload | undefined): boolean {
  if (!settings) return false;
  if (useServerSmtpSecrets()) {
    return !!(settings.fromEmail?.trim() && settings.toEmail?.trim());
  }
  return !!(settings.host?.trim() && settings.user?.trim() && settings.pass?.trim());
}

export async function postSendReport(body: { smtpSettings: SmtpPayload; [key: string]: unknown }) {
  const { smtpSettings, ...rest } = body;
  return fetch(getEmailApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...rest,
      smtpSettings: smtpSettingsForApi(smtpSettings),
    }),
  });
}
