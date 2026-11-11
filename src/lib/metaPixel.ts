import { META_PIXEL_ID, TRACKING_ENABLED } from '../config/tracking';

// Consent-gated Meta Pixel. Nothing here runs unless a Pixel ID is configured AND the visitor accepted.
// No personal data is ever sent: only the page view and three anonymous click events.

const KEY = 'vs-ad-consent-v1';
export type Consent = 'granted' | 'denied' | null;

declare global {
  interface Window { fbq?: ((...a: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown }; _fbq?: unknown }
}

export const readConsent = (): Consent => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch { return null; }
};

export const saveConsent = (v: 'granted' | 'denied') => {
  try { localStorage.setItem(KEY, v); } catch { /* storage blocked: choice lasts for this visit only */ }
};

// A visitor whose browser sends "Global Privacy Control" has already said no.
export const browserSaysNo = (): boolean => {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || navigator.doNotTrack === '1';
};

let loaded = false;

export const loadPixel = () => {
  if (!TRACKING_ENABLED || loaded || typeof window === 'undefined') return;
  loaded = true;
  /* Standard Meta Pixel bootstrap, with the ID taken from config. */
  const w = window;
  if (!w.fbq) {
    const n = function (...args: unknown[]) {
      const f = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
      if (f.callMethod) f.callMethod(...args); else f.queue.push(args);
    } as unknown as NonNullable<Window['fbq']>;
    if (!w._fbq) w._fbq = n;
    (n as unknown as { push: unknown }).push = n;
    n.loaded = true; n.version = '2.0'; n.queue = [];
    w.fbq = n;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
  }
  w.fbq?.('init', META_PIXEL_ID);
  w.fbq?.('track', 'PageView');
};

export const trackPageView = () => {
  if (loaded) window.fbq?.('track', 'PageView');
};

export const trackEvent = (name: 'Contact' | 'InitiateCheckout') => {
  if (loaded) window.fbq?.('track', name);
};

export const isPixelActive = () => loaded;
