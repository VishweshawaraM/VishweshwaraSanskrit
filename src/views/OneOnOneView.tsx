import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { whatsappLink } from '../courses';
import { OO, OO_STAGES, OO_OUTCOMES, OO_HOW, OO_FAQ } from '../oneOnOne';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-text-gold block">{children}</span>
);

/** One-to-one 18-month Sanskrit pathway. The CTA is a WhatsApp conversation; the site collects nothing. */
export const OneOnOneView: React.FC = () => {
  const wa = whatsappLink('Hari Om Acharya ji, I would like to learn Sanskrit one-to-one (the 18-month pathway). Could we talk?');
  const Cta: React.FC<{ className?: string }> = ({ className = '' }) => (
    <a
      href={wa} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold hover:brightness-110 ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5" aria-hidden="true" /> Talk to the Acharya <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </a>
  );

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto text-left space-y-14">
        <header className="space-y-5">
          <Label>One-to-one · Live online · {OO.months}</Label>
          <h1 className="font-serif font-bold text-[clamp(2.4rem,7vw,4.4rem)] text-text-primary leading-[1]">
            Learn Sanskrit <span className="italic font-semibold text-gold-bright">properly, one to one.</span>
          </h1>
          <p className="font-serif text-xl text-gold-bright" lang="sa">{OO.devanagari}</p>
          <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Without grammar, Sanskrit stays a collection of words. In this pathway you learn it the traditional way, from the very first sound to reading original texts yourself, with Acharya Vishweshwara N M, trained for seven years in a Gurukula.
          </p>
          <Cta />
        </header>

        <section className="space-y-6" aria-labelledby="stages">
          <Label>The pathway</Label>
          <h2 id="stages" className="font-serif font-bold text-3xl md:text-4xl text-text-primary">Six stages, one steady road</h2>
          <ol className="space-y-4">
            {OO_STAGES.map(s => (
              <li key={s.n} className="rounded-2xl border border-gold-dim bg-surface-1 p-5 md:p-6 flex gap-5">
                <span className="font-serif text-2xl md:text-3xl text-gold-bright w-12 md:w-16 shrink-0" aria-hidden="true">{s.n}</span>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-xl text-text-primary">Stage {s.n}: {s.title}</h3>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold">{s.duration}</p>
                  <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-6" aria-labelledby="how">
          <Label>How it works</Label>
          <h2 id="how" className="font-serif font-bold text-3xl md:text-4xl text-text-primary">Personal, not casual tutoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OO_HOW.map(h => (
              <div key={h.title} className="rounded-xl border border-gold-dim bg-surface-1 p-5 space-y-2">
                <h3 className="font-serif font-bold text-lg text-text-primary">{h.title}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="outcomes">
          <Label>Where you arrive</Label>
          <h2 id="outcomes" className="font-serif font-bold text-3xl md:text-4xl text-text-primary">After the journey, you can</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {OO_OUTCOMES.map(o => (
              <li key={o} className="flex items-start gap-3 font-sans text-text-primary"><CheckCircle2 className="w-5 h-5 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />{o}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-gold-mid bg-surface-1 p-6 md:p-8 space-y-4" aria-labelledby="fee">
          <Label>Fee</Label>
          <h2 id="fee" className="font-serif font-bold text-2xl md:text-3xl text-text-primary">A conversation first</h2>
          <p className="font-sans text-text-secondary leading-relaxed">{OO.feeNote}</p>
          <Cta />
        </section>

        <section className="space-y-4" aria-labelledby="faq">
          <h2 id="faq" className="font-serif font-bold text-3xl text-text-primary">Questions</h2>
          {OO_FAQ.map(f => (
            <div key={f.question} className="border-b border-gold-dim pb-4 space-y-1">
              <h3 className="font-serif font-bold text-lg text-text-primary">{f.question}</h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </section>

        <p className="font-sans text-sm text-text-secondary">
          Looking for a children's batch? <Link to="/samskara-pravesha" className="text-gold-bright underline">See Samskrita Samskara Pravesha</Link>.
        </p>
      </div>
    </div>
  );
};
