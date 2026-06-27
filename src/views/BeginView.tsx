/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, MessageSquareCode, Mail, ArrowRight, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { PageView } from '../types';
import { FadeInSection } from '../components/FadeInSection';
import { Button } from '../components/Button';

import { saveLead } from '../lib/firebase';

interface BeginViewProps {
  onViewChange: (view: PageView) => void;
}

export const BeginView: React.FC<BeginViewProps> = ({ onViewChange }) => {
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

  const handleBackClick = () => {
    onViewChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="space-y-24 md:space-y-32">
      {/* Header and Back Link */}
      <FadeInSection delay={100}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 text-left select-none">
          <Button
            onClick={handleBackClick}
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

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left select-none pb-24">
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
            <div className="bg-surface-2 border border-gold-mid p-6 rounded-xl shadow-lg space-y-5 hover:border-gold-bright transition-all duration-300">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded bg-[#C8860A]/10 border border-gold-mid flex items-center justify-center">
                  <Mail className="w-5 h-5 text-text-gold" />
                </div>
                <h3 className="font-serif text-xl text-text-primary font-semibold">Institutional Email</h3>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  For academic institutions, study centers, or detailed corporate cohort syllabus requests.
                </p>
              </div>

              <Button
                href="mailto:visanskrit.solopreneur@gmail.com?subject=Sanskrit%20Learning%20Cohort%20Inquiry"
                variant="primary"
                className="w-full"
              >
                <span>Send Official Email</span>
              </Button>
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
                  <MessageSquareCode className="w-3 h-3" />
                  <span>Instant WhatsApp Routing</span>
                </div>
                <h3 className="font-serif text-3xl text-text-primary font-semibold">Syllabus Request & Booking</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  Fill out your parameters below. This securely formats your details for WhatsApp dispatch, ensuring the Acharya reads your request with full context.
                </p>
              </div>

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
                    <span>{isSubmitting ? 'Saving...' : submitted ? 'Request Received' : 'Compile & Chat with Acharya'}</span>
                    {!isSubmitting && !submitted && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
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
      </div>
    </div>
  );
};
