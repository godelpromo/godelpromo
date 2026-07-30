import { PROMO, PRODUCT, PRICING, COMPARISON_TERMINALS, CASE_STUDY } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const discountedMonthly = (PRICING.monthly.amount * (1 - PROMO.percent / 100)).toFixed(2);

const faqs = [
  {
    q: `How much does ${PRODUCT.name} cost?`,
    a: `${PRODUCT.name}'s own site advertises entry pricing at <strong>${PRICING.annual.display} per ${PRICING.annual.unit}</strong>, which works out to about $${PRICING.annual.effectiveMonthly} a month. Independent reviews report a month-to-month option at around ${PRICING.monthly.display}/month, though that figure is not published on a ${PRODUCT.name} page.`,
  },
  {
    q: `What does ${PROMO.code} bring the price down to?`,
    a: `${PROMO.code} takes ${PROMO.percent}% off the ${PROMO.appliesTo}. On a ${PRICING.monthly.display}/month plan that is a first charge of roughly $${discountedMonthly}, then standard pricing after. It is not a recurring discount.`,
  },
  {
    q: `Is there a free trial?`,
    a: `A ${PRICING.freeTrial.days}-day free trial is reported by multiple independent reviews. It is not stated on ${PRODUCT.name}'s marketing homepage, so confirm availability at signup. See our <a href="/godel-terminal-free-trial/">free trial page</a>.`,
  },
  {
    q: `Are there extra fees?`,
    a: `Independent reviews report an additional <strong>${PRICING.finraSurcharge.display}/month surcharge for FINRA-registered users</strong>. This is a common structure for market-data products, since exchange data is licensed differently for registered professionals. Verify your own status at checkout — it can materially change the total.`,
  },
  {
    q: `Is annual or monthly better value?`,
    a: `Annual, substantially. At ${PRICING.annual.display} per year against a reported ${PRICING.monthly.display}/month, annual costs about $${PRICING.annual.effectiveMonthly}/month equivalent — roughly ${Math.round((1 - PRICING.annual.effectiveMonthly / PRICING.monthly.amount) * 100)}% less. The trade-off is that ${PROMO.code} only discounts one billing period, so its cash value is larger on a monthly plan even though the annual plan is cheaper overall.`,
  },
  {
    q: `Can I cancel?`,
    a: `Monthly plans are reported to be cancellable at any time without a cancellation fee; annual plans commit for the year. Confirm the terms that apply to you before paying.`,
  },
];

