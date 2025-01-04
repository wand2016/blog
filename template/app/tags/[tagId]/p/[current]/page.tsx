import { getAllBlogIds, getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: {
    tagId: string;
    current: string;
  };
};

type ParentParams = {
  params: {
    tagId: string;
  };
};

export async function generateStaticParams({ params }: ParentParams) {
  const data = await getAllBlogIds(`tags[contains]${params.tagId}`);
  // NOTE: 最低1ページ用意しないと SSG が失敗する
  const page = Math.max(Math.ceil(data.length / LIMIT), 1);

  return Array.from({ length: page }).map((_, i) => ({ current: `${i + 1}` }));
}

export default async function Page({ params }: Props) {
  const { tagId } = params;
  const current = parseInt(params.current as string, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
    filters: `tags[contains]${tagId}`,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={current} basePath={`/tags/${tagId}`} />
    </>
  );
}
