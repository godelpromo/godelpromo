import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { CODE_SITES } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const site = CODE_SITES.NEWUSER;

const faqs = [
  {
    q: `Does NEWUSER give a bigger discount than ${PROMO.code}?`,
    a: `No. Both are referral tokens in the same programme, and the programme has one discount tier: ${PROMO.percent}% off the ${PROMO.appliesTo}. No referral code in circulation gives more, whichever site promotes it.`,
  },
  {
    q: 'Does NEWUSER work on the annual plan?',
    a: `${esc(site.site)} itself notes the code applies to the monthly plan, with annual excluded — a detail most code sites skip, stated to its credit. The annual plan is already priced at ${PRICING.annual.display} per ${esc(PRICING.annual.unit)}, below twelve monthly payments. See <a href="/godel-terminal-monthly-vs-annual/">monthly vs annual</a>, and confirm how any code interacts with annual billing at checkout.`,
  },
  {
    q: 'Is godeldiscount.com the official Godel Terminal site?',
    a: `No. It is an independent affiliate site — as are we. The official product site is godelterminal.com, and the only vendor-published code we know of is <a href="/godel-terminal-official-promo-code/">X25, at 25%</a>.`,
  },
  {
    q: 'What if NEWUSER does not apply at checkout?',
    a: `Codes are set by ${esc(PRODUCT.name)} and can be withdrawn at any time. Any other referral code — ${PROMO.code}, GET30, SHKRELI — targets the identical offer, so try one of those and check that the total actually updates before you pay.`,
  },
];

export const page = {
  path: '/godel-terminal-newuser-code/',
  title: 'Does NEWUSER Work for Godel Terminal? The Honest Answer',
  description: `NEWUSER is godeldiscount.com's referral code for Godel Terminal: 30% off your first month, identical in effect to TAKE30 and every other referral code.`,
  summary: 'NEWUSER works: it is a Godel Terminal referral token giving the same 30% off the first month as every other code, promoted by godeldiscount.com.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/godel-terminal-newuser-code/', label: 'NEWUSER' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.8',
  render() {
    return `
<h1>Does NEWUSER work for Godel Terminal? Yes — here is what it is</h1>

<p class="lede">Yes. NEWUSER is a real ${esc(PRODUCT.name)} referral code, promoted by ${esc(site.site)}. It
gives <strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)}</strong> — exactly the same offer as
${esc(PROMO.code)} and every other referral code in circulation. There is no difference in what you pay.</p>

<h2>What NEWUSER actually is</h2>
<p class="prose">${esc(PRODUCT.name)} runs a referral programme: affiliates get a code, people who enter the
code get ${PROMO.percent}% off the ${esc(PROMO.appliesTo)}, and the code's owner earns a commission. NEWUSER is
one of those tokens; so is ${esc(PROMO.code)}. The programme has a single discount tier, which is why
<a href="/promo-codes/">every code we track</a> resolves to the same number. The only vendor-published code,
<a href="/godel-terminal-official-promo-code/">X25, is actually smaller at 25% →</a></p>

${note(`${esc(PRODUCT.name)}'s referral documentation states attribution follows the <strong>code entered at
checkout</strong>, not the link you clicked. Whichever site sent you, the code in the promo field decides both
your discount and who is paid.`)}

<h2>The site behind NEWUSER</h2>
<p class="prose">Since the offer is identical everywhere, the useful comparison is between the sites, not the
codes. Three checkable facts about ${esc(site.site)}:</p>
<ul class="prose">
  <li>It is the most built-out competitor in this niche: 27 URLs, including a command list, an FAQ and an
  AI-instructions page.</li>
  <li>It correctly notes the code applies to the monthly plan, with annual excluded — credit where due; most
  code sites never mention the distinction.</li>
  <li>Its "Verified March 2026" badge is several months stale as of August 2026. Ours reads
  ${esc(PROMO.lastVerified)} because that is the date the code was last actually tested at checkout — a
  verification date is a truth claim, not a freshness knob.</li>
</ul>

<h2>Which code should you enter?</h2>
<p class="prose">Whichever you like — the price is the same either way, and the only thing a code changes is
which affiliate earns the commission. Ours is below; if it ever fails, NEWUSER or any code in the
<a href="/promo-codes/">full comparison table</a> behaves identically. What no code does is beat
${PROMO.percent}%: the bigger numbers you may have seen advertised are
<a href="/do-godel-terminal-coupons-work/">fabricated, and we checked each one →</a></p>

${codeBox({ note: `Identical effect to NEWUSER: ${PROMO.percent}% off your ${PROMO.appliesTo}.` })}

<p class="prose">However you choose, verify the same way: on a paid ${PRICING.monthly.display}/month checkout,
an applied code drops the total to roughly $${(PRICING.monthly.amount * 0.7).toFixed(2)} before you pay. A
trial signup has no charge for a code to act on — confirm at your first paid checkout that the ${PROMO.percent}% applied — and codes
do not stack, so one token is all a signup can carry.</p>

<p class="prose">Also circulating: <a href="/godel-terminal-get30-code/">GET30, from a single-page site still
quoting 2024 prices →</a> and <a href="/godel-terminal-shkreli-code/">SHKRELI, trading on the co-founder's
name →</a></p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/how-to-redeem/', label: 'Step-by-step redemption guide' } })}

${faqSection(faqs)}
`;
  },
};
