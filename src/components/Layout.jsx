import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Logo, Btn, Chev } from './ui';
import MenuIcon from './MenuIcon';
import { MENUS, TOP_LINKS, COMPANY_MENU, FOOTER, PRODUCT_SITES } from '../data/nav';

/** One nav entry. Open/close state and the single shared close-timer live in <Header>, so moving
 *  between entries can never leave a stale timer that closes the menu that just opened. */
function Mega({ m, idx, open, show, hide, toggle }) {
  const isOpen = open === idx;
  return (
    <div className={`nav-item ${m.cols ? '' : 'rel'} ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => show(idx)} onMouseMove={() => { if (!isOpen) show(idx); }} onMouseLeave={hide}
      onFocus={() => show(idx)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) hide(); }}>
      <button className="nav-btn" aria-haspopup="true" aria-expanded={isOpen} onClick={() => toggle(idx)}>{m.label}<Chev /></button>
      {m.cols ? (
        <div className="mega" role="menu">
          <div className="wrap mega-in">
            <div className="mega-cols">{m.cols.map((c) => (
              <div className="mega-col" key={c.title}><h6>{c.title}</h6>{c.head && <Link to={c.head.to} className="mega-head">{c.head.label} →</Link>}
                {c.items.map((it) => <Link key={it.to} to={it.to} className="mega-item" role="menuitem"><span className="mi-icon"><MenuIcon name={it.ico} fallback={it.icon} /></span><span><div className="mi-t">{it.label}{it.soon && <span className="soon">Soon</span>}</div>{it.desc && <div className="mi-d">{it.desc}</div>}</span></Link>)}
              </div>))}</div>
            <Link to={m.feature.to} className="mega-side"><span className="tag">{m.feature.tag}</span><h5>{m.feature.title}</h5><p>{m.feature.desc}</p><span className="btn btn-dark" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>Learn more →</span></Link>
          </div>
          <div className="mega-foot"><div className="wrap">{m.foot.map((f) => <Link key={f.to} to={f.to}>{f.label} →</Link>)}</div></div>
        </div>
      ) : (
        <div className="dd" role="menu">{m.items.map((it) => <Link key={it.to} to={it.to} role="menuitem">{it.label}</Link>)}</div>
      )}
    </div>
  );
}

/** "Log in" / "Request access" dropdown: one entry per product, each opening that product's own site. */
function ProductLinks({ label, className, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const t = useRef();
  const enter = () => { clearTimeout(t.current); setOpen(true); };
  const leave = () => { clearTimeout(t.current); t.current = setTimeout(() => setOpen(false), 150); };
  const click = () => { clearTimeout(t.current); setOpen((o) => (window.matchMedia('(hover: hover)').matches ? true : !o)); };
  return (
    <div className={`cta-dd ${open ? 'open' : ''}`} onMouseEnter={enter} onMouseLeave={leave} onFocus={enter} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) leave(); }}>
      <button className={className} aria-haspopup="true" aria-expanded={open} onClick={click}>{label}<Chev /></button>
      <div className={`dd cta-menu ${align}`} role="menu">
        <div className="dd-h">{label === 'Log in' ? 'Log in to' : 'Request access to'}</div>
        {PRODUCT_SITES.map((p) => (
          <a key={p.key} href={p.url} target="_blank" rel="noopener noreferrer" role="menuitem" className="dd-prod">
            <span className="mi-icon"><MenuIcon name={p.ico} fallback={p.icon} /></span><span><b>{p.name}</b><small>{p.domain} ↗</small></span>
          </a>))}
      </div>
    </div>
  );
}

function Drawer({ on }) {
  const [sec, setSec] = useState(null);
  const groups = [...MENUS.map((m) => ({ label: m.label, cols: m.cols })), { label: COMPANY_MENU.label, flat: COMPANY_MENU.items }];
  return (
    <div className={`drawer ${on ? 'on' : ''}`} aria-hidden={!on}>
      {groups.map((g) => (
        <div key={g.label}>
          <button className={`acc-h ${sec === g.label ? 'on' : ''}`} aria-expanded={sec === g.label} onClick={() => setSec(sec === g.label ? null : g.label)}>{g.label}<Chev /></button>
          <div className={`acc-b ${sec === g.label ? 'on' : ''}`}><div>
            {g.cols ? g.cols.map((c) => <div key={c.title}><h6>{c.title}</h6>{c.items.map((i) => <Link key={i.to} to={i.to}>{i.label}</Link>)}</div>) : g.flat.map((i) => <Link key={i.to} to={i.to}>{i.label}</Link>)}
          </div></div>
        </div>
      ))}
      {TOP_LINKS.map((l) => <Link key={l.to} to={l.to} className="top">{l.label}</Link>)}
      <div className="drawer-prods"><h6>Log in or request access</h6>{PRODUCT_SITES.map((p) => <a key={p.key} href={p.url} target="_blank" rel="noopener noreferrer"><b>{p.name}</b><small>{p.domain} ↗</small></a>)}</div>
      <div className="btn-row"><Btn to="/contact/contact-sales">Book a demo</Btn></div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(null);
  const timer = useRef();
  const show = (i) => { clearTimeout(timer.current); setOpen(i); };
  const hide = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(null), 150); };
  // Hover-capable devices: hover already opens the menu, so a click must never close it (that read as a glitch).
  // Touch devices have no hover, so a tap toggles.
  const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  const toggle = (i) => { clearTimeout(timer.current); if (canHover()) return show(i); setOpen((cur) => (cur === i ? null : i)); };
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => { clearTimeout(timer.current); setOpen(null); setMobile(false); }, [loc.pathname]);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 8); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : ''; }, [mobile]);
  useEffect(() => { const k = (e) => e.key === 'Escape' && (setOpen(null), setMobile(false)); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  return (
    <>
      <div className="announce" id="announce">Coming soon: Pype AI, one centralized AI brain for the PypeOne bundle. <Link to="/ai">Explore →</Link></div>
      <header className={`header ${scrolled ? 'scrolled' : ''} ${open !== null && open !== 99 ? 'menu-open' : ''}`}>
        <div className="wrap header-in">
          <Logo />
          <nav className="nav" aria-label="Main">
            {MENUS.map((m, i) => <Mega key={m.label} m={m} idx={i} open={open} show={show} hide={hide} toggle={toggle} />)}
            {TOP_LINKS.map((l) => <NavLink key={l.to} to={l.to} className="nav-link">{l.label}</NavLink>)}
            <Mega m={COMPANY_MENU} idx={99} open={open} show={show} hide={hide} toggle={toggle} />
          </nav>
          <div className="header-cta">
            <span className="hide-sm"><ProductLinks label="Request access" className="btn btn-ghost" /></span>
            <span className="hide-sm"><ProductLinks label="Log in" className="login" /></span>
            <Link to="/contact/contact-sales" className="btn btn-primary">Book a demo</Link>
            <button className={`burger ${mobile ? 'on' : ''}`} aria-label="Menu" aria-expanded={mobile} onClick={() => setMobile(!mobile)}><span /></button>
          </div>
        </div>
      </header>
      <Drawer on={mobile} />
    </>
  );
}

function Footer() {
  const [done, setDone] = useState(false);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo light /><p>PypeCRM for any team that sells, PypeERM for educational institutions, and Pype Campus for schools.</p>
            {done ? <p style={{ marginTop: 18, color: '#ffc999' }}>You’re on the list ✓</p> : <form className="subscribe" onSubmit={(e) => { e.preventDefault(); setDone(true); }}><input type="email" required placeholder="Your email" aria-label="Email" /><button>Subscribe</button></form>}
            <div className="site-links">{PRODUCT_SITES.map((p) => <a key={p.key} href={p.url} target="_blank" rel="noopener noreferrer">{p.domain} ↗</a>)}</div><div className="social">{['X', 'in', 'f', '▶', 'ig'].map((s) => <a key={s} href="#" aria-label={s} onClick={(e) => e.preventDefault()}>{s}</a>)}</div>
          </div>
          {FOOTER.map((c) => <div key={c.title}><h6>{c.title}</h6><ul>{c.links.map(([l, to]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul></div>)}
        </div>
        <div className="footer-bot">
          <span>© 2026 PypeOne. All rights reserved.</span>
          <nav aria-label="Legal"><Link to="/terms">Terms</Link><Link to="/terms/privacy">Privacy</Link><Link to="/terms/security-policy">Security</Link><Link to="/download">Mobile apps</Link></nav>
          <span>🌐 English</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const [top, setTop] = useState(false);
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);
  useEffect(() => { const f = () => setTop(window.scrollY > 700); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => {
    const a = document.getElementById('announce'); const set = () => document.documentElement.style.setProperty('--announce-h', `${a ? a.offsetHeight : 0}px`);
    set(); window.addEventListener('resize', set); return () => window.removeEventListener('resize', set);
  }, []);
  return (
    <>
      <Header /><main id="main"><Outlet /></main><Footer />
      <button className={`to-top ${top ? 'on' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
    </>
  );
}
