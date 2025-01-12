import { Metadata } from 'next';
import { getDetail, getAllBlogIds } from '@/libs/microcms';
import Article from '@/components/Article';
import { formatRichText } from '@/libs/utils';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getDetail(params.slug);

  return {
    applicationName: 'wandfuldays',
    title: data.title,
    description:
      data.description ||
      'ハンドメイド、家庭菜園、DIY、プログラミングなど、さまざまな「つくる」活動を記録し、新しいスキルや経験を積み重ねながら、日々の暮らしを豊かにしていきます。',
    keywords: data.tags?.map((tag) => tag.name),
    openGraph: {
      siteName: 'wandfuldays',
      title: data.title,
      description:
        data.description ||
        'ハンドメイド、家庭菜園、DIY、プログラミングなど、さまざまな「つくる」活動を記録し、新しいスキルや経験を積み重ねながら、日々の暮らしを豊かにしていきます。',
      images: [data?.thumbnail?.url ?? '/blog_ogp.png'],
    },
    alternates: {
      canonical: `/articles/${params.slug}/`,
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

  const content = await formatRichText(data.content);

  return (
    <Article
      data={data}
      formattedContent={content}
      shareUrl={`${baseUrl}articles/${params.slug}`}
    />
  );
}
