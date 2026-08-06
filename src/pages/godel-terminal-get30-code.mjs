import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { CODE_SITES } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const site = CODE_SITES.GET30;

const faqs = [
  {
    q: 'Does GET30 work for Godel Terminal?',
    a: `Yes. GET30 is a referral token, and like every referral code it gives ${PROMO.percent}% off the ${PROMO.appliesTo}. If it fails at checkout, any other code — ${PROMO.code}, NEWUSER, SHKRELI — targets the identical offer.`,
  },
  {
    q: 'Is Godel Terminal $60 a month, like the GET30 site says?',
    a: `Not anymore. $60/month is a community-reported price point from late 2024, two price changes ago. The vendor's pricing page now lists ${PRICING.monthly.display}/month and ${PRICING.annual.display} per ${esc(PRICING.annual.unit)}. See the <a href="/godel-terminal-pricing/">current pricing breakdown</a>.`,
  },
  {
    q: 'Is the site promoting GET30 official?',
    a: `No. ${esc(site.site)} is a single-page affiliate site on a webflow.io subdomain. The official product site is godelterminal.com, and the only vendor-published code we know of is <a href="/godel-terminal-official-promo-code/">X25, at 25%</a>.`,
  },
  {
    q: 'What is a cloaked redirect, and does it change my discount?',
    a: `A cloaked redirect (the GET30 site routes every button through foxly.link) hides the destination until you land. It does not change your discount — attribution follows the code entered at checkout — but it does hide who is being paid. A visible referral link shows the attribution up front, which is why ours are visible.`,
  },
];

export const page = {
  path: '/godel-terminal-get30-code/',
  title: 'GET30 for Godel Terminal: What the Code Actually Does',
  description: 'GET30 is a Godel Terminal referral code promoted by a single-page site. It gives the standard 30% off month one — the same as every other referral code.',
  summary: 'GET30 works — the standard 30% off the first month — but the single-page site promoting it quotes pricing two changes out of date.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/godel-terminal-get30-code/', label: 'GET30' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.7',
  render() {
    const historyRows = PRICING.history.map((h) => ({
      highlight: !h.attributed,
      cells: [
        esc(h.when),
        `$${h.monthly}/mo${h.annual ? ` (or $${h.annual}/yr)` : ''}`,
        esc(h.source),
      ],
    }));

    return `
<h1>GET30 for Godel Terminal: what the code actually does</h1>

<p class="lede">GET30 is a real ${esc(PRODUCT.name)} referral code. It gives
<strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)}</strong> — the same single tier that
${esc(PROMO.code)} and every other referral code applies. What distinguishes GET30 is not the discount. It is
the page promoting it.</p>

<h2>The offer</h2>
<p class="prose">${esc(PRODUCT.name)}'s referral programme has one discount tier: ${PROMO.percent}% off the
${esc(PROMO.appliesTo)}. GET30, ${esc(PROMO.code)}, <a href="/godel-terminal-newuser-code/">NEWUSER</a> and
<a href="/godel-terminal-shkreli-code/">SHKRELI</a> are all tokens pointing at it — the
<a href="/promo-codes/">full comparison</a> lists every one. Attribution follows the code entered at checkout,
so the code in the promo field is the only thing that has to be right.</p>
<p class="prose">Two boundaries worth knowing before you pay: referral discounts do not stack, per the vendor's
referral page — a signup carries one code — and a free-trial signup has no charge for a code to act on, so the
${PROMO.percent}% has nothing to act on until your first paid checkout — confirm there that it applied.</p>

<h2>The site promoting GET30</h2>
<p class="prose">Four checkable facts about ${esc(site.site)}:</p>
<ul class="prose">
  <li>It is a single-page site — its sitemap contains exactly one URL — that currently tops the promo-code
  query.</li>
  <li>It quotes a $60/month base price, which is two price changes out of date.</li>
  <li>It carries an unattributed "hedge fund manager" testimonial.</li>
  <li>Every button routes through a cloaked redirect (foxly.link) rather than a visible referral link.</li>
</ul>

<h2>Why that page says $60 a month</h2>
<p class="prose">The $60 figure was real once. ${esc(PRODUCT.name)}'s price has moved twice since, and the page
froze at the first one:</p>

${table({
  head: ['When', 'Monthly price', 'Source'],
  rows: historyRows,
})}

<p class="prose">A ${PROMO.percent}% code against the real ${PRICING.monthly.display}/month brings your first
payment to roughly $${(PRICING.monthly.amount * 0.7).toFixed(2)} — not the ~$42 the stale $60 figure implies.
Current numbers, including the annual plan and the FINRA surcharge, are on the
<a href="/godel-terminal-pricing/">pricing page</a>.</p>

<h2>Same offer, different transparency</h2>
<p class="prose">We are an affiliate site too, so the comparison is between practices, not motives. Our signup
links are visible referral links marked rel=sponsored rather than cloaked redirects; our testimonial is the
vendor's own named, attributed case study rather than an anonymous one; and the verification date on
${esc(PROMO.code)} — ${esc(PROMO.lastVerified)} — is the date the code was last actually tested at checkout.
Same ${PROMO.percent}%, checkable claims.</p>

${codeBox({ note: `Identical effect to GET30: ${PROMO.percent}% off your ${PROMO.appliesTo}.` })}

<p class="prose">And if a site is advertising more than ${PROMO.percent}% off, it is not a better version of
GET30 — it is fiction. <a href="/do-godel-terminal-coupons-work/">Every fabricated coupon claim, checked →</a></p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/promo-codes/', label: 'Compare every code' } })}

${faqSection(faqs)}
`;
  },
};
