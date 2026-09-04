import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { API_FACTS } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

/** Every OpenBB and GitHub figure below was read on this date. */
const CHECKED = '2026-09-03';

/**
 * OpenBB facts, each tied to the page or endpoint it came from so the page
 * can be re-verified line by line. Nothing here is inferred from the product
 * name or from memory of an older version of OpenBB.
 */
const OPENBB = {
  home: 'https://openbb.co/',
  pricing: 'https://openbb.co/pricing',
  repo: 'https://github.com/OpenBB-finance/OpenBB',
  licenseFile: 'https://raw.githubusercontent.com/OpenBB-finance/OpenBB/develop/LICENSE',
  relicencePost: 'https://openbb.co/blog/openbb-belongs-to-everyone',
  agplPost: 'https://openbb.co/blog/license-change-openbb-platform-goes-agpl',
  /** github.com/OpenBB-finance/OpenBB, About panel and the GitHub REST API. */
  repoDescription: 'Open Data Platform for analysts, quants and AI agents.',
  stars: '72,650',
  forks: '7,501',
  repoCreated: 'December 2020',
  /** Full source sentences behind the partial quotes used in the prose below. */
  readmeLine: 'Open Data Platform by OpenBB (ODP) is the open-source toolset that helps data engineers integrate proprietary, licensed, and public data sources into downstream applications like AI copilots and research dashboards.',
  heroLine: 'The workspace where investment teams bring their data, workflows, and AI together. Under your control.',
  /** openbb.co/pricing hero subhead, verbatim, read 3 September 2026. */
  communityLine: 'Community Edition is free for individuals. Lite and Pro are for professional teams that need a collaborative workspace in their own OpenBB deployment.',
  /** blog/openbb-belongs-to-everyone, Didier Lopes, Founder & CEO. */
  relicenceQuote: 'we are committing to releasing the entire OpenBB product suite under a permissive license',
  relicenceTiming: 'We will share more details about the order and timing of each release as we complete that work.',
  relicenceDate: '25 August 2026',
  /** The same post is a wind-down notice. Both quotes verbatim, read 3 September 2026. */
  windDownQuote: "we couldn't find the product-market fit needed to build a sustainable business around this vision within the time we had",
  hostedTimelineQuote: 'Existing customers and users of the hosted products will hear from us directly about timelines.',
};

/** openbb.co/pricing, read 3 September 2026. Prices verbatim from the page. */
const OPENBB_PLANS = [
  {
    name: 'Community',
    price: 'Free (individual licence)',
    hosting: 'Cloud-hosted by OpenBB',
    who: 'Individual investors, personal use',
  },
  {
    name: 'Lite',
    price: '$2,400/year, shown at $1,200/year under a "50% off until 31 Aug" label',
    hosting: 'Self-hosted (on-premises or VPC)',
    who: 'Small teams (&lt;10) wanting their own environment',
  },
  {
    name: 'Pro',
    price: 'Custom pricing (team licence)',
    hosting: 'Self-hosted (on-premises or VPC)',
    who: 'Larger teams deploying at scale',
  },
  {
    name: 'Snowflake Native App',
    price: '$500/year/seat',
    hosting: 'Snowflake hosted',
    who: 'Firms analysing data on Snowflake',
  },
];

/**
 * The r/openBB thread the brief is built around, recovered through the
 * arctic-shift Reddit archive on 2026-09-03. Community tier: one person's
 * opinion, quoted and attributed, never rendered as fact.
 */
const THREAD = {
  title: 'why I choose openBB over Gödel',
  author: 'u/Canmore_Serious',
  date: '9 December 2024',
  score: 3,
  priceQuote: 'Gödel costs $60, while OpenBB is mostly free.',
  customQuote: 'OpenBB feels like having a tailor for financial data. You can tweak and extend it to match your style. Gödel, on the other hand, is more like an off-the-rack suit',
  closingQuote: 'Because I want control over my tools and the freedom to innovate.',
  /** The one substantive reply, from a user who was running both. */
  replyQuote: 'TBH, I’m not sure how hard it would be to build these in openBB?',
};

/**
 * GitHub checks run against the public REST API on 2026-09-03. The negative
 * results are the point: they are what makes "no, it is not on GitHub" a
 * checkable claim rather than an assumption.
 */
