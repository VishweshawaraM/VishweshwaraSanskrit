import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { PAGE_META } from './src/utils/seoData';
import { COURSES, ACHARYA_NAME, whatsappLink } from './src/courses';
import { SP, SP_FREE_CLASSES, SP_GAINS, SP_HOW, SP_DAKSHINA, SP_COMMUNITY, SP_FAQ } from './src/samskaraPravesha';
import { ABOUT_STORY, ABOUT_STUDIES, ABOUT_DEGREES, ABOUT_FAQ } from './src/aboutContent';
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
  COURSES.map(c => `<a href="/courses/${c.slug}">${c.title}</a> · `).join('') +
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

interface Route { path: string; file: string; h1: string; body: () => string; schema?: () => object[]; }

// ── Per-page structured data (JSON-LD) ──────────────────────────────────────
const ORG_ID = SITE + '/#organization';
const PERSON_ID = SITE + '/about#acharya';

const person = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Vishweshwara N M',
  honorificPrefix: 'Acharya',
  jobTitle: 'Sanskrit and Vedic teacher (Acharya)',
  description: 'Gurukula-trained Sanskrit Acharya who studied for seven years (2018–2025) at Veda Vijnana Gurukulam, Bengaluru, and teaches Sanskrit, Krishna Yajurveda, Bhagavad Gita and Advaita Vedanta online.',
  image: SITE + '/acharya-portrait.webp',
  url: SITE + '/about',
  worksFor: { '@id': ORG_ID },
  alumniOf: { '@type': 'EducationalOrganization', name: 'Veda Vijnana Gurukulam', address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' } },
  hasCredential: ABOUT_DEGREES.map(d => ({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: d })),
  knowsAbout: ['Sanskrit', 'Vyakarana', 'Krishna Yajurveda', 'Vedic chanting', 'Bhagavad Gita', 'Advaita Vedanta', 'Nyaya', 'Mimamsa', 'Shankara Bhashya'],
  knowsLanguage: ['sa', 'en', 'kn', 'hi'],
  homeLocation: { '@type': 'Place', name: 'Bengaluru, Karnataka, India' },
  sameAs: ['https://www.instagram.com/vishweshwara_sanskrit', 'https://www.facebook.com/share/18inj2iS8o/', 'https://share.google/YJDHCZgoFpiePUgA6'],
});

const faqPage = (items: { question: string; answer: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
});

const breadcrumbs = (trail: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + p })),
});

