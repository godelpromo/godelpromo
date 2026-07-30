/**
 * Godel Terminal command reference.
 *
 * Provenance is the entire value of this file, so `tier` is strict:
 *
 *   'official'   — Godel publishes a prose description of this command on its
 *                  own marketing site. We restate that description.
 *   'documented' — Godel publishes a documentation page at a known URL for this
 *                  mnemonic, AND names the matching capability on its site, but
 *                  we do not have vendor prose for it. We state that it exists
 *                  and what capability it maps to, and link the official doc.
 *                  We do NOT invent behavioural detail.
 *
 * Anything we cannot place in one of those two tiers does not get a card. It
 * goes in PHANTOM_COMMANDS below instead.
 *
 * The mnemonic list is derived from Godel's own documentation URLs
 * (godelterminal.com/docs/commands/<mnemonic>.html), harvested July 2026.
 * That makes every entry here independently checkable, which is exactly what
 * competing "cheat sheets" are not.
 */

const DOC = (m) => `https://godelterminal.com/docs/commands/${m}.html`;

export const COMMANDS = [
  // ---------- Tier: official (vendor-published descriptions) ----------
  {
    mnemonic: 'DES',
    name: 'Security Overview',
    tier: 'official',
    capability: 'Company description',
    headline: 'Every company, in one screen.',
    summary:
      'Business description, real-time price chart, market cap, EPS estimates, analyst ratings and key dates for any ticker.',
    detail:
      'Godel describes DES as the first command analysts type when a name lands on the desk. It is the orientation screen: what the company does, what it is worth right now, what the street expects, and what is on the calendar.',
    example: 'AAPL DES',
    category: 'Research',
    docUrl: DOC('des'),
    facts: [
      'Business description, real-time price chart and market cap',
      'EPS estimates and analyst ratings inline',
      'Key upcoming dates for the security',
    ],
  },
  {
    mnemonic: 'N',
    name: 'Company News',
    tier: 'official',
    capability: 'News',
    headline: 'News in milliseconds, filtered to your tickers.',
    summary:
      'Ticker-filtered news feed from primary wires, exchange notices and major outlets.',
    detail:
      'Supports both per-ticker pinning and a portfolio-wide feed across every name you hold. Godel positions this as consolidating more than $2,000 of media subscriptions into one dashboard, and it is the capability its own published customer testimonial singles out.',
    example: 'NVDA N',
    category: 'News',
    docUrl: DOC('n'),
    facts: [
      'Primary wires, exchange notices and major outlets',
      'Per-ticker pinning or portfolio-wide feed',
      'Vendor positions it as replacing >$2,000 in media subscriptions',
    ],
  },
  {
    mnemonic: 'QM',
    name: 'Quote Monitor',
    tier: 'official',
    capability: 'Quotes',
    headline: 'Streaming watchlists across every venue.',
    summary:
      'Real-time watchlists across equities, ETFs, indices and futures with bid/ask, change, volume and latency.',
    detail:
      'The number that decides whether QM can replace your existing watchlist: up to 400 tickers per list, with batch import. Most comparison articles omit that figure entirely.',
    example: 'QM',
    category: 'Market data',
    docUrl: DOC('qm'),
    facts: [
      'Up to 400 tickers per list',
      'Batch import supported',
      'Equities, ETFs, indices and futures',
      'Real-time bid/ask, change, volume and latency',
    ],
  },
  {
    mnemonic: 'CF',
    name: 'Company Filings',
    tier: 'official',
    capability: 'Filings',
    headline: 'Every SEC filing, in-product.',
    summary:
      '10-K, 10-Q, 8-K, S-1, proxies and 13Fs — sortable, filterable and rendered inside the workspace.',
    detail:
      'Filings pull directly from SEC EDGAR and render in the workspace, so there is no tab-switch to the source document mid-workflow. Note that 13F coverage here is also the practical route to institutional ownership data.',
    example: 'TSLA CF',
    category: 'Research',
    docUrl: DOC('cf'),
    facts: [
      '10-K, 10-Q, 8-K, S-1, proxies and 13Fs',
      'Pulls direct from SEC EDGAR',
      'Sortable and filterable in-product',
    ],
  },
  {
    mnemonic: 'FA',
    name: 'Financial Analysis',
    tier: 'official',
    capability: 'Financials',
    headline: 'Standardized financials, exportable to Excel.',
    summary:
      'Income statement, balance sheet and cash flow standardized across every company, annual and quarterly.',
    detail:
      'Each line item stays tied to the filing it came from, which is what makes the numbers auditable. Standardization across companies is what makes cross-name comparison possible; Excel export is what makes it usable in a model you already have.',
    example: 'MSFT FA',
    category: 'Research',
    docUrl: DOC('fa'),
    facts: [
      'Income statement, balance sheet and cash flow',
      'Annual and quarterly history',
      'Line items tied back to the underlying filing',
      'Exportable to Excel',
    ],
  },
  {
    mnemonic: 'WEI',
    name: 'World Equity Indices',
    tier: 'official',
    capability: 'Indices / Global markets',
    headline: 'Global market context, at a glance.',
    summary:
      'Real-time prices for every major equity index across the Americas, EMEA and Asia/Pacific in one ranked view.',
    detail:
      'Shows change, percentage change and year-to-date performance side by side. This is the open-of-day screen — one command instead of a browser full of index tabs.',
    example: 'WEI',
    category: 'Market data',
    docUrl: DOC('wei'),
    facts: [
      'Americas, EMEA and Asia/Pacific coverage',
      'Single ranked view',
      'Change, % change and YTD performance',
    ],
  },
  {
    mnemonic: 'EM',
    name: 'Earnings Matrix',
    tier: 'official',
    capability: 'Estimates',
    headline: 'Consensus, one screen.',
    summary:
      'Forward EPS and revenue estimates by quarter and year, with the P/E, P/S and P/CF multiples they imply.',
    detail:
      'Also carries every covering analyst’s rating and price target. The implied-multiple column is the useful part — it turns a consensus table into a valuation screen without exporting anything.',
    example: 'AMZN EM',
    category: 'Estimates',
    docUrl: DOC('em'),
    facts: [
      'Forward EPS and revenue estimates by quarter and year',
      'Implied P/E, P/S and P/CF multiples',
      'Every covering analyst’s rating and price target',
    ],
  },

  // ---------- Tier: documented (doc page + named capability, no vendor prose) ----------
  {
    mnemonic: 'OMON',
    name: 'Options Monitor',
    tier: 'documented',
    capability: 'Options',
    headline: 'The options chain function.',
    summary: 'Godel documents OMON as its options command; "Options" is an advertised capability.',
    detail:
      'Worth knowing because most third-party cheat sheets list "OPT" for options on Godel. Godel’s own documentation URL is for OMON, which follows the same convention legacy terminals use. If you have been typing OPT and getting nothing, this is why.',
    example: 'QQQ OMON',
    category: 'Options',
    docUrl: DOC('omon'),
    facts: [],
  },
  {
    mnemonic: 'EQS',
    name: 'Equity Screener',
    tier: 'documented',
    capability: 'Screening',
    headline: 'The screening function.',
    summary: 'Godel documents EQS; "Screening" is an advertised capability.',
    detail:
      'The documented screening command. Third-party guides frequently list "MOST" as Godel’s screener or movers list; there is no MOST page in Godel’s command documentation.',
    example: 'EQS',
    category: 'Screening',
    docUrl: DOC('eqs'),
    facts: [],
  },
  {
    mnemonic: 'HP',
    name: 'Historical Prices',
    tier: 'documented',
    capability: 'Historicals',
    headline: 'Historical price series.',
    summary: 'Godel documents HP; "Historicals" is an advertised capability.',
    detail:
      'The documented route to historical price data. Independent reviews often cite "G" or "GIP" for charting on Godel — neither has a page in the official command documentation.',
    example: 'AAPL HP',
    category: 'Charting',
    docUrl: DOC('hp'),
    facts: [],
  },
  {
    mnemonic: 'ANR',
    name: 'Analyst Recommendations',
    tier: 'documented',
    capability: 'Ratings',
    headline: 'Analyst ratings and recommendations.',
    summary: 'Godel documents ANR; "Ratings" is an advertised capability.',
    detail:
      'Standalone analyst ratings screen. Ratings also appear inline within DES and EM, so ANR is the drill-down rather than the only route to them.',
    example: 'NVDA ANR',
    category: 'Estimates',
    docUrl: DOC('anr'),
    facts: [],
  },
  {
    mnemonic: 'ERN',
    name: 'Earnings',
    tier: 'documented',
    capability: 'Earnings',
    headline: 'Earnings history and calendar.',
    summary: 'Godel documents ERN; "Earnings" is an advertised capability.',
    detail:
      'Distinct from EM (Earnings Matrix), which covers forward consensus estimates. ERN is the earnings function proper.',
    example: 'MSFT ERN',
    category: 'Research',
    docUrl: DOC('ern'),
    facts: [],
  },
  {
    mnemonic: 'TAS',
    name: 'Time & Sales',
    tier: 'documented',
    capability: 'TAS',
    headline: 'The tape — individual prints as they happen.',
    summary: 'Godel documents TAS and names it directly as a capability on its homepage.',
    detail:
      'One of the few mnemonics Godel prints verbatim in its own capability list, so this one is unambiguous. Used to read order flow and gauge buying versus selling pressure.',
    example: 'SPY TAS',
    category: 'Market data',
    docUrl: DOC('tas'),
    facts: [],
  },
  {
    mnemonic: 'HMS',
    name: 'Holders',
    tier: 'documented',
    capability: 'HMS / GR',
    headline: 'Institutional ownership.',
    summary: 'Godel documents HMS and names "HMS / GR" directly in its capability list.',
    detail:
      'The documented ownership screen. Third-party guides commonly list "HDS" for holders on Godel — that is the legacy-terminal mnemonic, and it does not have a page in Godel’s documentation. HMS does.',
    example: 'BRK.B HMS',
    category: 'Research',
    docUrl: DOC('hms'),
    facts: [],
  },
  {
    mnemonic: 'TRAN',
    name: 'Transactions',
    tier: 'documented',
    capability: 'Transactions',
    headline: 'Transaction data.',
    summary: 'Godel documents TRAN.',
    detail:
      'A documented command with no directly matching pill in Godel’s public capability list, so we are not going to guess at its exact scope. The official documentation page is linked below.',
    example: 'TRAN',
    category: 'Research',
    docUrl: DOC('tran'),
    facts: [],
  },
  {
    mnemonic: 'GLCO',
    name: 'Global Commodities',
    tier: 'documented',
    capability: 'Commodities',
    headline: 'Commodities pricing.',
    summary: 'Godel documents GLCO; "Commodities" is an advertised capability.',
    detail: 'The documented commodities screen, alongside WEI for equity indices and FX for currencies.',
    example: 'GLCO',
    category: 'Market data',
    docUrl: DOC('glco'),
    facts: [],
  },
  {
    mnemonic: 'FX',
    name: 'Foreign Exchange',
    tier: 'documented',
    capability: 'Forex',
    headline: 'Currency pricing.',
    summary: 'Godel documents FX; "Forex" is an advertised capability.',
    detail: 'The documented currency screen. Completes the cross-asset trio with WEI and GLCO.',
    example: 'FX',
    category: 'Market data',
    docUrl: DOC('fx'),
    facts: [],
  },
];

