/**
 * Extended research fact bank, harvested 2026-08-05.
 *
 * Same contract as site.mjs: every entry carries provenance. Tiers:
 *   'vendor'     — stated on a godelterminal.com / dl.software property or the
 *                  official @GodelTerminal account
 *   'press'      — reputable third party (wire releases, SEC/FTC, major press)
 *   'community'  — Reddit/HN/Trustpilot; ALWAYS render as attributed sentiment
 *                  ("users on r/X report…"), never as flat fact
 *   'affiliate'  — competitor promo/review sites; verify before repeating, and
 *                  usually the fact IS the claim itself ("site X claims…")
 *
 * Pages must not assert anything about these topics beyond what is here.
 * A fact you want but cannot find in this file is a fact the page states as
 * unknown — honest negatives are this site's signature.
 */

export const VENDOR_PAGES = {
  pricing: 'https://godelterminal.com/pricing/',
  terms: 'https://godelterminal.com/terms',
  referral: 'https://godelterminal.com/referral',
  dataCoverage: 'https://godelterminal.com/asset-classes-data-coverage/',
  traders: 'https://godelterminal.com/traders/',
  careers: 'https://godelterminal.com/careers',
  docsHub: 'https://godelterminal.com/docs',
  troubleshooting: 'https://godelterminal.com/docs/troubleshooting',
  companyNews: 'https://www.dl.software/news/',
};

/**
 * Trial history, from archived vendor app builds (harvested via Wayback,
 * 2026-08-05). The trial was 30 days in builds from November 2024 through
 * March 2025 and 14 days by August 2025; archived builds gate the trial to
 * accounts that have never had a subscription (`has_had_subscription`).
 */
export const TRIAL_HISTORY = {
  tier: 'vendor',
  was: '30-day free trial (archived app builds, November 2024 – March 2025)',
  now: '14-day free trial (vendor pricing page and terms, August 2026)',
  oneTime: 'Archived builds show the trial offered only to accounts that have never had a subscription.',
  source: 'archived app.godelterminal.com bundles via Wayback, 2026-08-05 harvest',
};

/** Cancellation and billing, from the vendor terms (August 2026). */
export const CANCELLATION = {
  tier: 'vendor',
  how: 'You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term.',
  autoRenews: true,
  trialTerms:
    'The account will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial.',
  refunds: null, // Nothing published. The terms cover cancellation but are silent on refunds.
  refundsNote: 'No refund policy is published anywhere we can find. Billing questions go to the vendor directly.',
  supportEmail: 'support@godelterminal.com',
  legalEmail: 'contact@dl.software',
  source: 'godelterminal.com/terms and /docs/troubleshooting, August 2026',
};

/** Asset-class and market coverage, from the vendor's own coverage page. */
export const DATA_COVERAGE = {
  tier: 'vendor',
  source: 'godelterminal.com/asset-classes-data-coverage/, August 2026',
  assetClasses: [
    'Stocks and ETFs across 25+ global exchanges (US, Europe, Asia, Americas, Africa)',
    'Major indices (S&P 500, Dow, Nasdaq, Nikkei, Hang Seng, DAX)',
    'Futures via CME, CBOT, NYMEX, COMEX and ICE',
    'FX — full cross-currency matrix',
    'Crypto spot pairs across major venues (BTC, ETH, SOL, stablecoins)',
    'US equity and ETF options via OPRA and Cboe',
    'SEC EDGAR filings, news wires, earnings calls, standardized financials',
  ],
  realtime:
    'All US exchanges, OTC, major FX pairs, commodity futures, crypto, US options, and select international venues (Korea Exchange)',
  delayed15: 'Most international equities — Euronext, LSE, Tokyo, Shanghai, Hong Kong, Australia',
  delayed25: 'International indices and some soft commodities',
  fixedIncome:
    'Effectively out of scope. No bond product page exists, and third-party reviews consistently list fixed-income desks as a non-fit.',
  fixedIncomeTier: 'affiliate',
  delayedIndicator: {
    tier: 'community',
    fact: 'A January 2025 changelog-style post on the official subreddit announced delayed-ticker indicators "added for transparency" — an in-product flag marking which quotes are delayed.',
    source: 'r/GodelTerminal, 2025-01-31 (pullpush archive, 2026-08-05 harvest)',
  },
};

