import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PAGE_ORDER = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'The Acharya' },
  { path: '/teachings', label: 'Curriculum' },
  { path: '/testimonials', label: 'Student Voices' },
  { path: '/dakshina', label: 'Guru Dakshina' },
];

export const PageNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = PAGE_ORDER.findIndex(p => p.path === location.pathname);

  // If not a standard page, don't show navigation
  if (currentIndex === -1) return null;

  const prevPage = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;

  if (!prevPage && !nextPage) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-12 py-12 pb-24 md:pb-16 mt-12 border-t border-gold-dim/20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
        {prevPage ? (
          <button 
            onClick={() => navigate(prevPage.path)}
            className="group flex flex-col items-start w-full sm:w-1/2 p-6 rounded-xl bg-surface-2/30 hover:bg-surface-2 border border-transparent hover:border-gold-dim/50 transition-all text-left"
          >
            <span className="font-mono text-[10px] md:text-xs text-text-tertiary uppercase tracking-wider mb-2 flex items-center">
              <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" /> Previous Page
            </span>
            <span className="font-serif text-lg md:text-xl text-text-primary group-hover:text-gold-base transition-colors">
              {prevPage.label}
            </span>
          </button>
        ) : (
          <div className="hidden sm:block w-full sm:w-1/2"></div>
        )}

        {nextPage ? (
          <button 
            onClick={() => navigate(nextPage.path)}
            className="group flex flex-col items-end w-full sm:w-1/2 p-6 rounded-xl bg-surface-2/30 hover:bg-surface-2 border border-transparent hover:border-gold-dim/50 transition-all text-right"
          >
            <span className="font-mono text-[10px] md:text-xs text-text-tertiary uppercase tracking-wider mb-2 flex items-center">
              Next Page <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-serif text-lg md:text-xl text-text-primary group-hover:text-gold-base transition-colors">
              {nextPage.label}
            </span>
          </button>
        ) : (
          <div className="hidden sm:block w-full sm:w-1/2"></div>
        )}
      </div>
    </div>
  );
};
