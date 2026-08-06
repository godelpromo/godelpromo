import { PROMO, PRODUCT, PRICING, KNOWN_CODES, REFERRAL_CODES, FABRICATED_CLAIMS, STUDENT } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const others = REFERRAL_CODES.filter((c) => !c.ours);

const faqs = [
  {
    q: `Which ${PRODUCT.name} promo code gives the biggest discount?`,
    a: `None of them is bigger than the others. Every ${PRODUCT.name} code in circulation — ${PROMO.code}, ${others.map((c) => c.code).join(', ')} — is a referral token that applies the same ${PROMO.percent}% discount to your ${PROMO.appliesTo}. The referral programme has one discount tier.`,
  },
  {
    q: `Does NEWUSER work for ${PRODUCT.name}?`,
    a: `NEWUSER is promoted by godeldiscount.com and targets the same ${PROMO.percent}%-off-first-month referral offer as ${PROMO.code}. Whether any specific code is live at a given moment is set by ${PRODUCT.name}, not by the sites promoting it. <a href="/godel-terminal-newuser-code/">The full NEWUSER breakdown</a>.`,
  },
  {
    q: `Is there an official ${PRODUCT.name} promo code?`,
    a: `Yes — <strong>X25</strong>, posted by ${PRODUCT.name}'s own X account, for 25% off. It is the one code here that is not a referral token, and it is <em>smaller</em> than the ${PROMO.percent}% referral codes. <a href="/godel-terminal-official-promo-code/">The official-code math</a>.`,
  },
  {
    q: `What about students?`,
    a: `Students beat every code: ${PRODUCT.name}'s official student rate is ${STUDENT.display}/${STUDENT.unit} with a .edu signup and a student ID. <a href="/godel-terminal-student-discount/">How the student program works</a>.`,
  },
  {
    q: `Is there a ${PRODUCT.name} coupon for 40%, 75% or 80% off?`,
    a: `No. Those figures come from automated coupon aggregators that generate discount claims without verifying them. The referral programme offers ${PROMO.percent}% off the ${PROMO.appliesTo}. If you see a larger number advertised, it will not apply at checkout.`,
  },
  {
    q: `Is there an annual plan discount code?`,
    a: `The referral discount is described as applying to the ${PROMO.appliesTo} of a subscription. ${PRODUCT.name}'s annual plan is already priced at a discount to twelve monthly payments — its own site advertises ${PRICING.annual.display} per ${PRICING.annual.unit}. Confirm how a code interacts with annual billing at checkout before paying.`,
  },
  {
    q: `Do these codes ever expire?`,
    a: `Referral codes persist as long as the affiliate account behind them is active and ${PRODUCT.name} keeps the programme running. They are not dated seasonal promotions, which is why codes named BLACKFRIDAY and CYBERMONDAY still resolve outside those periods.`,
  },
];

