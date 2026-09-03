import { PROMO, PRODUCT, PRICING, STUDENT } from '../data/site.mjs';
import { TRIAL_HISTORY, CANCELLATION, OWNERSHIP, VENDOR_PAGES } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

const firstMonthWithCode = (PRICING.monthly.amount * (1 - PROMO.percent / 100)).toFixed(2);

const faqs = [
  {
    q: `Is there a free version of ${PRODUCT.name}?`,
    a: `No. ${esc(PRODUCT.name)}'s own pricing page (checked September 2026) lists three plans — Monthly, Annual, and Team &amp; Enterprise — and none of them is a free plan. What exists is a <strong>${PRICING.freeTrial.days}-day free trial</strong> on every plan. Capterra's listing — which Capterra labels "Provider data verified" — does show a "Free Tier $0.00" line, but no vendor page describes a $0 plan.`,
  },
  {
    q: `What happens after the ${PRICING.freeTrial.days}-day trial ends?`,
    a: `The vendor terms state: "${esc(CANCELLATION.trialTerms)}" So the account goes dormant rather than converting to a paid plan on its own. To keep using it you upgrade to Monthly (${PRICING.monthly.display}/month) or Annual (${PRICING.annual.display}/year).`,
  },
  {
    q: `Do I need a credit card to start the free trial?`,
    a: `Not published. The terms say the account "will not be charged" until you upgrade, but whether a card is collected at signup is not stated on the pricing page or in the terms. What the terms do rule out is a surprise charge at day ${PRICING.freeTrial.days + 1}.`,
  },
  {
    q: `Can students get ${PRODUCT.name} free?`,
    a: `No — the student path is cheap, not free. The official X account announced a <strong>${esc(STUDENT.display)}/${esc(STUDENT.unit)}</strong> student rate in November 2024 (.edu signup plus a student ID emailed to ${esc(STUDENT.contact)}). It has never been listed on the pricing page, archived app builds from mid-2026 no longer show the in-app button, and r/GodelTerminal posts in August 2026 quote $10/month rather than $5 — so <a href="/godel-terminal-student-discount/">email to confirm the current terms before planning around it</a>.`,
  },
  {
    q: `Is the free trial full-featured?`,
    a: `The vendor's wording is that the trial "opens up most of Godel: real-time Nasdaq quotes, news in milliseconds, SEC filings, financials, charting, and the full command set" (pricing page, September 2026). "Most" is the vendor's word, and the pricing page does not itemise what is held back. One documented paid-only feature is the BROK brokerage link: its command documentation says it requires a paid account and that "anonymous and free (piker) users" see an upgrade prompt. Whether a trial account counts as paid for that purpose is not published.`,
  },
  {
    q: `Is there a free alternative to ${PRODUCT.name}?`,
    a: `Not a like-for-like one. OpenBB is open-source (AGPLv3, per its GitHub repository) and describes itself as an "Open Data Platform for analysts, quants and AI agents", and free sources such as SEC EDGAR cover parts of the workflow. What no free option provides is the consolidation into one command-driven workspace — <a href="/godel-terminal-alternatives/">the alternatives page</a> goes through the trade-offs.`,
  },
];

