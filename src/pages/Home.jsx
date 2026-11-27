import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import AiWaves from '../components/AiWaves';
import HeroSilk from '../components/HeroSilk';
import Showcase from '../components/Showcase';
import { LogoMark, Btn, Reveal, SectionHead, Tabs, Stats, CTA, Carousel, Photo } from '../components/ui';
import AppMock from '../components/AppMock';
import { PRODUCTS, SOLUTIONS, STATS, LIFECYCLE } from '../data/content';
import { Seo } from './shared';

// eslint-disable-next-line no-unused-vars
const WHO = ['Sales teams', 'Multi-branch businesses', 'Agencies', 'Real estate', 'Clinics', 'Colleges', 'Schools', 'Coaching institutes', 'Study-centre networks'];
const PERSONAS = [
  ['Sales teams', 'Every lead captured, routed and scored, with calls and WhatsApp on one timeline so no enquiry goes cold.'],
  ['Managers & owners', 'Live dashboards, leaderboards and daily reports across every branch, without asking anyone for a spreadsheet.'],
  ['Institution leaders', 'One view of fees collected and pending, attendance, staff presence and results, with approvals that follow your reporting chart.'],
  ['Teachers & faculty', 'Attendance and marks entered once. Excel marks import, a class heat map showing who needs help, and report card remarks drafted for review.'],
  ['Parents', 'A single login for results, attendance, fees, notices and the bus, with an instant message when the child boards or leaves.'],
];
const FEATURED = ['sales-teams', 'multi-branch-businesses', 'schools', 'colleges-universities'];

/** Home "Pype AI" teaser: copy on the left, animated dotted-particle waves + glass orb art on the right (canvas). */
function AiTeaser() {
  return (
    <section className="section dark ai-teaser" aria-labelledby="ai-teaser-h">
      <AiWaves />
      <div className="wrap ai-teaser-in">
        <div className="ai-teaser-copy">
          <Reveal>
            <span className="ai-pill">
              <LogoMark light className="ai-pill-mark" />
              Pype AI <i /> <em>Coming soon</em>
            </span>
          </Reveal>
          <Reveal delay={0.05}><h2 id="ai-teaser-h">Ask. Decide. <span className="grad-text">Grow.</span></h2></Reveal>
          <Reveal delay={0.1}><p>Pype AI is the centralized AI brain we are building for the PypeOne bundle: one system that learns from your products and from knowledge across the web, with you approving every action.</p></Reveal>
          <Reveal delay={0.15} className="ai-cta">
            <Link to="/ai" className="ai-btn-solid">Explore Pype AI <ArrowRight size={18} /></Link>
            <Link to="/ai#waitlist" className="ai-btn-ghost"><span>Join the waitlist</span><i><Play size={14} fill="currentColor" /></i></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo title="PypeOne — CRM, ERM and school management from one team" />
      <HeroSilk />

      <Showcase />

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
          <Carousel slides={PERSONAS} render={([t, d]) => <div className="center"><span className="badge" style={{ background: '#1d4a2a', color: '#d6f5cf' }}>{t}</span><p className="quote">{d}</p></div>} />
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
