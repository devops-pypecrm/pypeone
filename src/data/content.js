// PypeOne — single source of truth for site content.
// Facts below are drawn from the PypeCRM repo/docs, the Pype ERM repo (schema + marketing pages) and the Pype Campus report/decks.
// Items flagged `soon: true` are planned, not shipped. Nothing here is a customer quote or an invented metric.

const P = (t, d) => ({ t, d });

export const PRODUCTS = {
  pypecrm: {
    name: 'PypeCRM', short: 'CRM', icon: '☎', accent: 'orange', url: 'https://pypecrm.com', domain: 'pypecrm.com', mock: 'board', stage: 'Capture → Convert',
    tagline: 'The sales and customer engine',
    title: 'Turn every lead into a customer',
    sub: 'Capture leads from ads, WhatsApp, web forms and calls into one inbox, route them to the right rep instantly, and follow each one to a closed deal.',
    audience: 'Any team that sells: one location or many branches, in any industry.',
    modules: ['lead-capture', 'lead-distribution', 'pipeline', 'calls-whatsapp', 'marketing-automation', 'crm-analytics', 'field-tracking'],
    points: [P('Every channel, one inbox', 'Meta Lead Ads, website forms, WhatsApp, referrals, cold calls, CSV and a public API.'), P('Instant routing', 'Round-robin and branch rules hand each lead to the right rep the moment it arrives.'), P('Your own pipeline', 'Define stages that match how you really admit students.'), P('Calls and WhatsApp built in', 'Click-to-call with recording and a live WhatsApp inbox on one timeline.'), P('Installment plans', 'Track scheduled payments for customers who pay in instalments.'), P('Multi-branch control', 'See performance by branch, team and counsellor.')],
  },
  pypeerm: {
    name: 'PypeERM', short: 'ERM', icon: '⚙', accent: 'blue', url: 'https://pypeerm.com', domain: 'pypeerm.com', mock: 'dashboard', stage: 'Enrol → Operate',
    tagline: 'The ERP for educational institutions',
    title: 'Run the whole institution from one place',
    sub: 'Admissions, study centres, finance, HR and payroll, classes and operations share the same student and finance data, so teams stop re-entering it.',
    audience: 'Educational institutions only: colleges, universities, coaching institutes and study-centre networks.',
    modules: ['admissions-students', 'study-centres', 'finance-collections', 'hr-payroll', 'classes-lms', 'operations-tasks', 'erm-communication', 'erm-reports', 'administration'],
    points: [P('Admissions to enrolment', 'Online applications, document verification and enrolment approval.'), P('Study-centre networks', 'Onboard centres by invitation link with verification and wallets.'), P('Finance and collections', 'Fee schedules, payment links, receipts, GST settings and receivables.'), P('HR and payroll', 'Biometric and selfie attendance, leave workflows and payroll batches.'), P('Classes and faculty', 'Batches, lessons, online sessions, assessments and student progress.'), P('Role-based dashboards', 'CEO, finance, HR, sales, operations, faculty, centre and student views.')],
  },
  pypecampus: {
    name: 'Pype Campus', short: 'Campus', icon: '✎', accent: 'green', url: 'https://pypecampus.com', domain: 'pypecampus.com', mock: 'heatmap', stage: 'Teach → Engage',
    tagline: 'The school management system',
    title: 'One system that runs a school',
    sub: 'Admissions, fees, attendance, exams, report cards, payroll, transport and a parent and student portal, with progress tracking from the first day a student joins.',
    audience: 'Schools, from a single campus to a group.',
    modules: ['admissions-alumni', 'fees-accounts', 'attendance-exams', 'report-cards', 'academic-progress', 'transport', 'parent-student-portal', 'online-learning', 'staff-leave', 'ai-early-warning', 'career-map'],
    points: [P('Admissions to alumni', 'One record for a student from enquiry through graduation.'), P('Fees and accounts', 'Fees, receipts and accounts with termly or monthly billing.'), P('Attendance and exams', 'Mark attendance, import marks from Excel and publish report cards.'), P('Bus tap-in and tap-out', 'Instant parent messages and a log of every journey.'), P('Parent and student portal', 'Results, attendance, fees, notices and the bus on one login.'), P('Academic progress', 'Results by week, month, exam, term and subject since joining.')],
  },
};

