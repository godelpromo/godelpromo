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
