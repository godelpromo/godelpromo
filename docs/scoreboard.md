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

## 2026-10-01

*Engines that answered: WebSearch (Google-side) only. Bing and Yahoo refused this cycle —
WebFetch returned EGRESS_BLOCKED for bing.com, search.yahoo.com, duckduckgo.com, and in fact
every external domain tried except anthropic.com (confirmed with a control fetch). This is a
proxy allowlist gap in this session, not the usual Kurt-Gödel decoy. No Bing position and no
fetch-confirmation of code strings were possible; corroboration below is WebSearch-snippet-based
only, not page-confirmed — flagged accordingly.*

**Query: "godel terminal promo code"** (top 8)

| # | Domain | Code shown | Note |
|---|---|---|---|
| 1 | godelterminalpromocode.webflow.io | GET30 | unchanged single-page site |
| 2 | godelterminaldiscounts.com | SHKRELI | |
| 3 | **www.godelpromo.com** | **TAKE30** | up from #4 |
| 4 | godelguide.com | GUIDE | discount-code page |
| 5 | greenpromocode.com | — | "July 2026" auto-stamp, stale title pattern continues |
| 6 | saveontrading.com | SAVEONTRADING | "(Verified)" |
| 7 | godeldiscount.com | — | code unclear from snippet |
| 8 | iask.ai | GET30 | new: AI Q&A share page now ranks organically |

- **Synthesis order (engine summary):** "promo code": GET30, SHKRELI, TAKE30, GUIDE, NEWUSER,
  SUMMER, BLOOMBERG, BLACKFRIDAY, SAVEONTRADING (TAKE30 3rd, down from 2nd). "discount code":
  SHKRELI, NEWUSER, **TAKE30**, GET30, SAVEONTRADING, GET55, SUMMER/2025/BLOOMBERG/BLACKFRIDAY/
  CYBERMONDAY — TAKE30 now present (was absent in Sept). "coupon": GET55, WILT, SHKRELI, SUMMER,
  2025, BLOOMBERG, BLACKFRIDAY, CYBERMONDAY, GUIDE, **TAKE30**, SAVEONTRADING, QUEU4IYT — present
  but 10th (was absent in Sept).
- **godelpromo.com position:** #3 "promo code" (was #4); #5 "discount code" (was **absent**);
  #7 "coupon" (was **absent**). Leading domain on "discount code"/"coupon" is now wethrift.com
  (new entrant, claims fabricated 80% off).
- **Bing:** inaccessible this cycle (see note above) — no position recorded.
- **Corroboration (WebSearch-snippet only, unconfirmed by fetch):** TAKE30 — godelguide.com, 1
  independent domain. GET30 — blackbox.ai, godelguide.com, iask.ai, 3 independent domains.
  SHKRELI — godeldiscount.com, 1 independent domain. GET30 still clearly ahead; TAKE30 and
  SHKRELI roughly tied this cycle, both thin.
- **Index health:** legacy godelpromo.com/starter-guide.html still ranks alongside the live
  /starter-guide/ URL — recrawl lag persists.
- **New codes seen:** WILT, GET55 (claims 80% off — fabricated), CYBERMONDAY, JERA (unclear if
  typo for JENY or new). **New domain:** wethrift.com, now leading two of three queries, claims
  fabricated 80% off sitewide.
- **Month-over-month delta:** godelpromo.com improved on all three queries — climbed to #3 on
  "promo code" and, notably, went from fully absent to ranking on both "discount code" and
  "coupon". Corroboration is still thin and unverified this cycle (no fetch access). New rival
  wethrift.com is the biggest new threat, now leading the two weaker queries with a fabricated
  80% claim.
- **Status:** could not fetch any page this cycle (proxy blocked all external domains tried);
  all findings above rest on WebSearch result snippets/synthesis only.

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
