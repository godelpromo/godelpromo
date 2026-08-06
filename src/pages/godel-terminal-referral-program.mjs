import { PROMO, PRODUCT, REFERRAL_CODES, REFERRAL, DISCLOSURE } from '../data/site.mjs';
import { ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `Is ${PROMO.code} an exclusive ${PRODUCT.name} code?`,
    a: `No, and no exclusive code exists. The referral programme has one discount tier — ${PROMO.percent}% off the ${PROMO.appliesTo} — and every code in circulation applies it. Any page describing its code as exclusive or special is describing the branding, not the discount.`,
  },
  {
    q: `Does using a promo code cost me anything?`,
    a: `No. You pay ${PROMO.percent}% less for your ${PROMO.appliesTo} than you would without a code. The affiliate commission is paid by ${PRODUCT.name} out of its own revenue and is never added to your price.`,
  },
  {
    q: `What does the affiliate actually earn?`,
    a: `${PRODUCT.name}'s referral page states the referrer earns <strong>${REFERRAL.referrerCommission}</strong>, run through ${REFERRAL.platform} and paid out via ${REFERRAL.payout}. Self-referral rules and eligibility are the vendor's terms — check the <a href="${REFERRAL.url}" rel="nofollow noopener" target="_blank">official referral page</a> if you want to join rather than buy.`,
  },
  {
    q: `Can I stack a referral code with another code?`,
    a: `No — ${PRODUCT.name}'s referral page states referral discounts are not combinable with other codes. One code per checkout, and no combination reaches past ${PROMO.percent}%.`,
  },
  {
    q: `If I clicked one site's link but typed another site's code, who gets credited?`,
    a: `Per ${PRODUCT.name}'s referral documentation, attribution follows the code entered at checkout, not the link that got you there. Whichever code is in the promo field when you pay is the affiliate who earns the commission. Your price is the same either way.`,
  },
];

export const page = {
  path: '/godel-terminal-referral-program/',
  title: `How the Godel Terminal Referral Program Actually Works`,
  description: `Every Godel Terminal promo code is a referral token in the same program: one ${PROMO.percent}% first-month tier, attribution follows the code entered at checkout, not the link.`,
  summary: 'How the Godel Terminal referral program works: one 30%-first-month tier, code-based attribution, and what that means about every promo site.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-referral-program/', label: 'Referral program' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    const rows = REFERRAL_CODES.map((c) => ({
      highlight: c.ours,
      cells: [
        `<strong class="mono">${esc(c.code)}</strong>${c.ours ? ' <span class="badge badge-official">Ours</span>' : ''}`,
        esc(c.source),
        `${c.percent}% off the ${esc(PROMO.appliesTo)}`,
      ],
    }));

    return `
<h1>How the Godel Terminal referral program actually works</h1>

<p class="lede">Every ${esc(PRODUCT.name)} promo code you will find is a token in the same referral programme, which
has exactly one discount tier: the buyer gets <strong>${PROMO.percent}% off their ${esc(PROMO.appliesTo)}</strong>,
and the affiliate behind the code earns a commission. Which code you use changes who gets paid — never what you pay.</p>

<h2>The machinery, end to end</h2>

<p class="prose">This entire niche — this site included — runs on one simple mechanism:</p>

<ol class="prose">
  <li>${esc(PRODUCT.name)} runs a referral programme through ${esc(REFERRAL.platform)}. Anyone accepted into it gets
  a referral link and a code — the programme's own page is at
  <a href="${REFERRAL.url}" rel="nofollow noopener" target="_blank">godelterminal.com/referral</a>.</li>
  <li>A buyer enters that code at checkout and gets <strong>${PROMO.percent}% off their
  ${esc(PROMO.appliesTo)}</strong>. That is the whole buyer-side offer — one tier, first month only, and
  per the vendor's page it does not combine with other codes.</li>
  <li>The affiliate earns <strong>${esc(REFERRAL.referrerCommission)}</strong>, paid by ${esc(PRODUCT.name)} out of
  its own revenue via ${esc(REFERRAL.payout)} (vendor-stated).</li>
  <li>The commission is never added to the buyer's price. With or without a code, the standard rate after the first
  period is identical.</li>
</ol>

<p class="prose">Because there is a single referral tier, every referral code in circulation is interchangeable in
effect. (The one non-referral code, <a href="/godel-terminal-official-promo-code/">X25 from the official X
account</a>, is smaller at 25%.) The referral tokens we know of:</p>

${table({
  head: ['Code', 'Promoted by', 'What the buyer gets'],
  rows,
})}

<p class="prose">Many names, one offer. The full comparison — including the fabricated 40% and 75% claims that
aggregators attach to these codes — is on the <a href="/promo-codes/">promo codes page →</a>, with the deeper
debunk on <a href="/do-godel-terminal-coupons-work/">do the big-percentage coupons work →</a></p>

<h2>Attribution follows the code, not the link</h2>

<p class="prose">${esc(PRODUCT.name)}'s referral documentation states that attribution follows the
<strong>code entered at checkout</strong>, not the referral link that brought you to the site. If you clicked one
site's link last week and type a different site's code today, the code wins. Practically, this means the promo field
on the checkout screen is the entire mechanism — everything else is decoration.</p>

${note(`This is also why every promo site pushes so hard to get its code into your clipboard. The click is worth
nothing; the code is worth the commission.`)}

<h2>What this means for you as a buyer</h2>

<p class="prose">Pick any code in the table above; the price is identical. There is no better deal to hunt for, no
stacking, no exclusive tier hiding on another site. The only checkout mistake available to you is paying without any
code at all — that forfeits the ${PROMO.percent}% and enriches no one. The
<a href="/how-to-redeem/">redemption walkthrough →</a> shows exactly where the field is and how to confirm the
discount applied.</p>

<h2>What this means about promo sites — including this one</h2>

<p class="prose">Every ${esc(PRODUCT.name)} promo site is paid the same way: same programme, same tier, same
commission structure. Us too. The difference between these sites is not the deal — it cannot be, structurally — but
what else each page tells you, and whether it is true. Some invent discount percentages and command mnemonics; we
document only what we can source, and say so plainly when something is unknown.
<a href="/about/">How this site makes money, in full →</a></p>

<p class="prose">Restating our footer disclosure in plain prose, because this page is exactly where it belongs:
${esc(DISCLOSURE.affiliate)}</p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/promo-codes/', label: 'Every code compared' } })}

${faqSection(faqs)}
`;
  },
};
