// Public class-time booking: pick weekly slots like seats, see this month's classes, send a request.
import React, { useEffect, useMemo, useState } from 'react';
import { watchSlots, demoSlots, requestBooking, classesInMonth, fmt12, localLabel, DAYS, DAYS_SHORT, Slot } from '../lib/slots';
import { sendNotificationEmail } from '../lib/emailjs';
import { track } from '../lib/track';

const PER_WEEK = 2; // classes are twice a week, on two different days
const WA = 'https://wa.me/919482698612';
const pad = (n: number) => String(n).padStart(2, '0');
const isoOf = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const monthName = (iso: string) => new Date(iso + 'T00:00:00').toLocaleString('en-IN', { month: 'long', year: 'numeric' });
const prettyDate = (iso: string) => new Date(iso + 'T00:00:00').toLocaleString('en-IN', { day: 'numeric', month: 'short' });

type View = 'open' | 'held' | 'booked' | 'blocked';

export const BookingWidget: React.FC = () => {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [held, setHeld] = useState<Set<string>>(new Set());
  // offline = the database can't be read yet (or has no times): show the weekly timetable and send requests by email + WhatsApp
  const [offline, setOffline] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [startKey, setStartKey] = useState<'now' | 'next'>('now');
  const [form, setForm] = useState({ learner: '', age: '', level: 'Complete beginner', subject: 'Sanskrit', parent: '', whatsapp: '', email: '', note: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const [note, setNote] = useState('');

  const demo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('demo');
  useEffect(() => {
    if (demo) { const d = demoSlots(); setSlots(d.slots); setHeld(d.held); return; }
    const fallback = () => { setOffline(true); setSlots(demoSlots().slots); setHeld(new Set()); };
    let off = () => {};
    off = watchSlots((s, h) => { if (!s.length) { fallback(); return; } setOffline(false); setSlots(s); setHeld(h); }, () => { off(); fallback(); });
    return () => off();
  }, [demo]);

  const statusOf = (s: Slot): View => (s.status === 'blocked' ? 'blocked' : s.status === 'booked' ? 'booked' : held.has(s.id) ? 'held' : 'open');
  // drop picks that became unavailable while the page was open
  useEffect(() => {
    if (!slots) return;
    setPicked(p => p.filter(id => { const s = slots.find(x => x.id === id); return s && statusOf(s) === 'open'; }));
  }, [slots, held]); // eslint-disable-line react-hooks/exhaustive-deps

  const startDate = useMemo(() => {
    const t = new Date();
    if (startKey === 'now') { t.setDate(t.getDate() + 1); return isoOf(t); }
    return isoOf(new Date(t.getFullYear(), t.getMonth() + 1, 1));
  }, [startKey]);
  const nextMonthLabel = useMemo(() => { const t = new Date(); return new Date(t.getFullYear(), t.getMonth() + 1, 1).toLocaleString('en-IN', { month: 'long' }); }, []);
  const pickedSlots = (slots || []).filter(s => picked.includes(s.id));
  const { count, dates } = classesInMonth(pickedSlots, startDate);

  const dayTaken = (s: Slot) => !picked.includes(s.id) && (slots || []).some(x => picked.includes(x.id) && x.day === s.day);
  const toggle = (s: Slot) => {
    if (statusOf(s) !== 'open') return;
    setPicked(p => {
      if (p.includes(s.id)) return p.filter(x => x !== s.id);
      const rest = p.filter(id => (slots || []).find(x => x.id === id)?.day !== s.day); // one class a day: swap within the same day
      return rest.length >= PER_WEEK ? rest : [...rest, s.id];
    });
  };
  const [agree, setAgree] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (picked.length !== PER_WEEK) { setNote(`Choose ${PER_WEEK} class times above, on two different days.`); return; }
    if (!agree) { setNote('Please read and accept the class terms.'); return; }
    if (!form.learner.trim() || !form.whatsapp.trim()) { setNote("Please add the learner's name and a WhatsApp number."); return; }
    setNote(''); setState('sending');
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
    try {
      if (demo) { await new Promise(r => setTimeout(r, 600)); setState('done'); return; }
      if (!offline) await requestBooking({
        learner: form.learner.trim().slice(0, 80), age: form.age.trim().slice(0, 20), level: form.level, subject: form.subject,
        parent: form.parent.trim().slice(0, 80), whatsapp: form.whatsapp.trim().slice(0, 30), email: form.email.trim().slice(0, 120),
        note: form.note.trim().slice(0, 600), timezone: tz.slice(0, 60), slotIds: picked, startMonth: startDate.slice(0, 7), startDate,
      });
      const times = pickedSlots.map(s => `${DAYS[s.day]} ${fmt12(s.start)}–${fmt12(s.end)} IST`).join(', ');
      sendNotificationEmail({
        name: form.learner, email: form.email, phone: form.whatsapp, subject: `New class booking request: ${form.subject}`, timezone: tz,
        background: `Age ${form.age || '—'} · ${form.level}${form.parent ? ' · Parent: ' + form.parent : ''}`,
        message: `Times: ${times}\nStarting: ${prettyDate(startDate)} (${count} classes in ${monthName(startDate)})\n${form.note}\n\nConfirm or decline in Admin → Class slots.`,
      }).catch(() => {});
      track('reserve');
      setState('done');
    } catch {
      setState('failed');
    }
  };

  if (!slots) return <div className="bk-loading" aria-busy="true"><span /><span /><span /></div>;
  if (!slots.length) return (
    <div className="bk-msg"><h3>Class times will appear here soon.</h3><a className="btn btn-k" href={WA} target="_blank" rel="noopener">Message on WhatsApp</a></div>);

  if (state === 'done') {
    const times = pickedSlots.map(s => `${DAYS[s.day]} ${fmt12(s.start)}`).join(', ');
    const msg = `Hari Om Acharya ji, I have reserved class times on the website for ${form.learner}: ${times} (IST), starting ${prettyDate(startDate)}.`;
    return (
      <div className="bk-msg bk-done">
        <p className="eb">{offline ? 'Request sent' : 'Reserved'}</p>
        <h3>{offline ? <>Your request for {form.learner || 'you'} is sent. Please also tap below to send it on WhatsApp.</> : <>Your class times are held for {form.learner || 'you'}.</>}</h3>
        <p>{pickedSlots.map(s => `${DAYS[s.day]} · ${fmt12(s.start)}–${fmt12(s.end)} IST`).join('  ·  ')}</p>
        <p>The Acharya will review the learner's age and level, confirm the times and share the Guru Dakshina for {monthName(startDate)} ({count} {count === 1 ? 'class' : 'classes'}) on WhatsApp{form.email ? ' and email' : ''}, usually within a day. You pay only after that.</p>
        <a className="btn btn-k" href={`${WA}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener">Tell the Acharya on WhatsApp</a>
      </div>);
  }

  const byDay = DAYS.map((_, d) => slots.filter(s => s.day === d));
  const label: Record<View, string> = { open: 'Available', held: 'Reserved', booked: 'Booked', blocked: 'Not available' };

  return (
    <form className="bk" onSubmit={submit} noValidate>
      <div className="bk-head">
        <div><p className="eb">Step 1</p><h3>Choose your weekly class times</h3><p className="bk-sub">Classes are twice a week: choose 2 times on two different days. Times are in India time (IST); each class is 60 minutes, live, one to one.</p></div>
        <ul className="bk-legend" aria-label="Legend">
          <li><i className="lg-open" />Available</li><li><i className="lg-pick" />Your choice</li><li><i className="lg-held" />Reserved</li><li><i className="lg-booked" />Booked</li>
        </ul>
      </div>

      <div className="bk-grid" role="group" aria-label="Weekly class times">
        {byDay.map((list, d) => (
          <div className="bk-day" key={d}>
            <p className="bk-dname"><b>{DAYS_SHORT[d]}</b><span>{DAYS[d]}</span></p>
            {list.length === 0 && <p className="bk-none">No classes</p>}
            {list.map(s => {
              const v = statusOf(s); const on = picked.includes(s.id); const loc = localLabel(s.day, s.start);
              return (
                <button type="button" key={s.id} className={`bk-seat is-${v}${on ? ' is-picked' : ''}${v === 'open' && !on && dayTaken(s) ? ' is-sameday' : ''}`} disabled={v !== 'open'} aria-pressed={on} onClick={() => toggle(s)}
                  aria-label={`${DAYS[s.day]} ${fmt12(s.start)} to ${fmt12(s.end)} IST, ${on ? 'selected' : label[v]}`}>
                  <span className="bk-time">{fmt12(s.start)}</span>
                  <span className="bk-state">{on ? 'Selected' : label[v]}</span>
                  {loc && v === 'open' && <span className="bk-loc">{loc} your time</span>}
                </button>);
            })}
          </div>))}
      </div>
      <p className="bk-hint" aria-live="polite">{picked.length === 0 ? 'Choose your first class time.' : picked.length === 1 ? 'Now choose your second class time, on a different day.' : 'Two classes a week chosen. Tap another time to change.'}</p>

      <div className="bk-two">
        <div className="bk-sum">
          <p className="eb">Step 2</p><h3>When do you want to begin?</h3>
          <div className="seg bk-seg" role="group" aria-label="Start">
            <button type="button" className={startKey === 'now' ? 'on' : ''} onClick={() => setStartKey('now')}>This month</button>
            <button type="button" className={startKey === 'next' ? 'on' : ''} onClick={() => setStartKey('next')}>From 1 {nextMonthLabel}</button>
          </div>
          <div className="bk-count">
            <b>{count}</b>
            <span>{count === 1 ? 'class' : 'classes'} in {monthName(startDate)}<br />from {prettyDate(startDate)}{picked.length ? ` · ${picked.length} a week` : ''}</span>
          </div>
          {dates.length > 0 && <p className="bk-dates">{dates.slice(0, 14).map(prettyDate).join(' · ')}{dates.length > 14 ? ' …' : ''}</p>}
          <p className="bk-dak"><b>Guru Dakshina</b> is set by the Acharya for each learner, after a look at age and level. You will receive the amount for {count === 1 ? 'this class' : `these ${count} classes`} on WhatsApp{form.email ? ' and email' : ''}, and pay only after the times are confirmed.</p>
        </div>

        <div className="bk-form">
          <p className="eb">Step 3</p><h3>About the learner</h3>
          <div className="bk-fields">
            <label>Learner's name<input value={form.learner} onChange={set('learner')} required maxLength={80} autoComplete="name" /></label>
            <label>Age<input value={form.age} onChange={set('age')} inputMode="numeric" maxLength={20} placeholder="e.g. 9 or Adult" /></label>
            <label>Subject<select value={form.subject} onChange={set('subject')}>{['Sanskrit', 'Bhagavad Gita', 'Veda chanting', 'Advaita Vedanta', 'Stotras'].map(o => <option key={o}>{o}</option>)}</select></label>
            <label>Level<select value={form.level} onChange={set('level')}>{['Complete beginner', 'Knows some letters', 'Reads Devanagari', 'Advanced'].map(o => <option key={o}>{o}</option>)}</select></label>
            <label>Parent's name <small>(for children)</small><input value={form.parent} onChange={set('parent')} maxLength={80} /></label>
            <label>WhatsApp number<input value={form.whatsapp} onChange={set('whatsapp')} required inputMode="tel" maxLength={30} autoComplete="tel" placeholder="+91 …" /></label>
            <label className="bk-wide">Email <small>(optional)</small><input type="email" value={form.email} onChange={set('email')} maxLength={120} autoComplete="email" /></label>
            <label className="bk-wide">Anything the Acharya should know? <small>(optional)</small><textarea value={form.note} onChange={set('note')} maxLength={600} rows={3} /></label>
          </div>
          {note && <p className="bk-err" role="alert">{note}</p>}
          <label className="bk-agree"><input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} /> <span>I have read the <a href="#terms">class terms</a>: Guru Dakshina, refunds, missed classes and stopping.</span></label>
          {state === 'failed' && <p className="bk-err" role="alert">One of these times was just taken, or the request did not go through. Please choose again, or <a href={WA} target="_blank" rel="noopener">message the Acharya</a>.</p>}
          <button className="btn btn-k bk-submit" disabled={state === 'sending'}>{state === 'sending' ? 'Reserving…' : picked.length === PER_WEEK ? 'Reserve my 2 class times' : `Choose ${PER_WEEK - picked.length} more ${PER_WEEK - picked.length === 1 ? 'time' : 'times'}`}</button>
          <p className="bk-small">Your details go only to the Acharya. Nothing is charged now.</p>
        </div>
      </div>
    </form>
  );
};
