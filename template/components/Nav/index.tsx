import { Tag } from '@/libs/microcms';
import SearchField from '@/components/SearchField';
import TagList from '@/components/TagList';

type Props = {
  className?: string;
  tags: Tag[];
};

export default function Nav({ className = '', tags }: Props) {
  return (
    <nav className={`flex flex-col items-center gap-[8px] px-[24px] pb-[24px] ${className}`}>
      <SearchField />
      <TagList tags={tags} />
    </nav>
  );
}
