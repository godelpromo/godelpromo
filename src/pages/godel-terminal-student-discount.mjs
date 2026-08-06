import { PROMO, PRODUCT, PRICING, STUDENT } from '../data/site.mjs';
import { codeBox, ctaRow, faqSection, table, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: 'Who qualifies for the Godel Terminal student discount?',
    a: `The announced process asks for two things: an account created with a <strong>.edu email address</strong> and a copy of your student ID emailed to ${esc(STUDENT.contact)}. Nothing more precise — degree level, full-time status, or what happens if your school does not issue .edu addresses — is published anywhere we can find. If your situation is unusual, ask ${esc(STUDENT.contact)} before paying.`,
  },
  {
    q: 'Is the $5 student rate monthly or annual?',
    a: `The announcement describes it as ${esc(STUDENT.display)} per ${esc(STUDENT.unit)}. Whether a discounted annual plan exists for students is not published. If annual billing matters to you, confirm with ${esc(STUDENT.contact)} first — the standard annual plan is ${PRICING.annual.display} per ${esc(PRICING.annual.unit)}.`,
  },
  {
    q: `Can I stack ${PROMO.code} on top of the student rate?`,
    a: `No. ${esc(PRODUCT.name)}'s referral page states that referral discounts do not combine with other codes — and there would be nothing to gain anyway. ${PROMO.code} takes ${PROMO.percent}% off one month; the student rate is ${esc(STUDENT.display)} every month. If you qualify for the student rate, use it and skip the codes entirely.`,
  },
  {
    q: 'What if the Student Discount button is missing from my profile?',
    a: `Email ${esc(STUDENT.contact)} with your student ID directly — emailing your ID is already the final step of the published process, so nothing is lost by starting there. The program is announced on the official X account but absent from the pricing page, so the in-app surface may move or change without notice.`,
  },
];

export const page = {
  path: '/godel-terminal-student-discount/',
  title: 'Godel Terminal Student Discount: The Official $5/Month Rate',
  description: 'Godel Terminal announced a $5/month student rate: .edu signup plus a student ID. How the official program works, whether it is still live, and how to check.',
  summary: 'The official Godel Terminal student program — $5 a month with a .edu email and a student ID — and why it beats every promo code in circulation.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/promo-codes/', label: 'Promo codes' },
    { href: '/godel-terminal-student-discount/', label: 'Student discount' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.9',
  render() {
    return `
<h1>Godel Terminal student discount: ${esc(STUDENT.display)} a month with a .edu email</h1>

<p class="lede">${esc(PRODUCT.name)} announced a student rate of <strong>${esc(STUDENT.display)} per ${esc(STUDENT.unit)}</strong>
on its official X account in November 2024: sign up with a .edu email, use the Student Discount button in your
profile, and email your student ID to ${esc(STUDENT.contact)}. If you have a .edu address and the program is
still live, it beats every promo code in circulation — including ours. Whether it is still live is the honest
open question on this page.</p>

${note(`<strong>One honest caveat before you plan around it:</strong> ${esc(STUDENT.note)} The program's only
published source is the <a href="${STUDENT.sourceUrl}" rel="nofollow noopener" target="_blank">official
@GodelTerminal announcement</a> from November 2024; the current
<a href="${PRODUCT.pricingUrl}" rel="nofollow noopener" target="_blank">pricing page</a> does not mention it.`, { warn: true })}

<h2>How to claim the student rate</h2>
<p class="prose">The process, exactly as the announcement describes it:</p>
<ol class="prose">
  ${STUDENT.steps.map((s) => `<li>${esc(s)}</li>`).join('\n  ')}
</ol>
<p class="prose">Every plan starts with a ${PRICING.freeTrial.days}-day free trial, so step one costs nothing —
the vendor's terms state the account is not charged until you upgrade to a paid plan.
<a href="/godel-terminal-free-trial/">How the trial works →</a></p>

${ctaRow({ primary: 'Start the free trial on Godel Terminal', secondary: { href: '/godel-terminal-pricing/', label: 'Full pricing breakdown' } })}

<h2>Student rate vs ${esc(PROMO.code)}: no contest</h2>
<p class="prose">Most pages in this niche would put the promo code first. That would be dishonest here, because
the arithmetic is not close:</p>

${table({
  head: ['Option', 'What you pay', 'Who it is for'],
  rows: [
    {
      highlight: true,
      cells: [
        'Student rate',
        `${esc(STUDENT.display)}/month, against a standard ${PRICING.monthly.display}/month`,
        'Anyone with a .edu email and a student ID',
      ],
    },
    {
      cells: [
        `Code <span class="mono">${esc(PROMO.code)}</span>`,
        `${PROMO.percent}% off the first month — roughly $${(PRICING.monthly.amount * 0.7).toFixed(2)} once, then ${PRICING.monthly.display}/month`,
        'Everyone without a .edu email',
      ],
    },
  ],
})}

<p class="prose">${esc(PROMO.code)} saves you about $${(PRICING.monthly.amount * 0.3).toFixed(2)}, once. The
student rate saves you $${PRICING.monthly.amount - STUDENT.amount} every month for as long as you qualify.
If you are a student, the student path is the answer and the code hunt is over — every code in circulation is
the same ${PROMO.percent}%-off-first-month referral offer anyway, as our
<a href="/promo-codes/">full code comparison</a> shows.</p>

<h2>If you do not have a .edu email</h2>
<p class="prose">Then the referral discount is the biggest saving available to you. Every referral code —
${esc(PROMO.code)}, NEWUSER, GET30, SHKRELI and the rest — applies the same ${PROMO.percent}% to your first
month, and even the vendor's own social promo code is smaller:
<a href="/godel-terminal-official-promo-code/">the official code X25 gives 25% →</a></p>

${codeBox({ note: `${PROMO.percent}% off your first month — the biggest discount for anyone who is not a student.` })}

<p class="prose">And if you run into a site advertising 40%, 50% or 75% off instead, it is fabricated —
<a href="/do-godel-terminal-coupons-work/">we checked every such claim →</a></p>

${faqSection(faqs)}
`;
  },
};
