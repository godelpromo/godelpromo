import { PROMO, PRODUCT, PRICING, KNOWN_CODES } from '../data/site.mjs';
import { VENDOR_PAGES, ROADMAP_VENDOR } from '../data/research.mjs';
import { COMMANDS, ANNOUNCED, commandCount } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

/** The date every vendor surface cited on this page was fetched. */
const CHECKED = '2026-09-03';

/** SPLC lives in ANNOUNCED, not COMMANDS, on purpose: it has no doc page yet.
 *  The page throws at build time if that entry disappears, so it cannot
 *  silently describe a command the data module no longer tracks. */
const SPLC = ANNOUNCED.find((a) => a.mnemonic === 'SPLC');
if (!SPLC) { throw new Error('supply-chain page requires the SPLC entry in ANNOUNCED'); }

const cmd = (m) => {
  const c = COMMANDS.find((x) => x.mnemonic === m);
  if (!c) { throw new Error(`supply-chain page references unknown command ${m}`); }
  return c;
};

/** The only code the vendor itself publishes, sourced to its own X profile bio. */
const X25 = KNOWN_CODES.find((c) => c.code === 'X25');
if (!X25) { throw new Error('supply-chain page requires the X25 entry in KNOWN_CODES'); }

/**
 * Text of the launch post on the official @GodelTerminal X account, fetched
 * 2026-09-03. X's syndication endpoint truncates it at "relationship data,
 * now" because the post is a note tweet (it returns a 271-character display
 * range against the post's actual 294); the final line below is the text the
 * same status id returns in full.
 */
const LAUNCH_POST = {
  lines: [
    'Supply chain data (SPLC) is now live on Godel Terminal',
    'Map any company\'s suppliers, customers, competitors and partners',
    'Start with one name and see everything around it',
    'Thousands of companies mapped, global coverage',
    'Institutional-grade relationship data, now available to everyone.',
  ],
  /**
   * The two follow-ups are NOT equally sourced, so they are not stored alike.
   * The Atlas one returns verbatim from a public endpoint and can be quoted.
   * The other could not be retrieved from any endpoint we tried, so it is
   * carried as an unverified recollection and never rendered inside quotation
   * marks. Do not promote it without a retrievable source.
   */
  followUps: [
    {
      text: 'Try SPLC on Godel now for free',
      url: 'app.godelterminal.com/splc/NVDA.US',
      verified: false,
      note: 'Not retrievable on 3 September 2026 from the syndication endpoint or api.fxtwitter.com, both of which return only the parent post and the Atlas follow-up.',
    },
    {
      text: 'And yes we made it into a video game - try it now',
      url: 'app.godelterminal.com/atlas?via=ATLASX',
      verified: true,
      note: 'Verbatim from api.fxtwitter.com/GodelTerminal/status/2093009170198917224, checked 3 September 2026; the shortened link resolves to a referral URL carrying the token ATLASX.',
    },
  ],
};

/** What the public, login-free SPLC page for NVDA displayed when fetched 2026-09-03. */
const PUBLIC_PAGE = {
  url: 'app.godelterminal.com/splc/NVDA.US',
  title: 'NVIDIA Corporation (NVDA) Supply Chain: Customers, Suppliers, and Competitors',
  description: 'Explore the customers, suppliers, competitors and partners of NVIDIA Corporation (NVDA) on Godel Terminal.',
  relationships: 176,
  legend: 'Left: 3 suppliers / investors · Right: 9 customers, investees, partners & competitors · scroll to zoom, drag to pan, double-click to reset',
  prompt: 'Unlock the full terminal.',
};

/** The market-wide companion page, fetched 2026-09-03. */
const ATLAS = {
  url: 'app.godelterminal.com/atlas',
  title: 'Global Supply Chain: Customers, Suppliers, and Competitors',
  description: 'Explore the whole market\'s supply chain — every customer, supplier, and competitor relationship, company by company — in 3D on Godel Terminal.',
  /** Counters rendered on the public Atlas page, fetched 2026-09-03. The three
   *  category counts sum exactly to the relationship total. */
  counters: {
    breakdown: 'Seller 17,585 · Partner 10,467 · Competitor 28,288',
    relationships: '56,340',
    companies: '15,184',
    generated: 'Last generated Aug 26, 2026',
  },
};

const firstMonth = (PRICING.monthly.amount * (1 - PROMO.percent / 100)).toFixed(2);
const saving = (PRICING.monthly.amount * (PROMO.percent / 100)).toFixed(2);

