import { PROMO, PRODUCT, PRICING, CASE_STUDY } from '../data/site.mjs';
import { officialCommands } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const BLOOMBERG_ANNUAL = 31980;
const ratio = Math.round(BLOOMBERG_ANNUAL / PRICING.annual.amount);

const faqs = [
  {
    q: `Can ${PRODUCT.name} replace a Bloomberg Terminal?`,
    a: `For equity research workflows — quotes, filings, standardized financials, consensus estimates, news and screening — it covers much of the same ground at about 1/${ratio} of the cost. It cannot replace the Bloomberg messaging network, fixed income depth, or execution. Most realistic outcome is that it replaces a Bloomberg seat for some people on a desk, not all of them.`,
  },
  {
    q: `How much cheaper is ${PRODUCT.name} than Bloomberg?`,
    a: `Bloomberg is widely reported at approximately $${BLOOMBERG_ANNUAL.toLocaleString()} per seat per year. ${PRODUCT.name} advertises ${PRICING.annual.display} per seat per year. That is roughly ${ratio}× cheaper, or about $${(BLOOMBERG_ANNUAL - PRICING.annual.amount).toLocaleString()} saved per seat per year.`,
  },
  {
    q: `What does Bloomberg have that ${PRODUCT.name} does not?`,
    a: `The messaging network (IB/Bloomberg Chat) is the big one — it is a professional communications standard, and no competitor can replicate it because the value is the other users. Beyond that: fixed income and derivatives depth, execution, Bloomberg Intelligence research, and decades of instrument coverage.`,
  },
  {
    q: `What does ${PRODUCT.name} have that Bloomberg does not?`,
    a: `Price, and the fact that it runs in a browser with no dedicated hardware or install. It also does not require a two-year contract.`,
  },
  {
    q: `Is the comparison fair?`,
    a: `Not entirely, and it is worth being honest about that. Bloomberg is a thirty-year-old institutional standard covering every asset class; ${PRODUCT.name} is an equity-focused product in ${PRODUCT.status}. The useful question is not "is it as good" but "does it cover what you personally use".`,
  },
];

