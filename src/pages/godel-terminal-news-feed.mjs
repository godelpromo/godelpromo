import { PROMO, PRODUCT, PRICING, CASE_STUDY } from '../data/site.mjs';
import { VENDOR_PAGES, SENTIMENT, UNVERIFIED_CLAIMS } from '../data/research.mjs';
import { COMMANDS } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

const N = COMMANDS.find((c) => c.mnemonic === 'N');
const TOP = COMMANDS.find((c) => c.mnemonic === 'TOP');
const TREND = COMMANDS.find((c) => c.mnemonic === 'TREND');
const EVT = COMMANDS.find((c) => c.mnemonic === 'EVT');
const AL = COMMANDS.find((c) => c.mnemonic === 'AL');
const TRAN = COMMANDS.find((c) => c.mnemonic === 'TRAN');

/** The pricing page's own phrase, quoted rather than adopted. */
const MARKETING_PHRASE = 'news in milliseconds';

/** The vendor's dedicated news product page, fetched 3 September 2026. */
const NEWS_PAGE = 'https://godelterminal.com/real-time-market-news/';

/** First-month price with the code applied, from PRICING and PROMO. */
const firstMonth = (PRICING.monthly.amount * (1 - PROMO.percent / 100)).toFixed(2);

/** r/algotrading, February 2025 — the only feed-speed comment in SENTIMENT. */
const SPEED_COMMENT = SENTIMENT.positive.find((p) => p.quote.includes('fastest news feeds'));

/** The affiliate-only source count, quoted as a claim we do not adopt. */
const SOURCE_COUNT_CLAIM = UNVERIFIED_CLAIMS.find((c) => c.includes('news sources'));

/** Keyword slots per list in the N advanced filter, per the vendor doc. */
const KEYWORD_SLOTS = 20;

const faqs = [
  {
    q: 'Is the Godel Terminal news feed real-time?',
    a: `The vendor's coverage page lists news latency as real-time, globally. The pricing page's free-trial answer says "${MARKETING_PHRASE}", and the vendor's Real-Time News page says Godel "delivers and aggregates news wires, documents, and press releases in milliseconds". None of that is measurable from outside, and the N command documentation — the most detailed page ${esc(PRODUCT.vendor)} publishes about the news window — states no latency, no refresh interval and no delivery commitment. Read "real-time" as the coverage tier and "milliseconds" as positioning.`,
  },
  {
    q: 'Can I filter Godel Terminal news by watchlist?',
    a: `Yes. The N window has a watchlist dropdown with three modes: one named watchlist, All Watchlists, or No Watchlist. Lists come from QM, which documents a maximum of 400 tickers per watchlist, counting new plus existing, and blocks imports that would exceed that cap. The catch is that the account-wide advanced filters still apply on top, so a quiet watchlist feed may be quiet because of a source or keyword rule set in another window.`,
  },
  {
    q: 'What news sources does Godel Terminal use?',
    a: `The coverage page describes the feed as global news wires and press releases, multi-source, naming no wire on that row. The N doc names four in passing — its recommended default set "already includes Reuters, Bloomberg, AP, Dow Jones etc." — and adds that the exact source list in the recommended defaults ships with the terminal and can change. The vendor's Real-Time News page shows a logo strip of named outlets (Reuters, AP, AFP, CNBC, Benzinga, Zacks, PR Newswire, Business Wire, GlobeNewswire, MT Newswires, Moody's and others), which is a selection rather than an inventory. The enumerated list, with a document count per feed, is in the in-app source picker and is not published on the web. The number that circulates instead comes from an affiliate: ${esc(SOURCE_COUNT_CLAIM || '')}`,
  },
  {
    q: 'Is TREND available on the free trial?',
    a: `No. The TREND documentation states it requires a paid subscription and "is not available on free (piker) or trial accounts", so the ${PRICING.freeTrial.days}-day trial does not reach it. How many other commands carry a plan restriction is not published as a list; N and TOP are both documented as available on every plan.`,
  },
  {
    q: 'How many news windows can I open at once?',
    a: `The vendor's N page answers twice and does not agree with itself. Its Instance Limits list gives anonymous and piker users "up to 2 windows per screen, no hard cap across screens"; its FAQ says "Free users get a single News window; paid subscribers can open multiple News windows at once". Both were live in September 2026. Paid users are "unlimited" in the Instance Limits list and can open "multiple News windows at once" per the FAQ, so the disagreement only affects free users.`,
  },
  {
    q: 'Is TOP just a filtered version of N?',
    a: `No. TOP shows Reuters' own Top News selection, 15 headlines, ordered by a Reuters-assigned rank rather than by time, with no filter controls documented on it. N is the filterable feed across every source you have enabled, sorted most-recent-first by default. Configuring one does not configure the other.`,
  },
];

