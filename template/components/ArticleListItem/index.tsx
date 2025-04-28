import clsx from 'clsx';
import Link from 'next/link';

import ArticleThumbnail from '@/components/ArticleThumbnail';
import PublishedDate from '@/components/Date';
import TagList from '@/components/TagList';
import { Article } from '@/libs/microcms';

type Props = {
  article: Article;
  enableViewTransition: boolean;
};

export default function ArticleListItem({ article, enableViewTransition }: Props) {
  return (
    <li className="h-full">
      <Link
        href={`/articles/${article.id}`}
        className={clsx([
          'block',
          'active:bg-gray-100',
          'hover:bg-gray-100',
          'border-solid',
          'border',
          'border-gray-200',
          'rounded-lg',
          'h-full',
          'shadow-xs',
          'duration-300',
          'transition-translate',
          'active:-translate-y-0.5',
          'hover:-translate-y-0.5',
        ])}
      >
        {article.thumbnail && (
          <ArticleThumbnail
            viewTransitionId={enableViewTransition ? article.id : undefined}
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
            className="w-full h-auto border-solid border-b border-gray-200 rounded-t-lg"
          />
        )}
        <dl className="flex flex-col gap-2 rounded-b-lg p-3">
          <dt className="text-xl font-bold">{article.title}</dt>
          <dd>
            <PublishedDate
              date={article.publishedAt || article.createdAt}
              updatedDate={article.updatedAt}
              className="text-sm"
            />
          </dd>
          {article.description && (
            <dd>
              <p className="text-sm text-gray-500">{article.description}</p>
            </dd>
          )}
          {article.tags && article.tags.length > 0 && (
            <dd>
              <TagList tags={article.tags} hasLink={false} />
            </dd>
          )}
        </dl>
      </Link>
    </li>
  );
}
