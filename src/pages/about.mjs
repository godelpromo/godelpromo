import { SITE, PROMO, PRODUCT, COMPANY, DISCLOSURE } from '../data/site.mjs';
import { commandCount } from '../data/commands.mjs';
import { ctaRow, faqSection, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: 'Are you affiliated with Godel Terminal?',
    a: `No. ${SITE.name} is independent. ${PRODUCT.name} is built by ${COMPANY.legalName}. We participate in their public referral programme, which anyone can join.`,
  },
  {
    q: 'How do you make money?',
    a: `Referral commission when someone subscribes to ${PRODUCT.name} using our code. That commission is paid by ${PRODUCT.name} and does not change the price you pay.`,
  },
  {
    q: 'How do you verify what you publish?',
    a: `Vendor-published facts come from ${PRODUCT.name}'s own website and command documentation. Third-party figures are marked as such. We do not claim hands-on product testing we have not done.`,
  },
];

export const page = {
  path: '/about/',
  title: `About GodelPromo: Who We Are and How We Are Funded`,
  description: `GodelPromo is an independent Godel Terminal reference. Who runs it, how it makes money, how facts are sourced, and how to report an error.`,
  summary: 'Who runs GodelPromo, how it is funded, and how its facts are sourced and corrected.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/about/', label: 'About' },
  ],
  faqs,
  priority: '0.5',
  render() {
    return `
<h1>About GodelPromo</h1>

<p class="lede">${esc(SITE.name)} is an independent reference for ${esc(PRODUCT.name)} — the promo code,
what it actually discounts, real pricing, and a command list you can check against the vendor's own documentation.</p>

<h2>Why this site exists</h2>

<p class="prose">Search for a ${esc(PRODUCT.name)} discount and you get a dozen pages asserting slightly different
things with identical confidence. Several list commands that do not exist. Several quote discounts that do not exist.
Almost none tell you that every code in circulation is the same offer.</p>

<p class="prose">We take the opposite position on all three. We list our competitors' codes, we mark which pricing
figures are vendor-published and which are second-hand, and we maintain a
<a href="/godel-terminal-commands/">command reference</a> built from ${esc(PRODUCT.name)}'s own documentation URLs —
including a <a href="/godel-terminal-commands-that-dont-exist/">dated corrections ledger</a> — when
${esc(PRODUCT.name)}'s documentation expands and one of our claims goes stale, we say so publicly instead of
silently editing. All ${commandCount()} documented commands are covered.</p>

<h2>How we are funded</h2>

<p class="prose">${esc(DISCLOSURE.affiliate)}</p>

<p class="prose">Concretely: if you subscribe to ${esc(PRODUCT.name)} using ${esc(PROMO.code)}, we receive a
commission from ${esc(PRODUCT.name)}. You pay the same either way. It is the only way this site makes money, and
we would rather state it plainly at the top of every page than bury it.</p>

<p class="prose">The obvious tension is that we are paid to recommend one product. We handle it by publishing the
cases where ${esc(PRODUCT.name)} is the wrong choice — on the
<a href="/godel-terminal-alternatives/">alternatives page</a>, in the
<a href="/godel-terminal-vs-bloomberg/">Bloomberg comparison</a>, and in the
<a href="/godel-terminal-review/">review's</a> list of things we could not verify. You should still read us with
the bias in mind.</p>

<h2>How we source facts</h2>

<ul class="prose">
  <li><strong>Vendor-published</strong> — taken from ${esc(PRODUCT.name)}'s own website or command documentation.
  Stated as fact.</li>
  <li><strong>Third-party reported</strong> — corroborated across independent reviews but not on a vendor page.
  Explicitly labelled, and never promoted to a flat claim.</li>
  <li><strong>Not verified</strong> — we say so. The review page carries an explicit list of what we could not
  confirm.</li>
</ul>

<p class="prose">We have not used ${esc(PRODUCT.name)} hands-on and we do not pretend otherwise. A number of
competing reviews claim months of daily use and then get the command list wrong; we would rather be openly
second-hand and correct.</p>

<h2>Corrections</h2>

<p class="prose">If something here is wrong, tell us and we will fix it. Factual corrections about pricing,
commands or product capability are especially welcome — this site's only real asset is being right.
Reach us at <a href="mailto:${esc(SITE.contactEmail)}">${esc(SITE.contactEmail)}</a>.</p>

<p class="prose">If you are from ${esc(COMPANY.legalName)} and want something changed or clarified, the same
address reaches us and we will respond.</p>

<h2>What we are not</h2>

<ul class="prose">
  <li>Not the official ${esc(PRODUCT.name)} website — that is <a href="${PRODUCT.officialUrl}" rel="nofollow noopener" target="_blank">${esc(PRODUCT.officialUrl)}</a>.</li>
  <li>Not able to help with your account, billing, refunds or technical support. Contact ${esc(PRODUCT.name)} directly.</li>
  <li>Not financial advisers. Nothing here is investment advice.</li>
</ul>

${ctaRow({ secondary: { href: '/ai-instructions/', label: 'Machine-readable fact sheet' } })}

${faqSection(faqs)}
`;
  },
};
