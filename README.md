<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# FilmlerinDizilerim (Static SPA)

This project now runs as a pure static React + Vite Single Page Application and can be hosted entirely on GitHub Pages.

## What Changed (Email)

- Node/Express backend was removed.
- Email actions now support **one-click automatic send** through a lightweight relay endpoint.
- Report emails include the generated Excel file as an attachment.
- Relay is designed for static hosting and uses Brevo API behind Cloudflare Worker.

## Local Development

**Prerequisites:** Node.js 20+

1. Install dependencies:
   `npm install`
2. Add your Gemini API key to `.env.local`:
   `GEMINI_API_KEY=your_key_here`
3. Start the dev server:
   `npm run dev`
4. Build production assets:
   `npm run build`
5. Preview the production build locally:
   `npm run preview`

### Local env for one-click email

Add this to `.env.local`:

`VITE_EMAIL_RELAY_URL=https://your-worker-name.your-subdomain.workers.dev`

## GitHub Pages Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that automatically deploys on pushes to `main`.

1. Push your changes to the `main` branch.
2. In GitHub repository settings, ensure **Pages** source is set to **GitHub Actions**.
3. Add repository secret:
   - `VITE_EMAIL_RELAY_URL` = your Cloudflare Worker URL
4. Wait for the workflow run to finish.
5. Your app will be published to the GitHub Pages URL for the repository.

## Free One-Click Email Setup (Brevo + Cloudflare Worker)

This setup is free and suitable for ~50 requests/day.

- Brevo free tier is typically well above this daily volume.
- Cloudflare Workers free tier is also enough for this usage.

### 1) Create Brevo sender + API key

1. Create/login to Brevo account.
2. Verify your sender email/domain in Brevo.
3. Create API key in Brevo (SMTP/API section).

### 2) Deploy the relay worker

Worker source is included in:

- `infra/email-relay-worker/src/index.js`
- `infra/email-relay-worker/wrangler.toml`

Commands:

1. Install Wrangler (if needed):  
   `npm i -g wrangler`
2. Login to Cloudflare:  
   `wrangler login`
3. Go to worker folder:  
   `cd infra/email-relay-worker`
4. Update `wrangler.toml` values:
   - `ALLOWED_ORIGIN` -> your GitHub Pages origin (for example `https://username.github.io`)
   - `FROM_EMAIL` -> your verified Brevo sender email
5. Set Brevo API key secret:
   `wrangler secret put BREVO_API_KEY`
6. Deploy:
   `wrangler deploy`
7. Copy Worker URL (example: `https://filmlerin-dizilerim-email-relay.<subdomain>.workers.dev`)

### 3) Connect static app to relay

For local:
- set `.env.local` -> `VITE_EMAIL_RELAY_URL=<worker-url>`

For GitHub Pages:
- set repo secret `VITE_EMAIL_RELAY_URL=<worker-url>`

### 4) Result

- "Send Email Report" sends automatically and includes Excel attachment.
- Password reminder and password-change notifications also send automatically.
- No mail client popup is required.
