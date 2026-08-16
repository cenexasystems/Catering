export default function robots() {
  const baseUrl = 'https://catering-opal-omega.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/secure/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
