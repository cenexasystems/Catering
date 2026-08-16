export const metadata = {
  title: 'Catering Event Gallery | Sri Sankaraa Catering Services Chennai',
  description: 'Explore photos of authentic South Indian banana leaf Sadhya, grand buffet setups, and live counters catered by Sri Sankaraa Catering Services in Chennai.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Catering Event Gallery | Sri Sankaraa Catering Services Chennai',
    description: 'Explore photos of authentic South Indian banana leaf Sadhya, grand buffet setups, and live counters catered by Sri Sankaraa Catering Services in Chennai.',
    url: 'https://catering-opal-omega.vercel.app/gallery',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Sri Sankaraa Catering Services Event Photo Gallery Chennai',
      },
    ],
  },
};

export default function GalleryLayout({ children }) {
  return children;
}
