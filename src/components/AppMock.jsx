// CSS-drawn product UI mocks with education data. Original artwork; names and numbers are illustrative samples.
const Av = ({ b }) => <span className={`av ${b ? 'b' : ''}`} />;
const d = (i) => ({ animationDelay: `${i * 0.08}s` });

function Board() {
  const cols = [
    ['New enquiry', [['Aisha Khan · Grade 6', 'v', 'Meta Ads'], ['Rohan Das · BBA', 'b', 'Website'], ['Meera Nair · Grade 1', 'o', 'Referral']]],
    ['Counselling', [['Arjun Menon · MBA', 'p', 'Call booked'], ['Sara Thomas · Grade 9', 'v', 'Visit today']]],
    ['Enrolled', [['Dev Patel · B.Com', 'g', 'Paid'], ['Nila Roy · Grade 3', 'g', 'Paid'], ['Kabir Shah · BCA', 'g', 'Paid']]],
  ];
  return <div className="kb">{cols.map(([h, cs], c) => (
    <div className="kb-col" key={h}><h6>{h}<span>{cs.length}</span></h6>
      {cs.map(([t, col, tag], i) => <div className="kb-card" key={t} style={d(c * 3 + i)}><p>{t}</p><div className="row"><span className={`chip c-${col}`}>{tag}</span><span><Av /><Av b /></span></div></div>)}
    </div>))}</div>;
}
function List() {
  const rows = [['Aisha Khan', 'Grade 6-A', 'Today', 'Due'], ['Rohan Das', 'BBA Sem 2', '3 days late', 'Overdue'], ['Meera Nair', 'Grade 1-B', 'Dec 5', 'Paid'], ['Arjun Menon', 'MBA Yr 1', 'Dec 10', 'Due'], ['Sara Thomas', 'Grade 9-C', 'Nov 28', 'Paid']];
  const cls = { Due: 'c-o', Overdue: 'c-p', Paid: 'c-g' };
  return <div className="lst"><div className="lst-r"><span /><span>Student</span><span>Class</span><span>Due</span><span>Status</span></div>
    {rows.map((r, i) => <div className="lst-r" key={r[0]} style={d(i)}><span className={`dot ${r[3] === 'Paid' ? 'd' : ''}`} /><b>{r[0]}</b><span>{r[1]}</span><span>{r[2]}</span><span className={`chip ${cls[r[3]]}`}>{r[3]}</span></div>)}</div>;
}
function Gantt() {
  const rows = [['Term 1', 0, 30], ['Unit tests', 22, 10], ['Mid-term exams', 34, 12], ['Term 2', 44, 32], ['Annual exams', 78, 12], ['Results', 90, 8]];
  return <div className="gantt">{rows.map(([n, l, w], i) => <div className="g-r" key={n}><b>{n}</b><div className="g-t"><span className="g-b" style={{ left: `${l}%`, width: `${w}%`, animationDelay: `${i * 0.12}s` }} /></div></div>)}</div>;
}
function Report() {
  const subj = [['Mathematics', 92], ['Science', 88], ['English', 81], ['Social Studies', 76], ['Computer Science', 95]];
  return <div className="doc"><h4>Report Card · Grade 8-A</h4><div style={{ color: 'var(--ink-3)', marginBottom: 10 }}>Aisha Khan · Term 1 · Attendance 96%</div>
    {subj.map(([s, m], i) => <div key={s} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 30px', gap: 10, alignItems: 'center', margin: '9px 0' }}><span>{s}</span><div className="g-t" style={{ height: 10 }}><span className="g-b" style={{ left: 0, width: `${m}%`, top: 0, height: 10, animationDelay: `${i * 0.1}s` }} /></div><b>{m}</b></div>)}
    <div className="callout">Teacher remark: Consistent effort. Focus on written answers in Social Studies.</div></div>;
}
function Chat() {
  const m = [['Parent', 'Can Aisha leave early tomorrow?'], ['Office', 'Yes. Please confirm the pick-up time.'], ['me', 'Leave approved. Receipt for Term 2 fees sent ✓'], ['Parent', 'Thank you!']];
  return <div className="chat">{m.map(([w, t], i) => <div className={`msg ${w === 'me' ? 'me' : ''}`} key={i} style={d(i * 2)}><Av b={i % 2} /><div className="bub">{w !== 'me' && <b>{w}</b>}{t}</div></div>)}</div>;
}
function Dashboard() {
  return <div className="dash"><div className="dcard"><small>New enquiries</small><big>1,284</big></div><div className="dcard"><small>Enrolled</small><big>312</big></div><div className="dcard"><small>Fees collected</small><big>86%</big></div>
    <div className="dcard w2"><small>Enquiries by week</small><div className="bars" style={{ marginTop: 10 }}>{[40, 62, 48, 80, 66, 92, 74].map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />)}</div></div><div className="dcard"><small>By source</small><div className="donut" /></div></div>;
}
function Calendar() {
  const ev = { 3: ['Maths', 'v'], 5: ['Science', 'p'], 9: ['English', 'o'], 12: ['Hindi', 'g'], 16: ['Social', 'b'], 18: ['Computer', 'v'] };
  return <div className="cal">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x, i) => <b key={i}>{x}</b>)}{Array.from({ length: 21 }, (_, i) => <div key={i}>{i + 1}{ev[i + 1] && <span className={`ev c-${ev[i + 1][1]}`}>{ev[i + 1][0]}</span>}</div>)}</div>;
}
function Org() {
  const box = (t, s, i) => <div className="node" style={{ width: 'auto', minWidth: 130, ...d(i) }}><i>{t[0]}</i><span>{t}<div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 500 }}>{s}</div></span></div>;
  return <div className="flow" style={{ gap: 6 }}>{box('Principal', 'Approves leave', 0)}<div className="arrow" /><div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>{box('Head of Science', 'Dept head', 1)}{box('Head of Maths', 'Dept head', 2)}{box('Admin Officer', 'Office', 3)}</div><div className="arrow" /><div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>{box('Teacher', 'Class 8', 4)}{box('Teacher', 'Class 9', 5)}{box('Clerk', 'Fees desk', 6)}</div></div>;
}
function Automation() {
  return <div className="flow"><div className="node" style={d(0)}><i>⚡</i>New lead from Meta Ads</div><div className="arrow" /><div className="node" style={d(2)}><i style={{ background: 'var(--blue)' }}>?</i>If course is “MBA” and city is Kochi</div><div className="arrow" /><div className="node" style={d(4)}><i style={{ background: 'var(--pink)' }}>→</i>Assign round-robin to Kochi team</div><div className="arrow" /><div className="node" style={d(6)}><i style={{ background: 'var(--green)' }}>✓</i>Send WhatsApp welcome · follow-up in 10 min</div></div>;
}
function Table() {
  return <table className="tbl"><thead><tr><th>Name</th><th>Source</th><th>Counsellor</th><th>Stage</th></tr></thead><tbody>{[['Aisha Khan', 'Meta Ads', 'Maya', 'Counselling'], ['Rohan Das', 'Website', 'Dev', 'Applied'], ['Meera Nair', 'Referral', 'Ana', 'New'], ['Arjun Menon', 'WhatsApp', 'Leo', 'Counselling'], ['Sara Thomas', 'Walk-in', 'Maya', 'Enrolled']].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{i === 0 ? <b>{c}</b> : c}</td>)}</tr>)}</tbody></table>;
}
function AI() {
  return <div className="ai"><div className="ai-q">Which Grade 8 students need attention?</div><div className="ai-a"><b>Three students show a downward trend:</b><ul><li>Rohan D. — Maths down 18% across two exams</li><li>Sara T. — attendance 78% this month</li><li>Kabir S. — late fees and falling marks</li></ul><div><span className="src">Exam · Mid-term</span><span className="src">Attendance · Nov</span><span className="src">Fees · Term 2</span></div><p className="typing" style={{ marginTop: 10, color: 'var(--ink-3)' }}>Drafting a note to parents for approval</p></div></div>;
}
function Transport() {
  const stops = ['School', 'Lakeview', 'Metro Stn', 'Green Park', 'Home'];
  return <div style={{ display: 'grid', gap: 16 }}>
    <div style={{ position: 'relative', padding: '18px 8px' }}><div style={{ height: 4, borderRadius: 4, background: '#e1eddd' }}><div style={{ height: 4, width: '55%', borderRadius: 4, background: 'var(--grad)', animation: 'grow 1.4s both', transformOrigin: 'left' }} /></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -9 }}>{stops.map((s, i) => <div key={s} style={{ textAlign: 'center', width: 60 }}><div className={`dot ${i < 3 ? 'd' : ''}`} style={{ margin: '0 auto 6px', background: i < 3 ? 'var(--green)' : '#fff' }} /><small>{s}</small></div>)}</div></div>
    <div className="lst"><div className="lst-r"><span /><span>Student</span><span>Tap in</span><span>Tap out</span><span>Parent</span></div>{[['Aisha Khan', '7:42', '—', 'Notified'], ['Dev Patel', '7:48', '—', 'Notified'], ['Nila Roy', '—', '—', 'Not boarded']].map((r, i) => <div className="lst-r" key={r[0]} style={d(i)}><span className={`dot ${i < 2 ? 'd' : ''}`} /><b>{r[0]}</b><span>{r[1]}</span><span>{r[2]}</span><span className={`chip ${i < 2 ? 'c-g' : 'c-o'}`}>{r[3]}</span></div>)}</div></div>;
}
function Attendance() {
  return <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 18, alignItems: 'start' }}>
    <div className="dcard center" style={{ textAlign: 'center' }}><div className="av" style={{ width: 64, height: 64, margin: '0 auto 8px', border: '3px solid #fff', boxShadow: '0 0 0 3px var(--green)' }} /><b>Punched in</b><big style={{ display: 'block', font: '650 22px var(--font-d)' }}>09:02</big><span className="chip c-g">Location verified</span></div>
    <div className="cal">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x, i) => <b key={i}>{x}</b>)}{Array.from({ length: 14 }, (_, i) => <div key={i} style={{ minHeight: 34 }}>{i + 1}{i % 7 < 5 && <span className={`ev ${i === 8 ? 'c-o' : 'c-g'}`}>{i === 8 ? 'Late' : 'Present'}</span>}</div>)}</div></div>;
}
function Heatmap() {
  const subj = ['Maths', 'Sci', 'Eng', 'Soc', 'CS'], stu = ['Aisha', 'Rohan', 'Meera', 'Arjun', 'Sara', 'Dev'];
  const v = (a, b) => [88, 62, 74, 91, 55, 80, 94, 48, 69, 83, 77, 85, 52, 90, 70, 66, 81, 93, 58, 72, 86, 79, 64, 89, 75, 95, 61, 84, 68, 87][(a * 5 + b) % 30];
  const col = (x) => (x >= 85 ? '#22c55e' : x >= 70 ? '#9be3c2' : x >= 60 ? '#ffd36e' : '#ff8d8d');
  return <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(5, 1fr)', gap: 4 }}><span />{subj.map((s) => <b key={s} style={{ textAlign: 'center', color: 'var(--ink-3)', fontSize: 10 }}>{s}</b>)}
    {stu.map((n, a) => [<b key={n}>{n}</b>, ...subj.map((s, b) => <div key={n + s} style={{ background: col(v(a, b)), borderRadius: 6, height: 28, display: 'grid', placeItems: 'center', fontWeight: 600, color: '#0f1f12', animation: 'pop .5s both', animationDelay: `${(a + b) * 0.04}s` }}>{v(a, b)}</div>)])}</div>;
}

