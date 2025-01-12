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
  transform: async (config, loc) => {
    // NOTE: app router で管理している favicon 類に trailing slash がついてしまう。
    // そもそもページではないので除外する
    if ([/apple-icon.png/, /manifest.webmanifest/, /icon.svg/].some((pattern) => pattern.test(loc)))
      return null;

    return {
      loc, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