const faqs = [
  {
    q: `Does ${PRODUCT.name} have supply chain data?`,
    a: `Yes, as of ${longDate(SPLC.announced)}. The official @GodelTerminal X account announced that "Supply chain data (SPLC) is now live", describing it as a map of any company's suppliers, customers, competitors and partners, with "thousands of companies mapped, global coverage". A public per-company page (for example <span class="mono">${esc(PUBLIC_PAGE.url)}</span>) loads without an account. What is not published is where the data comes from or which plans include it; the companion Atlas page does put numbers on "thousands" — ${ATLAS.counters.companies} companies and ${ATLAS.counters.relationships} relationships (${ATLAS.counters.generated}).`,
  },
  {
    q: `Is SPLC in the ${PRODUCT.name} command documentation?`,
    a: `Not as of ${longDate(CHECKED)}. The vendor sitemap lists ${commandCount()} command pages under <span class="mono">/docs/commands/</span> and SPLC is not among them; the URL <span class="mono">godelterminal.com/docs/commands/splc</span> behaves exactly like the OPT alias URL, which is a known 404. Our <a href="/godel-terminal-commands/">command reference</a> lists SPLC under "announced, not yet documented" and keeps it out of the ${commandCount()}-command count for that reason.`,
  },
  {
    q: `Where does ${PRODUCT.name}'s supply chain data come from?`,
    a: `Not published. The launch post calls it "institutional-grade relationship data" and names no provider. The vendor's <a href="${VENDOR_PAGES.dataCoverage}" rel="nofollow noopener" target="_blank">asset-class and coverage page</a>, fetched ${longDate(CHECKED)}, does not mention supply-chain or relationship data at all, and neither does the pricing page. No methodology or refresh cadence is published anywhere we can cite; the only coverage figures are the Atlas counters (${ATLAS.counters.companies} companies, ${ATLAS.counters.relationships} relationships, ${ATLAS.counters.generated}), and they say nothing about where the relationships come from.`,
  },
  {
    q: `Is SPLC included on every plan, or on the free trial?`,
    a: `Not published. What is checkable is that the public NVDA supply-chain page loads without a login while carrying an "${esc(PUBLIC_PAGE.prompt)}" prompt, so some view of SPLC is reachable anonymously. The pricing page states the ${PRICING.freeTrial.days}-day trial opens up "most of Godel" and does not name SPLC in either of its feature lists. If plan gating matters, ask ${esc(PRODUCT.supportEmail)} before paying. <a href="/godel-terminal-free-trial/">How the trial works →</a>`,
  },
  {
    q: `Is ${PRODUCT.name}'s SPLC the same as Bloomberg's SPLC?`,
    a: `Nothing published supports a comparison. ${PRODUCT.name} describes itself as "driven by familiar command mnemonics" and named this one SPLC; what Bloomberg calls its own supply-chain function is not publicly documented, so this page makes no claim about the names matching, and nothing compares the two on provider, depth or coverage. <a href="/godel-terminal-vs-bloomberg/">The broader comparison →</a>`,
  },
  {
    q: `What is the "video game" in the launch thread?`,
    a: `The follow-up post — "${esc(LAUNCH_POST.followUps[1].text)}" — links to <span class="mono">${esc(ATLAS.url)}</span>, whose own description reads: "${esc(ATLAS.description)}" It is the market-wide view of the same relationship data; SPLC is the per-company view.`,
  },
];

