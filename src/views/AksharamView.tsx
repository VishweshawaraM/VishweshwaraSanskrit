import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, Check, Copy, CreditCard, Download, PackageCheck, Keyboard, ShieldCheck, Cpu, Play, Lock, Sparkles,
} from 'lucide-react';
import { FadeInSection } from '../components/FadeInSection';
import { FAQ } from '../components/FAQ';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ACHARYA_NAME, whatsappLink } from '../courses';
import { AK, AK_EXAMPLES, AK_STEPS, AK_FAQ } from '../aksharam';
import { transliterate } from '../lib/aksharam';

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-text-gold block ${className}`}>{children}</span>
);

export const BuyButton: React.FC<{ className?: string; label?: string }> = ({ className = '', label }) => (
  <a
    href={AK.buyUrl} target="_blank" rel="noopener noreferrer"
    className={`group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-gold-base via-gold-bright to-gold-glow text-ground font-mono text-xs tracking-widest uppercase font-semibold shadow-[0_12px_40px_rgba(232,168,32,0.35)] hover:shadow-[0_16px_50px_rgba(232,168,32,0.5)] hover:-translate-y-0.5 transition ${className}`}
  >
    {label ?? `Get ${AK.name} · ₹${AK.price}`}
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
  </a>
);

/* ---------------------------------------------------------------------------------------------
 * Live typing demo: English keys appear on key caps, the word being typed is underlined,
 * and finished words turn into Devanagari — exactly what the keyboard does on a Mac.
 * ------------------------------------------------------------------------------------------- */
const DEMOS = ['OM namaH shivAya |', 'dharmakShetre kurukShetre |', 'i`aShe tvo`arje tvA`s', 'saMskRitam', "so'ham"];

const useTyping = () => {
  const [demo, setDemo] = useState(0);
  const [n, setN] = useState(0);
  const text = DEMOS[demo];
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(text.length); return; }
    const done = n >= text.length;
    const id = window.setTimeout(() => {
      if (done) { setDemo((demo + 1) % DEMOS.length); setN(0); } else setN(n + 1);
    }, done ? 2200 : text[n] === ' ' ? 170 : 115);
    return () => window.clearTimeout(id);
  }, [n, demo, text]);
  return { keys: text.slice(0, n), done: n >= text.length };
};

