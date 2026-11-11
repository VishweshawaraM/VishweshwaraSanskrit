// Privacy Notice content (India: Digital Personal Data Protection Act, 2023 and Rules, 2025).
// Shared by the /privacy page and its static shell. Update the date and version when the meaning changes.

import { TRACKING_ENABLED } from './config/tracking';

export const PRIVACY_VERSION = '2026-11-10';
export const PRIVACY_UPDATED = '10 November 2026';
export const PRIVACY_EMAIL = 'namaste@vishweshwarasanskrit.com';

export interface PrivacySection { id: string; title: string; paragraphs?: string[]; points?: string[] }

export const PRIVACY_INTRO =
  'This website does not collect your personal details. There are no sign-up or enquiry forms. If you want to talk to us, you message the Acharya on WhatsApp. This notice explains what that means for your information.';

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: 'who',
    title: 'Who is responsible',
    paragraphs: [
      'Vishweshwara Sanskrit is run by Acharya Vishweshwara N M from Bengaluru, India. He is the person responsible for any personal information you share with us, and the person you contact about it.',
    ],
  },
  {
    id: 'website',
    title: 'This website',
    points: [
      'It has no forms that collect your name, phone number or email.',
      ...(TRACKING_ENABLED
        ? ['It uses Meta’s measurement tool (the Meta Pixel) only if you tap “Accept” on the message at the bottom of the page. If you tap “No thanks”, or your browser sends a “do not track” signal, it never loads.']
        : ['It does not use advertising trackers or analytics.']),
      'It remembers only small things in your own browser, such as which page you were on. Nothing is sent to us.',
      'It is hosted on GitHub Pages, which may keep ordinary server logs (such as your IP address) for security.',
    ],
  },
  {
    id: 'whatsapp',
    title: 'When you message us on WhatsApp',
    paragraphs: [
      'When you tap a WhatsApp button, WhatsApp opens on your phone with a ready message. Nothing is sent until you press send. After that, the Acharya can see your WhatsApp number, your profile name and what you write.',
      'We use this only to reply to you, arrange a free class, send class links and schedules, and teach you or your child. We do not sell it, share it for advertising or add you to any group without asking.',
      'If more than one Acharya teaches your child’s course, the teachers involved can see your child’s first name and class details. They use them only for teaching.',
      'WhatsApp is a service of Meta and has its own privacy policy.',
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    paragraphs: [
      'If you offer Guru Dakshina or pay for a course, payment is made on Razorpay’s secure page, not on this website. Razorpay collects your payment details. We do not see or store your card, UPI or bank details.',
      'On that page you also enter your child’s first name and age, and the parent’s email and WhatsApp number. Razorpay passes these to us so we can enrol your child, send the class link and reach you about classes. We see that a payment was made, and the amount.',
    ],
  },
  ...(TRACKING_ENABLED
    ? [{
        id: 'ads',
        title: 'Measuring our ads (only if you accept)',
        paragraphs: [
          'We advertise on Facebook and Instagram. If you tap “Accept”, Meta’s measurement tool tells Meta which pages of this website you open and when you tap a WhatsApp or payment button, so we can see which ads bring parents here. Meta also receives technical details such as your IP address and browser, as described in Meta’s own privacy policy.',
          'We never send your name, phone number, email or anything about your child. The tool does not run on Razorpay’s payment page and is not used to profile children.',
          'It stays off unless you accept. You can change your mind at any time by clearing this website’s data in your browser, and the message will appear again.',
        ],
      } as PrivacySection]
    : []),
  {
    id: 'children',
    title: 'Children',
    paragraphs: [
      'Our children’s programme is for ages 8 to 14. We deal with the parent or guardian, not the child directly. To run a class we need only the child’s first name and age, which the parent or guardian tells us. We do not track children, build profiles of them or show them advertising. If you would like us to remove your child’s details at any time, write to us and we will.',
    ],
  },
  {
    id: 'old',
    title: 'Earlier enquiries',
    paragraphs: [
      'Before this notice, the website had enquiry forms. Those enquiries are kept in a private database that only the Acharya can open. We delete them within 12 months, or sooner if you ask.',
    ],
  },
  {
    id: 'how-long',
    title: 'How long we keep your information',
    points: [
      'If you never enrol: your chat details are deleted within 12 months of the last message.',
      'If you or your child learn with us: while you are learning, and within 12 months after you leave, unless the law requires us to keep it longer.',
      'Any time you ask us to delete it, we will.',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    points: [
      'Ask what information we hold about you.',
      'Ask us to correct it.',
      'Ask us to delete it.',
      'Say that you no longer want us to contact you. This is as easy as saying yes.',
      'Nominate someone to act for you.',
      'Complain to us, and if you are not satisfied, to the Data Protection Board of India.',
    ],
  },
  {
    id: 'contact',
    title: 'Questions, correction and deletion',
    paragraphs: [
      `Write to Acharya Vishweshwara N M at ${PRIVACY_EMAIL} or message +91 94826 98612 on WhatsApp. Tell us what you would like us to do. We will confirm and act on your request within 30 days.`,
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this notice',
    paragraphs: [
      `This is version ${PRIVACY_VERSION}, last updated ${PRIVACY_UPDATED}. If we change how we handle your information in a way that matters, we will update this page first.`,
    ],
  },
];
