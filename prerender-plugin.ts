import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { PAGE_META } from './src/utils/seoData';
import { SUBJECTS_ITEMS, STATS_ITEMS, CREDENTIALS_ITEMS, TESTIMONIALS_ITEMS, TIMELINE_ITEMS, FAQ_ITEMS } from './src/data';

/**
 * Static page shells for crawlers.
 *
 * The site is a client-rendered React app on GitHub Pages, so every URL used to
 * return an EMPTY <div id="root"> with the homepage's title/description. Search
 * engines that skip JavaScript, AI crawlers, and WhatsApp/LinkedIn link previews
 * therefore saw nothing page-specific.
 *
 * After `vite build` this plugin writes one HTML file per route (about.html,
 * teachings.html, ...; GitHub Pages serves them at /about, /teachings, ...) with:
 *   - the page's own <title>, description, canonical and Open Graph tags
 *   - the page's real content (from src/data.ts) inside #root as plain HTML
 * React then replaces #root as usual, so nothing changes for visitors.
 * It runs inside the normal `vite build`, so the deploy workflow is unchanged.
 * Any failure only logs a warning; it can never break the build.
 */

const SITE = 'https://vishweshwarasanskrit.com';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const nav =
  '<nav aria-label="Main"><a href="/">Home</a> · <a href="/about">About the Acharya</a> · ' +
  '<a href="/teachings">Courses</a> · <a href="/testimonials">Testimonials</a> · ' +
  '<a href="/dakshina">Guru Dakshina</a> · <a href="/begin">Begin</a></nav>';

const faq = (count?: number) =>
  '<h2>Frequently asked questions</h2>' +
  FAQ_ITEMS.slice(0, count).map(f => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('');

const subjects = () =>
  SUBJECTS_ITEMS.map(s =>
    `<h3>${esc(s.title)} (${esc(s.devanagari)})</h3><p>${esc(s.description)}</p>` +
    `<p>${esc(s.duration)} · ${esc(s.frequency)}</p>` +
    `<ul>${s.topics.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`
  ).join('');

const credentials = () =>
  '<h2>Credentials and training</h2><ul>' +
  CREDENTIALS_ITEMS.map(c =>
    `<li><strong>${esc(c.title)}</strong>, ${esc(c.institution)} (${esc(c.year)}). ${esc(c.description)}</li>`
  ).join('') + '</ul>';

const timeline = () =>
  '<h2>The Acharya’s journey</h2><ul>' +
  TIMELINE_ITEMS.map(t =>
    `<li><strong>${esc(t.year)} · ${esc(t.title)}</strong> (${esc(t.subtitle)}). ${esc(t.description)}</li>`
  ).join('') + '</ul>';

const stats = () =>
  '<ul>' + STATS_ITEMS.map(s => `<li><strong>${esc(s.value)}</strong> ${esc(s.label.replace(/\n/g, ' '))}</li>`).join('') + '</ul>';

const testimonials = () =>
  TESTIMONIALS_ITEMS.map(t =>
    `<blockquote><p>${esc(t.content)}</p><footer>${esc(t.name)}, ${esc(t.role)}, ${esc(t.location)}</footer></blockquote>`
  ).join('');

interface Route { path: string; file: string; h1: string; body: () => string; }

const ROUTES: Route[] = [
  {
    path: '/', file: 'index.html',
    h1: 'Learn Sanskrit, Vedas & Bhagavad Gita Online with a Gurukula-Trained Acharya',
    body: () =>
      `<p>${esc(PAGE_META['/'].description)}</p>` + stats() +
      '<h2>Subjects taught</h2>' + subjects() + credentials() + faq(),
  },
  {
    path: '/about', file: 'about.html',
    h1: 'About Acharya Vishweshwara N M',
    body: () => `<p>${esc(PAGE_META['/about'].description)}</p>` + credentials() + timeline(),
  },
  {
    path: '/teachings', file: 'teachings.html',
    h1: 'Courses: Sanskrit, Bhagavad Gita & Vedic Studies',
    body: () => `<p>${esc(PAGE_META['/teachings'].description)}</p>` + subjects() + faq(),
  },
  {
    path: '/testimonials', file: 'testimonials.html',
    h1: 'Student Testimonials',
    body: () => `<p>${esc(PAGE_META['/testimonials'].description)}</p>` + testimonials(),
  },
  {
    path: '/dakshina', file: 'dakshina.html',
    h1: 'Guru Dakshina: the tradition of self-determined offering',
    body: () =>
      `<p>${esc(PAGE_META['/dakshina'].description)}</p>` +
      '<p>Lineage wisdom cannot be packaged as a commercial commodity. Classes are offered without upfront commercial fees, ' +
      'continuing the ancient tradition of self-determined, capability-based Guru Dakshina.</p>' + faq(4),
  },
  {
    path: '/begin', file: 'begin.html',
    h1: 'Begin your journey: enquire about Sanskrit classes',
    body: () =>
      `<p>${esc(PAGE_META['/begin'].description)}</p>` +
      '<p>Request a free 15-minute consultation by WhatsApp or the enquiry form on this page.</p>' +
      '<p><a href="https://wa.me/919482698612">WhatsApp</a> · <a href="mailto:namaste@vishweshwarasanskrit.com">namaste@vishweshwarasanskrit.com</a></p>' +
      faq(),
  },
];

const setMeta = (html: string, attr: 'name' | 'property', name: string, value: string) =>
  html.replace(new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`), (_m, a, b) => a + esc(value) + b);

function render(template: string, route: Route): string {
  const meta = PAGE_META[route.path];
  const url = SITE + route.path;
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, 'name', 'title', meta.title);
  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'property', 'og:title', meta.title);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'name', 'twitter:title', meta.title);
  html = setMeta(html, 'name', 'twitter:description', meta.description);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_m, a, b) => a + url + b);

  const shell =
    '<style>#prerender{max-width:860px;margin:0 auto;padding:96px 20px 48px;line-height:1.65;color:#FAF6EE}' +
    '#prerender a{color:#E0A32E}#prerender h1,#prerender h2,#prerender h3{font-weight:500;line-height:1.25}</style>' +
    `<main id="prerender">${nav}<h1>${esc(route.h1)}</h1>${route.body()}</main>`;
  return html.replace('<div id="root"></div>', () => `<div id="root">${shell}</div>`);
}

export function prerenderPlugin(): Plugin {
  let outDir = 'dist';
  return {
    name: 'vishweshwara-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      try {
        const indexPath = path.join(outDir, 'index.html');
        if (!fs.existsSync(indexPath)) return;
        const template = fs.readFileSync(indexPath, 'utf8');
        if (!template.includes('<div id="root"></div>')) {
          console.warn('[prerender] root div not found, skipped');
          return;
        }
        for (const route of ROUTES) fs.writeFileSync(path.join(outDir, route.file), render(template, route));
        console.log(`[prerender] wrote ${ROUTES.length} static page shells`);
      } catch (err) {
        console.warn('[prerender] skipped:', err);
      }
    },
  };
}
