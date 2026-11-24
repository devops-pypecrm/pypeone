import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Globe, ShieldCheck, Quote, UserCheck, Workflow, DatabaseZap, Lock, Phone, Settings, School, Search, FileText, Zap, BarChart3 } from 'lucide-react';
import NeuralOrb from '../components/NeuralOrb';
import { Reveal, SectionHead, Accordion, CTA, ContactForm, Tabs } from '../components/ui';
import { Seo } from './shared';
import { SITE_URL, AI_NAME } from '../data/site';

const TITLE = `${AI_NAME}: Centralized AI for Your Business, Institution and School (Coming Soon) | PypeOne`;
const DESC = 'Coming soon: Pype AI, one centralized AI brain for PypeCRM, PypeERM and Pype Campus that draws on your data and the web. Cited answers, human-approved actions.';

const FAQ = [
  { q: 'What is Pype AI?', a: 'Pype AI is a planned, centralized AI system for the PypeOne bundle. Instead of separate assistants inside each product, one AI brain will be able to draw on knowledge from PypeCRM, PypeERM and Pype Campus, and from the public web, to answer questions, draft work and suggest next steps.' },
  { q: 'When will Pype AI launch?', a: 'Pype AI is coming soon and is currently in development. There is no public launch date yet. Join the waitlist on this page and we will tell you first.' },
  { q: 'Can Pype AI find knowledge across the web?', a: 'That is the plan. Pype AI is being designed to research the public web alongside your own data and to cite its sources, so you can check where an answer came from.' },
  { q: 'Will Pype AI use my data to train public models?', a: 'Our principle is that your data stays yours. We do not sell it, and the plan is to keep it out of public model training. Final details will be published before launch.' },
  { q: 'Will Pype AI act without my approval?', a: 'No. The design is human-in-the-loop: Pype AI drafts and suggests, and a person approves before anything is sent or changed.' },
  { q: 'Does Pype AI work across all three products?', a: 'Pype AI is designed as a single AI layer for PypeCRM, PypeERM and Pype Campus. Each product keeps its own platform, and you can use any one of them on its own.' },
  { q: 'Is there AI in the products today?', a: 'Yes, in focused forms: lead scoring in PypeCRM, an AI report builder in PypeERM and early-warning flags in Pype Campus. Pype AI is the next step: a central brain behind them.' },
];

const JSON_LD = [
  { '@context': 'https://schema.org', '@type': 'WebPage', name: TITLE, description: DESC, url: `${SITE_URL}/ai`, isPartOf: { '@type': 'WebSite', name: 'PypeOne', url: SITE_URL },
    about: { '@type': 'SoftwareApplication', name: AI_NAME, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', description: 'A planned centralized AI system for PypeCRM, PypeERM and Pype Campus, drawing on organisational data and the public web.' } },
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: AI_NAME, item: `${SITE_URL}/ai` }] },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
];

const SOURCES = [['PypeCRM', 'Leads, calls, pipeline', Phone], ['PypeERM', 'Admissions, finance, HR', Settings], ['Pype Campus', 'Attendance, exams, fees', School], ['The web', 'Public sources, cited', Globe]];
const OUTCOMES = [['Cited answers', 'Every claim links to its source', Quote], ['Drafts for approval', 'Messages and notes, ready to review', FileText], ['Suggested next steps', 'What to do, and who should do it', Zap], ['Reports on request', 'Plain language in, charts out', BarChart3]];

const CAPABILITIES = [
  [Brain, 'One centralized brain', 'A single AI layer designed to sit behind PypeCRM, PypeERM and Pype Campus, instead of a separate assistant in each.'],
  [Globe, 'Knowledge across the web', 'Research the public web next to your own data, with sources cited, for market, regulation and competitor context.'],
  [DatabaseZap, 'Grounded in your data', 'Answers built from your own records, so they reflect your leads, students, fees and results, not generic advice.'],
  [Quote, 'Cited by default', 'Each answer shows where it came from, so you can verify before you act.'],
  [UserCheck, 'Human in the loop', 'Pype AI drafts and suggests. A person approves before anything is sent or changed.'],
  [Workflow, 'Helps you act', 'Turn an answer into a follow-up, a task, a message or a report without leaving the conversation.'],
  [ShieldCheck, 'Permission-aware', 'Designed to respect the role-based access you already set, so people only see what they should.'],
  [Lock, 'Your data stays yours', 'We do not sell your data. The plan is to keep it out of public model training.'],
];

