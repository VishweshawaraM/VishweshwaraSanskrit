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

/* ── Fireworks engine (canvas, no libraries) ────────────────────────────── */
const FW_COLORS = ['#FFFDF5', '#FFE08A', '#FFD36B', '#E0A32E', '#C8860A'];
type FwSpark = { x: number; y: number; vx: number; vy: number; life: number; decay: number; color: string; size: number; trail: [number, number][] };
type FwRocket = { x: number; y: number; vy: number; targetY: number; at: number; burst: boolean; trail: [number, number][] };

/** Returns launch(origins): rockets rise from each origin (canvas coordinates) and burst. */
const useFireworks = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const launchRef = useRef<(origins: { x: number; y: number }[]) => void>(() => {});

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let w = 0, h = 0, raf = 0, running = false;
    let rockets: FwRocket[] = [];
    let sparks: FwSpark[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const phone = () => window.innerWidth < 640;
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const burst = (x: number, y: number) => {
      const n = phone() ? 30 : 64;
      const main = FW_COLORS[Math.floor(Math.random() * 3) + 1];
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.15;
        const sp = (phone() ? 2.6 : 3.6) + Math.random() * (phone() ? 1.6 : 2.6);
        sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: 0.011 + Math.random() * 0.008,
          color: Math.random() < 0.3 ? '#FFFDF5' : main, size: 1.2 + Math.random() * 1.3, trail: [] });
      }
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const r of rockets) {
        if (r.burst || now < r.at) continue;
        r.trail.push([r.x, r.y]); if (r.trail.length > 6) r.trail.shift();
        r.y += r.vy; r.vy *= 0.982; r.x += Math.sin(r.y * 0.05) * 0.25;
        const [tx0, ty0] = r.trail[0];
        const tail = ctx.createLinearGradient(tx0, ty0, r.x, r.y);
        tail.addColorStop(0, 'rgba(224,163,46,0)'); tail.addColorStop(1, 'rgba(255,224,138,0.9)');
        ctx.strokeStyle = tail; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(tx0, ty0); ctx.lineTo(r.x, r.y); ctx.stroke();
        ctx.fillStyle = '#FFFDF5'; ctx.beginPath(); ctx.arc(r.x, r.y, 1.8, 0, Math.PI * 2); ctx.fill();
        if (r.y <= r.targetY || r.vy > -1.2) { r.burst = true; burst(r.x, r.y); }
      }
      for (const s of sparks) {
        s.trail.push([s.x, s.y]); if (s.trail.length > 5) s.trail.shift();
        s.vx *= 0.975; s.vy = s.vy * 0.975 + 0.035; s.x += s.vx; s.y += s.vy; s.life -= s.decay;
        if (s.life <= 0) continue;
        ctx.globalAlpha = s.life * 0.55;
        ctx.strokeStyle = s.color; ctx.lineWidth = s.size; ctx.lineCap = 'round'; ctx.beginPath();
        s.trail.forEach(([tx, ty], i) => (i ? ctx.lineTo(tx, ty) : ctx.moveTo(tx, ty))); ctx.lineTo(s.x, s.y); ctx.stroke();
        ctx.globalAlpha = s.life;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3.2);
        g.addColorStop(0, '#FFFDF5'); g.addColorStop(0.35, s.color); g.addColorStop(1, 'rgba(224,163,46,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.x, s.y, s.size * 3.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      sparks = sparks.filter(s => s.life > 0);
      if (rockets.every(r => r.burst) && sparks.length === 0) { running = false; ctx.clearRect(0, 0, w, h); return; }
      if (!document.hidden) raf = requestAnimationFrame(frame); else running = false;
    };

    launchRef.current = (origins) => {
      resize();
      const now = performance.now();
      rockets = origins.map((o, i) => ({
        x: o.x, y: o.y, vy: -(7 + Math.random() * 2.5),
        targetY: Math.max(70, o.y * (0.18 + Math.random() * 0.32)),
        at: now + i * 380 + Math.random() * 120, burst: false, trail: [],
      }));
      sparks = [];
      if (!running) { running = true; raf = requestAnimationFrame(frame); }
    };
    const onVis = () => { if (!document.hidden && !running && (rockets.some(r => !r.burst) || sparks.length)) { running = true; raf = requestAnimationFrame(frame); } };
    document.addEventListener('visibilitychange', onVis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis); };
  }, [canvasRef]);

  return launchRef;
};

