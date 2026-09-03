import { PROMO, PRODUCT, PRICING, STUDENT, REFERRAL } from '../data/site.mjs';
import { CODE_SITES } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

/**
 * Figures that currently live only inside note strings in site.mjs, named
 * here so the arithmetic below reads plainly. Same vendor sources the notes
 * cite; if they ever get numeric fields, swap these for them.
 */
const BROKERAGE_MONTHLY = 80;       // PRICING.brokerageDiscount.note: "$118 to $80/month for new accounts"
const BROKERAGE_MIN_BALANCE = 5000; // PRICING.brokerageDiscount.note: "holding at least $5,000"
const ORG_PERCENT = 10;             // PRICING.org.note: "10% discount at 2+ users"

const M = PRICING.monthly.amount;
const A = PRICING.annual.amount;
const F = PRICING.finraSurcharge.amount;

const cents = (n) => Math.round(n * 100) / 100;
const usd = (n) => {
  const v = cents(n);
  return `$${v.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(v) ? 0 : 2, maximumFractionDigits: 2 })}`;
};

const firstMonth = cents(M * (1 - PROMO.percent / 100)); // first month with the code
const codeSaving = cents(M - firstMonth);                 // what the code is worth, once
const yearMonthly = M * 12;
const yearMonthlyCode = cents(firstMonth + M * 11);
const yearBrokerage = BROKERAGE_MONTHLY * 12;
const yearStudent = STUDENT.amount * 12;
const finraMonthly = M + F;
const yearFinraMonthly = finraMonthly * 12;
const yearFinraAnnual = A + F * 12;
const annualSaving = yearMonthly - A;
const orgAnnualSeat = cents(A * (1 - ORG_PERCENT / 100));

/** Cumulative cost of m months on the monthly plan, code applied to month one. */
const cumWithCode = (m) => cents(firstMonth + M * (m - 1));
let breakEven = 1;
while (cumWithCode(breakEven) <= A) { breakEven += 1; }
const monthBefore = breakEven - 1;

const faqs = [
  {
    q: `What is the cheapest way to get ${PRODUCT.name}?`,
    a: `It depends on what you qualify for. A student with a .edu email has the announced ${esc(STUDENT.display)}/month rate, if it is still live. An account with a connected brokerage holding ${usd(BROKERAGE_MIN_BALANCE)}+ and a recent trade may be offered ${usd(BROKERAGE_MONTHLY)}/month in-app. Everyone else pays ${PRICING.annual.display} a year on annual or ${PRICING.monthly.display} a month on monthly, and a referral code such as ${esc(PROMO.code)} takes ${PROMO.percent}% off the first month only. Over twelve months that is ${usd(yearStudent)}, ${usd(yearBrokerage)}, ${usd(A)} and ${usd(yearMonthlyCode)} respectively.`,
  },
  {
    q: `How much does ${PRODUCT.name} cost per month?`,
    a: `${PRICING.monthly.display} billed monthly, or about $${PRICING.annual.effectiveMonthly} a month effective on the ${PRICING.annual.display} annual plan, per the vendor's pricing page in September 2026. FINRA-licensed users pay ${usd(finraMonthly)} on monthly. The in-app brokerage-linked rate is ${usd(BROKERAGE_MONTHLY)} for new accounts that qualify, and the announced student rate is ${esc(STUDENT.display)}.`,
  },
  {
    q: `Does ${PROMO.code} work on the annual plan?`,
    a: `Not something this site can confirm. The vendor's referral page says the ${PROMO.percent}% discount applies to "the first month's payment" and "is only applied to the first payment", and an annual plan is a single payment. One rival code site states the code applies to the monthly plan only. Neither reading has been verified against an annual checkout here, so enter the code and let the total on the checkout screen decide.`,
  },
  {
    q: `Can I stack ${PROMO.code} on the brokerage rate or the student rate?`,
    a: `The referral page states the referral discount cannot be combined with other discount codes or promotional offers. Whether the in-app brokerage-linked rate counts as a "promotional offer" for that purpose is not published. The student rate is ${esc(STUDENT.display)}/month, so there is nothing worth stacking on it anyway.`,
  },
  {
    q: `When does annual become cheaper than monthly with a code?`,
    a: `At month ${breakEven}. After ${monthBefore} months of monthly billing with ${esc(PROMO.code)} you have paid ${usd(cumWithCode(monthBefore))}, still under the ${usd(A)} annual price; month ${breakEven} takes the running total to ${usd(cumWithCode(breakEven))}. Without the code the crossover is the same month (${usd(M * monthBefore)} then ${usd(M * breakEven)}) — the code shifts the total by ${usd(codeSaving)}, not the month.`,
  },
  {
    q: `Is there any way to get ${PRODUCT.name} for free?`,
    a: `For ${PRICING.freeTrial.days} days, yes: every plan starts with a free trial and the vendor terms state the account is not charged until you upgrade. There is no permanently free tier, and the 40% to 80% coupons on aggregator sites are fabricated — the only published discount tiers are the ${PROMO.percent}% referral offer, the official X25 code at 25%, and the vendor's own student, brokerage and organization rates; the referral page also names a coupon code NVDA whose percentage is not published.`,
  },
];