export const page = {
  path: '/godel-terminal-supply-chain/',
  title: 'Godel Terminal Supply Chain (SPLC): What Is Published',
  description: `Godel Terminal's SPLC supply-chain data, announced 27 August 2026: what the launch post claims, what the public page shows, and what is not published.`,
  summary: 'What is actually known about Godel Terminal\'s SPLC supply-chain function — announced on X on 27 August 2026, not yet in the command docs — and what remains unpublished.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-supply-chain/', label: 'Supply chain (SPLC)' },
  ],
  faqs,
  priority: '0.8',
  render() {
    const des = cmd('DES');
    const hds = cmd('HDS');
    const cf = cmd('CF');

    return `
<h1>Godel Terminal Supply Chain (SPLC): what is published, and what is not</h1>

<p class="lede">${esc(PRODUCT.name)} announced supply-chain data under the mnemonic <strong>SPLC</strong> on its
official X account on ${esc(longDate(SPLC.announced))}: map any company's suppliers, customers, competitors and
partners, starting from one name, with "thousands of companies mapped, global coverage". As of
${esc(longDate(CHECKED))} that post, two follow-ups, a public per-company page and a market-wide Atlas page are the
entire published record. There is no SPLC page in the vendor's command documentation, no named data provider and no
statement of which plans include it; the only coverage figures anywhere are the Atlas counters,
${esc(ATLAS.counters.relationships)} relationships across ${esc(ATLAS.counters.companies)} companies.</p>

${note(`<strong>Sourcing:</strong> every claim below comes from the
<a href="${SPLC.sourceUrl}" rel="nofollow noopener" target="_blank">launch thread</a> on the official
@GodelTerminal account, the public pages at <span class="mono">${esc(PUBLIC_PAGE.url)}</span> and
<span class="mono">${esc(ATLAS.url)}</span>, the vendor's
<a href="${PRODUCT.pricingUrl}" rel="nofollow noopener" target="_blank">pricing page</a>, its
<a href="${VENDOR_PAGES.dataCoverage}" rel="nofollow noopener" target="_blank">asset-class and coverage page</a> and its
sitemap — all fetched ${esc(longDate(CHECKED))}. Where a fact is on none of those, this page says "not
published".`)}

<h2>What the launch post actually says</h2>

<p class="prose">The announcement is short enough to quote in full:</p>

<ul class="prose">
  ${LAUNCH_POST.lines.map((l) => `<li>"${esc(l)}"</li>`).join('\n  ')}
</ul>

<p class="prose">A video attachment follows the last line. Because the post is a note tweet, X's syndication
excerpt of it stops at "relationship data, now"; the final line above is the full text the same status id returns.
Two follow-up posts from the same account are recorded in the thread, and they are not equally checkable. The
second returns verbatim from a public endpoint — "${esc(LAUNCH_POST.followUps[1].text)}" — linking to
<span class="mono">${esc(LAUNCH_POST.followUps[1].url)}</span>, a referral URL carrying the token ATLASX. The
first, which invited readers to try SPLC free at
<span class="mono">${esc(LAUNCH_POST.followUps[0].url)}</span>, could not be retrieved from any endpoint we tried
on ${esc(CHECKED)}, so it is recorded here as unverified rather than quoted.</p>

<p class="prose">So the vendor's own claims in the post are five: relationship types (suppliers, customers,
competitors, partners), a one-name starting point, "thousands" of companies, "global" coverage, and that the data is
"now available to everyone" — a statement about launch, not about which plans include it.</p>

<h2>What the public page shows</h2>

<p class="prose">The NVDA link in the thread loads without an account. Fetched ${esc(longDate(CHECKED))}, it is
titled "${esc(PUBLIC_PAGE.title)}", and its own description reads: "${esc(PUBLIC_PAGE.description)}" The page
displays a counter, <strong>Relationships: ${PUBLIC_PAGE.relationships}</strong>, a legend reading
"${esc(PUBLIC_PAGE.legend)}", and the prompt "${esc(PUBLIC_PAGE.prompt)}" The legend counts 3 and 9 items beside a
relationship count of ${PUBLIC_PAGE.relationships}; nothing published explains the difference.</p>

<p class="prose">The categories on screen are broader than the four in the post: <em>investors</em> sit with
suppliers on the left, <em>investees</em> with customers, partners and competitors on the right. The identifier in the
URL is exchange-suffixed (<span class="mono">NVDA.US</span>), consistent with the "global coverage" claim without
proving it.</p>

<p class="prose">The Atlas page is the market-wide companion, titled "${esc(ATLAS.title)}" and quoted in the FAQ
below. Fetched ${esc(longDate(CHECKED))} it renders a counter bar — ${esc(ATLAS.counters.breakdown)},
${esc(ATLAS.counters.relationships)} relationships, ${esc(ATLAS.counters.companies)} companies,
"${esc(ATLAS.counters.generated)}" — the three category counts summing exactly to the relationship total. Those are
the only coverage figures the vendor publishes anywhere, and they put a number on the post's "thousands":
${esc(ATLAS.counters.companies)} companies.</p>

<h2>Trying it, and what it costs</h2>

<p class="prose">The public SPLC page costs nothing to look at; inside the terminal, SPLC is announced but
undocumented and priced like everything else — every ${esc(PRODUCT.name)} plan starts with a
${PRICING.freeTrial.days}-day free trial (vendor pricing page, ${esc(longDate(CHECKED))}), then
${PRICING.monthly.display} a month, and ${esc(PROMO.code)} takes ${PROMO.percent}% off the
${esc(PROMO.appliesTo)} only (${PRICING.monthly.display} becomes $${firstMonth} once, a saving of $${saving}), the
one code on this site with a checkout verification date, ${esc(longDate(PROMO.lastVerified))}. Annual is
${PRICING.annual.display} per ${esc(PRICING.annual.unit)}; how the code interacts with a single annual payment is not
vendor-documented — <a href="/godel-terminal-monthly-vs-annual/">the full arithmetic</a>.</p>

${codeBox()}

<h2>What is not published</h2>

<p class="prose">This is the section that matters if SPLC is why you would subscribe. Each row says where we
looked.</p>

