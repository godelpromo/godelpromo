#!/usr/bin/env node
/**
 * IndexNow submission.
 *
 * Why this matters more than it looks: ChatGPT's search and Microsoft Copilot
 * are served from the Bing index. Waiting for an organic Bing crawl on a small
 * site can take weeks. IndexNow pushes URLs the moment they change, and Bing,
 * Yandex, Seznam and Naver all consume the same endpoint.
 *
 * Google does not participate — for Google, the sitemap plus Search Console is
 * still the route.
 *
 * Requires INDEXNOW_KEY: a self-chosen hex string, 8-128 chars. The build
 * writes <key>.txt into dist/ so the endpoint can verify ownership.
 *
 *   INDEXNOW_KEY=<key> node scripts/indexnow.mjs
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const HOST = 'www.godelpromo.com';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.error('INDEXNOW_KEY is not set. Generate one with:');
  console.error("  node -e \"console.log(require('crypto').randomBytes(16).toString('hex'))\"");
  process.exit(1);
}
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
  console.error('INDEXNOW_KEY must be 8-128 chars, letters/digits/dashes only.');
  process.exit(1);
}

const sitemap = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!sitemapUrls.length) {
  console.error('No URLs found in dist/sitemap.xml — run the build first.');
  process.exit(1);
}

/**
 * Legacy pre-clean-URL paths, submitted alongside the live pages.
 *
 * These are not in the sitemap and never will be — they 301 to their new
 * homes. But Bing still holds several of them with pre-rebuild titles
 * (/redeem.html, /faq.html, /privacy.html were all still in the index in
 * September 2026), and a redirect is only consumed when the old URL is
 * fetched again. Submitting them is the only way to force that fetch; a
 * sitemap cannot list a URL that 301s.
 */
const legacyUrls = [
  '/index.html', '/redeem.html', '/pricing.html', '/starter-guide.html',
  '/commands-cheatsheet.html', '/alternatives.html', '/faq.html', '/about.html',
  '/privacy.html', '/terms.html',
].map((p) => `https://${HOST}${p}`);

const urlList = [...sitemapUrls, ...legacyUrls];

const body = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/${key}.txt`,
  urlList,
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

// IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
// 403 means the key file is not reachable at keyLocation yet — that is the
// usual failure right after a first deploy, and it resolves on the next run.
const text = await res.text().catch(() => '');
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs (${sitemapUrls.length} live + ${legacyUrls.length} legacy redirects)`);
if (text) { console.log(text.slice(0, 300)); }

if (res.status === 403) {
  console.error(`\nKey file not verifiable. Confirm https://${HOST}/${key}.txt is live and contains exactly the key.`);
  process.exit(1);
}
if (![200, 202].includes(res.status)) { process.exit(1); }
console.log('submitted');
