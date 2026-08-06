import { PROMO, PRODUCT, PRICING, COMPANY, CASE_STUDY } from '../data/site.mjs';
import { COMMANDS, ALIASES, officialCommands, commandCount } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `Is ${PRODUCT.name} worth it?`,
    a: `It depends on what you are replacing. At ${PRICING.annual.display} per seat per year it is roughly a thirtieth of a Bloomberg seat, and if it consolidates two or three separate data subscriptions it pays for itself quickly. It is not worth it if you only need charting, or if you depend on the parts of a legacy terminal it does not replicate — messaging, fixed income depth, or execution.`,
  },
  {
    q: `Is ${PRODUCT.name} legitimate?`,
    a: `Yes. It is built by ${COMPANY.legalName}, a ${COMPANY.incorporation}, with ${COMPANY.funding} in reported funding from investors including ${COMPANY.investors.slice(0, 2).join(' and ')}. It publishes a named customer case study. It is a real company with a real product, currently in ${PRODUCT.status}.`,
  },
  {
    q: `Is ${PRODUCT.name} a Bloomberg replacement?`,
    a: `For research workflows — quotes, filings, financials, estimates, news — it covers a lot of the same ground. As a full Bloomberg replacement, no: there is no equivalent of the Bloomberg messaging network, which is the single hardest thing to displace, and fixed income coverage is not comparable. See our <a href="/godel-terminal-vs-bloomberg/">detailed comparison</a>.`,
  },
  {
    q: `What is the biggest weakness?`,
    a: `That it is still in ${PRODUCT.status}, by the vendor's own description, with commands under active development. That is fine if you are augmenting an existing stack and awkward if you intend to depend on it exclusively.`,
  },
  {
    q: `How do I get a discount?`,
    a: `Use promo code <strong>${PROMO.code}</strong> at checkout for ${PROMO.percent}% off your ${PROMO.appliesTo}.`,
  },
];

