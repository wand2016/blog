import SearchField from '@/components/SearchField';
import TagList from '@/components/TagList';
import { Tag } from '@/libs/microcms';

type Props = {
  className?: string;
  tags: Tag[];
};

export default function Nav({ className = '', tags }: Props) {
  return (
    <nav className={`flex flex-col items-center gap-2 px-[24px] pb-[24px] ${className}`}>
      <SearchField />
      <TagList tags={tags} />
    </nav>
  );
}
