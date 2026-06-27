import React, { useState } from 'react';
import { ShieldCheck, MessageSquareCode, Users, Star, ArrowRight, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import { Logo } from '../components/Logo';
import { PageView } from '../types';
import { FadeInSection } from '../components/FadeInSection';
import { Button } from '../components/Button';
import { saveLead } from '../lib/firebase';

interface LandingViewProps {
  onViewChange: (view: PageView) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onViewChange }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Samskrita Language');
  const [timezone, setTimezone] = useState('India (IST)');
  const [background, setBackground] = useState('Zero prior knowledge');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const subjects = [
    'Samskrita Language',
    'Bhagavad Gita',
    'Veda Mantra Chanting',
    'Advaita Vedanta',
    'Puja Vidhi & Rituals',
    'Stotras & Suktams'
  ];

  const timezones = [
    'India (IST)',
    'North America Eastern (EST)',
    'North America Pacific (PST)',
    'Europe Central (CET)',
    'Southeast Asia (SGT)',
    'Australia Eastern (AEST)'
  ];

  const scrollToForm = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveLead({
        name,
        email,
        subject,
        timezone,
        background,
        message
      });
      
      setSubmitted(true);
      
      // Still open whatsapp as a fallback
      const text = `Hari Om Acharyaji,%0A%0AMy name is *${name}*. I am interested in learning *${subject}*.%0A%0A*My details:*%0A• *Timezone:* ${timezone}%0A• *Prior Background:* ${background}%0A• *Message:* ${message || 'I would like to schedule a free 15-minute diagnostic assessment.'}%0A%0APlease let me know the upcoming batch availability. Dhanyavadah!`;
      const url = `https://wa.me/919482698612?text=${text}`;
      setTimeout(() => {
        window.open(url, '_blank');
      }, 1500);
      
    } catch (err) {
      console.error(err);
      alert('Failed to submit form. Please try again or use WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const painPoints = [
    "Struggling with DIY apps that don't explain the grammar rules?",
    "Lost translation nuances reading English commentaries?",
    "Unsure if your Vedic chanting pronunciation is correct?"
  ];

  return (
    <div className="bg-ground min-h-screen text-text-primary flex flex-col relative pb-20 md:pb-0">
      
      {/* 1. MINIMAL HEADER (No navigation to prevent leaks) */}
      <header className="sticky top-0 z-50 bg-ground/90 backdrop-blur-md border-b border-gold-dim py-4 px-6 md:px-12 flex items-center justify-between">
        <Logo variant="horizontal" size={36} />
        
        <button
          onClick={scrollToForm}
          className="px-4 py-2 rounded bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-[10px] md:text-xs tracking-wider uppercase font-semibold active:scale-95 transition-transform"
        >
          Book Free Session
        </button>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-6 md:px-12 overflow-hidden flex-1 flex flex-col items-center text-center justify-center min-h-[70vh]">
        
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border border-gold-base absolute"></div>
          <div className="w-[600px] h-[600px] rounded-full border border-gold-base absolute"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10 mt-8">
          <FadeInSection delay={100}>
            <div className="inline-flex items-center space-x-2 bg-surface-2 border border-gold-dim px-4 py-1.5 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] text-text-gold tracking-widest uppercase font-medium">Accepting New Students for 2026</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl text-text-primary leading-[1.1] font-medium tracking-tight">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-base to-gold-bright">Sanskrit & Shastras</span> with a Traditional Acharya
            </h1>
          </FadeInSection>

          <FadeInSection delay={200}>
            <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              Stop guessing pronunciation with apps. Learn directly from Acharya Vishweshwara through interactive live sessions. Structured curriculum from grammar to Advaita Vedanta.
            </p>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                onClick={scrollToForm}
                variant="primary"
                className="w-full sm:w-auto group"
              >
                <span>Request Free Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="font-mono text-[10px] text-text-tertiary mt-4 tracking-wider uppercase">
              Limited to 15 students per cohort
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 3. AGITATION & SOLUTION */}
      <section className="bg-surface-1 py-16 px-6 md:px-12 border-y border-gold-dim">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="font-mono text-[10px] text-text-gold tracking-widest uppercase border-b border-gold-dim pb-2 block">The Problem</span>
            <ul className="space-y-4">
              {painPoints.map((pt, i) => (
                <li key={i} className="flex items-start space-x-3 text-text-secondary font-sans text-sm">
                  <AlertTriangle className="w-4 h-4 text-[#C8860A] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 bg-surface-2 p-8 rounded-xl border border-gold-dim">
            <span className="font-mono text-[10px] text-text-gold tracking-widest uppercase border-b border-gold-dim pb-2 block">The Solution</span>
            <h3 className="font-serif text-2xl text-text-primary">Gurukula Pedagogy, Online.</h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              We bring the rigorous oral tradition (Parampara) directly to your screen. Get instant phonetic corrections, ask real-time grammatical doubts, and read commentaries line-by-line under expert guidance.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Users className="w-5 h-5 text-text-gold" />
                <h4 className="font-mono text-[10px] uppercase text-text-primary tracking-wider">Live Classes</h4>
              </div>
              <div className="space-y-2">
                <MessageSquareCode className="w-5 h-5 text-text-gold" />
                <h4 className="font-mono text-[10px] uppercase text-text-primary tracking-wider">1-on-1 Support</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOCIAL PROOF (Compact) */}
      <section className="py-20 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-text-primary font-medium">Join 500+ Global Students</h2>
            <div className="flex items-center justify-center space-x-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-[#C8860A] fill-current" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-surface-1 p-6 rounded border border-gold-dim/30">
              <p className="font-sans text-sm text-text-secondary italic">"I tried learning from books for years, but one month of live phonetic correction changed my entire chanting ability."</p>
              <div className="mt-4 font-mono text-[10px] tracking-wider text-text-gold uppercase">— Software Engineer, US</div>
            </div>
            <div className="bg-surface-1 p-6 rounded border border-gold-dim/30">
              <p className="font-sans text-sm text-text-secondary italic">"Acharya makes Advaita concepts accessible without diluting the original Sanskrit commentaries."</p>
              <div className="mt-4 font-mono text-[10px] tracking-wider text-text-gold uppercase">— Yoga Teacher, UK</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FORM SECTION */}
      <section id="booking-form" className="bg-surface-2 border-y border-gold-mid py-20 px-6 md:px-12 text-center select-none">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">Begin Your Journey</span>
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary font-medium tracking-tight">
              Schedule Your Free Diagnostic
            </h2>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Test your vocal alignment, review the syllabus, and select the optimal study cohort. All details will be securely saved and sent directly to Acharya.
            </p>
          </div>

          <FadeInSection delay={200}>
            <div className="bg-surface-1 border border-gold-mid rounded-xl p-8 shadow-xl space-y-8 text-left max-w-3xl mx-auto">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="font-mono text-xs tracking-wider text-text-primary uppercase font-medium">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Nair"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting || submitted}
                      className="w-full bg-[#0E0B07] border border-gold-dim hover:border-gold-mid rounded p-3.5 font-sans text-sm text-text-primary focus:border-text-gold focus:ring-1 focus:ring-text-gold outline-none transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs tracking-wider text-text-primary uppercase font-medium">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting || submitted}
                      className="w-full bg-[#0E0B07] border border-gold-dim hover:border-gold-mid rounded p-3.5 font-sans text-sm text-text-primary focus:border-text-gold focus:ring-1 focus:ring-text-gold outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="font-mono text-xs tracking-wider text-text-primary uppercase font-medium">Subject Interest</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      disabled={isSubmitting || submitted}
                      className="w-full bg-[#0E0B07] border border-gold-dim hover:border-gold-mid rounded p-3.5 font-sans text-sm text-text-primary focus:border-text-gold focus:ring-1 focus:ring-text-gold outline-none transition-all appearance-none disabled:opacity-50"
                    >
                      {subjects.map((sub, index) => (
                        <option key={index} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs tracking-wider text-text-primary uppercase font-medium">Your Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      disabled={isSubmitting || submitted}
                      className="w-full bg-[#0E0B07] border border-gold-dim hover:border-gold-mid rounded p-3.5 font-sans text-sm text-text-primary focus:border-text-gold focus:ring-1 focus:ring-text-gold outline-none transition-all appearance-none disabled:opacity-50"
                    >
                      {timezones.map((tz, index) => (
                        <option key={index} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs tracking-wider text-text-primary uppercase font-medium">Prior Background</label>
                  <select
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    disabled={isSubmitting || submitted}
                    className="w-full bg-[#0E0B07] border border-gold-dim hover:border-gold-mid rounded p-3.5 font-sans text-sm text-text-primary focus:border-text-gold focus:ring-1 focus:ring-text-gold outline-none transition-all appearance-none disabled:opacity-50"
                  >
                    <option value="Zero prior knowledge">Zero prior knowledge</option>
                    <option value="Basic reading literacy">Basic reading literacy</option>
                    <option value="Intermediate studies">Intermediate studies</option>
                    <option value="Advanced shastra student">Advanced student</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs tracking-wider text-text-primary uppercase font-medium">Personal Message (Optional)</label>
                  <textarea
                    rows={4}
                    placeholder="Tell Acharya about your learning aspirations, preferred days, or specific questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting || submitted}
                    className="w-full bg-[#0E0B07] border border-gold-dim hover:border-gold-mid rounded p-3.5 font-sans text-sm text-text-primary focus:border-text-gold focus:ring-1 focus:ring-text-gold outline-none transition-all resize-none disabled:opacity-50"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="emerald"
                    className="w-full group"
                    disabled={isSubmitting || submitted}
                  >
                    {/* Added WhatsApp Icon here! */}
                    <MessageSquareCode className="w-5 h-5 mr-2" />
                    <span>{isSubmitting ? 'Saving...' : submitted ? 'Request Received' : 'Chat with Acharya on WhatsApp'}</span>
                    {!isSubmitting && !submitted && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                    {submitted && <CheckCircle className="w-4 h-4 ml-2" />}
                  </Button>
                  <p className="font-sans text-[10px] text-text-tertiary text-center mt-3 flex items-center justify-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Your request will be securely saved and routed to WhatsApp.</span>
                  </p>
                </div>
              </form>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 6. MINIMAL AD FOOTER (No links, purely privacy) */}
      <footer className="border-t border-gold-dim/20 py-8 text-center text-[10px] font-mono text-text-tertiary px-6">
        <p>© {new Date().getFullYear()} Vishweshwara Sanskrit. Campaign Landing Experience.</p>
        <p className="mt-1 uppercase tracking-widest text-[#C8860A]/30">Live Online Cohort Study • Gurukula Heritage</p>
      </footer>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-ground/90 backdrop-blur-md border-t border-gold-dim md:hidden z-50 animate-fade-in">
        <Button
          onClick={scrollToForm}
          variant="primary"
          className="w-full shadow-lg"
        >
          Request Free Assessment
        </Button>
      </div>

    </div>
  );
};
