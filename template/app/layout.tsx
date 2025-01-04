import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'wandfuldays|創造的な活動で人生を豊かに',
  description:
    'ハンドメイド、家庭菜園、DIY、プログラミングといった創造的な活動を記録するブログです。新しいスキルや経験を積み重ね、日々の暮らしをより豊かに。「創造的なこと」をテーマに、自分らしい人生を築くための挑戦をシェアしています。',
  openGraph: {
    siteName: 'wandfuldays',
    title: '創造的な活動で人生を豊かに',
    description:
      '新しいスキルや経験を積み重ね、日々の暮らしをより豊かに。「創造的なこと」をテーマに、自分らしい人生を築くための挑戦をシェアしています。',
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
        <Header />
        <Nav tags={tags.contents} />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
