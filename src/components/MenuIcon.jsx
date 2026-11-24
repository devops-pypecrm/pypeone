import { Inbox, Shuffle, Kanban, PhoneCall, Zap, BarChart3, MapPin, GraduationCap, Network, IndianRupee, Users, MonitorPlay, ListChecks, MessageSquare, PieChart, Settings, Infinity as InfinityIcon, Receipt, CalendarCheck, FileText, TrendingUp, Bus, UserRound, BookOpen, UserCheck, Sparkles, Compass, Phone, Building2, Megaphone, House, Stethoscope, Briefcase, School, Globe, LayoutDashboard, Pencil, Landmark, Smile, LayoutTemplate, Upload, Plug, Smartphone, ShieldCheck, ArrowLeftRight, ArrowRight, PlayCircle } from 'lucide-react';

const ICONS = { Inbox, Shuffle, Kanban, PhoneCall, Zap, BarChart3, MapPin, GraduationCap, Network, IndianRupee, Users, MonitorPlay, ListChecks, MessageSquare, PieChart, Settings, Infinity: InfinityIcon, Receipt, CalendarCheck, FileText, TrendingUp, Bus, UserRound, BookOpen, UserCheck, Sparkles, Compass, Phone, Building2, Megaphone, House, Stethoscope, Briefcase, School, Globe, LayoutDashboard, Pencil, Landmark, Smile, LayoutTemplate, Upload, Plug, Smartphone, ShieldCheck, ArrowLeftRight, ArrowRight, PlayCircle };

/** Monochrome line icon for the hover menus. Inherits colour (green) from .mi-icon. */
export default function MenuIcon({ name, fallback }) {
  const I = ICONS[name];
  if (!I) return <>{fallback}</>;
  return <I className="mi-svg" strokeWidth={1.75} aria-hidden="true" focusable="false" />;
}
