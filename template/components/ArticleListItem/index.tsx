import Link from 'next/link';
import { ImageOff } from 'lucide-react';
import { Article } from '@/libs/microcms';
import styles from './index.module.css';
import TagList from '../TagList';
import PublishedDate from '../Date';

import { formatImageSrc } from '@/libs/formatImageSrc';
import Image from 'next/image';

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
              srcSet={[
                `${formatImageSrc(`${article.thumbnail.url}?fm=webp&w=414`)} 1x`,
                `${formatImageSrc(`${article.thumbnail.url}?fm=webp&w=414&dpr=2`)} 2x`,
              ].join(',')}
            />
            <source
              type="image/webp"
              srcSet={[
                `${formatImageSrc(`${article.thumbnail.url}?fm=webp&fit=crop&w=240&h=126`)} 1x`,
                `${formatImageSrc(`${article.thumbnail.url}?fm=webp&fit=crop&w=240&h=126&dpr=2`)} 2x`,
              ].join(',')}
            />
            <Image
              src={formatImageSrc(article.thumbnail.url)}
              alt=""
              className={styles.image}
              width={article.thumbnail.width}
              height={article.thumbnail.height}
              loading="lazy"
              decoding="async"
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
