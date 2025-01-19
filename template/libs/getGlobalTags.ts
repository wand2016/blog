import type { Blog } from './microcms';

/**
 * meta tag の keyword や SNS シェアなど、全世界用のタグ情報を取得します。
 */
export const getGlobalTags = (blog: Pick<Blog, 'tags' | 'hashtags'>): string[] => {
  return [...(blog.tags?.map((tag) => tag.name) ?? []), ...(blog.hashtags?.split('\n') ?? [])];
};
