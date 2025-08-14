import { Metadata, ResolvingMetadata } from 'next';

import ArticleComponent from '@/components/Article';
import { formatRichText } from '@/libs/formatRichText';
import { getGlobalTags } from '@/libs/getGlobalTags';
import { getDetail } from '@/libs/microcms';

export async function generateMetadata(_: object, parent: ResolvingMetadata): Promise<Metadata> {
  const data = await getDetail('mutual-links');

  return {
    title: data.title,
    description: data.description,
    keywords: getGlobalTags(data),
    // @ts-expect-error 型が合わない
    openGraph: {
      ...(await parent).openGraph,
      title: data.title,
      description: data.description,
    },
    alternates: {
      canonical: `/mutual-links/`,
    },
  };
}

export default async function Page() {
  const article = await getDetail('mutual-links');

  const content = await formatRichText(article.content);

  return (
    <ArticleComponent
      data={article}
      formattedContent={content}
      googleAdsensePublisherId={process.env.GOOGLE_ADSENSE_PUBLISHER_ID}
      adSlotDisplayHorizontal={process.env.GOOGLE_ADSENSE_SLOT_DISPLAY_HORIZONTAL}
      readMore={false}
    />
  );
}
