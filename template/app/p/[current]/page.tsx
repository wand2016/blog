import { getAllBlogIds, getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: {
    current: string;
  };
};

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
