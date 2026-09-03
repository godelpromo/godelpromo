import { PROMO, PRODUCT, PRICING, STUDENT, REFERRAL, KNOWN_CODES, REFERRAL_CODES, FABRICATED_CLAIMS } from '../data/site.mjs';
import { CODE_SITES } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc, longDate } from '../lib/components.mjs';

const x25 = KNOWN_CODES.find((c) => c.official);
const verified = longDate(PROMO.lastVerified);
const firstMonth = (PRICING.monthly.amount * (1 - PROMO.percent / 100)).toFixed(2);
const otherReferralCount = REFERRAL_CODES.filter((c) => !c.ours).length;

/**
 * The three-letter code fragments Coupert's godelterminal.com listing showed
 * behind its "Show Code" button when it was last recorded. Every URL form for
 * that listing failed on 3 September 2026 (404 for /coupon/godelterminal.com,
 * 410 Gone for /store/godelterminal.com), so the fragments are reported as last
 * recorded rather than as live. Matched against the referral tokens in
 * KNOWN_CODES at render time so the sentence stays true as the code list grows.
 */
const COUPERT_FRAGMENTS = ['PRO', 'AVE', 'AGO'];
const fragmentMatches = COUPERT_FRAGMENTS.map((f) => ({
  f,
  codes: REFERRAL_CODES.filter((c) => c.code.endsWith(f)).map((c) => c.code),
}));
const unmatched = fragmentMatches.filter((m) => !m.codes.length).map((m) => m.f);
const matched = fragmentMatches.filter((m) => m.codes.length);
const fragmentSentence = matched.length
  ? `${unmatched.join(' and ')} match the ending of no referral token this site tracks; ${matched
    .map((m) => `${m.f} could be the tail of ${m.codes.join(' or ')}`)
    .join('; ')} — a referral code on the same ${PROMO.percent}% tier, which would make that entry a ${PROMO.percent}% code under a 60% headline.`
  : 'none of them matches the ending of any referral token this site tracks.';

/**
 * What each listing in FABRICATED_CLAIMS returned when fetched on
 * 3 September 2026, keyed by `where`. A blocked fetch is reported as blocked
 * rather than dropped, so the reader knows which claims were re-checked.
 */
const STATUS_2026_09_03 = {
  Dealspotr: 'Returned HTTP 403; not retrievable. The 40% headline stands as last recorded.',
  WorthEPenny: 'Behind a bot check; not retrievable. The 50%-to-60% rotation stands as recorded.',
  Tenereteam: 'Returned HTTP 403; not retrievable. TENERE and HARDWARE still match no referral token.',
  Knoji: 'Returned HTTP 403; not retrievable.',
  Goodsearch: 'Live. One sentence of its FAQ reads: "The best promotion available for Godel Terminal is 80% off - this code will give you 25% Off." It counts "12 coupons" in one place and "all 30 codes available" in another, files the product under "Miscellaneous", and names exactly one code string — GET55, which matches no referral token this site tracks.',
  'Aggregator listings': 'A derived figure; nothing to fetch.',
};

