import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import TagList from '../TagList';
import Profile from '../Profile';
import Share from '@/components/Share';
import { getGlobalTags } from '@/libs/getGlobalTags';
import { HeadingTuple } from '@/libs/extractHeadings';
import Toc from '@/components/Toc';
import ArticleTitle from '@/components/ArticleTitle';
import ArticleContent from '@/components/ArticleContent';
import InArticleAdsPortal from '@/components/adsense/InArticleAdsPortal';
import ArticleThumbnail from '@/components/ArticleThumbnail';

type Props = {
  data: Omit<Article, 'content'>;
  formattedContent: string;
  headings?: ReadonlyArray<HeadingTuple>;
  shareUrl?: string;
  googleAdsensePublisherId?: string;
  adSlotDisplayHorizontal?: string;
};

export default function Article({
  data,
  formattedContent: content,
  headings,
  shareUrl,
  googleAdsensePublisherId,
  adSlotDisplayHorizontal,
}: Props) {
  return (
    <main data-pagefind-body>
      <div className="flex flex-col gap-4 mb-8">
        {data.thumbnail && (
          <ArticleThumbnail
            thumbnail={data.thumbnail}
            sizes={{
              default: {
                w: 414,
                h: 217,
              },
              sm: {
                w: 960,
                h: 504,
              },
            }}
            className="w-full h-auto border border-solid border-gray-200 shadow-md rounded-2xl"
            // @ts-expect-error nosuchkey
            style={{ viewTransitionName: `thumbnail-${data.id}` }}
          />
        )}
        <ArticleTitle
          // @ts-expect-error nosuchkey
          style={{ viewTransitionName: `title-${data.id}` }}
        >
          {data.title}
        </ArticleTitle>
        <PublishedDate
          date={data.publishedAt || data.createdAt}
          updatedDate={data.updatedAt}
          className="text-sm"
          // @ts-expect-error nosuchkey
          style={{ viewTransitionName: `date-${data.id}` }}
        />
        {data.description && (
          <p
            className="text-sm text-gray-500"
            // @ts-expect-error nosuchkey
            style={{ viewTransitionName: `description-${data.id}` }}
          >
            {data.description}
          </p>
        )}
        {data.tags && data.tags.length > 0 && (
          <TagList
            tags={data.tags}
            // @ts-expect-error nosuchkey
            style={{ viewTransitionName: `tags-${data.id}` }}
          />
        )}
      </div>
      {headings && (
        <div className="flex flex-col justify-content items-center">
          <Toc headings={headings} className="mb-8 inline-block" />
        </div>
      )}
      <ArticleContent dangerouslySetInnerHTML={{ __html: content }} />
      {shareUrl && (
        <Share
          url={shareUrl}
          title={data.title}
          hashtags={['wandfuldays', ...getGlobalTags(data)]}
          className="mt-8"
        />
      )}
      <hr className="w-full border-solid border-top my-8" />
      <Profile writer={data.writer} />
      {!!googleAdsensePublisherId && !!adSlotDisplayHorizontal && (
        <InArticleAdsPortal
          googleAdsensePublisherId={googleAdsensePublisherId}
          adSlot={adSlotDisplayHorizontal}
        />
      )}
    </main>
  );
}
