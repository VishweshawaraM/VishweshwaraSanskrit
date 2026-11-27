// Admin: website visitors (from the anonymous tracker).
import React, { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { loadVisits, Visit, countryOf } from '../../lib/track';

const PAGE_NAMES: Record<string, string> = {
  '/': 'Home', '/about': 'About', '/courses': 'Courses', '/samskara-pravesha': 'Samskara Pravesha', '/one-on-one': 'One-to-one',
  '/testimonials': 'Testimonials', '/dakshina': 'Guru Dakshina', '/begin': 'Begin', '/aksharam': 'Aksharam', '/schedule': 'Schedule',
  '/privacy': 'Privacy', '/courses/sanskrit': 'Sanskrit', '/courses/bhagavad-gita': 'Bhagavad Gita', '/courses/krishna-yajurveda': 'Krishna Yajurveda',
  '/courses/advaita-vedanta': 'Advaita Vedanta', '/courses/stotras': 'Stotras',
};
const SRC_NAMES: Record<string, string> = { direct: 'Typed / bookmarks', google: 'Google search', instagram: 'Instagram', facebook: 'Facebook', whatsapp: 'WhatsApp', 'google-ads': 'Google ads', 'ai-assistant': 'AI assistants', 'other-search': 'Other search' };

function top(list: string[], n = 8) {
  const m = new Map<string, number>();
  list.forEach(k => m.set(k, (m.get(k) || 0) + 1));
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}
const Card: React.FC<{ label: string; value: number | string; sub?: string; accent?: boolean }> = ({ label, value, sub, accent }) => (
  <div className={`rounded-2xl p-5 ${accent ? 'bg-[#C9621C] text-white' : 'bg-white/[0.04] border border-white/10 text-[#F5F0E6]'}`}>
    <p className={`text-sm ${accent ? 'text-white/85' : 'text-[#9A9183]'}`}>{label}</p>
    <p className="font-[Inter_Tight,Inter,sans-serif] font-extrabold text-4xl tracking-tight mt-1">{value}</p>
    {sub && <p className={`text-xs mt-1 ${accent ? 'text-white/80' : 'text-[#9A9183]'}`}>{sub}</p>}
  </div>);
const List: React.FC<{ title: string; rows: [string, number][]; total: number }> = ({ title, rows, total }) => (
  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
    <p className="font-semibold text-[#F5F0E6] mb-4">{title}</p>
    {rows.length === 0 && <p className="text-sm text-[#9A9183]">Nothing yet.</p>}
    <div className="space-y-3">
      {rows.map(([k, v]) => (
        <div key={k}>
          <div className="flex justify-between text-sm text-[#CFC6B8] mb-1"><span className="truncate pr-3">{k}</span><span className="tabular-nums">{v}</span></div>
          <div className="h-1.5 rounded-full bg-white/5"><div className="h-full rounded-full bg-[#E08A4A]" style={{ width: `${Math.max(4, (v / Math.max(1, total)) * 100)}%` }} /></div>
        </div>))}
    </div>
  </div>);

export const VisitorsAdmin: React.FC = () => {
  const [days, setDays] = useState(7);
  const [visits, setVisits] = useState<Visit[] | null>(null);
  const [err, setErr] = useState('');
  const [mine, setMine] = useState(() => { try { return localStorage.getItem('vs-notrack') === '1'; } catch { return false; } });

  useEffect(() => {
    setVisits(null); setErr('');
    loadVisits(days).then(setVisits).catch(e => setErr(String(e?.message || e).includes('permission')
      ? 'Visitor data is locked until you publish the updated database rules in Firebase Console.' : 'Could not load visitor data.'));
  }, [days]);

  const s = useMemo(() => {
    if (!visits) return null;
    const views = visits.filter(v => v.e === 'view');
    const sessions = new Set(views.map(v => v.s));
    const firstOfSession = new Map<string, Visit>();
    [...views].reverse().forEach(v => { if (!firstOfSession.has(v.s)) firstOfSession.set(v.s, v); });
    const firsts = [...firstOfSession.values()];
    const byDay = new Map<string, Set<string>>();
    for (let i = days - 1; i >= 0; i--) { const d = new Date(Date.now() - i * 864e5); byDay.set(d.toISOString().slice(0, 10), new Set()); }
    views.forEach(v => { const k = v.at?.toDate().toISOString().slice(0, 10); if (k && byDay.has(k)) byDay.get(k)!.add(v.s); });
    const count = (e: string) => visits.filter(v => v.e === e).length;
    return {
      views: views.length, people: sessions.size, newPeople: firsts.filter(v => v.nv).length,
      wa: count('whatsapp'), pay: count('pay'), reserve: count('reserve'), dl: count('download') + count('pass'),
      chart: [...byDay.entries()].map(([d, set]) => ({ day: new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), visitors: set.size })),
      pages: top(views.map(v => PAGE_NAMES[v.p] || v.p)),
      sources: top(firsts.map(v => SRC_NAMES[v.src] || v.src)),
      countries: top(firsts.map(v => countryOf(v.tz))),
      devices: top(firsts.map(v => v.dev === 'phone' ? 'Phone' : v.dev === 'tablet' ? 'Tablet' : 'Computer')),
      sessions: sessions.size,
    };
  }, [visits, days]);

  const toggleMine = () => { const v = !mine; try { v ? localStorage.setItem('vs-notrack', '1') : localStorage.removeItem('vs-notrack'); } catch { /* ignore */ } setMine(v); };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex p-1 rounded-full bg-white/[0.06]">
          {[1, 7, 30, 90].map(d => <button key={d} onClick={() => setDays(d)} className={`px-4 py-2 rounded-full text-sm ${days === d ? 'bg-[#C9621C] text-white' : 'text-[#CFC6B8]'}`}>{d === 1 ? 'Today' : `${d} days`}</button>)}
        </div>
        <label className="flex items-center gap-2 text-sm text-[#CFC6B8] cursor-pointer"><input type="checkbox" className="accent-[#C9621C]" checked={mine} onChange={toggleMine} />Don't count my own visits on this device</label>
      </div>
      {err && <p className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-sm">{err}</p>}
      {!s && !err && <div className="py-16 flex justify-center text-[#F5F0E6]"><Loader2 className="animate-spin" /></div>}
      {s && <>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card label="Visitors" value={s.people} sub={`${s.newPeople} new`} accent />
          <Card label="Pages viewed" value={s.views} sub={s.people ? `${(s.views / s.people).toFixed(1)} per visitor` : undefined} />
          <Card label="WhatsApp taps" value={s.wa} />
          <Card label="Class times reserved" value={s.reserve} />
          <Card label="Payment windows opened" value={s.pay} />
          <Card label="Aksharam interest" value={s.dl} sub="downloads + pass enquiries" />
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
          <p className="font-semibold text-[#F5F0E6] mb-4">Visitors per day</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={s.chart}><CartesianGrid stroke="rgba(245,240,230,.06)" vertical={false} /><XAxis dataKey="day" stroke="#9A9183" fontSize={12} tickLine={false} /><YAxis stroke="#9A9183" fontSize={12} allowDecimals={false} tickLine={false} width={28} />
                <Tooltip cursor={{ fill: 'rgba(245,240,230,.05)' }} contentStyle={{ background: '#161411', border: '1px solid rgba(245,240,230,.15)', borderRadius: 12, color: '#F5F0E6' }} />
                <Bar dataKey="visitors" fill="#E08A4A" radius={[6, 6, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <List title="Most viewed pages" rows={s.pages} total={s.views} />
          <List title="Where visitors came from" rows={s.sources} total={s.sessions} />
          <List title="Countries (from time zone)" rows={s.countries} total={s.sessions} />
          <List title="Devices" rows={s.devices} total={s.sessions} />
        </div>
        <p className="text-xs text-[#9A9183]">Counts start from the day this tracker went live. No names, numbers or IP addresses are stored; a "visitor" is one visit to the site in one browser tab.</p>
      </>}
    </div>);
};