export const page = {
  path: '/cheapest-way-to-get-godel-terminal/',
  title: 'Cheapest Way to Get Godel Terminal: The Full Arithmetic',
  description: `Every route to a cheaper Godel Terminal, costed over 12 months: ${usd(A)} annual, ${usd(firstMonth)} first month with ${PROMO.code}, the ${usd(BROKERAGE_MONTHLY)} brokerage rate, the ${STUDENT.display} student rate.`,
  summary: 'The cheapest way to get Godel Terminal for each kind of buyer — student, brokerage-linked, annual, monthly with a code, FINRA-licensed, team — with twelve-month totals and the break-even month.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/cheapest-way-to-get-godel-terminal/', label: 'Cheapest way to get it' },
  ],
  faqs,
  priority: '0.8',
  render() {
    const decisionRows = [
      {
        cells: [
          '<strong>A student with a .edu email</strong>',
          `Student rate, ${esc(STUDENT.display)}/month — <a href="/godel-terminal-student-discount/">if it is still live</a>`,
          `${usd(yearStudent)}`,
          'Official X account, November 2024; not on the pricing page',
        ],
      },
      {
        cells: [
          `<strong>Holding ${usd(BROKERAGE_MIN_BALANCE)}+ in a brokerage you can connect</strong>`,
          `Brokerage-linked rate, ${usd(BROKERAGE_MONTHLY)}/month — <a href="/godel-terminal-brokerage-link/">how it works</a>`,
          `${usd(yearBrokerage)}`,
          'Vendor in-app copy and changelog, 2026',
        ],
      },
      {
        highlight: true,
        cells: [
          '<strong>Committing for a year</strong>',
          `Annual, ${PRICING.annual.display} paid up front`,
          `${usd(A)}`,
          'Vendor pricing page, September 2026',
        ],
      },
      {
        cells: [
          '<strong>Trying it for a month or two</strong>',
          `Monthly with <span class="mono">${esc(PROMO.code)}</span>: ${usd(firstMonth)} for month one, then ${PRICING.monthly.display}`,
          `${usd(yearMonthlyCode)} if you stay all year`,
          'Vendor pricing page and referral page, September 2026',
        ],
      },
      {
        cells: [
          '<strong>FINRA-licensed</strong>',
          `Annual plus the ${PRICING.finraSurcharge.display}/month surcharge`,
          `${usd(yearFinraAnnual)} (monthly: ${usd(yearFinraMonthly)})`,
          'Vendor pricing page, September 2026',
        ],
      },
      {
        cells: [
          '<strong>A team of two or more</strong>',
          `ORG plan, quoted by sales; in-app copy states ${ORG_PERCENT}% at two or more seats`,
          `Quote — about ${usd(orgAnnualSeat)} a seat if the ${ORG_PERCENT}% applies to the annual price`,
          'Vendor pricing page and in-app ORG copy, 2026',
        ],
      },
    ];

    const totalRows = [
      { cells: ['Monthly, no code', usd(M), `11 × ${usd(M)}`, usd(yearMonthly)] },
      { cells: [`Monthly with ${esc(PROMO.code)}`, usd(firstMonth), `11 × ${usd(M)}`, usd(yearMonthlyCode)] },
      { highlight: true, cells: ['Annual', `${usd(A)} up front`, '—', usd(A)] },
      { cells: ['Brokerage-linked rate, if eligible', usd(BROKERAGE_MONTHLY), `11 × ${usd(BROKERAGE_MONTHLY)}`, usd(yearBrokerage)] },
      { cells: ['Student rate, if live', usd(STUDENT.amount), `11 × ${usd(STUDENT.amount)}`, usd(yearStudent)] },
      { cells: ['FINRA-licensed, monthly', usd(finraMonthly), `11 × ${usd(finraMonthly)}`, usd(yearFinraMonthly)] },
      { cells: ['FINRA-licensed, annual', `${usd(yearFinraAnnual)} up front`, '—', usd(yearFinraAnnual)] },
    ];

    const breakEvenRows = [1, 3, 6, monthBefore, breakEven, 12].map((m) => ({
      highlight: m === breakEven,
      cells: [
        `Month ${m}`,
        usd(cumWithCode(m)),
        usd(M * m),
        usd(A),
        cumWithCode(m) <= A ? 'Monthly' : 'Annual',
      ],
    }));

    return `
<h1>The cheapest way to get Godel Terminal, by reader type</h1>

<p class="lede">There is no single cheapest way to get ${esc(PRODUCT.name)}, because the vendor has put out four different
prices and which one you can reach depends on who you are. Billed monthly it is <strong>${PRICING.monthly.display}</strong>;
billed annually it is <strong>${PRICING.annual.display}</strong>, about $${PRICING.annual.effectiveMonthly} a month (vendor
pricing page, September 2026). An in-app brokerage-linked rate brings monthly to ${usd(BROKERAGE_MONTHLY)} for accounts that
qualify, and an announced student rate is ${esc(STUDENT.display)} a month, if that program is still live. On top of any of
the monthly figures, a referral code takes ${PROMO.percent}% off the first month only. For most readers the choice collapses
to two: <strong>annual if you are staying a year, monthly with ${esc(PROMO.code)} if you are not</strong>.</p>

${codeBox({ note: `${PROMO.percent}% off the first month — ${usd(firstMonth)} instead of ${PRICING.monthly.display}, once.` })}

<h2>The decision table</h2>

<p class="prose">Find your row. The twelve-month column assumes you keep the subscription the whole year; the last column
says where the figure comes from, because several of these figures are not on the pricing page at all.</p>

${table({
  head: ['You are…', 'Cheapest published route', 'Twelve-month cost', 'Source'],
  rows: decisionRows,
})}

${note(`<strong>On the student row:</strong> ${esc(STUDENT.note)}`, { warn: true })}

<h2>Twelve-month totals, line by line</h2>

${table({
  head: ['Route', 'Month one', 'Months two to twelve', 'Twelve-month total'],
  rows: totalRows,
})}

<p class="prose">Three things the table cannot show:</p>

<ul class="prose">
  <li><strong>The brokerage rate has conditions.</strong> The vendor's in-app copy ties it to a connected brokerage
  holding at least ${usd(BROKERAGE_MIN_BALANCE)} with at least one eligible trade in the trailing month, offers
  ${usd(BROKERAGE_MONTHLY)}/month to new accounts and $10 off to locked-in ones, and excludes organizations and prepaid
  accounts — whether "prepaid" covers every annual subscriber is not spelled out. How often eligibility is rechecked is not published, so
  ${usd(yearBrokerage)} is the figure if you stay eligible all year.</li>
  <li><strong>The student rate may not be ${esc(STUDENT.display)} any more,</strong> or may not exist; see the caveat above.
  If it is live at any student price, it beats every other row.</li>
  <li><strong>The FINRA surcharge is on both plans.</strong> The pricing page states it plainly: ${usd(finraMonthly)}/month
  on monthly, or ${PRICING.annual.display} plus $${F * 12} a year on annual. Whether a referral code discounts the surcharge
  portion of a first payment is not published.</li>
</ul>

<h2>The break-even: month ${breakEven}</h2>

<p class="prose">The most common version of this question is "monthly with a code, or annual?" — so here is the running
total of monthly billing, with ${esc(PROMO.code)} applied to month one, against the flat ${usd(A)} annual price.</p>

${table({
  head: ['Tenure', `Monthly with ${PROMO.code}`, 'Monthly, no code', 'Annual', 'Cheaper'],
  rows: breakEvenRows,
})}

<p class="prose">Monthly with the code is cheaper for up to ${monthBefore} months (${usd(cumWithCode(monthBefore))} against
${usd(A)}). At month ${breakEven} the running total reaches ${usd(cumWithCode(breakEven))} and annual has won; by month
twelve the gap is ${usd(yearMonthlyCode - A)}. Note that the crossover is the same month with or without the code: the
code moves every monthly total down by ${usd(codeSaving)}, which is not enough to shift the month. The decision is about
tenure, not codes. A rival guide site reaches the same nine-month figure, for what that is worth. The fuller version of
this comparison, including who should pick which plan, is on
<a href="/godel-terminal-monthly-vs-annual/">monthly vs annual →</a></p>

<p class="prose">From the second year on, the code is gone from the arithmetic entirely and the annual plan's saving is
simply ${usd(annualSaving)} a year against ${usd(yearMonthly)} of monthly payments.</p>

<h2>What a code does, and does not do, to annual billing</h2>

<p class="prose">Two vendor statements, both from the
<a href="${REFERRAL.url}" rel="nofollow noopener" target="_blank">referral page</a> as of September 2026: referred users
"receive a 30% discount on their first month's payment", and the discount "is only applied to the first payment" and
"cannot be combined with other discount codes". An annual plan is one payment. Whether that single payment is treated as a
"first payment" and discounted, or whether the code is refused on annual checkout, is not published — and this site has
not verified it against an annual checkout either way. One rival code site, ${esc(CODE_SITES.NEWUSER.site)}, states the
code applies to the monthly plan only. Treat the checkout total as the only authority.</p>

<p class="prose">The other thing a code does not do is change which code you should use. Every referral code in
circulation — NEWUSER, GET30, SHKRELI and the rest — is the same ${PROMO.percent}%-off-first-month token, so swapping
one for another changes nothing in the tables above. The tie-breaker is verification: ${esc(PROMO.code)} carries a checkout
verification date of ${esc(longDate(PROMO.lastVerified))} and is the only code this site has promoted. The vendor's own
<a href="/godel-terminal-official-promo-code/">X25 is official and gives 25%</a>, which is smaller.
<a href="/promo-codes/">Every code compared →</a></p>

<h2>Cost per month, every way it can be sliced</h2>

<ul class="prose">
  <li><strong>${PRICING.monthly.display}</strong> — the monthly plan (vendor pricing page, September 2026).</li>
  <li><strong>~$${PRICING.annual.effectiveMonthly}</strong> — the annual plan divided by twelve; you pay ${PRICING.annual.display} up front.</li>
  <li><strong>${usd(firstMonth)}</strong> — month one on monthly with ${esc(PROMO.code)}, then ${PRICING.monthly.display}.</li>
  <li><strong>${usd(BROKERAGE_MONTHLY)}</strong> — the brokerage-linked rate for new accounts that qualify (in-app copy).</li>
  <li><strong>${usd(finraMonthly)}</strong> — monthly for FINRA-licensed users; annual is ${PRICING.annual.display} plus $${F * 12}/year.</li>
  <li><strong>${esc(STUDENT.display)}</strong> — the announced student rate, status uncertain.</li>
</ul>

<p class="prose">If you are comparing against what you already pay for elsewhere rather than against ${esc(PRODUCT.name)}'s
own plans, the <a href="/cost-calculator/">cost calculator</a> runs seats and years against five rival terminals, and the
<a href="/godel-terminal-pricing/">pricing breakdown</a> sources the base figures behind every total on this page.</p>

<h2>What does not make it cheaper</h2>

<ul class="prose">
  <li><strong>Coupons above ${PROMO.percent}%.</strong> The 40%, 60% and 75% listings on aggregator sites do not
  correspond to any published tier. <a href="/do-godel-terminal-coupons-work/">Each one, checked →</a></li>
  <li><strong>Stacking codes.</strong> The referral page allows one discount at checkout.</li>
  <li><strong>Skipping the trial.</strong> The ${PRICING.freeTrial.days}-day trial has no charge to discount, and the
  code applies to the first paid period afterwards, so trialling first costs you nothing.
  <a href="/godel-terminal-free-trial/">How the trial and the code fit together →</a></li>
  <li><strong>Old prices.</strong> Pages quoting $60 or $80 a month are describing 2024 and 2025 pricing; the current
  vendor-published figures are ${PRICING.monthly.display} and ${PRICING.annual.display}.</li>
</ul>

${ctaRow({ primary: `Start the trial, then apply ${PROMO.code}`, secondary: { href: '/godel-terminal-monthly-vs-annual/', label: 'Monthly vs annual in full' } })}

${faqSection(faqs)}
`;
  },
};
