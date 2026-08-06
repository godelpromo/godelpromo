/**
 * Godel Terminal command reference.
 *
 * Provenance, verified 2026-08-05: every entry below has a resolving page in
 * Godel's own documentation at godelterminal.com/docs/commands/<mnemonic>,
 * cross-checked against the live godelterminal.com/sitemap.xml. 48 command
 * pages, all resolving. Canonical doc URLs are extensionless; the old .html
 * variants still return 200.
 *
 * `tier` is strict:
 *
 *   'official'   — Godel publishes marketing prose for this command beyond the
 *                  doc page. We restate that description.
 *   'documented' — the entry restates the command's official doc page and
 *                  nothing else. We do not invent behavioural detail.
 *
 * The alias rule: some mnemonics (OPT, CALL, PUT, GIP, GP, CN, NH, TR,
 * SEARCH, TK) work in-app but have NO standalone doc page — they are
 * documented as aliases on their canonical command's page, and their own doc
 * URLs 404. They live in `aliases` on the canonical entry and in the ALIASES
 * export, never as COMMANDS entries. That distinction — page versus alias —
 * is what most cheat sheets get wrong in both directions.
 *
 * `category` values are Godel's own six doc-hub groupings, verbatim.
 * CORRECTIONS is the public, dated ledger of what this file used to get
 * wrong; it is publishable content, not an internal changelog.
 */

// Canonical doc URLs are extensionless as of 2026-08-05 (.html variants still resolve).
const DOC = (m) => `https://godelterminal.com/docs/commands/${m}`;

export const CATEGORIES = [
  'Company & Security Analysis',
  'Market Data & Surveillance',
  'Portfolio & Risk',
  'Charting & Technicals',
  'Fundamentals & Filings',
  'Utilities & System',
];

