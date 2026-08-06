import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const twelveMonthly = PRICING.monthly.amount * 12;
const annualSaving = twelveMonthly - PRICING.annual.amount;
const savingPct = Math.round((annualSaving / twelveMonthly) * 100);
const codeValueMonthly = (PRICING.monthly.amount * PROMO.percent / 100).toFixed(2);
const discountedFirstMonth = (PRICING.monthly.amount * (1 - PROMO.percent / 100)).toFixed(2);
const monthlyYearWithCode = Math.round(twelveMonthly - PRICING.monthly.amount * PROMO.percent / 100).toLocaleString('en-US');
const fmt = (n) => n.toLocaleString('en-US');

const faqs = [
  {
    q: `Is the ${PRODUCT.name} annual plan cheaper than monthly?`,
    a: `Yes, substantially. Annual is ${PRICING.annual.display} per ${PRICING.annual.unit} — about $${PRICING.annual.effectiveMonthly}/month equivalent. Twelve months at ${PRICING.monthly.display}/month comes to about $${fmt(twelveMonthly)}, so annual saves roughly $${fmt(annualSaving)} a year, about ${savingPct}%. Both prices are on ${PRODUCT.name}'s own pricing page as of August 2026.`,
  },
  {
    q: `Does ${PROMO.code} work on the annual plan?`,
    a: `Not vendor-documented. The referral offer is described as ${PROMO.percent}% off the ${PROMO.appliesTo}, and how that interacts with a single annual payment is not published anywhere we can cite. Enter the code and check the total on the checkout screen before paying — that number is the only authority.`,
  },
  {
    q: `How much is ${PRODUCT.name} per month?`,
    a: `${PRICING.monthly.display}/month billed monthly, or about $${PRICING.annual.effectiveMonthly}/month effective on the ${PRICING.annual.display} annual plan. Both figures are vendor-published on ${PRODUCT.name}'s pricing page as of August 2026.`,
  },
  {
    q: `Does the FINRA surcharge apply on both plans?`,
    a: `Yes — and the pricing page spells it out for both: $${PRICING.monthly.amount + PRICING.finraSurcharge.amount}/month on the monthly plan, or ${PRICING.annual.display}/year plus $${PRICING.finraSurcharge.amount * 12}/year on annual. If you are FINRA-licensed, add that to whichever column you compare.`,
  },
  {
    q: `Can I start monthly and switch to annual later?`,
    a: `${PRODUCT.name} publishes no plan-switching policy we can cite, so we will not guess at one. Starting monthly and moving to annual once the tool has proven itself is the sensible sequence either way — just confirm the mechanics with the vendor when you switch.`,
  },
];

