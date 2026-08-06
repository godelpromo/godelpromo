import { PRODUCT } from '../data/site.mjs';
import { PLATFORMS, ROADMAP } from '../data/research.mjs';
import { ctaRow, faqSection, note, esc } from '../lib/components.mjs';

const faqs = [
  {
    q: `Is there a Godel Terminal download for Windows or Mac?`,
    a: `No official one. The product is browser-based at app.godelterminal.com. An unofficial wrapper exists on WebCatalog, but it is not vendor-made — installing it means trusting a third party with your terminal session, which is a decision we identify rather than make for you.`,
  },
  {
    q: `Is the WebCatalog Godel Terminal app official?`,
    a: `No. It is a third-party wrapper around the web app, not a vendor product. Nothing published by ${PRODUCT.vendor} endorses it, and we neither recommend nor condemn it — we just note what it is so you can make the trust call yourself.`,
  },
  {
    q: `Is there a Godel Terminal iPhone or Android app?`,
    a: `No. No native mobile app exists. The web app loads in a phone browser, but users and reviewers describe it as not optimized for phone-sized screens. A mobile app appeared in the community-posted February 2025 roadmap with no date attached — a mention, not a commitment.`,
  },
];

export const page = {
  path: '/godel-terminal-desktop-and-mobile/',
  title: `Godel Terminal Desktop and Mobile: What Actually Exists`,
  description: `There is no native Godel Terminal desktop or mobile app. What exists: the browser terminal, popout windows, and an unofficial wrapper to treat with care.`,
  summary: 'No native Godel Terminal desktop or mobile app exists: the product is the browser terminal, with documented popout windows and an unofficial third-party wrapper.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/godel-terminal-desktop-and-mobile/', label: 'Desktop & mobile' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.7',
  render() {
    return `
<h1>Godel Terminal on desktop and mobile: what actually exists</h1>

<p class="lede">There is no native ${esc(PRODUCT.name)} desktop app and no mobile app. The product
is the browser terminal at app.godelterminal.com. What softens that on desktop is documented:
OS-level popout windows that put terminal panes on your desktop like standalone windows. What
exists beyond that — an unofficial wrapper, a roadmap mention for mobile — deserves precise
labeling, so this page labels it.</p>

<h2>The browser terminal is the product</h2>

<p class="prose">${esc(PRODUCT.name)} runs in the browser, and the vendor documents the
keyboard-first workflow around that: the backtick key opens the command terminal, and OS-level
popout windows are a documented feature, not a hack. The documented FOCUS command is the clearest
example — a stripped-down live-price view for a single security whose window can pop out to the
desktop. For a multi-monitor setup, popouts are the vendor's answer to "I want it to feel like an
installed terminal."</p>

<p class="prose">If you are new to the command-driven workflow, start with the
<a href="/starter-guide/">starter guide →</a> and the
<a href="/godel-terminal-commands/">command reference →</a></p>

<h2>Desktop: no official app, one unofficial wrapper</h2>

<p class="prose">No official desktop app exists. An unofficial wrapper is listed on WebCatalog — a
third-party service that packages web apps to look like installed ones. It is not made by
${esc(PRODUCT.vendor)}, and nothing the vendor publishes endorses it.</p>

${note(`<strong>How to think about the wrapper:</strong> installing it routes your terminal session
— a logged-in financial account — through software the vendor did not build and does not vouch for.
That is a third-party trust decision. We do not recommend it and we do not condemn it; we identify
it, which is more than a store listing will do. The cautious default is the browser plus the
documented popouts, which need no third party at all.`, { warn: true })}

<h2>Mobile: nothing native, a roadmap mention only</h2>

<p class="prose">No native iOS or Android app exists. The web app loads in mobile browsers, but
users and reviewers describe it as not optimized for phone-sized screens — community reporting,
and consistent. A mobile app appeared in the community-posted February 2025 pipeline post on the
official subreddit (${esc(ROADMAP.source)}), with no date and no commitment. If phone-first
monitoring is core to your workflow, evaluate ${esc(PRODUCT.name)} as a desk tool with no mobile
story today, not as a product with one arriving shortly.</p>

<h2>Does web-only matter for this product?</h2>

<p class="prose">A fair question to close on. The terminal's substance — the data it carries, the
delay tiers, the export routes — is unaffected by where it renders:
<a href="/godel-terminal-data-coverage/">the coverage map →</a> reads identically in any browser.
The place web-only genuinely bites is automation and integration, where the answer is already an
honest no for other reasons — no public API, exports instead
(<a href="/godel-terminal-api/">the API page →</a>). What is left is preference: if a browser tab
with OS-level popouts fits how you work, nothing here should stop you; if you need a native app as
a matter of policy, ${esc(PRODUCT.name)} does not have one to offer you.</p>

${ctaRow({ secondary: { href: '/godel-terminal-free-trial/', label: 'Try it in the browser first' } })}

${faqSection(faqs)}
`;
  },
};
