import { Metadata, ResolvingMetadata } from 'next';

import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import { LIMIT } from '@/constants';
import { getList, getTag } from '@/libs/microcms';

type Props = {
  params: Promise<{
    tagId: string;
  }>;
};

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { tagId } = await params;
  const tag = await getTag(tagId);

  return {
    title: `${tag.name} の記事一覧`,
    // @ts-expect-error 型が合わない
    openGraph: {
      ...(await parent).openGraph,
      title: `${tag.name} の記事一覧`,
    },
    alternates: {
      canonical: `/tags/${tagId}/`,
    },
    robots: {
      index: false,
    },
  };
};

export default async function Page({ params }: Props) {
  const { tagId } = await params;
  const data = await getList({
    limit: LIMIT,
    filters: `tags[contains]${tagId}`,
  });

  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath={`/tags/${tagId}`} />
    </>
  );
}