const faqs = [
  {
    q: 'Is there a Godel Terminal coupon code for 2026?',
    a: `Yes, in the only form that exists: a referral code. Every referral code gives ${PROMO.percent}% off the ${PROMO.appliesTo}, and ${PROMO.code} was last applied at a real checkout on ${esc(verified)}. ${esc(PRODUCT.name)} has published no 2026-specific coupon, seasonal sale or sitewide discount — its pricing page, checked September 2026, lists the plans, the ${PRICING.freeTrial.days}-day trial, the FINRA surcharge, an unpriced ORG team discount, its own FAQ and an "In Godel today / Working on" feature list — and no coupon field, seasonal offer or sale.`,
  },
  {
    q: 'What is the best Godel Terminal coupon code?',
    a: `For anyone without a .edu email, any referral code — they all apply the same ${PROMO.percent}% to the ${PROMO.appliesTo}. ${PROMO.code} is the one with a checkout verification date (${esc(verified)}) and the only code this site has promoted. With a .edu email, skip the codes: the <a href="/godel-terminal-student-discount/">announced student rate is ${esc(STUDENT.display)}/month</a>, though confirm it is still live first.`,
  },
  {
    q: 'Does Honey or Capital One Shopping find a Godel Terminal coupon?',
    a: `Not one we can point to. Both extensions describe themselves as testing known codes at checkout, and on 3 September 2026 neither had a store page at its standard URL for godelterminal.com (both returned 404). Even where an extension holds a listing, the vendor allows one discount per checkout and the ceiling is the ${PROMO.percent}% referral tier — the same thing you can type yourself.`,
  },
  {
    q: `Is NVDA a working Godel Terminal coupon code?`,
    a: `Not published. The referral FAQ on godelterminal.com mentions "coupon code ${esc(REFERRAL.exampleCoupon)}" once, as an example of a code the ${PROMO.percent}% referral discount cannot be combined with. Its percentage, its dates and whether it was ever live are stated nowhere we can find. Treat it as a placeholder, not an offer.`,
  },
  {
    q: `Can I stack a coupon with ${PROMO.code}?`,
    a: `No. The vendor's referral FAQ states the referral discount "cannot be combined with other discount codes" and that "your friends can only use one discount at checkout" (checked 3 September 2026). One code per checkout, and the largest code with a published percentage is ${PROMO.percent}%.`,
  },
  {
    q: 'Is there a Godel Terminal Black Friday coupon?',
    a: `Only in name. BLACKFRIDAY and CYBERMONDAY are referral tokens promoted by one affiliate site, worth the same ${PROMO.percent}% off the ${PROMO.appliesTo} as every other referral code, in any month. No vendor-run Black Friday sale is published. <a href="/godel-terminal-black-friday/">The Black Friday page →</a>`,
  },
];

