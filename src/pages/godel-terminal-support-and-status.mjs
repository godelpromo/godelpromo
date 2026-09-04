import { PRODUCT, PROMO, STUDENT } from '../data/site.mjs';
import { CANCELLATION, VENDOR_PAGES, PLATFORMS, UNVERIFIED_CLAIMS } from '../data/research.mjs';
import { COMMANDS } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

const cmd = (m) => COMMANDS.find((c) => c.mnemonic === m);
const HELP = cmd('HELP');
const CHAT = cmd('CHAT');
const CHANGE = cmd('CHANGE');
const ACM = cmd('ACM');

/** Pulled by content, not index, so a reordered data array cannot silently
 *  swap which unverified claim this page quotes. */
const NO_STATUS_PAGE = UNVERIFIED_CLAIMS.find((c) => c.includes('status page'));
const NO_COMPLIANCE = UNVERIFIED_CLAIMS.find((c) => c.includes('SOC 2'));

/** The date the status-host and vendor-page checks on this page were run. */
const CHECKED = '3 September 2026';

/** Hosts a status page would live on if one existed, and what each returned
 *  when queried on 2026-09-03. Kept as data so a re-check is a one-line edit. */
const STATUS_HOSTS = [
  {
    host: 'status.godelterminal.com',
    result: 'No DNS record. The name does not resolve, so nothing is served there.',
  },
  {
    host: 'godelterminal.statuspage.io',
    result: 'Returns HTTP 302 to https://www.statuspage.io — the status vendor’s own marketing site, not a Godel status page.',
  },
  {
    host: 'godelterminal.instatus.com',
    result: 'Returns HTTP 307 to https://instatus.com — again the vendor’s own site, not a Godel status page.',
  },
  {
    host: 'status.dl.software',
    result: 'Resolves only because dl.software answers every subdomain with the same Namecheap parking address, and over HTTP it returns that registrar’s WHOIS-verification placeholder. HTTPS does not complete. No status page.',
  },
];

/** The five items the vendor troubleshooting page asks for, in its own words. */
const SUPPORT_CHECKLIST = [
  'your browser',
  'browser version',
  'list of active extensions',
  'system specifications',
  'screenshots of any error messages you encounter',
];

const faqs = [
  {
    q: 'Is Godel Terminal down?',
    a: `No vendor-published surface answers that: none of the four hosts we checked on ${CHECKED} served a status page, and no incident history is published. The workable sequence is the vendor’s own Error Code 5 checklist first (memory, extensions, cache, connection), then <code class="mono">CHANGE</code> for a release dated today, then the official subreddit, where company-named accounts post the release notes.`,
  },
  {
    q: 'Does Godel Terminal have a status page or an uptime guarantee?',
    a: `Neither. Section 15 of the terms says "We cannot guarantee the Services will be available at all times", and section 19 supplies them "ON AN AS-IS AND AS-AVAILABLE BASIS". There is no service level to report against.`,
  },
  {
    q: 'How do I contact Godel Terminal support?',
    a: `By email at <a href="mailto:${PRODUCT.supportEmail}">${PRODUCT.supportEmail}</a>, or through the form on the vendor’s contact page (name, email, subject, message). That page’s own line: "For any support requests, please email us at ${PRODUCT.supportEmail} or use the form below." No phone number, support hours or ticket portal is published there or anywhere else we can cite. The only response-time commitment anywhere on the site — "We’ll respond within 24 hours." — sits on the sales-demo panel, not on any support route.`,
  },
  {
    q: 'What is Godel Terminal Error Code 5 ("Aw Snap!")?',
    a: `The one error the troubleshooting page documents by name, and it points at your device rather than the service: "This error typically occurs when your device encounters resource management issues, particularly with memory allocation." Listed causes are insufficient memory, browser resource limits, unstable network, conflicting extensions, too many tabs or background apps, and a corrupted cache.`,
  },
  {
    q: 'Is there a live chat with Godel Terminal support?',
    a: `The documented <code class="mono">CHAT</code> command is user-to-user — public rooms, $TICKER rooms, group chats and DMs — and nothing on its doc page describes it as a support channel or promises a staff reply. Company-named accounts — u/SpeculatingFarmer, u/GodelOps and u/Godel-Staff — do answer questions in threads on the official subreddit, and the first of those also posts the release notes; whether any of that is staffed support is not published. It is community-sourced either way, and read thread by thread on <a href="/godel-terminal-reddit/">our Reddit page</a>.`,
  },
  {
    q: 'Where is the Godel Terminal changelog?',
    a: `Inside the app, under the <code class="mono">CHANGE</code> command: a versioned timeline where each entry carries a version, a release date and a bulleted list of what shipped, with clickable pills that launch the commands an entry names. No public web changelog appears in the vendor’s sitemap, so if the app will not load, the changelog is behind the same door.`,
  },
  {
    q: 'Do trial users get support?',
    a: `Not published either way — neither the contact page nor the troubleshooting page sets an account condition. What is documented is that <code class="mono">${CHAT.mnemonic}</code> gates parts of itself: DMs, group chats and search need a paid account, and posting in public rooms needs a verified email.`,
  },
];

