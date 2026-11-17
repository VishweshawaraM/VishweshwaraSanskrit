import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, CheckCircle2, GraduationCap, Mic2, UserRound, Globe2, Quote, ScrollText } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { whatsappLink } from '../courses';
import { CREDENTIALS_ITEMS } from '../data';
import { OO, OO_STAGES, OO_OUTCOMES, OO_HOW, OO_FAQ, OO_PRICES, OO_PRICE_NOTE } from '../oneOnOne';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-text-gold block">{children}</span>
);


const ease = [0.22, 1, 0.36, 1] as const;

/** Reveals its children as they scroll into view; a plain block when the visitor prefers reduced motion. */
const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'li' }> = ({ children, className, delay = 0, as = 'div' }) => {
  const reduce = useReducedMotion();
  const Tag = (motion as any)[as] as typeof motion.div;
  if (reduce) { const Plain = as as 'div'; return <Plain className={className}>{children}</Plain>; }
  return (
    <Tag className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease, delay }}>
      {children}
    </Tag>
  );
};

const heroItem: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const heroList: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } } };

/** The pathway card steps slowly through the six stages. Static on Stage I for reduced motion. */
const PathwayCard: React.FC = () => {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI(v => (v + 1) % OO_STAGES.length), 2600);
    return () => window.clearInterval(t);
  }, [reduce]);
  const st = OO_STAGES[i];
  return (
    <motion.div
      className="absolute -bottom-5 left-3 md:-left-6 right-3 md:right-auto md:w-80 rounded-2xl border border-gold-mid bg-ground/90 backdrop-blur-md p-4 shadow-2xl space-y-2"
      initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }} animate={reduce ? undefined : { opacity: 1, y: [0, -6, 0], scale: 1 }}
      transition={reduce ? undefined : { opacity: { duration: 0.8, delay: 0.7 }, scale: { duration: 0.8, delay: 0.7 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 } }}
    >
      <p className="font-sans text-sm text-text-primary font-semibold">Your child's pathway</p>
      <p className="font-sans text-xs text-text-secondary min-h-[1rem]" aria-live="off">Stage {st.n} · {st.title}</p>
      <div className="h-2 rounded-full bg-surface-2 overflow-hidden" role="img" aria-label={`Stage ${i + 1} of 6`}>
        <motion.div className="h-full rounded-full bg-gradient-to-r from-gold-base to-gold-bright" animate={{ width: `${((i + 1) / OO_STAGES.length) * 100}%` }} transition={{ duration: 0.9, ease }} />
      </div>
    </motion.div>
  );
};

const STATS = [
  { v: '1 : 1', l: 'Live, just your child' },
  { v: '6', l: 'Stages, step by step' },
  { v: '18–24', l: 'Months to independence' },
];

// Real words from the Acharya's students and parents, taken from his Google reviews and testimonials page (src/data.ts).
const VOICES = [
  { quote: 'He is exceptionally dedicated, patient, and genuinely cares about sharing cultural and traditional values.', who: 'Manohar', meta: 'Parent of two children, Florida, USA' },
  { quote: 'Your ability to break down complex mantras and shlokas into accessible yet deeply insightful explanations has fostered a sense of discipline and spiritual connection.', who: 'Nagaraj', meta: 'Parent, Abu Dhabi, UAE' },
  { quote: 'He is very kind, patient, and always willing to help. I always feel comfortable asking questions or asking him to explain something again.', who: 'Marlene', meta: 'Sanskrit student, Google review' },
];

const PROOF = [
  { v: '7', l: 'years of residential Gurukula training' },
  { v: 'M.A.', l: 'Acharya, in Advaita Vedanta and Shastra' },
  { v: '500+', l: 'live sessions taught' },
];

const STRIP = [
  { icon: UserRound, title: 'Taught by the Acharya', text: 'Seven years of Gurukula training' },
  { icon: Mic2, title: 'Corrected live', text: 'Every sound, every letter' },
  { icon: BookOpenCheck, title: 'Grammar first', text: 'The traditional way to read' },
  { icon: Globe2, title: 'Any time zone', text: 'India, USA, UK, UAE, Australia' },
];