const GITHUB = {
  missingAccounts: ['godelterminal', 'GodelTerminal', 'godel-terminal'],
  org: 'DL-Software',
  orgProfileLink: 'https://dl.software',
  orgCreated: 'February 2023',
  orgRepoCount: 5,
  orgRepos: 'a .github profile repo, a jobs repo, and forks of three unrelated open-source projects (vector-quantize-pytorch, dagster-community-integrations, redis-kafka-connect)',
  thirdParty: [
    ['Hayden1629/godel_rest', 'REST API reverse engineering for godel terminal'],
    ['Hayden1629/godel_api', 'Selenium API for Godel Terminal'],
    ['Hayden1629/godel_transcripts', 'chrome extension to download transcripts from godel terminal'],
    ['Ayyitskevin/Tyche', 'Godel Terminal Clone'],
    ['gwarren3210/godel-mcp', 'MCP server for Godel Terminal — exposes its data (REST + STOMP + Socket.IO) as tools for AI clients. Reverse-engineered from the live product.'],
  ],
};

/** pypi.org/pypi/godel-terminal/json, read 2026-09-03. */
const PYPI = {
  name: 'godel-terminal',
  version: '0.0.1',
  summary: 'Python SDK for Godel Terminal',
  uploaded: '5 February 2026',
  declaredLicence: 'MIT',
  empties: 'no author, no maintainer, no home page, no project URLs and an empty long description',
};

const faqs = [
  {
    q: 'Is Godel Terminal open source, or on GitHub?',
    a: `No, on both counts. Queried ${esc(longDate(CHECKED))}, GitHub's API returns 404 for
    <span class="mono">${GITHUB.missingAccounts.join('</span>, <span class="mono">')}</span>, and the
    <span class="mono">${GITHUB.org}</span> organisation's ${GITHUB.orgRepoCount} public repositories are a profile repo, a
    jobs repo and three unrelated forks.`,
  },
  {
    q: 'What licence is OpenBB released under?',
    a: `AGPLv3, per the LICENSE file read ${esc(longDate(CHECKED))} — GitHub's API classifies the repo as "Other", so read
    the file, not the metadata. The ${esc(OPENBB.relicenceDate)} post promising a "permissive license" names none, and is
    the post announcing that OpenBB is winding the company down.`,
  },
  {
    q: 'Is OpenBB free?',
    a: `Partly. The Open Data Platform is AGPLv3 and installs with <span class="mono">pip install openbb</span>, but on the
    pricing page (${esc(longDate(CHECKED))}) the free Community Edition is <strong>cloud-hosted by OpenBB</strong> and the
    <strong>self-hosted</strong> tiers are the paid ones.`,
  },
  {
    q: `Can OpenBB replace ${PRODUCT.name}?`,
    a: `It depends where your data comes from. OpenBB's README calls it a toolset to "integrate proprietary, licensed, and
    public data sources"; ${esc(PRODUCT.name)} sells entitlements with the seat
    (<a href="/godel-terminal-data-coverage/">coverage page</a>). If the feeds are what you are buying, OpenBB cannot
    replace it.`,
  },
  {
    q: `Does ${PRODUCT.name} have an API like OpenBB's?`,
    a: `No public one. Its pricing-page FAQ puts it at ${esc(API_FACTS.vendorStatus)}
    (${esc(API_FACTS.vendorStatusSource)}); the documented route out is file export
    (<a href="/godel-terminal-api/">the API page</a>).`,
  },
];

