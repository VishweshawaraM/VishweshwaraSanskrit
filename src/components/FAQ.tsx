import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

const FAQ_DATA = [
  {
    id: '1',
    question: 'How do I enroll in a course?',
    answer: 'Enrollment begins with a personal conversation. We evaluate your background, dedication, and goals before placing you in a suitable cohort. Contact us directly to start the process.'
  },
  {
    id: '2',
    question: 'What is the teaching philosophy?',
    answer: 'We strictly follow the traditional pedagogy, focusing on exact word-by-word analysis, proper phonetic vibration (Svara), and lived experience rather than mere academic study.'
  },
  {
    id: '3',
    question: 'Is prior knowledge of Sanskrit required?',
    answer: 'No prior knowledge is required for introductory courses. We guide absolute beginners from the basics of the alphabet (Varnamala) up to advanced texts, provided there is sincere dedication.'
  },
  {
    id: '4',
    question: 'How does the Guru Dakshina system work?',
    answer: 'Knowledge is not a commodity to be sold. We operate on a traditional Guru Dakshina model, where students offer financial support based on their capability and heartfelt gratitude.'
  },
  {
    id: '5',
    question: 'Are the classes pre-recorded or live?',
    answer: 'All our sessions are conducted live. Ancient wisdom requires direct mentorship and immediate correction of pronunciation and understanding, which cannot be achieved through pre-recorded videos.'
  }
];

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  data?: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ data = FAQ_DATA }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-12 w-full">
      <FadeInSection>
        <div className="space-y-3 text-center mb-8 md:mb-12">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">
            ✦ COMMON INQUIRIES
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
            Frequently Asked <span className="font-medium">Questions</span>
          </h2>
        </div>
      </FadeInSection>

      <div className="space-y-4">
        {data.map((faq, index) => (
          <FadeInSection key={faq.id} delay={100 + (index * 100)}>
            <div 
              className={`border transition-all duration-300 rounded-lg overflow-hidden ${
                openId === faq.id 
                  ? 'border-gold-mid bg-surface-2 shadow-lg' 
                  : 'border-gold-dim hover:border-gold-mid/60 bg-surface-1 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
              >
                <h3 className="font-serif text-lg md:text-xl text-text-primary pr-4 font-medium">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-text-gold shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : 'rotate-0'
                  }`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 md:p-6 pt-0 md:pt-0 border-t border-gold-dim/30 mx-5 md:mx-6 px-0 md:px-0">
                  <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed mt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
};
