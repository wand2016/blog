import { getAllBlogIds, getAllTagIds, getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: {
    tagId: string;
    current: string;
  };
};

export async function generateStaticParams() {
  const data = await getAllTagIds();

  const parallel = await Promise.all(
    data.map(async (tagId) => {
      const ps = await generatePageStaticParams(tagId);
      return ps.map((p) => ({ tagId, ...p }));
    }),
  );
  return parallel.flat();
}

async function generatePageStaticParams(tagId: string) {
  const data = await getAllBlogIds(`tags[contains]${tagId}`);
  const page = Math.ceil(data.length / LIMIT);

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
