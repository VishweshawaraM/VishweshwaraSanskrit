// Website content the Acharya edits from Admin: numbers, reviews, cohort date, prices, announcement.
// Stored in one Firestore document (site/content). Pages fall back to their built-in text.
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface Review { name: string; place: string; country: string; quote: string; source: 'Google' | 'WhatsApp' | 'Email'; hidden?: boolean }
export interface SiteContent {
  numbers: { years: string; hours: string; countries: string; countriesList: string };
  reviews: Review[];
  cohort: { name: string; start: string };          // start = 'YYYY-MM-DD'
  aksharam: { quarterly: string; yearly: string; lifetime: string };
  announcement: { on: boolean; text: string; link: string };
  updatedAt?: unknown;
}

export const DEFAULT_CONTENT: SiteContent = {
  numbers: { years: '7+', hours: '1,000+', countries: '5', countriesList: 'India, USA, UK, UAE, Australia' },
  reviews: [
    { name: 'Manohar', place: 'Parent of two · Florida, USA', country: 'us', source: 'Google', quote: "He has been teaching our two children, ages 7 and 10, and we've been very impressed. He is exceptionally dedicated, patient, and genuinely cares about sharing cultural and traditional values." },
    { name: 'Nagaraj', place: 'Parent · Abu Dhabi, UAE', country: 'ae', source: 'Google', quote: 'Your ability to break down complex mantras and shlokas into accessible yet deeply insightful explanations has fostered a sense of discipline and spiritual connection.' },
    { name: 'K V Bharath', place: 'Parent · Bengaluru', country: 'in', source: 'Google', quote: 'Myself and my 8-year-old son are taking Mantra & Shloka classes from Guruji. I was able to understand in-depth about the Mantras and Sookthas with meaning.' },
    { name: 'Marlene', place: 'Sanskrit student · Italy', country: 'it', source: 'Google', quote: "I've really enjoyed my lessons so far. He is very kind, patient, and always willing to help. I really appreciate his gentle and respectful way of teaching. I would definitely recommend him to anyone who wants to learn Sanskrit online." },
  ],
  cohort: { name: 'Dhruva', start: '2026-12-07' },
  aksharam: { quarterly: '99', yearly: '299', lifetime: '999' },
  announcement: { on: false, text: '', link: '' },
};

export const COUNTRIES: Record<string, string> = {
  in: 'India', us: 'USA', ae: 'UAE', it: 'Italy', gb: 'UK', au: 'Australia', ca: 'Canada', sg: 'Singapore', de: 'Germany', nz: 'New Zealand', '': 'No flag',
};

const KEY = 'vs-content-v1';
let memo: SiteContent | null = null;

function merge(c: Partial<SiteContent> | undefined): SiteContent {
  const d = DEFAULT_CONTENT;
  return {
    numbers: { ...d.numbers, ...(c?.numbers || {}) },
    reviews: Array.isArray(c?.reviews) && c!.reviews.length ? c!.reviews : d.reviews,
    cohort: { ...d.cohort, ...(c?.cohort || {}) },
    aksharam: { ...d.aksharam, ...(c?.aksharam || {}) },
    announcement: { ...d.announcement, ...(c?.announcement || {}) },
  };
}

/** Last saved copy, instantly (from this browser), else the built-in defaults. */
export function cachedContent(): SiteContent {
  if (memo) return memo;
  try { const s = localStorage.getItem(KEY); if (s) return merge(JSON.parse(s)); } catch { /* ignore */ }
  return DEFAULT_CONTENT;
}

/** Fresh copy from the database (falls back to cache/defaults on any error). */
export async function loadContent(): Promise<SiteContent> {
  try {
    const snap = await getDoc(doc(db, 'site', 'content'));
    memo = merge(snap.exists() ? (snap.data() as Partial<SiteContent>) : undefined);
    try { localStorage.setItem(KEY, JSON.stringify(memo)); } catch { /* ignore */ }
    return memo;
  } catch {
    return cachedContent();
  }
}

export async function saveContent(c: SiteContent) {
  const clean: SiteContent = {
    numbers: c.numbers,
    reviews: c.reviews.map(r => ({ name: r.name.trim(), place: r.place.trim(), country: r.country, quote: r.quote.trim(), source: r.source, hidden: !!r.hidden })),
    cohort: c.cohort, aksharam: c.aksharam, announcement: c.announcement,
  };
  await setDoc(doc(db, 'site', 'content'), { ...clean, updatedAt: serverTimestamp() });
  memo = merge(clean);
  try { localStorage.setItem(KEY, JSON.stringify(memo)); } catch { /* ignore */ }
}

// ---------- cohort date helpers ----------
const d0 = (iso: string) => new Date(iso + 'T00:00:00');
export function cohortLabels(c: SiteContent['cohort']) {
  const dt = d0(c.start);
  const valid = !isNaN(dt.getTime());
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = valid && dt >= today;
  const day = valid ? dt.toLocaleString('en-IN', { day: 'numeric' }) : '';
  const mon = valid ? dt.toLocaleString('en-IN', { month: 'long' }) : '';
  const monShort = valid ? dt.toLocaleString('en-IN', { month: 'short' }) : '';
  const wd = valid ? dt.toLocaleString('en-IN', { weekday: 'long' }) : '';
  const yr = valid ? dt.getFullYear() : '';
  return {
    upcoming,
    short: upcoming ? `Begins ${day} ${monShort}` : 'Enrolling now',
    tag: upcoming ? `New cohort · begins ${day} ${mon}` : 'Enrolling now',
    long: upcoming ? `${wd} ${day} ${mon} ${yr}` : 'soon',
    sentence: upcoming ? `The ${c.name} cohort begins ${wd} ${day} ${mon} ${yr}.` : `The ${c.name} cohort is enrolling now.`,
  };
}
