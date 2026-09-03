# Coupon aggregator submission checklist

**Goal:** raise the number of independent domains that name `TAKE30`.

**Why it works.** When someone asks an assistant for the Godel Terminal promo code, it runs a
search, reads the top handful of results and synthesises. It does not evaluate which code is
"best" — it reproduces whatever the majority of retrieved sources say. Today `NEWUSER` and
`GET30` appear on more domains than `TAKE30`, so they win by default. This is the only lever
that changes that, and it cannot be fixed by editing your own site.

**Time:** ~2 hours for the full list. Track B first if you only have one hour.

---

## Paste-once values

Every form below wants some subset of these. Fill them identically each time — consistency
across domains is itself a ranking signal.

| Field | Value |
|---|---|
| Code | `TAKE30` |
| Discount type | Percent off |
| Discount amount | `30` |
| Applies to | First month / first billing period |
| Merchant | Godel Terminal |
| Merchant domain | `godelterminal.com` |
| Category | Finance › Investing tools (or Software / SaaS) |
| Expiry | Leave blank, "ongoing", or the furthest future date allowed |
| Your landing page | `https://www.godelpromo.com/promo-codes/` |

**Title (short):**
```
30% off your first month of Godel Terminal
```

**Description (standard):**
```
Use code TAKE30 at checkout for 30% off your first month of Godel Terminal, the browser-based
financial terminal. Applies to the first billing period only. Godel Terminal lists entry pricing
at $996 per seat per year. Verify the total updates at checkout before paying.
```

**Description (short, ~140 char):**
```
TAKE30 takes 30% off your first month of Godel Terminal. First billing period only — check the
total updates at checkout.
```

**Terms / restrictions:**
```
Applies to the first billing period only. Not a recurring discount. New subscribers. Discount
terms are set by Godel Terminal and can change.
```

---

## The one rule

**Enter 30%. Never 40, 50, 75 or "up to 80".**

Several of these sites currently advertise fabricated Godel discounts — Dealspotr says 40%
sitewide, Tenereteam says 75%, WorthEPenny says 50%. None of those exist; there is one referral
tier and it is 30% off the first month.

Matching their numbers would destroy the only thing that differentiates you, and it backfires
mechanically too: inflated codes get downvoted and removed on community-moderated sites, and a
code that fails at checkout produces exactly the "this didn't work" comment that kills a listing.

Two more accuracy rules (added 2026-08-05):

- **Never label TAKE30 "official".** An official code exists — X25, from Godel's own X account,
  at 25% — and TAKE30 is a referral code. "Independent/affiliate, 30%" is the accurate framing,
  and it's also the better offer.
- **Never submit TAKE30 into student-discount listing slots.** The official student rate is
  $5/month via .edu signup; a code listing there would be worse than the real answer.

---

## Status check, 2026-09-03

Every aggregator was re-fetched. None lists TAKE30 as a code. The landscape moved: Wethrift and
Coupert now have Godel pages (harvested from YouTube/Instagram/TikTok captions and other
aggregators), CouponFollow still has none, and several sites are behind bot walls that a human
browser gets through. Submission routes below were verified on that date; "no account" means the
form loaded without a login gate.

## Track B — no Godel page exists yet (DO THESE FIRST)

You create the page, so TAKE30 is the only code on it.

- [ ] **CouponFollow / Cently** — https://couponfollow.com/submit-code — no account. Fields:
      website, coupon code, describe the offer, expiration (optional). No Godel page exists
      (control: nike.com resolves), so this submission creates it and feeds the Cently extension.
- [ ] **RetailMeNot** — https://www.retailmenot.com/submit — "Online Code"; their rule is
      "publicly available coupon codes" — a referral code published on godelterminal.com/referral
      qualifies. Feeds the RetailMeNot extension. Bot-walled; use a browser.
- [ ] **DontPayFull** — https://www.dontpayfull.com/submit-coupon (browser; walled to bots).
- [ ] **CouponChief** — /coupons/submit (browser).
- [ ] **HotDeals** — "Submit Coupon" in the footer (browser).
- [ ] **Coupert (extension DB, Edge's former coupon feed)** —
      https://www.coupert.com/share-a-coupon?source=web-bottom — Coupert login; Code Source =
      "Store Website"; status under "My Submitted" after ~3 business days. Its Godel page already
      exists and shows fabricated masked codes (60%), so this is Track A in effect.

## Track A — page already exists, add your code to it

- [ ] **CouponBind** — https://www.couponbind.com/addcoupon/ — no account. Fields: email, store
      name, code, title, store domain (must start with http), description, expiry. Rivals already
      used it (SAVEONTRADING listed as "Shared By User", expiry 07/31/2035).
- [ ] **CouponLief** — /submit-coupon — no account.
- [ ] **ShipTheDeal** — owner's Google Form on the Godel page; the page is affiliate-captured by
      token "cyrus", so submit with a plain https://app.godelterminal.com/ link, not ?via=take30.
- [ ] **GreenPromoCode** — https://www.greenpromocode.com/share-your-promo-code/ (browser; walled
      to bots). Ranks for the money query with one code, QUEU4IYT.
- [ ] **Tenereteam** — "share a deal" (login). Its FAQ prose already names TAKE30; a proper coupon
      card would make it a real corroborating listing.
- [ ] **WorthEPenny** — https://www.worthepenny.com/submit (browser). Headline claim rotated
      50% → 60% between August and September.
- [ ] **Dealspotr** — https://dealspotr.com/promo-codes/godelterminal.com → "Add a deal" (login).
      Highest authority; page unreadable to bots, use a browser.
- [ ] **Knoji** — https://godelterminal.knoji.com/promo-codes/ → add a coupon (login).
- [ ] **CouponStroller** — bans referral codes by policy; submit as a public 30%-first-month code
      with a plain link, expect rejection.

## Harvest-only sites (no form — they scrape captions)

Wethrift and Goodsearch build their Godel lists from YouTube, Instagram and TikTok captions
(every code on Wethrift's page cites a video or post). The only way in is a public post whose
caption reads "Godel Terminal promo code TAKE30 — 30% off your first month". See the playbook's
Tier 0.5.

## Browser-extension "add a code" paths (do once each, with the extension installed)

- **PayPal Honey** — open godelterminal.com, click the Honey icon, scroll to "Add Code" (only
  shown on supported sites; if absent, Honey has no path for this merchant).
- **Cently** — icon → "Share a Code", or avatar → Settings → "Submit a Code" (works for unlisted
  stores).
- **Karma** — look for an in-extension submit control; otherwise it scrapes.
- Capital One Shopping, Klarna, Rakuten, Slickdeals: no submission path; they scrape or need the
  merchant on an affiliate network.

## Optional — only if genuinely a deal

- [ ] **Slickdeals** — heavily moderated by real people. Post only if you would post it as a user.
      A rejected submission there is worse than no submission.

---

## After submitting

Wait ~1 week for indexing, then check whether it worked:

```bash
npm run bing stats          # impressions climbing?
```

And run the actual scoreboard — ask each assistant, in a fresh session:

> what's the promo code for Godel Terminal?

Log which code it names and which sources it cites. Repeat monthly. That is the metric this
entire exercise exists to move; Bing impressions and Rewardful conversions are lagging
indicators of it.

**Expected trajectory:** `TAKE30` appears alongside rivals within 4–8 weeks, and leads for code
queries around month 2–4. `NEWUSER` and `SHKRELI` have a head start, so the durable win comes
from the informational pages (review, commands, pricing, comparisons) — those are what an
assistant reads to answer "is Godel Terminal worth it?", and they carry your code.
