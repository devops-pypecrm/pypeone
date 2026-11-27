import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { LogoMark } from './ui';

/**
 * Pinned, scroll-driven product showcase (one slide per product).
 * The section is N viewports tall; its stage sticks while you scroll and the active slide follows scroll progress.
 * Text layers cross-fade with a stagger; the device for each product rises from the bottom into the centre.
 */
const SLIDES = [
  {
    key: 'pypecrm', name: 'PypeCRM', ghost: 'CRM', num: '01', device: 'phone', screen: '/screens/pypecrm-phone.jpg', url: 'https://pypecrm.com', domain: 'pypecrm.com',
    lead: 'The sales and customer engine',
    body: 'Capture leads from ads, WhatsApp, web forms and calls into one inbox, route them to the right rep the moment they arrive, and follow every one to a closed deal. Calls record themselves and every touch lands on one timeline.',
    stats: [['7', 'Lead channels'], ['Auto', 'Lead routing'], ['Live', 'WhatsApp inbox'], ['Multi', 'Branch control']],
  },
  {
    key: 'pypeerm', name: 'PypeERM', ghost: 'ERM', num: '02', device: 'laptop', screen: '/screens/pypeerm-laptop.jpg', url: 'https://pypeerm.com', domain: 'pypeerm.com',
    lead: 'The ERP for educational institutions',
    body: 'Admissions, study centres, finance, HR and payroll, classes and operations on shared student and finance data, so teams stop re-entering it. Built for colleges, universities, coaching institutes and study-centre networks.',
    stats: [['9', 'Core modules'], ['15+', 'Role dashboards'], ['Selfie', 'Punch-in attendance'], ['Online', 'Applications']],
  },
  {
    key: 'pypecampus', name: 'Pype Campus', ghost: 'CAMPUS', num: '03', device: 'tablet', screen: '/screens/pypecampus-tablet.jpg', url: 'https://pypecampus.com', domain: 'pypecampus.com',
    lead: 'The school management system',
    body: 'Admissions, fees, attendance, exams, report cards, payroll and transport, with a parent and student portal and progress tracking from the first day a student joins.',
    stats: [['10+', 'Modules'], ['NFC', 'Bus tap-in'], ['1 login', 'Parent portal'], ['Excel', 'Marks import']],
  },
];

function Device({ s }) {
  const img = <img src={s.screen} alt={`${s.name} product page`} loading="lazy" />;
  if (s.device === 'phone') return <div className="dv dv-phone"><span className="dv-island" /><div className="dv-scr"><span className="dv-status">9:41</span>{img}</div></div>;
  if (s.device === 'tablet') return <div className="dv dv-tablet">{img}</div>;
  return <div className="dv dv-laptop"><div className="dv-lid"><span className="dv-cam" />{img}</div><div className="dv-base" /></div>;
}

export default function Showcase() {
  const secRef = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = secRef.current; if (!el) return;
      const r = el.getBoundingClientRect(), span = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, span)));
      setProgress(p);
      setActive(Math.min(SLIDES.length - 1, Math.floor(p * SLIDES.length * 0.999)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Jump the page so slide i is showing (centre of its scroll band)
  const goTo = useCallback((i) => {
    const el = secRef.current; if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY, span = el.offsetHeight - window.innerHeight;
    const y = i >= SLIDES.length ? top + el.offsetHeight - 40 : top + span * ((i + 0.5) / SLIDES.length);
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  const state = (i) => (i === active ? 'on' : i < active ? 'past' : 'next');

  return (
    <section ref={secRef} className="showcase" style={{ height: `${SLIDES.length * 100 + 40}vh` }} aria-label="PypeOne products">
      <div className="sc-stage">
        {/* nav row */}
        <div className="sc-top wrap">
          <div className="sc-brand"><LogoMark light className="sc-mark" /><span>Products</span></div>
          <nav className="sc-tabs" aria-label="Choose a product">
            {SLIDES.map((s, i) => <button key={s.key} className={i === active ? 'on' : ''} aria-current={i === active} onClick={() => goTo(i)}>{s.name}</button>)}
          </nav>
          <div className="sc-pill-wrap">
            {SLIDES.map((s, i) => <a key={s.key} className={`sc-pill ${state(i)}`} href={s.url} target="_blank" rel="noopener noreferrer" tabIndex={i === active ? 0 : -1}>{s.domain}<ArrowUpRight size={16} /></a>)}
          </div>
        </div>

        {/* giant faded words */}
        {SLIDES.map((s, i) => <div key={`g${s.key}`} className={`sc-ghost ${state(i)}`} aria-hidden="true">{s.ghost}</div>)}
        {SLIDES.map((s, i) => <div key={`n${s.key}`} className={`sc-num ${state(i)}`} aria-hidden="true">{s.num}</div>)}

        {/* device rising into the centre */}
        <div className="sc-device-zone">
          {SLIDES.map((s, i) => <div key={`d${s.key}`} className={`sc-device ${state(i)}`} aria-hidden={i !== active}><Device s={s} /></div>)}
        </div>

        {/* copy */}
        <div className="sc-copy">
          {SLIDES.map((s, i) => (
            <div key={`c${s.key}`} className={`sc-copy-in ${state(i)}`} aria-hidden={i !== active}>
              <div className="sc-mini"><LogoMark light className="sc-mini-mark" /><span>Pype.One</span></div>
              <h3 className="sc-title">{s.name}</h3>
              <p className="sc-lead">{s.lead}</p>
              <p className="sc-body">{s.body}</p>
              <div className="sc-ctas">
                <Link to={`/products/${s.key}`} className="sc-btn" tabIndex={i === active ? 0 : -1}>Explore {s.name}</Link>
                <Link to="/contact/contact-sales" className="sc-link" tabIndex={i === active ? 0 : -1}>Book a demo</Link>
              </div>
            </div>
          ))}
        </div>

        {/* specs row */}
        <div className="sc-stats">
          {SLIDES.map((s, i) => (
            <div key={`s${s.key}`} className={`sc-stats-in ${state(i)}`} aria-hidden={i !== active}>
              {s.stats.map(([v, l]) => <div key={l} className="sc-stat"><b>{v}</b><span>{l}</span></div>)}
            </div>
          ))}
        </div>

        {/* counter + progress, next button */}
        <div className="sc-counter"><b>{SLIDES[active].num}</b> / 0{SLIDES.length}<i><em style={{ transform: `scaleX(${progress})` }} /></i></div>
        <button className="sc-next" onClick={() => goTo(active + 1)} aria-label={active < SLIDES.length - 1 ? `Next product: ${SLIDES[active + 1].name}` : 'Continue'}><ChevronDown size={26} strokeWidth={2.4} /></button>
      </div>
    </section>
  );
}
