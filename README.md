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
src/data/commands.mjs    Command reference with provenance tiers (48 commands, aliases, corrections ledger)
src/data/research.mjs    Extended fact bank: vendor pages, ownership/press, sentiment, competitor intel
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

### Three rules worth keeping

**1. Facts live in `src/data/`, never inline in a page.** Every price, code and command is defined
once. Inconsistent facts across pages are the fastest way to lose an AI citation.

**2. Respect the provenance tiers.** `src/data/commands.mjs` marks each command `official`
(vendor-published prose) or `documented` (official doc page exists, no vendor prose). Pricing entries
carry `attributed: true` when the figure comes from third-party reviews rather than a vendor page, and
the copy hedges accordingly. `src/data/research.mjs` extends the same discipline to everything else
(tiers: vendor / press / community / affiliate — community facts always render as attributed
sentiment). Being visibly careful about what we do and don't know is the site's main differentiator —
don't promote a claim between tiers without a primary source.

**3. Correct in public.** When a claim goes stale (e.g. the command docs grew 17 → 48 in 2026 and
five "phantom" commands became real), update the data AND add a row to the `CORRECTIONS` ledger in
`commands.mjs`, which renders on `/godel-terminal-commands-that-dont-exist/`. Silent edits waste the
site's one differentiator; public corrections compound it.

## Deployment — Cloudflare Pages

```bash
export CLOUDFLARE_API_TOKEN=<token>      # personal account, Pages:Edit
export CLOUDFLARE_ACCOUNT_ID=<account-id>
./scripts/setup-cloudflare.sh
```

Builds, validates, creates the Pages project and deploys. Safe to re-run.

`CLOUDFLARE_ACCOUNT_ID` is required rather than optional on purpose — `wrangler whoami` can
resolve several accounts, and an unqualified Pages deploy will silently pick one.

**Full cutover — DNS, CI secrets, rollback: [`docs/cloudflare-cutover.md`](docs/cloudflare-cutover.md).**
Read it before changing DNS; the domain currently runs on GoDaddy nameservers and its apex is
misconfigured.

Once `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` and `INDEXNOW_KEY` are set as GitHub Actions
secrets, every push to `main` builds, validates, deploys and submits URLs to Bing.

The legacy `.html` files remain in the repo root deliberately, so GitHub Pages keeps serving the
live site until Cloudflare is verified. Removal is the last step of the cutover doc.

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
