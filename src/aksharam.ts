// Aksharam IME: product facts in one place (page, download page, prerender).
export const AK = {
  name: 'Aksharam IME',
  price: 99,
  buyUrl: 'https://rzp.io/rzp/AksharamIME',
  version: '0.1.0',
  // Private download page and file (not linked from anywhere public; the Razorpay page redirects here).
  downloadPath: '/aksharam/download-e21259fdf0',
  fileUrl: '/aksharam-ime/dl-e21259fdf0/Aksharam-IME-0.1.0.pkg',
  requirements: 'macOS 12 Monterey or later · Apple Silicon and Intel Macs',
};

export const AK_EXAMPLES = [
  'saMskRutam',
  'OM namaH SivAya',
  'satyaM vada | dharmaM chara ||',
  'kRShNaH',
  'agnimILE purOhitam',
];

export const AK_FEATURES = [
  { title: 'Type it the way you say it', body: 'k then a gives क. saMskRutam gives संस्कृतम्. No layout to memorise: the keys follow the sounds you already know.' },
  { title: 'Halanta and conjuncts done right', body: 'त्त्व, ज्ञ, क्ष, ष्ण come out correctly on their own. A ^ or ~ gives you a visible halanta or a half form when you need one.' },
  { title: 'Vedic svaras', body: 'Mark anudātta and svarita as you type: a`a gives अ॒, dEvA`s gives देवा॑. Made for students of Veda chanting.' },
  { title: 'Every app on your Mac', body: 'Pages, Word, Notes, Mail, WhatsApp, browsers, Keynote. Caps Lock switches to English for a moment; Control + Space switches keyboards.' },
];

export const AK_STEPS = [
  'Pay the Guru Dakshina of ₹99. You come straight to the download page.',
  'Download Aksharam-IME.pkg and double-click it. The first time, macOS stops it: click Done.',
  'Open System Settings → Privacy & Security, click Open Anyway and type your Mac password.',
  'In the installer, click Continue, then Install.',
  'Aksharam IME opens by itself. Click Turn on Aksharam IME.',
  'Type in any app. Space finishes the word; Control + Space switches back to English.',
];

export const AK_FAQ = [
  { id: 'ak1', question: 'Why does my Mac warn me the first time?', answer: 'Aksharam IME is sold directly from this website, not through the App Store, so macOS asks you to confirm once in System Settings → Privacy & Security → Open Anyway. After that it opens like any other app. The install video on this page shows every click.' },
  { id: 'ak2', question: 'Does it need the internet?', answer: 'No. Aksharam IME works fully offline on your Mac and does not send anything you type anywhere.' },
  { id: 'ak3', question: 'Which Macs does it work on?', answer: 'macOS 12 Monterey or later, on both Apple Silicon (M1 and newer) and Intel Macs.' },
  { id: 'ak4', question: 'Is there a version for Windows, iPhone or iPad?', answer: 'Not yet. The Mac keyboard comes first. Windows and other Indian scripts such as Kannada are planned.' },
  { id: 'ak5', question: 'What if it does not work on my Mac?', answer: 'Message us on WhatsApp from this website with a screenshot. The Acharya’s team will help you set it up.' },
  { id: 'ak6', question: 'Can I use it on more than one Mac?', answer: 'Yes, you can install it on your own Macs. Please do not share the file publicly; the small Guru Dakshina keeps the work going.' },
];
