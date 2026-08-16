import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { BookingProvider } from '../context/BookingContext';
import JsonLd from '../components/JsonLd';

export const metadata = {
  metadataBase: new URL('https://catering-opal-omega.vercel.app'),
  title: 'Sri Sankaraa Catering Services | Wedding & Sadhya Catering in Chennai',
  description: 'Premium wedding, corporate & Sadhya catering in Chennai since 2009. FSSAI certified, 4.9★ rated, 500+ events. Live counters & authentic banana leaf meals. Book now!',
  keywords: [
    'catering services in Chennai',
    'wedding catering Chennai',
    'South Indian Sadhya catering',
    'Brahmin catering services Chennai',
    'corporate catering Chennai',
    'live counter catering Chennai',
    'banana leaf meal catering Chennai',
    'traditional sadhya caterers',
    'birthday party catering Chennai',
    'FSSAI certified caterers Chennai',
    'catering services Ambattur',
    'catering near Venkatapuram Chennai',
    'filter coffee catering',
    'multi-cuisine buffet catering Chennai'
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Sri Sankaraa Catering Services | Wedding & Sadhya Catering in Chennai',
    description: 'Premium wedding, corporate & Sadhya catering in Chennai since 2009. FSSAI certified, 4.9★ rated, 500+ events. Live counters & authentic banana leaf meals. Book now!',
    url: 'https://catering-opal-omega.vercel.app',
    siteName: 'Sri Sankaraa Catering Services',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Sri Sankaraa Catering Services - Traditional South Indian Wedding Sadhya Feast in Chennai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Sankaraa Catering Services | Wedding & Sadhya Catering in Chennai',
    description: 'Premium wedding, corporate & Sadhya catering in Chennai since 2009. FSSAI certified, 4.9★ rated, 500+ events. Live counters & authentic banana leaf meals. Book now!',
    images: ['/hero-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification-placeholder',
    other: {
      'msvalidate.01': 'bing-verification-placeholder',
    },
  },
  other: {
    'theme-color': '#D4AF37',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Baloo+Thambi+2:wght@400;600;800&display=swap" rel="stylesheet" />
        <JsonLd />
      </head>
      <body>
        <LanguageProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

