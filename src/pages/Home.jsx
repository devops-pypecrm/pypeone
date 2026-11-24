import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NeuralOrb from '../components/NeuralOrb';
import { Btn, Reveal, SectionHead, Tabs, Stats, CTA, Carousel, Photo } from '../components/ui';
import AppMock from '../components/AppMock';
import { PRODUCTS, SOLUTIONS, STATS, LIFECYCLE } from '../data/content';
import { Seo } from './shared';

const WHO = ['Sales teams', 'Multi-branch businesses', 'Agencies', 'Real estate', 'Clinics', 'Colleges', 'Schools', 'Coaching institutes', 'Study-centre networks'];
const PERSONAS = [
  ['Sales teams', 'Every lead captured, routed and scored, with calls and WhatsApp on one timeline so no enquiry goes cold.'],
  ['Managers & owners', 'Live dashboards, leaderboards and daily reports across every branch, without asking anyone for a spreadsheet.'],
  ['Institution leaders', 'One view of fees collected and pending, attendance, staff presence and results, with approvals that follow your reporting chart.'],
  ['Teachers & faculty', 'Attendance and marks entered once. Excel marks import, a class heat map showing who needs help, and report card remarks drafted for review.'],
  ['Parents', 'A single login for results, attendance, fees, notices and the bus, with an instant message when the child boards or leaves.'],
];
const FEATURED = ['sales-teams', 'multi-branch-businesses', 'schools', 'colleges-universities'];

const PROMPTS = ['Which leads should we call first today?', 'Which programs are behind on admissions this term?', 'Which students need attention this month?', 'What are competitors in my city charging?'];

