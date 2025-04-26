import { ReactNode } from 'react';

import TagList from '@/components/TagList';
import { getAllTagIds, getTag } from '@/libs/microcms';

type Props = {
  children: ReactNode;
  params: Promise<{
    tagId: string;
  }>;
};

export async function generateStaticParams() {
  const data = await getAllTagIds();

  return data.map((tagId) => ({ tagId }));
}

export default async function TagsLayout({ children, params }: Props) {
  const { tagId } = await params;
  const tag = await getTag(tagId);
  return (
    <>
      <header>
        <TagList tags={[tag]} hasLink={false} />
        の記事一覧
      </header>
      {children}
    </>
  );
}
