import TagListItem from '@/components/TagListItem';
import { Tag } from '@/libs/microcms';

type Props = {
  tags: readonly Tag[];
  hasLink?: boolean;
  className?: string;
};

export default function TagList({ tags, hasLink = true, className = '' }: Props) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <TagListItem key={tag.id} tag={tag} hasLink={hasLink} />
      ))}
    </ul>
  );
}