/* ---- Sales-themed variants (used for PypeCRM and business solutions) ---- */
function SBoard() {
  const cols = [
    ['New lead', [['Acme Traders · ₹4.2L', 'v', 'Meta Ads'], ['Northwind Clinics · ₹1.8L', 'b', 'Website'], ['Orbit Realty · ₹9.5L', 'o', 'Referral']]],
    ['Proposal sent', [['Kestrel Logistics · ₹6.0L', 'p', 'Call booked'], ['Lumen Retail · ₹2.4L', 'v', 'Visit today']]],
    ['Won', [['Harbor Foods · ₹3.1L', 'g', 'Paid'], ['Tidewater Co. · ₹7.7L', 'g', 'Paid'], ['Foxglove Studio · ₹1.2L', 'g', 'Paid']]],
  ];
  return <div className="kb">{cols.map(([h, cs], c) => (
    <div className="kb-col" key={h}><h6>{h}<span>{cs.length}</span></h6>
      {cs.map(([t, col, tag], i) => <div className="kb-card" key={t} style={d(c * 3 + i)}><p>{t}</p><div className="row"><span className={`chip c-${col}`}>{tag}</span><span><Av /><Av b /></span></div></div>)}
    </div>))}</div>;
}
function STable() {
  return <table className="tbl"><thead><tr><th>Company</th><th>Source</th><th>Owner</th><th>Stage</th></tr></thead><tbody>{[['Acme Traders', 'Meta Ads', 'Maya', 'Qualified'], ['Northwind Clinics', 'Website', 'Dev', 'Proposal'], ['Orbit Realty', 'Referral', 'Ana', 'New'], ['Kestrel Logistics', 'WhatsApp', 'Leo', 'Negotiation'], ['Harbor Foods', 'Walk-in', 'Maya', 'Won']].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{i === 0 ? <b>{c}</b> : c}</td>)}</tr>)}</tbody></table>;
}
function SChat() {
  const m = [['Customer', 'Could you resend the quote for 20 units?'], ['Sales', 'Sure, sending it now.'], ['me', 'Quote #1042 sent ✓ valid until Friday'], ['Customer', 'Great, let’s book a call tomorrow.']];
  return <div className="chat">{m.map(([w, t], i) => <div className={`msg ${w === 'me' ? 'me' : ''}`} key={i} style={d(i * 2)}><Av b={i % 2} /><div className="bub">{w !== 'me' && <b>{w}</b>}{t}</div></div>)}</div>;
}
function SAutomation() {
  return <div className="flow"><div className="node" style={d(0)}><i>⚡</i>New lead from Meta Ads</div><div className="arrow" /><div className="node" style={d(2)}><i style={{ background: 'var(--blue)' }}>?</i>If city is Kochi and budget is over ₹5L</div><div className="arrow" /><div className="node" style={d(4)}><i style={{ background: 'var(--pink)' }}>→</i>Assign round-robin to the Kochi team</div><div className="arrow" /><div className="node" style={d(6)}><i style={{ background: 'var(--green)' }}>✓</i>Send WhatsApp welcome · follow-up in 10 min</div></div>;
}
function SDashboard() {
  return <div className="dash"><div className="dcard"><small>New leads</small><big>1,284</big></div><div className="dcard"><small>Deals won</small><big>312</big></div><div className="dcard"><small>Pipeline value</small><big>₹2.4Cr</big></div>
    <div className="dcard w2"><small>Leads by week</small><div className="bars" style={{ marginTop: 10 }}>{[40, 62, 48, 80, 66, 92, 74].map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />)}</div></div><div className="dcard"><small>By source</small><div className="donut" /></div></div>;
}
const SALES = { board: SBoard, table: STable, chat: SChat, automation: SAutomation, dashboard: SDashboard };
const SALES_TITLES = { board: 'PypeCRM · Sales pipeline', table: 'Leads · All sources', chat: 'Customer inbox', automation: 'Lead routing automation', dashboard: 'Sales dashboard' };
const SALES_SIDE = ['Home', 'Leads', 'Pipeline', 'Calls', 'Reports', 'Team'];
const SALES_ACTIVE = { board: 2, table: 1, chat: 3, automation: 1, dashboard: 4 };

