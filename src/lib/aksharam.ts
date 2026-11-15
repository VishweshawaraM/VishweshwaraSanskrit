// Aksharam IME engine for the web demo: the same scheme file and rules as the Mac keyboard.
// src/data/aksharam-scheme.json must be an exact copy of schemes/sanskrit.json from the Aksharam IME source,
// and this file follows Sources/CAksharam/aksharam.c there (checked against the same official test words).
import scheme from '../data/aksharam-scheme.json';

type Entry =
  | { type: 'vowel'; letter: string; sign: string }
  | { type: 'consonant'; letter: string }
  | { type: 'append'; text: string }
  | { type: 'digit'; native: string };

const table = new Map<string, Entry>();
let maxKey = 1;
const add = (key: string, e: Entry) => { table.set(key, e); maxKey = Math.max(maxKey, [...key].length); };

for (const v of scheme.vowels) for (const k of v.keys) add(k, { type: 'vowel', letter: v.letter, sign: v.sign });
for (const c of scheme.consonants) for (const k of c.keys) add(k, { type: 'consonant', letter: c.letter });
for (const m of [...scheme.marks, ...scheme.symbols]) for (const k of m.keys) add(k, { type: 'append', text: m.text });
for (const [d, native] of Object.entries(scheme.digits as Record<string, string>)) add(d, { type: 'digit', native });

const svaras = new Map<string, string>();
for (const m of scheme.svaras.marks) for (const k of m.keys) svaras.set(k, m.text);
const VIRAMA = [...scheme.virama];
const BREAK = scheme.breakKey, ESCAPE = scheme.escapeKey, SVARA = scheme.svaras.prefix;

/** Turn typed English keys into Devanagari, exactly as the Mac keyboard does. */
export function transliterate(input: string): string {
  const ch = [...input];
  const out: string[] = [];
  let consonantOpen = false;   // output ends in consonant + virama that a vowel may complete
  let i = 0;
  const push = (s: string) => { out.push(...s); };
  while (i < ch.length) {
    const c = ch[i];
    if (c === ESCAPE) { consonantOpen = false; push(i + 1 < ch.length ? ch[i + 1] : c); i += i + 1 < ch.length ? 2 : 1; continue; }
    if (c === SVARA) {
      consonantOpen = false;
      const mark = i + 1 < ch.length ? svaras.get(ch[i + 1]) : undefined;
      if (mark) { push(mark); i += 2; } else { push(c); i += 1; }
      continue;
    }
    if (c === BREAK) { consonantOpen = false; i += 1; continue; }
    let matched = false;
    for (let len = Math.min(maxKey, ch.length - i); len > 0; len--) {
      const e = table.get(ch.slice(i, i + len).join(''));
      if (!e) continue;
      if (e.type === 'vowel') {
        if (consonantOpen) { out.length -= VIRAMA.length; push(e.sign); } else push(e.letter);
        consonantOpen = false;
      } else if (e.type === 'consonant') { push(e.letter); push(scheme.virama); consonantOpen = true; }
      else if (e.type === 'append') { push(e.text); consonantOpen = false; }
      else { push(e.native); consonantOpen = false; }
      i += len;
      matched = true;
      break;
    }
    if (!matched) { push(c); consonantOpen = false; i += 1; }
  }
  return out.join('');
}
