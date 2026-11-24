import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from '../data/site';
import { Reveal, Btn } from '../components/ui';

/** Per-page SEO: title, description, canonical, Open Graph / Twitter tags and optional JSON-LD structured data. */
export function Seo({ title, description = DEFAULT_DESCRIPTION, jsonLd, type = 'website' }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const url = SITE_URL + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
    document.title = title;
    const set = (sel, attr, val, create) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement(create.tag); Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v)); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };
    set('meta[name="description"]', 'content', description, { tag: 'meta', attrs: { name: 'description' } });
    set('link[rel="canonical"]', 'href', url, { tag: 'link', attrs: { rel: 'canonical' } });
    [['og:title', title], ['og:description', description], ['og:url', url], ['og:type', type], ['og:site_name', SITE_NAME]].forEach(([k, v]) => set(`meta[property="${k}"]`, 'content', v, { tag: 'meta', attrs: { property: k } }));
    [['twitter:card', 'summary_large_image'], ['twitter:title', title], ['twitter:description', description]].forEach(([k, v]) => set(`meta[name="${k}"]`, 'content', v, { tag: 'meta', attrs: { name: k } }));
    document.head.querySelectorAll('script[data-seo-ld]').forEach((n) => n.remove());
    if (jsonLd) {
      const el = document.createElement('script'); el.type = 'application/ld+json'; el.setAttribute('data-seo-ld', '1');
      el.textContent = JSON.stringify(jsonLd); document.head.appendChild(el);
    }
  }, [title, description, jsonLd, type, pathname]);
  return null;
}

export function PageHero({ eyebrow, title, lead, crumbs, children, actions }) {
  return (
    <section className="hero sub">
      <div className="wrap" style={{ position: 'relative' }}>
        {crumbs && <div className="crumbs">{crumbs.map(([l, to], i) => <span key={l}>{to ? <Link to={to}>{l}</Link> : l}{i < crumbs.length - 1 && ' / '}</span>)}</div>}
        {eyebrow && <Reveal><div className="eyebrow">{eyebrow}</div></Reveal>}
        <Reveal delay={0.05}><h1 className="h1">{title}</h1></Reveal>
        {lead && <Reveal delay={0.1}><p className="lead" style={{ margin: '20px auto 0' }}>{lead}</p></Reveal>}
        {actions !== false && <Reveal delay={0.15} className="btn-row" style={{ marginTop: 28 }}>{actions || <><Btn to="/signup" size="lg">Get started free</Btn><Btn to="/contact/contact-sales" variant="ghost" size="lg">Talk to sales</Btn></>}</Reveal>}
        {children}
      </div>
    </section>
  );
}

export const Search = ({ value, onChange, placeholder }) => (
  <label className="search"><span aria-hidden>⌕</span><input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} /></label>
);

export const Chips = ({ items, value, onChange }) => (
  <div className="filters" role="group">{items.map((c) => <button key={c} className={`f-chip ${value === c ? 'on' : ''}`} onClick={() => onChange(c)}>{c}</button>)}</div>
);
