// Aksharam IME: product facts in one place (page, download page, prerender).
export const AK = {
  name: 'Aksharam IME',
  price: 99,
  buyUrl: 'https://rzp.io/rzp/AksharamIME',
  version: '1.0.2',
  // Private download page and file (not linked from anywhere public; the Razorpay page redirects here).
  downloadPath: '/aksharam/download-e21259fdf0',
  fileUrl: '/aksharam-ime/dl-e21259fdf0/Aksharam-IME-1.0.2.pkg',
  requirements: 'macOS 12 Monterey or later · Apple Silicon and Intel Macs',
  video: '/aksharam-ime/aksharam-install-v102.mp4',
  poster: '/aksharam-ime/aksharam-install-v102.jpg',
};

export const AK_EXAMPLES = [
  'saMskRitam',
  'OM namaH shivAya',
  'satyaM vada | dharmaM cara ||',
  'kRiShNaH',
  'a`agnimI`sLe purohitam',
  "so'ham",
];

export const AK_FEATURES = [
  { title: 'Type it the way you say it', body: 'k then a gives क. saMskRitam gives संस्कृतम्. No layout to memorise: the keys follow the sounds you already know, and capital letters give the long and retroflex sounds (A आ, T ट, Sh ष).' },
  { title: 'Halanta and conjuncts done right', body: 'A consonant keeps its halanta until a vowel completes it: rAm gives राम्, rAma gives राम. kSha gives क्ष, tattvam gives तत्त्वम्, zAnam gives ज्ञानम्. The _ key keeps two letters apart when you need it.' },
  { title: 'Vedic svaras', body: 'Mark anudātta, svarita and dīrgha svarita as you type: a`a gives अ॒, devA`s gives देवा॑, ka`d gives क᳚. Made for students of Veda chanting.' },
  { title: 'Every app on your Mac', body: 'Pages, Word, Notes, Mail, WhatsApp, Google Docs, browsers, Keynote. Caps Lock switches to English for a moment; Control + Space switches keyboards.' },
];

export const AK_STEPS = [
  'Pay the Guru Dakshina of ₹99. You come straight to the download page.',
  'Download Aksharam-IME.pkg and double-click it. The first time, macOS stops it: click Done.',
  'Open System Settings → Privacy & Security, click Open Anyway and type your Mac password.',
  'In the installer, click Continue, Agree, then Install. Updates and older Aksharam or SansIME keyboards are handled automatically.',
  'Aksharam is switched on for you. Choose Aksharam (अ) from the input menu at the top right of your screen.',
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
