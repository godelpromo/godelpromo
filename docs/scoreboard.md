# AI-search scoreboard

Monthly log of who wins the money query. Appended to by the scheduled cloud routine
("Godel promo AI-search scoreboard" at https://claude.ai/code/routines) on the 1st of each
month; entries can also be added by hand after a manual check.

**What gets measured.** Search the code queries, record which promo codes the top results
carry, where `www.godelpromo.com` ranks, and which single code a search-synthesis answer
would lead with. This is the metric the whole off-site playbook exists to move — Bing
impressions and Rewardful conversions lag it.

**Entry format.** One `##` section per check, newest first. Keep entries under ~40 lines.
Never edit past entries; the value of this file is that it is an untouched time series.

---

## 2026-09-03

*The routine's 2026-09-01 run gathered this data but could not push (the Claude GitHub App has no
write access to the repo); this entry was rebuilt by hand from that run plus a 19-lane audit on
2026-09-03. Same search layer as the baseline (WebSearch), so positions are comparable.*

**Query: "godel terminal promo code"** (top 7)

| # | Domain | Code shown | Note |
|---|---|---|---|
| 1 | linkedin.com (newsletter) | PC30 | new entrant; single headline, "published monthly", no link |
| 2 | godelterminalpromocode.webflow.io | GET30 | $60/mo pricing; every button routes to foxly.link, now dead |
| 3 | godelterminaldiscounts.com | SHKRELI | six codes on one page; via= tokens never match the code shown |
| 4 | **www.godelpromo.com** | **TAKE30** | up from 6; index still shows the pre-rebuild title |
| 5 | dealspotr.com | — | still "40% Off (Sitewide) in Nov 2025"; unfetchable (Cloudflare) |
| 6 | greenpromocode.com | QUEU4IYT | "September 2026" auto-stamp, $60/mo deal |
| 7 | godel-terminal.tenereteam.com | TENERE etc. | "75% off"; FAQ prose mentions TAKE30 |

- **Synthesis order (engine summary):** GET30, TAKE30, SHKRELI. "discount code": GET30, SHKRELI,
  SAVEONTRADING, NEWUSER (no TAKE30). "coupon": GET30, SHKRELI, SAVEONTRADING, QUEU4IYT (no TAKE30).
- **godelpromo.com position:** #4 "promo code"; #7 "referral code"; #5 "discount"; **absent** from
  "discount code", "coupon", "coupon code 2026", and from all 10 informational queries (review,
  pricing, commands, vs bloomberg…) despite exact-match pages.
- **Domains corroborating TAKE30:** godelpromo.com, godelguide.com (in a list, GUIDE first),
  tenereteam.com (FAQ prose only). 2 independent. jenova.ai's share page now pushes GET30/JENY, so
  the August corroboration is lost. Rivals: GET30 on 6 independent domains, NEWUSER 4, PROMO30 4.
- **AI-answer simulations (6):** TAKE30 led 2 (once because the user named it, once on source
  quality); SHKRELI led 1, NEWUSER led 3. Every run cited our own "all codes are identical" line as
  the reason not to prefer TAKE30 — fixed on-site this month.
- **Bing:** /promo-codes/ is #2 for "promo code" (goodsearch #1) but "discount code"/"coupon"
  return Kurt Gödel pages — the niche is nearly empty there.
- **Index health:** legacy .html URLs (/alternatives.html, /starter-guide.html,
  /commands-cheatsheet.html) still indexed with pre-rebuild titles; all 301 correctly. Live
  robots.txt is prefixed by a Cloudflare-managed block that Disallows GPTBot, ClaudeBot,
  Google-Extended and CCBot — a zone setting, not in the repo. Fix pending in the dashboard.
- **New codes seen:** PC30, CODE30 (LinkedIn), JENY (jenova.ai), FUNDEDPROGRAM
  (thetrade-reviews.com), SHKRELIPLANET / THESHKRELIPILL (YouTube), SUMMER / 2025
  (godelterminaldiscounts), GODEL / SAVE / THANKS / GODEL30 / LIFESTYLE (Reddit). WorthEPenny's
  fabricated tier moved 50% → 60%; Goodsearch claims 80%.
- **Status:** zero aggregator submissions done; corroboration is still the bottleneck.

---

## 2026-08-05

**Query: "godel terminal promo code"** (Google, top 8)

| # | Domain | Code shown | Note |
|---|---|---|---|
| 1 | godelterminalpromocode.webflow.io | GET30 | single-page site |
| 2 | dealspotr.com | — | advertises fabricated 40% sitewide |
| 3 | godelterminal.webflow.io | PROMO30 | review-styled single page |
| 4 | greenpromocode.com | 30% listing | |
| 5 | godelterminaldiscounts.com | SHKRELI | dedicated competitor site |
| 6 | **www.godelpromo.com** | **TAKE30** | our site |
| 7 | godeldiscount.com | — | FAQ-styled competitor |
| 8 | godel-terminal.tenereteam.com | — | advertises fabricated 75% |

- **Synthesis order:** GET30, PROMO30, TAKE30, NEWUSER, SHKRELI — TAKE30 present, third.
- **godelpromo.com position:** ~6 for the code query; page 1.
- **Domains corroborating TAKE30:** godelpromo.com, jenova.ai (shared-answer page). ~2.
- **Index health:** Google still serves the legacy `.html` URLs with pre-rebuild titles
  (one advertises the nonexistent FOCUS command). All legacy URLs verified 301ing
  correctly, so this is recrawl lag; IndexNow resubmitted on this date.
- **Status:** coupon-aggregator submissions (docs/coupon-submission-checklist.md) not yet
  started — corroboration count is the current bottleneck.