export const MODULES = {
  /* ---------------- PypeCRM ---------------- */
  'lead-capture': { product: 'pypecrm', name: 'Lead Capture', icon: '⇲', mock: 'table', title: 'Capture every enquiry, from every channel', sub: 'Ad clicks, WhatsApp messages, web forms and walk-ins all land in one inbox, de-duplicated and scored.',
    points: [P('Meta Lead Ads', 'Connect an ad account and leads arrive in real time, with per-campaign control.'), P('Website forms & landing pages', 'Embed forms or publish a landing page, no developer needed.'), P('WhatsApp & referrals', 'Enquiries from chats and referrals join the same pipeline.'), P('CSV import & public API', 'Bring in lists from events or push leads from any tool.'), P('Duplicate detection', 'The same phone number never becomes two leads.'), P('Lead scoring', 'Engagement and quality rank who to call first.')] },
  'lead-distribution': { product: 'pypecrm', name: 'Lead Distribution', icon: '⇄', mock: 'automation', title: 'The right rep, the moment a lead arrives', sub: 'Rules decide ownership so nothing waits for manual triage, and nothing goes stale.',
    points: [P('Round-robin assignment', 'Spread new leads fairly across a team.'), P('Branch & territory rules', 'Route by city, branch, product or specialist.'), P('Re-shuffling engine', 'Leads idle in one queue are redistributed automatically.'), P('Re-enquiry tracking', 'A returning prospect links back to their original history.'), P('Fairness report', 'See whether distribution is actually even.'), P('Override controls', 'Managers can reassign in bulk when plans change.')] },
  pipeline: { product: 'pypecrm', name: 'Sales Pipeline', icon: '▦', mock: 'board', title: 'A pipeline shaped like your sales process', sub: 'Define your own stages and move every prospect from first enquiry to a closed deal on a visual board.',
    points: [P('Custom stages', 'New, contacted, qualified, proposal, won — or your own.'), P('Kanban opportunities', 'Drag deals through stages with value and probability.'), P('Contacts, accounts, products, quotes', 'The whole journey sits in one record.'), P('Installment plans', 'Track every scheduled payment and its status.'), P('Win / loss reasons', 'Learn why deals are won or lost.'), P('Custom fields', 'Capture the exact data your business needs.')] },
  'calls-whatsapp': { product: 'pypecrm', name: 'Calls & WhatsApp', icon: '☎', mock: 'chat', title: 'Conversations that log themselves', sub: 'Call, message and follow up from inside the CRM; every touch lands on one timeline.',
    points: [P('Click-to-call', 'Dial from the lead record on web or mobile.'), P('Automatic recording', 'Every call is stored against the right lead.'), P('Live WhatsApp inbox', 'Read and reply to customers and prospects without switching apps.'), P('Bulk WhatsApp & SMS', 'Campaigns to lists at scale, plus email marketing.'), P('Unified timeline', 'Calls, messages, emails, meetings and notes in one scroll.'), P('Follow-up reminders', 'No promised callback gets missed.')] },
  'marketing-automation': { product: 'pypecrm', name: 'Marketing & Automation', icon: '⚡', mock: 'automation', title: 'Marketing that feeds the pipeline directly', sub: 'Trace spend to leads to revenue, and let workflows handle the follow-up.',
    points: [P('Workflow engine', '“When X happens, do Y after Z minutes”, with no code.'), P('Landing page builder', 'Spin up a campaign page in minutes.'), P('Campaign visibility', 'See which campaigns produce leads and revenue.'), P('Automatic daily reports', 'Email or WhatsApp summaries to managers on a schedule.'), P('Instagram & Google Ads', 'Connect more of the channels you advertise on.'), P('Follow-up sequences', 'Nurture leads while reps focus on live calls.')] },
  'crm-analytics': { product: 'pypecrm', name: 'CRM Analytics', icon: '◔', mock: 'dashboard', title: 'See where deals are won and lost', sub: 'Live dashboards, leaderboards and a full reporting suite for every manager.',
    points: [P('Real-time dashboard', 'Calls, connection rates, stage breakdown and pipeline value.'), P('Team leaderboards', 'Rank reps by connected calls and results.'), P('Trend tracking', 'Week-over-week change, front and centre.'), P('Lead-source breakdown', 'Know which channel brings real customers.'), P('Call analytics', 'Volume, duration and outcomes by person.'), P('Audit history', 'A full trail of who changed what.')] },
  'field-tracking': { product: 'pypecrm', name: 'Field Team Tracking', icon: '⌖', mock: 'attendance', title: 'Know where your field reps are', sub: 'Geo-tagged check-ins and a live map for customer visits and on-site sales.',
    points: [P('Geo-tagged check-ins', 'Proof of every visit, with time and place.'), P('Live map view', 'See where reps are and where they have been.'), P('Visit reports', 'Field activity by person and day.'), P('Mobile-first', 'Works from the same app reps use to call.'), P('Branch roll-ups', 'Compare field activity across branches.'), P('Linked to leads', 'Visits attach to the lead they belong to.')] },

  /* ---------------- PypeERM ---------------- */
  'admissions-students': { product: 'pypeerm', name: 'Admissions & Students', icon: '🎓', mock: 'table', title: 'From application to enrolment, no paperwork', sub: 'Take applications online and move each student through verification to enrolment.',
    points: [P('Online application portal', 'Students apply from any device.'), P('Document upload & verification', 'Staff review and approve every document.'), P('Enrolment review & approval', 'A clear, auditable approval step.'), P('Re-registration', 'Rules for continuing students each session.'), P('Exam registration & internal marks', 'Handled inside the same record.'), P('Student portal', 'Students see their own progress and fees.')] },
  'study-centres': { product: 'pypeerm', name: 'Study Centre Network', icon: '⌂', mock: 'org', title: 'Grow a network of study centres', sub: 'Onboard, verify and manage partner centres, with their own wallets and permissions.',
    points: [P('Invitation-link registration', 'Centres sign up from a link you control.'), P('Verification & approval', 'Operations reviews each centre before it goes live.'), P('Centre wallets', 'Top-ups, balances and payment entries per centre.'), P('Program allocation', 'Decide which programs each centre may offer.'), P('Commissions', 'Track university and centre commissions.'), P('Onboarding overview', 'See which centres are stuck and why.')] },
  'finance-collections': { product: 'pypeerm', name: 'Finance & Collections', icon: '₹', mock: 'list', title: 'Know what is due before it is overdue', sub: 'Set up fee plans and keep track of every receivable.',
    points: [P('Invoices & installments', 'Schedules that match how students pay.'), P('Payment links', 'Collect online with a shareable link.'), P('Receipts & GST', 'Receipts and GST settings built in.'), P('Fee reminders', 'Automatic nudges before and after the due date.'), P('Expense claims', 'Submit, approve and reimburse inside the system.'), P('Receivables dashboard', 'Overdue and upcoming amounts at a glance.')] },
  'hr-payroll': { product: 'pypeerm', name: 'HR & Payroll', icon: '☻', mock: 'attendance', title: 'Attendance, leave and salary in one place', sub: 'Run HR on the web and on mobile, from punch-in to payslip.',
    points: [P('Biometric & selfie punch', 'Location-stamped attendance on device or phone.'), P('Leave workflows', 'Requests route to the right approver.'), P('Salary configuration', 'Structures, allowances and deductions per employee.'), P('Payroll batches', 'Process a month of salaries as one batch.'), P('Early-exit & auto punch-out rules', 'Policies enforced automatically.'), P('Vacancies & employee profiles', 'Hiring and records in the same place.')] },
  'classes-lms': { product: 'pypeerm', name: 'Classes, Faculty & LMS', icon: '▶', mock: 'calendar', title: 'Keep academics organised for faculty and students', sub: 'Batches, lessons, live sessions and assessments with progress tracking.',
    points: [P('Batches & lessons', 'Modules, sub-modules and lessons per class.'), P('Online sessions', 'Schedule and run live classes.'), P('Assessments', 'Questions, attempts and results.'), P('Student progress', 'Video logs, notes and doubts in one place.'), P('Faculty attendance', 'Know who took which session.'), P('Class materials', 'Share files with the right batch.')] },
  'operations-tasks': { product: 'pypeerm', name: 'Operations & Tasks', icon: '✓', mock: 'list', title: 'Assign work and follow it until it is done', sub: 'Tasks, escalations, complaints and dispatch for the back office.',
    points: [P('Tasks & priorities', 'Assign, track and close the loop.'), P('Escalations', 'Overdue work moves up the chain automatically.'), P('Complaints handling', 'Log, assign and resolve with history.'), P('Document dispatch & courier tracking', 'Know where every parcel is.'), P('Asset management', 'Track equipment and who holds it.'), P('Meetings', 'Schedule and keep a record.')] },
  'erm-communication': { product: 'pypeerm', name: 'Communication', icon: '✉', mock: 'chat', title: 'Reach students, staff and centres where they are', sub: 'Email, WhatsApp, announcements and polls from the same system.',
    points: [P('Email & WhatsApp', 'Send messages to the right audience.'), P('Announcements', 'Broadcast notices to a role or batch.'), P('Polls', 'Get a quick answer from a group.'), P('Push notifications', 'Approvals and tasks reach phones instantly.'), P('Communication log', 'Every message recorded against the person.'), P('Meetings', 'Invite and track attendance.')] },
  'erm-reports': { product: 'pypeerm', name: 'Reports & Dashboards', icon: '◔', mock: 'dashboard', title: 'Every role sees the numbers that matter', sub: 'Role-based dashboards plus admissions, conversion and collections reports.',
    points: [P('Role-based dashboards', 'CEO, finance, HR, sales, operations and more.'), P('Conversion reports', 'From enquiry to enrolment.'), P('Collections reports', 'What was collected and what is pending.'), P('Team performance', 'Counsellor targets and incentives.'), P('AI report builder', 'Ask for a report in plain language.'), P('Activity log', 'A full audit of changes.')] },
  administration: { product: 'pypeerm', name: 'Administration', icon: '⛭', mock: 'org', title: 'Central control across the whole organisation', sub: 'Users, roles, departments and branches, all governed from one console.',
    points: [P('Users & roles', 'Create accounts and assign roles.'), P('Departments & branches', 'Model your real structure.'), P('Role-based permissions', 'Least access by default.'), P('Approval for deletions', 'Delete and edit requests need sign-off.'), P('Audit logs', 'Every sensitive action recorded.'), P('Multi-organisation', 'Run many institutions from one platform.')] },

  /* ---------------- Pype Campus ---------------- */
  'admissions-alumni': { product: 'pypecampus', name: 'Admissions to Alumni', icon: '∞', mock: 'table', title: 'One record from first enquiry to alumni', sub: 'A student’s whole journey stays in one place, not scattered across tools.',
    points: [P('Admissions', 'Enquiry, application and enrolment.'), P('Class & section allocation', 'Place students in the right group.'), P('Student profile', 'Documents, guardians and history.'), P('Promotions', 'Move a class forward each year.'), P('Transfers & exits', 'Handled with a clear audit trail.'), P('Alumni', 'Graduates stay on record for the long term.')] },
  'fees-accounts': { product: 'pypecampus', name: 'Fees & Accounts', icon: '₹', mock: 'list', title: 'Fees, receipts and accounts, without the spreadsheets', sub: 'Billing that matches how schools collect: monthly, termly or yearly.',
    points: [P('Fee structures', 'Per class, per term, with concessions.'), P('Receipts', 'Issued instantly and stored.'), P('Defaulter tracking', 'See who is overdue and by how much.'), P('Reminders', 'Parents are nudged before the due date.'), P('Accounts', 'Income and expense records.'), P('Group view', 'Owners see collections across every school.')] },
  'attendance-exams': { product: 'pypecampus', name: 'Attendance & Exams', icon: '✔', mock: 'calendar', title: 'Enter once. Use everywhere.', sub: 'Attendance and marks flow into reports, report cards and parent views.',
    points: [P('Daily attendance', 'Fast marking per class.'), P('Exam schedules', 'Timetables for every exam.'), P('Marks entry', 'Enter in the app or import from Excel.'), P('Parent notifications', 'Absence and results alerts.'), P('Grading rules', 'Configure the scale your board uses.'), P('Class summaries', 'A clear view for each teacher.')] },
  'report-cards': { product: 'pypecampus', name: 'Report Cards', icon: '▤', mock: 'report', title: 'Report cards that write most of themselves', sub: 'Marks, attendance and remarks combine into a clean report card.',
    points: [P('Template layouts', 'Match your school’s existing format.'), P('Auto-calculated results', 'Totals, grades and ranks.'), P('Remarks drafting', 'Suggested comments for teachers to review.'), P('Bulk generation', 'A whole class in one click.'), P('Parent access', 'Published straight to the portal.'), P('Archive', 'Past report cards stay available.')] },
  'academic-progress': { product: 'pypecampus', name: 'Academic Progress', icon: '↗', mock: 'heatmap', title: 'See how every student is progressing', sub: 'Results by week, month, exam, term, year and subject, from the day a student joins.',
    points: [P('Progress since joining', 'A continuous academic story.'), P('Class heat map', 'Teachers see who needs help at a glance.'), P('Compare with class', 'Understand relative standing.'), P('Subject trends', 'Strengths and weak spots over time.'), P('Plain-language parent summary', 'No jargon for families.'), P('Student view', 'Learners see where to improve before the exam.')] },
  transport: { product: 'pypecampus', name: 'Transport', icon: '🚌', mock: 'transport', title: 'Know who boarded, and tell the parent instantly', sub: 'Bus tap-in and tap-out with instant parent messages and a record of every journey.',
    points: [P('NFC tap in / tap out', 'Time and place recorded at the reader.'), P('Instant parent messages', 'Notified when the child boards or leaves.'), P('Roster per bus', 'Who boarded and who did not.'), P('Morning & afternoon trips', 'Both journeys tracked.'), P('Dispute-proof log', 'History of days travelled or missed.'), P('Privacy controls', 'Tracking only in transport hours; parents see only their child.')] },
  'parent-student-portal': { product: 'pypecampus', name: 'Parent & Student Portal', icon: '☺', mock: 'chat', title: 'One login for the whole family', sub: 'Results, attendance, fees, notices and the bus in a single place.',
    points: [P('Results & attendance', 'Always up to date.'), P('Fee payments & receipts', 'Pay and download receipts.'), P('Notices', 'Announcements in one feed.'), P('Leave requests', 'Apply from the phone.'), P('Bus status', 'Know when the child is on the way.'), P('Student goals', 'Learners track their own targets.')] },
  'online-learning': { product: 'pypecampus', name: 'Online Learning', icon: '▶', mock: 'calendar', title: 'Lessons and quizzes inside the same system', sub: 'Teachers publish content and students learn without another login.',
    points: [P('Lessons', 'Video and reading material per class.'), P('Quizzes', 'Check understanding as you go.'), P('Assignments', 'Collect and grade work.'), P('Progress tracking', 'See who is keeping up.'), P('Doubts & notes', 'Students ask and annotate.'), P('Linked to progress', 'Results feed academic analytics.')] },
  'staff-leave': { product: 'pypecampus', name: 'Staff, Payroll & Leave', icon: '☻', mock: 'org', title: 'Staff punch, leave and payroll, following your chart', sub: 'Approvals route by the school’s own reporting hierarchy, which the principal can change by dragging.',
    points: [P('Staff punch-in / out', 'Presence recorded each day.'), P('Hierarchy-driven approvals', 'Leave goes to the right person.'), P('Drag-to-edit org chart', 'Principals reshape reporting lines.'), P('Payroll', 'Salaries computed from attendance and rules.'), P('Student leave', 'Parents request, teachers approve.'), P('Organisation chart', 'Everyone sees who reports to whom.')] },
  'ai-early-warning': { product: 'pypecampus', name: 'AI Early Warning', icon: '✦', mock: 'ai', title: 'Spot students who are slipping, early', sub: 'AI flags falling marks or attendance and drafts a note to the parent for the teacher to approve.',
    points: [P('Risk flags', 'Marks or attendance trending down.'), P('Drafted parent notes', 'Teachers review and send.'), P('Human in the loop', 'Nothing is sent without approval.'), P('Fee-default signals', 'Early warning on late payments.'), P('Explainable', 'Each flag shows the data behind it.'), P('Principal summary', 'A short list that deserves attention.')] },
  'career-map': { product: 'pypecampus', soon: true, name: 'Psychometrics & Career Map', icon: '🧭', mock: 'heatmap', title: 'A student record that lasts a lifetime', sub: 'Planned: interest, aptitude and personality profiles at fixed grades, with goals and a career map for every student.',
    points: [P('Psychometric assessments', 'Profiles at points such as grades 8, 10 and 12, using validated instruments.'), P('Career map', 'Goals and milestones set with a counsellor.'), P('Achievements log', 'Projects, certificates and competition results.'), P('Real performance data', 'Academic progress informs the advice.'), P('Parent & counsellor sharing', 'Results shared with consent.'), P('Responsible by design', 'Guidance, not diagnosis; consent under applicable data-protection law.')] },
};

