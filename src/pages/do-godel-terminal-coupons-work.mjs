import { PROMO, PRODUCT, STUDENT, KNOWN_CODES, FABRICATED_CLAIMS } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, tiles, note, esc } from '../lib/components.mjs';

const x25 = KNOWN_CODES.find((c) => c.official);

const faqs = [
  {
    q: 'Does any 40%, 50% or 75% Godel Terminal code exist?',
    a: `No. The discounts that exist are the ${PROMO.percent}% referral tier (first month only), the official ${esc(x25.code)} code at ${x25.percent}%, and the ${esc(STUDENT.display)}/month student rate. Every advertised figure above ${PROMO.percent}% traces to an auto-generated aggregator listing, and none applies at checkout.`,
  },
  {
    q: 'Why do coupon sites advertise Godel Terminal discounts that do not exist?',
    a: `Clicks. Aggregator listings are generated automatically, discount figures included, and being wrong costs the aggregator nothing — the failure happens later, at your checkout. The listing exists to rank for the search, not to be accurate.`,
  },
  {
    q: 'What is the biggest real Godel Terminal discount?',
    a: `If you have a .edu email and a student ID, the <a href="/godel-terminal-student-discount/">student rate at ${esc(STUDENT.display)}/month</a>. Otherwise, ${PROMO.percent}% off your first month with any referral code — ${PROMO.code} or any of its <a href="/promo-codes/">identical alternatives</a>.`,
  },
  {
    q: 'Is there a Godel Terminal military discount?',
    a: `No published one. The claim appears in one aggregator's auto-generated boilerplate, alongside a fabricated 50% tier, and ${esc(PRODUCT.name)} publishes no military program anywhere we can find. If that changes, this page will say so.`,
  },
];

export const page = {
  path: '/do-godel-terminal-coupons-work/',
  title: 'Do 40%, 50% or 75% Godel Terminal Coupons Work? No.',
  description: 'Dealspotr advertises 40% off, WorthEPenny 50%, Tenereteam 75%. None applies at checkout. How fabricated Godel Terminal coupons happen and how to spot one.',
  summary: 'Every Godel Terminal coupon claim above 30% is fabricated by aggregators. The claims checked one by one, and how to spot a fake.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/do-godel-terminal-coupons-work/', label: 'Do coupons work' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.8',
  render() {
    const claimRows = FABRICATED_CLAIMS.map((f) => ({
      cells: [esc(f.claim), esc(f.where), esc(f.reality)],
    }));

    return `
<h1>Do 40%, 50% or 75% Godel Terminal coupons work? No.</h1>

<p class="lede">No coupon above ${PROMO.percent}% applies at a ${esc(PRODUCT.name)} checkout. Three discounts
actually exist: the <strong>${PROMO.percent}%-off-first-month referral codes</strong>, the official
<strong>${esc(x25.code)} code at ${x25.percent}%</strong>, and a <strong>${esc(STUDENT.display)}/month student
rate</strong>. Every larger figure you have seen advertised is fabricated, and this page checks each one.</p>

<h2>The claims, checked</h2>

${table({
  head: ['The claim', 'Where it appears', 'Reality'],
  rows: claimRows,
})}

<h2>How fabricated coupons happen</h2>
<p class="prose">There is no conspiracy here, just automation. Coupon aggregators generate listings for any
merchant name that gets searched, and the discount figures are generated along with them — no one at the
aggregator has seen a ${esc(PRODUCT.name)} checkout. Then the listings rot: titles freeze at old
month-stamps, "active code" counts drift, and scraped averages of fabricated numbers become new fabricated
numbers ("average saving 34%").</p>
<p class="prose">The tell that the whole category is fiction: ${esc(PRODUCT.name)} is a single-subscription
product. It has no "sitewide" sale, because there is no "site-wide" to discount — one product, one
price sheet, one referral tier. Any claim shaped like retail couponry ("sitewide", "clearance", "stackable")
fails on contact with what the product is.</p>

<h2>The discounts that actually exist</h2>

${tiles([
  {
    title: `${PROMO.percent}% off first month — referral codes`,
    body: `${esc(PROMO.code)} and every other referral token apply the programme's single tier. <a href="/promo-codes/">All codes compared →</a>`,
  },
  {
    title: `${x25.percent}% — official code ${esc(x25.code)}`,
    body: `Posted by the official @GodelTerminal X account. Real, official, and smaller than the referral tier. <a href="/godel-terminal-official-promo-code/">The honest math →</a>`,
  },
  {
    title: `${esc(STUDENT.display)}/month — student rate`,
    body: `Sign up with a .edu email and send your student ID. The biggest real discount, if you qualify. <a href="/godel-terminal-student-discount/">How it works →</a>`,
  },
])}

<h2>How to spot a fake Godel coupon</h2>
<ul class="prose">
  <li><strong>The percentage is impossible.</strong> The referral programme has one tier, ${PROMO.percent}%,
  first month only. Anything above it — 40, 50, 75 — has no mechanism to exist.</li>
  <li><strong>The code matches no known token.</strong> We track every code in circulation. "Hand-tested" codes
  like TENERE and HARDWARE match none of them.</li>
  <li><strong>The freshness is fake.</strong> Auto-rotating or frozen month-stamps ("Nov 2025" months later,
  listings stale since September 2025) are template output, not verification.</li>
  <li><strong>The testing claim is boilerplate.</strong> "Hand-tested on real orders" with no date, no method
  and no checkout total is the same sentence on every merchant page the aggregator generates.</li>
</ul>

${note(`A verification date should be a truth claim. Ours on ${esc(PROMO.code)} reads
<strong>${esc(PROMO.lastVerified)}</strong> because that is when the code was last actually applied at a real
checkout — and it only changes when that happens again.`)}

${codeBox()}

<p class="prose">Codes also circulate on Reddit — same referral tokens, no exclusives:
<a href="/godel-terminal-promo-code-reddit/">the fact-checked Reddit rundown →</a> And how the redemption
actually works, field by field: <a href="/how-to-redeem/">the step-by-step guide →</a></p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/promo-codes/', label: 'Every real code, compared' } })}

${faqSection(faqs)}
`;
  },
};