const VARIANTS = { board: Board, list: List, gantt: Gantt, report: Report, chat: Chat, dashboard: Dashboard, calendar: Calendar, org: Org, automation: Automation, table: Table, ai: AI, transport: Transport, attendance: Attendance, heatmap: Heatmap };
const TITLES = { board: 'PypeCRM · Admissions pipeline', list: 'Fees · Dues this week', gantt: 'Academic year plan', report: 'Report card', chat: 'Parent & office inbox', dashboard: 'Leadership dashboard', calendar: 'Exam timetable', org: 'Reporting chart', automation: 'Lead routing automation', table: 'Leads · All sources', ai: 'AI early warning', transport: 'Bus 7 · Morning route', attendance: 'Staff attendance', heatmap: 'Class progress heat map' };
const SIDE = ['Home', 'Admissions', 'Students', 'Fees', 'Academics', 'Reports'];
const ACTIVE = { board: 1, list: 3, gantt: 4, report: 4, chat: 0, dashboard: 5, calendar: 4, org: 0, automation: 1, table: 1, ai: 5, transport: 2, attendance: 0, heatmap: 4 };

export default function AppMock({ variant = 'board', theme = 'edu', style }) {
  const sales = theme === 'sales' && SALES[variant];
  const V = sales ? SALES[variant] : VARIANTS[variant] || Board;
  const title = sales ? SALES_TITLES[variant] : TITLES[variant];
  const side = sales ? SALES_SIDE : SIDE;
  const active = sales ? SALES_ACTIVE[variant] : ACTIVE[variant];
  return (
    <div className="mock" style={style} role="img" aria-label={`Illustration of the ${title} screen`}>
      <div className="mock-bar"><i /><i /><i /><b>{title}</b></div>
      <div className="mock-body">
        <div className="mock-side">{side.map((x, i) => <div key={x} className={i === active ? 'on' : ''}>{x}</div>)}</div>
        <div className="mock-main"><div className="mock-h">{title}<span><Av /><Av b /><Av /></span></div><V /></div>
      </div>
    </div>
  );
}
