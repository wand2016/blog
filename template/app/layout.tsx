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
  title: 'wandfuldays|「つくる」を通じて人生を豊かに',
  description:
    'ハンドメイド、家庭菜園、DIY、プログラミングなど、さまざまな「つくる」活動を記録し、新しいスキルや経験を積み重ねながら、日々の暮らしを豊かにしていきます。',
  openGraph: {
    siteName: 'wandfuldays',
    title: '「つくる」を通じて人生を豊かに',
    description:
      'ハンドメイド、家庭菜園、DIY、プログラミングなど、さまざまな「つくる」活動を記録し、新しいスキルや経験を積み重ねながら、日々の暮らしを豊かにしていきます。',
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
        <Header />
        <Nav tags={tags.contents} />
        <main className={styles.main}>{children}</main>
        <Footer />
        <GoogleAnalytics gaId={process.env.GA_ID ?? ''} />
      </body>
    </html>
  );
}
