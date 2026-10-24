import './globals.css';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { ToastProvider } from './ToastProvider';
import { Poppins, Inter } from 'next/font/google';

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
const ogImage = `${siteUrl}/trc-race-2026.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'TRC Race 2026 | One Heat. One Run. One Lesotho.',
    template: '%s | TRC Race 2026',
  },

  description:
    'Register for TRC Race 2026 in Maseru, Lesotho, on 14 November 2026. Walk, jog or run as we celebrate 60 years of Lesotho’s independence under the theme “Beating El Niño for Independence.” Everyone is welcome.',

  applicationName: 'TRC Race 2026',

  keywords: [
    'TRC Race 2026',
    'Lesotho marathon 2026',
    'Maseru running event',
    'Lesotho 60 years independence',
    'Beating El Niño for Independence',
    'Transformation Resource Centre',
    'Lesotho road race',
    'marathon registration Lesotho',
    'running events in Maseru',
  ],

  authors: [{ name: 'Transformation Resource Centre' }],
  creator: 'Transformation Resource Centre',
  publisher: 'Transformation Resource Centre',
  category: 'Sports & Recreation',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'TRC Race 2026',
    locale: 'en_LS',
    title: 'TRC Race 2026 | One Heat. One Run. One Lesotho.',
    description:
      'Join us on 14 November 2026 at the TRC Compound, Maseru, Lesotho. Celebrate 60 years of independence through health, unity and community under the theme “Beating El Niño for Independence.” Everyone is welcome.',
    images: [
      {
        url: ogImage,
        secureUrl: ogImage,
        width: 1711,
        height: 959,
        type: 'image/png',
        alt: 'TRC Race 2026 — One Heat. One Run. One Lesotho.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TRC Race 2026 | One Heat. One Run. One Lesotho.',
    description:
      'Register for TRC Race 2026 on 14 November 2026 in Maseru, Lesotho. Celebrate 60 years of independence through health, unity and community.',
    images: {
      url: ogImage,
      alt: 'TRC Race 2026 — One Heat. One Run. One Lesotho.',
    },
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