export const page = {
  path: '/is-godel-terminal-free/',
  title: `Is Godel Terminal Free? No Free Plan, but a 14-Day Trial`,
  description: `No free plan: Godel Terminal has a ${PRICING.freeTrial.days}-day trial, then ${PRICING.monthly.display}/month or ${PRICING.annual.display}/year. The vendor's tiers, Capterra's $0 line, and the cheapest paid routes.`,
  summary: 'Whether Godel Terminal is free: no free plan on the vendor pricing page, a 14-day trial on every plan, and the cheapest paid routes once it ends.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/godel-terminal-pricing/', label: 'Pricing' },
    { href: '/is-godel-terminal-free/', label: 'Is it free?' },
  ],
  faqs,
  priority: '0.8',
  render() {
    return `
<h1>Is Godel Terminal free? No — there is a ${PRICING.freeTrial.days}-day trial, then it is paid</h1>

<p class="lede"><strong>${esc(PRODUCT.name)} is not free.</strong> Its own pricing page, checked September 2026,
lists three plans — Monthly at ${PRICING.monthly.display}/month, Annual at ${PRICING.annual.display}/year, and a
Team &amp; Enterprise tier quoted through sales — and no free plan. Every plan starts with a
<strong>${PRICING.freeTrial.days}-day free trial</strong>, and the vendor terms state the account is not charged
until you upgrade. After that the cheapest routes are the announced ${esc(STUDENT.display)}/month student rate if you
qualify and it is still live at that price, the $80/month brokerage-linked rate if you qualify for that, and
${esc(PROMO.code)} for ${PROMO.percent}% off the first paid month for everyone else.</p>

${codeBox({ note: `${PROMO.percent}% off your ${PROMO.appliesTo} — the trial itself has nothing to discount, so apply it when you convert.` })}

<h2>What the pricing page actually lists</h2>

<p class="prose">This is the whole plan list on
<a href="${VENDOR_PAGES.pricing}" rel="nofollow noopener" target="_blank">godelterminal.com/pricing</a> as of
September 2026, with the vendor's own descriptions:</p>

${table({
  head: ['Plan', 'Price', 'Vendor description'],
  rows: [
    {
      cells: ['<strong>Monthly</strong>', `${PRICING.monthly.display}/month`, '"For individual seats." Access to Godel Terminal, access to all paid chat channels, flexible billing.'],
    },
    {
      highlight: true,
      cells: ['<strong>Annual</strong>', `${PRICING.annual.display}/year`, `"Best value." Everything in Monthly on a single annual invoice — about $${PRICING.annual.effectiveMonthly}/month equivalent, which the page labels "Save 30%".`],
    },
    {
      cells: ['<strong>Team &amp; Enterprise</strong>', 'Quote via sales', '"Multi-seat with org billing." Optional private chat channel, compliance tools and audit logs, a dedicated account representative.'],
    },
    {
      cells: ['<strong>Free trial</strong>', `${PRICING.freeTrial.days} days, $0`, 'Every plan starts with one. "Opens up most of Godel" — vendor wording.'],
    },
    {
      cells: ['<strong>Free plan</strong>', 'None listed', 'No $0 tier appears anywhere on the page.'],
    },
  ],
})}

<p class="prose">Two things on that page are easy to misread as "free" or as a code. The "Save 30%" badge on the
Annual plan is the annual-versus-monthly saving (${PRICING.annual.display} against twelve months at
${PRICING.monthly.display}), not a promo code — it happens to be the same percentage as ${esc(PROMO.code)}, which
is a separate first-month referral discount. And the FINRA line adds ${PRICING.finraSurcharge.display}/month for
licensed users; everyone else pays the plan price.</p>

<p class="prose">The pricing page also answers the "why not just use free tools" question in its own FAQ: "Free
tools fall short. Godel covers the daily workflow from $996 a seat …" That is the vendor's position, not ours —
but it confirms there is no free tier the vendor is pointing you toward instead.</p>

<h2>The Capterra "Free Tier" line</h2>

<p class="prose">If you searched this question you may have seen a $0 figure. Capterra's listing for
${esc(PRODUCT.name)} — labelled "Provider data verified" by Capterra and marked "Last updated on August 26, 2026" — shows three lines: a
<strong>"Free Tier" at $0.00</strong>, an "Individual Subscription" at $118.00 flat rate per month, and an
"ORG" plan at <strong>$1,500 per user, per year</strong>. It also carries the flags "Free trial available" and
"Includes Free Version".</p>

${note(`<strong>How to read that:</strong> the vendor's own pricing page shows neither a $0 plan nor a $1,500
organization price — Team &amp; Enterprise is quote-only there, and the in-app ORG copy in our
<a href="/godel-terminal-pricing/">pricing breakdown</a> describes a 10% discount at two or more seats rather
than a fixed rate. Whether Capterra's "Free Tier" means the ${PRICING.freeTrial.days}-day trial or something
else is not published. Until it appears on a vendor page, treat the listing as a directory entry, not a price
list.`, { warn: true })}

<h2>What "free" actually gets you: the trial</h2>

<p class="prose">The <a href="/godel-terminal-free-trial/">trial page</a> covers how to use the
${PRICING.freeTrial.days} days well; here is only the boundary. Per the vendor terms, checked September 2026:
"We offer a ${PRICING.freeTrial.days}-day free trial to new users who register with the Services. The account
will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the
free trial."</p>

<ul class="prose">
  <li><strong>Length:</strong> ${PRICING.freeTrial.days} days. ${esc(TRIAL_HISTORY.was)} — guides quoting 30 days
  are describing the old product.</li>
  <li><strong>Once only:</strong> ${esc(TRIAL_HISTORY.oneTime)}</li>
  <li><strong>Scope:</strong> "most of Godel" — the vendor names real-time Nasdaq quotes, news, SEC filings,
  financials, charting and the full command set. What "most" excludes is not itemised; the BROK brokerage link
  is documented as requiring a paid account, and whether a trial account counts as paid for that purpose is not
  published.</li>
  <li><strong>At the end:</strong> suspended, not billed. There is no auto-conversion to a paid plan under those
  terms. Paid subscriptions, once started, do auto-renew until cancelled —
  <a href="/how-to-cancel-godel-terminal/">what is published about cancelling</a>.</li>
  <li><strong>Card up front:</strong> not published either way.</li>
</ul>

<h2>Free vs paid: the cheapest ways to keep it after day ${PRICING.freeTrial.days}</h2>

<p class="prose">Once the trial ends, the only continuation the vendor publishes is a paid plan — the terms say the
account is suspended until upgraded — so the question becomes which paid path is cheapest for you. In order of
monthly cost:</p>

${table({
  head: ['Route', 'What you pay', 'Who qualifies', 'Source'],
  rows: [
    {
      highlight: true,
      cells: [
        '<strong>Student rate</strong>',
        `${esc(STUDENT.display)}/month as announced`,
        `.edu email plus a student ID emailed to ${esc(STUDENT.contact)}. Status and current rate unconfirmed — r/GodelTerminal posts in August 2026 quote $10/month — <a href="/godel-terminal-student-discount/">details</a>`,
        'Official X account, November 2024; not on the pricing page',
      ],
    },
    {
      cells: [
        '<strong>Brokerage-linked rate</strong>',
        '$80/month',
        `Connected brokerage holding $5,000+ with at least one eligible trade in the trailing month; $80 is the new-account rate (locked-in accounts get $10 off instead), organizations and prepaid excluded — <a href="/godel-terminal-brokerage-link/">details</a>`,
        'Vendor in-app changelog and June 2026 app build (archived)',
      ],
    },
    {
      cells: [
        '<strong>Annual plan</strong>',
        `${PRICING.annual.display}/year (~$${PRICING.annual.effectiveMonthly}/month)`,
        `Anyone — <a href="/godel-terminal-monthly-vs-annual/">the arithmetic</a>`,
        'Vendor pricing page, September 2026',
      ],
    },
    {
      cells: [
        `<strong>Monthly with ${esc(PROMO.code)}</strong>`,
        `~$${firstMonthWithCode} first month, then ${PRICING.monthly.display}/month`,
        'Anyone without a .edu email or an eligible brokerage account',
        `Referral tier, ${PROMO.percent}% off the first month; last verified at checkout ${esc(longDate(PROMO.lastVerified))}`,
      ],
    },
    {
      cells: [
        '<strong>Monthly, no code</strong>',
        `${PRICING.monthly.display}/month`,
        'Anyone',
        'Vendor pricing page, September 2026',
      ],
    },
  ],
})}

<p class="prose">The ordering matters more than the code. If you have a .edu address, the student rate — if it
is still live at the announced price — saves $${PRICING.monthly.amount - STUDENT.amount} a month against list, and
even at the $10/month that community posts quote it would still beat every code; ${esc(PROMO.code)} saves
about $${(PRICING.monthly.amount * PROMO.percent / 100).toFixed(2)} once. If you trade through a linked brokerage,
$80/month beats any code from month two onward. If you are neither, the honest comparison is between
${esc(PROMO.code)} on monthly and simply paying annual — the
<a href="/cheapest-way-to-get-godel-terminal/">cheapest-route page</a> ranks every option together.</p>

<h2>Why people expect a free tier</h2>

<p class="prose">Partly because most fintech tools have one, and partly because of the product's own history.
${esc(OWNERSHIP.shkreli.vision.fact)} That is the origin of a lot of "free Godel Terminal" searches, and it is
covered in more depth on <a href="/who-owns-godel-terminal/">who owns Godel Terminal</a>. The pricing that shipped
is flat per-seat, and the trial is the only $0 access the pricing page describes. The vendor's BROK command
documentation does refer to "anonymous and free (piker) users" who see an upgrade prompt instead of the brokerage
list, but what that free state includes, and how it relates to the trial, is not published.</p>

<h2>Free alternatives, briefly</h2>

<p class="prose">If the answer to "is it free" being no rules it out, the realistic free options are components,
not a replacement. OpenBB is open-source under AGPLv3 and describes itself as an "Open Data Platform for
analysts, quants and AI agents" (its GitHub repository, September 2026) — a toolkit rather than a hosted
terminal, and its hosted or paid products are outside what we have checked. SEC EDGAR is the same primary source
${esc(PRODUCT.name)}'s <code class="mono">CF</code> command pulls from. None of the terminals we compare on the
<a href="/godel-terminal-alternatives/">alternatives page</a> is free at the tier we compare; that page lists the
free pieces and what you give up by assembling them yourself.</p>

<h2>If you decide to pay</h2>

<p class="prose">Trial first — it costs nothing under the vendor's terms and answers most of the questions on
this site directly. Then convert with the cheapest route you qualify for. ${esc(PROMO.code)} is the only code
this site has promoted, and the only one with a checkout verification date; every other referral code in
circulation targets the same ${PROMO.percent}%-off-first-month offer, as the
<a href="/promo-codes/">code comparison</a> shows.</p>

${ctaRow({ primary: `Start the ${PRICING.freeTrial.days}-day trial on Godel Terminal`, secondary: { href: '/godel-terminal-pricing/', label: 'Full pricing breakdown' } })}

${faqSection(faqs)}
`;
  },
};
