import React, { useLayoutEffect as useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { initSite } from './site';
import { applyContent } from './applyContent';
import { cachedContent, loadContent } from '../lib/content';
import { createRoot, Root } from 'react-dom/client';
import { BookingWidget } from './BookingWidget';
import { transliterate, transliterateKannada } from '../lib/aksharam';

// Page bodies generated from the approved design (scratchpad gen.py), one file per page.
const pages = import.meta.glob('./pages/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

declare const __BUILD_ID__: string;
const RZP_BUTTON = 'pl_TuMHNIL8VVm7oe';
const FONTS = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600&family=Tiro+Devanagari+Sanskrit&display=swap';

function useHeadLink(href: string, id: string) {
  useEffect(() => {
    let el = document.getElementById(id) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement('link');
      el.id = id;
      el.rel = 'stylesheet';
      el.href = href;
      document.head.appendChild(el);
    }
    return () => { el?.remove(); };
  }, [href, id]);
}

export const NewPage: React.FC<{ name: string; pageId: string }> = ({ name, pageId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  navRef.current = navigate;
  const html = pages[`./pages/${name}.html`];
  useHeadLink(`/new/site.css?v=${__BUILD_ID__}`, 'ns-css');
  useHeadLink(FONTS, 'ns-fonts');

  useEffect(() => {
    const root = ref.current;
    if (!root || !html) return;
    // Set the page markup once, outside React's reconciliation, so re-renders never replace it.
    root.innerHTML = html;
    // keep the page invisible (the loading skeleton shows) until the stylesheet is in, so it never appears unstyled
    const css = document.getElementById('ns-css') as HTMLLinkElement | null;
    root.style.opacity = '0';
    const show = () => { root.style.transition = 'opacity .3s ease'; root.style.opacity = '1'; };
    if (!css || css.sheet) show(); else { css.addEventListener('load', show, { once: true }); css.addEventListener('error', show, { once: true }); setTimeout(show, 2500); }
    const prevBg = document.body.style.background;
    document.body.style.background = '#F5F0E6';
    // overflow:hidden on any ancestor breaks position:sticky (used by the review deck);
    // 'clip' keeps the no-sideways-scroll behaviour without that side effect
    const clipped: [HTMLElement, string, string][] = [];
    for (let el: HTMLElement | null = root.parentElement; el; el = el.parentElement) {
      const cs = getComputedStyle(el);
      if (cs.overflowX === 'hidden' || cs.overflowY === 'hidden') {
        clipped.push([el, el.style.overflowX, el.style.overflowY]);
        el.style.overflowX = 'clip';
        el.style.overflowY = 'visible';
      }
    }
    // Admin-edited content: the last saved copy goes in at once; a fresh copy follows
    const first = cachedContent();
    applyContent(root, first);
    let destroy = initSite(root);
    let alive = true;
    loadContent().then(fresh => {
      if (!alive || JSON.stringify(fresh) === JSON.stringify(first)) return;
      if (window.scrollY < 200 && !root.querySelector('#book-app,#tin')) { // still at the top: rebuild quietly with the new content
        destroy(); root.innerHTML = html; applyContent(root, fresh); destroy = initSite(root);
      } else { // already reading: update numbers and dates in place only
        const tmp = document.createElement('div'); tmp.innerHTML = html; applyContent(tmp, fresh);
        tmp.querySelectorAll('[data-cms]').forEach(n => { const k = n.getAttribute('data-cms'); root.querySelectorAll(`[data-cms="${k}"]`).forEach(o => { o.textContent = n.textContent; }); });
      }
    });
    // interactive React islands inside the static page
    let bookRoot: Root | null = null;
    const bookEl = root.querySelector('#book-app');
    if (bookEl) { bookRoot = createRoot(bookEl); bookRoot.render(<BookingWidget />); }

    // Guru Dakshina: our own button opens Razorpay's payment window via a hidden official Razorpay button
    let rzpForm: HTMLFormElement | null = null;
    if (root.querySelector('[data-rzp-pay]')) {
      rzpForm = document.createElement('form');
      rzpForm.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;height:1px;overflow:hidden';
      rzpForm.setAttribute('aria-hidden', 'true');
      const sc = document.createElement('script');
      sc.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      sc.setAttribute('data-payment_button_id', RZP_BUTTON);
      sc.async = true;
      rzpForm.appendChild(sc);
      document.body.appendChild(rzpForm);
    }
    const onPay = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-rzp-pay]');
      if (!t || !rzpForm) return;
      e.preventDefault();
      e.stopPropagation();
      const label = t.querySelector('span') || t;
      const old = label.textContent;
      let tries = 0;
      const go = () => {
        const real = rzpForm!.querySelector<HTMLElement>('.razorpay-payment-button a, .razorpay-payment-button button');
        if (real) { real.click(); if (old) label.textContent = old; return; }
        if (++tries === 1) label.textContent = 'Opening secure payment…';
        if (tries < 40) setTimeout(go, 150); else { if (old) label.textContent = old; window.open('https://wa.me/919482698612?text=' + encodeURIComponent('Hari Om Acharya ji, I would like to offer my Guru Dakshina. The payment window did not open for me.'), '_blank'); }
      };
      go();
    };
    root.addEventListener('click', onPay, true);

    // Razorpay payment button slots
    root.querySelectorAll<HTMLFormElement>('form[data-rzp]').forEach(form => {
      if (form.querySelector('script')) return;
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      s.setAttribute('data-payment_button_id', form.dataset.rzp || '');
      s.async = true;
      form.appendChild(s);
    });

    // Internal links use the router instead of a full reload
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('/') || href.startsWith('//') || /\.[a-z0-9]{2,4}(#|$)/i.test(href)) return;
      e.preventDefault();
      const [path, hash] = href.split('#');
      if (path === window.location.pathname && hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      navRef.current(href);
    };
    root.addEventListener('click', onClick);

    // Aksharam live typing demo (real keyboard rules)
    const tin = root.querySelector<HTMLInputElement>('#tin');
    const tout = root.querySelector<HTMLElement>('#tout');
    if (tin && tout) {
      let script: 'sa' | 'kn' = 'sa';
      const render = () => { tout.textContent = script === 'sa' ? transliterate(tin.value) : transliterateKannada(tin.value); };
      tin.addEventListener('input', render);
      root.querySelectorAll<HTMLElement>('[data-ex]').forEach(el => el.addEventListener('click', () => { tin.value = el.dataset.ex || ''; render(); }));
      root.querySelectorAll<HTMLButtonElement>('[data-script]').forEach(b => b.addEventListener('click', () => {
        script = b.dataset.script === 'kn' ? 'kn' : 'sa';
        root.querySelectorAll('[data-script]').forEach(x => x.classList.toggle('on', x === b));
        if (script === 'kn' && tin.value === 'saMskRitam') tin.value = 'kannaDa';
        render();
      }));
      root.querySelector('#tcopy')?.addEventListener('click', e => {
        const b = e.currentTarget as HTMLButtonElement;
        navigator.clipboard?.writeText(tout.textContent || '').then(() => { b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy text'), 1500); }, () => {});
      });
      render();
    }

    if (window.location.hash) {
      setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView(), 300);
    }
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('click', onPay, true);
      rzpForm?.remove();
      alive = false;
      destroy();
      const br = bookRoot; if (br) setTimeout(() => br.unmount(), 0);
      document.body.style.background = prevBg;
      clipped.forEach(([el, x, y]) => { el.style.overflowX = x; el.style.overflowY = y; });
    };
  }, [html]);

  if (!html) return null;
  return <div ref={ref} className="ns-root" data-page={pageId} />;
};
