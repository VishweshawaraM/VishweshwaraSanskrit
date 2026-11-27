// Puts the Admin-edited content into a page (numbers, cohort date, prices, reviews, announcement).
import { SiteContent, Review, cohortLabels } from '../lib/content';

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' }[c]!));

const G = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h6a5.1 5.1 0 0 1-2.2 3.4v2.8h3.6c2.1-1.9 3.2-4.8 3.2-8.2z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.4-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2v2.9A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.7 14a6.6 6.6 0 0 1 0-4.2V7H2a11 11 0 0 0 0 9.9z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2 7l3.7 2.9C6.6 7.4 9.1 5.4 12 5.4z"/></svg>';
const WA = '<svg viewBox="0 0 24 24" width="18" height="18" fill="#1FA855" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>';
const AV = '<svg viewBox="0 0 40 40" width="44" height="44" aria-hidden="true"><rect width="40" height="40" fill="#D9D2C5"/><circle cx="20" cy="15.5" r="7" fill="#F7F3EC"/><path d="M6 38c1.8-8 7.4-12 14-12s12.2 4 14 12z" fill="#F7F3EC"/></svg>';
const tri = (a: string, b: string, c: string, label: string, vertical = true) => vertical
  ? `<svg viewBox="0 0 30 20" width="22" height="15" aria-label="${label}"><rect width="10" height="20" fill="${a}"/><rect x="10" width="10" height="20" fill="${b}"/><rect x="20" width="10" height="20" fill="${c}"/></svg>`
  : `<svg viewBox="0 0 30 20" width="22" height="15" aria-label="${label}"><rect width="30" height="6.7" fill="${a}"/><rect y="6.7" width="30" height="6.6" fill="${b}"/><rect y="13.3" width="30" height="6.7" fill="${c}"/></svg>`;
export const FLAGS: Record<string, string> = {
  us: '<svg viewBox="0 0 30 20" width="22" height="15" aria-label="USA"><rect width="30" height="20" fill="#B22234"/><g fill="#fff"><rect y="3" width="30" height="1.6"/><rect y="6.1" width="30" height="1.6"/><rect y="9.2" width="30" height="1.6"/><rect y="12.3" width="30" height="1.6"/><rect y="15.4" width="30" height="1.6"/></g><rect width="13" height="10.8" fill="#3C3B6E"/></svg>',
  ae: '<svg viewBox="0 0 30 20" width="22" height="15" aria-label="UAE"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.7" fill="#00732F"/><rect y="13.3" width="30" height="6.7" fill="#000"/><rect width="8" height="20" fill="#FF0000"/></svg>',
  in: '<svg viewBox="0 0 30 20" width="22" height="15" aria-label="India"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.7" fill="#FF9933"/><rect y="13.3" width="30" height="6.7" fill="#138808"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width=".8"/></svg>',
  it: tri('#009246', '#fff', '#CE2B37', 'Italy'),
  de: tri('#000', '#DD0000', '#FFCE00', 'Germany', false),
  gb: '<svg viewBox="0 0 30 20" width="22" height="15" aria-label="UK"><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#C8102E" stroke-width="3.4"/></svg>',
  au: '<svg viewBox="0 0 30 20" width="22" height="15" aria-label="Australia"><rect width="30" height="20" fill="#00247D"/><path d="M0 0l13 9M13 0L0 9" stroke="#fff" stroke-width="2"/><path d="M6.5 0v9M0 4.5h13" stroke="#fff" stroke-width="3"/><path d="M6.5 0v9M0 4.5h13" stroke="#CF142B" stroke-width="1.6"/><circle cx="22" cy="13" r="1.4" fill="#fff"/><circle cx="7" cy="15" r="1.8" fill="#fff"/></svg>',
  ca: '<svg viewBox="0 0 30 20" width="22" height="15" aria-label="Canada"><rect width="30" height="20" fill="#fff"/><rect width="7.5" height="20" fill="#D80621"/><rect x="22.5" width="7.5" height="20" fill="#D80621"/><path d="M15 5l1.2 3 2.3-.8-.9 3.3 1.9.6-4.5 3.2-4.5-3.2 1.9-.6-.9-3.3 2.3.8z" fill="#D80621"/></svg>',
  sg: '<svg viewBox="0 0 30 20" width="22" height="15" aria-label="Singapore"><rect width="30" height="20" fill="#fff"/><rect width="30" height="10" fill="#EF3340"/><circle cx="7" cy="5" r="3" fill="#fff"/><circle cx="8.2" cy="5" r="3" fill="#EF3340"/></svg>',
  nz: '<svg viewBox="0 0 30 20" width="22" height="15" aria-label="New Zealand"><rect width="30" height="20" fill="#00247D"/><path d="M6.5 0v9M0 4.5h13" stroke="#fff" stroke-width="3"/><path d="M6.5 0v9M0 4.5h13" stroke="#CC142B" stroke-width="1.6"/><g fill="#CC142B"><circle cx="22" cy="6" r="1.2"/><circle cx="25" cy="10" r="1.2"/><circle cx="20" cy="11" r="1.2"/><circle cx="22" cy="15" r="1.2"/></g></svg>',
};

export function reviewHTML(r: Review, i: number) {
  const src = r.source === 'Google' ? `<span class="glogo" title="Google review">${G}<span>Google</span></span>`
    : r.source === 'WhatsApp' ? `<span class="glogo" title="Message on WhatsApp">${WA}<span>WhatsApp</span></span>` : '';
  return `<figure class="review rv d${i % 3}"><div class="rv-top"><span class="stars" aria-label="5 stars">★★★★★</span>${src}</div>` +
    `<blockquote>“${esc(r.quote)}”</blockquote><figcaption><span class="av av-empty">${AV}</span><div><b>${esc(r.name)} ${FLAGS[r.country] || ''}</b><span>${esc(r.place)}</span></div></figcaption></figure>`;
}

/** Fill the page before its animations start. */
export function applyContent(root: HTMLElement, c: SiteContent) {
  const set = (key: string, v: string) => root.querySelectorAll(`[data-cms="${key}"]`).forEach(el => { if (v) el.textContent = v; });
  set('years', c.numbers.years);
  set('hours', c.numbers.hours);
  set('countries', c.numbers.countries);
  set('countriesList', c.numbers.countriesList);
  const cl = cohortLabels(c.cohort);
  set('cohort.short', cl.short);
  set('cohort.tag', cl.tag);
  set('cohort.sentence', cl.sentence);
  set('aksharam.quarterly', c.aksharam.quarterly);
  set('aksharam.yearly', c.aksharam.yearly);
  set('aksharam.lifetime', c.aksharam.lifetime);

  const shown = c.reviews.filter(r => !r.hidden && r.quote.trim());
  if (shown.length) root.querySelectorAll('.rv-grid').forEach(g => { g.innerHTML = shown.map(reviewHTML).join(''); });

  if (c.announcement.on && c.announcement.text.trim()) {
    const a = document.createElement(c.announcement.link ? 'a' : 'div');
    a.className = 'announce';
    if (c.announcement.link && a instanceof HTMLAnchorElement) a.href = c.announcement.link;
    a.innerHTML = `<span class="dot" aria-hidden="true"></span><span>${esc(c.announcement.text.trim())}</span>${c.announcement.link ? '<span aria-hidden="true">→</span>' : ''}`;
    root.prepend(a);
  }
}
