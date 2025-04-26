import { Metadata } from 'next';

import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import Share from '@/components/Share';
import { LIMIT } from '@/constants';
import { getList } from '@/libs/microcms';


export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default async function Page() {
  const data = await getList({
    limit: LIMIT,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />
      <Share
        className="my-4"
        url={process.env.BASE_URL ?? ''}
        title="wandfuldays|魔法のように素敵な日々をつくるブログ"
        hashtags={['wandfuldays']}
      />
    </>
  );
}
