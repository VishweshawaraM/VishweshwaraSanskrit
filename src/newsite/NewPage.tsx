import React, { useLayoutEffect as useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import siteCssUrl from './site.css?url';
import { initSite } from './site';

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
      if (!href.startsWith('/') || href.startsWith('//')) return;
      e.preventDefault();
      const [path, hash] = href.split('#');
      if (path === window.location.pathname && hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      navRef.current(href);
    };
    root.addEventListener('click', onClick);

    if (window.location.hash) {
      setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView(), 300);
    }
    return () => {
      root.removeEventListener('click', onClick);
      destroy();
      document.body.style.background = prevBg;
    };
  }, [html]);

  if (!html) return null;
  return <div ref={ref} className="ns-root" data-page={pageId} />;
};
