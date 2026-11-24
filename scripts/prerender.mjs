// Post-build SEO step: renders every route in a real browser and writes static HTML (dist/<route>/index.html)
// so crawlers and link previews see full content and per-page meta tags without running JavaScript.
// Also writes dist/sitemap.xml, dist/robots.txt and dist/200.html (the SPA fallback shell).
// Usage: npm run build:seo   (needs Google Chrome; set CHROME_PATH to override its location)
import { preview } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir, writeFile, readFile, copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getRoutes } from './routes.mjs';
import { SITE_URL } from '../src/data/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const routes = getRoutes();
const PORT = 5301;

await copyFile(join(dist, 'index.html'), join(dist, '200.html'));          // untouched SPA shell for unknown routes
const server = await preview({ root, preview: { port: PORT, strictPort: true } });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });

const render = async (route) => {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('main h1, main h2', { timeout: 10000 });
  await page.waitForTimeout(250);
  let html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));
  await page.close();
  const out = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
};

// modest concurrency
const queue = [...routes]; let done = 0;
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) { const r = queue.shift(); await render(r); done++; } }));
await browser.close(); await server.close();

const today = new Date().toISOString().slice(0, 10);
const prio = (r) => (r === '/' ? '1.0' : r === '/ai' ? '0.9' : r.split('/').length <= 2 ? '0.8' : '0.6');
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod><priority>${prio(r)}</priority></url>`).join('\n')}\n</urlset>\n`);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /login\nDisallow: /signup\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`Prerendered ${done} routes + sitemap.xml + robots.txt`);
