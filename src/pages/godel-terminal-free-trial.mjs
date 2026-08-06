import { PROMO, PRODUCT, PRICING, STUDENT } from '../data/site.mjs';
import { officialCommands } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `Does ${PRODUCT.name} have a free trial?`,
    a: `Yes. ${PRODUCT.name}'s own pricing page states every plan starts with a <strong>${PRICING.freeTrial.days}-day free trial</strong> covering most of the product — real-time Nasdaq quotes, news, SEC filings, financials, charting and the full command set (vendor wording, August 2026).`,
  },
  {
    q: `Can I use ${PROMO.code} with the free trial?`,
    a: `Not during the trial itself, because a trial has no charge to discount. The code applies to your first paid billing period, so you can trial first and apply ${PROMO.code} when you convert.`,
  },
  {
    q: `Is there a free version of ${PRODUCT.name}?`,
    a: `No permanently free tier is advertised. ${PRODUCT.name} is a paid product with a reported trial period.`,
  },
  {
    q: `Do I need a credit card for the trial?`,
    a: `The vendor terms state the account "will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial" — so the stated policy is no charge without an explicit upgrade. Whether a card is collected up front is not disclosed; either way, the trial ending does not auto-bill you under those terms.`,
  },
];

export const page = {
  path: '/godel-terminal-free-trial/',
  title: `Godel Terminal Free Trial: What Is Actually Confirmed`,
  description: `Godel Terminal's ${PRICING.freeTrial.days}-day free trial is vendor-published: every plan starts with one, and the account is not charged until upgraded. How it interacts with ${PROMO.code}.`,
  summary: 'What is actually known about the Godel Terminal free trial, and how it interacts with the promo code.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/godel-terminal-free-trial/', label: 'Free trial' },
  ],
  faqs,
  priority: '0.8',
  render() {
    return `
<h1>The Godel Terminal free trial</h1>

<p class="lede">Every ${esc(PRODUCT.name)} plan starts with a <strong>${PRICING.freeTrial.days}-day free
trial</strong> — vendor-published on the pricing page as of August 2026 — and the vendor terms state the account
is not charged until you upgrade. That is a better-documented trial than most subscription products offer.</p>

${note(`<strong>Status of this claim:</strong> vendor-published. Earlier versions of this page hedged the
${PRICING.freeTrial.days}-day figure because it appeared only in third-party reviews; it now appears on
${esc(PRODUCT.name)}'s own pricing page, alongside terms stating the trial account "will not be charged and the
subscription will be suspended until upgraded". We update our sourcing when the sourcing improves.`)}

<h2>How the trial and the promo code interact</h2>

<p class="prose">This confuses a lot of people, so plainly:</p>

<ul class="prose">
  <li>A trial has <strong>no charge</strong>. There is nothing for a discount code to reduce.</li>
  <li>${esc(PROMO.code)} applies to your <strong>first paid billing period</strong>.</li>
  <li>So the sequence is: trial free → convert to paid → apply ${esc(PROMO.code)} → pay ${100 - PROMO.percent}% of the
  first period.</li>
  <li>You do <strong>not</strong> lose the discount by trialling first. Anyone telling you to skip the trial to
  "stack" the code is describing something that does not exist.</li>
</ul>

<h2>How to actually use ${PRICING.freeTrial.days} days</h2>

<p class="prose">A trial is only useful if you test the thing that would make you cancel. For a research terminal
that means answering one question: <strong>does it cover the workflow you currently pay for elsewhere?</strong>
A suggested order, using the commands ${esc(PRODUCT.name)} documents itself:</p>

<ol class="prose">
  <li><strong>Day 1 — coverage check.</strong> Run <code class="mono">DES</code> on the five most obscure names in your
  universe. Breadth failures show up on the long tail, never on AAPL.</li>
  <li><strong>Day 2 — rebuild a watchlist.</strong> <code class="mono">QM</code> supports up to 400 tickers with batch
  import. Import your real list. If it will not hold your universe, nothing else matters.</li>
  <li><strong>Day 3 — news relevance.</strong> Run <code class="mono">N</code> on your portfolio for a full session.
  The question is not speed, it is whether the filtering is precise enough to be worth watching.</li>
  <li><strong>Day 4 — the audit trail.</strong> Pull <code class="mono">FA</code> for a company you know intimately and
  confirm the line items reconcile to the filing. This is where standardization errors surface.</li>
  <li><strong>Day 5 — filings depth.</strong> <code class="mono">CF</code> on a name with a messy filing history.</li>
  <li><strong>Week 2 — replace something.</strong> Actually stop using one existing subscription and see whether you
  reach for it. That is the only test that matters.</li>
</ol>

<p class="prose"><a href="/godel-terminal-commands/">Full command reference →</a></p>

<h2>Before the trial ends</h2>

<p class="prose">Two things to sort out before you convert:</p>

<ul class="prose">
  <li><strong>Check whether the FINRA surcharge applies to you.</strong> The pricing page lists an extra
  ${PRICING.finraSurcharge.display}/month for FINRA-licensed users. That is
  $${PRICING.finraSurcharge.amount * 12}/year on top of the seat price and it changes the comparison materially.</li>
  <li><strong>Decide annual vs monthly.</strong> Annual is ${PRICING.annual.display}/seat/year, about
  $${PRICING.annual.effectiveMonthly}/month equivalent, against ${PRICING.monthly.display}/month billed monthly.
  Annual is substantially cheaper; ${esc(PROMO.code)} is worth more in cash against monthly. If you are confident after
  the trial, annual wins comfortably — <a href="/godel-terminal-monthly-vs-annual/">the full arithmetic</a>.</li>
  <li><strong>If you have a .edu email, stop here:</strong> the official
  <a href="/godel-terminal-student-discount/">student rate is ${esc(STUDENT.display)}/month</a> and beats every code.</li>
</ul>

<h2>Converting with ${esc(PROMO.code)}</h2>

${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-pricing/', label: 'Pricing breakdown' } })}

${faqSection(faqs)}
`;
  },
};
