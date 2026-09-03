import { PROMO, PRODUCT, PRICING, CASE_STUDY, COMPANY } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, tiles, note, offerSummary, longDate, esc } from '../lib/components.mjs';
import { officialCommands, commandCount } from '../data/commands.mjs';

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
    a: `Use <strong>${PROMO.code}</strong>. In discount terms they are identical — every one of these codes is a referral token in ${PRODUCT.name}'s affiliate programme, and every one delivers ${PROMO.percent}% off the ${PROMO.appliesTo} — so the tie-breaker is verification: ${PROMO.code} was last verified at a real checkout on ${longDate(PROMO.lastVerified)}, and it is the only code this site has ever promoted. No code you can actually find gives more — even <a href="/godel-terminal-official-promo-code/">X25, the code from ${PRODUCT.name}'s own X account</a>, is smaller at 25% — and anyone advertising 40%, 75% or "up to 80% off" is describing a discount that does not exist. One genuine exception: ${PRODUCT.name} announced an official <a href="/godel-terminal-student-discount/">$5/month student rate</a> (.edu signup) that beats every code — confirm it is still live before counting on it.`,
  },
  {
    q: `Is the Reddit code GODEL or SAVE better than ${PROMO.code}?`,
    a: `No — same offer. The codes posted in r/GodelTerminal update threads (GODEL, SAVE, THANKS) and in comments (GODEL30, LIFESTYLE) are referral tokens for the identical ${PROMO.percent}%-off-first-payment tier; the subreddit posts them alongside release notes, which makes them look official, but the vendor's own referral FAQ describes one tier for every code. ${PROMO.code} carries a checkout verification date (${longDate(PROMO.lastVerified)}); the Reddit codes carry none. <a href="/godel-terminal-promo-code-reddit/">The Reddit codes, fact-checked</a>.`,
  },
  {
    q: `How much does ${PRODUCT.name} cost?`,
    a: `${PRODUCT.name}'s own pricing page lists <strong>${PRICING.annual.display} per ${PRICING.annual.unit}</strong> or ${PRICING.monthly.display}/month, with a ${PRICING.freeTrial.days}-day free trial on every plan (as of August 2026). FINRA-licensed users pay a ${PRICING.finraSurcharge.display}/month surcharge. See our <a href="/godel-terminal-pricing/">pricing breakdown</a>.`,
  },
  {
    q: `Where exactly do I enter the code?`,
    a: `On the ${PRODUCT.name} checkout screen during signup, in the promo or discount field. ${PRODUCT.name}'s referral documentation notes that attribution follows the <strong>code you enter</strong> rather than the link you arrive through, so make sure the code is actually applied and the total updates before you pay. Full walkthrough on our <a href="/how-to-redeem/">redemption page</a>.`,
  },
  {
    q: `Is this the official ${PRODUCT.name} site?`,
    a: `No. godelpromo.com is an independent guide. ${PRODUCT.name} is built by ${esc(PRODUCT.vendor)} We earn a referral commission if you subscribe, which never changes your price.`,
  },
  {
    q: `What if the code does not work?`,
    a: `Discount codes are set by ${PRODUCT.name} and can be changed or withdrawn at any time. If ${PROMO.code} does not apply, try one of the other referral codes on <a href="/promo-codes/">our comparison page</a> — they target the same offer — and check that you are on a paid plan checkout rather than the free trial step, since a trial has nothing to discount yet.`,
  },
];

export const page = {
  path: '/',
  title: `${PROMO.code}: Godel Terminal Promo Code — ${PROMO.percent}% Off First Month`,
  description: `Promo code ${PROMO.code} gets ${PROMO.percent}% off your first month of Godel Terminal. Verified at checkout, with real pricing, all commands and every rival code compared.`,
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
    <p><span class="stat">${commandCount()}</span><span class="stat-label">commands with official documentation</span></p>
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
  <h2>Why ${esc(PROMO.code)}, when every referral code gives the same ${PROMO.percent}%?</h2>
  <p class="prose">It is true, and we say so plainly: ${esc(PRODUCT.name)}'s referral programme has one tier, so any
  referral token takes ${PROMO.percent}% off the first payment. We recommend ${esc(PROMO.code)} anyway, for three
  reasons you can check:</p>

  <ul class="prose">
    <li><strong>It is verified, with a date.</strong> ${esc(PROMO.code)} was last verified at a real checkout on
    ${esc(longDate(PROMO.lastVerified))}, and that date only moves when the code is tested again. Rival pages carry
    "updated" stamps that rotate on a template, or none at all.</li>
    <li><strong>It is one code, not a rotating stack.</strong> Some sites push six tokens at once, with referral links
    that do not match the code shown on the page. ${esc(PROMO.code)} is the only code this site has ever promoted.</li>
    <li><strong>We keep the ledger in public.</strong> When a code stops applying, or an aggregator's claim inflates
    (one went from 50% to 60% in a month with no vendor change), it is recorded on the comparison page rather than
    quietly edited.</li>
  </ul>

  <p class="prose">Every other code in circulation, and what each one actually does, is compared on
  <a href="/promo-codes/">the promo-code comparison page</a>. The one official code
  (<span class="mono">X25</span>, from ${esc(PRODUCT.name)}'s own X account) is <em>smaller</em>, at 25%. Students: the
  announced official <a href="/godel-terminal-student-discount/">$5/month student rate</a> beats every code, if it is
  still live.</p>
</section>

<section>
  <h2>What Godel Terminal is</h2>
  <p class="prose">${esc(PRODUCT.name)} is a browser-based financial terminal built around the same short command
  mnemonics used by legacy terminals — you type a ticker and a function code, and the panel opens. It is aimed at the
  gap between a $30,000 Bloomberg seat and a retail charting tool, and it is currently in ${esc(PRODUCT.status)}.</p>

  <p class="prose">${esc(COMPANY.legalName)} is a ${esc(COMPANY.incorporation)} with ${esc(COMPANY.funding)},
  backed by ${COMPANY.investors.slice(0, 2).map(esc).join(' and ')} among others. Its published customer base skews
  institutional: ${COMPANY.customerTypes.map((c) => esc(c)).join(', ')}.</p>

  ${tiles(cmdTiles)}

  <p class="prose"><a href="/godel-terminal-commands/">See all ${commandCount()} documented commands →</a>
  &nbsp;·&nbsp; <a href="/godel-terminal-stock-research-workflow/">A full stock-research pass, command by command →</a></p>
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