export const page = {
  path: '/godel-terminal-vs-openbb/',
  title: 'Godel Terminal vs OpenBB: Open Source vs Paid Seat',
  description: "OpenBB's platform is AGPLv3 and installable; Godel Terminal ships no source, no repo and no public API. The licence, the pricing and the honest trade.",
  summary: 'Godel Terminal vs OpenBB: OpenBB is AGPLv3 with a free hosted tier and paid self-hosting; Godel Terminal is closed, hosted and $118/month with vendor data included.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-vs-openbb/', label: 'vs OpenBB' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    const planRows = OPENBB_PLANS.map((p) => ({
      cells: [`<strong>${esc(p.name)}</strong>`, esc(p.price), esc(p.hosting), p.who],
    }));
    const repoRows = GITHUB.thirdParty.map(([name, desc]) => ({
      cells: [`<span class="mono">${esc(name)}</span>`, esc(desc)],
    }));

    return `
<h1>Godel Terminal vs OpenBB: open source against a hosted seat</h1>

<p class="lede">This is a licensing question more than a feature comparison. OpenBB publishes its Open Data Platform in
a repository anyone can read, fork and install, under the GNU Affero General Public License v3.
${esc(PRODUCT.name)} publishes no source at all — no repository, no source licence, no self-hosted build, no public API.
Two corrections keep the rest honest: "open source" does not make OpenBB's self-hosted product free, and the
${esc(OPENBB.relicenceDate)} post usually cited for its licence plans is the one announcing that OpenBB is winding the
company down.</p>

${note(`<strong>Sourcing:</strong> OpenBB figures were read on ${esc(longDate(CHECKED))} from
<a href="${OPENBB.home}" rel="nofollow noopener" target="_blank">openbb.co</a>,
<a href="${OPENBB.pricing}" rel="nofollow noopener" target="_blank">its pricing page</a>, the
<a href="${OPENBB.repo}" rel="nofollow noopener" target="_blank">repository</a> and its
<a href="${OPENBB.licenseFile}" rel="nofollow noopener" target="_blank">LICENSE file</a>, plus the posts linked below;
GitHub and PyPI facts from those services' public APIs the same day. ${esc(PRODUCT.name)} prices are vendor-stated on
godelterminal.com; the 2024 price history from archived vendor documentation and app builds.`)}

<h2>The two products, side by side</h2>

${table({
  head: ['', PRODUCT.name, 'OpenBB'],
  rows: [
    { cells: ['What it is', 'Hosted, command-driven terminal', `A Workspace UI over the repo's "${esc(OPENBB.repoDescription)}"`] },
    { cells: ['Source code', 'None published', `Public repository since ${esc(OPENBB.repoCreated)}: ${OPENBB.stars} stars, ${OPENBB.forks} forks`] },
    { cells: ['Licence', 'Proprietary; terms of service only', 'AGPLv3 per the LICENSE file; permissive relicence announced, not delivered'] },
    { cells: ['Where it runs', 'Vendor-hosted browser app', 'Free tier vendor-hosted; self-hosting is paid'] },
    { cells: ['Data', 'Included with the seat', 'You bring it — teams "bring their data"'] },
    { cells: ['Programmatic access', 'No public API; CSV/JSON export', `Python package (<span class="mono">pip install openbb</span>), REST API, MCP servers, CLI`] },
    { cells: ['Price', `${PRICING.monthly.display}/month or ${PRICING.annual.display}/year per seat`, 'Free individual tier; $2,400/year list for Lite; Pro on quote'] },
  ],
})}

<h2>The licence, verified rather than assumed</h2>

<p class="prose">The LICENSE file in the OpenBB repository is the GNU Affero General Public License, Version 3,
copyright line <em>Copyright (c) 2021-2025 OpenBB Inc.</em> That is copyleft, not permissive: the network clause is what
matters if you modify it and serve it to others. GitHub's detector returns "Other" through its API and the About panel
offers only a generic "License" link; the AGPLv3 label sits in the README body, so read the file, not the metadata.</p>

<p class="prose">It has moved before, and moves again.
<a href="${OPENBB.agplPost}" rel="nofollow noopener" target="_blank">"License Change: OpenBB Platform Goes AGPL"</a>
dates the current licence to May 2024. On ${esc(OPENBB.relicenceDate)},
<a href="${OPENBB.relicencePost}" rel="nofollow noopener" target="_blank">"OpenBB belongs to everyone"</a> from founder
and CEO Didier Lopes said "${esc(OPENBB.relicenceQuote)}", but named no licence and set no date:
"${esc(OPENBB.relicenceTiming)}" Today's accurate statement is AGPL-licensed, permissive relicence promised.</p>

<p class="prose">That same post is also a wind-down notice. It says: "${esc(OPENBB.windDownQuote)}", recognises the
people who "carried OpenBB to the very end", and adds: "${esc(OPENBB.hostedTimelineQuote)}" No closing date is given, so
the prices below are what openbb.co published on ${esc(longDate(CHECKED))}, not a promise they stay purchasable. The
repository's AGPL grant is unaffected; the uncertainty sits on the hosted side.</p>

<h2>"Free" and "self-hosted" are different rows</h2>

${table({
  head: ['OpenBB edition', 'Price', 'Hosting', 'Stated for'],
  rows: planRows,
  caption: `openbb.co/pricing, read ${longDate(CHECKED)}.`,
})}

<p class="prose">That table runs backwards from the usual assumption. The edition that costs nothing is the one
<strong>OpenBB hosts</strong>: "${esc(OPENBB.communityLine)}" It caps Copilot at 20 queries a day and collects usage analytics; the editions you deploy
yourself are paid. What is unambiguously free is the Open Data Platform itself: clone it,
<span class="mono">pip install openbb</span>. So if your reason for preferring open source is <em>my data never leaves my
infrastructure</em>, that is the library plus a Lite or Pro licence, not the free Workspace tier; the cost moves into
engineering time and the feeds you licence.</p>

<h2>The r/openBB thread, and what changed since</h2>

