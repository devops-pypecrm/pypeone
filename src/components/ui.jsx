import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PHOTOS } from '../data/photos';

export function Logo({ light }) {
  return (
    <Link to="/" className="logo" aria-label="PypeOne home" style={light ? { color: '#fff' } : undefined}>
      <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0b8f5b" /><stop offset=".6" stopColor="#27c470" /><stop offset="1" stopColor="#9bd94b" /></linearGradient></defs>
        <rect width="32" height="32" rx="9" fill="url(#lg)" /><path d="M11 9h6a5 5 0 010 10h-3v4h-3z" fill="#fff" />
      </svg>
      PypeOne
    </Link>
  );
}

/** Scroll-triggered reveal; respects reduced motion via CSS. */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setOn(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} style={{ '--d': `${delay}s` }} {...rest}>{children}</Tag>;
}

export function Btn({ to, href, variant = 'primary', size, children, ...p }) {
  const cls = `btn btn-${variant} ${size === 'lg' ? 'btn-lg' : ''}`;
  if (to) return <Link to={to} className={cls} {...p}>{children}</Link>;
  return <a href={href || '#'} className={cls} {...p}>{children}</a>;
}

export function SectionHead({ eyebrow, title, lead, left }) {
  return (
    <Reveal className={`sec-head ${left ? 'left' : ''}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}

export function Tabs({ tabs, render, center = true }) {
  const [i, setI] = useState(0);
  const onKey = (e) => {
    if (e.key === 'ArrowRight') setI((i + 1) % tabs.length);
    if (e.key === 'ArrowLeft') setI((i - 1 + tabs.length) % tabs.length);
  };
  return (
    <div>
      <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 40 }}>
        <div className="tabs-bar" role="tablist" onKeyDown={onKey}>
          {tabs.map((t, k) => <button key={t} role="tab" aria-selected={i === k} tabIndex={i === k ? 0 : -1} className={`tab ${i === k ? 'on' : ''}`} onClick={() => setI(k)}>{t}</button>)}
        </div>
      </div>
      <div key={i} className="tab-panel" role="tabpanel">{render(i)}</div>
    </div>
  );
}

export function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map((it, k) => (
        <div key={it.q} className={`faq-i ${open === k ? 'on' : ''}`}>
          <button className="faq-q" aria-expanded={open === k} onClick={() => setOpen(open === k ? -1 : k)}>{it.q}<i>+</i></button>
          <div className="faq-a"><div><p>{it.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}

export function CTA({ title = 'See PypeOne run your institution', text = 'Tell us how you work today and we will show you how it looks in PypeOne.', primary = ['Book a demo', '/contact/contact-sales'], secondary = ['See the bundle', '/products'] }) {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap"><Reveal className="cta">
        <h2 className="h2">{title}</h2><p>{text}</p>
        <div className="btn-row"><Btn to={primary[1]} size="lg">{primary[0]}</Btn>{secondary && <Btn to={secondary[1]} variant="light" size="lg">{secondary[0]}</Btn>}</div>
      </Reveal></div>
    </section>
  );
}

export function Marquee({ items, label }) {
  const row = [...items, ...items];
  return (
    <div className="logos wrap">
      {label && <p>{label}</p>}
      <div className="marquee"><div className="marquee-track">{row.map((n, k) => <span key={k}>{n}</span>)}</div></div>
    </div>
  );
}

export function Stats({ data }) {
  return <div className="stats">{data.map(([v, l], k) => <Reveal key={l} delay={k * 0.08} className="stat"><b>{v}</b><span>{l}</span></Reveal>)}</div>;
}

export function Photo({ k, caption, className = '' }) {
  const p = PHOTOS[k];
  if (!p) return null;
  return <figure className={`photo ${className}`}><img src={p.src} alt={p.alt} loading="lazy" />{caption && <figcaption>{caption}</figcaption>}</figure>;
}

export function Chev() { return <svg className="chev" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1.5 3.5L5 7l3.5-3.5" /></svg>; }

export function Carousel({ slides, render }) {
  const [i, setI] = useState(0);
  const timer = useRef();
  useEffect(() => { timer.current = setInterval(() => setI((x) => (x + 1) % slides.length), 7000); return () => clearInterval(timer.current); }, [slides.length]);
  const go = (n) => { clearInterval(timer.current); setI((n + slides.length) % slides.length); };
  return (
    <div className="carousel" aria-roledescription="carousel">
      <div key={i} className="slide">{render(slides[i], i)}</div>
      <div className="dots">{slides.map((_, k) => <button key={k} className={k === i ? 'on' : ''} aria-label={`Go to slide ${k + 1}`} onClick={() => go(k)} />)}</div>
      <div className="arrows" style={{ justifyContent: 'center', marginTop: 20 }}><button aria-label="Previous" onClick={() => go(i - 1)}>←</button><button aria-label="Next" onClick={() => go(i + 1)}>→</button></div>
    </div>
  );
}

export function ContactForm({ fields = ['name', 'email', 'company', 'message'], submit = 'Send message', done = 'Thanks! We will reply within one business day.' }) {
  const [sent, setSent] = useState(false);
  const labels = { name: 'Full name', email: 'Work email', company: 'Company', message: 'How can we help?', size: 'Organisation size', phone: 'Phone', interest: 'I’m interested in' };
  if (sent) return <div className="ok" role="status">{done}</div>;
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      {fields.map((f) => (
        <div className="field" key={f}>
          <label htmlFor={f}>{labels[f]}</label>
          {f === 'message' ? <textarea id={f} rows="4" required /> : f === 'interest' ? <select id={f}><option>The full PypeOne bundle</option><option>PypeCRM — sales & customer CRM</option><option>PypeERM — ERP for educational institutions</option><option>Pype Campus — school management</option></select> : f === 'size' ? <select id={f}><option>1–10 people</option><option>11–50 people</option><option>51–200 people</option><option>201–1,000 people</option><option>1,000+ people</option><option>Multiple branches or institutions</option></select> : <input id={f} type={f === 'email' ? 'email' : 'text'} required={f !== 'phone'} />}
        </div>
      ))}
      <button className="btn btn-primary btn-lg" type="submit">{submit}</button>
    </form>
  );
}
