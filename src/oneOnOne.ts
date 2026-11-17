// One-to-one Sanskrit pathway: 18 to 24 months, six stages. Source: Vishweshwara_Sanskrit_Curriculum.pdf.
// Fees: DRAFT figures proposed on 18 Nov 2026, NOT yet approved by the Acharya. Do not publish to main until he confirms the numbers.

export const OO = {
  title: 'Samskrita Samskara Pravesha · One-to-One',
  devanagari: 'संस्कृताध्ययनपरम्परा',
  months: '18 to 24 months',
  stagesCount: 6,
  feeNote: 'Every class is live and one-to-one with the Acharya. Begin with a short, free conversation, and decide only when you are sure.',
};

export const OO_STAGES = [
  { n: 'I', title: 'Foundation, phonetics and vocabulary', duration: '2 to 3 months', text: 'Every vowel and consonant, short, long and extended sounds, aspiration, and strict Devanagari writing. Pronunciation is corrected again and again until it is pure.' },
  { n: 'II', title: 'Sentence formation', duration: '3 to 4 months', text: 'Pronouns, gender, number, question words and possession. Separate words start to become connected Sanskrit.' },
  { n: 'III', title: 'Noun transformation', duration: '3 to 4 months', text: 'How words change with their job in a sentence: the shabdarupas and the seven vibhaktis, with pronoun forms and applied sentences.' },
  { n: 'IV', title: 'Verb structure', duration: '3 to 4 months', text: 'The architecture of the verb: the main dhatus, present, past, future and command forms, practised in sentences you build yourself.' },
  { n: 'V', title: 'Structured grammar mastery', duration: '3 to 4 months', text: 'From basic grammar to the traditional study of it: sandhi, samasa and the karaka system, with the cases in depth.' },
  { n: 'VI', title: 'Advanced traditional texts', duration: '4 to 5 months', text: 'Direct access to original texts through the Laghu Siddhanta Kaumudi and selected prakaranas.' },
];

export const OO_OUTCOMES = [
  'Speak simple Sanskrit naturally',
  'Understand Sanskrit grammar deeply',
  'Read Sanskrit independently',
  'Understand shlokas and subhashitas directly',
  'Approach smaller granthas with confidence',
  'Stand on a firm base for Gita, Veda and Vedanta study',
];

export const OO_HOW = [
  { title: 'Just you and the Acharya', text: 'Every class is live and one-to-one. Nobody is waiting behind you, and nothing is skipped to keep a group moving.' },
  { title: 'Your pace, your time zone', text: 'Class timings are fixed together. Students join from India, the USA, Australia, the UAE and the UK.' },
  { title: 'Corrected on the spot', text: 'Pronunciation and writing are corrected as they happen, with handwritten explanation on screen.' },
  { title: 'Progress by mastery', text: 'You move to the next stage when the last one is yours, not when the calendar says so. Regular assessments show you where you stand.' },
];

export const OO_FAQ = [
  { question: 'Who is this for?', answer: 'Children aged 8 to 14 whose parents want the full 18-month pathway with the Acharya\'s whole attention on their child, and older learners on request. No earlier Sanskrit is needed.' },
  { question: 'How long does it take?', answer: 'Eighteen months at the quickest, up to twenty-four. It depends on your pace and how much you practise between classes.' },
  { question: 'What is the fee?', answer: 'Monthly, 8 live one-to-one classes cost ₹7,500 in India or $199 abroad. Paying once for the full 18-month journey saves ₹15,000 (or $282). A short first conversation is free.' },
  { question: 'Can I begin with a trial?', answer: 'Yes. Write to the Acharya on WhatsApp and we will fix a first conversation. There is no obligation.' },
];

// Guru Dakshina for the one-to-one pathway. Per class: 7,500 / 8 = 938; 199 / 8 = 25.
// Full journey: 18 x 7,500 = 135,000 vs 120,000 (saves 15,000); 18 x 199 = 3,582 vs 3,300 (saves 282).
export const OO_PRICES = [
  { id: 'monthly', title: 'Monthly', inr: '₹7,500', usd: '$199', note: 'per month · 8 live one-to-one classes', points: ['Pay month by month', 'Stop or pause with notice', 'Class timings fixed together'], best: false },
  { id: 'full', title: 'Full journey', inr: '₹1,20,000', usd: '$3,300', note: 'all six stages · 18 months, paid once', points: ['Saves ₹15,000 (or $282) against monthly', 'Your hours are held for the whole pathway', 'One payment, nothing to remember'], best: true },
];
export const OO_PRICE_NOTE = 'Fees are a Guru Dakshina for the Acharya\'s time and teaching. Indian students pay in rupees, students abroad in US dollars. Every payment is arranged personally on WhatsApp.';
