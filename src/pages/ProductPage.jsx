import { Link, useParams, Navigate } from 'react-router-dom';
import { Btn, Reveal, SectionHead, Tabs, Accordion, CTA, Photo } from '../components/ui';
import AppMock from '../components/AppMock';
import { PageHero, Seo } from './shared';
import { PRODUCTS, MODULES, SOLUTIONS, ROLES, GENERIC_FAQ } from '../data/content';

const GROUPS = {
  products: { data: PRODUCTS, base: '/products', label: 'Products', idx: '/products' },
  modules: { data: MODULES, base: '/modules', label: 'Modules', idx: '/modules' },
  solutions: { data: SOLUTIONS, base: '/solutions', label: 'Solutions', idx: '/solutions' },
  roles: { data: ROLES, base: '/roles', label: 'Roles', idx: '/roles' },
};
const ALL_MOCKS = ['board', 'table', 'dashboard', 'chat', 'list', 'calendar', 'heatmap', 'automation'];
const PRODUCT_MOCKS = { pypecrm: ['board', 'table', 'chat', 'automation', 'dashboard'], pypeerm: ['table', 'list', 'dashboard', 'calendar', 'org'], pypecampus: ['heatmap', 'report', 'list', 'transport', 'calendar'] };

export const ProductBadge = ({ k }) => (k && PRODUCTS[k] ? <Link to={`/products/${k}`} className={`pbadge ${PRODUCTS[k].accent}`}>{PRODUCTS[k].name}</Link> : null);

/** Data-driven page used for products, modules, solutions and roles. */
export default function ProductPage({ group, slug: fixed }) {
  const params = useParams();
  const g = GROUPS[group];
  const slug = fixed ?? params.slug;
  const p = g.data[slug];
  if (!p) return <Navigate to="/404" replace />;
  const isProduct = group === 'products';
  const sales = (p.product ?? p.products?.[0] ?? (isProduct ? slug : null)) === 'pypecrm' || p.theme === 'sales';
  const theme = sales ? 'sales' : 'edu';
  const mocks = (sales ? PRODUCT_MOCKS.pypecrm : isProduct ? PRODUCT_MOCKS[slug] : p.product ? PRODUCT_MOCKS[p.product] : ALL_MOCKS) || ALL_MOCKS;
  const tabs = p.points.slice(0, 4);
  const mods = (p.modules || []).filter((k) => MODULES[k]);
  const related = group === 'modules' ? Object.entries(MODULES).filter(([k, m]) => k !== slug && m.product === p.product && m.product).slice(0, 3)
    : Object.entries(g.data).filter(([k]) => k !== slug).slice(0, 3);
  return (
    <>
      <Seo title={`${p.name} · ${g.label} | PypeOne`} />
      <PageHero crumbs={[['Home', '/'], [g.label, g.idx], [p.name]]} eyebrow={`${p.icon}  ${p.name}${p.soon ? ' · Coming soon' : ''}`} title={p.title} lead={p.sub}
        actions={<><Btn to="/contact/contact-sales" size="lg">Book a demo</Btn>{isProduct ? <a className="btn btn-ghost btn-lg" href={p.url} target="_blank" rel="noopener noreferrer">Visit {p.domain} ↗</a> : <Btn to="/pricing" variant="ghost" size="lg">See pricing</Btn>}</>}>
        <div className="center" style={{ marginTop: 18 }}>
          {p.product && <ProductBadge k={p.product} />}
          {(p.products || []).map((k) => <ProductBadge key={k} k={k} />)}
          {isProduct && <span className="muted" style={{ fontSize: 14 }}>{p.audience}</span>}
        </div>
        <Reveal delay={0.2} className="hero-mock"><AppMock variant={p.mock} theme={theme} style={{ maxWidth: 940, margin: '0 auto' }} /></Reveal>
      </PageHero>

      <section className="section" style={{ paddingTop: 120 }}>
        <div className="wrap">
          <SectionHead eyebrow="In depth" title={`See ${p.name} in action`} lead="Pick a capability to explore how it works." />
          <Tabs tabs={tabs.map((t) => t.t)} render={(i) => (
            <div className={`split ${i % 2 ? 'rev' : ''}`}>
              <div className="tab-copy"><h3 className="h2" style={{ fontSize: 34 }}>{tabs[i].t}</h3><p>{tabs[i].d}</p>
                <ul className="check"><li>Role-based access, with every action logged</li><li>Available on web and mobile</li><li>Part of the PypeOne bundle, on its own platform</li></ul><Btn to="/contact/contact-sales" variant="dark">Talk to us</Btn></div>
              <AppMock theme={theme} variant={i === 0 ? p.mock : mocks[(mocks.indexOf(p.mock) + i) % mocks.length]} />
            </div>
          )} />
        </div>
      </section>

      {isProduct && <section className="section"><div className="wrap split"><Photo k={slug.replace('pype', '')} /><div className="tab-copy"><div className="eyebrow">Who it’s for</div><h3 className="h2" style={{ fontSize: 34 }}>{p.audience}</h3><p>{p.sub}</p><div className="btn-row"><a className="btn btn-dark" href={p.url} target="_blank" rel="noopener noreferrer">Go to {p.domain} ↗</a></div></div></div></section>}

      <section className="section soft">
        <div className="wrap">
          <SectionHead eyebrow="Capabilities" title={isProduct ? `What ${p.name} does` : `Everything in ${p.name}`} />
          <div className="grid g3">{p.points.map((x, i) => <Reveal key={x.t} delay={(i % 3) * 0.08}><div className="card hov"><div className="ico">{p.icon}</div><h3>{x.t}</h3><p>{x.d}</p></div></Reveal>)}</div>
        </div>
      </section>

      {mods.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead eyebrow="Modules" title={isProduct ? `Inside ${p.name}` : 'Modules that power this'} />
            <div className="grid g3">{mods.map((k, i) => <Reveal key={k} delay={(i % 3) * 0.06}><Link to={`/modules/${k}`} className="card"><div className="ico">{MODULES[k].icon}</div><h3>{MODULES[k].name}{MODULES[k].soon && <span className="soon">Soon</span>}</h3><p>{MODULES[k].sub}</p><span className="more">Explore →</span></Link></Reveal>)}</div>
          </div>
        </section>
      )}

      <section className="section soft">
        <div className="wrap"><SectionHead eyebrow="FAQ" title="Questions, answered" /><Accordion items={GENERIC_FAQ(p.name)} /></div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Keep exploring" title="Related" />
          <div className="grid g3">{related.map(([k, v]) => <Reveal key={k}><Link to={`${g.base}/${k}`} className="card"><div className="ico">{v.icon}</div><h3>{v.name}</h3><p>{v.sub}</p><span className="more">Learn more →</span></Link></Reveal>)}</div>
        </div>
      </section>
      <CTA title={`Start with ${p.name}`} />
    </>
  );
}
