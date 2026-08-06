import { PROMO, PRODUCT, PRICING, COMPARISON_TERMINALS } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const KOYFIN_PRICING_URL = 'https://www.koyfin.com/pricing/';
const koyfinReported = COMPARISON_TERMINALS.find((t) => t.name === 'Koyfin');

const faqs = [
  {
    q: `Is Koyfin cheaper than Godel Terminal?`,
    a: `Usually, yes. Koyfin's pricing page (August 2026) lists a free plan, Plus at $39/month and Premium at $79/month, with annual billing advertised at up to 30% less — which puts Premium on annual billing below ${PRODUCT.name}'s vendor-stated ${PRICING.annual.display} a year. ${PRODUCT.name} is only the cheaper choice against Koyfin's Advisor tiers ($209–$299/month).`,
  },
  {
    q: `Does Koyfin have a free plan?`,
    a: `Yes. Koyfin's pricing page lists a $0 plan with advanced charting, market and macro dashboards, two watchlists, two screens and two custom dashboards, with shorter financial history (2 years of financials, 1 year of estimates). ${PRODUCT.name} has no free tier — a ${PRICING.freeTrial.days}-day trial, then paid.`,
  },
  {
    q: `Which covers more markets, Koyfin or Godel Terminal?`,
    a: `They emphasize different things. Koyfin advertises 100K+ global company snapshots and deep fundamentals history on paid tiers. ${PRODUCT.name}'s vendor coverage page leads with breadth of tradable markets: equities on 25+ exchanges, futures, full FX crosses, crypto spot, and US options chains via OPRA and Cboe. Options and futures workflows are where the terminal clearly carries more — see <a href="/godel-terminal-data-coverage/">the coverage map</a>.`,
  },
  {
    q: `Which should an individual investor pick?`,
    a: `If you want dashboards you assemble with a mouse and a genuinely useful free tier, Koyfin. If you want a keyboard-driven terminal — mnemonics, options chains, wire news, time and sales — ${PRODUCT.name}. Interface preference is the real decider; the products overlap heavily on core equity research.`,
  },
  {
    q: `Can either replace a Bloomberg seat?`,
    a: `Both sell exactly that ambition at about 2–3% of the price, and both fall short of the same things: the Bloomberg messaging network, fixed income depth, and execution. The honest breakdown is at <a href="/godel-terminal-vs-bloomberg/">our Bloomberg comparison</a>.`,
  },
];

