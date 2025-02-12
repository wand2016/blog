import Link from 'next/link';
import { ImageOff } from 'lucide-react';
import { Article } from '@/libs/microcms';
import TagList from '../TagList';
import PublishedDate from '../Date';

import { formatImageSrc } from '@/libs/formatImageSrc';

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <li>
      <Link href={`/articles/${article.id}`} className="block sm:flex sm:gap-4">
        {article.thumbnail ? (
          <picture>
            <source
              type="image/webp"
              media="(max-width: 640px)"
              srcSet={[
                `${formatImageSrc(`${article.thumbnail.url}?fm=webp&fit=fill&fill=blur&w=414&h=217`)} 1x`,
                `${formatImageSrc(`${article.thumbnail.url}?fm=webp&fit=fill&fill=blur&w=414&h=217&dpr=2`)} 2x`,
              ].join(',')}
            />
            <source
              type="image/webp"
              srcSet={[
                `${formatImageSrc(`${article.thumbnail.url}?fm=webp&fit=fill&fill=blur&w=240&h=126`)} 1x`,
                `${formatImageSrc(`${article.thumbnail.url}?fm=webp&fit=fill&fill=blur&w=240&h=126&dpr=2`)} 2x`,
              ].join(',')}
            />
            <img
              src={formatImageSrc(article.thumbnail.url)}
              alt=""
              className="w-full sm:max-w-none h-auto border-solid border border-gray-200 shadow-sm sm:w-[240px]"
              width={1200}
              height={630}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        ) : (
          <div className="w-full sm:max-w-none h-auto border-solid border border-gray-200 shadow-sm flex justify-center items-center sm:w-[240px] sm:block">
            <ImageOff color="#666666" />
          </div>
        )}
        <dl className="flex flex-col gap-2">
          <dt className="text-xl font-bold">{article.title}</dt>
          {article.tags && article.tags.length > 0 && (
            <dd>
              <TagList tags={article.tags} hasLink={false} />
            </dd>
          )}
          <dd>
            <PublishedDate
              date={article.publishedAt || article.createdAt}
              updatedDate={article.updatedAt}
            />
          </dd>
        </dl>
      </Link>
    </li>
  );
}
