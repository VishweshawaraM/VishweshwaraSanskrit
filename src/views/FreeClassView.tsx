import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock, Languages, Mail, Video } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { whatsappLink } from '../courses';
import { SP, upcomingFreeClasses } from '../samskaraPravesha';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-text-gold block">{children}</span>
);

/** One-click registration for the free open class. The details are typed on Zoom's own page, not on this website. */
export const FreeClassView: React.FC = () => {
  const next = useMemo(() => upcomingFreeClasses()[0], []);
  const zoom = next?.zoom || '';
  const wa = whatsappLink(`Hari Om Acharya ji, I would like to join the free Sanskrit class${next ? ` on ${next.long}` : ''} for my child (${SP.name}). Please send me the class link.`);

  const steps = [
    { icon: Mail, title: 'Register', text: 'Type your name and email on the next page. It takes half a minute.' },
    { icon: Video, title: 'Get your link', text: 'Zoom emails you the class link straight away, with a reminder before the class.' },
    { icon: Clock, title: 'Join at 6 PM', text: 'Click the link 5 minutes early. Your child only needs a laptop or tablet.' },
  ];

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-16 px-4 md:px-12">
      <div className="max-w-3xl mx-auto text-left space-y-10">
        <div className="space-y-5">
          <Label>Free open class · Ages {SP.ages} · Live online</Label>
          <h1 className="font-serif font-bold text-[clamp(2.4rem,7vw,4.2rem)] text-text-primary leading-[1]">
            A free Sanskrit class <span className="italic font-semibold text-gold-bright">for your child.</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-text-secondary leading-relaxed">
            Let your child try a real class with Acharya Vishweshwara M before you decide anything. Sounds, a few words and a short shloka, in Kannada and English.
          </p>
        </div>

        {next ? (
          <div className="rounded-2xl border border-gold-mid bg-surface-1 p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm text-text-primary">
              <span className="inline-flex items-center gap-2"><CalendarDays className="w-4 h-4 text-gold-bright" aria-hidden="true" />{next.long}</span>
              <span className="inline-flex items-center gap-2"><Languages className="w-4 h-4 text-gold-bright" aria-hidden="true" />Kannada and English</span>
            </div>

            {zoom ? (
              <a
                href={zoom} target="_blank" rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold hover:brightness-110"
              >
                Register for the free class <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : (
              <a
                href={wa} target="_blank" rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-xs tracking-widest uppercase font-semibold hover:brightness-110"
              >
                <WhatsAppIcon className="w-5 h-5" aria-hidden="true" /> Get the link on WhatsApp <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            {zoom && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm text-text-secondary hover:text-gold-bright transition-colors">
                <WhatsAppIcon className="w-4 h-4" aria-hidden="true" /> Prefer WhatsApp? Message the Acharya instead
              </a>
            )}

            <p className="font-sans text-xs text-text-tertiary leading-relaxed">
              Registration happens on Zoom. Your name and email are shared only with the Acharya, to send the class link and reminders. This website itself collects nothing. <Link to="/privacy" className="underline hover:text-gold-bright">Privacy notice</Link>
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gold-mid bg-surface-1 p-6 md:p-8 space-y-4">
            <p className="font-sans text-text-primary">The free classes have finished for now. The Dhruva cohort begins on {SP.start}.</p>
            <Link to="/samskara-pravesha" className="inline-flex items-center gap-2 text-gold-bright font-mono text-xs tracking-widest uppercase">See the programme <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
        )}

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-gold-dim bg-surface-1 p-5 space-y-2">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-text-gold"><s.icon className="w-4 h-4" aria-hidden="true" />Step {i + 1}</span>
              <h2 className="font-serif font-bold text-xl text-text-primary">{s.title}</h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>

        <p className="font-sans text-sm text-text-secondary">
          Want to know more first? <Link to="/samskara-pravesha" className="text-gold-bright underline">See the full programme</Link>: Samskrita Samskara Pravesha, 18 months, live, starting {SP.startShort}.
        </p>
      </div>
    </div>
  );
};
