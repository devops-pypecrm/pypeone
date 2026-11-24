# PypeOne marketing site

The public website for **PypeOne**, a bundle of three products with different audiences:

| Product | Role | Source of facts |
|---|---|---|
| **PypeCRM** | Sales & customer CRM for **any team that sells** (any industry) | `pypecrm/PYPECRM_WEB_FEATURE_OVERVIEW.md`, investor overview |
| **PypeERM** | ERP for **educational institutions only**: admissions, study centres, finance, HR, LMS, ops | `Pype-ERM` repo: Prisma schema, `FeaturesPage.tsx`, `LandingMore.tsx` |
| **Pype Campus** | School management: fees, attendance, exams, transport, portal (audience: schools) | `report/Pype_Campus_Report.pdf` and pitch decks |

Vite + React + React Router. Font: Plus Jakarta Sans (variable, weights 400/500/600/650). Green theme. No third-party assets.

Product sites: pypecrm.com · pypeerm.com · pypecampus.com (set in `PRODUCTS` in `src/data/content.js`; used by the header "Log in" / "Request access" dropdowns, product pages and the footer).

```
npm install && npm run dev     # http://localhost:5199
npm run build                  # static output in dist/ (needs SPA fallback to index.html)
npm run build:seo              # build + prerender every route + sitemap.xml + robots.txt (needs Google Chrome)
```

## Where content lives
- `src/data/content.js` – products, 28 modules, solutions (institution types), roles, compare, pricing basis, templates, integrations, blog, legal.
  Items with `soon: true` (Psychometrics & Career Map) are *planned*, not shipped.
- `src/data/nav.js` – mega menus, company dropdown, footer.
- `src/components/AppMock.jsx` – 14 animated, education-themed UI mocks (sample data only).
- `src/pages/ProductPage.jsx` – one template for products / modules / solutions / roles.

## Pype AI (coming soon)
`/ai` is a dedicated page with an animated canvas neural orb (`src/components/NeuralOrb.jsx`), a how-it-works flow, capabilities, an illustrative Q&A demo, roadmap, FAQ and a waitlist form (prototype: stores nothing). A matching animated teaser sits on the home page and the footer links to it. Everything is labelled planned / coming soon.
The product name and site URL live in `src/data/site.js` (`AI_NAME`, `SITE_URL`). **`SITE_URL` is a placeholder** (`https://pypeone.com`): set the real domain before launch; canonical tags, the sitemap and structured data all use it.

## SEO
Every page sets title, description, canonical, Open Graph/Twitter tags (`Seo` in `src/pages/shared.jsx`); `/ai` also emits WebPage, BreadcrumbList and FAQPage JSON-LD. `npm run build:seo` prerenders all routes to static HTML so crawlers see content without JavaScript.

## Note on the bundle
Each product (PypeCRM, PypeERM, Pype Campus) is its own platform with its own site; PypeOne is the bundle concept. Copy must not imply a shared dashboard or login.

## Photos
No photos are bundled yet. Add files to `public/img/` and register them in `src/data/photos.js`; the Home page and product pages render them automatically.

## Routes (83)
/, /ai, /products(+3), /modules(+27), /solutions(+10), /roles(+8), /compare(+3), /pricing, /security, /templates, /integrations,
/blog(+7), /contact/contact-sales, /on-demand-demo, /download, /import, /about, /careers, /brand, /partners,
/terms, /terms/privacy, /terms/security-policy, /login, /signup, 404.

## Before launch (needs your confirmation)
- Bundle claims such as shared login or shared student record across the three products are worded conservatively; confirm what is really integrated.
- No prices are published; Campus’ ₹ figures in the report are marked confidential and were deliberately left out.
- Blog posts, legal text and the “Hosted in India” / isolation claims are drafts to verify.
