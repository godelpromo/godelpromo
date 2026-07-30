import { PROMO, PRODUCT, PRICING, KNOWN_CODES, CASE_STUDY, COMPANY } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, tiles, note, offerSummary, esc } from '../lib/components.mjs';
import { officialCommands } from '../data/commands.mjs';

const faqs = [
  {
    q: `What is the ${PRODUCT.name} promo code?`,
    a: `The promo code is <strong>${PROMO.code}</strong>. It gives you ${PROMO.percent}% off your ${PROMO.appliesTo} of ${PRODUCT.name}. Enter it at checkout when you sign up.`,
  },
  {
    q: `Does ${PROMO.code} give ${PROMO.percent}% off forever?`,
    a: `No. ${PROMO.code} discounts the <strong>${PROMO.appliesTo} only</strong>. After that first billing period you pay the standard rate. Any site telling you this is a recurring or multi-month discount is wrong.`,
  },
  {
    q: `Is ${PROMO.code} better than NEWUSER, GET30, SHKRELI or GUIDE?`,
    a: `They are all the same offer. Every one of these codes is a referral token in ${PRODUCT.name}'s affiliate programme, and every one delivers ${PROMO.percent}% off the ${PROMO.appliesTo}. There is no code in circulation that gives a bigger discount, and anyone advertising 40%, 75% or "up to 80% off" is describing a discount that does not exist.`,
  },
  {
    q: `How much does ${PRODUCT.name} cost?`,
    a: `${PRODUCT.name}'s own site lists entry pricing at <strong>${PRICING.annual.display} per ${PRICING.annual.unit}</strong>. Third-party reviews report a monthly option around ${PRICING.monthly.display}/month and a ${PRICING.freeTrial.days}-day free trial, though those figures are not stated on a vendor page — confirm both at checkout. See our <a href="/godel-terminal-pricing/">pricing breakdown</a>.`,
  },
  {
    q: `Where exactly do I enter the code?`,
    a: `On the ${PRODUCT.name} checkout screen during signup, in the promo or discount field. ${PRODUCT.name}'s referral documentation notes that attribution follows the <strong>code you enter</strong> rather than the link you arrive through, so make sure the code is actually applied and the total updates before you pay. Full walkthrough on our <a href="/how-to-redeem/">redemption page</a>.`,
  },
  {
    q: `Is this the official ${PRODUCT.name} site?`,
    a: `No. godelpromo.com is an independent guide. ${PRODUCT.name} is built by ${esc(PRODUCT.vendor)}. We earn a referral commission if you subscribe, which never changes your price.`,
  },
  {
    q: `What if the code does not work?`,
    a: `Discount codes are set by ${PRODUCT.name} and can be changed or withdrawn at any time. If ${PROMO.code} does not apply, try one of the other codes listed on this page — they target the same offer — and check that you are on a paid plan checkout rather than the free trial step, since a trial has nothing to discount yet.`,
  },
];

const codeRows = KNOWN_CODES.map((c) => ({
  highlight: c.ours,
  cells: [
    `<strong class="mono">${esc(c.code)}</strong>${c.ours ? ' <span class="badge badge-official">Ours</span>' : ''}`,
    `${PROMO.percent}% off ${PROMO.appliesTo}`,
    esc(c.source),
  ],
}));

