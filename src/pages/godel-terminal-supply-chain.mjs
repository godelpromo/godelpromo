import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
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

/**
 * Verbatim text of the launch thread on the official @GodelTerminal X account,
 * from X's syndication endpoint, fetched 2026-09-03. The syndicated copy of the
 * first post ends mid-sentence before its video attachment; it is quoted as
 * delivered, not completed.
 */
const LAUNCH_POST = {
  lines: [
    'Supply chain data (SPLC) is now live on Godel Terminal',
    'Map any company\'s suppliers, customers, competitors and partners',
    'Start with one name and see everything around it',
    'Thousands of companies mapped, global coverage',
    'Institutional-grade relationship data, now',
  ],
  followUps: [
    { text: 'Try SPLC on Godel now for free', url: 'app.godelterminal.com/splc/NVDA.US' },
    { text: 'And yes we made it into a video game - try it now', url: 'app.godelterminal.com/atlas' },
  ],
};

/** What the public, login-free SPLC page for NVDA displayed when fetched 2026-09-03. */
const PUBLIC_PAGE = {
  url: 'app.godelterminal.com/splc/NVDA.US',
  title: 'NVIDIA Corporation (NVDA) Supply Chain: Customers, Suppliers, and Competitors',
  description: 'Explore the customers, suppliers, competitors and partners of NVIDIA Corporation (NVDA) on Godel Terminal.',
  relationships: 176,
  legend: 'Left: 3 suppliers / investors · Right: 9 customers, investees, partners & competitors',
  prompt: 'Unlock the full terminal.',
};

/** The market-wide companion page, fetched 2026-09-03. */
const ATLAS = {
  url: 'app.godelterminal.com/atlas',
  title: 'Global Supply Chain: Customers, Suppliers, and Competitors',
  description: 'Explore the whole market\'s supply chain — every customer, supplier, and competitor relationship, company by company — in 3D on Godel Terminal.',
};

const firstMonth = (PRICING.monthly.amount * (1 - PROMO.percent / 100)).toFixed(2);
const saving = (PRICING.monthly.amount * (PROMO.percent / 100)).toFixed(2);

