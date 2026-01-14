# GodelPromo SEO Package

This folder contains a small, SEO-friendly static site for godelpromo.com including:
- index.html (promo landing page)
- redeem.html (how to redeem)
- pricing.html
- starter-guide.html
- commands-cheatsheet.html
- alternatives.html
- faq.html
- about.html
- privacy.html
- terms.html
- robots.txt
- sitemap.xml

## Important
1) The required GA snippet (G-SC6EQMNYXP) is placed **immediately after** the closing </head> tag in every page.
2) Referral links to the official signup include:
   - rel="sponsored"
   - data-outbound="true" (used for click tracking)

## Deploy
Upload all files to your static host root (same folder).
Ensure these files exist alongside the HTML:
- favicon.ico
- godelpromo.png

After deploy:
- Add domain property in Google Search Console
- Submit https://www.godelpromo.com/sitemap.xml

Last generated: 2026-01-12
