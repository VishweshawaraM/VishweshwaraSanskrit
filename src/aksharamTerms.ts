// Aksharam IME: Terms of Sale, Licence and Refund Policy (plain English).
// Shared by the /aksharam/terms page and its static shell. Update the date and version when the meaning changes.
import { AK } from './aksharam';
import { PRIVACY_EMAIL } from './privacy';

export const TERMS_VERSION = '2026-11-17';
export const TERMS_UPDATED = '17 November 2026';
export const TERMS_WHATSAPP = '+91 94826 98612';

export interface TermsSection { id: string; title: string; paragraphs?: string[]; points?: string[] }

export const TERMS_INTRO =
  `These terms explain what you get when you buy ${AK.name}, how you may use it, and how refunds work. They are written in plain English. By paying for or installing ${AK.name}, you agree to them.`;

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: 'seller',
    title: 'Who sells it',
    paragraphs: [
      `${AK.name} is made and sold by Vishweshwara N M (Vishweshwara Sanskrit), Bengaluru, Karnataka, India. Contact: ${PRIVACY_EMAIL} or WhatsApp ${TERMS_WHATSAPP}.`,
    ],
  },
  {
    id: 'product',
    title: 'What you buy',
    points: [
      `A licence to use ${AK.name}, a Sanskrit (Devanagari) keyboard for Mac. It needs ${AK.requirements}.`,
      `Price: ₹${AK.price}, paid once. There is no subscription and no renewal.`,
      'Payment is made on Razorpay’s secure page (UPI, card or net banking). We never see your card, UPI or bank details.',
      'The price shown at checkout is the final price you pay.',
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery',
    points: [
      'Right after payment you land on your download page. It gives you the installer and your personal licence key.',
      'If you lose your key or need the installer again, open the same page and enter your payment ID (from the Razorpay receipt email).',
      'Each payment can download the installer a limited number of times. If you reach the limit, message us and we will help.',
    ],
  },
  {
    id: 'trial',
    title: 'Free trial',
    paragraphs: [
      `You can download ${AK.name} free from our website and use it fully for 7 days without a licence key, so you can check that it suits your Mac. After that, it types plain English until a licence key is activated.`,
    ],
  },
  {
    id: 'licence',
    title: 'Your licence',
    points: [
      'You get a personal licence to use Aksharam IME on up to 2 Macs that you own or use.',
      '“Lifetime licence” means your licence has no expiry date and needs no further payment. It works on your Macs for as long as their macOS version supports it. We will try to keep Aksharam working on new macOS versions, but we cannot promise that every future macOS will support it.',
      'Updates to version 1 of Aksharam IME are free for licence holders.',
      'The software is licensed to you, not sold. All rights stay with Vishweshwara N M.',
      'Please do not share your licence key or the installer, resell them, or copy, change or take apart the software. A key that is shared publicly may be blocked from activating on more Macs.',
      'Changed your Mac? Message us and we will move your licence.',
    ],
  },
  {
    id: 'refunds',
    title: 'Refunds',
    points: [
      'If Aksharam IME does not work on your Mac, message us within 7 days of payment with your payment ID. We will first try to help you set it up. If we cannot make it work, you get a full refund.',
      'If you were charged twice by mistake, the extra payment is always refunded.',
      'Refunds go back to your original payment method through Razorpay, usually within 5–7 working days after we approve them (your bank may take longer).',
      'When a refund is made, the licence key for that payment stops working.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    paragraphs: [
      'The Aksharam keyboard never uses the internet and never records, saves or sends anything you type. The Aksharam IME app goes online only once, to activate your licence: it sends your key and an anonymous ID for your Mac. Details are in our Privacy Notice.',
    ],
  },
  {
    id: 'warranty',
    title: 'Our responsibility',
    paragraphs: [
      'We build and test Aksharam IME carefully and will help you if something goes wrong. Apart from the refund above, the software is provided as it is, and to the extent the law allows, our total responsibility for any claim about it is limited to the amount you paid.',
      'Nothing in these terms takes away rights that consumer law gives you.',
    ],
  },
  {
    id: 'grievance',
    title: 'Complaints (Grievance Officer)',
    paragraphs: [
      `Grievance Officer: Vishweshwara N M, ${PRIVACY_EMAIL}, WhatsApp ${TERMS_WHATSAPP}. We acknowledge every complaint within 48 hours and resolve it within one month.`,
    ],
  },
  {
    id: 'law',
    title: 'Law',
    paragraphs: [
      'These terms are governed by the laws of India, and the courts of Bengaluru, Karnataka have jurisdiction. If you live outside India, you also keep any rights your own country’s consumer law gives you.',
      'Mac and macOS are trademarks of Apple Inc. Aksharam IME is an independent product and is not made by or connected with Apple.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    paragraphs: [
      `This is version ${TERMS_VERSION}, last updated ${TERMS_UPDATED}. Changes never reduce what you already paid for.`,
    ],
  },
];