/* ── Hero: a line of lamps on the bottom row; fireworks on the first scroll ── */
export const HeroFireworks: React.FC<{ lampsRef: React.RefObject<HTMLDivElement | null> }> = ({ lampsRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const launchRef = useFireworks(canvasRef);
  const [greet, setGreet] = useState<'hidden' | 'shown' | 'leaving'>('hidden');

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let fired = false;
    const fire = () => {
      if (fired) return;
      const canvas = canvasRef.current, lamps = lampsRef.current;
      if (!canvas || !lamps) return;
      const c = canvas.getBoundingClientRect();
      if (c.bottom < window.innerHeight * 0.4) return; // hero mostly gone: skip
      fired = true;
      const all = Array.from(lamps.querySelectorAll('[data-lamp]'));
      const pick = window.innerWidth < 640 ? [0, 2, 4, 1] : [0, 2, 4, 6, 8, 3];
      const origins = pick.filter(i => all[i]).map(i => {
        const r = all[i].getBoundingClientRect();
        return { x: r.left + r.width / 2 - c.left, y: r.top - c.top + 4 };
      });
      launchRef.current(origins);
      // The greeting appears with the first burst and fades as the sky clears.
      timers.push(window.setTimeout(() => setGreet('shown'), 1100));
      timers.push(window.setTimeout(() => setGreet('leaving'), 1100 + 5600));
      timers.push(window.setTimeout(() => setGreet('hidden'), 1100 + 5600 + 1400));
      cleanup();
    };
    const timers: number[] = [];
    const events: (keyof WindowEventMap)[] = ['scroll', 'wheel', 'touchmove'];
    const cleanup = () => events.forEach(ev => window.removeEventListener(ev, fire));
    events.forEach(ev => window.addEventListener(ev, fire, { passive: true }));
    return () => { cleanup(); timers.forEach(clearTimeout); };
  }, [lampsRef, launchRef]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full z-[25]" aria-hidden="true" />
      {greet !== 'hidden' && (
        <div
          role="status"
          className={`pointer-events-none fixed md:absolute z-[56] md:z-[26] left-4 right-4 top-[38%] md:right-auto md:left-[6%] md:top-[26%] px-5 py-4 md:p-0 rounded-2xl bg-black/75 md:bg-transparent border border-gold-dim md:border-0 backdrop-blur-sm md:backdrop-blur-none text-center md:text-left transition-all duration-[1400ms] ease-out ${
            greet === 'shown' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="deepa-sky-greeting font-devanagari text-gold-bright leading-tight whitespace-nowrap text-[1.75rem] sm:text-[2.2rem] lg:text-[3rem]">
            दीपावलीपर्वणः शुभाशयाः
          </p>
          <p className="mt-1 font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-text-primary/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Happy Deepavali
          </p>
        </div>
      )}
    </>
  );
};

export const HeroLampLine = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const [count, setCount] = useState(9);
  useEffect(() => {
    const set = () => setCount(window.innerWidth < 640 ? 5 : window.innerWidth < 1024 ? 7 : 9);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);
  return (
    <div ref={ref} className="pointer-events-none flex-1 min-w-0 flex items-end justify-center gap-2 sm:gap-5 md:gap-9 px-2" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} data-lamp>
          <Diya delay={300 + i * 220} size={count === 5 ? 30 : 42} />
        </div>
      ))}
    </div>
  );
});
HeroLampLine.displayName = 'HeroLampLine';

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
