// Aksharam IME engine for the web demo: the same scheme files and rules as the Mac keyboard.
// src/data/aksharam-scheme.json and aksharam-scheme-kannada.json must be exact copies of schemes/sanskrit.json and
// schemes/kannada.json from the Aksharam IME source, and this file follows Sources/CAksharam/aksharam.c there
// (checked against the same test words).
import sanskritScheme from '../data/aksharam-scheme.json';
import kannadaScheme from '../data/aksharam-scheme-kannada.json';

type Entry =
  | { type: 'vowel'; letter: string; sign: string }
  | { type: 'consonant'; letter: string }
  | { type: 'append'; text: string }
  | { type: 'digit'; native: string };

interface SchemeFile {
  virama: string; breakKey: string; escapeKey: string;
  vowels: { keys: string[]; letter: string; sign: string }[];
  consonants: { keys: string[]; letter: string }[];
  marks: { keys: string[]; text: string }[];
  symbols: { keys: string[]; text: string }[];
  digits: Record<string, string>;
  svaras: { prefix: string; marks: { keys: string[]; text: string }[] };
  nasalRule?: { triggers: string[]; anusvara: string; blocker: string; classes: { nasal: string; before: string[] }[] };
}

export type NasalRule = 'anusvara' | 'panchama';

function makeEngine(scheme: SchemeFile) {
  const table = new Map<string, Entry>();
  let maxKey = 1;
  const add = (key: string, e: Entry) => { table.set(key, e); maxKey = Math.max(maxKey, [...key].length); };
  for (const v of scheme.vowels) for (const k of v.keys) add(k, { type: 'vowel', letter: v.letter, sign: v.sign });
  for (const c of scheme.consonants) for (const k of c.keys) add(k, { type: 'consonant', letter: c.letter });
  for (const m of [...scheme.marks, ...scheme.symbols]) for (const k of m.keys) add(k, { type: 'append', text: m.text });
  for (const [d, native] of Object.entries(scheme.digits)) add(d, { type: 'digit', native });
  const svaras = new Map<string, string>();
  for (const m of scheme.svaras.marks) for (const k of m.keys) svaras.set(k, m.text);
  const VIRAMA = [...scheme.virama];
  const BREAK = scheme.breakKey, ESCAPE = scheme.escapeKey, SVARA = scheme.svaras.prefix;
  const nasal = scheme.nasalRule;
  const classOf = new Map<string, number>();
  nasal?.classes.forEach((c, i) => { for (const k of c.before) classOf.set(k, i); });

  const longest = (ch: string[], i: number): [string, Entry] | null => {
    for (let len = Math.min(maxKey, ch.length - i); len > 0; len--) {
      const key = ch.slice(i, i + len).join('');
      const e = table.get(key);
      if (e) return [key, e];
    }
    return null;
  };

  return (input: string, rule: NasalRule = 'anusvara'): string => {
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
      const m = longest(ch, i);
      if (!m) { push(c); consonantOpen = false; i += 1; continue; }
      const [key, e] = m;
      let len = [...key].length;
      if (e.type === 'vowel') {
        if (consonantOpen) { out.length -= VIRAMA.length; push(e.sign); } else push(e.letter);
        consonantOpen = false;
      } else if (e.type === 'consonant') {
        let done = false;
        if (nasal && nasal.triggers.includes(key)) {
          const j = i + len, next = j < ch.length ? longest(ch, j) : null;
          if (j + 1 < ch.length && ch[j] === nasal.blocker && !next) {          // n- / m-: plain nasal, "-" types nothing
            push(e.letter); push(scheme.virama); consonantOpen = true; len += 1; done = true;
          } else if (next && next[1].type === 'consonant' && classOf.has(next[0])) {
            if (rule === 'panchama') { push(nasal.classes[classOf.get(next[0])!].nasal); push(scheme.virama); consonantOpen = true; }
            else { push(nasal.anusvara); consonantOpen = false; }
            done = true;
          }
        }
        if (!done) { push(e.letter); push(scheme.virama); consonantOpen = true; }
      } else if (e.type === 'append') { push(e.text); consonantOpen = false; }
      else { push(e.native); consonantOpen = false; }
      i += len;
    }
    return out.join('');
  };
}

const sanskrit = makeEngine(sanskritScheme as SchemeFile);
const kannada = makeEngine(kannadaScheme as SchemeFile);

/** Turn typed English keys into Devanagari, exactly as the Mac keyboard does. */
export function transliterate(input: string): string { return sanskrit(input); }

/** Turn typed English keys into Kannada, exactly as the Aksharam Kannada keyboard does. */
export function transliterateKannada(input: string, rule: NasalRule = 'anusvara'): string { return kannada(input, rule); }
