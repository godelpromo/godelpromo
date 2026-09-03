import { PROMO, PRODUCT, PRICING, STUDENT, REFERRAL, KNOWN_CODES, REFERRAL_CODES, FABRICATED_CLAIMS } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

const x25 = KNOWN_CODES.find((c) => c.official);

// Figures from PRICING.brokerageDiscount.note and PRICING.org.note (vendor
// in-app copy, archived builds). Kept as named constants so the arithmetic
// below is checkable against the data module.
const BROKERAGE_MONTHLY = 80;
const BROKERAGE_LOCKED_OFF = 10;
const BROKERAGE_MIN_HOLDING = '$5,000';
const ORG_PERCENT = 10;

const list = PRICING.monthly.amount;
const fmt = (n) => n.toLocaleString('en-US');
const money = (n) => `$${n.toFixed(2)}`;

const firstMonthWithCode = money(list * (1 - PROMO.percent / 100));
const codeSaving = money(list * (PROMO.percent / 100));
const x25Saving = money(list * (x25.percent / 100));
const studentSaving = list - STUDENT.amount;
const brokerageSaving = list - BROKERAGE_MONTHLY;
const twelveMonthly = list * 12;
const annualSaving = twelveMonthly - PRICING.annual.amount;
const annualPct = Math.round((annualSaving / twelveMonthly) * 100);
const orgSeatSaving = money(list * (ORG_PERCENT / 100));
const finraYear = PRICING.finraSurcharge.amount * 12;
const finraMonthly = list + PRICING.finraSurcharge.amount;
const verified = longDate(PROMO.lastVerified);

const faqs = [
  {
    q: `Is there a ${PRODUCT.name} discount code?`,
    a: `Yes. <strong>${PROMO.code}</strong> takes ${PROMO.percent}% off your ${PROMO.appliesTo} — ${firstMonthWithCode} instead of ${PRICING.monthly.display} on the monthly plan — and was last applied at a real checkout on ${verified}. The vendor's own social code, ${esc(x25.code)}, is also real but smaller at ${x25.percent}%. No code in circulation is worth more than ${PROMO.percent}%.`,
  },
  {
    q: `What is the biggest ${PRODUCT.name} discount?`,
    a: `Not a code. If you have a .edu email and the student program is still live, the announced <a href="/godel-terminal-student-discount/">${esc(STUDENT.display)}/month student rate</a> saves $${studentSaving} a month. Next is the brokerage-linked rate the vendor's in-app copy offers to accounts with a connected brokerage holding ${BROKERAGE_MIN_HOLDING}+ and a recent trade — $${BROKERAGE_MONTHLY}/month for new accounts. Then annual billing, which the pricing page itself describes as about ${annualPct}% cheaper than monthly. ${PROMO.code} comes fourth: the biggest discount that is a code, and the only one everyone qualifies for.`,
  },
  {
    q: `Is a ${PRODUCT.name} discount code the same as a promo code?`,
    a: `Yes. "Discount code", "promo code", "coupon" and "referral code" all describe the same thing at a ${esc(PRODUCT.name)} checkout: a referral token that takes ${PROMO.percent}% off the first payment. The vendor's referral page calls it a referral code; searchers call it whatever they searched. There is one field on the checkout screen, and every one of these words points at it.`,
  },
  {
    q: `Is there a ${PRODUCT.name} discount for the annual plan?`,
    a: `The annual plan is the discount. ${PRICING.annual.display} up front against $${fmt(twelveMonthly)} for twelve monthly payments is a saving of $${fmt(annualSaving)} — the pricing page labels it "Save 30%" and "about 30% cheaper" (checked September 2026). Whether a referral code applies on top of an annual payment is not vendor-documented; the referral page describes the discount as applying to the first month's payment. <a href="/godel-terminal-monthly-vs-annual/">The full monthly-versus-annual arithmetic</a>.`,
  },
  {
    q: `Can I stack a ${PRODUCT.name} discount code with another discount?`,
    a: `No. ${esc(PRODUCT.name)}'s referral page (checked September 2026) states the referral discount "cannot be combined with other promotional offers or discount codes" and that a buyer "can only use one discount at checkout". The brokerage-linked rate likewise excludes organizations and prepaid accounts, per the in-app copy. Pick the largest discount you qualify for and enter that one.`,
  },
  {
    q: `Does ${PRODUCT.name} have a student discount?`,
    a: `It announced one — ${esc(STUDENT.display)} per ${esc(STUDENT.unit)} with a .edu email and a student ID, on its official X account in November 2024. It has never appeared on the pricing page, and archived app builds from mid-2026 no longer show the in-app Student Discount button, so email ${esc(STUDENT.contact)} to confirm it is live before planning around it. <a href="/godel-terminal-student-discount/">What is and is not published about the student rate</a>.`,
  },
];

