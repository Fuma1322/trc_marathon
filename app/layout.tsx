import './globals.css';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { Poppins, Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { ToastProvider } from './ToastProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const siteUrl = 'https://trc-marathon.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'TRC × LSRC Race 2026 | Register Now',
    template: '%s | TRC × LSRC Race 2026',
  },

  description:
    'Register for the TRC × LSRC Race 2026 in Maseru, Lesotho, on 14 November 2026. Walk, jog or run as we celebrate 60 years of Lesotho’s independence under the theme “Beating El Niño for Independence.” Everyone is welcome.',

  applicationName: 'TRC × LSRC Race 2026',

  keywords: [
    'TRC Race 2026',
    'TRC LSRC Race',
    'Lesotho marathon 2026',
    'Maseru running event',
    'Lesotho 60 years independence',
    'Beating El Niño for Independence',
    'Transformation Resource Centre',
    'Lesotho Sport and Recreation Commission',
    'Lesotho road race',
    'marathon registration Lesotho',
    'running events in Maseru',
  ],

  authors: [
    { name: 'Transformation Resource Centre' },
    { name: 'Lesotho Sport and Recreation Commission' },
  ],

  creator: 'Transformation Resource Centre × Lesotho Sport and Recreation Commission',

  category: 'Sports & Recreation',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'TRC × LSRC Race 2026',
    locale: 'en_LS',
    title: 'TRC × LSRC Race 2026 — One Heat. One Run. One Lesotho.',
    description:
      'Join us on 14 November 2026 at the TRC Compound, Maseru, as we celebrate 60 years of Lesotho’s independence. Walk, jog or run under the theme “Beating El Niño for Independence.” Everyone is welcome.',
    images: [
      {
        url: '/trc-race-2026.png',
        width: 1711,
        height: 959,
        alt: 'TRC × LSRC Race 2026 — One Heat. One Run. One Lesotho.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TRC × LSRC Race 2026 | One Heat. One Run. One Lesotho.',
    description:
      'Register for the TRC × LSRC Race 2026 on 14 November in Maseru, Lesotho. Celebrate 60 years of independence through health, unity and community.',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#25D366',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, poppins.variable)}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <ToastProvider />
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
