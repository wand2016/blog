import { getList, getTagList } from '@/libs/microcms';
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
  const data = await getTagList();

  return Promise.all(
    data.contents.map(async (tag) => ({
      tagId: tag.id,
      ...(await generatePageStaticParams(tag.id)),
    })),
  );
}

async function generatePageStaticParams(tagId: string) {
  const data = await getList({
    filters: `tags[contains]${tagId}`,
  });
  const page = Math.ceil(data.totalCount / LIMIT);

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
