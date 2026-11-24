import { Link } from 'react-router-dom';
import { Btn, Reveal, SectionHead, CTA, ContactForm } from '../components/ui';
import AppMock from '../components/AppMock';
import { PageHero, Seo } from './shared';
import { ProductBadge } from './ProductPage';
import * as C from '../data/content';
import { PRODUCT_SITES } from '../data/nav';

export function About() {
  return (<><Seo title="About | PypeOne" />
    <PageHero eyebrow="About" title="Software for the way you grow and operate" lead="Most teams run on a patchwork of tools. PypeOne is a bundle of three focused products, each with its own platform, from one team." actions={<><Btn to="/products" size="lg">Explore the bundle</Btn><Btn to="/contact/contact-sales" variant="ghost" size="lg">Contact us</Btn></>} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap grid g3">{Object.entries(C.PRODUCTS).map(([k, p], i) => <Reveal key={k} delay={i * 0.08}><Link to={`/products/${k}`} className={`card product-card ${p.accent}`}><div className="ico">{p.icon}</div><h3>{p.name}</h3><p>{p.tagline}</p><span className="more">Explore →</span></Link></Reveal>)}</div></section>
    <section className="section soft"><div className="wrap"><SectionHead eyebrow="Principles" title="What we believe" /><div className="grid g3">{[['Adapt to your organisation', 'Every business and institution works differently. Pipelines, roles and custom fields should bend to you, not the other way around.'], ['One source of truth', 'Inside each product, a customer or a student should exist once, with one history, visible to the people who need it.'], ['Protect the student first', 'Role-based access, audit trails, consent and short retention for sensitive data.'], ['Familiar before new', 'Match the screens your staff already know, then add new capability in the same style.'], ['Automate the busywork', 'Routing, reminders and reports should run themselves.'], ['Mobile by default', 'Counsellors, staff and parents all work from their phones.']].map(([t, d], i) => <Reveal key={t} delay={(i % 3) * 0.07} className="card hov"><h3>{t}</h3><p>{d}</p></Reveal>)}</div></div></section>
    <CTA title="Let’s build this with you" text="Start with a pilot in one or two groups." /></>);
}
export function Careers() {
  return (<><Seo title="Careers | PypeOne" />
    <PageHero eyebrow="Careers" title="Help build software people rely on" lead="We’re a product team building CRM, ERP and school-management software for businesses and institutions." actions={false} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap grid g2" style={{ maxWidth: 900 }}>{C.CAREER_AREAS.map(([t, d]) => <Reveal key={t} className="card hov"><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
      <div className="wrap" style={{ maxWidth: 560, marginTop: 56 }}><SectionHead title="Send an open application" /><div className="card" style={{ padding: 32 }}><ContactForm fields={['name', 'email', 'message']} submit="Send application" done="Thanks! We will be in touch if there is a fit." /></div></div></section></>);
}
export function Brand() {
  const sw = [['Violet', '#14a35e'], ['Pink', '#ef4a5a'], ['Orange', '#f59e0b'], ['Ink', '#0f1f16'], ['Mist', '#f3faf6']];
  return (<><Seo title="Brand | PypeOne" />
    <PageHero eyebrow="Brand" title="PypeOne brand guidelines" lead="Use our name, logo and colours consistently." actions={false} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap"><SectionHead left eyebrow="Name" title="PypeOne and its products" />
      <div className="grid g4">{[['PypeOne', 'The bundle'], ['PypeCRM', 'Admissions & sales'], ['PypeERM', 'Institution ERP'], ['Pype Campus', 'School management']].map(([n, s]) => <div key={n} className="card"><h3>{n}</h3><p>{s}</p></div>)}</div>
      <SectionHead left eyebrow="Colour" title="Palette" /><div className="swatches">{sw.map(([n, h]) => <div key={n} className="sw-i" style={{ background: h, color: n === 'Mist' ? '#0f1f16' : '#fff' }}><div>{n}<small>{h}</small></div></div>)}</div>
      <SectionHead left eyebrow="Typography" title="Plus Jakarta Sans" /><div className="card"><h2 className="h1" style={{ fontSize: 56 }}>Aa Bb Cc 123</h2><p className="muted">One family throughout: Plus Jakarta Sans, weights 400 to 800. Headings 700–800; body 400–500.</p></div>
      <SectionHead left eyebrow="Usage" title="Do and don’t" /><div className="grid g2"><div className="card"><h3>Do</h3><ul className="check"><li>Write “PypeOne” as one word with a capital P and O</li><li>Keep clear space equal to the logo mark height</li></ul></div><div className="card"><h3>Don’t</h3><ul className="check"><li>Stretch, rotate or recolour the logo</li><li>Place the logo on busy backgrounds</li></ul></div></div></div></section></>);
}
export function Partners() {
  return (<><Seo title="Partners | PypeOne" />
    <PageHero eyebrow="Partners" title="Grow with the PypeOne network" lead="Centres, study-abroad partners and implementation partners all have a place." actions={<><Btn to="/contact/contact-sales" size="lg">Become a partner</Btn></>} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap grid g3">{C.PARTNER_PROGRAMS.map(([t, d, pts], i) => <Reveal key={t} delay={i * 0.08} className="card hov"><h3>{t}</h3><p>{d}</p><ul className="check" style={{ marginTop: 18 }}>{pts.map((x) => <li key={x}>{x}</li>)}</ul></Reveal>)}</div></section>
    <section className="section soft"><div className="wrap"><SectionHead title="How it works" /><div className="steps" style={{ maxWidth: 640, margin: '0 auto' }}>{[['Apply', 'Tell us about your organisation.'], ['Get verified', 'We review and approve partners before they go live.'], ['Start working', 'Use your dashboard, wallet and tools.']].map(([t, d]) => <div className="step" key={t}><div><h3 className="h3">{t}</h3><p className="muted">{d}</p></div></div>)}</div></div></section><CTA /></>);
}
export function Legal({ kind }) {
  const L = C.LEGAL[kind];
  return (<><Seo title={`${L.title} | PypeOne`} /><PageHero eyebrow="Legal" title={L.title} lead="Draft text for review" actions={false} />
    <section className="section" style={{ paddingTop: 24 }}><div className="wrap prose">{L.sections.map(([h, t], i) => <div key={h}><h2>{i + 1}. {h}</h2><p>{t}</p></div>)}<p className="muted" style={{ fontSize: 13, marginTop: 40 }}>Draft text for the website prototype; replace with counsel-approved copy before launch.</p></div></section></>);
}
export function Auth({ mode }) {
  const signup = mode === 'signup';
  return (<><Seo title={`${signup ? 'Get started' : 'Log in'} | PypeOne`} />
    <section className="section" style={{ minHeight: '70vh', display: 'grid', alignItems: 'center' }}><div className="wrap" style={{ maxWidth: 460 }}>
      <div className="card" style={{ padding: 36 }}><h1 className="h2" style={{ fontSize: 30, marginBottom: 8 }}>{signup ? 'Request access' : 'Welcome back'}</h1><p className="muted" style={{ marginBottom: 22 }}>{signup ? 'Choose the product you want access to. You will go to its own site.' : 'Choose your product to log in at its own site.'}</p>
        <div className="prod-grid">{PRODUCT_SITES.map((p) => <a key={p.key} className="prod-link" href={p.url} target="_blank" rel="noopener noreferrer"><span className={`mi-icon ${p.accent}`}>{p.icon}</span><span style={{ flex: 1 }}><b>{p.name}</b><small>{p.domain}</small></span><span>↗</span></a>)}</div>
        <p className="center muted" style={{ marginTop: 18, fontSize: 14 }}>{signup ? <>Have an account? <Link to="/login" style={{ color: 'var(--brand)', fontWeight: 500 }}>Log in</Link></> : <>New here? <Link to="/signup" style={{ color: 'var(--brand)', fontWeight: 500 }}>Request access</Link></>}</p></div></div></section></>);
}
export function NotFound() {
  return (<><Seo title="Page not found | PypeOne" /><section className="notfound"><div><h1 className="h1 grad-text">404</h1><p className="lead" style={{ margin: '16px auto 28px' }}>We couldn’t find that page.</p><Btn to="/">Back home</Btn></div></section></>);
}
