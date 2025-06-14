/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.BASE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    transformRobotsTxt: async (_, robotsTxt) =>
      robotsTxt.replace(`# Host\nHost: ${process.env.BASE_URL}\n\n`, ''),
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // 一覧系ページは Google に「価値のないページ」と見なされてインデックスが外されるので、最初から除外しておく。
          // TODO: 価値のある一覧ページを提供できるようになったら戻す
          '/p/', // 絞り込みなしページネーション
          '/tags/', // タグ絞り込みページネーション
        ],
      },
    ],
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
