import { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Btn, Reveal, SectionHead, Accordion, CTA, Stats, ContactForm } from '../components/ui';
import AppMock from '../components/AppMock';
import { PageHero, Seo, Search, Chips } from './shared';
import { ProductBadge } from './ProductPage';
import * as C from '../data/content';

const { PRODUCTS, MODULES } = C;

/* ---------- Index pages ---------- */
export function ProductsIndex() {
  return (<><Seo title="The PypeOne bundle | PypeOne" />
    <PageHero eyebrow="PypeOne" title={<>Three products. <span className="grad-text">One bundle.</span></>} lead="PypeCRM wins the customer, PypeERM runs the educational institution, Pype Campus runs the school. Each product runs on its own platform; PypeOne is how you bundle them." actions={<><Btn to="/contact/contact-sales" size="lg">Get a bundle quote</Btn><Btn to="/pricing" variant="ghost" size="lg">How pricing works</Btn></>} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap grid g3">
      {Object.entries(PRODUCTS).map(([k, p], i) => <Reveal key={k} delay={i * 0.08}><Link to={`/products/${k}`} className={`card product-card ${p.accent}`}><div className="ico">{p.icon}</div><span className="stage">{p.stage}</span><h3>{p.name}</h3><strong style={{ display: 'block', margin: '-2px 0 10px', color: 'var(--ink-2)' }}>{p.tagline}</strong><p>{p.sub}</p><p className="muted" style={{ marginTop: 12, fontSize: 14 }}>For: {p.audience}</p><span className="more">Explore →</span></Link></Reveal>)}
    </div></section>
    <section className="section soft"><div className="wrap">
      <SectionHead eyebrow="The bundle" title="Why take the bundle" />
      <div className="grid g3">{[['One partner', 'One team to call for onboarding, training and support.'], ['Built for each audience', 'CRM for any team that sells, ERM for educational institutions, Campus for schools.'], ['Bundle pricing', 'Take more than one product and get a combined quote.'], ['Consistent experience', 'The same look and feel, so training transfers across products.'], ['Start small', 'Begin with one product and add the others when you are ready.'], ['Shaped to you', 'Screens can follow the habits your staff already have.']].map(([t, d], i) => <Reveal key={t} delay={(i % 3) * 0.07} className="card hov"><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
    </div></section>
    <section className="section"><div className="wrap"><SectionHead eyebrow="Lifecycle" title="Who covers which stage" lead="Each product runs on its own platform. PypeCRM serves any business; PypeERM and Pype Campus serve education." />
      <div className="tbl-scroll"><table className="cmp"><thead><tr><th>Stage</th><th>What happens</th><th>Product</th></tr></thead><tbody>{C.LIFECYCLE.map(([s, pk, d]) => <tr key={s}><td><b>{s}</b></td><td style={{ textAlign: 'left' }}>{d}</td><td><ProductBadge k={pk} /></td></tr>)}</tbody></table></div></div></section>
    <CTA /></>);
}
export function ModulesIndex() {
  const [cat, setCat] = useState('All'); const [q, setQ] = useState('');
  const cats = ['All', ...Object.values(PRODUCTS).map((p) => p.name), 'AI'];
  const list = Object.entries(MODULES).filter(([, m]) => (cat === 'All' || (cat === 'AI' ? !m.product : PRODUCTS[m.product]?.name === cat)) && (m.name + m.sub).toLowerCase().includes(q.toLowerCase()));
  return (<><Seo title="All modules | PypeOne" />
    <PageHero eyebrow="Modules" title="Every module in the suite" lead={`${Object.keys(MODULES).length} modules across PypeCRM, PypeERM and Pype Campus.`} actions={false}><Reveal delay={0.15} style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}><Search value={q} onChange={setQ} placeholder="Search modules" /></Reveal></PageHero>
    <section className="section" style={{ paddingTop: 32 }}><div className="wrap"><Chips items={cats} value={cat} onChange={setCat} />
      <div className="grid g3">{list.map(([k, m]) => <Link key={k} to={`/modules/${k}`} className="card"><div className="ico">{m.icon}</div><ProductBadge k={m.product} />{m.soon && <span className="soon">Soon</span>}<h3>{m.name}</h3><p>{m.sub}</p><span className="more">Explore →</span></Link>)}</div>
      {!list.length && <p className="center muted">No modules match.</p>}
    </div></section><CTA /></>);
}
export function GroupIndex({ group }) {
  const data = group === 'solutions' ? C.SOLUTIONS : C.ROLES;
  const t = group === 'solutions' ? ['Solutions', 'Shaped around how you work', 'From sales teams to schools: pick the setup that fits.'] : ['Roles', 'Built for every person on the team', 'What PypeOne does for each role.'];
  return (<><Seo title={`${t[0]} | PypeOne`} />
    <PageHero eyebrow={t[0]} title={t[1]} lead={t[2]} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap">{(group === 'solutions' ? [['For businesses', 'business'], ['For education', 'education']] : [['', null]]).map(([h, kind]) => <div key={h}>{h && <div className="kind-h">{h}</div>}<div className="grid g3" style={{ marginBottom: 40 }}>{Object.entries(data).filter(([, v]) => !kind || v.kind === kind).map(([k, v], i) => <Reveal key={k} delay={(i % 3) * 0.07}><Link to={`/${group}/${k}`} className="card"><div className="ico">{v.icon}</div><h3>{v.name}</h3><p>{v.sub}</p><span className="more">Explore →</span></Link></Reveal>)}</div></div>)}</div></section><CTA /></>);
}

/* ---------- Compare ---------- */
export function CompareIndex() {
  return (<><Seo title="Why PypeOne | PypeOne" />
    <PageHero eyebrow="Why PypeOne" title="How PypeOne compares" lead="The alternatives most institutions are using today." />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap grid g3">{Object.entries(C.COMPARE).map(([k, v]) => <Reveal key={k}><Link to={`/compare/${k}`} className="card"><div className="ico">⇄</div><h3>PypeOne vs {v.name}</h3><p>{v.blurb}</p><span className="more">Compare →</span></Link></Reveal>)}</div></section><CTA /></>);
}
export function ComparePage() {
  const { slug } = useParams(); const v = C.COMPARE[slug];
  if (!v) return <Navigate to="/404" replace />;
  return (<><Seo title={`PypeOne vs ${v.name}`} />
    <PageHero crumbs={[['Home', '/'], ['Compare', '/compare'], [v.name]]} eyebrow="Compare" title={<>PypeOne vs <span className="grad-text">{v.name}</span></>} lead={v.blurb} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap" style={{ maxWidth: 900 }}>
      <div className="tbl-scroll"><table className="cmp"><thead><tr><th>Capability</th><th>PypeOne</th><th>{v.name}</th></tr></thead><tbody>{v.rows.map(([l, a, b]) => <tr key={l}><td>{l}</td><td className={a ? 'yes' : 'no'}>{a ? '✓' : '—'}</td><td className={b ? 'yes' : 'no'}>{b ? '✓' : '—'}</td></tr>)}</tbody></table></div>
    </div></section>
    <section className="section soft"><div className="wrap"><SectionHead title="Moving over is straightforward" /><div className="steps" style={{ maxWidth: 640, margin: '0 auto' }}>{[['Export', 'Pull your lists out of spreadsheets or your current system.'], ['Import', 'Map fields and statuses with our importer.'], ['Pilot', 'Go live with one group first, then roll out in waves.']].map(([t, d]) => <div className="step" key={t}><div><h3 className="h3">{t}</h3><p className="muted">{d}</p></div></div>)}</div><div className="center" style={{ marginTop: 32 }}><Btn to="/import">How import works</Btn></div></div></section>
    <CTA /></>);
}

/* ---------- Pricing / Security ---------- */
export function Pricing() {
  const keys = Object.keys(PRODUCTS);
  const [sel, setSel] = useState(['pypecrm', 'pypeerm', 'pypecampus']);
  const toggle = (k) => setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  return (<><Seo title="Pricing | PypeOne" />
    <PageHero eyebrow="Pricing" title="Pay for what you use. Save when you bundle." lead="Pick the products you need and tell us your size. We will send a clear, combined quote." actions={false} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap">
      <div className="grid g3">{keys.map((k, i) => { const p = PRODUCTS[k]; const on = sel.includes(k); return (
        <Reveal key={k} delay={i * 0.07} className={`card plan product-card ${p.accent} ${on ? 'pop' : ''}`}>
          <div className="ico">{p.icon}</div><h3>{p.name}</h3><p>{p.tagline}</p>
          <div className="muted" style={{ margin: '14px 0 4px', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>Billing basis</div><p style={{ fontWeight: 500 }}>{C.BILLING[k]}</p>
          <ul className="check">{p.points.slice(0, 4).map((x) => <li key={x.t}>{x.t}</li>)}</ul>
          <button className={`btn ${on ? 'btn-primary' : 'btn-ghost'}`} aria-pressed={on} onClick={() => toggle(k)}>{on ? '✓ Included in quote' : 'Add to quote'}</button>
        </Reveal>); })}</div>
      <Reveal className="card center" style={{ marginTop: 32, padding: 36, background: 'var(--grad-soft)' }}>
        <h3 className="h2" style={{ fontSize: 28 }}>{sel.length === 3 ? 'The full PypeOne bundle' : sel.length ? `${sel.map((k) => PRODUCTS[k].name).join(' + ')}` : 'Choose at least one product'}</h3>
        <p className="lead" style={{ margin: '10px auto 22px' }}>{sel.length > 1 ? 'Bundle pricing applies when you take more than one product.' : 'You can add more products at any time.'}</p>
        <Btn to="/contact/contact-sales" size="lg">Request a quote</Btn></Reveal>
    </div></section>
    <section className="section soft"><div className="wrap"><SectionHead title="What every plan includes" /><div className="grid g3">{[['Onboarding', 'Data migration, set-up, training and interface matching, quoted per institution.'], ['Support', 'Updates, hosting and standard support are part of the subscription.'], ['Role-based security', 'Roles, permissions and audit logs on every product.']].map(([t, d]) => <Reveal key={t} className="card hov"><h3>{t}</h3><p>{d}</p></Reveal>)}</div></div></section>
    <section className="section"><div className="wrap"><SectionHead eyebrow="FAQ" title="Pricing questions" /><Accordion items={C.PRICING_FAQ} /></div></section>
    <CTA title="Not sure where to start?" text="We will help you pick the right first product and plan the rest." primary={['Talk to us', '/contact/contact-sales']} secondary={null} /></>);
}
export function Security() {
  return (<><Seo title="Security | PypeOne" />
    <PageHero eyebrow="Security" title="Built to protect your data" lead="Customer, student and institutional records are sensitive. PypeOne treats them that way by default." actions={<><Btn to="/contact/contact-sales" size="lg">Talk to us</Btn><Btn to="/terms/security-policy" variant="ghost" size="lg">Security policy</Btn></>}><Reveal className="hero-mock"><AppMock variant="org" style={{ maxWidth: 940, margin: '0 auto' }} /></Reveal></PageHero>
    <section className="section" style={{ paddingTop: 120 }}><div className="wrap grid g3">{[['🧱', 'Complete data isolation', 'Every organisation’s data is walled off from every other organisation on the platform.'], ['🔑', 'Role-based permissions', 'Define who can see and do what, with custom roles and least access by default.'], ['📜', 'Audit trail', 'Every sensitive action is logged, and deletes can require approval.'], ['♻', 'Trash & recovery', 'Nothing important is silently lost; deleted records can be restored.'], ['🔐', 'Protected credentials', 'Credentials are stored securely and never shown in the clear.'], ['🇮🇳', 'Hosted in India', 'Data stays in-region; we do not sell your data.']].map(([i, t, d], k) => <Reveal key={t} delay={(k % 3) * 0.07} className="card hov"><div className="ico">{i}</div><h3>{t}</h3><p>{d}</p></Reveal>)}</div></section>
    <section className="section soft"><div className="wrap" style={{ maxWidth: 900 }}><SectionHead eyebrow="For student safety" title="Privacy controls in Campus transport" /><ul className="check" style={{ fontSize: 17 }}>{['Tracking only during school transport hours, never outside them', 'Parents see only their own child; staff see only their route', 'Written parental consent for any wearable device, with a way to withdraw it', 'Location history deleted after a fixed period', 'Every view of a child’s location is logged'].map((x) => <li key={x}>{x}</li>)}</ul></div></section>
    <CTA /></>);
}

/* ---------- Templates / Integrations ---------- */
export function Templates() {
  const [q, setQ] = useState(''); const [cat, setCat] = useState('All');
  const cats = ['All', ...new Set(C.TEMPLATES.map((t) => t[1]))];
  const list = useMemo(() => C.TEMPLATES.filter((t) => (cat === 'All' || t[1] === cat) && t[0].toLowerCase().includes(q.toLowerCase())), [q, cat]);
  return (<><Seo title="Templates | PypeOne" />
    <PageHero eyebrow="Templates" title="Start from a ready-made setup" lead="Pre-built pipelines, fee plans, timetables and approval chains for each product." actions={false}><Reveal delay={0.15} style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}><Search value={q} onChange={setQ} placeholder="Search templates" /></Reveal></PageHero>
    <section className="section" style={{ paddingTop: 32 }}><div className="wrap"><Chips items={cats} value={cat} onChange={setCat} />
      {list.length ? <div className="grid g4">{list.map(([n, c, m, pk]) => <div key={n} className="card hov" style={{ padding: 18 }}><div className="thumb t0" style={{ padding: 10, display: 'block', overflow: 'hidden' }}><div style={{ transform: 'scale(.55)', transformOrigin: 'top left', width: '182%' }}><AppMock variant={m} /></div></div><span className="badge">{c}</span> <ProductBadge k={pk} /><h3 style={{ fontSize: 17 }}>{n}</h3><Link className="more" to="/contact/contact-sales">Use this setup →</Link></div>)}</div> : <p className="center muted">No templates match “{q}”.</p>}
    </div></section><CTA /></>);
}
export function Integrations() {
  const [q, setQ] = useState(''); const [cat, setCat] = useState('All');
  const cats = ['All', ...new Set(C.INTEGRATIONS.map((t) => t[1]))];
  const list = C.INTEGRATIONS.filter(([n, c]) => (cat === 'All' || c === cat) && n.toLowerCase().includes(q.toLowerCase()));
  return (<><Seo title="Integrations | PypeOne" />
    <PageHero eyebrow="Integrations" title="Connect the channels and devices you use" lead="Advertising, messaging, payments, devices and a public API." actions={false}><Reveal delay={0.15} style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}><Search value={q} onChange={setQ} placeholder="Search integrations" /></Reveal></PageHero>
    <section className="section" style={{ paddingTop: 32 }}><div className="wrap"><Chips items={cats} value={cat} onChange={setCat} />
      <div className="grid g4">{list.map(([n, c, d]) => <div key={n} className="card hov" style={{ padding: 22 }}><div className="ico" style={{ background: 'var(--grad)', color: '#231e0d' }}>{n[0]}</div><span className="badge">{c}</span><h3 style={{ fontSize: 17 }}>{n}</h3><p style={{ fontSize: 14 }}>{d}</p></div>)}</div>
      {!list.length && <p className="center muted">No integrations match.</p>}
    </div></section><CTA title="Need something specific?" text="Use the public API or ask us about a custom integration." primary={['Contact us', '/contact/contact-sales']} secondary={null} /></>);
}

/* ---------- Blog ---------- */
export function Blog() {
  const [cat, setCat] = useState('All'); const [q, setQ] = useState('');
  const cats = ['All', ...new Set(C.POSTS.map((p) => p.cat))];
  const list = C.POSTS.map((p, i) => ({ p, i })).filter(({ p }) => (cat === 'All' || p.cat === cat) && p.t.toLowerCase().includes(q.toLowerCase()));
  return (<><Seo title="Blog | PypeOne" />
    <PageHero eyebrow="Blog" title="Playbooks for growing and running your organisation" lead="Sales, admissions, fees, academics, transport and operations." actions={false}><Reveal delay={0.15} style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}><Search value={q} onChange={setQ} placeholder="Search articles" /></Reveal></PageHero>
    <section className="section" style={{ paddingTop: 32 }}><div className="wrap"><Chips items={cats} value={cat} onChange={setCat} />
      <div className="grid g3">{list.map(({ p, i }) => <Reveal key={i} delay={(i % 3) * 0.06}><Link to={`/blog/${i}`} className="card"><div className={`thumb t${i % 4}`}>{p.cat}</div><span className="badge">{p.cat}</span><h3>{p.t}</h3><div className="meta"><span>PypeOne team</span><span>·</span><span>{p.min} min read</span></div></Link></Reveal>)}</div>
      {!list.length && <p className="center muted">No articles found.</p>}
    </div></section></>);
}
export function BlogPost() {
  const { id } = useParams(); const p = C.POSTS[Number(id)];
  if (!p) return <Navigate to="/404" replace />;
  return (<><Seo title={`${p.t} | PypeOne Blog`} />
    <PageHero crumbs={[['Home', '/'], ['Blog', '/blog'], [p.cat]]} eyebrow={p.cat} title={p.t} lead={`PypeOne team · ${p.min} min read`} actions={false} />
    <section className="section" style={{ paddingTop: 32 }}><article className="wrap prose">
      <div className={`thumb t${Number(id) % 4}`} style={{ marginBottom: 32 }}>{p.cat}</div>
      {p.body.map((t, i) => <p key={i}>{t}</p>)}
      <div className="center" style={{ marginTop: 40 }}><Btn to="/blog" variant="ghost">← All articles</Btn></div>
    </article></section><CTA /></>);
}

/* ---------- Contact / demo / download / import ---------- */
export function ContactSales() {
  return (<><Seo title="Contact sales | PypeOne" />
    <section className="section" style={{ paddingTop: 72 }}><div className="wrap split">
      <div><div className="eyebrow">Contact sales</div><h1 className="h2">Let’s talk about your business</h1><p className="lead" style={{ margin: '18px 0 28px' }}>Tell us what you do today and which product interests you. We will tailor a walkthrough, pilot plan and quote.</p><ul className="check"><li>Personalised demo</li><li>Pilot plan with one or two groups first</li><li>Data migration and training plan</li><li>Bundle pricing across products</li></ul></div>
      <div className="card" style={{ padding: 36 }}><ContactForm fields={['name', 'email', 'company', 'interest', 'size', 'message']} submit="Request a call" /></div>
    </div></section></>);
}
export function Demo() {
  return (<><Seo title="Watch the demo | PypeOne" />
    <PageHero eyebrow="Demo" title="See PypeOne in under 10 minutes" lead="A guided tour of the CRM, the ERM and campus management." actions={false}>
      <Reveal className="hero-mock"><div style={{ maxWidth: 900, margin: '0 auto', aspectRatio: '16/9', borderRadius: 24, background: 'var(--bg-dark)', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}><div className="blob" style={{ width: 300, height: 300, background: '#f3d983', left: '10%', top: '10%' }} /><button className="btn btn-primary btn-lg" style={{ position: 'relative', borderRadius: '50%', width: 88, height: 88, fontSize: 28 }} aria-label="Play demo">▶</button></div></Reveal>
    </PageHero>
    <section className="section" style={{ paddingTop: 120 }}><div className="wrap" style={{ maxWidth: 560 }}><SectionHead title="Prefer a live walkthrough?" /><div className="card" style={{ padding: 32 }}><ContactForm fields={['name', 'email', 'company', 'interest']} submit="Book a live demo" /></div></div></section></>);
}
export function Download() {
  return (<><Seo title="Mobile apps | PypeOne" />
    <PageHero eyebrow="Mobile apps" title="Your work, in every pocket" lead="Sales reps dial and log calls. Staff punch in and request leave. Parents check results and the bus." actions={false} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap grid g3">{[['PypeCRM mobile', 'Click-to-call with automatic recording, a live WhatsApp inbox, follow-up reminders and geo-tagged check-ins for any sales team.', 'pypecrm'], ['PypeERM mobile', 'Selfie and location punch-in, leave requests, tasks and push notifications for approvals.', 'pypeerm'], ['Campus parent & student', 'Results, attendance, fees, notices and bus alerts on one login.', 'pypecampus']].map(([t, d, k]) => <Reveal key={t} className="card hov"><ProductBadge k={k} /><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
      <p className="center muted" style={{ marginTop: 28 }}>Ask us for the latest build for your device.</p><div className="center" style={{ marginTop: 16 }}><Btn to="/contact/contact-sales">Request the apps</Btn></div></section></>);
}
export function Import() {
  return (<><Seo title="Import your data | PypeOne" />
    <PageHero eyebrow="Import" title="Bring your data with you" lead="Move from spreadsheets and existing tools in phases, starting with a pilot." />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap"><div className="grid g4">{[['Leads', 'CSV or Excel lists from events, ads and enquiries.'], ['Students', 'Student and guardian records with class and section.'], ['Marks', 'Excel marks import for exams.'], ['Fee structures', 'Schedules and balances brought across.']].map(([n, d]) => <Reveal key={n} className="card hov center"><div className="ico" style={{ margin: '0 auto 14px' }}>⇪</div><h3 style={{ fontSize: 17 }}>{n}</h3><p style={{ fontSize: 14 }}>{d}</p></Reveal>)}</div>
      <div className="steps" style={{ maxWidth: 640, margin: '56px auto 0' }}>{[['Share your data', 'Send a sample of your spreadsheets or exports.'], ['Map your fields', 'We match statuses, users and custom fields.'], ['Pilot, then roll out', 'Go live with a pilot group, then expand in waves.']].map(([t, d]) => <div className="step" key={t}><div><h3 className="h3">{t}</h3><p className="muted">{d}</p></div></div>)}</div></div></section><CTA /></>);
}
