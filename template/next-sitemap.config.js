/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: 'out',
  policies: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/draft/'],
    },
  ],
};
