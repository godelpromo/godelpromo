import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { CANCELLATION, VENDOR_PAGES } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

const twelveMonthly = PRICING.monthly.amount * 12;
const annualSaving = twelveMonthly - PRICING.annual.amount;
const codeValue = (PRICING.monthly.amount * PROMO.percent / 100).toFixed(2);
const discountedFirstMonth = (PRICING.monthly.amount * (1 - PROMO.percent / 100)).toFixed(2);
const firstPrice = PRICING.history[0];
const latestPrice = PRICING.history[PRICING.history.length - 1];
const fmt = (n) => n.toLocaleString('en-US');

/**
 * Quoted verbatim from godelterminal.com/terms (page states "Last updated
 * November 14, 2025"; fetched 3 September 2026). Nothing in the document
 * mentions a lifetime plan, a price lock, or grandfathering.
 */
const TERMS = {
  updated: 'November 14, 2025',
  changeAnyTime: 'We may change prices at any time.',
  thenInEffect: 'You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees',
  feeChanges: 'We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.',
  renewal: 'Your subscription, including any a-la-carte services, features and products you select, will continue and automatically renew unless canceled.',
  cycle: 'The length of your billing cycle is monthly.',
  noLiability: 'We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.',
};

/** Quoted verbatim from godelterminal.com/pricing, fetched 3 September 2026. */
const PRICING_PAGE = {
  annual: 'Annual starts at $996 paid up front, about 30% cheaper, or roughly $83 a month.',
  monthly: 'Monthly is $118 a month, which works out to $1,416 a year.',
  cancel: 'Monthly cancels at the end of your billing month, annual at the end of your term.',
};

const faqs = [
  {
    q: `Is there a ${PRODUCT.name} lifetime plan?`,
    a: `Not published. ${PRODUCT.name}'s pricing page lists three plans — Monthly, Annual, and Team &amp; Enterprise — as of September 2026, and none of them is a one-time payment. No lifetime, founder or perpetual tier appears on the pricing page, in the terms, or in any vendor material we can cite. A site advertising a ${PRODUCT.name} lifetime deal is not quoting the vendor.`,
  },
  {
    q: `Will my ${PRODUCT.name} price go up?`,
    a: `The policy is not published, but the history is: the monthly price has gone from $${firstPrice.monthly} (${firstPrice.when}) to ${PRICING.monthly.display} (${latestPrice.when}), with two steps in between. The terms state "${TERMS.changeAnyTime}" and, separately, that fee changes will be communicated "in accordance with applicable law". Whether an existing subscriber keeps their old rate through an increase is not stated anywhere we can find.`,
  },
  {
    q: `Does the annual plan lock the price for the year?`,
    a: `For the year you have paid for, yes — by construction rather than by policy. The pricing page describes annual as ${PRICING.annual.display} "paid up front" on a single invoice, cancelling "at the end of your term", so those twelve months are paid for before any price change can reach them. What happens at renewal is not published: nothing states the next year will also be ${PRICING.annual.display}. And with no refund policy published, the year is a commitment in both directions.`,
  },
  {
    q: `Does ${PROMO.code} lock in a price?`,
    a: `No. ${PROMO.code} takes ${PROMO.percent}% off your ${PROMO.appliesTo} — about $${codeValue} once on the ${PRICING.monthly.display} plan — and then the standard rate applies. It is a discount on one bill, not a rate, and it does nothing to protect you from a later price change. No code in circulation does; every referral code is the same first-month tier.`,
  },
  {
    q: `What does "locked-in accounts" mean in ${PRODUCT.name}'s brokerage-discount copy?`,
    a: `The vendor does not define it. Archived in-app copy reports the brokerage-linked rate as $118 down to $80 a month for new accounts and $10 off for locked-in accounts; no verbatim vendor wording for that line is published. Taken as reported, it means the vendor's own billing distinguishes some existing accounts from new ones, presumably on a rate that differs from the current list price. Who qualifies, at what rate, and whether that status survives a plan change or a lapse is not published. Treat it as evidence that non-list rates exist, not as a policy you can rely on.`,
  },
  {
    q: `Can I prepay more than a year to fix the price?`,
    a: `Not published. The pricing page offers a single annual invoice and nothing longer. The Team &amp; Enterprise plan is quoted by sales "based on your seat count", per the pricing page, so a multi-year term is a question for that conversation — but no multi-year pricing is published, and we will not guess at one.`,
  },
];

