/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StatItem, CredentialItem, SubjectItem, TestimonialItem, TimelineItem, FAQItem } from './types';

export const STATS_ITEMS: StatItem[] = [
  { id: '1', value: '7', label: 'Years Gurukula\nFormation', subtext: '' },
  { id: '2', value: '6+', label: 'Countries •\nStudents Worldwide', subtext: '' },
  { id: '3', value: '500', label: 'Sessions\nDelivered', subtext: '' },
  { id: '4', value: '6', label: 'Sacred Subjects\nTaught', subtext: '' }
];

export const CREDENTIALS_ITEMS: CredentialItem[] = [
  {
    id: '1',
    title: 'M.A. (Acharya Exam)',
    institution: 'Veda Vijnana Shodha Samsthana Samskrutha Mahapatashala',
    year: 'Expected 2026',
    description: 'Specialization in Advaita Vedanta and Shastra studies.'
  },
  {
    id: '2',
    title: 'B.A. (Shastri Exam)',
    institution: 'Veda Vijnana Shodha Samsthana',
    year: '2024',
    description: 'First Class. Focus on Sanskrit Literature, Vyakarana (Grammar), and Dharmashastra.'
  },
  {
    id: '3',
    title: '7-Year Gurukula Residency',
    institution: 'Veda Vijnana Gurukulam (Janaseva Trust)',
    year: '2018 - 2025',
    description: 'Immersive residential training in Krishnayajurveda (Samhita & Brahmana), Advaita Vedanta, Vyakarana (Laghu and Siddhanta Kaumudi), Nyaya (Tarkasangraha), Mimamsa, and Yoga.'
  },
  {
    id: '4',
    title: 'Vedanta Paribhaasha Certificate',
    institution: 'Veda Vijnana Gurukulam',
    year: '2024',
    description: 'Successfully completed rigorous examination on the seminal text of epistemology.'
  }
];

export const SUBJECTS_ITEMS: SubjectItem[] = [
  {
    id: 'samskrita',
    title: 'Samskrita Language',
    devanagari: 'संस्कृतम्',
    description: 'Comprehensive, structured language training from foundational Devanagari script to advanced grammar, sentence composition, and natural conversational fluency.',
    duration: '6 Months / Level',
    frequency: '2 Sessions / Week',
    topics: ['Devanagari script & pronunciation', 'Shabda & Dhatu rupa (declensions)', 'Sandi & Samasa (compounding)', 'Conversational storytelling & composition'],
    color: 'from-[#1F160D] to-[#2A1E12]'
  },
  {
    id: 'gita',
    title: 'Bhagavad Gita',
    devanagari: 'गीता',
    description: 'In-depth study of Krishna’s teachings, exploring the 700 verses through traditional word-by-word meaning, philosophical commentary, and practical solutions for modern life challenges.',
    duration: 'Ongoing Study',
    frequency: '1 Session / Week',
    topics: ['Traditional chanting & pronunciation', 'Shabdartha (word-by-word analysis)', 'Shankaracharya Bhashya commentary', 'Practical psychological integration'],
    color: 'from-[#2A1E12] to-[#3D0A0A]'
  },
  {
    id: 'veda',
    title: 'Veda Mantra Chanting',
    devanagari: 'वेदः',
    description: 'Traditional chanting of sacred Suktams and mantras with absolute commitment to Svara (phonetic intonation) and ancient Vedic rules of rhythm, ensuring spiritual resonance.',
    duration: '3 Months / Suktam',
    frequency: '2 Sessions / Week',
    topics: ['Shiksha (Vedic phonetics)', 'Svara markings & intonation rules', 'Purusha, Sri, & Durga Suktams chanting', 'Sri Rudram & Camaka recitation'],
    color: 'from-[#3D0A0A] to-[#1F160D]'
  },
  {
    id: 'stotra',
    title: 'Stotras & Suktams',
    devanagari: 'स्तोत्रम्',
    description: 'Learn the core devotional verses composed by Adi Shankaracharya and other great seers, focusing on exact pronunciation, compound analysis, and deep contemplation.',
    duration: 'Flexible',
    frequency: '1 Session / Week',
    topics: ['Devi Mahatmyam selections', 'Vishnu Sahasranama chanting', 'Adi Shankara stotras (Bhaja Govindam)', 'Metrical rhythm & lyrical flow'],
    color: 'from-[#161008] to-[#1F160D]'
  },
  {
    id: 'puja',
    title: 'Puja Vidhi & Rituals',
    devanagari: 'पूजा',
    description: 'Understand the science and steps of traditional worship. Learn the mantras, shodashopachara (16 steps) ritual sequences, and inner significance of external offerings.',
    duration: '4 Months',
    frequency: '1 Session / Week',
    topics: ['Inner meaning of rituals', 'Daily Panchayatan puja steps', 'Ganapati & Devi puja sequences', 'Sacred offerings & mudras'],
    color: 'from-[#1F160D] to-[#2A1E12]'
  },
  {
    id: 'vedanta',
    title: 'Advaita Vedanta',
    devanagari: 'वेदान्तः',
    description: 'Rigorous exploration of non-dual consciousness through foundational texts (Prakarana Granthas like Tattva Bodha, Atma Bodha) and Upanishadic learning methodologies.',
    duration: 'Ongoing Study',
    frequency: '1 Session / Week',
    topics: ['Tattva Bodha (Introduction)', 'Vivekacudamani (Discrimination)', 'Upanishad selections & chanting', 'Jnana Yoga contemplative practices'],
    color: 'from-[#2A1E12] to-[#161008]'
  }
];