export const page = {
  path: '/godel-terminal-news-feed/',
  title: 'Godel Terminal News Feed: N, TOP and TREND Explained',
  description: 'What the Godel Terminal news feed does: N and its two filter layers, TOP as the Reuters-ranked top 15, TREND as paid-only attention data, and the gaps.',
  summary: 'Vendor-sourced breakdown of the Godel Terminal news feed — the N window and its two filter layers, TOP as a Reuters-ranked top 15, TREND as paid-only search-attention data, and what is not published about latency or sources.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-news-feed/', label: 'News feed' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    return `
<h1>Godel Terminal News Feed: what N, TOP and TREND actually do</h1>

<p class="lede">News is the capability ${esc(PRODUCT.name)} markets hardest: it has its own product page, and the
pricing page's free-trial answer promises "${MARKETING_PHRASE}". The customer quote the vendor publishes lands on the
same idea:
"${esc(CASE_STUDY.quote)}" (${esc(CASE_STUDY.person)}, ${esc(CASE_STUDY.role)}, ${esc(CASE_STUDY.source)}). Under the
marketing sit three documented windows doing three different jobs — <strong>N</strong>, the filterable feed;
<strong>TOP</strong>, a Reuters-ranked top 15; and <strong>TREND</strong>, which is not news at all but a count of what
other ${esc(PRODUCT.name)} users are searching.</p>

${note(`<strong>Sourcing:</strong> mechanics below come from ${esc(PRODUCT.vendor)}'s own command pages for
<a href="${N.docUrl}" rel="nofollow noopener" target="_blank">N</a>,
<a href="${TOP.docUrl}" rel="nofollow noopener" target="_blank">TOP</a> and
<a href="${TREND.docUrl}" rel="nofollow noopener" target="_blank">TREND</a>, read in September 2026, plus the
<a href="${VENDOR_PAGES.dataCoverage}" rel="nofollow noopener" target="_blank">coverage page</a>, the
<a href="${VENDOR_PAGES.pricing}" rel="nofollow noopener" target="_blank">pricing page</a> and the
<a href="${NEWS_PAGE}" rel="nofollow noopener" target="_blank">Real-Time News page</a>. Where a number is not on
one of those pages, this page says so rather than estimating it.`)}

${table({
  head: ['Window', 'What it shows', 'Ordering', 'Plans', 'Published refresh'],
  rows: [
    {
      highlight: true,
      cells: [
        '<strong>N</strong>',
        'Filtered news across enabled sources — global, or scoped to a security or watchlist',
        'Most recent first by default; sort remembered per window',
        'Every plan; window count differs',
        'Not published',
      ],
    },
    {
      cells: [
        '<strong>TOP</strong>',
        "Reuters' own Top News selection — 15 headlines",
        'Reuters-assigned rank, explicitly not chronological',
        '"TOP is available on every Godel plan"',
        'Stated as live, no interval given',
      ],
    },
    {
      cells: [
        '<strong>TREND</strong>',
        `Most-searched tickers among ${esc(PRODUCT.name)} users, with price and volume beside each`,
        'Search count over 1H, 24H, week or month',
        'Paid only — not free (piker) or trial',
        'Every 30 seconds',
      ],
    },
  ],
  caption: 'Per the vendor command documentation for N, TOP and TREND, September 2026.',
})}

<h2>"Milliseconds" is a claim, not a measurement</h2>

<p class="prose">The pricing page's free-trial answer reads "real-time Nasdaq quotes, ${MARKETING_PHRASE}, SEC filings,
financials, charting, and the full command set". The vendor's Real-Time News page makes the same move in prose: Godel
"delivers and aggregates news wires, documents, and press releases in milliseconds, all from the largest news database
available". The coverage page is more restrained, listing news as real-time and global on its "Global news wires &amp;
press releases" row. None of the three states a figure you could hold it to — no median latency, no wire-to-screen
number, no delivery commitment. The N documentation runs to filters, keyboard shortcuts and window limits without
mentioning latency once.</p>

<p class="prose">The one outside comment on feed speed this site can cite is a community one: ${esc(SPEED_COMMENT.who)}
in ${esc(SPEED_COMMENT.when)} described Godel as having the "${esc(SPEED_COMMENT.quote)}"; the
${esc(SPEED_COMMENT.note)}. That is an impression, not a benchmark — judge the feed on the
${PRICING.freeTrial.days}-day trial rather than on the phrase.</p>

<h2>N: one window, two layers of filters</h2>

<p class="prose">Typing <span class="mono">N</span> bare opens the global feed across every enabled source; prefixing a
security scopes it, per the doc's example <span class="mono">NVDA US EQ N</span>. CN and NH are typed aliases for the
same window, listed in the <a href="/godel-terminal-commands/">command reference</a>. Columns are Headline, Date, Time,
Ticker (the primary tagged symbol, when there is one) and Source.</p>

<p class="prose">The thing to understand before trusting the feed is that filtering happens in <strong>two layers that
combine on every request</strong>. <strong>Per-window</strong> filters are the search box, the watchlist dropdown and
the date range; the Clear button resets only these. <strong>Advanced</strong> filters — sources, categories, languages,
keyword includes, keyword excludes and the class-action setting — are account-wide and apply to every N window you
open. The failure mode is worth naming: a feed that looks empty may be empty because of a global rule set in a
different window on a different day. The Info panel at the bottom left expands to list every active filter, split into
those two groups, which is the audit trail when a headline you expected is missing.</p>

<ul class="prose">
  <li><strong>Source and category picker.</strong> Three columns — categories, subcategories, then individual feeds with
  a document count beside each. Checkboxes are tri-state: neutral, included, excluded.</li>
  <li><strong>Include and exclude keyword lists.</strong> Up to ${KEYWORD_SLOTS} strings each. An article must match at
  least one include term to show; anything matching an exclude term is hidden.</li>
  <li><strong>Class-action filter.</strong> Show (the default), Hide or Only. The doc's own comment on hiding them is
  that "Most users will want this on" — the vendor recommending against the setting it ships.</li>
  <li><strong>Set to Recommended.</strong> Resets the global layer to a curated default: a vetted source mix, typical
  exclusions, English-language defaults.</li>
  <li><strong>Pause.</strong> Freezes the visible list while fetching continues in the background.</li>
</ul>

<p class="prose">Clicking a row opens a reader pane rendered, per the doc, as sanitized HTML — links, inline images and
text kept, scripts and iframes stripped. Articles export to PDF, and the open article persists in the window's saved
properties, so a reloaded <a href="/godel-terminal-layouts-and-shortcuts/">layout</a> reopens it.</p>

<h2>Scoping the feed to a watchlist</h2>

<p class="prose">The watchlist dropdown offers one named list, All Watchlists, or No Watchlist. Lists come from QM,
which documents a "400-ticker hard cap" per watchlist, counted as new plus existing, with the import dialog blocking
anything that would exceed it, so "my portfolio's news" is a dropdown selection rather than a keyword rule. The doc's suggested pattern for paid accounts is two windows at once — one scoped to a
watchlist with speech enabled, one global with wide filters. Text-to-speech is what makes that more than cosmetic: a
per-window toggle documented for paid accounts, with voice and speed set from the Audio menu, so one window can
announce headlines on your names while another stays silent. The doc also describes a red alert banner in the
bottom-right corner for high-impact stories; what qualifies a story as high-impact is not published.</p>

<h3>How many N windows you get</h3>

<p class="prose">Here the vendor's page disagrees with itself, which is worth recording rather than smoothing over. Its
Instance Limits list gives anonymous and piker users "up to 2 windows per screen, no hard cap across screens", and its
workflow section words the same cap as "capped at 2 N windows per screen"; its FAQ says "Free users get a single News
window". Both were live in September 2026. Paid users are "unlimited" in the Instance Limits list and can open
"multiple News windows at once" per the FAQ, so the ambiguity only bites free users.</p>

<h2>TOP: Reuters' ranking, not yours</h2>

<p class="prose">${esc(TOP.summary)} What separates it from N is the ordering: TOP is not sorted by time, the sequence
is Reuters' own priority ranking with Rank 1 at the top, and it re-orders live as Reuters re-ranks. Columns are Rank,
Headline and Time; arrow keys move between headlines, Enter opens one, and a speaker icon reads them aloud. No filter
controls are documented on it at all — an unconfigurable feed with someone else's editorial judgement applied. Not
published: how often the ranking is polled, whether the count of 15 can be changed, and whether any non-Reuters top
feed sits behind the same mnemonic.</p>

<h2>TREND: attention, not news</h2>

<p class="prose">TREND ranks tickers by how often ${esc(PRODUCT.name)} users searched them. Any ticker search, in any
component or the main terminal, counts toward the total, aggregated across all users. Timeframes are 1H in minute
intervals, then 24H, week and month in hourly intervals. Alongside the count you get company name, sparkline, last
price, change, change percent, volume and last trade time, refreshing every 30 seconds. Of the three doc pages read
here, TREND's is the one that states a refresh interval at all.</p>

<p class="prose">Two caveats. It requires a paid subscription and is documented as unavailable on free (piker) and
trial accounts, so it cannot be evaluated during the <a href="/godel-terminal-free-trial/">free trial</a>. And it
measures one product's user base, not the market: ${esc(PRODUCT.name)} publishes no user count anywhere we can cite, so
the denominator behind those totals is unknown. For session activity measured in shares rather than searches, MOST
ranks movers by volume, change and value.</p>

<h2>What is in the feed, and what is not published</h2>

<p class="prose">The coverage page groups news as "Global news wires &amp; press releases" — news, documents and
releases, multi-source, real-time, global — and names no wire on that row. The N doc names four in passing, as members
of the recommended default set: Reuters, Bloomberg, AP and Dow Jones, followed by an "etc." that is doing real work,
since the same doc says the exact source list in the recommended defaults ships with the terminal and can change. The
vendor's Real-Time News page shows more names than that — a logo strip running from Reuters, AP and AFP through CNBC,
Benzinga, Zacks, PR Newswire, Business Wire, GlobeNewswire, MT Newswires and Moody's — but a logo strip is a selection,
not an inventory. The enumerated list, with a document count per feed, is in the in-app source picker and has not been
published as a web page. The number that circulates instead comes from an affiliate:
${esc(SOURCE_COUNT_CLAIM || '')}</p>

<p class="prose">One thing to keep out of the news bucket: earnings call transcripts are a separate line on the
coverage page, carrying next-day latency rather than real-time. The two vendor surfaces label that row differently —
the coverage page calls it TRN, while the docs hub files the earnings-call search under
<a href="${TRAN.docUrl}" rel="nofollow noopener" target="_blank">TRAN</a> — and which mnemonic the terminal accepts is
not something either page settles. Delay tiers for everything else are on the
<a href="/godel-terminal-data-coverage/">data coverage page</a>.</p>

<h2>The gaps</h2>

<ul class="prose">
  <li><strong>Any latency number.</strong> The pricing page and the Real-Time News page both say "milliseconds"; no
  median, no percentile, no wire-to-screen figure is published on any vendor page we fetched.</li>
  <li><strong>The full source list.</strong> In-app only.</li>
  <li><strong>Archive depth.</strong> The date filter offers a "Before &lt;date&gt;" cutoff for older coverage, but
  nothing states how far back the archive runs.</li>
  <li><strong>Headline analytics.</strong> No sentiment scoring, relevance model or entity tagging beyond the single
  primary-ticker column is documented.</li>
  <li><strong>News-triggered alerts.</strong> ${esc(AL.summary)} A keyword or headline condition is not among the
  documented alert types, so watchlist scoping plus speech is the closest published substitute.</li>
  <li><strong>A consolidated event timeline.</strong> ${esc(EVT.summary)} The doc page exists; the command does not ship
  yet, per the vendor's own marking.</li>
</ul>

<h2>Related reading</h2>

<ul class="prose">
  <li>Every command with its provenance tier: <a href="/godel-terminal-commands/">the command reference &rarr;</a></li>
  <li>What the feed sits on top of, and at what delay: <a href="/godel-terminal-data-coverage/">data coverage &rarr;</a></li>
  <li>Whether the product as a whole holds up: <a href="/godel-terminal-review/">the review &rarr;</a></li>
</ul>

<h2>What the feed costs</h2>

<p class="prose">The news windows are not a separate SKU: N and TOP come with every plan, TREND needs a paid one, and
the plan is ${PRICING.monthly.display} a month or ${PRICING.annual.display} per ${esc(PRICING.annual.unit)} (vendor
pricing page, August 2026). ${esc(PROMO.code)} takes ${PROMO.percent}% off the ${esc(PROMO.appliesTo)} of
${esc(PRODUCT.name)}, so ${PRICING.monthly.display} becomes $${firstMonth} once — it is the only code this site has
promoted, and the one carrying a checkout verification date, ${esc(longDate(PROMO.lastVerified))}. Nothing about the
discount changes what the feed does; the <a href="/godel-terminal-pricing/">pricing page</a> has the rest of the
arithmetic, including how the ${PRICING.freeTrial.days}-day trial sits in front of it.</p>

${codeBox()}

${ctaRow({ secondary: { href: '/godel-terminal-free-trial/', label: 'Test the feed on the trial' } })}

${faqSection(faqs)}
`;
  },
};