${table({
  head: ['Question', 'Status', 'Where we looked'],
  rows: [
    {
      cells: [
        '<strong>Data provider</strong>',
        'Not published',
        esc('The post says "institutional-grade relationship data" and names no vendor. Nothing on the public page, the coverage page or the pricing page.'),
      ],
    },
    {
      cells: [
        '<strong>Coverage count</strong>',
        esc(`"Thousands of companies", "global"; ${ATLAS.counters.companies} on Atlas`),
        esc(`Atlas publishes ${ATLAS.counters.companies} companies, ${ATLAS.counters.relationships} relationships, "${ATLAS.counters.generated}". The NVDA page counts ${PUBLIC_PAGE.relationships} for one name.`),
      ],
    },
    {
      cells: [
        '<strong>Methodology and refresh</strong>',
        'Not published',
        esc(`Nothing states how relationships are sourced or how often they update; the only time stamp anywhere is the Atlas counter bar's "${ATLAS.counters.generated}".`),
      ],
    },
    {
      cells: [
        '<strong>Plan availability</strong>',
        'Not published',
        esc(`The public page loads anonymously and shows "${PUBLIC_PAGE.prompt}"; SPLC is absent from both feature lists on the pricing page. An unverified follow-up post is recalled as offering SPLC free.`),
      ],
    },
    {
      cells: [
        '<strong>Documentation</strong>',
        'None',
        esc(`Sitemap lists ${commandCount()} command pages, none of them SPLC; the SPLC doc URL responds like the OPT alias URL, a known 404.`),
      ],
    },
    {
      cells: [
        '<strong>Export</strong>',
        'Not published',
        esc('FA, EQS and HP document Excel or JSON export; nothing says SPLC does.'),
      ],
    },
  ],
  caption: `All surfaces fetched ${longDate(CHECKED)}.`,
})}

<p class="prose">One footnote: nothing in the launch thread is a discount offer. The only code the vendor itself
publishes is ${esc(X25.code)}, ${X25.percent}% off a first payment, sourced to the ${esc(X25.source)}; the
<a href="/promo-codes/">code comparison</a> sets it against the referral codes.</p>

<h2>How SPLC fits the existing command set</h2>

<p class="prose">Read against the documented commands, SPLC fills a specific hole. <strong>${esc(des.mnemonic)}</strong>
answers "what is this company" — ${esc(des.summary)} <strong>${esc(hds.mnemonic)}</strong> answers "who owns it",
and <strong>${esc(cf.mnemonic)}</strong> is where you verify both against the filings. None of the
${commandCount()} documented commands answers "who does this company depend on, and who depends on it". That is the question the launch post is addressing, and in the
<a href="/godel-terminal-stock-research-workflow/">command-by-command research workflow</a> it would sit between
orientation and verification: after DES, before CF.</p>

<p class="prose">SPLC also appears in neither of the two feature lists on the vendor's pricing page
(${esc(ROADMAP_VENDOR.source)}): "In Godel today" names ${esc(ROADMAP_VENDOR.today.join(', '))}, and "Working on"
names ${esc(ROADMAP_VENDOR.workingOn.join(', '))}. The launch outran the pricing page, which is consistent with a
product in ${esc(PRODUCT.status)} shipping faster than its own marketing.
Our <a href="/godel-terminal-commands-that-dont-exist/">corrections ledger</a> logs the same lag from this side: in
August the vendor's documentation expanded faster than this site tracked it.</p>

<h2>What a Bloomberg user would compare it to</h2>

<p class="prose">${esc(PRODUCT.name)} describes itself as a "${esc(PRODUCT.positioning.replace(/\.$/, ''))}", and
SPLC follows that pattern. What Bloomberg calls its own supply-chain function is not publicly documented, so this
page makes no claim about the two names matching, and nothing published compares the products on data provider,
relationship depth, revenue attribution, or how many of the "thousands" of mapped companies are outside the US. The function-by-function table on <a href="/godel-terminal-vs-bloomberg/">our Bloomberg comparison</a> does not
yet include a supply-chain row for exactly that reason: there is one side's marketing and no basis for an assessment.</p>

<h2>Should you decide anything on it yet?</h2>

<p class="prose">If supply-chain mapping is a nice-to-have, the gaps above matter little; the rest of the product
is documented, and the <a href="/godel-terminal-data-coverage/">coverage page</a> shows where the underlying market
data is real-time versus delayed. If it is the reason you would subscribe, the honest position is
that a one-week-old announcement with no documentation, no named provider and no stated methodology behind its
counters is not yet something to plan around. The cheap test is the public page: swap <span class="mono">NVDA.US</span> for a name you know well —
ideally a smaller or non-US one — and check the relationships it draws against what that company discloses. The
<a href="/godel-terminal-free-trial/">trial guide</a> sequences the same check across the
${PRICING.freeTrial.days}-day trial.</p>

<p class="prose">This page will be updated, and the change dated, when a doc page, a provider or a methodology is
published.</p>

${ctaRow({ primary: 'Start the free trial on Godel Terminal', secondary: { href: '/godel-terminal-commands/', label: 'Full command reference' } })}

${faqSection(faqs)}
`;
  },
};
