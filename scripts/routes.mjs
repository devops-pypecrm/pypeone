// Every public route, derived from the same data the app renders. Used for the sitemap and for prerendering.
import { PRODUCTS, MODULES, SOLUTIONS, ROLES, COMPARE, POSTS } from '../src/data/content.js';

export function getRoutes() {
  const r = ['/', '/ai', '/products', '/modules', '/solutions', '/roles', '/compare', '/pricing', '/security', '/templates', '/integrations', '/blog',
    '/contact/contact-sales', '/on-demand-demo', '/download', '/import', '/about', '/careers', '/brand', '/partners', '/terms', '/terms/privacy', '/terms/security-policy', '/login', '/signup'];
  Object.keys(PRODUCTS).forEach((k) => r.push(`/products/${k}`));
  Object.keys(MODULES).forEach((k) => r.push(`/modules/${k}`));
  Object.keys(SOLUTIONS).forEach((k) => r.push(`/solutions/${k}`));
  Object.keys(ROLES).forEach((k) => r.push(`/roles/${k}`));
  Object.keys(COMPARE).forEach((k) => r.push(`/compare/${k}`));
  POSTS.forEach((_, i) => r.push(`/blog/${i}`));
  return r;
}
