import { getAllTagIds, getTag } from '@/libs/microcms';
import TagListItem from '@/components/TagListItem';
import styles from './layout.module.css';
import TagList from '@/components/TagList';

type Props = {
  children: React.ReactNode;
  params: {
    tagId: string;
  };
};

export async function generateStaticParams() {
  const data = await getAllTagIds();

  return data.map((tagId) => ({ tagId }));
}

export default async function TagsLayout({ children, params }: Props) {
  const { tagId } = params;
  const tag = await getTag(tagId);
  return (
    <>
      <header className={styles.title}>
        <TagList tags={[tag]} hasLink={false} />
        の記事一覧
      </header>
      <div>{children}</div>
    </>
  );
}
