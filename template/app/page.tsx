import { getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import Share from '@/components/Share';

export default async function Page() {
  const data = await getList({
    limit: LIMIT,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />
      <Share
        url={process.env.BASE_URL ?? ''}
        title={'wandfuldays|創造的な活動で人生を豊かに'}
        hashtags={['wandfuldays']}
      />
    </>
  );
}
