// One page per subject at /courses/<slug>.
// Content is written in the Acharya's own voice. No prices on these pages:
// every "ways to learn" option ends in a conversation with the Acharya.

export const ACHARYA_NAME = 'Acharya Vishweshwara N M';
export const WHATSAPP_NUMBER = '919482698612';
export const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/K3vetutKPWf2uMfv04K9dZ';

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export interface CourseStep { title: string; text: string; }

export interface CourseAudience { label: string; title: string; text: string; points: string[]; }

export interface CourseStage { label: string; title: string; text: string; items: string[]; duration?: string; }

export interface CourseFormat {
  kind: 'one-to-one' | 'group';
  title: string;
  text: string;
  points: string[];
  message: string; // pre-filled WhatsApp message
}

export interface CourseVerse { devanagari: string[]; iast: string; meaning: string; source: string; }

export interface Course {
  slug: string;
  subjectId: string; // id used in SUBJECTS_ITEMS and the header menu
  title: string;
  devanagari: string;
  tagline: string;
  intro: string[];
  methodTitle: string;
  verse?: CourseVerse;
  method: CourseStep[];
  audiences?: CourseAudience[];
  pathTitle: string;
  pathIntro?: string;
  path: CourseStage[];
  formatsNote?: string;
  formats: CourseFormat[];
  meta: { title: string; description: string };
}

const oneToOne = (course: string, extra: string[] = []): CourseFormat => ({
  kind: 'one-to-one',
  title: 'One-to-one',
  text: 'Just you and me, live online. We go at your pace, at a time that suits your time zone, and every class is shaped around where you are.',
  points: ['Timings fixed together, across time zones', 'Every mistake corrected on the spot', ...extra],
  message: `Hari Om Acharya ji, I would like to learn ${course} one-to-one. Could we talk?`,
});