/** One-to-one Samskrita Samskara Pravesha. The CTA is a WhatsApp conversation; the site collects nothing. */
export const OneOnOneView: React.FC = () => {
  const reduce = useReducedMotion();
  const wa = whatsappLink('Hari Om Acharya ji, I would like to know about the one-to-one Samskrita Samskara Pravesha (18 months). Could we talk?');
  const Cta: React.FC<{ className?: string; ghost?: boolean }> = ({ className = '', ghost }) => (
    <a
      href={wa} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-mono text-xs tracking-widest uppercase font-semibold transition duration-300 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none ${ghost ? 'bg-ground text-gold-bright border border-gold-mid hover:bg-surface-1' : 'bg-gradient-to-r from-gold-base to-gold-bright text-ground hover:brightness-110'} ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5" aria-hidden="true" /> Talk to the Acharya <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </a>
  );

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-left space-y-16 md:space-y-24">

        {/* Hero */}
        <header className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div className="space-y-6" variants={heroList} initial="hidden" animate="show">
            <motion.span variants={heroItem} className="inline-block rounded-full border border-gold-dim bg-surface-1 px-4 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase text-text-gold">One-to-one · Live online · Ages 8–14</motion.span>
            <motion.h1 variants={heroItem} className="font-serif font-bold text-[clamp(2.4rem,6vw,4.4rem)] text-text-primary leading-[1.02]">
              Sanskrit for your child, <span className="italic font-semibold text-gold-bright">one to one.</span>
            </motion.h1>
            <motion.p variants={heroItem} className="font-sans text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
              The full 18-month Samskrita Samskara Pravesha, taught live with the Acharya's whole attention on your child. From the first sound to reading Sanskrit independently.
            </motion.p>
            <motion.div variants={heroItem} className="flex flex-wrap gap-3">
              <Cta />
              <a href="#stages" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gold-dim text-text-primary font-mono text-xs tracking-widest uppercase hover:border-gold-mid transition">See the six stages</a>
            </motion.div>
            <motion.dl variants={heroItem} className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
              {STATS.map(s => (
                <div key={s.l}>
                  <dt className="font-serif font-bold text-2xl md:text-3xl text-gold-bright whitespace-nowrap">{s.v}</dt>
                  <dd className="font-sans text-xs text-text-secondary leading-snug mt-1">{s.l}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <div className="relative">
            <motion.div
              className="rounded-[2rem] overflow-hidden border border-gold-dim bg-surface-1 aspect-[4/5] md:aspect-[5/6]"
              initial={reduce ? false : { opacity: 0, scale: 0.94, clipPath: 'inset(8% 8% 8% 8% round 2rem)' }}
              animate={reduce ? undefined : { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
              transition={{ duration: 1, ease }}
            >
              <motion.img src="/acharya-portrait.webp" alt="Acharya Vishweshwara N M" className="w-full h-full object-cover" loading="eager"
                initial={reduce ? false : { scale: 1.12 }} animate={reduce ? undefined : { scale: 1 }} transition={{ duration: 1.6, ease }} />
            </motion.div>
            <PathwayCard />
          </div>
        </header>

        {/* Trust strip */}
        <Reveal>
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
        </Reveal>

        {/* Stages as cards */}
        <Reveal>
        <section id="stages" className="space-y-6 scroll-mt-28" aria-labelledby="stages-h">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <Label>The pathway</Label>
              <h2 id="stages-h" className="font-serif font-bold text-3xl md:text-4xl text-text-primary">Six stages, one steady road</h2>
            </div>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OO_STAGES.map((s, idx) => (
              <Reveal as="li" key={s.n} delay={(idx % 3) * 0.1} className="rounded-2xl border border-gold-dim bg-surface-1 p-5 space-y-3 hover:border-gold-mid hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(200,134,10,0.35)] transition duration-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-gold-base to-gold-bright text-ground font-serif font-bold text-base">{s.n}</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold">{s.duration}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-text-primary leading-snug">{s.title}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </section>
        </Reveal>

        {/* Featured: the destination */}
        <Reveal>
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
        </Reveal>

        {/* CTA banner */}
        <Reveal>
        <section className="rounded-3xl bg-gradient-to-r from-gold-base to-gold-bright text-ground p-7 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center" aria-labelledby="fee">
          <div className="space-y-2">
            <h2 id="fee" className="font-serif font-bold text-3xl md:text-4xl leading-tight">Begin with a conversation</h2>
            <p className="font-sans text-sm md:text-base opacity-90 max-w-xl">{OO.feeNote}</p>
          </div>
          <Cta ghost />
        </section>
        </Reveal>

        <Reveal>
        <section className="space-y-8" aria-labelledby="who-h">
          <div className="space-y-3 max-w-3xl">
            <Label>Who will teach your child</Label>
            <h2 id="who-h" className="font-serif font-bold text-3xl md:text-[2.6rem] text-text-primary leading-[1.1]">Seven years in a Gurukula, <span className="italic text-gold-bright">before the first class.</span></h2>
            <p className="font-sans text-text-secondary leading-relaxed">Acharya Vishweshwara N M did not learn Sanskrit from videos. He lived and studied in a traditional Gurukulam from 2018 to 2025, under revered Acharyas, and passes on exactly what he received.</p>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROOF.map(x => (
              <div key={x.l} className="rounded-2xl border border-gold-dim bg-surface-1 p-5">
                <dt className="font-serif font-bold text-4xl text-gold-bright">{x.v}</dt>
                <dd className="font-sans text-sm text-text-secondary mt-1">{x.l}</dd>
              </div>
            ))}
          </dl>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CREDENTIALS_ITEMS.map(c => (
              <li key={c.id} className="rounded-2xl border border-gold-dim bg-surface-1 p-5 flex gap-4">
                <ScrollText className="w-7 h-7 text-gold-bright shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold">{c.year}</p>
                  <h3 className="font-serif font-bold text-lg text-text-primary leading-snug">{c.title}</h3>
                  <p className="font-sans text-xs text-text-tertiary">{c.institution}</p>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">{c.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-2xl text-text-primary">What parents and students say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VOICES.map(v => (
                <figure key={v.who} className="rounded-2xl border border-gold-dim bg-surface-1 p-5 flex flex-col gap-3 hover:border-gold-mid transition duration-300">
                  <Quote className="w-6 h-6 text-gold-bright" aria-hidden="true" />
                  <blockquote className="font-sans text-sm text-text-primary leading-relaxed flex-1">{v.quote}</blockquote>
                  <figcaption className="font-sans text-xs text-text-secondary"><span className="font-semibold text-text-primary">{v.who}</span> · {v.meta}</figcaption>
                </figure>
              ))}
            </div>
            <p className="font-sans text-sm text-text-secondary">
              <Link to="/testimonials" className="text-gold-bright underline">Read more from students</Link> · <Link to="/about" className="text-gold-bright underline">The Acharya's full story</Link>
            </p>
          </div>
        </section>
        </Reveal>

        <Reveal>
        <section className="space-y-6" aria-labelledby="price-h">
          <Label>Guru Dakshina</Label>
          <h2 id="price-h" className="font-serif font-bold text-3xl md:text-4xl text-text-primary">Simple, clear fees</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch pt-3">
            {OO_PRICES.map(p => {
              const hero = p.emphasis === 'popular';
              return (
                <div key={p.id} className={`relative flex flex-col rounded-3xl p-6 md:p-7 space-y-4 border transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${hero ? 'border-gold-bright bg-surface-2 md:-my-3 md:py-10 shadow-[0_28px_70px_-26px_rgba(200,134,10,0.6)]' : 'border-gold-dim bg-surface-1'}`}>
                  {p.tag && <span className={`absolute -top-3 left-6 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 ${hero ? 'bg-gradient-to-r from-gold-base to-gold-bright text-ground' : 'bg-surface-3 border border-gold-mid text-gold-bright'}`}>{p.tag}</span>}
                  <h3 className="font-serif font-bold text-xl text-text-primary">{p.title}</h3>
                  <div>
                    <p className="font-serif font-bold text-[2rem] sm:text-4xl md:text-3xl text-gold-bright whitespace-nowrap">{p.inr}</p>
                    <p className="font-sans text-sm text-text-secondary mt-1">or {p.usd} for students abroad</p>
                    <p className="font-sans text-xs text-text-tertiary mt-1">{p.note}</p>
                    <p className="font-sans text-xs text-text-gold mt-1">{p.perClass}</p>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {p.points.map(x => <li key={x} className="flex items-start gap-2 font-sans text-sm text-text-primary"><CheckCircle2 className="w-4 h-4 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />{x}</li>)}
                  </ul>
                  <Cta className="w-full" ghost={!hero} />
                </div>
              );
            })}
          </div>
          <p className="font-sans text-xs text-text-tertiary max-w-3xl leading-relaxed">{OO_PRICE_NOTE}</p>
        </section>
        </Reveal>

        {/* How it works */}
        <Reveal>
        <section className="space-y-6" aria-labelledby="how">
          <Label>How it works</Label>
          <h2 id="how" className="font-serif font-bold text-3xl md:text-4xl text-text-primary">Personal, not casual tutoring</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OO_HOW.map(h => (
              <div key={h.title} className="rounded-2xl border border-gold-dim bg-surface-1 p-5 space-y-2 hover:border-gold-mid hover:-translate-y-1 transition duration-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <h3 className="font-serif font-bold text-lg text-text-primary">{h.title}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </section>
        </Reveal>

        {/* FAQ */}
        <Reveal>
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
        </Reveal>
      </div>
    </div>
  );
};
