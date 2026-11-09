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
  razorpay: 'https://rzp.io/rzp/SamskritaFoundationProgram',
};

export const SP_FREE_CLASSES = [
  { id: 'mon-16-nov', label: 'Mon 16 Nov', long: 'Monday 16 November, 6 PM IST' },
  { id: 'fri-20-nov', label: 'Fri 20 Nov', long: 'Friday 20 November, 6 PM IST' },
  { id: 'mon-23-nov', label: 'Mon 23 Nov', long: 'Monday 23 November, 6 PM IST' },
  { id: 'fri-27-nov', label: 'Fri 27 Nov', long: 'Friday 27 November, 6 PM IST' },
];

export const SP_GAINS = [
  { deva: 'वदति', title: 'Speaks with confidence', text: 'Simple, everyday Sanskrit, spoken clearly and without fear.' },
  { deva: 'शुद्धिः', title: 'Correct pronunciation', text: 'Every letter is heard and corrected live, from the very first class.' },
  { deva: 'गीता', title: 'Gita and shlokas', text: 'Verses from the Bhagavad Gita and value shlokas, learnt by heart with their meaning.' },
  { deva: 'संस्कारः', title: 'Values for life', text: 'Discipline, respect and focus: the samskara a Gurukula gives, taught with warmth.' },
];

export const SP_HOW = [
  { title: 'Live with the Acharya', text: 'Every class is live. Children speak, chant and get corrected in the moment.' },
  { title: 'Kannada and English', text: 'Explanations in Kannada and English, so every child understands, whatever their school medium.' },
  { title: 'A small batch', text: 'A small group, so every child is heard and corrected in every class.' },
  { title: 'Twice a week', text: 'Mondays and Fridays, 6 to 7 PM IST. Short, regular classes build a real habit.' },
];

export const SP_DAKSHINA = [
  { title: 'Monthly', amount: '₹1,799', was: '', note: 'per month · 8 live classes', best: false, detail: 'Smaller monthly amounts, for families who prefer that.' },
  { title: 'Per level', amount: '₹4,999', was: '₹5,399', note: '3 months · 24 live classes', best: false, detail: 'Begin with Level 1 and continue level by level.' },
  { title: 'Full journey', amount: '₹29,134', was: '₹32,371', note: 'all 6 levels · 144 classes · 18 months', best: true, detail: '10% less than paying class by class: one Guru Dakshina for the whole path.' },
];

export const SP_COMMUNITY = { amount: '₹27,515', note: 'Full journey for WhatsApp Community members (15% less)' };

export const SP_FAQ = [
  { question: 'Does my child need to know any Sanskrit already?', answer: 'No. Level 1 starts from the very first sounds and letters. Children who already know a few shlokas will simply move a little faster.' },
  { question: 'Which language are classes taught in?', answer: 'Sanskrit is taught with explanations in Kannada and English, so children from Kannada-medium and English-medium schools are equally comfortable.' },
  { question: 'How long is the programme?', answer: 'Six levels of 24 live classes each: 144 classes over about 18 months. Each level takes about three months, and you can decide level by level.' },
  { question: 'What happens in the free open class?', answer: 'Your child joins a real class with the Acharya: sounds, a few words and a short shloka. You see exactly how classes run before deciding anything.' },
  { question: 'What does a child need for class?', answer: 'A laptop or tablet with a stable internet connection, a notebook and a pencil. A quiet corner at home helps a lot.' },
  { question: 'What are “Founding Shishyas”?', answer: 'The first 15 children to join, the Dhruva cohort. Their Guru Dakshina of ₹4,999 per level stays the same for all six levels, and they receive a Founding Batch certificate at the end of Level 1.' },
  { question: 'Why is the first batch called the Dhruva cohort?', answer: 'Every batch is named after a young hero from our tradition and keeps that name for all 18 months. Dhruva was a boy who sat steady until he reached his goal and became the Pole Star, the star that never moves. We hope our first batch learns with the same steadiness.' },
];
