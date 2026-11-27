// Admin: weekly class slots (block / unblock / free up) and booking requests (confirm with Guru Dakshina).
import React, { useEffect, useState } from 'react';
import { Loader2, Lock, Unlock, UserMinus, Check, X, MessageCircle, Mail, Plus, Trash2 } from 'lucide-react';
import {
  watchSlots, seedTimetable, setSlot, setStudent, getStudentNotes, removeSlot, listBookings, confirmBooking,
  declineBooking, releaseHold, classesInMonth, fmt12, DAYS, DAYS_SHORT, Slot, Booking, slotIdOf,
} from '../lib/slots';

const SITE = 'https://vishweshwarasanskrit.com';
const monthName = (iso: string) => new Date(iso + 'T00:00:00').toLocaleString('en-IN', { month: 'long', year: 'numeric' });
const prettyDate = (iso: string) => new Date(iso + 'T00:00:00').toLocaleString('en-IN', { day: 'numeric', month: 'short' });
const waNum = (n: string) => n.replace(/[^\d]/g, '').replace(/^0+/, '');

export const SlotsAdmin: React.FC = () => {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [held, setHeld] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState('');
  const [naming, setNaming] = useState<{ id: string; name: string } | null>(null);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const [rate, setRate] = useState<Record<string, string>>({});
  const [add, setAdd] = useState({ day: 0, start: '19:30', end: '20:30' });

  const refresh = async () => {
    try { setNotes(await getStudentNotes()); setBookings(await listBookings()); }
    catch { setErr('The database refused access. Publish the updated firestore.rules (slots, holds, slotNotes, bookings) in the Firebase Console.'); }
  };
  useEffect(() => {
    const off = watchSlots((s, h) => { setSlots(s); setHeld(h); }, () => setErr('Could not load slots. Publish the updated firestore.rules in the Firebase Console.'));
    refresh();
    return off;
  }, []);

  const run = async (key: string, fn: () => Promise<unknown>) => {
    setBusy(key); setErr('');
    try { await fn(); await refresh(); } catch (e) { setErr('That change was refused: ' + String((e as Error)?.message || e)); }
    setBusy('');
  };

  const slotById = (id: string) => slots?.find(s => s.id === id);
  const timesOf = (b: Booking) => b.slotIds.map(id => slotById(id)).filter(Boolean) as Slot[];

  const message = (b: Booking, per: number) => {
    const sl = timesOf(b);
    const { count } = classesInMonth(sl, b.startDate);
    const total = count * per;
    const who = b.parent || b.learner;
    const text =
      `Namaste ${who},\n\nThe class times for ${b.learner} are confirmed:\n` +
      sl.map(s => `• ${DAYS[s.day]} ${fmt12(s.start)}–${fmt12(s.end)} IST`).join('\n') +
      `\n\nClasses begin on ${prettyDate(b.startDate)}. In ${monthName(b.startDate)} there are ${count} classes.\n` +
      `Guru Dakshina: ${count} × ₹${per.toLocaleString('en-IN')} = ₹${total.toLocaleString('en-IN')}.\n\n` +
      `Please offer it here: ${SITE}/dakshina (tap "Pay Guru Dakshina" and enter ₹${total.toLocaleString('en-IN')}), then share the receipt on this chat.\n\n` +
      `With blessings,\nAcharya Vishweshwara M`;
    return { text, count, total };
  };

  if (!slots) return <div className="py-16 flex justify-center"><Loader2 className="animate-spin" /></div>;

  const pending = bookings.filter(b => b.status === 'pending');
  const done = bookings.filter(b => b.status !== 'pending').slice(0, 20);
  const chip = (s: Slot) => s.status === 'blocked' ? 'Blocked' : s.status === 'booked' ? 'Booked' : held.has(s.id) ? 'Reserved' : 'Open';
  const chipCls = (c: string) => ({
    Open: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', Reserved: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Booked: 'bg-orange-600/20 text-orange-300 border-orange-500/30', Blocked: 'bg-white/5 text-text-secondary border-white/10',
  } as Record<string, string>)[c];

  return (
    <div className="space-y-10">
      {err && <p className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 text-sm">{err}</p>}

      {/* booking requests */}
      <section>
        <h2 className="font-serif text-2xl text-text-primary mb-1">Booking requests</h2>
        <p className="text-sm text-text-secondary mb-5">New requests hold their times as “Reserved” on the website until you confirm or decline.</p>
        {pending.length === 0 && <p className="text-text-secondary text-sm">No new requests.</p>}
        <div className="grid gap-4 md:grid-cols-2">
          {pending.map(b => {
            const per = Number(rate[b.id] || 0);
            const m = message(b, per || 0);
            return (
              <div key={b.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
                <div className="flex justify-between gap-3">
                  <div><p className="text-lg text-text-primary font-semibold">{b.learner} <span className="text-sm text-text-secondary font-normal">· age {b.age || '—'}</span></p>
                    <p className="text-sm text-text-secondary">{b.subject} · {b.level}{b.parent ? ` · parent: ${b.parent}` : ''}</p></div>
                  <span className="text-xs px-2 py-1 h-fit rounded-full border border-amber-500/30 text-amber-300">Pending</span>
                </div>
                <p className="text-sm text-text-primary">{timesOf(b).map(s => `${DAYS_SHORT[s.day]} ${fmt12(s.start)}`).join(' · ')} <span className="text-text-secondary">IST</span></p>
                <p className="text-sm text-text-secondary">Starts {prettyDate(b.startDate)} · {m.count} classes in {monthName(b.startDate)} · {b.timezone}</p>
                <p className="text-sm text-text-secondary">WhatsApp {b.whatsapp}{b.email ? ` · ${b.email}` : ''}</p>
                {b.note && <p className="text-sm text-text-secondary italic">“{b.note}”</p>}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <label className="text-sm text-text-secondary">Guru Dakshina per class ₹</label>
                  <input value={rate[b.id] || ''} onChange={e => setRate(r => ({ ...r, [b.id]: e.target.value.replace(/[^\d]/g, '') }))} inputMode="numeric"
                    className="w-24 px-3 py-2 rounded-lg bg-black/30 border border-white/15 text-text-primary" />
                  {per > 0 && <span className="text-sm text-text-primary">= ₹{m.total.toLocaleString('en-IN')} for {monthName(b.startDate)}</span>}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button disabled={!per || busy === b.id} onClick={() => run(b.id, () => confirmBooking(b, per))}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600 text-white text-sm disabled:opacity-40"><Check size={16} />Confirm times</button>
                  <button disabled={busy === b.id} onClick={() => run(b.id, () => declineBooking(b))}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-text-primary text-sm"><X size={16} />Decline &amp; free times</button>
                </div>
              </div>);
          })}
        </div>
        {done.length > 0 && (
          <div className="mt-8">
            <h3 className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-3">Confirmed — send the Guru Dakshina message</h3>
            <div className="space-y-2">
              {done.map(b => {
                const m = message(b, b.perClass || 0);
                return (
                  <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3">
                    <span className="text-sm text-text-primary">{b.learner} · {timesOf(b).map(s => `${DAYS_SHORT[s.day]} ${fmt12(s.start)}`).join(', ')}
                      <span className="text-text-secondary"> · {b.status === 'confirmed' ? `₹${m.total.toLocaleString('en-IN')} (${m.count} × ₹${b.perClass})` : 'declined'}</span></span>
                    {b.status === 'confirmed' && <span className="flex gap-2">
                      <a className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-emerald-600 text-white" target="_blank" rel="noopener"
                        href={`https://wa.me/${waNum(b.whatsapp)}?text=${encodeURIComponent(m.text)}`}><MessageCircle size={14} />WhatsApp</a>
                      {b.email && <a className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full border border-white/15 text-text-primary"
                        href={`mailto:${b.email}?subject=${encodeURIComponent('Class times confirmed · Guru Dakshina')}&body=${encodeURIComponent(m.text)}`}><Mail size={14} />Email</a>}
                    </span>}
                  </div>);
              })}
            </div>
          </div>)}
      </section>

      {/* weekly slots */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div><h2 className="font-serif text-2xl text-text-primary mb-1">Weekly class slots</h2>
            <p className="text-sm text-text-secondary">Block a time you cannot teach. When a student stops, “Free up” makes the time available on the website again.</p></div>
          {slots.length === 0 && <button onClick={() => run('seed', seedTimetable)} className="px-4 py-2 rounded-full bg-orange-600 text-white text-sm">Load my weekly timetable</button>}
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7">
          {DAYS.map((d, i) => (
            <div key={d} className="rounded-2xl border border-white/10 p-3 space-y-2">
              <p className="font-mono text-xs tracking-widest uppercase text-text-secondary">{d}</p>
              {slots.filter(s => s.day === i).map(s => {
                const c = chip(s);
                return (
                  <div key={s.id} className="rounded-xl bg-white/[0.03] border border-white/10 p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-text-primary">{fmt12(s.start)}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${chipCls(c)}`}>{c}</span>
                    </div>
                    {s.status === 'booked' && <p className="text-xs text-text-secondary truncate" title={notes[s.id]}>{notes[s.id] || 'Student'}</p>}
                    {naming?.id === s.id ? (
                      <div className="flex gap-1">
                        <input autoFocus value={naming.name} onChange={e => setNaming({ id: s.id, name: e.target.value })} placeholder="Student name"
                          className="min-w-0 flex-1 px-2 py-1 rounded bg-black/30 border border-white/15 text-xs text-text-primary" />
                        <button title="Save" onClick={() => run(s.id, async () => { await setSlot(s.id, { status: 'booked' }); await setStudent(s.id, naming.name.trim()); setNaming(null); })} className="text-emerald-300"><Check size={16} /></button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {s.status === 'open' && !held.has(s.id) && <>
                          <button title="Block this time" onClick={() => run(s.id, () => setSlot(s.id, { status: 'blocked' }))} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-white/10 text-text-secondary"><Lock size={12} />Block</button>
                          <button title="Mark as booked" onClick={() => setNaming({ id: s.id, name: '' })} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-white/10 text-text-secondary"><Check size={12} />Booked</button>
                        </>}
                        {s.status === 'open' && held.has(s.id) && <button title="Release this reserved time" onClick={() => run(s.id, () => releaseHold(s.id))} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-white/10 text-text-secondary"><Unlock size={12} />Release</button>}
                        {s.status === 'blocked' && <button onClick={() => run(s.id, () => setSlot(s.id, { status: 'open' }))} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-white/10 text-text-secondary"><Unlock size={12} />Unblock</button>}
                        {s.status === 'booked' && <button title="Student discontinued: open this time again" onClick={() => run(s.id, async () => { await setSlot(s.id, { status: 'open' }); await setStudent(s.id, ''); })} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border border-white/10 text-text-secondary"><UserMinus size={12} />Free up</button>}
                        {confirmDel === s.id
                          ? <button onClick={() => run(s.id, async () => { await removeSlot(s.id); setConfirmDel(null); })} className="text-[11px] px-2 py-1 rounded-full bg-red-600/80 text-white">Delete?</button>
                          : <button title="Remove this time" onClick={() => setConfirmDel(s.id)} className="text-text-secondary/60 px-1"><Trash2 size={12} /></button>}
                      </div>)}
                  </div>);
              })}
            </div>))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-text-secondary">Add a time:</span>
          <select value={add.day} onChange={e => setAdd(a => ({ ...a, day: Number(e.target.value) }))} className="px-3 py-2 rounded-lg bg-black/30 border border-white/15 text-text-primary">{DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}</select>
          <input type="time" value={add.start} onChange={e => setAdd(a => ({ ...a, start: e.target.value }))} className="px-3 py-2 rounded-lg bg-black/30 border border-white/15 text-text-primary" />
          <span className="text-text-secondary">to</span>
          <input type="time" value={add.end} onChange={e => setAdd(a => ({ ...a, end: e.target.value }))} className="px-3 py-2 rounded-lg bg-black/30 border border-white/15 text-text-primary" />
          <button onClick={() => run('add', () => setSlot(slotIdOf(add.day, add.start), { day: add.day, start: add.start, end: add.end, status: 'open' }))} className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-orange-600 text-white"><Plus size={14} />Add (IST)</button>
        </div>
      </section>
    </div>
  );
};
