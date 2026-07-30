import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const discounted = (PRICING.monthly.amount * (1 - PROMO.percent / 100)).toFixed(2);

const faqs = [
  {
    q: `Where do I enter the ${PROMO.code} code?`,
    a: `In the promo or discount field on the ${PRODUCT.name} checkout screen, during signup. It is not entered on our site — we do not process payments and never see your details.`,
  },
  {
    q: `The code did not change my total. What now?`,
    a: `Check three things: that you are on a <strong>paid plan</strong> checkout rather than the free-trial step, that you pressed apply rather than only pasting, and that the code has no trailing space. If it still fails, try another code from our <a href="/promo-codes/">codes page</a> — they target the same offer.`,
  },
  {
    q: `Can I apply the code after subscribing?`,
    a: `Generally no. Referral discounts apply at the point of checkout. If you have already paid, contact ${PRODUCT.name} support directly — that is their decision, not something any promo site can influence.`,
  },
  {
    q: `Do I need to click a referral link for the code to work?`,
    a: `${PRODUCT.name}'s referral documentation indicates attribution follows the <strong>code entered at checkout</strong> rather than the link. So the code is the thing that has to be right. Clicking through from here does no harm and costs you nothing either way.`,
  },
  {
    q: `Does the code work with the free trial?`,
    a: `A trial has no charge, so there is nothing to discount during it. The code applies to your first paid billing period. See the <a href="/godel-terminal-free-trial/">free trial page</a>.`,
  },
];

export const page = {
  path: '/how-to-redeem/',
  title: `How to Redeem ${PROMO.code} on Godel Terminal`,
  description: `How to apply promo code ${PROMO.code} for ${PROMO.percent}% off your first month of Godel Terminal, confirm it actually worked, and fix it when it fails.`,
  summary: `Step-by-step guide to applying the ${PROMO.code} promo code at Godel Terminal checkout, with troubleshooting.`,
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/how-to-redeem/', label: 'How to redeem' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.8',

  extraNodes: [{
    '@type': 'HowTo',
    '@id': 'https://www.godelpromo.com/how-to-redeem/#howto',
    name: `How to redeem the ${PROMO.code} promo code on ${PRODUCT.name}`,
    description: `Apply promo code ${PROMO.code} at ${PRODUCT.name} checkout for ${PROMO.percent}% off the ${PROMO.appliesTo}.`,
    totalTime: 'PT3M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Copy the code', text: `Copy the promo code ${PROMO.code}.` },
      { '@type': 'HowToStep', position: 2, name: 'Open signup', text: `Go to ${PRODUCT.appUrl} and begin creating an account.`, url: PRODUCT.appUrl },
      { '@type': 'HowToStep', position: 3, name: 'Choose a paid plan', text: 'Select a paid plan. A free trial has no charge for a code to discount.' },
      { '@type': 'HowToStep', position: 4, name: 'Apply the code', text: `Paste ${PROMO.code} into the promo or discount field and press apply.` },
      { '@type': 'HowToStep', position: 5, name: 'Confirm the total changed', text: `Verify the total has dropped by ${PROMO.percent}% before paying. If it has not, the code did not apply.` },
    ],
  }],

  render() {
    return `
<h1>How to redeem ${esc(PROMO.code)} on ${esc(PRODUCT.name)}</h1>

<p class="lede">Three minutes, five steps. The only one people get wrong is step three.</p>

${codeBox()}

<h2>Step by step</h2>

<ol class="prose">
  <li><strong>Copy the code.</strong> Use the copy button above, or type <span class="mono">${esc(PROMO.code)}</span> —
  it is case-insensitive at most checkouts but paste it exactly as shown to be safe.</li>

  <li><strong>Open ${esc(PRODUCT.name)} signup.</strong> Go to
  <a href="${PROMO.referralLink}" rel="sponsored nofollow noopener" data-outbound>${esc(PRODUCT.appUrl)}</a>
  and start creating your account. Signup and payment happen entirely on ${esc(PRODUCT.name)} — we never see your details.</li>

  <li><strong>Select a paid plan.</strong> <em>This is the step that trips people up.</em> If you are on the free-trial
  path, there is no charge yet, so there is nothing for a discount code to reduce. The promo field either will not appear
  or will not change anything. Choose the plan you actually want first.</li>

  <li><strong>Apply the code.</strong> Paste <span class="mono">${esc(PROMO.code)}</span> into the promo or discount
  field and press the apply button. Some checkouts do not register a pasted code until you explicitly apply it.</li>

  <li><strong>Confirm the total changed before paying.</strong> A ${PROMO.percent}% discount on a reported
  ${PRICING.monthly.display} monthly plan should bring the first charge to roughly
  <strong>$${discounted}</strong>. If the number has not moved, the code has not applied — do not assume it will be
  credited afterwards.</li>
</ol>

${note(`<strong>Worth knowing:</strong> ${esc(PRODUCT.name)}'s referral documentation states that attribution
follows the code entered at checkout rather than the link you arrived through. Practically, that means the only
thing you need to get right is the code in the promo field.`)}

<h2>When the code will not apply</h2>

<div class="grid grid-2">
  <div class="tile">
    <h3>You are on the trial step</h3>
    <p>By far the most common cause. Complete or skip to a paid plan selection, then apply the code.</p>
  </div>
  <div class="tile">
    <h3>Trailing whitespace</h3>
    <p>Copying from a page can pick up a trailing space. Retype the six characters manually.</p>
  </div>
  <div class="tile">
    <h3>Existing subscriber</h3>
    <p>First-period referral discounts generally apply to new accounts only.</p>
  </div>
  <div class="tile">
    <h3>The code was withdrawn</h3>
    <p>Codes are controlled by ${esc(PRODUCT.name)}. Try another from our <a href="/promo-codes/">codes page</a> —
    all target the same offer.</p>
  </div>
</div>

<h2>What you should expect to pay</h2>

<p class="prose">${esc(PROMO.code)} discounts the ${esc(PROMO.appliesTo)} by ${PROMO.percent}%.
After that period you pay standard pricing — ${PRICING.annual.display} per ${esc(PRICING.annual.unit)} on the annual
plan, or a reported ${PRICING.monthly.display}/month monthly. It is not a recurring discount, and we would rather you
knew that now than discovered it on your second invoice.
<a href="/godel-terminal-pricing/">Full pricing breakdown →</a></p>

${ctaRow({ primary: `Open signup and apply ${PROMO.code}`, secondary: { href: '/promo-codes/', label: 'Other codes' } })}

${faqSection(faqs)}
`;
  },
};
