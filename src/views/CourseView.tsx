import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronRight, Clock, User, Users } from 'lucide-react';
import { COURSES, COURSE_BY_SLUG, ACHARYA_NAME, whatsappLink } from '../courses';
import { FadeInSection } from '../components/FadeInSection';
import { Motif, DecorativeBorder } from '../components/Motif';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-xs tracking-[0.2em] text-text-gold uppercase block">✦ {children}</span>
);

export const CourseView: React.FC = () => {
  const { slug = '' } = useParams();
  const course = COURSE_BY_SLUG[slug];
  if (!course) return <Navigate to="/teachings" replace />;

  const others = COURSES.filter(c => c.slug !== course.slug);
  const firstMessage = course.formats[0].message;

  return (
    <div className="space-y-20 md:space-y-28">
      {/* HERO */}
      <section className="relative pt-32 pb-16 bg-[#0E0B07] border-b border-gold-mid overflow-hidden px-4 md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,#1F160D_0%,transparent_100%)] opacity-40 pointer-events-none" />
        <div className="absolute -right-6 top-20 font-devanagari text-[9rem] md:text-[14rem] leading-none text-[#C8860A]/[0.07] font-bold select-none pointer-events-none" aria-hidden="true">
          {course.devanagari}
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-8 text-left">
          <FadeInSection direction="up" delay={100}>
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary">
              <Link to="/" className="hover:text-text-gold transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/teachings" className="hover:text-text-gold transition-colors">Courses</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-text-gold">{course.title}</span>
            </nav>
          </FadeInSection>

          <FadeInSection direction="up" delay={200}>
            <div className="space-y-4 max-w-3xl">
              <span className="font-devanagari text-2xl md:text-3xl text-text-gold block">{course.devanagari}</span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-text-primary tracking-tight leading-none [text-wrap:balance]">
                {course.title}
              </h1>
              <p className="font-serif text-xl md:text-2xl text-text-secondary italic leading-snug [text-wrap:balance]">
                {course.tagline}
              </p>
            </div>
          </FadeInSection>

          <FadeInSection direction="up" delay={300}>
            <div className="max-w-2xl space-y-4">
              {course.intro.map((p, i) => (
                <p key={i} className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">{p}</p>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection direction="up" delay={400}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
              <div className="flex items-center gap-3">
                <img
                  src="/acharya-photo.webp"
                  alt={ACHARYA_NAME}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover object-top border border-gold-mid"
                />
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-text-tertiary uppercase block">Taught by</span>
                  <Link to="/about" className="font-serif text-lg text-text-primary hover:text-text-gold transition-colors">
                    {ACHARYA_NAME}
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappLink(firstMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-[11px] tracking-widest uppercase font-semibold hover:brightness-110 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Talk with the Acharya</span>
                </a>
                <a
                  href="#ways-to-learn"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gold-mid text-text-secondary hover:text-text-gold hover:border-text-gold font-mono text-[11px] tracking-widest uppercase transition-all"
                >
                  <span>Ways to learn</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* HOW I TEACH */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-4 space-y-4 text-left">
          <FadeInSection direction="left" delay={100}>
            <SectionLabel>The method</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-light text-text-primary tracking-tight mt-2 [text-wrap:balance]">
              {course.methodTitle}
            </h2>
            {course.verse ? (
              <figure className="mt-8 p-6 rounded-xl border border-gold-mid/60 bg-[#0E0B07] space-y-4">
                <blockquote className="space-y-1">
                  {course.verse.devanagari.map(line => (
                    <p key={line} className="font-devanagari text-lg md:text-xl text-text-gold leading-normal whitespace-nowrap">{line}</p>
                  ))}
                </blockquote>
                <p className="font-serif italic text-sm text-text-secondary leading-relaxed">{course.verse.iast}</p>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{course.verse.meaning}</p>
                <figcaption className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-tertiary">
                  {course.verse.source}
                </figcaption>
              </figure>
            ) : (
              <div className="hidden lg:block opacity-20 mt-8">
                <Motif size={120} color="#C8860A" />
              </div>
            )}
          </FadeInSection>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5 text-left content-start">
          {course.method.map((m, i) => (
            <FadeInSection key={m.title} direction="up" delay={150 + i * 80}>
              <div className="h-full p-6 rounded-xl bg-surface-2 border border-gold-dim/50 hover:border-gold-mid transition-colors space-y-3">
                <div className="h-8 w-8 rounded-full bg-[#1F160D] border border-gold-mid flex items-center justify-center font-mono text-xs text-text-gold font-bold">
                  {i + 1}
                </div>
                <h3 className="font-serif text-lg text-text-primary font-semibold">{m.title}</h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">{m.text}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* AUDIENCES (children / adults) */}
      {course.audiences && (
        <section className="bg-surface-1 border-y border-gold-mid py-20 px-4 md:px-12">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <SectionLabel>Two ways of teaching</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-light text-text-primary tracking-tight">
                Children and adults <span className="font-medium text-text-gold">learn differently</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {course.audiences.map((a, i) => (
                <FadeInSection key={a.label} direction="up" delay={150 + i * 100}>
                  <div className={`h-full p-7 rounded-xl bg-[#0E0B07] border border-gold-dim/50 space-y-4 border-l-2 ${i === 0 ? 'border-l-gold-base' : 'border-l-gold-bright'}`}>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-text-gold uppercase block">{a.label}</span>
                    <h3 className="font-serif text-2xl text-text-primary font-semibold">{a.title}</h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">{a.text}</p>
                    <ul className="space-y-2 pt-1">
                      {a.points.map(p => (
                        <li key={p} className="flex items-start gap-2 text-sm font-sans text-text-secondary">
                          <CheckCircle className="w-4 h-4 text-[#C8860A] shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PATH */}
      <section className="max-w-5xl mx-auto px-4 md:px-12 space-y-10">
        <div className="text-center space-y-3">
          <SectionLabel>The path</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight [text-wrap:balance]">
            {course.pathTitle}
          </h2>
          {course.pathIntro && (
            <p className="font-sans text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">{course.pathIntro}</p>
          )}
          <DecorativeBorder className="my-6 text-gold-base" />
        </div>

        <ol className="space-y-6 text-left">
          {course.path.map((st, i) => (
            <li key={st.title}>
              <FadeInSection direction="up" delay={100 + i * 60}>
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-surface-2 border border-gold-mid flex items-center justify-center font-mono text-xs text-text-gold shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {i !== course.path.length - 1 && <div className="w-px flex-1 bg-gold-dim mt-2" />}
                  </div>
                  <div className="flex-1 min-w-0 pb-2 space-y-3">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[10px] tracking-[0.18em] text-text-gold uppercase">{st.label}</span>
                      {st.duration && (
                        <span className="font-mono text-[10px] text-text-tertiary uppercase flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {st.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl text-text-primary font-semibold">{st.title}</h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-2xl">{st.text}</p>
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {st.items.map(it => (
                        <li key={it} className="px-3 py-1.5 rounded-full bg-surface-2 border border-gold-dim/60 font-sans text-xs text-text-secondary">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInSection>
            </li>
          ))}
        </ol>
      </section>

      {/* WAYS TO LEARN */}
      <section id="ways-to-learn" className="scroll-mt-28 bg-surface-1 border-y border-gold-mid py-20 px-4 md:px-12">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <SectionLabel>Ways to learn</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-light text-text-primary tracking-tight">
              Choose how you’d like <span className="font-medium text-text-gold">to study</span>
            </h2>
            {course.formatsNote && (
              <p className="font-sans text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">{course.formatsNote}</p>
            )}
          </div>

          <div className={`grid grid-cols-1 gap-6 text-left ${course.formats.length > 1 ? 'md:grid-cols-2' : 'max-w-xl mx-auto'}`}>
            {course.formats.map((f, i) => {
              const Icon = f.kind === 'group' ? Users : User;
              return (
                <FadeInSection key={f.title} direction="up" delay={150 + i * 100}>
                  <div className="h-full flex flex-col justify-between p-7 rounded-xl bg-[#0E0B07] border border-gold-mid/60 hover:border-gold-bright transition-colors space-y-6">
                    <div className="space-y-4">
                      <div className="h-11 w-11 rounded-lg bg-[#C8860A]/10 border border-gold-mid flex items-center justify-center">
                        <Icon className="w-5 h-5 text-text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl text-text-primary font-semibold">{f.title}</h3>
                      <p className="font-sans text-sm text-text-secondary leading-relaxed">{f.text}</p>
                      <ul className="space-y-2">
                        {f.points.map(p => (
                          <li key={p} className="flex items-start gap-2 text-sm font-sans text-text-secondary">
                            <CheckCircle className="w-4 h-4 text-[#C8860A] shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <a
                        href={whatsappLink(f.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-gradient-to-r from-gold-base to-gold-bright text-ground font-mono text-[11px] tracking-widest uppercase font-semibold hover:brightness-110 transition-all"
                      >
                        <WhatsAppIcon className="w-4 h-4" aria-hidden="true" />
                        <span>Chat with the Acharya</span>
                      </a>
                      <Link
                        to="/begin"
                        className="w-full inline-flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-text-tertiary hover:text-text-gold transition-colors"
                      >
                        <span>Or send an enquiry</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>

          <p className="text-center font-sans text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
            Not sure which is right for you? Message me and tell me a little about yourself. We’ll work it out together.
            <span className="block font-serif italic text-text-gold mt-2">— {ACHARYA_NAME}</span>
          </p>
        </div>
      </section>

      {/* OTHER COURSES */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 pb-24 space-y-8">
        <div className="text-center">
          <SectionLabel>Other subjects</SectionLabel>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {others.map(o => (
            <Link
              key={o.slug}
              to={`/courses/${o.slug}`}
              className="group relative overflow-hidden p-5 rounded-xl bg-surface-2 border border-gold-dim/50 hover:border-gold-mid hover:-translate-y-1 transition-all text-left min-w-0"
            >
              <span className="absolute right-2 top-1 font-devanagari text-4xl text-[#C8860A]/10 font-bold select-none" aria-hidden="true">{o.devanagari}</span>
              <span className="relative font-serif text-base text-text-primary group-hover:text-text-gold transition-colors font-medium block">{o.title}</span>
              <span className="relative mt-2 inline-flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase text-text-tertiary group-hover:text-text-gold">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