/** Programmatic access. The honest answer is "no public API". */
export const API_FACTS = {
  publicApi: false,
  tier: 'vendor',
  tosNote: 'The vendor terms prohibit scraping and automated retrieval.',
  enterpriseNote:
    'The docs hub metadata mentions REST API and WebSocket access; search-indexed snippets describe it as enterprise, case-by-case. No public API documentation exists.',
  roadmapNote:
    'A February 2025 post on the official subreddit listed "data APIs" in the pipeline. Community-posted, no commitment or date.',
  roadmapTier: 'community',
  communityDemand:
    'Asked repeatedly — e.g. r/GodelTerminal (January 2025) "Is it possible to download data or access via API?", and an r/algotrading user in February 2025 praising the news feed speed while noting the lack of API access.',
  exportNote:
    'Several documented commands export to Excel CSV/JSON instead: FA (financials), EQS (screener results), HP (historical prices), IPO.',
  exportTier: 'vendor',
};

/** Platforms: web-first, no native apps. */
export const PLATFORMS = {
  web: { tier: 'vendor', note: 'Browser-based at app.godelterminal.com; the terminal opens via the backtick key. OS-level popout windows are documented.' },
  mobile: {
    tier: 'community',
    note: 'No native iOS or Android app exists. The web app loads in mobile browsers but reviewers and users describe it as not optimized for phone-sized screens. A mobile app appeared in the community-posted February 2025 roadmap, with no date.',
  },
  desktop: {
    tier: 'community',
    note: 'No official desktop app. An unofficial wrapper exists on WebCatalog — it is not vendor-made, and installing it is a third-party trust decision.',
  },
  notABroker: {
    tier: 'vendor',
    quote: 'Godel is your data and tape layer, not a broker. Run it next to whatever you trade through.',
    source: 'godelterminal.com/traders/',
    note: 'No order execution, no backtesting, no paper trading. BROK connects up to 14 brokerages read-only via SnapTrade (paid accounts only).',
  },
};

/**
 * Ownership, funding, and the Shkreli record. Framing rule for every page:
 * state documented facts with citations, note explicitly what each ban does
 * and does not cover, and never conclude "this is/isn't allowed" — we are not
 * lawyers and the sources do not say.
 */
