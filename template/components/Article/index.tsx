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
    <main className="flex flex-col justify-between items-center" data-pagefind-body>
      <ArticleTitle className="mb-[20px]">{data.title}</ArticleTitle>
      <TagList tags={data.tags} />
      {data.description && (
        <p className="text-sm text-gray-500 mt-[24px] mb-[40px] text-center">{data.description}</p>
      )}
      <div className="flex items-center mb-[40px] text-sm ">
        <PublishedDate date={data.publishedAt || data.createdAt} updatedDate={data.updatedAt} />
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
            className="w-full h-auto mb-[40px] border border-solid border-gray-200 shadow-md"
            width={1200}
            height={630}
            fetchPriority={'high'}
            decoding={'async'}
          />
        </picture>
      )}
      {headings && <Toc headings={headings} className="mb-16" />}
      <ArticleContent dangerouslySetInnerHTML={{ __html: content }} />
      {shareUrl && (
        <Share
          className="my-8"
          url={shareUrl}
          title={data.title}
          hashtags={['wandfuldays', ...getGlobalTags(data)]}
        />
      )}
      <hr className="w-full border-solid border-top my-8" />
      <Profile writer={data.writer} className="mb-8" />
    </main>
  );
}
