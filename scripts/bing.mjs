#!/usr/bin/env node
/**
 * Bing Webmaster Tools API client.
 *
 * Scope note: URL submission is already handled by scripts/indexnow.mjs on
 * every deploy, and IndexNow feeds the same Bing ingestion path. This script
 * exists mainly for the half IndexNow cannot do — reading back how Bing is
 * actually treating the site, which is the closest available proxy for
 * AI-search visibility since ChatGPT search and Copilot are served from Bing.
 *
 * Sitemap submission is deliberately absent: robots.txt already declares the
 * sitemap and Bing discovers it from there, so an API call would add nothing.
 *
 * Requires BING_API_KEY. The key is generated per user (not per site) at
 * Bing Webmaster Tools -> Settings -> API Access, and only becomes available
 * after the site is verified.
 *
 * Usage:
 *   BING_API_KEY=... node scripts/bing.mjs quota
 *   BING_API_KEY=... node scripts/bing.mjs stats
 *   BING_API_KEY=... node scripts/bing.mjs submit
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = 'https://www.godelpromo.com';
const BASE = 'https://ssl.bing.com/webmaster/api.svc/json';

const key = process.env.BING_API_KEY;
if (!key) {
  console.error(`BING_API_KEY is not set.

Get one:
  1. https://www.bing.com/webmasters  — sign in (Microsoft, Google or Facebook ID)
  2. Add ${SITE}. Fastest path is "Import from Google Search Console",
     which auto-verifies because GSC verification already exists via the
     google-site-verification TXT record on the apex.
  3. Settings -> API Access -> Generate API Key

Then:  export BING_API_KEY=<key>`);
  process.exit(1);
}

const call = async (method, params = {}, body = null) => {
  const qs = new URLSearchParams({ apikey: key, ...params });
  const url = `${BASE}/${method}?${qs}`;
  const res = await fetch(url, body
    ? { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) }
    : { method: 'GET' });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} -> HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  try { return JSON.parse(text); } catch { return text; }
};

const sitemapUrls = async () => {
  const xml = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
};

const cmd = process.argv[2] || 'quota';

try {
  if (cmd === 'quota') {
    const r = await call('GetUrlSubmissionQuota', { siteUrl: SITE });
    const q = r.d || r;
    console.log(`daily quota remaining:   ${q.DailyQuota}`);
    console.log(`monthly quota remaining: ${q.MonthlyQuota}`);

  } else if (cmd === 'submit') {
    const urls = await sitemapUrls();
    if (!urls.length) { throw new Error('no URLs in dist/sitemap.xml — run the build first'); }
    // Batch cap is 500; we have 16, so a single call is always enough.
    await call('SubmitUrlbatch', {}, { siteUrl: SITE, urlList: urls });
    console.log(`submitted ${urls.length} URLs`);
    console.log('note: IndexNow already does this on every deploy — this is belt and braces');

  } else if (cmd === 'stats') {
    const r = await call('GetRankAndTrafficStats', { siteUrl: SITE });
    const rows = r.d || r;
    if (!Array.isArray(rows) || !rows.length) {
      console.log('no stats yet — Bing needs a few days of data after verification');
    } else {
      console.log('date        impressions  clicks');
      rows.slice(-14).forEach((row) => {
        // Dates come back as /Date(1234567890000)/
        const ms = String(row.Date).match(/\d+/)?.[0];
        const d = ms ? new Date(Number(ms)).toISOString().slice(0, 10) : String(row.Date);
        console.log(`${d}  ${String(row.Impressions ?? '-').padStart(11)}  ${String(row.Clicks ?? '-').padStart(6)}`);
      });
    }

  } else {
    console.error(`unknown command "${cmd}" — use: quota | submit | stats`);
    process.exit(1);
  }
} catch (err) {
  console.error(err.message);
  // A 401 here almost always means the site is not verified yet rather than a
  // bad key, because the key only exists once verification has happened.
  if (/401|403/.test(err.message)) {
    console.error(`\nCheck that ${SITE} is verified in Bing Webmaster Tools and that the key matches that account.`);
  }
  process.exit(1);
}