export const page = {
  path: '/godel-terminal-vs-bloomberg/',
  title: `Godel Terminal vs Bloomberg: Honest ${new Date().getFullYear()} Comparison`,
  description: `Godel Terminal at $996/seat vs Bloomberg at ~$31,980. Function-by-function, plus the two things Bloomberg has that no competitor can match.`,
  summary: 'Function-by-function comparison of Godel Terminal and the Bloomberg Terminal, including what Godel cannot replace.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/godel-terminal-vs-bloomberg/', label: 'vs Bloomberg' },
  ],
  faqs,
  priority: '0.9',
  render() {
    const funcRows = [
      { cells: ['Real-time quotes', '✅ QM — up to 400 tickers/list', '✅ Comprehensive', 'Comparable for equities.'] },
      { cells: ['Company overview', '✅ DES', '✅ DES', 'Same mnemonic, same purpose.'] },
      { cells: ['News', '✅ N — wires, exchange notices, outlets', '✅ Bloomberg News + wires', 'Bloomberg has first-party newsroom; Godel aggregates.'] },
      { cells: ['SEC filings', '✅ CF — direct from EDGAR', '✅ Comprehensive global', 'Godel is US/EDGAR-centric.'] },
      { cells: ['Standardized financials', '✅ FA — Excel export', '✅ FA', 'Comparable for US equities.'] },
      { cells: ['Consensus estimates', '✅ EM — with implied multiples', '✅ EEO / EE', 'Godel\'s implied-multiple view is a genuine convenience.'] },
      { cells: ['Options', '✅ OMON', '✅ OMON + full analytics', 'Bloomberg far deeper on derivatives analytics.'] },
      { cells: ['Screening', '✅ EQS', '✅ EQS', 'Same mnemonic.'] },
      { cells: ['Time &amp; sales', '✅ TAS', '✅ TAS', 'Comparable.'] },
      { cells: ['FX &amp; commodities', '✅ FX, GLCO', '✅ Comprehensive', 'Bloomberg deeper.'] },
      { cells: ['Fixed income', '❌ Not in published capabilities', '✅ Market standard', 'Clearest gap.'] },
      { cells: ['Messaging network', '❌ None', '✅ Bloomberg Chat', 'Cannot be replicated — the value is the userbase.'] },
      { cells: ['Execution', '❌ None', '✅ EMSX / TOMS', 'Different product category.'] },
      { cells: ['Proprietary research', '❌ None', '✅ Bloomberg Intelligence', 'Bloomberg-only.'] },
    ];

    const costRows = [1, 5, 20].map((seats) => ({
      cells: [
        `${seats} seat${seats > 1 ? 's' : ''}`,
        `$${(PRICING.annual.amount * seats).toLocaleString()}`,
        `$${(BLOOMBERG_ANNUAL * seats).toLocaleString()}`,
        `<strong>$${((BLOOMBERG_ANNUAL - PRICING.annual.amount) * seats).toLocaleString()}</strong>`,
      ],
    }));

    return `
<h1>Godel Terminal vs Bloomberg Terminal</h1>

<p class="lede">${esc(PRODUCT.name)} costs ${PRICING.annual.display} per seat per year.
A Bloomberg Terminal is widely reported at around $${BLOOMBERG_ANNUAL.toLocaleString()}.
That is a <strong>${ratio}× difference</strong> — large enough that the interesting question is not
which is better, but which functions you actually use.</p>

${note(`<strong>The honest framing:</strong> this is not a like-for-like comparison and we are not going to
pretend it is. Bloomberg is a thirty-year institutional standard spanning every asset class.
${esc(PRODUCT.name)} is an equity-focused product in ${esc(PRODUCT.status)}. What follows is a map of overlap,
not a claim of equivalence.`)}

<h2>Cost, at the seat counts that matter</h2>

${table({
  head: ['Seats', `${PRODUCT.name}/yr`, 'Bloomberg/yr', 'Annual difference'],
  rows: costRows,
})}

<p class="prose">${esc(PRODUCT.name)}'s own marketing leads with this arithmetic —
<em>"A $30,000 terminal can't go on every desk"</em> — and its published case study,
${esc(CASE_STUDY.fund)}, claims ${esc(CASE_STUDY.savings)} in savings per analyst.
<a href="/cost-calculator/">Model your own seat count →</a></p>

<h2>Function by function</h2>

${table({
  head: ['Function', PRODUCT.name, 'Bloomberg', 'Assessment'],
  rows: funcRows,
})}

<h2>The two things Bloomberg has that cannot be competed away</h2>

<h3>1. The messaging network</h3>
<p class="prose">Bloomberg Chat is a professional communications standard. Sell-side research arrives through it,
brokers negotiate on it, and counterparties expect to reach you there. Its value has nothing to do with the software
and everything to do with who else is on it — which means no competitor can build an equivalent at any price.
If your workflow depends on it, no amount of feature parity elsewhere substitutes.</p>

<h3>2. Fixed income and derivatives depth</h3>
<p class="prose">Bloomberg's bond and derivatives coverage is the product for large parts of the market.
${esc(PRODUCT.name)} does not name fixed income in its published capability list at all. On the evidence available
it is an equity-and-adjacent product, which is a perfectly reasonable thing to be — but it is a hard boundary.</p>

<h2>Where ${esc(PRODUCT.name)} genuinely competes</h2>

<p class="prose">For a fundamental equity workflow, the overlap is real. The
${officialCommands().length} vendor-described commands cover the daily loop: overview, quotes, news, filings,
financials, consensus. A few specifics that stand up:</p>

<ul class="prose">
  <li><strong>400 tickers per watchlist with batch import</strong> — enough for most single-analyst coverage universes.</li>
  <li><strong>Filings tied to financial line items</strong> — the audit trail matters more than people expect when you
  are defending a number.</li>
  <li><strong>Implied multiples alongside consensus</strong> in EM, which is a small thing that saves a real amount of
  spreadsheet work.</li>
  <li><strong>Browser-based</strong> — no dedicated terminal hardware, no biometric keyboard, no install.</li>
</ul>

<h2>The realistic outcome</h2>

<p class="prose">For most desks this is not a replacement decision, it is an allocation decision.
The two or three people who genuinely need Bloomberg chat and fixed income keep their seats.
The analysts, associates and PMs who mainly need quotes, filings, financials and news — the people who currently
share a terminal or wait their turn — get their own ${esc(PRODUCT.name)} seat for ${PRICING.annual.display}.
That is the actual argument, and it is a strong one.</p>

<p class="prose">The counter-argument is maturity. ${esc(PRODUCT.name)} describes itself as
${esc(PRODUCT.status)} with commands under active development. Betting a research process on it wholesale is
premature; using it to stop rationing terminal access is not.</p>

<h2>Try it before deciding</h2>

<p class="prose">A reported ${PRICING.freeTrial.days}-day free trial is the cheapest way to settle this for your own
workflow. If you subscribe, ${esc(PROMO.code)} takes ${PROMO.percent}% off the ${esc(PROMO.appliesTo)}.</p>

${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-alternatives/', label: 'See other alternatives' } })}

${faqSection(faqs)}
`;
  },
};
