import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Marvel Rivals HQ - Contact us for support, feedback, partnerships, or any questions about our Marvel Rivals content.',
};

export default function ContactPage() {
  return <ContactClient />;
}