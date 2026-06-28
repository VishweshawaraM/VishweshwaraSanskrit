/**
 * @license
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
import { PageNavigation } from './components/PageNavigation';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { TeachingsView } from './views/TeachingsView';
import { DakshinaView } from './views/DakshinaView';
import { TestimonialsView } from './views/TestimonialsView';
import { BeginView } from './views/BeginView';
import { LandingView } from './views/LandingView';
import { AdminView } from './views/AdminView';
import { PageView } from './types';
import { MetaTagsManager } from './components/MetaTagsManager';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
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
      <MetaTagsManager />
      
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
            <Routes location={location}>
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
            {showStandardChrome && (
              <PageNavigation />
            )}
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
