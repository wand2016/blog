import { Metadata, ResolvingMetadata } from 'next';

import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import { LIMIT } from '@/constants';
import { getAllBlogIds, getList, getTag } from '@/libs/microcms';

type Props = {
  params: Promise<{
    tagId: string;
    current: string;
  }>;
};

type ParentParams = {
  params: Promise<{
    tagId: string;
  }>;
};

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { current, tagId } = await params;
  const tag = await getTag(tagId);

  return {
    title: `「${tag.name}」の記事一覧|${current}ページ目`,
    // @ts-expect-error 型が合わない
    openGraph: {
      ...(await parent).openGraph,
      title: `「${tag.name}」の記事一覧|${current}ページ目`,
    },
    alternates: {
      // 先頭ページはページネーションなしページと同一視する
      canonical: current === '1' ? `/tags/${tagId}/` : `/tags/${tagId}/p/${current}/`,
    },
  };
};

export async function generateStaticParams({ params }: ParentParams) {
  const { tagId } = await params;
  const data = await getAllBlogIds(`tags[contains]${tagId}`);
  // NOTE: 最低1ページ用意しないと SSG が失敗する
  const page = Math.max(Math.ceil(data.length / LIMIT), 1);

  return Array.from({ length: page }).map((_, i) => ({ current: `${i + 1}` }));
}

export default async function Page({ params }: Props) {
  const { current, tagId } = await params;
  const currentInt = parseInt(current, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (currentInt - 1),
    filters: `tags[contains]${tagId}`,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={currentInt} basePath={`/tags/${tagId}`} />
    </>
  );
}
