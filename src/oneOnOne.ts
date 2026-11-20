// One-to-one Sanskrit pathway: 18 to 24 months, six stages. Source: Vishweshwara_Sanskrit_Curriculum.pdf.
// Fees: three tiers approved by the Acharya on 18 Nov 2026 ("Yes, great").

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
  { question: 'What is the fee?', answer: 'There are three ways to pay. Monthly is ₹8,500 ($229 abroad) for 8 live classes. A single stage of 3 months is ₹22,500 ($599). The full 18-month journey is ₹1,20,000 ($3,200). A short first conversation is free.' },
  { question: 'Can I begin with a trial?', answer: 'Yes. Write to the Acharya on WhatsApp and we will fix a first conversation. There is no obligation.' },
];

// Guru Dakshina for the one-to-one pathway (approved 18 Nov 2026). Three tiers, middle one is the target.
// Monthly: 8 classes. Stage: 3 months, 24 classes. Full: 18 months, 144 classes.
// Per class: 8,500 / 8 = 1,063; 22,500 / 24 = 938; 120,000 / 144 = 833.   USD: 229 / 8 = 29; 599 / 24 = 25; 3,200 / 144 = 22.
// Against monthly x 3 = 25,500: a stage saves 3,000. Against monthly x 18 = 153,000: full saves 33,000. Against 6 stages = 135,000: full saves 15,000.
// USD: monthly x 3 = 687, stage saves 88. Monthly x 18 = 4,122, full saves 922. 6 stages = 3,594, full saves 394.
export const OO_PRICES = [
  { id: 'monthly', title: 'Monthly', inr: '₹8,500', usd: '$229', note: 'per month · 8 live classes', perClass: '₹1,063 per class', tag: '', points: ['Start with one month', 'Stop or pause with notice', 'Class timings fixed together'], emphasis: 'plain' },
  { id: 'stage', title: 'Per stage', inr: '₹22,500', usd: '$599', note: '3 months · 24 live classes', perClass: '₹938 per class · save ₹3,000', tag: 'Most popular', points: ['One stage at a time, with a clear goal', 'Decide again after every stage', 'Lower cost per class than monthly'], emphasis: 'popular' },
  { id: 'full', title: 'Full journey', inr: '₹1,20,000', usd: '$3,200', note: 'all six stages · 144 classes · 18 months', perClass: '₹833 per class · save ₹33,000', tag: 'Best value', points: ['Your hours held for the whole pathway', 'Lowest cost per class', 'One payment, nothing to remember'], emphasis: 'value' },
];
export const OO_PRICE_NOTE = 'Fees are a Guru Dakshina for the Acharya\'s time and teaching. Indian students pay in rupees, students abroad in US dollars. Savings are shown against paying monthly. Every payment is arranged personally on WhatsApp.';

// Shlokas taught alongside the Sanskrit stages. Source: Vishweshwara_Gita_Curriculum.pdf (Stage I and II).
// Chapters chosen by the Acharya's delegation on 20 Nov 2026: Chapters 12 and 15 in full, key verses of Chapter 2.
export const OO_SHLOKAS = {
  title: 'Sanskrit and shlokas, side by side',
  intro: 'Most classes teach Sanskrit grammar, or chant shlokas by heart without knowing the words. Here your child learns both together, so every shloka is understood while it is being learnt.',
  items: [
    { title: 'From the first classes', text: 'Dhyana shlokas, the Guru Stotram and simple daily prayers, with clean pronunciation and rhythm.' },
    { title: 'Bhagavad Gita, Chapters 12 and 15', text: 'Bhakti Yoga and Purushottama Yoga, chanted accurately and learnt word by word as the grammar grows.' },
    { title: 'Key verses of Chapter 2', text: 'Selected verses on right action and steady wisdom, with their meaning.' },
  ],
};

// What a child can do and by when (cumulative months from the stage durations in the Sanskrit curriculum).
export const OO_MILESTONES = [
  { by: 'Month 2 to 3', stage: 'I', can: 'Pronounces every Sanskrit sound correctly, writes Devanagari, says their name, age and family, and names common things.' },
  { by: 'Month 5 to 7', stage: 'II', can: 'Builds simple sentences, asks questions, and uses pronouns, gender and plural forms.' },
  { by: 'Month 8 to 11', stage: 'III', can: 'Changes words correctly across the seven cases and writes applied sentences.' },
  { by: 'Month 11 to 15', stage: 'IV', can: 'Uses verbs in present, past, future and command forms.' },
  { by: 'Month 14 to 19', stage: 'V', can: 'Understands sandhi, compounds and the case roles, the formal grammar.' },
  { by: 'Month 18 to 24', stage: 'VI', can: 'Reads original texts, beginning with the Laghu Siddhanta Kaumudi.' },
];