export const SOLUTIONS = {
  /* -------- For businesses (PypeCRM) -------- */
  'sales-teams': { kind: 'business', name: 'Sales Teams', icon: '☎', mock: 'board', products: ['pypecrm'], title: 'For sales teams that live on the phone', sub: 'Never lose a lead between the ad click and the first call.',
    modules: ['lead-capture', 'lead-distribution', 'pipeline', 'calls-whatsapp', 'crm-analytics', 'marketing-automation'],
    points: [P('Every lead in one inbox', 'Ads, WhatsApp, forms and calls land in one place.'), P('Instant assignment', 'Rules route each lead to the right rep.'), P('Calls that log themselves', 'Click-to-call with automatic recording.'), P('A pipeline your way', 'Stages that match how you sell.'), P('Leaderboards', 'Healthy competition and clear visibility.'), P('Daily reports', 'Sent to managers without anyone logging in.')] },
  'multi-branch-businesses': { kind: 'business', name: 'Multi-branch Businesses', icon: '🏬', mock: 'dashboard', products: ['pypecrm'], title: 'For businesses with many branches', sub: 'See ten branches as easily as one.',
    modules: ['lead-distribution', 'crm-analytics', 'field-tracking', 'pipeline'],
    points: [P('Branch & team structure', 'Performance by branch, team or individual.'), P('Territory routing', 'Leads go to the right city or branch.'), P('Custom roles', 'Decide who sees and does what.'), P('Branch comparison', 'Spot the leaders and the laggards.'), P('Field visibility', 'Geo-tagged check-ins on a live map.'), P('Complete data isolation', 'Every organisation’s data is fully walled off.')] },
  'agencies-lead-generation': { kind: 'business', name: 'Agencies & Lead Generation', icon: '📣', mock: 'table', products: ['pypecrm'], title: 'For agencies and lead-generation teams', sub: 'Trace every campaign to leads and to revenue.',
    modules: ['lead-capture', 'marketing-automation', 'crm-analytics', 'calls-whatsapp'],
    points: [P('Meta Lead Ads', 'Per-campaign control of what syncs.'), P('Landing pages & forms', 'Launch campaign pages fast.'), P('Source reporting', 'Know which channel brings buyers.'), P('Bulk WhatsApp & SMS', 'Reach lists at scale.'), P('Public API', 'Connect any external tool.'), P('Duplicate detection', 'Keep lists clean.')] },
  'real-estate': { kind: 'business', name: 'Real Estate', icon: '🏠', mock: 'board', products: ['pypecrm'], title: 'For real estate teams', sub: 'Follow every enquiry through site visits to a signed deal.',
    modules: ['lead-capture', 'pipeline', 'field-tracking', 'calls-whatsapp'],
    points: [P('Fast first response', 'Reach new enquiries in minutes.'), P('Site-visit tracking', 'Geo-tagged check-ins prove every visit.'), P('Deal pipeline', 'Value and probability on every deal.'), P('Payment plans', 'Track scheduled instalments.'), P('WhatsApp inbox', 'Where buyers already talk.'), P('Referral tracking', 'Know who sent whom.')] },
  'healthcare-clinics': { kind: 'business', name: 'Healthcare & Clinics', icon: '🩺', mock: 'chat', products: ['pypecrm'], title: 'For clinics and healthcare providers', sub: 'Turn enquiries into booked consultations and returning patients.',
    modules: ['lead-capture', 'calls-whatsapp', 'marketing-automation', 'crm-analytics'],
    points: [P('Enquiry capture', 'Ads, calls and forms in one inbox.'), P('Follow-up sequences', 'Reminders so no enquiry is forgotten.'), P('WhatsApp conversations', 'Reply where patients already are.'), P('Re-enquiry tracking', 'Link returning patients to their history.'), P('Branch reporting', 'Compare clinics at a glance.'), P('Role-based access', 'Control who can see what.')] },
  'financial-services': { kind: 'business', name: 'Financial Services', icon: '💼', mock: 'table', products: ['pypecrm'], title: 'For financial services and insurance teams', sub: 'Keep a complete, auditable record of every conversation.',
    modules: ['lead-capture', 'pipeline', 'calls-whatsapp', 'crm-analytics'],
    points: [P('Recorded calls', 'Every conversation stored against the lead.'), P('Audit trail', 'A full history of changes.'), P('Pipeline by product', 'Stages per product line.'), P('Follow-up reminders', 'No missed callbacks.'), P('Rep performance', 'Leaderboards and trends.'), P('Safety-net recovery', 'Trash and restore for records.')] },

  /* -------- For education -------- */
  schools: { kind: 'education', name: 'Schools', icon: '🏫', mock: 'heatmap', products: ['pypecampus', 'pypecrm'], title: 'For schools', sub: 'Pype Campus runs the school day; PypeCRM fills the seats.',
    modules: ['admissions-alumni', 'fees-accounts', 'attendance-exams', 'transport', 'parent-student-portal', 'academic-progress'],
    points: [P('Admissions season, handled', 'Capture enquiries and convert them to admissions.'), P('Daily operations', 'Attendance, fees and exams in one system.'), P('Parents in the loop', 'One login for results, fees and the bus.'), P('Safer transport', 'Tap-in and tap-out with instant messages.'), P('Group view', 'Owners see every school in one place.'), P('Staff without retraining', 'Screens can be shaped to match the tools staff already use.')] },
  'colleges-universities': { kind: 'education', name: 'Colleges & Universities', icon: '🎓', mock: 'dashboard', products: ['pypeerm', 'pypecrm'], title: 'For colleges and universities', sub: 'PypeERM runs applications, programs, fees, HR and academics on shared data.',
    modules: ['admissions-students', 'finance-collections', 'hr-payroll', 'classes-lms', 'erm-reports', 'administration'],
    points: [P('Online applications', 'Documents verified and approved in one flow.'), P('Programs & sessions', 'Admission sessions and program allocation.'), P('Fee schedules', 'Installments, links and receipts.'), P('Exams & internal marks', 'Registration and marks in the same record.'), P('HR & payroll', 'Staff attendance, leave and salary.'), P('Leadership dashboards', 'Numbers for the registrar and the CEO.')] },
  'coaching-institutes': { kind: 'education', name: 'Coaching Institutes', icon: '📚', mock: 'board', products: ['pypeerm', 'pypecrm'], title: 'For coaching institutes', sub: 'Win more enquiries and run batches without chaos.',
    modules: ['classes-lms', 'finance-collections', 'erm-communication', 'lead-capture', 'pipeline', 'calls-whatsapp'],
    points: [P('Fast follow-up', 'Reach every enquiry within minutes.'), P('Counsellor targets', 'Targets and incentives that drive effort.'), P('Batches & lessons', 'Organise timetables and content.'), P('Fee reminders', 'Collect on time without chasing.'), P('Faculty attendance', 'Know who took which class.'), P('WhatsApp-first', 'Meet students on their favourite channel.')] },
  'study-centre-networks': { kind: 'education', name: 'Study Centre Networks', icon: '🌐', mock: 'org', products: ['pypeerm'], title: 'For study-centre networks', sub: 'Onboard partner centres and keep every rupee and admission visible.',
    modules: ['study-centres', 'admissions-students', 'finance-collections', 'erm-reports', 'administration'],
    points: [P('Invitation onboarding', 'Centres register from a link.'), P('Centre wallets', 'Top-ups and balances tracked.'), P('Program allocation', 'Control what each centre offers.'), P('Commissions', 'Know what is owed to whom.'), P('Verification', 'Approve centres before they go live.'), P('Network dashboards', 'Compare centres at a glance.')] },
};

