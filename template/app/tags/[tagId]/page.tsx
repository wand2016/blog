import { getList, getTag } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import { Metadata, ResolvingMetadata } from 'next';
import { SITE_NAME } from '@/libs/siteMetadata';

type Props = {
  params: {
    tagId: string;
  };
};

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const tag = await getTag(params.tagId);

  return {
    title: `${tag.name} の記事一覧`,
    // @ts-expect-error 型が合わない
    openGraph: {
      ...(await parent).openGraph,
      title: `${tag.name} の記事一覧`,
    },
    alternates: {
      canonical: `/tags/${params.tagId}/`,
    },
  };
};

export default async function Page({ params }: Props) {
  const { tagId } = params;
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
