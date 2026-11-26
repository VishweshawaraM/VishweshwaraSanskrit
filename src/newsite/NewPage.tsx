import React, { useLayoutEffect as useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import siteCssUrl from './site.css?url';
import { initSite } from './site';
import { transliterate, transliterateKannada } from '../lib/aksharam';

// Page bodies generated from the approved design (scratchpad gen.py), one file per page.
const pages = import.meta.glob('./pages/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

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
  useHeadLink(siteCssUrl, 'ns-css');
  useHeadLink(FONTS, 'ns-fonts');

  useEffect(() => {
    const root = ref.current;
    if (!root || !html) return;
    // Set the page markup once, outside React's reconciliation, so re-renders never replace it.
    root.innerHTML = html;
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
    const destroy = initSite(root);

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
      destroy();
      document.body.style.background = prevBg;
      clipped.forEach(([el, x, y]) => { el.style.overflowX = x; el.style.overflowY = y; });
    };
  }, [html]);

  if (!html) return null;
  return <div ref={ref} className="ns-root" data-page={pageId} />;
};