export const COURSES: Course[] = [
  {
    slug: 'sanskrit',
    subjectId: 'samskrita',
    title: 'Sanskrit',
    devanagari: 'संस्कृतम्',
    tagline: 'From the very first letter to reading Sanskrit texts on your own.',
    intro: [
      'Sanskrit opens up one sound at a time. I begin every student by listening to how they say the letters, and we build from there, slowly and properly.',
      'Grammar is the backbone of how I teach. Without it you can memorise words, but you can’t really read. Our tradition says it plainly: without vyakarana, there is no real knowledge of Sanskrit.',
    ],
    methodTitle: 'How I teach Sanskrit',
    method: [
      { title: 'Sound comes first', text: 'Every vowel and consonant is corrected live: short, long and extended sounds, aspirated and unaspirated letters, anusvara and visarga. Clean pronunciation now saves years later.' },
      { title: 'Devanagari by hand', text: 'You write every day. Writing the letters by hand fixes them in memory far better than typing ever does.' },
      { title: 'Grammar, one layer at a time', text: 'Sentences first, then noun forms (shabda rupa), then verb forms (dhatu rupa), then sandhi, samasa and karaka. Each layer rests on the one before it.' },
      { title: 'Reading real Sanskrit', text: 'Words become sentences, sentences become stories, and slowly you’re reading shlokas and subhashitas without needing a translation.' },
    ],
    audiences: [
      {
        label: 'For children',
        title: 'Samskrita Foundation Program',
        text: 'An 18-month course for children aged 8 to 14. Shlokas, stories and everyday words, with the same careful grammar underneath, at a pace a child enjoys.',
        points: ['Live classes in a small batch', 'Pronunciation and Devanagari writing from day one', 'Steady progress parents can see'],
      },
      {
        label: 'For adults',
        title: 'Start from zero, or where you are',
        text: 'Many adults come because they want to read the Gita or the Upanishads in the original. You can start from scratch, or I’ll check your level and we’ll begin at the right step.',
        points: ['Beginner, intermediate or advanced', 'Laghu Siddhanta Kaumudi for serious students', 'Classes that fit around work'],
      },
    ],
    pathTitle: 'Three levels, six stages',
    pathIntro: 'The full path usually takes 18 to 24 months. Everyone moves forward when they’re ready, not when the calendar says so.',
    path: [
      {
        label: 'Level 1 · Beginner, from scratch',
        title: 'Sounds, script and simple sentences',
        duration: 'About 5 to 7 months',
        text: 'Stage I (Samskrita Pravesha) and Stage II (Vakya Nirmana). You learn to say every letter correctly, write Devanagari, and start speaking simple Sanskrit.',
        items: ['Vowels, consonants and their correct sounds', 'Devanagari writing practice', 'Words for the body, food, objects and numbers', 'Introducing yourself in Sanskrit', 'Pronouns, gender and number', 'Question words and simple sentences'],
      },
      {
        label: 'Level 2 · Intermediate',
        title: 'How words change',
        duration: 'About 6 to 8 months',
        text: 'Stage III (Shabda Rupa) and Stage IV (Dhatu Rupa). You see how nouns and verbs change their form, and why.',
        items: ['Noun forms: Rama, Rama (feminine), Phala, Hari, Guru, Pitr', 'Pronouns: asmad, yushmad, tad, kim', 'The seven vibhaktis (cases)', 'Common dhatus and their forms', 'Present, past, future and command (lat, lan, lrt, lot)'],
      },
      {
        label: 'Level 3 · Advanced',
        title: 'Traditional grammar',
        duration: 'About 7 to 9 months',
        text: 'Stage V (Vyakarana Pravesha) and Stage VI (Shastra Samskritam). Formal grammar, and then the Laghu Siddhanta Kaumudi, so you can open a text and read it yourself.',
        items: ['Sandhi: vowel, consonant and visarga', 'Samasa: tatpurusha, karmadharaya, dvandva, bahuvrihi', 'Karaka: how a sentence really works', 'Laghu Siddhanta Kaumudi, selected prakaranas', 'Reading shlokas, subhashitas and small granthas'],
      },
    ],
    formats: [
      oneToOne('Sanskrit', ['For children and adults, any level']),
      {
        kind: 'group',
        title: 'Group: children’s batch',
        text: 'The Samskrita Foundation Program is taught in a live batch. Children learn together, recite together, and keep each other going.',
        points: ['18-month course for ages 8 to 14', 'Live online classes in a batch', 'Ask me about the next batch'],
        message: 'Hari Om Acharya ji, I would like to know about the Samskrita Foundation Program (group batch) for my child.',
      },
    ],
    meta: {
      title: 'Learn Sanskrit Online from Scratch | Vishweshwara Sanskrit',
      description: 'Live online Sanskrit classes with Acharya Vishweshwara N M: pronunciation, Devanagari, grammar, Laghu Siddhanta Kaumudi. 18-month kids course; 1:1 for adults.',
    },
  },
  {
    slug: 'bhagavad-gita',
    subjectId: 'gita',
    title: 'Bhagavad Gita',
    devanagari: 'गीता',
    tagline: 'Word by word, the way the Gita is studied in a Gurukula.',
    intro: [
      'I teach the Gita one word at a time. We chant a verse, split it into its words, put the words back in prose order, learn what each one means, and only then talk about what Krishna is saying.',
      'That way you aren’t leaning on someone else’s translation. You see the meaning for yourself, in Krishna’s own words.',
    ],
    methodTitle: 'How I teach the Gita',
    method: [
      { title: 'Chant it correctly', text: 'Each verse is first learnt with clean pronunciation and steady rhythm, so it stays with you for life.' },
      { title: 'Padaccheda and anvaya', text: 'We separate the joined words of the verse and rearrange them in prose order, so the sentence becomes clear.' },
      { title: 'Shabdartha: every word’s meaning', text: 'You learn what each word means and why it takes that form. Key words like dharma, karma, yoga, atma and buddhi become familiar friends.' },
      { title: 'Tatparya: what it means for you', text: 'Then we look at the teaching itself, and how it applies to an ordinary day: a hard decision, a worried mind, a duty you’d rather avoid.' },
    ],
    audiences: [
      {
        label: 'For children',
        title: 'Through stories',
        text: 'For children, the Gita comes alive through stories. Krishna and Arjuna, the Pandavas, the battlefield at Kurukshetra: the verses are chanted clearly and learnt by heart, and the meaning is told as a story a child remembers.',
        points: ['Stories from the Mahabharata', 'Clear chanting, learnt by heart', 'Simple meaning of each verse', 'Good values without lectures'],
      },
      {
        label: 'For adults',
        title: 'Through real situations',
        text: 'For adults, we look at what Krishna actually did for Arjuna. A capable man, confused and frozen at the most important moment of his life, and how Krishna helped him see clearly. Then we bring that to your own situations: a hard decision at work, a duty at home, a mind that won’t settle.',
        points: ['Word-by-word meaning of every verse', 'Krishna’s teaching applied to real life', 'Shankara Bhashya for serious students', 'Time for your own questions'],
      },
    ],
    pathTitle: 'Five stages of Gita study',
    path: [
      { label: 'Stage I', title: 'Shloka Pravesha', text: 'Correct pronunciation, rhythm and the habit of daily recitation.', items: ['Dhyana shlokas', 'Guru stotram', 'Introductory Gita verses and daily prayers'] },
      { label: 'Stage II', title: 'Memorising and reciting', text: 'Whole chapters learnt with accuracy, building stamina for longer recitation.', items: ['Chapter 12, Bhakti Yoga', 'Chapter 15, Purushottama Yoga', 'Selected verses of Chapters 2 and 16'] },
      { label: 'Stage III', title: 'Word by word', text: 'Padaccheda, anvaya and shabdartha. Memorising alone is no longer enough; now you understand.', items: ['Splitting and ordering the words', 'Meaning of each word', 'Sanskrit structure inside the verse'] },
      { label: 'Stage IV', title: 'Tatparya vichara', text: 'The teachings themselves, verse by verse.', items: ['Dharma and right action', 'Karma, bhakti and jnana yoga', 'A steady, clear mind'] },
      { label: 'Stage V', title: 'Living the Gita', text: 'How the teaching shows up in daily life.', items: ['Handling fear and strong emotions', 'Discipline and focus', 'Doing your duty well'] },
    ],
    formats: [
      oneToOne('the Bhagavad Gita', ['For children or adults']),
      {
        kind: 'group',
        title: 'Group',
        text: 'A small group studying the Gita together. Children and adults learn in separate groups, because each is taught differently.',
        points: ['Small groups only', 'Children and adults taught separately', 'Ask me about the next group'],
        message: 'Hari Om Acharya ji, I would like to join a Bhagavad Gita group class. Could you tell me more?',
      },
    ],
    meta: {
      title: 'Bhagavad Gita Word by Word Online | Vishweshwara Sanskrit',
      description: 'Learn the Bhagavad Gita word by word with Acharya Vishweshwara N M: chanting, anvaya, meaning, Shankara Bhashya. Stories for kids, real life for adults.',
    },
  },
  {
    slug: 'krishna-yajurveda',
    subjectId: 'veda',
    title: 'Krishna Yajurveda',
    devanagari: 'वेदः',
    tagline: 'Vedic chanting the traditional way, with every svara and every akshara in its place.',
    intro: [
      'The Vedas were kept alive for thousands of years by mouth and ear, from teacher to student. That’s how I learnt Krishna Yajurveda in seven years of Gurukula study, and that’s how I teach it.',
      'You hear a line, you repeat it, I correct it, and we repeat it again until it’s right. Nothing is skipped and nothing is rushed.',
    ],
    methodTitle: 'How I teach the Veda',
    verse: {
      devanagari: ['शीक्षां व्याख्यास्यामः ।', 'वर्णः स्वरः ।', 'मात्रा बलम् ।', 'साम सन्तानः ।'],
      iast: 'śīkṣāṃ vyākhyāsyāmaḥ | varṇaḥ svaraḥ | mātrā balam | sāma santānaḥ |',
      meaning: 'We shall explain Shiksha: the letter, the svara, the length, the effort, the evenness, and the joining of sounds.',
      source: 'Taittiriya Upanishad, Shikshavalli 1.2',
    },
    method: [
      { title: 'Varna and svara', text: 'Every letter pronounced exactly, and every syllable given its svara: udatta, anudatta and svarita. In the Veda the pitch is part of the mantra, so it’s corrected every time.' },
      { title: 'Matra and bala', text: 'The right length of each sound (hrasva, dirgha, pluta), and the right effort with which it is spoken.' },
      { title: 'Sama and santana', text: 'An even, steady flow, and the correct joining of sounds where words meet, as Shiksha and Vyakarana teach.' },
      { title: 'Repetition, the old way', text: 'The teacher says it, the student repeats it, and we go again until it sits right. This is how the Veda has been passed on for thousands of years.' },
    ],
    pathTitle: 'Five stages of Vedic study',
    path: [
      { label: 'Stage I', title: 'Mantra Pravesha', text: 'The discipline of Vedic chanting begins here.', items: ['Dasha Shanti Mantras', 'Ganesha Atharvashirsham', 'Ganapati Suktam'] },
      { label: 'Stage II', title: 'Sukta Adhyayana', text: 'The great Vedic hymns, learnt by repetition and correction.', items: ['Sri Suktam', 'Medha Suktam', 'Durga Suktam', 'Purusha Suktam', 'Vishnu, Saraswati and Devi Suktam', 'Soura, Pratah, Go and Brahma Suktam'] },
      { label: 'Stage III', title: 'Mantras for daily and ritual use', text: 'Mantras used in daily worship and in rituals.', items: ['Mantra Pushpam', 'Navagraha Suktam', 'Udaka Shanti', 'Shraddha Suktam', 'Vedic Rashtraganam'] },
      { label: 'Stage IV', title: 'Core Krishna Yajurveda', text: 'Serious traditional study, where precision matters most.', items: ['Sri Rudram (Namakam)', 'Chamakam', 'Dvitiya Prashna', 'Aruna Prashna'] },
      { label: 'Stage V', title: 'Upanishad', text: 'The Upanishads of the Krishna Yajurveda.', items: ['Maha Narayana Upanishad', 'Shikshavalli', 'Brahmanandavalli', 'Bhriguvalli'] },
    ],
    formatsNote: 'Vedic chanting needs close listening, so groups are kept very small.',
    formats: [
      {
        kind: 'group',
        title: 'Small group: 4 or 5 students',
        text: 'Never more than four or five students, so I can hear every voice and correct every svara.',
        points: ['4 to 5 students only', 'Everyone chants, everyone is corrected', 'Ask me about the next group'],
        message: 'Hari Om Acharya ji, I would like to join a Krishna Yajurveda chanting group. Could you tell me more?',
      },
      oneToOne('Krishna Yajurveda chanting', ['Best if you want to go faster or deeper']),
    ],
    meta: {
      title: 'Krishna Yajurveda Chanting Online | Vishweshwara Sanskrit',
      description: 'Traditional Krishna Yajurveda chanting with Acharya Vishweshwara N M: svara, Shiksha, Suktams, Sri Rudram, Upanishads. Groups of 4–5 or one-to-one.',
    },
  },
  {
    slug: 'advaita-vedanta',
    subjectId: 'vedanta',
    title: 'Advaita Vedanta',
    devanagari: 'वेदान्तः',
    tagline: 'Vedanta from the Sanskrit texts, in the tradition of Shankaracharya. One-to-one only.',
    intro: [
      'Vedanta needs questions, and questions need time. That’s why I teach it only one-to-one.',
      'We read from the original texts in the tradition of Adi Shankaracharya. You can stop me anywhere and ask why, and we stay there until it’s clear.',
    ],
    methodTitle: 'How I teach Vedanta',
    method: [
      { title: 'From the source', text: 'We read the Sanskrit text itself, with its traditional explanation, not someone’s summary of it.' },
      { title: 'Foundations before conclusions', text: 'What Vedanta is for, how we know anything (pramana), and the qualities a seeker needs (sadhana chatushtaya), before the big statements.' },
      { title: 'Your questions shape the class', text: 'Doubts are welcome. Working through them is how the teaching becomes yours.' },
      { title: 'Sanskrit alongside', text: 'Basic grammar and Tarka Sangraha are studied in parallel, so the texts open up more and more on their own.' },
    ],
    pathTitle: 'The path of study',
    pathIntro: 'This is a guide, not a fixed timetable. We go as deep as you want to go.',
    path: [
      { label: 'Foundations', title: 'The questions Vedanta answers', text: 'The ground everything else stands on.', items: ['What Vedanta is, and the purpose of life', 'Pramana: how we know', 'Anubandha chatushtaya and sadhana chatushtaya', 'Karma and rebirth', 'Jiva, Ishvara and jagat', 'Atma and anatma'] },
      { label: 'Prakarana granthas', title: 'The introductory texts', text: 'Short texts that lay out the whole teaching clearly.', items: ['Tattva Bodha', 'Atma Bodha', 'Vedantasara', 'Vedanta Paribhasha'] },
      { label: 'Alongside', title: 'Tools for reading', text: 'Studied side by side with the texts.', items: ['Tarka Sangraha (basics of Nyaya)', 'Sanskrit grammar needed for Vedanta'] },
      { label: 'Deeper study', title: 'The prasthana traya with Bhashya', text: 'For those who want to go all the way.', items: ['Bhagavad Gita with Shankara Bhashya', 'Upanishads with Bhashya', 'Brahma Sutra Bhashya'] },
    ],
    formatsNote: 'Advaita Vedanta is taught one-to-one only.',
    formats: [oneToOne('Advaita Vedanta', ['Texts read in Sanskrit, with explanation'])],
    meta: {
      title: 'Advaita Vedanta Classes One-to-One | Vishweshwara Sanskrit',
      description: 'Study Advaita Vedanta one-to-one with Acharya Vishweshwara N M: Tattva Bodha, Vedantasara, Upanishads and Shankara Bhashya, read from the Sanskrit texts.',
    },
  },
  {
    slug: 'stotras',
    subjectId: 'stotra',
    title: 'Stotras',
    devanagari: 'स्तोत्रम्',
    tagline: 'Vishnu Sahasranama, Lalita Sahasranama and the great stotras, chanted correctly and understood.',
    intro: [
      'A stotra is meant to be chanted every day, so it’s worth learning it right, once and for all.',
      'I teach line by line, with clean pronunciation and the right rhythm of the metre, and I explain the meaning so the words never become just sounds.',
    ],
    methodTitle: 'How I teach stotras',
    method: [
      { title: 'Line by line', text: 'You hear the line, you repeat it, I correct it. We build the stotra a few lines at a time.' },
      { title: 'Metre and rhythm', text: 'Every stotra has its chandas. Chanting in the right metre makes it flow, and makes it easier to remember.' },
      { title: 'The meaning', text: 'Long compound names are opened up word by word, so you know whom you are praising and how.' },
      { title: 'Making it daily', text: 'We help you settle the stotra into your daily routine, so it stays with you.' },
    ],
    pathTitle: 'Stotras you can learn',
    pathIntro: 'These are some of the stotras I teach. If there’s one close to your heart that isn’t listed, just ask.',
    path: [
      { label: 'Sahasranama', title: 'The thousand names', text: 'Long stotras, learnt patiently in parts.', items: ['Vishnu Sahasranama', 'Lalita Sahasranama'] },
      { label: 'Adi Shankaracharya', title: 'Stotras of Shankara', text: 'Beautiful, simple and full of meaning.', items: ['Bhaja Govindam', 'And other stotras of Adi Shankaracharya'] },
      { label: 'Devi', title: 'Devi stotras', text: 'Hymns to the Mother.', items: ['Devi Mahatmyam selections', 'Other Devi stotras'] },
      { label: 'Daily', title: 'Stotras for every day', text: 'Short prayers for morning and evening, for children and adults alike.', items: ['Daily prayers and shlokas', 'Stotras chosen with you'] },
    ],
    formats: [
      oneToOne('stotras', ['Choose the stotra you want to learn']),
      {
        kind: 'group',
        title: 'Group',
        text: 'Chant together with a small group. It’s a lovely way to learn a long stotra like the Sahasranama.',
        points: ['Small groups', 'Children and adults', 'Ask me about the next group'],
        message: 'Hari Om Acharya ji, I would like to learn stotras in a group. Could you tell me more?',
      },
    ],
    meta: {
      title: 'Learn Vishnu & Lalita Sahasranama | Vishweshwara Sanskrit',
      description: 'Learn Vishnu Sahasranama, Lalita Sahasranama and other stotras with Acharya Vishweshwara N M: clean pronunciation, metre and meaning. 1:1 or group.',
    },
  },
];

export const COURSE_BY_SLUG: Record<string, Course> = Object.fromEntries(COURSES.map(c => [c.slug, c]));

export const courseSlugForSubject = (subjectId: string) =>
  COURSES.find(c => c.subjectId === subjectId)?.slug;