<p class="prose">r/openBB carries one post arguing the comparison directly: "${esc(THREAD.title)}", posted by
${esc(THREAD.author)} on ${esc(THREAD.date)}, scoring ${THREAD.score} points. Its price argument —
"${esc(THREAD.priceQuote)}" — was correct when written and is now two increases out of date, at
${PRICING.monthly.display}/month today (<a href="/godel-terminal-pricing/">price history</a>), roughly doubling the gap
it describes. The rest argues customisation, community and flexibility, closing
"${esc(THREAD.closingQuote)}" One person's opinion in OpenBB's own subreddit, predating the workspace-and-MCP positioning
openbb.co leads with today.</p>

<p class="prose">The one substantive reply is more useful than the post. A user running ${esc(PRODUCT.name)} listed what
they opened it for — the news headline component, ratio analysis for long/short pairs, options chains next to charts —
then asked what this comparison turns on: "${esc(THREAD.replyQuote)}" No reply follows. That comment closes with a
referral link of its own, and the three others are all links into the product: a GODEL30 code, a referral link posted as
an "updated coupon code", and the author's own free-trial link (our <a href="/promo-codes/">code comparison</a> covers
what those codes are and are not).</p>

<h2>Is ${esc(PRODUCT.name)} on GitHub?</h2>

<p class="prose">Queried ${esc(longDate(CHECKED))}, GitHub's API returns 404 for
<span class="mono">${GITHUB.missingAccounts.join('</span>, <span class="mono">')}</span>. The
<span class="mono">${GITHUB.org}</span> organisation, created ${esc(GITHUB.orgCreated)}, links to
${esc(GITHUB.orgProfileLink)} — the vendor's domain — but its ${GITHUB.orgRepoCount} public repositories are
${esc(GITHUB.orgRepos)}. GitHub's repository search for "godel terminal" returned 12 the same day: none under that
organisation, all under personal accounts, none above three stars. Five of them:</p>

${table({
  head: ['Repository', 'Its own description'],
  rows: repoRows,
  caption: `Five of the 12 results for "godel terminal", ${longDate(CHECKED)}; all under personal accounts, none claiming vendor affiliation.`,
})}

${note(`Three describe reverse-engineering the terminal's endpoints or driving it with Selenium. The vendor's terms
prohibit scraping and automated retrieval, so this page records that they exist and stops there (reasoning on
<a href="/godel-terminal-api/">the API page</a>).`, { warn: true })}

<p class="prose">Same category: the PyPI package <span class="mono">${esc(PYPI.name)}</span>, version ${PYPI.version},
summarised "${esc(PYPI.summary)}", declaring the ${PYPI.declaredLicence} licence, uploaded ${esc(PYPI.uploaded)} with
${esc(PYPI.empties)}, and nothing published tying it to ${esc(PRODUCT.vendor)}</p>

<h2>Programmatic access is where they are furthest apart</h2>

<p class="prose">If you arrived from a scripting requirement, it is already decided. OpenBB ships a Python package, a
REST API, a CLI and MCP servers for agents — those surfaces are the product. ${esc(PRODUCT.name)} publishes no public
API; its pricing-page FAQ puts it at ${esc(API_FACTS.vendorStatus)} (${esc(API_FACTS.vendorStatusSource)}), and the
route out is file export from documented commands — detail on <a href="/godel-terminal-api/">the API page</a> and
<a href="/godel-terminal-excel/">the Excel page</a>.</p>

<h2>Who each one suits</h2>

<ol class="prose">
  <li><strong>OpenBB</strong> if you write code or employ someone who does, you already licence the data you need, or
  data cannot leave your environment — weighed against a vendor winding down.</li>
  <li><strong>${esc(PRODUCT.name)}</strong> if you want data and interface to arrive together — real-time US markets,
  options chains, wire news and filings, itemised on <a href="/godel-terminal-data-coverage/">the coverage page</a> —
  driven by commands rather than a pipeline you maintain
  (<a href="/godel-terminal-commands/">command reference</a>).</li>
  <li><strong>Neither, yet</strong> if the real question is hosted-but-cheaper rather than open-versus-closed:
  <a href="/godel-terminal-vs-koyfin/">Koyfin</a> is the closest rival on price,
  <a href="/godel-terminal-alternatives/">the alternatives page</a> the wider field.</li>
</ol>

<p class="prose">The two are not exclusive: the Open Data Platform costs nothing to install next to a terminal seat,
and the ${PRICING.freeTrial.days}-day trial nothing to run beside an OpenBB deployment. If the
terminal side wins, ${esc(PROMO.code)} takes ${PROMO.percent}% off the ${esc(PROMO.appliesTo)} — the code this site
promotes, and the only one here carrying a checkout verification date, ${esc(longDate(PROMO.lastVerified))}: a one-off
discount on the first bill, not a standing rate.</p>

${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-free-trial/', label: 'Trial terms first' } })}

${faqSection(faqs)}
`;
  },
};
