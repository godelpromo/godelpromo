import { SITE, PRODUCT, ANALYTICS } from '../data/site.mjs';
import { esc } from '../lib/components.mjs';

export const page = {
  path: '/privacy/',
  title: `Privacy Policy — GodelPromo`,
  description: `How godelpromo.com handles data: the analytics we run, what we never collect, how referral tracking works, and the choices available to you.`,
  summary: 'Privacy policy covering analytics, referral tracking and data handling on godelpromo.com.',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/privacy/', label: 'Privacy' },
  ],
  priority: '0.3',
  changefreq: 'yearly',
  render() {
    return `
<h1>Privacy policy</h1>

<p class="lede">Short version: this is a static informational site. We do not have accounts, we do not take
payments, and we never see your personal or financial details.</p>

<h2>What we never collect</h2>

<ul class="prose">
  <li>Payment details. Signup and billing happen entirely on ${esc(PRODUCT.name)}. We have no access to any of it.</li>
  <li>Account credentials. We do not have accounts.</li>
  <li>Names, addresses or phone numbers. There is no form on this site that asks for them.</li>
</ul>

<h2>What we do collect</h2>

<h3>Analytics</h3>
<p class="prose">We use Google Analytics 4 (property <span class="mono">${esc(ANALYTICS.ga4)}</span>) to understand
aggregate traffic — which pages are read, roughly where visitors come from, and which links get clicked.
This uses cookies and collects a truncated IP address. It is aggregate measurement, not individual profiling.</p>

<h3>Advertising measurement</h3>
<p class="prose">We use Google Ads conversion tracking (<span class="mono">${esc(ANALYTICS.googleAds)}</span>) to
measure whether advertising produces signups. This fires when you click through to ${esc(PRODUCT.name)}.</p>

<h3>Referral attribution</h3>
<p class="prose">Links to ${esc(PRODUCT.name)} carry a referral parameter. If you subscribe, ${esc(PRODUCT.name)}
attributes it to us and pays a commission. That attribution is handled by ${esc(PRODUCT.name)} and their referral
provider, under their privacy policy, not ours.</p>

<h2>Cookies</h2>

<p class="prose">The cookies set on this site come from Google Analytics and Google Ads. We set none of our own.
You can block them with browser settings, an extension, or by declining tracking at the browser level —
the site works identically either way, and the promo code is plain text you can read and copy without any script
running at all.</p>

<h2>Your choices</h2>

<ul class="prose">
  <li><strong>Browser controls</strong> — block or clear cookies at any time.</li>
  <li><strong>Google's opt-out</strong> — the Google Analytics opt-out browser add-on disables GA across all sites.</li>
  <li><strong>Just read the code</strong> — you do not need to click anything here. The code is on the page.</li>
</ul>

<h2>Third parties</h2>

<p class="prose">When you click through to ${esc(PRODUCT.name)}, you are on their site under their privacy policy.
We have no visibility into what happens there. The same applies to Google's services described above.</p>

<h2>Data requests</h2>

<p class="prose">We hold no personal data about you that we could retrieve or delete — everything we see is
aggregate analytics with no identifier we can tie to a person. For data held by Google, use Google's own controls.
For data held by ${esc(PRODUCT.name)}, contact them directly.</p>

<h2>Changes</h2>

<p class="prose">If this policy changes materially, the updated version appears here.
Questions: <a href="mailto:${esc(SITE.contactEmail)}">${esc(SITE.contactEmail)}</a>.</p>
`;
  },
};
