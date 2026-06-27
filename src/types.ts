/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageView = 'home' | 'about' | 'teachings' | 'dakshina' | 'testimonials' | 'begin' | 'landing' | 'admin';

export interface StatItem {
  id: string;
  value: string;
  label: string;
  subtext?: string;
}

export interface CredentialItem {
  id: string;
  title: string;
  institution: string;
  year?: string;
  description?: string;
}

export interface SubjectItem {
  id: string;
  title: string;
  devanagari: string;
  description: string;
  duration: string;
  frequency: string;
  topics: string[];
  color: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  flag: string;
  content: string;
  subject: string;
  featured?: boolean;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
