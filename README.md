# godelpromo.com

Static site for godelpromo.com — an independent Godel Terminal promo code and reference site.

Built from source modules into `dist/`. Deployed on Cloudflare Pages.

## Quick start

```bash
node build.mjs        # build into dist/
node scripts/check.mjs # validate the build
npm run serve         # build + serve on http://localhost:4321
```

## How it works

```
src/data/site.mjs        Single source of truth: promo code, pricing, competitors, disclosures
src/data/commands.mjs    Command reference with provenance tiers
src/lib/layout.mjs       HTML shell, meta tags, JSON-LD entity graph
src/lib/components.mjs   Reusable content blocks
src/pages/*.mjs          One module per page — exports `page`
assets/                  CSS, JS, OG image (copied verbatim)
build.mjs                Renders pages, generates sitemap/robots/llms.txt/_redirects/_headers
scripts/check.mjs        Post-build validation — fails CI on broken links or bad schema
scripts/indexnow.mjs     Pushes URLs to Bing/Yandex/Seznam/Naver
scripts/make-og.sh       Regenerates the 1200x630 Open Graph card
```

### Adding a page

Create `src/pages/my-page.mjs`:

```js
export const page = {
  path: '/my-page/',
  title: 'Under 60 characters',
  description: 'Under 155 characters.',
  summary: 'One line — used in llms.txt.',
  breadcrumbs: [{ href: '/', label: 'Home' }, { href: '/my-page/', label: 'My page' }],
  faqs: [{ q: '...', a: '...' }],   // becomes FAQPage schema automatically
  render() { return `<h1>...</h1>`; },
};
```

The sitemap, `llms.txt`, breadcrumb schema and nav wiring all follow automatically.
Run `node scripts/check.mjs` before committing — it catches broken links, duplicate titles,
malformed JSON-LD and missing `rel="sponsored"` on affiliate links.

### Two rules worth keeping

**1. Facts live in `src/data/`, never inline in a page.** Every price, code and command is defined
once. Inconsistent facts across pages are the fastest way to lose an AI citation.

**2. Respect the provenance tiers.** `src/data/commands.mjs` marks each command `official`
(vendor-published prose) or `documented` (official doc page exists, no vendor prose). Pricing entries
carry `attributed: true` when the figure comes from third-party reviews rather than a vendor page, and
the copy hedges accordingly. Being visibly careful about what we do and don't know is the site's main
differentiator — don't promote a claim between tiers without a primary source.

## Deployment — Cloudflare Pages

### Cutover sequence (do it in this order)

The old `.html` files are still in the repo root on purpose, so GitHub Pages keeps serving the
current site until Cloudflare is verified. Do not delete them until step 5.

**1. Create the Pages project**

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → select this repo.

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `node build.mjs` |
| Build output directory | `dist` |
| Node version | `20` (set env var `NODE_VERSION=20`) |

**2. Add the IndexNow secret**

Generate a key:

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

Add it as `INDEXNOW_KEY` in **both** Cloudflare Pages environment variables (so the build writes the
verification file) and GitHub Actions secrets (so the deploy workflow can submit URLs).

**3. Verify on the `*.pages.dev` URL**

Check before touching DNS:
- `/` renders and the copy button works
- `/llms.txt` and `/robots.txt` return correct content
- `/index.html` 301s to `/`
- `/<INDEXNOW_KEY>.txt` returns the key

**4. Move the domain**

Pages project → Custom domains → add `www.godelpromo.com` and `godelpromo.com`.
Cloudflare updates DNS automatically if the zone is already there; otherwise point the CNAME at the
Pages project. Set a redirect rule from apex to `www` to match the canonical.

**5. Clean up**

Once the domain resolves to Pages and pages render correctly:

```bash
git rm index.html about.html alternatives.html commands-cheatsheet.html faq.html \
       pricing.html privacy.html redeem.html starter-guide.html terms.html \
       robots.txt sitemap.xml README_DEPLOY.md godelpromo.png
```

`_redirects` already maps every one of those old URLs to its new home, so nothing 404s.
Disable GitHub Pages in repo settings.

### What the build generates

| File | Purpose |
|---|---|
| `sitemap.xml` | Real `lastmod` from git history, not the build clock |
| `robots.txt` | Explicitly allows GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot and 18 others |
| `llms.txt` | Machine-readable site summary for AI assistants |
| `_redirects` | 301s from every legacy `.html` URL |
| `_headers` | Security headers, long cache on assets |
| `<key>.txt` | IndexNow ownership verification (only when `INDEXNOW_KEY` is set) |

## Notes

**`dateModified` comes from git**, not from `Date.now()`. Stamping every page with today's date on
every deploy is the artificial-freshness pattern search engines discount. A page's date reflects the
last commit that actually touched its source or the data modules it renders.

**Analytics loads after `load`.** GA4 and Google Ads were previously injected between `</head>` and
`<body>` — invalid markup, and render-blocking. Outbound conversion tracking has a 900ms fallback so a
blocked gtag can't leave affiliate links dead, and modified clicks (cmd/ctrl/middle) bypass it entirely.

**Off-site work** is documented in [`docs/off-site-playbook.md`](docs/off-site-playbook.md). That is
where the largest remaining gains are — on-site work is largely done.
