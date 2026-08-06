import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const SA_PREMIUM_URL = 'https://help.seekingalpha.com/what-is-seeking-alpha-premium';
const SA_PRO_URL = 'https://subscriptions.seekingalpha.com/lp_pro_1a';

const faqs = [
  {
    q: `Is Seeking Alpha a terminal like Godel Terminal?`,
    a: `No. Seeking Alpha is a research subscription: contributor articles, quant ratings, screeners and earnings analysis. ${PRODUCT.name} is a live market terminal: real-time quotes, filings, options chains, time and sales, news wires. One sells conclusions and analysis; the other sells the raw material to reach your own.`,
  },
  {
    q: `Which is cheaper, Seeking Alpha or Godel Terminal?`,
    a: `Seeking Alpha Premium, clearly — its help center lists it at $299 per year (August 2026) against ${PRODUCT.name}'s vendor-stated ${PRICING.annual.display}. But Seeking Alpha PRO flips the math: its own signup page lists $99 for the first month, then $2,400 per year — more than double a ${PRODUCT.name} seat.`,
  },
  {
    q: `Do Seeking Alpha and Godel Terminal overlap at all?`,
    a: `A little: both offer stock screening and news, and both surface earnings information. The overlap ends there. Seeking Alpha has no real-time terminal workflow; ${PRODUCT.name} publishes no ratings, no analyst research and no model portfolios. The honest framing is complements, not substitutes.`,
  },
  {
    q: `Should I buy both?`,
    a: `If you both read research and work with live market data, the combination — $299 for Premium plus ${PRICING.annual.display} for the terminal — is about $1,295 a year, still a small fraction of one institutional seat. <a href="/cost-calculator/">The calculator</a> puts that in context. If you only do one of those things, buy only that one.`,
  },
  {
    q: `Does Godel Terminal have analyst ratings like Seeking Alpha?`,
    a: `It carries sell-side consensus estimates via its EM command — Street numbers, not house opinions. It publishes no ratings of its own, no contributor research and no picks. If written investment cases and rating systems are what you want, that is Seeking Alpha's product, not the terminal's.`,
  },
];

