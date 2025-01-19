import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';
import Profile from '../Profile';
import Share from '@/components/Share';
import { formatImageSrc } from '@/libs/utils';
import { getGlobalTags } from '@/libs/getGlobalTags';
import { HeadingTuple } from '@/libs/extractHeadings';

type Props = {
  data: Omit<Article, 'content'>;
  formattedContent: string;
  headings?: ReadonlyArray<HeadingTuple>;
  shareUrl?: string;
};

export default function Article({ data, formattedContent: content, headings, shareUrl }: Props) {
  return (
    <main className={styles.main} data-pagefind-body>
      <h1 className={styles.title}>{data.title}</h1>
      <TagList tags={data.tags} />
      {data.description && <p className={styles.description}>{data.description}</p>}
      <div className={styles.meta}>
        <PublishedDate date={data.publishedAt || data.createdAt} updatedDate={data.updatedAt} />
      </div>
      <picture>
        <source
          type="image/webp"
          media="(max-width: 640px)"
          srcSet={formatImageSrc(
            `${data.thumbnail?.url}?fm=webp&w=414 1x, ${data.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`,
          )}
        />
        <source
          type="image/webp"
          srcSet={formatImageSrc(
            `${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`,
          )}
        />
        <img
          src={formatImageSrc(data.thumbnail?.url)}
          alt=""
          className={styles.thumbnail}
          width={data.thumbnail?.width}
          height={data.thumbnail?.height}
        />
      </picture>
      {headings && (
        <section className={styles.toc}>
          <header className={styles.tocHeader}>目次</header>
          <ol className={styles.tocList}>
            {headings.map((heading) => (
              <li
                // TODO: fix bad code
                className={[
                  styles.tocListItem,
                  heading.headingNumber === 2
                    ? styles.tocListItem2
                    : heading.headingNumber === 3
                      ? styles.tocListItem3
                      : heading.headingNumber === 4
                        ? styles.tocListItem4
                        : '',
                ].join(' ')}
                key={heading.id}
              >
                <a
                  href={`#${heading.id}`}
                  dangerouslySetInnerHTML={{
                    __html: heading.innerHTML,
                  }}
                />
              </li>
            ))}
          </ol>
        </section>
      )}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      {shareUrl && (
        <Share
          className={styles.share}
          url={shareUrl}
          title={data.title}
          hashtags={['wandfuldays', ...getGlobalTags(data)]}
        />
      )}
      <Profile writer={data.writer} />
    </main>
  );
}
