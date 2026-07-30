import { PROMO, PRODUCT, PRICING } from '../data/site.mjs';
import { officialCommands } from '../data/commands.mjs';
import { codeBox, ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `Does ${PRODUCT.name} have a free trial?`,
    a: `A ${PRICING.freeTrial.days}-day free trial is reported consistently across independent reviews. It is not stated on ${PRODUCT.name}'s marketing homepage, so we cannot confirm it from a vendor source — check at signup.`,
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
    a: `Not disclosed on any vendor page we could access. Assume yes — most trials of this kind require one — and set a reminder before the period ends.`,
  },
];

export const page = {
  path: '/godel-terminal-free-trial/',
  title: `Godel Terminal Free Trial: What Is Actually Confirmed`,
  description: `A ${PRICING.freeTrial.days}-day Godel Terminal trial is widely reported but not vendor-published. What is confirmed, and how the trial interacts with ${PROMO.code}.`,
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

<p class="lede">A ${PRICING.freeTrial.days}-day trial is reported by every independent review of
${esc(PRODUCT.name)} we checked. It is worth being precise about what that does and does not tell you.</p>

${note(`<strong>Status of this claim:</strong> the ${PRICING.freeTrial.days}-day figure is corroborated across
multiple third-party reviews but does <strong>not</strong> appear on any ${esc(PRODUCT.name)} page we were able to
access. Treat it as likely-but-unconfirmed and verify at signup. We would rather flag the uncertainty than repeat
the number with false confidence, which is what most pages covering this do.`)}

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
  <li><strong>Check whether the FINRA surcharge applies to you.</strong> Independent reviews report an extra
  ${PRICING.finraSurcharge.display}/month for registered users. That is
  $${PRICING.finraSurcharge.amount * 12}/year on top of the seat price and it changes the comparison materially.</li>
  <li><strong>Decide annual vs monthly.</strong> Annual is ${PRICING.annual.display}/seat/year, about
  $${PRICING.annual.effectiveMonthly}/month equivalent, against a reported ${PRICING.monthly.display}/month.
  Annual is substantially cheaper; ${esc(PROMO.code)} is worth more in cash against monthly. If you are confident after
  the trial, annual wins comfortably.</li>
</ul>

<h2>Converting with ${esc(PROMO.code)}</h2>

${codeBox()}
${ctaRow({ secondary: { href: '/godel-terminal-pricing/', label: 'Pricing breakdown' } })}

${faqSection(faqs)}
`;
  },
};
