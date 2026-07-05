import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const APP_URL = (import.meta as any).env?.VITE_APP_URL || 'https://vishweshwarasanskrit.com';

export const PAGE_META: Record<string, { title: string; description: string; image?: string }> = {
  '/': {
    title: 'Vishweshwara Sanskrit Gurukula | Authentic Online Sanskrit Classes',
    description: 'Master Vedas, Vyakarana, Advaita Vedanta, and Bhagavad Gita at Vishweshwara Sanskrit Gurukula. Authentic online Sanskrit classes taught by a traditional Acharya.',
  },
  '/about': {
    title: 'About the Acharya | Vishweshwara Sanskrit Gurukula',
    description: 'Learn about Acharya Vishweshwara N M, his Gurukula lineage, and his dedication to teaching Sanskrit, Vedanta, and traditional wisdom.',
  },
  '/teachings': {
    title: 'Curriculum & Teachings | Vishweshwara Sanskrit Gurukula',
    description: 'Explore our curriculum including Sanskrit Grammar (Vyakarana), Bhagavad Gita, Advaita Vedanta, and Vedic Chanting.',
  },
  '/dakshina': {
    title: 'Guru Dakshina | Vishweshwara Sanskrit Gurukula',
    description: 'Information regarding Guru Dakshina and offerings for learning at Vishweshwara Sanskrit Gurukula.',
  },
  '/testimonials': {
    title: 'Student Voices | Vishweshwara Sanskrit Gurukula',
    description: 'Read testimonials from students worldwide who have studied Sanskrit and Vedanta under Acharya Vishweshwara.',
  },
  '/begin': {
    title: 'Begin Your Journey | Vishweshwara Sanskrit Gurukula',
    description: 'Start your journey of learning Sanskrit, chanting, and Vedanta. Join the modern digital Gurukula today.',
  },
  '/landing': {
    title: 'Welcome | Vishweshwara Sanskrit Gurukula',
    description: 'Vishweshwara Sanskrit is a modern digital Gurukula dedicated to preserving and transmitting authentic Indian wisdom traditions.',
  },
  '/admin': {
    title: 'Admin Panel | Vishweshwara Sanskrit Gurukula',
    description: 'Administration area for Vishweshwara Sanskrit Gurukula.',
  },
};

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
    canonical.setAttribute('href', currentUrl);

  }, [pathname]);

  return null;
}
