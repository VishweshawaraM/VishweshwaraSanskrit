// Weekly class slots and booking requests (Firestore).
// Public: reads slot status (no names) and holds; can create a booking request + holds.
// Acharya (admin): manages slots, confirms/declines bookings, sets Guru Dakshina.
import {
  collection, doc, onSnapshot, writeBatch, serverTimestamp, getDocs, query, orderBy,
  setDoc, deleteDoc, updateDoc, Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export type SlotStatus = 'open' | 'booked' | 'blocked';
export interface Slot {
  id: string;
  day: number;          // 0 = Monday … 6 = Sunday
  start: string;        // 'HH:MM' 24h, IST
  end: string;          // 'HH:MM' 24h, IST
  status: SlotStatus;
  student?: string;     // admin only: read from slotNotes, never stored on the public slot
}
export interface Booking {
  id: string;
  learner: string;
  age: string;
  level: string;
  subject: string;
  parent?: string;
  whatsapp: string;
  email: string;
  timezone: string;
  note?: string;
  slotIds: string[];
  startMonth: string;   // 'YYYY-MM'
  startDate: string;    // 'YYYY-MM-DD'
  status: 'pending' | 'confirmed' | 'declined';
  perClass?: number;
  createdAt?: Timestamp;
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// The Acharya's weekly timetable (Nov 2026): teaching windows only, IST.
// Student names stay inside admin; the public page only sees "Booked".
type Seed = [number, string, string, SlotStatus, string?];
const SEED: Seed[] = [
  // mornings with regular students
  [0, '08:30', '09:30', 'booked', 'Kailash Ji'],
  [4, '08:30', '09:30', 'booked', 'Kailash Ji'],
  [5, '07:00', '08:00', 'booked', 'Bharath Ji'],
  [6, '07:00', '08:00', 'booked', 'Bharath Ji'],
  [5, '08:30', '09:30', 'booked', 'Avyukta'],
  [6, '08:30', '09:30', 'booked', 'Avyukta'],
  // weekend flexible time, open to new students
  [5, '11:00', '12:00', 'open'], [6, '11:00', '12:00', 'open'],
  [5, '14:30', '15:30', 'open'], [6, '14:30', '15:30', 'open'],
  [5, '15:30', '16:30', 'open'], [6, '15:30', '16:30', 'open'],
  // late afternoon
  [4, '17:00', '18:30', 'booked', 'Samyuktha'],
  [5, '17:00', '17:45', 'booked', 'Samyuktha'],
  [5, '17:45', '18:30', 'booked', 'Srujan'],
  [6, '17:00', '17:45', 'booked', 'Srujan'],
  [6, '17:45', '18:30', 'booked', 'Samyuktha'],
  // evenings
  [0, '19:30', '20:30', 'open'], [1, '19:30', '20:30', 'open'], [2, '19:30', '20:30', 'open'], [3, '19:30', '20:30', 'open'],
  [1, '20:30', '21:30', 'open'], [2, '20:30', '21:30', 'open'],
  [4, '19:30', '20:30', 'booked', 'Agastyeshwara'],
  [5, '19:30', '20:30', 'booked', 'Agastyeshwara'],
  [6, '19:30', '20:30', 'booked', 'Agastyeshwara / Ashrith'],
  [5, '20:30', '21:30', 'booked', 'Rohit'],
  [6, '20:30', '21:30', 'booked', 'Rohit'],
];
/** Preview data for /book?demo (no database): the timetable with one time shown as reserved. */
export function demoSlots(): { slots: Slot[]; held: Set<string> } {
  const slots = SEED.map(([day, start, end, status]) => ({ id: `d${day}-${start.replace(':', '')}`, day, start, end, status }))
    .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start));
  return { slots, held: new Set(['d2-2030']) };
}
export const slotIdOf = (day: number, start: string) => `d${day}-${start.replace(':', '')}`;