export const page = {
  path: '/godel-terminal-discount-code/',
  title: 'Godel Terminal Discount Code: Every Real Discount, Ranked',
  description: `${PROMO.code} takes ${PROMO.percent}% off the first month of Godel Terminal. Every other discount — student, brokerage, annual, ${x25.code}, ORG — ranked by size, terms sorted out.`,
  summary: 'The Godel Terminal discount code is TAKE30 (30% off the first month); every other real discount — student, brokerage-linked, annual, X25, ORG — ranked by size, with the terminology sorted out.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/godel-terminal-discount-code/', label: 'Discount code' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.9',
  render() {
    const discountRows = [
      {
        cells: [
          '<strong>Student rate</strong>',
          `${esc(STUDENT.display)}/month`,
          `$${studentSaving}/month, recurring`,
          '.edu email plus a student ID — <em>status uncertain</em>',
          'Official @GodelTerminal X account, November 2024; not on the pricing page',
        ],
      },
      {
        cells: [
          '<strong>Brokerage-linked rate</strong>',
          `$${BROKERAGE_MONTHLY}/month for new accounts; $${BROKERAGE_LOCKED_OFF} off for locked-in accounts`,
          `$${brokerageSaving}/month, recurring`,
          `Connected brokerage holding ${BROKERAGE_MIN_HOLDING}+ with one eligible trade in the trailing month; not organizations or prepaid accounts`,
          'Threshold: vendor AUM doc. Price: archived in-app copy.',
        ],
      },
      {
        cells: [
          '<strong>Annual billing</strong>',
          `${PRICING.annual.display}/year, about $${PRICING.annual.effectiveMonthly}/month`,
          `$${fmt(annualSaving)}/year, about ${annualPct}%`,
          'Anyone who pays the year up front',
          'Vendor pricing page, September 2026',
        ],
      },
      {
        highlight: true,
        cells: [
          `<strong class="mono">${esc(PROMO.code)}</strong> <span class="badge badge-official">Ours</span>`,
          `${PROMO.percent}% off the ${esc(PROMO.appliesTo)}`,
          `${codeSaving}, once`,
          'Anyone, on the first paid billing period',
          `Referral programme; last applied at checkout ${esc(verified)}`,
        ],
      },
      {
        cells: [
          `<strong class="mono">${esc(x25.code)}</strong> <span class="badge badge-reported">Official account</span>`,
          `${x25.percent}% off the first payment`,
          `${x25Saving}, once`,
          'Anyone; a social promo the vendor can withdraw at any time',
          'Official @GodelTerminal X profile bio',
        ],
      },
      {
        cells: [
          '<strong>ORG plan</strong>',
          `${ORG_PERCENT}% per seat at two or more seats`,
          `About ${orgSeatSaving}/seat/month against list, recurring`,
          'Teams of 2+; the pricing page quotes by seat count',
          'In-app ORG copy (archived build); vendor pricing page, September 2026',
        ],
      },
      {
        cells: [
          '<strong>FINRA surcharge</strong>',
          `+${PRICING.finraSurcharge.display}/month`,
          `−$${finraYear}/year`,
          'FINRA-licensed users — the one line that goes the other way',
          'Vendor pricing page, September 2026',
        ],
      },
    ];

    const termRows = [
      {
        cells: [
          '<strong>Referral code</strong>',
          `What the ${PROMO.percent}% token technically is. The vendor's referral page uses this term for codes issued to affiliates through ${esc(REFERRAL.platform)}. ${esc(PROMO.code)} and the ${REFERRAL_CODES.length - 1} other tokens on the <a href="/promo-codes/">promo codes page</a> are all referral codes.`,
        ],
      },
      {
        cells: [
          '<strong>Promo code / discount code</strong>',
          `What searchers call the same thing. Neither term appears on the pricing page. At checkout there is one field, and a "discount code" for ${esc(PRODUCT.name)} resolves to a referral code or to ${esc(x25.code)} — nothing else with a published percentage exists.`,
        ],
      },
      {
        cells: [
          '<strong>Coupon code</strong>',
          `The vendor's own word for codes it issues directly. Its referral FAQ names "coupon code ${esc(REFERRAL.exampleCoupon)}" as an example of something a referral discount cannot be combined with; that coupon's percentage is not published anywhere. Coupon <em>aggregators</em> use the same word for listings they generate — see below.`,
        ],
      },
      {
        cells: [
          '<strong>Discount</strong>',
          `The broad category, and the only word that also covers the things that are not codes: the student rate, the brokerage-linked rate, annual billing and the ORG plan. Those are where the larger savings are.`,
        ],
      },
    ];

    return `
<h1>Godel Terminal discount code: every real discount, ranked by size</h1>

<p class="lede">The ${esc(PRODUCT.name)} discount code is <strong class="mono">${esc(PROMO.code)}</strong>:
<strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)}</strong>, last applied at a real checkout on
<strong>${esc(verified)}</strong>. On the ${PRICING.monthly.display}/month plan that is a first charge of about
${firstMonthWithCode}. It is the largest discount that is a code — but not the largest discount that exists, and the
difference matters if you are deciding how to pay. This page ranks every ${esc(PRODUCT.name)} discount we can source,
then sorts out what "discount code", "promo code", "coupon" and "referral code" actually mean here.</p>

${codeBox()}

<h2>Every ${esc(PRODUCT.name)} discount, largest first</h2>

<p class="prose">Ordered by headline rate. Cash figures are against the vendor-published ${PRICING.monthly.display}/month
price (pricing page, September 2026). The first two rows are bigger than any code and neither appears on the
pricing page; the last row is a surcharge, listed because it reverses the arithmetic for the people it applies to.</p>

${table({
  head: ['Discount', 'Rate', `Worth against ${PRICING.monthly.display}/month`, 'Who qualifies', 'Source'],
  rows: discountRows,
})}

<h3>The two that beat every code</h3>

<p class="prose"><strong>Student rate.</strong> ${esc(STUDENT.display)} a month against ${PRICING.monthly.display} is
not close to anything else on this page. The caveat is its status: announced on the official X account in November
2024, never listed on the pricing page, and archived app builds from mid-2026 no longer show the in-app Student
Discount button. Email ${esc(STUDENT.contact)} before you plan around it —
<a href="/godel-terminal-student-discount/">what is and is not published about the student rate →</a></p>

<p class="prose"><strong>Brokerage-linked rate.</strong> The qualifying test is documented on the vendor's own AUM
command page: hold over ${BROKERAGE_MIN_HOLDING} across brokerages linked through BROK and make at least one eligible
trade in the past month, and the AUM Personal tab shows the discount threshold as met. What it is worth is a weaker
claim — the vendor's in-app changelog and an archived June 2026 app build put it at $${BROKERAGE_MONTHLY}/month
instead of ${PRICING.monthly.display} for new accounts, and $${BROKERAGE_LOCKED_OFF} off for locked-in accounts, but
no vendor page prints a price. Taken at that figure it is $${brokerageSaving} a month, every month, against
${esc(PROMO.code)} at ${codeSaving} once. Organizations and prepaid accounts are excluded.
<a href="/godel-terminal-brokerage-link/">How the brokerage link works →</a></p>

<h3>The discount the vendor advertises: annual billing</h3>

<p class="prose">The pricing page's own "Save 30%" label is on the annual plan, not on any code. ${PRICING.annual.display}
up front against $${fmt(twelveMonthly)} for twelve monthly payments saves $${fmt(annualSaving)} — the vendor's wording
is "about 30% cheaper, or roughly $${PRICING.annual.effectiveMonthly} a month" (September 2026). Same headline number
as ${esc(PROMO.code)}, but it recurs instead of applying once. If you already know you want the product, this is the
discount to take. <a href="/godel-terminal-monthly-vs-annual/">The full arithmetic, including where the code lands →</a></p>

<h3>The two codes</h3>

<p class="prose"><strong>${esc(PROMO.code)}</strong> is a referral token: the vendor's referral page (checked
September 2026) states referred users "receive a ${PROMO.percent}% discount on their first month's payment", and
every referral code in circulation carries that same tier. We promote ${esc(PROMO.code)} because it is the one this
site has verified at checkout — ${esc(verified)} — and the only code this site has ever promoted.
<strong>${esc(x25.code)}</strong> is the one code that comes from the vendor itself, posted in the official X
account's profile bio as "${x25.percent}% off on your first payment". Official, real, and five points smaller.
<a href="/godel-terminal-official-promo-code/">Why the official code is the smaller one →</a></p>

<h3>ORG, and the surcharge</h3>

<p class="prose">The pricing page says teams of two or more "get a discount through the ORG plan" and directs you to
sales for a quote; the ${ORG_PERCENT}% figure comes from in-app ORG copy in an archived build. It is per seat and
recurring, so over a year it outweighs either code — but it is team-only and the seat price itself is quoted, not
listed. Going the other way, FINRA-licensed users pay a ${PRICING.finraSurcharge.display}/month regulatory surcharge:
$${finraMonthly}/month on monthly, or ${PRICING.annual.display} plus $${finraYear} a year on annual, per the pricing
page. No discount on this page touches it. <a href="/godel-terminal-pricing/">Full pricing breakdown →</a></p>

${note(`<strong>You get one.</strong> The referral page states the ${PROMO.percent}% discount "cannot be combined with
other promotional offers or discount codes" and that buyers "can only use one discount at checkout"; the brokerage
copy excludes organizations and prepaid accounts. So the decision is which single row above you qualify for, from
the top down — not how to stack them. <a href="/cheapest-way-to-get-godel-terminal/">The decision, step by step →</a>`)}

<h2>Discount code vs promo code vs coupon vs referral code</h2>

<p class="prose">Four phrases, one checkout field. The vendor's referral page uses three of them itself — it calls
the affiliate token a "referral code", refers to "discount codes" generically, and gives "coupon code
${esc(REFERRAL.exampleCoupon)}" as an example of a vendor-issued coupon. Here is what each term means for
${esc(PRODUCT.name)} specifically:</p>

${table({
  head: ['Term', `What it means at a ${PRODUCT.name} checkout`],
  rows: termRows,
})}

<p class="prose">Practically: whichever phrase you searched, the code you enter is a referral token or ${esc(x25.code)},
the discount is a share of the first payment — ${PROMO.percent}% for a referral code, ${x25.percent}% for
${esc(x25.code)} — and the mechanics are on the <a href="/godel-terminal-referral-program/">referral programme
page</a>. Attribution follows the code typed at checkout, not the link that brought you there.</p>

<h2>How to confirm the discount applied</h2>

<p class="prose">The only evidence that a discount applied is the total on the checkout screen. Before paying:</p>

<ol class="prose">
  <li>Be on a <strong>paid plan</strong> checkout, not the ${PRICING.freeTrial.days}-day trial step. A trial has no
  charge, so there is nothing to discount; the code applies to the first paid period.</li>
  <li>Enter ${esc(PROMO.code)} and press apply — some checkouts do not apply on paste.</li>
  <li>The monthly total should read about <strong>${firstMonthWithCode}</strong>, not ${PRICING.monthly.display}. If
  you are FINRA-licensed, expect the surcharge on top.</li>
  <li>If the total has not moved, the discount has not applied. It will not be credited later.</li>
</ol>

<p class="prose"><a href="/how-to-redeem/">Field-by-field redemption walkthrough →</a></p>

<h2>Why the 40%, 60% and 75% "discounts" are not on this page</h2>

<p class="prose">Coupon aggregators currently advertise ${FABRICATED_CLAIMS.map((f) => `${esc(f.claim)} (${esc(f.where)})`).join('; ')}.
None of those figures has a mechanism to exist: the referral programme has one tier at ${PROMO.percent}%, the
official code is ${x25.percent}%, and the pricing page lists no sale of any kind. The listings are generated from the
merchant name, not from a checkout — one of them moved from 50% to 60% in a month with no vendor change. Every
claim is checked one by one on <a href="/do-godel-terminal-coupons-work/">do the big-percentage coupons work →</a></p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/promo-codes/', label: 'Every code compared' } })}

${faqSection(faqs)}
`;
  },
};