/**
 * Commands widely published by other Godel Terminal guides that do NOT appear
 * in Godel's own command documentation.
 *
 * This list exists because it is genuinely useful — a reader who has been
 * typing OPT and getting nothing deserves an explanation — and because being
 * the only page in the niche that checked is precisely why this page is worth
 * citing. Each entry names the documented command to use instead.
 */
export const PHANTOM_COMMANDS = [
  { claimed: 'OPT', claimedAs: 'Options chain', instead: 'OMON', note: 'Godel documents the options function as OMON.' },
  { claimed: 'HDS', claimedAs: 'Holders', instead: 'HMS', note: 'Godel documents the holders function as HMS, and names "HMS / GR" on its own site.' },
  { claimed: 'G', claimedAs: 'Chart', instead: 'HP', note: 'No G page exists in Godel’s command docs. HP is the documented historical price command.' },
  { claimed: 'GIP', claimedAs: 'Intraday chart', instead: 'HP', note: 'No GIP page exists in Godel’s command docs.' },
  { claimed: 'MOST', claimedAs: 'Most active', instead: 'EQS', note: 'No MOST page exists in Godel’s command docs. EQS is the documented screener.' },
  { claimed: 'FOCUS', claimedAs: 'Quick quote', instead: 'QM', note: 'No FOCUS page exists in Godel’s command docs. QM is the documented quote monitor.' },
  { claimed: 'SECF', claimedAs: 'SEC filings', instead: 'CF', note: 'Godel documents the filings function as CF.' },
];

/** Capabilities Godel names verbatim on its own homepage. */
export const ADVERTISED_CAPABILITIES = [
  'Quotes', 'Options', 'News', 'Filings', 'Financials', 'Estimates',
  'Ratings', 'Historicals', 'Earnings', 'Screening', 'TAS', 'HMS / GR',
  'Global Mkts', 'Indices', 'Commodities', 'Forex', 'Layouts', 'Excel',
];

export const officialCommands = () => COMMANDS.filter((c) => c.tier === 'official');
export const documentedCommands = () => COMMANDS.filter((c) => c.tier === 'documented');
export const commandCount = () => COMMANDS.length;
