import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquareCode, Mail, ArrowRight, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { PageView } from '../types';
import { FadeInSection } from '../components/FadeInSection';
import { Button } from '../components/Button';
import { InlineWidget } from 'react-calendly';
import confetti from 'canvas-confetti';
import { playChime } from '../lib/audio';

interface BeginViewProps {
  onViewChange: (view: PageView) => void;
}

export const BeginView: React.FC<BeginViewProps> = ({ onViewChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    timezone: '',
    background: '',
    message: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('beginViewFormData');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved form data', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beginViewFormData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  const handleBackClick = () => {
    onViewChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    {
      step: '01',
      title: 'Free Diagnostic Call',
      desc: 'Schedule a brief 15-minute call via WhatsApp or Zoom to discuss your learning interests.'
    },
    {
      step: '02',
      title: 'Level Assessment',
      desc: 'The Acharya evaluates your current knowledge and phonetic comfort to align pacing.'
    },
    {
      step: '03',
      title: 'Batch Allocation',
      desc: 'Get assigned to a convenient weekend or weekday cohort and start your live shastra studies.'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-32">
      {/* Header and Back Link */}
      <FadeInSection delay={100}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 pt-28 text-left select-none">
          <Button
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="ghost"
            className="!px-0 text-text-gold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Button>
          
          <div className="mt-12 max-w-3xl space-y-4">
            <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">INITIATE STUDY</span>
            <h1 className="font-display text-4xl md:text-6xl font-light text-text-primary tracking-tight">
              Begin Your <span className="font-medium text-text-gold">Sadhana</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl">
              Take the first step towards authentic scriptural mastery. Choose your preferred method of contact below to schedule your introductory assessment.
            </p>
          </div>
        </div>
      </FadeInSection>

      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left select-none pb-24">
        {/* LEFT COLUMN: Timeline & Quick Contact */}
        <div className="lg:col-span-5 space-y-12">
          <FadeInSection delay={200}>
            <div className="space-y-8">
              <h3 className="font-serif text-2xl text-text-primary font-semibold border-b border-gold-dim pb-4">Onboarding Journey</h3>
              <div className="space-y-6">
                {steps.map((st, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-surface-2 border border-gold-mid flex items-center justify-center font-mono text-xs text-text-gold">
                        {st.step}
                      </div>
                      {i !== steps.length - 1 && (
                        <div className="w-px h-full bg-gold-dim mt-2"></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <h4 className="font-serif text-lg text-text-primary font-medium">{st.title}</h4>
                      <p className="font-sans text-sm text-text-secondary mt-1 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="bg-surface-2 border border-gold-mid p-6 rounded-xl shadow-lg space-y-5 hover:border-gold-bright transition-all duration-300 relative min-h-[300px]">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded bg-[#C8860A]/10 border border-gold-mid flex items-center justify-center">
                  <MessageSquareCode className="w-5 h-5 text-text-gold" />
                </div>
                <h3 className="font-serif text-xl text-text-primary font-semibold">Enrollment Inquiry</h3>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  Submit your details below to express interest in upcoming batches or personalized shastra studies.
                </p>
              </div>

              {isSubmitted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center animate-fade-in z-10 bg-surface-2 rounded-xl">
                  <div className="w-12 h-12 bg-gold-base/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-gold-base" />
                  </div>
                  <h4 className="text-text-gold font-medium mb-2">Inquiry Submitted</h4>
                  <p className="text-sm text-text-secondary">
                    Your application was sent successfully. Acharya will reach out to you soon.
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      name: formData.get('name') as string,
                      email: formData.get('email') as string,
                      phone: formData.get('phone') as string,
                      subject: formData.get('subject') as string,
                      timezone: formData.get('timezone') as string,
                      background: formData.get('background') as string,
                      message: formData.get('message') as string,
                    };
                    
                    try {
                      const { saveLead } = await import('../lib/firebase');
                      await saveLead(data);

                      setIsSubmitted(true);
                      
                      // Trigger gold confetti burst and meditative chime
                      confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#C8860A', '#E0A32E', '#F9C256', '#FFE391', '#F5F5F5']
                      });
                      playChime();

                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        timezone: '',
                        background: '',
                        message: ''
                      });
                      localStorage.removeItem('beginViewFormData');
                    } catch (error: any) {
                      console.error('Submission error:', error);
                      alert('Failed to submit inquiry: ' + error.message);
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-text-secondary uppercase tracking-wider block">Full Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name" 
                        required
                        disabled={isSubmitting}
                        className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/50 transition-all shadow-inner disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-text-secondary uppercase tracking-wider block">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com" 
                        required
                        disabled={isSubmitting}
                        className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/50 transition-all shadow-inner disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-text-secondary uppercase tracking-wider block">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (234) 567-8900" 
                        disabled={isSubmitting}
                        className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/50 transition-all shadow-inner disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-text-secondary uppercase tracking-wider block">Subject of Interest *</label>
                      <select 
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/50 transition-all shadow-inner appearance-none disabled:opacity-50"
                      >
                        <option value="" disabled>Select Subject</option>
                        <option value="Sanskrit Grammar">Sanskrit Grammar</option>
                        <option value="Bhagavad Gita">Bhagavad Gita</option>
                        <option value="Advaita Vedanta">Advaita Vedanta</option>
                        <option value="Vedic Chanting">Vedic Chanting</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-text-secondary uppercase tracking-wider block">Your Timezone *</label>
                      <input 
                        type="text" 
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        placeholder="e.g. IST, EST" 
                        required
                        disabled={isSubmitting}
                        className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/50 transition-all shadow-inner disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium text-text-secondary uppercase tracking-wider block">Current Knowledge Level *</label>
                      <select 
                        name="background"
                        required
                        value={formData.background}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/50 transition-all shadow-inner appearance-none disabled:opacity-50"
                      >
                        <option value="" disabled>Select Level</option>
                        <option value="Complete Beginner">Complete Beginner</option>
                        <option value="Know Alphabet/Basic Reading">Know Alphabet/Basic Reading</option>
                        <option value="Intermediate (Studied previously)">Intermediate (Studied previously)</option>
                        <option value="Advanced (Seeking Shastra study)">Advanced (Seeking Shastra study)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-medium text-text-secondary uppercase tracking-wider block">Learning Goals *</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about what you want to achieve..." 
                      required
                      rows={3}
                      disabled={isSubmitting}
                      className="w-full bg-[#0E0B07] border border-gold-dim/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-base focus:ring-1 focus:ring-gold-base/50 transition-all shadow-inner resize-none disabled:opacity-50"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 shadow-xl disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                  </Button>
                </form>
              )}
            </div>
          </FadeInSection>
          
          <FadeInSection delay={400}>
             <div className="flex items-center space-x-3 p-4 rounded-lg border border-gold-dim bg-surface-2">
                <Clock className="w-5 h-5 text-text-gold shrink-0" />
                <div>
                  <h4 className="font-sans text-sm text-text-primary font-semibold">Active Operating Timings</h4>
                  <p className="font-sans text-xs text-text-secondary mt-0.5">Weekdays (Evening) & Weekends (Full-Day)</p>
                </div>
             </div>
          </FadeInSection>
        </div>

        {/* RIGHT COLUMN: Smart Form */}
        <div className="lg:col-span-7">
          <FadeInSection delay={200}>
            <div className="bg-surface-2 border border-gold-mid rounded-xl p-8 shadow-xl space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  <span>Direct Calendly Booking</span>
                </div>
                <h3 className="font-serif text-3xl text-text-primary font-semibold">Diagnostic Call Booking</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  Select a convenient time below to lock in your 15-minute diagnostic call with the Acharya. 
                </p>
              </div>

              <div className="w-full bg-[#0E0B07] rounded-lg overflow-hidden border border-gold-dim">
                <InlineWidget 
                  url="https://calendly.com/visanskrit-solopreneur/30min" 
                  styles={{ height: '700px', width: '100%', minWidth: '320px' }}
                  pageSettings={{
                    backgroundColor: '0E0B07',
                    hideEventTypeDetails: true,
                    hideLandingPageDetails: true,
                    hideGdprBanner: true,
                    primaryColor: 'C8860A',
                    textColor: 'FAF6EE'
                  }}
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};
