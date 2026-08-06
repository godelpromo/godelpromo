import { PRODUCT, PRICING, PROMO, COMPARISON_TERMINALS, CASE_STUDY } from '../data/site.mjs';
import { SENTIMENT, PLATFORMS } from '../data/research.mjs';
import { ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const bloomberg = COMPARISON_TERMINALS.find((t) => t.name === 'Bloomberg Terminal');
const godel = COMPARISON_TERMINALS.find((t) => t.name === 'Godel Terminal');
const pricePct = Math.round((godel.annual / bloomberg.annual) * 100);
const tradingview = COMPARISON_TERMINALS.find((t) => t.name === 'TradingView Premium');
const pos = SENTIMENT.positive[0];
const neg = SENTIMENT.negative[0];

const faqs = [
  {
    q: `Is ${PRODUCT.name} worth ${PRICING.annual.display} a year?`,
    a: `It depends on what it replaces. If it consolidates two or three separate data subscriptions — quotes, filings, news — it pays for itself quickly. If you only need charts, it is the wrong purchase: a charting tool reported around ${tradingview.display}/year covers that. See <a href="/godel-terminal-alternatives/">the alternatives compared</a>.`,
  },
  {
    q: `Is there a free version of ${PRODUCT.name}?`,
    a: `No. The current pricing page lists no free tier — every plan starts with a ${PRICING.freeTrial.days}-day free trial instead, vendor-stated. The founding vision once promised a free tier; flat per-seat pricing is what shipped. That history is on <a href="/who-owns-godel-terminal/">who owns Godel Terminal</a>.`,
  },
  {
    q: `What is the cheapest way to find out if it is worth it for me?`,
    a: `The trial: the vendor's terms state the account is not charged until you upgrade. If you then convert, code <strong>${PROMO.code}</strong> takes ${PROMO.percent}% off the first month only — it never changes the ongoing rate, so decide on the standard price. Codes and terms are on <a href="/promo-codes/">the promo-codes page</a>.`,
  },
];

export const page = {
  path: '/is-godel-terminal-worth-it/',
  title: 'Is Godel Terminal Worth It? A Short, Honest Answer',
  description: 'Worth it for equity research at $996 a seat; not a Bloomberg replacement for messaging or execution. The short version, with links to the evidence.',
  summary: 'The short verdict on Godel Terminal: worth it for equity-research seats at $996/year; not if you need fixed income, execution, mobile or an API.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/is-godel-terminal-worth-it/', label: 'Worth it?' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    return `
<h1>Is Godel Terminal worth it? The short answer</h1>

<p class="lede">Worth it if your work is equity research — quotes, filings, financials, estimates, news — and
${PRICING.annual.display} per seat per year (vendor-stated) would replace costlier subscriptions or a terminal you
cannot justify. Not worth it if you need fixed income, order execution, a mobile app, or a public API, because it
currently offers none of those. This page is the executive summary; the
<a href="/godel-terminal-review/">full evidence-based review</a> is the long version.</p>

<div class="grid grid-2">
  <div class="tile">
    <h3>Worth it for</h3>
    <p>Equity-research seats: analysts, small funds, RIAs and family offices consolidating separate quote, filing
    and news subscriptions into one command-driven workspace at ${PRICING.annual.display}/${esc(PRICING.annual.unit)},
    instead of ${bloomberg.display} reported for a Bloomberg seat.</p>
  </div>
  <div class="tile">
    <h3>Not worth it for</h3>
    <p><strong>Fixed income</strong> — no bond product page exists, and third-party reviews consistently call it a
    non-fit. <strong>Execution</strong> — the vendor's own line: "${esc(PLATFORMS.notABroker.quote)}"
    <strong>Mobile</strong> — no native app; users describe the web app as not phone-optimized
    (<a href="/godel-terminal-desktop-and-mobile/">details</a>). <strong>API</strong> — no public API, and the
    terms prohibit scraping.</p>
  </div>
</div>

<h2>The math that matters</h2>

<p class="prose">The seat costs ${PRICING.annual.display} a year, vendor-stated, against roughly
${bloomberg.display} widely reported for Bloomberg — about ${pricePct}% of the price. The vendor's case study
claims ${esc(CASE_STUDY.person)}, ${esc(CASE_STUDY.role)}, saved about ${esc(CASE_STUDY.savings)} switching; that
is vendor marketing from a named person, so treat it as a claim, not a datum. Put your own stack into the
<a href="/cost-calculator/">cost calculator</a>, and check every number's source on
<a href="/godel-terminal-pricing/">the pricing page</a>.</p>

<h2>What users say — thin as it is</h2>

<p class="prose">Attributed sentiment, one each way: ${esc(pos.who)} called it the
"${esc(pos.quote)}" in ${esc(pos.when)} — the same comment notes the lack of API access. On the other side,
${esc(neg.who)} wrote "${esc(neg.quote)}" in ${esc(neg.when)}. The honest caveat: review volume is thin on every
platform, and a visible share of the negativity targets the founder rather than the product — the sourced roundup
is on <a href="/is-godel-terminal-legit/">is Godel Terminal legit →</a></p>

<h2>The real answer is the trial</h2>

<p class="prose">Every plan starts with a ${PRICING.freeTrial.days}-day free trial, vendor-stated, with no charge
until you upgrade. So the honest advice is not a verdict from us — it is: run the trial against your actual
workflow, the tickers you cover and the filings you read, and let the product answer.
<a href="/godel-terminal-free-trial/">The free-trial guide</a> has a day-by-day plan for exactly that.</p>

${note(`If it fails your trial, that is a cheap discovery. If it passes, ${esc(PROMO.code)} takes ${PROMO.percent}%
off the first month — the ongoing rate is what you are really buying.`)}

${ctaRow({ secondary: { href: '/godel-terminal-free-trial/', label: `See the ${PRICING.freeTrial.days}-day trial plan` } })}

${faqSection(faqs)}
`;
  },
};
