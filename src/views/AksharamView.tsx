import React, { useState } from 'react';
import { ArrowRight, Check, Copy, Keyboard, Languages, Music2, AppWindow, ShieldCheck } from 'lucide-react';
import { FadeInSection } from '../components/FadeInSection';
import { FAQ } from '../components/FAQ';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ACHARYA_NAME, whatsappLink } from '../courses';
import { AK, AK_EXAMPLES, AK_FEATURES, AK_STEPS, AK_FAQ } from '../aksharam';
import { transliterate } from '../lib/aksharam';

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-text-gold block ${className}`}>{children}</span>
);

export const BuyButton: React.FC<{ className?: string; label?: string }> = ({ className = '', label }) => (
  <a
    href={AK.buyUrl} target="_blank" rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-3 px-7 py-4 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold hover:brightness-110 transition ${className}`}
  >
    {label ?? `Get ${AK.name} · ₹${AK.price}`}
    <ArrowRight className="w-4 h-4" aria-hidden="true" />
  </a>
);

const TryIt: React.FC = () => {
  const [text, setText] = useState(AK_EXAMPLES[0]);
  const [copied, setCopied] = useState(false);
  const out = transliterate(text);
  const copy = async () => {
    try { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ }
  };
  return (
    <div className="rounded-2xl border border-gold-mid bg-surface-1 p-5 md:p-8 space-y-5 text-left">
      <label htmlFor="ak-input" className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold block">Type in English letters</label>
      <input
        id="ak-input" value={text} onChange={e => setText(e.target.value)} spellCheck={false} autoCapitalize="off" autoCorrect="off" autoComplete="off"
        className="w-full bg-surface-2 border border-gold-dim focus:border-gold-bright outline-none rounded-lg px-4 py-3 font-mono text-base md:text-lg text-text-primary"
      />
      <div className="flex flex-wrap gap-2">
        {AK_EXAMPLES.map(ex => (
          <button key={ex} type="button" onClick={() => setText(ex)}
            className="px-3 py-1.5 rounded-full border border-gold-dim hover:border-gold-bright font-mono text-[11px] text-text-secondary transition-colors">{ex}</button>
        ))}
      </div>
      <div className="rounded-xl bg-ground border border-gold-dim p-5 md:p-6 min-h-[96px] flex items-center justify-between gap-4">
        <p lang="sa" className="font-devanagari text-3xl md:text-4xl leading-snug text-text-primary break-words min-w-0">{out || ' '}</p>
        <button type="button" onClick={copy} aria-label="Copy the Devanagari text"
          className="shrink-0 w-11 h-11 rounded-lg border border-gold-dim hover:border-gold-bright grid place-items-center text-text-gold">
          {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>
      <p className="font-sans text-xs text-text-tertiary">This box uses the same key rules as the Mac keyboard. On your Mac it works the same way inside every app.</p>
    </div>
  );
};

const featureIcons = [Languages, Keyboard, Music2, AppWindow];

export const AksharamView: React.FC = () => (
  <div className="overflow-x-clip">
    {/* HERO */}
    <section className="relative pt-28 md:pt-32 pb-16 px-4 md:px-12 bg-ground border-b border-gold-mid">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_80%_40%,rgba(224,163,46,0.14),transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-7 text-left space-y-6">
          <FadeInSection direction="up" delay={50}>
            <span className="inline-flex px-3 py-1.5 rounded-full border border-gold-mid font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-text-primary">Sanskrit keyboard for Mac</span>
          </FadeInSection>
          <FadeInSection direction="up" delay={120}>
            <h1 className="space-y-1">
              <span className="block font-serif font-bold text-text-primary text-[clamp(2.5rem,6.5vw,4.8rem)] leading-[0.98]">Type Sanskrit the way you say it.</span>
              <span className="block font-serif italic font-semibold text-gold-bright text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1]">In every app on your Mac.</span>
            </h1>
          </FadeInSection>
          <FadeInSection direction="up" delay={180}>
            <p className="font-sans text-base md:text-lg text-text-secondary max-w-xl leading-relaxed">
              Type <span className="font-mono text-text-primary">saMskRutam</span> and get <span lang="sa" className="font-devanagari text-text-primary">संस्कृतम्</span>. {AK.name} was built by {ACHARYA_NAME} for students, teachers and anyone who writes Sanskrit, with halanta, conjuncts and Vedic svaras done right.
            </p>
          </FadeInSection>
          <FadeInSection direction="up" delay={240}>
            <div className="flex flex-wrap items-center gap-4">
              <BuyButton />
              <a href="#try" className="font-mono text-xs tracking-widest uppercase text-text-gold hover:text-text-primary">Try it here first</a>
            </div>
            <p className="mt-3 font-sans text-xs text-text-tertiary">One-time Guru Dakshina · {AK.requirements}</p>
          </FadeInSection>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <FadeInSection direction="up" delay={150}>
            <img src="/aksharam-ime/aksharam-icon.webp" alt="Aksharam IME app icon: a golden typewriter with अक्षरम् on its paper" width={420} height={420}
              className="w-64 md:w-[420px] max-w-full h-auto drop-shadow-[0_30px_60px_rgba(224,163,46,0.25)]" />
          </FadeInSection>
        </div>
      </div>
    </section>

    {/* TRY IT */}
    <section id="try" className="py-16 md:py-20 px-4 md:px-12 bg-ground">
      <div className="max-w-3xl mx-auto space-y-6">
        <Label>Try it now</Label>
        <h2 className="font-serif font-bold text-3xl md:text-5xl text-text-primary">See how it types</h2>
        <TryIt />
      </div>
    </section>

    {/* FEATURES */}
    <section className="py-16 md:py-20 px-4 md:px-12 bg-surface-1 border-y border-gold-dim">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-3 max-w-4xl">
          <Label>Why Aksharam IME</Label>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-text-primary">Made by a Sanskrit teacher, for Sanskrit</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {AK_FEATURES.map((f, i) => {
            const Icon = featureIcons[i];
            return (
              <FadeInSection key={f.title} direction="up" delay={60 * i}>
                <div className="h-full rounded-2xl border border-gold-dim bg-ground p-6 md:p-8 space-y-3">
                  <Icon className="w-6 h-6 text-gold-bright" aria-hidden="true" />
                  <h3 className="font-serif font-semibold text-2xl text-text-primary">{f.title}</h3>
                  <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">{f.body}</p>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>

    {/* INSTALL */}
    <section className="py-16 md:py-20 px-4 md:px-12 bg-ground">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-4">
          <Label>Install in about two minutes</Label>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-text-primary">Watch every click</h2>
          <video controls preload="none" poster="/aksharam-ime/install-guide-poster.jpg" className="w-full rounded-2xl border border-gold-dim bg-black">
            <source src="/aksharam-ime/install-guide.mp4" type="video/mp4" />
          </video>
        </div>
        <ol className="lg:col-span-5 space-y-4 lg:pt-16">
          {AK_STEPS.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="shrink-0 w-8 h-8 rounded-full border border-gold-mid grid place-items-center font-mono text-xs text-text-gold">{i + 1}</span>
              <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed pt-1">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* PRICE */}
    <section className="py-16 md:py-20 px-4 md:px-12 bg-surface-1 border-y border-gold-dim">
      <div className="max-w-xl mx-auto text-center rounded-2xl border border-gold-mid bg-ground p-8 md:p-10 space-y-5">
        <img src="/aksharam-ime/aksharam-icon.webp" alt="" width={96} height={96} className="w-24 h-24 mx-auto" />
        <h2 className="font-serif font-bold text-3xl text-text-primary">{AK.name} for Mac</h2>
        <p className="font-serif text-5xl text-gold-bright">₹{AK.price}</p>
        <p className="font-sans text-sm text-text-secondary">One-time Guru Dakshina. No subscription.</p>
        <ul className="text-left space-y-2 max-w-sm mx-auto">
          {['The Mac keyboard and its companion app', 'Key chart and a live Try It box inside the app', 'Updates to version 1', 'Help on WhatsApp if you get stuck'].map(t => (
            <li key={t} className="flex gap-3 font-sans text-sm text-text-secondary"><Check className="w-4 h-4 mt-0.5 text-gold-bright shrink-0" aria-hidden="true" />{t}</li>
          ))}
        </ul>
        <BuyButton className="w-full" />
        <p className="flex items-center justify-center gap-2 font-sans text-xs text-text-tertiary"><ShieldCheck className="w-4 h-4" aria-hidden="true" />Secure payment by Razorpay · UPI, cards, net banking</p>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16 md:py-20 px-4 md:px-12 bg-ground">
      <div className="max-w-3xl mx-auto space-y-8">
        <FAQ data={AK_FAQ} />
        <a href={whatsappLink(`Hari Om, I have a question about ${AK.name} for Mac.`)} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-text-gold hover:text-text-primary">
          <WhatsAppIcon className="w-5 h-5" aria-hidden="true" /> Ask on WhatsApp
        </a>
      </div>
    </section>
  </div>
);

export const AksharamDownloadView: React.FC = () => (
  <div className="overflow-x-clip">
    <section className="pt-28 md:pt-32 pb-16 px-4 md:px-12 bg-ground">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <img src="/aksharam-ime/aksharam-icon.webp" alt="" width={128} height={128} className="w-28 h-28 mx-auto" />
        <Label>Thank you</Label>
        <h1 className="font-serif font-bold text-4xl md:text-6xl text-text-primary">Your {AK.name} is ready</h1>
        <p className="font-sans text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          Thank you for your Guru Dakshina. Download the installer below, then follow the short video. Please keep this file for your own Macs and do not share it publicly.
        </p>
        <a href={AK.fileUrl} download
          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold hover:brightness-110">
          Download Aksharam-IME-{AK.version}.pkg
        </a>
        <p className="font-sans text-xs text-text-tertiary">{AK.requirements}</p>
      </div>
    </section>
    <section className="pb-16 px-4 md:px-12 bg-ground">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <video controls preload="metadata" poster="/aksharam-ime/install-guide-poster.jpg" className="lg:col-span-7 w-full rounded-2xl border border-gold-dim bg-black">
          <source src="/aksharam-ime/install-guide.mp4" type="video/mp4" />
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
