# Cloudflare Pages cutover

Current state of `godelpromo.com`, measured 2026-07-30:

| Record | Value | Notes |
|---|---|---|
| Nameservers | `ns65/ns66.domaincontrol.com` | **GoDaddy**, not Cloudflare |
| `www` | CNAME → `godelpromo.github.io` | GitHub Pages |
| apex `@` | `3.33.251.168`, `15.197.225.128` | GoDaddy forwarding — **currently returns HTTP 405** |
| MX | *(none)* | No email on this domain |
| TXT | `google-site-verification=I2vAN0jg…` | **Must be preserved** — this is your Search Console verification |

Two things worth knowing before you start:

1. **Your apex is already broken.** `https://godelpromo.com/` returns `405 Method Not Allowed`
   instead of redirecting to `www`. Anyone typing the bare domain hits a dead page today.
2. **There is no email on the domain**, which makes a nameserver move low-risk. Only two records
   need to survive the migration.

---

## Step 1 — Authenticate to the right account (only you can do this)

`wrangler whoami` currently resolves to `justin.felt@emberex.com` with access to
`Michaelgrabarits72@gmail.com's Account` and `Nate.bernstein@emberex.com's Account`.
**Your new personal account is not in that list.** Deploying now would put this site in
someone else's account.

Pick one:

### Option A — API token (recommended; works in CI too)

1. Log into Cloudflare **with your personal account**
2. My Profile → API Tokens → Create Token → **Edit Cloudflare Workers** template
   (or a custom token with `Account → Cloudflare Pages → Edit`)
3. Copy the token and your Account ID (Workers & Pages → right sidebar)

```bash
export CLOUDFLARE_API_TOKEN=<token>
export CLOUDFLARE_ACCOUNT_ID=<account-id>
```

### Option B — Interactive login

This replaces your existing wrangler session, which you may still need for Emberex work.
Prefer Option A if so.

```bash
npx wrangler logout
npx wrangler login          # opens a browser — log in as your personal account
npx wrangler whoami         # confirm the personal account is listed
export CLOUDFLARE_ACCOUNT_ID=<personal-account-id>
```

## Step 2 — Create and deploy (automated)

```bash
cd /Users/justinfelt/projects/godelpromo-seo
./scripts/setup-cloudflare.sh
```

Builds, validates, creates the `godelpromo` Pages project, and deploys. Prints a
`*.pages.dev` URL.

## Step 3 — Verify before touching DNS

On the `*.pages.dev` URL:

- [ ] `/` renders, copy button copies `TAKE30`
- [ ] `/llms.txt` returns the fact summary
- [ ] `/robots.txt` names GPTBot, ClaudeBot, PerplexityBot
- [ ] `/index.html` → 301 → `/`
- [ ] `/godel-terminal-commands/` shows all 17 commands
- [ ] `/cost-calculator/` sliders move the bars

---

## Step 4 — DNS

### Recommended: move nameservers to Cloudflare

Given there's no email and the apex is already broken, this is the clean option. It fixes
apex, adds the CDN, and lets Cloudflare manage the certificate.

**In Cloudflare:**

1. Dashboard → Add a site → `godelpromo.com` → Free plan
2. Cloudflare scans existing records. Confirm it imported:
   - `TXT @ google-site-verification=I2vAN0jgu…` ← **check this specifically; losing it
     de-verifies Search Console**
3. Note the two assigned nameservers (like `alice.ns.cloudflare.com`)

**In GoDaddy:**

4. My Products → `godelpromo.com` → DNS → Nameservers → Change
5. "I'll use my own nameservers" → enter the two Cloudflare nameservers → Save

Propagation is usually under an hour, occasionally up to 24. Check with:

```bash
dig +short NS godelpromo.com
```

**Back in Cloudflare, once active:**

6. Workers & Pages → `godelpromo` → Custom domains → add **both**
   `www.godelpromo.com` and `godelpromo.com`
7. Delete the old `www` CNAME pointing at `godelpromo.github.io` if it wasn't replaced
8. Rules → Redirect Rules → create:
   - **If** hostname equals `godelpromo.com`
   - **Then** dynamic redirect, 301, to `concat("https://www.godelpromo.com", http.request.uri.path)`

   This fixes the apex 405 and matches the canonical tags, which all point at `www`.

### Alternative: keep DNS at GoDaddy

Less invasive, but leaves apex broken — GoDaddy can't CNAME an apex record, and their
forwarding is what's currently returning 405.

1. Cloudflare Pages → `godelpromo` → Custom domains → add `www.godelpromo.com`
2. Cloudflare gives a CNAME target
3. In GoDaddy DNS, change the `www` CNAME from `godelpromo.github.io` to that target
4. Apex stays broken unless you fix GoDaddy forwarding separately

---

## Step 5 — CI secrets

GitHub repo → Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | From step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | Personal account ID |
| `INDEXNOW_KEY` | `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"` |

After that, every push to `main` builds, validates, deploys and submits URLs to Bing.

## Step 6 — Clean up (only after the domain resolves to Pages)

```bash
git rm index.html about.html alternatives.html commands-cheatsheet.html faq.html \
       pricing.html privacy.html redeem.html starter-guide.html terms.html \
       robots.txt sitemap.xml README_DEPLOY.md godelpromo.png
git commit -m "Remove legacy static files superseded by the generated build"
```

`_redirects` maps every one of those URLs to its new home. Then disable GitHub Pages in
repo settings so it can't serve a stale copy.

---

## Rollback

Nothing is destructive until step 4.

- **Before the nameserver change:** delete the Pages project. Nothing else changed.
- **After:** point GoDaddy nameservers back to `ns65.domaincontrol.com` /
  `ns66.domaincontrol.com`. The original `www` CNAME → `godelpromo.github.io` still works
  as long as GitHub Pages remains enabled — which is why step 6 comes last.
