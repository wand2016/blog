import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSQueries,
} from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// タグの型定義
export type Tag = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

// ライターの型定義
export type Writer = {
  name: string;
  profile: string;
  image?: MicroCMSImage;
} & MicroCMSContentId &
  MicroCMSDate;

// ブログの型定義
type BlogBase = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  /**
   * サイト内巡回用タグ
   */
  tags?: Tag[];
  writer?: Writer;
  /**
   * SNSシェア用ハッシュタグ = 全世界用タグ
   */
  hashtags?: string;
  /**
   * 目次を使用するかどうか
   * @default false
   */
  use_toc?: boolean;
  /**
   * true: 検索インデックス対象外
   * @default false
   */
  noindex?: boolean;
};

type RelatedArticle = BlogBase & {
  /**
   * 関連記事
   * 無限再帰にはならない。 (IDのみが返ってくる)
   */
  related_articles?: MicroCMSContentId[];
} & MicroCMSContentId &
  MicroCMSDate;

export type Blog = BlogBase & {
  /**
   * 関連記事
   */
  related_articles?: RelatedArticle[];
};

export type Article = Blog & MicroCMSContentId & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Blog>({
      endpoint: 'blog',
      queries: {
        ...queries,
        // HACK: 相互リンク等の個別ページを除外
        filters: queries?.filters
          ? `${queries.filters}[and]is_standalone[not_equals]true`
          : 'is_standalone[not_equals]true',
      },
      customRequestInit: {
        cache: 'force-cache',
      },
    })
    .catch(notFound);
  return listData;
};

// ブログの全IDを取得
export const getAllBlogIds = async (filters?: string) => {
  const listData = await client
    .getAllContentIds({
      endpoint: 'blog',
      // HACK: 相互リンク等の個別ページを除外
      filters: filters
        ? `${filters}[and]is_standalone[not_equals]true`
        : 'is_standalone[not_equals]true',
      customRequestInit: {
        cache: 'force-cache',
      },
    })
    .catch(notFound);
  return listData;
};

// ブログの詳細を取得
export const getDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<Blog>({
      endpoint: 'blog',
      contentId,
      queries,
      customRequestInit: {
        cache: 'force-cache',
      },
    })
    .catch(notFound);

  return detailData;
};

// タグの一覧を取得
export const getTagList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Tag>({
      endpoint: 'tags',
      queries,
      customRequestInit: {
        cache: 'force-cache',
      },
    })
    .catch(notFound);

  return listData;
};

// タグの全IDを取得
export const getAllTagIds = async (filters?: string) => {
  const listData = await client
    .getAllContentIds({
      endpoint: 'tags',
      filters,
      customRequestInit: {
        cache: 'force-cache',
      },
    })
    .catch(notFound);

  return listData;
};

// タグの詳細を取得
export const getTag = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<Tag>({
      endpoint: 'tags',
      contentId,
      queries,
      customRequestInit: {
        cache: 'force-cache',
      },
    })
    .catch(notFound);

  return detailData;
};
