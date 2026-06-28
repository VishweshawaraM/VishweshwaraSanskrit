import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, MapPin, Globe, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../components/Logo';
import { PageView } from '../types';
import { FadeInSection } from '../components/FadeInSection';
import { Button } from '../components/Button';
import { Motif, DecorativeBorder } from '../components/Motif';
import confetti from 'canvas-confetti';
import { playChime } from '../lib/audio';

const LANDING_TESTIMONIALS = [
  {
    quote: "I tried learning from books for years, but one month of live phonetic correction changed my entire chanting ability.",
    author: "Software Engineer",
    location: "United States"
  },
  {
    quote: "Acharya makes Advaita concepts accessible without diluting the original Sanskrit commentaries.",
    author: "Yoga Teacher",
    location: "United Kingdom"
  },
  {
    quote: "My son now chants the Bhagavad Gita with perfect pronunciation. It's a joy to watch him connect with our roots.",
    author: "Parent of 9-year-old",
    location: "Australia"
  }
];

interface LandingViewProps {
  onViewChange: (view: PageView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onViewChange }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % LANDING_TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-ground min-h-screen text-text-primary flex flex-col relative pb-20 md:pb-0 font-sans">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-base/10 via-transparent to-transparent pointer-events-none -z-10" />
      
      {/* 1. MINIMAL HEADER */}
      <header className="sticky top-0 z-50 bg-ground/90 backdrop-blur-md border-b border-gold-dim py-4 px-4 md:px-12 flex items-center justify-between">
        <Logo variant="horizontal" size={32} />
        
        <button
          onClick={scrollToForm}
          className="px-3 md:px-4 py-2 rounded bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-[10px] md:text-xs tracking-wider uppercase font-semibold active:scale-95 transition-transform"
        >
          Free Consultation
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 md:px-12 overflow-hidden flex flex-col items-center text-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border border-gold-base absolute animate-[spin_120s_linear_infinite]"></div>
          <div className="w-[600px] h-[600px] rounded-full border border-gold-base absolute animate-[spin_90s_linear_infinite_reverse] border-dashed"></div>
        </div>

        <div className="absolute top-20 left-10 hidden lg:block opacity-20">
          <Motif size={80} color="#C8860A" />
        </div>
        <div className="absolute bottom-20 right-10 hidden lg:block opacity-20">
          <Motif size={120} color="#C8860A" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6 relative z-10 mt-4 md:mt-8">
          <FadeInSection delay={100} direction="down">
             <div className="inline-flex items-center space-x-2 bg-surface-2 border border-gold-dim px-4 py-1.5 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] text-text-gold tracking-widest uppercase font-medium">Accepting New Students</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary leading-[1.15] font-medium tracking-tight">
              Give Your Child Access To <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-base to-gold-bright">India's Timeless Knowledge</span> Tradition
            </h1>
          </FadeInSection>