export const page = {
  path: '/godel-terminal-vs-seeking-alpha/',
  title: `Godel Terminal vs Seeking Alpha: Terminal or Research Hub`,
  description: `One is a command-driven market terminal, the other a crowd-research subscription. What each is for, what each costs, and when you want both.`,
  summary: 'Seeking Alpha sells written research and quant ratings; Godel Terminal sells a live market terminal. Sourced pricing and the case for each — or both.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-vs-seeking-alpha/', label: 'vs Seeking Alpha' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    return `
<h1>Godel Terminal vs Seeking Alpha</h1>

<p class="lede">These products do different jobs, and the choice is simpler than most comparisons
admit. Buy Seeking Alpha if you want research done for you — written investment cases, quant
ratings, screeners built on those ratings. Buy ${esc(PRODUCT.name)} if you want to do the research
yourself on live market data — filings, financials, options chains, news wires, driven from a
command line. Plenty of investors reasonably run both; almost nobody needs to choose between them
on features alone.</p>

${note(`<strong>Sourcing:</strong> Seeking Alpha figures below come from
<a href="${SA_PREMIUM_URL}" rel="nofollow noopener" target="_blank">Seeking Alpha's own help
center</a> and <a href="${SA_PRO_URL}" rel="nofollow noopener" target="_blank">its PRO signup
page</a>, checked August 2026. ${esc(PRODUCT.name)} figures are vendor-stated on godelterminal.com.
Both vendors run promotions; verify at checkout.`)}

<h2>What each product actually is</h2>

${table({
  head: ['', PRODUCT.name, 'Seeking Alpha'],
  rows: [
    { cells: ['Category', 'Command-driven financial terminal', 'Research and analysis subscription'] },
    { cells: ['Core asset', 'Live market data: quotes, chains, filings, wires', 'Written research, quant ratings, and screeners built on them'] },
    { cells: ['Who writes the analysis', 'Nobody — it serves data, you form the view', 'Thousands of contributors plus a quant system; PRO adds its top-15-analyst research'] },
    { cells: ['Coverage claim', 'US real-time market data; equities on 25+ global exchanges (vendor-stated)', 'In-depth analysis on 4,000+ stocks and ETFs (per its help center); PRO adds 1,300+ stocks it says Wall Street does not cover'] },
    { cells: ['Maturity', esc(PRODUCT.status), 'Long-established publisher'] },
  ],
})}

<h2>Pricing, sourced</h2>

${table({
  head: ['Plan', 'Price', 'Source'],
  rows: [
    { highlight: true, cells: [`${PRODUCT.name} (annual)`, `${PRICING.annual.display}/seat/yr (≈$${PRICING.annual.effectiveMonthly}/mo)`, 'godelterminal.com/pricing, vendor-stated'] },
    { cells: [`${PRODUCT.name} (monthly)`, `${PRICING.monthly.display}/mo`, 'godelterminal.com/pricing, vendor-stated'] },
    { cells: ['Seeking Alpha Premium', '$299/yr', 'help.seekingalpha.com, August 2026'] },
    { cells: ['Seeking Alpha PRO', '$99 first month, then $2,400/yr', 'subscriptions.seekingalpha.com, August 2026'] },
  ],
})}

<p class="prose">Seeking Alpha also sells Alpha Picks, a separate stock-picking service; we did not
verify its current price, so no figure appears here. The spread above is the story: Premium costs
less than a third of a terminal seat, PRO costs well over double. Price the combinations against
institutional seats with <a href="/cost-calculator/">the cost calculator</a>.</p>

<h2>Workflow by workflow</h2>

${table({
  head: ['Workflow', PRODUCT.name, 'Seeking Alpha', 'Honest read'],
  rows: [
    { cells: ['Written research', '❌ None — data only', '✅ The core product: contributor articles, virtual analyst reports, earnings call insights', 'Seeking Alpha wins by definition.'] },
    { cells: ['Ratings', 'Street consensus estimates via EM', '✅ Quant and author ratings with published track records', 'Different things: consensus data vs house opinions.'] },
    { cells: ['Screening', '✅ EQS on fundamentals, with export', '✅ Screeners built on its ratings systems', 'Both real; different inputs.'] },
    { cells: ['Live quotes &amp; tape', '✅ Real-time US data, time and sales, 400-ticker watchlists', '❌ Not a terminal workflow', 'Terminal wins by definition.'] },
    { cells: ['Filings', '✅ CF — SEC filings direct from EDGAR, tied to financials', 'Analysis references filings; not a filings workflow', 'Terminal wins.'] },
    { cells: ['News', '✅ N — wires and exchange notices in real time', 'Market news geared to analysis and email alerts', 'Terminal is wire-first; Seeking Alpha is context-first.'] },
    { cells: ['Options', '✅ OMON — US chains via OPRA/Cboe with Greeks', '❌ Not part of its published subscription features', 'Terminal wins.'] },
    { cells: ['Portfolio', 'BROK — read-only broker connections via SnapTrade', '✅ Portfolio tracking with rating overlays; PRO adds a model quant portfolio', 'Seeking Alpha wins for idea-following; terminal for data.'] },
  ],
})}

<h2>Where Seeking Alpha wins</h2>

<p class="prose">The research itself. If you want a bull and bear case argued in writing, a quant
rating with a track record, screeners that rank on those ratings, and a steady stream of ideas to
react to, that is Seeking Alpha's entire business — and at $299 a year for Premium it is priced
for individuals in a way no terminal is. ${esc(PRODUCT.name)} offers nothing comparable: it has no
opinions, no contributors and no picks, and does not claim to. For many self-directed investors,
Premium plus a free broker app genuinely covers the whole job.</p>

<h2>Where ${esc(PRODUCT.name)} wins</h2>

<p class="prose">The moment you need the market itself rather than commentary about it. Real-time
quotes and tape, options chains with Greeks, futures and FX, filings the minute they hit EDGAR,
wire news without an editorial layer (<a href="/godel-terminal-data-coverage/">full coverage
map →</a>, <a href="/godel-terminal-commands/">command reference →</a>). It is also the only side
of this comparison that behaves like a professional workstation — and against Seeking Alpha PRO's
$2,400 list price it is the cheaper professional tool by a wide margin.</p>

<h2>Verdict</h2>

<p class="prose">Terminal or research hub is a real fork: pick by whether your process starts from
raw data or from someone else's thesis. Readers choosing a terminal should compare the terminal
field first — <a href="/godel-terminal-vs-koyfin/">vs Koyfin</a> and
<a href="/godel-terminal-vs-tradingview/">vs TradingView</a> are the honest next reads, with the
wider list at <a href="/godel-terminal-alternatives/">alternatives</a>. And if the answer is both,
$1,295 a year for Premium plus a terminal seat is still about four percent of
<a href="/bloomberg-terminal-cost/">what one Bloomberg seat reportedly costs</a>.</p>

<p class="prose">The terminal side has a ${PRICING.freeTrial.days}-day free trial;
${esc(PROMO.code)} takes ${PROMO.percent}% off the ${esc(PROMO.appliesTo)} if you subscribe.</p>

${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-alternatives/', label: 'See all alternatives' } })}

${faqSection(faqs)}
`;
  },
};
