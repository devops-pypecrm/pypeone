import { PRODUCTS, MODULES, SOLUTIONS, ROLES } from './content';

const MOD_ICO = { 'lead-capture': 'Inbox', 'lead-distribution': 'Shuffle', pipeline: 'Kanban', 'calls-whatsapp': 'PhoneCall', 'marketing-automation': 'Zap', 'crm-analytics': 'BarChart3', 'field-tracking': 'MapPin',
  'admissions-students': 'GraduationCap', 'study-centres': 'Network', 'finance-collections': 'IndianRupee', 'hr-payroll': 'Users', 'classes-lms': 'MonitorPlay', 'operations-tasks': 'ListChecks', 'erm-communication': 'MessageSquare', 'erm-reports': 'PieChart', administration: 'Settings',
  'admissions-alumni': 'Infinity', 'fees-accounts': 'Receipt', 'attendance-exams': 'CalendarCheck', 'report-cards': 'FileText', 'academic-progress': 'TrendingUp', transport: 'Bus', 'parent-student-portal': 'UserRound', 'online-learning': 'BookOpen', 'staff-leave': 'UserCheck', 'ai-early-warning': 'Sparkles', 'career-map': 'Compass' };
const SOL_ICO = { 'sales-teams': 'Phone', 'multi-branch-businesses': 'Building2', 'agencies-lead-generation': 'Megaphone', 'real-estate': 'House', 'healthcare-clinics': 'Stethoscope', 'financial-services': 'Briefcase', schools: 'School', 'colleges-universities': 'GraduationCap', 'coaching-institutes': 'BookOpen', 'study-centre-networks': 'Globe' };
const ROLE_ICO = { 'sales-reps': 'PhoneCall', 'managers-owners': 'LayoutDashboard', 'finance-teams': 'IndianRupee', 'hr-admin': 'Users', 'faculty-teachers': 'Pencil', 'principals-leadership': 'Landmark', 'transport-team': 'Bus', 'parents-students': 'Smile' };
export const PRODUCT_ICO = { pypecrm: 'PhoneCall', pypeerm: 'Settings', pypecampus: 'School' };

const mod = (k) => ({ label: MODULES[k].name, to: `/modules/${k}`, ico: MOD_ICO[k], icon: MODULES[k].icon, desc: MODULES[k].sub.split('.')[0], soon: MODULES[k].soon });
const col = (pk) => ({ title: `${PRODUCTS[pk].name} · ${PRODUCTS[pk].tagline}`, head: { label: `About ${PRODUCTS[pk].name}`, to: `/products/${pk}` }, items: PRODUCTS[pk].modules.slice(0, 5).map(mod) });

