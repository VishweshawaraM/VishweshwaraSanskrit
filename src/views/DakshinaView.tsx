/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, CheckCircle2, ShieldCheck, HeartHandshake, Copy, QrCode } from 'lucide-react';
import { FAQ_ITEMS } from '../data';
import { PageView } from '../types';
import { Button } from '../components/Button';

interface DakshinaViewProps {
  onViewChange: (view: PageView) => void;
}

export const DakshinaView: React.FC<DakshinaViewProps> = ({ onViewChange }) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<string | null>('faq1');

  const upiId = 'vishweshwara.sanskrit@slc';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const steps = [
    {
      num: '01',
      title: 'Adhyayana (Study)',
      desc: 'Attend live classes, ask questions, complete reading assignments, and absorb the knowledge with sincerity.'
    },
    {
      num: '02',
      title: 'Nishtha (Sincerity)',
      desc: 'Evaluate the profound value the teachings bring to your mental peace, daily discipline, and life orientation.'
    },
    {
      num: '03',
      title: 'Arpana (Offering)',
      desc: 'Make a self-determined financial offering (Guru Dakshina) at the end of each month or study term to support the Acharya.'
    }
  ];

  const comparisons = [
    {
      feature: 'Access Barrier',
      commercial: 'Mandatory upfront cost. No payment = immediate locks.',
      dakshina: 'Sincere interest is the only ticket. Sincere seekers are never turned away.'
    },
    {
      feature: 'Value Evaluation',
      commercial: 'Pre-set price determined by marketing margins.',
      dakshina: 'Self-determined by student, matching capability & heart.'
    },
    {
      feature: 'Underlying Relationship',
      commercial: 'Transaction-based customer service.',
      dakshina: 'Sacred, lifeworld bond between teacher and student.'
    },
    {
      feature: 'Objective',
      commercial: 'Maximize profit and scale certificates.',
      dakshina: 'Preserve lineage purity & trigger individual transformation.'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-32">
      {/* SECTION 1 - Cinematic Hero with Mandala (slow spin) */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-32 pb-16 bg-[#060504] border-b border-gold-mid overflow-hidden px-6 text-center select-none">
        
        {/* Animated Concentric CSS Mandala Rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none select-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="relative w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-dashed border-gold-base flex items-center justify-center"
          >
            <div className="w-[85%] h-[85%] rounded-full border border-gold-bright flex items-center justify-center">
              <div className="w-[75%] h-[75%] rounded-full border border-dashed border-gold-base flex items-center justify-center">
                <div className="w-[60%] h-[60%] rounded-full border border-gold-glow flex items-center justify-center">
                  <span className="font-devanagari text-6xl text-gold-glow">ॐ</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gold Glow overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-gold-base/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">THE SACRED OFFERING TRADITION</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-text-primary tracking-tight leading-none">
            Guru <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold-base to-gold-glow">Dakshina</span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto font-light">
            Lineage wisdom cannot be packaged as a commercial commodity. We offer high-fidelity shastra studies without upfront commercial fees, continuing the ancient Gurukula tradition of self-determined, capabilities-based Guru Dakshina.
          </p>
        </div>
      </section>

      {/* SECTION 2 - Meaning & Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 space-y-12 select-none">
        <div className="space-y-3 text-center">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">THE CORE PHILOSOPHY</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
            A Covenant of <span className="font-medium text-text-gold">Trust & Reciprocity</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-xl mx-auto">
            Traditional learning is built on mutual respect rather than transactional checkout systems. Contrast the two frameworks:
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-surface-2 border border-gold-mid/40 rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-surface-3 py-4 px-6 border-b border-gold-dim font-mono text-xs text-text-gold uppercase font-bold tracking-wider text-left">
            <div className="md:col-span-3">Feature</div>
            <div className="md:col-span-4 mt-2 md:mt-0">Commercial Video Courses</div>
            <div className="md:col-span-5 mt-2 md:mt-0">Guru Dakshina Model</div>
          </div>

          <div className="divide-y divide-gold-dim/20 text-left">
            {comparisons.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 py-5 px-6 gap-3 items-start hover:bg-surface-3/30 transition-colors">
                <div className="md:col-span-3 font-serif text-sm text-text-primary font-semibold">{row.feature}</div>
                <div className="md:col-span-4 font-sans text-xs text-text-tertiary">{row.commercial}</div>
                <div className="md:col-span-5 font-sans text-xs text-text-secondary font-medium border-l border-gold-dim/20 pl-0 md:pl-4">
                  {row.dakshina}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - Three Step Process */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 space-y-12 select-none">
        <div className="space-y-3 text-center">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">THE PROCESS OF RELATIONSHIP</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-text-primary tracking-tight">
            How Guru Dakshina <span className="font-medium">Unfolds</span>
          </h2>
        </div>

        {/* 3 Step Process - Horizontal Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface-2 border border-gold-dim p-6 rounded-lg shadow-md hover:border-gold-mid transition-all duration-220 flex flex-col justify-between group min-h-[200px]"
            >
              <div className="space-y-4">
                <span className="font-mono text-sm tracking-widest text-[#C8860A]/40 font-bold group-hover:text-text-gold transition-colors">
                  {step.num}
                </span>
                <h3 className="font-serif text-lg text-text-primary font-bold">{step.title}</h3>
                <p className="font-sans text-xs text-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="h-[2px] w-8 bg-gold-dim mt-6 group-hover:w-16 transition-all duration-220"></div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 - Why Not Fixed Price */}
      <section className="bg-surface-1 border-y border-gold-mid py-20 px-4 md:px-12 text-left relative overflow-hidden select-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 rounded-full bg-ruby-mid/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <HeartHandshake className="w-12 h-12 text-text-gold" />
            <h3 className="font-display text-2xl md:text-3xl font-light text-text-primary tracking-tight leading-snug">
              Why Teach <br />
              <span className="font-medium text-text-gold">Without a Fixed Fee?</span>
            </h3>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              Traditional knowledge is described as a "Dharma"—a sacred debt to ancestors. Selling shastra as an inventory item compromises the sincerity of both teacher and student.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4 font-sans text-xs text-text-secondary">
            {[
              { title: 'Preserves Sincerity', desc: 'When teachers do not teach for money, and students do not pay merely to claim certificates, the relationship becomes centered purely on learning and truth.' },
              { title: 'Unrestricted Access', desc: 'Capable seekers without financial abundance are never blocked. Corporate executives and Indology scholars study alongside each other.' },
              { title: 'Traditional Integrity', desc: 'We honor our Veda Vijnana Gurukulam lineage by ensuring we do not commercialize the sacred Taittiriya Samhita chants.' }
            ].map((p, i) => (
              <div key={i} className="p-4 bg-surface-2 border border-gold-dim/40 rounded-lg space-y-1">
                <span className="font-serif text-sm font-semibold text-text-primary block">{p.title}</span>
                <p className="leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - QR Payment Panel (Interactive hub) */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center select-none">
        {/* Left Column: QR and Bank Details */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">OFFERING HUB</span>
            <h2 className="font-display text-2xl md:text-4xl font-light text-text-primary tracking-tight">
              Support the <span className="font-medium text-text-gold">Gurukula Livelihood</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
              Students and well-wishers can make their monthly or term offerings directly through the details below. Scan the UPI QR code or copy the payment credentials.
            </p>
          </div>

          <div className="bg-surface-2 p-5 border border-gold-dim rounded-lg space-y-4">
            <h4 className="font-serif text-sm font-semibold text-text-primary border-b border-gold-dim/30 pb-2 flex items-center gap-1.5">
              <QrCode className="w-4.5 h-4.5 text-text-gold" /> UPI Payment Details
            </h4>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Styled QR container representing the actual payments */}
              <div className="p-3 bg-white rounded-lg flex items-center justify-center shrink-0 border border-gold-mid">
                <img 
                  src="./qr-code.jpeg" 
                  alt="UPI QR Code" 
                  className="w-32 h-32 object-contain"
                />
              </div>

              <div className="space-y-4 w-full text-center sm:text-left">
                <p className="font-sans text-xs text-text-secondary">
                  Scan the UPI code manually using your bank app to make your offering.
                </p>
                <div className="flex items-center justify-between p-2.5 rounded bg-surface-3 border border-gold-dim">
                  <span className="font-mono text-xs text-text-secondary break-all">{upiId}</span>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1.5 rounded hover:bg-surface-4 text-text-gold shrink-0 transition-colors"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <span className="text-[10px] uppercase font-mono font-bold text-emerald-500">Copied</span> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Screenshot Upload instructions */}
        <div className="lg:col-span-6 bg-surface-2 p-8 border border-gold-mid rounded-xl shadow-lg text-left space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-widest text-text-gold uppercase block">STUDENT WORKFLOW</span>
            <h4 className="font-serif text-xl text-text-primary font-semibold">Share Offering Receipt</h4>
            <p className="font-sans text-xs text-text-secondary">
              If you have performed a monthly Guru Dakshina transfer, please share the screenshot or transaction receipt with us via WhatsApp or Email to update your student files.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              href="https://wa.me/919482698612?text=Hari%20Om,%20I%20have%20made%20my%20Guru%20Dakshina%20offering.%20Here%20is%20the%20receipt."
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="w-full"
            >
              Share via WhatsApp
            </Button>
            <Button
              href="mailto:visanskrit.solopreneur@gmail.com?subject=Guru%20Dakshina%20Offering%20Receipt"
              variant="outline"
              className="w-full"
            >
              Share via Email
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 6 - FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 md:px-12 space-y-8 select-none">
        <div className="space-y-3 text-center">
          <span className="font-mono text-xs tracking-[0.25em] text-text-gold uppercase block">SOLVING AMBIGUITY</span>
          <h2 className="font-display text-2xl md:text-4xl font-light text-[#FAF6EE] tracking-tight">
            Dakshina <span className="font-medium text-text-gold">Frequently Asked Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.slice(0, 4).map((faq) => (
            <div
              key={faq.id}
              className="border border-gold-dim/40 rounded-lg bg-surface-2 overflow-hidden transition-colors duration-200"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full py-4.5 px-5 text-left font-serif text-base text-text-primary font-medium hover:text-text-gold transition-colors flex items-center justify-between gap-4"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-text-gold shrink-0 transition-transform duration-220 ${openFAQ === faq.id ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-xs sm:text-sm text-text-secondary px-5 pb-5 leading-relaxed border-t border-gold-dim/20 pt-3 bg-surface-3/30">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
