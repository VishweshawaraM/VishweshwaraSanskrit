import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CommonCTA } from './components/CommonCTA';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { FestiveSparks, DeepavaliGreeting, isDeepavaliSeason } from './components/Deepavali';
import { PageNavigation } from './components/PageNavigation';
import { ConsentBanner } from './components/ConsentBanner';
import { PageView } from './types';
import { MetaTagsManager } from './components/MetaTagsManager';
import { AmbientParticles } from './components/AmbientParticles';
import { NewPage } from './newsite/NewPage';
import { track, wireClickTracking } from './lib/track';
import { useParams } from 'react-router-dom';

// Pages that use the new light design (they carry their own header and footer).
const NEW_DESIGN_PATHS = ['/', '/about', '/courses', '/samskara-pravesha', '/one-on-one', '/testimonials', '/dakshina', '/begin', '/aksharam', '/schedule'];
const NEW_COURSES = ['sanskrit', 'bhagavad-gita', 'krishna-yajurveda', 'advaita-vedanta', 'stotras'];
const isNewDesign = (p: string) => NEW_DESIGN_PATHS.includes(p.replace(/\/$/, '') || '/') || NEW_COURSES.some(c => p.replace(/\/$/, '') === `/courses/${c}`);
const NewCoursePage = () => {
  const { slug = '' } = useParams();
  return NEW_COURSES.includes(slug) ? <NewPage key={slug} name={`course-${slug}`} pageId="courses" /> : <CourseView />;
};

const HomeView = React.lazy(() => import('./views/HomeView').then(module => ({ default: module.HomeView })));
const AboutView = React.lazy(() => import('./views/AboutView').then(module => ({ default: module.AboutView })));
const TeachingsView = React.lazy(() => import('./views/TeachingsView').then(module => ({ default: module.TeachingsView })));
const DakshinaView = React.lazy(() => import('./views/DakshinaView').then(module => ({ default: module.DakshinaView })));
const TestimonialsView = React.lazy(() => import('./views/TestimonialsView').then(module => ({ default: module.TestimonialsView })));
const ProtectedAdminRoute = React.lazy(() => import('./components/ProtectedAdminRoute').then(module => ({ default: module.ProtectedAdminRoute })));
const NotFoundView = React.lazy(() => import('./views/NotFoundView').then(module => ({ default: module.NotFoundView })));
const BeginView = React.lazy(() => import('./views/BeginView').then(module => ({ default: module.BeginView })));
const OneOnOneView = React.lazy(() => import('./views/OneOnOneView').then(module => ({ default: module.OneOnOneView })));
const FreeClassView = React.lazy(() => import('./views/FreeClassView').then(module => ({ default: module.FreeClassView })));
const SamskaraPraveshaView = React.lazy(() => import('./views/SamskaraPraveshaView').then(module => ({ default: module.SamskaraPraveshaView })));
const AksharamView = React.lazy(() => import('./views/AksharamView').then(module => ({ default: module.AksharamView })));
const AksharamTermsView = React.lazy(() => import('./views/AksharamTermsView').then(module => ({ default: module.AksharamTermsView })));
const AksharamDownloadView = React.lazy(() => import('./views/AksharamView').then(module => ({ default: module.AksharamDownloadView })));
const PrivacyView = React.lazy(() => import('./views/PrivacyView').then(module => ({ default: module.PrivacyView })));
const CourseView = React.lazy(() => import('./views/CourseView').then(module => ({ default: module.CourseView })));
const LandingView = React.lazy(() => import('./views/LandingView').then(module => ({ default: module.LandingView })));
const AdminView = React.lazy(() => import('./views/AdminView').then(module => ({ default: module.AdminView })));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  // anonymous visit counter (see src/lib/track.ts)
  React.useEffect(() => { wireClickTracking(); }, []);
  React.useEffect(() => { const t = setTimeout(() => track('view', location.pathname), 400); return () => clearTimeout(t); }, [location.pathname]);
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
  const newDesign = isNewDesign(location.pathname);
  const showStandardChrome = !isLandingView && !isBeginView && !isAdminView && !newDesign;

  return (
    <div className="bg-ground min-h-screen text-text-primary selection:bg-gold-base selection:text-ground flex flex-col justify-between overflow-x-hidden w-full">
      {!newDesign && <AmbientParticles />}
      <ScrollToTop />
      <MetaTagsManager />
      
      {/* Preloader Overlay */}
      <AnimatePresence>
        {isNavigating && !newDesign && (
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
            <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><Loader2 className="w-8 h-8 text-gold-base animate-spin" /></div>}>
              <Routes location={location}>
                <Route path="/" element={<NewPage name="index" pageId="home" />} />
                <Route path="/about" element={<NewPage name="about" pageId="about" />} />
                <Route path="/teachings" element={<TeachingsView onViewChange={handleViewChange} />} />
                <Route path="/dakshina" element={<NewPage name="dakshina" pageId="dakshina" />} />
                <Route path="/testimonials" element={<NewPage name="testimonials" pageId="testimonials" />} />
                <Route path="/courses" element={<NewPage name="courses" pageId="courses" />} />
                <Route path="/courses/:slug" element={<NewCoursePage />} />
                <Route path="/samskara-pravesha" element={<NewPage name="samskara-pravesha" pageId="courses" />} />
                <Route path="/free-class" element={<FreeClassView />} />
                <Route path="/one-on-one" element={<NewPage name="one-on-one" pageId="courses" />} />
                <Route path="/aksharam" element={<NewPage name="aksharam" pageId="aksharam" />} />
                <Route path="/aksharam/download-e21259fdf0" element={<AksharamDownloadView />} />
                <Route path="/aksharam/terms" element={<AksharamTermsView />} />
                <Route path="/privacy" element={<PrivacyView />} />
                <Route path="/begin" element={<NewPage name="begin" pageId="begin" />} />
                <Route path="/schedule" element={<NewPage name="book" pageId="book" />} />
                <Route path="/book" element={<Navigate to="/schedule" replace />} />
                <Route path="/landing" element={<LandingView onViewChange={handleViewChange} />} />
                <Route path="/admin" element={<ProtectedAdminRoute><AdminView onViewChange={handleViewChange} /></ProtectedAdminRoute>} />
                <Route path="*" element={<NotFoundView />} />
              </Routes>
            </Suspense>
            {showStandardChrome && (
              <PageNavigation />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Central Call to Action */}
      {showStandardChrome && location.pathname !== '/samskara-pravesha' && (
        <CommonCTA onViewChange={handleViewChange} />
      )}

      {/* 4. Secondary Footer */}
      {showStandardChrome && (
        <Footer onViewChange={handleViewChange} />
      )}

      {/* 5. Mobile Bottom Sticky bar */}
      {!isLandingView && !isAdminView && !newDesign && (
        <MobileBottomBar onViewChange={handleViewChange} />
      )}

      {/* 6. Global WhatsApp Floating Widget */}
      {!newDesign && <WhatsAppWidget />}

      {/* 6b. Ad-measurement choice (renders nothing unless a Meta Pixel ID is configured) */}
      <ConsentBanner />

      {/* 7. Deepavali 2026 (switches itself off after 15 Nov) */}
      {isDeepavaliSeason() && showStandardChrome && (
        <>
          <FestiveSparks />
          <DeepavaliGreeting />
        </>
      )}
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
