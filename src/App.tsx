import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
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
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';

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
  const [isNavigating, setIsNavigating] = useState(false);

  // Trigger brief preloader on route change
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 400); // 400ms preloader duration
    return () => clearTimeout(timer);
  }, [location.pathname]);

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
      
      {/* Preloader Overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-ground/80 backdrop-blur-sm pointer-events-none"
          >
            <Loader2 className="w-8 h-8 text-gold-base animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

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
              <Route path="/admin" element={<ProtectedAdminRoute><AdminView onViewChange={handleViewChange} /></ProtectedAdminRoute>} />
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
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
