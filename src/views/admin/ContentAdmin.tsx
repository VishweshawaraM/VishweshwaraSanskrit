// Admin editors for website content: numbers, reviews, cohort & prices, announcement.
import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Eye, EyeOff, Trash2, Plus, Check, Loader2 } from 'lucide-react';
import { loadContent, saveContent, SiteContent, Review, COUNTRIES, cohortLabels, DEFAULT_CONTENT } from '../../lib/content';
import { logAdminActivity } from '../../lib/firebase';

export type ContentTab = 'numbers' | 'reviews' | 'dates' | 'announce';

const field = 'w-full px-4 py-3 rounded-xl bg-[#211E1A] border border-white/10 text-[#F5F0E6] placeholder:text-[#9A9183] focus:outline-none focus:border-[#E08A4A]';
const label = 'block text-sm font-semibold text-[#F5F0E6] mb-2';
const hint = 'text-sm text-[#9A9183] mt-1.5';

export const ContentAdmin: React.FC<{ tab: ContentTab }> = ({ tab }) => {
  const [c, setC] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');
  const [delIdx, setDelIdx] = useState<number | null>(null);

  useEffect(() => { loadContent().then(setC); }, []);
  if (!c) return <div className="py-16 flex justify-center text-[#F5F0E6]"><Loader2 className="animate-spin" /></div>;

  const up = (fn: (d: SiteContent) => void) => { const d: SiteContent = JSON.parse(JSON.stringify(c)); fn(d); setC(d); setSaving('idle'); };
  const save = async () => {
    setSaving('saving');
    try {
      await saveContent(c);
      logAdminActivity({ action: `Website content saved (${tab})`, status: 'success' }).catch(() => {});
      setSaving('saved');
    } catch (e) {
      setErrMsg(String((e as Error)?.message || e)); setSaving('error');
    }
  };
  const SaveBar = (
    <div className="sticky bottom-4 mt-8 flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-[#161411]/90 backdrop-blur border border-white/10">
      <button onClick={save} disabled={saving === 'saving'} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9621C] text-white font-semibold disabled:opacity-60">
        {saving === 'saving' ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save to website
      </button>
      {saving === 'saved' && <span className="text-sm text-emerald-300">Saved. Visitors see it on their next page load.</span>}
      {saving === 'error' && <span className="text-sm text-red-300">Not saved: {errMsg.includes('permission') ? 'publish the updated database rules in Firebase Console first.' : errMsg}</span>}
    </div>);

  if (tab === 'numbers') return (
    <div className="max-w-2xl space-y-6">
      <p className="text-[#CFC6B8]">These numbers appear on the Home and About pages, and count up as visitors scroll.</p>
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label className={label}>Years of Gurukula education</label><input className={field} value={c.numbers.years} onChange={e => up(d => { d.numbers.years = e.target.value; })} /><p className={hint}>e.g. 7+</p></div>
        <div><label className={label}>Hours of live teaching</label><input className={field} value={c.numbers.hours} onChange={e => up(d => { d.numbers.hours = e.target.value; })} /><p className={hint}>e.g. 1,200+</p></div>
        <div><label className={label}>Number of countries</label><input className={field} value={c.numbers.countries} onChange={e => up(d => { d.numbers.countries = e.target.value; })} /></div>
        <div><label className={label}>Countries, in words</label><input className={field} value={c.numbers.countriesList} onChange={e => up(d => { d.numbers.countriesList = e.target.value; })} /><p className={hint}>Shown under the number on Home</p></div>
      </div>
      {SaveBar}
    </div>);

  if (tab === 'reviews') {
    const move = (i: number, dir: -1 | 1) => up(d => { const j = i + dir; if (j < 0 || j >= d.reviews.length) return; [d.reviews[i], d.reviews[j]] = [d.reviews[j], d.reviews[i]]; });
    return (
      <div className="space-y-5">
        <p className="text-[#CFC6B8] max-w-2xl">Reviews appear in the rotating card deck on Home, About, One-to-one and Testimonials, in this order. Copy reviews word for word, and only with the person's permission.</p>
        {c.reviews.map((r, i) => (
          <div key={i} className={`rounded-2xl border p-5 space-y-4 ${r.hidden ? 'border-white/5 opacity-60' : 'border-white/10 bg-white/[0.03]'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-[#F5F0E6]">{i + 1}. {r.name || 'New review'} {r.hidden && <span className="text-xs text-[#9A9183]">(hidden)</span>}</span>
              <span className="flex gap-1">
                <button title="Move up" onClick={() => move(i, -1)} className="p-2 rounded-full hover:bg-white/10 text-[#CFC6B8]"><ArrowUp size={16} /></button>
                <button title="Move down" onClick={() => move(i, 1)} className="p-2 rounded-full hover:bg-white/10 text-[#CFC6B8]"><ArrowDown size={16} /></button>
                <button title={r.hidden ? 'Show on website' : 'Hide from website'} onClick={() => up(d => { d.reviews[i].hidden = !d.reviews[i].hidden; })} className="p-2 rounded-full hover:bg-white/10 text-[#CFC6B8]">{r.hidden ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                {delIdx === i
                  ? <button onClick={() => { up(d => { d.reviews.splice(i, 1); }); setDelIdx(null); }} className="px-3 py-1.5 rounded-full bg-red-600 text-white text-xs">Delete?</button>
                  : <button title="Delete" onClick={() => setDelIdx(i)} className="p-2 rounded-full hover:bg-white/10 text-[#CFC6B8]"><Trash2 size={16} /></button>}
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div><label className={label}>Name</label><input className={field} value={r.name} onChange={e => up(d => { d.reviews[i].name = e.target.value; })} /></div>
              <div><label className={label}>Who · where</label><input className={field} value={r.place} placeholder="Parent · Florida, USA" onChange={e => up(d => { d.reviews[i].place = e.target.value; })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={label}>Flag</label><select className={field} value={r.country} onChange={e => up(d => { d.reviews[i].country = e.target.value; })}>{Object.entries(COUNTRIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
                <div><label className={label}>Source</label><select className={field} value={r.source} onChange={e => up(d => { d.reviews[i].source = e.target.value as Review['source']; })}>{['Google', 'WhatsApp', 'Email'].map(o => <option key={o}>{o}</option>)}</select></div>
              </div>
            </div>
            <div><label className={label}>Their exact words</label><textarea rows={3} className={field} value={r.quote} onChange={e => up(d => { d.reviews[i].quote = e.target.value; })} /></div>
          </div>))}
        <button onClick={() => up(d => { d.reviews.unshift({ name: '', place: '', country: 'in', source: 'Google', quote: '' }); })}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-[#F5F0E6]"><Plus size={16} />Add a review</button>
        {SaveBar}
      </div>);
  }

  if (tab === 'dates') {
    const cl = cohortLabels(c.cohort);
    return (
      <div className="max-w-2xl space-y-8">
        <div className="space-y-5">
          <h3 className="font-semibold text-lg text-[#F5F0E6]">Next Samskara Pravesha cohort</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div><label className={label}>Cohort name</label><input className={field} value={c.cohort.name} onChange={e => up(d => { d.cohort.name = e.target.value; })} /></div>
            <div><label className={label}>Start date</label><input type="date" className={field} value={c.cohort.start} onChange={e => up(d => { d.cohort.start = e.target.value; })} /></div>
          </div>
          <p className="text-sm text-[#CFC6B8]">The website will say: <b className="text-[#E08A4A]">{cl.short}</b> · “{cl.sentence}” {cl.upcoming ? '' : '(the date has passed, so it shows “Enrolling now”)'}</p>
        </div>
        <div className="space-y-5">
          <h3 className="font-semibold text-lg text-[#F5F0E6]">Aksharam passes (₹)</h3>
          <div className="grid grid-cols-3 gap-4">
            {(['quarterly', 'yearly', 'lifetime'] as const).map(k => (
              <div key={k}><label className={label}>{k[0].toUpperCase() + k.slice(1)}</label><input inputMode="numeric" className={field} value={c.aksharam[k]} onChange={e => up(d => { d.aksharam[k] = e.target.value.replace(/[^\d,]/g, ''); })} /></div>))}
          </div>
          <p className={hint}>Changes the prices on the Aksharam page. Samskara Pravesha prices stay as written for now.</p>
        </div>
        <button onClick={() => up(d => { d.cohort = { ...DEFAULT_CONTENT.cohort }; d.aksharam = { ...DEFAULT_CONTENT.aksharam }; })} className="text-sm text-[#9A9183] underline">Reset to the original values</button>
        {SaveBar}
      </div>);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <p className="text-[#CFC6B8]">A short notice shown under the header on every page, for example a new cohort or a festival programme.</p>
      <label className="flex items-center gap-3 text-[#F5F0E6] cursor-pointer">
        <input type="checkbox" className="w-5 h-5 accent-[#C9621C]" checked={c.announcement.on} onChange={e => up(d => { d.announcement.on = e.target.checked; })} />
        Show the announcement on the website
      </label>
      <div><label className={label}>Text (one short line)</label><input maxLength={90} className={field} value={c.announcement.text} placeholder="Dhruva cohort begins 7 December · 6 seats left" onChange={e => up(d => { d.announcement.text = e.target.value; })} /><p className={hint}>{c.announcement.text.length}/90 characters</p></div>
      <div><label className={label}>Link (optional)</label><input className={field} value={c.announcement.link} placeholder="/samskara-pravesha" onChange={e => up(d => { d.announcement.link = e.target.value; })} /><p className={hint}>A page on the site such as /schedule, or a full https:// link</p></div>
      {c.announcement.text && <div><p className={label}>Preview</p><span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F0E6] text-[#161411] text-sm font-semibold"><span className="w-2 h-2 rounded-full bg-[#C9621C]" />{c.announcement.text}{c.announcement.link && ' →'}</span></div>}
      {SaveBar}
    </div>);
};