const courseSchema = (c: typeof COURSES[number]) => ({
  '@type': 'Course',
  '@id': `${SITE}/courses/${c.slug}#course`,
  name: `${c.title} with ${ACHARYA_NAME}`,
  description: c.meta.description,
  url: `${SITE}/courses/${c.slug}`,
  inLanguage: 'en',
  educationalLevel: c.path.map(s => s.label).join(' · '),
  teaches: c.path.flatMap(s => s.items).slice(0, 12),
  provider: { '@id': ORG_ID },
  instructor: { '@id': PERSON_ID },
  hasCourseInstance: c.formats.map(f => ({
    '@type': 'CourseInstance',
    name: f.title,
    courseMode: 'online',
    instructor: { '@id': PERSON_ID },
    courseWorkload: f.kind === 'group' ? 'Live small-group classes' : 'Live one-to-one classes',
  })),
});


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
    body: () =>
      `<p>${esc(PAGE_META['/about'].description)}</p>` +
      '<h2>My story</h2>' + ABOUT_STORY.map(p => `<p>${esc(p)}</p>`).join('') +
      '<h2>What I studied</h2><ul>' + ABOUT_STUDIES.map(s => `<li><strong>${esc(s.subject)}</strong>: ${esc(s.detail)}</li>`).join('') + '</ul>' +
      `<p>${ABOUT_DEGREES.map(esc).join(' · ')}</p>` + timeline() +
      '<h2>Questions parents ask</h2>' + ABOUT_FAQ.map(f => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join(''),
    schema: () => [
      { '@type': 'ProfilePage', '@id': SITE + '/about#page', url: SITE + '/about', name: PAGE_META['/about'].title, mainEntity: { '@id': PERSON_ID } },
      person(),
      faqPage(ABOUT_FAQ),
      breadcrumbs([['Home', '/'], ['About', '/about']]),
    ],
  },
  {
    path: '/teachings', file: 'teachings.html',
    h1: 'Courses: Sanskrit, Bhagavad Gita & Vedic Studies',
    body: () => `<p>${esc(PAGE_META['/teachings'].description)}</p>` + subjects(),
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
  {
    path: '/samskara-pravesha', file: 'samskara-pravesha.html',
    h1: `${SP.name}: Sanskrit for children aged ${SP.ages}`,
    body: () =>
      `<p lang="kn">${esc(SP.kannadaLine)}</p><p>${esc(PAGE_META['/samskara-pravesha'].description)}</p>` +
      `<p>Starts ${esc(SP.start)} · ${esc(SP.schedule)} · ${SP.levels} levels × ${SP.sessionsPerLevel} classes · ${SP.months} months. ${esc(SP.breakNote)}</p>` +
      '<h2>What your child gains</h2>' + SP_GAINS.map(g => `<h3>${esc(g.title)}</h3><p>${esc(g.text)}</p>`).join('') +
      '<h2>How classes run</h2>' + SP_HOW.map(h => `<h3>${esc(h.title)}</h3><p>${esc(h.text)}</p>`).join('') +
      '<h2>Free open classes</h2><ul>' + SP_FREE_CLASSES.map(c => `<li>${esc(c.long)}</li>`).join('') + '</ul>' +
      '<h2>Guru Dakshina</h2><ul>' + SP_DAKSHINA.map(d => `<li>${esc(d.title)}: ${esc(d.amount)}${d.was ? ` (instead of ${esc(d.was)})` : ''}, ${esc(d.note)}</li>`).join('') + `<li>${esc(SP_COMMUNITY.note)}: ${esc(SP_COMMUNITY.amount)}</li></ul>` +
      '<h2>Questions parents ask</h2>' + SP_FAQ.map(f => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join(''),
    schema: () => [
      {
        '@type': 'Course', '@id': SITE + '/samskara-pravesha#course', name: SP.name,
        description: PAGE_META['/samskara-pravesha'].description, url: SITE + '/samskara-pravesha',
        inLanguage: ['kn', 'en', 'sa'], provider: { '@id': ORG_ID }, instructor: { '@id': PERSON_ID },
        audience: { '@type': 'EducationalAudience', educationalRole: 'student', audienceType: 'Children aged 8–14' },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', startDate: '2026-12-07', courseSchedule: { '@type': 'Schedule', byDay: ['https://schema.org/Monday', 'https://schema.org/Friday'], startTime: '18:00', endTime: '19:00', scheduleTimezone: 'Asia/Kolkata', repeatFrequency: 'P1W' }, instructor: { '@id': PERSON_ID } },
      },
      person(),
      faqPage(SP_FAQ),
      breadcrumbs([['Home', '/'], ['Samskrita Samskara Pravesha', '/samskara-pravesha']]),
    ],
  },
  ...COURSES.map((c): Route => ({
    path: `/courses/${c.slug}`, file: `courses/${c.slug}.html`,
    schema: () => [courseSchema(c), person(), breadcrumbs([['Home', '/'], ['Courses', '/teachings'], [c.title, `/courses/${c.slug}`]])],
    h1: `${c.title} (${c.devanagari}) with ${ACHARYA_NAME}`,
    body: () =>
      `<p><a href="/teachings">All courses</a> › ${esc(c.title)}</p>` +
      `<p><em>${esc(c.tagline)}</em></p>` + c.intro.map(p => `<p>${esc(p)}</p>`).join('') +
      `<h2>${esc(c.methodTitle)}</h2>` +
      (c.verse ? `<blockquote><p lang="sa">${c.verse.devanagari.map(esc).join('<br>')}</p><p><em>${esc(c.verse.iast)}</em></p><p>${esc(c.verse.meaning)}</p><footer>${esc(c.verse.source)}</footer></blockquote>` : '') + c.method.map(m => `<h3>${esc(m.title)}</h3><p>${esc(m.text)}</p>`).join('') +
      (c.audiences ?? []).map(a =>
        `<h2>${esc(a.label)}: ${esc(a.title)}</h2><p>${esc(a.text)}</p><ul>${a.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`).join('') +
      `<h2>${esc(c.pathTitle)}</h2>` + (c.pathIntro ? `<p>${esc(c.pathIntro)}</p>` : '') +
      c.path.map(s =>
        `<h3>${esc(s.label)}: ${esc(s.title)}${s.duration ? ` (${esc(s.duration)})` : ''}</h3><p>${esc(s.text)}</p>` +
        `<ul>${s.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`).join('') +
      '<h2>Ways to learn</h2>' + (c.formatsNote ? `<p>${esc(c.formatsNote)}</p>` : '') +
      c.formats.map(f =>
        `<h3>${esc(f.title)}</h3><p>${esc(f.text)}</p><ul>${f.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` +
        `<p><a href="${esc(whatsappLink(f.message))}">Chat with ${esc(ACHARYA_NAME)} on WhatsApp</a></p>`).join('') +
      '<p><a href="/begin">Send an enquiry</a></p>',
  })),
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

  // The home FAQ schema must only sit on pages that actually show that FAQ.
  if (route.path !== '/') {
    html = html.replace(/\s*<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"FAQPage"[\s\S]*?<\/script>/, '');
  }
  if (route.schema) {
    const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': route.schema() }).replace(/</g, '\\u003c');
    html = html.replace('</head>', () => `    <script type="application/ld+json">${ld}</script>\n  </head>`);
  }

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
        for (const route of ROUTES) {
          const file = path.join(outDir, route.file);
          fs.mkdirSync(path.dirname(file), { recursive: true });
          fs.writeFileSync(file, render(template, route));
        }
        console.log(`[prerender] wrote ${ROUTES.length} static page shells`);
      } catch (err) {
        console.warn('[prerender] skipped:', err);
      }
    },
  };
}
