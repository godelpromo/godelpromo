import { PROMO, PRODUCT, PRICING, KNOWN_CODES } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const holidayCodes = KNOWN_CODES.filter((c) => c.code === 'BLACKFRIDAY' || c.code === 'CYBERMONDAY');
const ourCode = KNOWN_CODES.find((c) => c.ours);

const faqs = [
  {
    q: `Will there be a real ${PRODUCT.name} Black Friday sale?`,
    a: `Unknown. Whether a genuine seasonal sale ever runs is ${PRODUCT.name}'s decision, and we have found no record of one so far. If a real November promotion appears we will list it. Until then, the ${PROMO.percent}%-off-${PROMO.appliesTo} referral offer is the only discount that exists.`,
  },
  {
    q: `Does the BLACKFRIDAY code expire after November?`,
    a: `No. BLACKFRIDAY is a referral token, not a dated seasonal promotion — it is being promoted and applying its standard discount in high summer, months from any holiday, and referral tokens persist for as long as the affiliate account behind them is active and ${PRODUCT.name} keeps its referral programme running.`,
  },
  {
    q: `Is there a bigger holiday-only code?`,
    a: `No. The referral programme has a single discount tier: ${PROMO.percent}% off the ${PROMO.appliesTo}. Every referral code, holiday-named or not, applies that same tier — and the one non-referral code, the official X25, is smaller at 25%. Larger November numbers you may see advertised come from coupon aggregators and will not apply at checkout.`,
  },
  {
    q: `Should I wait until Black Friday to subscribe to ${PRODUCT.name}?`,
    a: `Nothing is gained by waiting. The ${PROMO.percent}% first-month referral discount is available year-round, and no seasonal sale has been observed that would beat it. If the tool would be useful to you now, the only thing waiting buys is months without it.`,
  },
];

export const page = {
  path: '/godel-terminal-black-friday/',
  title: `Godel Terminal Black Friday & Cyber Monday: The Honest Deal`,
  description: `BLACKFRIDAY and CYBERMONDAY are Godel Terminal referral codes, not seasonal sales. What actually discounts in November, and why ${PROMO.percent}% off month one is the ceiling.`,
  summary: 'Why the BLACKFRIDAY and CYBERMONDAY codes are ordinary year-round referral tokens, and what is actually known about Godel Terminal seasonal sales.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/godel-terminal-black-friday/', label: 'Black Friday' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.8',
  render() {
    const rows = [
      {
        highlight: true,
        cells: [
          `<strong class="mono">${esc(ourCode.code)}</strong> <span class="badge badge-official">Ours</span>`,
          `${PROMO.percent}%`,
          esc(PROMO.appliesTo),
          'No — works year-round',
          esc(ourCode.source),
        ],
      },
      ...holidayCodes.map((c) => ({
        cells: [
          `<strong class="mono">${esc(c.code)}</strong>`,
          `${PROMO.percent}%`,
          esc(PROMO.appliesTo),
          'No — works year-round',
          esc(c.source),
        ],
      })),
    ];

    return `
<h1>Godel Terminal Black Friday and Cyber Monday: what actually discounts</h1>

<p class="lede">There are ${esc(PRODUCT.name)} codes named <strong class="mono">BLACKFRIDAY</strong> and
<strong class="mono">CYBERMONDAY</strong> — ordinary referral tokens targeting the same
<strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)}</strong> as every other code, in November and in April alike.
We have found no record of ${esc(PRODUCT.name)} ever running an actual seasonal sale.</p>

${codeBox()}

<h2>The codes exist. The sale does not.</h2>

<p class="prose">${esc(PRODUCT.name)} runs a referral programme with a single discount tier: whoever's code you enter
at checkout, you get ${PROMO.percent}% off your ${esc(PROMO.appliesTo)} and the affiliate behind the code earns a
commission. One of those codes happens to carry the name BLACKFRIDAY. That is the entire
story. The name implies a seasonal event; the token behind it is identical to
<a href="/promo-codes/">every other code in circulation →</a></p>

${table({
  head: ['Code', 'Discount', 'Applies to', 'Seasonal?', 'Promoted by'],
  rows,
})}

<h2>How we can tell they are not seasonal</h2>

<p class="prose">The giveaway is that BLACKFRIDAY and CYBERMONDAY resolve in spring. A genuine Black Friday promotion
is dated — it exists for a window and then it does not. A referral token persists as long as the affiliate account
behind it does. These codes are being promoted in August, nowhere near November, targeting the standard ${PROMO.percent}% first-month
referral discount, which is exactly what a year-round token does and exactly what a seasonal sale cannot do. Our own
code, which carries the identical offer, was last verified at checkout on ${esc(PROMO.lastVerified)}.</p>

${note(`<strong>Will a real sale ever happen?</strong> We do not know. That decision belongs to ${esc(PRODUCT.name)},
and nothing on its site announces one. If a genuine seasonal promotion ever appears, we will report it. What we can
say is what has been observable so far: one referral tier, ${PROMO.percent}% off the ${esc(PROMO.appliesTo)}, all year.`)}

<h2>What you will see advertised in November</h2>

<p class="prose">Coupon aggregators generate holiday listings automatically, and for ${esc(PRODUCT.name)} the results
are fiction: claims of 40% off sitewide and even 75% off circulate on aggregator pages today. No such discount tiers
exist. The referral programme offers ${PROMO.percent}% off the ${esc(PROMO.appliesTo)}, and no code in circulation
delivers more. If a November listing advertises a bigger number, it will not survive contact with the checkout
screen. We keep a running list of these fabricated claims on the
<a href="/promo-codes/">promo codes page →</a></p>

<h2>Should you wait for November?</h2>

<p class="prose">No. The arithmetic does not change with the calendar: the discount available on Black Friday is the
same ${PROMO.percent}% off the ${esc(PROMO.appliesTo)} that is available today, applied through the same referral
codes. Waiting costs you months of use and gains you nothing that is currently knowable. If you are undecided, the
better move is not to wait for a sale that may never exist — it is to
<a href="/godel-terminal-free-trial/">use the ${PRICING.freeTrial.days}-day free trial →</a> and find out whether the product earns
its price at all.</p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/godel-terminal-pricing/', label: 'Full pricing breakdown' } })}

${faqSection(faqs)}
`;
  },
};
