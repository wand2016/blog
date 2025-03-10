import { Article } from '@/libs/microcms';
import ArticleListItem from '../ArticleListItem';
import { Fragment } from 'react';
import DisplayHorizontal from '@/components/adsense/DisplayHorizontal';
import { LIMIT } from '@/constants';

type Props = {
  articles?: Article[];
};

export default function ArticleList({ articles }: Props) {
  if (!articles) {
    return null;
  }
  if (articles.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <ul className="flex flex-col gap-8">
      {articles.map((article, index) => (
        <Fragment key={article.id}>
          <ArticleListItem article={article} />
          {!!process.env.GOOGLE_ADSENSE_PUBLISHER_ID &&
            !!process.env.GOOGLE_ADSENSE_SLOT_DISPLAY_HORIZONTAL &&
            index % adInterval === adInterval - 1 && (
              <li>
                <DisplayHorizontal
                  googleAdsensePublisherId={process.env.GOOGLE_ADSENSE_PUBLISHER_ID}
                  adSlot={process.env.GOOGLE_ADSENSE_SLOT_DISPLAY_HORIZONTAL}
                />
              </li>
            )}
        </Fragment>
      ))}
    </ul>
  );
}

// 一覧に2箇所広告を出す
const adInterval = LIMIT / 2;
