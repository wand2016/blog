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

type Props = {
  data: Omit<Article, 'content'>;
  formattedContent: string;
  headings?: ReadonlyArray<HeadingTuple>;
  shareUrl?: string;
};

export default function Article({ data, formattedContent: content, headings, shareUrl }: Props) {
  return (
    <main className="flex flex-col gap-8 justify-between items-center" data-pagefind-body>
      <ArticleTitle className="mt-8">{data.title}</ArticleTitle>
      {data.description && <p className="text-sm text-gray-500 text-center">{data.description}</p>}
      <div className="flex flex-col gap-2 items-center">
        {data.tags && data.tags.length > 0 && <TagList tags={data.tags} />}
        <PublishedDate
          date={data.publishedAt || data.createdAt}
          updatedDate={data.updatedAt}
          className="text-sm"
        />
      </div>
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
      {headings && <Toc headings={headings} />}
      <ArticleContent dangerouslySetInnerHTML={{ __html: content }} />
      {shareUrl && (
        <Share
          url={shareUrl}
          title={data.title}
          hashtags={['wandfuldays', ...getGlobalTags(data)]}
        />
      )}
      <hr className="w-full border-solid border-top" />
      <Profile writer={data.writer} />
    </main>
  );
}
