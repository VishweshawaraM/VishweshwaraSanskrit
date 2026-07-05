import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, HelpCircle, ArrowRight, Sparkles, CheckCircle, Clock, Globe, ShieldCheck } from 'lucide-react';
import { SUBJECTS_ITEMS } from '../data';
import { PageView } from '../types';
import { Motif, DecorativeBorder } from '../components/Motif';
import { FadeInSection } from '../components/FadeInSection';
import confetti from 'canvas-confetti';
import { playChime } from '../lib/audio';

interface TeachingsViewProps {
  onViewChange: (view: PageView) => void;
}

export const TeachingsView: React.FC<TeachingsViewProps> = ({ onViewChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNavClick = (view: PageView) => {
    onViewChange(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const personas = [
    {
      title: 'School & University Students',
      desc: 'Build strong character, double memorization capacities, and acquire sharp intellectual focus. Students start from basic letter formations and move to chanting classical stotras.',
      accent: 'border-l-2 border-gold-base bg-[#0E0B07]'
    },
    {
      title: 'Working Professionals',
      desc: 'Decompress from corporate fatigue, explore mental clarity, and read original source texts for Yoga and meditation. We focus on late evening slots supporting PST/EST/CET schedules.',
      accent: 'border-l-2 border-gold-bright bg-[#0E0B07]'
    },
    {
      title: 'Retired Seekers',
      desc: 'Deepen spiritual practice, connect with traditional Vedic heritage, and understand the intricate commentaries (Bhashyas) of Adi Shankaracharya and Upanishads word-by-word.',
      accent: 'border-l-2 border-ruby-base bg-[#0E0B07]'
    }
  ];

  const approaches = [
    {
      title: 'No Rote Chanting',
      desc: 'Many platforms teach mechanical sound copying. We deconstruct every compound word (Samasa) and verbal root (Dhatu) using traditional grammar rules.'
    },
    {
      title: 'Strict Svara Intonation',
      desc: 'Vedic text represents cosmic frequency. Our live session structure ensures the Acharya personally corrects your pitch modifications in real time.'
    },
    {
      title: 'Direct Commentary Studies',
      desc: 'We do not read third-party translations. We decode original Sanskrit commentaries directly, exploring Shankaracharya’s intellectual genius.'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-32">
      {/* SECTION 1 - Page Hero */}
      <section className="relative pt-32 pb-16 bg-[#0E0B07] border-b border-gold-mid overflow-hidden px-4 md:px-12 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#1F160D_0%,transparent_100%)] opacity-30 pointer-events-none"></div>

        <div className="absolute top-0 right-0 opacity-10">
          <Motif size={250} color="#C8860A" />
        </div>

        <div className="max-w-7xl mx-auto text-left space-y-6 relative z-10">
          <FadeInSection direction="up" delay={100}>
            <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> THE TRANSMISSION ARCHITECTURE • GURUKULA METHOD
            </span>
          </FadeInSection>
          <FadeInSection direction="up" delay={200}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-text-primary tracking-tight leading-none">
              Our Knowledge <br />
              <span className="font-medium text-text-gold">Traditions & Curriculums</span>
            </h1>
          </FadeInSection>
          <FadeInSection direction="up" delay={300}>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Authentic Vedic subjects decoded with mathematical clarity, strict oral rules, and complete loyalty to traditional commentary lineages.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 2 - Pedagogical Approach */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center select-none relative">
        
        <div className="lg:col-span-5 space-y-6 text-left relative z-10">
          <FadeInSection direction="left" delay={100}>
            <span className="font-mono text-xs tracking-[0.2em] text-text-gold uppercase">✦ THE GURUKULA APPROACH</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-text-primary tracking-tight mt-2">
              How Wisdom Is <br />
              <span className="font-medium">Purified and Transmitted</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed mt-4">
              Many modern institutions simplify Sanskrit to a tourist vocabulary or turn scripture into spiritual entertainment. We preserve the original intellectual rigor.
            </p>
            <div className="p-4 border border-gold-dim rounded bg-gold-dim text-xs font-serif text-text-gold italic leading-relaxed mt-6">
              "Acaryat padamadatte, Padam sishyah svamedhaya, Padam sabrahmacharibhyah, Padam kalakramena cha." <br />
              — One quarter of wisdom is learned from the teacher, one from self-study, one from peer discussions, and the final quarter matures over time.
            </div>
          </FadeInSection>
        </div>

        <div className="lg:col-span-7 space-y-6 text-left relative z-10">
          {approaches.map((app, idx) => (
            <FadeInSection key={idx} direction="up" delay={200 + (idx * 100)}>
              <div className="flex gap-4 p-4 rounded bg-surface-2 border border-gold-dim/40 hover:border-gold-mid transition-colors">
                <div className="h-8 w-8 rounded-full bg-[#1F160D] border border-gold-mid flex items-center justify-center font-mono text-xs text-text-gold font-bold shrink-0">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base text-text-primary font-semibold">{app.title}</h4>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">{app.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* SECTION 3 - Six Subjects Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 space-y-12 select-none relative">
        <div className="absolute top-1/2 left-0 opacity-10">
          <Motif size={150} color="#C8860A" />
        </div>
        <div className="absolute top-1/2 right-0 opacity-10">
          <Motif size={150} color="#C8860A" />
        </div>
        <div className="space-y-3 text-center relative z-10">
          <FadeInSection direction="up" delay={100}>
            <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">Syllabus details</span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
              Comprehensive <span className="font-medium text-text-gold">Study Pathways</span>
            </h2>
          </FadeInSection>
          <FadeInSection direction="up" delay={200}>
            <DecorativeBorder className="my-6 text-gold-base" />
          </FadeInSection>
        </div>

        {/* Bento Grid - 3 Columns Desktop, Horizontal Swipe Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {SUBJECTS_ITEMS.map((sub, idx) => (
            <FadeInSection key={sub.id} direction="up" delay={300 + (idx * 50)}>
              <div
                className="bg-surface-2 border border-gold-dim rounded-lg p-8 text-left shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[420px] hover:-translate-y-2 hover:border-gold-mid transition-all duration-220 group h-full"
              >
              {/* Devanagari background watermark at 10-15% opacity */}
              <div className="absolute right-3 top-3 font-devanagari text-7xl text-[#C8860A]/8 select-none font-bold">
                {sub.devanagari}
              </div>

              <div className="space-y-4 relative z-10">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-text-gold uppercase block">Syllabus Core</span>
                  <h3 className="font-serif text-2xl text-text-primary font-semibold group-hover:text-text-gold transition-colors">
                    {sub.title}
                  </h3>
                </div>

                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  {sub.description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[9px] tracking-wider text-text-gold uppercase block">Key Topics Covered:</span>
                  <ul className="space-y-1.5">
                    {sub.topics.map((topic, index) => (
                      <li key={index} className="flex items-start space-x-2 text-xs font-sans text-text-secondary">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C8860A] shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-gold-dim/40 flex items-center justify-between mt-6 relative z-10">
                <div>
                  <span className="font-mono text-[8px] text-text-tertiary uppercase block">Standard Duration</span>
                  <span className="font-sans text-xs text-text-secondary font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-text-gold" /> {sub.duration}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-text-tertiary uppercase block">Commitment</span>
                  <span className="font-sans text-xs text-text-secondary font-medium flex items-center gap-1 mt-0.5">
                    <Globe className="w-3 h-3 text-text-gold" /> {sub.frequency}
                  </span>
                </div>
              </div>
            </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* SECTION 4 - Who This Is For (Persona Cards) */}
      <section className="bg-surface-1 border-y border-gold-mid py-20 px-4 md:px-12 text-center space-y-12 select-none">
        <div className="space-y-3 max-w-xl mx-auto">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">SUPPORTING ALL MOTIVATIONS</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-text-primary tracking-tight">
            Tailored for Diverse <span className="font-medium">Levels of Seekers</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
            Traditional Shastra studies do not discriminate based on background. We align our pacing and schedule to support your personal objectives:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {personas.map((per, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg shadow-md border border-gold-dim/30 flex flex-col justify-between min-h-[220px] ${per.accent}`}
            >
              <div className="space-y-3">
                <h4 className="font-serif text-lg text-text-primary font-bold">{per.title}</h4>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  {per.desc}
                </p>
              </div>
              <Link
                to="/begin"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-6 flex items-center space-x-1.5 font-mono text-[10px] tracking-wider text-text-gold uppercase w-fit"
              >
                <span>Request Custom Syllabus</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 - Method + Timings (Split Layout) */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 select-none">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <span className="font-mono text-xs tracking-[0.2em] text-text-gold uppercase">✦ COHORT PARAMETERS</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-text-primary tracking-tight">
            Class Structure <br />
            <span className="font-medium text-text-gold">& Timing Protocols</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
            All teachings occur live in small, intimate groups (typically 4–6 students) or personal 1-on-1 mentorship arrangements. This preserves interactive debate and close phonetic oversight.
          </p>
          <div className="space-y-3.5 pt-2">
            {[
              'Direct real-time audio correction (vital for chants)',
              'PDF worksheets and homework assignments',
              'Access to community discussion group',
              'Syllabus progression matching personal learning curve'
            ].map((pt, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs font-sans text-text-secondary">
                <ShieldCheck className="w-4 h-4 text-text-gold shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Cohort boxes */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Box 1 - Weekend Cohorts */}
          <div className="p-6 bg-surface-2 border border-gold-mid/40 rounded-lg space-y-4 shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-wider text-text-gold uppercase block">BATCH A</span>
              <h4 className="font-serif text-lg text-text-primary font-semibold">Weekend Intensive Cohorts</h4>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Ideal for busy corporate workers and students. Deep sessions with collaborative readings.
              </p>
            </div>
            <div className="border-t border-gold-dim pt-3">
              <span className="font-mono text-[9px] text-text-tertiary block uppercase">Schedules available</span>
              <p className="font-sans text-xs text-text-secondary font-medium">Saturday & Sunday slots</p>
            </div>
          </div>

          {/* Box 2 - Weekday slots */}
          <div className="p-6 bg-surface-2 border border-gold-mid/40 rounded-lg space-y-4 shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-wider text-text-gold uppercase block">BATCH B</span>
              <h4 className="font-serif text-lg text-text-primary font-semibold">Weekday Evening Slots</h4>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Perfect for retired seekers and scholars who seek structured weekday discipline.
              </p>
            </div>
            <div className="border-t border-gold-dim pt-3">
              <span className="font-mono text-[9px] text-text-tertiary block uppercase">Schedules available</span>
              <p className="font-sans text-xs text-text-secondary font-medium">Tuesday & Thursday slots</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - CTA Strip */}
      <section className="bg-surface-1 py-16 text-center px-6 border-t border-gold-mid select-none">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="font-serif text-2xl md:text-3xl text-text-primary font-light">
            Ready to explore? Get a <span className="font-medium text-text-gold">Free Syllabus Assessment</span>
          </h3>
          <p className="font-sans text-xs text-text-secondary leading-relaxed">
            Not sure which path fits your background? Connect directly with Acharya Vishweshwara. Discuss your background and interest over a free 15-minute diagnostic call.
          </p>
          <div className="max-w-md mx-auto pt-4 relative min-h-[50px]">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="absolute inset-0 flex items-center justify-center text-sm text-text-gold font-medium bg-surface-2 border border-gold-mid rounded py-3 px-4"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Request received! Acharya will reach out soon.
              </motion.div>
            ) : (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get('email') as string;
                  
                  try {
                    const { saveLead } = await import('../lib/firebase');
                    await saveLead({
                      name: 'Assessment Request',
                      email: email,
                      subject: 'Syllabus Assessment',
                      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
                      background: 'Requested via Teaching View',
                      message: 'Requested a free syllabus assessment call.'
                    });

                    setIsSubmitted(true);
                    
                    // Trigger gold confetti burst and meditative chime
                    confetti({
                      particleCount: 100,
                      spread: 70,
                      origin: { y: 0.6 },
                      colors: ['#C8860A', '#E0A32E', '#F9C256', '#FFE391', '#F5F5F5']
                    });
                    playChime();
                  } catch (error: any) {
                    alert('Failed to send request: ' + error.message);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email address" 
                  required
                  disabled={isSubmitting}
                  className="flex-1 bg-surface-2 border border-gold-dim rounded px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-gold-base transition-colors placeholder:text-text-disabled disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold active:scale-95 transition-all shadow-md shrink-0 hover:brightness-110 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Request Call'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