const faqs = [
  {
    q: `Does ${PRODUCT.name} have supply chain data?`,
    a: `Yes, as of ${longDate(SPLC.announced)}. The official @GodelTerminal X account announced that "Supply chain data (SPLC) is now live", describing it as a map of any company's suppliers, customers, competitors and partners, with "thousands of companies mapped, global coverage". A public per-company page (for example <span class="mono">${esc(PUBLIC_PAGE.url)}</span>) loads without an account. What is not published is where the data comes from, how many companies "thousands" means, or which plans include it.`,
  },
  {
    q: `Is SPLC in the ${PRODUCT.name} command documentation?`,
    a: `Not as of ${longDate(CHECKED)}. The vendor sitemap lists ${commandCount()} command pages under <span class="mono">/docs/commands/</span> and SPLC is not among them; the URL <span class="mono">godelterminal.com/docs/commands/splc</span> behaves exactly like the OPT alias URL, which is a known 404. Our <a href="/godel-terminal-commands/">command reference</a> lists SPLC under "announced, not yet documented" and keeps it out of the ${commandCount()}-command count for that reason.`,
  },
  {
    q: `Where does ${PRODUCT.name}'s supply chain data come from?`,
    a: `Not published. The launch post calls it "institutional-grade relationship data" and names no provider. The vendor's <a href="${VENDOR_PAGES.dataCoverage}" rel="nofollow noopener" target="_blank">asset-class and coverage page</a>, fetched ${longDate(CHECKED)}, does not mention supply-chain or relationship data at all, and neither does the pricing page. No methodology, refresh cadence or coverage figure beyond "thousands of companies" exists anywhere we can cite.`,
  },
  {
    q: `Is SPLC included on every plan, or on the free trial?`,
    a: `Not published. The launch thread says "Try SPLC on Godel now for free", and the public NVDA page loads without login while carrying an "${esc(PUBLIC_PAGE.prompt)}" prompt. The pricing page states the ${PRICING.freeTrial.days}-day trial opens up "most of Godel" and does not name SPLC in either of its feature lists. If plan gating matters to your decision, ask ${esc(PRODUCT.supportEmail)} before paying rather than assuming. <a href="/godel-terminal-free-trial/">How the trial works →</a>`,
  },
  {
    q: `Is ${PRODUCT.name}'s SPLC the same as Bloomberg's SPLC?`,
    a: `Same mnemonic, and that is the only claim this page makes. SPLC is the name Bloomberg uses for its supply-chain function, and ${PRODUCT.name} positions itself as a terminal "driven by familiar command mnemonics", so the choice is consistent with the rest of its command set. Nothing published compares the two on provider, depth, or coverage, so no parity claim is possible. <a href="/godel-terminal-vs-bloomberg/">The broader comparison →</a>`,
  },
  {
    q: `What is the "video game" in the launch thread?`,
    a: `The follow-up post — "${esc(LAUNCH_POST.followUps[1].text)}" — links to <span class="mono">${esc(ATLAS.url)}</span>, a page titled "${esc(ATLAS.title)}" whose own description reads: "${esc(ATLAS.description)}" It is the market-wide view of the same relationship data; SPLC is the per-company view.`,
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
${esc(longDate(CHECKED))} that post, two follow-ups and a public per-company page are the entire published
record. There is no SPLC page in the vendor's command documentation, no named data provider, no coverage figure
beyond "thousands", and no statement of which plans include it. This page separates what is claimed from what is
not published, so you can decide whether to weigh it.</p>

${note(`<strong>Sourcing:</strong> every claim below comes from the
<a href="${SPLC.sourceUrl}" rel="nofollow noopener" target="_blank">launch thread</a> on the official
@GodelTerminal account, the public pages at <span class="mono">${esc(PUBLIC_PAGE.url)}</span> and
<span class="mono">${esc(ATLAS.url)}</span>, the vendor's
<a href="${PRODUCT.pricingUrl}" rel="nofollow noopener" target="_blank">pricing page</a> and its sitemap — all
fetched ${esc(longDate(CHECKED))}. Where a fact is on none of those, this page says "not published" rather than
guessing.`)}

<h2>What the launch post actually says</h2>

<p class="prose">The announcement is short enough to quote in full, as delivered by X's syndication feed:</p>

<ul class="prose">
  ${LAUNCH_POST.lines.map((l) => `<li>"${esc(l)}"</li>`).join('\n  ')}
</ul>

<p class="prose">The final line is where the syndicated text stops; the post continues with a video rather than
more text. Two replies from the same account followed within a second. The first says
"${esc(LAUNCH_POST.followUps[0].text)}" and links to <span class="mono">${esc(LAUNCH_POST.followUps[0].url)}</span>.
The second says "${esc(LAUNCH_POST.followUps[1].text)}" and links to
<span class="mono">${esc(LAUNCH_POST.followUps[1].url)}</span>.</p>

<p class="prose">So the vendor's own claims are exactly four: relationship types (suppliers, customers,
competitors, partners), a one-name starting point, "thousands" of companies, and "global" coverage. Everything
else on this page is either what the public page displays or an explicit gap.</p>

<h2>What the public page shows</h2>

<p class="prose">The NVDA link in the thread loads without an account. Fetched ${esc(longDate(CHECKED))}, it is
titled "${esc(PUBLIC_PAGE.title)}", and its own description reads: "${esc(PUBLIC_PAGE.description)}" The page
displays a counter, <strong>Relationships: ${PUBLIC_PAGE.relationships}</strong>, and a legend that reads
"${esc(PUBLIC_PAGE.legend)}" — twelve nodes drawn against a count of ${PUBLIC_PAGE.relationships}, so the default
view is a filtered slice, not the full set. It also carries the prompt "${esc(PUBLIC_PAGE.prompt)}"</p>

<p class="prose">Two things in that legend are worth noticing. The categories on screen are broader than the four in
the post: <em>investors</em> sit with suppliers on the left, and <em>investees</em> sit with customers, partners
and competitors on the right. And the identifier in the URL is exchange-suffixed (<span class="mono">NVDA.US</span>),
which is consistent with the "global coverage" claim without proving it — one US name is not evidence about
international depth either way.</p>

<p class="prose">The Atlas page is the market-wide companion: titled "${esc(ATLAS.title)}", described by the vendor
as "${esc(ATLAS.description)}" It showed a loading state when fetched, so this page makes no claim about what it
renders.</p>

<h2>Trying it, and what it costs</h2>

<p class="prose">The public page costs nothing to look at. Beyond that, every ${esc(PRODUCT.name)} plan starts with
a ${PRICING.freeTrial.days}-day free trial (vendor pricing page, ${esc(longDate(CHECKED))}), and if you convert to
monthly, ${esc(PROMO.code)} takes ${PROMO.percent}% off the ${esc(PROMO.appliesTo)}:
${PRICING.monthly.display} becomes $${firstMonth} once, a saving of $${saving}, then ${PRICING.monthly.display}
a month. Annual is ${PRICING.annual.display} per ${esc(PRICING.annual.unit)}; how the code interacts with a single
annual payment is not vendor-documented — <a href="/godel-terminal-monthly-vs-annual/">the full arithmetic</a>.</p>

${codeBox()}

<h2>What is not published</h2>

<p class="prose">This is the section that matters if SPLC is the reason you are considering a subscription.
Each row says where we looked.</p>

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
        esc('"Thousands of companies", "global"'),
        esc(`No figure. The one public example counts ${PUBLIC_PAGE.relationships} relationships for a single name.`),
      ],
    },
    {
      cells: [
        '<strong>Methodology and refresh</strong>',
        'Not published',
        esc('Nothing states how relationships are sourced or how often they update.'),
      ],
    },
    {
      cells: [
        '<strong>Plan availability</strong>',
        'Not published',
        esc(`"Try SPLC on Godel now for free" in the thread; "${PUBLIC_PAGE.prompt}" on the public page; SPLC absent from both feature lists on the pricing page.`),
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

<p class="prose">One footnote for readers of this site in particular. Both links in the launch thread carry a
<span class="mono">via=ATLASX</span> parameter — the same style of referral tracking every affiliate link to
${esc(PRODUCT.name)} uses. Nothing published says ATLASX is a checkout code, and this site has not verified it.
${esc(PROMO.code)} remains the only code here with a checkout verification date
(${esc(longDate(PROMO.lastVerified))}); the <a href="/promo-codes/">code comparison</a> covers the rest.</p>

<h2>How SPLC fits the existing command set</h2>

<p class="prose">Read against the documented commands, SPLC fills a specific hole. <strong>${esc(des.mnemonic)}</strong>
answers "what is this company" — ${esc(des.summary)} <strong>${esc(hds.mnemonic)}</strong> answers "who owns it" —
${esc(hds.summary)} <strong>${esc(cf.mnemonic)}</strong> is where you verify both against the filings —
${esc(cf.summary)} None of the ${commandCount()} documented commands answers "who does this company depend on, and who
depends on it". That is the question the launch post is addressing, and in the
<a href="/godel-terminal-stock-research-workflow/">command-by-command research workflow</a> it would sit between
orientation and verification: after DES, before CF.</p>

<p class="prose">It is also worth noting where SPLC does <em>not</em> appear. The vendor's pricing page carries two
feature lists (${esc(ROADMAP_VENDOR.source)}). "In Godel today" names ${esc(ROADMAP_VENDOR.today.join(', '))}.
"Working on" names ${esc(ROADMAP_VENDOR.workingOn.join(', '))}. SPLC is in neither column — the launch outran the
pricing page, which is consistent with a product in ${esc(PRODUCT.status)} shipping faster than its own marketing.
The <a href="/godel-terminal-commands-that-dont-exist/">corrections ledger</a> records how often that has happened.</p>

<p class="prose">Because it is announced rather than documented, the <a href="/godel-terminal-commands/">command
reference</a> lists SPLC in a separate "announced, not yet documented" section rather than among the
${commandCount()} counted commands. When a doc page appears, it moves; until then the count stays a claim about
documentation, not announcements.</p>

<h2>What a Bloomberg user would compare it to</h2>

<p class="prose">SPLC is the mnemonic Bloomberg uses for its supply-chain function, and ${esc(PRODUCT.name)} describes
itself as a "${esc(PRODUCT.positioning.replace(/\.$/, ''))}", so the name is a deliberate signal to people arriving
from that product. That is a naming observation and nothing more. Nothing published compares the two on data
provider, relationship depth, revenue attribution, or how many of the "thousands" of mapped companies are outside the
US. The function-by-function table on <a href="/godel-terminal-vs-bloomberg/">our Bloomberg comparison</a> does not
yet include a supply-chain row for exactly that reason: there is one side's marketing and no basis for an assessment.</p>

<h2>Should you decide anything on it yet?</h2>

<p class="prose">If supply-chain mapping is a nice-to-have, none of the gaps above matter much; the rest of the
product is documented and the <a href="/godel-terminal-data-coverage/">coverage page</a> tells you where the
underlying market data is real-time versus delayed. If it is the reason you would subscribe, the honest position is
that a one-week-old announcement with no documentation, no provider and no coverage figure is not yet something to
plan around. The cheap test is the public page: swap <span class="mono">NVDA.US</span> for a name you know well —
ideally a smaller or non-US one — and check whether the relationships it draws match what that company discloses.
Then run the same check on the ${PRICING.freeTrial.days}-day trial against the documented commands, which is what the
<a href="/godel-terminal-free-trial/">trial guide</a> sequences day by day.</p>

<p class="prose">This page will be updated when a doc page, a provider, or a coverage figure is published, and the
change will be dated.</p>

${ctaRow({ primary: 'Start the free trial on Godel Terminal', secondary: { href: '/godel-terminal-commands/', label: 'Full command reference' } })}

${faqSection(faqs)}
`;
  },
};
