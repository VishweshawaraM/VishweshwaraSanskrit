import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_META } from '../utils/seoData';

const APP_URL = (import.meta as any).env?.VITE_APP_URL || 'https://vishweshwarasanskrit.com';

const BREADCRUMBS: Record<string, Array<{ name: string; item: string }>> = {
  '/': [{ name: 'Home', item: APP_URL + '/' }],
  '/about': [
    { name: 'Home', item: APP_URL + '/' },
    { name: 'About the Acharya', item: APP_URL + '/about' },
  ],
  '/teachings': [
    { name: 'Home', item: APP_URL + '/' },
    { name: 'Courses', item: APP_URL + '/teachings' },
  ],
  '/begin': [
    { name: 'Home', item: APP_URL + '/' },
    { name: 'Contact Us', item: APP_URL + '/begin' },
  ],
  '/testimonials': [
    { name: 'Home', item: APP_URL + '/' },
    { name: 'Student Testimonials', item: APP_URL + '/testimonials' },
  ],
  '/dakshina': [
    { name: 'Home', item: APP_URL + '/' },
    { name: 'Guru Dakshina', item: APP_URL + '/dakshina' },
  ],
};

export function MetaTagsManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] || PAGE_META['/'];
    const currentUrl = `${APP_URL}${pathname}`;
    const defaultImage = 'https://vishweshwarasanskrit.com/acharya-photo.jpeg';
    const image = meta.image || defaultImage;

    // 1. Title
    document.title = meta.title;

    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    setMetaTag('name', 'description', meta.description);

    // 3. Open Graph
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:image', image);

    // 4. Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', image);

    // 5. Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 6. Geo
    setMetaTag('name', 'geo.region', 'IN-KA');
    setMetaTag('name', 'geo.placename', 'Bengaluru');
    setMetaTag('name', 'geo.position', '12.971599;77.594563');
    setMetaTag('name', 'ICBM', '12.971599, 77.594563');

    // 7. BreadcrumbList schema — injected per page for rich results
    const crumbs = BREADCRUMBS[pathname];
    if (crumbs) {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': crumb.name,
          'item': crumb.item,
        })),
      };
      let schemaEl = document.getElementById('breadcrumb-schema');
      if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.id = 'breadcrumb-schema';
        schemaEl.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(schema);
    }

  }, [pathname]);

  return null;
}
