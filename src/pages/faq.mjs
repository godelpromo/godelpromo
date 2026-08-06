import { PROMO, PRODUCT, PRICING, KNOWN_CODES, STUDENT, COMPANY } from '../data/site.mjs';
import { commandCount, ALIASES } from '../data/commands.mjs';
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
    a: `The referral codes are equivalent: all are tokens in the same affiliate programme delivering ${PROMO.percent}% off the ${PROMO.appliesTo}. The one exception is <strong>X25</strong>, the code from ${PRODUCT.name}'s own X account, which is smaller at 25%. See our <a href="/promo-codes/">full code comparison</a>.`,
  },
  {
    q: `Is there a student discount?`,
    a: `A ${STUDENT.display}/${STUDENT.unit} student rate was announced by the official ${PRODUCT.name} X account in November 2024 — .edu signup plus a student ID. It is not on the pricing page and the in-app button has come and gone, so confirm it is still live with ${STUDENT.contact}. If it is, it beats every promo code. <a href="/godel-terminal-student-discount/">The full picture</a>.`,
  },
  {
    q: `Are the 40% and 75% off claims real?`,
    a: `No. Those come from coupon aggregators that auto-generate discount figures without verification. ${PRODUCT.name} has one referral discount tier.`,
  },
  {
    q: `How much does ${PRODUCT.name} cost?`,
    a: `${PRICING.annual.display} per ${PRICING.annual.unit}, or ${PRICING.monthly.display}/month — both published on ${PRODUCT.name}'s own pricing page as of August 2026. <a href="/godel-terminal-pricing/">Full breakdown</a>.`,
  },
  {
    q: `Is there a hidden fee?`,
    a: `${PRODUCT.name}'s pricing page lists an additional ${PRICING.finraSurcharge.display}/month surcharge for FINRA-licensed users. It is not hidden — exchange data is licensed differently for registered professionals — but it is frequently omitted from comparisons.`,
  },
  {
    q: `Is there a free trial?`,
    a: `Yes — every plan starts with a ${PRICING.freeTrial.days}-day free trial, per ${PRODUCT.name}'s own pricing page. <a href="/godel-terminal-free-trial/">Details and how it interacts with the code</a>.`,
  },
  {
    q: `How do I cancel?`,
    a: `In-account, any time; cancellation takes effect at the end of the current paid term, per the vendor terms. No refund policy is published. <a href="/how-to-cancel-godel-terminal/">What is and isn't published</a>.`,
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
    q: `Does OPT work in ${PRODUCT.name}?`,
    a: `Yes. OPT is a documented alias of <strong>OMON</strong>, the options-chain command — one of ${ALIASES.length} aliases ${PRODUCT.name} documents. Several commands that older guides (ours included) flagged as nonexistent now have official documentation pages. <a href="/godel-terminal-commands-that-dont-exist/">Our dated corrections</a>.`,
  },
  {
    q: `Does ${PRODUCT.name} have an API?`,
    a: `No public API exists, and the vendor terms prohibit scraping. Several commands export to Excel CSV/JSON instead. <a href="/godel-terminal-api/">The full sourced answer</a>.`,
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
