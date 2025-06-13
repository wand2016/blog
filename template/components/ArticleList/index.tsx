import { Fragment } from 'react';

import ArticleListItem from '@/components/ArticleListItem';
import InFeed from '@/components/adsense/InFeed';
import { Article } from '@/libs/microcms';

type Props = {
  articles: readonly Omit<Article, 'related_articles'>[];
  /** @default true */
  enableViewTransition?: boolean;
  /**
   * 記事サムネイル画像の読み込み・描画を遅延させます。
   * 記事下部の「関連記事」など、オフスクリーンの画像読み込みを遅延させるために使用します。
   * @default false
   */
  lazy?: boolean;
};

export default function ArticleList({
  articles,
  enableViewTransition = true,
  lazy = false,
}: Props) {
  if (articles.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <Fragment key={article.id}>
          <ArticleListItem
            article={article}
            enableViewTransition={enableViewTransition}
            lazy={lazy}
          />
          {!!process.env.GOOGLE_ADSENSE_PUBLISHER_ID &&
            !!process.env.GOOGLE_ADSENSE_SLOT_IN_FEED &&
            (index === 3 || index === 8) && (
              <li>
                <InFeed
                  googleAdsensePublisherId={process.env.GOOGLE_ADSENSE_PUBLISHER_ID}
                  adSlot={process.env.GOOGLE_ADSENSE_SLOT_IN_FEED}
                />
              </li>
            )}
        </Fragment>
      ))}
    </ul>
  );
}