export const TESTIMONIALS_ITEMS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Nagaraj',
    role: 'Parent of Agastheswara Sharma',
    location: 'Abu Dhabi, UAE',
    flag: '🇦🇪',
    content: 'Deepest gratitude for the exceptional guidance provided to my son Agastheswara in learning the sacred Vedas. From the first session, it was evident that your profound knowledge and passionate teaching style ignited a genuine spark of curiosity and devotion in him. Your ability to break down complex mantras and shlokas into accessible yet deeply insightful explanations has fostered a sense of discipline and spiritual connection that permeates his daily life.',
    subject: 'Veda',
    featured: true
  },
  {
    id: '2',
    name: 'Manohar',
    role: 'Parent of Children (Ages 7 & 10)',
    location: 'Florida, USA',
    flag: '🇺🇸',
    content: "Vishweshwara is a wonderful Samskrutam teacher. Over the past three months, he has been teaching our two children, ages 7 and 10, and we've been very impressed. He is exceptionally dedicated, patient, and genuinely cares about sharing cultural and traditional values. As an honest and earnest student of the Vedic heritage, his passion shines through, and he's excellent at tailoring his style to each child's needs.",
    subject: 'Samskrita',
    featured: true
  },
  {
    id: '3',
    name: 'K V BHARATH',
    role: 'Corporate Professional & Parent of Avyukta (8)',
    location: 'Yashwanthpur, Bengaluru',
    flag: '🇮🇳',
    content: 'Myself and my 8-year-old son Avyukta are taking Mantra & Shloka classes from Guruji. I was able to understand in-depth about the Mantras and Sookthas with meaning. This is not only a new learning but also a great value addition coming out of corporate life pressure, especially with the personal attention given to each person by Guruji.',
    subject: 'Stotra',
    featured: true
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 't1',
    year: '2018',
    title: 'Pratishtha (The Entrance)',
    subtitle: 'Veda Vijnana Gurukulam',
    description: 'Began 7 years of traditional, fully residential residency living under the direct guidance of revered Acharyas, disconnecting from modern distractions to focus on scriptural study.'
  },
  {
    id: 't2',
    year: '2020',
    title: 'Adhyayana (Vedic Foundation)',
    subtitle: 'Krishnayajurveda & Vyakarana',
    description: 'Mastered the oral recitation of the Taittiriya Samhita and Brahmana with correct Svaras, paired with continuous studies of classical Sanskrit syntax.'
  },
  {
    id: 't3',
    year: '2022',
    title: 'Darsana (Philosophy & Shastra)',
    subtitle: 'Advaita Vedanta & Nyaya',
    description: 'Began rigorous study of Prakarana Granthas and Tarkasangraha, learning to structure philosophical arguments using ancient Indian epistemology.'
  },
  {
    id: 't4',
    year: '2024',
    title: 'Shastri (Graduation & Initiation)',
    subtitle: 'B.A. in Shastri & Teaching',
    description: 'Successfully graduated with a First Class Shastri degree. Commenced mentoring younger Gurukula students in Sanskrit literature and teaching neighborhood workshops.'
  },
  {
    id: 't5',
    year: '2025',
    title: 'Vistarana (Spreading the Light)',
    subtitle: 'Digital Gurukula Inception',
    description: 'Completed 7 years of full residential Gurukula training. Commenced postgraduate studies (M.A. Acharya) and established a digital classroom to bring unaltered traditional wisdom to global seekers.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is Guru Dakshina, and how does it work here?',
    answer: 'Guru Dakshina is an ancient, sacred tradition. Instead of commercial, upfront fees, students make a self-determined offering (Dakshina) that honors the knowledge received and supports the teacher’s livelihood. We do not turn away earnest seekers due to financial constraints.'
  },
  {
    id: 'faq2',
    question: 'I have zero prior knowledge of Sanskrit. Can I join?',
    answer: 'Absolutely. We start from the very basics—the shapes of letters, the sound frequencies, and phonetic structures. Our curriculum is designed to build confidence step-by-step.'
  },
  {
    id: 'faq3',
    question: 'Are classes live, or are they recorded videos?',
    answer: 'All classes are 100% live and interactive over video conference. Sanskrit, especially chanting, requires real-time feedback, correction of tongue positions, and direct human connection.'
  },
  {
    id: 'faq4',
    question: 'What is the schedule and time commitment?',
    answer: 'Most courses run 1 to 2 sessions per week, with each session lasting 60 minutes. We support slots for multiple global timezones, including India (IST), North America (EST/PST), and Europe (CET).'
  },
  {
    id: 'faq5',
    question: 'Do you offer certificates upon completion?',
    answer: 'While our primary goal is transformation and genuine knowledge transmission rather than paper credentials, we can provide institutional certificates verifying your hours of traditional shastra study.'
  },
  {
    id: 'faq6',
    question: 'How do I schedule a personal consultation?',
    answer: 'You can request a free 15-minute consultation via WhatsApp or our web form on the "Begin" page. We will discuss your current background, interests, and select the optimal subject and level for you.'
  }
];
