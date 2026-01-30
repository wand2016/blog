import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Nav from '@/components/Nav';
import MultiplexHorizontal from '@/components/adsense/MultiplexHorizontal';
import { LIMIT } from '@/constants';
import { getAllBlogIds, getTagList } from '@/libs/microcms';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '@/libs/siteMetadata';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  applicationName: SITE_NAME,
  title: `${SITE_NAME}|${SITE_TITLE}`,
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: '/blog_ogp.png',
  },
  ...(process.env.GOOGLE_ADSENSE_PUBLISHER_ID
    ? {
        other: {
          'google-adsense-account': `ca-${process.env.GOOGLE_ADSENSE_PUBLISHER_ID}`,
        },
      }
    : {}),
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const { contents: tags } = await getTagList({
    limit: LIMIT,
  });

  const tagsWithCount = (
    await Promise.all(
      tags.map(async (tag) => ({
        tag,
        count: (await getAllBlogIds(`tags[contains]${tag.id}`)).length,
      })),
    )
  ).toSorted((a, b) => b.count - a.count);

  return (
    <html lang="ja" className="pt-12 scroll-smooth scroll-pt-12">
      <body>
        {!!process.env.GOOGLE_ADSENSE_PUBLISHER_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.GOOGLE_ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            // NOTE: 公式は head 内にいれることを推奨している。beforeInteractive とすることで実現できる。
            // そうすると Google PageSpeed Insights のスコアが著しく悪くなるため lazyOnload にしていた。 (body 内に入る)
            // しかし、 AdSense 管理画面側でエラーが出ていたので仕方なく head に戻す。
            strategy="beforeInteractive"
          />
        )}
        {/*NOTE: iframely の responsive スタイリングで必要*/}
        <Script async src={`${process.env.IFRAMELY_PROXY_URL}/embed.js`} strategy="lazyOnload" />
        <Header menuContent={<Nav tags={tagsWithCount} />} />
        <main className="w-full max-w-[960px] p-6 mx-auto flex flex-col gap-8">{children}</main>
        {!!process.env.GOOGLE_ADSENSE_PUBLISHER_ID &&
          !!process.env.GOOGLE_ADSENSE_SLOT_MULTIPLEX_HORIZONTAL && (
            <MultiplexHorizontal
              googleAdsensePublisherId={process.env.GOOGLE_ADSENSE_PUBLISHER_ID}
              adSlot={process.env.GOOGLE_ADSENSE_SLOT_MULTIPLEX_HORIZONTAL}
            />
          )}
        <Footer className="mt-8" />
        <GoogleAnalytics gaId={process.env.GA_ID ?? ''} />
      </body>
    </html>
  );
}
