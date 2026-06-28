/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldAlert, BookOpen, GraduationCap, Calendar, Compass, Milestone, Sparkles } from 'lucide-react';
import { TIMELINE_ITEMS, CREDENTIALS_ITEMS } from '../data';
import { PageView } from '../types';
import { FAQ } from '../components/FAQ';

interface AboutViewProps {
  onViewChange: (view: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onViewChange }) => {
  const handleNavClick = (view: PageView) => {
    onViewChange(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stage1Studies = [
    { label: 'Yajur Veda', desc: 'Krishnayajurveda (Aranyaka Recital) & Pujavidhi rituals.' },
    { label: 'Yoga Shastra', desc: 'Asanani postures, Pranayama breath controls, Meditation & Kriyas.' },
    { label: 'Vedanta Intro', desc: 'Foundational Prakaranagranthah (Tattva Bodha, Atma Bodha, Vivekacudamani).' },
    { label: 'Vyakarana', desc: 'Sanskrit Grammar basics via Paninian rules in Laghukaumudi.' },
    { label: 'Nyaya Epistemology', desc: 'Tarkasangraha with Dipika, Muktavali, and Dinakari logics.' },
    { label: 'Mimamsa', desc: 'Exegesis and ritual analysis via Nyayaprakasa structures.' }
  ];

  const stage2Studies = [
    { label: 'Taittiriya Veda', desc: 'Krishnayajurveda Samhita and Brahmana chanting oral masteries.' },
    { label: 'Prasthanatrayam', desc: 'Shankaracharya Bhashya (commentaries) on Upanishads, Bhagavad Gita, & Brahma Sutras.' },
    { label: 'Kaumudi Grammar', desc: 'Advanced Paninian rules and Sanskrit semantics via Siddhantakaumudi.' },
    { label: 'Vedanta Epistemology', desc: 'Epistemology studies via Vedantaparibhasa and Siddhantalesasangrahah.' },
    { label: 'Advanced Polemics', desc: 'Dialectics via Bhamati (Upanishadic glosses) and Advaitasiddhih.' },
    { label: 'Field Methodology', desc: 'Upanishadic learning methodologies, research methods, and field teaching.' }
  ];

  const aboutFaqData = [
    {
      id: 'faq1',
      question: 'What does the traditional Gurukula format entail?',
      answer: 'The traditional Gurukula format is an immersive, highly disciplined learning environment. It emphasizes an unaltered oral transmission (Parampara) of knowledge, strict adherence to daily rituals, and a deep, continuous engagement with the shastras under the direct guidance of an Acharya.'
    },
    {
      id: 'faq2',
      question: 'How are the class schedules structured?',
      answer: 'Schedules are aligned with traditional rhythms, often beginning in the Brahma Muhurta (early morning). While our digital cohorts adapt to modern realities, we maintain a rigorous cadence of live sessions, individual practice (Svadhyaya), and regular assessments to ensure continuous progress.'
    },
    {
      id: 'faq3',
      question: 'What level of commitment is expected from a student?',
      answer: 'We expect a high level of dedication. This is not a casual course. Students must commit to regular attendance, daily practice, and a disciplined approach to study. The journey to mastering Sanskrit and the shastras requires patience, humility, and sustained effort.'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-32">
      {/* SECTION 1 - Page Hero */}
      <section className="relative pt-32 pb-16 bg-[#0E0B07] border-b border-gold-mid overflow-hidden px-4 md:px-12 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#1F160D_0%,transparent_100%)] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 text-left space-y-4">
            <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse-slow" /> THE ACHARYA STORY • SAMPRADAYA TRUST
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight leading-tight">
              Meet the Scholar: <br />
              <span className="font-medium text-text-gold">Vishweshwara M</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              An Indologist, Sanskritist, and traditional educator who spent seven continuous years under residential vow at Veda Vijnana Gurukulam, undergoing strict, unaltered Vedic lineages.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-mid/20 rounded-xl translate-x-3 translate-y-3"></div>
              <img 
                src="./acharya-photo.jpeg" 
                alt="Acharya Vishweshwara M" 
                className="relative z-10 w-64 h-auto rounded-xl object-cover border border-gold-dim shadow-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute -bottom-4 -left-4 z-20 inline-flex items-center space-x-2 border border-gold-mid px-4 py-2.5 rounded bg-surface-2 font-mono text-xs text-text-gold tracking-wider uppercase shadow-lg">
                <Compass className="w-4 h-4 text-text-gold" />
                <span>Lineage-Authorized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - Philosophy Banner (One Sanskrit verse centered) */}
      <section className="text-center py-6 border-y border-gold-dim bg-surface-1/50 px-6 max-w-7xl mx-auto select-none">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#C8860A]/60 uppercase block mb-3">Core Upanishadic Mandate</span>
        <p className="font-devanagari text-2xl md:text-3xl text-text-gold font-light tracking-widest leading-relaxed">
          ॥ स्वाध्यायान्मा प्रमदः ॥
        </p>
        <p className="font-serif text-sm italic text-text-secondary mt-2 tracking-widest">
          "Svadhyayan-ma pramadah" — Do not neglect self-study and deep contemplation of your true self.
        </p>
      </section>

      {/* SECTION 3 - Story Long-Form Prose */}
      <section className="max-w-4xl mx-auto px-6 text-left space-y-8 select-none">
        <h2 className="font-display text-3xl font-light text-text-primary tracking-tight">
          A Journey of Rigor, <span className="font-medium text-text-gold">Silence & Inquiry</span>
        </h2>

        <p className="font-sans text-lg text-text-secondary leading-relaxed font-light">
          At age eighteen, while his contemporaries integrated into corporate colleges, Vishweshwara chose a different path—the residential vow of a Gurukula resident. For seven continuous years, he resided within the peaceful bounds of Veda Vijnana Gurukulam, living a highly disciplined lifestyle governed by early rising (Brahma Muhurta), daily worship, and intensive shastra adhyayana (academic focus).
        </p>

        <p className="font-sans text-base text-text-secondary leading-relaxed">
          The instruction at Gurukula follows an unaltered oral chain of transmission dating back to Adi Shankaracharya. This structure demands total precision. Chanting Vedas requires literal phonetic training where every pitch deviation (Svara) alters the cosmic significance of a mantra. Pairwise with oral chants, Vishweshwara studied Paninian grammar (Vyakarana) to understand how Sanskrit structures itself, and Indian logic systems (Nyaya) to construct sound arguments.
        </p>

        <p className="font-sans text-base text-text-secondary leading-relaxed">
          "Sanskrit is not a dead language or a relic of the past," Vishweshwara writes. "It is an incredibly precise scientific and spiritual coding system that unlocks deep layers of human consciousness. To teach it is my Dharma—a sacred duty to pass the light unaltered to modern minds across the globe."
        </p>
      </section>

      {/* SECTION 4 - Formation Timeline */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 space-y-12 select-none">
        <div className="space-y-3 text-center">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">CHRONOLOGY OF TRAINING</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
            The Making of a <span className="font-medium text-text-gold">Sanskrit Scholar</span>
          </h2>
        </div>

        {/* Vertical Timeline - 2 Column Layout */}
        <div className="relative border-l border-gold-mid/40 max-w-3xl mx-auto pl-6 md:pl-10 space-y-12 py-4">
          {TIMELINE_ITEMS.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#060504] border-2 border-text-gold group-hover:bg-gold-bright transition-colors duration-200 z-10"></div>
              
              <div className="space-y-2 text-left">
                <span className="inline-flex items-center space-x-1 font-mono text-[11px] tracking-widest text-text-gold uppercase bg-gold-dim px-2.5 py-0.5 rounded border border-gold-dim">
                  <Calendar className="w-3 h-3" />
                  <span>{item.year}</span>
                </span>
                <h3 className="font-serif text-xl text-text-primary font-semibold group-hover:text-text-gold transition-colors">
                  {item.title}
                </h3>
                <h4 className="font-mono text-xs text-text-tertiary uppercase tracking-wider">{item.subtitle}</h4>
                <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 - Credential Bento Grid (Stage 1 & Stage 2 details) */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 space-y-12 select-none">
        <div className="space-y-3 text-center">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">THE ACADEMIC SPECTRUM</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
            Unpacking the <span className="font-medium">Curriculum of Mastery</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-text-secondary max-w-xl mx-auto">
            Traditional Gurukula learning is split into intense phases. Below are the actual areas of shastra research and practice completed by Vishweshwara:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {/* Stage 1 Container */}
          <div className="bg-surface-2 border border-gold-mid/40 p-8 rounded-xl space-y-6 shadow-lg">
            <div className="border-b border-gold-dim pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-wider text-text-gold uppercase block">PHASE 01</span>
                <h3 className="font-serif text-2xl text-text-primary font-medium">Stage 1: Primary Foundations</h3>
              </div>
              <span className="font-mono text-xs tracking-wider text-text-tertiary uppercase border border-gold-dim px-2 py-1 rounded">
                First 2 Years
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stage1Studies.map((sub, idx) => (
                <div key={idx} className="space-y-1 p-3 bg-surface-3/40 rounded border border-transparent hover:border-gold-dim hover:bg-surface-3 transition-colors">
                  <span className="font-mono text-[11px] tracking-wider text-text-primary uppercase font-bold block">{sub.label}</span>
                  <p className="font-sans text-xs text-text-secondary leading-normal">{sub.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stage 2 Container */}
          <div className="bg-surface-2 border border-gold-mid/40 p-8 rounded-xl space-y-6 shadow-lg">
            <div className="border-b border-gold-dim pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-wider text-text-gold uppercase block">PHASE 02</span>
                <h3 className="font-serif text-2xl text-text-primary font-medium">Stage 2: Advanced Exegesis</h3>
              </div>
              <span className="font-mono text-xs tracking-wider text-text-tertiary uppercase border border-gold-dim px-2 py-1 rounded">
                Next 5 Years
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stage2Studies.map((sub, idx) => (
                <div key={idx} className="space-y-1 p-3 bg-surface-3/40 rounded border border-transparent hover:border-gold-dim hover:bg-surface-3 transition-colors">
                  <span className="font-mono text-[11px] tracking-wider text-text-primary uppercase font-bold block">{sub.label}</span>
                  <p className="font-sans text-xs text-text-secondary leading-normal">{sub.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - FAQ */}
      <FAQ data={aboutFaqData} />

      {/* SECTION 7 - Vision Section (Centered, OM watermark) */}
      <section className="relative py-20 bg-surface-1 border-t border-gold-mid overflow-hidden text-center px-4 md:px-12 select-none">
        {/* Absolute OM watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <span className="font-devanagari text-[20rem] md:text-[32rem] text-gold-base leading-none">
            ॐ
          </span>
        </div>

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">VISION FOR 2026 & BEYOND</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
            Building the <span className="font-medium text-text-gold">Digital Gurukula</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
            "My ultimate vision is to bridge the gap between ancient rigorous Gurukula disciplines and modern digital convenience. I desire to create an online sanctuary where any earnest seeker, regardless of corporate location, can access unaltered Sanskrit texts with absolute purity and trust."
          </p>
          <div className="pt-4">
            <Link
              to="/begin"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block px-6 py-3.5 rounded bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold active:scale-95 transition-all shadow-md hover:shadow-lg text-center"
            >
              Enquire and Join My Cohort
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
