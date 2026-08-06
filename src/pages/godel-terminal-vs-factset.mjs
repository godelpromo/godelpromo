import { PROMO, PRODUCT, PRICING, COMPARISON_TERMINALS } from '../data/site.mjs';
import { DATA_COVERAGE } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const factsetReported = COMPARISON_TERMINALS.find((t) => t.name === 'FactSet');
const ratio = Math.round(factsetReported.annual / PRICING.annual.amount);

const faqs = [
  {
    q: `How much does FactSet cost?`,
    a: `FactSet does not say — its website publishes no pricing at all, and quotes go through sales. Reported entry pricing is around ${factsetReported.display} per seat per year, heavily dependent on modules and seat count, and that reported figure is the best anyone outside a contract negotiation can offer. Treat every FactSet price you read online, including ours, as a ballpark.`,
  },
  {
    q: `Can Godel Terminal replace FactSet?`,
    a: `For an individual analyst's daily research loop — quotes, filings, financials, estimates, screening, news — much of the ground overlaps at roughly 1/${ratio} of the reported cost. It does not replace FactSet's portfolio analytics and reporting, its Office integration, its consultative support, or its procurement-grade vendor relationship. Institutions buy those as much as they buy the data.`,
  },
  {
    q: `Why doesn't FactSet publish prices?`,
    a: `Because it sells negotiated, module-based contracts to institutions, not self-serve seats. That is normal for enterprise market-data vendors — Bloomberg and LSEG do the same. The practical consequence: you cannot comparison-shop FactSet without talking to its sales team.`,
  },
  {
    q: `Is FactSet cheaper than Bloomberg?`,
    a: `On reported figures, yes — roughly ${factsetReported.display} against roughly $31,980 per seat per year, both attributed third-party ballparks since neither vendor publishes a price list. The full numbers are at <a href="/bloomberg-terminal-cost/">our Bloomberg cost breakdown</a>.`,
  },
  {
    q: `Who should keep FactSet?`,
    a: `Anyone whose firm depends on portfolio analytics, client reporting, compliance-grade data lineage, or FactSet's support and consulting. A ${PRICING.annual.display} terminal is not a substitute for an institutional data relationship — it is a substitute for rationing seats.`,
  },
];