export const page = {
  path: '/godel-terminal-pricing/',
  title: `Godel Terminal Pricing ${new Date().getFullYear()}: Real Costs and Fees`,
  description: `Godel Terminal costs $996/seat/year. Plus the reported monthly rate, the FINRA surcharge most comparisons omit, and what ${PROMO.code} actually saves.`,
  summary: 'Godel Terminal pricing broken down with sourcing — annual, monthly, the FINRA surcharge, and what the promo code is actually worth.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/godel-terminal-pricing/', label: 'Pricing' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.9',
  render() {
    const planRows = [
      {
        highlight: true,
        cells: [
          '<strong>Annual</strong>',
          PRICING.annual.display,
          `per ${esc(PRICING.annual.unit)}`,
          `~$${PRICING.annual.effectiveMonthly}/mo equivalent`,
          '<span class="badge badge-official">Vendor-stated</span>',
        ],
      },
      {
        cells: [
          '<strong>Monthly</strong>',
          PRICING.monthly.display,
          'per month',
          `$${discountedMonthly} first month with ${esc(PROMO.code)}`,
          '<span class="badge badge-reported">Third-party</span>',
        ],
      },
      {
        cells: [
          '<strong>FINRA surcharge</strong>',
          `+${PRICING.finraSurcharge.display}`,
          'per month',
          'Applies to FINRA-registered users',
          '<span class="badge badge-reported">Third-party</span>',
        ],
      },
      {
        cells: [
          '<strong>Free trial</strong>',
          `${PRICING.freeTrial.days} days`,
          '—',
          'Reported; confirm at signup',
          '<span class="badge badge-reported">Third-party</span>',
        ],
      },
    ];

    const compareRows = COMPARISON_TERMINALS.map((t) => ({
      highlight: !!t.highlight,
      cells: [
        `<strong>${esc(t.name)}</strong>`,
        t.display,
        esc(t.note),
      ],
    }));

    return `
<h1>Godel Terminal pricing in ${new Date().getFullYear()}</h1>

<p class="lede">Most pricing pages for ${esc(PRODUCT.name)} state a single number with total confidence.
The honest position is that ${esc(PRODUCT.name)} publishes one price on its own site and the rest circulates
second-hand. This page marks which is which.</p>

${note(`<strong>How to read this page:</strong> figures tagged <span class="badge badge-official">Vendor-stated</span>
come from ${esc(PRODUCT.name)}'s own website. Figures tagged <span class="badge badge-reported">Third-party</span>
are corroborated across independent reviews but do not appear on a vendor page. Always confirm the total at checkout.`)}

<h2>Plans and fees</h2>

${table({
  head: ['Plan', 'Price', 'Unit', 'Notes', 'Source'],
  rows: planRows,
})}

<p class="prose">The line most comparisons omit is the third one. A
<strong>${PRICING.finraSurcharge.display}/month FINRA surcharge</strong> is a ~${Math.round((PRICING.finraSurcharge.amount * 12 / PRICING.annual.amount) * 100)}%
increase on the annual seat price, and if you are registered it applies to you. It is not a hidden fee —
exchange data genuinely costs more to license for registered professionals — but it changes the arithmetic
enough that you should know before you compare.</p>

<h2>What ${esc(PROMO.code)} is actually worth</h2>

${codeBox({ note: `${PROMO.percent}% off the ${PROMO.appliesTo} — about $${(PRICING.monthly.amount * PROMO.percent / 100).toFixed(2)} on a monthly plan.` })}

<p class="prose">On a reported ${PRICING.monthly.display}/month plan, ${PROMO.percent}% off the ${esc(PROMO.appliesTo)}
saves roughly <strong>$${(PRICING.monthly.amount * PROMO.percent / 100).toFixed(2)}</strong> once. That is a real saving
and it is worth taking — but it is one month, not a rate change. Anyone framing a first-month referral discount as
"save 30% on ${esc(PRODUCT.name)}" is describing something that does not happen.</p>

<p class="prose">There is a mild irony worth flagging: the discount is worth more in cash on the
<em>monthly</em> plan, but the annual plan is far cheaper overall. If you already know you want the product,
annual wins even though the code looks smaller against it.</p>

<h2>How that compares to other terminals</h2>

<p class="prose">${esc(PRODUCT.name)} anchors its own marketing against "a $30,000 terminal", and its published
case study claims a fund saved ${esc(CASE_STUDY.savings)} switching. Here is the wider field, per seat per year:</p>

${table({
  head: ['Terminal', 'Annual per seat', 'Notes'],
  rows: compareRows,
})}

<p class="prose faint">Every figure except ${esc(PRODUCT.name)}'s is an approximate market-reported rate.
Enterprise terminal pricing is negotiated, module-dependent and rarely published, so treat these as
order-of-magnitude rather than quotes. Run your own numbers in the
<a href="/cost-calculator/">cost calculator</a>.</p>

<h2>Who the price actually suits</h2>

<div class="grid grid-2">
  <div class="tile">
    <h3>Good value if…</h3>
    <p>You need real-time quotes, filings, standardized financials and news in one place, you are currently
    paying for two or three separate data subscriptions, and you do not need fixed income, derivatives analytics
    or messaging.</p>
  </div>
  <div class="tile">
    <h3>Poor value if…</h3>
    <p>You only need charting — TradingView covers that for a fraction. Or you need the parts of a legacy terminal
    that ${esc(PRODUCT.name)} does not replicate: the messaging network, fixed income depth, or execution.</p>
  </div>
</div>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/godel-terminal-vs-bloomberg/', label: 'Compare against Bloomberg' } })}

${faqSection(faqs)}
`;
  },
};
