import { Metadata, ResolvingMetadata } from 'next';

import Article from '@/components/Article';
import ArticleList from '@/components/ArticleList';
import { extractHeadings } from '@/libs/extractHeadings';
import { formatImageSrc } from '@/libs/formatImageSrc';
import { formatRichText } from '@/libs/formatRichText';
import { getGlobalTags } from '@/libs/getGlobalTags';
import { getAllBlogIds, getDetail, getList } from '@/libs/microcms';

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
  const articleData = await getDetail(slug);
  const tagId = articleData.tags?.[0]?.id;
  const relatedArticles =
    tagId == null
      ? null
      : (
          await getList({
            limit: 3,
            filters: `tags[contains]${tagId}[and]id[not_equals]${articleData.id}`,
          })
        ).contents;

  // avoid `/` duplication
  const baseUrlRaw = process.env.BASE_URL ?? '';
  const baseUrl = baseUrlRaw.endsWith('/') ? baseUrlRaw : `${baseUrlRaw}/`;

  const content = await formatRichText(articleData.content);
  const headings = extractHeadings(content);

  return (
    <>
      <Article
        data={articleData}
        formattedContent={content}
        headings={!!articleData.use_toc ? headings : undefined}
        shareUrl={`${baseUrl}articles/${slug}/`}
        googleAdsensePublisherId={process.env.GOOGLE_ADSENSE_PUBLISHER_ID}
        adSlotDisplayHorizontal={process.env.GOOGLE_ADSENSE_SLOT_DISPLAY_HORIZONTAL}
      />
      {relatedArticles && (
        <aside>
          <section aria-labelledby="related-posts-heading">
            <h2 className="text-xl font-bold mb-2">関連記事</h2>
            <ArticleList articles={relatedArticles} enableViewTransition={false} />
          </section>
        </aside>
      )}
    </>
  );
}
