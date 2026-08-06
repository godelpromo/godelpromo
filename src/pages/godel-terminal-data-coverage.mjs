import { PRODUCT } from '../data/site.mjs';
import { DATA_COVERAGE, PLATFORMS, ROADMAP, VENDOR_PAGES } from '../data/research.mjs';
import { ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `Is Godel Terminal real-time?`,
    a: `For US markets, yes: the vendor's coverage page states real-time data for all US exchanges, OTC, major FX pairs, commodity futures, crypto and US options. Most international equities — Euronext, LSE, Tokyo, Shanghai, Hong Kong, Australia — are 15-minute delayed, and international indices plus some soft commodities run at a 25-minute delay. The honest answer is a split, not a yes.`,
  },
  {
    q: `Does Godel Terminal have crypto data?`,
    a: `Yes — spot pairs across major venues, including BTC, ETH, SOL and stablecoins, listed as real-time on the vendor's coverage page. Nothing is published about crypto derivatives or futures coverage, so treat those as out of scope until the vendor says otherwise.`,
  },
  {
    q: `Does Godel Terminal cover bonds or fixed income?`,
    a: `Effectively no. No bond product page exists on the vendor's site, and third-party reviews consistently describe fixed-income desks as a non-fit. If bonds are your workflow, this is the wrong terminal today.`,
  },
  {
    q: `Does Godel Terminal have Level 2 market depth?`,
    a: `What the documentation supports: <strong>TAS</strong> streams every individual trade — price, size, venue and condition code — and <strong>ALLQ</strong> (beta) shows live bid, ask, last and volume for every listing of a security across venues, with bid/ask requiring registration. A full depth-of-book Level 2 ladder is not published in any vendor material we can find, so we will not claim one exists.`,
  },
  {
    q: `Which options markets does Godel Terminal cover?`,
    a: `US equity and ETF options, sourced via OPRA and Cboe per the vendor's coverage page. The documented chain command is <strong>OMON</strong>: every strike and expiration with live bid, ask, last, volume, implied volatility and full Greeks.`,
  },
];

export const page = {
  path: '/godel-terminal-data-coverage/',
  title: `Godel Terminal Data Coverage: Markets, Depth and Gaps`,
  description: `What data Godel Terminal actually carries — equities, options, futures, FX, commodities, filings — what is documented, and where the gaps are.`,
  summary: 'Vendor-sourced map of Godel Terminal data coverage: asset classes, the real-time vs delayed split, and the honest gaps (fixed income, depth-of-book).',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-data-coverage/', label: 'Data coverage' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    const assetList = DATA_COVERAGE.assetClasses.map((a) => `<li>${esc(a)}</li>`).join('\n  ');
    return `
<h1>Godel Terminal data coverage: what it carries, at what delay</h1>

<p class="lede">${esc(PRODUCT.name)} carries global equities and ETFs, major indices, futures, FX,
spot crypto, US equity and ETF options, and SEC filings — all stated on the vendor's own coverage
page. US market data is real-time; most international equities are 15-minute delayed; fixed income
is effectively out of scope. The delay detail is the part most summaries of this product omit, so
this page leads with it.</p>

${note(`<strong>Sourcing:</strong> unless flagged otherwise, every claim below comes from
<a href="${VENDOR_PAGES.dataCoverage}" rel="nofollow noopener" target="_blank">${esc(PRODUCT.name)}'s own
asset-class and coverage page</a> (August 2026). Where a data set is not mentioned there or anywhere
else we can cite, we say "not published" rather than guessing.`)}

<h2>Asset classes</h2>

<ul class="prose">
  ${assetList}
</ul>

<h2>Real-time or delayed: the actual split</h2>

<p class="prose">"Does it have real-time data" has a more precise answer than yes or no. The vendor
publishes three tiers:</p>

${table({
  head: ['Feed tier', 'What it covers'],
  rows: [
    { highlight: true, cells: ['<strong>Real-time</strong>', esc(DATA_COVERAGE.realtime)] },
    { cells: ['<strong>15-minute delay</strong>', esc(DATA_COVERAGE.delayed15)] },
    { cells: ['<strong>25-minute delay</strong>', esc(DATA_COVERAGE.delayed25)] },
  ],
  caption: 'Feed tiers as published on the vendor coverage page, August 2026.',
})}

<p class="prose">Two attributed footnotes to that table. First, changelog-style posts on the
official subreddit describe an in-product indicator that flags delayed tickers, so you can see
which tier a quote sits in — community-posted, not vendor-stated. Second, the same subreddit's
February 2025 pipeline post lists international equities among planned work
(${esc(ROADMAP.source)}), with no date and no commitment. If the delay split matters to your
workflow, price it as it is today, not as the roadmap hopes.</p>

<h2>What is not covered</h2>

<p class="prose"><strong>Fixed income.</strong> ${esc(DATA_COVERAGE.fixedIncome)} The first half of
that sentence is checkable against the vendor's site; the second half is third-party reporting, and
we flag it as such. Either way, nothing published supports treating ${esc(PRODUCT.name)} as a bond
terminal.</p>

<p class="prose"><strong>Execution.</strong> The vendor's own line: "${esc(PLATFORMS.notABroker.quote)}"
There is no order execution, no backtesting and no paper trading. The documented BROK command
connects up to 14 brokerages read-only via SnapTrade, on paid accounts — a portfolio view, not a
trading pipe.</p>

<p class="prose"><strong>Depth-of-book.</strong> Time-and-sales is documented (TAS) and ALLQ shows
per-venue quotes in beta, but a full Level 2 ladder is not published anywhere we can cite. Details
in the FAQ below.</p>

<h2>Filings, financials and the paper trail</h2>

<p class="prose">The coverage page lists SEC EDGAR filings, news wires, earnings calls and
standardized financials alongside the market data. In-product, those map to documented commands:
CF for the full EDGAR filing history, FA for standardized income statement, balance sheet and cash
flow, and TRAN for full-text search across earnings calls. The
<a href="/godel-terminal-commands/">command reference →</a> covers each with provenance.</p>

<h2>Where to go next</h2>

<ul class="prose">
  <li>Getting data out of the terminal: <a href="/godel-terminal-excel/">the Excel and export story →</a></li>
  <li>Programmatic access: <a href="/godel-terminal-api/">why there is no public API →</a></li>
  <li>Where it runs: <a href="/godel-terminal-desktop-and-mobile/">desktop and mobile, honestly →</a></li>
  <li>How the coverage stacks up against the incumbent: <a href="/godel-terminal-vs-bloomberg/">vs Bloomberg →</a></li>
</ul>

${ctaRow({ secondary: { href: '/godel-terminal-free-trial/', label: 'Test coverage on the trial' } })}

${faqSection(faqs)}
`;
  },
};
