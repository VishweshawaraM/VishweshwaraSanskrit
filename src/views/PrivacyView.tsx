import React from 'react';
import { Link } from 'react-router-dom';
import { FadeInSection } from '../components/FadeInSection';
import { PRIVACY_EMAIL, PRIVACY_INTRO, PRIVACY_SECTIONS, PRIVACY_UPDATED, PRIVACY_VERSION } from '../privacy';

export const PrivacyView: React.FC = () => (
  <div className="min-h-screen pt-28 pb-20 px-4 md:px-12 bg-ground">
    <div className="max-w-3xl mx-auto">
      <FadeInSection>
        <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-text-gold block mb-3">Privacy Notice</span>
        <h1 className="font-serif font-bold text-[clamp(2.2rem,5vw,3.4rem)] text-text-primary leading-[1.05]">
          Your information, <span className="italic font-semibold text-text-gold">handled with care.</span>
        </h1>
        <p className="font-sans text-sm text-text-tertiary mt-4">Version {PRIVACY_VERSION} · Updated {PRIVACY_UPDATED}</p>
        <p className="font-sans text-base text-text-secondary leading-relaxed mt-6">{PRIVACY_INTRO}</p>
      </FadeInSection>

      <nav aria-label="On this page" className="mt-10 p-5 rounded-xl border border-gold-dim bg-surface-1">
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {PRIVACY_SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="font-sans text-sm text-text-secondary hover:text-text-gold transition-colors">
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-12 space-y-10">
        {PRIVACY_SECTIONS.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-text-primary mb-3">
              {i + 1}. {s.title}
            </h2>
            {s.paragraphs?.map((p, k) => (
              <p key={k} className="font-sans text-base text-text-secondary leading-relaxed mb-3">{p}</p>
            ))}
            {s.points && (
              <ul className="list-disc pl-6 space-y-2 marker:text-text-gold">
                {s.points.map((p, k) => (
                  <li key={k} className="font-sans text-base text-text-secondary leading-relaxed">{p}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-14 p-6 rounded-2xl border border-gold-mid bg-surface-1 text-center space-y-3">
        <p className="font-sans text-sm text-text-secondary">Want your details corrected or deleted?</p>
        <a
          href={`mailto:${PRIVACY_EMAIL}?subject=${encodeURIComponent('Privacy request')}`}
          className="inline-block px-6 py-3 rounded bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold"
        >
          Email {PRIVACY_EMAIL}
        </a>
        <p className="font-sans text-xs text-text-tertiary">
          <Link to="/" className="hover:text-text-gold">Back to the home page</Link>
        </p>
      </div>
    </div>
  </div>
);