export const ROLES = {
  'sales-reps': { theme: 'sales', name: 'Sales & Business Development', icon: '☎', mock: 'board', title: 'For sales and business development', sub: 'Know who to call next, and never lose a follow-up.', modules: ['lead-capture', 'pipeline', 'calls-whatsapp', 'crm-analytics'],
    points: [P('A ranked call list', 'Scored leads tell you who to ring first.'), P('One timeline', 'Every call and message in one scroll.'), P('Targets', 'See your progress against goals.'), P('Reminders', 'Follow-ups surface when they are due.'), P('Mobile calling', 'Dial and log from your phone.'), P('Fair distribution', 'Leads arrive by rule, not favour.')] },
  'managers-owners': { theme: 'sales', name: 'Managers & Business Owners', icon: '★', mock: 'dashboard', title: 'For managers and business owners', sub: 'See the whole business, not just the data.', modules: ['crm-analytics', 'lead-distribution', 'field-tracking'],
    points: [P('Live dashboards', 'Calls, stages and pipeline value in one screen.'), P('Branch & team views', 'Filter by branch, campaign or date.'), P('Leaderboards', 'Who is converting and who needs help.'), P('Daily reports', 'Delivered by email or WhatsApp.'), P('Audit trail', 'Know who changed what.'), P('Custom roles', 'Decide who sees what.')] },
  'finance-teams': { name: 'Finance & Accounts', icon: '₹', mock: 'list', title: 'For finance and accounts teams', sub: 'Collections you can predict.', modules: ['finance-collections', 'fees-accounts', 'erm-reports'],
    points: [P('Receivables view', 'Overdue and upcoming in one dashboard.'), P('Payment links', 'Collect without chasing.'), P('Receipts & GST', 'Always ready for audit.'), P('Installment schedules', 'Plans match reality.'), P('Wallet tracking', 'Centre balances reconciled.'), P('Expense claims', 'Approvals with a trail.')] },
  'hr-admin': { name: 'HR & Administration', icon: '☻', mock: 'attendance', title: 'For HR and administration', sub: 'Attendance, leave and payroll without the spreadsheet.', modules: ['hr-payroll', 'staff-leave', 'administration'],
    points: [P('Selfie & biometric attendance', 'Location-stamped and tamper-resistant.'), P('Leave approvals', 'Routed by the reporting chart.'), P('Payroll batches', 'Run salaries in one go.'), P('Holiday calendars', 'Configured once.'), P('Employee profiles', 'Records in one place.'), P('Audit trail', 'Every change recorded.')] },
  'faculty-teachers': { name: 'Faculty & Teachers', icon: '✎', mock: 'heatmap', title: 'For faculty and teachers', sub: 'Less paperwork, more teaching.', modules: ['attendance-exams', 'classes-lms', 'academic-progress', 'report-cards'],
    points: [P('Enter once', 'Attendance and marks flow everywhere.'), P('Class heat map', 'See who needs help.'), P('Excel marks import', 'Skip the retyping.'), P('Drafted remarks', 'Review and send.'), P('Online lessons', 'Publish content in minutes.'), P('Leave in-app', 'Request and track leave.')] },
  'principals-leadership': { name: 'Principals & Leadership', icon: '🏛', mock: 'dashboard', title: 'For principals and institution leaders', sub: 'One view across the whole school or college.', modules: ['erm-reports', 'academic-progress', 'fees-accounts', 'ai-early-warning'],
    points: [P('Collections vs pending', 'Fees at a glance.'), P('Attendance & staff presence', 'Today, live.'), P('Results trends', 'Across classes and terms.'), P('Early warnings', 'Students who need attention.'), P('Group dashboards', 'Every school in one view.'), P('Approvals', 'Decide from your phone.')] },
  'transport-team': { name: 'Transport Team', icon: '🚌', mock: 'transport', title: 'For school transport teams', sub: 'Know who is on which bus.', modules: ['transport'],
    points: [P('Roster per bus', 'Boarded and not boarded.'), P('Both journeys', 'Morning and afternoon.'), P('Instant parent alerts', 'Sent automatically.'), P('Incident log', 'Evidence for any dispute.'), P('Staff see their route only', 'Access follows role.'), P('Hardware-light start', 'Begin with tap cards.')] },
  'parents-students': { name: 'Parents & Students', icon: '☺', mock: 'chat', title: 'For parents and students', sub: 'Clear answers, no chasing.', modules: ['parent-student-portal', 'academic-progress', 'online-learning'],
    points: [P('Plain-language progress', 'Know how your child is doing.'), P('Fees & receipts', 'Pay and download.'), P('Notices', 'Nothing missed.'), P('Bus alerts', 'Know when they board.'), P('Leave from your phone', 'Request in seconds.'), P('Student goals', 'Learners own their targets.')] },
};

