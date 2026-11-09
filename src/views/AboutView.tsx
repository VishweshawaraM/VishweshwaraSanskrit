import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Mic, BookOpen, Users, Sunrise, Star } from 'lucide-react';
import { STATS_ITEMS, TIMELINE_ITEMS } from '../data';
import { PageView } from '../types';
import { FAQ } from '../components/FAQ';
import { FadeInSection } from '../components/FadeInSection';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { GOOGLE_REVIEWS_URL } from '../components/GoogleVerified';
import { ABOUT_STORY, ABOUT_STUDIES, ABOUT_DEGREES, ABOUT_FAQ } from '../aboutContent';
import { ACHARYA_NAME, WHATSAPP_COMMUNITY_URL, whatsappLink } from '../courses';

interface AboutViewProps {
  onViewChange: (view: PageView) => void;
}

const TALK_LINK = whatsappLink('Hari Om Acharya ji, I read about you on your website and would like to talk about classes.');

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-text-gold block ${className}`}>{children}</span>
);

const stats = [
  { value: STATS_ITEMS[0].value, label: 'Years of Gurukula\ntraining' },
  { value: STATS_ITEMS[1].value, label: 'Countries my\nstudents live in' },
  { value: STATS_ITEMS[2].value, label: 'Live classes\ntaught' },
  { value: STATS_ITEMS[3].value, label: 'Subjects\nI teach' },
];

const ways = [
  { icon: Mic, title: 'Sound first', text: 'Every letter and svara is corrected live, from the first class. Clean pronunciation is the foundation of everything else.' },
  { icon: BookOpen, title: 'Word by word', text: 'We read the original text and understand each word, so students never depend only on a translation.' },
  { icon: Users, title: 'Every voice heard', text: 'One-to-one, or small groups. I hear every student, every class, and correct what needs correcting.' },
  { icon: Sunrise, title: 'Gurukula discipline', text: 'Regular practice, respect for the text, steady habits. Taught with warmth, never with fear.' },
];



const teachTiles = [
  { slug: 'sanskrit', title: 'Sanskrit', devanagari: 'संस्कृतम्', note: 'Beginner to advanced · kids & adults', tone: 'dark' },
  { slug: 'bhagavad-gita', title: 'Bhagavad\nGita', devanagari: 'गीता', note: 'Word by word · kids & adults', tone: 'light' },
  { slug: 'krishna-yajurveda', title: 'Krishna\nYajurveda', devanagari: 'वेदः', note: 'Traditional chanting · groups of 4–5', tone: 'dark' },
] as const;



export const AboutView: React.FC<AboutViewProps> = () => {
  return (
    <div className="overflow-x-clip">
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-32 px-4 md:px-12 bg-ground">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-end">
          {/* Words */}
          <div className="lg:col-span-7 text-left space-y-7 pb-4 lg:pb-16 relative z-10">
            <FadeInSection direction="up" delay={50}>
              <Label>✦ About the Acharya · आचार्यः</Label>
            </FadeInSection>

            <FadeInSection direction="up" delay={120}>
              <h1 className="font-condensed uppercase text-text-primary leading-[0.88] tracking-tight">
                <span className="block text-[clamp(3.6rem,11vw,7.5rem)]">
                  Acharya <span className="text-gold-bright align-top text-[0.6em]">✦</span>
                </span>
                <span className="block text-[clamp(3rem,10.2vw,8.2rem)]">Vishweshwara</span>
                <span className="sr-only"> N M</span>
              </h1>
            </FadeInSection>

            <FadeInSection direction="up" delay={200}>
              <p className="font-display font-bold uppercase text-[1.05rem] sm:text-[1.25rem] lg:text-[1.45rem] leading-snug tracking-tight">
                <span className="text-text-primary block">I teach Sanskrit, Veda and the Gita</span>
                <span className="text-gold-bright block">the way a Gurukula teaches.</span>
              </p>
            </FadeInSection>

            <FadeInSection direction="up" delay={260}>
              <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-lg">
                Seven years of traditional Gurukula study, 2018 to 2025. Today I teach children and adults
                across India, the USA, Australia and the UAE, live and online, one student at a time.
              </p>
            </FadeInSection>

            <FadeInSection direction="up" delay={320}>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href={TALK_LINK} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3">
                  <span className="w-12 h-12 rounded-full bg-gold-base group-hover:bg-gold-bright flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-ground group-hover:rotate-45 transition-transform" />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-text-primary group-hover:text-gold-bright transition-colors">
                    Talk with me
                  </span>
                </a>
                <Link to="/teachings" className="font-mono text-[11px] tracking-[0.2em] uppercase text-text-tertiary hover:text-gold-bright transition-colors inline-flex items-center gap-1.5">
                  See my courses <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </FadeInSection>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-5 relative h-[440px] sm:h-[540px] lg:h-[640px]">
            <div className="absolute right-0 top-0 bottom-0 w-[72%] bg-gold-base rounded-t-sm" aria-hidden="true">
              <div className="absolute top-5 right-5 text-right font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-ground/80 leading-relaxed">
                Based in<br />Bengaluru
              </div>
              <div className="absolute right-6 top-24 bottom-24 w-px bg-ground/25" />
              <div className="absolute left-0 right-0 top-[38%] h-px bg-ground/15" />
            </div>
            <img
              src="/acharya-portrait.webp"
              alt={ACHARYA_NAME}
              width={1024}
              height={1065}
              fetchPriority="high"
              className="absolute bottom-0 right-0 h-[86%] sm:h-[96%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
            />

            {/* Rotating badge */}
            <div className="absolute left-0 sm:left-2 bottom-16 sm:bottom-24 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-text-primary text-ground shadow-2xl flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full motion-safe:animate-[spin_28s_linear_infinite]" aria-hidden="true">
                <defs>
                  <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="font-mono" fontSize="7.4" letterSpacing="1.6" fill="currentColor">
                  <textPath href="#badge-circle">GURUKULA TRAINED • 2018–2025 • ONLINE •</textPath>
                </text>
              </svg>
              <span className="relative text-center font-condensed uppercase leading-none text-[13px] sm:text-[15px]">
                Now<br /><span className="text-gold-base">accepting</span><br />students
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS STRIP ───────────────────────────────────── */}
      <section className="px-4 md:px-12 bg-ground">
        <div className="max-w-7xl mx-auto bg-surface-1 border border-gold-mid grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 md:px-8 py-6 md:py-8 text-left ${i % 2 === 1 ? 'border-l border-gold-dim' : ''} ${i >= 2 ? 'border-t md:border-t-0 border-gold-dim' : ''} ${i === 2 ? 'md:border-l' : ''}`}
            >
              <p className="font-condensed text-[clamp(2.75rem,6vw,3.75rem)] text-gold-bright leading-none">{s.value}</p>
              <p className="mt-3 font-mono text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-text-primary whitespace-pre-line leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-24 md:space-y-32 pt-24 md:pt-32">
        {/* ── 3. WHAT I TEACH ─────────────────────────────────── */}
        <section className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2 className="font-condensed uppercase text-[clamp(2.5rem,6vw,3.75rem)] text-text-primary leading-none">What I teach</h2>
              <Link to="/teachings" className="font-mono text-[11px] tracking-[0.2em] uppercase text-text-gold hover:text-gold-bright inline-flex items-center gap-1.5">
                All courses <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {teachTiles.map(t => {
                const light = t.tone === 'light';
                return (
                  <Link
                    key={t.slug}
                    to={`/courses/${t.slug}`}
                    className={`group relative overflow-hidden min-h-[260px] md:min-h-[340px] p-6 md:p-7 flex flex-col justify-between border transition-transform hover:-translate-y-1 ${
                      light ? 'bg-text-primary border-text-primary' : 'bg-surface-1 border-gold-mid'
                    }`}
                  >
                    {light && <div className="absolute right-0 top-0 w-1/3 h-1/2 bg-gold-base" aria-hidden="true" />}
                    <span
                      className={`absolute -right-2 bottom-2 font-devanagari font-bold text-[6.5rem] md:text-[7.5rem] leading-none select-none ${light ? 'text-ground/[0.07]' : 'text-gold-base/[0.14]'}`}
                      aria-hidden="true"
                    >
                      {t.devanagari}
                    </span>
                    <h3 className={`relative font-condensed uppercase text-[clamp(2.75rem,6vw,3.75rem)] leading-[0.9] whitespace-pre-line ${light ? 'text-ground' : 'text-text-primary'}`}>
                      {t.title}
                    </h3>
                    <div className="relative flex items-end justify-between gap-3">
                      <span className={`font-mono text-[10px] tracking-[0.16em] uppercase ${light ? 'text-ground/70' : 'text-text-tertiary'}`}>{t.note}</span>
                      <ArrowUpRight className={`w-6 h-6 shrink-0 group-hover:rotate-45 transition-transform ${light ? 'text-ground' : 'text-gold-bright'}`} />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {[
                { slug: 'advaita-vedanta', title: 'Advaita Vedanta', note: 'One-to-one only' },
                { slug: 'stotras', title: 'Stotras', note: 'Vishnu & Lalita Sahasranama and more' },
              ].map(t => (
                <Link
                  key={t.slug}
                  to={`/courses/${t.slug}`}
                  className="group flex items-center justify-between gap-4 px-6 py-5 bg-surface-1 border border-gold-mid hover:border-gold-bright transition-colors"
                >
                  <div className="min-w-0">
                    <h3 className="font-condensed uppercase text-[1.6rem] md:text-[1.9rem] text-text-primary leading-none">{t.title}</h3>
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-text-tertiary mt-2 block">{t.note}</span>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gold-bright shrink-0 group-hover:rotate-45 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. HOW I TEACH ──────────────────────────────────── */}
        <section className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 border border-gold-mid">
            <div className="lg:col-span-4 bg-gold-base p-8 md:p-10 flex flex-col justify-between min-h-[200px]">
              <h2 className="font-condensed uppercase text-[clamp(2.75rem,6vw,3.75rem)] text-ground leading-[0.92]">How<br />I teach</h2>
              <ArrowDownRight className="w-10 h-10 text-ground self-end" aria-hidden="true" />
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 bg-surface-1">
              {ways.map((w, i) => (
                <div
                  key={w.title}
                  className={`flex gap-4 p-6 md:p-8 text-left ${i % 2 === 1 ? 'sm:border-l border-gold-dim' : ''} ${i >= 1 ? 'border-t sm:border-t-0 border-gold-dim' : ''} ${i >= 2 ? 'sm:border-t' : ''}`}
                >
                  <div className="w-11 h-11 rounded-full border border-gold-base flex items-center justify-center shrink-0">
                    <w.icon className="w-5 h-5 text-gold-bright" aria-hidden="true" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold uppercase text-sm tracking-wide text-text-primary">{w.title}</h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">{w.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. MY STORY ─────────────────────────────────────── */}
        <section className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
            <div className="lg:col-span-5 text-left space-y-6">
              <Label>✦ My story</Label>
              <h2 className="font-condensed uppercase text-[clamp(2.2rem,5vw,3.4rem)] text-text-primary leading-[0.95]">
                A Gurukula shapes a person, <span className="text-gold-bright">not only a mind.</span>
              </h2>
              <div className="space-y-4 font-sans text-[15px] text-text-secondary leading-relaxed">
                {ABOUT_STORY.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
              </div>
              <p className="font-serif italic text-[2.5rem] text-gold-bright pt-2" aria-label="Signed, Vishweshwara">Vishweshwara</p>
            </div>

            <div className="hidden lg:block lg:col-span-3 relative h-[460px] self-start overflow-hidden w-full">
              <div className="absolute left-[22%] right-0 top-10 bottom-0 bg-gold-base" aria-hidden="true" />
              <img
                src="/acharya-portrait.webp"
                alt=""
                loading="lazy"
                width={1024}
                height={1065}
                className="absolute bottom-0 left-1/2 -translate-x-[46%] h-full w-auto max-w-none object-contain object-bottom"
              />
            </div>

            <div className="lg:col-span-4 text-left lg:border-l border-gold-dim lg:pl-10 space-y-6 lg:col-start-9">
              <Label>What I studied</Label>
              <ul className="space-y-5">
                {ABOUT_STUDIES.map(s => (
                  <li key={s.subject} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display font-bold uppercase text-sm tracking-wide text-text-primary">{s.subject}</span>
                    </div>
                    <p className="font-sans text-xs text-text-tertiary">{s.detail}</p>
                    <div className="h-[3px] bg-gold-dim"><div className="h-full w-full bg-gradient-to-r from-gold-base to-gold-bright" /></div>
                  </li>
                ))}
              </ul>
              <div className="pt-2 flex flex-wrap gap-2">
                {ABOUT_DEGREES.map(d => (
                  <span key={d} className="px-3 py-1.5 border border-gold-mid font-mono text-[10px] tracking-[0.12em] uppercase text-text-primary">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. THE YEARS ────────────────────────────────────── */}
        <section className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto space-y-10">
            <h2 className="font-condensed uppercase text-[clamp(2.5rem,6vw,3.75rem)] text-text-primary leading-none text-left">Seven years, step by step</h2>
            <ol className="grid grid-cols-1 md:grid-cols-5 gap-px bg-gold-dim border border-gold-dim">
              {TIMELINE_ITEMS.map(item => (
                <li key={item.id} className="bg-ground p-6 text-left space-y-3">
                  <p className="font-condensed text-[2.5rem] text-gold-bright leading-none">{item.year}</p>
                  <h3 className="font-display font-bold uppercase text-xs tracking-wide text-text-primary">{item.title}</h3>
                  <p className="font-sans text-xs text-text-tertiary leading-relaxed">{item.subtitle}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 7. STUDENTS FROM ────────────────────────────────── */}
        <section className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto border-y border-gold-dim py-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
            <span className="font-condensed uppercase text-[1.3rem] text-gold-bright shrink-0">Students from</span>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 flex-1">
              {['India', 'USA', 'Australia', 'UAE', 'and more'].map(c => (
                <li key={c} className={`font-mono text-sm tracking-[0.2em] uppercase ${c === 'and more' ? 'text-text-tertiary' : 'text-text-primary'}`}>{c}</li>
              ))}
            </ul>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-text-primary hover:text-gold-bright transition-colors shrink-0"
            >
              <Star className="w-4 h-4 text-gold-bright fill-gold-bright" aria-hidden="true" />
              Reviews on Google <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* ── 8. FAQ ──────────────────────────────────────────── */}
        <FAQ data={ABOUT_FAQ} />

        {/* ── 9. LET'S BEGIN ──────────────────────────────────── */}
        <section className="px-4 md:px-12 pb-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 border border-gold-mid">
            <div className="lg:col-span-7 bg-gold-base p-8 md:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              <h2 className="font-condensed uppercase text-[clamp(2.75rem,7vw,4.5rem)] text-ground leading-[0.9]">
                Let’s begin<br />learning<br />together.
              </h2>
              <a
                href={TALK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Talk with the Acharya on WhatsApp"
                className="group w-24 h-24 md:w-28 md:h-28 rounded-full bg-ground flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
              >
                <ArrowUpRight className="w-10 h-10 text-gold-bright group-hover:rotate-45 transition-transform" />
              </a>
            </div>
            <div className="lg:col-span-5 bg-surface-1 p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-8 text-left">
              <div className="space-y-3">
                <Label>Get in touch</Label>
                <p className="font-sans text-[13px] text-text-primary break-words select-all">namaste@<wbr />vishweshwarasanskrit.com</p>
                <p className="font-sans text-sm text-text-primary select-all">+91 94826 98612</p>
                <p className="font-sans text-sm text-text-tertiary">Bengaluru, India</p>
              </div>
              <div className="space-y-3">
                <Label>Follow</Label>
                <ul className="space-y-2 font-sans text-sm">
                  <li>
                    <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-text-primary hover:text-gold-bright">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-gold-bright" aria-hidden="true" /> WhatsApp Community
                    </a>
                  </li>
                  <li><a href="https://www.instagram.com/vishweshwara_sanskrit?igsh=MThoZ255OGlvZnVxcQ==" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-gold-bright">Instagram</a></li>
                  <li><a href="https://www.facebook.com/share/18inj2iS8o/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-gold-bright">Facebook</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
