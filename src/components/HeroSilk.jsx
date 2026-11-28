import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Send, Phone, Building2, House, Stethoscope, GraduationCap, School } from 'lucide-react';

/* ---------- Silk ribbons: families of cubic curves forming translucent sheets, gently morphing (SMIL) ---------- */
const N = 28;
const SHEETS = [
  { // big sheet: bottom-left sweeping up to top-right
    a: (s) => [[-100, 640 + s * 40], [300 + s * 60, 700 - s * 120], [700 - s * 80, 300 + s * 160], [1300, 20 + s * 90]],
    b: (s) => [[-100, 650 + s * 36], [360 + s * 60, 660 - s * 100], [770 - s * 60, 250 + s * 190], [1300, 45 + s * 80]],
  },
  { // lower sheet passing under the CTA
    a: (s) => [[-100, 420 + s * 70], [300, 545 + s * 80], [800, 360 - s * 30], [1300, 285 + s * 85]],
    b: (s) => [[-100, 432 + s * 64], [350, 512 + s * 90], [760, 398 - s * 20], [1300, 305 + s * 80]],
  },
];
const f = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const curve = (P) => `M${f(P[0])} C${f(P[1])} ${f(P[2])} ${f(P[3])}`;
const band = (P0, P1) => `${curve(P0)} L${f(P1[3])} C${f(P1[2])} ${f(P1[1])} ${f(P1[0])} Z`;

const lerp = (P, Q, m) => P.map((pt, i) => [pt[0] + (Q[i][0] - pt[0]) * m, pt[1] + (Q[i][1] - pt[1]) * m]);

// Every drawn path, in render order: blurred shadow band, sheen band, then per-strand shadow + highlight.
const ITEMS = SHEETS.flatMap((sh) => {
  const A = Array.from({ length: N }, (_, k) => sh.a(k / (N - 1)));
  const B = Array.from({ length: N }, (_, k) => sh.b(k / (N - 1)));
  const bandD = (m) => band(lerp(A[0], B[0], m), lerp(A[N - 1], B[N - 1], m));
  return [
    { kind: 'shadow', d: bandD }, { kind: 'sheet', d: bandD },
    ...A.flatMap((P, k) => { const d = (m) => curve(lerp(P, B[k], m)); return [{ kind: 'strand-shade', d }, { kind: 'strand', d }]; }),
  ];
});
const PROPS = {
  shadow: { fill: '#9aa09a', opacity: 0.16, filter: 'url(#silk-blur)', transform: 'translate(0 16)' },
  sheet: { fill: 'url(#silk-fill)' },
  'strand-shade': { fill: 'none', stroke: '#000', strokeOpacity: 0.028, strokeWidth: 1.4, transform: 'translate(0 1.5)' },
  strand: { fill: 'none', stroke: '#fff', strokeOpacity: 0.95, strokeWidth: 0.9 },
};

function Silk() {
  const ref = useRef(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const paths = svg.querySelectorAll('path[data-silk]');
    let raf = 0, visible = true, last = 0;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(svg);
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible || now - last < 33) return;                       // ~30fps is plenty for a slow drift
      last = now;
      const m = 0.5 - 0.5 * Math.cos(((now - t0) / 14000) * Math.PI * 2); // ease back and forth over 14s
      paths.forEach((el, i) => el.setAttribute('d', ITEMS[i].d(m)));
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  return (
    <svg ref={ref} className="silk" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="silk-fill" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset=".5" stopColor="#f8f8f7" stopOpacity=".7" /><stop offset="1" stopColor="#fff" stopOpacity=".9" /></linearGradient>
        <filter id="silk-blur" x="-10%" y="-10%" width="120%" height="140%"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      {ITEMS.map((it, i) => <path key={i} data-silk="" d={it.d(0)} {...PROPS[it.kind]} />)}
    </svg>
  );
}

/* ---------- "Ask" bar: routes a plain-language need to the right product ---------- */
const ROUTES = [
  [/school|campus|parent|bus|transport|report card|class ?\d|grade/i, '/products/pypecampus'],
  [/college|universit|institut|coaching|study ?cent|admission|erp|payroll|hr\b|faculty|student/i, '/products/pypeerm'],
  [/lead|sales|crm|deal|pipeline|call|whatsapp|customer|real estate|clinic|agency|marketing/i, '/products/pypecrm'],
  [/\bai\b|brain|assistant/i, '/ai'],
  [/price|pricing|cost|quote/i, '/pricing'],
];
const routeFor = (q) => (ROUTES.find(([re]) => re.test(q)) || [null, '/products'])[1];

const CHIPS = [
  ['Lead capture', 'c1'], ['Admissions', 'c2'], ['Fees & payroll', 'c3'], ['Attendance', 'c4'], ['Report cards', 'c5'], ['Pick a product', 'c6'],
];
const BUILT_FOR = [[Phone, 'Sales teams'], [Building2, 'Multi-branch'], [House, 'Real estate'], [Stethoscope, 'Clinics'], [GraduationCap, 'Colleges'], [School, 'Schools']];

export default function HeroSilk() {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const go = (e) => { e.preventDefault(); nav(routeFor(q)); };
  return (
    <section className="silk-hero">
      <div className="silk-card">
        <div className="silk-grid" aria-hidden="true" />
        <Silk />
        {CHIPS.map(([t, c]) => <span key={t} className={`silk-chip ${c}`} aria-hidden="true">{t}</span>)}

        <div className="silk-copy">
          <h1 className="silk-h1">
            F<span className="i-dot">ı</span>nd the Platform You Need.<br />Sales to Schools. One Bundle<span className="accent-stop">.</span>
          </h1>
          <p className="silk-sub">PypeCRM for any team that sells, PypeERM for educational institutions and Pype Campus for schools. Three focused platforms, one bundle.</p>
          <Link to="/contact/contact-sales" className="btn-gloss">Book a Demo <span>»</span></Link>

          <form className="silk-ask" onSubmit={go} role="search">
            <div className="silk-input"><Plus size={16} strokeWidth={1.8} aria-hidden="true" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tell us what you run: a sales team, a college, a school…" aria-label="Describe what you run to find the right product" />
              <button type="submit" className="silk-send" aria-label="Find my product"><Send size={16} strokeWidth={1.8} /></button>
            </div>
            <button type="submit" className="silk-diamond" aria-label="Find my product"><i /></button>
          </form>
        </div>

        <div className="silk-logos" aria-label="Built for">
          {BUILT_FOR.map(([Icon, t]) => <span key={t}><Icon size={20} strokeWidth={1.8} aria-hidden="true" />{t}</span>)}
        </div>
      </div>
    </section>
  );
}
