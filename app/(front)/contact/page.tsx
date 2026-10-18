import type { Metadata } from 'next';
import ContactContent from '@/components/frontend/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Mookho Fuma | Film Production',
  description:
    'Contact Mookho Fuma for film production opportunities, creative collaborations, and professional enquiries.',
};

export default function ContactPage() {
  return <ContactContent />;
}
