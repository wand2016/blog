import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  applicationName: 'wandfuldays',
  title: 'wandfuldays|魔法のように素敵な日々をつくるブログ',
  description:
    '「つくる」をテーマに、ハンドメイド、家庭菜園、DIY、プログラミングなど、様々な挑戦を記録します。魔法のように素敵な日々を一緒に作りませんか？',
  openGraph: {
    siteName: 'wandfuldays',
    title: '魔法のように素敵な日々をつくるブログ',
    description:
      '「つくる」をテーマに、ハンドメイド、家庭菜園、DIY、プログラミングなど、様々な挑戦を記録します。魔法のように素敵な日々を一緒に作りませんか？',
    images: '/blog_ogp.png',
  },
  alternates: {
    canonical: '/',
  },
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
        {/*NOTE: iframely の responsive スタイリングで必要*/}
        <Script src="https://cdn.iframe.ly/embed.js" />
        <Header menuContent={<Nav tags={tags.contents} />} />
        <Nav className={styles.nav} tags={tags.contents} />
        <hr className={styles.hr} />
        <main className={styles.main}>{children}</main>
        <Footer />
        <GoogleAnalytics gaId={process.env.GA_ID ?? ''} />
      </body>
    </html>
  );
}
