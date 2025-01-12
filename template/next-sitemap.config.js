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
      disallow: [
        '/draft/', // 下書きプレビューページ。そもそも本番では何も表示しない
        '/p/', // 絞り込みなしページネーション
        '/tags/', // タグ絞り込みページネーション
      ],
    },
  ],
};
