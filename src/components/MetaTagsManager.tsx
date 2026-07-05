import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_META } from '../utils/seoData';

const APP_URL = (import.meta as any).env?.VITE_APP_URL || 'https://vishweshwarasanskrit.com';

export function MetaTagsManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = PAGE_META[pathname] || PAGE_META['/'];
    const currentUrl = `${APP_URL}${pathname}`;
    const defaultImage = 'https://vishweshwarasanskrit.com/acharya-photo.jpeg'; // A placeholder or actual image URL
    const image = meta.image || defaultImage;

    // 1. Update Title
    document.title = meta.title;

    // Helper function to set or create meta tags
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

    // 3. Open Graph (Facebook/LinkedIn)
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:image', image);

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', image);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);    setMetaTag('name', 'geo.region', 'IN-KA');    setMetaTag('name', 'geo.placename', 'Bengaluru');    setMetaTag('name', 'geo.position', '12.971599;77.594563');    setMetaTag('name', 'ICBM', '12.971599, 77.594563');

  }, [pathname]);

  return null;
}
