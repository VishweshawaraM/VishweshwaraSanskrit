import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquareCode, Mail, ArrowRight, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { PageView } from '../types';
import { FadeInSection } from '../components/FadeInSection';
import { Button } from '../components/Button';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { WHATSAPP_COMMUNITY_URL, whatsappLink } from '../courses';
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
    const saved = sessionStorage.getItem('beginViewFormData');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved form data', e);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('beginViewFormData', JSON.stringify(formData));
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

          
          <FadeInSection delay={400}>
             <div className="flex items-center space-x-3 p-4 rounded-lg border border-gold-dim bg-surface-2">
                <Clock className="w-5 h-5 text-text-gold shrink-0" />
                <div>
                  <h4 className="font-sans text-sm text-text-primary font-semibold">Active Operating Timings</h4>
                  <p className="font-sans text-xs text-text-secondary mt-0.5">Weekdays (Evening) & Weekends (Full-Day)</p>
                </div>
             </div>
          </FadeInSection>

          <FadeInSection delay={500}>
            <div className="p-6 rounded-lg border border-gold-mid bg-surface-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#C8860A]/10 border border-gold-mid flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-text-gold" aria-hidden="true" />
                </div>
                <h4 className="font-serif text-lg text-text-primary font-semibold">Join the WhatsApp Community</h4>
              </div>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Hear first about free open classes, new batches and short teachings from the Acharya. Tap below and it opens in WhatsApp; just press Join.
              </p>
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright hover:brightness-110 text-ground font-mono text-[11px] tracking-widest uppercase font-semibold transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" aria-hidden="true" />
                <span>Join the Community</span>
              </a>
            </div>
          </FadeInSection>
        </div>

        {/* RIGHT COLUMN: Enrollment Inquiry form */}
        <div className="lg:col-span-7">
          <FadeInSection delay={200}>
            <div className="bg-surface-2 border border-gold-mid p-6 rounded-xl shadow-lg space-y-5 hover:border-gold-bright transition-all duration-300 relative min-h-[300px]">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded bg-[#C8860A]/10 border border-gold-mid flex items-center justify-center">
                  <MessageSquareCode className="w-5 h-5 text-text-gold" />
                </div>
                <h3 className="font-serif text-xl text-text-primary font-semibold">Message the Acharya</h3>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  Choose what you would like to learn. WhatsApp opens with a ready message, and the Acharya replies personally. This website does not collect your details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[{"label": "Sanskrit", "msg": "Hari Om Acharya ji, I would like to learn Sanskrit."}, {"label": "Bhagavad Gita", "msg": "Hari Om Acharya ji, I would like to learn the Bhagavad Gita."}, {"label": "Krishna Yajurveda chanting", "msg": "Hari Om Acharya ji, I would like to learn Krishna Yajurveda chanting."}, {"label": "Advaita Vedanta", "msg": "Hari Om Acharya ji, I would like to study Advaita Vedanta."}, {"label": "Stotras", "msg": "Hari Om Acharya ji, I would like to learn stotras."}, {"label": "Samskrita Samskara Pravesha (children 8–14)", "msg": "Hari Om Acharya ji, I would like to know about Samskrita Samskara Pravesha for my child."}].map(t => (
                  <a key={t.label} href={whatsappLink(t.msg)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-3 px-4 py-3.5 rounded-lg border border-gold-dim hover:border-gold-bright text-text-primary hover:text-gold-bright font-sans text-sm transition-colors">
                    <span>{t.label}</span>
                    <WhatsAppIcon className="w-4 h-4 text-gold-bright shrink-0" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};
