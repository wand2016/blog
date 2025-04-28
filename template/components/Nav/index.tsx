import SearchField from '@/components/SearchField';
import TagListWithCount from '@/components/TagListWithCount';
import { Tag } from '@/libs/microcms';

type Props = {
  className?: string;
  tags: readonly { tag: Tag; count: number }[];
};

export default function Nav({ className = '', tags }: Props) {
  return (
    <nav className={`flex flex-col items-center gap-2 px-[24px] pb-[24px] ${className}`}>
      <SearchField />
      <TagListWithCount tags={tags} />
    </nav>
  );
}