export const COMPARE = {
  'spreadsheets-and-chat-groups': { name: 'Spreadsheets & chat groups', blurb: 'Fees in one sheet, attendance in another, parents in a messaging group. It works until it does not.',
    rows: [['One student record across the lifecycle', 1, 0], ['Leads routed automatically', 1, 0], ['Role-based access', 1, 0], ['Audit trail of changes', 1, 0], ['Instant parent notifications', 1, 0], ['Easy to start', 1, 1]] },
  'separate-vendors': { name: 'A different vendor for each job', blurb: 'A CRM from one company, an ERP from another, a school app from a third: three logins, three invoices, three support lines.',
    rows: [['Covers lead capture to daily operations', 1, 0], ['One partner to call', 1, 0], ['Bundle pricing', 1, 0], ['Consistent look and training', 1, 0], ['Best-of-breed depth in one area', 1, 1], ['Role-based dashboards', 1, 1]] },
  'legacy-erp': { name: 'Legacy on-premise ERP', blurb: 'Long implementations and rigid screens versus a modern, cloud-based suite that adapts to you.',
    rows: [['Cloud-based, always updated', 1, 0], ['Mobile apps for staff', 1, 0], ['Pipeline and calling built in', 1, 0], ['Interface matched to current habits', 1, 0], ['Custom fields without a developer', 1, 0], ['Familiar to long-time staff', 0, 1]] },
};

