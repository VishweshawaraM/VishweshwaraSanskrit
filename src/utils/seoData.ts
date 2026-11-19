import { COURSES } from '../courses';

export const PAGE_META: Record<string, { title: string; description: string; image?: string }> = {
  '/': {
    title: 'Learn Sanskrit Online · Live 1:1 Classes | Vishweshwara Sanskrit',
    description: 'Live one-to-one online Sanskrit classes for kids and adults: Sanskrit grammar, Bhagavad Gita, Vedic chanting and Advaita Vedanta with a Gurukula-trained Acharya.',
  },
  '/about': {
    title: 'Sanskrit Acharya Vishweshwara N M | Gurukula-Trained',
    description: 'Acharya Vishweshwara N M — 7 years residential Gurukula training in Krishna Yajur Veda, Advaita Vedanta, and Sanskrit. Traditional lineage, modern teaching.',
  },
  '/teachings': {
    title: 'Online Sanskrit, Bhagavad Gita & Vedic Chanting Courses',
    description: 'Sanskrit for beginners, Laghu Siddhanta Kaumudi grammar, Bhagavad Gita classes, Vedic chanting (Sri Suktam, Rudram) and Advaita Vedanta. Live one-to-one online.',
  },
  '/dakshina': {
    title: 'Guru Dakshina | Vishweshwara Sanskrit',
    description: 'The ancient tradition of Guru Dakshina — a self-determined offering in gratitude for authentic knowledge. Learn how this sacred practice works at Vishweshwara Sanskrit.',
  },
  '/testimonials': {
    title: 'Student Testimonials | Vishweshwara Sanskrit',
    description: 'Read what students from India, USA, Australia, UAE, UK and more say about learning Sanskrit and Vedanta with Acharya Vishweshwara N M.',
  },
  '/begin': {
    title: 'Book a Free Sanskrit Class Consultation | Vishweshwara Sanskrit',
    description: 'Request a free consultation for online Sanskrit, Bhagavad Gita or Vedic chanting classes. Students join live from India, the USA, UK, Australia and the UAE.',
  },
  '/landing': {
    title: 'Vishweshwara Sanskrit | Digital Gurukula',
    description: 'A living tradition brought into the digital age. Authentic Sanskrit, Vedas, and Vedanta for the modern seeker.',
  },
  '/samskara-pravesha': {
    title: 'Kids’ Sanskrit in Kannada & English | Vishweshwara Sanskrit',
    description: 'Samskrita Samskara Pravesha: 18-month live Sanskrit for children 8–14, with Gita and value shlokas, in Kannada and English. Free open classes in November.',
  },
  '/one-on-one': {
    title: 'One-to-One Sanskrit Course, 18 Months | Vishweshwara Sanskrit',
    description: 'Learn Sanskrit properly, one to one and live online: six stages from the first sound to the Laghu Siddhanta Kaumudi, with Gurukula-trained Acharya Vishweshwara N M.',
  },
  '/free-class': {
    title: 'Free Sanskrit Class for Children | Vishweshwara Sanskrit',
    description: 'Register for a free live online Sanskrit class for children aged 8 to 14, in Kannada and English, with Acharya Vishweshwara N M.',
  },
  '/aksharam': {
    title: 'Aksharam IME: Sanskrit & Kannada Keyboard for Mac | Vishweshwara Sanskrit',
    description: 'Type Sanskrit and Kannada on your Mac the way you say it: saMskRitam → संस्कृतम्, kannaDa → ಕನ್ನಡ. Baraha-style keys, Vedic svaras. Free 7-day trial, then ₹99 once.',
    image: '/aksharam-ime/aksharam-icon.png',
  },
  '/aksharam/download-e21259fdf0': {
    title: 'Download Aksharam IME | Vishweshwara Sanskrit',
    description: 'Your Aksharam IME download.',
  },
  '/aksharam/terms': {
    title: 'Aksharam IME: Terms, Licence & Refunds | Vishweshwara Sanskrit',
    description: 'What you get for ₹99, the personal licence for up to 2 Macs, the 7-day free trial and the 7-day refund if Aksharam does not work on your Mac.',
  },
  '/privacy': {
    title: 'Privacy Notice | Vishweshwara Sanskrit',
    description: 'This website collects no personal details. How WhatsApp enquiries, payments and children’s information are handled, and how to ask for deletion.',
  },
  ...Object.fromEntries(COURSES.map(c => [`/courses/${c.slug}`, c.meta])),
  '/admin': {
    title: 'Admin | Vishweshwara Sanskrit',
    description: 'Administration panel.',
  },
};
