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
    a: `Yes. <strong>${PROMO.code}</strong> takes ${PROMO.percent}% off your ${PROMO.appliesTo} — ${firstMonthWithCode} instead of ${PRICING.monthly.display} on the monthly plan — and was last applied at a real checkout on ${verified}. The vendor's own social code, ${esc(x25.code)}, is genuine — it is in the vendor's own X profile bio — but smaller at ${x25.percent}%, and this site has not applied it at a checkout. No code with a published percentage beats ${PROMO.percent}%: every referral token is ${PROMO.percent}%, ${esc(x25.code)} is ${x25.percent}%, and the one coupon the referral page names has no published rate.`,
  },
  {
    q: `What is the biggest ${PRODUCT.name} discount?`,
    a: `Not a code. If you have a .edu email and the student program is still live, the announced <a href="/godel-terminal-student-discount/">${esc(STUDENT.display)}/month student rate</a> saves $${studentSaving} a month. Next is the brokerage-linked rate. The vendor's AUM command doc sets the test — hold over ${BROKERAGE_MIN_HOLDING} across linked brokerages plus an eligible trade in the past month — but no vendor page prints the price it unlocks; archived in-app copy puts it at $${BROKERAGE_MONTHLY}/month for new accounts. Then annual billing, which the pricing page describes as about ${annualPct}% cheaper than monthly. ${PROMO.code} comes fourth: the largest rate any code carries, and the only code this site has applied at a checkout (${verified}). It is open to anyone, as are annual billing and ${esc(x25.code)}; the two rates above them are not.`,
  },
  {
    q: `Is a ${PRODUCT.name} discount code the same as a promo code?`,
    a: `As words, yes: "discount code", "promo code" and "referral code" all point at one field on the ${esc(PRODUCT.name)} checkout screen, and what you type into it is either a referral token — ${PROMO.percent}% off the ${esc(PROMO.appliesTo)} — or the vendor's own ${esc(x25.code)} at ${x25.percent}%. "Coupon" is the exception: the referral page uses it for a different kind of code — "coupon code ${esc(REFERRAL.exampleCoupon)}", which a referral discount "cannot be combined with" and whose percentage is not published.`,
  },
  {
    q: `Is there a ${PRODUCT.name} discount for the annual plan?`,
    a: `The annual plan is the discount. ${PRICING.annual.display} up front against $${fmt(twelveMonthly)} for twelve monthly payments is a saving of $${fmt(annualSaving)} — the pricing page labels it "Save 30%" and "about 30% cheaper" (checked September 2026). Whether a referral code applies on top of an annual payment is not vendor-documented; the referral page describes the discount as applying to the first month's payment. <a href="/godel-terminal-monthly-vs-annual/">The full monthly-versus-annual arithmetic</a>.`,
  },
  {
    q: `Can I stack a ${PRODUCT.name} discount code with another discount?`,
    a: `No. ${esc(PRODUCT.name)}'s referral page (checked September 2026) states the referral discount "cannot be combined with other promotional offers or discount codes" and that a buyer "can only use one discount at checkout". The brokerage-linked rate likewise excludes organizations and prepaid accounts, per the in-app copy. Take the largest discount you qualify for.`,
  },
  {
    q: `Does ${PRODUCT.name} have a student discount?`,
    a: `It announced one — ${esc(STUDENT.display)} per ${esc(STUDENT.unit)} with a .edu email and a student ID — on its official X account in November 2024. It has never appeared on the pricing page, archived app builds from mid-2026 no longer show the in-app Student Discount button, and r/GodelTerminal posts in August 2026 quote $10/month instead. Email ${esc(STUDENT.contact)} before planning around it. <a href="/godel-terminal-student-discount/">What is published about the student rate</a>.`,
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
          `Linked brokerages holding over ${BROKERAGE_MIN_HOLDING} <em>and</em> at least one eligible trade in the past month; not organizations or prepaid accounts`,
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
          'Anyone; a social promo the vendor can withdraw',
          'Official @GodelTerminal X profile bio',
        ],
      },
      {
        cells: [
          '<strong>ORG plan</strong>',
          `${ORG_PERCENT}% per seat at two or more seats`,
          `About ${orgSeatSaving}/seat/month against list, recurring`,
          'Teams of 2+; the pricing page publishes no ORG percentage',
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
          `What the ${PROMO.percent}% token technically is: the referral page uses the term for codes issued to affiliates through ${esc(REFERRAL.platform)}. ${esc(PROMO.code)} and the ${REFERRAL_CODES.length - 1} other tokens on the <a href="/promo-codes/">promo codes page</a> are all referral codes.`,
        ],
      },
      {
        cells: [
          '<strong>Promo code / discount code</strong>',
          `What searchers call it; neither term appears on the pricing page. At checkout there is one field, and a "discount code" resolves to a referral code or to ${esc(x25.code)} — nothing else with a published percentage exists.`,
        ],
      },
      {
        cells: [
          '<strong>Coupon code</strong>',
          `The vendor's own word for a code that is not a referral token. Its referral FAQ names "coupon code ${esc(REFERRAL.exampleCoupon)}" as an example of something a referral discount cannot be combined with; who issues that coupon, and what percentage it carries, is not published.`,
        ],
      },
      {
        cells: [
          '<strong>Discount</strong>',
          `The broad category, and the only word that also covers what is not a code: the student rate, the brokerage-linked rate, annual billing and the ORG plan — where the larger savings are.`,
        ],
      },
    ];

    return `
<h1>Godel Terminal discount code: every real discount, ranked by size</h1>

<p class="lede">The ${esc(PRODUCT.name)} discount code is <strong class="mono">${esc(PROMO.code)}</strong>:
<strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)}</strong>, last applied at a real checkout on
<strong>${esc(verified)}</strong>. On the ${PRICING.monthly.display}/month plan that is a first charge of about
${firstMonthWithCode}. It is the largest discount that is a code — but not the largest discount that exists. This page
ranks every ${esc(PRODUCT.name)} discount we can source, then sorts out what "discount code", "promo code" and
"coupon" mean here.</p>

${codeBox()}

<h2>Every ${esc(PRODUCT.name)} discount, largest first</h2>

<p class="prose">Ordered by headline rate; cash figures are against the vendor-published ${PRICING.monthly.display}/month
price (pricing page, September 2026). The first two rows beat every code and neither appears on the pricing page; the
last row is a surcharge, which reverses the arithmetic.</p>

${table({
  head: ['Discount', 'Rate', `Worth against ${PRICING.monthly.display}/month`, 'Who qualifies', 'Source'],
  rows: discountRows,
})}

<h3>The two that beat every code</h3>

<p class="prose"><strong>Student rate.</strong> ${esc(STUDENT.display)} a month against ${PRICING.monthly.display} is
not close to anything else here. The caveat is its status: announced on the official X account in November
2024, never listed on the pricing page, archived app builds from mid-2026 no longer show the in-app Student Discount
button, and r/GodelTerminal posts in August 2026 quote a $10/month student rate rather than ${esc(STUDENT.display)}.
Email ${esc(STUDENT.contact)} before you plan around it —
<a href="/godel-terminal-student-discount/">what is and is not published about the student rate →</a></p>

<p class="prose"><strong>Brokerage-linked rate.</strong> The qualifying test is documented on the vendor's own AUM
command page: hold over ${BROKERAGE_MIN_HOLDING} across brokerages linked through BROK and make at least one eligible
trade in the past month, and the AUM Personal tab shows the threshold as met. What it is worth is a weaker claim —
the vendor's in-app changelog and an archived June 2026 app build put it at $${BROKERAGE_MONTHLY}/month instead of
${PRICING.monthly.display} for new accounts, and $${BROKERAGE_LOCKED_OFF} off for locked-in accounts, but no vendor
page prints a price. Taken at that figure it is $${brokerageSaving} a month, every month, against ${esc(PROMO.code)}
at ${codeSaving} once. <a href="/godel-terminal-brokerage-link/">How the brokerage link works →</a></p>

<h3>The discount the vendor advertises: annual billing</h3>

<p class="prose">The pricing page's own "Save 30%" label is on the annual plan, not on any code: ${PRICING.annual.display}
up front against $${fmt(twelveMonthly)} for twelve monthly payments saves $${fmt(annualSaving)}, or "about 30%
cheaper, or roughly $${PRICING.annual.effectiveMonthly} a month" in the vendor's wording (September 2026). Same
headline number as ${esc(PROMO.code)}, but it recurs instead of applying once.
<a href="/godel-terminal-monthly-vs-annual/">The full arithmetic, including where the code lands →</a></p>

<h3>The two codes</h3>

<p class="prose"><strong>${esc(PROMO.code)}</strong> is a referral token: the vendor's referral page (checked
September 2026) states referred users "receive a ${PROMO.percent}% discount on their first month's payment", and
every referral code in circulation carries that same tier. We promote it because it is the only code this site has
applied at a checkout — ${esc(verified)}. <strong>${esc(x25.code)}</strong> is the only code with a published
percentage that comes from the vendor itself, posted in the official X account's profile bio as "${x25.percent}% off
on your first payment" — official, and five points smaller.
<a href="/godel-terminal-official-promo-code/">Why the official code is the smaller one →</a></p>

<h3>ORG, and the surcharge</h3>

<p class="prose">The pricing page says teams of two or more "get a discount through the ORG plan: organization
billing, grouped seats under one entity, and a dedicated representative", and publishes no percentage; the
${ORG_PERCENT}% figure comes from in-app ORG copy in an archived build. It is per seat and recurring, so over a year
it outweighs either code — but no vendor page prints the discounted seat price. Going the other way, FINRA-licensed
users pay the ${PRICING.finraSurcharge.display}/month regulatory surcharge — $${finraMonthly}/month, or
${PRICING.annual.display} plus $${finraYear} a year on annual — and no discount here touches it.
<a href="/godel-terminal-pricing/">Full pricing breakdown →</a></p>

${note(`<strong>You get one.</strong> The referral page states the ${PROMO.percent}% discount "cannot be combined with
other promotional offers or discount codes" and that buyers "can only use one discount at checkout". So the decision
is which single row above you qualify for, top down — not how to stack them.
<a href="/cheapest-way-to-get-godel-terminal/">The decision, step by step →</a>`)}

<h2>Discount code vs promo code vs coupon vs referral code</h2>

<p class="prose">Four phrases, one checkout field. The vendor's referral page uses three of them itself: "referral
code" for the affiliate token, "discount codes" generically, and "coupon code ${esc(REFERRAL.exampleCoupon)}" as an
example of a code the referral discount will not combine with. What each means here:</p>

${table({
  head: ['Term', `What it means at a ${PRODUCT.name} checkout`],
  rows: termRows,
})}

<p class="prose">Practically: whichever phrase you searched, the code you enter is a referral token or ${esc(x25.code)},
and the discount lands once — ${PROMO.percent}% of the ${esc(PROMO.appliesTo)} for a referral code, ${x25.percent}% of
the first payment for ${esc(x25.code)}. Attribution follows the code typed at checkout, not the link that brought you
there. <a href="/godel-terminal-referral-program/">How the referral programme works →</a></p>

<h2>How to confirm the discount applied</h2>

<p class="prose">The total on the checkout screen is the only evidence. Enter ${esc(PROMO.code)} on a
<strong>paid plan</strong> checkout — not the ${PRICING.freeTrial.days}-day trial step, which has no charge to
discount — and read the total: about <strong>${firstMonthWithCode}</strong> rather than ${PRICING.monthly.display},
plus the surcharge if you are FINRA-licensed. If it has not moved, sort it out before you pay: no vendor page
publishes a way to have a missed code credited afterwards.
<a href="/how-to-redeem/">Field-by-field redemption walkthrough →</a></p>

<h2>Why the 40%, 60% and 75% "discounts" are not on this page</h2>

<p class="prose">Coupon aggregators currently advertise ${FABRICATED_CLAIMS.slice(0, 3).map((f) => `${esc(f.claim)} (${esc(f.where)})`).join('; ')},
plus three further listings in the same template, up to 80%. None of those figures has a mechanism to exist: the
referral programme has one tier at ${PROMO.percent}%, the official code is ${x25.percent}%, and the pricing page lists
no sale. The listings are generated from the merchant name, not a checkout; one moved from 50% to 60% in a month with
no vendor change. <a href="/do-godel-terminal-coupons-work/">Every claim checked one by one →</a></p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/promo-codes/', label: 'Every code compared' } })}

${faqSection(faqs)}
`;
  },
};
