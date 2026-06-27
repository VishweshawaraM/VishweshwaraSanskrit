/**
 *   @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CommonCTA } from './components/CommonCTA';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { TeachingsView } from './views/TeachingsView';
import { DakshinaView } from './views/DakshinaView';
import { TestimonialsView } from './views/TestimonialsView';
import { BeginView } from './views/BeginView';
import { LandingView } from './views/LandingView';
import { AdminView } from './views/AdminView';
import { PageView } from './types';

// Meta data configuration for each view
const PAGE_META: Record<string, { title: string; description: string }> = {
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    
    // Update Document Title and Meta Description
    const meta = PAGE_META[pathname] || PAGE_META['/'];
    document.title = meta.title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', meta.description);

  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to map old string routes to navigate
  const handleViewChange = (view: PageView) => {
    if (view === 'home') navigate('/');
    else navigate(`/${view}`);
  };

  // Determine current view from pathname
  const currentView = useMemo(() => {
    const path = location.pathname;
    if (path === '/') return 'home';
    const viewName = path.substring(1) as PageView;
    return viewName;
  }, [location.pathname]);

  const isLandingView = currentView === 'landing';
  const isBeginView = currentView === 'begin';
  const isAdminView = currentView === 'admin';
  const showStandardChrome = !isLandingView && !isBeginView && !isAdminView;

  return (
    <div className="bg-ground min-h-screen text-text-primary selection:bg-gold-base selection:text-ground flex flex-col justify-between overflow-x-hidden w-full">
      <ScrollToTop />
      
      {/* 1. Header */}
      {showStandardChrome && (
        <Header currentView={currentView} onViewChange={handleViewChange} />
      )}

      {/* 2. Main content viewport */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className={showStandardChrome ? "pb-12" : ""}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomeView onViewChange={handleViewChange} />} />
              <Route path="/about" element={<AboutView onViewChange={handleViewChange} />} />
              <Route path="/teachings" element={<TeachingsView onViewChange={handleViewChange} />} />
              <Route path="/dakshina" element={<DakshinaView onViewChange={handleViewChange} />} />
              <Route path="/testimonials" element={<TestimonialsView onViewChange={handleViewChange} />} />
              <Route path="/begin" element={<BeginView onViewChange={handleViewChange} />} />
              <Route path="/landing" element={<LandingView onViewChange={handleViewChange} />} />
              <Route path="/admin" element={<AdminView onViewChange={handleViewChange} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Central Call to Action */}
      {showStandardChrome && (
        <CommonCTA onViewChange={handleViewChange} />
      )}

      {/* 4. Secondary Footer */}
      {showStandardChrome && (
        <Footer onViewChange={handleViewChange} />
      )}

      {/* 5. Mobile Bottom Sticky bar */}
      {!isLandingView && !isAdminView && (
        <MobileBottomBar onViewChange={handleViewChange} />
      )}

      {/* 6. Global WhatsApp Floating Widget */}
      <WhatsAppWidget />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