export const page = {
  path: '/godel-terminal-monthly-vs-annual/',
  title: `Godel Terminal Monthly vs Annual: Which Plan Wins?`,
  description: `Annual is ${PRICING.annual.display}/seat — about $${PRICING.annual.effectiveMonthly}/month effective — against ${PRICING.monthly.display}/month, both vendor-published. Where the promo code lands, and who should pick which plan.`,
  summary: 'The monthly vs annual arithmetic for Godel Terminal, including where the promo code lands and the vendor-stated FINRA surcharge.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-monthly-vs-annual/', label: 'Monthly vs annual' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    const rows = [
      {
        cells: [
          '<strong>Sticker price</strong>',
          `${PRICING.monthly.display}/month <span class="badge badge-official">Vendor-stated</span>`,
          `${PRICING.annual.display}/${esc(PRICING.annual.unit)} <span class="badge badge-official">Vendor-stated</span>`,
        ],
      },
      {
        cells: [
          '<strong>Effective monthly</strong>',
          `${PRICING.monthly.display}`,
          `~$${PRICING.annual.effectiveMonthly}`,
        ],
      },
      {
        highlight: true,
        cells: [
          '<strong>Twelve-month total</strong>',
          `~$${fmt(twelveMonthly)}`,
          PRICING.annual.display,
        ],
      },
      {
        cells: [
          `<strong>${esc(PROMO.code)} (${PROMO.percent}% off ${esc(PROMO.appliesTo)})</strong>`,
          `~$${codeValueMonthly} off, once`,
          'Not vendor-documented — check at checkout',
        ],
      },
      {
        cells: [
          '<strong>Commitment</strong>',
          'Month to month',
          'One year',
        ],
      },
      {
        cells: [
          '<strong>FINRA surcharge</strong>',
          `+${PRICING.finraSurcharge.display}/month`,
          `+${PRICING.finraSurcharge.display}/month`,
        ],
      },
    ];

    return `
<h1>Godel Terminal monthly vs annual: the arithmetic</h1>

<p class="lede">Annual is <strong>${PRICING.annual.display} per ${esc(PRICING.annual.unit)}</strong> — about
$${PRICING.annual.effectiveMonthly}/month effective — against <strong>${PRICING.monthly.display}/month</strong> billed
monthly, both on ${esc(PRODUCT.name)}'s own pricing page as of August 2026. Twelve months of monthly comes to about
$${fmt(twelveMonthly)}, so annual saves roughly <strong>$${fmt(annualSaving)} a year — about ${savingPct}%</strong>.
The rest of this page is who should pick which.</p>

<h2>The numbers side by side</h2>

${table({
  head: ['', 'Monthly', 'Annual'],
  rows,
})}

${note(`<strong>Sourcing:</strong> the annual price, the monthly rate and the FINRA surcharge are all quoted from
${esc(PRODUCT.name)}'s own pricing page, checked August 2026. How the code interacts with annual billing is the one
thing not vendor-documented. Always confirm the total at checkout.`)}

<h2>Where ${esc(PROMO.code)} lands in the math</h2>

<p class="prose">${esc(PROMO.code)} takes ${PROMO.percent}% off your <strong>first month</strong>. Against the
${PRICING.monthly.display} monthly plan, that is a first month of about $${discountedFirstMonth} — a one-time
saving of roughly $${codeValueMonthly}. It is not a rate change, and it does not repeat.</p>

<p class="prose">How the code interacts with a single annual payment is <strong>not vendor-documented</strong>. The
offer is described as applying to the first month, and an annual plan does not bill in months — so we will not assert
an annual discount figure we cannot source. Enter the code, look at the total on the checkout screen, and let that
number decide. This is the same hedge we apply on the <a href="/promo-codes/">promo codes page →</a></p>

<p class="prose">One consequence worth spelling out: even with the code applied, a year of monthly billing comes to
about $${monthlyYearWithCode} — still roughly $${fmt(Math.round(twelveMonthly - PRICING.monthly.amount * PROMO.percent / 100 - PRICING.annual.amount))}
more than the ${PRICING.annual.display} annual plan. The code makes monthly cheaper to <em>try</em>; it does not make
monthly cheaper to <em>keep</em>.</p>

<h2>The line most comparisons skip</h2>

<p class="prose">${esc(PRODUCT.name)}'s pricing page lists a <strong>${PRICING.finraSurcharge.display}/month surcharge
for FINRA-licensed users</strong> — stated for both plans: $${PRICING.monthly.amount + PRICING.finraSurcharge.amount}/month
on monthly, or ${PRICING.annual.display} plus $${PRICING.finraSurcharge.amount * 12}/year on annual. If that applies to you, add
$${PRICING.finraSurcharge.amount * 12}/year to both columns before comparing against anything else you pay for.
The full fee picture, with sourcing on every figure, is on the
<a href="/godel-terminal-pricing/">pricing breakdown →</a></p>

<h2>Which plan should you pick?</h2>

<div class="grid grid-2">
  <div class="tile">
    <h3>Monthly, if you are still testing</h3>
    <p>The ${PRICING.freeTrial.days}-day trial is short for a real workflow migration. If you need more time
    to find out whether ${esc(PRODUCT.name)} actually displaces what you pay for now, a month or two at
    ${PRICING.monthly.display} — with ${esc(PROMO.code)} softening the first one — is the honest cost of a longer
    evaluation. You can walk away any month.</p>
  </div>
  <div class="tile">
    <h3>Annual, once it has replaced something</h3>
    <p>The moment ${esc(PRODUCT.name)} has genuinely displaced a paid subscription in your stack, monthly billing is
    just a ~${savingPct}% premium for flexibility you no longer need. At ${PRICING.annual.display}/year against
    ~$${fmt(twelveMonthly)} of monthly payments, annual wins by about $${fmt(annualSaving)} every year you stay.</p>
  </div>
</div>

<p class="prose">Two useful next steps: run your own stack through the
<a href="/cost-calculator/">cost calculator →</a> to see the comparison against what you currently pay, and read
<a href="/godel-terminal-free-trial/">how to actually use the trial →</a> before committing to either plan.</p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/cost-calculator/', label: 'Run your own numbers' } })}

${faqSection(faqs)}
`;
  },
};