export const page = {
  path: '/godel-terminal-vs-factset/',
  title: `Godel Terminal vs FactSet: Can $996 Replace $12,000?`,
  description: `FactSet is an institutional standard; Godel Terminal costs a fraction of it. What a FactSet seat buys that Godel does not, and when the cheap seat wins.`,
  summary: 'FactSet publishes no pricing and sells institutional contracts; Godel Terminal is a $996 self-serve seat. What overlaps, what does not, honestly sourced.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-vs-factset/', label: 'vs FactSet' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    return `
<h1>Godel Terminal vs FactSet</h1>

<p class="lede">If your firm needs portfolio analytics, client reporting and a support desk that
answers, FactSet is the institutional product and ${esc(PRODUCT.name)} is not a replacement. If
what you personally need is a research terminal — quotes, filings, financials, screening, news —
${esc(PRODUCT.name)}'s vendor-stated ${PRICING.annual.display} per seat per year buys most of that
daily loop at roughly 1/${ratio} of FactSet's reported cost. This page is about which of those two
sentences describes you.</p>

${note(`<strong>The sourcing problem, stated plainly:</strong> FactSet publishes no pricing.
We checked <a href="https://www.factset.com/" rel="nofollow noopener" target="_blank">factset.com</a>
in August 2026 — there is no price list, no plans page, and the path to a number runs through a
sales conversation. Every FactSet dollar figure on this page is therefore a reported third-party
ballpark, labeled as such. ${esc(PRODUCT.name)}'s price is vendor-stated on its public pricing page.
That asymmetry is itself part of the comparison.`)}

<h2>What each product actually is</h2>

${table({
  head: ['', PRODUCT.name, 'FactSet'],
  rows: [
    { cells: ['Category', 'Browser-based, command-driven financial terminal', 'Institutional research and analytics platform'] },
    { cells: ['Sold as', 'Self-serve subscription, public pricing, 14-day trial', 'Negotiated contracts, module-based, quote-only'] },
    { cells: ['Typical buyer', 'Individual analysts, small funds, students', 'Asset managers, banks, sell-side research departments'] },
    { cells: ['Support', 'support@godelterminal.com; ORG plan adds a dedicated representative', 'Dedicated institutional support and consulting are core to its pitch'] },
    { cells: ['Maturity', esc(PRODUCT.status), 'Decades-old institutional standard'] },
  ],
})}

<h2>Pricing, such as it is</h2>

${table({
  head: ['Product', 'Annual cost', 'Sourcing'],
  rows: [
    { highlight: true, cells: [PRODUCT.name, `${PRICING.annual.display}/seat`, 'Vendor-stated: godelterminal.com/pricing, August 2026'] },
    { cells: ['FactSet', `${factsetReported.display}/seat (reported entry)`, 'Attributed third-party ballpark; FactSet publishes no pricing. Varies heavily by modules and seat count.'] },
  ],
})}

<p class="prose">A number you negotiate is not a number you can verify, so the honest framing is a
range: reported FactSet entry pricing sits around ${factsetReported.display}, and real contracts
land wherever modules, seats and negotiating leverage put them. Against that,
${esc(PRODUCT.name)} costs ${PRICING.annual.display} flat, or ${PRICING.monthly.display} monthly.
<a href="/cost-calculator/">The calculator</a> turns any seat count into a difference.</p>

<h2>Workflow by workflow</h2>

${note(`<strong>Sourcing note:</strong> the ${esc(PRODUCT.name)} column comes from its documented commands and
vendor pages. The FactSet column summarizes how FactSet positions its own product on
<a href="https://www.factset.com/" rel="nofollow noopener" target="_blank">factset.com</a> and how it is
generally understood in the industry — we have not used it hands-on, and it publishes neither pricing nor a
feature-by-feature spec sheet to quote.`)}

${table({
  head: ['Workflow', PRODUCT.name, 'FactSet', 'Honest read'],
  rows: [
    { cells: ['Company research', '✅ DES, FA financials, CF filings from EDGAR, EM estimates', '✅ Deep global fundamentals and estimates', 'Overlap is real for US equities; FactSet is deeper and global.'] },
    { cells: ['Screening', '✅ EQS with Excel export', '✅ Institutional-grade screening', 'Both real; FactSet screens across more data sets.'] },
    { cells: ['News', '✅ N — wires, exchange notices, major outlets, real-time', '✅ Integrated news and research distribution', 'Comparable for daily use.'] },
    { cells: ['Charting', 'Documented G chart window; charting v2 on a community-posted roadmap', '✅ Charting across its data sets', 'FactSet is the more complete analytics environment.'] },
    { cells: ['Options', '✅ OMON — US chains via OPRA/Cboe with Greeks', '✅ Derivatives coverage as a module', 'Terminal covers the retail-visible core; FactSet goes wider by contract.'] },
    { cells: ['Portfolio analytics', 'BROK — read-only broker connections via SnapTrade', '✅ Markets a full suite: attribution, risk decomposition, client reporting', 'Not close. This is FactSet’s moat.'] },
    { cells: ['Excel / Office', 'FA, EQS, HP and IPO export to Excel-ready files', '✅ Office add-in with live-refreshing models', 'FactSet wins for modeling workflows.'] },
    { cells: ['Fixed income', '❌ Effectively out of scope — no bond product page exists', '✅ Covered', 'Hard boundary for the terminal.'] },
  ],
})}

<h2>Where FactSet wins</h2>

<p class="prose">Institutional depth and everything wrapped around the data. Portfolio analytics —
attribution, risk, reporting — that large asset managers treat as compliance infrastructure. An
Office integration that keeps models live. Global coverage across asset classes including fixed
income — where ${esc(PRODUCT.name)}'s position is blunt. ${esc(DATA_COVERAGE.fixedIncome)} Add
dedicated support, training and consulting, and a vendor relationship that survives procurement
review. None of that is marketing fluff; it is why the reported price is what it is.</p>

<h2>Where ${esc(PRODUCT.name)} wins</h2>

<p class="prose">Price, transparency, and self-serve speed. The entire product costs a published
${PRICING.annual.display} per seat per year — no sales call, no module matrix, no two-year
commitment — and a ${PRICING.freeTrial.days}-day trial answers the fit question directly. For the
individual analyst's loop it covers the core: real-time US market data, filings tied to
financials, consensus estimates, screening with export, options chains, wire news
(<a href="/godel-terminal-data-coverage/">full coverage map →</a>). The realistic institutional
use is not "cancel FactSet" — it is giving a ${PRICING.annual.display} seat to every analyst who
currently shares one, the same argument as
<a href="/godel-terminal-vs-bloomberg/">against Bloomberg →</a>.</p>

<h2>Verdict</h2>

<p class="prose">Can $996 replace $12,000? For a firm's data infrastructure: no, and we will not
pretend otherwise — the analytics, support and asset-class depth are the product. For one person's
research seat: much of the daily workflow, yes, at a price where being wrong costs a rounding
error. Compare the affordable field at <a href="/godel-terminal-alternatives/">alternatives</a> —
<a href="/godel-terminal-vs-koyfin/">Koyfin</a> is the closer like-for-like rival — and price your
own desk with <a href="/cost-calculator/">the cost calculator</a>.</p>

<p class="prose">If you try the terminal, ${esc(PROMO.code)} takes ${PROMO.percent}% off the
${esc(PROMO.appliesTo)}.</p>

${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-vs-bloomberg/', label: 'Compare vs Bloomberg' } })}

${faqSection(faqs)}
`;
  },
};
