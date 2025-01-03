import { Metadata } from 'next';
import { getDetail, getAllBlogIds } from '@/libs/microcms';
import Article from '@/components/Article';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getDetail(params.slug);

  return {
    title: `wandfuldays|${data.title}`,
    description:
      data.description ||
      'ハンドメイド、家庭菜園、DIY、プログラミングといった創造的な活動を記録するブログです。新しいスキルや経験を積み重ね、日々の暮らしをより豊かに。「創造的なこと」をテーマに、自分らしい人生を築くための挑戦をシェアしています。',
    openGraph: {
      title: `wandfuldays|${data.title}`,
      description:
        data.description ||
        'ハンドメイド、家庭菜園、DIY、プログラミングといった創造的な活動を記録するブログです。新しいスキルや経験を積み重ね、日々の暮らしをより豊かに。「創造的なこと」をテーマに、自分らしい人生を築くための挑戦をシェアしています。',
      images: [data?.thumbnail?.url ?? '/blog_ogp.png'],
    },
  };
}

export async function generateStaticParams() {
  const data = await getAllBlogIds();

  return data.map((blogId) => ({ slug: blogId }));
}

export default async function Page({ params }: Props) {
  const data = await getDetail(params.slug);

  // avoid `/` duplication
  const baseUrlRaw = process.env.BASE_URL ?? '';
  const baseUrl = baseUrlRaw.endsWith('/') ? baseUrlRaw : `${baseUrlRaw}/`;

  return <Article data={data} shareUrl={`${baseUrl}articles/${data.id}`} />;
}
