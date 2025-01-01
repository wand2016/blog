import { Metadata } from 'next';
import { getList, getDetail } from '@/libs/microcms';
import Article from '@/components/Article';

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
  const data = await getList();

  return data.contents.map((content) => ({ slug: content.id }));
}

export default async function Page({ params }: Props) {
  const data = await getDetail(params.slug);

  return <Article data={data} />;
}