// ---------- public ----------
export function watchSlots(cb: (slots: Slot[], held: Set<string>) => void, onError: (e: unknown) => void) {
  let slots: Slot[] = [];
  let held = new Set<string>();
  const emit = () => cb(slots, held);
  const u1 = onSnapshot(collection(db, 'slots'), s => {
    slots = s.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Slot, 'id'>) }))
      .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start));
    emit();
  }, onError);
  const u2 = onSnapshot(collection(db, 'holds'), s => { held = new Set(s.docs.map(d => d.id)); emit(); }, onError);
  return () => { u1(); u2(); };
}

export async function requestBooking(b: Omit<Booking, 'id' | 'status' | 'createdAt' | 'perClass'>) {
  const ref = doc(collection(db, 'bookings'));
  const batch = writeBatch(db);
  batch.set(ref, { ...b, status: 'pending', createdAt: serverTimestamp() });
  b.slotIds.forEach(id => batch.set(doc(db, 'holds', id), { booking: ref.id, createdAt: serverTimestamp() }));
  await batch.commit();
  return ref.id;
}

// ---------- classes in a period ----------
/** Number of classes from startDate to the end of that month, for the chosen weekly slots. */
export function classesInMonth(slots: Slot[], startDate: string): { count: number; dates: string[] } {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
  const dates: string[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const wd = (d.getDay() + 6) % 7;
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    slots.filter(s => s.day === wd).forEach(() => dates.push(iso));
  }
  return { count: dates.length, dates };
}

/** IST 'HH:MM' on a weekday → label in 12h, plus the viewer's local time if not in India. */
export function fmt12(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${ap}`;
}
export function localLabel(day: number, t: string): string | null {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!tz || tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return null;
  // next date with that weekday, at t IST (UTC+5:30)
  const now = new Date();
  const base = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const wd = (base.getUTCDay() + 6) % 7;
  base.setUTCDate(base.getUTCDate() + ((day - wd + 7) % 7));
  const [h, m] = t.split(':').map(Number);
  const utc = new Date(base.getTime() + (h * 60 + m - 330) * 60000);
  return utc.toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit', timeZone: tz });
}

// ---------- admin ----------
export async function seedTimetable() {
  const batch = writeBatch(db);
  SEED.forEach(([day, start, end, status, student]) => {
    const id = slotIdOf(day, start);
    batch.set(doc(db, 'slots', id), { day, start, end, status });
    if (student) batch.set(doc(db, 'slotNotes', id), { student });
  });
  await batch.commit();
}
export const setSlot = (id: string, data: Pick<Slot, 'status'> & Partial<Pick<Slot, 'day' | 'start' | 'end'>>) => setDoc(doc(db, 'slots', id), data, { merge: true });
export const setStudent = (id: string, student: string) => student ? setDoc(doc(db, 'slotNotes', id), { student }) : deleteDoc(doc(db, 'slotNotes', id));
export async function getStudentNotes(): Promise<Record<string, string>> {
  const s = await getDocs(collection(db, 'slotNotes'));
  return Object.fromEntries(s.docs.map(d => [d.id, (d.data() as { student: string }).student]));
}
export const removeSlot = async (id: string) => { await deleteDoc(doc(db, 'slots', id)); await deleteDoc(doc(db, 'slotNotes', id)).catch(() => {}); };
export const releaseHold = (id: string) => deleteDoc(doc(db, 'holds', id));
export async function listBookings(): Promise<Booking[]> {
  const s = await getDocs(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')));
  return s.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Booking, 'id'>) }));
}
export async function confirmBooking(b: Booking, perClass: number) {
  const batch = writeBatch(db);
  batch.update(doc(db, 'bookings', b.id), { status: 'confirmed', perClass });
  b.slotIds.forEach(id => {
    batch.set(doc(db, 'slots', id), { status: 'booked' }, { merge: true });
    batch.set(doc(db, 'slotNotes', id), { student: b.learner });
    batch.delete(doc(db, 'holds', id));
  });
  await batch.commit();
}
export async function declineBooking(b: Booking) {
  const batch = writeBatch(db);
  batch.update(doc(db, 'bookings', b.id), { status: 'declined' });
  b.slotIds.forEach(id => batch.delete(doc(db, 'holds', id)));
  await batch.commit();
}
export const deleteBooking = (id: string) => deleteDoc(doc(db, 'bookings', id));
export { updateDoc };
