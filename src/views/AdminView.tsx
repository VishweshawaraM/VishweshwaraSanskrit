// Acharya's admin: visitors, schedule, website content, enquiries, activity.
import React, { useEffect, useState } from 'react';
import { BarChart3, CalendarClock, Hash, MessageSquareQuote, CalendarDays, Megaphone, Inbox, Activity, LogOut, ExternalLink, Trash2, Loader2, Menu, X } from 'lucide-react';
import { PageView } from '../types';
import { SlotsAdmin } from './SlotsAdmin';
import { ContentAdmin, ContentTab } from './admin/ContentAdmin';
import { VisitorsAdmin } from './admin/VisitorsAdmin';
import { getLeads, Lead, deleteLead, getAdminLogs, AdminLog, auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface AdminViewProps { onViewChange: (view: PageView) => void }
type Tab = 'visitors' | 'schedule' | ContentTab | 'enquiries' | 'activity';

const NAV: { id: Tab; label: string; icon: React.FC<{ size?: number }>; group: string; blurb: string }[] = [
  { id: 'visitors', label: 'Visitors', icon: BarChart3, group: 'Overview', blurb: 'Who is visiting the website and what they do.' },
  { id: 'schedule', label: 'Class schedule', icon: CalendarClock, group: 'Overview', blurb: 'Booking requests and your weekly class times.' },
  { id: 'numbers', label: 'Numbers', icon: Hash, group: 'Website', blurb: 'Years, teaching hours and countries.' },
  { id: 'reviews', label: 'Reviews', icon: MessageSquareQuote, group: 'Website', blurb: 'Add, edit, hide or reorder reviews.' },
  { id: 'dates', label: 'Dates & prices', icon: CalendarDays, group: 'Website', blurb: 'Next cohort date and Aksharam prices.' },
  { id: 'announce', label: 'Announcement', icon: Megaphone, group: 'Website', blurb: 'A short notice on every page.' },
  { id: 'enquiries', label: 'Enquiries', icon: Inbox, group: 'Records', blurb: 'Messages sent through the website form.' },
  { id: 'activity', label: 'Activity', icon: Activity, group: 'Records', blurb: 'Sign-ins and changes made in Admin.' },
];

const toDate = (v: unknown) => v instanceof Date ? v : (v as { toDate?: () => Date })?.toDate?.() || null;
const when = (v: unknown) => { const d = toDate(v); return d ? d.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : ''; };

const Enquiries: React.FC = () => {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [err, setErr] = useState('');
  const [confirm, setConfirm] = useState<string | null>(null);
  useEffect(() => { getLeads().then(setLeads).catch(() => setErr('Could not load enquiries.')); }, []);
  if (err) return <p className="text-red-300">{err}</p>;
  if (!leads) return <div className="py-16 flex justify-center text-[#F5F0E6]"><Loader2 className="animate-spin" /></div>;
  if (!leads.length) return <p className="text-[#9A9183]">No enquiries yet.</p>;
  return (
    <div className="space-y-4">
      {leads.map(l => (
        <div key={l.id} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
          <div className="flex flex-wrap justify-between gap-2">
            <div className="min-w-0"><p className="font-semibold text-[#F5F0E6]">{l.name}</p><p className="text-sm text-[#9A9183]">{l.subject} · {l.timezone} · {when(l.createdAt)}</p></div>
            {confirm === l.id
              ? <button onClick={async () => { await deleteLead(l.id!); setLeads(leads.filter(x => x.id !== l.id)); setConfirm(null); }} className="px-3 py-1.5 h-fit rounded-full bg-red-600 text-white text-xs">Delete for good?</button>
              : <button title="Delete" onClick={() => setConfirm(l.id!)} className="p-2 h-fit rounded-full hover:bg-white/10 text-[#9A9183]"><Trash2 size={16} /></button>}
          </div>
          {l.message && <p className="mt-3 text-[#CFC6B8] whitespace-pre-wrap break-words">{l.message}</p>}
          {l.background && <p className="mt-2 text-sm text-[#9A9183]">Background: {l.background}</p>}
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <a href={`mailto:${l.email}`} className="px-3 py-1.5 rounded-full border border-white/15 text-[#F5F0E6] break-all">{l.email}</a>
            {l.phone && <a href={`https://wa.me/${l.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-white/15 text-[#F5F0E6]">WhatsApp {l.phone}</a>}
          </div>
        </div>))}
    </div>);
};

const ActivityLog: React.FC = () => {
  const [logs, setLogs] = useState<AdminLog[] | null>(null);
  useEffect(() => { getAdminLogs(100).then(setLogs).catch(() => setLogs([])); }, []);
  if (!logs) return <div className="py-16 flex justify-center text-[#F5F0E6]"><Loader2 className="animate-spin" /></div>;
  if (!logs.length) return <p className="text-[#9A9183]">Nothing recorded yet.</p>;
  return (
    <div className="rounded-2xl border border-white/10 divide-y divide-white/5">
      {logs.map(l => (
        <div key={l.id} className="p-4 flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0"><p className="text-[#F5F0E6] break-words">{l.action}</p>{l.details && <p className="text-sm text-[#9A9183] break-words">{l.details}</p>}</div>
          <span className="text-sm text-[#9A9183] flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${l.status === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`} />{when(l.createdAt)}</span>
        </div>))}
    </div>);
};

export const AdminView: React.FC<AdminViewProps> = ({ onViewChange }) => {
  const [tab, setTab] = useState<Tab>(() => { const h = location.hash.slice(1) as Tab; return NAV.some(n => n.id === h) ? h : 'visitors'; });
  const [open, setOpen] = useState(false);
  useEffect(() => { history.replaceState(null, '', `#${tab}`); window.scrollTo(0, 0); }, [tab]);
  const cur = NAV.find(n => n.id === tab)!;
  const logout = async () => { await signOut(auth); onViewChange('home'); };

  const Side = (
    <nav className="flex flex-col h-full">
      <div className="px-2 pb-6">
        <p className="font-[Inter_Tight,Inter,sans-serif] font-bold tracking-tight text-xl text-[#F5F0E6]">Vishweshwara Sanskrit</p>
        <p className="text-sm text-[#9A9183]">Admin</p>
      </div>
      {['Overview', 'Website', 'Records'].map(g => (
        <div key={g} className="mb-5">
          <p className="px-3 mb-1 text-[11px] uppercase tracking-[.14em] text-[#9A9183]">{g}</p>
          {NAV.filter(n => n.group === g).map(n => (
            <button key={n.id} onClick={() => { setTab(n.id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${tab === n.id ? 'bg-[#F5F0E6] text-[#161411] font-semibold' : 'text-[#CFC6B8] hover:bg-white/[0.06]'}`}>
              <n.icon size={18} />{n.label}
            </button>))}
        </div>))}
      <div className="mt-auto space-y-1">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#CFC6B8] hover:bg-white/[0.06]"><ExternalLink size={18} />Open website</a>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#CFC6B8] hover:bg-white/[0.06]"><LogOut size={18} />Sign out</button>
      </div>
    </nav>);

  return (
    <div className="min-h-screen bg-[#161411] text-[#F5F0E6] font-[Inter,system-ui,sans-serif]">
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 p-5 border-r border-white/10 bg-[#110F0D]">{Side}</aside>
      {open && <div className="lg:hidden fixed inset-0 z-50 flex">
        <div className="w-72 max-w-[85vw] p-5 bg-[#110F0D] border-r border-white/10 overflow-y-auto">{Side}</div>
        <button aria-label="Close menu" className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
      </div>}
      <main className="lg:pl-64">
        <header className="sticky top-0 z-40 bg-[#161411]/90 backdrop-blur border-b border-white/10 px-4 sm:px-8 py-4 flex items-center gap-3">
          <button aria-label="Menu" className="lg:hidden p-2 -ml-2 rounded-full hover:bg-white/10" onClick={() => setOpen(true)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
          <div className="min-w-0">
            <h1 className="font-[Inter_Tight,Inter,sans-serif] font-bold tracking-tight text-2xl sm:text-3xl leading-tight">{cur.label}</h1>
            <p className="text-sm text-[#9A9183] truncate">{cur.blurb}</p>
          </div>
        </header>
        <div className="px-4 sm:px-8 py-6 sm:py-8 max-w-6xl">
          {tab === 'visitors' && <VisitorsAdmin />}
          {tab === 'schedule' && <SlotsAdmin />}
          {(tab === 'numbers' || tab === 'reviews' || tab === 'dates' || tab === 'announce') && <ContentAdmin key={tab} tab={tab} />}
          {tab === 'enquiries' && <Enquiries />}
          {tab === 'activity' && <ActivityLog />}
        </div>
      </main>
    </div>);
};
