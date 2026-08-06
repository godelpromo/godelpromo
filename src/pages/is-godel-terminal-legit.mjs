import { PRODUCT, COMPANY, CASE_STUDY, PRICING } from '../data/site.mjs';
import { OWNERSHIP, SENTIMENT, PRESS, VENDOR_PAGES } from '../data/research.mjs';
import { faqSection, table, note, esc } from '../lib/components.mjs';

const bloombergProfile = PRESS.find((p) => p.outlet === 'Bloomberg');
const { preSeed, seed } = OWNERSHIP.funding;

const faqs = [
  {
    q: `Is ${PRODUCT.name} a scam?`,
    a: `No evidence supports that. It is operated by ${COMPANY.legalName}, a ${COMPANY.incorporation} with ${OWNERSHIP.funding.total} in funding verifiable through a wire press release and the company's own news page, and it publishes a customer case study from a named portfolio manager. The vendor-stated ${PRICING.freeTrial.days}-day free trial also means you can verify the product yourself before paying anything.`,
  },
  {
    q: 'Is my payment information safe if I subscribe?',
    a: `Checkout happens on the vendor's own site — we are an independent guide and never see or handle your payment details. One honest caveat: ${PRODUCT.name} publishes no security or compliance posture (no SOC 2 report or similar) that we can find, so questions about how payment and account data are protected go to the vendor directly.`,
  },
  {
    q: `Why do ${PRODUCT.name} reviews keep mentioning Martin Shkreli?`,
    a: `Because he is a co-founder of ${COMPANY.legalName}, the company behind the product — confirmed in its own funding announcements. His public record, with citations and stated scopes, is covered in one paragraph above; the full ownership picture is on <a href="/who-owns-godel-terminal/">who owns Godel Terminal</a>.`,
  },
  {
    q: `How can I verify ${PRODUCT.name} for myself?`,
    a: `The vendor's pricing page states every plan starts with a ${PRICING.freeTrial.days}-day free trial, and its terms state the account is not charged until upgraded. That turns most of the questions on this page into things you can check directly — our <a href="/godel-terminal-free-trial/">free-trial guide</a> has a structured plan for doing it.`,
  },
];

