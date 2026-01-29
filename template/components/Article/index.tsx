import Link from 'next/link';
import { ViewTransition } from 'react';

import ArticleContent from '@/components/ArticleContent';
import ArticleThumbnail from '@/components/ArticleThumbnail';
import ArticleTitle from '@/components/ArticleTitle';
import PublishedDate from '@/components/Date';
import Profile from '@/components/Profile';
import Share from '@/components/Share';
import TagList from '@/components/TagList';
import Toc from '@/components/Toc';
import InArticleAdsPortal from '@/components/adsense/InArticleAdsPortal';
import { HeadingTuple } from '@/libs/extractHeadings';
import { getGlobalTags } from '@/libs/getGlobalTags';
import { type Article } from '@/libs/microcms';

type Props = {
  data: Omit<Article, 'content'>;
  formattedContent: string;
  headings?: readonly HeadingTuple[];
  shareUrl?: string;
  googleAdsensePublisherId?: string;
  adSlotDisplayHorizontal?: string;
  readMore?: boolean;
};

export default function Article({
  data,
  formattedContent: content,
  headings,
  shareUrl,
  googleAdsensePublisherId,
  adSlotDisplayHorizontal,
  readMore = true,
}: Props) {
  return (
    <article data-pagefind-body className="w-full max-w-[720px] mx-auto">
      <div className="flex flex-col gap-4 mb-8">
        {data.thumbnail && (
          <ViewTransition name={`thumbnail${data.id}`}>
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
              sync
            />
          </ViewTransition>
        )}
        <ViewTransition name={`title${data.id}`}>
          <ArticleTitle>{data.title}</ArticleTitle>
        </ViewTransition>
        <ViewTransition name={`publishedDate${data.id}`}>
          <PublishedDate
            date={data.publishedAt || data.createdAt}
            updatedDate={data.updatedAt}
            className="text-sm"
          />
        </ViewTransition>
        {data.description && (
          <ViewTransition name={`description${data.id}`}>
            <p className="text-sm text-gray-500">{data.description}</p>
          </ViewTransition>
        )}
        {data.tags && data.tags.length > 0 && (
          <ViewTransition name={`tagList${data.id}`}>
            <TagList tags={data.tags} />
          </ViewTransition>
        )}
      </div>
      {headings && (
        <div className="flex flex-col justify-content items-center">
          <Toc headings={headings} className="mb-8 inline-block" />
        </div>
      )}
      <ArticleContent dangerouslySetInnerHTML={{ __html: content }} />
      {readMore && (
        <aside className="mt-4 bg-blue-50 p-4 rounded-lg">
          <p>👉 他の記事も読んでみませんか？</p>
          <ul>
            {data.tags?.[0] && (
              <li>
                <Link href={`/tags/${data.tags[0].id}`} className="link-text">
                  「{data.tags[0].name}」の記事一覧はこちら
                </Link>
              </li>
            )}
            <li>
              <Link href="/" className="link-text">
                全ての記事一覧はこちら
              </Link>
            </li>
          </ul>
        </aside>
      )}
      {shareUrl && (
        <Share
          url={shareUrl}
          title={data.title}
          hashtags={['wandfuldays', ...getGlobalTags(data)]}
          className="mt-8"
        />
      )}
      <hr className="w-full border-solid border-top border-gray-200 my-8" />
      <Profile writer={data.writer} />
      {!!googleAdsensePublisherId && !!adSlotDisplayHorizontal && (
        <InArticleAdsPortal
          googleAdsensePublisherId={googleAdsensePublisherId}
          adSlot={adSlotDisplayHorizontal}
        />
      )}
    </article>
  );
}
