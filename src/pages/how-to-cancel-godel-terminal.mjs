import { PRODUCT, PRICING } from '../data/site.mjs';
import { CANCELLATION, VENDOR_PAGES } from '../data/research.mjs';
import { faqSection, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `Do I get a refund if I cancel Godel Terminal mid-term?`,
    a: `Not published. The vendor's terms cover how to cancel and when it takes effect, and are silent on refunds — we can find no refund policy anywhere. Plan on paying through the end of your current term, and put any refund question to <a href="mailto:${CANCELLATION.supportEmail}">${CANCELLATION.supportEmail}</a> before you rely on an answer.`,
  },
  {
    q: `Does the free trial auto-charge when it ends?`,
    a: `The vendor's terms say no: the account will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial. That is unusually clean trial language — the suspended state, not a surprise charge, is the documented outcome of doing nothing.`,
  },
  {
    q: `How fast does cancellation take effect?`,
    a: `You can cancel at any time by logging into your account, and the cancellation takes effect at the end of the current paid term — not immediately. You keep access for the period you already paid for, and the subscription simply does not renew.`,
  },
  {
    q: `Who do I contact about a billing problem?`,
    a: `The vendor's support address is <a href="mailto:${CANCELLATION.supportEmail}">${CANCELLATION.supportEmail}</a>; the legal contact in its terms is <a href="mailto:${CANCELLATION.legalEmail}">${CANCELLATION.legalEmail}</a>. We are an independent site and cannot see, change or cancel anyone's subscription.`,
  },
];

export const page = {
  path: '/how-to-cancel-godel-terminal/',
  title: `How to Cancel Godel Terminal: What Is Published`,
  description: `What Godel Terminal publishes about cancelling a subscription, billing periods and refunds — and exactly what remains undocumented before you subscribe.`,
  summary: 'Cancel in-account anytime, effective at end of the paid term; the trial never charges; no refund policy is published — the sourced cancellation facts.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/how-to-cancel-godel-terminal/', label: 'How to cancel' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    return `
<h1>How to cancel Godel Terminal</h1>

<p class="lede">The vendor's terms state it plainly: you can cancel your subscription at any time by
logging into your account, and the cancellation takes effect at the end of the current paid term.
Until then the subscription auto-renews. What the terms do <strong>not</strong> cover is refunds —
no refund policy is published anywhere we can find, and this page will not invent one.</p>

<h2>What the vendor states</h2>

<p class="prose">From ${esc(PRODUCT.name)}'s
<a href="${VENDOR_PAGES.terms}" rel="nofollow noopener" target="_blank">terms</a> and its
<a href="${VENDOR_PAGES.troubleshooting}" rel="nofollow noopener" target="_blank">troubleshooting
docs</a> (August 2026):</p>

<ul class="prose">
  <li><strong>How:</strong> "${esc(CANCELLATION.how)}"</li>
  <li><strong>Renewal:</strong> the subscription renews automatically until you cancel. Cancelling
  stops the next renewal; it does not claw back the current one.</li>
  <li><strong>The trial:</strong> "${esc(CANCELLATION.trialTerms)}" Every plan starts with a
  ${PRICING.freeTrial.days}-day free trial, per the vendor's pricing page.</li>
</ul>

<h2>Refunds: not published</h2>

${note(`${esc(CANCELLATION.refundsNote)} That absence is the single most important fact on this
page. The terms tell you how cancellation works and when it bites; they say nothing about getting
money back mid-term. So budget as if a paid term, once started, is spent — and send any billing or
refund question to <a href="mailto:${CANCELLATION.supportEmail}">${CANCELLATION.supportEmail}</a>
(legal contact: <a href="mailto:${CANCELLATION.legalEmail}">${CANCELLATION.legalEmail}</a>) before
acting on an assumption. We would rather state that gap plainly than paraphrase a policy that does
not exist.`, { warn: true })}

<h2>Before you subscribe: the three-minute checklist</h2>

<ul class="prose">
  <li><strong>Know the term you are committing to.</strong> Cancellation takes effect at the end of
  the current paid term, so the term length is your real exposure. Monthly means you are ever only
  a month deep. Annual is one charge of ${PRICING.annual.display} for the year — with no published
  refund policy, treat that as a one-year decision. The arithmetic between the two is on
  <a href="/godel-terminal-monthly-vs-annual/">monthly vs annual →</a></li>
  <li><strong>Set a trial reminder.</strong> The trial's documented behavior is benign — no charge,
  account suspended until upgraded — but a calendar note at day ${PRICING.freeTrial.days - 2} of
  ${PRICING.freeTrial.days} costs nothing and removes all doubt.
  <a href="/godel-terminal-free-trial/">How to actually use the trial →</a></li>
  <li><strong>Check the known gaps first.</strong> The most common reasons to cancel a research
  terminal are discoverable before paying: no public API
  (<a href="/godel-terminal-api/">the API answer →</a>), no native mobile or desktop app
  (<a href="/godel-terminal-desktop-and-mobile/">what actually exists →</a>), and fixed income
  effectively out of scope (<a href="/godel-terminal-data-coverage/">full coverage map →</a>).
  Reading those three pages is cheaper than a term you regret.</li>
</ul>

<h2>Why there is no signup pitch on this page</h2>

<p class="prose">This site earns referral commissions on signups, and we say so on every page. A
cancellation guide is the one place where that pitch would be in bad faith, so there is none here —
just the vendor's published mechanics and the one honest gap in them. If you cancelled over a
missing capability, the pages above track what is and is not published; if the price was the
problem, the sourced numbers live on <a href="/godel-terminal-pricing/">the pricing breakdown →</a></p>

${faqSection(faqs)}
`;
  },
};
