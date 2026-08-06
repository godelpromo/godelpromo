import { PROMO, PRODUCT, PRICING, REFERRAL, REFERRAL_CODES } from '../data/site.mjs';
import { SENTIMENT } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: 'Is there a Reddit-exclusive Godel Terminal promo code?',
    a: `No. Codes posted in Reddit comments are the same referral tokens promoted everywhere else — ${REFERRAL_CODES.length} are in circulation and all give ${PROMO.percent}% off the ${PROMO.appliesTo}. The referral programme has one tier, so a Reddit-only bigger discount cannot exist.`,
  },
  {
    q: 'Why do people post promo codes in Reddit comments?',
    a: `Because the referral programme pays the code's owner ${esc(REFERRAL.referrerCommission)}. A code dropped into a comment is an affiliate promotion whether or not the poster says so. It does not change your price — but you should know the incentive behind it.`,
  },
  {
    q: 'Is there much real discussion of Godel Terminal on Reddit?',
    a: `Not much. Organic review volume is thin on every platform, and most of what surfaces in search is affiliate content rather than user discussion. The official subreddit functions mostly as a changelog and support channel, with the team posting feature announcements there.`,
  },
  {
    q: 'Should I trust a promo code I found in a Reddit comment?',
    a: `It will almost certainly work — referral tokens are interchangeable, so the risk is not a scam code, it is expecting the code to be special. Whatever code you enter, the test is the same: the total on the checkout screen must update before you pay.`,
  },
];

export const page = {
  path: '/godel-terminal-promo-code-reddit/',
  title: 'Godel Terminal Promo Code Reddit Threads, Fact-Checked',
  description: 'What Reddit actually says about Godel Terminal discount codes, and the fact every thread converges on: every referral code gives the same 30% off month one.',
  summary: 'What Reddit actually says about Godel Terminal promo codes: thin organic discussion, referral tokens in comments, and one converging fact.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/godel-terminal-promo-code-reddit/', label: 'Reddit' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.8',
  render() {
    return `
<h1>Godel Terminal promo codes on Reddit, fact-checked</h1>

<p class="lede">If you searched Reddit for a ${esc(PRODUCT.name)} promo code, here is the whole answer up
front: every code that circulates there is a referral token, and every referral token gives the same
<strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)}</strong>. There is no Reddit-exclusive discount,
and no thread we can find claims otherwise.</p>

<h2>How much Reddit discussion actually exists</h2>
<p class="prose">Less than the search results imply. ${esc(SENTIMENT.caveat)}</p>
<p class="prose">The picture on Reddit specifically:</p>
<ul class="prose">
  <li>The official subreddit, r/GodelTerminal, functions mostly as a changelog and support channel — the team
  posts feature announcements there.</li>
  <li>Promotion gets moderated: a post promoting Godel on r/Daytrading was removed by that subreddit's
  moderators (community-reported, observed in our August 2026 research pass).</li>
  <li>Codes that do get pushed in comment threads are ordinary referral tokens, usually with no disclosure that
  the poster earns a commission.</li>
</ul>

<h2>What Reddit gets right</h2>
<p class="prose">When threads discuss codes at all, they converge on the correct fact: all the codes are
identical. That matches what we verify directly — ${REFERRAL_CODES.length} referral codes in circulation, one
${PROMO.percent}% tier, compared line by line on our <a href="/promo-codes/">promo codes page</a>.</p>
<p class="prose">Reddit is also where ${esc(PRODUCT.name)}'s price history got recorded. The late-2024
$${PRICING.history[0].monthly}/month price point is community-reported from contemporaneous Reddit posts —
context for reading old threads, like an r/wallstreetbets user in December 2024 calling the product not worth
60 bucks a month at a price that no longer exists. Today's vendor-stated pricing is
${PRICING.monthly.display}/month or ${PRICING.annual.display} per ${esc(PRICING.annual.unit)}; old threads
argue about numbers two changes stale.</p>

<h2>What to distrust</h2>
<p class="prose">Codes in comments with no disclosure. The referral programme pays the code's owner
${esc(REFERRAL.referrerCommission)}, so a code dropped into a thread is an advertisement whether it is labeled
one or not. It still works — attribution follows the code entered at checkout, and your ${PROMO.percent}% is
the same — but "found it on Reddit" is not evidence a code is special. No code is special.</p>

${note(`Also distrust any Reddit-surfaced claim of 40%, 50% or 75% off. Those figures come from coupon
aggregators, not from ${esc(PRODUCT.name)}, and none applies at checkout —
<a href="/do-godel-terminal-coupons-work/">every fabricated claim, checked →</a>`, { warn: true })}

<h2>The verified version of what Reddit tells you</h2>
<p class="prose">Every referral code is the same, so use whichever is in front of you — this one was last
tested at checkout on ${esc(PROMO.lastVerified)}:</p>

${codeBox()}

<p class="prose">For what users actually say about the product itself — the thin but real sentiment, positive
and negative, with attribution — see the <a href="/godel-terminal-review/">full review</a>. For the one code
that is genuinely vendor-published, see <a href="/godel-terminal-official-promo-code/">the official X25 code,
at 25% →</a></p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/godel-terminal-review/', label: 'Read the full review' } })}

${faqSection(faqs)}
`;
  },
};
