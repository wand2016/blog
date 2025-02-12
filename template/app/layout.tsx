import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '@/libs/siteMetadata';

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
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const tags = await getTagList({
    limit: LIMIT,
  });
  return (
    <html lang="ja">
      <body>
        {!!process.env.GOOGLE_ADSENSE_PUBLISHER_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.GOOGLE_ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {/*NOTE: iframely の responsive スタイリングで必要*/}
        <Script async src="https://cdn.iframe.ly/embed.js" strategy={'afterInteractive'} />
        <Header menuContent={<Nav tags={tags.contents} />} />
        <Nav className="hidden sm:flex" tags={tags.contents} />
        <hr className="border-solid sm:border-bottom border-gray-100 sm:mb-4" />
        <main className="w-full max-w-[720px] p-6 mx-auto flex flex-col gap-8">{children}</main>
        <Footer className="mt-8" />
        <GoogleAnalytics gaId={process.env.GA_ID ?? ''} />
      </body>
    </html>
  );
}
