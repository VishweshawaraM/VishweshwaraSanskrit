import React from 'react';
import { BadgeCheck } from 'lucide-react';

export const GOOGLE_REVIEWS_URL = 'https://share.google/YJDHCZgoFpiePUgA6';

/** Small badge for testimonials copied from the Google Business Profile; links to the live reviews. */
export const GoogleVerified: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a
    href={GOOGLE_REVIEWS_URL}
    target="_blank"
    rel="noopener noreferrer"
    title="Read this review on Google"
    className={`inline-flex items-center gap-1 text-[10px] font-medium text-[#4285F4] hover:underline ${className}`}
  >
    <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
    <span>Verified Google review</span>
  </a>
);