export const page = {
  path: '/is-godel-terminal-legit/',
  title: 'Is Godel Terminal Legit? The Evidence, For and Against',
  description: `Real company, real funding, real customers — and a co-founder with a famous conviction. The evidence on Godel Terminal's legitimacy, sourced both ways.`,
  summary: `Sourced evidence for and against Godel Terminal's legitimacy: a real corporation, verified funding and named customers on one side; thin reviews, beta bugs and the co-founder's record on the other.`,
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/is-godel-terminal-legit/', label: 'Is it legit' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    const evidenceRows = [
      { cells: ['Legal entity', `${esc(COMPANY.legalName)}, a ${esc(COMPANY.incorporation)} with a registered Delaware address`, 'Vendor terms'] },
      { cells: [
        'Funding',
        `${esc(preSeed.amount)} pre-seed (2024) plus ${esc(seed.amount)} seed (2026), with named leads and participants`,
        'Wire release / vendor news',
      ] },
      { cells: ['Hiring', 'Full-time onsite engineers in New York at market salaries plus equity', 'Vendor careers page'] },
      { cells: ['Customers', `Named case study: ${esc(CASE_STUDY.person)}, ${esc(CASE_STUDY.role)}`, 'Vendor marketing'] },
      { cells: ['Press', `A ${bloombergProfile.outlet} profile of the co-founder touching Godel, July 2026`, 'Major press'] },
      { cells: ['Review footprint', `Trustpilot ${esc(SENTIMENT.trustpilot.score)} from ${SENTIMENT.trustpilot.count} reviews; two Hacker News submissions, zero comments`, 'Community'] },
      { cells: ['Maturity', `${esc(PRODUCT.status)}, by the vendor's own description`, 'Vendor'] },
    ];

    return `
<h1>Is Godel Terminal legit? The evidence, for and against</h1>

<p class="lede">Yes, in the ordinary meaning of the word: ${esc(PRODUCT.name)} is built by a real Delaware
corporation with ${esc(OWNERSHIP.funding.total)} in verifiable funding from named investors, real employees hired
at market salaries, and real customers — one of them named in a published case study. The honest caveats are a
thin review footprint, community-reported bugs, and a co-founder whose public record deserves a straight, sourced
paragraph rather than a whisper. Both sides are below.</p>

${note(`Every claim on this page carries its source tier: vendor-published, press, or community. Where the
evidence is marketing, we say so. Where it is thin, we give you the count.`)}

<h2>The evidence for</h2>

<p class="prose"><strong>It is a real corporation.</strong> ${esc(OWNERSHIP.operator)} That is stated in the
vendor's own terms. A registered legal entity is a low bar — but it is the bar scam products usually fail.</p>

<p class="prose"><strong>The funding is verifiable, not claimed.</strong> A ${esc(preSeed.amount)} pre-seed was
${esc(preSeed.date)}, led by dao5, Naval Ravikant and Evolve Ventures, with participants including Balaji
Srinivasan (<a href="${preSeed.url}" rel="nofollow noopener" target="_blank">wire press release</a>). A
${esc(seed.amount)} seed was ${esc(seed.date)}, led by Infinitum with Flex Capital, dao5 and individual Godel
users participating (<a href="${seed.url}" rel="nofollow noopener" target="_blank">company news page</a>).
Investors with reputations attached put ${esc(OWNERSHIP.funding.total)} into this company under their own names.</p>

<p class="prose"><strong>It hires like a real company.</strong> ${esc(OWNERSHIP.careers.fact)} (Sources: the
company's Hacker News hiring posts and its <a href="${VENDOR_PAGES.careers}" rel="nofollow noopener"
target="_blank">careers page</a>.) Fictitious products do not run onsite engineering teams in New York at those
salaries.</p>

<p class="prose"><strong>It has at least one named, on-the-record customer.</strong> The vendor publishes a case
study quoting ${esc(CASE_STUDY.person)}, ${esc(CASE_STUDY.role)} (managed by ${esc(CASE_STUDY.manager)}), claiming
about ${esc(CASE_STUDY.savings)} in savings. That is vendor marketing and we weight it as such — but it is
attributable marketing from a named person at a named fund, which most products in this niche cannot show. And the
product has drawn real press: ${bloombergProfile.outlet} ran a profile of the co-founder in July 2026 that covers
Godel (<a href="${bloombergProfile.url}" rel="nofollow noopener" target="_blank">${esc(bloombergProfile.title)}</a>,
paywalled).</p>

${table({ head: ['Signal', 'What the evidence shows', 'Source tier'], rows: evidenceRows, caption: 'The legitimacy checklist, with the tier of evidence behind each row.' })}

<h2>The evidence against — and the caveats</h2>

<p class="prose"><strong>The review footprint is thin, and the count matters.</strong>
<a href="${SENTIMENT.trustpilot.url}" rel="nofollow noopener" target="_blank">Trustpilot</a> shows
${esc(SENTIMENT.trustpilot.score)} — from exactly ${SENTIMENT.trustpilot.count} reviews, on an unclaimed profile.
Hacker News has two submissions with zero comments between them. An average built on ${SENTIMENT.trustpilot.count} reviews tells
you almost nothing in either direction; what it does tell you is that there is not much organic discussion yet, and that most
of what ranks in search about this product is affiliate content, including this site.</p>

<p class="prose"><strong>Users report real bugs.</strong> A SourceForge review reports bond-yield values displaying
incorrectly for over a month, plus account-moderation complaints; users on the official subreddit have reported
login errors and heavy-handed chat moderation. All of that is community-reported, not verified by us — but it is
consistent with the vendor's own description of the product as ${esc(PRODUCT.status)}.</p>

<p class="prose"><strong>The co-founder's record is public, and we will state it plainly.</strong>
Martin Shkreli is a co-founder of ${esc(COMPANY.legalName)}, named in the company's own funding announcements.
He was convicted of securities fraud in federal court in 2017, sentenced to seven years in 2018, and released
in 2022. In February 2022 the SEC's related civil action produced a permanent officer-and-director bar against him
(<a href="${OWNERSHIP.shkreli.secBar.url}" rel="nofollow noopener" target="_blank">SEC litigation release</a>);
by its terms, the bar concerns serving as an officer or director of a public company, and ${esc(COMPANY.legalName)}
is private. In January 2024 the Second Circuit upheld the FTC's lifetime ban on his participating in the
pharmaceutical industry (<a href="${OWNERSHIP.shkreli.ftcBan.urls[1]}" rel="nofollow noopener"
target="_blank">FTC statement</a>); the ban's stated scope is the pharmaceutical industry, and ${esc(COMPANY.legalName)}
is a private fintech company. Those are the documented facts and their stated scopes. We are not lawyers and draw
no conclusion about what they do or do not permit — we cite them because a legitimacy page that omitted them would
not be worth your trust. The fuller ownership picture is on
<a href="/who-owns-godel-terminal/">who owns Godel Terminal →</a></p>

<h2>Verdict: legit is not the same claim as mature</h2>

<p class="prose">${esc(PRODUCT.name)} is a legit company and a legit product: a real entity, real investors, real
employees, real users, and a working product you can open in a browser today. What it is not, yet, is a mature
product — the vendor itself calls it ${esc(PRODUCT.status)}, the review base is three Trustpilot entries deep, and
the community bug reports above are recent. Treat it the way you would treat any young software vendor: assume the
company is real, assume the product has rough edges, and verify the parts that matter to you during the trial
rather than taking anyone's word — including ours.</p>

<p class="prose">If your question is really "should I pay for it," that is a different page:
<a href="/is-godel-terminal-worth-it/">is Godel Terminal worth it →</a> gives the short answer, the
<a href="/godel-terminal-review/">evidence-based review</a> gives the long one, and
<a href="/godel-terminal-pricing/">the pricing breakdown</a> has every number with its source.</p>

${faqSection(faqs)}
`;
  },
};
