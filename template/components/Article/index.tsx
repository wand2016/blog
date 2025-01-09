import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';
import Profile from '../Profile';
import Share from '@/components/Share';

type Props = {
  data: Omit<Article, 'content'>;
  formattedContent: string;
  shareUrl?: string;
};

export default function Article({ data, formattedContent: content, shareUrl }: Props) {
  return (
    <main className={styles.main} data-pagefind-body>
      <h1 className={styles.title}>{data.title}</h1>
      <TagList tags={data.tags} />
      {data.description && <p className={styles.description}>{data.description}</p>}
      <div className={styles.meta}>
        <PublishedDate date={data.publishedAt || data.createdAt} />
      </div>
      <picture>
        <source
          type="image/webp"
          media="(max-width: 640px)"
          srcSet={`${data.thumbnail?.url}?fm=webp&w=414 1x, ${data.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
        />
        <source
          type="image/webp"
          srcSet={`${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
        />
        <img
          src={data.thumbnail?.url}
          alt=""
          className={styles.thumbnail}
          width={data.thumbnail?.width}
          height={data.thumbnail?.height}
        />
      </picture>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      {/*TODO: タグは吟味する*/}
      {shareUrl && (
        <Share
          url={shareUrl}
          title={data.title}
          hashtags={['wandfuldays', ...(data.tags?.map((tag) => tag.name) ?? [])]}
        />
      )}
      <Profile writer={data.writer} />
    </main>
  );
}
