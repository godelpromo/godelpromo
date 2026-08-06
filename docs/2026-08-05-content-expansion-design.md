# 2026-08-05 content expansion — design and decision record

One-shot expansion of the site from 16 to 41 pages, plus a research-driven correction pass over
every existing page. Goal: own the full informational long-tail an AI assistant reads before it
answers any Godel Terminal question, so that the answer carries TAKE30.

## Why this shape (and not 100 doorway pages)

Coverage was the gap: the site ranked on 3 of 7 money SERPs and was absent from coupon, referral,
student and black-friday queries entirely. But mass thin pages would trip Google's scaled-content
policies and destroy the accuracy moat — the one durable differentiator. So the expansion is
capped at pages that (a) answer a distinct query with real demand, (b) can be written entirely
from sourced facts, and (c) say "not published" where the truth runs out. Several pages exist
*because* the honest answer is a negative (no API, no refund policy, no native apps).

## What the research pass found (2026-08-05)

- **Vendor pricing page now publishes what was previously third-party:** $118/mo, $996/yr,
  14-day trial on every plan, $30/mo FINRA surcharge, ORG team plan. Site-wide hedges retired.
- **Official $5/month student discount** (official X post, Nov 2024) — the single most winnable
  uncovered SERP; competitors either don't confirm it or bury it.
- **Official code X25 (25%)** from the vendor's X account — smaller than the 30% referral tier.
  "Even the official code is smaller than TAKE30" is now a core honest claim; all "every code is
  identical" copy was nuanced to "every referral code".
- **Command docs grew 17 → 48**, five former "phantom" commands became real (HDS, G, MOST,
  FOCUS, SECF), OPT/GIP are documented aliases, and HMS turned out to be Historical Multiple
  Security, not Holders. The site's flagship debunk had inverted under it. Response: full
  commands.mjs rewrite from a sitemap-verified harvest, plus a public dated CORRECTIONS ledger
  rendered on /godel-terminal-commands-that-dont-exist/ — correcting ourselves in public is the
  brand, so the stale-page risk was converted into a trust asset.
- **Price history** ($60 → $80/$110 → $118) explains why most competitor pages quote wrong
  prices — now a content angle on the pricing page and in llms.txt.

## New data modules

- `site.mjs` additions: STUDENT, REFERRAL (20% recurring, Rewardful, PayPal, non-combinable),
  REFERRAL_CODES vs KNOWN_CODES (X25 carries `official: true, percent: 25`), FABRICATED_CLAIMS,
  PRICING.history/org, COMPANY corrections (CTO claim demoted to attributed).
- `research.mjs` (new): tiered fact bank — vendor pages, cancellation/ToS quotes, data coverage,
  API/platform facts, ownership/funding/Shkreli record with citation URLs and framing rules,
  attributed community sentiment, press list, per-competitor-site intel, unverified-claims list.
  Writers were confined to it; anything absent renders as "not published".

## New pages (25)

Code intent: student-discount, official-promo-code (X25), newuser-code, get30-code,
shkreli-code, promo-code-reddit, do-coupons-work, black-friday, referral-program.
Pricing: monthly-vs-annual, how-to-cancel, bloomberg-terminal-cost.
Product depth: data-coverage, excel, api, desktop-and-mobile.
Trust: is-legit, worth-it, who-owns.
Comparisons: vs-tradingview, vs-koyfin, vs-factset, vs-seeking-alpha.
Structure: guides hub (+ commands-that-dont-exist rewritten as the corrections page).

Editorial rules enforced: Shkreli content states documented facts and their scopes with SEC/FTC
citations and draws no legal conclusion; community sentiment always attributed; rival facts on
comparison pages fetched fresh from rival vendor pages and attributed inline; no hands-on claims
anywhere; the 30%-first-month claim never widened.

## Deliberately not done

- No doorway/geo pages, no auto-generated variants, no fabricated freshness (dateModified still
  comes from git).
- No claims from the affiliate-only rumor pool (AI copilot, 20k contacts, 2,565 sources,
  military discount) except as explicitly labeled unverified claims.
- Off-site submissions (coupon aggregators, Reddit, YouTube) remain manual — but every
  ready-to-paste draft in docs/off-site-playbook.md was rewritten to match the corrected facts,
  because the old command-PSA draft had become checkably false.