export const COMMANDS = [
  // ---------- Company & Security Analysis ----------
  {
    mnemonic: 'DES',
    name: 'Description',
    tier: 'official',
    capability: 'Company description',
    headline: 'Every company, in one screen.',
    summary:
      'Business overview, real-time price chart, market cap, EPS estimates and analyst ratings for any stock.',
    detail:
      'Godel describes DES as the first command analysts type when a name lands on the desk. It is the orientation screen: what the company does, what it is worth right now, what the street expects, and what is on the calendar.',
    example: 'AAPL DES',
    category: 'Company & Security Analysis',
    docUrl: DOC('des'),
    facts: [
      'Business overview, real-time price chart and market cap',
      'EPS estimates and analyst ratings inline',
      'Key upcoming dates for the security',
    ],
  },
  {
    mnemonic: 'FA',
    name: 'Financials',
    tier: 'official',
    capability: 'Financials',
    headline: 'Standardized financials, exportable to Excel.',
    summary:
      'Income statement, balance sheet and cash-flow statement standardized across every company, quarterly and annual.',
    detail:
      'Each line item stays tied to the filing it came from, which is what makes the numbers auditable. Standardization across companies is what makes cross-name comparison possible; Excel and JSON export is what makes it usable in a model you already have.',
    example: 'MSFT FA',
    category: 'Company & Security Analysis',
    docUrl: DOC('fa'),
    facts: [
      'Income statement, balance sheet and cash-flow statement',
      'Annual and quarterly history',
      'Line items tied back to the underlying filing',
      'Exportable to Excel or JSON',
    ],
  },
  {
    mnemonic: 'ERN',
    name: 'Earnings Estimates',
    tier: 'documented',
    capability: 'Earnings estimates',
    headline: 'Consensus versus what actually happened.',
    summary:
      'Analyst consensus earnings estimates alongside the company’s estimate-versus-actual track record.',
    detail:
      'The doc page lists low, high and average EPS estimates, forward P/E, and the history of estimates against reported actuals. Distinct from EM, which covers the broader fundamental-metric matrix.',
    example: 'MSFT ERN',
    category: 'Company & Security Analysis',
    docUrl: DOC('ern'),
    facts: [
      'Low, high and average EPS estimates',
      'Forward P/E',
      'Estimate-versus-actual history',
    ],
  },
  {
    mnemonic: 'EM',
    name: 'Earnings Matrix',
    tier: 'official',
    capability: 'Estimates',
    headline: 'Fundamentals and consensus, one screen.',
    summary:
      'A company’s fundamental metric history alongside forward analyst estimates, with the valuation multiples they imply.',
    detail:
      'The doc page describes values and growth tables, a chart, and a valuation-multiples table. The implied-multiple view is the useful part — it turns a consensus table into a valuation screen without exporting anything.',
    example: 'AMZN EM',
    category: 'Company & Security Analysis',
    docUrl: DOC('em'),
    facts: [
      'Fundamental metric history alongside forward estimates',
      'Values and growth tables, plus chart',
      'Valuation-multiples table',
    ],
  },
  {
    mnemonic: 'SI',
    name: 'Short Interest',
    tier: 'documented',
    capability: 'Short interest',
    headline: 'Short positioning over time.',
    summary:
      'Short interest for a security over time: short positions, stock price and trading volume together.',
    detail:
      'Built on FINRA’s twice-monthly short-interest data, per the doc page — so the series steps twice a month rather than daily.',
    example: 'GME SI',
    category: 'Company & Security Analysis',
    docUrl: DOC('si'),
    facts: [
      'FINRA twice-monthly data',
      'Short positions, price and volume on one screen',
    ],
  },
  {
    mnemonic: 'GR',
    name: 'Ratio Analysis',
    tier: 'documented',
    capability: 'Ratios / correlation',
    headline: 'Two securities, one relationship.',
    summary:
      'Graphs the relationship between two securities over time: ratios, spreads or correlations.',
    detail:
      'The doc page describes dual-axis comparison, a ratio chart, and rolling correlation and regression with beta, alpha and R².',
    example: 'AAPL GR',
    category: 'Company & Security Analysis',
    docUrl: DOC('gr'),
    facts: [
      'Dual-axis compare of two securities',
      'Ratio chart',
      'Rolling correlation and regression (beta, alpha, R²)',
    ],
  },
  {
    mnemonic: 'ANR',
    name: 'Analyst Ratings',
    tier: 'documented',
    capability: 'Ratings',
    headline: 'The street’s view, in one table.',
    summary:
      'Analyst ratings, consensus price targets and recommendations on any publicly traded company.',
    detail:
      'The standalone ratings screen. Ratings also appear inline within DES, so ANR is the drill-down rather than the only route to them.',
    example: 'NVDA ANR',
    category: 'Company & Security Analysis',
    docUrl: DOC('anr'),
    facts: [],
  },
  {
    mnemonic: 'EVT',
    name: 'Company Events',
    tier: 'documented',
    capability: 'Events',
    headline: 'One timeline for everything a company does.',
    summary:
      'Will provide a consolidated real-time feed of company events: filings, trades and news in one timeline. Not yet available.',
    detail:
      'Godel’s documentation marks EVT as in active development — the doc page exists, the command does not ship yet. Listed here because the page is real; do not expect it to run today.',
    example: 'AAPL EVT',
    category: 'Company & Security Analysis',
    docUrl: DOC('evt'),
    facts: ['In active development — not yet available'],
    inDevelopment: true,
  },
  {
    mnemonic: 'DVD',
    name: 'Dividend Yield',
    tier: 'documented',
    capability: 'Dividends',
    headline: 'Dividend history and yield.',
    summary:
      'Dividend history and yield metrics for a security: trailing yield, forward yield, ex-dividend and payment dates.',
    detail:
      'Covers both trailing and forward yield, plus the two dates that matter for capture: ex-dividend and payment.',
    example: 'KO DVD',
    category: 'Company & Security Analysis',
    docUrl: DOC('dvd'),
    facts: [],
  },

  // ---------- Market Data & Surveillance ----------
  {
    mnemonic: 'QM',
    name: 'Quote Monitor',
    tier: 'official',
    capability: 'Quotes',
    headline: 'Streaming watchlists, your columns.',
    summary:
      'A customizable live watchlist: any tickers, any columns, real-time streaming, multiple tabs and layouts.',
    detail:
      'The number that decides whether QM can replace your existing watchlist: batch import of up to 400 tickers per list. Most comparison articles omit that figure entirely.',
    example: 'QM',
    category: 'Market Data & Surveillance',
    docUrl: DOC('qm'),
    facts: [
      'Up to 400 tickers per watchlist, batch import supported',
      'Any tickers, any columns',
      'Real-time streaming',
      'Multiple tabs and layouts',
    ],
  },
  {
    mnemonic: 'FOCUS',
    name: 'Focus',
    tier: 'documented',
    capability: 'Single-security view',
    headline: 'One security, zero clutter.',
    summary:
      'Live prices for a single security in a stripped-down, distraction-free view.',
    detail:
      'Works across equities, bonds, FX, crypto, indices and futures, and the window can pop out to your desktop. This site listed FOCUS as nonexistent until 2026-08-05; it now has an official doc page.',
    example: 'AAPL FOCUS',
    category: 'Market Data & Surveillance',
    docUrl: DOC('focus'),
    facts: [
      'Equities, bonds, FX, crypto, indices and futures',
      'Window can pop out to the desktop',
    ],
  },
  {
    mnemonic: 'TAS',
    name: 'Time and Sales',
    tier: 'documented',
    capability: 'TAS',
    headline: 'The tape — individual prints as they happen.',
    summary:
      'Streams every individual trade for a security as it happens: price, size, venue and condition code.',
    detail:
      'One of the few mnemonics Godel prints verbatim in its own capability list. Also answers to TR, an alias with no doc page of its own.',
    example: 'SPY TAS',
    category: 'Market Data & Surveillance',
    docUrl: DOC('tas'),
    facts: [],
    aliases: ['TR'],
  },
  {
    mnemonic: 'HCP',
    name: 'Historical Change %',
    tier: 'documented',
    capability: 'Historical change',
    headline: 'Day-over-day, pre-computed.',
    summary:
      'A daily table of historical price changes for a security: one row per trading day with absolute change, percent change and full OHLCV.',
    detail:
      'Where HP gives you the raw price series, HCP is the change-columns view of the same history.',
    example: 'AAPL HCP',
    category: 'Market Data & Surveillance',
    docUrl: DOC('hcp'),
    facts: [],
  },
  {
    mnemonic: 'WEI',
    name: 'World Equity Index',
    tier: 'official',
    capability: 'Indices / Global markets',
    headline: 'Global market context, at a glance.',
    summary:
      'Real-time prices for the world’s major equity indices across the Americas, EMEA and Asia/Pacific in one ranked view.',
    detail:
      'Shows change, percentage change and year-to-date performance side by side. This is the open-of-day screen — one command instead of a browser full of index tabs.',
    example: 'WEI',
    category: 'Market Data & Surveillance',
    docUrl: DOC('wei'),
    facts: [
      'Americas, EMEA and Asia/Pacific coverage',
      'Single ranked view',
      'Change, % change and YTD performance',
    ],
  },
  {
    mnemonic: 'WEIF',
    name: 'World Equity Index Futures',
    tier: 'documented',
    capability: 'Index futures',
    headline: 'The futures companion to WEI.',
    summary:
      'Real-time futures prices on the world’s major equity indices.',
    detail:
      'Same index universe as WEI, futures pricing instead of cash — useful outside cash-session hours.',
    example: 'WEIF',
    category: 'Market Data & Surveillance',
    docUrl: DOC('weif'),
    facts: [],
  },
  {
    mnemonic: 'IMAP',
    name: 'Intraday Market Map',
    tier: 'documented',
    capability: 'Market map',
    headline: 'The index, by sector, in color.',
    summary:
      'Intraday movement of a major index — the S&P 500 or the Dow Jones Industrial Average — broken down by sector and colored by performance.',
    detail:
      'Renders as a sector wheel or a sortable table, per the doc page.',
    example: 'IMAP',
    category: 'Market Data & Surveillance',
    docUrl: DOC('imap'),
    facts: [],
  },
  {
    mnemonic: 'HMAP',
    name: 'Market Heatmap',
    tier: 'documented',
    capability: 'Heatmap',
    headline: 'Your watchlist as a heatmap.',
    summary:
      'The intraday movement of an index, or any of your watchlists, as a market-cap-weighted heatmap. In beta.',
    detail:
      'Godel flags HMAP as beta in its documentation. Works on indices or on watchlists you have built yourself.',
    example: 'HMAP',
    category: 'Market Data & Surveillance',
    docUrl: DOC('hmap'),
    facts: ['Market-cap-weighted', 'Indices or your own watchlists', 'Beta'],
    beta: true,
  },
  {
    mnemonic: 'GLCO',
    name: 'Global Commodity Futures',
    tier: 'documented',
    capability: 'Commodities',
    headline: 'Commodity futures, five categories.',
    summary:
      'Monitors global commodity futures across Energy, Metals, Meat, Grain and Softs categories.',
    detail:
      'The documented commodities screen, alongside WEI for equity indices and FX for currencies.',
    example: 'GLCO',
    category: 'Market Data & Surveillance',
    docUrl: DOC('glco'),
    facts: [],
  },
  {
    mnemonic: 'FX',
    name: 'Forex Pairs',
    tier: 'documented',
    capability: 'Forex',
    headline: 'Currency pricing, as a matrix.',
    summary:
      'A cross-currency matrix of the major global currencies with real-time rates.',
    detail:
      'The documented currency screen. Completes the cross-asset trio with WEI and GLCO.',
    example: 'FX',
    category: 'Market Data & Surveillance',
    docUrl: DOC('fx'),
    facts: [],
  },
  {
    mnemonic: 'MOST',
    name: 'Most Active',
    tier: 'documented',
    capability: 'Movers',
    headline: 'The session’s movers, ranked.',
    summary:
      'The most active securities of the current session: ranked by volume, change, or gainers and losers.',
    detail:
      'Four documented views: Active, Gainers, Losers and Value. This site listed MOST as nonexistent until 2026-08-05; it now has an official doc page.',
    example: 'MOST',
    category: 'Market Data & Surveillance',
    docUrl: DOC('most'),
    facts: ['Views: Active, Gainers, Losers, Value'],
  },
  {
    mnemonic: 'HDS',
    name: 'Holders',
    tier: 'documented',
    capability: 'Ownership',
    headline: 'Institutional ownership.',
    summary:
      'Institutional ownership for any company: owner name, market value, share amount, change and change percentage.',
    detail:
      'Rows link through to the underlying Form 13F filings. Until 2026-08-05 this site — following Godel’s then-current docs — said HDS did not exist and pointed readers at HMS instead. HDS is the documented Holders command; HMS is a charting command.',
    example: 'AAPL HDS',
    category: 'Market Data & Surveillance',
    docUrl: DOC('hds'),
    facts: [
      'Owner, market value, shares, change and change %',
      'Links to Form 13F filings',
    ],
  },
  {
    mnemonic: 'N',
    name: 'News',
    tier: 'official',
    capability: 'News',
    headline: 'News in milliseconds, filtered to your tickers.',
    summary:
      'Real-time and historical news, filterable by source, ticker, language and keyword.',
    detail:
      'Supports both per-ticker pinning and a portfolio-wide feed across every name you hold. Godel positions this as consolidating more than $2,000 of media subscriptions into one dashboard, and it is the capability its own published customer testimonial singles out. Also answers to CN and NH.',
    example: 'NVDA N',
    category: 'Market Data & Surveillance',
    docUrl: DOC('n'),
    facts: [
      'Filterable by source, ticker, language and keyword',
      'Per-ticker pinning or portfolio-wide feed',
      'Vendor positions it as replacing >$2,000 in media subscriptions',
    ],
    aliases: ['CN', 'NH'],
  },
  {
    mnemonic: 'TOP',
    name: 'Top News',
    tier: 'documented',
    capability: 'News',
    headline: 'What Reuters thinks matters most.',
    summary:
      'A live feed of the top Reuters news headlines, ranked directly by Reuters.',
    detail:
      'The top-15 list updates live as Reuters re-ranks its priorities.',
    example: 'TOP',
    category: 'Market Data & Surveillance',
    docUrl: DOC('top'),
    facts: [],
  },
  {
    mnemonic: 'TREND',
    name: 'Trending on Godel',
    tier: 'documented',
    capability: 'Trending',
    headline: 'What other users are looking at.',
    summary:
      'The most-searched tickers in Godel, ranked by search count across all users, with timeframe filters from 1 hour to 1 month.',
    detail:
      'Attention as a data series: which names the platform’s own user base is pulling up right now.',
    example: 'TREND',
    category: 'Market Data & Surveillance',
    docUrl: DOC('trend'),
    facts: [],
  },
  {
    mnemonic: 'HALT',
    name: 'Market Halts',
    tier: 'documented',
    capability: 'Halts',
    headline: 'Who stopped trading, and why.',
    summary:
      'Today’s U.S. market trading halts from the official Nasdaq trader feed, including reason codes and resumption times.',
    detail:
      'Reason codes tell you why a name stopped trading; resumption times tell you when it comes back.',
    example: 'HALT',
    category: 'Market Data & Surveillance',
    docUrl: DOC('halt'),
    facts: [],
  },
  {
    mnemonic: 'ALLQ',
    name: 'All Quotes',
    tier: 'documented',
    capability: 'Consolidated quotes',
    headline: 'Every venue, one tree.',
    summary:
      'Every related listing of a security across venues and exchanges: live bid, ask, last and volume in an expandable tree. In beta.',
    detail:
      'The tree breaks out share classes, composites and venues. Godel flags ALLQ as beta, and bid/ask data requires registration.',
    example: 'AAPL ALLQ',
    category: 'Market Data & Surveillance',
    docUrl: DOC('allq'),
    facts: [
      'Expandable tree by share class, composite and venue',
      'Bid/ask requires registration',
      'Beta',
    ],
    beta: true,
  },
  {
    mnemonic: 'SECF',
    name: 'Securities Finder',
    tier: 'documented',
    capability: 'Search',
    headline: 'Search everything Godel indexes.',
    summary:
      'Searches across every instrument and person indexed in Godel: tickers, funds, people, venues and more.',
    detail:
      'Also answers to SEARCH and TK. Until 2026-08-05 this site listed SECF as a phantom "SEC filings" command — wrong on both counts: it exists, and it is a finder, not a filings screen. Filings is CF.',
    example: 'SECF',
    category: 'Market Data & Surveillance',
    docUrl: DOC('secf'),
    facts: [],
    aliases: ['SEARCH', 'TK'],
  },
  {
    mnemonic: 'WJI',
    name: 'Wojak Index',
    tier: 'documented',
    capability: 'Sentiment',
    headline: 'Sentiment, measured in wojaks.',
    summary:
      'The live Wojak Index: a real-time sentiment gauge built from Pink/Green wojak emoji usage in Godel’s #general chat.',
    detail:
      'Nine sentiment states, from Mania to Annihilation. Yes, it is a real documented command.',
    example: 'WJI',
    category: 'Market Data & Surveillance',
    docUrl: DOC('wji'),
    facts: ['Nine sentiment states, Mania to Annihilation'],
  },

  // ---------- Portfolio & Risk ----------
  {
    mnemonic: 'EQS',
    name: 'Equity Screener',
    tier: 'documented',
    capability: 'Screening',
    headline: 'Screen the global equity universe.',
    summary:
      'Screens the global equity universe on valuation, fundamentals, size and classification criteria.',
    detail:
      'Screen results export to Excel CSV or JSON, per the doc page.',
    example: 'EQS',
    category: 'Portfolio & Risk',
    docUrl: DOC('eqs'),
    facts: ['Valuation, fundamentals, size and classification criteria', 'Exports to Excel CSV or JSON'],
  },
  {
    mnemonic: 'OMON',
    name: 'Option Chain',
    tier: 'documented',
    capability: 'Options',
    headline: 'The options chain function.',
    summary:
      'The real-time options chain of a security: every strike and expiration with live bid, ask, last, volume, IV and full Greeks.',
    detail:
      'Also answers to OPT, CALL and PUT — typed aliases with no doc pages of their own. If a guide told you OPT was not a real command (this site did, until 2026-08-05), the subtlety is that it works in-app as an alias of OMON.',
    example: 'QQQ OMON',
    category: 'Portfolio & Risk',
    docUrl: DOC('omon'),
    facts: [
      'Every strike and expiration',
      'Live bid, ask, last, volume, IV',
      'Full Greeks',
    ],
    aliases: ['OPT', 'CALL', 'PUT'],
  },
  {
    mnemonic: 'OVME',
    name: 'Black-Scholes',
    tier: 'documented',
    capability: 'Options pricing',
    headline: 'Theoretical option pricing.',
    summary:
      'A Black-Scholes options pricing calculator with full Greeks and implied-volatility calculation.',
    detail:
      'The theoretical-pricing companion to OMON’s live chain.',
    example: 'OVME',
    category: 'Portfolio & Risk',
    docUrl: DOC('ovme'),
    facts: [],
  },
  {
    mnemonic: 'CALC',
    name: 'Calculator',
    tier: 'documented',
    capability: 'Calculator',
    headline: 'A calculator that knows finance.',
    summary:
      'An inline financial calculator with standard and finance modes.',
    detail:
      'Standard and scientific modes, plus a finance mode covering PV, rate, PMT and FV.',
    example: 'CALC',
    category: 'Portfolio & Risk',
    docUrl: DOC('calc'),
    facts: [],
  },
  {
    mnemonic: 'BROK',
    name: 'Brokerage',
    tier: 'documented',
    capability: 'Brokerage link',
    headline: 'Connect your brokerage.',
    summary:
      'Connects one or more brokerage accounts to Godel through SnapTrade, unlocking AUM views and portfolio features.',
    detail:
      'The doc page lists 14 supported brokerages; connections are read-only and available on paid accounts only.',
    example: 'BROK',
    category: 'Portfolio & Risk',
    docUrl: DOC('brok'),
    facts: [
      '14 brokerages via SnapTrade',
      'Read-only connections',
      'Paid accounts only',
    ],
  },
  {
    mnemonic: 'AUM',
    name: 'Brokerage AUM',
    tier: 'documented',
    capability: 'AUM',
    headline: 'Connected assets, totalled.',
    summary:
      'Connected-brokerage asset totals: either the aggregate across all Godel users or your own linked accounts.',
    detail:
      'The view unlocked by connecting a brokerage through BROK.',
    example: 'AUM',
    category: 'Portfolio & Risk',
    docUrl: DOC('aum'),
    facts: [],
  },

  // ---------- Charting & Technicals ----------
  {
    mnemonic: 'G',
    name: 'Chart',
    tier: 'documented',
    capability: 'Charting',
    headline: 'The chart window.',
    summary:
      'Historical and real-time charting: OHLCV candles, volume, drawing tools, and indicators powered by TradingView.',
    detail:
      'The window is alertable, linkable, and embeddable inside CHAT messages. Also answers to GIP and GP. Until 2026-08-05 this site said G had no doc page and pointed chart-seekers at HP — G now has an official page of its own.',
    example: 'AAPL G',
    category: 'Charting & Technicals',
    docUrl: DOC('g'),
    facts: [
      'OHLCV candles, volume, drawing tools',
      'Indicators powered by TradingView',
      'Alertable, linkable, embeddable in CHAT',
    ],
    aliases: ['GIP', 'GP'],
  },
  {
    mnemonic: 'HMS',
    name: 'Historical Multiple Security',
    tier: 'documented',
    capability: 'Multi-security chart',
    headline: 'Many securities, one chart.',
    summary:
      'Compares multiple securities historically on a single chart: normalize, overlay, or display side-by-side.',
    detail:
      'Correction, for the record: this site previously described HMS as Godel’s holders screen. It is not — HMS is the multi-security comparison chart. Holders is HDS.',
    example: 'AAPL HMS',
    category: 'Charting & Technicals',
    docUrl: DOC('hms'),
    facts: [],
  },
  {
    mnemonic: 'HP',
    name: 'Historical Prices',
    tier: 'documented',
    capability: 'Historicals',
    headline: 'Historical price series, as a table.',
    summary:
      'A security’s historical prices as a daily or intraday table: OHLCV exportable to Excel or JSON.',
    detail:
      'Resolutions run 1D, 1H and 1M; intraday resolutions require an entitlement (see ENT).',
    example: 'AAPL HP',
    category: 'Charting & Technicals',
    docUrl: DOC('hp'),
    facts: [
      '1D, 1H and 1M resolutions',
      'Intraday resolutions require entitlement',
      'Exports to Excel or JSON',
    ],
  },

  // ---------- Fundamentals & Filings ----------
  {
    mnemonic: 'CF',
    name: 'Filings',
    tier: 'official',
    capability: 'Filings',
    headline: 'Every SEC filing, in-product.',
    summary:
      'SEC EDGAR filings from a company’s inception through today: 10-Ks, 10-Qs, 8-Ks, proxies and more, rendered inside the workspace.',
    detail:
      'Filings pull directly from SEC EDGAR and render in the workspace, so there is no tab-switch to the source document mid-workflow. For institutional ownership specifically, HDS is now the dedicated screen.',
    example: 'TSLA CF',
    category: 'Fundamentals & Filings',
    docUrl: DOC('cf'),
    facts: [
      '10-Ks, 10-Qs, 8-Ks, proxies and more',
      'Coverage from company inception through today',
      'Pulls direct from SEC EDGAR',
    ],
  },
  {
    mnemonic: 'IPO',
    name: 'Initial Public Offerings',
    tier: 'documented',
    capability: 'IPOs',
    headline: 'The listing calendar, both directions.',
    summary:
      'Upcoming and recent IPOs with expected pricing, exchange, underwriters and post-listing performance.',
    detail:
      'Covers both the calendar ahead and how recent listings have traded since.',
    example: 'IPO',
    category: 'Fundamentals & Filings',
    docUrl: DOC('ipo'),
    facts: [],
  },
  {
    mnemonic: 'TRAN',
    name: 'Earnings Hub',
    tier: 'documented',
    capability: 'Transcript search',
    headline: 'Search what management actually said.',
    summary:
      'Searches earnings calls: full-text search across firms, quarters and years, with direct-link citations.',
    detail:
      'This site previously listed TRAN with its scope unknown. Godel’s docs now describe it as the earnings-call search — full text, across firms and years, with citations that link back into the source call.',
    example: 'TRAN',
    category: 'Fundamentals & Filings',
    docUrl: DOC('tran'),
    facts: ['Full-text search across firms, quarters and years', 'Direct-link citations'],
  },

  // ---------- Utilities & System ----------
  {
    mnemonic: 'HELP',
    name: 'Help',
    tier: 'documented',
    capability: 'Help',
    headline: 'The built-in quick reference.',
    summary:
      'Command syntax, keyboard shortcuts, and the full command list, inside the app.',
    detail:
      'Also invoked with F1. The fastest way to check a mnemonic without leaving the terminal.',
    example: 'HELP',
    category: 'Utilities & System',
    docUrl: DOC('help'),
    facts: [],
  },
  {
    mnemonic: 'CHAT',
    name: 'Chat',
    tier: 'documented',
    capability: 'Chat',
    headline: 'The trading floor, in a window.',
    summary:
      'The in-app chat: public rooms, ticker-specific rooms, private DMs, and user-created group chats in one window.',
    detail:
      'A single-instance window — only one CHAT can be open at a time.',
    example: 'CHAT',
    category: 'Utilities & System',
    docUrl: DOC('chat'),
    facts: [],
  },
  {
    mnemonic: 'ACM',
    name: 'Account Management',
    tier: 'documented',
    capability: 'Account',
    headline: 'Your account, in-terminal.',
    summary:
      'Manages your account: edit your profile, change your subscription, update billing, and view invoice history.',
    detail:
      'Profile, subscription, billing and invoices all live behind one mnemonic.',
    example: 'ACM',
    category: 'Utilities & System',
    docUrl: DOC('acm'),
    facts: [],
  },
  {
    mnemonic: 'PDF',
    name: 'Settings',
    tier: 'documented',
    capability: 'Settings',
    headline: 'Personal defaults, not documents.',
    summary:
      'Your personal user settings and preferences: appearance, default layouts, data feed settings and keyboard behavior.',
    detail:
      'The mnemonic stands for personal defaults — typing PDF opens settings, not a file viewer.',
    example: 'PDF',
    category: 'Utilities & System',
    docUrl: DOC('pdf'),
    facts: [],
  },
  {
    mnemonic: 'AL',
    name: 'Alerts',
    tier: 'documented',
    capability: 'Alerts',
    headline: 'Desktop alerts on any security.',
    summary:
      'Creates desktop alerts on any security’s price, volume, or intraday change.',
    detail:
      'Alerts fire once when the condition is met, then automatically clear.',
    example: 'TSLA AL',
    category: 'Utilities & System',
    docUrl: DOC('al'),
    facts: ['Price, volume or intraday-change conditions', 'Fire once, then automatically clear'],
  },
  {
    mnemonic: 'NOTE',
    name: 'Notes',
    tier: 'documented',
    capability: 'Notes',
    headline: 'Notes that survive the session.',
    summary:
      'A rich-text notes editor, persisted across sessions and linkable to securities.',
    detail:
      'Built on Lexical, autosaves every 10 seconds, and requires an account.',
    example: 'NOTE',
    category: 'Utilities & System',
    docUrl: DOC('note'),
    facts: ['Autosaves every 10 seconds', 'Linkable to securities', 'Requires an account'],
  },
  {
    mnemonic: 'ENT',
    name: 'Entitlements',
    tier: 'documented',
    capability: 'Entitlements',
    headline: 'Add-on feeds and features.',
    summary:
      'Manages add-on exchange feeds and premium features layered on top of your base Godel subscription.',
    detail:
      'Where entitlement-gated features unlock — HP’s intraday resolutions, for example, require one.',
    example: 'ENT',
    category: 'Utilities & System',
    docUrl: DOC('ent'),
    facts: [],
  },
  {
    mnemonic: 'CHANGE',
    name: 'Changelog',
    tier: 'documented',
    capability: 'Changelog',
    headline: 'What shipped, and when.',
    summary:
      'The product changelog: a versioned timeline of every feature, fix and improvement shipped.',
    detail:
      'The product moves faster than third-party guides; CHANGE is the vendor’s own record of what changed and when.',
    example: 'CHANGE',
    category: 'Utilities & System',
    docUrl: DOC('change'),
    facts: [],
  },
];