const DEMOS = [
  ['Sales', 'Which leads from last week should we call first?', ['Eight leads look warm: Orbit Realty and Acme Traders asked for a quote twice.', 'Three have gone quiet for 5+ days and should get a follow-up today.'], ['PypeCRM · Leads', 'PypeCRM · Calls']],
  ['Institution', 'Which programs are behind on admissions this term?', ['MBA and B.Com are 18% below last term at this point.', 'Most lost enquiries stalled at document verification. Draft a reminder campaign?'], ['PypeERM · Admissions', 'The web · Intake trends']],
  ['School', 'Which Grade 8 students need attention this month?', ['Three students show a downward trend in marks and attendance.', 'A note to parents is drafted for the class teacher to approve.'], ['Pype Campus · Exams', 'Pype Campus · Attendance']],
];

function useTyped(text, run) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    if (!run) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(text.length); return undefined; }
    const id = setInterval(() => setN((x) => (x >= text.length ? (clearInterval(id), x) : x + 2)), 22);
    return () => clearInterval(id);
  }, [text, run]);
  return text.slice(0, n);
}

function Demo({ q, lines, srcs }) {
  const typedQ = useTyped(q, true);
  const full = lines.join(' ');
  const typedA = useTyped(full, typedQ.length >= q.length);
  const answering = typedQ.length >= q.length;
  return (
    <div className="ai-demo">
      <div className="ai-demo-q">{typedQ}{!answering && <i className="caret" />}</div>
      {answering && <div className="ai-demo-a"><span className="ai-demo-tag"><Brain size={14} /> {AI_NAME} · preview</span><p>{typedA}{typedA.length < full.length && <i className="caret" />}</p>
        {typedA.length >= full.length && <div className="ai-demo-src">{srcs.map((x) => <span key={x} className="src">{x}</span>)}</div>}</div>}
    </div>
  );
}