const LiveTyper: React.FC = () => {
  const { keys, done } = useTyping();
  const cut = Math.max(keys.lastIndexOf(' '), -1);
  const committed = transliterate(keys.slice(0, cut + 1));
  const word = transliterate(keys.slice(cut + 1));
  const recent = keys.slice(-7).split('');
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(232,168,32,0.28),transparent)] blur-2xl ak-glow pointer-events-none" />
      <div className="relative rounded-2xl border border-gold-mid bg-surface-1/95 shadow-[0_40px_100px_rgba(0,0,0,0.65)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gold-dim bg-surface-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" /><span className="w-3 h-3 rounded-full bg-[#febc2e]" /><span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-text-tertiary">Pages — Untitled</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-text-primary/90 px-1.5 py-0.5 font-devanagari text-[13px] leading-none text-ground" title="Aksharam input menu">अ</span>
        </div>
        <div className="bg-[#fbf8f2] text-[#1b1510] px-6 md:px-8 py-8 min-h-[190px] md:min-h-[220px]">
          <p lang="sa" className="font-devanagari text-[30px] md:text-[40px] leading-[1.6] break-words">
            {committed}
            {done ? word : <span className="underline decoration-[#2f7bf6] decoration-[3px] underline-offset-[10px]">{word}</span>}
            <span className="inline-block w-[3px] h-[0.9em] -mb-[0.12em] ml-0.5 bg-[#1b1510] ak-caret" />
          </p>
        </div>
        <div className="flex justify-center gap-2 px-4 py-4 bg-surface-2 border-t border-gold-dim min-h-[72px]">
          {recent.map((k, i) => (
            <span key={`${keys.length}-${i}`}
              className={`min-w-10 h-10 px-2 rounded-lg grid place-items-center font-mono text-sm md:text-base ${i === recent.length - 1 && !done
                ? 'bg-gradient-to-b from-gold-bright to-gold-base text-ground translate-y-0.5 shadow-[0_2px_0_#5a3a04]'
                : 'bg-surface-3 text-text-primary shadow-[0_4px_0_#0c0906] border border-gold-dim'}`}>
              {k === ' ' ? 'space' : k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* Floating Devanagari letters in the background of the hero */
const Floaters: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
    {[
      ['अ', 'left-[4%] top-[18%] text-[120px]', '-8deg', '0s'], ['क्ष', 'left-[42%] top-[6%] text-[90px]', '6deg', '1.2s'],
      ['ॐ', 'right-[3%] top-[12%] text-[110px]', '-4deg', '2.1s'], ['र', 'left-[30%] bottom-[6%] text-[100px]', '10deg', '0.6s'],
      ['म्', 'right-[18%] bottom-[2%] text-[130px]', '-10deg', '1.6s'], ['ज्ञ', 'left-[12%] bottom-[22%] text-[80px]', '4deg', '2.6s'],
    ].map(([g, pos, r, d]) => (
      <span key={g} className={`absolute font-devanagari text-gold-base/[0.07] ak-float ${pos}`}
        style={{ ['--ak-r' as string]: r, animationDelay: d } as React.CSSProperties}>{g}</span>
    ))}
  </div>
);

const TryIt: React.FC = () => {
  const [text, setText] = useState(AK_EXAMPLES[0]);
  const [copied, setCopied] = useState(false);
  const out = transliterate(text);
  const copy = async () => {
    try { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ }
  };
  return (
    <div className="rounded-3xl border border-gold-mid bg-surface-1 p-5 md:p-8 space-y-5 text-left shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <label htmlFor="ak-input" className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold block">Type in English letters</label>
      <input
        id="ak-input" value={text} onChange={e => setText(e.target.value)} spellCheck={false} autoCapitalize="off" autoCorrect="off" autoComplete="off"
        className="w-full bg-surface-2 border border-gold-dim focus:border-gold-bright outline-none rounded-xl px-4 py-3.5 font-mono text-base md:text-lg text-text-primary"
      />
      <div className="flex flex-wrap gap-2">
        {AK_EXAMPLES.map(ex => (
          <button key={ex} type="button" onClick={() => setText(ex)}
            className="px-3 py-1.5 rounded-full border border-gold-dim hover:border-gold-bright hover:bg-gold-dim font-mono text-[11px] text-text-secondary transition-colors">{ex}</button>
        ))}
      </div>
      <div className="rounded-2xl bg-ground border border-gold-dim p-5 md:p-6 min-h-[110px] flex items-center justify-between gap-4">
        <p lang="sa" className="font-devanagari text-3xl md:text-5xl leading-snug text-text-primary break-words min-w-0">{out || ' '}</p>
        <button type="button" onClick={copy} aria-label="Copy the Devanagari text"
          className="shrink-0 w-11 h-11 rounded-lg border border-gold-dim hover:border-gold-bright grid place-items-center text-text-gold">
          {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>
      <p className="font-sans text-xs text-text-tertiary">Same rules as the Mac keyboard. On your Mac it works like this inside every app.</p>
    </div>
  );
};

const APPS = ['Pages', 'Microsoft Word', 'Google Docs', 'Gmail', 'WhatsApp', 'Notes', 'Keynote', 'Mail', 'Safari', 'Chrome', 'TextEdit', 'Spotlight'];

const JOURNEY = [
  { icon: CreditCard, title: 'Pay ₹99', body: 'One-time payment by UPI, card or net banking. Secured by Razorpay. Lifetime licence, no subscription.' },
  { icon: Download, title: 'Download', body: 'Your private download page opens the moment the payment succeeds.' },
  { icon: PackageCheck, title: 'Install', body: 'Open the installer. The first time, click Open Anyway in Privacy & Security.' },
  { icon: Keyboard, title: 'Type', body: 'Choose Aksharam (अ) from the input menu and type Sanskrit in any app.' },
];

const SHOWCASE = [
  { keys: 'rAm', title: 'The halanta, always right', body: 'A consonant keeps its halanta until a vowel completes it.' },
  { keys: 'tattvam', title: 'Conjuncts that just work', body: 'त्त्व, क्ष, ज्ञ, ष्ण — the longest key always wins.' },
  { keys: 'i`aShe tvA`s', title: 'Vedic svaras', body: 'Anudātta ॒, svarita ॑ and dīrgha svarita ᳚ with one key each.' },
  { keys: "so'ham ||", title: 'Every Sanskrit symbol', body: 'Avagraha, daṇḍa, ॐ, anusvāra, visarga, candrabindu, Devanagari numerals.' },
];

export const AksharamView: React.FC = () => {
  const showcase = useMemo(() => SHOWCASE.map(s => ({ ...s, out: transliterate(s.keys) })), []);
  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative pt-28 md:pt-36 pb-20 px-4 md:px-12 bg-ground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_75%_35%,rgba(232,168,32,0.16),transparent_70%),radial-gradient(ellipse_40%_40%_at_10%_80%,rgba(139,26,26,0.18),transparent_70%)] pointer-events-none" />
        <Floaters />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-6 text-left space-y-7">
            <FadeInSection direction="up" delay={40}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-mid bg-gold-dim font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-text-primary">
                <Sparkles className="w-3.5 h-3.5 text-gold-bright" aria-hidden="true" /> New · v{AK.version} · for Mac
              </span>
            </FadeInSection>
            <FadeInSection direction="up" delay={110}>
              <h1 className="space-y-1">
                <span className="block font-serif font-bold text-text-primary text-[clamp(2.7rem,7vw,5.4rem)] leading-[0.95]">Sanskrit, typed perfectly.</span>
                <span className="block font-serif italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gold-bright via-gold-glow to-gold-base text-[clamp(2.2rem,5.6vw,4.4rem)] leading-[1.05]">In every app on your Mac.</span>
              </h1>
            </FadeInSection>
            <FadeInSection direction="up" delay={170}>
              <p className="font-sans text-base md:text-lg text-text-secondary max-w-xl leading-relaxed">
                Type <span className="font-mono text-text-primary">saMskRitam</span>, get <span lang="sa" className="font-devanagari text-text-primary">संस्कृतम्</span>.
                Built by {ACHARYA_NAME} for students, teachers and everyone who writes Sanskrit — with halanta, conjuncts and Vedic svaras exactly right.
              </p>
            </FadeInSection>
            <FadeInSection direction="up" delay={230}>
              <div className="flex flex-wrap items-center gap-4">
                <BuyButton />
                <a href="#demo" className="inline-flex items-center gap-2 px-5 py-4 rounded-xl border border-gold-mid hover:border-gold-bright font-mono text-xs tracking-widest uppercase text-text-primary transition">
                  <Play className="w-4 h-4 text-gold-bright" aria-hidden="true" /> Watch the demo
                </a>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-sans text-xs md:text-sm text-text-tertiary">
                {['One-time ₹99 · no subscription', 'Apple Silicon & Intel', 'macOS 12+', 'Works offline'].map(t => (
                  <li key={t} className="flex items-center gap-2"><Check className="w-4 h-4 text-gold-bright" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </FadeInSection>
          </div>
          <div className="lg:col-span-6">
            <FadeInSection direction="up" delay={160}>
              <div className="relative">
                <img src="/aksharam-ime/aksharam-icon.webp" alt="" width={120} height={120}
                  className="hidden md:block absolute -top-20 -right-4 w-24 h-24 rotate-[8deg] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-10 ak-float" />
                <LiveTyper />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* APPS MARQUEE */}
      <section className="border-y border-gold-dim bg-surface-1 py-5 overflow-hidden" aria-label="Works in these apps">
        <div className="flex w-max ak-marquee">
          {[...APPS, ...APPS].map((a, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-serif text-xl md:text-2xl text-text-secondary whitespace-nowrap">
              {a}<span className="text-gold-base">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      <section id="demo" className="py-20 md:py-28 px-4 md:px-12 bg-ground scroll-mt-24">
        <div className="max-w-6xl mx-auto space-y-10 text-center">
          <div className="space-y-3">
            <Label>See it in action</Label>
            <h2 className="font-serif font-bold text-4xl md:text-6xl text-text-primary">From payment to typing, in 80 seconds</h2>
          </div>
          <FadeInSection direction="up">
            <div className="relative rounded-[1.75rem] p-[1.5px] bg-gradient-to-br from-gold-bright via-gold-mid to-transparent shadow-[0_50px_120px_rgba(0,0,0,0.7)]">
              <video controls preload="metadata" playsInline poster={AK.poster} className="w-full rounded-[1.65rem] bg-black aspect-video">
                <source src={AK.video} type="video/mp4" />
              </video>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-20 md:py-24 px-4 md:px-12 bg-surface-1 border-y border-gold-dim">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3 text-center">
            <Label>How you get it</Label>
            <h2 className="font-serif font-bold text-4xl md:text-6xl text-text-primary">Four steps. About two minutes.</h2>
          </div>
          <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
            <span className="hidden md:block absolute top-9 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold-mid to-transparent" aria-hidden="true" />
            {JOURNEY.map((j, i) => {
              const Icon = j.icon;
              return (
                <FadeInSection key={j.title} direction="up" delay={80 * i}>
                  <li className="relative h-full rounded-2xl border border-gold-dim bg-ground p-6 text-center space-y-3 hover:border-gold-mid transition">
                    <span className="relative mx-auto w-[72px] h-[72px] rounded-full grid place-items-center bg-gradient-to-b from-surface-3 to-surface-1 border border-gold-mid">
                      <Icon className="w-7 h-7 text-gold-bright" aria-hidden="true" />
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold-bright text-ground font-mono text-[11px] font-bold grid place-items-center">{i + 1}</span>
                    </span>
                    <h3 className="font-serif font-semibold text-2xl text-text-primary">{j.title}</h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">{j.body}</p>
                  </li>
                </FadeInSection>
              );
            })}
          </ol>
          <div className="text-center"><BuyButton label={`Start with step 1 · ₹${AK.price}`} /></div>
        </div>
      </section>

      {/* TRY IT */}
      <section id="try" className="py-20 md:py-24 px-4 md:px-12 bg-ground scroll-mt-24">
        <div className="max-w-3xl mx-auto space-y-6">
          <Label>Try it before you buy</Label>
          <h2 className="font-serif font-bold text-4xl md:text-6xl text-text-primary">See how it types</h2>
          <TryIt />
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="py-20 md:py-24 px-4 md:px-12 bg-surface-1 border-y border-gold-dim">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-3 max-w-3xl">
            <Label>Made by a Sanskrit teacher, for Sanskrit</Label>
            <h2 className="font-serif font-bold text-4xl md:text-6xl text-text-primary">Not a Hindi keyboard. A Sanskrit one.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {showcase.map((s, i) => (
              <FadeInSection key={s.title} direction="up" delay={60 * i}>
                <div className="h-full rounded-3xl border border-gold-dim bg-ground p-7 md:p-9 space-y-4 hover:border-gold-mid transition">
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="font-mono text-sm md:text-base px-3 py-1 rounded-lg bg-gold-dim border border-gold-mid text-gold-bright">{s.keys}</span>
                    <ArrowRight className="w-5 h-5 text-text-tertiary self-center" aria-hidden="true" />
                    <span lang="sa" className="font-devanagari text-4xl md:text-5xl text-text-primary">{s.out}</span>
                  </div>
                  <h3 className="font-serif font-semibold text-2xl md:text-3xl text-text-primary">{s.title}</h3>
                  <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">{s.body}</p>
                </div>
              </FadeInSection>
            ))}
            <FadeInSection direction="up" delay={260}>
              <div className="h-full rounded-3xl border border-gold-dim bg-ground p-7 md:p-9 space-y-3">
                <Lock className="w-7 h-7 text-gold-bright" aria-hidden="true" />
                <h3 className="font-serif font-semibold text-2xl md:text-3xl text-text-primary">Completely private</h3>
                <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">The keyboard never uses the internet. Nothing you type is recorded, saved or sent.</p>
              </div>
            </FadeInSection>
            <FadeInSection direction="up" delay={320}>
              <div className="h-full rounded-3xl border border-gold-dim bg-ground p-7 md:p-9 space-y-3">
                <Cpu className="w-7 h-7 text-gold-bright" aria-hidden="true" />
                <h3 className="font-serif font-semibold text-2xl md:text-3xl text-text-primary">Every modern Mac</h3>
                <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">Apple Silicon (M1–M4) and Intel Macs, macOS 12 Monterey or later.</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="buy" className="py-20 md:py-28 px-4 md:px-12 bg-ground scroll-mt-24">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(232,168,32,0.22),transparent)] blur-2xl ak-glow pointer-events-none" />
          <div className="relative text-center rounded-[2rem] border border-gold-mid bg-gradient-to-b from-surface-3 to-surface-1 p-8 md:p-12 space-y-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <img src="/aksharam-ime/aksharam-icon.webp" alt="" width={112} height={112} className="w-28 h-28 mx-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-text-primary">{AK.name} for Mac</h2>
            <div>
              <p className="font-serif text-7xl text-gold-bright leading-none">₹{AK.price}</p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-text-tertiary">One-time · lifetime licence</p>
            </div>
            <ul className="text-left space-y-2.5 max-w-sm mx-auto">
              {['The Mac keyboard and its companion app', 'Key chart and a live Practice box in the app', 'Free updates to version 1', 'Help on WhatsApp if you get stuck'].map(t => (
                <li key={t} className="flex gap-3 font-sans text-sm text-text-secondary"><Check className="w-4 h-4 mt-0.5 text-gold-bright shrink-0" aria-hidden="true" />{t}</li>
              ))}
            </ul>
            <BuyButton className="w-full" />
            <p className="flex items-center justify-center gap-2 font-sans text-xs text-text-tertiary"><ShieldCheck className="w-4 h-4" aria-hidden="true" />UPI · Cards · Net banking · Secured by Razorpay</p>
            <p className="font-sans text-xs text-text-tertiary">7-day free trial · Full refund within 7 days if it does not work on your Mac · <a href="/aksharam/terms" className="underline hover:text-text-gold">Terms, licence &amp; refunds</a></p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 px-4 md:px-12 bg-surface-1 border-t border-gold-dim">
        <div className="max-w-3xl mx-auto space-y-8">
          <FAQ data={AK_FAQ} />
          <a href={whatsappLink(`Hari Om, I have a question about ${AK.name} for Mac.`)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-text-gold hover:text-text-primary">
            <WhatsAppIcon className="w-5 h-5" aria-hidden="true" /> Ask on WhatsApp
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 md:py-24 px-4 md:px-12 bg-ground border-t border-gold-dim overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_50%_100%,rgba(232,168,32,0.15),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <p lang="sa" className="font-devanagari text-5xl md:text-7xl text-gold-bright">संस्कृतम्</p>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-text-primary">Begin typing Sanskrit today.</h2>
          <BuyButton />
        </div>
      </section>
    </div>
  );
};

const paymentIdFromUrl = (): string => {
  if (typeof window === 'undefined') return '';
  const q = new URLSearchParams(window.location.search);
  return q.get('razorpay_payment_id') || q.get('payment_id') || '';
};

const GatedDownload: React.FC = () => {
  const [pid, setPid] = useState(paymentIdFromUrl());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [key, setKey] = useState('');
  const [copied, setCopied] = useState(false);
  const download = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setBusy(true); setError('');
    try {
      const r = await fetch(`${AK.downloadApi}/verify?payment_id=${encodeURIComponent(pid.trim())}`);
      const j = await r.json();
      if (j.key) setKey(j.key);
      if (j.ok && j.url) window.location.href = j.url;   // the installer downloads; this page stays open
      else setError(j.error || 'Could not verify the payment. Please try again.');
    } catch {
      setError('Could not reach the download server. Please check your internet and try again.');
    } finally { setBusy(false); }
  };
  const copyKey = async () => {
    try { await navigator.clipboard.writeText(key); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* select it instead */ }
  };
  useEffect(() => { if (paymentIdFromUrl()) void download(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="max-w-xl mx-auto space-y-6 text-left">
      <form onSubmit={download} className="space-y-3">
        <label htmlFor="ak-pid" className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold block">Your payment ID</label>
        <input id="ak-pid" value={pid} onChange={e => setPid(e.target.value)} placeholder="pay_XXXXXXXXXXXXXX" spellCheck={false} autoCapitalize="off" autoCorrect="off"
          className="w-full bg-surface-2 border border-gold-dim focus:border-gold-bright outline-none rounded-xl px-4 py-3.5 font-mono text-base text-text-primary" />
        <p className="font-sans text-xs text-text-tertiary">It starts with <span className="font-mono">pay_</span> and is in the receipt email from Razorpay.</p>
        <button type="submit" disabled={busy || !pid.trim()}
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-base via-gold-bright to-gold-glow text-ground font-mono text-xs tracking-widest uppercase font-semibold shadow-[0_12px_40px_rgba(232,168,32,0.35)] hover:brightness-110 disabled:opacity-60">
          <Download className="w-4 h-4" aria-hidden="true" /> {busy ? 'Checking payment…' : `Download Aksharam-IME-${AK.version}.pkg`}
        </button>
        {error && <p role="alert" className="font-sans text-sm text-[#ff9b8a]">{error}</p>}
      </form>
      {key && (
        <div className="rounded-2xl border border-gold-mid bg-surface-2 p-5 md:p-6 space-y-3">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold">Your personal licence key</p>
          <textarea readOnly value={key} rows={4} onFocus={e => e.currentTarget.select()} spellCheck={false}
            className="w-full bg-ground border border-gold-dim rounded-xl px-4 py-3 font-mono text-xs text-text-primary break-all resize-none" />
          <button type="button" onClick={copyKey}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gold-bright font-mono text-xs tracking-widest uppercase text-text-primary hover:bg-gold-dim">
            <Check className="w-4 h-4" aria-hidden="true" /> {copied ? 'Copied' : 'Copy key'}
          </button>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            After installing, open the <b>Aksharam IME</b> app, click <b>Licence</b>, paste this key and click <b>Activate</b>.
            It works on 2 of your own Macs and carries your name, so please keep it private. Save it somewhere safe;
            you can always get it again here with your payment ID.
          </p>
        </div>
      )}
    </div>
  );
};

export const AksharamDownloadView: React.FC = () => (
  <div className="overflow-x-clip">
    <section className="pt-28 md:pt-32 pb-16 px-4 md:px-12 bg-ground">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <img src="/aksharam-ime/aksharam-icon.webp" alt="" width={128} height={128} className="w-28 h-28 mx-auto" />
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(40,200,64,0.14)] text-[#6fe089] font-sans text-sm font-semibold">
          <Check className="w-4 h-4" aria-hidden="true" /> Payment received
        </span>
        <h1 className="font-serif font-bold text-4xl md:text-6xl text-text-primary">Your {AK.name} is ready</h1>
        <p className="font-sans text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          Thank you for your purchase! Download the installer, copy your personal licence key, then follow the short video.
        </p>
        {AK.downloadApi ? <GatedDownload /> : (
          <a href={AK.fileUrl} download
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-base via-gold-bright to-gold-glow text-ground font-mono text-xs tracking-widest uppercase font-semibold shadow-[0_12px_40px_rgba(232,168,32,0.35)] hover:brightness-110">
            <Download className="w-4 h-4" aria-hidden="true" /> Download Aksharam-IME-{AK.version}.pkg
          </a>
        )}
        <p className="font-sans text-xs text-text-tertiary">{AK.requirements}</p>
        <p className="font-sans text-xs text-text-tertiary">Not working on your Mac? Message us within 7 days for help or a full refund. <a href="/aksharam/terms" className="underline hover:text-text-gold">Terms, licence &amp; refunds</a></p>
      </div>
    </section>
    <section className="pb-16 px-4 md:px-12 bg-ground">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <video controls preload="metadata" playsInline poster={AK.poster} className="lg:col-span-7 w-full rounded-2xl border border-gold-dim bg-black">
          <source src={AK.video} type="video/mp4" />
        </video>
        <ol className="lg:col-span-5 space-y-4">
          {AK_STEPS.slice(1).map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full border border-gold-mid grid place-items-center font-mono text-xs text-text-gold">{i + 1}</span>
              <p className="font-sans text-sm text-text-secondary leading-relaxed pt-1">{s}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <a href={whatsappLink(`Hari Om, I bought ${AK.name} and need help installing it.`)} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-gold-mid font-mono text-xs tracking-widest uppercase text-text-primary hover:border-gold-bright">
          <WhatsAppIcon className="w-5 h-5" aria-hidden="true" /> Stuck? Message us on WhatsApp
        </a>
      </div>
    </section>
  </div>
);
