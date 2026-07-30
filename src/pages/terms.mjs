import { SITE, PRODUCT, COMPANY, DISCLOSURE } from '../data/site.mjs';
import { esc } from '../lib/components.mjs';

export const page = {
  path: '/terms/',
  title: `Terms of Use — GodelPromo`,
  description: `Terms of use for godelpromo.com, covering affiliate disclosure, accuracy limitations, promo code caveats and the absence of financial advice.`,
  summary: 'Terms of use, affiliate disclosure and disclaimers for godelpromo.com.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/terms/', label: 'Terms' },
  ],
  priority: '0.3',
  changefreq: 'yearly',
  render() {
    return `
<h1>Terms of use</h1>

<p class="lede">By using godelpromo.com you accept the terms below. They are short because this is an
informational site, not a service.</p>

<h2>What this site is</h2>

<p class="prose">${esc(SITE.name)} is an independent informational resource about ${esc(PRODUCT.name)}.
${esc(DISCLOSURE.affiliate)}</p>

<h2>No financial advice</h2>

<p class="prose">${esc(DISCLOSURE.financial)} We are not brokers, registered investment advisers, or
regulated in any capacity. Nothing here is a recommendation to buy or sell any security, or to adopt any
trading strategy.</p>

<h2>Accuracy and currency</h2>

<p class="prose">${esc(DISCLOSURE.accuracy)}</p>

<p class="prose">We distinguish between vendor-published facts and third-party reported figures throughout the site,
and we take that distinction seriously. But ${esc(PRODUCT.name)} is in ${esc(PRODUCT.status)} and changes frequently.
Information here may be out of date by the time you read it. <strong>Confirm anything that matters to you directly
with ${esc(PRODUCT.name)} before relying on it</strong>, particularly prices, discounts and product capabilities.</p>

<h2>Promo codes</h2>

<p class="prose">Discount codes are issued and controlled by ${esc(COMPANY.legalName)}. We do not create them,
cannot guarantee they will work, and cannot reinstate one that has been withdrawn. A code failing at checkout is
between you and ${esc(PRODUCT.name)}.</p>

<h2>No warranty</h2>

<p class="prose">This site is provided "as is", without warranties of any kind. We do not warrant that the
information is complete, accurate or current, or that the site will be available uninterrupted.</p>

<h2>Limitation of liability</h2>

<p class="prose">To the maximum extent permitted by law, we are not liable for any loss arising from use of this
site or from any decision made in reliance on it — including subscription costs, trading losses, or losses from
acting on information that turned out to be incorrect.</p>

<h2>Third-party links</h2>

<p class="prose">Links to ${esc(PRODUCT.name)} and other third parties are provided for convenience.
We do not control those sites and are not responsible for their content, terms or privacy practices.</p>

<h2>Trademarks</h2>

<p class="prose">${esc(PRODUCT.name)} and related marks are the property of ${esc(COMPANY.legalName)}.
Bloomberg, FactSet, LSEG, Koyfin and TradingView marks belong to their respective owners.
Their use here is nominative — to identify the products being discussed — and does not imply any endorsement
or affiliation.</p>

<h2>Contact</h2>

<p class="prose"><a href="mailto:${esc(SITE.contactEmail)}">${esc(SITE.contactEmail)}</a>.
Corrections are welcome and acted on.</p>
`;
  },
};
