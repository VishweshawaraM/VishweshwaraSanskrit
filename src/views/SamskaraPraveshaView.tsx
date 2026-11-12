import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, CheckCircle, Clock, Users, Languages, Loader2 } from 'lucide-react';
import { FadeInSection } from '../components/FadeInSection';
import { FAQ } from '../components/FAQ';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ACHARYA_NAME, WHATSAPP_COMMUNITY_URL, whatsappLink } from '../courses';
import { SP, SP_FREE_CLASSES, SP_GAINS, SP_HOW, SP_DAKSHINA, SP_COMPARE, SP_COMMUNITY, SP_FAQ } from '../samskaraPravesha';

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-text-gold block ${className}`}>{children}</span>
);

const field = 'w-full bg-surface-2 border border-gold-dim focus:border-gold-bright outline-none rounded-lg px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-tertiary transition-colors';

const RegisterForm: React.FC = () => {
  const [choice, setChoice] = useState<string>(SP_FREE_CLASSES[0].id);
  const enrolling = choice === 'enrol';
  const freeClass = SP_FREE_CLASSES.find(c => c.id === choice);

  // Nothing is collected on this website: the parent sends a WhatsApp message themselves.
  let ref = '';
  try { ref = new URLSearchParams(window.location.search).get('utm_source') ?? ''; } catch { /* ignore */ }
  const message = enrolling
    ? `Hari Om Acharya ji, I would like to enrol my child in ${SP.name}, Level 1 (${SP.cohort} cohort, starts ${SP.startShort}).`
    : `Hari Om Acharya ji, I would like to book the free open class on ${freeClass?.long ?? ''} for my child (${SP.name}).`;

  return (
    <div className="p-6 md:p-10 rounded-2xl border border-gold-mid bg-surface-1 text-left space-y-6">
      <fieldset className="space-y-3">
        <legend className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold mb-3">I would like to</legend>
        <div className="grid grid-cols-2 gap-2">
          {SP_FREE_CLASSES.map(c => (
            <label key={c.id} className={`cursor-pointer rounded-lg border px-3 py-3 text-center font-sans text-sm transition-colors ${choice === c.id ? 'border-gold-bright bg-gold-base/15 text-text-primary' : 'border-gold-dim text-text-secondary hover:border-gold-mid'}`}>
              <input type="radio" name="choice" value={c.id} checked={choice === c.id} onChange={() => setChoice(c.id)} className="sr-only" />
              Free class · {c.label}
            </label>
          ))}
        </div>
        <label className={`cursor-pointer block rounded-lg border px-3 py-3 text-center font-sans text-sm transition-colors ${choice === 'enrol' ? 'border-gold-bright bg-gold-base/15 text-text-primary' : 'border-gold-dim text-text-secondary hover:border-gold-mid'}`}>
          <input type="radio" name="choice" value="enrol" checked={choice === 'enrol'} onChange={() => setChoice('enrol')} className="sr-only" />
          Enrol directly in Level 1 (starts {SP.startShort})
        </label>
      </fieldset>

      <a
        href={whatsappLink(ref ? `${message} (${ref})` : message)}
        target="_blank" rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold hover:brightness-110"
      >
        <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
        {enrolling ? 'Reserve a seat' : 'Book on WhatsApp'}
        <ArrowRight className="w-4 h-4" />
      </a>

      <p className="font-sans text-xs text-text-tertiary text-center leading-relaxed">
        This opens WhatsApp with a ready message to the Acharya. You will get the class link there. This website does not collect your details.
      </p>
    </div>
  );
};

export const SamskaraPraveshaView: React.FC = () => {
  const facts = [
    { icon: CalendarDays, k: 'Starts', v: SP.startShort + ' 2026' },
    { icon: Clock, k: 'Classes', v: 'Mon & Fri · 6–7 PM IST' },
    { icon: Users, k: `${SP.cohort} cohort`, v: SP.seatsLeft === SP.seats ? `${SP.seats} seats · 10 early-bird` : `${SP.seatsLeft} seats left` },
    { icon: Languages, k: 'Taught in', v: 'Kannada & English' },
  ];

  return (
    <div className="overflow-x-clip">
      {/* ── HERO ── */}
      <section className="relative pt-28 md:pt-32 pb-14 px-4 md:px-12 bg-ground border-b border-gold-mid">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_80%_40%,rgba(224,163,46,0.12),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-7 text-left space-y-6">
            <FadeInSection direction="up" delay={50}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-gold-bright text-ground font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase font-bold">
                  <span className="w-6 h-6 rounded-full bg-ground text-gold-bright grid place-items-center text-xs" aria-hidden="true">★</span>
                  {SP.cohort} cohort · {SP.seatsLeft === SP.seats ? `${SP.seats} seats · 10 early-bird` : `${SP.seatsLeft} seats left`}
                </span>
                <span className="px-3 py-1.5 rounded-full border border-gold-mid font-mono text-[10px] md:text-[11px] tracking-[0.14em] uppercase text-text-primary">Ages {SP.ages} · Live online</span>
              </div>
            </FadeInSection>
            <FadeInSection direction="up" delay={120}>
              <h1 className="space-y-1">
                <span className="block font-serif font-bold text-text-primary text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.95]">Don’t just memorise shlokas.</span>
                <span className="block font-serif italic font-semibold text-gold-bright text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.95]">Understand Sanskrit.</span>
              </h1>
            </FadeInSection>
            <FadeInSection direction="up" delay={200}>
              <div className="space-y-2">
                <p className="font-kannada font-bold text-xl md:text-2xl text-text-primary">{SP.kannadaLine}</p>
                <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed max-w-xl">
                  <strong className="text-text-primary font-semibold">{SP.name}</strong> is an 18-month live online Sanskrit programme for children aged 8 to 14, taught in Kannada and English, with the Bhagavad Gita and value shlokas woven in.
                  It is led and taught live by {ACHARYA_NAME} of Bengaluru, together with fellow Acharyas of the Gurukula, and the first batch starts on Monday 7 December 2026.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection direction="up" delay={260}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#register" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold hover:brightness-110">
                  Book a free class <ArrowRight className="w-4 h-4" />
                </a>
                <a href={whatsappLink(`Hari Om Acharya ji, I would like to know about ${SP.name} for my child.`)} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg border border-gold-mid text-text-primary hover:border-gold-bright hover:text-gold-bright font-mono text-xs tracking-widest uppercase">
                  <WhatsAppIcon className="w-4 h-4 text-gold-bright" aria-hidden="true" /> Ask on WhatsApp
                </a>
              </div>
            </FadeInSection>
          </div>

          <div className="lg:col-span-5 relative h-[380px] sm:h-[460px]">
            <div className="absolute right-0 top-0 bottom-0 w-[70%] bg-gold-base rounded-t-sm" aria-hidden="true" />
            <p className="absolute right-3 top-3 sm:right-4 sm:top-4 font-devanagari text-ground/80 text-sm sm:text-lg" aria-hidden="true">{SP.devanagari}</p>
            <img src="/acharya-portrait.webp" alt={ACHARYA_NAME} width={1024} height={1065} fetchPriority="high"
              className="absolute bottom-0 right-0 h-[94%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 border border-gold-mid bg-surface-1">
          {facts.map((f, i) => (
            <div key={f.k} className={`p-5 md:p-6 text-left flex gap-3 items-start ${i % 2 ? 'border-l border-gold-dim' : ''} ${i >= 2 ? 'border-t md:border-t-0 border-gold-dim' : ''} ${i === 2 ? 'md:border-l' : ''}`}>
              <f.icon className="w-5 h-5 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-tertiary">{f.k}</p>
                <p className="font-sans text-sm md:text-base text-text-primary font-semibold mt-1">{f.v}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-24 md:space-y-28 pt-20 md:pt-24">
        {/* ── GAINS ── */}
        <section className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-left max-w-2xl space-y-3">
              <Label>What your child gains</Label>
              <h2 className="font-serif font-bold text-[clamp(2.2rem,5vw,3.4rem)] text-text-primary leading-[1]">What will my child gain? <span className="italic font-semibold text-gold-bright">Sanskrit, shlokas and samskara.</span></h2>
              <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">After 18 months, your child speaks simple Sanskrit with confidence, chants correctly, and carries shlokas and their meaning for life.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SP_GAINS.map((g, i) => (
                <FadeInSection key={g.title} direction="up" delay={100 + i * 70}>
                  <div className="h-full p-6 rounded-xl bg-surface-2 border border-gold-dim hover:border-gold-mid transition-colors text-left space-y-3">
                    <p className="font-devanagari text-3xl text-gold-bright font-bold">{g.deva}</p>
                    <h3 className="font-display font-bold text-lg text-text-primary">{g.title}</h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">{g.text}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOURNEY ── */}
        <section className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto border border-gold-mid bg-surface-1 p-6 md:p-12 space-y-10">
            <div className="text-left space-y-3">
              <Label>One clear path</Label>
              <h2 className="font-serif font-bold text-[clamp(2.2rem,5vw,3.4rem)] text-text-primary leading-[1]">How long is the programme? <span className="italic font-semibold text-gold-bright">18 months,</span> 6 levels, 144 live classes.</h2>
            </div>
            <ol className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {Array.from({ length: SP.levels }).map((_, i) => (
                <li key={i} className={`rounded-xl p-4 text-center border ${i === 0 ? 'bg-gradient-to-br from-gold-base to-gold-bright border-gold-bright text-ground' : 'border-gold-dim text-text-primary'}`}>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-80">Level</p>
                  <p className="font-display font-bold text-3xl leading-tight">{i + 1}</p>
                  <p className={`font-sans text-[11px] mt-1 ${i === 0 ? 'text-ground/80' : 'text-text-tertiary'}`}>{i === 0 ? `Starts ${SP.startShort}` : '24 classes'}</p>
                </li>
              ))}
            </ol>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {SP_HOW.map(h => (
                <div key={h.title} className="border-l-2 border-gold-base pl-4 space-y-1.5">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wide text-text-primary">{h.title}</h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">{h.text}</p>
                </div>
              ))}
            </div>
            <p className="font-sans text-xs text-text-tertiary text-left">{SP.breakNote}</p>
          </div>
        </section>

        {/* ── ACHARYA ── */}
        <section className="px-4 md:px-12">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
            <div className="md:col-span-4 relative h-[300px] overflow-hidden rounded-xl max-w-xs w-full">
              <div className="absolute inset-x-6 top-10 bottom-0 bg-gold-base rounded-t-lg" aria-hidden="true" />
              <img src="/acharya-portrait.webp" alt="" loading="lazy" width={1024} height={1065} className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none object-contain object-bottom" />
            </div>
            <div className="md:col-span-8 space-y-4">
              <Label>Leading the programme</Label>
              <h2 className="font-serif font-bold text-[clamp(2rem,4.5vw,3rem)] text-text-primary leading-[1]">{ACHARYA_NAME}</h2>
              <p className="font-sans text-[15px] text-text-secondary leading-relaxed">
                I studied for seven years, from 2018 to 2025, at Veda Vijnana Gurukulam in Bengaluru: Sanskrit grammar, Krishna Yajurveda and the Bhagavad Gita with its classical commentary.
                Today I teach children and adults online. With children, my aim is simple: clean pronunciation, real understanding, and the quiet confidence a Gurukula gives.
              </p>
              <Link to="/about" className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] uppercase text-text-gold hover:text-gold-bright">
                More about the Acharya <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── GURU DAKSHINA ── */}
        <section className="px-4 md:px-12">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <Label>Guru Dakshina</Label>
              <h2 className="font-serif font-bold text-[clamp(2.2rem,5vw,3.4rem)] text-text-primary leading-[1]">What is the Guru Dakshina? <span className="italic font-semibold text-gold-bright">Choose what suits your family.</span></h2>
              <p className="font-sans text-sm text-text-secondary max-w-xl mx-auto">Each live class is valued at about ₹225. The free open class comes first, so you decide only after your child has tried it.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SP_DAKSHINA.map(d => (
                <div key={d.title} className={`relative p-7 rounded-2xl text-left space-y-3 border ${d.best ? 'border-gold-bright bg-surface-1' : 'border-gold-dim bg-surface-2'}`}>
                  {d.best && <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gold-bright text-ground font-mono text-[9px] tracking-[0.18em] uppercase font-bold">Most committed</span>}
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-tertiary">{d.title}</p>
                  <p className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-display font-bold text-4xl text-gold-bright">{d.amount}</span>
                    {d.was && <s className="font-sans text-base text-text-tertiary">{d.was}</s>}
                  </p>
                  <p className="font-sans text-sm text-text-primary">{d.note}</p>
                  {'early' in d && d.early && (
                    <p className="inline-block px-3 py-1 rounded-full border border-gold-bright text-gold-bright font-mono text-[10px] tracking-[0.12em] uppercase">{d.early}</p>
                  )}
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">{d.detail}</p>
                </div>
              ))}
            </div>
            {/* Side-by-side comparison: every figure is arithmetic on the prices above */}
            <div className="max-w-4xl mx-auto space-y-5">
              <div className="text-center space-y-2">
                <Label>Compare</Label>
                <h3 className="font-serif font-bold text-[clamp(1.6rem,3.4vw,2.2rem)] text-text-primary leading-[1.05]">The same classes, three ways to pay</h3>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-gold-dim bg-surface-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th scope="col" className="py-2 pl-4 pr-2 md:p-4 w-[25%] md:w-[28%]"><span className="sr-only">What you compare</span></th>
                      {SP_COMPARE.columns.map((c, i) => (
                        <th key={c} scope="col" className={`p-2 md:p-4 font-mono text-[9px] md:text-[11px] tracking-[0.08em] md:tracking-[0.18em] uppercase align-bottom ${i === 2 ? 'bg-gold-bright text-ground' : 'text-text-tertiary'}`}>
                          {c}{i === 2 && <span className="block mt-1 text-[9px] tracking-[0.16em] opacity-80">Best value</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SP_COMPARE.rows.map(r => (
                      <tr key={r.label} className="border-t border-gold-dim">
                        <th scope="row" className="py-2 pl-4 pr-2 md:p-4 font-sans text-xs md:text-sm font-normal text-text-secondary align-top">{r.label}</th>
                        {r.values.map((v, i) => (
                          <td key={i} className={`p-2 md:p-4 font-sans text-xs md:text-sm align-top ${i === 2 ? 'bg-surface-2 text-gold-bright font-semibold border-x border-gold-bright' : 'text-text-primary'}`}>
                            {v}
                            {i === 2 && 'after' in r && r.after && <span className="block mt-1 font-normal text-[10px] md:text-xs text-text-tertiary">{r.after}</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-sans text-xs text-text-tertiary text-center">{SP_COMPARE.note}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {SP_COMPARE.benefits.map(b => (
                  <li key={b} className="flex gap-3 items-start p-4 rounded-xl border border-gold-dim bg-surface-2">
                    <CheckCircle className="w-5 h-5 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-sans text-sm text-text-primary leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={SP.razorpay} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-[11px] tracking-widest uppercase font-semibold hover:brightness-110">
                  Begin Level 1 · ₹4,749 <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href={SP.razorpayFull} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-gold-bright text-gold-bright font-mono text-[11px] tracking-widest uppercase font-semibold hover:bg-surface-2">
                  Full journey · ₹27,515 <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
              <p className="font-sans text-xs text-text-tertiary">
                Early-bird prices for the first 10 seats. Each button opens Razorpay’s secure page. You will get the class link on WhatsApp after your payment. Questions first?{' '}
                <a href={whatsappLink('Hari Om Acharya ji, I have a question about Samskrita Samskara Pravesha for my child.')} target="_blank" rel="noopener noreferrer" className="underline hover:text-text-gold">Message the Acharya on WhatsApp</a>.
              </p>
            </div>
            <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer"
              className="max-w-3xl mx-auto p-6 rounded-xl border border-gold-bright bg-surface-1 flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-left hover:bg-surface-2 transition-colors">
              <div className="flex gap-4 items-start">
                <WhatsAppIcon className="w-6 h-6 text-gold-bright shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-sans text-sm text-text-primary font-semibold">{SP_COMMUNITY.note}</p>
                  <p className="font-sans text-xs text-text-secondary mt-1">Join the community. The Acharya will send you the link on WhatsApp when the early-bird seats are gone.</p>
                </div>
              </div>
              <span className="font-display font-bold text-3xl text-gold-bright shrink-0">{SP_COMMUNITY.amount}</span>
            </a>
            <div className="max-w-3xl mx-auto p-6 rounded-xl border border-gold-mid bg-surface-1 flex gap-4 items-start text-left">
              <CheckCircle className="w-6 h-6 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                <strong className="text-text-primary">Founding Shishyas of the {SP.cohort} cohort:</strong> the first {SP.seats} children keep their per-level Guru Dakshina fixed for all six levels (no increase later),
                and receive a Founding Batch certificate at the end of Level 1.
              </p>
            </div>
          </div>
        </section>

        {/* ── REGISTER ── */}
        <section id="register" className="scroll-mt-24 px-4 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 text-left space-y-5">
              <Label>Free open class · 6 PM IST</Label>
              <h2 className="font-serif font-bold text-[clamp(2.2rem,5vw,3.4rem)] text-text-primary leading-[1]">Let your child <span className="italic font-semibold text-gold-bright">try a real class</span> first.</h2>
              <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">Choose a date and message the Acharya on WhatsApp. You’ll get the class link there. Or reserve a Founding seat directly if you’re ready.</p>
              <ul className="space-y-2">
                {SP_FREE_CLASSES.map(c => (
                  <li key={c.id} className="flex items-center gap-3 font-sans text-sm text-text-primary"><CalendarDays className="w-4 h-4 text-gold-bright" aria-hidden="true" />{c.long}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7"><RegisterForm /></div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQ data={SP_FAQ.map((f, i) => ({ id: `sp${i}`, ...f }))} />
        <div className="pb-8" />
      </div>
    </div>
  );
};
