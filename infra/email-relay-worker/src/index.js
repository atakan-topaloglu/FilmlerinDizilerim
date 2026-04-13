const parseAllowedOrigins = (raw) => {
  if (raw == null || !String(raw).trim()) return null;
  return String(raw)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

/** null list = allow any origin (ACAO *). Otherwise echo request Origin when it is in the list. */
const corsAllowOrigin = (requestOrigin, allowedList) => {
  if (allowedList === null) return "*";
  if (!requestOrigin) return "*";
  return allowedList.includes(requestOrigin) ? requestOrigin : null;
};

const json = (body, status = 200, allowOrigin = "*") =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

const normalizeRecipients = (toValue) => {
  if (Array.isArray(toValue)) {
    return toValue.map((email) => String(email).trim()).filter(Boolean);
  }
  if (typeof toValue === "string") {
    return toValue
      .split(/[;,]/)
      .map((email) => email.trim())
      .filter(Boolean);
  }
  return [];
};

const parseAllowedEmails = (raw) => {
  if (!raw || !String(raw).trim()) return [];
  return String(raw)
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
};

const resolveSenderEmail = (payloadFromEmail, defaultFromEmail, allowedFromList) => {
  const safeDefault = String(defaultFromEmail || "").trim().toLowerCase();
  const requested = String(payloadFromEmail || "").trim().toLowerCase();
  if (!safeDefault) return "";
  if (!requested) return safeDefault;
  if (requested === safeDefault) return safeDefault;
  if (allowedFromList.includes(requested)) return requested;
  return safeDefault;
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedList = parseAllowedOrigins(env.ALLOWED_ORIGIN);
    const matchedCors = corsAllowOrigin(origin, allowedList);

    if (allowedList !== null && matchedCors === null && origin) {
      return json(
        {
          ok: false,
          message:
            "Origin not allowed. Add this exact origin to ALLOWED_ORIGIN in wrangler.toml (comma-separated), then wrangler deploy.",
        },
        403,
        "*"
      );
    }

    const corsHeader = matchedCors === null ? "*" : matchedCors;

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": corsHeader,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    if (request.method !== "POST") {
      return json({ ok: false, message: "Method not allowed." }, 405, corsHeader);
    }

    if (!env.BREVO_API_KEY) {
      return json({ ok: false, message: "BREVO_API_KEY is not configured." }, 500, corsHeader);
    }

    try {
      const payload = await request.json();
      const { to, subject, text, fromEmail, attachment } = payload || {};
      const recipients = normalizeRecipients(to);

      if (recipients.length === 0 || !subject || !text) {
        return json({ ok: false, message: "Missing required fields: to, subject, text." }, 400, corsHeader);
      }

      const allowedFromList = parseAllowedEmails(env.ALLOWED_FROM_EMAILS);
      const senderEmail = resolveSenderEmail(fromEmail, env.FROM_EMAIL, allowedFromList);
      if (!senderEmail) {
        return json({ ok: false, message: "FROM_EMAIL is not configured." }, 500, corsHeader);
      }

      const brevoBody = {
        sender: {
          name: "FilmlerinDizilerim",
          email: senderEmail,
        },
        to: recipients.map((email) => ({ email })),
        subject,
        textContent: text,
      };

      if (attachment?.filename && attachment?.contentBase64) {
        brevoBody.attachment = [
          {
            name: attachment.filename,
            content: attachment.contentBase64,
          },
        ];
      }

      const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": env.BREVO_API_KEY,
        },
        body: JSON.stringify(brevoBody),
      });

      const brevoText = await brevoRes.text();
      let brevoJson = {};
      try {
        brevoJson = JSON.parse(brevoText || "{}");
      } catch {
        // Keep raw text fallback below.
      }

      if (!brevoRes.ok) {
        const detailMessage =
          brevoJson?.message ||
          brevoJson?.code ||
          (typeof brevoText === "string" && brevoText.trim() ? brevoText : "Unknown Brevo error");
        return json(
          {
            ok: false,
            message: `Brevo send failed: ${detailMessage}`,
            details: brevoJson || brevoText,
          },
          brevoRes.status,
          corsHeader
        );
      }

      return json({ ok: true, message: "Email sent successfully.", result: brevoJson }, 200, corsHeader);
    } catch (error) {
      return json(
        { ok: false, message: error instanceof Error ? error.message : "Unexpected relay error." },
        500,
        corsHeader
      );
    }
  },
};