export const page = {
  path: '/godel-terminal-support-and-status/',
  title: 'Godel Terminal Support and Status: No Status Page',
  description: 'How to reach Godel Terminal support, what the troubleshooting docs cover, and why no status page or uptime commitment exists — checked host by host.',
  summary: 'Godel Terminal support routes, what the vendor troubleshooting page documents, and the checked-and-sourced finding that no status page or uptime commitment is published.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-support-and-status/', label: 'Support and status' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    return `
<h1>Godel Terminal Support and Status: how to get help, and what is not published</h1>

<p class="lede">Support for ${esc(PRODUCT.name)} runs through one email address and one web form.
Status runs nowhere: no status page, no uptime commitment and no incident history is published, and
the vendor’s own terms decline to guarantee availability in as many words. What follows is routes —
who to write to, what to put in the message, and how to tell a blank screen in your browser from a
problem on the platform.</p>

${note(`<strong>Sourcing:</strong> the support routes and error guidance come from the vendor’s
<a href="${VENDOR_PAGES.troubleshooting}" rel="nofollow noopener" target="_blank">troubleshooting page</a>
and its contact page; the availability language from its
<a href="${VENDOR_PAGES.terms}" rel="nofollow noopener" target="_blank">terms</a>; the in-app surfaces from
the <a href="${HELP.docUrl}" rel="nofollow noopener" target="_blank">HELP</a>,
<a href="${CHAT.docUrl}" rel="nofollow noopener" target="_blank">CHAT</a> and
<a href="${CHANGE.docUrl}" rel="nofollow noopener" target="_blank">CHANGE</a> command docs. All read on
${CHECKED}. The status-host results below are DNS and HTTP checks run the same day, reported as found.`)}

<h2>How to reach ${esc(PRODUCT.name)} support</h2>

${table({
  head: ['Route', 'Address', 'What it is for, per the source'],
  rows: [
    {
      highlight: true,
      cells: [
        'Email',
        `<a href="mailto:${PRODUCT.supportEmail}">${PRODUCT.supportEmail}</a>`,
        'The contact page’s instruction: "For any support requests, please email us at ' + PRODUCT.supportEmail + ' or use the form below." The troubleshooting page sends unresolved problems to the same address.',
      ],
    },
    {
      cells: [
        'Web form',
        'godelterminal.com/contact',
        'Name, email, subject, message. Presented as the alternative to email; where it lands, and whether it opens a ticket, is not published.',
      ],
    },
    {
      cells: [
        'Billing and subscription',
        `<code class="mono">${ACM.mnemonic}</code> in-app`,
        'Per the troubleshooting page: open Account Management with ' + ACM.mnemonic + ' or the profile icon, then "Manage Billing", which hands off to Stripe.',
      ],
    },
    {
      cells: [
        'Student rate questions',
        `<a href="mailto:${STUDENT.contact}">${STUDENT.contact}</a>`,
        `A separate address, from the ${STUDENT.source.replace('Official', 'official')}. The programme’s status is uncertain — <a href="/godel-terminal-student-discount/">what is published</a>.`,
      ],
    },
    {
      cells: [
        'Legal and company',
        `<a href="mailto:${CANCELLATION.legalEmail}">${CANCELLATION.legalEmail}</a>`,
        'The address named in the vendor terms, which route questions and complaints there: "If you have any questions or are unsatisfied with our Services, please email us at contact@dl.software." Not the address the support and troubleshooting pages give.',
      ],
    },
  ],
  caption: `Routes as published on godelterminal.com/contact, /docs/troubleshooting and /terms, read ${CHECKED}.`,
})}

<p class="prose">What is missing matters as much. No phone number, no support hours, no ticket portal
and no paid support tier appear anywhere in the vendor’s own sitemap — 28 URLs outside the command
docs, none of them a support-policy page. Two near-misses are worth naming rather than glossing: the
terms give a postal address, "8 The Green, Dover, Ste 19028, DE 19901, USA", and offer contact "by
mail" there; and the sales-demo panel carried on the docs pages says "We’ll respond within 24 hours."
Neither is a support commitment — one is a registered-office address, the other the sales queue — but
both are published, and nothing equivalent exists for support.</p>

<h2>What the troubleshooting page actually covers</h2>

<p class="prose">The docs hub carries exactly one troubleshooting page, and it runs to three
sections — <strong>Cancelling Subscription</strong>, <strong>Error Code 5 ("Aw Snap!")</strong> and
<strong>Still stuck?</strong>. That is the whole of the published self-service material.</p>

<ul class="prose">
  <li><strong>Cancelling Subscription</strong> repeats the ${ACM.mnemonic} → "Manage Billing" → Stripe
  route in the table above. The contractual side — when cancellation takes effect, and the absent
  refund policy — is on <a href="/how-to-cancel-godel-terminal/">how to cancel</a>.</li>
  <li><strong>Error Code 5</strong> is the only error the troubleshooting page names, and it points at
  your device: "This error typically occurs when your device encounters resource management issues,
  particularly with memory allocation." Causes listed: insufficient system memory, browser resource
  limitations, unstable network connectivity, conflicting browser extensions, too many tabs or
  background applications, and a corrupted browser cache. Five resolution steps follow, matching every
  cause except browser resource limitations, which is listed without a fix.</li>
  <li><strong>Still stuck?</strong> is the escalation, and it asks for a specific payload.</li>
</ul>

<p class="prose">Assemble that payload before writing. The page says "please include" five things, in
these words:</p>

<ul class="prose">
  ${SUPPORT_CHECKLIST.map((item) => `<li>${esc(item)}</li>`).join('\n  ')}
</ul>

<p class="prose">Words that do not appear in that page’s own copy: <em>status</em>, <em>outage</em>,
<em>uptime</em>, <em>chat</em>, <em>response time</em>. The only hours anywhere near it are in the
site-wide sales panel appended to every docs page — "We’ll respond within 24 hours." — which is a
sales promise, not a support one. Every documented failure mode is a local one.</p>

<h2>Is there a ${esc(PRODUCT.name)} status page? No, on every host we checked</h2>

<p class="prose">"${esc(NO_STATUS_PAGE)}" is a standing entry in this site’s unverified-claims list.
Here is the check behind it, run on ${CHECKED}.</p>

${table({
  head: ['Host checked', 'Result'],
  rows: STATUS_HOSTS.map((h) => ({ cells: [`<span class="mono">${esc(h.host)}</span>`, esc(h.result)] })),
  caption: `DNS and HTTP checks run ${CHECKED}, reported as found.`,
})}

<p class="prose">The sitemap agrees: of the 28 non-command URLs it lists — home, pricing, terms,
privacy, cookies, contact, the docs hub and its single troubleshooting doc, careers and four job
posts, two press releases, the newsroom, the newsletter, the referral page and ten product and
segment pages — none is a status or incident page. The answer is not "we could not find it": none of
the four hosts above serves a status page, and the vendor’s own index of its site has no such URL in
it.</p>

<h3>The terms explain why</h3>

<p class="prose">A status page reports against a commitment, and ${esc(PRODUCT.vendor)} makes none.
Section 15 of the terms, headed Modifications and Interruptions, states: "We cannot guarantee the
Services will be available at all times", reserves the right to "change, revise, update, suspend,
discontinue, or otherwise modify the Services at any time or for any reason without notice to you",
and disclaims "any loss, damage, or inconvenience caused by your inability to access or use the
Services during any downtime". Section 19 supplies the Services "ON AN AS-IS AND AS-AVAILABLE BASIS";
section 20 caps liability at what you paid in the six months before a claim.</p>

${note(`Read practically: an unannounced interruption is contractually permitted, and no published
channel is obliged to tell you about it. If ${esc(PRODUCT.name)} is load-bearing, keep a second quote
source — <a href="/godel-terminal-alternatives/">the alternatives are compared here</a>.`, { warn: true })}

<h2>The changelog is the closest thing to a status surface</h2>

<p class="prose">What the product does publish is a release record. The
<code class="mono">${CHANGE.mnemonic}</code> command opens a versioned timeline in which every entry
carries a version, a release date and a bulleted list of what was added, changed or fixed. Entries are
clickable in three ways, per the doc: URLs open in a new tab, an orange command pill launches whatever
command it names — "{FOCUS} opens a Focus window, {ERR} opens the bug report dialog" — and an
expression pill such as [AAPL US EQ G] runs a chat-style search. The doc adds that
${CHANGE.mnemonic} is limited to a single open window and "available on every Godel plan".</p>

<p class="prose">Its limitation as a status tool is structural: it lives inside the terminal, so the
record of what shipped this morning sits on the other side of the thing that will not load, and no
public web changelog appears in the sitemap. The nearest off-app substitute is the official
subreddit, where company accounts post feature announcements — read thread by thread on
<a href="/godel-terminal-reddit/">our Reddit page</a>.</p>

<h2>Telling a local problem from a platform problem</h2>

<p class="prose">With no status page, triage is on you. This order costs the least time and rules out
the most:</p>

<ol class="prose">
  <li><strong>Work the Error Code 5 list first</strong>, even without that error: a second browser
  with extensions disabled tests memory pressure, extensions and cache at once.</li>
  <li><strong>Check whether the quote is stale or merely delayed.</strong> The vendor documents
  15- and 25-minute delay tiers across parts of its international coverage, so a number that looks
  frozen may be the published tier rather than a fault —
  <a href="/godel-terminal-data-coverage/">the tiers are on the coverage page</a>.</li>
  <li><strong>Open <code class="mono">${CHANGE.mnemonic}</code></strong> if the app loads at all: an
  entry dated today puts a deploy beside your symptom, which is the only correlation available
  without an incident feed.</li>
  <li><strong>Look at the public rooms in <code class="mono">${CHAT.mnemonic}</code>.</strong> It is
  user-to-user, not support, but other people typing about the same breakage is the fastest signal
  that a problem is not yours alone.</li>
  <li><strong>Go off-app</strong> if nothing loads: the subreddit and the official X account are the
  surfaces where product news has surfaced fastest. The vendor also publishes a newsroom and a
  newsletter, both in its sitemap, but the newsroom’s two posts are funding announcements — the seed
  round dated 22 January 2026 and the pre-seed dated 22 July 2024 — rather than service notices.</li>
  <li><strong>Then write the email</strong>, with the five details the page asks for attached.</li>
</ol>

<h2>Three things support cannot resolve</h2>

<p class="prose">No support remit is published, but three categories have a documented owner that is
not the support address, and knowing which you have saves a round trip:</p>

<ul class="prose">
  <li><strong>Anything about a trade.</strong> The vendor’s position, on ${esc(PLATFORMS.notABroker.source)}:
  "${esc(PLATFORMS.notABroker.quote)}"
  There is no execution to go wrong; a broken brokerage connection may be a SnapTrade-side issue
  rather than a ${esc(PRODUCT.name)} one — see
  <a href="/godel-terminal-brokerage-link/">the brokerage link page</a>.</li>
  <li><strong>Payments.</strong> Invoices and card changes live in Stripe, behind
  <code class="mono">${ACM.mnemonic}</code>. ${esc(CANCELLATION.refundsNote)}</li>
  <li><strong>Chat moderation.</strong> ${CHAT.mnemonic}’s doc page documents permission tiers
  (public read, public write, user write, admin write) and states that a banned user sees "You’ve been
  banned from chat" in place of the composer, with an unban timestamp if the ban is temporary.
  Community reports of heavy-handed moderation are unverified by us and weighed on
  <a href="/is-godel-terminal-legit/">the legitimacy page</a>.</li>
</ul>

<h2>What is not published</h2>

<ul class="prose">
  <li>Any incident history — no postmortems, no maintenance calendar, no downtime log.</li>
  <li>Support hours, or any response-time target for support — the published 24-hour figure covers the
  sales-demo form only.</li>
  <li>Where the in-app bug-report dialog goes. The ${CHANGE.mnemonic} doc names it in passing — "{ERR}
  opens the bug report dialog" — but no page describes it, and ERR has no doc page of its own.</li>
  <li>Whether the contact form and the support address reach the same queue.</li>
  <li>Any security or compliance posture: "${esc(NO_COMPLIANCE)}"</li>
  <li>A refund policy, including for a term interrupted by an outage.</li>
</ul>

<p class="prose">Each is a gap this page will fill the day a vendor source fills it. Until then the
accurate summary is short: ${esc(PRODUCT.name)} supports users by email, documents one error, and
states everything about availability as a disclaimer.</p>

<p class="prose">None of which is a reason to pay list price for the month in which you find that out.
${esc(PROMO.code)} takes ${PROMO.percent}% off the ${esc(PROMO.appliesTo)} — the same
${PROMO.percent}%-off-first-month offer every referral code in circulation carries, and the one this
site has promoted, carrying a checkout verification date of ${esc(longDate(PROMO.lastVerified))}.</p>

${codeBox({ note: `${PROMO.percent}% off your first month. No paid support tier is published to buy alongside it.` })}

<h2>Related reading</h2>

<ul class="prose">
  <li>Every command with its provenance tier, including ${HELP.mnemonic}, ${CHAT.mnemonic},
  ${CHANGE.mnemonic} and ${ACM.mnemonic}: <a href="/godel-terminal-commands/">the command reference →</a></li>
  <li>The billing end of a support problem: <a href="/how-to-cancel-godel-terminal/">how to cancel, and what the terms say →</a></li>
  <li>How the company and the product check out overall: <a href="/is-godel-terminal-legit/">is Godel Terminal legit →</a></li>
  <li>Whether a quote is late or broken: <a href="/godel-terminal-data-coverage/">the delay tiers →</a></li>
</ul>

${ctaRow({ primary: 'Start the free trial on Godel Terminal', secondary: { href: '/how-to-redeem/', label: 'How to redeem the code' } })}

${faqSection(faqs)}
`;
  },
};
