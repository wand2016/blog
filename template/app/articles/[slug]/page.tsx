import { Metadata, ResolvingMetadata } from 'next';

import ArticleComponent from '@/components/Article';
import ArticleList from '@/components/ArticleList';
import { extractHeadings } from '@/libs/extractHeadings';
import { formatImageSrc } from '@/libs/formatImageSrc';
import { formatRichText } from '@/libs/formatRichText';
import { getGlobalTags } from '@/libs/getGlobalTags';
import { Article, getAllBlogIds, getDetail, getList } from '@/libs/microcms';

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

const RELATED_ARTICLES_LIMIT = 3;

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await getDetail(slug);
  const relatedArticles = await getRelatedArticles(article);

  // avoid `/` duplication
  const baseUrlRaw = process.env.BASE_URL ?? '';
  const baseUrl = baseUrlRaw.endsWith('/') ? baseUrlRaw : `${baseUrlRaw}/`;

  const content = await formatRichText(article.content);
  const headings = extractHeadings(content);

  return (
    <>
      <ArticleComponent
        data={article}
        formattedContent={content}
        headings={!!article.use_toc ? headings : undefined}
        shareUrl={`${baseUrl}articles/${slug}/`}
        googleAdsensePublisherId={process.env.GOOGLE_ADSENSE_PUBLISHER_ID}
        adSlotDisplayHorizontal={process.env.GOOGLE_ADSENSE_SLOT_DISPLAY_HORIZONTAL}
      />
      {relatedArticles.length > 0 && (
        <aside>
          <section aria-labelledby="related-posts-heading">
            <h2 className="text-xl font-bold mb-2">関連記事</h2>
            <ArticleList articles={relatedArticles} enableViewTransition={false} lazy />
          </section>
        </aside>
      )}
    </>
  );
}

async function getRelatedArticles(article: Article): Promise<Article[]> {
  // https://document.microcms.io/content-api/get-list-contents
  // microCMS の仕様上、参照コンテンツは `depth` を指定することで第3階層まで取得できる。
  // depth を指定しない場合、 `depth:1` で取得されるため、
  // 記事 -> 関連記事 -> タグID までしか取れない。
  // depth:2 を指定すれば
  // 記事 -> 関連記事 -> タグ のように「関連記事のタグ」まで取得できる。
  //
  // しかし、記事ページのレンダリングのためにどのみち getDetail API を呼び出しており、かつ Next.js が fetch 結果をキャッシュしていることから、
  // あえて depth:1 と map を組み合わせて関連記事とタグを取り直す方針とする。
  // (この方が API 呼び出しは少ないはず)
  const relatedArticles = await Promise.all(
    (article.related_articles ?? []).map(async ({ id }) => await getDetail(id)),
  );

  const excludeFilters = [article, ...relatedArticles]
    .map((relatedArticle) => `id[not_equals]${relatedArticle.id}`)
    .join('[and]');

  const limit = Math.max(0, RELATED_ARTICLES_LIMIT - relatedArticles.length);

  const tagId = article.tags?.[0]?.id;
  const sameCategoryArticles =
    tagId == null || limit === 0
      ? []
      : (
          await getList({
            limit,
            filters: `tags[contains]${tagId}[and]${excludeFilters}`,
          })
        ).contents;

  return [...relatedArticles, ...sameCategoryArticles];
}
