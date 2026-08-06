import { PROMO, PRODUCT, REFERRAL, KNOWN_CODES, REFERRAL_CODES } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const x25 = KNOWN_CODES.find((c) => c.official);

const codePages = {
  NEWUSER: '/godel-terminal-newuser-code/',
  GET30: '/godel-terminal-get30-code/',
  SHKRELI: '/godel-terminal-shkreli-code/',
};

const faqs = [
  {
    q: `Is ${PROMO.code} an official Godel Terminal code?`,
    a: `No, and we say so on every page. ${PROMO.code} is a referral token in ${esc(PRODUCT.name)}'s affiliate programme — we earn a commission if you subscribe, which never changes your price. The only code published by the vendor itself that we know of is ${esc(x25.code)}.`,
  },
  {
    q: `Is X25 a bigger discount than ${PROMO.code}?`,
    a: `No. ${esc(x25.code)} gives ${x25.percent}%; ${PROMO.code} and every other referral code give ${PROMO.percent}% off the first month. The official code is the smaller of the two tiers — 25 versus 30.`,
  },
  {
    q: `Can I combine X25 with ${PROMO.code}?`,
    a: `No. ${esc(PRODUCT.name)}'s referral page states that referral discounts do not stack with other codes. You enter one code at checkout, so enter the one that saves more — a ${PROMO.percent}% referral code.`,
  },
  {
    q: 'Can X25 stop working?',
    a: `Yes. Codes are set by ${esc(PRODUCT.name)} and can be withdrawn or changed at any time, and a code posted on social media is exactly the kind that gets retired. If ${esc(x25.code)} fails at checkout, the referral codes still target the ${PROMO.percent}% first-month tier. Whatever you enter, confirm the total updates before paying.`,
  },
];

export const page = {
  path: '/godel-terminal-official-promo-code/',
  title: 'The Official Godel Terminal Promo Code Is X25 (25% Off)',
  description: `Godel Terminal's own X account has posted code X25 for 25% off. It is real and official — and smaller than 30% referral codes like TAKE30. The honest math.`,
  summary: 'X25 is the only vendor-published Godel Terminal code, at 25% — smaller than the 30% referral tier. Why both exist and which to enter.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/godel-terminal-official-promo-code/', label: 'Official code' },
  ],
  faqs,
  includeOffer: true,
  priority: '0.9',
  render() {
    const rows = KNOWN_CODES.map((c) => {
      const name = codePages[c.code]
        ? `<a href="${codePages[c.code]}"><strong class="mono">${esc(c.code)}</strong></a>`
        : `<strong class="mono">${esc(c.code)}</strong>`;
      const badge = c.official
        ? ' <span class="badge badge-official">Official</span>'
        : c.ours
          ? ' <span class="badge badge-official">Ours</span>'
          : '';
      return {
        highlight: Boolean(c.ours || c.official),
        cells: [
          `${name}${badge}`,
          `${c.percent}%${c.official ? '' : ` off ${esc(PROMO.appliesTo)}`}`,
          c.official ? 'Vendor social promo' : 'Referral token',
          esc(c.source),
        ],
      };
    });

    return `
<h1>The official Godel Terminal promo code is ${esc(x25.code)} — and it is the smaller one</h1>

<p class="lede">Exactly one ${esc(PRODUCT.name)} promo code comes from the vendor itself:
<strong class="mono">${esc(x25.code)}</strong>, posted by the official @GodelTerminal X account, for
${x25.percent}% off. Every other code in circulation — including ours — is a referral token worth
${PROMO.percent}% off the first month. Which means the unofficial codes are the bigger discount.</p>

<h2>The honest math</h2>
<p class="prose">Official does not mean better here. ${esc(x25.code)} is ${x25.percent}%; the referral tier is
${PROMO.percent}%. We can state that flatly because we track the percentage behind every code we list, not just
the names — most code pages assert "official" and "best" interchangeably without checking either.</p>

${note(`<strong>${x25.percent}% (official ${esc(x25.code)}) &lt; ${PROMO.percent}% (any referral code).</strong>
If your goal is the lowest first payment, a referral code wins. The only published price that beats both is the
<a href="/godel-terminal-student-discount/">$5/month student rate</a>, if you have a .edu email.`)}

${codeBox({ note: `${PROMO.percent}% off your ${PROMO.appliesTo} — the larger of the two real tiers.` })}

<h2>Every code, with its real percentage</h2>

${table({
  head: ['Code', 'Discount', 'Type', 'Published by'],
  rows,
})}

<p class="prose faint">All ${REFERRAL_CODES.length} referral codes are interchangeable — same offer, different
affiliate getting paid. The full comparison, including the discount claims that are fabricated outright, is on
our <a href="/promo-codes/">promo codes page</a>.</p>

<h2>Why an official code and referral codes both exist</h2>
<p class="prose">They come from two different mechanisms:</p>
<ul class="prose">
  <li><strong>The referral programme</strong> is ${esc(PRODUCT.name)}'s standing affiliate scheme, run on
  ${esc(REFERRAL.platform)}. Anyone in it gets a code; people who use the code get
  ${esc(REFERRAL.refereeDiscount)}; the code's owner earns ${esc(REFERRAL.referrerCommission)}. That is what
  ${esc(PROMO.code)}, NEWUSER, GET30 and the rest are.
  <a href="/godel-terminal-referral-program/">How the programme works →</a></li>
  <li><strong>${esc(x25.code)}</strong> is the vendor's own promotion, posted on its X account — marketing run
  directly by ${esc(PRODUCT.name)} rather than through affiliates — as far as anything published shows, no
  affiliate sits behind it — and at
  ${x25.percent}% it sits five points below the referral tier.</li>
</ul>

<h2>What we do not know about ${esc(x25.code)}</h2>
<p class="prose">Our source for ${esc(x25.code)} is the official @GodelTerminal X account, and that post is the
extent of the published terms. What the ${x25.percent}% applies to — one month, or something else — is not
stated in the source we track, and social-promo codes can be withdrawn at any time. As always, the number that
matters is the one on the checkout screen. If a code has not changed the total, it has not applied.</p>

<p class="prose">Seen a code claiming more than ${PROMO.percent}%? It is not official and it is not real —
<a href="/do-godel-terminal-coupons-work/">here is every fabricated claim, checked →</a> Curious what codes
circulate on Reddit? <a href="/godel-terminal-promo-code-reddit/">Same referral tokens, fact-checked →</a></p>

${ctaRow({ primary: `Sign up and apply ${PROMO.code}`, secondary: { href: '/promo-codes/', label: 'Compare every code' } })}

${faqSection(faqs)}
`;
  },
};
