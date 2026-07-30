import { PROMO, PRODUCT, PRICING, COMPARISON_TERMINALS } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: 'Where do these prices come from?',
    a: `${PRODUCT.name}'s ${PRICING.annual.display}/seat/year is published on its own website. Every other figure is an approximate market-reported rate — enterprise terminal pricing is negotiated, module-dependent and rarely published, so treat the comparisons as order-of-magnitude rather than quotes.`,
  },
  {
    q: 'Does this include the FINRA surcharge?',
    a: `No. Independent reviews report an additional ${PRICING.finraSurcharge.display}/month for FINRA-registered users, which would add $${PRICING.finraSurcharge.amount * 12} per seat per year. Add it manually if it applies to you.`,
  },
  {
    q: 'Does it account for the promo code?',
    a: `No, deliberately. ${PROMO.code} discounts the ${PROMO.appliesTo} only, so on a multi-year total-cost view it rounds to noise. It is worth taking — it is just not a factor in a seat-count decision.`,
  },
];

export const page = {
  path: '/cost-calculator/',
  title: `Financial Terminal Cost Calculator: Godel vs Bloomberg`,
  description: `Compare multi-seat, multi-year costs across Godel Terminal, Bloomberg, LSEG, FactSet, Koyfin and TradingView. Model your desk's real spend.`,
  summary: 'Interactive multi-seat, multi-year cost comparison across the major financial terminals.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/cost-calculator/', label: 'Cost calculator' },
  ],
  faqs,
  priority: '0.8',
  render() {
    const bars = COMPARISON_TERMINALS.map((t) => {
      const flags = [
        `data-annual="${t.annual}"`,
        t.highlight ? 'data-godel' : '',
        /Bloomberg/.test(t.name) ? 'data-bloomberg' : '',
      ].filter(Boolean).join(' ');
      return `<div class="bar-row${t.highlight ? ' is-highlight' : ''}" ${flags}>
  <span>${esc(t.name)}</span>
  <span class="bar-track"><span class="bar-fill"></span></span>
  <span class="bar-value">—</span>
</div>`;
    }).join('\n');

    return `
<h1>Financial terminal cost calculator</h1>

<p class="lede">Terminal pricing is quoted per seat, but the decision is almost never about one seat.
Move the sliders to see what each product actually costs your desk over the horizon you care about.</p>

<div class="card calc" data-calc>
  <div class="calc-controls">
    <label for="seats">Seats</label>
    <input id="seats" type="range" min="1" max="50" value="5" data-seats>
    <output data-seats-out>5 seats</output>

    <label for="years">Time horizon</label>
    <input id="years" type="range" min="1" max="10" value="3" data-years>
    <output data-years-out>3 years</output>

    <p class="faint" style="font-size:13px;margin-top:22px">
      Difference between ${esc(PRODUCT.name)} and Bloomberg over this period:
    </p>
    <p><span class="stat" data-savings>—</span></p>
  </div>

  <div>
${bars}
    <p class="faint" style="font-size:13px;margin-top:18px">
      Total cost of ownership, seats &times; years. Excludes the FINRA surcharge,
      data add-ons, and any negotiated enterprise discount.
    </p>
  </div>
</div>

${note(`<strong>A caveat that matters:</strong> only ${esc(PRODUCT.name)}'s ${PRICING.annual.display} figure is
vendor-published. Bloomberg, LSEG, FactSet and the rest negotiate heavily and rarely publish list pricing, so those
bars are market-reported approximations. Use this to understand the shape of the decision, not to build a budget.`)}

<h2>What the shape tells you</h2>

<p class="prose">Two things become obvious once you move the seat slider:</p>

<ol class="prose">
  <li><strong>The gap compounds.</strong> At one seat, the difference between ${esc(PRODUCT.name)} and Bloomberg is
  interesting. At twenty seats over five years it is a headcount decision.</li>
  <li><strong>The mid-market is crowded.</strong> Koyfin and TradingView sit close enough to ${esc(PRODUCT.name)} that
  price alone will not decide between them — that comparison comes down to whether you need filings, standardized
  financials and consensus estimates, or just charts and quotes.</li>
</ol>

<p class="prose">Which is why the real question is not cost but coverage. If ${esc(PRODUCT.name)} covers your
workflow it is dramatically cheaper; if it misses one thing you depend on daily, the saving is irrelevant.
Our <a href="/godel-terminal-vs-bloomberg/">function-by-function comparison</a> maps the overlap, and the
<a href="/godel-terminal-commands/">command reference</a> lists exactly what is documented.</p>

<h2>Try it before you model it</h2>

<p class="prose">A reported ${PRICING.freeTrial.days}-day trial settles the coverage question faster than any
spreadsheet. If you subscribe, ${esc(PROMO.code)} takes ${PROMO.percent}% off the ${esc(PROMO.appliesTo)}.</p>

${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-pricing/', label: 'Pricing detail' } })}

${faqSection(faqs)}
`;
  },
};
