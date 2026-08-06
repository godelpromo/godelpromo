import { PRODUCT, COMPANY, PRICING } from '../data/site.mjs';
import { OWNERSHIP, PRESS, VENDOR_PAGES } from '../data/research.mjs';
import { faqSection, table, note, esc } from '../lib/components.mjs';

const { preSeed, seed } = OWNERSHIP.funding;
const podcast = PRESS.find((p) => p.outlet.startsWith('Summation'));
const cto = COMPANY.people.find((p) => p.role === 'CTO');

const faqs = [
  {
    q: `Is Martin Shkreli the CEO of ${PRODUCT.name}?`,
    a: `Not stated anywhere we can cite. The company's own funding announcements name him only as co-founder, and no vendor or press source we found assigns him — or anyone — the CEO title. Co-founder is the only confirmed role, so it is the only one we report.`,
  },
  {
    q: `Who funds ${PRODUCT.name}?`,
    a: `${OWNERSHIP.funding.total} across two announced rounds: a ${preSeed.amount} pre-seed (July 2024) led by dao5, Naval Ravikant and Evolve Ventures, and a ${seed.amount} seed (January 2026) led by Infinitum with Flex Capital, dao5 and individual Godel users participating. Both announcements are linked in the table above.`,
  },
  {
    q: `Is ${PRODUCT.name} publicly traded?`,
    a: `No. ${COMPANY.legalName} is a private ${COMPANY.incorporation}. You cannot buy its shares on any exchange, and no source we found suggests a listing is planned.`,
  },
  {
    q: `Who is the CTO of ${PRODUCT.name}?`,
    a: `Third-party sites report ${cto.name} as CTO, but no vendor page we can access confirms it, so we carry it as reported rather than fact. The only vendor-confirmed name at the company is Martin Shkreli, co-founder.`,
  },
];

