# E-posta relay (Cloudflare Worker + Brevo)

Statik uygulama `VITE_EMAIL_RELAY_URL` ile bu Worker’a POST atar; Worker Brevo API ile mail gönderir.

## Önkoşullar

- Node.js 20+
- Cloudflare hesabı
- Brevo hesabı + API key + doğrulanmış gönderici e-postası

## Kurulum (bir kez)

```bash
cd infra/email-relay-worker
npm install
npx wrangler login
```

## Yapılandırma

1. `wrangler.toml` içinde `[vars]`:
   - `ALLOWED_ORIGIN`: Uygulamanın açıldığı **tam origin** değerleri, virgülle (örn. `http://localhost:5173`, GitHub Pages kökünüz).
   - `FROM_EMAIL`: Brevo’da doğrulanmış varsayılan gönderici (istemci `fromEmail` gönderirse o kullanılır).

2. **Üretim sırrı** (Brevo API key) — Cloudflare’da saklanır, `npm run deploy` ile gider:

```bash
cd infra/email-relay-worker
npx wrangler secret put BREVO_API_KEY
```

> Repo kökünden (`FilmlerinDizilerim>`) çalıştırmayın; `wrangler.toml` worker klasöründe. Yoksa *Required Worker name missing* hatası alırsınız.

### `.dev.vars` nedir, secret ile farkı ne?

| | `.dev.vars` | `wrangler secret put BREVO_API_KEY` |
|---|-------------|-------------------------------------|
| **Ne zaman** | Sadece bilgisayarınızda `wrangler dev` | Gerçek Worker (workers.dev / özel domain) |
| **Nerede durur** | `infra/email-relay-worker/.dev.vars` (yerel dosya) | Cloudflare şifre kasası |
| **Deploy** | Asla paketlenmez, git’e eklemeyin | `deploy` sonrası üretimde `env.BREVO_API_KEY` olur |

- **Yerel Vite + yerel Worker:** `.dev.vars` içine `BREVO_API_KEY=...` yazın → `npm run dev` bunu okur.
- **Canlı siteden mail:** `secret put` ile anahtarı Cloudflare’a verin → `npm run deploy`. Canlı uygulama `.dev.vars` dosyanızı görmez.

İkisini aynı anda kullanabilirsiniz: geliştirmede `.dev.vars`, production’da secret.

## Yerel test

`.dev.vars.example` dosyasını `.dev.vars` olarak kopyalayıp `BREVO_API_KEY` satırını doldurun (veya mevcut `.dev.vars` dosyanızı kullanın). Sonra:

```bash
npm run dev
```

Terminalde görünen `http://127.0.0.1:8787` adresini `.env.local` içinde geçici olarak `VITE_EMAIL_RELAY_URL` yaparak Vite ile deneyebilirsiniz. `ALLOWED_ORIGIN` listesinde `http://localhost:5173` olmalı.

## Deploy

```bash
npm run deploy
```

Çıktıdaki `*.workers.dev` URL’sini uygulamanın `VITE_EMAIL_RELAY_URL` değişkenine yazın.

## Sorun giderme

- Tarayıcıda **Failed to fetch**: İstek yapan sayfanın origin’i `ALLOWED_ORIGIN` içinde yok veya yanlış yazılmış (port dahil tam eşleşme).
- **Brevo send failed**: Gönderen adres Brevo’da doğrulanmamış veya API key hatalı.
