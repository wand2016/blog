import Link from 'next/link';

import PublishedDate from '../Date';
import TagList from '../TagList';

import ArticleThumbnail from '@/components/ArticleThumbnail';
import { Article } from '@/libs/microcms';

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <li>
      <Link
        href={`/articles/${article.id}`}
        className="block active:bg-gray-100 hover:bg-gray-100 rounded-lg h-full"
      >
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
            className="w-full h-auto border-solid border border-gray-200 shadow-sm rounded-t-lg"
            // @ts-expect-error nosuchkey
            style={{ viewTransitionName: `thumbnail-${article.id}` }}
          />
        )}
        <dl className="flex flex-col gap-2 rounded-b-lg p-2">
          <dt
            className="text-xl font-bold"
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
