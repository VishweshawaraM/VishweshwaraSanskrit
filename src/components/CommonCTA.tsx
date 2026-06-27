/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PageView } from '../types';
import { Button } from './Button';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CommonCTAProps {
  onViewChange: (view: PageView) => void;
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
}

export const CommonCTA: React.FC<CommonCTAProps> = ({
  onViewChange,
  title = "Begin Your Shastra Journey",
  subtitle = "ONLINE CLASSES • PERSONAL MENTORSHIP • AUTHENTIC LINEAGE",
  description = "Join a global community of dedicated seekers. Learn Vedas, Vyakarana, Advaita Vedanta, and Bhagavad Gita directly from a traditionally trained Gurukula scholar.",
  ctaText = "Request Free Personal Consultation"
}) => {
  const handleCTAClick = () => {
    onViewChange('begin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 md:py-28 bg-surface-1 border-t border-gold-mid overflow-hidden text-center px-6 md:px-12 select-none">
      {/* Absolute OM Watermark (Sanskrit placement rule) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="font-devanagari text-[18rem] md:text-[32rem] text-gold-base leading-none">
          ॐ
        </span>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-gold-base/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-6 md:space-y-8">
        <div className="space-y-3">
          {/* Section micro-label (MONO • GOLD • SMALL) */}
          <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-text-gold uppercase block">
            ✦ {subtitle} ✦
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-text-primary tracking-tight leading-tight max-w-2xl mx-auto">
            {title}
          </h2>
        </div>

        <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed max-w-xl mx-auto">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={handleCTAClick}
            variant="primary"
            className="w-full sm:w-auto group"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            href="https://wa.me/919482698612?text=Hari%20Om,%20I%20would%20like%20to%20schedule%20a%20Sanskrit%20learning%20consultation."
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>Connect on WhatsApp</span>
          </Button>
        </div>

        {/* Minimal Sanskrit footer ornament */}
        <div className="pt-6">
          <p className="font-serif text-xs italic text-text-tertiary">
            "Sa Vidya Ya Vimuktaye" — True education is that which liberates.
          </p>
        </div>
      </div>
    </section>
  );
};