export const page = {
  path: '/who-owns-godel-terminal/',
  title: 'Who Owns Godel Terminal? DL Software, Shkreli, Funding',
  description: 'Godel Terminal is built by DL Software Inc., a Delaware C-corp with $7M raised. Martin Shkreli co-founded it. Who is behind the product, with sources.',
  summary: 'Godel Terminal is owned by DL Software Inc., a private Delaware C-corp co-founded by Martin Shkreli, with $7M raised across two cited rounds.',
  datePublished: '2026-08-05',
  breadcrumbs: [
    { href: '/', label: 'Home' },
    { href: '/guides/', label: 'Guides' },
    { href: '/who-owns-godel-terminal/', label: 'Who owns it' },
  ],
  faqs,
  includeOffer: false,
  priority: '0.8',
  render() {
    const fundingRows = [
      {
        cells: [
          '<strong>Pre-seed</strong>',
          esc(preSeed.amount),
          esc(preSeed.date),
          esc(preSeed.investors),
          `<a href="${preSeed.url}" rel="nofollow noopener" target="_blank">Wire press release</a>`,
        ],
      },
      {
        cells: [
          '<strong>Seed</strong>',
          esc(seed.amount),
          esc(seed.date),
          esc(seed.investors),
          `<a href="${seed.url}" rel="nofollow noopener" target="_blank">Company news page</a>`,
        ],
      },
    ];

    return `
<h1>Who owns Godel Terminal?</h1>

<p class="lede">${esc(PRODUCT.name)} is built and owned by ${esc(COMPANY.legalName)}, a
${esc(COMPANY.incorporation)} registered in Dover, Delaware. Martin Shkreli is a co-founder — confirmed in the
company's own funding announcements — and the company is private, with ${esc(OWNERSHIP.funding.total)} raised from
named investors including Naval Ravikant and Balaji Srinivasan. No other founder is publicly named.</p>

<h2>The company: ${esc(COMPANY.legalName)}</h2>

<p class="prose">${esc(OWNERSHIP.operator)} That is the entity on the vendor's terms, and the entity your
subscription contract is with. ${esc(PRODUCT.name)} is not the company's only product: the pre-seed release lists
Neets (a text-to-speech API), Dr. Gupta (an AI physician) and Shoggoth (image generation) in the same portfolio —
${esc(PRODUCT.name)} is the one that attracted the funding and the press.</p>

<p class="prose">The company hires in the open. ${esc(OWNERSHIP.careers.fact)} (Sources: the company's Hacker News
"Who is hiring" posts and its <a href="${VENDOR_PAGES.careers}" rel="nofollow noopener" target="_blank">careers
page</a>.) An onsite New York engineering team at those salaries is one of the more concrete ownership facts
available: someone is paying that payroll.</p>

<h2>The people — and the limits of what is published</h2>

<p class="prose">Exactly one name is vendor-confirmed: <strong>Martin Shkreli, co-founder</strong>, named in both
of the company's own funding announcements. "Co-founder" implies at least one other founder — and here the record
goes quiet: ${esc(OWNERSHIP.otherFounders)}</p>

<p class="prose">Third-party sites report ${esc(cto.name)} as CTO. No vendor page we can access confirms that, so
we render it as what it is: a reported claim, not a fact. Likewise, no source assigns anyone the CEO title. When a
company publishes this little about its own leadership, the honest move is to say so rather than fill the gap.</p>

<h2>The co-founder's record, stated plainly</h2>

<p class="prose">Shkreli's public record is part of any ownership answer, so here it is, cited and scoped. He was
convicted of securities fraud in 2017, sentenced to seven years in 2018, and released in 2022. The SEC's
subsequent civil action produced a permanent officer-and-director bar in February 2022
(<a href="${OWNERSHIP.shkreli.secBar.url}" rel="nofollow noopener" target="_blank">litigation release</a>) — a bar
that, by its terms, concerns officers and directors of public companies; ${esc(COMPANY.legalName)} is a private
company. Separately, the Second Circuit upheld the FTC's lifetime ban on his participation in the pharmaceutical
industry in January 2024 (<a href="${OWNERSHIP.shkreli.ftcBan.urls[0]}" rel="nofollow noopener"
target="_blank">CNBC report</a>) — a ban whose stated scope is the pharmaceutical industry; ${esc(COMPANY.legalName)}
builds financial software. We report the facts and their scopes as the sources give them and draw no legal
conclusion in either direction. How that record weighs on a buying decision is covered on
<a href="/is-godel-terminal-legit/">is Godel Terminal legit →</a></p>

${note(`One consequence of the founder's fame: referral sites trade on the name. SHKRELI is a real promo code —
run by a third-party site, not the company — and it gives the same standard offer as every other referral code.
<a href="/godel-terminal-shkreli-code/">The SHKRELI code, explained →</a>`)}

<h2>The funding, with sources</h2>

${table({ head: ['Round', 'Amount', 'Announced', 'Investors', 'Source'], rows: fundingRows, caption: `Total raised: ${OWNERSHIP.funding.total}. Both announcements are the company's own or a wire release.` })}

<p class="prose">${podcast ? `For color rather than facts: a February 2026 episode of the ${esc(podcast.outlet)}
(<a href="${podcast.url}" rel="nofollow noopener" target="_blank">${esc(podcast.title)}</a>) describes Shkreli as
co-founder of ${esc(COMPANY.legalName)}, parent of ${esc(PRODUCT.name)} — consistent with the funding releases.` : ''}</p>

<h2>From the January 2023 vision to what shipped</h2>

<p class="prose">Shkreli published the founding vision for Godel on his Substack in January 2023
(<a href="${OWNERSHIP.shkreli.vision.url}" rel="nofollow noopener" target="_blank">the post</a>): a "refactored
AWS-style version of what Bloomberg is today," promising usage-based pricing and a free tier. What shipped is
different on both counts: the product uses flat per-seat pricing — ${PRICING.annual.display} per
${esc(PRICING.annual.unit)}, vendor-stated — and no free tier exists on the current pricing page. Plans change
between manifesto and product; we note the difference because the original post still circulates.
<a href="/godel-terminal-pricing/">The pricing that actually shipped →</a></p>

<h2>Traction, as far as it is published</h2>

<p class="prose">The seed announcement claims users with individual assets totaling more than $1 billion have
adopted the platform, alongside major institutions. That is a vendor-stated claim, and it is also the only
traction figure that exists: no subscriber counts and no revenue figures are published anywhere we can find. The
vendor's marketing names hedge funds, family offices, RIAs, banks and Fortune 500 companies as customer types, and
publishes one named case study — weighed against the rest of the evidence on
<a href="/is-godel-terminal-legit/">the legitimacy page</a>. Whether any of it earns a
${PRICING.annual.display} seat is a separate, shorter question:
<a href="/is-godel-terminal-worth-it/">is Godel Terminal worth it →</a></p>

${faqSection(faqs)}
`;
  },
};
