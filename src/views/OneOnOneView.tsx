import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, CheckCircle2, GraduationCap, Mic2, UserRound, Globe2 } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { whatsappLink } from '../courses';
import { OO, OO_STAGES, OO_OUTCOMES, OO_HOW, OO_FAQ } from '../oneOnOne';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-text-gold block">{children}</span>
);

const STATS = [
  { v: '1 : 1', l: 'Live, just your child' },
  { v: '6', l: 'Stages, step by step' },
  { v: '18–24', l: 'Months to independence' },
];

const STRIP = [
  { icon: UserRound, title: 'Taught by the Acharya', text: 'Seven years of Gurukula training' },
  { icon: Mic2, title: 'Corrected live', text: 'Every sound, every letter' },
  { icon: BookOpenCheck, title: 'Grammar first', text: 'The traditional way to read' },
  { icon: Globe2, title: 'Any time zone', text: 'India, USA, UK, UAE, Australia' },
];

/** One-to-one Samskrita Samskara Pravesha. The CTA is a WhatsApp conversation; the site collects nothing. */
export const OneOnOneView: React.FC = () => {
  const wa = whatsappLink('Hari Om Acharya ji, I would like to know about the one-to-one Samskrita Samskara Pravesha (18 months). Could we talk?');
  const Cta: React.FC<{ className?: string; ghost?: boolean }> = ({ className = '', ghost }) => (
    <a
      href={wa} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-mono text-xs tracking-widest uppercase font-semibold transition ${ghost ? 'bg-ground text-gold-bright border border-gold-mid hover:bg-surface-1' : 'bg-gradient-to-r from-gold-base to-gold-bright text-ground hover:brightness-110'} ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5" aria-hidden="true" /> Talk to the Acharya <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </a>
  );

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-left space-y-16 md:space-y-24">

        {/* Hero */}
        <header className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="space-y-6">
            <span className="inline-block rounded-full border border-gold-dim bg-surface-1 px-4 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase text-text-gold">One-to-one · Live online · Ages 8–14</span>
            <h1 className="font-serif font-bold text-[clamp(2.4rem,6vw,4.4rem)] text-text-primary leading-[1.02]">
              Sanskrit for your child, <span className="italic font-semibold text-gold-bright">one to one.</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
              The full 18-month Samskrita Samskara Pravesha, taught live with the Acharya's whole attention on your child. From the first sound to reading Sanskrit independently.
            </p>
            <div className="flex flex-wrap gap-3">
              <Cta />
              <a href="#stages" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gold-dim text-text-primary font-mono text-xs tracking-widest uppercase hover:border-gold-mid transition">See the six stages</a>
            </div>
            <dl className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
              {STATS.map(s => (
                <div key={s.l}>
                  <dt className="font-serif font-bold text-2xl md:text-3xl text-gold-bright whitespace-nowrap">{s.v}</dt>
                  <dd className="font-sans text-xs text-text-secondary leading-snug mt-1">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] overflow-hidden border border-gold-dim bg-surface-1 aspect-[4/5] md:aspect-[5/6]">
              <img src="/acharya-portrait.webp" alt="Acharya Vishweshwara N M" className="w-full h-full object-cover" loading="eager" />
            </div>
            <div className="absolute -bottom-5 left-3 md:-left-6 right-3 md:right-auto md:w-72 rounded-2xl border border-gold-mid bg-ground/95 backdrop-blur p-4 shadow-xl space-y-2">
              <p className="font-sans text-sm text-text-primary font-semibold">Your child's pathway</p>
              <p className="font-sans text-xs text-text-secondary">Stage I · Foundation and phonetics</p>
              <div className="h-2 rounded-full bg-surface-2 overflow-hidden" role="img" aria-label="Stage 1 of 6"><div className="h-full w-1/6 bg-gradient-to-r from-gold-base to-gold-bright" /></div>
            </div>
          </div>
        </header>

        {/* Trust strip */}
        <section aria-label="What you get" className="rounded-2xl border border-gold-dim bg-surface-1 p-5 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {STRIP.map(i => (
            <div key={i.title} className="flex items-start gap-3">
              <i.icon className="w-7 h-7 text-gold-bright shrink-0" aria-hidden="true" />
              <div>
                <p className="font-sans text-sm font-semibold text-text-primary leading-tight">{i.title}</p>
                <p className="font-sans text-xs text-text-secondary mt-1 leading-snug">{i.text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Stages as cards */}
        <section id="stages" className="space-y-6 scroll-mt-28" aria-labelledby="stages-h">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <Label>The pathway</Label>
              <h2 id="stages-h" className="font-serif font-bold text-3xl md:text-4xl text-text-primary">Six stages, one steady road</h2>
            </div>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OO_STAGES.map(s => (
              <li key={s.n} className="rounded-2xl border border-gold-dim bg-surface-1 p-5 space-y-3 hover:border-gold-mid transition">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-gold-base to-gold-bright text-ground font-serif font-bold text-base">{s.n}</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold">{s.duration}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-text-primary leading-snug">{s.title}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Featured: the destination */}
        <section className="grid md:grid-cols-2 gap-8 items-center rounded-3xl border border-gold-dim bg-surface-1 p-6 md:p-10" aria-labelledby="out-h">
          <div className="space-y-3">
            <Label>Where your child arrives</Label>
            <h2 id="out-h" className="font-serif font-bold text-3xl md:text-4xl text-text-primary leading-tight">Reading Sanskrit <span className="italic text-gold-bright">on their own</span></h2>
            <p className="font-sans text-text-secondary leading-relaxed">Words, then sentences, then stories, shlokas and subhashitas, and finally original texts. The aim is understanding, not memorising.</p>
            <GraduationCap className="w-9 h-9 text-gold-bright" aria-hidden="true" />
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {OO_OUTCOMES.map(o => (
              <li key={o} className="flex items-start gap-3 font-sans text-text-primary"><CheckCircle2 className="w-5 h-5 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />{o}</li>
            ))}
          </ul>
        </section>

        {/* CTA banner */}
        <section className="rounded-3xl bg-gradient-to-r from-gold-base to-gold-bright text-ground p-7 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center" aria-labelledby="fee">
          <div className="space-y-2">
            <h2 id="fee" className="font-serif font-bold text-3xl md:text-4xl leading-tight">Begin with a conversation</h2>
            <p className="font-sans text-sm md:text-base opacity-90 max-w-xl">{OO.feeNote}</p>
          </div>
          <Cta ghost />
        </section>

        {/* How it works */}
        <section className="space-y-6" aria-labelledby="how">
          <Label>How it works</Label>
          <h2 id="how" className="font-serif font-bold text-3xl md:text-4xl text-text-primary">Personal, not casual tutoring</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OO_HOW.map(h => (
              <div key={h.title} className="rounded-2xl border border-gold-dim bg-surface-1 p-5 space-y-2">
                <h3 className="font-serif font-bold text-lg text-text-primary">{h.title}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4 max-w-3xl" aria-labelledby="faq">
          <h2 id="faq" className="font-serif font-bold text-3xl text-text-primary">Questions parents ask</h2>
          {OO_FAQ.map(f => (
            <div key={f.question} className="border-b border-gold-dim pb-4 space-y-1">
              <h3 className="font-serif font-bold text-lg text-text-primary">{f.question}</h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">{f.answer}</p>
            </div>
          ))}
          <p className="font-sans text-sm text-text-secondary pt-2">
            Prefer a small group? <Link to="/samskara-pravesha" className="text-gold-bright underline">See the Dhruva group batch</Link>.
          </p>
        </section>
      </div>
    </div>
  );
};
