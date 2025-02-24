import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import TagList from '../TagList';
import Profile from '../Profile';
import Share from '@/components/Share';
import { getGlobalTags } from '@/libs/getGlobalTags';
import { HeadingTuple } from '@/libs/extractHeadings';
import { formatImageSrc } from '@/libs/formatImageSrc';
import Toc from '@/components/Toc';
import ArticleTitle from '@/components/ArticleTitle';
import ArticleContent from '@/components/ArticleContent';
import InArticleAdsPortal from '@/components/adsense/InArticleAdsPortal';

type Props = {
  data: Omit<Article, 'content'>;
  formattedContent: string;
  headings?: ReadonlyArray<HeadingTuple>;
  shareUrl?: string;
};

export default function Article({ data, formattedContent: content, headings, shareUrl }: Props) {
  return (
    <main data-pagefind-body>
      <div className="flex flex-col gap-4 mb-8">
        {data.thumbnail && (
          <picture className="w-full">
            <source
              type="image/webp"
              media="(max-width: 640px)"
              srcSet={[
                `${formatImageSrc(`${data.thumbnail.url}?fm=webp&fit=fill&fill=blur&w=414&h=217`)} 1x`,
                `${formatImageSrc(`${data.thumbnail.url}?fm=webp&fit=fill&fill=blur&w=414&h=217&dpr=2`)} 2x`,
              ].join(',')}
            />
            <source
              type="image/webp"
              srcSet={[
                `${formatImageSrc(`${data.thumbnail.url}?fm=webp&fit=fill&fill=blur&w=960&h=504`)} 1x`,
                `${formatImageSrc(`${data.thumbnail.url}?fm=webp&fit=fill&fill=blur&w=960&h=504&dpr=2`)} 2x`,
              ].join(',')}
            />
            <img
              src={formatImageSrc(data.thumbnail.url)}
              alt=""
              className="w-full h-auto border border-solid border-gray-200 shadow-md"
              width={1200}
              height={630}
              fetchPriority={'high'}
              decoding={'async'}
            />
          </picture>
        )}
        <ArticleTitle>{data.title}</ArticleTitle>
        <PublishedDate
          date={data.publishedAt || data.createdAt}
          updatedDate={data.updatedAt}
          className="text-sm"
        />
        {data.description && <p className="text-sm text-gray-500">{data.description}</p>}
        {data.tags && data.tags.length > 0 && <TagList tags={data.tags} />}
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
      {!!process.env.GOOGLE_ADSENSE_PUBLISHER_ID && (
        <InArticleAdsPortal googleAdsensePublisherId={process.env.GOOGLE_ADSENSE_PUBLISHER_ID} />
      )}
    </main>
  );
}
