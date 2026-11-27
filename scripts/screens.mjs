// Captures the product pages that appear inside the device mockups of the home showcase.
// Usage: npm run screens   (runs after a build; needs Google Chrome or CHROME_PATH)
import { preview } from 'vite';
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'screens');
const SHOTS = [
  { route: '/products/pypecrm', file: 'pypecrm-phone.jpg', viewport: { width: 390, height: 844 }, scale: 2 },
  { route: '/products/pypeerm', file: 'pypeerm-laptop.jpg', viewport: { width: 1440, height: 900 }, scale: 1 },
  { route: '/products/pypecampus', file: 'pypecampus-tablet.jpg', viewport: { width: 1180, height: 820 }, scale: 1 },
];
await mkdir(out, { recursive: true });
const server = await preview({ root, preview: { port: 5302, strictPort: true } });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });
for (const s of SHOTS) {
  const page = await (await browser.newContext({ viewport: s.viewport, deviceScaleFactor: s.scale })).newPage();
  await page.goto(`http://localhost:5302${s.route}`, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.announce{display:none!important}.reveal{opacity:1!important;transform:none!important}.to-top{display:none!important}' });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: join(out, s.file), type: 'jpeg', quality: 82 });
  console.log('captured', s.file);
}
await browser.close(); await server.close();
