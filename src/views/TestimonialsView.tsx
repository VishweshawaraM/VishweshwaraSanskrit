/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, Star, Users, MapPin, PlayCircle, MessageSquare, Heart } from 'lucide-react';
import { TESTIMONIALS_ITEMS } from '../data';
import { PageView } from '../types';

interface TestimonialsViewProps {
  onViewChange: (view: PageView) => void;
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({ onViewChange }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  const filters = [
    { id: 'all', label: 'All Subjects' },
    { id: 'Samskrita', label: 'Sanskrit Language' },
    { id: 'Gita', label: 'Bhagavad Gita' },
    { id: 'Veda', label: 'Veda Chanting' },
    { id: 'Puja', label: 'Puja Vidhi' },
    { id: 'Vedanta', label: 'Advaita Vedanta' }
  ];

  const filteredItems = activeFilter === 'all'
    ? TESTIMONIALS_ITEMS
    : TESTIMONIALS_ITEMS.filter(item => item.subject.toLowerCase() === activeFilter.toLowerCase());

  const featuredTestimonials = TESTIMONIALS_ITEMS.filter(item => item.featured);

  return (
    <div className="space-y-24 md:space-y-32">
      {/* SECTION 1 - Page Hero */}
      <section className="relative pt-32 pb-16 bg-[#0E0B07] border-b border-gold-mid overflow-hidden px-6 md:px-12 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#1F160D_0%,transparent_100%)] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-left space-y-4">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> TESTIMONIALS & TRUST • SINCERE SEEKERS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-text-primary tracking-tight leading-none">
            Student <br />
            <span className="font-medium text-text-gold">Voices & Experiences</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Read direct experiences from global software architects, indology scholars, and yoga teachers who have found mental focus and linguistic purity.
          </p>
        </div>
      </section>

      {/* SECTION 2 - Filter Bar (Subject pills) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 select-none">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-3 border-y border-gold-dim/40 bg-surface-1/50 rounded-lg">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4.5 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-150 ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-gold-base to-gold-bright text-ground font-semibold shadow'
                  : 'text-text-secondary hover:text-text-gold bg-surface-2 border border-gold-dim/30'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 3 - Stats Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 select-none">
        <div className="bg-surface-2 border border-gold-mid/40 rounded-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-gold-base to-transparent"></div>
          
          <div className="space-y-1">
            <h4 className="font-display text-3xl md:text-4xl font-semibold text-text-gold">100%</h4>
            <p className="font-mono text-xs tracking-widest text-text-primary uppercase">Direct Mentorship</p>
            <p className="font-sans text-xs text-text-tertiary">Every session is live with Acharya</p>
          </div>

          <div className="space-y-1 border-y md:border-y-0 md:border-x border-gold-dim/30 py-6 md:py-0">
            <h4 className="font-display text-3xl md:text-4xl font-semibold text-text-gold">4.9 / 5</h4>
            <div className="flex justify-center space-x-1 text-text-gold py-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="font-mono text-xs tracking-widest text-text-primary uppercase">Average Rating</p>
            <p className="font-sans text-xs text-text-tertiary">Verified by continuous student cohorts</p>
          </div>

          <div className="space-y-1">
            <h4 className="font-display text-3xl md:text-4xl font-semibold text-text-gold">8+</h4>
            <p className="font-mono text-xs tracking-widest text-text-primary uppercase">Countries Reached</p>
            <p className="font-sans text-xs text-text-tertiary">Sanskrit spreading globally across oceans</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 - Featured Testimonial Large Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 text-left select-none">
        <h3 className="font-serif text-2xl tracking-widest text-text-gold uppercase font-bold border-b border-gold-dim/30 pb-2">
          ✦ Featured Transformations
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-surface-2 border border-gold-mid p-8 rounded-xl shadow-xl space-y-6 relative overflow-hidden group hover:border-gold-bright transition-all duration-220 flex flex-col justify-between min-h-[300px]"
            >
              <Quote className="w-12 h-12 text-[#C8860A]/8 absolute top-4 right-4" />
              
              <div className="space-y-4">
                <span className="font-mono text-[9px] tracking-widest text-text-gold uppercase block">Verified Scholar Review</span>
                <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-6 border-t border-gold-dim/40">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#2A1E12] to-[#1F160D] border border-gold-mid flex items-center justify-center font-serif text-text-gold font-bold text-lg">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif text-base text-text-primary font-semibold">{item.name}</h4>
                  <p className="font-sans text-xs text-text-tertiary">{item.role}</p>
                  <div className="flex items-center space-x-1 text-xs mt-0.5">
                    <span className="text-[10px] font-mono text-text-gold uppercase tracking-wider bg-gold-dim px-2 py-0.5 rounded border border-gold-dim">
                      {item.subject}
                    </span>
                    <span className="text-text-tertiary">•</span>
                    <span className="text-text-tertiary">{item.location} {item.flag}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 - General Testimonials Filtered List */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 select-none text-left">
        <h3 className="font-serif text-2xl tracking-widest text-text-gold uppercase font-bold border-b border-gold-dim/30 pb-2">
          ✦ Core Student Body
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22 }}
                key={item.id}
                className="bg-surface-2 border border-gold-dim/40 hover:border-gold-mid p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[260px] transition-all duration-220 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-wider text-text-gold uppercase bg-gold-dim px-2 py-0.5 rounded border border-gold-dim">
                      {item.subject}
                    </span>
                    <span className="text-xs">{item.flag}</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-text-secondary italic leading-relaxed">
                    "{item.content}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-gold-dim/30 mt-6">
                  <div className="h-9 w-9 rounded-full bg-surface-3 border border-gold-dim flex items-center justify-center font-serif text-text-gold font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-text-primary font-medium">{item.name}</h4>
                    <p className="font-sans text-[10px] text-text-tertiary">{item.role}</p>
                    <p className="font-sans text-[9px] text-text-tertiary">{item.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 6 - Video Recitation Interface */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 select-none">
        <div className="bg-surface-2 border border-gold-mid rounded-xl p-8 space-y-6 text-center shadow-2xl relative overflow-hidden">
          <div className="space-y-1.5">
            <span className="font-mono text-xs tracking-widest text-text-gold uppercase block">AUDITORY INTEGRITY</span>
            <h4 className="font-serif text-xl md:text-2xl text-text-primary font-medium">Hear the Precision of Chant Recitations</h4>
            <p className="font-sans text-xs text-text-secondary max-w-md mx-auto">
              Sanskrit is a vibrational language. Tap below to listen to a brief demo of the traditional oral Svara chanting and Paninian structural breakdowns:
            </p>
          </div>

          {/* Styled vector audio waveform player */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-lg bg-surface-1 border border-gold-dim flex items-center justify-center overflow-hidden p-6 group">
            
            {isPlayingVideo ? (
              <div className="space-y-4 w-full">
                {/* Active audio waveform animation */}
                <div className="flex items-end justify-center space-x-1.5 h-16 w-48 mx-auto">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [20, Math.random() * 50 + 20, 20] }}
                      transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
                      className="w-1.5 bg-gradient-to-t from-gold-base to-gold-glow rounded-full"
                    ></motion.div>
                  ))}
                </div>
                <p className="font-mono text-xs text-text-gold uppercase tracking-[0.15em] animate-pulse-slow">
                  Chanting: Taittiriya Upanishad Shiksha Valli (Live Demonstration)
                </p>
                <button
                  onClick={() => setIsPlayingVideo(false)}
                  className="px-4 py-1.5 rounded border border-gold-dim text-xs font-mono text-text-secondary hover:text-text-gold hover:border-text-gold transition-colors"
                >
                  Stop Recording
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button onClick={() => setIsPlayingVideo(true)} className="outline-none focus:scale-115 active:scale-95 transition-transform duration-100">
                  <PlayCircle className="w-16 h-16 text-text-gold hover:text-gold-bright transition-colors cursor-pointer" />
                </button>
                <div className="space-y-0.5">
                  <p className="font-mono text-xs text-text-primary uppercase tracking-wider">Taittiriya Upanishad Chanting Recitation</p>
                  <p className="font-sans text-[10px] text-text-tertiary">Live recording by Acharya • 1 min audio preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
