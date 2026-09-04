import { PRODUCT, PRICING, CASE_STUDY } from '../data/site.mjs';
import { VENDOR_PAGES, SENTIMENT, UNVERIFIED_CLAIMS } from '../data/research.mjs';
import { COMMANDS } from '../data/commands.mjs';
import { ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const N = COMMANDS.find((c) => c.mnemonic === 'N');
const TOP = COMMANDS.find((c) => c.mnemonic === 'TOP');
const TREND = COMMANDS.find((c) => c.mnemonic === 'TREND');
const EVT = COMMANDS.find((c) => c.mnemonic === 'EVT');
const AL = COMMANDS.find((c) => c.mnemonic === 'AL');

/** The pricing page's own phrase, quoted rather than adopted. */
const MARKETING_PHRASE = 'news in milliseconds';

/** r/algotrading, February 2025 — the only speed comment in SENTIMENT. */
const SPEED_COMMENT = SENTIMENT.positive.find((p) => p.quote.includes('fastest news feeds'));

/** The affiliate-only source count, kept out of the body as a claim. */
const SOURCE_COUNT_CLAIM = UNVERIFIED_CLAIMS.find((c) => c.includes('news sources'));

/** Keyword slots per list in the N advanced filter, per the vendor doc. */
const KEYWORD_SLOTS = 20;

const faqs = [
  {
    q: 'Is the Godel Terminal news feed real-time?',
    a: `The vendor's coverage page lists news latency as real-time, globally, alongside "global news wires &amp; press releases". The pricing page goes further and says "${MARKETING_PHRASE}". Neither figure is measurable from outside, and the N command documentation — the longest thing ${esc(PRODUCT.vendor)} publishes about news — states no latency, no refresh interval and no service commitment at all. Read "real-time" as the coverage tier and "milliseconds" as positioning.`,
  },
  {
    q: 'Can I filter Godel Terminal news by watchlist?',
    a: `Yes. The N window has a watchlist dropdown with three modes: a specific watchlist, All Watchlists, or No Watchlist. Watchlists are built in QM, which the vendor documents as taking batch imports of up to 400 tickers per list. The catch is that the account-wide advanced filters still apply on top of the watchlist scope, so a quiet watchlist feed may be quiet because of a source or keyword rule set in a different window.`,
  },
  {
    q: 'What news sources does Godel Terminal use?',
    a: `The vendor's coverage page describes the feed as global news wires and press releases, multi-source, without naming a wire. The N documentation names four in passing — its recommended default set "already includes Reuters, Bloomberg, AP, Dow Jones etc." — and says the exact source list ships with the terminal and can change. The full list is visible in the source picker in-app, with a document count beside each feed, and is not published on the web. ${esc(SOURCE_COUNT_CLAIM || '')}`,
  },
  {
    q: 'Is TREND available on the free trial?',
    a: `No. The TREND documentation states it requires a paid subscription and "is not available on free (piker) or trial accounts". That makes it one of the few documented commands the ${PRICING.freeTrial.days}-day trial does not reach. N and TOP are both documented as available on every plan.`,
  },
  {
    q: 'How many news windows can I open at once?',
    a: `The vendor's own N page answers this twice and does not agree with itself. Its body says anonymous and piker users are "capped at 2 N windows per screen, no hard cap across screens"; its FAQ says "Free users get a single News window; paid subscribers can open multiple News windows at once". Both were on the page in September 2026. Paid accounts are described as unlimited either way, so the disagreement only affects free users — check the behaviour in your own account rather than either sentence.`,
  },
  {
    q: 'Does Godel Terminal read headlines out loud?',
    a: `Yes, for paid accounts. The N doc documents text-to-speech as a per-window toggle at the bottom left, with voice, speed and window selection set from the Audio menu, and describes it as available to paid users. TOP has its own speaker icon for the same purpose. Neither page says anything about which languages the voices cover.`,
  },
  {
    q: 'Is TOP just a filtered version of N?',
    a: `No — they are separate windows with separate logic. TOP shows Reuters' own Top News selection, 15 headlines, ordered by a Reuters-assigned rank rather than by time, with no filters documented on it. N is the filterable feed across every source you have enabled, sorted most-recent-first by default. Using one does not configure the other.`,
  },
];

export const page = {
  path: '/godel-terminal-news-feed/',
  title: 'Godel Terminal News Feed: N, TOP and TREND Explained',
  description: 'What the Godel Terminal news feed does: N and its two filter layers, TOP as the Reuters-ranked top 15, TREND as paid-only attention data, and the gaps.',
  summary: 'Vendor-sourced breakdown of the Godel Terminal news feed — the N window and its two filter layers, TOP as a Reuters-ranked top 15, TREND as paid-only search-attention data, and what the vendor does not publish about latency or sources.',
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

<p class="lede">News is the capability ${esc(PRODUCT.name)} markets hardest. Its pricing page uses the phrase
"${MARKETING_PHRASE}" twice, and the customer quote it publishes ends on the same idea: "${esc(CASE_STUDY.quote)}"
(${esc(CASE_STUDY.person)}, ${esc(CASE_STUDY.role)}, ${esc(CASE_STUDY.source)}). Underneath the marketing there are
three documented windows doing three different jobs — <strong>N</strong>, the filterable feed;
<strong>TOP</strong>, a Reuters-ranked top 15; and <strong>TREND</strong>, which is not news at all but a measure of
what other ${esc(PRODUCT.name)} users are searching. This page covers what each one is documented to do, and where
the documentation runs out.</p>

${note(`<strong>Sourcing:</strong> the mechanics below come from ${esc(PRODUCT.vendor)}'s own command pages for
<a href="${N.docUrl}" rel="nofollow noopener" target="_blank">N</a>,
<a href="${TOP.docUrl}" rel="nofollow noopener" target="_blank">TOP</a> and
<a href="${TREND.docUrl}" rel="nofollow noopener" target="_blank">TREND</a>, read in September 2026, plus the
<a href="${VENDOR_PAGES.dataCoverage}" rel="nofollow noopener" target="_blank">coverage page</a> and the
<a href="${VENDOR_PAGES.pricing}" rel="nofollow noopener" target="_blank">pricing page</a>. Where a number is not on
one of those pages, this page says so rather than estimating it.`)}

<h2>The three windows, side by side</h2>

${table({
  head: ['Window', 'What it shows', 'Ordering', 'Plans', 'Published refresh'],
  rows: [
    {
      highlight: true,
      cells: [
        '<strong>N</strong>',
        'Filtered news across enabled sources, global or scoped to a security or watchlist',
        'Most recent first by default; sort state remembered per window',
        'Every plan; the window count differs (see below)',
        'Not published',
      ],
    },
    {
      cells: [
        '<strong>TOP</strong>',
        "Reuters' own Top News selection — 15 headlines",
        'Reuters-assigned rank, explicitly not chronological',
        '"Available on every Godel plan"',
        'Stated as live, no interval given',
      ],
    },
    {
      cells: [
        '<strong>TREND</strong>',
        `Most-searched tickers across ${esc(PRODUCT.name)} users, with price and volume beside each`,
        'Search count over a 1H, 24H, week or month window',
        'Paid only — not free (piker) or trial accounts',
        'Every 30 seconds',
      ],
    },
  ],
  caption: 'Per the vendor command documentation for N, TOP and TREND, September 2026.',
})}

<h2>"Milliseconds" is a claim, not a measurement</h2>

<p class="prose">The pricing page's feature sentence is "real-time Nasdaq quotes, ${MARKETING_PHRASE}, SEC filings,
financials, charting, and the full command set". The coverage page is more restrained: it lists news as real-time,
global, described as "global news wires &amp; press releases". Those are the two places the vendor commits to
anything about speed, and neither states a number you could hold it to — no median latency, no wire-to-screen
figure, no uptime or delivery commitment. The N documentation, which runs to filters, keyboard shortcuts and window
limits, does not mention latency once.</p>

<p class="prose">The one outside comment on feed speed is a community one: ${esc(SPEED_COMMENT.who)} in
${esc(SPEED_COMMENT.when)} called it the "${esc(SPEED_COMMENT.quote)}" — the same comment that flagged the
${esc(SPEED_COMMENT.note)}. That is one person's impression, not a benchmark, and this site weights it as sentiment.
Nothing published lets anyone verify a millisecond figure from outside the product, so treat the phrase as
positioning and judge the feed on the ${PRICING.freeTrial.days}-day trial instead.</p>

<h2>N: one window, two layers of filters</h2>

<p class="prose">Typing <span class="mono">N</span> bare opens the global feed across every source you have enabled.
Prefixing a security scopes it — the doc's example is <span class="mono">NVDA US EQ N</span>. CN and NH are typed
aliases that open the same window, listed in the
<a href="/godel-terminal-commands/">command reference</a>. Columns are Headline, Date, Time, Ticker (the primary
tagged symbol, when there is one) and Source.</p>

<p class="prose">The structural thing to understand before you trust the feed is that filtering happens in
<strong>two layers that combine on every request</strong>:</p>

<ul class="prose">
  <li><strong>Per-window (local).</strong> The search box, the watchlist dropdown and the date range. These belong to
  the window you are looking at, and the Clear button resets only these.</li>
  <li><strong>Advanced (global).</strong> Sources, categories, languages, keyword includes, keyword excludes and the
  class-action filter. These are account-wide settings that apply to every N window you open.</li>
</ul>

<p class="prose">That design has a failure mode worth naming: a feed that looks empty may be empty because of a global
rule set in a different window on a different day, not because nothing happened. The doc's answer is the Info panel at
the bottom left, which expands to list every active filter split into the two groups — query filters for this window,
advanced filters for the account. If a headline you expected is missing, that panel is the audit trail.</p>

<h3>The filter controls in detail</h3>

<ul class="prose">
  <li><strong>Source and category picker.</strong> Three columns — top-level categories, subcategories, then individual
  feeds with a document count beside each. Checkboxes are tri-state: neutral, included, excluded. Both the category
  and the source columns are searchable.</li>
  <li><strong>Include and exclude keyword lists.</strong> Up to ${KEYWORD_SLOTS} strings each. An article must match at
  least one include term to show; anything matching an exclude term is hidden. The doc's own noise-floor suggestions
  are terms like insider buying, 13F and boilerplate alert wording.</li>
  <li><strong>Class-action filter.</strong> Three states — Show (the default), Hide and Only. The doc's own comment on
  hiding them is that "Most users will want this on", which is an unusually direct admission that the default setting is
  the wrong one for most readers.</li>
  <li><strong>Set to Recommended.</strong> One button that resets the global layer to a curated default: a vetted source
  mix, typical exclusions and English-language defaults.</li>
  <li><strong>Pause.</strong> Freezes the visible list while fetching continues in the background, so you can read
  without the rows moving under you.</li>
</ul>

<p class="prose">Clicking a row opens the article in a reader pane. The doc is specific about how that is rendered:
sanitized HTML with links, inline images and text preserved while scripts and iframes are stripped — a sensible thing
for a vendor to state plainly, since the alternative is executing third-party markup inside a financial terminal.
Articles export to PDF, and the open article persists in the window's saved properties, so a reloaded
<a href="/godel-terminal-layouts-and-shortcuts/">layout</a> reopens it.</p>

<h2>Scoping the feed to a watchlist</h2>

<p class="prose">The watchlist dropdown has three settings: one named watchlist, All Watchlists, or No Watchlist. The
lists themselves come from QM, which the vendor documents as accepting batch imports of up to 400 tickers per list —
so "my portfolio's news" is a dropdown selection rather than a keyword rule. The N doc's suggested pattern for paid
accounts is two windows at once: one scoped to a watchlist with speech enabled, and one global window with wide
filters for everything else.</p>

<p class="prose">Text-to-speech is the part that makes that pattern more than cosmetic. It is a per-window toggle,
documented for paid accounts, with voice and speed set from the Audio menu, so one window can announce headlines on
your names while another stays silent. Separately, the doc describes a red alert banner in the bottom-right corner for
high-impact stories; what qualifies a story as high-impact is not published.</p>

<h2>How many N windows you get</h2>

<p class="prose">Here the vendor's own page disagrees with itself, and the disagreement is worth recording rather than
smoothing over. The body of the N documentation says anonymous and piker users are "capped at 2 N windows per screen,
no hard cap across screens". The FAQ at the bottom of the same page says "Free users get a single News window; paid
subscribers can open multiple News windows at once". Two windows or one — both sentences were live in September 2026.
Paid accounts are described as unlimited across and within screens in both places, so the ambiguity only bites free
users. If the number matters to you, the in-app behaviour is the answer; neither sentence is.</p>

<h2>TOP: Reuters' ranking, not yours</h2>

<p class="prose">${esc(TOP.summary)} The detail that separates it from N is the ordering. TOP is not sorted by time —
the sequence is Reuters' own priority ranking, with Rank 1 at the top, and it re-orders live as Reuters re-ranks. The
columns are Rank, Headline and Time. Arrow keys move between headlines and Enter opens one; there is a speaker icon
for speech, and no filter controls are documented on the window at all.</p>

<p class="prose">So TOP is a deliberately unconfigurable window: a single curated wire feed with someone else's
editorial judgement applied. Reuters is the wire named on that page. What the doc does not publish: how often the
ranking is polled, whether the count of 15 can be changed, and whether any non-Reuters top feed exists behind the same
mnemonic.</p>

<h2>TREND: attention, not news</h2>

<p class="prose">TREND sits in the same category as the news windows but measures something else entirely — it ranks
tickers by how often ${esc(PRODUCT.name)} users searched them. Any ticker search, in any component or the main terminal,
counts toward the total, and the counts are aggregated across all users. Timeframes are 1H (minute intervals), 24H,
week and month (hourly intervals for the last three). Alongside the search count you get the company name, a sparkline,
last price, change, change percent, volume and the last trade time. It refreshes every 30 seconds — the only refresh
interval the vendor publishes across any of these three windows.</p>

<p class="prose">Two caveats. First, TREND requires a paid subscription and is documented as unavailable on free
(piker) and trial accounts, so it is not something you can evaluate during the
<a href="/godel-terminal-free-trial/">free trial</a>. Second, and more important for how you read it: this is the
attention of one product's user base, not the market's. ${esc(PRODUCT.name)} publishes no user count anywhere we can
cite, so the denominator behind those search counts is unknown. It is a useful read on what the room is looking at; it
is not a sentiment index. If you want session activity measured in shares rather than searches, MOST ranks the actual
movers by volume, change and value.</p>

<h2>What is in the feed, and what is not published</h2>

<p class="prose">The coverage page groups news as "global news wires &amp; press releases", described as news,
documents and releases, multi-source, with real-time latency and global reach. It names no wire. The N doc names four
in passing, as members of the recommended default set: Reuters, Bloomberg, AP and Dow Jones, followed by an "etc." that
is doing real work — the doc adds that the exact source list ships with the terminal and can change. The complete list
exists in the source picker, with a document count beside each feed, and has never been published as a web page.</p>

<p class="prose">That matters because the loudest number in search results is not the vendor's. ${esc(SOURCE_COUNT_CLAIM || '')}
Treat the four names above as the only wires ${esc(PRODUCT.vendor)} itself puts in writing.</p>

<p class="prose">Also worth separating from the news feed: earnings call transcripts are a distinct line on the
coverage page, with next-day latency rather than real-time, and they live behind TRAN rather than N. Full delay tiers
for everything else are on the <a href="/godel-terminal-data-coverage/">data coverage page</a>.</p>

<h2>The gaps</h2>

<ul class="prose">
  <li><strong>Any latency figure.</strong> Not published in any unit, on any page.</li>
  <li><strong>The full source list.</strong> In-app only.</li>
  <li><strong>Archive depth.</strong> The date filter offers a "Before &lt;date&gt;" cutoff for older coverage, but
  nothing states how far back the archive goes.</li>
  <li><strong>Headline analytics.</strong> No sentiment scoring, no relevance model, no entity tagging beyond the single
  primary-ticker column is documented.</li>
  <li><strong>News-triggered alerts.</strong> ${esc(AL.summary)} A keyword or headline condition is not among the
  documented alert types, so watchlist scoping plus speech is the closest published substitute.</li>
  <li><strong>A consolidated event timeline.</strong> ${esc(EVT.summary)} The doc page exists; the command does not ship
  yet, per the vendor's own marking.</li>
</ul>

<h2>Related reading</h2>

<ul class="prose">
  <li>Every command with its provenance tier: <a href="/godel-terminal-commands/">the command reference &rarr;</a></li>
  <li>What else the feed sits on top of, and at what delay: <a href="/godel-terminal-data-coverage/">data coverage &rarr;</a></li>
  <li>Whether the whole product is worth the money: <a href="/godel-terminal-review/">the review &rarr;</a></li>
  <li>Running two news windows side by side: <a href="/godel-terminal-layouts-and-shortcuts/">layouts and shortcuts &rarr;</a></li>
</ul>

${ctaRow({ secondary: { href: '/godel-terminal-free-trial/', label: 'Test the feed on the trial' } })}

${faqSection(faqs)}
`;
  },
};
