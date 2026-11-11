import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TRACKING_ENABLED } from '../config/tracking';
import { browserSaysNo, loadPixel, readConsent, saveConsent, trackEvent, trackPageView } from '../lib/metaPixel';

/**
 * Asks once whether we may measure which ads bring parents to the site.
 * Renders nothing (and loads nothing) unless a Pixel ID is configured.
 * The Pixel loads only after "Accept". "No thanks" and Global Privacy Control both keep it off.
 */
export const ConsentBanner: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    if (browserSaysNo()) return;
    const c = readConsent();
    if (c === 'granted') loadPixel();
    else if (c === null) setOpen(true);
  }, []);

  // Single-page site: count each page change after the first load
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    trackPageView();
  }, [pathname]);

  // Anonymous click events: opening WhatsApp, or opening a Razorpay payment page
  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      const href = a?.getAttribute('href') ?? '';
      if (/^https:\/\/(wa\.me|chat\.whatsapp\.com)\//.test(href)) trackEvent('Contact');
      else if (/^https:\/\/(rzp\.io|pages\.razorpay\.com)\//.test(href)) trackEvent('InitiateCheckout');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!TRACKING_ENABLED || !open || pathname.startsWith('/admin')) return null;

  const choose = (v: 'granted' | 'denied') => {
    saveConsent(v);
    setOpen(false);
    if (v === 'granted') loadPixel();
  };

  return (
    <div role="dialog" aria-label="Measurement choice" aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[9999] p-3 md:p-4" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-3xl mx-auto rounded-2xl border border-gold-mid bg-ground/95 backdrop-blur p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center shadow-2xl">
        <p className="font-sans text-sm text-text-secondary leading-relaxed flex-1">
          May we measure which of our ads brings parents to this site? If you accept, Meta’s measurement tool runs while you browse.
          We never send your name, number or your child’s details. Read the <Link to="/privacy" className="underline text-text-gold">Privacy Notice</Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button type="button" onClick={() => choose('denied')}
            className="px-5 py-3 rounded-lg border border-gold-dim text-text-primary font-mono text-[11px] tracking-widest uppercase hover:bg-surface-2">No thanks</button>
          <button type="button" onClick={() => choose('granted')}
            className="px-5 py-3 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-[11px] tracking-widest uppercase font-semibold hover:brightness-110">Accept</button>
        </div>
      </div>
    </div>
  );
};
