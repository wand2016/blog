import { Metadata, ResolvingMetadata } from 'next';

import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import { LIMIT } from '@/constants';
import { getAllBlogIds, getList } from '@/libs/microcms';
import { SITE_NAME } from '@/libs/siteMetadata';

type Props = {
  params: {
    current: string;
  };
};

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => ({
  title: `記事一覧|${params.current}ページ目`,
  // @ts-expect-error 型が合わない
  openGraph: {
    ...(await parent).openGraph,
    title: `${params.current}ページ目`,
  },
  alternates: {
    // 先頭ページはページネーションなしページと同一視する
    canonical: params.current === '1' ? '/' : `/p/${params.current}/`,
  },
});

export async function generateStaticParams() {
  const data = await getAllBlogIds();
  // NOTE: 最低1ページ用意しないと SSG が失敗する
  const page = Math.max(Math.ceil(data.length / LIMIT), 1);

  return Array.from({ length: page }).map((_, i) => ({ current: `${i + 1}` }));
}

export default async function Page({ params }: Props) {
  const current = parseInt(params.current as string, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={current} />
    </>
  );
}