/** Animated "coming soon" teaser for Pype AI. */
function AiTeaser() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % PROMPTS.length), 3400); return () => clearInterval(id); }, []);
  return (
    <section className="section dark ai-teaser" aria-labelledby="ai-teaser-h">
      <div className="wrap ai-teaser-in">
        <div>
          <Reveal><span className="soon-badge"><i /> Coming soon</span></Reveal>
          <Reveal delay={0.05}><h2 id="ai-teaser-h" className="h2" style={{ marginTop: 16 }}>Pype AI: one centralized brain for your whole bundle</h2></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 16 }}>We are building a single AI that learns from PypeCRM, PypeERM and Pype Campus, and from knowledge across the web, to answer, draft and suggest. You stay in control of every action.</p></Reveal>
          <Reveal delay={0.15}><div className="prompt-ticker" aria-live="polite"><span className="prompt-label">Ask Pype AI</span><span key={i} className="prompt-text">{PROMPTS[i]}</span></div></Reveal>
          <Reveal delay={0.2}><ul className="check ai-checks"><li>One brain across your products</li><li>Knowledge from the web, with sources cited</li><li>Human-approved actions, permission-aware</li></ul></Reveal>
          <Reveal delay={0.25} className="btn-row"><Btn to="/ai" size="lg">Explore Pype AI</Btn><Btn to="/ai#waitlist" variant="light" size="lg">Join the waitlist</Btn></Reveal>
        </div>
        <Reveal delay={0.1} className="ai-teaser-orb"><NeuralOrb label="Animated neural orb connecting PypeCRM, PypeERM, Pype Campus and the web" /></Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo title="PypeOne — CRM, ERM and school management from one team" />
      <section className="hero center">
        <div className="blob" style={{ width: 320, height: 320, background: '#7fdcaa', left: '-60px', top: 40 }} />
        <div className="blob" style={{ width: 280, height: 280, background: '#c5f08a', right: '-40px', top: 120, animationDelay: '-4s' }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <Reveal><Link to="/products" className="pill"><b>PypeOne</b> Three products, one bundle →</Link></Reveal>
          <Reveal delay={0.05}><h1 className="h1">The software that runs your <span className="grad-text">growth and operations</span></h1></Reveal>
          <Reveal delay={0.1}><p className="lead">PypeCRM for any team that sells. PypeERM for educational institutions. Pype Campus for schools. Each runs on its own platform. Choose one, or take the bundle.</p></Reveal>
          <Reveal delay={0.15} className="btn-row"><Btn to="/contact/contact-sales" size="lg">Book a demo</Btn><Btn to="/products" variant="ghost" size="lg">Explore the products</Btn></Reveal>
          <Reveal delay={0.2}><p className="hero-note">Start with one product · Add the rest when you’re ready · Web and mobile</p></Reveal>
          <Reveal delay={0.25} className="hero-mock"><AppMock variant="board" theme="sales" style={{ maxWidth: 980, margin: '0 auto' }} /></Reveal>
        </div>
      </section>

      <div className="logos wrap"><p>Built for</p><div className="marquee"><div className="marquee-track">{[...WHO, ...WHO].map((n, k) => <span key={k}>{n}</span>)}</div></div></div>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Three products. One bundle." title="The right tool for how you work" lead="Each product is its own platform, built for its own audience. PypeOne is how you bundle them." />
          <div className="grid g3">
            {Object.entries(PRODUCTS).map(([k, p], i) => (
              <Reveal key={k} delay={i * 0.1}>
                <Link to={`/products/${k}`} className={`card product-card ${p.accent}`}>
                  <div className="ico">{p.icon}</div><span className="stage">{p.stage}</span>
                  <h3>{p.name}</h3><strong style={{ display: 'block', margin: '-2px 0 10px', color: 'var(--ink-2)', fontWeight: 500 }}>{p.tagline}</strong>
                  <p>{p.sub}</p>
                  <p className="muted" style={{ marginTop: 12, fontSize: 14 }}>For: {p.audience}</p>
                  <ul className="check" style={{ margin: '14px 0 0' }}>{p.points.slice(0, 3).map((x) => <li key={x.t}>{x.t}</li>)}</ul>
                  <span className="more">Explore {p.name} →</span>
                </Link>
              </Reveal>))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <SectionHead eyebrow="From lead to daily operations" title="Covers every step, end to end" lead="Each stage is handled by the product built for it, each on its own platform. Where you start depends on what you do." />
          <div className="life">
            {LIFECYCLE.map(([s, pk, d], i) => (
              <Reveal key={s} delay={i * 0.06} className={`life-step ${PRODUCTS[pk].accent}`}>
                <span className="life-n">{i + 1}</span><b>{s}</b><small>{d}</small><span className="life-p">{PRODUCTS[pk].name}</span>
              </Reveal>))}
          </div>
        </div>
      </section>

      <AiTeaser />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="See it" title="Take a look inside each product" />
          <Tabs tabs={['PypeCRM', 'PypeERM', 'Pype Campus']} render={(i) => {
            const k = ['pypecrm', 'pypeerm', 'pypecampus'][i]; const p = PRODUCTS[k];
            const mock = ['board', 'dashboard', 'heatmap'][i];
            return (
              <div className="split">
                <div className="tab-copy"><div className="eyebrow">{p.name} · {p.domain}</div><h3 className="h2" style={{ fontSize: 36 }}>{p.title}</h3><p>{p.sub}</p><ul className="check">{p.points.slice(0, 4).map((x) => <li key={x.t}><b>{x.t}.</b> {x.d}</li>)}</ul><div className="btn-row"><Btn to={`/products/${k}`} variant="dark">Explore {p.name}</Btn><a className="btn btn-ghost" href={p.url} target="_blank" rel="noopener noreferrer">Visit {p.domain} ↗</a></div></div>
                <AppMock variant={mock} theme={i === 0 ? 'sales' : 'edu'} />
              </div>
            );
          }} />
        </div>
      </section>

      <Photo k="suite" className="wrap" />

      <section className="section dark">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <SectionHead eyebrow="What changes for each person" title="Less chasing. More time for what matters." />
          <Carousel slides={PERSONAS} render={([t, d]) => <div className="center"><span className="badge" style={{ background: '#1d4029', color: '#bfe8cf' }}>{t}</span><p className="quote">{d}</p></div>} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Solutions" title="Shaped around how you work" />
          <div className="grid g4">{FEATURED.map((k, i) => { const v = SOLUTIONS[k]; return <Reveal key={k} delay={i * 0.07}><Link to={`/solutions/${k}`} className="card"><div className="ico">{v.icon}</div><h3>{v.name}</h3><p>{v.sub}</p><span className="more">Learn more →</span></Link></Reveal>; })}</div>
          <Reveal className="center" style={{ marginTop: 32 }}><Btn to="/solutions" variant="ghost">See all solutions</Btn></Reveal>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <SectionHead eyebrow="The suite at a glance" title="Breadth without the patchwork" />
          <Stats data={STATS} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Trust" title="Built to protect your data" />
          <div className="grid g4">
            {[['🔒', 'Role-based access', 'Every action tied to a role and logged.'], ['🧱', 'Data isolation', 'Each organisation is walled off from the others.'], ['🇮🇳', 'Hosted in India', 'Data stays in-region.'], ['🚫', 'No data selling', 'Your organisation’s data is not for sale.']].map(([i, t, d], k) => <Reveal key={t} delay={k * 0.07} className="card hov"><div className="ico">{i}</div><h3>{t}</h3><p>{d}</p></Reveal>)}
          </div>
          <Reveal className="center" style={{ marginTop: 36 }}><Btn to="/security" variant="dark">Read about security</Btn></Reveal>
        </div>
      </section>

      <CTA title="Ready to pick your product or bundle?" text="Tell us what you do and we will tailor a walkthrough, a pilot plan and a quote." />
    </>
  );
}