export const page = {
  path: '/',
  title: `${PROMO.code}: Godel Terminal Promo Code — ${PROMO.percent}% Off First Month`,
  description: `Promo code ${PROMO.code} gets ${PROMO.percent}% off your first month of Godel Terminal. Real pricing, the official command list, and every rival code compared.`,
  summary: `The ${PROMO.code} promo code, what it actually discounts, and how it compares to every other Godel Terminal code.`,
  breadcrumbs: [{ href: '/', label: 'Home' }],
  faqs,
  includeOffer: true,
  priority: '1.0',
  changefreq: 'daily',
  render() {
    const cmdTiles = officialCommands().slice(0, 6).map((c) => ({
      title: `${c.mnemonic} — ${c.name}`,
      body: esc(c.headline),
    }));

    return `
<section class="hero">
  <div>
    <ul class="eyebrow">
      <li>Copy the code, paste at checkout</li>
      <li>Signup happens on Godel Terminal</li>
      <li>Independent — not the official site</li>
    </ul>

    <h1><span class="mono" style="color:var(--accent)">${esc(PROMO.code)}</span> — the Godel Terminal promo code</h1>

    ${offerSummary()}

    ${codeBox()}

    ${ctaRow({ secondary: { href: '/godel-terminal-review/', label: 'Read the full review' } })}
  </div>

  <aside class="card">
    <h2 style="margin-top:0;font-size:18px">Godel Terminal at a glance</h2>
    <p class="muted" style="font-size:14.5px">${esc(PRODUCT.positioning)} Built by ${esc(PRODUCT.vendorNote)}, currently in ${esc(PRODUCT.status)}.</p>
    <p style="margin-bottom:6px"><span class="stat">${PRICING.annual.display}</span><span class="stat-label">per ${esc(PRICING.annual.unit)} — vendor-stated entry price</span></p>
    <p style="margin-bottom:6px"><span class="stat">${PROMO.percent}%</span><span class="stat-label">off your ${esc(PROMO.appliesTo)} with ${esc(PROMO.code)}</span></p>
    <p><span class="stat">17</span><span class="stat-label">commands with official documentation</span></p>
  </aside>
</section>

<section>
  <h2>What ${esc(PROMO.code)} actually gets you</h2>
  <p class="prose">One thing worth being blunt about, because most pages in this niche are not:
  <strong>${esc(PROMO.code)} discounts your ${esc(PROMO.appliesTo)} by ${PROMO.percent}%, and nothing after that.</strong>
  It is a referral code in ${esc(PRODUCT.name)}'s affiliate programme. Once the first billing period ends,
  you pay standard pricing.</p>

  <p class="prose">You will find sites advertising ${esc(PRODUCT.name)} discounts of 40%, 75%, even "up to 80% off".
  Those numbers are fabricated — usually auto-generated by coupon aggregators that have never seen the checkout.
  There is exactly one discount tier available through the referral programme, and it is ${PROMO.percent}% off
  the ${esc(PROMO.appliesTo)}. Knowing that up front is worth more than a bigger-sounding number that fails at checkout.</p>

  ${note(`<strong>A detail most guides miss:</strong> ${esc(PRODUCT.name)}'s own referral documentation states that
  commission attribution follows <em>the code entered at checkout</em>, not the referral link you clicked.
  Whichever page you arrive from, the thing that has to be right is the code in the promo field.`)}
</section>

<section>
  <h2>Every Godel Terminal promo code, compared</h2>
  <p class="prose">Searching for a ${esc(PRODUCT.name)} discount turns up half a dozen different codes across
  half a dozen different sites, each presented as though it were exclusive. They are not. Here is the honest version —
  all of these are referral tokens pointing at the same offer.</p>

  ${table({
    head: ['Code', 'Actual discount', 'Promoted by'],
    rows: codeRows,
  })}

  <p class="prose faint">We list our competitors' codes because it is simply true that they work identically,
  and you deserve to know that before you spend time hunting for a better one. If ${esc(PROMO.code)} ever stops
  applying, any other code in this table should behave the same way.</p>
</section>

<section>
  <h2>What Godel Terminal is</h2>
  <p class="prose">${esc(PRODUCT.name)} is a browser-based financial terminal built around the same short command
  mnemonics used by legacy terminals — you type a ticker and a function code, and the panel opens. It is aimed at the
  gap between a $30,000 Bloomberg seat and a retail charting tool, and it is currently in ${esc(PRODUCT.status)}.</p>

  <p class="prose">${esc(COMPANY.legalName)} is a ${esc(COMPANY.incorporation)} with ${esc(COMPANY.funding)},
  backed by ${COMPANY.investors.slice(0, 2).map(esc).join(' and ')} among others. Its published customer base skews
  institutional: ${COMPANY.customerTypes.map((c) => esc(c.toLowerCase())).join(', ')}.</p>

  ${tiles(cmdTiles)}

  <p class="prose"><a href="/godel-terminal-commands/">See all 17 documented commands →</a></p>
</section>

<section>
  <h2>Does the price make sense?</h2>
  <p class="prose">${esc(PRODUCT.name)}'s own marketing frames the problem as "a $30,000 terminal can't go on every desk",
  and its published case study is a fund that says it saved ${esc(CASE_STUDY.savings)} by switching.</p>

  <blockquote class="note">${esc(CASE_STUDY.quote)}
  <br><span class="faint">— ${esc(CASE_STUDY.person)}, ${esc(CASE_STUDY.role)} (${esc(CASE_STUDY.source)})</span></blockquote>

  <p class="prose">That is the vendor's own customer, so read it as marketing. But the arithmetic behind it is not
  controversial: at ${PRICING.annual.display} per seat per year, ${esc(PRODUCT.name)} is roughly a thirtieth of a
  Bloomberg seat. Whether it replaces one depends entirely on which functions you actually use — which is why we built
  a <a href="/cost-calculator/">cost calculator</a> and a <a href="/godel-terminal-vs-bloomberg/">function-by-function comparison</a>
  rather than just asserting it is cheaper.</p>

  ${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/godel-terminal-pricing/', label: 'Full pricing breakdown' } })}
</section>

${faqSection(faqs)}
`;
  },
};