export const page = {
  path: '/godel-terminal-review/',
  title: `Godel Terminal Review ${new Date().getFullYear()}: An Evidence-Based Verdict`,
  description: `What is actually verifiable about Godel Terminal: real pricing, ${commandCount()} documented commands, and which widely-repeated competitor claims do not hold up.`,
  summary: `Evidence-based Godel Terminal review separating vendor-published facts from third-party claims, with an honest verdict on who the product suits.`,
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/godel-terminal-review/', label: 'Review' },
  ],
  faqs,
  priority: '0.9',
  render() {
    const verdictRows = [
      { cells: ['Data breadth', 'Strong', 'Quotes, options, news, filings, financials, estimates, ratings, historicals, screening, commodities and FX all have documented commands.'] },
      { cells: ['Price', 'Strong', `${PRICING.annual.display}/seat/year against $12,000–$32,000 for incumbent terminals.`] },
      { cells: ['Command familiarity', 'Strong', 'Mnemonics deliberately mirror legacy terminal conventions, which shortens the transition.'] },
      { cells: ['Maturity', 'Caution', `Vendor describes the product as ${PRODUCT.status} with commands under development.`] },
      { cells: ['Messaging / network', 'Absent', 'No equivalent to the Bloomberg messaging network, which is the primary lock-in for many desks.'] },
      { cells: ['Fixed income', 'Unclear', 'Not named in the published capability list. Equity-centric on the evidence available.'] },
      { cells: ['Documentation quality', 'Caution', `${commandCount()} commands documented, but the marketing site sits behind a bot challenge that blocks automated access — including, ironically, the AI crawlers its own robots.txt welcomes.`] },
    ];

    return `
<h1>Godel Terminal review: what is actually verifiable</h1>

<p class="lede">There are a lot of ${esc(PRODUCT.name)} reviews claiming six months of daily hands-on use.
Several of them quote prices two changes out of date and describe a command set a third the size of the
current documentation. This review takes a
different approach: it tells you exactly what it knows, how it knows it, and what remains unverified.</p>

${note(`<strong>Methodology, stated up front:</strong> this review is built from ${esc(PRODUCT.name)}'s own
marketing site and command documentation index, its published customer case study, its referral programme terms,
and cross-checks against independent reviews. <strong>It is not based on hands-on use of the product.</strong>
Where a claim is vendor-published we say so; where it is second-hand we say that too. We think that is more useful
than an unverifiable claim of daily use — particularly given how many of those get the basics wrong.`)}

<h2>What Godel Terminal is</h2>

<p class="prose">${esc(PRODUCT.name)} is a browser-based financial terminal. You type a short mnemonic into a
command line — optionally prefixed with a ticker — and a panel opens. <code class="mono">AAPL DES</code> gives you
Apple's overview; <code class="mono">WEI</code> gives you world indices. The design goal is stated plainly in its own
marketing: "browser based with familiar commands."</p>

<p class="prose">The pitch is a cost argument, and ${esc(PRODUCT.name)} makes it explicitly:
<em>"A $30,000 terminal can't go on every desk."</em> Its answer is ${PRICING.annual.display} per seat per year.
That is not a marginal saving; it is a different category of purchase decision, which is why the product is
interesting even in ${esc(PRODUCT.status)}.</p>

<h2>Who is behind it</h2>

<p class="prose">${esc(COMPANY.legalName)} is a ${esc(COMPANY.incorporation)} with ${esc(COMPANY.funding)}.
Named investors include ${COMPANY.investors.map(esc).join(', ')}.
${COMPANY.people.map((p) => `${esc(p.name)} is ${esc(p.role)}${p.note ? ` — ${esc(p.note)}` : ''}`).join('; ')}.</p>

<p class="prose">Worth knowing if you are evaluating vendor risk: the co-founder association is a matter of public
record and some buyers will factor it in. We mention it because a review that omits it is not being straight with you,
not because it bears on whether the software works.</p>

<h2>What it actually does</h2>

<p class="prose">${officialCommands().length} commands have prose descriptions published by ${esc(PRODUCT.name)} itself,
and ${commandCount()} in total have documentation pages. The genuinely useful specifics:</p>

<ul class="prose">
  <li><strong>QM (Quote Monitor)</strong> — up to <strong>400 tickers per watchlist</strong>, with batch import. This is the
  number that decides whether it replaces your current watchlist tooling, and almost no other review mentions it.</li>
  <li><strong>N (News)</strong> — ticker-filtered feeds from primary wires, exchange notices and major outlets.
  ${esc(PRODUCT.name)} positions this as consolidating over $2,000 of media subscriptions, and it is the feature its own
  customer testimonial singles out.</li>
  <li><strong>CF (Filings)</strong> — 10-K, 10-Q, 8-K, S-1, proxies and 13Fs pulled direct from EDGAR and rendered
  in-workspace.</li>
  <li><strong>FA (Financials)</strong> — standardized statements with each line item tied back to its source filing,
  exportable to Excel. The provenance link is the part that matters for audit.</li>
  <li><strong>EM (Earnings Matrix)</strong> — forward consensus with the implied P/E, P/S and P/CF multiples alongside,
  which turns a consensus table into a valuation screen.</li>
</ul>

<p class="prose"><a href="/godel-terminal-commands/">Full command reference with sourcing →</a></p>

<h2>Where reviews go stale — including ours</h2>

<p class="prose">This is the part worth reading carefully, because it is a decent proxy for how much any given
${esc(PRODUCT.name)} review actually checked, and how recently. The documentation is a moving target: as of
August 2026 it covers ${commandCount()} commands, up from 17 a month earlier. Five commands we previously
flagged as nonexistent gained real documentation pages, and mnemonics like <span class="mono">OPT</span> turn
out to be documented aliases:</p>

${table({
  head: ['Alias that works', 'Opens', 'Note'],
  rows: ALIASES.map((a) => ({
    cells: [`<span class="mono">${esc(a.alias)}</span>`, `<strong class="mono">${esc(a.canonical)}</strong>`, esc(a.note || '')],
  })),
})}

<p class="prose">Most reviews in this niche still describe the product at some earlier moment — quoting $60 or
$80 monthly pricing from 2024–25, or a 17-command docset. We keep a
<a href="/godel-terminal-commands-that-dont-exist/">dated corrections page</a> instead of silently editing,
so you can see exactly what changed and when. A review that never corrects itself is a review that never
re-checked.</p>

<h2>The cost case</h2>

<p class="prose">${esc(PRODUCT.name)}'s published case study is ${esc(CASE_STUDY.fund)}, managed by ${esc(CASE_STUDY.manager)}:</p>

<blockquote class="note">${esc(CASE_STUDY.quote)}
<br><span class="faint">— ${esc(CASE_STUDY.person)}, ${esc(CASE_STUDY.role)}</span></blockquote>

<p class="prose">That is a vendor-published testimonial from a named person at a named fund, claiming
${esc(CASE_STUDY.savings)} in savings. Treat it as marketing — but attributable marketing, which is a step above
the anonymous testimonials most competitors in this space run.</p>

<p class="prose">One cost caveat that rarely gets mentioned: ${esc(PRODUCT.name)}'s pricing page lists an additional
<strong>${PRICING.finraSurcharge.display}/month surcharge for FINRA-licensed users</strong>. If that applies to you it is
roughly a ${Math.round((PRICING.finraSurcharge.amount * 12 / PRICING.annual.amount) * 100)}% increase on the seat price.
<a href="/godel-terminal-pricing/">Full pricing breakdown →</a></p>

<h2>Verdict by dimension</h2>

${table({
  head: ['Dimension', 'Assessment', 'Basis'],
  rows: verdictRows,
})}

<h2>Who should buy it</h2>

<div class="grid grid-2">
  <div class="tile">
    <h3>Strong fit</h3>
    <p>Small funds, family offices, RIAs, equity research teams and independent analysts currently stitching
    together two or three data subscriptions, who need real-time quotes, filings, financials and news in one
    command-driven workspace and cannot justify a five-figure seat.</p>
  </div>
  <div class="tile">
    <h3>Poor fit</h3>
    <p>Anyone who needs the Bloomberg messaging network, serious fixed income coverage, or execution.
    Also anyone who only needs charts — a $599/year charting tool covers that far more cheaply.</p>
  </div>
</div>

<h2>What we could not verify</h2>

<p class="prose">In the interest of not overstating this review's reach:</p>

<ul class="prose">
  <li>Actual data latency, uptime and fill quality of the real-time feeds.</li>
  <li>Depth of the options chain, and how far back historical data goes.</li>
  <li>The behaviour of ${COMMANDS.filter((c) => c.tier === 'documented').length} commands whose documentation pages exist
  but whose prose we could not retrieve — ${esc(PRODUCT.name)}'s site sits behind a bot challenge that blocks automated
  access.</li>
  <li>Whether the reported ${PRICING.monthly.display}/month plan and ${PRICING.freeTrial.days}-day trial are still current,
  since neither is published on a vendor page.</li>
</ul>

<p class="prose">The ${PRICING.freeTrial.days}-day trial, if available, resolves most of these for free.
That is genuinely the right way to evaluate this product — the price of being wrong is one month, and
${esc(PROMO.code)} reduces even that.</p>

<h2>Try it with ${esc(PROMO.code)}</h2>

${codeBox()}
${ctaRow({ secondary: { href: '/cost-calculator/', label: 'Run the numbers' } })}

${faqSection(faqs)}
`;
  },
};
