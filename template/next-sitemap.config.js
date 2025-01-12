/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: 'out',
  exclude: [
    // 下書きプレビューページ。そもそも本番では何も表示しない隠しパスなので除外する
    '/draft/',
    // NOTE: app router で管理している favicon 類に trailing slash がついてしまう。
    // そもそもページではないので除外する
    '/apple-icon.png',
    '/manifest.webmanifest',
    '/icon.svg',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // NOTE: ページネーションは sitemap.xml には載せるがクロールからは除外したい
          '/p/', // 絞り込みなしページネーション
          '/tags/', // タグ絞り込みページネーション
        ],
      },
    ],
  },
};
