import { Metadata } from 'next';
import { getList, getDetail, getAllBlogIds } from '@/libs/microcms';
import Article from '@/components/Article';
import { LIMIT } from '@/constants';

type Props = {
  params: {
    slug: string;
  };
};

// TODO: OGP とか何とかする
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const data = await getDetail(params.slug);
//
//   return {
//     title: data.title,
//     description: data.description,
//     openGraph: {
//       title: data.title,
//       description: data.description,
//       images: [data?.thumbnail?.url || ''],
//     },
//   };
// }

export async function generateStaticParams() {
  const data = await getAllBlogIds();

  return data.map((blogId) => ({ slug: blogId }));
}

export default async function Page({ params }: Props) {
  const data = await getDetail(params.slug);

  return <Article data={data} />;
}