          <FadeInSection delay={200}>
            <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mt-6">
              More than language learning.<br/>
              A deeper connection to culture, discipline, confidence, and authentic Indian wisdom.
              <br/><br/>
              Learn Sanskrit through personalized one-to-one guidance rooted in the traditional Gurukula system.
            </p>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="flex justify-center pt-4">
              <Button
                onClick={scrollToForm}
                variant="primary"
                className="w-full sm:w-auto group relative overflow-hidden text-sm py-4"
              >
                <span className="relative z-10">Request A Free Consultation</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="bg-surface-1 py-16 px-4 md:px-12 border-y border-gold-dim text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <FadeInSection>
            <span className="font-mono text-xs tracking-widest text-text-gold uppercase block mb-4">Why This Matters</span>
            <div className="space-y-6 text-text-secondary text-base md:text-lg leading-relaxed font-serif">
              <p>Today, many children know technology.</p>
              <p>But very few remain connected to the wisdom traditions that shaped our civilization.</p>
              <p>Sanskrit is not merely a subject.<br/>It is the foundation of India's intellectual and spiritual heritage.</p>
              <p className="text-text-primary font-medium text-lg md:text-xl pt-4">Giving your child access to Sanskrit is giving them access to thousands of years of timeless wisdom.</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* LEARN DIRECTLY FROM EDUCATOR */}
      <section className="py-16 px-4 md:px-12 max-w-4xl mx-auto text-left md:text-center space-y-12">
        <FadeInSection>
          <div className="space-y-4 mb-10">
            <h2 className="font-serif text-2xl md:text-3xl text-text-primary font-medium">Learn Directly From A Gurukula-Trained Educator</h2>
            <p className="text-text-secondary">Learn under the guidance of <strong>Vishweshwara M.</strong></p>
            <p className="text-text-secondary">A traditional Gurukula-trained educator dedicated to preserving authentic Indian knowledge traditions for modern learners worldwide.</p>
          </div>
          
          <div className="bg-surface-2 p-6 md:p-8 rounded-xl border border-gold-dim inline-block text-left w-full max-w-2xl mx-auto">
            <h3 className="font-serif text-xl text-text-gold mb-6">Why this learning experience is different:</h3>
            <ul className="space-y-4">
              {[
                'Traditional Gurukula learning approach',
                'Personalized one-to-one guidance',
                'Correct pronunciation and chanting foundation',
                'Strong cultural understanding',
                'Interactive and age-appropriate teaching methods'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-text-secondary font-sans text-sm md:text-base">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInSection>
      </section>

      {/* WHAT & WHO GRID */}
      <section className="bg-surface-1 py-16 px-4 md:px-12 border-y border-gold-dim">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <FadeInSection>
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-text-primary border-b border-gold-dim pb-4">What Your Child Will Learn</h3>
              <ul className="space-y-3">
                {[
                  'Sanskrit pronunciation foundation',
                  'Reading and writing in Devanagari',
                  'Basic Sanskrit conversation',
                  'Vocabulary building',
                  'Shlokas with meaning',
                  'Cultural understanding through language',
                  'Confidence in authentic pronunciation'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-text-secondary text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-gold-base rounded-full shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-text-primary border-b border-gold-dim pb-4">Who This Is For</h3>
              <p className="text-text-gold text-sm font-medium uppercase tracking-wider font-mono">This learning path is ideal for:</p>
              <ul className="space-y-3">
                {[
                  'Children aged 6+',
                  'Parents wanting deeper cultural connection',
                  'Families living outside India',
                  'Young learners interested in Sanskrit and Indian traditions'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-text-secondary text-sm md:text-base">
                    <span className="w-1.5 h-1.5 bg-gold-base rounded-full shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL */}
      <section className="py-20 px-4 md:px-12 bg-[#0E0B07] text-center overflow-hidden border-b border-gold-dim">
        <FadeInSection>
          <div className="max-w-3xl mx-auto space-y-8 relative">
            <Quote className="w-10 h-10 text-gold-base/30 mx-auto" />
            <div className="h-[140px] md:h-[120px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <p className="font-sans text-base md:text-lg text-text-secondary italic mb-4 max-w-2xl px-4">
                    "{LANDING_TESTIMONIALS[activeTestimonial].quote}"
                  </p>
                  <div className="font-mono text-[10px] md:text-xs tracking-wider text-text-gold uppercase">
                    — {LANDING_TESTIMONIALS[activeTestimonial].author}, {LANDING_TESTIMONIALS[activeTestimonial].location}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center space-x-2 mt-6">
              {LANDING_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial ? 'bg-gold-base scale-125' : 'bg-gold-dim hover:bg-gold-mid'
                  }`}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* GLOBAL COMMUNITY */}
      <section className="py-16 px-4 md:px-12 text-center max-w-4xl mx-auto">
        <FadeInSection>
          <Globe className="w-12 h-12 text-gold-base mx-auto mb-6 opacity-80" />
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary font-medium mb-4">A Global Learning Community</h2>
          <p className="text-text-secondary mb-8">Students currently learning from:</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {['India', 'United States', 'Australia', 'UAE', 'Europe'].map((country) => (
              <span key={country} className="px-4 py-2 bg-surface-2 border border-gold-dim/50 rounded-full text-text-primary text-sm font-medium shadow-sm flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-gold-base" />
                <span>{country}</span>
              </span>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* FORM SECTION */}
      <section id="booking-form" className="bg-surface-2 border-y border-gold-mid py-16 px-4 md:px-12 text-center">
        <div className="max-w-xl mx-auto space-y-8">
          
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-text-primary font-medium tracking-tight">
              Begin The Learning Journey
            </h2>
            <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
              Every child deserves access to India's timeless knowledge tradition. Fill the form below and begin with a personal consultation.
            </p>
          </div>

          <FadeInSection delay={200}>
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="bg-surface-1 border border-gold-mid rounded-xl p-8 md:p-12 shadow-xl text-center space-y-4"
              >
                <div className="w-16 h-16 bg-gold-base/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-gold-base" />
                </div>
                <h3 className="text-xl font-serif text-text-primary">Application Sent Successfully</h3>
                <p className="text-text-secondary">
                  Thank you for your interest! Acharya will reach out to you soon on WhatsApp.
                </p>
              </motion.div>
            ) : (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get('email') as string;
                  const phone = formData.get('phone') as string;
                  const name = formData.get('name') as string;
                  
                  try {
                    const { saveLead } = await import('../lib/firebase');
                    await saveLead({
                      name: name,
                      email: email || phone, // Using email, fallback to phone
                      phone: phone,
                      subject: 'Landing Page Lead',
                      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
                      background: `Child Age: ${formData.get('childAge')}, Country: ${formData.get('country')}`,
                      message: formData.get('reason') as string,
                    });

                    if (email) {
                      // Send Email to User
                      await fetch('/api/email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          to: email,
                          subject: 'Application Received - Visanskrit',
                          html: '<p>Your application was sent successfully! Acharya will reach out to you soon.</p>'
                        })
                      });
                    }

                    // Send Email to Admin
                    await fetch('/api/email', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        to: 'visanskrit.solopreneur@gmail.com',
                        subject: 'New Lead: Landing Page Application',
                        html: `<p>New application from ${name}. Phone: ${phone}. Email: ${email}</p>`
                      })
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
                    console.error(error);
                    alert('Failed to submit form: ' + error.message);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="bg-surface-1 border border-gold-mid rounded-xl p-6 md:p-8 shadow-xl space-y-5 text-left"
              >
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-secondary block">Name *</label>
                <input type="text" name="name" required className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base transition-colors" placeholder="Your name" />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-secondary block">Child Age *</label>
                <input type="number" name="childAge" min="6" max="18" required className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base transition-colors" placeholder="e.g. 8" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-secondary block">Country *</label>
                <input type="text" name="country" required className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base transition-colors" placeholder="e.g. United States" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-secondary block">WhatsApp Number *</label>
                <input type="tel" name="phone" required className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base transition-colors" placeholder="+1 (234) 567-8900" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-secondary block">Why do you wish your child to learn Sanskrit? *</label>
                <textarea name="reason" required rows={3} className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base transition-colors resize-none" placeholder="Briefly describe your goals..." />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full mt-4 !py-4 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Request Consultation'}
              </Button>
            </form>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* MINIMAL AD FOOTER */}
      <footer className="border-t border-gold-dim/20 py-8 text-center text-[10px] font-mono text-text-tertiary px-6 pb-24 md:pb-8">
        <p>© {new Date().getFullYear()} Vishweshwara Sanskrit. Campaign Landing Experience.</p>
        <p className="mt-1 uppercase tracking-widest text-[#C8860A]/30">Live Online Cohort Study • Gurukula Heritage</p>
      </footer>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-ground/90 backdrop-blur-md border-t border-gold-dim md:hidden z-50 animate-fade-in">
        <Button
          onClick={scrollToForm}
          variant="primary"
          className="w-full shadow-lg !py-3"
        >
          Request Free Consultation
        </Button>
      </div>
    </div>
  );
};