export const LIFECYCLE = [
  ['Capture', 'pypecrm', 'Leads from every channel'], ['Nurture', 'pypecrm', 'Calls, WhatsApp, follow-ups'], ['Convert', 'pypecrm', 'Deals won, payments planned'],
  ['Enrol', 'pypeerm', 'Applications, documents, approvals'], ['Operate', 'pypeerm', 'Fees, HR, payroll, classes'], ['Teach', 'pypecampus', 'Attendance, exams, report cards'], ['Engage', 'pypecampus', 'Parents and students in the loop'],
];

export const STATS = [['3', 'products, one bundle'], [String(Object.keys(MODULES).length), 'modules across the suite'], ['15+', 'role-based dashboards'], ['7', 'lead-capture channels']];

export const GENERIC_FAQ = (n) => [
  { q: `How quickly can we start with ${n}?`, a: 'Most organisations begin with a short discovery, import their existing data from spreadsheets, and go live in phases, starting with a pilot group.' },
  { q: 'Can the screens match what our staff already use?', a: 'Yes. We can arrange menus, labels, forms and report layouts to follow the tools you use today, so training takes hours, not days.' },
  { q: 'Is our data separated from other organisations?', a: 'Every organisation’s data is isolated, and every action is tied to a role with an audit trail.' },
  { q: 'Do we have to buy all three products?', a: 'No. Start with the product you need most and add the others later. The bundle is there when you are ready.' },
];

