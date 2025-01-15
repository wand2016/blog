import Link from 'next/link';
import { ImageOff } from 'lucide-react';
import { Article } from '@/libs/microcms';
import styles from './index.module.css';
import TagList from '../TagList';
import PublishedDate from '../Date';
import { formatImageSrc } from '@/libs/utils';

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <li className={styles.list}>
      <Link href={`/articles/${article.id}`} className={styles.link}>
        {article.thumbnail ? (
          <picture>
            <source
              type="image/webp"
              media="(max-width: 640px)"
              srcSet={formatImageSrc(
                `${article.thumbnail?.url}?fm=webp&w=414 1x, ${article.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`,
              )}
            />
            <source
              type="image/webp"
              srcSet={formatImageSrc(
                `${article.thumbnail?.url}?fm=webp&fit=crop&w=240&h=126 1x, ${article.thumbnail?.url}?fm=webp&fit=crop&w=240&h=126&dpr=2 2x`,
              )}
            />
            <img
              src={formatImageSrc(article.thumbnail?.url) || `/noimage.png`}
              alt=""
              className={styles.image}
              width={article.thumbnail?.width}
              height={article.thumbnail?.height}
            />
          </picture>
        ) : (
          <div className={styles.noImage}>
            <ImageOff color="#666666" />
          </div>
        )}
        <dl className={styles.content}>
          <dt className={styles.title}>{article.title}</dt>
          <dd>
            <TagList tags={article.tags} hasLink={false} />
          </dd>
          <dd className={styles.date}>
            <PublishedDate date={article.publishedAt || article.createdAt} />
          </dd>
        </dl>
      </Link>
    </li>
  );
}
