/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, MessageSquareCode, Mail, ArrowRight, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { PageView } from '../types';
import { FadeInSection } from '../components/FadeInSection';
import { Button } from '../components/Button';
import { InlineWidget } from 'react-calendly';

interface BeginViewProps {
  onViewChange: (view: PageView) => void;
}

export const BeginView: React.FC<BeginViewProps> = ({ onViewChange }) => {
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

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const email = formData.get('email');
                  const message = formData.get('message');
                  
                  try {
                    await fetch('/api/email', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        to: 'visanskrit.solopreneur@gmail.com',
                        subject: `Institution Inquiry from ${email}`,
                        html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
                      }),
                    });
                    alert('Email sent successfully!');
                    (e.target as HTMLFormElement).reset();
                  } catch (error) {
                    alert('Failed to send email.');
                  }
                }}
                className="space-y-3"
              >
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email Address" 
                  required
                  className="w-full bg-[#0E0B07] border border-gold-dim rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-base transition-colors"
                />
                <textarea 
                  name="message"
                  placeholder="Your Message..." 
                  required
                  rows={3}
                  className="w-full bg-[#0E0B07] border border-gold-dim rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-gold-base transition-colors resize-none"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                >
                  <span>Send Official Email</span>
                </Button>
              </form>
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
