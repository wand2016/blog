import { Metadata, ResolvingMetadata } from 'next';
import { getDetail, getAllBlogIds } from '@/libs/microcms';
import Article from '@/components/Article';
import { formatImageSrc, formatRichText } from '@/libs/utils';
import { getGlobalTags } from '@/libs/getGlobalTags';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const data = await getDetail(params.slug);

  return {
    title: data.title,
    description: data.description,
    keywords: getGlobalTags(data),
    // @ts-expect-error 型が合わない
    openGraph: {
      ...(await parent).openGraph,
      title: data.title,
      description: data.description,
      images: formatImageSrc(data?.thumbnail?.url),
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
