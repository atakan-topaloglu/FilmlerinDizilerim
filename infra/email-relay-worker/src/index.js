const json = (body, status = 200, origin = "*") =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

const isOriginAllowed = (origin, allowedOrigin) => {
  if (!allowedOrigin) return true;
  return origin === allowedOrigin;
};

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

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "";

    if (!isOriginAllowed(origin, allowedOrigin)) {
      return json({ ok: false, message: "Origin not allowed." }, 403, allowedOrigin || "*");
    }

    if (request.method === "OPTIONS") {
      return json({ ok: true }, 200, allowedOrigin || "*");
    }

    if (request.method !== "POST") {
      return json({ ok: false, message: "Method not allowed." }, 405, allowedOrigin || "*");
    }

    if (!env.BREVO_API_KEY) {
      return json({ ok: false, message: "BREVO_API_KEY is not configured." }, 500, allowedOrigin || "*");
    }

    try {
      const payload = await request.json();
      const { to, subject, text, fromEmail, attachment } = payload || {};
      const recipients = normalizeRecipients(to);

      if (recipients.length === 0 || !subject || !text) {
        return json({ ok: false, message: "Missing required fields: to, subject, text." }, 400, allowedOrigin || "*");
      }

      const senderEmail = fromEmail || env.FROM_EMAIL;
      if (!senderEmail) {
        return json({ ok: false, message: "FROM_EMAIL is not configured." }, 500, allowedOrigin || "*");
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
        return json(
          {
            ok: false,
            message: "Brevo send failed.",
            details: brevoJson || brevoText,
          },
          brevoRes.status,
          allowedOrigin || "*"
        );
      }

      return json({ ok: true, message: "Email sent successfully.", result: brevoJson }, 200, allowedOrigin || "*");
    } catch (error) {
      return json(
        { ok: false, message: error instanceof Error ? error.message : "Unexpected relay error." },
        500,
        allowedOrigin || "*"
      );
    }
  },
};
