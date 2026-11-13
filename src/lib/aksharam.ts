// Aksharam IME engine for the web demo: the same scheme file and longest-match rules as the Mac keyboard.
import scheme from '../data/aksharam-scheme.json';

type Ctx = 'any' | 'after_consonant' | 'not_after_consonant';
type Tok =
  | { kind: 'consonant'; text: string; ctx: Ctx }
  | { kind: 'vowel'; independent: string; matra: string; ctx: Ctx }
  | { kind: 'symbol'; text: string; ctx: Ctx }
  | { kind: 'separator'; ctx: Ctx };

const byKey = new Map<string, Tok[]>();
const add = (keys: string[], t: Tok) => keys.forEach(k => byKey.set(k, [...(byKey.get(k) ?? []), t]));
const ctxOf = (e: { context?: string }) => (e.context ?? 'any') as Ctx;

for (const v of scheme.vowels as { keys: string[]; independent: string; matra: string; context?: string }[])
  add(v.keys, { kind: 'vowel', independent: v.independent, matra: v.matra, ctx: ctxOf(v) });
for (const c of scheme.consonants as { keys: string[]; text: string; context?: string }[])
  add(c.keys, { kind: 'consonant', text: c.text, ctx: ctxOf(c) });
for (const s of scheme.symbols as { keys: string[]; text: string; context?: string }[])
  add(s.keys, { kind: 'symbol', text: s.text, ctx: ctxOf(s) });
add(scheme.controls.separator, { kind: 'separator', ctx: 'any' });
add(scheme.controls.zwnj, { kind: 'symbol', text: '‌', ctx: 'any' });
add(scheme.controls.zwj, { kind: 'symbol', text: '‍', ctx: 'any' });

const maxLen = Math.max(...[...byKey.keys()].map(k => [...k].length));
const alphabet = new Set([...byKey.keys()].flatMap(k => [...k]));
const VIRAMA = scheme.virama;

/** Render one word of roman keys as Devanagari, exactly as the keyboard shows it. */
export function render(raw: string): string {
  const ch = [...raw];
  let out = '';
  let afterC = false;
  let i = 0;
  while (i < ch.length) {
    let hit: [number, Tok] | null = null;
    for (let len = Math.min(maxLen, ch.length - i); len >= 1 && !hit; len--) {
      const t = (byKey.get(ch.slice(i, i + len).join('')) ?? []).find(x =>
        x.ctx === 'any' || (x.ctx === 'after_consonant' ? afterC : !afterC));
      if (t) hit = [len, t];
    }
    if (!hit) { out += ch[i]; afterC = false; i++; continue; }
    const [len, t] = hit;
    i += len;
    if (t.kind === 'consonant') { out += t.text + VIRAMA; afterC = true; }
    else if (t.kind === 'vowel') {
      if (afterC) out = out.slice(0, out.length - VIRAMA.length) + t.matra;
      else out += t.independent;
      afterC = false;
    } else if (t.kind === 'symbol') { out += t.text; afterC = false; }
  }
  return out;
}

/** Transliterate a whole line: characters outside the key alphabet (space, punctuation) end a word. */
export function transliterate(text: string): string {
  let doc = '';
  let word = '';
  for (const c of text) {
    if (alphabet.has(c)) { word += c; continue; }
    doc += render(word) + c;
    word = '';
  }
  return doc + render(word);
}
