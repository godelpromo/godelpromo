import { PROMO, PRODUCT, PRICING, COMPARISON_TERMINALS } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `What is the best ${PRODUCT.name} alternative?`,
    a: `It depends on what you need it for. Koyfin is the closest direct competitor on price and coverage. TradingView is better if you mainly want charting. FactSet or LSEG Workspace if you need institutional depth and have the budget. There is no single best answer, and any page telling you otherwise is guessing at your workflow.`,
  },
  {
    q: `Is Koyfin better than ${PRODUCT.name}?`,
    a: `They are close competitors at similar price points. Koyfin is more established and stronger on dashboards and macro data; ${PRODUCT.name} is command-driven and mirrors legacy terminal mnemonics, which suits people coming from a Bloomberg workflow. Trial both — they both offer one.`,
  },
  {
    q: `Is there a free ${PRODUCT.name} alternative?`,
    a: `For quotes and charting, TradingView's free tier and several broker platforms cover a lot. For filings, EDGAR full-text search is free and is the same primary source ${PRODUCT.name}'s CF command pulls from. What you cannot get free is the consolidation — having all of it in one command-driven workspace is the thing you are paying for.`,
  },
];

export const page = {
  path: '/godel-terminal-alternatives/',
  title: `Godel Terminal Alternatives: 6 Options Compared`,
  description: `Koyfin, TradingView, FactSet, LSEG and Bloomberg compared against Godel Terminal on price and coverage — and which one fits which workflow.`,
  summary: 'Comparison of Godel Terminal alternatives across price and coverage, with guidance on which fits which workflow.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/godel-terminal-alternatives/', label: 'Alternatives' },
  ],
  faqs,
  priority: '0.8',
  render() {
    const rows = COMPARISON_TERMINALS.map((t) => ({
      highlight: !!t.highlight,
      cells: [
        `<strong>${esc(t.name)}</strong>`,
        t.display,
        esc(t.note),
      ],
    }));

    return `
<h1>Godel Terminal alternatives, compared honestly</h1>

<p class="lede">${esc(PRODUCT.name)} sits in an unusual spot: far cheaper than an institutional terminal,
far more comprehensive than a charting tool. That means its real competition depends entirely on which direction
you are coming from.</p>

<h2>Price landscape</h2>

${table({
  head: ['Product', 'Annual per seat', 'Notes'],
  rows,
})}

<p class="prose faint">Only ${esc(PRODUCT.name)}'s figure is vendor-published. The rest are market-reported
approximations — institutional terminal pricing is negotiated and rarely disclosed.
<a href="/cost-calculator/">Model your own seat count →</a></p>

<h2>Which one actually fits</h2>

<div class="grid grid-2">
  <div class="tile">
    <h3>Koyfin — the closest competitor</h3>
    <p>Similar price bracket, similar target user. Stronger on dashboards, macro data and visual analytics;
    weaker if you specifically want a command-line workflow. If you are choosing between this and
    ${esc(PRODUCT.name)} on price alone, you are asking the wrong question — trial both and see which
    interaction model you actually prefer. <a href="/godel-terminal-vs-koyfin/">Full comparison →</a></p>
  </div>
  <div class="tile">
    <h3>TradingView — if you mainly chart</h3>
    <p>Best-in-class charting and a large community, at a fraction of the price. But it is not a research
    terminal: no standardized financials tied to filings, no consensus estimates screen, no filings browser.
    If charting is 80% of your usage, this is the rational choice.
    <a href="/godel-terminal-vs-tradingview/">Full comparison →</a></p>
  </div>
  <div class="tile">
    <h3>FactSet / LSEG Workspace — institutional depth</h3>
    <p>Genuinely comprehensive, genuinely expensive, and negotiated per contract. Worth it when you need
    fixed income, derivatives analytics, or coverage that has to be defensible to a compliance function.
    Overkill for a two-person shop. <a href="/godel-terminal-vs-factset/">Godel vs FactSet →</a></p>
  </div>
  <div class="tile">
    <h3>Bloomberg — the standard</h3>
    <p>Still the default for a reason, and the messaging network is the part nobody can compete with.
    See the <a href="/godel-terminal-vs-bloomberg/">full comparison</a> — the realistic outcome for most
    desks is a mix, not a replacement.</p>
  </div>
</div>

<h2>Free options worth knowing about</h2>

<p class="prose">If budget is the binding constraint, a surprising amount is available free — it is just
not consolidated:</p>

<ul class="prose">
  <li><strong>SEC EDGAR full-text search</strong> — free, and the same primary source ${esc(PRODUCT.name)}'s
  <code class="mono">CF</code> command pulls from. Slower to work with, identical underlying documents.</li>
  <li><strong>TradingView free tier</strong> — charting and delayed quotes.</li>
  <li><strong>Broker platforms</strong> — most brokerages bundle real-time quotes and basic screening with an account.</li>
  <li><strong>Company IR pages</strong> — financial statements and earnings decks, direct from the source.</li>
</ul>

<p class="prose">What you cannot assemble free is the consolidation. Four browser tabs and a spreadsheet is not
the same product as one command line, and the honest calculation is whether the time saved exceeds
${PRICING.annual.display} a year. For a working analyst that is a low bar; for an occasional investor it is not.</p>

${note(`<strong>A note on our bias:</strong> we earn a referral commission if you subscribe to
${esc(PRODUCT.name)} and nothing if you choose anything else on this page. We have tried to write it straight
anyway — telling you TradingView is the better buy when it is costs us one referral and keeps the page worth
reading. Weigh it accordingly.`)}

<h2>If you land on ${esc(PRODUCT.name)}</h2>

${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-review/', label: 'Read the full review' } })}

${faqSection(faqs)}
`;
  },
};