/**
 * Mnemonics that work in-app but have no standalone doc page. Each is
 * documented as an alias on its canonical command's page; its own doc URL
 * (e.g. godelterminal.com/docs/commands/opt) is a true 404. These are the
 * "commands that work but have no page" — the mirror image of a phantom.
 */
export const ALIASES = [
  { alias: 'OPT', canonical: 'OMON', note: 'Legacy options mnemonic. Opens the OMON option chain; documented on the OMON page.' },
  { alias: 'CALL', canonical: 'OMON', note: 'Opens the OMON option chain; documented on the OMON page.' },
  { alias: 'PUT', canonical: 'OMON', note: 'Opens the OMON option chain; documented on the OMON page.' },
  { alias: 'GIP', canonical: 'G', note: 'Legacy intraday-chart mnemonic. Opens the G chart window; documented on the G page.' },
  { alias: 'GP', canonical: 'G', note: 'Opens the G chart window; documented on the G page.' },
  { alias: 'CN', canonical: 'N', note: 'Opens the N news window; documented on the N page.' },
  { alias: 'NH', canonical: 'N', note: 'Opens the N news window; documented on the N page.' },
  { alias: 'TR', canonical: 'TAS', note: 'Opens the TAS time-and-sales tape; documented on the TAS page.' },
  { alias: 'SEARCH', canonical: 'SECF', note: 'Opens the SECF securities finder; documented on the SECF page.' },
  { alias: 'TK', canonical: 'SECF', note: 'Opens the SECF securities finder; documented on the SECF page.' },
];