export const page = {
  path: '/godel-terminal-vs-koyfin/',
  title: `Godel Terminal vs Koyfin: Which Research Stack Fits?`,
  description: `Koyfin and Godel Terminal both chase the affordable-terminal seat. Coverage, workflow and pricing compared, with sourcing for every figure.`,
  summary: 'Koyfin is dashboard-first with a free tier; Godel Terminal is a command-driven terminal with broader tradable-market coverage. Sourced pricing for both.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-vs-koyfin/', label: 'vs Koyfin' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    return `
<h1>Godel Terminal vs Koyfin</h1>

<p class="lede">These two are genuine rivals — both sell an affordable seat to people priced out of
Bloomberg — and the split is interface and coverage. Pick Koyfin if you think in dashboards: it is
mouse-driven, has a real free tier, and on annual billing its Premium plan costs less than a
${esc(PRODUCT.name)} seat. Pick ${esc(PRODUCT.name)} if you think in commands and need options
chains, futures and wire-speed news: it is the one that behaves like a terminal.</p>

${note(`<strong>Sourcing:</strong> every Koyfin figure below comes from
<a href="${KOYFIN_PRICING_URL}" rel="nofollow noopener" target="_blank">Koyfin's own pricing page</a>,
checked August 2026. ${esc(PRODUCT.name)} figures are vendor-stated on godelterminal.com. Verify at
the source before paying — both vendors reprice without notice.`)}

<h2>What each product actually is</h2>

${table({
  head: ['', PRODUCT.name, 'Koyfin'],
  rows: [
    { cells: ['Category', 'Command-driven financial terminal (Bloomberg-style mnemonics)', 'Dashboard-first research and analytics platform'] },
    { cells: ['Built for', 'Analysts who want a keyboard workflow: quotes, filings, chains, wires', 'Investors and advisors who assemble custom dashboards and templates'] },
    { cells: ['Free tier', `None — ${PRICING.freeTrial.days}-day trial, then paid`, 'Yes: $0 plan with charting, macro dashboards, 2 watchlists and 2 screens'] },
    { cells: ['Advisor tooling', 'ORG plan for teams; no advisor-specific features published', 'Dedicated Advisor tiers: model portfolios, client proposals and reports, custodian integrations'] },
    { cells: ['Maturity', esc(PRODUCT.status), 'Established retail/advisor product'] },
  ],
})}

<h2>Pricing, sourced</h2>

${table({
  head: ['Plan', 'Price', 'Source'],
  rows: [
    { highlight: true, cells: [`${PRODUCT.name} (annual)`, `${PRICING.annual.display}/seat/yr (≈$${PRICING.annual.effectiveMonthly}/mo)`, 'godelterminal.com/pricing, vendor-stated'] },
    { cells: [`${PRODUCT.name} (monthly)`, `${PRICING.monthly.display}/mo`, 'godelterminal.com/pricing, vendor-stated'] },
    { cells: ['Koyfin Free', '$0', 'koyfin.com/pricing, August 2026'] },
    { cells: ['Koyfin Plus', '$39/mo', 'koyfin.com/pricing, August 2026'] },
    { cells: ['Koyfin Premium', '$79/mo', 'koyfin.com/pricing, August 2026'] },
    { cells: ['Koyfin Advisor Core', '$209/mo', 'koyfin.com/pricing, August 2026'] },
    { cells: ['Koyfin Advisor Pro', '$299/mo', 'koyfin.com/pricing, August 2026'] },
  ],
})}

<p class="prose">Koyfin's page advertises annual billing at "up to 30% savings" off those monthly
rates but displays them per month, so we will not invent an exact annual figure for you.
The ballpark our <a href="/cost-calculator/">cost calculator</a> carries is
${koyfinReported.display} a year, an attributed third-party figure. The comparison that matters:
Koyfin Premium billed monthly runs $948 a year — within sight of ${esc(PRODUCT.name)}'s
${PRICING.annual.display} — and on discounted annual billing it drops clearly below. On price,
Koyfin wins for most individuals.</p>

<h2>Workflow by workflow</h2>

${table({
  head: ['Workflow', PRODUCT.name, 'Koyfin', 'Honest read'],
  rows: [
    { cells: ['Fundamentals', '✅ FA financials with Excel export, EM estimates with implied multiples', '✅ 10Y financials and 10Y estimates on Plus and up', 'Both genuinely strong; Koyfin gates history depth by tier.'] },
    { cells: ['Filings &amp; transcripts', '✅ CF — SEC filings direct from EDGAR; earnings calls', '✅ Filings, transcripts and press releases on Plus and up', 'Comparable on paper.'] },
    { cells: ['Screening', '✅ EQS with export', '✅ Stock and ETF screener; unlimited screens on Plus', 'Comparable.'] },
    { cells: ['Dashboards', 'Window-based terminal layout', '✅ Unlimited custom dashboards, custom formulas and templates on Premium', 'Koyfin wins — this is its core design.'] },
    { cells: ['News', '✅ N — wires, exchange notices, major outlets in real time', 'Premium news and press releases on paid tiers', 'Terminal is wire-first.'] },
    { cells: ['Options', '✅ OMON — US chains via OPRA/Cboe with Greeks', '❌ Options do not appear on the published plan feature lists', 'Terminal wins for options workflows.'] },
    { cells: ['Futures / FX / crypto', '✅ CME/CBOT/NYMEX/COMEX/ICE futures, full FX matrix, crypto spot', 'Macro dashboards; tradable-market depth not the published focus', 'Terminal carries more tradable-market coverage.'] },
    { cells: ['Portfolio', 'BROK — read-only broker connections via SnapTrade', '✅ My Portfolios; advanced analytics on Premium; full advisor suite on Advisor tiers', 'Koyfin wins, especially for advisors.'] },
  ],
})}

<h2>Where Koyfin wins</h2>

<p class="prose">Price, dashboards, and the advisor business. The free tier is real and usable,
annual billing undercuts a ${esc(PRODUCT.name)} seat, and the custom dashboard/template system on
Premium has no equivalent in a mnemonic-driven terminal. For RIAs, the Advisor tiers — model
portfolios, client reports, custodian integrations — are a product category ${esc(PRODUCT.name)}
simply does not publish anything about. And Koyfin is a mature product, while ${esc(PRODUCT.name)}
remains in ${esc(PRODUCT.status)}.</p>

<h2>Where ${esc(PRODUCT.name)} wins</h2>

<p class="prose">The terminal experience and the market data around it. Command mnemonics
(<a href="/godel-terminal-commands/">the reference →</a>), US options chains with Greeks, futures
across the major exchanges, a full FX cross matrix, crypto spot, time and sales — all vendor-stated
on its coverage page, and all real-time for US markets. One r/algotrading user called its news
feeds some of the fastest they have seen — community sentiment, not our claim — and the flat
per-seat price has no plan tiers to compare — though entitlement add-ons and the FINRA surcharge
sit on top of the base price. If your research ends in a
trade on tradable instruments rather than a client PDF, the terminal fits better.</p>

<h2>Verdict</h2>

<p class="prose">Koyfin for dashboard-thinkers, advisors, and anyone whose budget stops below
$996 — it is the better-value product for most individual investors. ${esc(PRODUCT.name)} for
keyboard-thinkers and anyone who needs options, futures or wire news — the workflows Koyfin's
published plans do not cover. If charting is the real priority, read
<a href="/godel-terminal-vs-tradingview/">the TradingView comparison →</a>; the full field is at
<a href="/godel-terminal-alternatives/">alternatives</a>, and
<a href="/cost-calculator/">the calculator</a> prices any mix of seats.</p>

<p class="prose">Testing the terminal side costs nothing for ${PRICING.freeTrial.days} days, and
${esc(PROMO.code)} takes ${PROMO.percent}% off the ${esc(PROMO.appliesTo)} if you stay.</p>

${codeBox()}
${ctaRow({ secondary: { href: '/cost-calculator/', label: 'Run the cost math' } })}

${faqSection(faqs)}
`;
  },
};
