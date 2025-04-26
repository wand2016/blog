import { Metadata, ResolvingMetadata } from 'next';

import Article from '@/components/Article';
import { extractHeadings } from '@/libs/extractHeadings';
import { formatImageSrc } from '@/libs/formatImageSrc';
import { formatRichText } from '@/libs/formatRichText';
import { getGlobalTags } from '@/libs/getGlobalTags';
import { getAllBlogIds, getDetail } from '@/libs/microcms';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const data = await getDetail(slug);

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
      canonical: `/articles/${slug}/`,
    },
  };
}

export async function generateStaticParams() {
  const data = await getAllBlogIds();

  return data.map((blogId) => ({ slug: blogId }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getDetail(slug);

  // avoid `/` duplication
  const baseUrlRaw = process.env.BASE_URL ?? '';
  const baseUrl = baseUrlRaw.endsWith('/') ? baseUrlRaw : `${baseUrlRaw}/`;

  const content = await formatRichText(data.content);
  const headings = extractHeadings(content);

  return (
    <Article
      data={data}
      formattedContent={content}
      headings={!!data.use_toc ? headings : undefined}
      shareUrl={`${baseUrl}articles/${slug}`}
      googleAdsensePublisherId={process.env.GOOGLE_ADSENSE_PUBLISHER_ID}
      adSlotDisplayHorizontal={process.env.GOOGLE_ADSENSE_SLOT_DISPLAY_HORIZONTAL}
    />
  );
}
