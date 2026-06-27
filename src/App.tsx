/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');

  // Page Scroll Reset on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentView]);

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onViewChange={setCurrentView} />;
      case 'about':
        return <AboutView onViewChange={setCurrentView} />;
      case 'teachings':
        return <TeachingsView onViewChange={setCurrentView} />;
      case 'dakshina':
        return <DakshinaView onViewChange={setCurrentView} />;
      case 'testimonials':
        return <TestimonialsView onViewChange={setCurrentView} />;
      case 'begin':
        return <BeginView onViewChange={setCurrentView} />;
      case 'landing':
        return <LandingView onViewChange={setCurrentView} />;
      case 'admin':
        return <AdminView onViewChange={setCurrentView} />;
      default:
        return <HomeView onViewChange={setCurrentView} />;
    }
  };

  // Determine if we show the standard layout elements (Header, Footer, Common CTA)
  const isLandingView = currentView === 'landing';
  const isBeginView = currentView === 'begin';
  const isAdminView = currentView === 'admin';
  const showStandardChrome = !isLandingView && !isBeginView && !isAdminView;

  return (
    <div className="bg-ground min-h-screen text-text-primary selection:bg-gold-base selection:text-ground flex flex-col justify-between overflow-x-hidden w-full">
      
      {/* 1. Header (Sticky navigation, only on standard pages) */}
      {showStandardChrome && (
        <Header currentView={currentView} onViewChange={setCurrentView} />
      )}

      {/* 2. Main content viewport with page-load animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className={showStandardChrome ? "pb-12" : ""}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Central Call to Action (Common invitation block) */}
      {showStandardChrome && (
        <CommonCTA onViewChange={setCurrentView} />
      )}

      {/* 4. Secondary Footer (Institutional credits and copyright) */}
      {showStandardChrome && (
        <Footer onViewChange={setCurrentView} />
      )}

      {/* 5. Mobile Bottom Sticky bar (Floating FAB replacement) */}
      {!isLandingView && !isAdminView && (
        <MobileBottomBar onViewChange={setCurrentView} />
      )}

      {/* 6. Global WhatsApp Floating Widget */}
      <WhatsAppWidget />
    </div>
  );
}
