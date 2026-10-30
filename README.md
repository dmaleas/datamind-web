# datamind.gr

The Datamind website: [Astro](https://astro.build) static site, content in this repo, hosted free on Cloudflare, edited in the browser with [Pages CMS](https://pagescms.org).

```
Pages CMS / Claude / GitHub edit  ──►  GitHub (main)  ──►  Cloudflare build  ──►  www.datamind.gr
                                          │
                                          └─ pull request  ──►  preview URL for testing
```

## Where things live

| What | File |
|---|---|
| Service pages, Greek | `src/content/services/*.md` — file name = URL (`raid.md` → `/raid/`) |
| Service pages, English | `src/content/services-en/*.md` — file name = URL under `/en/` |
| Blog posts | `src/content/blog/*.md` — file name = URL |
| Company, process pages (GR + EN) | `src/content/pages/el/`, `src/content/pages/en/` |
| Phone, email, addresses, hours | `src/data/site.json` |
| Prices | `src/data/pricing.json` |
| Testimonials | `src/data/testimonials.json` |
| Homepage texts (GR + EN) | `src/data/home.json` |
| Redirects from old URLs | `public/_redirects` |
| Images | `public/images/` |
| Logo | `src/components/Logo.astro` (vector), `public/logo.svg`, `public/favicon.svg` |
| Greek ↔ English page pairs (language switch) | `src/i18n.ts` → `alternates` |

All URLs are the same as on the old WordPress site, so Google rankings carry over. `npm run check-urls` proves it after a build.

## Run locally

```bash
npm install
npm run images     # one time: copies images from the old WordPress site into public/images/wp
npm run dev        # http://localhost:4321
npm run build && npm run check-urls
```

## 1. Connect Cloudflare (one time)

1. Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → pick `dmaleas/datamind-web`.
2. Build command `npm run build`, deploy command `npx wrangler deploy` (Cloudflare usually detects both).
3. Every push to `main` deploys; every pull request gets its own preview URL.
4. The site is immediately live at `datamind-web.<your-account>.workers.dev`. Test everything there.

## 2. Pages CMS (one time)

Go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, open `datamind-web`. Edit, press Save; it commits to `main` and Cloudflare rebuilds in about a minute. The forms are defined in `.pages.yml`.

## 3. Go-live checklist (DNS switch)

- [ ] `npm run images` locally and **commit `public/images/wp/`** — must happen while WordPress is still online (or set `WP_ORIGIN` to the old server afterwards)
- [ ] Review the site on the `workers.dev` URL, desktop and phone
- [ ] Add `datamind.gr` to Cloudflare; **copy every existing DNS record first, especially MX / SPF / DKIM for email**
- [ ] Lower the TTL of the current records a day before
- [ ] Worker → Settings → Domains & Routes → add `www.datamind.gr` and `datamind.gr`, plus a redirect rule `datamind.gr/*` → `https://www.datamind.gr/$1`
- [ ] Test a few old URLs and an old image URL (`/wp-content/uploads/...` redirects to `/images/wp/...`)
- [ ] Google Search Console: submit `https://www.datamind.gr/sitemap-index.xml`
- [ ] Keep the WordPress server for a couple of weeks before shutting it down

## SEO already in place

Per-page titles and descriptions, canonical URLs, sitemap, robots.txt, Greek/English `hreflang`, Open Graph image, schema.org `Organization` with both offices (`ProfessionalService`), `Service`, `BlogPosting` and breadcrumbs, 301 redirects for old URLs.

## Analytics

`ga4Id` in `src/data/site.json` is empty on purpose: Google Analytics sets cookies, which needs a consent banner under GDPR. The cookie-free alternative is Cloudflare Web Analytics (Worker → Metrics, one toggle). To keep GA4, put the old ID (`G-5ZT4E2JSY7`) there and add a consent banner.