export const page = {
  path: '/promo-codes/',
  title: `Godel Terminal Promo Codes: Every Code Compared ${new Date().getFullYear()}`,
  description: `Every Godel Terminal promo code compared honestly. TAKE30, NEWUSER, GET30, SHKRELI and GUIDE all deliver the same 30% off the first month.`,
  summary: 'Honest comparison of every Godel Terminal promo code in circulation and what each one actually discounts.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.9',
  changefreq: 'daily',
  render() {
    const rows = KNOWN_CODES.map((c) => ({
      highlight: c.ours,
      cells: [
        `<strong class="mono">${esc(c.code)}</strong>${c.ours ? ' <span class="badge badge-official">Ours</span>' : ''}${c.official ? ' <span class="badge badge-reported">Official account</span>' : ''}`,
        `${c.percent}%`,
        esc(PROMO.appliesTo),
        esc(c.source),
      ],
    }));

    const falseClaims = [
      ...FABRICATED_CLAIMS.map((f) => ({ cells: [esc(f.claim), esc(f.where), esc(f.reality)] })),
      { cells: ['"Free trial + 30% off stacked"', 'Various', 'A trial has no charge to discount. The code applies to the first paid period.'] },
    ];

    return `
<h1>Every Godel Terminal promo code, compared honestly</h1>

<p class="lede">Search for a ${esc(PRODUCT.name)} discount and you will find at least eight different codes,
each presented as exclusive. They are not exclusive, and they are not different. Here is what is actually going on.</p>

${codeBox()}

<h2>The short version</h2>
<p class="prose">${esc(PRODUCT.name)} runs a referral programme. Affiliates get a code; people who use that code get
<strong>${PROMO.percent}% off their ${esc(PROMO.appliesTo)}</strong>; the affiliate earns a commission on the
subscription. Almost every code you will find is one of these referral tokens, and they differ only in who gets
paid. The one exception: <span class="mono">X25</span>, posted by ${esc(PRODUCT.name)}'s own X account, which gives
25% — <a href="/godel-terminal-official-promo-code/">smaller than the referral codes</a>.</p>

${note(`No code in circulation gives more than ${PROMO.percent}% off, and none extends past the
${esc(PROMO.appliesTo)}. Anyone claiming otherwise is guessing. The only route to a deeper discount is not a code
at all: students with a .edu email get an official <a href="/godel-terminal-student-discount/">${esc(STUDENT.display)}/month
rate</a>.`)}

<h2>All known Godel Terminal codes</h2>

${table({
  head: ['Code', 'Discount', 'Applies to', 'Promoted by'],
  rows,
})}

<p class="prose">We list our competitors' codes deliberately. It costs us nothing — the referral offer is identical
either way — and it saves you the twenty minutes of hunting for a better deal that does not exist. If ${esc(PROMO.code)}
ever fails at checkout, try any other referral code in that table. We also keep dedicated, fact-checked pages on the
codes people search for most: <a href="/godel-terminal-newuser-code/">NEWUSER</a>,
<a href="/godel-terminal-get30-code/">GET30</a>, <a href="/godel-terminal-shkreli-code/">SHKRELI</a>, the
<a href="/godel-terminal-official-promo-code/">official X25</a>, the
<a href="/godel-terminal-black-friday/">Black Friday codes</a>, and
<a href="/godel-terminal-promo-code-reddit/">what Reddit says</a>.</p>

<h2>Discount claims that are not real</h2>
<p class="prose">Coupon aggregators generate listings automatically, including discount percentages. For a product
like ${esc(PRODUCT.name)}, with no record of any sitewide sale, the results are fiction. Some examples currently
live — with more detail on our <a href="/do-godel-terminal-coupons-work/">dedicated debunk page</a>:</p>

${table({
  head: ['Claim', 'Where it appears', 'Reality'],
  rows: falseClaims,
})}

<h2>How to tell if a code actually applied</h2>
<p class="prose">The only thing that matters is the number on the checkout screen. Before you pay:</p>

<ol class="prose">
  <li>Confirm you are on a <strong>paid plan</strong> checkout, not the free-trial step. A trial has no charge, so there is nothing for a code to reduce.</li>
  <li>Paste the code into the promo or discount field and apply it explicitly — some checkouts do not auto-apply on paste.</li>
  <li>Check that the <strong>total updates</strong>. A ${PROMO.percent}% discount on a ${PRICING.monthly.display} monthly plan should bring the first charge to roughly $${(PRICING.monthly.amount * 0.7).toFixed(2)}.</li>
  <li>If the total has not moved, the code has not applied. Do not assume it will be credited later.</li>
</ol>

<p class="prose"><a href="/how-to-redeem/">Full step-by-step redemption guide →</a></p>

<h2>Why we tell you the codes are identical</h2>
<p class="prose">Most pages in this niche compete by implying their code is special. That is a bad trade: it wins one
click and loses the reader the moment they discover otherwise. We would rather be the page that told you the truth,
because the truth is genuinely useful here — it means you can stop searching.</p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/godel-terminal-review/', label: 'Is it worth it? Read the review' } })}

${faqSection(faqs)}
`;
  },
};