export const page = {
  path: '/godel-terminal-price-lock/',
  title: `Godel Terminal Price Lock: What Is and Isn't Published`,
  description: `Godel Terminal publishes no price lock or lifetime plan. What its terms say on price changes, the $40 to $118 history, and what annual billing fixes.`,
  summary: 'No Godel Terminal price lock, lifetime plan or grandfathering policy is published: the terms allow price changes at any time, only the $996 annual plan fixes a price for twelve months, and TAKE30 discounts the first month only.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/godel-terminal-pricing/', label: 'Pricing' },
    { href: '/godel-terminal-price-lock/', label: 'Price lock' },
  ],
  faqs,
  priority: '0.8',
  render() {
    const historyRows = PRICING.history.map((h, i) => ({
      highlight: i === PRICING.history.length - 1,
      cells: [
        esc(h.when),
        `$${h.monthly}/month${h.finraMonthly ? ` ($${h.finraMonthly} FINRA)` : ''}${h.annual ? ` or $${h.annual}/year` : ''}`,
        esc(h.source),
      ],
    }));

    const mechanismRows = [
      {
        highlight: true,
        cells: [
          '<strong>Annual plan</strong>',
          `The current year, at ${PRICING.annual.display} (plus $${PRICING.finraSurcharge.amount * 12} if FINRA-licensed)`,
          'Twelve months. The renewal price is not published.',
          'Vendor pricing page',
        ],
      },
      {
        cells: [
          '<strong>Monthly plan</strong>',
          'Nothing — each renewal is at "the prices then in effect"',
          'One month at a time',
          'Vendor terms',
        ],
      },
      {
        cells: [
          `<strong>${esc(PROMO.code)}</strong>`,
          `${PROMO.percent}% off the ${esc(PROMO.appliesTo)}, about $${codeValue} once`,
          'The first month only',
          'Referral programme; verified at checkout on this site',
        ],
      },
      {
        cells: [
          '<strong>Brokerage-linked rate</strong>',
          '$80/month for new accounts; $10 off for "locked-in" accounts',
          'Not published — conditioned on holding over $5,000 across linked brokerages and one eligible trade in the past month',
          'Threshold: vendor AUM command docs. Rate: archived in-app copy (2026)',
        ],
      },
      {
        cells: [
          '<strong>Lifetime plan</strong>',
          '—',
          '—',
          'Not published',
        ],
      },
      {
        cells: [
          '<strong>Grandfathering or price lock</strong>',
          '—',
          '—',
          'Not published',
        ],
      },
    ];

    return `
<h1>Godel Terminal price lock: what is actually published</h1>

<p class="lede">There is <strong>no published price lock, lifetime plan or grandfathering policy</strong> for
${esc(PRODUCT.name)}. Its terms say the opposite — "${esc(TERMS.changeAnyTime)}" — and the monthly price has gone
from $${firstPrice.monthly} to ${PRICING.monthly.display} since ${esc(firstPrice.when)}. The one mechanism that does
fix what you pay is the annual plan: ${PRICING.annual.display} paid up front covers the next twelve months at that
price. A promo code fixes nothing beyond that: ${esc(PROMO.code)} takes ${PROMO.percent}% off the
${esc(PROMO.appliesTo)} and then the standard rate applies.</p>

${note(`<strong>Sourcing:</strong> every quotation from a vendor document on this page is from
<a href="${VENDOR_PAGES.terms}" rel="nofollow noopener" target="_blank">${esc(PRODUCT.name)}'s terms</a>
(the page states "Last updated ${esc(TERMS.updated)}") or its
<a href="${VENDOR_PAGES.pricing}" rel="nofollow noopener" target="_blank">pricing page</a>, both read on
${esc(longDate('2026-09-03'))}. Neither document contains the words "lifetime", "locked" or "grandfathered".
The brokerage-linked rate covered below is reported from archived in-app copy, not quoted from a vendor page.`)}

<h2>The direct answer</h2>

<ul class="prose">
  <li><strong>Lifetime plan:</strong> not published. The pricing page lists Monthly, Annual and Team &amp; Enterprise, nothing else.</li>
  <li><strong>Price lock or grandfathering for existing subscribers:</strong> not published. The terms reserve the right to change prices and commit only to communicating changes.</li>
  <li><strong>Annual billing:</strong> fixes the current year at ${PRICING.annual.display}, because it is paid up front. It says nothing about the year after.</li>
  <li><strong>A promo code:</strong> discounts one payment. ${esc(PROMO.code)} takes ${PROMO.percent}% off the ${esc(PROMO.appliesTo)} and then the standard rate applies.</li>
</ul>

${codeBox({ note: `${PROMO.percent}% off your ${PROMO.appliesTo}. It discounts one payment; it does not lock a rate.` })}

<h2>What the terms say about price changes</h2>

<p class="prose">The relevant clauses, quoted from the vendor's terms as published in September 2026:</p>

<ul class="prose">
  <li><strong>Purchases and payment:</strong> "${esc(TERMS.changeAnyTime)}" and, in the next paragraph,
  "${esc(TERMS.thenInEffect)}".</li>
  <li><strong>Fee changes:</strong> "${esc(TERMS.feeChanges)}"</li>
  <li><strong>Renewal:</strong> "${esc(TERMS.renewal)}"</li>
  <li><strong>Liability:</strong> "${esc(TERMS.noLiability)}"</li>
</ul>

<p class="prose">Read together: the vendor may change the price, must tell you in whatever way the law requires,
and your subscription renews at whatever the price is when it renews. No clause carves out existing subscribers,
and none promises a rate beyond the period already paid for. That is standard subscription language, not a warning
sign — but it is the whole of what is published, and it points away from a lock rather than towards one.</p>

<p class="prose">One gap worth knowing about: the subscription section of the terms states "${esc(TERMS.cycle)}"
and never describes an annual term at all. The annual plan's mechanics exist only on the pricing page, in its FAQ
answers — including the one on cancelling: "${esc(PRICING_PAGE.cancel)}" The terms carry a ${esc(TERMS.updated)} date; the annual plan is
documented more thinly than the monthly one.</p>

<h2>What "locked-in" means in the vendor's own copy</h2>

<p class="prose">The one vendor use of the word this site holds is in its brokerage-linked discount, whose
rate — unlike its eligibility test, which is documented on the vendor's AUM command page — is not published on any
vendor page. Archived in-app copy and the vendor changelog (v4.2.7, June 2026 build) report the rate as $118 down
to $80 a month for new accounts, and $10 off for locked-in accounts, with organizations and prepaid accounts
excluded. No verbatim vendor wording for that line is published anywhere this site can cite.</p>

<p class="prose">Two things follow from that line, and only two. First, the vendor's own billing distinguishes
"new accounts" from "locked-in accounts", which is consistent with some existing subscribers paying
something other than the list price — though "locked-in" could as easily mean locked into a term as locked to a rate. Second, the copy does not define "locked-in",
"new" or "prepaid", so it cannot tell you who qualifies, at what rate, or whether the status survives a plan change,
a lapse or the next increase. It is evidence that non-list rates exist, not a policy. The discount itself is
covered on <a href="/godel-terminal-brokerage-link/">the brokerage-link page →</a></p>

<h2>The price history, and what it implies</h2>

${table({
  head: ['When', 'Monthly price', 'Source'],
  rows: historyRows,
})}

<p class="prose">Four price points in under two years, each higher than the last; the current
${PRICING.monthly.display} is close to three times the ${esc(firstPrice.when)} figure. Whether subscribers who
signed up at $${firstPrice.monthly}, $${PRICING.history[1].monthly} or $${PRICING.history[2].monthly} kept those
rates is not published; the "locked-in accounts" wording above is the only hint, and it is only a hint. What the
history does establish is that "will my price go up?" is not hypothetical for this product — it is the pattern so
far. Why other pages still quote $60 or $80 is covered on <a href="/godel-terminal-pricing/">the pricing page →</a></p>

<h2>What actually fixes your price: annual billing</h2>

<p class="prose">The pricing page puts it this way: "${esc(PRICING_PAGE.annual)}" Against
"${esc(PRICING_PAGE.monthly)}" Paying a year up front fixes that year's cost by construction — the vendor does not
need a lock policy for money it has already collected, and the annual plan "cancels at the end of your term". So
${PRICING.annual.display} buys twelve months at ${PRICING.annual.display}, about $${fmt(annualSaving)} less than
twelve monthly payments. No published clause reprices a term already paid for; the protection is the payment
itself, not a policy.</p>

<p class="prose">Three limits. Nothing published says the renewal will also be ${PRICING.annual.display} — the
fee-change clause applies to the next term like any other. ${esc(CANCELLATION.refundsNote)} So a year, once paid,
should be treated as spent (<a href="/how-to-cancel-godel-terminal/">what is published about cancelling →</a>).
And FINRA-licensed users add $${PRICING.finraSurcharge.amount * 12} a year on top, per the pricing page.</p>

${table({
  head: ['Mechanism', 'What it fixes', 'For how long', 'Where it is published'],
  rows: mechanismRows,
})}

<h2>What a promo code does and does not do</h2>

<p class="prose">${esc(PROMO.code)} is ${PROMO.percent}% off the ${esc(PROMO.appliesTo)}. On the
${PRICING.monthly.display} plan that is a first payment of about $${discountedFirstMonth}, then ${PRICING.monthly.display}
a month — a one-time saving of roughly $${codeValue}. It is not a rate, it does not repeat, and it has no bearing on
what happens when the vendor next changes the price. The referral page also states that referral discounts do not
combine with other codes, so there is no stacking route to anything larger.</p>

<p class="prose">Every referral code in circulation is the same ${PROMO.percent}% first-month tier; the difference
between them is who earns the commission. ${esc(PROMO.code)} is the one this site has promoted and the one with a
checkout verification date — last verified at checkout on ${esc(longDate(PROMO.lastVerified))}. How a first-month
code interacts with a single annual payment is not vendor-documented; the checkout total is the only authority, and
<a href="/godel-terminal-monthly-vs-annual/">the monthly vs annual page</a> walks through that hedge. The full code
list is on <a href="/promo-codes/">the promo codes page →</a></p>

<h2>If a fixed price matters to you</h2>

<ol class="prose">
  <li><strong>Trial first.</strong> Every plan starts with a ${PRICING.freeTrial.days}-day free trial and the terms
  state the account is not charged until you upgrade. <a href="/godel-terminal-free-trial/">How the trial works →</a></li>
  <li><strong>If you are staying, pay annually.</strong> ${PRICING.annual.display} up front is the only published
  way to make the next twelve months immune to a price change, and it is the cheaper plan anyway.</li>
  <li><strong>If you are not sure, go monthly with ${esc(PROMO.code)}</strong> and accept that each renewal is at
  the price then in effect. You are never more than a month exposed.</li>
  <li><strong>If you hold over $5,000 across linked brokerages and have traded in the past month,</strong> check the
  brokerage-linked rate before choosing either — archived in-app copy reports $80 a month for new accounts, a
  recurring saving larger than any one-off code.</li>
  <li><strong>Ask the vendor the question nobody has published the answer to.</strong> "If the price rises while I
  am subscribed, does my rate change?" — put it to
  <a href="mailto:${esc(CANCELLATION.supportEmail)}">${esc(CANCELLATION.supportEmail)}</a> before you pay, and keep
  the reply. Nothing published commits the vendor to holding your rate; a written answer is at least a record of what
  you were told.</li>
</ol>

${ctaRow({ primary: `Start the trial and apply ${PROMO.code}`, secondary: { href: '/godel-terminal-monthly-vs-annual/', label: 'Monthly vs annual arithmetic' } })}

${faqSection(faqs)}
`;
  },
};