/**
 * The public corrections ledger. This site corrects itself in the open: when
 * a previous claim stops being true (or turns out to have been wrong), the
 * change is recorded here with a date instead of being silently edited away.
 * Rendered on /godel-terminal-commands-that-dont-exist/.
 */
export const CORRECTIONS = [
  {
    date: '2026-08-05',
    was: '17 commands documented',
    now: '48 command pages, all resolving',
    note: 'Verified against godelterminal.com/sitemap.xml. Godel’s documentation expanded massively; most guides — this site included, until today — were behind it.',
  },
  {
    date: '2026-08-05',
    was: 'HDS listed as nonexistent ("use HMS instead")',
    now: 'HDS is the documented Holders command',
    note: 'Institutional ownership — owner, market value, shares, change — with links to Form 13F filings.',
  },
  {
    date: '2026-08-05',
    was: 'HMS described as Godel’s holders screen',
    now: 'HMS is Historical Multiple Security, a multi-security comparison chart',
    note: 'Our reading of the "HMS / GR" capability pill was wrong once real doc pages existed for both. Holders is HDS.',
  },
  {
    date: '2026-08-05',
    was: 'G and GIP listed as nonexistent ("use HP instead")',
    now: 'G is the documented Chart command; GIP and GP are typed aliases of G',
    note: 'A TradingView-powered charting window with its own doc page. HP remains the historical price table.',
  },
  {
    date: '2026-08-05',
    was: 'OPT listed as a phantom command',
    now: 'OPT works in-app as a documented alias of OMON (so do CALL and PUT)',
    note: 'Aliases have no doc pages of their own — /docs/commands/opt still 404s — but they are documented on the OMON page. "Not a real command" was wrong in a subtle way.',
  },
  {
    date: '2026-08-05',
    was: 'MOST listed as nonexistent ("use EQS instead")',
    now: 'MOST is the documented Most Active command',
    note: 'Session movers ranked by volume, change, or gainers/losers. EQS remains the screener.',
  },
  {
    date: '2026-08-05',
    was: 'FOCUS listed as nonexistent ("use QM instead")',
    now: 'FOCUS is the documented single-security Focus view',
    note: 'A stripped-down live-price window that can pop out to the desktop. QM remains the multi-ticker watchlist.',
  },
  {
    date: '2026-08-05',
    was: 'SECF listed as nonexistent ("use CF for filings")',
    now: 'SECF is the documented Securities Finder; SEARCH and TK are aliases',
    note: 'It was never a filings command — it searches instruments and people. Filings remains CF.',
  },
  {
    date: '2026-08-05',
    was: 'TRAN listed with scope unknown',
    now: 'TRAN is documented as the Earnings Hub',
    note: 'Full-text search of earnings calls across firms, quarters and years, with direct-link citations.',
  },
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