export const OWNERSHIP = {
  operator: 'DL Software Inc., a Delaware C-corporation (registered at 8 The Green, Dover, Delaware).',
  operatorTier: 'vendor',
  shkreli: {
    role: 'Martin Shkreli is a co-founder of DL Software, named in the company’s own funding press releases.',
    tier: 'vendor',
    conviction: {
      fact: 'Shkreli was convicted of securities fraud in federal court in 2017, sentenced to seven years in 2018, and released in 2022. The SEC’s subsequent civil action, resolved in February 2022, produced the officer-and-director bar below.',
      url: 'https://www.sec.gov/enforcement-litigation/litigation-releases/lr-25337',
      tier: 'press',
    },
    secBar: {
      fact: 'In February 2022 the SEC obtained a permanent officer-and-director bar against Shkreli.',
      scope: 'The bar concerns serving as an officer or director of a public company. DL Software is private.',
      url: 'https://www.sec.gov/enforcement-litigation/litigation-releases/lr-25337',
      tier: 'press',
    },
    ftcBan: {
      fact: 'In January 2024 the Second Circuit upheld the FTC’s lifetime ban on Shkreli participating in the pharmaceutical industry.',
      scope: 'The ban is specific to the pharmaceutical industry.',
      urls: [
        'https://www.cnbc.com/2024/01/23/appeals-court-upholds-pharma-bro-martin-shkreli-lifetime-ban-from-drug-industry.html',
        'https://www.ftc.gov/news-events/news/press-releases/2024/01/statement-second-circuit-order-upholding-pharma-bro-martin-shkrelis-lifetime-ban',
      ],
      tier: 'press',
    },
    vision: {
      fact: 'Shkreli published the founding vision for Godel in January 2023 on his Substack: a "refactored AWS-style version of what Bloomberg is today", promising usage-based pricing and a free tier. The product that shipped uses flat per-seat pricing, and no free tier exists on the current pricing page.',
      url: 'https://martinshkreli.substack.com/p/january-2023-whats-new',
      tier: 'vendor',
    },
  },
  otherFounders:
    'No other founder is clearly named in any vendor or press source we found. Shkreli is consistently described as "co-founder", implying at least one other — unnamed publicly.',
  funding: {
    preSeed: {
      amount: '$2M',
      date: 'announced July 22, 2024',
      investors: 'led by dao5, Naval Ravikant and Evolve Ventures; participants included Balaji Srinivasan, Kevin Zhou, Meltem Demirors and founders from Anduril, Rippling, Flexport, Intercom, Lambda, Replit and Ankr',
      url: 'https://www.prnewswire.com/news-releases/dl-software-completes-2-million-pre-seed-investment-round-302226873.html',
      tier: 'press',
    },
    seed: {
      amount: '$5M',
      date: 'announced January 22, 2026',
      investors: 'led by Infinitum, with Flex Capital, dao5 and individual Godel users participating',
      url: 'https://www.dl.software/news/',
      tier: 'vendor',
    },
    total: '$7M',
  },
  traction: {
    fact: 'The seed announcement claims users with individual assets totaling more than $1 billion have adopted the platform, alongside major institutions. No subscriber counts or revenue figures are published anywhere.',
    tier: 'vendor',
  },
  portfolio: 'DL Software’s other products per its pre-seed release: Neets (text-to-speech API), Dr. Gupta (AI physician), Shoggoth (image generation).',
  careers: {
    fact: 'Hiring frontend and backend engineers, full-time onsite in New York, listed at $140–250k plus equity. Stack per the postings: TypeScript, React, WebSockets, Kotlin, Spring Boot, PostgreSQL, Kafka, Kubernetes, AWS.',
    sources: 'Hacker News "Who is hiring" posts by the GodelTerminal account; godelterminal.com/careers',
    tier: 'vendor',
  },
};

/**
 * Community sentiment. Render ONLY with attribution and only alongside the
 * caveat: organic discussion is thin everywhere, and a visible share of the
 * negativity targets the founder rather than the product.
 */
export const SENTIMENT = {
  caveat:
    'Review volume is thin on every platform. Trustpilot has three reviews; Hacker News has two submissions with zero comments between them. The honest summary is that there is not much organic discussion yet — most of what surfaces in search is affiliate content.',
  trustpilot: {
    score: '3.3/5',
    count: 3,
    unclaimed: true,
    url: 'https://www.trustpilot.com/review/www.godelterminal.com',
    tier: 'community',
  },
  positive: [
    { quote: 'fastest news feeds I’ve seen', who: 'an r/algotrading user', when: 'February 2025', note: 'same comment notes the lack of API access', tier: 'community' },
    { quote: 'doesn’t feel like a dinosaur like Bloomberg does', who: 'an r/ValueInvesting user', when: 'February 2025', tier: 'community' },
    { quote: 'Godel Terminal … looks super cool. More apps should be a CLI!', who: 'Amjad Masad, Replit CEO, on X', when: 'December 2024', url: 'https://x.com/amasad/status/1864516406894842170', tier: 'community' },
  ],
  negative: [
    { quote: 'that thing is not worth 60 bucks a month', who: 'an r/wallstreetbets user', when: 'December 2024, at the $60 price point', tier: 'community' },
    { summary: 'A SourceForge review reports bond-yield values displaying incorrectly for over a month, plus account-moderation complaints.', tier: 'community' },
    { summary: 'Trustpilot’s three reviews average 3.3/5; the middle one calls the subscription "a bit overvalued" while conceding it is decent.', tier: 'community' },
    { summary: 'Users on the official subreddit have reported login errors and heavy-handed chat moderation.', tier: 'community' },
    { summary: 'A post promoting Godel on r/Daytrading was removed by that subreddit’s moderators (observed via the pullpush archive, 2026-08-05 harvest).', tier: 'community' },
  ],
};

