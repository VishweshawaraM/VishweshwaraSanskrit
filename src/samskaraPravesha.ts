// Samskrita Samskara Pravesha: children's programme. Shared by the landing page and its static shell.

export const SP = {
  name: 'Samskrita Samskara Pravesha',
  devanagari: 'संस्कृतसंस्कारप्रवेशः',
  kannadaLine: 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಮೂಲಕ ಸಂಸ್ಕೃತ ಕಲಿಕೆ',
  ages: '8–14',
  start: 'Monday 7 December 2026',
  startShort: 'Mon 7 Dec',
  schedule: 'Mondays & Fridays, 6–7 PM IST',
  seats: 15,
  seatsLeft: 15, // update as children enrol; never show a number that isn't true
  cohort: 'Dhruva',
  levels: 6,
  sessionsPerLevel: 24,
  totalSessions: 144,
  months: 18,
  breakNote: 'Holiday break 25 December – 1 January; classes resume Monday 4 January.',
  razorpay: 'https://rzp.io/rzp/SamskritaSamskaraPravesha-Leve',
  razorpayFull: 'https://rzp.io/rzp/SamskritaFullJourney',
};

export const SP_FREE_CLASSES = [
  { id: 'mon-16-nov', label: 'Mon 16 Nov', long: 'Monday 16 November, 6 PM IST' },
  { id: 'fri-20-nov', label: 'Fri 20 Nov', long: 'Friday 20 November, 6 PM IST' },
  { id: 'mon-23-nov', label: 'Mon 23 Nov', long: 'Monday 23 November, 6 PM IST' },
];

export const SP_GAINS = [
  { deva: 'वदति', title: 'Speaks with confidence', text: 'Simple, everyday Sanskrit, spoken clearly and without fear.' },
  { deva: 'शुद्धिः', title: 'Correct pronunciation', text: 'Every letter is heard and corrected live, from the very first class.' },
  { deva: 'गीता', title: 'Gita and shlokas', text: 'Verses from the Bhagavad Gita and value shlokas, learnt by heart with their meaning.' },
  { deva: 'संस्कारः', title: 'Values for life', text: 'Discipline, respect and focus: the samskara a Gurukula gives, taught with warmth.' },
];

export const SP_HOW = [
  { title: 'Live with the Acharyas', text: 'Every class is live. Children speak, chant and get corrected in the moment.' },
  { title: 'Kannada and English', text: 'Explanations in Kannada and English, so every child understands, whatever their school medium.' },
  { title: 'A small batch', text: 'A small group, so every child is heard and corrected in every class.' },
  { title: 'Twice a week', text: 'Mondays and Fridays, 6 to 7 PM IST. Short, regular classes build a real habit.' },
];

export const SP_DAKSHINA = [
  { title: 'Monthly', amount: '₹1,799', was: '', note: 'per month · 8 live classes', best: false, detail: 'Smaller monthly amounts, for families who prefer that. Message the Acharya on WhatsApp to begin.' },
  { title: 'Per level', amount: '₹4,999', was: '₹5,399', note: '3 months · 24 live classes', best: false, early: 'Level 1 early bird ₹4,749 · first 10 seats', detail: 'Begin with Level 1 and continue level by level.' },
  { title: 'Full journey', amount: '₹29,134', was: '₹32,371', note: 'all 6 levels · 144 classes · 18 months', best: true, early: 'Early bird ₹27,515 · first 10 seats', detail: '15% off the list price while early-bird seats last (10% off after): one Guru Dakshina for the whole path.' },
];

// Side-by-side comparison. Every figure is arithmetic on the listed Guru Dakshina:
// monthly 18 × ₹1,799 = ₹32,382; per level 6 × ₹4,999 = ₹29,994; full ₹29,134 (early bird ₹27,515).
// Per class: 1,799 ÷ 8 = 225; 4,999 ÷ 24 = 208; 29,134 ÷ 144 = 202; 27,515 ÷ 144 = 191.
export const SP_COMPARE = {
  columns: ['Monthly', 'Per level', 'Full journey'],
  rows: [
    { label: 'Total for 18 months', values: ['₹32,382', '₹29,994', '₹27,515 early bird'], after: '₹29,134 after the early-bird seats' },
    { label: 'Cost per live class', values: ['₹225', '₹208', '₹191 early bird'], after: '₹202 after the early-bird seats' },
    { label: 'You save, against monthly', values: ['–', '₹2,388', '₹4,867 early bird'], after: '₹3,248 after the early-bird seats' },
    { label: 'Payments', values: ['18', '6', '1'] },
    { label: 'How you decide', values: ['Month by month', 'Level by level', 'Once, for all 6 levels'] },
  ],
  note: 'Per level is shown at ₹4,999 for each of the 6 levels; the early-bird Level 1 price is ₹4,749. Monthly is ₹1,799 per month, arranged on WhatsApp.',
  benefits: [
    'One Guru Dakshina, then nothing to remember each month.',
    'The lowest cost per live class: ₹191 at the early-bird price.',
    'Your child’s seat is held for all six levels, 18 months.',
    'You save ₹4,867 compared with paying monthly for 18 months.',
  ],
};

export const SP_COMMUNITY ={ amount: '₹27,515', note: 'WhatsApp Community members keep this price for the full journey, even after the early-bird seats are gone' };

export const SP_FAQ = [
  { question: 'Does my child need to know any Sanskrit already?', answer: 'No. Level 1 starts from the very first sounds and letters. Children who already know a few shlokas will simply move a little faster.' },
  { question: 'Which language are classes taught in?', answer: 'Sanskrit is taught with explanations in Kannada and English, so children from Kannada-medium and English-medium schools are equally comfortable.' },
  { question: 'How long is the programme?', answer: 'Six levels of 24 live classes each: 144 classes over about 18 months. Each level takes about three months, and you can decide level by level.' },
  { question: 'What happens in the free open class?', answer: 'Your child joins a real class with the Acharya: sounds, a few words and a short shloka. You see exactly how classes run before deciding anything.' },
  { question: 'What does a child need for class?', answer: 'A laptop or tablet with a stable internet connection, a notebook and a pencil. A quiet corner at home helps a lot.' },
  { question: 'What are “Founding Shishyas”?', answer: 'The first 15 children to join, the Dhruva cohort. Their per-level Guru Dakshina stays fixed for all six levels, with no increase later, and they receive a Founding Batch certificate at the end of Level 1.' },
  { question: 'Why is the first batch called the Dhruva cohort?', answer: 'Every batch is named after a young hero from our tradition and keeps that name for all 18 months. Dhruva was a boy who sat steady until he reached his goal and became the Pole Star, the star that never moves. We hope our first batch learns with the same steadiness.' },
];