export default function AiPage() {
  const formRef = useRef(null);
  return (
    <>
      <Seo title={TITLE} description={DESC} jsonLd={JSON_LD} />

      <section className="ai-hero">
        <div className="wrap ai-hero-in">
          <div>
            <Reveal><span className="soon-badge"><i /> Coming soon</span></Reveal>
            <Reveal delay={0.05}><h1 className="ai-h1">One centralized AI that knows your work <span className="grad-text">and the web</span></h1></Reveal>
            <Reveal delay={0.1}><p className="ai-lead">{AI_NAME} is the AI brain we are building for the PypeOne bundle: a single, centralized system that learns from PypeCRM, PypeERM and Pype Campus and reaches out to knowledge across the web, then helps your team decide and act.</p></Reveal>
            <Reveal delay={0.15} className="btn-row" style={{ marginTop: 28 }}>
              <button className="btn btn-primary btn-lg" onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Join the waitlist</button>
              <a className="btn btn-light btn-lg" href="#how">See how it works</a>
            </Reveal>
            <Reveal delay={0.2}><p className="ai-note">In development. Details may change before launch.</p></Reveal>
          </div>
          <Reveal delay={0.1} className="ai-hero-orb"><NeuralOrb label="Animated neural orb connecting PypeCRM, PypeERM, Pype Campus and the web" /></Reveal>
        </div>
      </section>

      <section className="section" id="how">
        <div className="wrap">
          <SectionHead eyebrow="How Pype AI works" title="From your data and the web, to answers you can act on" lead="One brain takes in knowledge from every PypeOne product and the public web, then turns it into cited answers and drafts for a person to approve." />
          <div className="flow3">
            <div className="flow-col">{SOURCES.map(([n, d, Icon], i) => <Reveal key={n} delay={i * 0.08} className="flow-chip flow-src"><span className="mi-icon"><Icon size={26} strokeWidth={1.75} /></span><span><b>{n}</b><small>{d}</small></span></Reveal>)}</div>
            <div className="flow-mid"><NeuralOrb labels={false} density={0.55} label="Pype AI brain" /><span className="flow-name">{AI_NAME}</span></div>
            <div className="flow-col">{OUTCOMES.map(([n, d, Icon], i) => <Reveal key={n} delay={i * 0.08} className="flow-chip flow-out"><span className="mi-icon"><Icon size={26} strokeWidth={1.75} /></span><span><b>{n}</b><small>{d}</small></span></Reveal>)}</div>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap">
          <SectionHead eyebrow="What Pype AI will do" title="A centralized AI system, built for control" lead="These are the capabilities we are designing toward. All are planned and not yet available." />
          <div className="grid g4">{CAPABILITIES.map(([Icon, t, d], i) => <Reveal key={t} delay={(i % 4) * 0.07}><div className="card hov"><div className="ico"><Icon size={22} strokeWidth={1.75} /></div><h3>{t}</h3><p>{d}</p><span className="planned">Planned</span></div></Reveal>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 940 }}>
          <SectionHead eyebrow="Ask anything" title="Ask in plain language, get a cited answer" lead="An illustrative preview of the kind of conversation Pype AI is designed for. Sample data only." />
          <Tabs tabs={DEMOS.map((d) => d[0])} render={(i) => <Demo key={i} q={DEMOS[i][1]} lines={DEMOS[i][2]} srcs={DEMOS[i][3]} />} />
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <SectionHead eyebrow="AI in the products today" title="Focused AI today. A central brain next." lead="Each product already has focused AI features. Pype AI is the next step: one brain behind them." />
          <div className="grid g3">{[['PypeCRM', 'Lead scoring', 'Ranks incoming leads by engagement and quality, so reps know who to call first.', Phone], ['PypeERM', 'AI report builder', 'Describe the report you need and get it built.', Settings], ['Pype Campus', 'Early warning', 'Flags students whose marks or attendance are slipping and drafts a note for the teacher to approve.', School]].map(([n, t, d, Icon], i) => <Reveal key={n} delay={i * 0.08} className="card hov"><div className="ico"><Icon size={22} strokeWidth={1.75} /></div><span className="badge" style={{ background: '#1d4029', color: '#bfe8cf' }}>{n}</span><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <SectionHead eyebrow="Roadmap" title="Where Pype AI is headed" lead="No dates yet. This is the order we are working in." />
          <div className="timeline">{[['Today', 'Focused AI inside individual products: lead scoring, report building and early warning.'], ['In development', 'Pype AI core: a centralized brain with cited answers, grounded in your own data.'], ['Next', 'Knowledge across the web, with sources cited alongside your data.'], ['Later', 'Human-approved actions that carry out follow-ups, tasks and reports across the bundle.']].map(([t, d]) => <Reveal key={t}><b>{t}</b><p>{d}</p></Reveal>)}</div>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <SectionHead eyebrow="FAQ" title="Questions about Pype AI" />
          <Accordion items={FAQ} />
        </div>
      </section>

      <section className="section" ref={formRef} id="waitlist">
        <div className="wrap" style={{ maxWidth: 560 }}>
          <SectionHead eyebrow="Be first" title="Join the Pype AI waitlist" lead="Tell us which product you use and we will let you know when Pype AI is ready." />
          <div className="card" style={{ padding: 32 }}><ContactForm fields={['name', 'email', 'interest']} submit="Notify me at launch" done="You’re on the list. (Prototype: nothing is stored yet.)" /></div>
          <p className="center muted" style={{ marginTop: 22, fontSize: 14 }}>Explore the products: <Link to="/products/pypecrm" className="in-link">PypeCRM</Link> · <Link to="/products/pypeerm" className="in-link">PypeERM</Link> · <Link to="/products/pypecampus" className="in-link">Pype Campus</Link> · <Link to="/products" className="in-link">the PypeOne bundle</Link></p>
        </div>
      </section>
    </>
  );
}
