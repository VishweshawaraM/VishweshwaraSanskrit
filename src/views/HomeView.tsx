/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Award, Sparkles, BookOpen, Quote, Shield, Globe } from 'lucide-react';
import { STATS_ITEMS, CREDENTIALS_ITEMS, SUBJECTS_ITEMS } from '../data';
import { PageView } from '../types';
import { FadeInSection } from '../components/FadeInSection';
import { Button } from '../components/Button';

interface HomeViewProps {
  onViewChange: (view: PageView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onViewChange }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);

  // Handle counter animations on load
  useEffect(() => {
    const targets = [7, 20, 5, 100];
    const intervals = targets.map((target, idx) => {
      const step = Math.ceil(target / 40) || 1;
      return setInterval(() => {
        setCounters((prev) => {
          const next = [...prev];
          if (next[idx] < target) {
            next[idx] = Math.min(target, next[idx] + step);
          }
          return next;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const handleNavClick = (view: PageView) => {
    onViewChange(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const countries = [
    { name: 'India', code: 'IN', flag: '🇮🇳' },
    { name: 'United States', code: 'US', flag: '🇺🇸' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪' },
    { name: 'United Kingdom', code: 'UK', flag: '🇬🇧' },
    { name: 'Singapore', code: 'SG', flag: '🇸🇬' },
    { name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
    { name: 'Russia', code: 'RU', flag: '🇷🇺' },
    { name: 'Australia', code: 'AU', flag: '🇦🇺' }
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      {/* SECTION 1 - Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden px-6 md:px-12 select-none">
        {/* Background glow stack */}
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-gold-base/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-ruby-mid/5 blur-[100px] pointer-events-none"></div>

        {/* Outer Grid lines for a modern architectural look */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#161008_1px,transparent_1px),linear-gradient(to_bottom,#161008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <FadeInSection delay={100}>
              <div className="space-y-3">
                <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> A LIVING GURUKULA • DIGITAL ERA
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-text-primary tracking-tight leading-none">
                  Ancient Wisdom. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-base via-gold-bright to-gold-glow font-medium">
                    Live. Personal.
                  </span>
                </h1>
              </div>
            </FadeInSection>

            {/* Strategic Placement of Sanskrit Verse */}
            <FadeInSection delay={200}>
              <div className="border-l-2 border-gold-base pl-4 py-1 bg-gold-dim">
                <p className="font-devanagari text-xl text-text-gold tracking-wide leading-relaxed">
                  ॥ विद्या ददाति विनयम् ॥
                </p>
                <p className="font-sans text-xs text-text-tertiary mt-1">
                  "Vidya Dadati Vinayam" — Knowledge alone imparts genuine humility.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={300}>
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
                Disconnect from the noise. Learn Vedas, Vyakarana, Advaita Vedanta, and Bhagavad Gita directly from a dedicated scholar with 7 years of full residential Gurukula training. Uncompromising oral tradition meets academic rigor.
              </p>
            </FadeInSection>

            {/* CTA Elements */}
            <FadeInSection delay={400}>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Button
                  onClick={() => handleNavClick('begin')}
                  variant="primary"
                  className="w-full sm:w-auto group"
                >
                  <span>Begin Your Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  onClick={() => handleNavClick('teachings')}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Explore Subjects
                </Button>
              </div>
            </FadeInSection>
          </div>

          {/* Right Visual Column (Portrait + Glass Overlay Cards) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <FadeInSection delay={500}>
              {/* Background Halo */}
              <div className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-gold-base/10 to-transparent blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

              {/* Portrait Frame */}
              <div className="relative w-[300px] sm:w-[350px] aspect-[4/5] rounded-xl overflow-hidden border border-gold-mid bg-surface-2 p-3 shadow-2xl flex flex-col justify-between">
                {/* Image Container with high contrast backdrop */}
                <div className="relative w-full h-[85%] rounded-lg overflow-hidden bg-gradient-to-b from-[#1F160D] to-[#0E0B07] flex items-center justify-center border border-gold-dim">
                  {/* SVG silhouette representing an elegant Acharya profile */}
                  <svg viewBox="0 0 100 100" className="w-48 h-48 opacity-40" fill="currentColor">
                    <path d="M50 24C41.2 24 34 31.2 34 40C34 48.8 41.2 56 50 56C58.8 56 66 48.8 66 40C66 31.2 58.8 24 50 24ZM50 60C38.4 60 14 65.8 14 77.4V86H86V77.4C86 65.8 61.6 60 50 60Z" fill="url(#gold-grad-hero)" />
                    <defs>
                      <linearGradient id="gold-grad-hero" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C8860A" />
                        <stop offset="100%" stopColor="#FAF6EE" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Acharya Details overlaid on silhouette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B07] via-transparent to-transparent flex flex-col justify-end p-5 text-left">
                    <span className="font-mono text-[9px] tracking-widest text-text-gold uppercase">Traditional Acharya</span>
                    <h4 className="font-serif text-lg text-text-primary font-medium mt-0.5">Vishweshwara N M</h4>
                    <p className="font-sans text-[10px] text-text-tertiary">M.A. Acharya (Expected 2026) • 7 Years Gurukula training</p>
                  </div>
                </div>

                {/* Description box of photo */}
                <div className="py-2 px-1 text-left space-y-0.5">
                  <span className="font-mono text-[8px] tracking-widest text-[#FAF6EE]/50 uppercase">Veda Vijnana Gurukulam Lineage</span>
                  <p className="font-sans text-[10px] text-text-secondary leading-tight italic">
                    "Teaching is a Dharma — a sacred duty to preserve the purity of Vedic vibrations."
                  </p>
                </div>
              </div>

              {/* Floating Glassmorphic Card 1 (Top Left) */}
              <div className="absolute -top-4 -left-6 bg-[#161008]/80 backdrop-blur-md border border-gold-mid p-3 rounded-lg shadow-xl text-left hidden sm:block max-w-[170px] hover:translate-y-[-4px] transition-transform duration-220">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-[#C8860A]/20">
                    <Award className="w-4 h-4 text-text-gold" />
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-text-primary uppercase font-bold">Residency</span>
                </div>
                <p className="font-sans text-[10px] text-text-secondary mt-1 leading-tight">
                  7 years of residential discipline at Janaseva Trust Gurukula.
                </p>
              </div>

              {/* Floating Glassmorphic Card 2 (Bottom Right) */}
              <div className="absolute -bottom-4 -right-6 bg-[#161008]/80 backdrop-blur-md border border-gold-mid p-3 rounded-lg shadow-xl text-left hidden sm:block max-w-[170px] hover:translate-y-[-4px] transition-transform duration-220">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded bg-ruby-deep/40">
                    <BookOpen className="w-4 h-4 text-text-gold" />
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-text-primary uppercase font-bold">Purity</span>
                </div>
                <p className="font-sans text-[10px] text-text-secondary mt-1 leading-tight">
                  No mock summaries. Word-by-word structural decoding.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* SECTION 2 - Stats Strip (Animated Counters) */}
      <FadeInSection>
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS_ITEMS.map((stat, idx) => (
              <div
                key={stat.id}
                className="bg-surface-2 border border-gold-dim p-6 rounded-lg text-center shadow-md relative hover:border-gold-mid transition-colors duration-220 group"
              >
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gold-base/30 group-hover:bg-gold-bright transition-colors"></div>
                <p className="font-display text-4xl md:text-5xl font-semibold text-text-gold tracking-tight">
                  {counters[idx]}
                  {stat.value.includes('+') ? '+' : stat.value.includes('%') ? '%' : ''}
                </p>
                <p className="font-mono text-[11px] tracking-widest text-text-primary uppercase mt-2">
                  {stat.label}
                </p>
                <p className="font-sans text-xs text-text-tertiary mt-1">
                  {stat.subtext}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* SECTION 3 - Acharya Introduction (The Trust Layer) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Large Image or Styled Board */}
        <div className="lg:col-span-5 relative">
          <FadeInSection delay={100}>
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-base/5 to-transparent rounded-2xl pointer-events-none"></div>
            <div className="p-4 bg-surface-2 border border-gold-mid rounded-2xl shadow-xl">
              {/* Visual display container */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-[#2A1E12] via-[#0E0B07] to-[#060504] border border-gold-dim flex flex-col justify-between p-6">
                {/* OM background watermark */}
                <div className="absolute top-4 right-4 font-devanagari text-6xl text-[#C8860A]/5 select-none font-bold">
                  ॐ
                </div>
                
                <div className="space-y-1 text-left">
                  <span className="font-mono text-[10px] tracking-widest text-text-gold uppercase block">Academic credentials</span>
                  <h3 className="font-serif text-2xl text-text-primary font-medium tracking-wide">Acharya Vishweshwara</h3>
                </div>

                {/* Graphic element - traditional manuscript representation */}
                <div className="my-auto py-4 px-3 border border-gold-dim bg-surface-3/50 rounded-lg text-left relative overflow-hidden">
                  <div className="h-[2px] w-12 bg-gold-bright mb-3"></div>
                  <p className="font-devanagari text-base text-text-gold tracking-wide leading-relaxed">
                    सत्येन ब्रह्मचर्येण व्यायामेनाथविद्यया । <br />
                    देशभक्त्यात्मत्यागेन सम्मानार्हः सुखीभव ॥
                  </p>
                  <p className="font-sans text-[10px] text-text-tertiary italic mt-2 leading-tight">
                    From the original Gurukula Convocation certificate. Blessing: "By truth, self-restraint, learning and dedication to motherland, may you lead a noble and fulfilled life."
                  </p>
                </div>

                <div className="flex items-center justify-between text-left border-t border-gold-dim pt-4">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-text-tertiary uppercase">Lineage trust</span>
                    <p className="font-sans text-xs text-text-secondary font-medium">Veda Vijnana Gurukulam</p>
                  </div>
                  <div className="h-8 w-8 rounded-full border border-gold-mid flex items-center justify-center font-mono text-[10px] text-text-gold">
                    7Y
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Right Column - Bento Credential Grid */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <FadeInSection delay={200}>
            <div className="space-y-3">
              <span className="font-mono text-xs tracking-[0.2em] text-text-gold uppercase block">
                ✦ AUTHORITY & CREDIBILITY
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
                A Lifelong Dedication to <br />
                <span className="font-medium text-text-gold">Traditional Lineage</span>
              </h2>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <p className="font-sans text-base text-text-secondary leading-relaxed">
              In the traditional Gurukula framework, knowledge is not merely read from a text—it is lived. Undergoing seven years of continuous residential residency, Vishweshwara mastered the nuances of Vedic phonetics (Taittiriya Samhita) and the systems of Indian epistemology (Nyaya & Advaita Vedanta). 
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CREDENTIALS_ITEMS.map((cred, idx) => (
              <FadeInSection key={cred.id} delay={400 + (idx * 50)}>
                <div
                  className="bg-surface-2 hover:bg-surface-3 border border-gold-dim hover:border-gold-mid p-5 rounded-lg shadow-md transition-all duration-220 hover:-translate-y-1 text-left space-y-2 h-full"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-text-gold shrink-0" />
                    <h4 className="font-mono text-xs tracking-wider text-text-primary uppercase font-bold">
                      {cred.title}
                    </h4>
                  </div>
                  <p className="font-serif text-sm text-text-gold">{cred.institution}</p>
                  {cred.year && (
                    <span className="inline-block text-[10px] font-mono tracking-wider text-text-tertiary border border-gold-dim px-2 py-0.5 rounded">
                      {cred.year}
                    </span>
                  )}
                  <p className="font-sans text-xs text-text-secondary leading-normal">
                    {cred.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={500}>
            <div className="pt-2">
              <Button
                onClick={() => handleNavClick('about')}
                variant="ghost"
                className="!px-0 text-text-gold hover:text-gold-bright group"
              >
                <span>Read the Full Story of Acharya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 4 - Teachings Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
        <FadeInSection>
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">
              ✦ CHOOSE YOUR STUDY PATHWAY
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
              Six Sacred <span className="font-medium">Subjects of Study</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
              Every seeker requires a different entry point. Whether you desire linguistic mastery, Vedic vibrational resonance, or non-dual wisdom, find your path here.
            </p>
          </div>
        </FadeInSection>

        {/* Bento Grid - 3 Columns Desktop, Swipe on Mobile */}
        <div className="relative md:grid md:grid-cols-3 gap-6 flex overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 scroll-smooth">
          {SUBJECTS_ITEMS.map((sub, idx) => (
            <FadeInSection key={sub.id} delay={100 + (idx * 100)} className="flex-shrink-0 w-[85vw] md:w-auto snap-center flex">
              <div
                className="w-full bg-surface-2 border border-gold-dim rounded-lg p-6 text-left shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[300px] hover:-translate-y-2 hover:border-gold-mid transition-all duration-220 group"
              >
                {/* Devanagari Background Watermark (Strategic placement) */}
                <div className="absolute right-2 top-2 font-devanagari text-6xl text-[#C8860A]/5 select-none font-bold group-hover:text-[#C8860A]/12 transition-colors duration-220">
                  {sub.devanagari}
                </div>

                <div className="space-y-3 relative z-10">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-text-gold uppercase block">
                    {sub.devanagari} • SUBJECT
                  </span>
                  <h3 className="font-serif text-2xl text-text-primary font-medium group-hover:text-text-gold transition-colors">
                    {sub.title}
                  </h3>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gold-dim/40 flex items-center justify-between mt-auto">
                  <div>
                    <span className="font-mono text-[9px] text-text-tertiary uppercase block">Frequency</span>
                    <span className="font-sans text-xs text-text-secondary font-medium">{sub.frequency}</span>
                  </div>
                  <button
                    onClick={() => handleNavClick('teachings')}
                    className="p-2 rounded-full border border-gold-dim text-text-gold group-hover:bg-text-gold group-hover:text-ground transition-all active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={400}>
          <div className="pt-2">
            <Button
              onClick={() => handleNavClick('teachings')}
              variant="outline"
              className="w-full sm:w-auto"
            >
              See Full Core Curriculums
            </Button>
          </div>
        </FadeInSection>
      </section>

      {/* SECTION 5 - The Difference (Split Layout) */}
      <section className="bg-surface-1 border-y border-gold-mid py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full bg-ruby-mid/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          {/* Left Quote Column */}
          <div className="lg:col-span-5 space-y-6">
            <FadeInSection delay={100}>
              <div className="p-2 rounded bg-gold-dim w-fit">
                <Quote className="w-8 h-8 text-text-gold" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-text-primary font-light leading-snug mt-6">
                "We do not teach for marks or certificates; <span className="font-medium italic text-text-gold">we teach for life transformation</span>."
              </h3>
              <div className="space-y-1 mt-6">
                <p className="font-mono text-xs tracking-wider text-text-gold uppercase font-bold">Vishweshwara Sanskrit</p>
                <p className="font-sans text-xs text-text-tertiary">Mission Statement & Operational Principle</p>
              </div>
            </FadeInSection>
          </div>

          {/* Right Checklist Column */}
          <div className="lg:col-span-7 space-y-6">
            <FadeInSection delay={200}>
              <h4 className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase">
                ✦ WHY WE ARE DIFFERENT
              </h4>
            </FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'No Tech-Larping / AI-Slop',
                  desc: 'We strictly avoid fake status markers, complex mock dashboards, or simulated telemetry. Just pure, ancient wisdom and real human mentorship.'
                },
                {
                  title: 'Exact Word-by-Word Analysis',
                  desc: 'Instead of dry, general summaries, we break down every compound (Samasa) and verbal root (Dhatu) using traditional Sanskrit analysis tools.'
                },
                {
                  title: 'Preserving Sound Vibrations',
                  desc: 'Vedic mantras require strict adherence to Svara (pitch-based pronunciation) and Shiksha rules. We provide live, auditory evaluation.'
                },
                {
                  title: 'Guru Dakshina Offerings',
                  desc: 'Wisdom cannot be sold. Our courses work on the traditional model of a self-determined financial offering based on your heart and capability.'
                }
              ].map((point, index) => (
                <FadeInSection key={index} delay={300 + (index * 100)}>
                  <div className="space-y-2 h-full">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4.5 h-4.5 text-text-gold shrink-0" />
                      <h5 className="font-serif text-lg text-text-primary font-semibold">{point.title}</h5>
                    </div>
                    <p className="font-sans text-xs text-text-secondary leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - Testimonials Grid (Direct Credibility) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
        <FadeInSection>
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">
              ✦ STUDENT TRUST VOICES
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
              Transformed by <span className="font-medium">Direct Mentorship</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
              Read how busy working professionals, university scholars, and deep seekers integrate traditional Sanskrit learning into their modern lives.
            </p>
          </div>
        </FadeInSection>

        {/* Testimonials 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Ramesh Nair',
              role: 'Retired Professor of Indology',
              loc: 'Kerala, India',
              flag: '🇮🇳',
              quote: 'Studying the Bhagavad Gita under Vishweshwara has changed my approach entirely. His strict adherence to traditional Shankaracharya commentary, combined with his clarity and humility, represents the true spirit of a Gurukula Acharya.',
            },
            {
              name: 'Ananya Sharma',
              role: 'Software Engineer',
              loc: 'California, USA',
              flag: '🇺🇸',
              quote: 'As someone living in Silicon Valley, I was looking for authentic Sanskrit grammar classes that were deep, logical, and structured. Vishweshwara explains Vyakarana like an elegant computer program. I highly recommend him!',
            },
            {
              name: 'Gaurav Kulkarni',
              role: 'Business Consultant',
              loc: 'Bangalore, India',
              flag: '🇮🇳',
              quote: 'Veda chanting is not just reading a book. Vishweshwara meticulously corrects my Svara (pitch) and phonetic articulation. My daily chants are now full of energy, peace, and spiritual resonance.',
            }
          ].map((test, index) => (
            <FadeInSection key={index} delay={100 + (index * 100)} className="flex">
              <div
                className="w-full bg-surface-2 border border-gold-dim hover:border-gold-mid p-6 rounded-lg text-left shadow-md flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-220 relative overflow-hidden"
              >
                <Quote className="w-10 h-10 text-gold-dim absolute -top-1 -right-1" />
                
                <p className="font-sans text-xs md:text-sm text-text-secondary italic leading-relaxed relative z-10 mb-6">
                  "{test.quote}"
                </p>

                <div className="flex items-center space-x-3 pt-4 border-t border-gold-dim/40 mt-auto">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#2A1E12] to-[#1F160D] border border-gold-dim flex items-center justify-center font-serif text-text-gold font-bold text-sm">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-text-primary font-medium">{test.name}</h4>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] text-text-tertiary">{test.role}</span>
                      <span className="text-xs">{test.flag}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={400}>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('testimonials')}
              className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest uppercase text-text-gold hover:text-gold-bright transition-colors active:scale-95"
            >
              <span>See Global Student Map & All Testimonials</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </FadeInSection>
      </section>

      {/* SECTION 7 - Guru Dakshina Teaser (Minimal band) */}
      <FadeInSection>
        <section className="bg-[#0E0B07] border-y border-gold-mid py-12 text-center px-6 md:px-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <span className="font-mono text-[9px] tracking-[0.2em] text-text-gold uppercase block">THE SACRED TRADITION</span>
              <h3 className="font-serif text-xl md:text-2xl text-text-primary font-medium">Uncompromising Knowledge. Self-Determined Guru Dakshina.</h3>
              <p className="font-sans text-xs text-text-secondary">We do not sell ancient scripture. Seekers support our gurukula livelihood through self-determined offerings.</p>
            </div>
            <button
              onClick={() => handleNavClick('dakshina')}
              className="w-full md:w-auto px-6 py-3 rounded bg-surface-2 hover:bg-surface-3 border border-gold-mid text-text-gold font-mono text-xs tracking-widest uppercase transition-colors shrink-0 active:scale-95"
            >
              How Dakshina Works →
            </button>
          </div>
        </section>
      </FadeInSection>

      {/* SECTION 8 - Global Reach (Country flag pills) */}
      <FadeInSection>
        <section className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-8 pb-12">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">
              ✦ SAMPRADAYA EXPANSION
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-light text-text-primary tracking-tight">
              Connecting Seekers <span className="font-medium">Across Oceans</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-text-secondary max-w-xl mx-auto">
              Traditional learning knows no geographical boundaries. Join our current family of active online students dialing in live from diverse locations:
            </p>
          </div>

          {/* Flag pills wrap */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
            {countries.map((country, idx) => (
              <FadeInSection key={country.code} delay={idx * 50}>
                <div
                  className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-gold-dim hover:border-gold-mid transition-colors shadow-sm select-none"
                >
                  <span className="text-base">{country.flag}</span>
                  <span className="font-mono text-xs tracking-wider text-text-secondary uppercase">{country.name}</span>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>
      </FadeInSection>
    </div>
  );
};
