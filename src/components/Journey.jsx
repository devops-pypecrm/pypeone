import { useLayoutEffect, useRef, useState } from 'react';
import { Inbox, PhoneCall, BadgeCheck, GraduationCap, Settings, CalendarCheck, Users } from 'lucide-react';
import { Reveal } from './ui';

/** Zig-zag "lead to daily operations" journey: staircase cards joined by dashed elbow connectors. */
const STEPS = [
  { p: 'crm', product: 'PypeCRM', Icon: Inbox, title: 'Capture', body: 'Leads from ads, WhatsApp, web forms, calls and walk-ins land in one inbox, de-duplicated and scored.' },
  { p: 'crm', product: 'PypeCRM', Icon: PhoneCall, title: 'Nurture', body: 'Calls record themselves, WhatsApp replies happen inside the CRM, and reminders keep every lead warm.' },
  { p: 'crm', product: 'PypeCRM', Icon: BadgeCheck, title: 'Convert', body: 'Deals move through your own pipeline stages, with instalment plans for customers who pay over time.' },
  { p: 'erm', product: 'PypeERM', Icon: GraduationCap, title: 'Enrol', body: 'Online applications, document verification and enrolment approval, with no paperwork.' },
  { p: 'erm', product: 'PypeERM', Icon: Settings, title: 'Operate', body: 'Fees, payment links, HR, payroll, batches and classes run on shared student and finance data.' },
  { p: 'campus', product: 'Pype Campus', Icon: CalendarCheck, title: 'Teach', body: 'Attendance, exams, marks import and report cards: entered once, used everywhere.' },
  { p: 'campus', product: 'Pype Campus', Icon: Users, title: 'Engage', body: 'Parents get results, fees, notices and bus alerts on one login, and students see their own progress.' },
];

export default function Journey() {
  const gridRef = useRef(null);
  const [paths, setPaths] = useState([]);

  // Draw elbow connectors from each card to the next, based on the cards' real positions.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    const draw = () => {
      if (!grid || window.innerWidth < 900) { setPaths([]); return; }
      // offset* ignores the reveal animation's transforms, so lines match the cards' resting positions
      const rects = [...grid.querySelectorAll('.jr-card')].map((el) => ({ l: el.offsetLeft, t: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }));
      const out = [];
      for (let i = 0; i < rects.length - 1; i++) {
        const a = rects[i], b = rects[i + 1], y = a.t + 64;
        const toRight = b.l > a.l + a.w / 2;
        const x0 = toRight ? a.l + a.w : a.l, x1 = b.l + b.w * (toRight ? 0.3 : 0.62), y1 = b.t - 8;
        out.push(`M${x0 + (toRight ? 8 : -8)},${y} H${x1 + (toRight ? -14 : 14)} Q${x1},${y} ${x1},${y + 14} V${y1}`);
      }
      setPaths(out);
    };
    draw();
    const ro = new ResizeObserver(draw); ro.observe(grid);
    window.addEventListener('resize', draw);
    const t = setTimeout(draw, 1200);                      // after fonts/reveals settle
    document.fonts?.ready.then(draw);
    return () => { ro.disconnect(); window.removeEventListener('resize', draw); clearTimeout(t); };
  }, []);

  return (
    <section className="journey">
      <div className="wrap">
        <div className="jr-head">
          <Reveal className="jr-intro">
            <h2>From first lead to daily operations</h2>
            <p>PypeCRM wins the customer. PypeERM runs the institution. Pype Campus runs the school. Each step is handled by the product built for it, each on its own platform.</p>
          </Reveal>
          <Reveal delay={0.1} className="jr-legend" aria-label="Products">
            <span className="lg crm">PypeCRM</span><span className="lg erm">PypeERM</span><span className="lg campus">Pype Campus</span>
          </Reveal>
        </div>

        <div className="jr-grid" ref={gridRef}>
          <svg className="jr-lines" aria-hidden="true">
            <defs><marker id="jr-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1,2 L5,7 L9,2" fill="none" stroke="#8a7a4a" strokeWidth="1.6" /></marker></defs>
            {paths.map((d, i) => <path key={i} d={d} markerEnd="url(#jr-arrow)" />)}
          </svg>
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={0.05} className={`jr-card ${s.p} c${i}`} style={{ gridRow: `${i + 1} / span 2`, gridColumn: (i % 2) + 1 }}>
              <span className="jr-pill">{s.product}</span>
              <div className="jr-body">
                <div className="jr-title"><span className="jr-ico"><s.Icon size={18} strokeWidth={1.8} /></span><h3>{i + 1} {s.title}</h3></div>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
