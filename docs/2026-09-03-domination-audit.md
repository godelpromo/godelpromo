# 2026-09-03 audit: where TAKE30 actually stands

A nineteen-lane sweep of Google, Bing, Yahoo, Brave, the coupon aggregators, the competitor
sites, Reddit, YouTube and six simulated AI answers, plus a full on-site technical audit.
This file records what was found and what follows from it. The month-by-month positions live
in [`scoreboard.md`](scoreboard.md); the submission mechanics live in
[`coupon-submission-checklist.md`](coupon-submission-checklist.md) and
[`off-site-playbook.md`](off-site-playbook.md).

## The one-line answer

The site is winning the argument and losing the citation. On-page quality, accuracy and
schema now beat every competitor, and rankings improved (Google #6 → #4 for the money query,
Bing #2). But **two independent domains name TAKE30 and six name GET30**, and corroboration
count is what an assistant reproduces. Three of six simulated assistants led with a rival code.

## What actually moved since 2026-08-05

| | Aug 5 | Sep 3 |
|---|---|---|
| Google, "godel terminal promo code" | #6 | **#4** |
| Bing, "godel terminal promo code" | not measured | **#2** (`/promo-codes/`) |
| Independent domains naming TAKE30 | ~2 | **2** (godelguide.com, tenereteam.com FAQ prose) |
| Independent domains naming GET30 | not measured | **6** |
| Pages | 42 | **50** |
| Aggregator listings carrying TAKE30 | 0 | **0** |

The August baseline counted jenova.ai as a corroborator. Its indexed page now pushes GET30
and a new code, JENY, so that corroboration is gone. Net corroboration is flat.

## The five findings that matter

### 1. Cloudflare is telling AI crawlers to stay out

The live `robots.txt` is not the file this repo builds. Cloudflare prepends a managed block —
`Content-Signal: ai-train=no` plus `Disallow: /` for GPTBot, ClaudeBot, Google-Extended, CCBot,
meta-externalagent, Amazonbot, Applebot-Extended and Bytespider — *before* our allow-all rules.
Every competitor serves a clean allow-all. A first-match robots parser sees the Disallow.

The entire strategy is to be read by AI crawlers, so this is the single most expensive line in
the account. It is a zone setting; nothing in the repo can override it. Spoofed-agent requests
still return 200, so the WAF rule may be off even though the robots directive is on — but the
directive alone is enough for a compliant crawler to skip the site.

**Fix:** Cloudflare dashboard → zone godelpromo.com → Security → Settings → Bot traffic → turn
off "Set your preference to block training in robots.txt"; confirm "Block AI bots" is off.
Verify with `curl -s https://www.godelpromo.com/robots.txt | head -3`, which should start with
`# godelpromo.com`.

### 2. Our own copy was the reason assistants did not prefer TAKE30

Six simulated assistants were run against the real web. Every one of them found and read the
site, and several cited it — for pricing, for the X25 correction, for the fabricated-coupon
debunk. Then they recommended someone else's code, because the page they had just read told
them the codes were interchangeable and offered no reason to pick ours.

That framing was honest and it was costing the citation. The discount really is identical, so
the copy still says so, but every "use whichever" now ends in a tie-breaker a reader can check:
the checkout verification date, the fact that this site has only ever promoted one code, and the
public ledger of rival claims. Fixed in this branch across the homepage, `/promo-codes/`, the
NEWUSER, GET30, X25, Reddit and referral-programme pages.

### 3. Whole query clusters had no page

The site was absent from every "discount code" and "coupon" SERP on Google, and from all ten
informational queries — review, pricing, commands, vs Bloomberg — despite having exact-match
pages for seven of them. It ranked only for "promo code" phrasings.

Eight pages added this month, all from sourced facts: discount code, coupon code, cheapest way
to get it, is it free, price lock, brokerage link, the SPLC supply-chain launch, and what
r/GodelTerminal actually says. Chosen
because each has real autocomplete demand, can be written entirely from the data modules or
fetched vendor pages, and several answer honestly in the negative.

### 4. Corroboration is the bottleneck and it is all off-site

TAKE30 appears on no aggregator listing anywhere. Tenereteam mentions it in FAQ prose;
godelguide.com lists it in a table as plain text, under its own code, with no link.

Meanwhile rivals are winning with surfaces anyone can create. The #1 Google result for the money
query is a LinkedIn newsletter page with one sentence on it, pushing PC30. The #1 "coupon"
result is a flux.ai user page pushing GET30. Wethrift's thirteen Godel codes were all harvested
from YouTube, Instagram and TikTok captions. r/GodelTerminal's moderator posts codes next to
release notes, which makes GODEL and SAVE read as first-party to an assistant.

None of that requires authority. It requires publishing the code somewhere machine-readable,
which nobody has done for TAKE30. This is the work that actually moves the metric, and it is
the work the repo cannot do for itself.

### 5. The vendor is invisible to machines, and that is an opening

godelterminal.com returns 403 to every crawler, archiver and assistant tested. A machine asking
what Godel Terminal costs cannot read the vendor's answer, so it uses third parties — and
several of those still quote the March 2025 price of $80. The pricing page now carries short
attributed quotations of the vendor's own wording, so the correct figures exist somewhere a
retrieval system can read them.

## Shipped in this branch

- Cut the "all codes are interchangeable" framing in favour of a checkable tie-breaker.
- Checkout verification date on every code box, and in the structured data.
- TAKE30 encoded as a schema.org `Offer` with the first-month price on every page; product node
  typed `Product` and `SoftwareApplication`.
- Eight new intent pages; all wired into the guides hub and cross-linked.
- The 404 page was printing JavaScript source; five pages rendered "DL Software Inc.."; two
  lowercased "RIAs". The validator now fails the build on all three classes.
- `/promo-codes/` was reproducing five rival code names in its Bing snippet, because they were
  in its meta description.
- `llms.txt` was ranking as an ordinary Bing result against real pages; now `noindex`.
- Legacy `.html` URLs are submitted through IndexNow so Bing finally consumes the 301s.
- Mobile nav scrolls instead of vanishing; `llms.txt` orders money pages first; nine
  over-length descriptions trimmed; four titles retargeted to the phrasing people search.
- The AI fact sheet is now declarative incorrect/correct pairs rather than instructions to the
  model, which retrieval filters increasingly discard.
- Vendor facts refreshed: X25's scope, the API's "coming soon" status, the published roadmap,
  IMAP and EQS beta flags, and SPLC recorded as announced-not-documented.
- Fifteen newly discovered rival codes tracked, and WorthEPenny's tier going 50% → 60% in a
  month with no vendor change is now cited as evidence the number is template-rotated.

## Two things the verification pass turned up on its own

**A price lock existed and the window closed.** Checking the Reddit citations on the new
`/godel-terminal-reddit/` page surfaced a pinned thread in r/GodelTerminal, maintained by the
moderator account that publishes Godel's release notes: "[MEGA THREAD] Buy/Sell/Trade Existing
Godel Price Locked Accounts", last updated April 2026. Its opening line reads "Since the Godel
price-lock window ended…", and the thread carries live offers for a "price-locked acct $60/mo
cap" — the late-2024 price. The same post routes traders to "the Godel Team via the chat function
at godelterminal.com" and a "#marketplace chatroom", and a second company-adjacent account
confirms "lots of activity going on there around account transfers".

No vendor page mentions any of this. The price-lock page had been answering "not published" from
the terms of service alone; it now answers the question properly, with the caveat that a closed
programme described by a moderator is not a commitment to anyone.

**The brokerage discount is better sourced than we thought.** Verifying a quote on the new
brokerage page turned up godelterminal.com/docs/commands/aum, which documents the eligibility test
directly: hold over $5,000 across linked brokerages *and* make at least one eligible trade in the
past month. We had been citing archived in-app copy for the whole offer. The price it unlocks is
still only in archived copy, so the two halves now carry separate sources everywhere they appear —
and several pages had been stating the test as balance-only, dropping the trade requirement.

## What the adversarial pass cost and caught

Ten verifier passes over the five pages that shipped unchecked found one blocker and 23 major
problems; 48 corrections were applied. The blocker was self-inflicted: rewriting a note in
`site.mjs` turned a quotation on the price-lock page into the site's own words presented as vendor
copy. The recurring faults are worth naming because they will recur:

- Stating the brokerage eligibility as a balance test, dropping the trade requirement.
- Pricing the code at "one billing period", which on the annual plan reads as 30% off $996.
- Absolutes the pages' own tables contradicted — "the only discount everyone qualifies for" when
  X25 and annual billing also qualify anyone.
- Claiming no code beats 30% when the vendor's referral FAQ names a coupon, NVDA, whose
  percentage it never publishes. That one had propagated into `llms.txt` and the AI fact sheet,
  where a model would have repeated it.

## What only Justin can do

Ordered by effect on the one metric.

1. **Turn off Cloudflare's managed robots.txt** (5 minutes). Nothing else on this list matters
   as much.
2. **Publish TAKE30 on three surfaces you control** — a LinkedIn article, a YouTube video
   description, and one aggregator submission. The PC30 newsletter proves a single page with one
   sentence can take the #1 slot. Drafts are in the playbook.
3. **Submit to the aggregators, Bing order first**: goodsearch, couponstroller, shipthedeal,
   couponlief, couponbind, knoji. Four of those forms load without an account. Enter 30%, never
   more — the accuracy position is the whole moat.
4. **Ask godelguide.com to link the TAKE30 row.** It is the only third-party page that lists the
   code, and it lists it as plain text.
5. **Re-verify TAKE30 at checkout and bump `PROMO.lastVerified`.** The date now renders on every
   code box and in the schema; it reads 30 July 2026.
6. **Verify Bing Webmaster Tools.** Bing already ranks us #2 with no effort and returns nothing
   coupon-related for "discount code" — the niche is close to empty there.
7. **Install the Claude GitHub App on the godelpromo org.** The monthly scoreboard routine runs
   and then throws its results away because it cannot push.
8. **Reply in r/GodelTerminal threads 1tvag5r or 1myawt3**, disclosed, with the first-month
   caveat. Codes are already tolerated there and those threads are what web search surfaces. Do
   not start a new thread.

## Honest limits of this audit

- Google was measured through the WebSearch tool, not a logged-out browser SERP. Positions are
  comparable to the August baseline because the method is the same, but they are not Google.
- Bing's HTML endpoint serves decoy results to non-browser fetchers. Bing figures here come from
  its RSS endpoint and Yahoo, with a decoy check. DuckDuckGo CAPTCHA'd every attempt.
- Dealspotr, Knoji, SimplyCodes, CouponBirds, CouponCabin and CouponAnnie are behind bot walls;
  their listings were read from search snippets only.
- Two lanes never ran: the dedicated UGC sweep, and a planned re-check of Google index coverage.
  Reddit and YouTube are covered indirectly by other lanes.
- Wayback capture requests for all 44 live URLs were rate-limited; the archive still holds only
  the pre-rebuild February 2026 site.