export const INTEGRATIONS = [
  ['Meta Lead Ads', 'Advertising', 'Leads flow in real time with per-campaign control.'], ['Instagram', 'Advertising', 'Capture and answer enquiries from Instagram.'], ['Google Ads', 'Advertising', 'Bring ad leads into the pipeline.'],
  ['WhatsApp', 'Messaging', 'Inbox, replies and bulk campaigns.'], ['SMS', 'Messaging', 'Bulk and transactional text messages.'], ['Email', 'Messaging', 'Email marketing lists and campaigns.'],
  ['Website forms', 'Capture', 'Embeddable forms for any page.'], ['WordPress plugin', 'Capture', 'Send site enquiries straight to PypeCRM.'], ['Landing pages', 'Capture', 'Built-in campaign pages.'],
  ['Public API', 'Developer', 'Push and pull data from other tools.'], ['CSV / Excel import', 'Data', 'Bring in leads, students and marks.'], ['Payment links', 'Finance', 'Collect fees online.'],
  ['GST settings', 'Finance', 'Receipts and tax configuration.'], ['Biometric devices', 'Hardware', 'Attendance from on-site devices.'], ['NFC bus readers', 'Hardware', 'Tap-in and tap-out on school transport.'],
  ['Push notifications', 'Mobile', 'Approvals and alerts on phones.'], ['Courier tracking', 'Operations', 'Track dispatched documents.'], ['Calendar & meetings', 'Productivity', 'Schedule and record meetings.'],
];

export const TEMPLATES = [
  ['Sales Pipeline', 'Sales', 'board', 'pypecrm'], ['Lead Source Tracker', 'Sales', 'table', 'pypecrm'], ['Rep Daily Plan', 'Sales', 'list', 'pypecrm'], ['Admissions Pipeline', 'Admissions', 'board', 'pypecrm'],
  ['Lead Routing Rules', 'Automation', 'automation', 'pypecrm'], ['Follow-up Sequence', 'Automation', 'automation', 'pypecrm'], ['Application Review', 'Admissions', 'table', 'pypeerm'],
  ['Fee Installment Plan', 'Finance', 'list', 'pypeerm'], ['Collections Dashboard', 'Finance', 'dashboard', 'pypeerm'], ['Leave Approval Chain', 'HR', 'org', 'pypeerm'],
  ['Monthly Payroll Batch', 'HR', 'list', 'pypeerm'], ['Batch Timetable', 'Academics', 'calendar', 'pypeerm'], ['Centre Onboarding', 'Operations', 'org', 'pypeerm'],
  ['Term Fee Structure', 'Finance', 'list', 'pypecampus'], ['Exam Schedule', 'Academics', 'calendar', 'pypecampus'], ['Report Card Layout', 'Academics', 'report', 'pypecampus'],
  ['Class Progress Heat Map', 'Academics', 'heatmap', 'pypecampus'], ['Bus Route Roster', 'Transport', 'transport', 'pypecampus'], ['Staff Reporting Chart', 'HR', 'org', 'pypecampus'],
];

export const POSTS = [
  { t: 'Why leads go cold in the first hour', cat: 'Sales', min: 5, body: [
    'The first hour after an enquiry is when interest is highest. A buyer who messages at 11 pm is usually comparing three providers at once, and the first reply often wins the conversation.',
    'Most delays are not caused by lazy reps. They come from manual triage: someone has to read the lead, decide who owns it and pass it on. Rule-based routing removes that step.',
    'Start by writing down your routing rules in plain language: which branch, which product, which rep. Then let the system apply them every time, and review the fairness report monthly.',
    'Finally, track time-to-first-contact as a team metric. What gets measured gets answered.'] },
  { t: 'Designing fee schedules that parents can actually follow', cat: 'Finance', min: 6, body: [
    'Late fees are rarely about willingness to pay. They are about clarity. A schedule with six different due dates and three concessions is easy to misread.',
    'Group charges into a small number of predictable instalments aligned with your term calendar, and show the next due amount first.',
    'Send reminders before the due date, not only after it, and give parents a payment link in the same message.',
    'Review defaulters weekly. A short, early conversation costs far less than a long recovery later.'] },
  { t: 'Enter once: a better way to handle attendance and marks', cat: 'Academics', min: 5, body: [
    'Teachers lose hours every term re-entering the same data for registers, report cards and parent updates.',
    'When attendance and marks live in one record, report cards, class summaries and parent views are generated rather than retyped.',
    'Import marks from Excel for large exams, then review exceptions instead of typing every row.',
    'The result is fewer errors and more teaching time.'] },
  { t: 'Keeping student transport safe and accountable', cat: 'Transport', min: 7, body: [
    'Parents want to know one thing: did my child board, and did they get off at the right stop?',
    'A tap-in and tap-out record answers that without continuous tracking. It is the lowest-cost, lowest-privacy-burden place to start.',
    'Apply simple controls: track only during transport hours, show parents only their own child, and delete location history after a fixed period.',
    'Add live bus GPS later, once the basics are working.'] },
  { t: 'Rolling out a new system without a revolt', cat: 'Operations', min: 6, body: [
    'Staff resist new software mainly because it changes habits. The fastest way to adoption is to keep the familiar parts familiar.',
    'Arrange menus, labels and forms to follow the tools staff already use, and add new capabilities in the same visual language.',
    'Run a pilot with one or two groups first, keep a floor-walker around in the first two weeks, and collect feedback weekly.',
    'Training then drops from days to hours.'] },
  { t: 'What “one student record” really means', cat: 'Strategy', min: 5, body: [
    'A student’s enquiry, application, fees, attendance, marks and alumni status are usually held in different places.',
    'One record means every team sees the same facts, and nobody asks a parent for the same document twice.',
    'It also unlocks long-term value: guidance, admissions to higher education, and a lasting relationship after graduation.',
    'That idea runs through every PypeOne product.'] },
];

