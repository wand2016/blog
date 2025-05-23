/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    transformRobotsTxt: async (_, robotsTxt) =>
      robotsTxt.replace(`# Host\nHost: ${process.env.BASE_URL}\n\n`, ''),
  },
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
    '/ads.txt',
  ],
  autoLastmod: false,
};
