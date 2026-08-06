import { PRODUCT, STUDENT, COMPARISON_TERMINALS, CASE_STUDY } from '../data/site.mjs';
import { ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const COSTBENCH_URL = 'https://costbench.com/software/financial-data-terminals/bloomberg-terminal/';
const BBG_EDU_URL = 'https://professional.bloomberg.com/products/bloomberg-terminal/education/bloomberg-terminal-on-campus/';
const UP_BEACON_URL = 'https://www.upbeacon.com/article/2023/10/bloomberg-terminals-scheduled-to-be-replaced-amidst-budget-cuts';

const bloomberg = COMPARISON_TERMINALS.find((t) => t.name === 'Bloomberg Terminal');
const godel = COMPARISON_TERMINALS.find((t) => t.highlight);
const ratio = Math.round(bloomberg.annual / godel.annual);

const faqs = [
  {
    q: `How much does a Bloomberg Terminal cost per month?`,
    a: `About $2,665 per month per seat — the widely reported $${bloomberg.annual.toLocaleString()} annual rate on a two-year contract, divided by twelve. Firms with multiple terminals reportedly pay around $28,320 per seat per year. Bloomberg itself publishes no price list, so every figure is attributed reporting, not a vendor quote.`,
  },
  {
    q: `Why is the Bloomberg Terminal so expensive?`,
    a: `Because the price is widely understood to buy more than software: a messaging network the industry treats as infrastructure, data across every asset class including deep fixed income, and a single all-inclusive product — reported pricing varies by seat count, not by feature tier. The network effect is the part competitors have not replicated, which is what lets Bloomberg hold the price.`,
  },
  {
    q: `Does Bloomberg offer discounts?`,
    a: `The reported multi-terminal rate (~$28,320 vs ~$31,980 for a single seat) is the only discount consistently described in public reporting. Deeper negotiated enterprise rates are claimed by some pricing trackers but are not corroborated anywhere we can verify. An education program exists, priced case by case. No nonprofit pricing is published anywhere we can find.`,
  },
  {
    q: `Do students or universities get Bloomberg cheaper?`,
    a: `Universities negotiate through Bloomberg for Education — Bloomberg publishes no academic price list, and its Terminal on Campus page routes to a demo request. One reported data point: the University of Portland's student paper wrote in 2023 that its 16-terminal lab cost about $100,000 a year, roughly $6,250 per terminal. No individual-student terminal pricing is published anywhere we can find; for contrast, ${PRODUCT.name} advertises a ${STUDENT.display}/month student rate — see <a href="/godel-terminal-student-discount/">the student discount page</a>.`,
  },
  {
    q: `What are the alternatives to paying $${bloomberg.annual.toLocaleString()}?`,
    a: `Reported figures put LSEG Workspace around $22,000 and FactSet around $12,000 a year, while the affordable tier — ${PRODUCT.name} at ${godel.display} vendor-stated, Koyfin and TradingView lower still — costs 2–3% of a Bloomberg seat. What you give up at that price is the messaging network, fixed income and execution: <a href="/godel-terminal-vs-bloomberg/">the honest comparison</a> covers exactly what does and does not transfer.`,
  },
];

export const page = {
  path: '/bloomberg-terminal-cost/',
  title: `Bloomberg Terminal Cost: The Real 2026 Numbers`,
  description: `A Bloomberg seat runs about $31,980 per year on a two-year contract. What drives the price, what discounts exist, and what the alternatives actually cost.`,
  summary: 'The reported Bloomberg Terminal price — ~$31,980/yr single seat, ~$28,320 multi-terminal — what drives it, the academic angle, and the alternatives arithmetic.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/bloomberg-terminal-cost/', label: 'Bloomberg cost' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    const altRows = COMPARISON_TERMINALS.map((t) => ({
      highlight: !!t.highlight,
      cells: [
        esc(t.name),
        t.display + '/yr',
        `${Math.round((t.annual / bloomberg.annual) * 100)}%`,
        esc(t.note),
      ],
    }));

    return `
<h1>What a Bloomberg Terminal actually costs</h1>

<p class="lede">A Bloomberg Terminal is widely reported at about
<strong>$${bloomberg.annual.toLocaleString()} per seat per year</strong> — roughly $2,665 a
month — on the standard two-year contract, with multi-terminal firms reportedly paying around
$28,320 per seat. Bloomberg publishes no price list, so no figure on this page is a vendor quote;
they are the attributed numbers the industry converges on, and we label them that way on
purpose.</p>

${note(`<strong>Why every Bloomberg price is "reported":</strong> Bloomberg's own site offers no
pricing page — even its
<a href="${BBG_EDU_URL}" rel="nofollow noopener" target="_blank">Terminal on Campus page</a> routes
straight to a demo request. The figures here combine the widely reported contract rate our
<a href="/cost-calculator/">cost calculator</a> uses with a
<a href="${COSTBENCH_URL}" rel="nofollow noopener" target="_blank">third-party pricing tracker</a>
last checked May 2026. Treat all of it as ballpark; only a Bloomberg sales conversation produces a
real number.`)}

<h2>The reported numbers</h2>

${table({
  head: ['Configuration', 'Reported cost', 'Notes'],
  rows: [
    { cells: ['Single terminal', `~$${bloomberg.annual.toLocaleString()}/seat/yr (≈$2,665/mo)`, 'The standard reported rate on a two-year contract.'] },
    { cells: ['Two or more terminals', '~$28,320/seat/yr', 'Reported volume rate — roughly an 11% discount per seat.'] },
    { cells: ['Larger enterprise deals', 'Not verifiable', 'Some pricing trackers claim deeper negotiated rates for big installations; we found no corroboration and will not repeat their figures as fact.'] },
  ],
})}

<p class="prose">Two structural details matter more than the headline. First, contracts reportedly
run two years as standard, so the real commitment is on the order of $64,000 per seat, not
$32,000. Second, reported pricing varies by seat count, not by feature tier — by every published account
there is no "basic" Bloomberg; a seat is the full product, which is a large part of why nothing
about it is cheap.</p>

<h2>What drives the price</h2>

<ul class="prose">
  <li><strong>The network.</strong> Bloomberg's chat network is widely described as the industry's
  working communication layer — its value is the other subscribers, which means no rival can
  undercut it on features alone, and Bloomberg prices accordingly.</li>
  <li><strong>All-asset data depth.</strong> Equities, and also the fixed income and derivatives
  coverage that is the market standard for large parts of finance.</li>
  <li><strong>One product, all-in.</strong> No tiering means the marginal analyst who only needs
  quotes and filings pays the same as the rates desk — which is exactly the wedge the cheap
  alternatives aim at.</li>
</ul>

<h2>Discounts: what is actually sourced</h2>

<p class="prose">The multi-terminal rate above is the only discount consistently present in public
reporting. On the education side, Bloomberg runs a Bloomberg for Education program, but publishes
no academic prices; the one concrete data point we can cite is reporting from
<a href="${UP_BEACON_URL}" rel="nofollow noopener" target="_blank">the University of Portland's
student paper</a> (October 2023) that its 16-terminal lab cost the university about $100,000 a
year — roughly $6,250 per terminal, a steep discount if representative. No nonprofit pricing is
published anywhere we can find, and we found no source for individual-student terminal pricing at
all. Honest summary: unless you are negotiating for an institution, the reported retail rate is
the price.</p>

<h2>The alternatives arithmetic</h2>

<p class="prose">The gap between a Bloomberg seat and everything else is the entire story of the
affordable-terminal category. Reported annual figures, with ${esc(PRODUCT.name)}'s vendor-stated
price for scale:</p>

${table({
  head: ['Product', 'Annual cost', 'As % of a Bloomberg seat', 'Note'],
  rows: altRows,
})}

<p class="prose">All non-Godel figures are attributed ballparks — FactSet and LSEG negotiate like
Bloomberg does (<a href="/godel-terminal-vs-factset/">the FactSet comparison</a> covers that
asymmetry), and the current self-serve prices for
<a href="/godel-terminal-vs-koyfin/">Koyfin</a> and
<a href="/godel-terminal-vs-tradingview/">TradingView</a> are sourced on their comparison pages.
The full field is at <a href="/godel-terminal-alternatives/">alternatives</a>.</p>

<p class="prose">At ${ratio}× cheaper, the ${esc(PRODUCT.name)} trade-off is concrete: its
published case study — ${esc(CASE_STUDY.person)}, ${esc(CASE_STUDY.role)} — claims
${esc(CASE_STUDY.savings)} saved per analyst, while <a href="/godel-terminal-vs-bloomberg/">our
function-by-function comparison</a> is equally concrete about what a $${bloomberg.annual.toLocaleString()}
seat buys that a ${godel.display} one cannot: the messaging network, fixed income and execution.
<a href="/cost-calculator/">Model your own seat count →</a></p>

${ctaRow({ primary: 'Try Godel Terminal instead', secondary: { href: '/cost-calculator/', label: 'Open the cost calculator' } })}

${faqSection(faqs)}
`;
  },
};