export const MENUS = [
  {
    label: 'Products', cols: [col('pypecrm'), col('pypeerm'), col('pypecampus')],
    feature: { tag: 'Bundle', title: 'PypeOne: the complete bundle', desc: 'CRM for any team, ERM for institutions, Campus for schools.', to: '/products' },
    foot: [{ label: 'All modules', to: '/modules' }, { label: 'Pype AI · Coming soon', to: '/ai' }, { label: 'Import your data', to: '/import' }, { label: 'Mobile apps', to: '/download' }],
  },
  {
    label: 'Solutions', cols: [
      { title: 'For businesses', items: Object.entries(SOLUTIONS).filter(([, v]) => v.kind === 'business').slice(0, 5).map(([k, v]) => ({ label: v.name, to: `/solutions/${k}`, ico: SOL_ICO[k], icon: v.icon, desc: v.sub })) },
      { title: 'For education', items: Object.entries(SOLUTIONS).filter(([, v]) => v.kind === 'education').map(([k, v]) => ({ label: v.name, to: `/solutions/${k}`, ico: SOL_ICO[k], icon: v.icon, desc: v.sub })) },
      { title: 'By role', items: Object.entries(ROLES).slice(0, 4).map(([k, v]) => ({ label: v.name, to: `/roles/${k}`, ico: ROLE_ICO[k], icon: v.icon, desc: v.sub })) },
    ],
    feature: { tag: 'Guide', title: 'Which product do you need first?', desc: 'Start with one product, grow into the bundle.', to: '/pricing' },
    foot: [{ label: 'All solutions', to: '/solutions' }, { label: 'All roles', to: '/roles' }, { label: 'Why PypeOne', to: '/compare' }, { label: 'Book a demo', to: '/on-demand-demo' }],
  },
  {
    label: 'Resources', cols: [
      { title: 'Learn', items: [{ label: 'Blog', to: '/blog', icon: '✎', ico: 'Pencil', desc: 'Playbooks for admissions, fees and academics' }, { label: 'Templates', to: '/templates', icon: '▣', ico: 'LayoutTemplate', desc: 'Ready-made setups for each product' }, { label: 'Import your data', to: '/import', icon: '⇪', ico: 'Upload', desc: 'Move from spreadsheets quickly' }] },
      { title: 'Connect', items: [{ label: 'Integrations', to: '/integrations', icon: '⇆', ico: 'Plug', desc: 'Ads, WhatsApp, devices and more' }, { label: 'Mobile apps', to: '/download', icon: '⬇', ico: 'Smartphone', desc: 'For sales reps, staff and parents' }, { label: 'Security', to: '/security', icon: '🔒', ico: 'ShieldCheck', desc: 'How we protect institutional data' }] },
    ],
    feature: { tag: 'Demo', title: 'See PypeOne in action', desc: 'A guided tour of all three products.', to: '/on-demand-demo' },
    foot: [{ label: 'Blog', to: '/blog' }, { label: 'Templates', to: '/templates' }],
  },
];

export const TOP_LINKS = [{ label: 'Security', to: '/security' }, { label: 'Pricing', to: '/pricing' }];

export const COMPANY_MENU = {
  label: 'Company', items: [{ label: 'About', to: '/about' }, { label: 'Careers', to: '/careers' }, { label: 'Partners', to: '/partners' }, { label: 'Brand', to: '/brand' }, { label: 'Contact sales', to: '/contact/contact-sales' }],
};

export const FOOTER = [
  { title: 'Products', links: [['PypeOne bundle', '/products'], ['PypeCRM', '/products/pypecrm'], ['PypeERM', '/products/pypeerm'], ['Pype Campus', '/products/pypecampus'], ['All modules', '/modules'], ['Pype AI (coming soon)', '/ai']] },
  { title: 'PypeCRM', links: [['Lead capture', '/modules/lead-capture'], ['Lead distribution', '/modules/lead-distribution'], ['Admissions pipeline', '/modules/pipeline'], ['Calls & WhatsApp', '/modules/calls-whatsapp'], ['Analytics', '/modules/crm-analytics']] },
  { title: 'ERM & Campus', links: [['Admissions & students', '/modules/admissions-students'], ['Finance & collections', '/modules/finance-collections'], ['HR & payroll', '/modules/hr-payroll'], ['Fees & accounts', '/modules/fees-accounts'], ['Transport', '/modules/transport'], ['Parent portal', '/modules/parent-student-portal']] },
  { title: 'Solutions', links: [['Sales teams', '/solutions/sales-teams'], ['Multi-branch businesses', '/solutions/multi-branch-businesses'], ['Schools', '/solutions/schools'], ['Colleges & universities', '/solutions/colleges-universities'], ['Coaching institutes', '/solutions/coaching-institutes'], ['By role', '/roles'], ['Compare', '/compare']] },
  { title: 'Company', links: [['About', '/about'], ['Careers', '/careers'], ['Partners', '/partners'], ['Pricing', '/pricing'], ['Security', '/security'], ['Blog', '/blog'], ['Contact sales', '/contact/contact-sales']] },
];

export const PRODUCT_SITES = Object.entries(PRODUCTS).map(([k, p]) => ({ ico: PRODUCT_ICO[k], key: k, name: p.name, domain: p.domain, url: p.url, tagline: p.tagline, icon: p.icon, accent: p.accent }));
