import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

/**
 * Deepavali 2026 festive layer.
 * Shows from Mon 9 Nov 2026 00:00 IST until Sun 15 Nov 2026 23:59 IST, then
 * switches itself off. Add ?deepavali to any URL to preview it outside those dates.
 */
const START = Date.parse('2026-11-09T00:00:00+05:30');
const END = Date.parse('2026-11-16T00:00:00+05:30');

export const isDeepavaliSeason = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).has('deepavali')) return true;
  const now = Date.now();
  return now >= START && now < END;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ── A single clay diya with a living flame ─────────────────────────────── */
export const Diya: React.FC<{ delay?: number; size?: number; className?: string }> = ({ delay = 0, size = 44, className = '' }) => {
  const id = useRef(`d${Math.random().toString(36).slice(2, 8)}`).current;
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className={`overflow-visible ${className}`}
      aria-hidden="true"
      style={{ ['--deepa-delay' as string]: `${delay}ms` }}
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD36B" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#E0A32E" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#E0A32E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-flame`} cx="50%" cy="72%" r="65%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="35%" stopColor="#FFE08A" />
          <stop offset="75%" stopColor="#F2A93B" />
          <stop offset="100%" stopColor="#C8600A" />
        </radialGradient>
        <linearGradient id={`${id}-clay`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0A32E" />
          <stop offset="18%" stopColor="#A86A12" />
          <stop offset="100%" stopColor="#3B2408" />
        </linearGradient>
      </defs>

      {/* glow */}
      <circle className="deepa-glow" cx="30" cy="22" r="26" fill={`url(#${id}-glow)`} />
      {/* flame */}
      <g className="deepa-flame">
        <path d="M30 8 C35 17 38 24 34 30 C32.5 32.5 27.5 32.5 26 30 C22 24 25 17 30 8 Z" fill={`url(#${id}-flame)`} />
        <path d="M30 18 C32 23 33 26 31.5 29 C30.8 30.2 29.2 30.2 28.5 29 C27 26 28 23 30 18 Z" fill="#FFFDF5" opacity="0.9" />
      </g>
      {/* wick */}
      <rect x="29.2" y="31" width="1.6" height="4" rx="0.8" fill="#2A1A06" />
      {/* clay lamp: bowl with a pinched spout */}
      <path
        d="M6 36 C6 36 14 34 30 34 C40 34 48 35 54 33 C52 37 50 39 47 40 C44 49 37 52 30 52 C21 52 14 48 11 41 C8 40 6 38 6 36 Z"
        fill={`url(#${id}-clay)`}
      />
      <path d="M8 36.5 C14 35 22 34.6 30 34.6 C40 34.6 47 35.5 52 34" stroke="#FFE08A" strokeOpacity="0.55" strokeWidth="1" fill="none" />
      {/* simple incised pattern */}
      <path d="M17 43 Q20 46 23 43 Q26 46 29 43 Q32 46 35 43 Q38 46 41 43" stroke="#E0A32E" strokeOpacity="0.45" strokeWidth="0.9" fill="none" />
    </svg>
  );
};

/* ── Deepa Pankti: a row of lamps that light one after another ─────────── */
export const DeepaPankti: React.FC = () => {
  const [count, setCount] = useState(9);
  useEffect(() => {
    const set = () => setCount(window.innerWidth < 640 ? 5 : window.innerWidth < 1024 ? 7 : 9);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[78px] md:top-[100px] z-20 flex flex-col items-center px-4">
      <div className="flex items-end justify-center gap-3 sm:gap-6 md:gap-9">
        {Array.from({ length: count }).map((_, i) => {
          const mid = (count - 1) / 2;
          const lift = Math.round(Math.abs(i - mid) * 3); // gentle arc, like lamps on a parapet
          return (
            <div key={i} style={{ transform: `translateY(${-lift}px)` }}>
              <Diya delay={300 + i * 260} size={count === 5 ? 32 : 46} />
            </div>
          );
        })}
      </div>
      <p
        className="deepa-greeting hidden md:block mt-2 font-devanagari text-lg md:text-2xl text-gold-bright tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        style={{ ['--deepa-delay' as string]: `${300 + count * 260}ms` }}
      >
        शुभदीपावलिः
      </p>
    </div>
  );
};

/* ── Rising golden sparks across the page ───────────────────────────────── */
export const FestiveSparks: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const n = w < 640 ? 14 : 26;
    const sparks = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: h + Math.random() * h,
      r: 0.8 + Math.random() * 1.8, vy: 0.25 + Math.random() * 0.55,
      sway: Math.random() * Math.PI * 2, life: 0.4 + Math.random() * 0.6,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of sparks) {
        s.y -= s.vy; s.sway += 0.02; s.x += Math.sin(s.sway) * 0.3;
        if (s.y < -10) { s.y = h + 10; s.x = Math.random() * w; }
        const fade = Math.min(1, (h - s.y) / 120) * Math.min(1, s.y / (h * 0.5)) * s.life;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
        g.addColorStop(0, `rgba(255, 224, 138, ${0.9 * fade})`);
        g.addColorStop(1, 'rgba(224, 163, 46, 0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', onVis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[35] w-full h-full" aria-hidden="true" />;
};

/* ── A small greeting card, shown once per visit ────────────────────────── */
export const DeepavaliGreeting: React.FC = () => {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem('deepavali-2026-greeted', '1'); } catch { /* storage blocked */ }
  };

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem('deepavali-2026-greeted') === '1'; } catch { /* storage blocked */ }
    if (seen) return;
    const show = setTimeout(() => setOpen(true), 2200);
    const hide = setTimeout(() => close(), 2200 + 12000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  if (!open) return null;
  return (
    <div
      role="status"
      className="deepa-card fixed z-[60] left-3 right-24 bottom-24 md:right-auto md:bottom-8 md:left-8 md:max-w-sm rounded-xl border border-gold-mid bg-[#0E0B07]/95 backdrop-blur-md shadow-[0_10px_40px_rgba(224,163,46,0.18)] p-3 md:p-4 pr-10 flex items-center gap-3 md:gap-4"
    >
      <Diya size={44} delay={150} className="shrink-0" />
      <div className="min-w-0">
        <p className="font-devanagari text-xl text-gold-bright leading-tight">शुभदीपावलिः</p>
        <p className="font-sans text-[13px] md:text-sm text-text-primary mt-0.5">Happy Deepavali from Vishweshwara Sanskrit</p>
        <p className="hidden sm:block font-serif italic text-xs text-text-secondary mt-1">
          <span className="font-devanagari not-italic text-text-gold">तमसो मा ज्योतिर्गमय</span> · Lead me from darkness to light
        </p>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Close greeting"
        className="absolute top-2 right-2 p-1.5 rounded-full text-text-tertiary hover:text-gold-bright transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
