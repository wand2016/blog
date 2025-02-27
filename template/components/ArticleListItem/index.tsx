import { Article } from '@/libs/microcms';
import TagList from '../TagList';
import PublishedDate from '../Date';

import ArticleThumbnail from '@/components/ArticleThumbnail';
import Link from 'next/link';

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <li>
      <Link href={`/articles/${article.id}`} className="block sm:flex sm:gap-4">
        {article.thumbnail && (
          <ArticleThumbnail
            thumbnail={article.thumbnail}
            sizes={{
              default: {
                w: 414,
                h: 217,
              },
              sm: {
                w: 240,
                h: 126,
              },
            }}
            className="w-full sm:max-w-none h-auto border-solid border border-gray-200 shadow-sm sm:w-[240px] rounded-2xl sm:rounded-xl"
            // @ts-expect-error nosuchkey
            style={{ viewTransitionName: `thumbnail-${article.id}` }}
          />
        )}
        <dl className="flex flex-col gap-2 mt-2 sm:mt-0">
          <dt
            className="text-2xl font-bold"
            // @ts-expect-error nosuchkey
            style={{ viewTransitionName: `title-${article.id}` }}
          >
            {article.title}
          </dt>
          <dd>
            <PublishedDate
              date={article.publishedAt || article.createdAt}
              updatedDate={article.updatedAt}
              className="text-sm"
              // @ts-expect-error nosuchkey
              style={{ viewTransitionName: `date-${article.id}` }}
            />
          </dd>
          {article.description && (
            <dd>
              <p
                className="text-sm text-gray-500"
                // @ts-expect-error nosuchkey
                style={{ viewTransitionName: `description-${article.id}` }}
              >
                {article.description}
              </p>
            </dd>
          )}
          {article.tags && article.tags.length > 0 && (
            <dd>
              <TagList
                tags={article.tags}
                hasLink={false}
                // @ts-expect-error nosuchkey
                style={{ viewTransitionName: `tags-${article.id}` }}
              />
            </dd>
          )}
        </dl>
      </Link>
    </li>
  );
}
