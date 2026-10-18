import type { Metadata } from 'next';
import AboutContent from '@/components/frontend/AboutContent';

export const metadata: Metadata = {
  title: 'About Mookho Fuma | Film Production',
  description:
    'Learn about Mookho Fuma, her film production education, creative interests, and approach to visual storytelling.',
};

export default function AboutPage() {
  return <AboutContent />;
}
