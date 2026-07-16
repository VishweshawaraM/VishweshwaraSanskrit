import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Award, Sparkles, BookOpen, Quote, Shield, Globe } from 'lucide-react';
import { STATS_ITEMS, CREDENTIALS_ITEMS, SUBJECTS_ITEMS, TESTIMONIALS_ITEMS } from '../data';
import { PageView } from '../types';
import { FadeInSection } from '../components/FadeInSection';
import { Button } from '../components/Button';
import { Motif, DecorativeBorder } from '../components/Motif';
import { Link } from 'react-router-dom';
import { HeroSlideshow } from '../components/Slideshow';
import { FAQ } from '../components/FAQ';

interface HomeViewProps {
  onViewChange: (view: PageView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onViewChange }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);

  // Handle counter animations on load
  useEffect(() => {
    const targets = [7, 6, 500, 6];
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
    <div className="space-y-16 md:space-y-32 relative">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-base/10 via-surface-1 to-surface-1 pointer-events-none -z-10" />
      
      <HeroSlideshow 
        slides={[
          {
            image: "/hero-1.PNG",
            title: "Live. Personal. Ancient Wisdom.",
            subtitle: "Disconnect from the noise. Learn Vedas, Vyakarana, Advaita Vedanta, and Bhagavad Gita directly from a dedicated scholar with 7 years of full residential training."
          },
          {
            image: "/hero-2.PNG",
            title: "Authentic Tradition.",
            subtitle: "Immerse yourself in the exact pedagogy preserved for millennia, tailored for the modern seeker."
          },
          {
            image: "/hero-3.PNG",
            title: "Global Community of Seekers.",
            subtitle: "Join dedicated students from across the world in small, interactive cohorts focused on deep learning."
          }
        ]}
        onBeginClick={() => handleNavClick('begin')}
        onExploreClick={() => handleNavClick('teachings')}
      />

      {/* SECTION 2 - Stats Strip (Animated Counters) */}
      <FadeInSection>
        <section className="max-w-[1200px] mx-auto px-4 sm:px-4 md:px-12 -mt-4 md:-mt-10 relative z-30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {STATS_ITEMS.map((stat, idx) => (
              <div
                key={stat.id}
                className="bg-[#120F0C] border border-[#C8860A]/20 p-4 md:p-10 rounded-[10px] text-center flex flex-col justify-center items-center shadow-2xl"
              >
                <p className="font-[Times_New_Roman] text-[32px] sm:text-[40px] md:text-[60px] lg:text-[75px] leading-tight font-bold text-[#C8860A] text-center bg-black/50 px-2 rounded-xl">
                  {counters[idx]}
                  {stat.value.includes('+') ? '+' : stat.value.includes('%') ? '%' : ''}
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.1em] md:tracking-[0.2em] text-[#8B867D] uppercase mt-2 md:mt-4 whitespace-pre-line leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* SECTION 3 - Acharya Introduction (The Trust Layer) */}
      <FadeInSection>
        <section className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 lg:gap-12 items-center">
        {/* Left Column - Large Image or Styled Board */}
        <div className="lg:col-span-5 relative">
          <FadeInSection delay={100} direction="right">
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-base/5 to-transparent rounded-2xl pointer-events-none translate-x-4 translate-y-4"></div>
            <div className="p-2 bg-surface-2 border border-gold-mid rounded-2xl shadow-xl relative z-10 overflow-hidden group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#0E0B07] border border-gold-dim">
                <img 
                  src="/acharya-photo.jpeg" 
                  alt="Acharya Vishweshwara" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B07] via-[#0E0B07]/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1 text-left">
                  <span className="font-mono text-[10px] tracking-widest text-text-gold uppercase block">Academic credentials</span>
                  <h3 className="font-serif text-2xl text-text-primary font-medium tracking-wide">Acharya Vishweshwara</h3>
                  <div className="flex flex-wrap items-center gap-2 pt-2">
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
              In the traditional framework, knowledge is not merely read from a text—it is lived. Undergoing seven years of continuous residential residency, Vishweshwara mastered the nuances of Vedic phonetics (Taittiriya Samhita) and the systems of Indian epistemology (Nyaya & Advaita Vedanta). 
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
                to="/about"
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
      </FadeInSection>

      {/* SECTION 4 - Teachings Bento Grid */}
      <FadeInSection>
        <section className="max-w-7xl mx-auto px-4 md:px-12 text-center space-y-8 md:space-y-12">
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
                  <Link
                    to="/teachings"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex p-2 rounded-full border border-gold-dim text-text-gold hover:bg-text-gold hover:text-ground transition-all active:scale-95 items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={400}>
          <div className="pt-2">
            <Button
              to="/teachings"
              variant="outline"
              className="w-full sm:w-auto"
            >
              See Full Core Curriculums
            </Button>
          </div>
        </FadeInSection>
      </section>
      </FadeInSection>

      {/* SECTION 5 - The Difference (Split Layout) */}
      <FadeInSection>
        <section className="bg-surface-1 border-y border-gold-mid py-12 md:py-20 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full bg-ruby-mid/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 lg:gap-12 items-center text-left">
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
                  title: 'Authentic Human Mentorship',
                  desc: 'Every session is live, personal, and guided directly by the Acharya. No recordings, no AI tools, no automated pathways — just the ancient Guru-Shishya tradition.'
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
      </FadeInSection>

      {/* SECTION 6 - Testimonials Grid (Direct Credibility) */}
      <FadeInSection>
        <section className="max-w-7xl mx-auto px-4 md:px-12 text-center space-y-8 md:space-y-12">
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
          {TESTIMONIALS_ITEMS.slice(0, 3).map((test, index) => (
            <FadeInSection key={test.id} delay={100 + (index * 100)} className="flex">
              <div
                className="w-full bg-surface-2 border border-gold-dim hover:border-gold-mid p-6 rounded-lg text-left shadow-md flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-220 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-base/5 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                <Quote className="w-10 h-10 text-gold-dim absolute top-4 right-4 opacity-50" />
                
                <p className="font-sans text-xs md:text-sm text-text-secondary italic leading-relaxed relative z-10 mb-6 line-clamp-6">
                  "{test.content}"
                </p>

                <div className="flex items-center space-x-3 pt-4 border-t border-gold-dim/40 mt-auto relative z-10">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#2A1E12] to-[#1F160D] border border-gold-dim flex items-center justify-center font-serif text-text-gold font-bold text-sm shrink-0">
                    {test.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-text-primary font-medium truncate">{test.name}</h4>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <span className="text-[10px] text-text-tertiary truncate block">{test.role}</span>
                      <span className="text-xs shrink-0">{test.flag}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={400}>
          <div className="pt-2">
            <Link
              to="/testimonials"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest uppercase text-text-gold hover:text-gold-bright transition-colors active:scale-95"
            >
              <span>See Global Student Map & All Testimonials</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInSection>
      </section>
      </FadeInSection>

      {/* SECTION 7 - Guru Dakshina Teaser (Minimal band) */}
      <FadeInSection>
        <section className="bg-[#0E0B07] border-y border-gold-mid py-8 md:py-12 text-center px-4 md:px-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <span className="font-mono text-[9px] tracking-[0.2em] text-text-gold uppercase block">THE SACRED TRADITION</span>
              <h3 className="font-serif text-xl md:text-2xl text-text-primary font-medium">Uncompromising Knowledge. Self-Determined Guru Dakshina.</h3>
              <p className="font-sans text-xs text-text-secondary">We do not sell ancient scripture. Seekers support our livelihood through self-determined offerings.</p>
            </div>
            <Link
              to="/dakshina"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block text-center w-full md:w-auto px-6 py-3 rounded bg-surface-2 hover:bg-surface-3 border border-gold-mid text-text-gold font-mono text-xs tracking-widest uppercase transition-colors shrink-0 active:scale-95"
            >
              How Dakshina Works →
            </Link>
          </div>
        </section>
      </FadeInSection>

      {/* SECTION 8 - Frequently Asked Questions */}
      <FadeInSection>
        <FAQ />
      </FadeInSection>

      {/* SECTION 9 - Global Reach (Country flag pills) */}
      <FadeInSection>
        <section className="max-w-7xl mx-auto px-4 md:px-12 text-center space-y-8 pb-12">
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
