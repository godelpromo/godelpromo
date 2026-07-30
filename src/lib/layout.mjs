import { SITE, PROMO, PRODUCT, PRICING, COMPANY, NAV, FOOTER_LINKS, ANALYTICS, DISCLOSURE } from '../data/site.mjs';

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const abs = (path) => new URL(path, SITE.origin).href;

/**
 * JSON-LD is emitted as one @graph with stable @id references rather than a
 * pile of standalone objects. Linking WebPage -> WebSite -> Organization and
 * pointing every page at a single Product node is what lets a parser resolve
 * "who is asserting this offer about what product" in one pass. Disconnected
 * blobs — which is what every competitor ships — do not resolve that way.
 */
function buildGraph({ url, title, description, breadcrumbs, faqs, datePublished, dateModified, extraNodes = [], includeOffer }) {
  const pageId = `${url}#webpage`;
  const orgId = `${SITE.origin}/#organization`;
  const siteId = `${SITE.origin}/#website`;
  const productId = `${SITE.origin}/#product`;

  const graph = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: SITE.name,
      url: SITE.origin + '/',
      description: SITE.tagline,
      email: SITE.contactEmail,
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: SITE.origin + '/',
      name: SITE.name,
      description: SITE.tagline,
      publisher: { '@id': orgId },
      inLanguage: SITE.locale,
    },
    {
      '@type': 'WebPage',
      '@id': pageId,
      url,
      name: title,
      description,
      isPartOf: { '@id': siteId },
      about: { '@id': productId },
      publisher: { '@id': orgId },
      inLanguage: SITE.locale,
      datePublished,
      dateModified,
      ...(breadcrumbs?.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
      primaryImageOfPage: { '@id': `${SITE.origin}/#primaryimage` },
    },
    {
      '@type': 'ImageObject',
      '@id': `${SITE.origin}/#primaryimage`,
      url: abs('/assets/og-cover.png'),
      contentUrl: abs('/assets/og-cover.png'),
      width: 1200,
      height: 630,
    },
  ];

  // The product this whole site is about. Offer carries the discount so the
  // code itself is machine-readable, not just prose in a heading.
  const product = {
    '@type': 'Product',
    '@id': productId,
    name: PRODUCT.name,
    description: PRODUCT.positioning,
    url: PRODUCT.officialUrl,
    category: 'Financial data terminal',
    brand: { '@type': 'Brand', name: PRODUCT.name },
    manufacturer: { '@type': 'Organization', name: COMPANY.legalName },
  };

  if (includeOffer) {
    product.offers = {
      '@type': 'Offer',
      '@id': `${SITE.origin}/#offer`,
      url: SITE.origin + '/',
      priceCurrency: PRICING.currency,
      price: PRICING.annual.amount,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: PRICING.annual.amount,
        priceCurrency: PRICING.currency,
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: 1,
          unitText: 'seat per year',
        },
      },
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: COMPANY.legalName },
    };
  }
  graph.push(product);

  if (breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.label,
        item: abs(b.href),
      })),
    });
  }

  if (faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  graph.push(...extraNodes);
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Header + nav, shared across every page. */
function header(currentPath) {
  const links = NAV.map((n) => {
    const active = n.href === currentPath;
    return `<a href="${n.href}"${active ? ' aria-current="page" class="is-active"' : ''}>${esc(n.label)}</a>`;
  }).join('\n          ');

  return `  <header class="site-header">
    <div class="wrap topbar">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-text">
          <span class="brand-name">GodelPromo</span>
          <span class="brand-sub">${esc(PROMO.code)} for ${esc(PRODUCT.name)}</span>
        </span>
      </a>

      <div class="promo-pill">
        <span class="promo-pill-label">Promo code</span>
        <strong class="promo-pill-code" data-code>${esc(PROMO.code)}</strong>
        <button class="btn btn-sm" type="button" data-copy>Copy</button>
      </div>

      <nav class="site-nav" aria-label="Primary">
          ${links}
      </nav>
    </div>
  </header>`;
}

function footer() {
  const links = FOOTER_LINKS.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join('\n        ');
  return `  <footer class="site-footer">
    <div class="wrap">
      <nav class="footer-links" aria-label="Footer">
        ${links}
      </nav>
      <div class="footer-links">
        <a href="${PRODUCT.officialUrl}" rel="nofollow noopener" target="_blank">Official site</a>
        <a href="${PRODUCT.docsUrl}" rel="nofollow noopener" target="_blank">Official documentation</a>
      </div>
      <p class="disclosure"><strong>Affiliate disclosure:</strong> ${esc(DISCLOSURE.affiliate)}</p>
      <p class="disclosure"><strong>Accuracy:</strong> ${esc(DISCLOSURE.accuracy)}</p>
      <p class="disclosure"><strong>Not financial advice:</strong> ${esc(DISCLOSURE.financial)}</p>
      <p class="copyright">&copy; ${new Date().getFullYear()} godelpromo.com &middot; An independent resource.</p>
    </div>
  </footer>`;
}

/**
 * Analytics is loaded after first paint on purpose. gtag is ~90KB of
 * render-blocking work in the original build and it was sitting between
 * </head> and <body>, which is invalid markup that browsers silently reparent.
 */
function analytics() {
  return `  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${ANALYTICS.ga4}');
    gtag('config', '${ANALYTICS.googleAds}');

    function gtag_report_conversion(url){
      var done = false;
      var go = function(){ if(done) return; done = true; if(url) window.location = url; };
      try {
        gtag('event','conversion',{
          send_to: '${ANALYTICS.conversionLabel}',
          value: 1.0, currency: 'USD', event_callback: go
        });
        setTimeout(go, 900);
      } catch(e){ go(); }
      return false;
    }

    addEventListener('load', function(){
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4}';
      document.head.appendChild(s);
    });
  </script>`;
}

/**
 * Renders a complete page.
 *
 * `bodyClass`, `hero` and `main` are raw HTML supplied by the page module.
 * Everything SEO-bearing (canonical, OG, JSON-LD, breadcrumbs) is derived here
 * so no page can forget it.
 */
export function renderPage({
  path,
  title,
  description,
  main,
  breadcrumbs = [],
  faqs = [],
  datePublished = '2026-01-12',
  dateModified,
  extraNodes = [],
  includeOffer = false,
  bodyClass = '',
  noindex = false,
}) {
  const url = abs(path);
  const graph = buildGraph({ url, title, description, breadcrumbs, faqs, datePublished, dateModified, extraNodes, includeOffer });

  const crumbHtml = breadcrumbs.length > 1
    ? `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${breadcrumbs
        .map((b, i) => i === breadcrumbs.length - 1
          ? `<li aria-current="page">${esc(b.label)}</li>`
          : `<li><a href="${b.href}">${esc(b.label)}</a></li>`)
        .join('')}</ol></nav>`
    : '';

  return `<!doctype html>
<html lang="${SITE.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="#070b14">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'}">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="stylesheet" href="/assets/site.css">
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs('/assets/og-cover.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs('/assets/og-cover.png')}">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<a class="skip-link" href="#main">Skip to content</a>
${header(path)}
  <main id="main">
    <div class="wrap">
${crumbHtml}
${main}
    </div>
  </main>
${footer()}

  <div class="mobile-bar">
    <button class="btn btn-block" type="button" data-copy>Copy ${esc(PROMO.code)}</button>
    <a class="btn btn-primary btn-block" href="${PROMO.referralLink}" rel="sponsored nofollow noopener" data-outbound>Open Godel Terminal</a>
  </div>

  <div class="toast" role="status" aria-live="polite" hidden></div>
${analytics()}
  <script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

export { esc, abs };