export const page = {
  path: '/godel-terminal-coupon-code/',
  title: 'Godel Terminal Coupon Code 2026: 30% Off, Nothing Higher',
  description: `The Godel Terminal coupon code that applies is a 30% first-month referral code like ${PROMO.code}. Why 40-80% coupon listings are fiction, what extensions find.`,
  summary: 'The only Godel Terminal coupon that applies is the 30% first-month referral tier; the coupon-aggregator listings and browser extensions, checked one by one.',
  datePublished: '2026-09-03',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/godel-terminal-coupon-code/', label: 'Coupon code' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.9',
  render() {
    const claimRows = [
      ...FABRICATED_CLAIMS.map((f) => ({
        cells: [esc(f.claim), esc(f.where), esc(f.reality), esc(STATUS_2026_09_03[f.where] || 'Not re-checked.')],
      })),
      {
        cells: [
          esc('Up to 60% off, four codes "Worked just now"'),
          'Coupert',
          esc(`No 60% tier exists. The four entries all "expire" 30 September 2026 and show only the fragments ${COUPERT_FRAGMENTS.join(', ')} behind a "Show Code" button. The page also promises free shipping and 30-day returns on a browser subscription.`),
          esc('Not retrievable on 3 September 2026 — coupert.com returned 404 for /coupon/godelterminal.com and 410 Gone for /store/godelterminal.com. The claim stands as last recorded, including an extension advert lower on the same page reading "Save Up to 30%" against the headline above it.'),
        ],
      },
    ];

    return `
<h1>Godel Terminal Coupon Code: ${PROMO.percent}% off the first month, and nothing higher at checkout</h1>

<p class="lede">The ${esc(PRODUCT.name)} coupon code that applies at checkout is a referral code:
<strong class="mono">${esc(PROMO.code)}</strong> takes <strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)} of
${esc(PRODUCT.name)}</strong>, and was last applied at a real checkout on <strong>${esc(verified)}</strong>. It is the
only code this site has ever promoted, and no coupon above ${PROMO.percent}% is published anywhere we can find. The
vendor's pricing page, checked September 2026, advertises no coupon and no seasonal sale — the savings it names
are the annual plan's "Save 30%" label and an unpriced ORG discount for teams — and every 40%, 60%, 75% or 80%
figure in the coupon results traces to an auto-generated aggregator listing, each one checked below.</p>

${codeBox()}

<h2>What a "coupon" means for a one-product subscription</h2>

<p class="prose">Coupon language comes from retail: sitewide sales, clearance, stackable codes. ${esc(PRODUCT.name)}
sells one subscription at one price sheet — ${PRICING.monthly.display} a month or ${PRICING.annual.display} per
${esc(PRICING.annual.unit)}, per the vendor's pricing page in September 2026 — and the only "sale" that page
advertises is the annual plan itself, labelled "Save 30%" against twelve monthly payments. Within that, a coupon code can be one
of three things:</p>

<ul class="prose">
  <li><strong>A referral code.</strong> The vendor's referral page (checked 3 September 2026) sets one tier: a
  ${PROMO.percent}% discount "only applied to the first payment". ${esc(PROMO.code)}, NEWUSER, GET30, SHKRELI and
  ${otherReferralCount - 3} other tokens all sit on it and differ only in who is credited —
  <a href="/promo-codes/">every code, compared</a>.</li>
  <li><strong>A vendor coupon.</strong> The same FAQ says the discount "cannot be combined with other discount codes
  (e.g., coupon code ${esc(REFERRAL.exampleCoupon)})". That is the only coupon of its own ${esc(PRODUCT.name)} names
  anywhere on its own website, and it appears purely as an example of something you cannot stack:
  ${esc(REFERRAL.exampleCoupon)}'s percentage, dates and current status are not published. The one code the vendor has actually published is
  <a href="/godel-terminal-official-promo-code/">${esc(x25.code)}, at ${x25.percent}%</a>, in its X profile —
  smaller than the referral tier.</li>
  <li><strong>Not a code at all.</strong> The deeper discounts are account states, not strings: the announced
  <a href="/godel-terminal-student-discount/">${esc(STUDENT.display)}/month student rate</a> (.edu email; confirm it is
  still live), the <a href="/godel-terminal-brokerage-link/">brokerage-linked rate</a> reported in archived vendor
  in-app copy, and the ORG discount for teams. None is entered in a promo field.</li>
</ul>

${note(`<strong>The ceiling is set by the vendor, not by coupon sites.</strong> The referral FAQ states that "your
friends can only use one discount at checkout". One code, one tier, ${PROMO.percent}% of one month — whichever coupon
page you arrived from.`)}

<h2>The coupon listings, checked one by one</h2>

<p class="prose">These are the coupon listings for godelterminal.com that this site tracks. The first three columns
are the standing record of each claim; the last is what the listing returned when fetched on 3 September 2026.
Where a listing blocked the fetch, the table says so rather than pretending it was re-verified.</p>

${table({
  head: ['The claim', 'Where', 'Reality', 'Status, 3 September 2026'],
  rows: claimRows,
})}

<p class="prose">The Coupert row is the instructive one, because it is the listing an extension user is most likely
to meet. As last recorded its headline said 60%; its own extension advert on the same page said 30%; its descriptive
copy said the merchant sources "the latest fashion products". Nothing in it shows any sign of a
${esc(PRODUCT.name)} checkout — a merchant name dropped into a retail template.</p>

<h2>Why the numbers rotate</h2>

<p class="prose">The figures move because they are fields, not findings. Coupert's entries, as last recorded, all
expired on 30 September 2026 under a title carrying "September 2026" — both template fields rather than vendor
dates. Goodsearch's FAQ manages "80% off" and "25% Off" in the same sentence, and explains coupon failures with
an example about sunglasses frames. Dealspotr's title has
been frozen at "Nov 2025" for months. That is what a per-merchant template produces when the merchant is a
single-subscription research terminal and the template was written for shoes. The full mechanics, and how to spot a
fabricated coupon in ten seconds, are on the <a href="/do-godel-terminal-coupons-work/">debunk page</a>; this page
adds the extension layer that page does not cover.</p>

<h2>What coupon browser extensions can and cannot find here</h2>

<p class="prose">The extensions describe their own method plainly. Honey: "With a single click, we'll test codes at
checkout" (joinhoney.com, September 2026). Capital One Shopping: it "automatically applies coupon codes at checkout"
(capitaloneshopping.com, September 2026). Coupert: it "can test and apply all promo codes with one click" (its
godelterminal.com listing as last recorded; that URL did not resolve on 3 September 2026). The input is always the
codes already in the extension's database, which for a niche merchant means the publicly listed ones. What those databases hold for godelterminal.com:</p>

<ul class="prose">
  <li><strong>Honey and Capital One Shopping:</strong> the standard store-page URL for godelterminal.com on each
  service returned 404 on 3 September 2026. Nothing to test from.</li>
  <li><strong>RetailMeNot:</strong> could not be retrieved, so not reported here.</li>
  <li><strong>Coupert:</strong> a listing whose store URL no longer resolved on 3 September 2026; as last recorded its
  visible fragments were ${COUPERT_FRAGMENTS.join(', ')}. Of those,
  ${fragmentSentence}</li>
</ul>

<p class="prose">Three consequences. The best outcome an extension can produce is a ${PROMO.percent}% referral code,
which you can type yourself in six keystrokes. It cannot stack anything, because the vendor allows one discount per
checkout. And if an extension swaps in a different referral token than the one you entered, your price does not
change — the referral FAQ states that attribution follows the code used at checkout, so the only thing that moves is
who is credited for the signup. That is why this site asks you to enter ${esc(PROMO.code)} directly rather than
rely on a link or a plugin.</p>

<h2>How to confirm the coupon applied</h2>

<ol class="prose">
  <li><strong>Be on a paid checkout, not the trial.</strong> Every plan starts with a ${PRICING.freeTrial.days}-day
  free trial (vendor pricing page, September 2026), and a trial has no charge for a code to reduce.</li>
  <li><strong>Apply the code explicitly</strong> and watch the total. ${PROMO.percent}% off the
  ${PRICING.monthly.display} monthly plan should read roughly <strong>$${firstMonth}</strong> for the first charge.</li>
  <li><strong>Annual billing is the open question.</strong> The referral page says referred users receive the
  discount "on their first month's subscription", and that it is "only applied to the first payment". One affiliate
  site — ${esc(CODE_SITES.NEWUSER.site)} — states the code applies to the monthly plan with annual excluded; the
  vendor page does not address it, and saveontrading.com's deal page could not be retrieved on 3 September 2026, so
  nothing is claimed for it here. Confirm at checkout before paying annual, and note the annual plan is already ${PRICING.annual.display} against
  $${PRICING.monthly.amount * 12} of monthly payments — <a href="/godel-terminal-monthly-vs-annual/">the arithmetic</a>.</li>
  <li><strong>If the total has not moved, the code has not applied.</strong> Do not assume a later credit.</li>
</ol>

<p class="prose"><a href="/how-to-redeem/">Field-by-field redemption guide →</a> Searching under a different word?
<a href="/godel-terminal-discount-code/">Discount code</a> and <a href="/promo-codes/">promo code</a> lead to the
same ${PROMO.percent}%, and the <a href="/cheapest-way-to-get-godel-terminal/">cheapest route overall</a> may not be
a code at all.</p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/do-godel-terminal-coupons-work/', label: 'Every fabricated coupon, checked' } })}

${faqSection(faqs)}
`;
  },
};