/** Press and notable coverage. */
export const PRESS = [
  {
    title: 'Martin Shkreli Is Back, Shorting Stocks and Taking On Everyone',
    outlet: 'Bloomberg',
    date: '2026-07-17',
    url: 'https://www.bloomberg.com/news/articles/2026-07-17/martin-shkreli-is-back-shorting-stocks-and-taking-on-everyone',
    note: 'Major-press profile touching Godel; paywalled.',
  },
  {
    title: 'Martin Shkreli on prison, beating Bloomberg, and being hated',
    outlet: 'Summation podcast (Auren Hoffman)',
    date: '2026-02-11',
    url: 'https://www.youtube.com/watch?v=uJ_VW-h1FO0',
    note: 'Describes Shkreli as co-founder of DL Software, parent of Godel Terminal.',
  },
  {
    title: 'Martin Shkreli Gives A Demo Of Godel Terminal',
    outlet: 'YouTube',
    date: '2025-06-01',
    url: 'https://www.youtube.com/watch?v=YhOdp87zwmk',
    note: 'First-party product demo.',
  },
];

/**
 * Competitor promo-site intelligence, for the per-code pages. Facts here are
 * about the SITES and their claims — checkable by visiting them — not about
 * the product.
 */
export const CODE_SITES = {
  GET30: {
    site: 'godelterminalpromocode.webflow.io',
    facts: [
      'Single-page site — its sitemap contains exactly one URL — that currently tops the promo-code query.',
      'Quotes a $60/month base price, two price changes out of date.',
      'Carries an unattributed "hedge fund manager" testimonial.',
      'Every button routes through a cloaked redirect (foxly.link) rather than a visible referral link.',
    ],
  },
  PROMO30: {
    site: 'godelterminal.webflow.io',
    facts: [
      'Review-styled single-page site; sitemap contains one URL.',
      'Uses the same cloaked foxly.link redirect as the GET30 site — the two are almost certainly run by the same operator.',
    ],
  },
  NEWUSER: {
    site: 'godeldiscount.com',
    facts: [
      'The most-built-out competitor: 27 URLs including a command list, an FAQ and an AI-instructions page.',
      'Displays a "Verified March 2026" badge — several months stale as of August 2026.',
      'Correctly notes the code applies to the monthly plan, with annual excluded.',
    ],
  },
  SHKRELI: {
    site: 'godelterminaldiscounts.com',
    facts: [
      'Promotes six codes (SHKRELI, SUMMER, 2025, BLOOMBERG, BLACKFRIDAY, CYBERMONDAY), all the same 30% referral offer.',
      'Its "Last updated:" labels render empty on every page we checked.',
      'Its CTA links carry via= tokens that do not match the codes displayed on the page.',
    ],
  },
  GUIDE: {
    site: 'godelguide.com',
    facts: [
      'The most honest competitor: its discount page openly lists rival codes including TAKE30 and states they are all identical referral tokens.',
      'Notes that annual billing beats monthly-plus-code beyond roughly nine months — a correct calculation.',
      'Its "verified weekly" claim was last actually dated 2026-05-17, months stale.',
    ],
  },
};

/**
 * The official subreddit r/GodelTerminal functions mostly as a changelog and
 * support channel; the team posts feature announcements there. The
 * February 2025 "Godel's Growing Pipeline" post listed: international
 * equities, charting v2, backtesting, a mobile app, economic calendars and
 * data APIs. Community-posted, no dates, no commitments.
 */
export const ROADMAP = {
  tier: 'community',
  items: ['International equities', 'Charting v2', 'Backtesting', 'Mobile app', 'Economic calendars', 'Data APIs'],
  source: 'r/GodelTerminal, February 2025',
};

/** Claims that circulate but that no vendor source supports. State as unverified if raised at all. */
export const UNVERIFIED_CLAIMS = [
  'An "AI copilot" answering questions from fundamentals, filings and transcripts — affiliate sites only.',
  'A "20,000+ verified high-value contacts" database — one affiliate site only.',
  '"2,565 news sources" — one affiliate site only; the vendor says "primary wires, exchange notices and major outlets".',
  'A military discount — one aggregator’s boilerplate only.',
  'SOC 2 or any published security/compliance posture — nothing published.',
  'A status page or uptime commitment — nothing published.',
];
