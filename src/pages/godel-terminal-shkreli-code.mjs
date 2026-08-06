import { PROMO, PRODUCT, PRICING, REFERRAL, COMPANY } from '../data/site.mjs';
import { CODE_SITES } from '../data/research.mjs';
import { codeBox, ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const site = CODE_SITES.SHKRELI;
const shkreli = COMPANY.people.find((p) => p.name === 'Martin Shkreli');

const faqs = [
  {
    q: 'Is the SHKRELI code connected to Martin Shkreli himself?',
    a: `The name references a real fact — Martin Shkreli is a co-founder of ${esc(COMPANY.legalName)}, ${esc(shkreli.note)}. But who operates ${esc(site.site)} or holds the affiliate account behind the code is not published, so no connection beyond the name can be verified.`,
  },
  {
    q: `Does SHKRELI give a bigger discount than ${PROMO.code}?`,
    a: `No. SHKRELI is a referral token like every other code, and the referral programme has one tier: ${PROMO.percent}% off the ${PROMO.appliesTo}. The founder's name on the code changes nothing about the offer.`,
  },
  {
    q: 'Does using the SHKRELI code pay Martin Shkreli?',
    a: `Not published. The referral programme pays the code's owner ${esc(REFERRAL.referrerCommission)}, and ${esc(site.site)} does not disclose who that owner is. All that is certain is that some affiliate account collects it.`,
  },
  {
    q: 'The same site lists BLACKFRIDAY and CYBERMONDAY — are those different?',
    a: `No. Every code on that site targets the same ${PROMO.percent}%-off-first-month referral offer, holiday names included — the names are branding, not dates. <a href="/godel-terminal-black-friday/">The honest Black Friday page</a> covers why.`,
  },
];

export const page = {
  path: '/godel-terminal-shkreli-code/',
  title: 'SHKRELI Promo Code: It Works — Here Is the Context',
  description: `SHKRELI is a real Godel Terminal referral code trading on the co-founder's name, and it gives the standard 30% off the first month. The facts behind it.`,
  summary: 'SHKRELI is an ordinary Godel Terminal referral token — 30% off the first month — named after co-founder Martin Shkreli.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/godel-terminal-shkreli-code/', label: 'SHKRELI' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.8',
  render() {
    return `
<h1>The SHKRELI promo code works — here is the context</h1>

<p class="lede">SHKRELI is a real ${esc(PRODUCT.name)} referral code, promoted by ${esc(site.site)}. It gives
the standard <strong>${PROMO.percent}% off your ${esc(PROMO.appliesTo)}</strong> — no more, no less, exactly
like ${esc(PROMO.code)} and every other referral code. The name is trading on a real fact: Martin Shkreli
co-founded the company behind ${esc(PRODUCT.name)}.</p>

<h2>The name on the code</h2>
<p class="prose">Martin Shkreli is a ${esc(shkreli.role)} of ${esc(COMPANY.legalName)}, the company that builds
${esc(PRODUCT.name)} — ${esc(shkreli.note)}. His history, the company's ownership and its funding are a
separate, longer story: <a href="/who-owns-godel-terminal/">who owns Godel Terminal →</a> This page is about
the code.</p>

<h2>The site behind SHKRELI</h2>
<p class="prose">Three checkable facts about ${esc(site.site)}:</p>
<ul class="prose">
  <li>It promotes six codes — SHKRELI, SUMMER, 2025, BLOOMBERG, BLACKFRIDAY, CYBERMONDAY — all resolving to the
  same ${PROMO.percent}% referral offer.</li>
  <li>Its "Last updated:" labels render empty on every page we checked.</li>
  <li>Its CTA links carry via= tokens that do not match the codes displayed on the page.</li>
</ul>

${note(`The via-token mismatch does not change your discount. ${esc(PRODUCT.name)}'s referral documentation
states attribution follows the <strong>code entered at checkout</strong>, not the link you arrived through —
so the code you type is the code that counts, for your price and for who gets paid.`)}

<h2>Should you use SHKRELI?</h2>
<p class="prose">If you want to, sure — your price is identical with any referral code. The only thing a code
selects is which affiliate earns the commission (${esc(REFERRAL.referrerCommission)}, per the vendor's referral
page — and whether the SHKRELI code's commission reaches Shkreli himself is not published). Ours is below;
the <a href="/promo-codes/">full comparison</a> lists every alternative.</p>

${codeBox({ note: `Identical effect to SHKRELI: ${PROMO.percent}% off your ${PROMO.appliesTo}.` })}

<p class="prose">What to expect at checkout, whichever code you type: against the ${PRICING.monthly.display}
monthly plan, ${PROMO.percent}% brings the first payment to roughly
$${(PRICING.monthly.amount * 0.7).toFixed(2)}, and the discount ends there. Codes do not stack — the vendor's
referral page is explicit — and a free-trial signup has no charge for a code to act on, so confirm the discount applied at your
first paid period. If the total on screen has not moved, the code has not applied.</p>

<p class="prose">Related codes, same honest treatment: <a href="/godel-terminal-newuser-code/">does NEWUSER
work? →</a> · <a href="/godel-terminal-get30-code/">what GET30 actually does →</a> · and the one code that is
genuinely official, <a href="/godel-terminal-official-promo-code/">X25 at 25% →</a></p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/who-owns-godel-terminal/', label: 'Who owns Godel Terminal' } })}

${faqSection(faqs)}
`;
  },
};
