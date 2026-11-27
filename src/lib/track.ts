// Anonymous, first-party visit tracker (Firestore 'visits').
// No names, numbers, emails or IP addresses: only the page, where the visit came from,
// device type, language, time zone, a random per-visit id and a few key clicks.
import { addDoc, collection, serverTimestamp, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export type TrackEvent = 'view' | 'whatsapp' | 'pay' | 'reserve' | 'download' | 'pass';
export interface Visit { id: string; e: TrackEvent; p: string; r: string; src: string; dev: string; tz: string; lang: string; s: string; nv: boolean; at?: Timestamp }

const skip = () => {
  try {
    if (navigator.webdriver) return true;
    if (location.hostname !== 'vishweshwarasanskrit.com' && location.hostname !== 'www.vishweshwarasanskrit.com') return true;
    if (location.pathname.startsWith('/admin')) return true;
    if (localStorage.getItem('vs-notrack') === '1') return true; // the Acharya's own devices
  } catch { /* ignore */ }
  return false;
};
const session = () => {
  try {
    let s = sessionStorage.getItem('vs-s');
    if (!s) { s = Math.random().toString(36).slice(2, 10); sessionStorage.setItem('vs-s', s); }
    return s;
  } catch { return 'x'; }
};
const isNew = () => {
  try { const v = localStorage.getItem('vs-seen'); if (!v) { localStorage.setItem('vs-seen', '1'); return true; } } catch { /* ignore */ }
  return false;
};
const source = () => {
  const q = new URLSearchParams(location.search);
  const utm = q.get('utm_source') || (q.has('fbclid') ? 'facebook' : q.has('gclid') ? 'google-ads' : '');
  if (utm) return utm.slice(0, 40);
  try {
    const h = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : '';
    if (!h || h.endsWith('vishweshwarasanskrit.com')) return 'direct';
    if (/google\./.test(h)) return 'google';
    if (/instagram|facebook|fb\.|l\.facebook/.test(h)) return h.includes('insta') ? 'instagram' : 'facebook';
    if (/whatsapp|wa\.me/.test(h)) return 'whatsapp';
    if (/bing|duckduckgo|yahoo/.test(h)) return 'other-search';
    if (/chatgpt|openai|perplexity|claude|gemini/.test(h)) return 'ai-assistant';
    return h.slice(0, 40);
  } catch { return 'direct'; }
};
let firstSrc: string | null = null;
let isNewVisitor: boolean | null = null;

export function track(e: TrackEvent, page = location.pathname) {
  if (skip()) return;
  if (firstSrc === null) firstSrc = source();
  if (isNewVisitor === null) isNewVisitor = isNew();
  const dev = /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'phone' : /iPad|Tablet/i.test(navigator.userAgent) ? 'tablet' : 'computer';
  addDoc(collection(db, 'visits'), {
    e, p: page.slice(0, 80), r: firstSrc, src: firstSrc, dev,
    tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || '').slice(0, 40),
    lang: (navigator.language || '').slice(0, 10), s: session(), nv: isNewVisitor, at: serverTimestamp(),
  }).catch(() => { /* never disturb the visitor */ });
}

let wired = false;
/** Count key clicks anywhere on the site (WhatsApp, payments, downloads). */
export function wireClickTracking() {
  if (wired) return; wired = true;
  document.addEventListener('click', ev => {
    const el = (ev.target as HTMLElement | null)?.closest('a,button') as HTMLAnchorElement | null;
    if (!el) return;
    const href = el.getAttribute('href') || '';
    if (el.hasAttribute('data-rzp-pay') || /rzp\.io|razorpay/.test(href)) track('pay');
    else if (/wa\.me|whatsapp\.com/.test(href)) {
      if (/Aksharam .*pass|Aksharam .*licence/i.test(decodeURIComponent(href))) track('pass'); else track('whatsapp');
    } else if (/\.pkg$|\.dmg$/.test(href)) track('download');
  }, true);
}

// ---------- admin ----------
export async function loadVisits(days: number): Promise<Visit[]> {
  const since = Timestamp.fromDate(new Date(Date.now() - days * 864e5));
  const s = await getDocs(query(collection(db, 'visits'), where('at', '>=', since), orderBy('at', 'desc'), limit(8000)));
  return s.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Visit, 'id'>) }));
}
export const TZ_COUNTRY: Record<string, string> = {
  'Asia/Kolkata': 'India', 'Asia/Calcutta': 'India', 'Asia/Dubai': 'UAE', 'Europe/London': 'UK', 'Europe/Rome': 'Italy',
  'Australia/Sydney': 'Australia', 'Australia/Melbourne': 'Australia', 'Australia/Brisbane': 'Australia', 'Australia/Perth': 'Australia', 'Australia/Adelaide': 'Australia',
  'Asia/Singapore': 'Singapore', 'Europe/Berlin': 'Germany', 'Pacific/Auckland': 'New Zealand', 'Asia/Muscat': 'Oman', 'Asia/Qatar': 'Qatar', 'Asia/Riyadh': 'Saudi Arabia', 'Asia/Kuwait': 'Kuwait',
};
export function countryOf(tz: string) {
  if (TZ_COUNTRY[tz]) return TZ_COUNTRY[tz];
  if (tz.startsWith('America/')) return /Toronto|Vancouver|Edmonton|Winnipeg|Halifax/.test(tz) ? 'Canada' : 'USA / Americas';
  if (tz.startsWith('Europe/')) return 'Europe';
  if (tz.startsWith('Australia/')) return 'Australia';
  return tz ? tz.split('/')[0] : 'Unknown';
}
