import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/teachings', label: 'Courses' },
  { to: '/about', label: 'About the Acharya' },
  { to: '/begin', label: 'Begin' },
];

export const NotFoundView: React.FC = () => (
  <section className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center space-y-6">
    <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">ERROR 404</span>
    <h1 className="font-display text-4xl md:text-6xl font-light text-text-primary tracking-tight">
      Page <span className="font-medium text-text-gold">not found</span>
    </h1>
    <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
      The page you are looking for does not exist or has moved. These links will help you find your way.
    </p>
    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
      {LINKS.map(l => (
        <Link
          key={l.to}
          to={l.to}
          className="px-5 py-2.5 border border-gold-dim hover:border-gold-mid text-text-gold font-mono text-xs tracking-widest uppercase transition-colors"
        >
          {l.label}
        </Link>
      ))}
    </div>
  </section>
);
