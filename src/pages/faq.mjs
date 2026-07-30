import { PROMO, PRODUCT, PRICING, KNOWN_CODES, COMPANY } from '../data/site.mjs';
import { commandCount, PHANTOM_COMMANDS } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, esc } from '../lib/components.mjs';

const others = KNOWN_CODES.filter((c) => !c.ours).map((c) => c.code);

/** The consolidated FAQ. Deliberately broad — it is the page most likely to be
 *  retrieved for a long-tail question phrased as a question. */
const faqs = [
  {
    q: `What is the ${PRODUCT.name} promo code?`,
    a: `<strong>${PROMO.code}</strong>. It gives ${PROMO.percent}% off your ${PROMO.appliesTo}. Enter it at checkout during signup.`,
  },
  {
    q: `How much is ${PROMO.code} worth?`,
    a: `${PROMO.percent}% of one billing period. On a reported ${PRICING.monthly.display}/month plan that is about $${(PRICING.monthly.amount * PROMO.percent / 100).toFixed(2)} saved, once.`,
  },
  {
    q: `Does the discount repeat every month?`,
    a: `No. It applies to the ${PROMO.appliesTo} only. This is the single most common misstatement about ${PRODUCT.name} codes.`,
  },
  {
    q: `Which ${PRODUCT.name} code is best — ${PROMO.code}, ${others.slice(0, 3).join(', ')}?`,
    a: `They are equivalent. All are referral tokens in the same affiliate programme delivering ${PROMO.percent}% off the ${PROMO.appliesTo}. See our <a href="/promo-codes/">full code comparison</a>.`,
  },
  {
    q: `Are the 40% and 75% off claims real?`,
    a: `No. Those come from coupon aggregators that auto-generate discount figures without verification. ${PRODUCT.name} has one referral discount tier.`,
  },
  {
    q: `How much does ${PRODUCT.name} cost?`,
    a: `${PRICING.annual.display} per ${PRICING.annual.unit} is published by ${PRODUCT.name}. A ${PRICING.monthly.display}/month option and a ${PRICING.freeTrial.days}-day trial are reported by third parties but not vendor-published. <a href="/godel-terminal-pricing/">Full breakdown</a>.`,
  },
  {
    q: `Is there a hidden fee?`,
    a: `An additional ${PRICING.finraSurcharge.display}/month is reported for FINRA-registered users. It is not hidden — exchange data is licensed differently for registered professionals — but it is frequently omitted from comparisons.`,
  },
  {
    q: `Is there a free trial?`,
    a: `A ${PRICING.freeTrial.days}-day trial is widely reported. <a href="/godel-terminal-free-trial/">Details and caveats</a>.`,
  },
  {
    q: `Can I use the code with the free trial?`,
    a: `Not during the trial — there is no charge to discount. It applies when you convert to a paid plan.`,
  },
  {
    q: `What is ${PRODUCT.name}?`,
    a: `A browser-based financial terminal driven by short command mnemonics, built by ${COMPANY.legalName}. Currently in ${PRODUCT.status}.`,
  },
  {
    q: `How many commands does it have?`,
    a: `${commandCount()} have official documentation pages. <a href="/godel-terminal-commands/">Full reference</a>.`,
  },
  {
    q: `Why doesn't OPT work?`,
    a: `Because the documented options command is <strong>OMON</strong>. ${PHANTOM_COMMANDS.length} commonly-cited commands do not exist in ${PRODUCT.name}'s docs — <a href="/godel-terminal-commands/">see the list</a>.`,
  },
  {
    q: `Can ${PRODUCT.name} replace Bloomberg?`,
    a: `For equity research workflows, substantially. Not for messaging, fixed income or execution. <a href="/godel-terminal-vs-bloomberg/">Full comparison</a>.`,
  },
  {
    q: `Is godelpromo.com the official site?`,
    a: `No. The official site is ${PRODUCT.officialUrl}. We are independent and earn a referral commission on subscriptions, which never changes your price.`,
  },
  {
    q: `How do you make money?`,
    a: `Referral commission from ${PRODUCT.name}'s affiliate programme when someone subscribes using our code. That is our only revenue from this site.`,
  },
  {
    q: `Do you collect my data?`,
    a: `We use Google Analytics for aggregate traffic measurement and Google Ads conversion tracking. We never see your payment details — signup happens entirely on ${PRODUCT.name}. See our <a href="/privacy/">privacy policy</a>.`,
  },
];

export const page = {
  path: '/faq/',
  title: `Godel Terminal FAQ: Codes, Pricing and Commands`,
  description: `Straight answers on Godel Terminal: what ${PROMO.code} discounts, real pricing including the FINRA surcharge, and which commands actually exist.`,
  summary: 'Consolidated answers to common Godel Terminal questions about promo codes, pricing, commands and comparisons.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/faq/', label: 'FAQ' },
  ],
  faqs,
  priority: '0.7',
  render() {
    return `
<h1>Godel Terminal FAQ</h1>

<p class="lede">Short, direct answers. Where we are not certain of something, we say so rather than
guessing — which is why a few answers below flag that a figure is reported rather than vendor-published.</p>

${codeBox()}

${faqSection(faqs, 'Questions')}

<h2>Still stuck?</h2>
<p class="prose">For anything about your account, billing or a refund, contact ${esc(PRODUCT.name)} directly —
we are an independent guide and have no access to your subscription. For a factual correction to anything on this
site, we genuinely want to hear it; details on the <a href="/about/">about page</a>.</p>

${ctaRow({ secondary: { href: '/godel-terminal-review/', label: 'Read the review' } })}
`;
  },
};