POSTS.splice(1, 0, { t: 'Routing leads fairly across a multi-branch team', cat: 'Sales', min: 6, body: [
  'When leads come from many channels into many branches, ownership disputes start quickly: who gets the hot lead, and who keeps the one that went quiet?',
  'Round-robin by team, combined with branch and territory rules, gives every rep a fair share and removes the argument.',
  'Add a re-shuffle rule for leads untouched for a set number of days, so nothing sits forgotten in one queue.',
  'Finally, publish a distribution report. Visible fairness builds trust in the system.'] });

export const PRICING_FAQ = [
  { q: 'How is PypeOne priced?', a: 'Each product has its own billing basis, and the bundle is quoted together. Contact us with your size and we will send a clear proposal.' },
  { q: 'How does Pype Campus billing work?', a: 'Pype Campus is billed per enrolled student, monthly, termly or yearly. Onboarding is a one-time fee and standard support is included.' },
  { q: 'Is there a bundle discount?', a: 'Bundle pricing is available when you take more than one product. Ask us for a combined quote.' },
  { q: 'Is onboarding included?', a: 'Onboarding covers data migration, set-up, training and interface matching, and is quoted per organisation.' },
  { q: 'Can we start with one product?', a: 'Yes. Many customers start with one product and add the others later.' },
];

export const BILLING = {
  pypecrm: 'By users and plan tier, with usage limits per plan.',
  pypeerm: 'Quoted per institution based on modules and size.',
  pypecampus: 'Per enrolled student, billed monthly, termly or yearly.',
};

export const PARTNER_PROGRAMS = [
  ['Study-centre partners', 'Run a centre on the PypeERM network with your own wallet, programs and dashboard.', ['Invitation-link onboarding', 'Verification & approval', 'Wallet & commission tracking']],
  ['Study-abroad partners', 'Refer students and track applications, commissions and payouts in one place.', ['Partner dashboard', 'Application tracking', 'Commission payouts']],
  ['Implementation & channel partners', 'Help organisations migrate, train and go live on PypeOne.', ['Partner enablement', 'Reference materials', 'Co-selling support']],
];

export const CAREER_AREAS = [
  ['Engineering', 'Backend, frontend and mobile (Flutter) engineers building the suite.'], ['Implementation', 'Data migration, set-up and training for new institutions.'],
  ['Customer support', 'Onboarding and support for schools and colleges.'], ['Sales & partnerships', 'Help organisations find the right bundle.'],
];

export const LEGAL = {
  terms: { title: 'Terms of Service', sections: [['Acceptance of terms', 'By accessing or using PypeOne you agree to these terms. If you use the service on behalf of an organisation, you confirm you have authority to bind it.'], ['Your account', 'You are responsible for safeguarding your credentials and for all activity under your account.'], ['Acceptable use', 'You may not misuse the service, attempt to breach its security, or use it to store unlawful content.'], ['Your content', 'You retain ownership of the data you submit. You grant us a limited licence to host and process it to operate the service.'], ['Payment & renewal', 'Paid plans renew until cancelled. Fees are non-refundable except where required by law.'], ['Termination', 'You may cancel at any time. We may suspend accounts that violate these terms.'], ['Limitation of liability', 'To the maximum extent permitted by law, our liability is limited to the fees you paid in the preceding twelve months.']] },
  privacy: { title: 'Privacy Policy', sections: [['What we collect', 'Account details, the business, institutional and student data you enter, usage telemetry and device information needed to run the service.'], ['How we use it', 'To provide the product, secure accounts, support you and improve features. We do not sell personal data.'], ['Student data', 'Student and parent data is sensitive. Access is role-based, actions are logged, and consent rules under applicable law (such as India’s Digital Personal Data Protection Act, 2023) apply.'], ['Location data', 'Where transport or attendance features use location, it is limited to the relevant hours, visible only to authorised roles, and deleted after a fixed period.'], ['Sharing', 'We share data only with sub-processors who help deliver the service, under contractual safeguards.'], ['Your rights', 'You may access, correct, export or delete your data by contacting your institution’s administrator or us.']] },
  security: { title: 'Security Policy', sections: [['Isolation', 'Each organisation’s data is isolated from every other organisation on the platform.'], ['Access control', 'Role-based permissions, protected credentials and audit logs help keep data safe.'], ['Recovery', 'A trash and recovery system means important records are never silently lost.'], ['Infrastructure', 'Hosted in India on hardened cloud infrastructure with monitoring and regular backups.'], ['Vulnerability disclosure', 'Report suspected vulnerabilities through our contact page. We respond promptly.'], ['Business continuity', 'Backups run on a schedule with tested recovery procedures.']] },
};
